# Microservices: Kapan Perlu, Kapan Tidak - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kapan microservices masuk akal
- kapan microservices justru keputusan buruk
- trade-off nyata antara modular monolith dan microservices
- tanda bahwa distribusi sudah waktunya dipertimbangkan

Microservices adalah topik
yang terlalu sering dipilih berdasarkan citra,
bukan kebutuhan.

Senior engineer yang matang
harus bisa berkata:
- "belum perlu"
dan punya alasan teknis yang kuat.

---

## 1. Apa Itu Microservices?

Microservices berarti:
- sistem dibagi menjadi beberapa service terpisah
- biasanya punya deployment/runtime terpisah
- komunikasi antar bagian terjadi lewat network atau messaging

Yang penting:
- ini bukan sekadar memecah folder
- ini memecah boundary operasional, data, dan failure domain

Begitu masuk ke microservices,
kompleksitas sistem naik secara nyata.

---

## 2. Kenapa Banyak Orang Terlalu Cepat Memilihnya?

Alasan yang sering jelek:
- kelihatan modern
- perusahaan besar memakainya
- ingin terlihat senior/enterprise
- mengira microservices otomatis scalable

Objektifnya:
- alasan-alasan ini lemah

Arsitektur harus menjawab masalah nyata,
bukan memenuhi fantasi teknis.

---

## 3. Keuntungan Nyata Microservices

Kalau dipilih di konteks yang tepat,
microservices bisa memberi:
- deployment independence
- scaling profile per service
- isolation failure yang lebih baik
- ownership domain yang lebih jelas
- kebebasan teknologi tertentu

Tapi setiap keuntungan ini datang dengan biaya.

Kalau kebutuhan keuntungannya belum nyata,
biayanya tidak sepadan.

---

## 4. Biaya Nyata Microservices

Ini yang sering diremehkan:
- network latency
- retry dan timeout
- idempotency
- eventual consistency
- tracing lintas service
- monitoring lebih kompleks
- contract versioning
- deployment orchestration
- local development lebih berat
- incident diagnosis lebih rumit

Kalau tim belum siap menanggung ini,
microservices akan jadi beban.

---

## 5. Kapan Microservices Mulai Masuk Akal?

Biasanya jika:
- domain boundary sudah cukup jelas dan stabil
- ada kebutuhan deploy independen yang nyata
- scaling profile antar area benar-benar berbeda
- tim cukup besar dan ownership domain jelas
- kemampuan observability/ops sudah matang
- coupling internal monolith sudah dibersihkan sampai batas wajar

Kalau sebagian besar ini belum terpenuhi,
sering belum waktunya.

---

## 6. Kapan Belum Perlu?

Biasanya belum perlu jika:
- tim masih kecil-menengah
- product masih cepat berubah
- boundary domain masih cair
- consistency lokal sangat penting
- operasional tim masih terbatas
- monolith modular masih cukup

Dalam kondisi ini,
microservices sering hanya menggandakan masalah.

---

## 7. Distribusi Bukan Solusi untuk Desain Internal Buruk

Kalau monolith kamu berantakan,
microservices bukan obatnya.

Yang terjadi biasanya:
- coupling lama pindah ke API/network
- boundary yang kabur tetap kabur
- debugging makin susah

Sebelum bicara microservices,
tanya dulu:
- apakah modularity internal sudah matang?

Kalau belum,
pecah layanan sering cuma menyebarkan kekacauan.

---

## 8. Microservices Butuh Boundary Domain yang Jelas

Service yang baik biasanya mewakili:
- domain capability yang cukup jelas
- ownership yang jelas
- contract yang masuk akal

Kalau service dipotong berdasarkan:
- "biar banyak service"
- "biar kecil-kecil"

itu recipe disaster.

Ukuran service bukan ukuran kualitas.
Boundary-lah yang penting.

---

## 9. Health Warning: Shared Database Microservices

Kalau banyak "service"
tapi semuanya:
- berbagi DB yang sama
- saling query tabel satu sama lain

itu sering bukan microservices sehat.
Itu monolith terpecah secara kosmetik.

Boundary service harus nyata,
bukan hanya pada repo/deploy namanya saja.

---

## 10. Data Consistency Cost

Di monolith,
banyak hal bisa selesai dengan transaction lokal.

Di microservices,
hal yang sama jadi melibatkan:
- async workflows
- saga
- compensation
- eventual consistency
- idempotency

Kalau tim belum siap secara mental dan teknis,
core flow bisnis akan cepat rawan bug.

---

## 11. Read vs Write Profile

Kadang microservices masuk akal
karena workload benar-benar berbeda.

Contoh:
- notification processing sangat bursty
- billing relatif stabil
- analytics ingestion sangat berat

Kalau scaling kebutuhan berbeda jauh
dan satu deployable menghambat,
distribusi bisa mulai relevan.

