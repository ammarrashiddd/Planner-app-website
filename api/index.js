require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ===== MIDDLEWARE TOKEN =====
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: "Akses ditolak" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    req.user = decoded;
    next();
  });
};

// ===== AUTH =====
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await sql`SELECT * FROM users WHERE username = ${username}`;
    if (existingUser.length > 0)
      return res.status(400).json({ message: "User sudah ada" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (username, password) VALUES (${username}, ${hashedPassword})`;

    res.status(201).json({ message: "Registrasi Berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error saat registrasi" });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await sql`SELECT * FROM users WHERE username = ${username}`;
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Login Gagal" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ accessToken: token, username: user.username });
  } catch {
    res.status(500).json({ message: "Error saat login" });
  }
});

// ===== ACTIVITIES =====
app.get('/api/activities', verifyToken, async (req, res) => {
  try {
    const data = await sql`
      SELECT * FROM activities
      WHERE "userId" = ${req.user.userId}
      ORDER BY id DESC
    `;
    res.json(data);
  } catch {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
});

app.post('/api/activities', verifyToken, async (req, res) => {
  const { task, date } = req.body;

  try {
    const result = await sql`
      INSERT INTO activities ("userId", task, date)
      VALUES (${req.user.userId}, ${task}, ${date})
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch {
    res.status(500).json({ message: "Gagal menambah data" });
  }
});

app.delete('/api/activities/:id', verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await sql`
      DELETE FROM activities
      WHERE id = ${id} AND "userId" = ${req.user.userId}
      RETURNING *
    `;

    if (deleted.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    res.json({ message: "Rencana berhasil dihapus" });
  } catch {
    res.status(500).json({ message: "Gagal menghapus data" });
  }
});

module.exports = app;

// hanya untuk lokal
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server berjalan di ${PORT}`));
}