# Health Checks - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu health checks
- kenapa health checks penting dalam operasi sistem
- perbedaan liveness, readiness, dan startup style checks
- kesalahan umum saat health endpoint terlalu dangkal atau terlalu mahal

Banyak sistem punya endpoint `/health`
lalu merasa selesai.

Padahal health check yang buruk
bisa sama berbahayanya
dengan tidak punya health check sama sekali.

Kalau terlalu dangkal:
- sistem tampak sehat padahal rusak

Kalau terlalu berat:
- health check sendiri jadi sumber masalah

Health checks adalah kontrak operasional,
bukan checkbox deployment.

---

## 1. Apa Itu Health Check?

Health check adalah mekanisme
untuk memberi sinyal
tentang kondisi komponen atau service.

Tujuan praktisnya:
- orchestration tahu kapan service siap
- load balancer tahu kapan harus mengirim traffic
- operator tahu service sedang sehat atau tidak

Health check harus membantu keputusan operasional,
bukan sekadar mengembalikan `200 OK`.

---

## 2. Kenapa Ini Penting?

Karena sistem modern sering berjalan di lingkungan
yang butuh keputusan otomatis:
- restart container
- remove dari load balancer
- hold traffic saat startup

Tanpa sinyal kesehatan yang benar,
platform akan membuat keputusan yang salah:
- mengirim traffic ke instance belum siap
- me-restart instance sehat
- membiarkan instance rusak tetap aktif

Itu semua mahal.

---

## 3. Liveness Check

Liveness biasanya menjawab:
- apakah process ini masih hidup dan tidak deadlocked?

Ini cocok untuk mendeteksi:
- process hang
- deadlock kasar
- event loop macet berat

Liveness sebaiknya cukup sederhana.

Kalau liveness terlalu bergantung
ke banyak dependency eksternal,
service bisa di-restart berulang
padahal masalahnya ada di luar dirinya.

---

## 4. Readiness Check

Readiness menjawab:
- apakah service siap menerima traffic sekarang?

Ini berbeda dari sekadar hidup.

Service bisa:
- hidup
- tapi belum siap

Contoh:
- koneksi DB belum siap
- cache warm-up belum selesai
- migration startup belum selesai

Readiness sangat penting
agar traffic tidak masuk terlalu dini.

---

## 5. Startup Check Mindset

Beberapa sistem butuh fase startup
yang lebih lambat atau khusus.

Pada fase ini,
service mungkin:
- belum siap,
  tapi bukan berarti mati

Pola startup-oriented check
berguna agar platform tidak salah
menganggap proses sehat yang masih inisialisasi
sebagai kegagalan.

Ini sangat relevan
pada service yang boot-nya tidak instan.

---

## 6. Jangan Campur Semua Hal Jadi Satu Check

Kesalahan umum:
- satu endpoint health
  mencoba memverifikasi semua dependency secara mahal

Masalah:
- lambat
- rapuh
- noisy

Health check sebaiknya jelas:
- check apa untuk keputusan apa?

Liveness, readiness, dan deep diagnostics
sering perlu dibedakan.

---

## 7. Dependency Sensitivity

Tidak semua dependency
harus membuat readiness gagal.

Pertanyaan penting:
- dependency ini critical atau optional?

Jika analytics service down,
apakah booking API harus dikeluarkan dari traffic?
Mungkin tidak.

Jika database utama down,
kemungkinan iya.

Health architecture yang sehat
memahami critical path,
bukan menghukum semua dependency sama rata.

---

## 8. False Positive dan False Negative

Health check buruk bisa:
- false positive:
  bilang sehat padahal tidak
- false negative:
  bilang tidak sehat padahal masih layak melayani

Keduanya berbahaya.

False positive:
- user kena instance rusak

False negative:
- kapasitas berkurang sia-sia
- auto-restart thrash

Mendesain health check
adalah soal mengurangi kedua jenis kesalahan ini.

---

## 9. Expensive Health Checks

Kalau tiap hit health endpoint
melakukan query berat,
panggilan cross-service,
atau full dependency scan,
health check bisa:
- menambah load
- memperparah incident

Health check harus proporsional.

Deep diagnostics boleh ada,
tapi tidak selalu cocok
sebagai probe frekuensi tinggi.

---

## 10. Graceful Degradation dan Readiness

Service tidak harus dianggap "tidak siap"
hanya karena satu fitur opsional gagal.

Kadang lebih sehat:
- tetap ready
- tapi degrade sebagian fungsi

Ini penting
agar readiness tidak terlalu absolut.

Kalau tidak,
gangguan kecil bisa membuat kapasitas sistem turun besar.

---

## 11. Healthcare Example

Misal service appointment:

Critical dependency:
- primary database

Semi-optional:
- analytics sink
- notification queue publisher fallback path

Jika database gagal:
- readiness bisa fail

Jika analytics gagal:
- service mungkin tetap ready
  dengan degradasi terbatas

Ini contoh health checks yang sadar bisnis.

---

## 12. Health Check dan Deployments

Saat deploy rolling,
readiness menentukan
kapan instance baru mulai menerima traffic.

Jika readiness terlalu dini:
- error spike saat boot

Jika terlalu lambat atau salah:
- rollout lambat
- kapasitas terbuang

Health checks bukan cuma ops monitoring.
Ia memengaruhi perilaku deployment nyata.

---

## 13. Observability Integration

Health endpoint bagus,
tapi tidak cukup.

Kamu juga perlu:
- logs saat health state berubah
- metric health transitions
- alert jika banyak instance unready

Tanpa ini,
health checks hanya memberi snapshot,
bukan pemahaman tren.

---

## 14. Anti-Pattern Umum

1. `/health` selalu `200` tanpa makna.
2. Liveness check tergantung dependency eksternal.
3. Readiness memblokir service karena dependency opsional.
4. Health check terlalu berat dan mahal.
5. Tidak membedakan hidup vs siap menerima traffic.

---

## 15. Best Practices

- pisahkan liveness dan readiness secara jelas.
- buat probe sesuai keputusan operasional yang ingin diambil.
- pertimbangkan critical vs optional dependency.
- jaga probe tetap ringan dan andal.
- integrasikan health state dengan logging dan metrics.

---

## 16. Pertanyaan Desain Penting

Sebelum membuat health check, tanya:
1. Keputusan operasional apa yang bergantung pada check ini?
2. Apa bedanya service hidup vs service siap?
3. Dependency mana yang benar-benar critical?
4. Seberapa mahal check ini jika dipanggil sering?
5. Apa risiko false positive dan false negative?

---

## 17. Mini Latihan

Latihan:
1. Pisahkan check untuk liveness dan readiness pada satu service.
2. Tandai dependency yang harus memengaruhi readiness.
3. Evaluasi apakah health endpoint sekarang terlalu berat.
4. Rancang metric untuk health transition.
5. Simulasikan dependency opsional gagal dan tentukan apakah service tetap ready.

---

## 18. Checklist Kelulusan Topik Health Checks

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan liveness dan readiness,
- mendesain check berdasar keputusan operasional,
- menghindari probe yang terlalu dangkal atau terlalu mahal,
- memikirkan critical vs optional dependency,
- menghubungkan health checks dengan deployment dan incident handling.

---

## 19. Ringkasan Brutal

- Health check yang asal
  hanya membuat platform mengambil keputusan salah lebih cepat.
- Hidup tidak sama dengan siap.
- Dan `200 OK` tidak sama dengan sehat.
