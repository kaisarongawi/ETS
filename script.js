
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

    $("pesan").textContent = "";

if (!keterangan) {
    $("pesan").textContent = "Keterangan harus diisi.";
    $("keterangan").focus();
    return;
}

if ($("nominal").value === "" ||
    !Number.isFinite(nominal) || nominal <= 0) {
    $("pesan").textContent = "Nominal harus lebih dari 0.";
    $("nominal").focus();
    return;
}

if (!tanggal) {
    $("pesan").textContent = "Tanggal harus diisi.";
    $("tanggal").focus();
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


function render() {
    const daftar = $("daftar-transaksi");
    daftar.innerHTML = "";

    const transaksi = [...data.transaksi].sort(function (a, b) {
        return b.tanggal.localeCompare(a.tanggal) || b.id - a.id;
    });

    if (transaksi.length === 0) {
        const kosong = document.createElement("li");
        kosong.textContent = "Belum ada transaksi.";
        daftar.appendChild(kosong);
        return;
    }

    transaksi.forEach(function (t) {
        const item = document.createElement("li");

        const nama = document.createElement("strong");
        nama.textContent = t.keterangan;

        const detail = document.createElement("p");
        detail.textContent = t.kategori + " • " + t.tanggal;

        const jumlah = document.createElement("p");
        jumlah.textContent =
            (t.jenis === "masuk" ? "+ " : "- ") + rupiah(t.nominal);

        jumlah.style.color =
            t.jenis === "masuk" ? "#1f7a5c" : "#b4233c";

        const hapus = document.createElement("button");
        hapus.textContent = "Hapus";
        hapus.type = "button";

        hapus.addEventListener("click", function () {
            if (confirm("Yakin ingin menghapus transaksi ini?")) {
                data.transaksi = data.transaksi.filter(function (x) {
                    return x.id !== t.id;
                });

                simpanData();
                render();
            }
        });

        item.append(nama, detail, jumlah, hapus);
        daftar.appendChild(item);
    });

    renderRingkasan();
}

function renderRingkasan() {}