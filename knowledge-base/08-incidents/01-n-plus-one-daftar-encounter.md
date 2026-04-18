# #01 — N+1 query pada daftar encounter

**Indeks:** [`README.md`](./README.md) · **ID:** `#01` · **Kategori:** Database & transaksi

---

## Ringkasan

**N+1 query** terjadi ketika aplikasi menjalankan **satu query** untuk mengambil daftar encounter (misalnya 50 baris), lalu menjalankan **satu query tambahan per baris** untuk mengisi relasi—detail pasien, lokasi kunjungan, diagnosis ringkas, atau status penagihan. Total menjadi **1 + N** query. Di production, pola ini mudah mengubah endpoint yang “cepat di staging” menjadi bottleneck yang membanjiri connection pool database dan menaikkan tail latency secara dramatis.

Dokumen ini menjelaskan pola gagal yang umum pada **stack JavaScript** (Node.js + ORM seperti Prisma, TypeORM, Sequelize, Drizzle, atau query builder), cara mendeteksi di production, dan strategi perbaikan yang realistis untuk domain **healthcare**.

## Mitigasi ideal (~60 detik)

“N+1 itu pola di mana kita sudah punya daftar encounter dari satu query, lalu untuk tiap baris kita panggil database lagi—misalnya ambil pasien, lokasi, atau charge—sehingga totalnya satu ditambah N query. Mitigasinya: **hilangkan query di dalam loop.** Cara praktisnya tiga jalur—pertama, **satu query dengan JOIN atau eager loading** yang sudah diverifikasi lewat log SQL benar-benar satu round-trip; kedua, kalau join terlalu berat atau relasinya one-to-many, **batch**: kumpulkan ID unik lalu satu query `WHERE id IN (...)` per jenis entitas, lalu map di memori—itu pola DataLoader di GraphQL; ketiga, untuk layar daftar saja, **turunkan projection**: endpoint list hanya mengembalikan kolom yang UI butuhkan, bukan seluruh graph domain. Setelah refactor, saya ukur lagi **jumlah query per HTTP request** dan latency di staging dengan volume mirip prod; kalau masih naik linear dengan page size, berarti masih ada relasi yang kebobolan. Sekalian pastikan filter **tenant/fasilitas** dan index di foreign key ikut masuk di query utama, supaya mitigasi performa tidak mengorbankan akses data yang benar.”

*Perkiraan durasi ucapan: ~55–65 detik (Bahasa Indonesia, tempo presentasi teknis).*

---

## Definisi operasional

Misalkan endpoint `GET /api/encounters?patientId=…&limit=50` mengembalikan daftar encounter untuk UI daftar kunjungan (timeline klinis).

- **Query pertama:** mengambil baris encounter yang memenuhi filter (tanggal, fasilitas, status).
- **N query berikutnya:** untuk setiap `encounter.id`, aplikasi mengambil entitas terkait—contoh paling klasik: profil pasien singkat, nama departemen, atau daftar charge yang belum diposting.

Secara matematis, untuk **N** encounter pada halaman tersebut, sistem menjalankan **1 + k×N** query jika ada **k** jenis relasi yang di-load per baris di dalam loop. Itu masih disebut keluarga masalah “N+1” meskipun faktor pengalinya bukan satu.

---

## Mengapa pola ini sangat umum di healthcare

1. **Model domain kaya relasi.** Encounter mengait ke pasien, provider, lokasi (room/bed), episode of care, asuransi, dan dokumen—tim cenderung menambahkan “include” bertahap tanpa mengukur query count.
2. **Presenter / DTO berlapis.** Layer service memetakan encounter ke response JSON yang “nyaman untuk UI”; mapping sering memanggil repository kecil per field tersembunyi.
3. **Authorization per baris.** Setelah encounter di-load, kode mengecek izin akses dengan query terpisah per row—ini menggandakan masalah N+1 dengan cara yang lebih sulup.
4. **GraphQL tanpa DataLoader.** Resolver field-level yang meng-query database per parent ID adalah sumber N+1 klasik.

---

## Anti-pattern tipikal (pseudo-code)

```text
const encounters = await encounterRepo.findByFilter({ ... }); // 1 query

for (const enc of encounters) {
  enc.patient = await patientRepo.findById(enc.patient_id);     // +N
  enc.location = await locationRepo.findById(enc.location_id);    // +N
}
```

