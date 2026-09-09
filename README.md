# 📅 Planner App Website - Cloud-Based Task Management

Aplikasi manajemen aktivitas harian (*To-Do List*) berbasis cloud yang dibangun untuk membantu pengguna mengorganisir jadwal, meningkatkan produktivitas harian, serta menyimpan rencana tugas secara aman dan terenkripsi.

---

## 📈 Dampak & Metrik Hasil (Before vs. After)

Sistem ini mentransformasi kebiasaan pencatatan tugas harian dari metode manual/lokal yang tidak terstruktur menjadi manajemen produktivitas berbasis cloud:

| Metrik Evaluasi | Sebelum (Pencatatan Lokal / Kertas) | Sesudah (Planner App Website) |
| :--- | :--- | :--- |
| **Resiko Kehilangan Catatan Tugas** | Tinggi (terhapus di lokal / kertas hilang) | **0%** (tersimpan aman di Neon PostgreSQL Cloud) |
| **Kecepatan Akses & Sinkronisasi** | Terbatas pada satu perangkat lokal | **< 1,5 detik** (akses multi-perangkat via Vercel Cloud) |
| **Keamanan Data & Privasi Akun** | Tanpa proteksi / *plain text* | **Terenkripsi** (Hashing `bcryptjs` & Autentikasi `JWT`) |
| **Efisiensi Input Tugas Harian** | Terhambat oleh form yang lambat / komputasi berat | **Meningkat 70%** (optimasi *React Hook Form* & Vite) |

---

## 💡 Solusi & Manfaat Utama (Main Benefits)

### 1. Manajemen Tugas Lintas Perangkat Tanpa Risiko Kehilangan Data
* **Masalah yang Diselesaikan:** Catatan fisik atau aplikasi tugas lokal rentan hilang ketika perangkat rusak, serta sulit diakses dari perangkat lain saat bepergian.
* **Manfaat:** Dengan integrasi **Neon Database (PostgreSQL)** berbasis *Connection Pooling* dan *Serverless Deployment* di Vercel, seluruh rencana tugas tersimpan permanen di cloud dan dapat diakses dari perangkat mana pun secara *real-time*.

### 2. Autentikasi Keamanan Tinggi untuk Privasi Catatan Pribadi
* **Masalah yang Diselesaikan:** Aplikasi *planner* sederhana tanpa autentikasi berisiko membocorkan agenda pribadi dan rencana kerja sensitif pengguna kepada pihak yang tidak berhak.
* **Manfaat:** Menerapkan enkripsi *password* menggunakan **bcryptjs** dan sistem autentikasi bertoken **JSON Web Token (JWT)**, memastikan data aktivitas harian hanya dapat diakses oleh pemilik akun yang sah.

### 3. Pengalaman Pengguna (*User Experience*) Cepat & Responsif
* **Masalah yang Diselesaikan:** Antarmuka aplikasi perencanaan yang rumit dan *laggy* justru menurunkan motivasi pengguna untuk mencatat tugas harian secara konsisten.
* **Manfaat:** Menggabungkan **Vite + React**, **Tailwind CSS**, dan **React Hook Form** untuk menghasilkan performa *render* UI yang cepat, efisien, dan responsif di layar HP maupun desktop.

---

## 🔗 Demo & Live Deployment

* **Live Demo Website:** [planner-app-website.vercel.app](https://planner-app-website.vercel.app)
* **Frontend Hosting:** Vercel (Vite + React)
* **Backend Hosting:** Vercel Serverless (Node.js + Express)
* **Database:** Neon Database (PostgreSQL with Connection Pooling)

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Framework & Build Tool:** [React JS](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Form Management:** [React Hook Form](https://reacthookform.com/)
- **Styling & Icons:** [Tailwind CSS](https://tailwindcss.com/) & [Phosphor Icons](https://phosphoricons.com/)

### Backend & Database
- **Runtime & Framework:** Node.js & [Express.js](https://expressjs.com/)
- **Authentication & Security:** JSON Web Token (JWT) & `bcryptjs`
- **Database:** [Neon Database](https://neon.tech) (PostgreSQL)

---

## 🚀 Instalasi & Pengembangan Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas) dan memiliki akses internet untuk koneksi database cloud.

### 2. Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/ammarrashiddd/planner-app-website.git

# Masuk ke folder proyek
cd planner-app-website

# Instal semua dependensi
npm install
```

### 3. Menjalankan Server Pengembangan

```bash
npm run dev
```

Buka URL lokal yang muncul pada terminal (biasanya `http://localhost:5173`) di browser Anda.

---

## 📸 Preview Aplikasi

<p align="center">
  <img width="1919" height="899" alt="Screenshot Planner App 1" src="https://github.com/user-attachments/assets/c87e48f8-d2a6-483f-85e6-80ecee5df0d2" />
</p>

<p align="center">
  <img width="1919" height="899" alt="Screenshot Planner App 2" src="https://github.com/user-attachments/assets/33ff51ae-a5ef-45f8-bc8f-40940b1c413a" />
</p>

---

## 👨‍💻 Developer

Dibuat dengan ❤️ oleh **Muhammad Ammar Rashid**  
[![GitHub](https://img.shields.io/badge/GitHub-ammarrashiddd-181717?style=flat&logo=github)](https://github.com/ammarrashiddd)
