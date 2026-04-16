# Serverless Architecture Trade-off - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu serverless dari sudut pandang arsitektur
- kapan cocok
- kapan buruk
- trade-off operasional, performa, cost, dan desain

Serverless sering dijual
seolah menghapus semua masalah infrastruktur.
Kenyataannya:
- ia menggeser banyak jenis masalah,
  bukan menghapusnya.

Senior engineer harus bisa menilai
kapan serverless rasional
dan kapan itu hanya hype yang dibeli mahal.

---

## 1. Apa Itu Serverless?

Secara praktik,
serverless biasanya berarti:
- kamu menulis fungsi / service
- platform menjalankan, menskalakan, dan mengelola runtime
- kamu tidak mengelola server secara langsung

Contoh umum:
- function as a service
- managed event handlers
- managed API integration runtimes

Penting:
- "serverless" bukan berarti tidak ada server
- artinya kamu tidak mengelola server itu secara langsung.

---

## 2. Kenapa Serverless Menarik?

Karena menjanjikan:
- time-to-market cepat
- scale otomatis
- operasi infra lebih sedikit
- bayar sesuai pemakaian tertentu
- cocok untuk event-driven workloads

Untuk use case yang tepat,
ini benar-benar bisa powerful.

Tapi untuk use case yang salah,
biayanya bisa mengejutkan.

---

## 3. Kapan Serverless Cocok?

Biasanya cocok untuk:
- workload bursty
- event-driven processing
- cron/task sederhana
- webhook handler
- low-to-medium complexity API tertentu
- background processing independen

Kalau traffic tidak stabil
atau fungsi tidak terus aktif,
serverless bisa sangat ekonomis dan cepat.

---

## 4. Kapan Serverless Kurang Cocok?

Biasanya kurang cocok untuk:
- low-latency hot path yang sensitif
- koneksi stateful panjang
- workflow kompleks dengan banyak koordinasi erat
- compute berat dan panjang
- sistem yang butuh kontrol runtime mendalam

Kalau use case menuntut:
- latency konsisten
- connection warm
- stateful behavior panjang

serverless bisa terasa melawan kebutuhanmu.

---

## 5. Cold Start

Ini salah satu trade-off klasik.

Cold start berarti:
- saat fungsi belum aktif/warm,
  startup awal bisa menambah latency

Untuk beberapa use case,
ini tidak masalah.
Untuk alur user-facing kritikal,
ini bisa menyakitkan.

Kalau tim mengabaikan cold start,
UX bisa rusak tanpa disadari.

---

## 6. Stateless Mindset

Serverless mendorong desain yang lebih stateless.

Ini sering bagus:
- fungsi kecil
- side effect jelas
- scaling lebih mudah

Tapi kalau tim diam-diam mengandalkan:
- state lokal memory
- session sticky
- koneksi yang selalu hidup

desain akan mudah rapuh.

Serverless memaksa disiplin tertentu.

---

## 7. Cost Trade-off

Serverless tidak selalu lebih murah.

Murah jika:
- traffic sporadis
- workload pendek
- idle time tinggi

Bisa mahal jika:
- traffic terus tinggi
- execution sering
- runtime panjang
- chatty workflow banyak langkah

Cost harus dihitung berdasarkan pola nyata,
bukan slogan vendor.

---

## 8. Operational Simplicity vs Hidden Complexity

Ya, serverless bisa mengurangi:
- server patching
- manual scaling
- infra provisioning dasar

Tapi hidden complexity muncul di:
- observability
- cold start
- local development
- vendor-specific behavior
- IAM/config complexity
- function sprawl

Kalau tidak disiplin,
serverless bisa membuat sistem tampak sederhana
padahal diagnosanya jauh lebih sulit.

---

## 9. Function Sprawl

Salah satu bahaya:
- terlalu banyak function kecil
- ownership kabur
- alur tersebar
- debugging dan reasoning jadi menyakitkan

Ini mirip microservices problem skala kecil.

Kalau tiap fungsi dibuat tanpa boundary domain yang jelas,
serverless berubah jadi kumpulan trigger acak.

Itu buruk.

---

## 10. Observability di Serverless

Observability sering lebih menantang karena:
- execution ephemeral
- banyak instance singkat
- banyak trigger berbeda
- log/trace tersebar

Kamu butuh:
- correlation ID
- structured logging
- distributed tracing jika workflow lintas fungsi
- metrik invocation/error/latency yang bagus

Tanpa ini,
insiden serverless terasa sangat kabur.

---

## 11. Vendor Lock-In

Serverless sering sangat terkait platform.

