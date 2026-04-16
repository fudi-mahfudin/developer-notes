# Outbox Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu outbox pattern
- kenapa outbox pattern diperlukan
- masalah dual write yang diselesaikannya
- bagaimana outbox berhubungan dengan transaksi, event, dan retry
- anti-pattern saat mengimplementasikan outbox

Banyak sistem perlu melakukan dua hal:
- simpan perubahan bisnis inti
- lalu publish event atau pesan keluar

Masalahnya:
- bagaimana menjamin keduanya konsisten?

Kalau dilakukan sembarangan,
kamu akan cepat bertemu
dengan dual write problem.

Outbox pattern adalah salah satu jawaban paling praktis
untuk masalah itu.

---

## 1. Apa Itu Dual Write Problem?

Dual write problem terjadi
saat satu workflow harus:
- menulis ke database
- menulis ke broker/queue/external message system

Jika dua write ini dilakukan terpisah,
bisa terjadi:
- DB sukses, publish gagal
- publish sukses, DB gagal

Hasilnya:
- sistem internal dan downstream
  tidak sepakat tentang kenyataan

Itu sangat berbahaya.

---

## 2. Apa Itu Outbox Pattern?

Outbox pattern biasanya bekerja seperti ini:
1. perubahan bisnis inti disimpan ke database
2. record outbox juga disimpan
   dalam transaksi yang sama
3. proses terpisah membaca outbox
4. lalu mempublikasikan event/pesan keluar

Intinya:
- jangan publish langsung ke broker
  di tengah transaksi bisnis inti

Simpan niat publish
ke tempat yang atomik dengan write utama.

---

## 3. Kenapa Pattern Ini Penting?

Karena ia membantu menjamin:
- jika perubahan inti committed,
  maka event untuk perubahan itu tidak hilang secara diam-diam

Event mungkin tertunda.
Tapi tidak hilang hanya karena crash
di antara dua write terpisah.

Ini jauh lebih andal
daripada berharap kedua write sukses berurutan
di dunia nyata.

---

## 4. Transaction Boundary dan Outbox

Kekuatan outbox datang dari fakta:
- perubahan domain
- outbox entry

ditulis dalam satu transaksi lokal.

Artinya:
- commit atau gagal bersama

Jadi source of truth lokal
tetap konsisten.

Yang async adalah:
- pengiriman keluar setelah commit

Ini kompromi yang jauh lebih sehat.

---

## 5. Publisher Terpisah

Setelah outbox terisi,
perlu ada publisher/relay yang:
- membaca record baru
- publish ke broker
- menandai status terkirim
  atau mencatat progress

Komponen ini sangat penting.

Outbox tanpa relay publisher
hanya memindahkan masalah ke meja lain.

---

## 6. Event Bisa Terlambat, Tapi Tidak Hilang Diam-Diam

Ini nilai penting.

Outbox tidak menjanjikan:
- publish instan

Ia menjanjikan sesuatu yang lebih penting:
- niat publish tersimpan andal

Jadi jika broker sementara down,
event bisa dikirim nanti.

Itu jauh lebih baik
daripada event hilang di celah crash.

---

## 7. Idempotency Masih Penting

Outbox tidak menghilangkan
kebutuhan idempotency.

Karena relay bisa:
- retry
- publish ulang
- crash di waktu yang ambigu

Maka consumer downstream
tetap harus tahan duplicate message
sesuai delivery semantics sistem.

Outbox menyelesaikan satu kelas masalah,
bukan semua masalah messaging.

---

## 8. Outbox Table Design

Pertanyaan penting:
- data apa yang disimpan?
- payload penuh atau referensi?
- status apa yang dilacak?
- bagaimana partition/cleanup dilakukan?

Kalau outbox dibiarkan tumbuh liar,
ia bisa jadi beban database baru.

Outbox adalah komponen produksi,
bukan tabel sementara yang dilupakan.

---

## 9. Polling vs Change Capture

Cara relay membaca outbox bisa beragam:
- polling periodik
- log-based / CDC style integration tertentu

Polling lebih sederhana,
tapi perlu hati-hati pada:
- interval
- load
- duplicate pickup

CDC bisa lebih elegan,
tapi juga lebih kompleks operasional.

Pilih sesuai kematangan tim.

---

## 10. Ordering Consideration

Jika event order penting,
outbox relay harus memikirkan:
- urutan publish
- grouping by aggregate
- parallelism yang aman

