# Rate Limiting - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu rate limiting
- kenapa sistem butuh pembatasan laju
- berbagai model rate limit
- hubungan rate limit dengan fairness, reliability, dan security
- kesalahan umum saat menerapkannya

Tanpa rate limiting,
beberapa user atau client
bisa menghabiskan kapasitas bersama
dan merusak pengalaman semua orang.

Rate limiting bukan cuma fitur security.
Ia juga alat reliability dan governance.

---

## 1. Apa Itu Rate Limiting?

Rate limiting adalah mekanisme
untuk membatasi jumlah request atau aksi
dalam interval tertentu.

Contoh:
- 100 request per menit per API key
- 5 login attempts per 10 menit per IP
- 10 export jobs per jam per tenant

Tujuannya:
- mencegah abuse
- menjaga fairness
- melindungi resource

---

## 2. Kenapa Rate Limiting Penting?

Karena resource sistem terbatas.

Tanpa pembatasan:
- traffic spike bisa membebani backend
- brute force lebih mudah
- noisy neighbor merusak tenant lain
- biaya infra melonjak

Rate limiting membantu berkata:
- "tidak semua trafik berhak sama pada setiap saat"

Dan itu wajar.

---

## 3. Rate Limiting Bukan Solusi Tunggal

Rate limiting bukan pengganti:
- capacity planning
- auth
- WAF
- caching
- query optimization

Ia hanya salah satu guardrail.

Kalau sistem lambat
karena query jelek,
rate limiting tidak akan menyelesaikan akar masalah.

---

## 4. Dimensi Pembatasan

Rate limit bisa diterapkan berdasarkan:
- IP address
- user id
- API key
- tenant
- endpoint
- operation type

Pemilihan dimensi penting.

Salah memilih key
bisa membuat limit terlalu longgar
atau terlalu menghukum user sah.

---

## 5. Fairness

Salah satu tujuan utama rate limiting:
- fairness

Misal satu tenant besar
tidak boleh menghabiskan kapasitas
yang membuat tenant kecil lumpuh.

Atau satu script nakal
tidak boleh menghancurkan pengalaman user lain.

Rate limiting adalah alat distribusi kapasitas yang adil,
bukan hanya alat blokir.

---

## 6. Security Use Case

Rate limit sangat penting untuk:
- login attempts
- OTP verification
- password reset
- public API abuse
- scraping tertentu

Ia membantu memperlambat penyerang,
bukan selalu menghentikan total.

Dalam security,
time matters.

Membuat serangan lebih mahal
sudah sangat berharga.

---

## 7. Reliability Use Case

Selain security,
rate limit berguna untuk reliability:
- lindungi downstream service
- jaga database dari burst
- batasi expensive endpoints
- kendalikan job creation

Kalau endpoint export mahal
dibiarkan tanpa limit,
sedikit user saja bisa merusak sistem.

---

## 8. Global vs Per-Actor Limit

Ada beberapa level limit:
- global system limit
- per-user limit
- per-tenant limit
- per-endpoint limit

Sering perlu kombinasi.

Contoh:
- global untuk melindungi total kapasitas
- per-user untuk fairness individual

Satu layer saja
sering tidak cukup.

---

## 9. Fixed Window

Model sederhana:
- hitung request dalam jendela waktu tetap

Contoh:
- 100 request per menit

Keunggulan:
- sederhana

Kelemahan:
- burst di tepi window

Misal user bisa mengirim banyak request
di akhir menit lalu awal menit berikutnya.

Model sederhana,
tapi tidak selalu paling adil.

---

## 10. Sliding Window / Rolling Logic

Pendekatan ini
berusaha membuat limit lebih halus
berdasarkan periode bergerak.

Keunggulan:
- lebih adil
- lebih akurat terhadap burst

Kelemahan:
- implementasi lebih rumit

Pilih jika fairness penting
dan volume trafik cukup signifikan.

---

## 11. Token Bucket / Leaky Bucket Thinking

Beberapa model mengizinkan burst kecil
tapi menjaga average rate.

Ini berguna
jika sistem ingin tetap fleksibel
terhadap variasi request jangka pendek.

Tidak semua traffic harus lurus rata.

Terkadang burst kecil itu normal dan sah.
Rate limiting yang baik
memisahkan burst sehat dari abuse.

---

