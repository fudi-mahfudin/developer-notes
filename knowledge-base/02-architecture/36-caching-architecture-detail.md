# Caching Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu caching architecture
- jenis-jenis cache dalam sistem
- kapan cache membantu
- kapan cache justru membuat sistem berbohong
- bagaimana merancang invalidation dan consistency expectation

Cache adalah salah satu alat paling kuat
dan paling berbahaya
dalam arsitektur sistem.

Ia bisa membuat sistem terasa cepat.
Ia juga bisa membuat user melihat kebohongan
dengan sangat efisien.

Kalau cache dipakai tanpa desain,
masalahnya bukan "mungkin stale".
Masalahnya adalah
tim tidak tahu kapan stale,
kenapa stale,
dan apa dampaknya.

---

## 1. Apa Itu Cache?

Cache adalah lapisan penyimpanan sementara
untuk menghindari kerja berulang
atau mengurangi latency.

Yang bisa di-cache:
- hasil query
- response API
- computed result
- rendered output
- object/domain snapshot

Tujuan utamanya:
- mengurangi beban
- mempercepat akses
- mengurangi ketergantungan ke sumber utama

---

## 2. Caching Architecture Bukan Sekadar Pasang Redis

Banyak tim mengira
"punya Redis" berarti sudah punya caching architecture.

Salah.

Caching architecture mencakup:
- apa yang di-cache
- di mana cache hidup
- siapa yang membaca cache
- kapan cache di-refresh
- kapan cache dihapus
- berapa toleransi stalenya

Tanpa jawaban itu,
cache hanyalah spekulasi performa.

---

## 3. Kenapa Cache Dipakai?

Alasan umum:
- database terlalu sering dibaca
- perhitungan mahal
- traffic burst tinggi
- latensi downstream tinggi
- data tertentu lebih sering dibaca daripada diubah

Cache cocok
saat biaya hit ke source of truth
lebih mahal daripada risiko stalenya.

Itu inti trade-off-nya.

---

## 4. Jenis Cache Berdasarkan Lokasi

Beberapa level cache:
- in-process memory cache
- shared cache terpusat
- CDN/edge cache
- database query cache tertentu
- client-side cache

Setiap level punya karakter:
- latency
- scope
- invalidation difficulty
- consistency impact

Jangan bicara "cache" seolah satu benda tunggal.

---

## 5. Read-Through, Cache-Aside, Write-Through

Beberapa pola umum:
- cache-aside
- read-through
- write-through
- write-behind

Yang paling umum di aplikasi:
- cache-aside

Artinya:
- aplikasi cek cache dulu
- miss -> ambil dari source
- simpan ke cache

Sederhana,
tapi invalidation tetap jadi masalah utama.

---

## 6. Cache-Aside

Keunggulan:
- fleksibel
- mudah dimulai

Kelemahan:
- rawan stale jika lupa invalidate
- cache miss burst bisa menghantam source

Banyak sistem memakai pola ini,
tapi sering tanpa strategi lengkap
untuk:
- warm-up
- stampede prevention
- invalidation discipline

---

## 7. Write-Through dan Write-Behind

Write-through:
- tulis ke source dan cache secara sinkron

Write-behind:
- tulis ke cache dulu,
  source di-update belakangan

Write-through lebih aman
untuk sinkronisasi sederhana tertentu,
tapi bisa menambah latency write.

Write-behind lebih berisiko
karena durability dan consistency menjadi lebih rumit.

Jangan pilih pola tulis cache
tanpa memahami failure semantics.

---

## 8. Staleness adalah Konsep Bisnis

Pertanyaan utama:
- seberapa lama data boleh stale?

Jawabannya bukan murni teknis.

Dashboard ringkasan:
- mungkin boleh stale 10 detik

Saldo akun:
- mungkin tidak boleh stale sama sekali

Caching architecture yang sehat
ditentukan oleh toleransi bisnis,
bukan hanya TTL acak.

---

## 9. TTL Bukan Strategi Lengkap

TTL membantu,
tapi bukan jawaban universal.

Kalau tim hanya berkata:
- "kasih TTL 5 menit"

itu belum arsitektur.

TTL menjawab:
- kapan cache kedaluwarsa otomatis

TTL tidak otomatis menjawab:
- apa yang terjadi setelah write
- bagaimana invalidation terarah
- bagaimana stampede dicegah

---

## 10. Cache Invalidation

Inilah akar penderitaan.

Saat source berubah:
- cache mana yang harus dibuang?
- siapa yang membuang?
- kapan dibuang?

Kalau invalidation lemah:
- data lama bertahan
- sistem jadi saling bertentangan

Kalau invalidation terlalu agresif:
- cache value turun drastis

Cache bagus bukan sekadar hit rate tinggi.
Ia juga harus benar secara operasional.

