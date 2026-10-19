
const KUNCI = "dompetku-v1";

const KATEGORI = {
    masuk: ["Uang Bulanan", "Gaji", "Bonus", "Usaha", "Lainnya"],
    keluar: ["Makanan", "Transportasi", "Tagihan", "Belanja", "Hiburan", "Kesehatan", "Lainnya"]
};

let data = muatData();

function $(id) {
    return document.getElementById(id);
}

function muatData() {
    try {
        const hasil = JSON.parse(localStorage.getItem(KUNCI));

        if (hasil) {
            return {
                transaksi: Array.isArray(hasil.transaksi) ? hasil.transaksi : [],
                uangBulanan: Number(hasil.uangBulanan) || 0
            };
        }
    } catch (e) {}

    return { transaksi: [], uangBulanan: 0 };
}

function simpanData() {
    localStorage.setItem(KUNCI, JSON.stringify(data));
}

function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function hariIni() {
    const tanggal = new Date();

    return tanggal.getFullYear() + "-" +
        String(tanggal.getMonth() + 1).padStart(2, "0") + "-" +
        String(tanggal.getDate()).padStart(2, "0");
}

function ubahKategori() {
    const jenis = $("jenis").value;
    const kategori = $("kategori");

    kategori.innerHTML = "";

    KATEGORI[jenis].forEach(function (nama) {
        const pilihan = document.createElement("option");
        pilihan.value = nama;
        pilihan.textContent = nama;
        kategori.appendChild(pilihan);
    });
}

$("jenis").addEventListener("change", ubahKategori);

$("tambah").addEventListener("click", function () {
    const keterangan = $("keterangan").value.trim();
    const nominal = Number($("nominal").value);
    const tanggal = $("tanggal").value;

    if (!keterangan || !nominal || nominal <= 0 || !tanggal) {
        $("pesan").textContent = "Lengkapi semua kolom dengan benar.";
        return;
    }

    const transaksi = {
        id: Date.now(),
        keterangan: keterangan,
        jenis: $("jenis").value,
        kategori: $("kategori").value,
        nominal: nominal,
        tanggal: tanggal
    };

    data.transaksi.push(transaksi);
    simpanData();

    $("pesan").textContent = "Transaksi berhasil disimpan.";
    $("keterangan").value = "";
    $("nominal").value = "";
    render();
});

$("tanggal").value = hariIni();
ubahKategori();
render();

function render() {}