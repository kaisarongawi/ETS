# Proses Pengerjaan

## 1. Persona dan Permasalahan

Persona yang saya dapatkan adalah mahasiswa kos yang menerima uang bulanan tetap dari orang tua. Mahasiswa tersebut sering kehabisan uang sebelum akhir bulan karena pengeluaran sehari-hari kurang terkontrol.

Aplikasi Personal Money Management dibuat untuk membantu mahasiswa kos mencatat transaksi dan mengetahui batas penggunaan uang harian berdasarkan sisa uang yang dimiliki.

## 2. Rancangan Struktur Data

### A. Data Transaksi

Setiap transaksi disimpan sebagai objek dengan struktur berikut:

```javascript
{
    id: 1739251200000,
    tanggal: "2026-10-12",
    jenis: "pengeluaran",
    kategori: "Makan",
    nominal: 25000,
    catatan: "Makan siang"
}
```

Keterangan:
- `id`: identitas unik transaksi.
- `tanggal`: tanggal transaksi.
- `jenis`: pemasukan atau pengeluaran.
- `kategori`: kategori transaksi, misalnya Makan, Transportasi, Kuliah, atau Lainnya.
- `nominal`: nominal transaksi dalam bentuk angka.
- `catatan`: keterangan tambahan yang bersifat opsional.

### B. Data Uang Bulanan

Nominal uang bulanan disimpan secara terpisah dari daftar transaksi, misalnya menggunakan key `uangBulanan` di LocalStorage.

Contoh:

```javascript
localStorage.setItem("uangBulanan", "1500000");
```

Nominal tersebut perlu dikonversi menjadi angka ketika digunakan dalam perhitungan.

### C. Penyimpanan Data

Daftar transaksi disimpan dalam bentuk array objek. `JSON.stringify()` digunakan untuk mengubah array menjadi string sebelum disimpan ke LocalStorage, sedangkan `JSON.parse()` digunakan untuk membaca kembali data tersebut.

Contoh key penyimpanan:
- `transaksi`: daftar seluruh transaksi.
- `uangBulanan`: nominal uang bulanan mahasiswa.

## 3. Rancangan Perhitungan Keuangan

### A. Saldo

Saldo dihitung dari total pemasukan dikurangi total pengeluaran.

Saldo = Total Pemasukan − Total Pengeluaran

### B. Sisa Uang

Sisa uang dihitung berdasarkan uang bulanan ditambah uang sisa dari uang bulanan sebelumnya, kemudian dikurangi pengeluaran yang tercatat pada bulan berjalan.

### C. Jatah Harian

Jatah harian dihitung dengan membagi sisa uang dengan jumlah hari yang tersisa dalam bulan berjalan.

Jatah Harian = Sisa Uang ÷ Sisa Hari

Perhitungan harus menggunakan tanggal saat ini dan menghindari pembagian dengan nol. Definisi sisa hari harus konsisten, termasuk keputusan apakah hari ini ikut dihitung.

### D. Peringatan Pengeluaran

Aplikasi membandingkan total pengeluaran hari ini dengan jatah harian. Jika total pengeluaran hari ini melebihi jatah harian, aplikasi menampilkan peringatan kepada pengguna.

## 4. Keputusan Desain

Keputusan desain yang direncanakan adalah menggunakan LocalStorage untuk menyimpan transaksi dan nominal uang bulanan.

Alasannya adalah aplikasi ini hanya menggunakan HTML, CSS, dan JavaScript tanpa memerlukan backend atau database server. LocalStorage juga memungkinkan data tetap tersedia ketika halaman di-refresh atau browser ditutup pada browser yang sama.

Keterbatasannya adalah data tidak otomatis tersinkronisasi ke browser atau perangkat lain.

## 5. Bug atau Kendala yang Ditemui

Bagian ini harus diisi berdasarkan bug atau kendala yang benar-benar ditemukan selama implementasi.

### Bug 1
- **Masalah:** (Tuliskan gejala yang benar-benar terjadi.)
- **Penyebab:** (Jelaskan penyebab setelah memeriksa kode.)
- **Solusi:** (Tuliskan perubahan yang dilakukan.)
- **Pengujian:** (Jelaskan cara memastikan bug sudah teratasi.)

### Bug 2
- **Masalah:** (Tuliskan gejala yang benar-benar terjadi.)
- **Penyebab:** (Jelaskan penyebab setelah memeriksa kode.)
- **Solusi:** (Tuliskan perubahan yang dilakukan.)
- **Pengujian:** (Jelaskan cara memastikan bug sudah teratasi.)

## 6. Catatan Proses Pengerjaan

Catat perkembangan pengerjaan pada setiap checkpoint.

- **Checkpoint 1:** Menyimpan data menggunakan LocalStorage.
- **Checkpoint 2:** (Fitur yang selesai dan commit yang dibuat.)
- **Checkpoint 3:** (Fitur yang selesai dan commit yang dibuat.)

Setiap perubahan sebaiknya disertai commit dengan pesan yang menjelaskan pekerjaan yang dilakukan.
