# Logging, Metrics, Tracing - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- fungsi berbeda dari logging, metrics, dan tracing
- kapan masing-masing paling berguna
- bagaimana ketiganya saling melengkapi
- anti-pattern saat satu sinyal dipakai untuk semua masalah

Banyak tim pernah berada di salah satu ekstrem:
- log semuanya
- atau hanya punya beberapa grafik CPU
- atau pasang tracing tapi tak tahu gunanya

Masalahnya bukan alatnya.
Masalahnya adalah
tim tidak jelas
untuk pertanyaan seperti apa
setiap sinyal dipakai.

Logging, metrics, dan tracing
bukan saingan.
Mereka adalah alat berbeda
untuk jenis pertanyaan berbeda.

---

## 1. Logs: Detail Naratif

Logs bagus untuk menjawab:
- apa tepatnya yang terjadi?
- branch mana yang dilewati?
- payload apa yang relevan?
- error detail-nya apa?

Log memberi detail naratif.

Ia cocok saat kamu butuh
melihat kejadian spesifik
pada satu request, satu job, atau satu error.

Tapi log buruk jika:
- tidak terstruktur
- tidak berkonteks
- terlalu banyak noise

---

## 2. Metrics: Ringkasan Kuantitatif

Metrics bagus untuk menjawab:
- seberapa sering ini terjadi?
- apakah latency naik?
- berapa error rate?
- apakah queue backlog bertambah?

Metrics memberi pandangan agregat.

Ia membantu:
- dashboard health
- alerting
- trend analysis

Tapi metric sendirian
sering tidak cukup untuk akar masalah detail.

---

## 3. Traces: Perjalanan End-to-End

Tracing bagus untuk menjawab:
- request ini lewat mana saja?
- hop mana yang lambat?
- service mana yang menyebabkan delay?

Tracing sangat kuat
untuk sistem distributed.

Ia menghubungkan beberapa operasi
dalam satu alur end-to-end.

Tanpa tracing,
latency lintas service
sering terasa seperti kabut.

---

## 4. Satu Pertanyaan, Tiga Sudut

Contoh:
- pengguna mengeluh booking lambat

Metrics memberi:
- latency endpoint memang naik?
- seberapa luas dampaknya?

Tracing memberi:
- hop mana paling lambat?

Logs memberi:
- error/branch detail pada request tertentu

Ini contoh kenapa tiga sinyal ini saling melengkapi.

---

## 5. Jangan Pakai Logs untuk Semua Hal

Anti-pattern umum:
- semua jawaban dicari dari grep log

Masalah:
- mahal
- lambat
- noisy
- sulit untuk aggregate trend

Kalau ingin tahu:
- error rate 1 jam terakhir

metric lebih tepat.

Log bagus untuk detail.
Tidak bagus untuk semua pertanyaan agregat.

---

## 6. Jangan Pakai Metrics untuk Semua Hal

Metrics juga terbatas.

Jika ingin tahu:
- request tertentu gagal karena field apa?
- branch logika apa yang terjadi?

metric tidak cukup.

Metrics bagus untuk pola,
bukan detail naratif per kejadian.

Kalau tim hanya punya metric,
debugging masalah spesifik
bisa tetap lambat.

---

## 7. Jangan Pasang Tracing Sebagai Hiasan

Tracing sering dipasang
hanya karena platform APM mendukungnya.

Lalu:
- span name buruk
- context minim
- sampling tak dipikirkan
- tidak ada pertanyaan yang benar-benar dijawab

Itu pemborosan.

Tracing bernilai
jika benar-benar membantu reasoning
tentang alur lintas dependency.

---

## 8. Structured Logging

Log yang sehat
sering bersifat terstruktur:
- level
- timestamp
- request id
- actor/tenant context
- operation name
- important fields

Log teks mentah panjang
lebih sulit dipakai pada skala besar.

Structured logging
memberi queryability dan korelasi lebih baik.

