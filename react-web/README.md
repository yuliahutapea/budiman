# PKBM Budiman Drestanta — Panduan Lengkap Menjalankan Aplikasi

> Panduan ini ditulis khusus untuk pemula yang **belum pernah** menggunakan terminal, Git, atau tools pemrograman sebelumnya. Ikuti setiap langkah secara berurutan dan jangan lewatkan satu pun.

---

## Daftar Isi

1. [Apa Itu Aplikasi Ini?](#1-apa-itu-aplikasi-ini)
2. [Teknologi yang Digunakan](#2-teknologi-yang-digunakan)
3. [Persiapan: Install Semua Tools yang Diperlukan](#3-persiapan-install-semua-tools-yang-diperlukan)
4. [Unduh Kode Program (Clone Repository)](#4-unduh-kode-program-clone-repository)
5. [Buka Project di VS Code](#5-buka-project-di-vs-code)
6. [Konfigurasi Environment (.env)](#6-konfigurasi-environment-env)
7. [Install Dependensi](#7-install-dependensi)
8. [Jalankan Aplikasi](#8-jalankan-aplikasi)
9. [Koneksi ke Backend (API Server)](#9-koneksi-ke-backend-api-server)
10. [Struktur Folder Project](#10-struktur-folder-project)
11. [Cara Kerja Sehari-hari](#11-cara-kerja-sehari-hari)
12. [Error Umum dan Cara Mengatasinya](#12-error-umum-dan-cara-mengatasinya)

---

## 1. Apa Itu Aplikasi Ini?

Aplikasi ini adalah **website pendaftaran peserta didik baru (PPDB)** untuk **PKBM Budiman Drestanta** — sebuah lembaga pendidikan non-formal.

**Yang bisa dilakukan pengguna melalui website ini:**

- Melihat informasi tentang PKBM (profil, program, admisi, kontak)
- Mendaftar akun dan login
- Mengisi formulir pendaftaran peserta didik (untuk jenjang SD, SMP, atau SMA)
- Mengupload dokumen persyaratan
- Melakukan dan memantau status pembayaran
- Admin dapat memverifikasi pendaftaran dan pembayaran

Ketika Anda berhasil menjalankan aplikasi ini, Anda akan melihat sebuah **website** yang bisa dibuka di browser (Google Chrome, Firefox, dll.).

---

## 2. Teknologi yang Digunakan

Anda tidak perlu memahami ini secara mendalam, tapi ini berguna untuk diketahui:

| Teknologi | Penjelasan Sederhana |
|-----------|----------------------|
| **React** | Library JavaScript untuk membangun tampilan website yang interaktif |
| **TypeScript** | Versi JavaScript yang lebih "ketat" agar kode lebih aman dari error |
| **Vite** | Tools yang menjalankan website di komputer Anda selama pengembangan |
| **Tailwind CSS** | Framework untuk mengatur tampilan (warna, ukuran, layout) dengan cepat |
| **HeroUI** | Kumpulan komponen tampilan siap pakai (tombol, form, tabel, dll.) |
| **Axios** | Library untuk berkomunikasi dengan server backend (mengambil/mengirim data) |

---

## 3. Persiapan: Install Semua Tools yang Diperlukan

Sebelum mulai, Anda perlu menginstall **3 tools** di komputer Windows Anda. Lakukan secara berurutan.

---

### 3.1 Install Node.js

**Apa itu Node.js?**
Node.js adalah program yang memungkinkan komputer Anda menjalankan kode JavaScript. Tanpa ini, aplikasi tidak bisa dijalankan.

**Langkah instalasi:**

1. Buka browser dan kunjungi: **https://nodejs.org**
2. Klik tombol **"LTS"** (bukan "Current") — ini adalah versi yang paling stabil
3. File `.msi` akan terunduh (contoh: `node-v20.x.x-x64.msi`)
4. Buka file tersebut dan ikuti wizard instalasi:
   - Klik **Next** terus sampai selesai
   - Pastikan centang pada **"Add to PATH"** saat muncul pilihan tersebut
   - Klik **Install**, lalu **Finish**
5. **Restart komputer Anda** setelah instalasi selesai

**Cara memverifikasi instalasi berhasil:**

1. Tekan tombol **Windows + R** di keyboard
2. Ketik `cmd` lalu tekan **Enter** — jendela hitam akan muncul (ini adalah "terminal" atau "command prompt")
3. Ketik perintah berikut lalu tekan **Enter**:

```
node -v
```

4. Ketik perintah ini juga lalu tekan **Enter**:

```
npm -v
```

**Output yang diharapkan** (angka bisa berbeda, yang penting muncul):
```
v20.11.0
10.2.4
```

> Jika muncul angka versi seperti di atas, berarti Node.js sudah terinstall dengan benar. Jika muncul pesan error seperti `'node' is not recognized`, coba restart komputer lalu ulangi langkah verifikasi.

---

### 3.2 Install Git

**Apa itu Git?**
Git adalah program untuk mengunduh kode program dari internet (dari GitLab/GitHub) ke komputer Anda. Bayangkan Git seperti aplikasi download, tapi khusus untuk kode program.

**Langkah instalasi:**

1. Buka browser dan kunjungi: **https://git-scm.com/download/win**
2. Klik **"Click here to download"** — file `.exe` akan terunduh
3. Buka file tersebut
4. Ikuti wizard instalasi — klik **Next** terus tanpa mengubah pengaturan apapun
5. Klik **Install**, lalu **Finish**

**Cara memverifikasi instalasi berhasil:**

1. Buka terminal baru (tekan **Windows + R**, ketik `cmd`, tekan **Enter**)
2. Ketik perintah berikut lalu tekan **Enter**:

```
git --version
```

**Output yang diharapkan:**
```
git version 2.44.0.windows.1
```

> Jika muncul versi seperti di atas, Git sudah berhasil diinstall.

---

### 3.3 Install VS Code

**Apa itu VS Code?**
VS Code (Visual Studio Code) adalah program untuk membaca dan mengedit kode program. Ini adalah "editor teks" khusus untuk programmer.

**Langkah instalasi:**

1. Buka browser dan kunjungi: **https://code.visualstudio.com**
2. Klik tombol biru **"Download for Windows"**
3. Buka file installer yang terunduh
4. Ikuti wizard instalasi:
   - Setujui license agreement
   - Centang **"Add to PATH"** jika ada pilihannya
   - Centang **"Open with Code"** jika ada pilihannya
   - Klik **Install**, lalu **Finish**

> Setelah instalasi selesai, VS Code akan terbuka otomatis.

---

## 4. Unduh Kode Program (Clone Repository)

**Apa itu "clone repository"?**
Repository adalah tempat penyimpanan kode program di internet (seperti Google Drive, tapi untuk kode). "Clone" artinya mengunduh salinan kode tersebut ke komputer Anda.

**Langkah-langkah:**

1. Buka terminal — tekan **Windows + R**, ketik `cmd`, tekan **Enter**

2. Tentukan folder tempat Anda ingin menyimpan project. Misalnya, di dalam folder `Documents`. Ketik perintah ini lalu tekan **Enter**:

```
cd Documents
```

> **Apa itu `cd`?** `cd` adalah singkatan dari "change directory" — artinya pindah ke folder lain. Perintah ini memindahkan Anda ke folder `Documents`.

3. Sekarang, clone (unduh) repository dengan perintah berikut. Ganti `<url-repo>` dengan URL GitLab yang diberikan kepada Anda:

```
git clone <url-repo>
```

**Contoh:**
```
git clone https://gitlab.com/nama-organisasi/pkbm-web.git
```

> **Apa yang terjadi?** Git akan mengunduh semua file kode program ke dalam folder baru di komputer Anda. Proses ini memerlukan koneksi internet.

4. Setelah clone selesai, masuk ke dalam folder project:

```
cd react-web
```

> **Penjelasan:** Perintah ini memindahkan terminal Anda ke dalam folder `react-web` yang baru saja diunduh. Semua perintah selanjutnya harus dijalankan dari dalam folder ini.

**Di mana file-file tersebut tersimpan?**
File project Anda akan berada di: `C:\Users\NamaAnda\Documents\react-web\`

---

## 5. Buka Project di VS Code

1. Pastikan Anda masih berada di dalam folder project di terminal. Ketik perintah ini lalu tekan **Enter**:

```
code .
```

> **Apa yang terjadi?** VS Code akan terbuka dan langsung menampilkan folder project Anda di sebelah kiri.

**Alternatif — buka manual melalui VS Code:**
1. Buka VS Code
2. Klik menu **File** → **Open Folder...**
3. Navigasi ke `Documents` → `react-web`
4. Klik **Select Folder**

**Cara membuka terminal di dalam VS Code:**
1. Di VS Code, klik menu **Terminal** (di menu bar atas)
2. Klik **New Terminal**
3. Sebuah panel akan muncul di bagian bawah VS Code — ini adalah terminal yang akan Anda gunakan dari sekarang

> **Penting:** Gunakan terminal di dalam VS Code (bukan terminal Windows yang terpisah) untuk semua perintah selanjutnya. Terminal di VS Code otomatis berada di dalam folder project yang benar.

---

## 6. Konfigurasi Environment (.env)

**Apa itu file `.env`?**
File `.env` adalah file konfigurasi tersembunyi yang menyimpan informasi penting untuk aplikasi — seperti alamat server backend. Bayangkan seperti "pengaturan rahasia" yang tidak ikut diunggah ke internet.

**Apakah project ini memerlukan backend?**

Ya. Aplikasi ini terhubung ke server backend untuk menyimpan dan mengambil data pendaftaran. **Kabar baiknya: server backend sudah tersedia secara online**, sehingga Anda tidak perlu menjalankan backend sendiri.

**Langkah membuat file `.env`:**

1. Di VS Code, lihat panel kiri (file explorer)
2. Cari file bernama **`.env.example`** — ini adalah contoh konfigurasi yang sudah disediakan
3. **Klik kanan** pada file `.env.example`
4. Pilih **"Copy"**
5. **Klik kanan** di area kosong di panel kiri (tapi masih di dalam folder root project)
6. Pilih **"Paste"**
7. Rename file tersebut menjadi **`.env`** (hapus bagian `.example`)

**Atau**, buka terminal di VS Code dan jalankan:

```
copy .env.example .env
```

**Isi file `.env` yang benar:**

```
VITE_API_URL=https://api-fir1.onrender.com
```

**Penjelasan variabel:**

| Variabel | Nilai | Artinya |
|----------|-------|---------|
| `VITE_API_URL` | `https://api-fir1.onrender.com` | Alamat server backend yang sudah berjalan online. Semua data pendaftaran akan dikirim dan diambil dari server ini. |

> **Catatan:** Jika nilai `VITE_API_URL` tidak diisi atau file `.env` tidak ada, aplikasi akan mencoba terhubung ke `http://localhost:7000` secara default — yang kemungkinan besar tidak akan berhasil di komputer Anda. Pastikan file `.env` sudah dibuat dengan benar.

**Cara memverifikasi file `.env` sudah benar:**
1. Di VS Code, klik file `.env` di panel kiri
2. Pastikan isinya persis seperti contoh di atas
3. Simpan file (tekan **Ctrl + S**)

---

## 7. Install Dependensi

**Apa itu dependensi?**
Dependensi adalah kumpulan "library" atau kode buatan orang lain yang digunakan oleh aplikasi ini. Bayangkan seperti bahan-bahan resep masakan — Anda perlu mengumpulkan semua bahan sebelum memasak.

**Langkah instalasi:**

1. Pastikan terminal VS Code Anda terbuka dan berada di dalam folder project (`react-web`)
2. Ketik perintah berikut lalu tekan **Enter**:

```
npm install
```

> **Apa yang terjadi?** npm (Node Package Manager) akan membaca file `package.json` dan mengunduh semua library yang diperlukan dari internet ke dalam folder `node_modules`. Proses ini memerlukan koneksi internet dan bisa memakan waktu 1–5 menit.

**Output yang diharapkan** (kurang lebih seperti ini):
```
added 856 packages, and audited 857 packages in 45s
found 0 vulnerabilities
```

> **Jangan khawatir** jika muncul beberapa peringatan (`warn`) — itu normal. Yang penting tidak ada `error`.

> **Catatan:** Folder `node_modules` yang muncul setelah ini berisi ratusan file. Jangan hapus folder ini. Jika folder ini terhapus secara tidak sengaja, cukup jalankan `npm install` lagi.

---

## 8. Jalankan Aplikasi

Setelah semua langkah di atas selesai, saatnya menjalankan aplikasi!

**Perintah untuk menjalankan:**

```
npm run dev
```

> **Apa yang terjadi?** Vite (tools pengembangan) akan memulai server lokal di komputer Anda dan "mengkompilasi" kode React menjadi tampilan website yang bisa dibuka di browser.

**Output yang diharapkan di terminal:**

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

**Cara membuka aplikasi di browser:**

1. Buka browser (Google Chrome, Firefox, Edge, dll.)
2. Ketik di address bar (baris alamat di atas):

```
http://localhost:3000
```

3. Tekan **Enter**

**Anda seharusnya melihat halaman utama website PKBM Budiman Drestanta!**

---

**Apa itu "localhost"?**
`localhost` adalah cara komputer merujuk ke dirinya sendiri. Jadi `http://localhost:3000` artinya "buka website yang berjalan di komputer ini, di port 3000". Ini hanya bisa diakses dari komputer Anda sendiri.

**Apa itu "port 3000"?**
Port adalah seperti "nomor pintu" di dalam komputer. Port 3000 adalah pintu tempat aplikasi ini berjalan. Angka 3000 ditentukan di file `vite.config.ts` dan tidak perlu diubah.

---

## 9. Koneksi ke Backend (API Server)

**Apa itu backend?**
Backend adalah program server yang menyimpan data (seperti data pendaftar, akun pengguna, status pembayaran). Frontend (website yang Anda jalankan) hanya menampilkan data tersebut — data aslinya ada di backend.

**Arsitektur aplikasi ini:**

```
Browser Anda          Backend Server (sudah online)
      |                        |
      |  "Tampilkan data       |
      |   pendaftar"           |
      | ─────────────────────> |
      |                        |
      |  "Ini datanya"         |
      | <───────────────────── |
      |                        |
[http://localhost:3000]  [https://api-fir1.onrender.com]
```

**Backend sudah tersedia secara online** di:
```
https://api-fir1.onrender.com
```

Selama Anda mengisi `VITE_API_URL` dengan benar di file `.env`, aplikasi akan otomatis terhubung ke backend ini.

---

**Apa yang terjadi jika backend tidak terhubung?**

Anda akan melihat:
- Halaman kosong atau loading terus-menerus saat login/daftar
- Pesan error di browser (biasanya berupa popup atau teks merah)
- Di F12 → Console, akan muncul error seperti:
  ```
  Network Error
  Failed to fetch
  ERR_CONNECTION_REFUSED
  ```

**Cara memastikan koneksi backend berjalan:**
1. Buka browser baru
2. Ketik di address bar: `https://api-fir1.onrender.com`
3. Jika muncul halaman atau teks JSON (bukan halaman "cannot be reached"), berarti backend aktif

> **Catatan:** Backend di-host di platform gratis (Render.com). Server ini mungkin "tidur" setelah tidak aktif beberapa saat. Request pertama setelah server tidur bisa memakan waktu 30–60 detik. Ini normal.

---

## 10. Struktur Folder Project

Berikut penjelasan folder dan file penting dalam project ini:

```
react-web/
│
├── public/                  → File gambar/aset statis (logo, foto)
│   ├── logoBudiman.png      → Logo PKBM
│   └── class1.png           → Foto kelas
│
├── src/                     → Semua kode utama aplikasi
│   │
│   ├── api/                 → Semua kode yang berhubungan dengan koneksi ke backend
│   │   ├── AxiosClient.ts   → "Jembatan" antara frontend dan backend (semua pemanggilan API)
│   │   ├── api/             → Definisi tiap-tiap fungsi API (login, daftar, dll.)
│   │   └── model/           → Definisi bentuk data (User, Pendaftar, Aplikasi, dll.)
│   │
│   ├── components/          → Komponen UI yang dipakai ulang di banyak halaman
│   │   ├── DaftarSekarang.tsx  → Tombol/banner "Daftar Sekarang"
│   │   └── layout/          → Komponen tata letak (Header, Footer, dll.)
│   │
│   ├── pages/               → Halaman-halaman website
│   │   ├── homepage.tsx     → Halaman utama (beranda)
│   │   ├── tentang-kami.tsx → Halaman "Tentang Kami"
│   │   ├── program.tsx      → Halaman "Program"
│   │   ├── admisi.tsx       → Halaman "Admisi"
│   │   ├── kontak.tsx       → Halaman "Kontak"
│   │   └── user/            → Halaman khusus pengguna yang sudah login
│   │       ├── login.tsx         → Halaman login
│   │       ├── register.tsx      → Halaman daftar akun baru
│   │       ├── enroll.tsx        → Halaman pengisian formulir pendaftaran
│   │       ├── applications.tsx  → Halaman daftar pendaftaran saya
│   │       ├── user-details.tsx  → Halaman detail data peserta didik
│   │       └── payment.tsx       → Halaman pembayaran
│   │
│   ├── App.tsx              → Mengatur semua "rute" halaman (siapa yang muncul di URL mana)
│   ├── main.tsx             → Titik awal aplikasi dijalankan
│   ├── utility.ts           → Fungsi-fungsi pembantu (format uang, token login, dll.)
│   └── index.css            → Style/tampilan global aplikasi
│
├── .env                     → Konfigurasi rahasia (URL backend) — BUAT INI SENDIRI
├── .env.example             → Contoh isi file .env
├── package.json             → Daftar library yang digunakan dan perintah-perintah npm
├── vite.config.ts           → Konfigurasi Vite (port, dll.)
└── index.html               → File HTML utama (pintu masuk website)
```

**Halaman dan URL-nya:**

| URL | Halaman |
|-----|---------|
| `/` | Beranda |
| `/tentang-kami` | Tentang Kami |
| `/program` | Program Pendidikan |
| `/admisi` | Informasi Admisi |
| `/kontak` | Kontak |
| `/login` | Login Pengguna |
| `/register` | Daftar Akun Baru |
| `/enroll` | Formulir Pendaftaran |
| `/applications` | Daftar Pendaftaran Saya |
| `/user-details/:id` | Detail Peserta Didik |
| `/payment` | Pembayaran |

---

## 11. Cara Kerja Sehari-hari

### Menghentikan aplikasi
Saat terminal menampilkan server yang sedang berjalan, tekan:
```
Ctrl + C
```
Terminal akan kembali normal dan server berhenti.

### Menjalankan ulang aplikasi
Setelah dihentikan, jalankan kembali dengan:
```
npm run dev
```

### Hot Reload (perubahan otomatis tampil)
Salah satu fitur Vite adalah **hot reload** — ketika Anda menyimpan perubahan pada file kode (dengan **Ctrl + S**), browser akan otomatis memperbarui tampilan **tanpa perlu di-refresh manual**. Ini sangat membantu saat pengembangan.

### Jika menutup VS Code dan ingin lanjut bekerja
1. Buka VS Code
2. Buka folder project: **File → Open Folder → Documents → react-web**
3. Buka terminal: **Terminal → New Terminal**
4. Jalankan server: `npm run dev`
5. Buka browser ke `http://localhost:3000`

---

## 12. Error Umum dan Cara Mengatasinya

---

### Error: `'node' is not recognized as an internal or external command`

**Artinya:** Node.js belum terinstall, atau instalasi belum selesai dengan benar.

**Solusi:**
1. Pastikan Anda sudah menginstall Node.js dari https://nodejs.org
2. **Restart komputer** setelah instalasi (ini sering dilupakan)
3. Buka terminal baru (jangan gunakan terminal yang sudah terbuka sebelum instalasi)
4. Coba lagi: `node -v`

---

### Error: `'npm' is not recognized as an internal or external command`

**Artinya:** npm tidak ditemukan (npm seharusnya terinstall otomatis bersama Node.js).

**Solusi:**
1. Reinstall Node.js dari https://nodejs.org
2. Restart komputer
3. Buka terminal baru, coba: `npm -v`

---

### Error: `'git' is not recognized as an internal or external command`

**Artinya:** Git belum terinstall.

**Solusi:**
1. Install Git dari https://git-scm.com/download/win
2. Restart komputer
3. Buka terminal baru, coba: `git --version`

---

### Error: Port 3000 sudah dipakai (`Port 3000 is already in use`)

**Artinya:** Ada aplikasi lain yang sedang menggunakan port 3000.

**Solusi:**
1. Buka Command Prompt sebagai Administrator (klik kanan → "Run as Administrator")
2. Ketik perintah ini untuk melihat apa yang menggunakan port 3000:
   ```
   netstat -ano | findstr :3000
   ```
3. Catat angka PID di kolom paling kanan (contoh: `12345`)
4. Hentikan proses tersebut:
   ```
   taskkill /PID 12345 /F
   ```
5. Jalankan kembali: `npm run dev`

---

### Error: File `.env` tidak ada atau `VITE_API_URL` tidak terdefinisi

**Artinya:** File konfigurasi tidak ditemukan.

**Gejala:** Di browser, muncul error koneksi saat mencoba login atau daftar.

**Solusi:**
1. Di terminal VS Code, jalankan:
   ```
   copy .env.example .env
   ```
2. Buka file `.env` di VS Code dan pastikan isinya:
   ```
   VITE_API_URL=https://api-fir1.onrender.com
   ```
3. Simpan file (**Ctrl + S**)
4. Hentikan server (**Ctrl + C**) lalu jalankan ulang: `npm run dev`

---

### Error: `npm install` gagal atau ada error saat install

**Solusi:**
1. Pastikan koneksi internet stabil
2. Hapus folder `node_modules` dan file `package-lock.json`:
   ```
   rmdir /s /q node_modules
   del package-lock.json
   ```
3. Jalankan ulang:
   ```
   npm install
   ```

---

### Website terbuka tapi login/daftar tidak berhasil (loading terus atau error)

**Artinya:** Koneksi ke backend bermasalah.

**Solusi:**
1. Buka browser dan cek apakah backend aktif: `https://api-fir1.onrender.com`
2. Tunggu 30–60 detik jika server sedang "bangun dari tidur"
3. Pastikan file `.env` sudah benar
4. Buka DevTools di browser (**F12**) → tab **Console** untuk melihat pesan error detail

---

### Halaman menampilkan pesan "404" atau "Page not found"

**Artinya:** URL yang Anda ketik tidak ada.

**Solusi:**
- Pastikan Anda membuka `http://localhost:3000` (bukan port lain)
- Gunakan navigasi menu di website, bukan mengetik URL secara manual

---

## Ringkasan Perintah Penting

| Tujuan | Perintah |
|--------|----------|
| Install semua library | `npm install` |
| Jalankan aplikasi (mode development) | `npm run dev` |
| Hentikan aplikasi | `Ctrl + C` |
| Build untuk production | `npm run build` |

---

## Informasi Teknis Tambahan

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **CSS:** Tailwind CSS v4 + HeroUI
- **HTTP Client:** Axios
- **Routing:** React Router v7
- **Port Development:** 3000
- **Backend API:** https://api-fir1.onrender.com
- **Node.js minimum yang direkomendasikan:** v18 atau lebih baru

---

*Jika Anda mengalami masalah yang tidak tercantum di panduan ini, hubungi tim pengembang dengan menyertakan screenshot pesan error yang muncul di terminal atau browser.*