Tapi lagi:
- "bisa scale terpisah" harus kebutuhan nyata,
  bukan slogan.

---

## 12. Team Topology

Microservices sering lebih cocok
kalau tim:
- cukup besar
- punya ownership domain kuat
- bisa bertanggung jawab penuh pada service tertentu

Kalau tim kecil
dan semua orang harus mengurus semua service,
overhead koordinasi bisa sangat mahal.

Microservices tanpa team maturity
sering menjadi jebakan.

---

## 13. Observability Readiness

Sebelum microservices,
tanya:
- tracing lintas service siap?
- correlation ID disiplin?
- alerting per service siap?
- on-call tim mampu?

Kalau observability lemah,
insiden microservices akan terasa seperti kabut tebal.

Ini bukan hal kecil.

---

## 14. Local Development Cost

Monolith biasanya lebih mudah dijalankan lokal.

Microservices bisa berarti:
- banyak service
- banyak env var
- banyak dependency
- message broker, DB, cache, tracing infra

Kalau pengalaman dev jadi menyakitkan,
kecepatan delivery turun.

Ini biaya nyata yang sering dianggap remeh.

---

## 15. Healthcare Example

Sistem klinik:
- auth
- patient
- appointment
- reminder
- billing

Belum tentu perlu microservices.

Kenapa?
- booking consistency tinggi
- domain mungkin masih saling terkait
- tim ops mungkin belum besar
- modular monolith masih cukup kuat

Microservices baru lebih masuk akal
jika ada alasan jelas seperti:
- notification pipeline sangat berat
- billing domain punya lifecycle dan ownership terpisah
- deployment cadence beda jauh

---

## 16. Good Reason vs Bad Reason

Bad reason:
- biar keren
- biar scalable katanya
- biar kelihatan enterprise

Good reason:
- boundary domain sudah jelas
- release independence benar-benar dibutuhkan
- scaling profile berbeda signifikan
- organisasi dan observability siap

Kalau alasannya tidak bisa dijelaskan lebih baik dari slogan,
kemungkinan besar belum waktunya.

---

## 17. Modular Monolith as Default Candidate

Banyak sistem harus serius mempertimbangkan:
- modular monolith dulu

Kenapa?
- lebih murah
- lebih sederhana
- boundary bisa dibangun dulu
- refactor ke service nanti lebih mudah

Microservices seharusnya bukan default.
Mereka adalah alat khusus
untuk situasi yang benar-benar membutuhkannya.

---

## 18. Partial Extraction Strategy

Kalau suatu saat perlu distribusi,
tidak harus pecah semuanya sekaligus.

Lebih sehat:
- ekstrak satu area yang paling jelas boundary dan kebutuhan independensinya

Contoh:
- notification pipeline
- reporting/analytics ingestion

Daripada langsung memecah semua domain,
mulailah dari area yang paling masuk akal.

---

## 19. Anti-Pattern Umum

1. Microservices dipilih karena tren.
2. Service boundary dipotong berdasarkan technical layer, bukan domain.
3. Semua service tetap berbagi DB.
4. Tidak ada observability lintas service.
5. Tim kecil mengelola terlalu banyak service.

---

## 20. Best Practices

- mulai dari kebutuhan, bukan mode.
- kuatkan modularity internal dulu.
- pecah service hanya saat boundary dan manfaatnya jelas.
- pastikan ops/observability siap.
- evaluasi trade-off dengan jujur, bukan dengan hype.

---

## 21. Mini Latihan

Latihan:
1. Buat daftar 5 alasan bagus dan 5 alasan buruk memakai microservices.
2. Ambil satu sistem yang kamu kenal, lalu nilai apakah belum perlu, mulai perlu, atau sudah layak microservices.
3. Identifikasi area yang paling masuk akal diekstrak lebih dulu jika memang perlu.
4. Jelaskan kenapa shared database microservices sering smell.
5. Buat argumen untuk memilih modular monolith sebagai langkah antara.

---

## 22. Jawaban Contoh Ringkas

Alasan bagus:
- deploy independen benar-benar dibutuhkan
- scaling profile berbeda
- ownership domain matang

Alasan buruk:
- ikut tren
- ingin terlihat modern
- mengira semua masalah selesai otomatis

Shared DB smell karena:
- boundary data tidak nyata
- coupling tetap tinggi
- service independence semu

---

## 23. Checklist Kelulusan Topik Microservices

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan trade-off microservices dengan jujur,
- membedakan kebutuhan nyata dari hype,
- mengenali kesiapan tim dan sistem sebelum distribusi,
- menilai kapan modular monolith lebih sehat,
- menolak keputusan distribusi prematur yang tidak punya justifikasi kuat.

---

## 24. Ringkasan Brutal

- Microservices bukan tanda kedewasaan otomatis.
- Dalam banyak kasus,
  mereka hanya cara yang lebih mahal untuk salah desain.