---

## 9. Metrics Design

Metric yang sehat
tidak hanya banyak.

Ia harus:
- relevan
- stabil
- tidak high-cardinality liar
- punya unit dan nama jelas

Contoh baik:
- request_latency_ms
- error_rate
- queue_oldest_age_seconds

Contoh buruk:
- label user_id pada semua metric

Desain metric perlu disiplin.

---

## 10. Trace Context Propagation

Tracing hanya berguna
jika context dibawa lintas boundary:
- service ke service
- request ke async job
- event ke consumer bila mungkin

Kalau trace terputus di tengah,
alur besar jadi pecah.

Distributed system tracing
bergantung pada propagation yang konsisten.

---

## 11. Sampling Trade-Off

Tidak semua trace/log
perlu disimpan penuh selamanya.

Sampling membantu biaya,
tapi menimbulkan trade-off:
- detail insiden langka bisa hilang

Karena itu strategi sampling
perlu sadar:
- traffic volume
- critical path
- error-heavy flows

Sampling asal
bisa membuat masalah penting tidak terlihat.

---

## 12. Correlation Across Signals

Nilai terbesar muncul
saat ketiga sinyal bisa dikaitkan:
- metric spike
- trace anomalous request
- log detail pada span/request itu

Kalau ketiganya terpisah total,
tim tetap harus lompat-lompat manual.

Correlation adalah force multiplier.

---

## 13. Healthcare Example

Misal terjadi keluhan:
- hasil lab lambat muncul di portal

Metrics:
- projection lag naik?
- queue delay naik?

Tracing:
- hop mana yang lambat?

Logs:
- consumer gagal parse payload tertentu?

Gabungan ketiganya
mempercepat diagnosis jauh lebih baik
daripada hanya satu sumber sinyal.

---

## 14. Anti-Pattern Umum

1. Mengandalkan hanya satu sinyal untuk semua problem.
2. Logging terlalu banyak tanpa struktur.
3. Metrics tinggi cardinality dan sulit dipakai.
4. Tracing ada tapi context propagation buruk.
5. Tidak ada cara menghubungkan metric spike ke trace/log relevan.

---

## 15. Best Practices

- gunakan logs untuk detail, metrics untuk trend, traces untuk alur.
- buat logging terstruktur dan kontekstual.
- desain metric dengan nama, unit, dan label yang disiplin.
- pastikan trace context dipropagasikan lintas boundary penting.
- bangun korelasi antar ketiga sinyal.

---

## 16. Pertanyaan Desain Penting

Sebelum menambah telemetry baru, tanya:
1. Pertanyaan apa yang ingin dijawab?
2. Sinyal mana paling tepat: log, metric, atau trace?
3. Konteks apa yang perlu ikut dibawa?
4. Apa biaya/cardinality dari data ini?
5. Bagaimana sinyal ini akan dipakai saat incident nyata?

---

## 17. Mini Latihan

Latihan:
1. Ambil satu incident hipotetis dan tentukan apa yang dijawab metrics, traces, dan logs.
2. Rapikan satu log line menjadi structured log.
3. Audit satu metric yang cardinality-nya terlalu tinggi.
4. Tambahkan correlation/request ID ke satu alur.
5. Cari trace gap pada satu workflow lintas service.

---

## 18. Checklist Kelulusan Topik Logging, Metrics, Tracing

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan peran tiga sinyal observability utama,
- memilih sinyal yang tepat untuk pertanyaan yang tepat,
- mendesain logs/metrics/traces dengan disiplin,
- memahami correlation dan propagation,
- menghindari telemetry noise yang mahal tapi tidak membantu.

---

## 19. Ringkasan Brutal

- Logs, metrics, dan traces itu bukan checklist.
- Mereka adalah alat diagnosis.
- Kalau timmu punya semuanya
  tapi masih lambat memahami incident,
  berarti desain telemetry-mu belum benar.
