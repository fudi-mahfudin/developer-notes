# Designing for Scale - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa arti merancang untuk scale
- perbedaan scale kebutuhan nyata vs scale imajiner
- bagaimana bottleneck berpindah saat sistem tumbuh
- trade-off performa, complexity, dan operasional saat mengejar scale

"Designing for scale"
sering jadi frasa kosong
yang dipakai untuk membenarkan
arsitektur terlalu rumit.

Padahal desain untuk scale yang baik
tidak dimulai dari:
- "bagaimana kalau 100 juta user?"

Ia dimulai dari:
- bottleneck apa yang paling mungkin muncul
- kapan akan muncul
- dan biaya apa yang layak dibayar sekarang?

Scale yang matang
adalah soal prioritas,
bukan paranoia.

---

## 1. Apa Itu Scale?

Scale bisa berarti banyak hal:
- lebih banyak request
- lebih banyak data
- lebih banyak tenant
- lebih banyak background jobs
- lebih banyak tim

Kesalahan umum:
- membahas scale seolah satu dimensi

Padahal solusi untuk:
- read traffic tinggi
berbeda dengan solusi untuk:
- write contention tinggi
atau
- organisasi multi-team.

Tentukan dulu jenis scale yang dimaksud.

---

## 2. Scale Must Be Contextual

Sistem tidak perlu
dioptimalkan untuk semua bentuk scale
sejak hari pertama.

Jika tidak,
biaya complexity datang terlalu awal.

Desain senior akan bertanya:
- scale pressure paling nyata dalam 6-18 bulan ke depan apa?

Itu lebih berguna
daripada membangun arsitektur kosmik
untuk skenario yang belum tentu datang.

---

## 3. Bottleneck Thinking

Setiap sistem punya bottleneck.

Saat scale naik,
bottleneck bisa pindah:
- DB CPU
- connection pool
- queue lag
- third-party rate limit
- hot partition
- cache miss storm

Designing for scale berarti:
- tahu bottleneck paling mungkin
- tahu bagaimana mendeteksinya
- tahu opsi mitigasinya

Bukan pura-pura bottleneck tidak ada.

---

## 4. Horizontal vs Vertical Consequences

Scale sering membawa keputusan seperti:
- tambah instance
- tambah shard/partition
- tambah worker
- pecah workload

Tapi scaling out
sering memperkenalkan masalah baru:
- consistency
- coordination
- uneven load
- routing complexity

Tidak ada scale yang gratis.

Setiap peningkatan kapasitas
sering datang dengan koordinasi lebih rumit.

---

## 5. Read Scale vs Write Scale

Banyak tim fokus pada read scale
karena lebih mudah:
- caching
- replicas
- CDN

Write scale sering lebih sulit:
- contention
- ordering
- unique constraints
- hot rows/keys

Kalau domain punya write-heavy hotspot,
solusi read-scale tidak akan cukup.

Pahami profile beban sistemmu,
jangan generik.

---

## 6. Hotspot Awareness

Scale jarang merata.

Sering ada hotspot:
- tenant tertentu
- endpoint tertentu
- key tertentu
- jam tertentu

Sistem yang tampak aman secara rata-rata
bisa gagal karena hotspot lokal.

Designing for scale yang matang
selalu curiga pada distribusi yang tidak merata.

---

## 7. Queue and Async as Scale Lever

Asynchrony sering membantu scale
karena:
- smoothing burst
- memindahkan kerja keluar dari request path

Tapi async tidak menghilangkan kerja.
Ia hanya menggeser bentuk tekanannya.

Kalau consumer capacity tidak cukup,
backlog akan tumbuh.

Scale yang sehat
selalu menghubungkan producer rate
dengan consumer capacity.

---

## 8. Caching Is Scale Trade-Off

Cache membantu scale baca,
tapi menambah:
- invalidation complexity
- stale risk
- stampede risk

Jangan anggap cache
sebagai tombol scale universal.