Contoh:
- event shape
- IAM model
- trigger model
- managed integration pattern

Ini tidak otomatis buruk,
tapi harus disadari.

Kalau kamu masuk terlalu dalam
ke fitur sangat spesifik vendor,
keluar nanti bisa mahal.

---

## 12. Database Connection Problem

Salah satu masalah umum:
- banyak invocation
- banyak koneksi ke DB
- connection exhaustion

Di sistem berbasis database relasional,
ini harus dipikirkan serius.

Serverless API + DB tradisional
punya friction nyata.

Kalau diabaikan,
sistem bisa jatuh bukan karena query jelek,
tapi karena ledakan koneksi.

---

## 13. Event-Driven Friendliness

Serverless sangat cocok untuk pola:
- event masuk
- proses kecil dilakukan
- hasil dikirim/diteruskan

Contoh:
- reminder dispatch
- image processing
- webhook ingestion
- audit enrichment

Ini salah satu kekuatan terbaik serverless.

Jika workload naturalnya event-driven dan bursty,
serverless bisa masuk akal.

---

## 14. API Workloads

Untuk API,
serverless bisa bagus atau buruk
tergantung kebutuhan.

Bagus jika:
- traffic tidak stabil
- logic relatif sederhana
- latency tolerable

Kurang bagus jika:
- latency ketat
- auth/connection heavy
- banyak dependency warm state
- throughput tinggi terus-menerus

Jangan mengeneralisasi.

---

## 15. Healthcare Example

Cocok:
- reminder scheduler worker
- webhook callback handler dari vendor
- export job terpicu event
- small async processors

Kurang cocok:
- booking flow inti jika latency dan consistency sangat sensitif
- session-heavy admin app
- low-latency hot path dengan banyak dependency sinkron

Jadi domain healthcare tetap butuh seleksi use case,
bukan serverless di semua tempat.

---

## 16. Local Development Friction

Kadang serverless sulit dilokalkan:
- banyak trigger
- banyak mocked platform behavior
- IAM/environment rumit

Kalau tim tidak menyiapkan local/dev workflow yang baik,
produktivitas bisa turun.

Ini sering diremehkan
saat orang hanya melihat presentasi vendor.

---

## 17. Security and Config Surface

Serverless sering menambah permukaan konfigurasi:
- permissions
- secrets
- trigger bindings
- event routing

Kalau governance lemah,
risikonya:
- access terlalu lebar
- misconfigured triggers
- silent failures

Sederhana di satu sisi
bisa berarti lebih banyak detail di sisi lain.

---

## 18. Anti-Pattern Umum

1. Memilih serverless karena tren, bukan workload.
2. Menaruh hot path sensitif tanpa evaluasi cold start/latency.
3. Mengabaikan DB connection behavior.
4. Membiarkan function sprawl.
5. Tidak menyiapkan observability yang cukup.

---

## 19. Best Practices

- pilih serverless untuk use case yang cocok, bukan semua hal.
- evaluasi latency, cost, dan connection model nyata.
- jaga boundary function tetap jelas.
- siapkan observability dan security config dari awal.
- hindari vendor-specific coupling berlebihan jika belum perlu.

---

## 20. Mini Latihan

Latihan:
1. Sebutkan 5 use case yang cocok untuk serverless.
2. Sebutkan 5 use case yang buruk untuk serverless.
3. Jelaskan kenapa DB connection jadi isu penting.
4. Jelaskan trade-off cold start.
5. Nilai satu sistemmu: bagian mana yang serverless-friendly dan mana yang tidak.

---

## 21. Jawaban Contoh Ringkas

Cocok:
- webhook handler
- async reminder
- cron-triggered cleanup

Kurang cocok:
- hot path booking dengan latency ketat
- stateful long-lived workflow

DB connection jadi isu karena:
- invocation paralel banyak
- DB tradisional punya batas koneksi
- function ephemeral bisa menciptakan pressure besar.

---

## 22. Checklist Kelulusan Topik Serverless Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan keuntungan dan biaya serverless secara jujur,
- memilih use case yang cocok dan tidak cocok,
- memahami cold start, cost, dan connection trade-off,
- menilai dampak vendor lock-in dan observability,
- menggunakan serverless sebagai alat spesifik, bukan jawaban universal.

---

## 23. Ringkasan Brutal

- Serverless bukan "bebas ops".
- Ia hanya memindahkan jenis masalah yang harus kamu pikirkan.
- Kalau workload-nya cocok, hasilnya bagus.
- Kalau tidak cocok, kamu cuma membayar mahal untuk keterbatasan baru.