Kalau tidak,
event lama bisa diproses setelah event baru
dan membuat projection downstream rusak.

Order bukan otomatis gratis.

---

## 11. Failure Scenario

Beberapa failure penting:
- DB commit sukses, broker down
- relay publish sukses, marking status gagal
- relay crash di tengah batch

Outbox pattern sehat
dirancang untuk tetap recoverable
di skenario seperti ini.

Jika desain status/pickup kabur,
duplikasi atau stuck message akan muncul.

---

## 12. Marking Sent

Setelah publish,
bagaimana outbox ditandai?

Pilihan umum:
- status `sent`
- timestamp published
- retry count
- error terakhir

Ini penting untuk:
- retry management
- observability
- support debugging

Outbox tanpa status yang jelas
cepat berubah jadi kabut operasional.

---

## 13. Cleanup Strategy

Outbox tidak bisa dibiarkan
tumbuh selamanya.

Butuh strategi:
- delete setelah aman
- archive
- partition pruning

Kalau tidak,
tabel outbox bisa membengkak
dan mengganggu performa query/polling.

Operational hygiene penting.

---

## 14. Healthcare Example

Contoh:
- appointment berhasil dibuat

Sistem perlu:
- simpan appointment
- publish event `appointment_created`

Dengan outbox:
- appointment + outbox entry ditulis atomik
- relay kemudian publish event
- reminder service / analytics / notification
  membaca event itu belakangan

Kalau broker sedang down,
appointment tetap tersimpan
dan event tidak hilang begitu saja.

---

## 15. Outbox Bukan Pengganti Semua Integrasi

Pattern ini sangat cocok
untuk domain event/message publishing
yang berangkat dari local transaction.

Tapi ia bukan jawaban
untuk semua masalah integrasi.

Kalau problem utamanya adalah:
- synchronous request/response antar service

outbox mungkin bukan alat utamanya.

Pakai pattern untuk masalah yang tepat.

---

## 16. Monitoring Outbox

Kamu perlu memantau:
- jumlah pending outbox rows
- age dari oldest unsent row
- publish error rate
- retry count
- stuck relay

Kalau pending outbox membengkak,
itu sinyal kuat ada bottleneck
atau incident propagation.

---

## 17. Anti-Pattern Umum

1. Menulis ke DB lalu publish langsung tanpa mekanisme andal.
2. Memakai outbox tapi tidak punya relay yang observable.
3. Menganggap outbox menghilangkan duplicate delivery.
4. Tidak punya cleanup strategy.
5. Tidak memikirkan ordering untuk aggregate yang sensitif.

---

## 18. Best Practices

- gunakan outbox saat perlu menjaga konsistensi local write dan event publish.
- simpan outbox entry dalam transaksi yang sama dengan perubahan inti.
- desain relay agar retryable dan observable.
- anggap duplicate delivery tetap mungkin.
- kelola retention dan cleanup outbox dengan disiplin.

---

## 19. Pertanyaan Desain Penting

Sebelum memakai outbox, tanya:
1. Apakah ada dual write problem nyata?
2. Event apa yang harus dijamin tidak hilang?
3. Bagaimana relay membaca dan publish outbox?
4. Bagaimana duplicate dan ordering ditangani?
5. Bagaimana outbox dimonitor dan dibersihkan?

---

## 20. Mini Latihan

Latihan:
1. Ambil satu workflow yang sekarang dual-write dan desain outbox plan.
2. Tentukan schema outbox minimal.
3. Rancang retry dan marking strategy relay.
4. Tentukan metrik health untuk outbox pipeline.
5. Nilai apakah consumer perlu idempotency tambahan.

---

## 21. Jawaban Contoh Ringkas

Outbox cocok untuk:
- perubahan lokal + event publish
- sinkronisasi ke broker/downstream

Outbox tidak berarti:
- langsung real-time
- exactly once end-to-end

Tapi ia jauh lebih aman
daripada dual write polos.

---

## 22. Checklist Kelulusan Topik Outbox Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan dual write problem,
- memahami kenapa outbox perlu transaksi lokal,
- merancang relay, retry, dan observability dasar,
- menerima kenyataan duplicate delivery,
- mengoperasikan outbox sebagai komponen produksi sungguhan.

---

## 23. Ringkasan Brutal

- Kalau sistemmu menulis DB lalu publish event secara polos,
  kamu sedang berjudi.
- Outbox bukan pattern mewah.
- Outbox adalah cara jujur
  mengakui bahwa crash bisa terjadi di sela dua write.
