# #22 — Migration tidak idempotent → partial state

**Indeks:** [`README.md`](./README.md) · **ID:** `#22` · **Kategori:** Database & transaksi

---

## Ringkasan

Skrip migrasi yang diasumsikan **hanya berjalan sekali** bisa gagal di tengah—misalnya setelah menambahkan kolom tetapi sebelum membuat indeks—lalu dijalankan ulang dan **gagal lagi** karena objek sudah setengah ada. Lingkungan production berada dalam **partial state** yang tidak sesuai kode aplikasi mana pun. Recovery manual rawan error terutama di tim kecil healthcare IT.

---

## Mitigasi ideal (~60 detik)

“Migrasi harus **idempotent** atau minimal **two-phase dengan checkpoint**: gunakan `IF NOT EXISTS`, cek versi skema di tabel meta, atau gunakan tooling migrasi yang mencatat batch. Kalau gagal tengah jalan, rerun harus **melanjutkan aman**. Hindari SQL manual satu kali tanpa rekaman. Untuk healthcare, dokumentasikan **rollback** atau ‘forward fix’ yang telah diuji pada restore DB.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Idempotent migration:** menyatakan dunia target yang sama berapa pun kali menjalankan dari titik yang sama dengan kondisi awal identik.
- **Schema drift:** ketidaksesuaian antara repo migrasi dan DB aktual.

---

## Mengapa pola ini sangat umum di healthcare

1. Migrasi mendesak malam operasi dengan tekanan waktu.
2. Kombinasi tooling (Flyway vs manual hotfix).
3. Multi-region dengan eksekusi tidak sinkron.

---

## Pola gagal (ilustrasi)

Shell SQL panjang tanpa transaksi tepi—statement ke-7 gagal, 1–6 tetap efektif.

---

## Gejala di production

- Error startup aplikasi menyebutkan kolom hilang atau indeks duplicate.
- Environment staging vs prod perilaku berbeda.

---

## Diagnosis

1. Compare `information_schema` dengan ekspektasi repo.
2. Audit log CI/CD untuk migrasi yang gagal tetapi dianggap sukses.

---

## Mitigasi yang disarankan

1. Migrasi dengan transaksi tertutup ketika DB mendukung DDL transaksional atau pecah menjadi langkah kecil aman.
2. **Checksum** pada tabel migration history.
3. Playbook untuk **repair script** eksplisit.

---

## Trade-off dan risiko

- DDL transaksi penuh tidak selalu didukung—gunakan advisory lock atau migrasi singleton.

---

## Aspek khusus healthcare

- Jam kritis menekan operator untuk “skip error”—mencegah dengan otomasi yang jelas.

---

## Checklist review PR

- [ ] Migrasi baru dapat dijalankan ulang tanpa error pada DB yang sudah setengah update.

---

## Kata kunci untuk pencarian

`idempotent migration`, `schema migration`, `partial migration`, `flyway repair`

---

## Catatan tambahan operasional

Lakukan dry-run migrasi pada salinan snapshot anonim untuk memvalidasi urutan statement.

Simpan skrip **repair** yang telah ditinjau QA untuk skenario partial migration—on-call tidak boleh menulis SQL ad hoc tanpa dokumen saat tekanan insiden.

Versikan file migrasi dengan tagging Git yang dapat dilacak ke artefakt pipeline deploy.

---

## Referensi internal

- [`README.md`](./README.md) · **#21**.
