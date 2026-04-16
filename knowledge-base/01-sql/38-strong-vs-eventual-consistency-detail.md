# SQL Strong vs Eventual Consistency - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu strong consistency
- apa itu eventual consistency
- kapan masing-masing cocok
- trade-off nyata
- jebakan ekspektasi sistem

Ini topik yang sering dibahas sok filosofis,
padahal yang penting adalah:
- ekspektasi bisnis,
- biaya teknis,
- dan failure mode nyata.

---

## 1. Apa Itu Strong Consistency?

Strong consistency berarti:
- setelah write sukses,
  pembacaan yang relevan langsung melihat state terbaru
  sesuai model konsistensi yang dijanjikan.

Dalam konteks sederhana:
- apa yang baru ditulis
  langsung terlihat saat dibaca dari jalur yang benar.

Ini penting untuk use case
yang tidak mentoleransi state basi.

---

## 2. Apa Itu Eventual Consistency?

Eventual consistency berarti:
- sistem tidak menjamin semua pembacaan langsung melihat state terbaru,
- tapi seiring waktu,
  semua node/komponen akan menuju state yang konsisten.

Ini umum di:
- read replica
- cache
- event-driven systems
- sinkronisasi lintas service

Yang penting:
- eventual consistency bukan berarti "asal nanti beres".
- harus ada desain yang jelas.

---

## 3. Kenapa Trade-off Ini Ada?

Karena strong consistency penuh
sering mahal dalam:
- latency
- availability
- throughput
- complexity coordination

Sebaliknya eventual consistency
bisa memberi scale/fleksibilitas lebih,
tapi dibayar dengan:
- stale read
- complexity UX
- reconciliation/compensation

Tidak ada pilihan gratis.

---

## 4. Kapan Strong Consistency Diperlukan?

Biasanya untuk:
- saldo / ledger kritikal
- inventory/slot reservation tertentu
- status yang menentukan keputusan langsung
- write-then-read confirmation flow

Kalau user baru melakukan aksi penting
dan sistem bilang "data belum kelihatan, tunggu ya",
itu kadang tidak bisa diterima.

---

## 5. Kapan Eventual Consistency Masuk Akal?

Biasanya untuk:
- dashboard statistik
- feed/analytics
- search index
- sinkronisasi ke sistem sekunder
- read replica non-kritis

Jika delay kecil tidak merusak proses bisnis,
eventual consistency sering cukup dan lebih efisien.

---

## 6. Consistency Itu Contract

Konsistensi bukan hanya urusan DB engineer.

Itu kontrak produk.

Pertanyaan:
- apa yang dijanjikan ke user?
- apa yang dijanjikan ke sistem lain?
- seberapa cepat state harus menyebar?

Kalau kontrak ini tidak jelas,
tim akan saling menuduh saat perilaku sistem terasa aneh.

---

## 7. Read-After-Write

Use case klasik:
- user membuat appointment
- lalu membuka halaman detail appointment itu

Jika halaman detail membaca dari jalur eventual
dan record belum muncul,
user mengira sistem gagal.

Maka untuk flow ini,
sering dibutuhkan strong consistency
atau setidaknya strategi read-after-write yang aman.

---

## 8. Consistency Tidak Harus Seragam

Sistem matang bisa punya kombinasi:
- jalur write + confirmation = strong
- dashboard historis = eventual
- reporting = eventual
- sinkronisasi eksternal = eventual

Tidak semua fitur perlu level konsistensi sama.
Yang penting:
- sadar trade-off per use case.

---

## 9. Eventual Consistency Butuh UX yang Jujur

Kalau sistem eventual,
UX harus menyesuaikan.

Contoh:
- status `processing`
- banner "sedang sinkron"
- refresh otomatis
- disable aksi tertentu sementara

Kalau UX pura-pura semuanya langsung final,
user akan bingung dan menganggap sistem rusak.

---

## 10. Replica dan Eventual Consistency

Read replica adalah contoh yang mudah.

Write ke primary,
read dari replica:
- bisa stale.

Ini bukan bug incidental.
Ini sifat arsitektur.

Jadi:
- jangan pakai replica untuk jalur yang butuh freshest state
  tanpa strategi khusus.

---

## 11. Event-Driven Workflow