Kadang scale lebih sehat
diperoleh dari:
- query lebih baik
- data model lebih baik
- feature load reduction

Sebelum menambah lapisan baru,
lihat akar masalahnya.

---

## 9. Healthcare Example

Contoh:
- search appointment publik naik tajam
- export laporan bulanan melonjak
- satu grup rumah sakit besar jadi noisy neighbor

Solusi bisa berbeda:
- cache/read replica untuk search
- background jobs untuk export
- tenant quotas dan isolation untuk noisy neighbor

Tidak ada satu "arsitektur scale"
yang otomatis menyelesaikan semuanya.

---

## 10. Org Scale Is Real Too

Scale juga berarti:
- lebih banyak tim
- lebih banyak ownership boundary
- lebih banyak coordination cost

Kadang keputusan seperti modular monolith
atau microservices
lebih dipengaruhi scale organisasi
daripada traffic murni.

Kalau banyak tim saling bertabrakan
di satu codebase tanpa boundary jelas,
itu juga masalah scale.

---

## 11. Cost of Over-Scaling Early

Desain terlalu dini untuk scale besar
bisa menghasilkan:
- complexity tak perlu
- slower delivery
- lebih banyak bug
- higher ops cost

Premature scaling adalah saudara dekat
premature optimization.

Scale-readiness yang baik
adalah punya jalur evolusi,
bukan langsung membangun final boss architecture.

---

## 12. Measure Before Dramatize

Kalau mau bicara scale,
ukur:
- traffic shape
- latency distribution
- queue age
- DB saturation
- tenant skew
- cache hit/miss

Tanpa data,
percakapan scale sering hanya teater.

Engineer senior
harus membedakan:
- actual bottleneck
  dari
- urban legend internal tim.

---

## 13. Anti-Pattern Umum

1. Mendesain untuk scale imajiner tanpa data.
2. Menggunakan solusi scale yang salah untuk jenis bottleneck yang salah.
3. Fokus pada rata-rata, lupa hotspot.
4. Menambah cache/async/sharding terlalu cepat.
5. Mengabaikan scale organisasi dan operasional.

---

## 14. Best Practices

- tentukan bentuk scale yang paling relevan lebih dulu.
- pikirkan bottleneck, bukan slogan.
- ukur sebelum mengambil keputusan besar.
- pilih solusi bertahap yang memberi jalur evolusi.
- akui biaya complexity setiap kali menambah mekanisme scale.

---

## 15. Pertanyaan Desain Penting

Sebelum berkata "kita harus scale", tanya:
1. Scale dalam dimensi apa?
2. Bottleneck terdekat apa?
3. Apakah masalah ini nyata sekarang atau hipotesis jauh?
4. Solusi ini menambah complexity apa?
5. Bagaimana kita akan tahu kapan solusi yang sekarang sudah tidak cukup?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu layanan dan tulis 3 bottleneck scale paling realistisnya.
2. Bedakan apakah masalahnya read, write, burst, atau org scale.
3. Tentukan metrik yang akan memperingatkan sebelum sistem jenuh.
4. Buat roadmap evolusi bertahap dari sekarang ke 10x load.
5. Identifikasi satu solusi scale yang terlalu dini dan belum perlu dibayar.

---

## 17. Checklist Kelulusan Topik Designing for Scale

Kamu dianggap lulus topik ini jika sudah bisa:
- mendefinisikan scale secara kontekstual,
- berpikir dalam bottleneck nyata,
- memilih solusi scale sesuai jenis tekanan,
- menyeimbangkan scale-readiness dengan simplicity,
- menghindari arsitektur megah untuk masalah yang belum ada.

---

## 18. Ringkasan Brutal

- Scale bukan alasan universal untuk menambah kompleksitas.
- Scale yang matang dimulai dari bottleneck nyata, bukan ego teknis.
- Kalau kamu tidak tahu apa yang akan jenuh duluan,
  pembicaraan scale-mu masih terlalu kabur.
