# #43 — TTL distributed lock terlalu pendek → double execution

**Indeks:** [`README.md`](./README.md) · **ID:** `#43` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

**Distributed lock** (Redis Redlock, DynamoDB lock, dll.) memakai TTL untuk auto-release saat pemegang crash. Jika TTL **lebih pendek** dari durasi pekerjaan nyata—misalnya job batch billing memakan 15 menit tetapi lock 60 detik—pemroses lain dapat mengambil lock dan menjalankan **duplikasi pekerjaan**. Di healthcare, ini berarti klaim ulang, sinkronisasi duplikat, atau pengiriman notifikasi berulang.

---

## Mitigasi ideal (~60 detik)

“TTL harus **lebih besar** dari worst-case durasi job ditambah margin—atau gunakan **lease renewal / heartbeat** thread yang memperpanjang lock secara berkala selama job masih hidup. Monitor **lock steal events**. Untuk cron overlap, kombinasikan dengan [#41](41-cron-overlap-job-lama-belum-selesai.md). Di healthcare, double batch billing bisa melanggar peraturan payer—prioritas tinggi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Lease extension:** memperpanjang TTL kunci selama worker masih progres.
- **Fence token:** token monotonik untuk mendeteksi writer kadaluarsa.

---

## Mengapa pola ini sangat umum di healthcare

1. Job semula cepat tetapi data tumbuh tanpa update TTL.
2. GC pause atau stop-the-world JVM mitra memperpanjang runtime Node worker.
3. Konfigurasi default library terlalu konservatif.

---

## Pola gagal (ilustrasi)

`SET lock 30s` untuk impor CSV besar—worker lain mulai impor kedua.

---

## Gejala di production

- Duplikat baris summary klaim atau duplikat push notifikasi persis bersamaan.

---

## Diagnosis

1. Log ketika lock acquired twice untuk job id sama.
2. Bandingkan histogram durasi job vs TTL.

---

## Mitigasi yang disarankan

1. Heartbeat renewal dengan jitter.
2. Tingkatkan TTL berdasarkan persentil durasi historis.
3. Gunakan queue dengan single consumer per partition sebagai alternatif.

---

## Trade-off dan risiko

- TTL sangat panjang dapat menahan recovery jika worker crash tanpa release—perlu watchdog.

---

## Aspek khusus healthcare

- Double posting ke EHR eksternal dapat menyebabkan inkonsistensi rekam medis—fence token membantu.

---

## Checklist review PR

- [ ] Lock TTL untuk job berat ditinjau dengan metrik durasi aktual.

---

## Kata kunci untuk pencarian

`distributed lock`, `Redlock`, `lease renewal`, `fence token`

---

## Catatan tambahan operasional

Uji dengan **delay artifisial** pada staging untuk mensimulasikan GC atau jaringan lambat yang memperpanjang runtime job.

Catat **fence token** atau monotonic job version pada log agar RCA dapat membedakan eksekusi sah versus duplikat ketika lock kedaluwarsa.

Rangkul **mean dan p99 durasi job** dalam dashboard observabilitas sebagai input penyesuaian TTL berkala.

Arsipkan perubahan TTL dalam **changelog operasi** agar penyesuaian tidak hanya hidup di chat tim.

---

## Referensi internal

- [`README.md`](./README.md) · **#41**, **#44**.
