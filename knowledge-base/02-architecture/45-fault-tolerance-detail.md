# Fault Tolerance - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu fault tolerance
- bagaimana sistem tetap berguna saat sebagian komponen gagal
- perbedaan fault tolerance dengan availability kosong
- pola pikir desain saat kegagalan dianggap normal
- anti-pattern saat tim berharap semua dependency selalu sehat

Fault tolerance adalah tanda kedewasaan arsitektur.

Pemula mendesain sistem
seolah semua bagian akan selalu hidup.

Sistem nyata tidak begitu.

Network akan putus.
Service akan lambat.
Database bisa gagal sebagian.
Provider eksternal bisa error.

Pertanyaan senior bukan:
- "bagaimana mencegah semua kegagalan?"

Pertanyaan senior adalah:
- "bagaimana sistem tetap masuk akal saat kegagalan terjadi?"

---

## 1. Apa Itu Fault Tolerance?

Fault tolerance adalah kemampuan sistem
untuk tetap berfungsi
atau setidaknya gagal secara terkontrol
saat sebagian komponen mengalami masalah.

Kata penting:
- tetap berfungsi
  atau
- gagal dengan cara yang aman dan dapat dipahami

Fault tolerance bukan berarti tidak pernah gagal.

Itu mustahil.

---

## 2. Kenapa Ini Penting?

Karena kegagalan parsial adalah realita normal.

Dalam sistem modern:
- satu dependency bisa gagal
  sementara yang lain sehat

Kalau satu kegagalan kecil
bisa merobohkan seluruh alur,
arsitekturmu rapuh.

Fault tolerance membuat blast radius lebih kecil.

---

## 3. Failure as a First-Class Design Input

Sistem matang mendesain dengan pertanyaan:
- apa yang terjadi jika dependency ini lambat?
- apa yang terjadi jika cache down?
- apa yang terjadi jika broker macet?
- apa yang terjadi jika response hilang?

Kalau failure dipikir belakangan,
keputusan arsitektur inti
sering sudah salah arah.

Failure harus dianggap input desain,
bukan lampiran ops.

---

## 4. Fault Tolerance Tidak Sama dengan "Tambah Retries"

Retry bisa membantu,
tapi fault tolerance jauh lebih luas.

Ia mencakup:
- timeouts
- circuit breakers
- redundancy
- fallback
- graceful degradation
- isolation
- recovery path

Kalau definisi resiliency timmu
hanya "coba lagi",
itu masih dangkal.

---

## 5. Graceful Degradation

Kadang sistem tidak bisa memberi hasil penuh,
tapi masih bisa memberi layanan parsial.

Contoh:
- dashboard tanpa analytics tambahan
- booking tetap jalan walau email tertunda
- halaman tampil dengan data cache lama sementara

Ini fault tolerance yang sehat.

Tujuannya bukan mempertahankan ilusi sempurna.
Tujuannya mempertahankan fungsi penting.

---

## 6. Critical vs Non-Critical Dependency

Tidak semua dependency setara.

Pertanyaan penting:
- jika dependency ini gagal,
  apakah alur inti tetap bisa jalan?

Kalau bisa,
jangan perlakukan dependency itu
seolah wajib blocking.

Memisahkan:
- critical path
  dari
- optional path

adalah langkah besar menuju fault tolerance.

---

## 7. Isolation

Fault tolerance butuh isolasi:
- failure satu area
  jangan menjalar ke area lain

Bentuk isolasi bisa berupa:
- queue terpisah
- pool connection terpisah
- worker terpisah
- tenant isolation
- circuit breaker boundary

Tanpa isolasi,
incident kecil cepat berubah jadi systemic outage.

---

## 8. Redundancy

Beberapa fault tolerance
datang dari redundancy:
- multiple instances
- replica
- multi-AZ
- backup path tertentu

Tapi redundancy bukan gratis.

Ia menambah:
- cost
- failover complexity
- consistency questions

Redundancy yang tidak diuji
sering hanya memberi rasa aman palsu.

---

## 9. Partial Failure Handling

Salah satu keterampilan penting:
- berpikir dalam kegagalan parsial

Contoh:
- DB utama sehat
- provider SMS down
- queue backlog tinggi
- search projection tertinggal

Tidak semua failure harus menghasilkan:
- total system down

Arsitektur matang
mencari respons yang proporsional.

---

## 10. Safe Failure

Kadang tujuan terbaik
bukan "tetap sukses",
melainkan:
- gagal dengan aman

Contoh:
- jangan double charge
- jangan expose data salah
- jangan lanjut proses jika invariant inti belum pasti

Fault tolerance bukan berarti
selalu mengembalikan success.