Pada **50** encounter, minimal **101** query ke database—belum termasuk logging, audit, atau retry.

---

## Gejala di production

- **Latency melonjak** sebanding dengan `limit` pagination atau jumlah encounter di response.
- **Throughput database** naik tanpa peningkatan traffic pengguna yang proporsional (APM menunjukkan banyak query identik dengan parameter berbeda).
- **Connection pool exhaustion:** request lain timeout meskipun CPU aplikasi tidak penuh.
- **Replica** mengikuti beban read yang tidak wajar untuk satu endpoint.

Gejala sering baru terlihat setelah data produksi besar atau setelah UI mulai meminta field tambahan pada daftar yang sama.

---

## Diagnosis

1. **Lacak jumlah query per request.** Satu HTTP request tidak boleh menghasilkan ratusan query SQL untuk satu daftar—instrumentasi ORM (Prisma query log, TypeORM logging) atau middleware yang menghitung query membantu.
2. **`EXPLAIN ANALYZE` pada pola yang repetitif.** Anda akan melihat banyak statement serupa dengan `WHERE id = $1` berganti-ganti.
3. **Integrasi tes beban.** Bandingkan query count antara halaman dengan 10 vs 50 item; jika query count naik linear, curiga N+1.

---

## Mitigasi yang disarankan

### 1. Join / eager loading di satu query

Muat encounter beserta kolom yang dibutuhkan untuk list view dengan **JOIN** atau **SELECT** terstruktur satu kali. ORM punya `include` / `relations`—pastikan itu menghasilkan satu round-trip, bukan subquery per baris (verifikasi dengan log SQL).

### 2. Batch loading (IN list)

Ambil semua `patient_id` unik dari hasil encounter, lalu **satu query** `WHERE id IN (...)`, map di memori. Ini pola **DataLoader** klasik: mengurangi query menjadi **1 + jumlah jenis relasi**, tidak **1 + N**.

### 3. View atau query teroptimasi untuk “list screen”

Buat endpoint atau view DB yang mengembalikan tepat kolom yang ditampilkan di daftar—menghindari overload join ke tabel besar yang tidak perlu untuk baris ringkas.

### 4. GraphQL: DataLoader per request

Pastikan resolver reuse batch function dalam satu lifecycle request agar tidak memicu query per parent id.

---

## Trade-off dan risiko

- **Join besar** bisa membuat row duplikat jika relasi one-to-many tidak di-agregasi dengan benar—perlu `DISTINCT` atau pemisahan query batch yang hati-hati.
- **Select terlalu lebar** pada tabel sensitif bisa menarik kolom PHI yang tidak diperlukan untuk list—penting membatasi kolom (prinsip least privilege data).
- **Caching** daftar encounter tanpa invalidasi yang tepat bisa menampilkan status usang—N+1 diperbaiki, tetapi konsistensi bisnis tetap harus ditangani.

---

## Aspek khusus healthcare

- **Filter tenant / fasilitas / legal entity** harus ada di query awal encounter, bukan “filter setelah fetch” di aplikasi—bukan sekadar performa, tapi juga batas akses data.
- **Audit trail:** memperbaiki N+1 tidak menghapus kebutuhan mencatat akses—pastikan audit tidak memicu query tambahan per baris dengan pola yang sama.
- **Listing untuk klinisi** sering butuh indikator (alergi, flag isolasi)—jika setiap flag memicu lookup terpisah, pertimbangkan agregat terkontrol atau materialized indicator yang di-refresh oleh proses batch.

---

## Checklist review PR (daftar encounter)

- [ ] Jumlah query SQL untuk satu request list **tidak** linear terhadap `limit`.
- [ ] Relasi yang ditampilkan di card/list di-load dengan **batch** atau **join** yang terverifikasi lewat log.
- [ ] Tidak ada `await` di dalam `for` loop yang memanggil DB untuk setiap encounter (kecuali ada pola batch eksplisit yang terbukti satu query).
- [ ] Kolom PHI pada response list **minimal** sesuai kebutuhan UI dan kebijakan.

---

## Kata kunci untuk pencarian

`N+1`, `eager loading`, `DataLoader`, `Prisma include`, `TypeORM relations`, `batch IN`, `encounter list performance`, `GraphQL N+1`

---

## Referensi internal

- Indeks lengkap pola: [`README.md`](./README.md) · entri **#01** dan **#02** (varian ORM).