---

## 11. Cache Stampede

Masalah klasik:
- item cache expire
- banyak request miss bersamaan
- semua menghantam source

Ini bisa membunuh sumber utama
justru saat cache seharusnya membantu.

Beberapa mitigasi:
- request coalescing
- soft TTL
- background refresh
- jittered expiry

Kalau sistem populer,
stampede harus dipikir.

---

## 12. Granularity Cache

Apa yang di-cache?
- whole response?
- per object?
- per query result?
- per fragment?

Granularity menentukan:
- kemudahan invalidation
- hit rate
- storage use
- complexity

Cache terlalu besar:
- invalidation mahal

Cache terlalu kecil:
- benefit rendah atau orchestration rumit

---

## 13. Source of Truth Harus Jelas

Cache bukan sumber kebenaran utama.

Cache adalah turunan.

Kalau tim mulai memperlakukan cache
sebagai tempat paling dipercaya
tanpa mekanisme benar,
sistem akan kabur.

Pertanyaan:
- saat konflik, siapa yang menang?

Jawabannya seharusnya jelas:
- source of truth utama.

---

## 14. Healthcare Example

Contoh cocok di-cache:
- direktori dokter publik
- jadwal layanan publik yang tidak berubah per detik
- dashboard agregasi operasional

Contoh hati-hati:
- slot booking real-time
- status approval kritikal
- data sensitif pasien yang sering berubah

Kecepatan tidak boleh mengalahkan correctness
di area yang salah.

---

## 15. Cache dan Security

Cache juga punya risiko:
- data sensitif tersimpan di tempat tak semestinya
- tenant data bocor lintas key
- invalidation salah membuat user lihat data orang lain

Arsitektur cache
harus memikirkan:
- scoping key
- auth context
- tenancy boundary
- retention

Cache yang cepat tapi bocor
adalah kegagalan total.

---

## 16. Distributed Cache Complexity

Shared cache terpusat
memberi reuse lintas instance,
tapi menambah:
- network dependency
- serialization issue
- outage mode baru

Apa yang terjadi jika cache store down?
- fallback ke source?
- partial degradation?
- circuit breaker?

Caching architecture matang
selalu memikirkan mode gagal.

---

## 17. Monitoring Cache

Kamu perlu memantau:
- hit rate
- miss rate
- eviction rate
- latency cache
- error rate cache
- stale data incident

Kalau hanya lihat hit rate,
kamu bisa tertipu.

Cache dengan hit rate tinggi
tapi data salah
tetap buruk.

---

## 18. Anti-Pattern Umum

1. Menambah cache tanpa tahu apa masalahnya.
2. Mengandalkan TTL acak sebagai satu-satunya invalidation strategy.
3. Tidak memikirkan stampede.
4. Meng-cache data sensitif tanpa boundary jelas.
5. Memakai cache untuk menutupi query/source design yang buruk.

---

## 19. Best Practices

- mulai dari access pattern dan freshness requirement.
- definisikan source of truth dan semantics stale yang bisa diterima.
- pilih pola cache yang sesuai kebutuhan baca/tulis.
- rancang invalidation dengan sengaja.
- monitor cache sebagai komponen kritikal, bukan aksesoris.

---

## 20. Pertanyaan Desain Penting

Sebelum menambah cache, tanya:
1. Bottleneck yang ingin diselesaikan apa?
2. Data ini boleh stale berapa lama?
3. Apa source of truth-nya?
4. Bagaimana invalidation bekerja?
5. Apa yang terjadi jika cache down atau kosong?

---

## 21. Mini Latihan

Latihan:
1. Pilih satu endpoint lambat dan rancang strategi cache-nya.
2. Tentukan key design dan invalidation plan.
3. Evaluasi apakah TTL saja cukup.
4. Rancang mitigasi stampede untuk item populer.
5. Nilai risiko security/tenant leakage pada cache tersebut.

---

## 22. Jawaban Contoh Ringkas

Cache cocok untuk:
- read-heavy data
- data semi-statis
- agregasi mahal

Cache kurang cocok untuk:
- state inti yang harus fresh absolut
- data sensitif tanpa boundary kuat

---

## 23. Checklist Kelulusan Topik Caching Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan cache sebagai trade-off correctness vs speed,
- memilih pola cache yang sesuai,
- merancang invalidation dan stampede prevention dasar,
- menjaga source of truth tetap jelas,
- menghindari cache sebagai plester desain buruk.

---

## 24. Ringkasan Brutal

- Cache tidak membuat masalah hilang.
- Cache membuat sebagian masalah datang lebih cepat
  dan sebagian lagi datang terlambat.
- Kalau kamu tidak paham invalidation,
  kamu belum paham caching architecture.