Dalam sistem event-driven,
sering ada jeda antara:
- event dipublish
- consumer memproses
- state turunan ikut terbarui

Selama jeda itu,
beberapa bagian sistem belum sinkron.

Itulah eventual consistency.

Kalau consumer gagal,
harus ada retry / reconciliation.

---

## 12. Compensation dan Reconciliation

Eventual consistency yang matang
harus disertai:
- retry
- idempotency
- reconciliation
- compensation jika perlu

Kalau tidak,
"eventual" bisa berubah menjadi
"mungkin konsisten, mungkin tidak".

Itu bukan desain yang bisa dipercaya.

---

## 13. Strong Consistency Juga Bukan Gratis

Kalau terlalu banyak memaksa strong consistency:
- transaction jadi panjang
- coupling naik
- throughput turun
- availability bisa terpukul

Jadi strong consistency bukan otomatis "lebih baik".
Ia hanya lebih tepat
untuk beberapa use case tertentu.

---

## 14. Healthcare Example

Contoh:
- booking slot dokter

Yang butuh strong consistency:
- slot tidak boleh diambil dua orang sekaligus
- confirmation booking harus terlihat akurat

Yang bisa eventual:
- statistik booking per klinik
- summary dashboard mingguan
- sinkronisasi ke data warehouse

Kalau semua dipaksa strong,
sistem jadi berat.
Kalau semua eventual,
bisnis inti jadi rapuh.

---

## 15. Freshness Budget

Cara berpikir yang bagus:
- berapa lama state boleh stale?

Contoh:
- confirmation booking: 0-1 detik
- dashboard operasional: mungkin 30-60 detik
- laporan harian: beberapa menit/jam masih bisa diterima

Ini membantu mengubah debat abstrak
menjadi keputusan konkret.

---

## 16. Common Mistake: Accidental Eventual

Kadang tim tidak sengaja membangun eventual consistency.

Contoh:
- baca dari replica tanpa sadar
- cache tidak diinvalidasi benar
- event consumer lambat tapi tidak dimonitor

Ini paling berbahaya,
karena tim tidak sadar sedang melanggar ekspektasi.

---

## 17. Monitoring Consistency

Kalau sistem punya jalur eventual,
monitor:
- lag
- backlog queue
- consumer failure
- reconciliation mismatch

Eventual consistency tanpa observability
adalah chaos yang disamarkan.

---

## 18. Anti-Pattern Umum

1. Memaksa semua hal strong consistency.
2. Menganggap eventual consistency "nanti juga sinkron" tanpa retry.
3. Read kritikal diarahkan ke sumber stale.
4. Tidak memberi UX yang jujur pada state asynchronous.
5. Tidak mendefinisikan freshness requirement.

---

## 19. Best Practices

- tentukan kebutuhan consistency per use case.
- bedakan jalur kritikal dan non-kritikal.
- dukung eventual consistency dengan retry, idempotency, observability.
- gunakan strong consistency hanya jika benar-benar diperlukan.
- dokumentasikan contract ke tim product dan engineering.

---

## 20. Mini Latihan

Latihan:
1. Jelaskan beda strong vs eventual consistency.
2. Tentukan use case booking mana yang harus strong.
3. Tentukan use case dashboard mana yang boleh eventual.
4. Jelaskan kenapa event-driven system sering eventual.
5. Buat contoh freshness budget untuk 3 fitur berbeda.

---

## 21. Jawaban Contoh Ringkas

Strong:
- hasil write harus segera terbaca sesuai kontrak.

Eventual:
- state bisa stale sementara, tapi akan sinkron nanti.

Booking confirmation:
- strong.

Dashboard statistik mingguan:
- eventual biasanya cukup.

---

## 22. Checklist Kelulusan Topik 38

Kamu dianggap lulus jika bisa:
- menjelaskan trade-off strong vs eventual consistency,
- menentukan kebutuhan konsistensi per use case,
- memahami konsekuensi UX dan operasional,
- menghindari accidental stale-read pada flow kritikal,
- merancang eventual consistency yang tetap andal.

---

## 23. Ringkasan Brutal

- Konsistensi bukan ideologi.
- Itu kontrak sistem.
- Salah memilih level konsistensi
  berarti salah menjanjikan perilaku ke user dan bisnis.
