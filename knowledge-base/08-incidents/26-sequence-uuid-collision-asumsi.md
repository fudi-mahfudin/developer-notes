# #26 — Asumsi penanganan sequence / UUID collision salah

**Indeks:** [`README.md`](./README.md) · **ID:** `#26` · **Kategori:** Database & transaksi

---

## Ringkasan

**UUID v4** secara praktis unik, tetapi aplikasi kadang menambahkan **optimasi prematur**—misalnya retry tanpa batas saat collision yang mustahil—atau sebaliknya mengabaikan kemungkinan collision pada **random yang dihasilkan JS** non-kriptografis. **Sequences** dapat loncat atau overlap jika restore backup tidak mengatur `setval` dengan benar. Di sistem healthcare, ID yang bentrok dapat menyatukan catatan pasien yang salah—insiden sangat serius meskipun probabilitas matematis kecil.

---

## Mitigasi ideal (~60 detik)

“Gunakan **UUID v4 kriptografis** atau **ULID** dengan generator yang benar; simpan dengan **unique constraint** sehingga collision menjadi error yang ditangani. Untuk sequence setelah restore, jalankan **`setval`** sesuai max ID. Jangan mengandalkan random `Math.random` untuk ID medis. Kalau menggabungkan sistem, gunakan **namespace prefix** atau ID terpisah untuk menghindari tabrakan rentang.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Collision handling:** upsert atau regenerate bounded retry pada pelanggaran unik.
- **Sequence repair:** menyelaraskan sequence dengan data aktual pasca-restore.

---

## Mengapa pola ini sangat umum di healthcare

1. Migrasi data historis dari banyak sumber ke satu PK.
2. Generator ID di klien browser untuk offline-first form.
3. Restore partial tanpa playbook sequence.

---

## Pola gagal (ilustrasi)

`Math.random().toString(36)` sebagai primary key.

---

## Gejala di production

- Violation unik sangat jarang tetapi fatal—dua pasien berbagi ID internal.

---

## Diagnosis

1. Audit generator ID di seluruh codebase.
2. Verifikasi `setval` setelah restore drill.

---

## Mitigasi yang disarankan

1. Gunakan `uuid`/`crypto.randomUUID` di Node 16+.
2. Constraint unik + monitoring insert error.
3. Proses merge MPI mengikuti [#94](94-mpi-match-threshold-longgar-ketat.md).

---

## Trade-off dan risiko

- UUID string lebih besar daripada bigint—pertimbangkan indeks dan storage.

---

## Aspek khusus healthcare

- Kesalahan identitas pasien berisiko tinggi—prosedur bedah salah pasien.

---

## Checklist review PR

- [ ] Tidak ada generator ID lemah untuk entitas PHI.

---

## Kata kunci untuk pencarian

`UUID`, `crypto.randomUUID`, `sequence setval`, `collision`

---

## Catatan tambahan operasional

Sertakan langkah sequence alignment dalam runbook disaster recovery tahunan.

Validasi bahwa layanan yang menghasilkan ID di **edge** (browser/mobile) tidak memakai generator yang dapat diprediksi atau duplikat saat offline sync digabungkan ke server pusat.

Periksa juga konsistensi **snowflake-style ID** lintas zona waktu dan reset clock—meski jarang, skew sistem dapat menyebabkan urutan yang tidak diharapkan pada laporan urut kronologis.

Secara berkala audit **kolom surrogate** yang dihasilkan klien versus server untuk memastikan tidak ada jalur duplikat yang lolos dari constraint.

---

## Referensi internal

- [`README.md`](./README.md) · **#25**.