Kadang fail safe lebih penting
daripada pretend success.

---

## 11. Fault Tolerance dan User Experience

Produk perlu tahu
apa yang user lihat saat komponen gagal:
- pesan error jelas
- pending state
- fallback data
- aksi untuk mencoba lagi

Kalau fault tolerance hanya dipikir backend,
UX akan tetap terasa rusak.

Resilience harus terasa masuk akal
dari sisi user juga.

---

## 12. Healthcare Example

Misal sistem booking klinik:

Kalau layanan notifikasi down:
- booking inti tetap tersimpan
- notifikasi masuk retry queue

Kalau layanan analytics down:
- transaksi utama tetap berjalan

Kalau layanan validasi slot inti down:
- booking mungkin harus fail safe

Ini contoh membedakan
mana yang perlu degrade,
mana yang harus berhenti.

---

## 13. Fault Tolerance dan Backpressure

Saat downstream overload,
fault tolerance juga berarti:
- jangan dorong lebih banyak beban
- batasi request
- queue atau reject dengan jelas

Kalau sistem tetap menerima semua input
tanpa kemampuan mengolahnya,
ia hanya menumpuk kegagalan tertunda.

Tolerance bukan berarti menelan semuanya.

---

## 14. Recovery Matters

Selain bertahan saat gagal,
sistem juga harus bisa pulih.

Pertanyaan:
- bagaimana backlog dibersihkan?
- bagaimana failed jobs diproses ulang?
- bagaimana service kembali normal setelah breaker open?

Fault tolerance tanpa recovery path
hanya setengah desain.

---

## 15. Testing Failure

Kalau failure behavior tidak diuji,
kemungkinan besar hanya asumsi.

Perlu latihan:
- dependency dimatikan
- timeout disimulasikan
- partial failure dipaksa
- retry storm diuji

Tim yang tidak pernah menguji failure
sering baru belajar saat incident asli.

Itu mahal.

---

## 16. Observability

Fault tolerance membutuhkan observability:
- error rate
- timeout rate
- fallback usage
- queue lag
- breaker open state
- degraded mode frequency

Tanpa ini,
tim tidak tahu apakah sistem benar-benar tahan gangguan
atau cuma diam-diam rusak parsial.

---

## 17. Anti-Pattern Umum

1. Mendesain sistem seolah semua dependency selalu sehat.
2. Menjadikan optional dependency ikut memblokir jalur inti.
3. Mengandalkan retry sebagai satu-satunya resilience tool.
4. Tidak punya degradasi atau fail-safe semantics yang jelas.
5. Tidak pernah menguji failure scenario.

---

## 18. Best Practices

- identifikasi dependency kritikal vs non-kritikal.
- bangun isolasi agar failure tidak mudah menjalar.
- siapkan graceful degradation dan safe failure behavior.
- gabungkan timeout, retry, breaker, queue, dan recovery strategy secara sadar.
- uji dan ukur perilaku sistem saat gagal.

---

## 19. Pertanyaan Desain Penting

Sebelum menyebut sistem "resilient", tanya:
1. Jika komponen ini gagal, apakah seluruh sistem ikut gagal?
2. Apa fungsi minimum yang tetap harus berjalan?
3. Apa yang harus fail safe?
4. Bagaimana blast radius dibatasi?
5. Bagaimana tim tahu sistem sedang degrade?

---

## 20. Mini Latihan

Latihan:
1. Ambil satu user journey dan tandai dependency kritikal vs opsional.
2. Rancang degrade behavior untuk dua dependency opsional.
3. Tentukan fail-safe behavior untuk satu dependency inti.
4. Simulasikan satu partial failure dan lihat blast radius-nya.
5. Buat daftar metrik untuk memantau degraded mode.

---

## 21. Jawaban Contoh Ringkas

Fault tolerance berarti:
- sistem tetap berguna
  atau
- gagal aman saat sebagian komponen bermasalah

Bukan berarti:
- semua error disembunyikan
- semua request dipaksa sukses

---

## 22. Checklist Kelulusan Topik Fault Tolerance

Kamu dianggap lulus topik ini jika sudah bisa:
- mendesain dengan asumsi failure adalah normal,
- membedakan critical dan non-critical dependency,
- merancang graceful degradation dan safe failure,
- membatasi blast radius lewat isolasi,
- menguji dan mengamati perilaku sistem saat gangguan.

---

## 23. Ringkasan Brutal

- Fault tolerance bukan slogan.
- Fault tolerance adalah keputusan tentang kegagalan mana yang boleh terasa,
  dan kegagalan mana yang tidak boleh menjatuhkan semuanya.
- Kalau sistemmu hanya hebat saat semua sehat,
  sistemmu belum hebat.
