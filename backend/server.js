require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');

const app = express();
const SECRET_KEY = process.env.JWT_SECRET; 
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// --- HELPER DATABASE ---
const getDB = () => JSON.parse(fs.readFileSync('./db.json'));
const saveDB = (data) => fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));

// --- MIDDLEWARE VERIFIKASI TOKEN ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: "Akses ditolak" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token tidak valid" });
        req.user = decoded; // Berisi userId dan username
        next();
    });
};

// --- AUTH ENDPOINTS (LOGIN & REGISTER) ---
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    if (db.users.find(u => u.username === username)) return res.status(400).json({ message: "User sudah ada" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    db.users.push(newUser);
    saveDB(db);
    res.status(201).json({ message: "Registrasi Berhasil" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Login Gagal" });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ accessToken: token, username: user.username });
});

// --- ACTIVITY ENDPOINTS (DENGAN FILTER USERID) ---

// 1. Ambil data HANYA milik user yang login
app.get('/activities', verifyToken, (req, res) => {
    const db = getDB();
    const myData = db.activities.filter(act => act.userId === req.user.userId);
    res.json(myData);
});

// 2. Tambah data (Otomatis menempelkan userId dari token)
app.post('/activities', verifyToken, (req, res) => {
    const { task, date } = req.body;
    const db = getDB();

    const newActivity = {
        id: Date.now(),
        userId: req.user.userId, // DIAMBIL DARI TOKEN
        task,
        date,
        status: "In Progress"
    };

    db.activities.push(newActivity);
    saveDB(db);
    res.status(201).json(newActivity);
});

app.listen(PORT, () => console.log("Server berjalan di port 3000"));

// --- ENDPOINT HAPUS AKTIVITAS ---
app.delete('/activities/:id', verifyToken, (req, res) => {
    const db = getDB();
    const activityId = parseInt(req.params.id);
    
    // Cari aktivitas berdasarkan ID
    const activity = db.activities.find(act => act.id === activityId);

    // 1. Cek apakah data ada
    if (!activity) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // 2. CEK KEPEMILIKAN: Apakah userId di data sama dengan userId di token?
    if (activity.userId !== req.user.userId) {
        return res.status(403).json({ message: "Anda tidak punya akses menghapus data ini!" });
    }

    // 3. Hapus data jika pengecekan lolos
    db.activities = db.activities.filter(act => act.id !== activityId);
    saveDB(db);

    res.json({ message: "Rencana berhasil dihapus" });
});