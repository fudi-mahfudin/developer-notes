# Observer / Pub-Sub - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu observer pattern
- apa itu pub-sub
- perbedaan keduanya
- kapan pola ini cocok
- risiko coupling tersembunyi dan debugging yang sulit

Observer dan pub-sub
sering dibahas seolah sama.

Mereka mirip,
karena keduanya berbicara soal:
- publisher
- subscriber
- notification saat sesuatu berubah

Tapi secara arsitektur,
ada perbedaan penting
terutama pada coupling dan mediator.

Memahami beda ini
membantu memilih pola yang lebih tepat.

---

## 1. Apa Itu Observer?

Observer adalah pattern
di mana satu subject
memberi tahu observer
saat ada perubahan atau event tertentu.

Biasanya relasinya cukup langsung:
- subject tahu ada daftar observer

Observer cocok untuk:
- reaksi terhadap perubahan state
- callback listeners
- UI update

Ini pattern yang sederhana dan dekat.

---

## 2. Apa Itu Pub-Sub?

Pub-sub adalah pola
di mana publisher mempublikasikan event
ke suatu channel/topic/bus,
lalu subscriber menerima event itu
tanpa publisher perlu tahu subscriber spesifiknya.

Perbedaannya penting:
- ada mediator/broker/event bus di tengah

Ini mengurangi direct coupling
antara producer dan consumer.

---

## 3. Observer vs Pub-Sub

Ringkasnya:

Observer:
- lebih direct
- subject tahu daftar observer

Pub-sub:
- lebih indirect
- publisher tidak perlu tahu subscriber
- broker/topic menjadi perantara

Perbedaan ini memengaruhi:
- coupling
- routing
- observability
- failure handling

---

## 4. Kapan Observer Cocok?

Observer cocok saat:
- scope cukup lokal
- hubungan reaksi sederhana
- publisher dan listener masih satu domain/modul

Contoh:
- state object memberi notifikasi perubahan
- lifecycle hooks
- in-memory eventing kecil

Observer bagus
untuk hubungan dekat dan langsung.

---

## 5. Kapan Pub-Sub Cocok?

Pub-sub lebih cocok saat:
- banyak consumer potensial
- producer tidak perlu tahu siapa mendengar
- ingin extensibility reaction
- eventing lintas modul atau service masuk akal

Contoh:
- domain event internal
- message bus
- analytics listeners
- notification subscribers

Pub-sub memberi loose coupling lebih besar,
tapi dengan biaya operasional lebih tinggi.

---

## 6. Local vs Distributed Use

Observer sering terasa alami
untuk dalam satu process atau modul.

Pub-sub bisa hidup:
- in-process
- cross-process
- via broker

Begitu pub-sub menjadi distributed,
pertanyaannya berubah:
- delivery guarantee
- retry
- ordering
- lag
- observability

Jangan samakan event emitter lokal
dengan distributed pub-sub seolah sama tingkat sulitnya.

---

## 7. Hidden Coupling Risk

Walau pub-sub mengurangi direct coupling,
ia bisa menciptakan hidden coupling:
- publisher tidak tahu siapa bergantung padanya
- subscriber banyak muncul diam-diam
- perubahan event bisa merusak banyak pihak

Loose coupling yang tidak terdokumentasi
bisa berubah jadi chaos coupling.

Event tidak boleh dianggap sihir bebas biaya.

---

## 8. Event Contract Matters

Kalau pakai observer/pub-sub,
kontrak event harus jelas:
- nama event
- payload
- semantics
- kapan event dipublish

Kalau kontrak kabur,
consumer akan membangun asumsi liar.

Perubahan kecil pada event
bisa memicu efek tak terduga
di banyak tempat.

---

## 9. Ordering dan Timing

Pertanyaan penting:
- apakah subscriber harus dieksekusi urut?
- apakah asynchronous?
- apakah kegagalan subscriber memengaruhi publisher?

Pada observer lokal,
timing sering langsung.

Pada pub-sub terdistribusi,
timing bisa tertunda
dan konsistensi jadi eventual.

Jangan abaikan semantics waktu.

---

## 10. Healthcare Example

Contoh event:
- `AppointmentCreated`

Subscriber yang mungkin:
- reminder scheduling
- analytics
- audit trail
- search projection

Pub-sub cocok
jika side effect ini memang longgar
dan tidak harus memblokir transaksi inti.

Kalau semua subscriber dianggap wajib sukses
sebelum transaksi dianggap valid,
itu bukan pub-sub longgar lagi.

---

## 11. Observer in UI / In-Memory Systems

Di frontend atau modul lokal,
observer sering sangat alami:
- state change listeners
- store subscriptions
- event emitter lokal

Ini berguna
tanpa perlu kompleksitas broker besar.

Jangan over-distribute sesuatu
yang masih cukup lokal.

---

## 12. Failure Handling

Pada observer langsung,
subscriber error bisa langsung terlihat.

Pada pub-sub async,
error bisa tertunda atau tersebar.

Ini berarti pub-sub butuh:
- retry policy
- DLQ/failed processing path
- observability

Kalau tidak,
event consumer gagal
bisa diam-diam hilang dari radar.

---

## 13. Debugging Cost

Observer lokal relatif mudah ditrace.

Pub-sub terdistribusi
lebih sulit karena:
- banyak subscriber
- waktu pemrosesan bisa tertunda
- correlation perlu jelas

Jika tim tidak punya tracing/logging yang baik,
pub-sub besar bisa jadi mimpi buruk saat incident.

---

## 14. Anti-Pattern Umum

1. Menganggap observer dan pub-sub sama tanpa melihat coupling dan mediator.
2. Event contract tidak jelas.
3. Menyebar pub-sub ke mana-mana tanpa ownership.
4. Subscriber penting gagal diam-diam tanpa observability.
5. Menggunakan distributed pub-sub untuk problem lokal sederhana.

---

## 15. Best Practices

- gunakan observer untuk relasi lokal yang cukup langsung.
- gunakan pub-sub untuk extensibility dan decoupling yang memang dibutuhkan.
- definisikan kontrak event dengan jelas.
- dokumentasikan publisher dan subscriber penting.
- siapkan observability dan failure handling jika pub-sub sudah distributed.

---

## 16. Pertanyaan Desain Penting

Sebelum memakai observer atau pub-sub, tanya:
1. Apakah hubungan ini cukup lokal atau perlu mediator?
2. Apakah publisher perlu tahu subscriber?
3. Apakah subscriber wajib sukses atau hanya side effect longgar?
4. Bagaimana event contract dijaga?
5. Bagaimana debugging dilakukan saat subscriber gagal?

---

## 17. Mini Latihan

Latihan:
1. Ambil satu alur event dan klasifikasikan lebih cocok observer lokal atau pub-sub.
2. Tulis kontrak event yang jelas.
3. Daftar subscriber yang seharusnya documented.
4. Cari hidden coupling yang sekarang tersembunyi lewat event bus.
5. Evaluasi apakah satu distributed event flow sebenarnya cukup lokal.

---

## 18. Checklist Kelulusan Topik Observer / Pub-Sub

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan observer dan pub-sub secara arsitektural,
- memilih pola sesuai scope dan coupling yang dibutuhkan,
- merancang event contract yang jelas,
- memahami biaya observability dan failure handling,
- menghindari event-driven chaos yang tersembunyi.

---

## 19. Ringkasan Brutal

- Eventing bisa membuat sistem terasa longgar.
- Eventing juga bisa membuat coupling jadi tidak terlihat.
- Coupling yang tidak terlihat
  sering lebih berbahaya daripada coupling yang jujur.
