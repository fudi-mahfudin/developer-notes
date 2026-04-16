# Observability Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu observability architecture
- kenapa observability lebih luas dari logging biasa
- bagaimana merancang sistem agar perilakunya bisa dipahami
- hubungan logs, metrics, tracing, dan context
- anti-pattern saat observability hanya jadi dashboard kosmetik

Sistem besar yang tidak bisa diamati
akan selalu terasa lebih buruk
daripada yang sebenarnya.

Karena saat ada masalah,
tim tidak tahu:
- apa yang rusak
- di mana rusaknya
- seberapa besar dampaknya
- sejak kapan

Observability bukan garnish ops.
Ia adalah kemampuan sistem
untuk menjelaskan dirinya sendiri
saat perilaku tak terduga muncul.

---

## 1. Apa Itu Observability?

Observability adalah kemampuan
untuk memahami keadaan internal sistem
dari sinyal yang dihasilkannya.

Tujuan praktisnya:
- debugging lebih cepat
- incident triage lebih tepat
- bottleneck lebih mudah ditemukan
- perilaku tak terduga bisa dijelaskan

Ini lebih dari sekadar punya log file.

---

## 2. Observability vs Monitoring

Monitoring biasanya menjawab:
- apakah known issue ini sedang terjadi?

Observability lebih luas:
- apa yang sebenarnya terjadi,
  termasuk hal yang tidak kita prediksi sebelumnya?

Monitoring sering berupa:
- alert atas metric tertentu

Observability mencakup:
- logs
- metrics
- traces
- correlation/context

Keduanya penting,
tapi tidak identik.

---

## 3. Kenapa Ini Penting?

Karena sistem modern:
- terdistribusi
- async
- penuh dependency
- punya banyak mode gagal

Tanpa observability,
setiap incident menjadi:
- cari jarum di gudang jerami

Dengan observability yang baik,
tim bisa:
- narrowing cepat
- tahu blast radius
- tahu dependency penyebab
- tahu apakah perbaikan efektif

---

## 4. Three Pillars and Beyond

Sering dibahas tiga pilar:
- logs
- metrics
- traces

Ini berguna sebagai model dasar.

Tapi observability matang
juga butuh:
- correlation IDs
- structured context
- event visibility
- dependency map

Pilar tanpa context
sering tidak cukup.

---

## 5. Logs untuk Detail

Logs bagus untuk:
- detail kejadian
- payload terpilih
- branch logic
- error specifics

Tapi logs jelek jika:
- tidak terstruktur
- terlalu noisy
- tidak punya correlation key

Log yang banyak
tidak otomatis berarti observability baik.

Kadang itu hanya kebisingan mahal.

---

## 6. Metrics untuk Trend dan Health

Metrics bagus untuk:
- rate
- latency
- error percentage
- saturation
- backlog

Ia membantu melihat:
- trend
- aggregate health
- threshold crossing

Metrics memberi pandangan luas,
tapi sering kurang detail
untuk tahu akar masalah spesifik.

---

## 7. Tracing untuk Alur End-to-End

Tracing sangat penting
di sistem dengan banyak hop:
- gateway
- service A
- service B
- DB
- external API

Tracing membantu menjawab:
- request ini lama di mana?
- hop mana yang gagal?
- dependency mana yang memperlambat?

Tanpa trace,
debugging distributed system
cepat berubah jadi tebak-tebakan.

---

## 8. Correlation ID

Bahkan sebelum tracing penuh,
correlation ID sangat berharga.

Ia membantu mengaitkan:
- log antar service
- audit event
- workflow async
- request ke job lanjutan

Tanpa correlation,
tiap log berdiri sendiri
dan incident timeline sulit direkonstruksi.

---

## 9. Observability by Design

Observability yang baik
tidak datang dari akhir proyek.

Ia harus dipikir saat desain:
- apa sinyal penting?
- apa failure mode penting?
- data konteks apa yang perlu ada?
- ID apa yang harus dibawa lintas boundary?

Kalau observability ditempel belakangan,
sering banyak context penting sudah hilang.

---

## 10. Domain-Relevant Signals

