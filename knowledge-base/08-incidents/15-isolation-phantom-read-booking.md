# #15 — Isolation level → phantom read pada skenario booking

**Indeks:** [`README.md`](./README.md) · **ID:** `#15` · **Kategori:** Database & transaksi

---

## Ringkasan

Pada **READ COMMITTED**, rentang yang dibaca dua kali dalam transaksi dapat berubah karena insert paralel—**phantom**—menyebabkan dua pengguna melihat slot tersedia dan berhasil commit oversubscribe. Di healthcare booking, phantom reads atau **lost update** pada counter slot menghasilkan double booking meskipun UI tampak valid.

---

## Mitigasi ideal (~60 detik)

“Masalahnya race pada rentang slot saat isolation default tidak melindungi rentang waktu. Mitigasinya: gunakan **SELECT … FOR UPDATE** pada baris slot yang relevan, atau **serializable** untuk transaksi sangat pendek yang mengatur slot; alternatif **optimistic** dengan kolom **version** dan gagal commit jika tidak cocok—UI harus retry. Hindari mengandalkan read biasa untuk menentukan ketersediaan akhir. Untuk healthcare, bisnis harus mendefinisikan apakah double booking boleh zero toleransi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Phantom:** baris baru muncul dalam rentang query yang sebelumnya kosong dalam transaksi yang sama.
- **Serializable anomaly:** beberapa fenomena gabungan termasuk phantom tergantung engine.

---

## Mengapa pola ini sangat umum di healthcare

1. Slot terbatas dengan permintaan bersamaan tinggi.
2. Default isolation ORM sering READ COMMITTED.
3. Microservice tanpa koordinasi lock yang sama.

---

## Pola gagal (ilustrasi)

Dua request membaca `remaining > 0` lalu update tanpa proteksi versi—keduanya berhasil.

---

## Gejala di production

- Double booking dilaporkan oleh pasien/klinik sporadis—sulit direproduksi.

---

## Diagnosis

1. Uji konkurensi dengan harness yang menembak endpoint bersamaan.
2. Periksa apakah ada **unique constraint** pada kombinasi slot+waktu yang seharusnya.

---

## Mitigasi yang disarankan

1. Constraint unik di DB untuk kombinasi yang harus unik.
2. Lock pesimis singkat pada row slot.
3. Optimistic retry dengan UX yang jelas.

---

## Trade-off dan risiko

- Serializable meningkatkan kemungkinan deadlock—kombinasikan dengan retry [#12](12-deadlock-urutan-akses-resource.md).

---

## Aspek khusus healthcare

- OK bed dan prosedur invasif—oversubscribe berisiko keselamatan pasien.

---

## Checklist review PR

- [ ] Endpoint booking punya strategi konkurensi terdokumentasi.
- [ ] Tes paralel minimal untuk slot langka.

---

## Kata kunci untuk pencarian

`phantom read`, `serializable`, `SELECT FOR UPDATE`, `optimistic locking`

---

## Catatan tambahan operasional

Pertimbangkan **application-level queue** per dokter untuk serialisasi booking tanpa menekan DB berlebihan.

Uji race dengan **property-based** atau **stress test** yang menembak ratusan permintaan paralel ke slot yang sama—angka keberhasilan ganda harus nol sesuai kebijakan rumah sakit.

Dokumentasikan perilaku sistem ketika antrean booking memakai **campuran slot online dan walk-in**—interaksi lock bisa berbeda per saluran.

---

## Referensi internal

- [`README.md`](./README.md) · **#13**.
