# Panduan Menjalankan Aplikasi — Admin PKBM Budiman Drestanta

> **Panduan ini ditulis khusus untuk pemula.** Tidak perlu pengalaman pemrograman sebelumnya. Ikuti setiap langkah secara berurutan dan aplikasi akan berjalan di komputer Anda.

---

## Daftar Isi

1. [Tentang Aplikasi](#1-tentang-aplikasi)
2. [Persiapan — Instal Alat yang Dibutuhkan](#2-persiapan--instal-alat-yang-dibutuhkan)
   - [Git](#21-git)
   - [Node.js](#22-nodejs)
   - [Visual Studio Code (VS Code)](#23-visual-studio-code-vs-code)
3. [Unduh (Clone) Kode Aplikasi](#3-unduh-clone-kode-aplikasi)
4. [Buka Proyek di VS Code](#4-buka-proyek-di-vs-code)
5. [Konfigurasi Environment (.env)](#5-konfigurasi-environment-env)
6. [Instal Dependensi](#6-instal-dependensi)
7. [Jalankan Aplikasi](#7-jalankan-aplikasi)
8. [Koneksi ke Backend (API)](#8-koneksi-ke-backend-api)
9. [Halaman-Halaman Aplikasi](#9-halaman-halaman-aplikasi)
10. [Error Umum dan Solusinya](#10-error-umum-dan-solusinya)
11. [Struktur Folder Proyek](#11-struktur-folder-proyek)
12. [Catatan Pengembangan](#12-catatan-pengembangan)

---

## 1. Tentang Aplikasi

### Apa itu aplikasi ini?

Ini adalah **panel admin** untuk **PKBM Budiman Drestanta** — sebuah antarmuka berbasis web yang digunakan oleh staf administrasi sekolah untuk:

- **Login** sebagai admin
- **Melihat dan memverifikasi** pendaftaran siswa baru (PPDB)
- **Memverifikasi pembayaran** yang masuk dari calon siswa
- **Mengelola pengaturan** akun admin

Singkatnya: ini adalah "dasbor kantor" digital yang digunakan admin sekolah di browser mereka.

### Apa yang akan terlihat di browser?

Setelah aplikasi berjalan, Anda akan membuka `http://localhost:3000` di browser dan melihat halaman login admin. Setelah masuk, Anda dapat mengakses halaman verifikasi pendaftaran dan pembayaran.

### Teknologi yang digunakan (penjelasan sederhana)

| Teknologi | Penjelasan Sederhana |
|-----------|----------------------|
| **React** | Alat untuk membangun tampilan halaman web secara interaktif |
| **TypeScript** | Bahasa pemrograman (versi lebih ketat dari JavaScript) |
| **Vite** | Alat yang menjalankan proyek React di komputer kita saat pengembangan |
| **Tailwind CSS** | Alat untuk mendesain tampilan (warna, ukuran, tata letak) dengan cepat |
| **HeroUI** | Koleksi komponen tampilan siap pakai (tombol, modal, tabel, dll.) |
| **Axios** | Alat untuk berkomunikasi dengan server backend (mengambil/mengirim data) |
| **React Router** | Alat yang mengatur perpindahan antara halaman-halaman di aplikasi |

---

## 2. Persiapan — Instal Alat yang Dibutuhkan

Anda perlu menginstal **3 alat** berikut sebelum memulai. Lakukan secara berurutan.

---

### 2.1 Git

**Apa itu Git?**
Git adalah alat yang digunakan untuk mengunduh kode dari internet ke komputer Anda dan melacak perubahan kode. Bayangkan seperti "Google Drive" khusus untuk kode program.

**Cara Instal Git di Windows:**

1. Buka browser Anda dan pergi ke: **https://git-scm.com/downloads/win**
2. Klik tombol **"Click here to download"** (versi 64-bit)
3. File bernama `Git-x.x.x-64-bit.exe` akan terunduh
4. Buka file tersebut → klik **Next** terus hingga selesai (semua pengaturan default sudah benar)
5. Klik **Install**, lalu **Finish**

**Verifikasi instalasi:**

1. Tekan tombol **Windows** di keyboard → ketik `cmd` → tekan **Enter**
2. Jendela hitam (Command Prompt) akan terbuka
3. Ketik perintah berikut lalu tekan **Enter**:

```
git --version
```

**Hasil yang diharapkan** (angka versi boleh berbeda):
```
git version 2.47.1.windows.1
```

Jika muncul teks seperti di atas, Git sudah terinstal dengan benar. ✅

---

### 2.2 Node.js

**Apa itu Node.js?**
Node.js adalah alat yang memungkinkan komputer Anda menjalankan kode JavaScript/TypeScript di luar browser. Juga menyertakan `npm` — alat untuk mengunduh paket-paket yang dibutuhkan aplikasi.

**Cara Instal Node.js di Windows:**

1. Buka browser dan pergi ke: **https://nodejs.org/en/download**
2. Pilih **"Windows Installer (.msi)"** — pilih versi **LTS** (tulisannya "Recommended For Most Users")
3. File bernama `node-vxx.x.x-x64.msi` akan terunduh
4. Buka file tersebut → klik **Next** → centang **"I accept the terms"** → klik **Next** terus → klik **Install**
5. Jika muncul jendela dari Windows yang menanyakan izin, klik **Yes**
6. Klik **Finish**

**Verifikasi instalasi:**

1. Tutup Command Prompt yang sudah terbuka (jika ada), lalu buka lagi yang baru
   - Tekan **Windows** → ketik `cmd` → tekan **Enter**
2. Ketik perintah pertama lalu tekan **Enter**:

```
node --version
```

**Hasil yang diharapkan:**
```
v22.14.0
```

3. Ketik perintah kedua lalu tekan **Enter**:

```
npm --version
```

**Hasil yang diharapkan:**
```
10.9.2
```

Jika kedua perintah menghasilkan angka versi, Node.js sudah terinstal. ✅

> **Catatan:** Angka versi yang Anda lihat boleh berbeda dengan di atas — yang penting perintahnya tidak menghasilkan error.

---

### 2.3 Visual Studio Code (VS Code)

**Apa itu VS Code?**
VS Code adalah editor teks khusus untuk kode program. Kita akan menggunakannya untuk membuka dan melihat kode aplikasi, serta membuka terminal (Command Prompt) di dalamnya.

**Cara Instal VS Code di Windows:**

1. Buka browser dan pergi ke: **https://code.visualstudio.com/download**
2. Klik tombol biru besar **"Windows"**
3. File bernama `VSCodeUserSetup-x64-x.x.x.exe` akan terunduh
4. Buka file tersebut → klik **Next** → klik **I accept** → klik **Next** terus
5. Pada halaman "Select Additional Tasks", centang kotak **"Add to PATH"** dan **"Open with Code"** (jika ada)
6. Klik **Next** → **Install** → **Finish**

**Verifikasi instalasi:**

VS Code akan terbuka secara otomatis setelah instalasi. Jika tidak, cari di menu Start dengan mengetik `Visual Studio Code`. ✅

---

## 3. Unduh (Clone) Kode Aplikasi

**Apa itu "clone"?**
"Clone" artinya menyalin seluruh kode dari server (GitLab/GitHub) ke folder di komputer Anda. Prosesnya otomatis — Git yang mengunduh semuanya.

**Langkah-langkah:**

1. Tentukan folder tempat Anda ingin menyimpan proyek. Misalnya, kita gunakan folder `Documents`.

2. Buka **Command Prompt**:
   - Tekan tombol **Windows** → ketik `cmd` → tekan **Enter**

3. Pindah ke folder `Documents` dengan mengetik perintah berikut lalu tekan **Enter**:

```
cd Documents
```

> **Apa itu `cd`?** Singkatan dari "change directory" — perintah untuk berpindah ke folder lain. Bayangkan seperti membuka folder di Windows Explorer.

4. Sekarang unduh kode proyek dengan perintah berikut (ganti URL dengan URL repositori Anda yang sebenarnya):

```
git clone <URL-REPOSITORI-ANDA>
```

> **Contoh:** `git clone https://gitlab.com/namakamu/react-admin-web.git`

> **Apa yang terjadi:** Git akan membuat folder baru di dalam `Documents` dan mengunduh semua file proyek ke sana. Proses ini mungkin memakan waktu beberapa detik.

5. Setelah selesai, masuk ke folder proyek:

```
cd react-admin-web
```

> Jika nama foldernya berbeda, ketik `dir` untuk melihat daftar folder, lalu gunakan nama yang sesuai.

**Di mana file-filenya?**
File akan ada di: `C:\Users\NamaAnda\Documents\react-admin-web\`

Anda bisa membuka folder itu di Windows Explorer untuk melihatnya.

---

## 4. Buka Proyek di VS Code

**Langkah-langkah:**

1. Pastikan Anda masih di Command Prompt dan sudah berada di dalam folder proyek (dari langkah sebelumnya)

2. Ketik perintah berikut lalu tekan **Enter**:

```
code .
```

> **Apa yang terjadi:** VS Code akan terbuka dan langsung menampilkan semua file proyek di panel sebelah kiri.

> Jika perintah `code .` tidak bekerja, buka VS Code secara manual (lewat menu Start), lalu klik **File** → **Open Folder** → cari dan pilih folder `react-admin-web`.

**Cara membuka Terminal di dalam VS Code:**

Terminal adalah jendela Command Prompt di dalam VS Code — lebih nyaman karena tidak perlu buka jendela terpisah.

1. Di VS Code, klik menu **Terminal** (di baris menu atas)
2. Klik **New Terminal**
3. Sebuah panel akan muncul di bagian bawah VS Code
4. Pastikan terminal sudah berada di folder proyek — seharusnya tertulis sesuatu seperti: `PS C:\Users\NamaAnda\Documents\react-admin-web>`

Gunakan terminal ini untuk semua perintah selanjutnya.

---

## 5. Konfigurasi Environment (.env)

**Apa itu file `.env`?**
File `.env` adalah file konfigurasi rahasia yang berisi alamat server (API URL), kunci, dan pengaturan lain yang dibutuhkan aplikasi untuk berjalan. File ini tidak terlihat di browser — hanya digunakan di dalam kode.

**Kabar baik:** File `.env` sudah tersedia di dalam proyek ini dan sudah dikonfigurasi dengan benar. Anda tidak perlu membuatnya dari nol.

**Isi file `.env` yang sudah ada:**

```
VITE_API_URL=https://api-fir1.onrender.com
```

**Penjelasan setiap variabel:**

| Variabel | Nilai | Artinya |
|----------|-------|---------|
| `VITE_API_URL` | `https://api-fir1.onrender.com` | Alamat server backend yang sudah berjalan di internet. Aplikasi akan mengambil dan mengirim data ke alamat ini. |

**Verifikasi file `.env`:**

1. Di panel kiri VS Code, cari file bernama `.env` di folder utama proyek
2. Klik untuk membukanya
3. Pastikan isinya adalah: `VITE_API_URL=https://api-fir1.onrender.com`

> **Jika file `.env` tidak ada:** Buat file baru bernama `.env` di folder utama proyek, lalu isi dengan baris di atas. Pastikan namanya tepat `.env` (ada titik di depan, tidak ada ekstensi lain).

---

## 6. Instal Dependensi

**Apa itu dependensi?**
Dependensi adalah paket-paket tambahan (library/plugin) yang dibutuhkan aplikasi untuk berjalan — misalnya komponen tampilan, alat komunikasi dengan server, dll. Semuanya sudah terdaftar di file `package.json` dan perlu diunduh ke komputer Anda sebelum aplikasi bisa dijalankan.

**Langkah-langkah:**

1. Di terminal VS Code, pastikan Anda berada di folder proyek
2. Ketik perintah berikut lalu tekan **Enter**:

```
npm install
```

> **Apa yang terjadi:** npm akan membaca file `package.json`, lalu mengunduh semua paket yang dibutuhkan ke dalam folder `node_modules`. Proses ini mungkin memakan waktu 1–3 menit, tergantung kecepatan internet.

**Hasil yang diharapkan** di akhir proses:
```
added 387 packages in 45s
```

> Angka pastinya bisa berbeda — yang penting tidak ada tulisan merah `ERROR` yang muncul.

**Apa yang dibuat:**
Setelah selesai, folder `node_modules` akan muncul di dalam folder proyek. Folder ini berisi semua paket yang diunduh (bisa berukuran ratusan MB — ini normal).

---

## 7. Jalankan Aplikasi

**Langkah-langkah:**

1. Di terminal VS Code, ketik perintah berikut lalu tekan **Enter**:

```
npm run dev
```

> **Apa yang terjadi:** Vite (alat pengembangan) akan menyiapkan dan menjalankan server lokal di komputer Anda. Server ini yang menampilkan aplikasi di browser Anda.

**Hasil yang diharapkan di terminal:**

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
  ➜  press h + enter to show help
```

2. Buka browser Anda (Chrome, Edge, Firefox)
3. Di kolom alamat browser, ketik:

```
http://localhost:3000
```

lalu tekan **Enter**.

> **Apa itu "localhost"?** Localhost berarti "komputer ini sendiri". Ketika Anda mengetik `localhost:3000`, browser membuka aplikasi yang sedang berjalan di komputer Anda sendiri — bukan dari internet. Angka `3000` adalah "pintu" (port) yang digunakan aplikasi.

4. Anda akan melihat **halaman login admin** PKBM Budiman Drestanta. ✅

---

## 8. Koneksi ke Backend (API)

### Apa itu "backend"?

Aplikasi ini terdiri dari dua bagian:

- **Frontend** (yang Anda jalankan sekarang): tampilan yang dilihat pengguna di browser
- **Backend**: server tak terlihat yang menyimpan data (database siswa, pembayaran, dll.) dan memproses logika bisnis

Frontend dan backend berkomunikasi melalui internet — frontend "mengirim permintaan" ke backend, backend "membalas" dengan data.

### Kabar baik: Backend sudah berjalan di internet

Backend proyek ini **sudah aktif** dan bisa diakses di:

```
https://api-fir1.onrender.com
```

Ini berarti Anda **tidak perlu menjalankan backend sendiri**. Selama komputer Anda terhubung internet, aplikasi akan otomatis berkomunikasi dengan backend tersebut.

### Apa yang terjadi jika internet mati atau backend bermasalah?

Jika backend tidak bisa diakses, Anda akan melihat perilaku berikut:

- Halaman login terbuka, tapi saat klik tombol "Login" tidak ada yang terjadi, atau muncul pesan error
- Data di tabel/daftar tidak muncul (halaman kosong atau loading terus)
- Muncul notifikasi error di layar

**Cara memeriksa apakah backend aktif:**
Buka browser, ketik alamat berikut di kolom URL:

```
https://api-fir1.onrender.com
```

Jika muncul respons apapun (bukan halaman error 502/503), backend sedang berjalan.

> **Catatan:** Backend ini di-host di Render.com (layanan cloud gratis). Pada paket gratis, server bisa "tidur" jika tidak ada aktivitas selama beberapa menit. Permintaan pertama mungkin membutuhkan waktu 30–60 detik hingga server "bangun" kembali. Ini normal.

---

## 9. Halaman-Halaman Aplikasi

Setelah login berhasil, Anda bisa mengakses halaman-halaman berikut:

| URL | Nama Halaman | Fungsi |
|-----|--------------|--------|
| `http://localhost:3000/login` | Login | Masuk sebagai admin |
| `http://localhost:3000/` | Verifikasi Pendaftaran | Melihat dan memverifikasi daftar pendaftaran siswa |
| `http://localhost:3000/pembayaran` | Pembayaran | Melihat dan memverifikasi pembayaran siswa |
| `http://localhost:3000/settings` | Pengaturan | Pengaturan akun admin |

> **Penting:** Semua halaman (kecuali `/login`) memerlukan login terlebih dahulu. Jika Anda membuka halaman lain tanpa login, Anda akan otomatis diarahkan ke halaman `/login`.

---

## 10. Error Umum dan Solusinya

### Error 1: `'node' is not recognized as an internal or external command`

**Artinya:** Node.js belum terinstal atau belum ditambahkan ke PATH sistem.

**Solusi:**
1. Instal ulang Node.js dari https://nodejs.org/en/download (pastikan pilih versi LTS)
2. Setelah instalasi, **tutup semua jendela Command Prompt/terminal** dan buka yang baru
3. Coba lagi perintah `node --version`

---

### Error 2: `'npm' is not recognized as an internal or external command`

**Artinya:** npm tidak terdeteksi (biasanya masalah yang sama dengan Node.js).

**Solusi:** Sama dengan Error 1 di atas.

---

### Error 3: `Error: listen EADDRINUSE: address already in use :::3000`

**Artinya:** Port 3000 sudah digunakan oleh aplikasi lain (atau server yang belum dimatikan).

**Solusi:**

Cara 1 — Hentikan proses di port 3000:
1. Buka Command Prompt baru
2. Ketik perintah berikut:
```
netstat -ano | findstr :3000
```
3. Catat angka di kolom paling kanan (contoh: `12345`) — itu adalah PID (Process ID)
4. Ketik perintah berikut (ganti `12345` dengan PID Anda):
```
taskkill /PID 12345 /F
```
5. Jalankan kembali `npm run dev`

Cara 2 — Gunakan port lain:
1. Di terminal VS Code, jalankan:
```
npm run dev -- --port 3001
```
2. Buka `http://localhost:3001` di browser

---

### Error 4: File `.env` tidak ada atau variabel tidak terbaca

**Gejala:** Aplikasi terbuka tapi tidak bisa mengambil data apapun; semua halaman kosong.

**Solusi:**
1. Pastikan file bernama `.env` ada di **folder utama proyek** (bukan di dalam `src`)
2. Pastikan isinya persis seperti ini (tidak ada spasi, tidak ada tanda kutip):
```
VITE_API_URL=https://api-fir1.onrender.com
```
3. Simpan file, lalu **hentikan server** (tekan `Ctrl + C` di terminal) dan jalankan ulang:
```
npm run dev
```

---

### Error 5: API tidak terhubung / data tidak muncul

**Gejala:** Login gagal, atau halaman verifikasi tidak menampilkan data.

**Kemungkinan penyebab dan solusi:**

| Penyebab | Solusi |
|----------|--------|
| Internet mati | Periksa koneksi internet Anda |
| Backend "tidur" (karena paket gratis Render) | Tunggu 30–60 detik, lalu coba lagi |
| URL backend salah di `.env` | Periksa file `.env`, pastikan URL-nya benar |
| Sesi login kedaluwarsa | Logout lalu login kembali |

---

### Error 6: `npm install` gagal / muncul banyak error merah

**Solusi:**
1. Hapus folder `node_modules` (klik kanan di VS Code → Delete)
2. Hapus file `package-lock.json`
3. Jalankan lagi:
```
npm install
```

---

### Error 7: Halaman tidak muncul / browser menampilkan "This site can't be reached"

**Penyebab:** Server belum dijalankan.

**Solusi:** Pastikan Anda sudah menjalankan `npm run dev` di terminal VS Code dan terminal tidak menampilkan error.

---

## 11. Struktur Folder Proyek

Berikut penjelasan sederhana tentang setiap folder dan file penting:

```
react-admin-web/
├── .env                    → File konfigurasi (URL backend, dll.)
├── index.html              → Pintu masuk utama aplikasi web
├── package.json            → Daftar paket yang dibutuhkan + perintah npm
├── vite.config.ts          → Pengaturan server pengembangan (port, dll.)
├── tsconfig.json           → Pengaturan bahasa TypeScript
│
├── public/                 → File statis (gambar yang tidak diproses)
│   ├── logoBudiman.png     → Logo sekolah PKBM Budiman Drestanta
│   └── class1.png          → Gambar kelas
│
└── src/                    → Folder utama kode aplikasi
    ├── main.tsx            → Titik awal aplikasi (jangan diubah)
    ├── App.tsx             → Pengaturan halaman (routing)
    ├── index.css           → Gaya/style global aplikasi
    ├── utils.ts            → Fungsi-fungsi pembantu (token, format rupiah)
    │
    ├── api/                → Semua kode yang berhubungan dengan backend
    │   ├── AxiosClient.ts  → Konfigurasi utama HTTP client (Axios)
    │   ├── api/            → Definisi tiap endpoint API
    │   │   ├── loginAdmin.ts
    │   │   ├── adminGetUserApplicationsList.ts
    │   │   ├── adminVerifyApplicationById.ts
    │   │   ├── adminVerifyPayment.ts
    │   │   └── ... (file API lainnya)
    │   └── model/          → Definisi tipe data (Admin, User, Application)
    │       ├── enum/       → Nilai-nilai konstan (status, jenis, dll.)
    │       └── table/      → Struktur data dari database
    │
    ├── components/         → Bagian-bagian tampilan yang bisa dipakai ulang
    │   ├── VerificationModal.tsx       → Popup verifikasi pendaftaran
    │   ├── PaymentVerificationModal.tsx → Popup verifikasi pembayaran
    │   └── layout/         → Komponen tata letak halaman
    │       ├── Layout.tsx  → Pembungkus utama (header + konten + footer)
    │       ├── Header.tsx  → Bagian atas halaman (navigasi)
    │       └── Footer.tsx  → Bagian bawah halaman
    │
    └── pages/              → Halaman-halaman lengkap aplikasi
        ├── login.tsx           → Halaman login admin
        ├── verifcation-page.tsx → Halaman daftar & verifikasi pendaftaran
        ├── pembayaran.tsx      → Halaman daftar & verifikasi pembayaran
        ├── settings.tsx        → Halaman pengaturan
        └── dashboard.tsx       → Dasbor (saat ini belum digunakan)
```

**Penjelasan istilah penting:**

- **`src/`** → Singkatan dari "source" (sumber). Ini adalah folder tempat semua kode aplikasi berada.
- **`components/`** → Bagian-bagian tampilan kecil yang dapat dipakai berulang kali di berbagai halaman (seperti tombol, kartu, modal).
- **`pages/`** → Halaman penuh yang dilihat pengguna ketika membuka URL tertentu.
- **`api/`** → Kode yang mengatur cara aplikasi berkomunikasi dengan server backend.
- **`public/`** → File yang langsung disajikan ke browser apa adanya (gambar logo, ikon, dll.).

---

## 12. Catatan Pengembangan

### Cara menghentikan server

Di terminal VS Code, tekan:

```
Ctrl + C
```

Terminal akan menampilkan konfirmasi. Server sekarang berhenti.

### Cara menjalankan ulang server

Setelah berhenti, jalankan kembali:

```
npm run dev
```

### Hot Reload — perubahan langsung terlihat

Saat server berjalan dan Anda mengedit file di `src/`, browser **otomatis memperbarui tampilan** tanpa perlu di-refresh manual. Ini disebut "Hot Module Replacement" (HMR). Sangat berguna saat pengembangan.

### Cara build untuk produksi (deploy)

Jika Anda ingin mengunggah aplikasi ke server/hosting:

```
npm run build
```

> **Apa yang terjadi:** Vite akan mengkompilasi semua kode menjadi file HTML/CSS/JS yang dioptimalkan di dalam folder `dist/`. Folder ini yang diunggah ke server hosting.

### Perintah-perintah npm yang tersedia

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan server pengembangan lokal (untuk coding/testing) |
| `npm run build` | Kompilasi untuk produksi (untuk deploy) |
| `npm run preview` | Pratinjau hasil build sebelum deploy |
| `npm run lint` | Periksa kode untuk menemukan masalah gaya/sintaks |

### Informasi teknis singkat

| Detail | Nilai |
|--------|-------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| UI Library | HeroUI + Tailwind CSS v4 |
| HTTP Client | Axios |
| Routing | React Router DOM v7 |
| Port Lokal | `3000` |
| Backend API | `https://api-fir1.onrender.com` |
| Autentikasi | JWT Token (disimpan di `localStorage` dengan kunci `webtoken`) |

---

## Ringkasan Cepat

Setelah semua alat terinstal, cukup jalankan **4 perintah** ini setiap kali ingin membuka proyek:

```bash
# 1. Masuk ke folder proyek
cd Documents/react-admin-web

# 2. Buka VS Code
code .

# 3. Instal dependensi (hanya perlu sekali, atau setelah ada update)
npm install

# 4. Jalankan aplikasi
npm run dev
```

Kemudian buka browser dan akses: **http://localhost:3000**

---

*Dokumentasi ini dibuat berdasarkan analisis langsung terhadap kode sumber proyek. Jika ada langkah yang tidak berhasil, periksa kembali setiap perintah dan pastikan tidak ada langkah yang terlewat.*