Jangan hanya ukur hal teknis generik.

Ukur juga sinyal yang relevan untuk bisnis/domain:
- booking success rate
- claim approval lag
- reminder queue age
- cross-tenant error spike

Observability matang
menghubungkan kesehatan teknis
dengan dampak bisnis.

---

## 11. Async Systems Need More Visibility

Pada sistem async,
observability jadi lebih penting:
- queue depth
- oldest message age
- retry count
- DLQ size
- consumer lag

Karena masalahnya tidak selalu terlihat
di request-response langsung.

Tanpa sinyal ini,
bug async bisa hidup lama
tanpa disadari.

---

## 12. Healthcare Example

Dalam sistem healthcare,
observability penting untuk:
- latency akses data klinis
- anomali akses sensitif
- backlog notifikasi pasien
- kegagalan integrasi lab
- keterlambatan claim processing

Tim perlu tahu
bukan hanya service mana error,
tapi juga:
- proses bisnis mana yang terdampak

Itu beda level kematangan.

---

## 13. Cardinality Trap

Observability juga punya biaya.

Jika label/tag terlalu liar:
- biaya naik
- tool melambat
- metric store kacau

Contoh buruk:
- gunakan user_id mentah sebagai high-cardinality label di semua metric

Konteks penting,
tapi harus dipilih dengan disiplin.

---

## 14. Alerting Bukan Dashboard Cantik

Observability gagal
jika semua orang punya dashboard,
tapi tidak ada yang tahu
kapan harus bertindak.

Alert harus:
- actionable
- tidak terlalu noisy
- terkait dampak nyata

Dashboard tanpa actionability
sering hanya wallpaper ops.

---

## 15. Incident Triage Support

Observability architecture yang baik
harus mempercepat pertanyaan awal incident:
- scope dampak?
- service mana terlibat?
- dependency mana mencurigakan?
- mulai kapan?
- tenant/user/domain mana terdampak?

Kalau pertanyaan dasar ini
masih butuh 45 menit,
observability-mu lemah.

---

## 16. Anti-Pattern Umum

1. Hanya punya log mentah lalu menyebutnya observability.
2. Tidak membawa correlation context lintas service.
3. Mengumpulkan data terlalu banyak tanpa struktur.
4. Tidak punya domain-level metrics.
5. Dashboard banyak tapi tidak membantu incident response.

---

## 17. Best Practices

- pikirkan observability sejak desain sistem.
- kombinasikan logs, metrics, traces, dan correlation context.
- ukur sinyal teknis dan domain yang penting.
- desain alert yang actionable.
- anggap observability sebagai capability inti, bukan biaya sampingan.

---

## 18. Pertanyaan Desain Penting

Sebelum mengatakan sistem observable, tanya:
1. Jika request lambat, apakah kita bisa tahu bottleneck-nya?
2. Jika workflow async macet, apakah kita tahu di mana?
3. Jika tenant tertentu error, apakah kita bisa mengisolasi dampaknya?
4. Apakah sinyal kita cukup untuk triage cepat?
5. Apa biaya/cardinality dari telemetry yang kita kirim?

---

## 19. Mini Latihan

Latihan:
1. Petakan logs, metrics, traces yang dibutuhkan untuk satu user journey.
2. Tambahkan correlation ID di flow sync dan async.
3. Tentukan tiga domain metrics yang penting.
4. Audit dashboard yang hanya kosmetik.
5. Simulasikan incident dan lihat apakah telemetry cukup untuk triage.

---

## 20. Checklist Kelulusan Topik Observability Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan observability dari monitoring biasa,
- merancang telemetry yang membantu unknown debugging,
- menggabungkan log, metric, trace, dan context,
- memikirkan biaya/cardinality telemetry,
- menjadikan observability alat operasi nyata, bukan hiasan.

---

## 21. Ringkasan Brutal

- Sistem yang tidak observable
  akan selalu terasa lebih misterius daripada perlu.
- Mystery itu mahal.
- Observability bagus bukan yang paling banyak datanya,
  tapi yang paling cepat mengubah kebingungan jadi diagnosis.
