# PPDB Web API — Panduan Lengkap untuk Pemula

> **PPDB** = Penerimaan Peserta Didik Baru (Sistem Pendaftaran Siswa Baru Berbasis Web)

---

## Daftar Isi

1. [Tentang Aplikasi Ini](#1-tentang-aplikasi-ini)
2. [Persyaratan yang Harus Diinstall](#2-persyaratan-yang-harus-diinstall)
3. [Cara Mengunduh Kode (Clone Repository)](#3-cara-mengunduh-kode-clone-repository)
4. [Buka Project di VS Code](#4-buka-project-di-vs-code)
5. [Buat File Konfigurasi (.env)](#5-buat-file-konfigurasi-env)
6. [Install Paket yang Diperlukan](#6-install-paket-yang-diperlukan)
7. [Jalankan Database Migration](#7-jalankan-database-migration)
8. [Jalankan Aplikasi](#8-jalankan-aplikasi)
9. [Cara Menggunakan Docker (Alternatif)](#9-cara-menggunakan-docker-alternatif)
10. [Daftar Endpoint API](#10-daftar-endpoint-api)
11. [Error Umum dan Cara Mengatasinya](#11-error-umum-dan-cara-mengatasinya)
12. [Struktur Folder](#12-struktur-folder)

---

## 1. Tentang Aplikasi Ini

### Apa yang dilakukan aplikasi ini?

Aplikasi ini adalah **backend API** untuk sistem pendaftaran siswa baru (PPDB) sekolah. Bayangkan seperti "otak di balik layar" yang mengelola data:

- **Pendaftaran akun** — calon siswa atau orang tua bisa daftar dan masuk
- **Data calon siswa** — simpan info seperti nama, tanggal lahir, alamat
- **Pengajuan pendaftaran** — kirim berkas ke SD, SMP, atau SMA
- **Upload dokumen** — KK, akta lahir, foto, ijazah, dll.
- **Pembayaran** — upload bukti pembayaran
- **Verifikasi admin** — admin sekolah bisa terima atau tolak pendaftaran

> **Catatan penting:** Aplikasi ini adalah **API** (Application Programming Interface), bukan website dengan tampilan. Artinya, tidak ada halaman web yang bisa dibuka di browser secara langsung — ini adalah "mesin" di balik layar yang digunakan oleh aplikasi frontend (website/mobile app) untuk berkomunikasi.

### Teknologi yang Digunakan

| Teknologi | Penjelasan Sederhana |
|-----------|----------------------|
| **Node.js** | Program yang menjalankan JavaScript di komputer (bukan di browser) |
| **TypeScript** | Versi JavaScript yang lebih aman dan terstruktur |
| **Express.js** | Framework untuk membuat server web dengan Node.js |
| **PostgreSQL** | Database (tempat menyimpan data seperti Excel, tapi lebih canggih) |
| **JWT** | Sistem "kartu tanda masuk digital" untuk login yang aman |
| **AWS S3** | Layanan cloud Amazon untuk menyimpan file (foto, dokumen) |
| **Docker** | Aplikasi yang membungkus semua kebutuhan agar bisa jalan di mana saja |

---

## 2. Persyaratan yang Harus Diinstall

Sebelum mulai, Anda perlu menginstall beberapa program di komputer Windows Anda.

---

### 2.1 Git

**Apa itu Git?**
Git adalah program untuk mengunduh dan mengelola kode dari internet. Seperti "alat download khusus untuk kode program."

**Cara Install:**

1. Buka browser dan pergi ke: **https://git-scm.com/download/win**
2. File `.exe` akan otomatis terunduh (contoh: `Git-2.x.x-64-bit.exe`)
3. Buka file yang terunduh
4. Klik **Next** terus di semua langkah (pengaturan default sudah bagus untuk pemula)
5. Klik **Install**
6. Klik **Finish**

**Cara Verifikasi:**

1. Tekan tombol **Windows** di keyboard
2. Ketik `cmd` lalu tekan **Enter** (ini membuka Command Prompt)
3. Ketik perintah ini lalu tekan Enter:
   ```
   git --version
   ```
4. Hasil yang diharapkan (angka versi mungkin berbeda):
   ```
   git version 2.47.0.windows.2
   ```
   Jika muncul teks seperti ini, berarti Git berhasil diinstall. ✅

---

### 2.2 Node.js (Versi 20)

**Apa itu Node.js?**
Node.js adalah program yang memungkinkan kode JavaScript berjalan di komputer Anda, bukan hanya di browser.

**Cara Install:**

1. Buka browser dan pergi ke: **https://nodejs.org**
2. Klik tombol **"20.x.x LTS"** (pilih versi 20, bukan versi terbaru — pastikan bertuliskan LTS)
3. File `.msi` akan terunduh (contoh: `node-v20.x.x-x64.msi`)
4. Buka file tersebut
5. Klik **Next** → centang **"I accept the terms"** → **Next** terus
6. Klik **Install**
7. Klik **Finish**

**Cara Verifikasi:**

Buka Command Prompt baru (tutup yang lama dulu, buka yang baru), lalu ketik:
```
node -v
```
Hasil yang diharapkan:
```
v20.18.0
```
Angka pertama harus **20**. ✅

Lalu ketik juga:
```
npm -v
```
Hasil yang diharapkan (angka boleh berbeda):
```
10.8.2
```
Jika keduanya muncul, Node.js berhasil diinstall. ✅

---

### 2.3 VS Code (Visual Studio Code)

**Apa itu VS Code?**
VS Code adalah program untuk membaca dan mengedit kode program. Seperti "Microsoft Word, tapi untuk kode."

**Cara Install:**

1. Buka browser dan pergi ke: **https://code.visualstudio.com**
2. Klik tombol biru **"Download for Windows"**
3. Buka file yang terunduh (contoh: `VSCodeSetup-x64-1.x.x.exe`)
4. Klik **Next** → centang **"Add to PATH"** dan **"Open with Code"** → **Next**
5. Klik **Install**
6. Klik **Finish**

**Cara Verifikasi:**

Buka VS Code dari menu Start. Jika terbuka, berarti berhasil. ✅

---

### 2.4 Docker Desktop (Opsional — hanya jika ingin pakai Docker)

**Apa itu Docker?**
Docker adalah program yang membungkus aplikasi beserta semua kebutuhannya, sehingga bisa berjalan di komputer mana saja tanpa konfigurasi tambahan.

> Jika Anda **tidak ingin menggunakan Docker**, lewati bagian ini dan lanjut ke langkah 3. Cara tanpa Docker juga sudah dijelaskan di panduan ini.

**Cara Install:**

1. Pastikan Windows Anda adalah **Windows 10 versi 1903 atau lebih baru** (atau Windows 11)
2. Buka browser dan pergi ke: **https://www.docker.com/products/docker-desktop/**
3. Klik **"Download for Windows"**
4. Buka file yang terunduh (contoh: `Docker Desktop Installer.exe`)
5. Ikuti instruksi instalasi
6. Restart komputer setelah selesai
7. Buka Docker Desktop — tunggu sampai ikon di taskbar berubah menjadi hijau (beberapa menit)

**Cara Verifikasi:**

Buka Command Prompt lalu ketik:
```
docker --version
```
Hasil yang diharapkan:
```
Docker version 27.x.x, build xxxxxxx
```
✅

---

## 3. Cara Mengunduh Kode (Clone Repository)

**Apa itu clone?**
"Clone" artinya menyalin seluruh kode dari internet (GitLab/GitHub) ke komputer Anda.

**Langkah-langkah:**

1. Buka **Command Prompt** (tekan Windows → ketik `cmd` → Enter)

2. Pindah ke folder tempat Anda ingin menyimpan project. Contoh, jika ingin simpan di Desktop:
   ```
   cd Desktop
   ```
   > **Apa ini?** `cd` = "change directory" = pindah folder. `Desktop` adalah nama folder tujuan.

3. Jalankan perintah clone (ganti `<repo-url>` dengan URL GitLab yang diberikan):
   ```
   git clone <repo-url>
   ```
   > **Apa ini?** Perintah ini mengunduh semua file kode dari GitLab ke komputer Anda dan membuat folder baru bernama `ppdb-web-api` (atau sesuai nama repo).

4. Tunggu hingga proses selesai. Akan muncul teks seperti:
   ```
   Cloning into 'ppdb-web-api'...
   remote: Enumerating objects: 150, done.
   Receiving objects: 100% (150/150), done.
   ```

5. Masuk ke folder yang baru saja diunduh:
   ```
   cd ppdb-web-api
   ```
   > **Apa ini?** Masuk ke dalam folder project. Ganti `ppdb-web-api` dengan nama folder yang sebenarnya terbuat.

6. Verifikasi Anda berada di folder yang benar:
   ```
   dir
   ```
   Anda harus melihat file-file seperti: `package.json`, `index.ts`, `Dockerfile`, `.env.example`, dll.

---

## 4. Buka Project di VS Code

1. Pastikan Anda sudah masuk ke folder project di Command Prompt (lihat langkah 3)

2. Ketik perintah ini untuk membuka VS Code langsung di folder project:
   ```
   code .
   ```
   > **Apa ini?** `code .` artinya "buka VS Code di folder saat ini (titik = folder ini)."

3. VS Code akan terbuka dengan semua file project terlihat di panel kiri.

**Membuka Terminal di dalam VS Code:**

1. Di menu atas VS Code, klik **Terminal**
2. Klik **New Terminal**
3. Sebuah panel terminal akan muncul di bagian bawah VS Code
4. Dari sini, semua perintah berikutnya bisa Anda jalankan langsung di dalam VS Code — tidak perlu buka Command Prompt terpisah.

**Ekstensi VS Code yang Disarankan:**

Install ekstensi berikut agar bekerja lebih mudah:
- Cari dan install **"Naiv Developer Tools"** (digunakan untuk melihat/edit file `.naiv`)
  - Link langsung: https://marketplace.visualstudio.com/items?itemName=NaivDeveloper.naiv-vscode-extension
- **"Thunder Client"** — untuk mengetes API langsung dari VS Code (seperti Postman tapi di dalam VS Code)

Cara install ekstensi:
1. Klik ikon kotak-kotak di panel kiri VS Code (atau tekan `Ctrl+Shift+X`)
2. Ketik nama ekstensi di kotak pencarian
3. Klik **Install**

---

## 5. Buat File Konfigurasi (.env)

### Apa itu file .env?

File `.env` adalah file konfigurasi rahasia yang berisi pengaturan penting seperti:
- Nomor port server
- Password database
- Kunci rahasia untuk login (JWT)
- Kunci AWS untuk upload file

> **Penting:** File `.env` **TIDAK** boleh diunggah ke internet (sudah diblokir oleh `.gitignore`). File ini hanya ada di komputer Anda.

### Langkah-langkah Membuat File .env

1. Di terminal VS Code (atau Command Prompt di dalam folder project), ketik:

   **Windows (Command Prompt):**
   ```
   copy .env.example .env
   ```
   > **Apa ini?** Menyalin file `.env.example` menjadi file baru bernama `.env`.

   **Atau jika menggunakan PowerShell:**
   ```
   Copy-Item .env.example .env
   ```

2. Di panel kiri VS Code, klik file `.env` untuk membukanya.

3. Anda akan melihat isi seperti ini:

```env
# SERVER PORT
PORT=9415

# DATABASE CONFIGURATION
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

### Penjelasan Setiap Variabel

| Variabel | Penjelasan | Contoh Nilai |
|----------|------------|--------------|
| `PORT` | Nomor pintu server (di sinilah aplikasi berjalan) | `9415` |
| `DATABASE_URL` | Alamat lengkap database PostgreSQL | Lihat di bawah |
| `DB_TYPE` | Jenis database (isi `postgres` jika tidak pakai DATABASE_URL) | `postgres` |
| `DB_HOST` | Alamat server database | `localhost` |
| `DB_PORT` | Nomor pintu database | `5432` |
| `DB_USERNAME` | Username database | `postgres` |
| `DB_PASSWORD` | Password database | `password123` |
| `DB_NAME` | Nama database | `ppdb` |

### Database

*** Gunakan Database Lokal (Untuk Developer)**

Jika Anda ingin menggunakan PostgreSQL di komputer sendiri:
1. Install PostgreSQL dari https://www.postgresql.org/download/windows/
2. Buat database baru bernama `ppdb`
3. Kosongkan nilai `DATABASE_URL` dan isi variabel `DB_*` individual:
   ```env
   DATABASE_URL=

   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=password_anda
   DB_NAME=ppdb
   ```

### Tambahkan JWT_SECRET_KEY

File `.env.example` tidak menyertakan `JWT_SECRET_KEY`. Tambahkan baris ini ke file `.env` Anda:

```env
JWT_SECRET_KEY=rahasia-super-panjang-dan-susah-ditebak-12345
```

> Isi dengan kata-kata acak apa saja. Semakin panjang dan acak, semakin aman.

### Contoh File .env yang Lengkap

```env
# Server
PORT=9415
JWT_SECRET_KEY=ganti-dengan-kunci-rahasia-anda-sendiri

# DB_TYPE=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=password_anda
# DB_NAME=ppdb
```

---

## 6. Install Paket yang Diperlukan

**Apa itu dependencies (paket)?**
Seperti aplikasi yang membutuhkan driver agar bisa berjalan, kode ini juga membutuhkan "paket" tambahan yang harus diunduh terlebih dahulu.

**Langkah:**

1. Buka terminal di VS Code (atau Command Prompt di folder project)
2. Pastikan Anda berada di dalam folder project (harus ada `package.json` di sana)
3. Jalankan perintah:
   ```
   npm install
   ```
   > **Apa ini?** Perintah ini membaca file `package.json` dan mengunduh semua paket yang dibutuhkan aplikasi dari internet. Hasilnya disimpan di folder `node_modules`.

4. Tunggu proses selesai (bisa memakan waktu 1–3 menit tergantung kecepatan internet)

5. Hasil yang diharapkan:
   ```
   added 350 packages, and audited 351 packages in 45s
   found 0 vulnerabilities
   ```
   > Jika ada pesan `vulnerabilities`, itu normal dan tidak menghalangi aplikasi berjalan.

---

## 7. Jalankan Database Migration

**Apa itu migration?**
Migration adalah proses "membuat atau memperbarui struktur tabel" di database. Bayangkan seperti membuat lembar Excel dengan kolom-kolom yang sudah ditentukan — migration membuat "tabel" di database agar siap menerima data.

> **Pastikan database sudah bisa diakses** sebelum menjalankan migration. Jika menggunakan `DATABASE_URL` dari Render.com, pastikan koneksi internet aktif.

**Langkah:**

1. Di terminal, jalankan:
   ```
   npm run migrate
   ```
   > **Apa ini?** Perintah ini membuat semua tabel yang dibutuhkan di database (User, Admin, Application, UserApplicant, dll.).

2. Hasil yang diharapkan:
   ```
   query: SELECT * FROM "migrations"
   query: CREATE TABLE "user" (...)
   query: CREATE TABLE "admin" (...)
   ...
   Migration 1765548300774-init has been executed successfully.
   Migration 1765730956988-changed-required-fields-application has been executed successfully.
   ...
   ```

3. Jika berhasil, database Anda sudah siap menerima data.

> **Catatan:** Jika muncul pesan `No migrations are pending`, artinya migration sudah pernah dijalankan sebelumnya dan tidak perlu diulang.

---

## 8. Jalankan Aplikasi

### Cara 1: Development Mode (Direkomendasikan untuk Belajar)

```
npm run dev
```

> **Apa ini?** Perintah ini melakukan dua hal sekaligus: (1) mengkompilasi kode TypeScript menjadi JavaScript, lalu (2) menjalankan server.

Hasil yang diharapkan:
```
Server running on port 9415
Database connection established
```

### Cara 2: Build Dulu, Lalu Jalankan (Terpisah)

Jika ingin melakukan dua langkah secara terpisah:

**Langkah 1 — Build (kompilasi TypeScript):**
```
npm run build
```
> **Apa ini?** Mengubah file `.ts` (TypeScript) menjadi file `.js` (JavaScript) yang disimpan di folder `dist/`. Ini perlu dilakukan karena Node.js tidak bisa langsung membaca TypeScript.

**Langkah 2 — Start server:**
```
npm start
```
> **Apa ini?** Menjalankan server dari file yang sudah dikompilasi di folder `dist/`.

---

### Cara Mengakses Aplikasi

Setelah server berjalan, buka browser dan ketik:

```
http://localhost:9415
```

> **Apa itu localhost?** "localhost" artinya "komputer ini sendiri." Jadi `http://localhost:9415` berarti "buka aplikasi yang berjalan di komputer ini di pintu nomor 9415."

> **Catatan:** Karena ini adalah API, membuka `http://localhost:9415` di browser mungkin tidak menampilkan halaman yang menarik. Untuk mengetes API, gunakan **Thunder Client** (ekstensi VS Code) atau **Postman** (https://www.postman.com/downloads/).

### Menghentikan Server

Tekan **Ctrl + C** di terminal untuk menghentikan server.

---

## 9. Cara Menggunakan Docker (Alternatif)

> Gunakan cara ini jika Anda sudah menginstall Docker Desktop. Docker memudahkan menjalankan aplikasi tanpa perlu install Node.js secara terpisah.

**Persyaratan:**
- Docker Desktop sudah terinstall dan berjalan (ikon hijau di taskbar)
- File `.env` sudah dibuat (lihat Langkah 5)

**Langkah:**

1. Buka terminal di folder project

2. Jalankan perintah:
   ```
   docker-compose up --build
   ```
   > **Apa ini?** Perintah ini (1) membangun "container" Docker berisi aplikasi, lalu (2) menjalankannya. Proses pertama kali bisa memakan waktu 3–10 menit.

3. Hasil yang diharapkan:
   ```
   Building naiv
   Step 1/6 : FROM node:20
   ...
   Successfully built xxxxxxxx
   boilerplate | Server running on port 9415
   ```

4. Aplikasi berjalan di: `http://localhost:9415`

**Menghentikan Docker:**
```
docker-compose down
```

> **Catatan penting:** Docker Compose tidak otomatis membaca file `.env` Anda. Jika terjadi error konfigurasi, pastikan file `.env` ada di folder yang sama dengan `docker-compose.yml`, atau tambahkan `env_file: .env` ke dalam `docker-compose.yml`.

---

## 10. Daftar Endpoint API

Berikut adalah semua endpoint (alamat URL) yang bisa diakses di aplikasi ini.

**Base URL:** `http://localhost:9415`

### Autentikasi Pengguna (User)

| Method | Endpoint | Fungsi | Perlu Login? |
|--------|----------|--------|--------------|
| `POST` | `/register` | Daftar akun baru | Tidak |
| `POST` | `/login` | Login, mendapat token | Tidak |
| `POST` | `/verify-registration-email` | Verifikasi email | Tidak |
| `GET` | `/profile` | Lihat profil sendiri | Ya |

**Contoh body untuk `/register`:**
```json
{
  "fullname": "Budi Santoso",
  "email": "budi@email.com",
  "phone_number": "081234567890",
  "password": "password123"
}
```

**Contoh body untuk `/login`:**
```json
{
  "email": "budi@email.com",
  "password": "password123"
}
```

---

### Autentikasi Admin

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/admin/register` | Daftar akun admin baru |
| `POST` | `/admin/login` | Login admin |

---

### Data Calon Siswa (Applicant)

> Semua endpoint ini memerlukan header: `Authorization: Bearer <token>`

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `GET` | `/user/applicants` | Lihat semua calon siswa milik saya |
| `POST` | `/user/applicant` | Tambah calon siswa baru |
| `PUT` | `/user/applicant/:id` | Update data calon siswa |
| `DELETE` | `/user/applicant/:id` | Hapus calon siswa |

**Contoh body untuk `/user/applicant`:**
```json
{
  "fullname": "Andi Budi",
  "email": "andi@email.com",
  "phone_number": "089876543210",
  "address": "Jl. Melati No. 5, Jakarta",
  "gender": "M",
  "birth_date": "2010-05-15",
  "birth_place": "Jakarta",
  "religion": "Islam"
}
```

---

### Pendaftaran Sekolah (Application)

> Semua endpoint ini memerlukan header: `Authorization: Bearer <token>`

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `GET` | `/user/applications` | Lihat semua pendaftaran saya |
| `GET` | `/user/application/:id` | Lihat detail satu pendaftaran |
| `POST` | `/user/application` | Kirim pendaftaran baru |
| `PUT` | `/user/application/:id` | Update pendaftaran |
| `DELETE` | `/user/application/:id` | Hapus pendaftaran |
| `PUT` | `/user/application/payment/:id` | Upload bukti pembayaran |

---

### Panel Admin

> Semua endpoint ini memerlukan header: `Authorization: Bearer <admin-token>`

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `GET` | `/admin/applications` | Lihat semua pendaftaran |
| `GET` | `/admin/application/:id` | Lihat detail pendaftaran |
| `PUT` | `/admin/application/:id` | Verifikasi/tolak pendaftaran |
| `PUT` | `/admin/application/payment/:id` | Verifikasi pembayaran |

---

### Upload File

| Method | Endpoint | Fungsi | Perlu Login? |
|--------|----------|--------|--------------|
| `POST` | `/upload` | Upload file ke AWS S3 | Ya (Admin) |

---

## 11. Error Umum dan Cara Mengatasinya

### ❌ `'node' is not recognized as an internal or external command`

**Penyebab:** Node.js belum terinstall atau perlu restart Command Prompt.

**Solusi:**
1. Pastikan Node.js sudah diinstall (lihat Langkah 2.2)
2. Tutup Command Prompt dan buka yang baru
3. Coba lagi `node -v`

---

### ❌ `'git' is not recognized as an internal or external command`

**Penyebab:** Git belum terinstall atau perlu restart.

**Solusi:**
1. Pastikan Git sudah diinstall (lihat Langkah 2.1)
2. Tutup dan buka ulang Command Prompt
3. Coba lagi `git --version`

---

### ❌ `Cannot find module` atau `Error: Cannot find module './dist/index.js'`

**Penyebab:** Aplikasi belum dikompilasi (build).

**Solusi:**
```
npm run build
```
Setelah selesai, coba jalankan lagi.

---

### ❌ `Error: connect ECONNREFUSED` atau `database connection failed`

**Penyebab:** Tidak bisa terhubung ke database.

**Solusi:**
1. Periksa file `.env` — pastikan `DATABASE_URL` sudah diisi
2. Pastikan koneksi internet aktif (jika database di Render.com atau Supabase)
3. Pastikan database belum kedaluwarsa/dihapus
4. Cek apakah URL database sudah benar (tidak ada salah ketik)

---

### ❌ `EADDRINUSE: address already in use :::9415`

**Penyebab:** Port 9415 sudah digunakan oleh aplikasi lain atau server yang masih berjalan.

**Solusi:**

Option 1 — Hentikan proses yang menggunakan port itu:
```
# Di Command Prompt (jalankan sebagai Administrator):
netstat -ano | findstr :9415
```
Cari PID (angka terakhir), lalu:
```
taskkill /PID <angka-pid> /F
```

Option 2 — Ganti port di file `.env`:
```env
PORT=3000
```
Lalu akses aplikasi di `http://localhost:3000`

---

### ❌ `npm install` gagal dengan error `EACCES` atau permission denied

**Solusi:**
1. Tutup VS Code dan Command Prompt
2. Buka Command Prompt sebagai **Administrator** (klik kanan → Run as administrator)
3. Navigasi ke folder project dan jalankan `npm install` lagi

---

### ❌ File `.env` tidak ditemukan / `JWT_SECRET_KEY is not defined`

**Penyebab:** File `.env` belum dibuat.

**Solusi:**
```
copy .env.example .env
```
Lalu edit file `.env` dan tambahkan `JWT_SECRET_KEY=kunci-rahasia-anda`.

---

### ❌ Docker: `Cannot connect to the Docker daemon`

**Penyebab:** Docker Desktop belum berjalan.

**Solusi:**
1. Cari Docker Desktop di menu Start Windows
2. Klik untuk membuka
3. Tunggu sampai ikon di taskbar berwarna hijau (beberapa menit)
4. Jalankan kembali perintah Docker

---

### ❌ `npm run migrate` gagal dengan `relation already exists`

**Penyebab:** Migration sudah pernah dijalankan sebelumnya.

**Solusi:** Ini bukan error. Pesan ini berarti tabel sudah ada di database — tidak perlu melakukan apa pun.

---

## 12. Struktur Folder

Berikut penjelasan sederhana setiap folder dan file penting:

```
ppdb-web-api/
│
├── design/              ← Blueprint/rancangan API dan database (file .naiv)
│   ├── db.naiv          ← Definisi tabel database (User, Admin, Application, dll.)
│   ├── api-user-auth.naiv    ← Rancangan endpoint login/register user
│   ├── api-admin-auth.naiv   ← Rancangan endpoint login/register admin
│   ├── api-user-applicants.naiv  ← Rancangan endpoint data calon siswa
│   ├── api-user-application.naiv ← Rancangan endpoint pendaftaran
│   └── ...
│
├── types/               ← Kode TypeScript yang AUTO-DIBUAT dari folder design
│   ├── api/             ← Tipe data untuk setiap request/response API
│   └── model/           ← Model database (tabel, enum)
│       ├── enum/        ← Pilihan tetap (Gender, Status, dll.)
│       └── table/       ← Definisi tabel (User.ts, Admin.ts, Application.ts, dll.)
│
├── implementation/      ← LOGIKA UTAMA aplikasi (ditulis manual oleh developer)
│   ├── loginUser.ts     ← Kode untuk proses login user
│   ├── registerNewUser.ts ← Kode untuk proses registrasi
│   ├── userCreateApplication.ts ← Kode untuk membuat pendaftaran
│   └── ...              ← (satu file untuk setiap endpoint)
│
├── migration/           ← Skrip untuk membuat/mengubah struktur database
│   └── *.ts             ← Setiap file = satu perubahan database
│
├── dist/                ← Hasil kompilasi TypeScript (AUTO-DIBUAT saat build)
│   └── ...              ← Jangan edit file di sini!
│
├── node_modules/        ← Semua paket yang diunduh (AUTO-DIBUAT saat npm install)
│   └── ...              ← Jangan edit isi folder ini!
│
├── uploads/             ← Folder sementara saat upload file
│
├── index.ts             ← TITIK MASUK UTAMA — mengatur dan menjalankan server
├── data-source.ts       ← Konfigurasi koneksi database
├── jwt.ts               ← Utilitas untuk membuat dan memverifikasi token login
├── upload.ts            ← Handler untuk upload file ke AWS S3
│
├── .env                 ← Konfigurasi rahasia Anda (BUAT SENDIRI, jangan dishare!)
├── .env.example         ← Contoh konfigurasi (boleh dibuka dan dilihat)
├── .gitignore           ← Daftar file yang tidak diunggah ke Git
│
├── package.json         ← Daftar paket yang dibutuhkan + perintah (scripts)
├── tsconfig.json        ← Pengaturan kompilasi TypeScript
├── Dockerfile           ← Instruksi untuk membuat container Docker
└── docker-compose.yml   ← Konfigurasi menjalankan Docker
```

### Ringkasan Alur Kerja Aplikasi

```
File .naiv (design)
       ↓  npm run codegen
    types/ (auto-generated)
       ↓  developer menulis
implementation/ (logika bisnis)
       ↓  npm run build
    dist/ (compiled JavaScript)
       ↓  npm start
  Server berjalan di port 9415
```

---

## Ringkasan Perintah Penting

| Perintah | Fungsi |
|----------|--------|
| `npm install` | Unduh semua paket yang diperlukan |
| `npm run migrate` | Buat/update struktur tabel di database |
| `npm run build` | Kompilasi TypeScript → JavaScript |
| `npm start` | Jalankan server (perlu build dulu) |
| `npm run dev` | Build + jalankan server (satu perintah) |
| `npm run codegen` | Buat ulang types dari file desain .naiv |
| `docker-compose up --build` | Jalankan semua layanan via Docker |
| `docker-compose down` | Hentikan semua layanan Docker |

---

## Butuh Bantuan?

Jika Anda menemui masalah yang tidak ada di daftar di atas:

1. **Baca pesan error dengan cermat** — biasanya pesan error menjelaskan apa yang salah
2. **Cari di Google** dengan menyertakan pesan error yang muncul
3. **Cek koneksi internet** — banyak proses (install, database, AWS) membutuhkan internet
4. **Restart terminal** — terkadang membantu menyelesaikan masalah path/environment

---

*Panduan ini ditulis berdasarkan analisis lengkap kode sumber. Jika ada bagian yang tidak jelas atau ada perubahan pada kode, panduan ini perlu diperbarui.*