## 12. Hard Block vs Soft Degradation

Saat limit tercapai,
apa yang terjadi?

Pilihan:
- langsung tolak
- antrekan terbatas
- degrade response
- minta retry later

Tidak semua use case harus diperlakukan sama.

Untuk login brute-force:
- hard block wajar

Untuk report generation:
- queue + slow lane mungkin cukup

---

## 13. User Experience

Rate limiting yang baik
tidak hanya melindungi sistem,
tapi juga jelas bagi client.

Misal:
- status code tepat
- pesan jelas
- retry-after bila relevan

Kalau client tidak tahu apa yang terjadi,
ia bisa retry membabi buta
dan memperburuk keadaan.

---

## 14. Distributed System Challenge

Dalam sistem terdistribusi,
rate limiting lebih sulit:
- banyak instance
- state limit tersebar
- edge dan app layer bisa berbeda

Pertanyaan:
- limit disimpan di mana?
- bagaimana konsistensinya?
- seberapa presisi yang dibutuhkan?

Sering cukup
presisi "cukup baik".

Mengejar akurasi mutlak
bisa terlalu mahal.

---

## 15. Healthcare Example

Contoh limit masuk akal:
- login attempts per IP/user
- appointment search API publik
- OTP send/resend
- export laporan operasional
- partner API integration

Contoh sensitif:
- jangan sampai rate limit terlalu agresif
  sehingga dokter gagal mengakses data kritis
  saat beban tinggi

Rate limiting harus sadar konteks bisnis,
bukan hanya angka teknis.

---

## 16. Noisy Neighbor Problem

Dalam multi-tenant system,
noisy neighbor sangat nyata.

Satu tenant:
- punya script buruk
- query polling agresif
- bulk operations besar

bisa merusak tenant lain.

Per-tenant rate limiting
adalah alat penting untuk isolasi operasional.

---

## 17. Observability

Kamu perlu tahu:
- siapa yang kena limit
- endpoint mana paling sering dibatasi
- false positive rate
- apakah limit membantu atau mengganggu

Kalau tidak diukur,
rate limiting bisa diam-diam
menghukum user baik
tanpa tim sadar.

---

## 18. Anti-Pattern Umum

1. Mengandalkan rate limiting untuk menutupi desain sistem buruk.
2. Satu angka limit diterapkan ke semua endpoint.
3. Tidak membedakan per-user, per-tenant, dan global limit.
4. Error response limit tidak jelas.
5. Limit terlalu agresif tanpa memahami UX dan operasi bisnis.

---

## 19. Best Practices

- bedakan tujuan security, fairness, dan reliability.
- terapkan limit sesuai actor dan endpoint yang relevan.
- gunakan model limit yang sesuai kebutuhan burst/fairness.
- beri feedback jelas ke client.
- monitor efek limit terhadap sistem dan user.

---

## 20. Pertanyaan Desain Penting

Sebelum menambah rate limiting, tanya:
1. Resource apa yang sedang dilindungi?
2. Siapa actor yang harus dibatasi?
3. Apakah burst kecil masih boleh?
4. Apa yang terjadi saat limit tercapai?
5. Bagaimana menghindari mengganggu user sah?

---

## 21. Mini Latihan

Latihan:
1. Tentukan limit berbeda untuk login, search, dan export.
2. Pilih key limit yang tepat untuk multi-tenant API.
3. Nilai apakah endpoint tertentu butuh hard block atau queued degradation.
4. Rancang response saat rate limit tercapai.
5. Identifikasi metrik yang membuktikan limit bekerja.

---

## 22. Jawaban Contoh Ringkas

Login:
- limit ketat per IP/user

Search publik:
- limit moderat per IP/API key

Export berat:
- limit per user/tenant + job queue

---

## 23. Checklist Kelulusan Topik Rate Limiting

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan rate limiting sebagai alat security dan reliability,
- memilih dimensi limit yang tepat,
- memahami model fixed/sliding/bucket secara konseptual,
- memikirkan fairness dan UX,
- menghindari rate limiting yang sekadar angka asal.

---

## 24. Ringkasan Brutal

- Rate limiting bukan hiasan gateway.
- Ia adalah keputusan distribusi kapasitas.
- Kalau limit-mu asal,
  kamu bisa gagal menghentikan abuse
  sekaligus menyakiti user sah.
