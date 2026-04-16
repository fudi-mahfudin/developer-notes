# Event Emitter Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu event emitter pattern
- kapan event emitter berguna di JavaScript/Node.js
- perbedaan event emitter dengan pub-sub yang lebih besar
- risiko hidden flow dan memory leak

Event emitter pattern
adalah salah satu pola paling natural
di ekosistem JavaScript.

Karena JavaScript sendiri
secara historis akrab dengan:
- callbacks
- listeners
- events

Pattern ini bisa sangat berguna
untuk eventing lokal/in-process.

Tapi kalau dipakai tanpa disiplin,
ia cepat berubah menjadi:
- alur tersembunyi
- listener tidak terkendali
- bug lifecycle yang menyebalkan.

---

## 1. Apa Itu Event Emitter Pattern?

Event emitter pattern adalah pola
di mana suatu objek/modul:
- mem-publish event bernama tertentu
- listener mendaftar untuk mendengarkan event itu

Saat event terjadi,
semua listener terkait dipanggil.

Ini sangat cocok
untuk komunikasi in-process
yang cukup longgar,
tapi masih dalam satu runtime yang sama.

---

## 2. Kenapa Ini Populer di Node.js?

Karena banyak subsistem Node.js
memiliki sifat event-driven:
- streams
- lifecycle hooks
- socket events
- internal module notifications

Event emitter terasa natural
untuk model seperti ini.

Ia sederhana,
fleksibel,
dan ringan
untuk event lokal.

---

## 3. In-Process vs Distributed Eventing

Ini perbedaan penting.

Event emitter pattern biasanya:
- lokal
- sinkron atau semi-lokal
- dalam satu process/runtime

Ia tidak sama dengan:
- broker event
- queue
- distributed pub-sub

Jangan membawa asumsi distributed system
ke event emitter lokal,
dan jangan menganggap event emitter lokal
bisa mengatasi kebutuhan distributed eventing besar.

---

## 4. Kapan Pattern Ini Cocok?

Biasanya cocok untuk:
- notifikasi internal antar komponen runtime
- plugin hook lokal
- lifecycle signaling
- state change broadcasting dalam process

Jika kebutuhanmu:
- sederhana
- in-memory
- tidak butuh durability
- tidak butuh retry/distribution

event emitter sering sangat cukup.

---

## 5. Kapan Tidak Cocok?

Tidak cocok jika:
- event harus durable
- listener harus tetap menerima walau process restart
- perlu retry
- perlu scale lintas service
- perlu audit trail kuat

Kalau kebutuhanmu sudah ke sana,
event emitter lokal terlalu lemah.

Ia bukan message bus produksi lintas sistem.

---

## 6. Hidden Flow Problem

Salah satu risiko terbesar:
- alur eksekusi jadi tersembunyi

Kode terlihat:
- emit event

Tapi efek nyatanya bisa:
- lima listener aktif
- salah satunya ubah state
- satu lagi trigger side effect

Kalau daftar listener tidak jelas,
reasoning sistem jadi kabur.

Event emitter sangat kuat,
tapi mudah membuat control flow sulit dilihat.

---

## 7. Synchronous Surprise

Banyak event emitter lokal
memanggil listener secara sinkron.

Ini berarti:
- emit event bisa menjadi mahal
- listener error bisa memengaruhi emitter
- latency bisa naik diam-diam

Kalau developer mengira event itu selalu "async nanti",
bug perilaku akan muncul.

Semantics timing harus dipahami jelas.

---

## 8. Error Handling

Pertanyaan penting:
- kalau satu listener gagal, apa yang terjadi?

Pilihan desain:
- bubble error
- tangkap dan log
- lanjut listener lain

Kalau contract error tidak jelas,
event flow bisa unpredictably rusak.

Event emitter sehat
punya policy error yang tegas,
bukan asumsi diam-diam.

---

## 9. Listener Lifecycle

Listener perlu dikelola:
- register
- unregister
- cleanup

Kalau tidak,
risko muncul:
- memory leak
- duplicate listener
- callback lama tetap aktif

Ini sangat umum
di aplikasi yang punya lifecycle kompleks
atau plugin/hot-reload behavior.

Event emitter bukan sekadar `on()`,
tapi juga disiplin lifecycle.

---

## 10. Healthcare Example

Misal dalam satu proses worker,
setelah `appointmentCreated`,
emitter lokal memicu:
- local metrics increment
- audit enrichment
- in-process notification dispatch preparation

Ini masuk akal
jika semuanya masih dalam satu runtime
dan tidak memerlukan durability lintas process.

Kalau reminder kritikal harus tahan restart,
itu sudah wilayah lain.

---

## 11. Naming Matters

Nama event harus jelas.

Buruk:
- `done`
- `updated`
- `change`

Lebih baik:
- `appointmentCreated`
- `claimApproved`
- `syncFailed`

Nama yang jelas
mengurangi kebingungan dan collision makna.

Event emitter pattern sangat bergantung
pada contract event yang eksplisit.

---

## 12. Anti-Pattern Umum

1. Memakai event emitter untuk kebutuhan durability/distributed reliability.
2. Listener terlalu banyak dan tersembunyi.
3. Tidak jelas apakah listener dipanggil sinkron atau async.
4. Tidak membersihkan listener sehingga terjadi leak/duplicate registration.
5. Event naming terlalu generik dan membingungkan.

---

## 13. Best Practices

- gunakan event emitter untuk event lokal/in-process yang memang ringan.
- dokumentasikan semantics timing dan error handling.
- jaga daftar listener tetap dapat dipahami.
- kelola lifecycle listener dengan disiplin.
- pindah ke pola lain jika kebutuhan durability/distribution muncul.

---

## 14. Pertanyaan Desain Penting

Sebelum memakai event emitter, tanya:
1. Apakah kebutuhan ini benar-benar hanya in-process?
2. Apakah event harus tahan restart atau tidak?
3. Apa yang terjadi jika listener gagal?
4. Siapa yang bertanggung jawab membersihkan listener?
5. Apakah alur setelah emit masih bisa dipahami dengan mudah?

---

## 15. Mini Latihan

Latihan:
1. Ambil satu event emitter lokal dan petakan semua listener-nya.
2. Tentukan apakah semantics-nya sinkron atau async.
3. Audit lifecycle cleanup listener.
4. Ubah nama event generik menjadi lebih domain-relevant.
5. Evaluasi apakah salah satu use case emitter sebenarnya butuh queue/broker.

---

## 16. Checklist Kelulusan Topik Event Emitter Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan event emitter sebagai local eventing pattern,
- membedakannya dari distributed pub-sub,
- mengelola listener lifecycle dan error semantics,
- menjaga event flow tetap dapat dipahami,
- menolak memakainya untuk problem durability yang salah.

---

## 17. Ringkasan Brutal

- Event emitter itu ringan dan praktis.
- Karena ringan, orang sering memakainya terlalu santai.
- Kalau alurmu mulai tak terlihat dan listener tak terkendali,
  event emitter sedang berubah dari alat bantu menjadi jebakan.
