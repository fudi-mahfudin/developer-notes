# Event Sourcing Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu event sourcing
- bagaimana event sourcing berbeda dari CRUD biasa
- kapan event sourcing layak dipakai
- biaya dan kompleksitasnya
- kesalahan umum saat orang terlalu cepat tertarik ke pattern ini

Event sourcing adalah salah satu pattern
yang terdengar sangat pintar.

Karena memang bisa sangat kuat.

Tapi ia juga sangat mahal
jika dipakai untuk alasan yang salah.

Kalau kamu memilih event sourcing
hanya karena ingin terlihat "domain-driven",
kamu sedang membeli kompleksitas besar
tanpa jaminan manfaat.

---

## 1. Apa Itu Event Sourcing?

Dalam event sourcing,
state saat ini tidak disimpan
sebagai snapshot mutakhir utama.

Sebaliknya,
sistem menyimpan urutan event perubahan:
- dibuat
- diubah
- dibatalkan
- disetujui

State saat ini
dapat dibangun kembali
dari replay event tersebut.

Jadi yang utama adalah:
- history of change,
bukan hanya current row state.

---

## 2. Bagaimana Ini Berbeda dari CRUD Biasa?

Pada CRUD biasa:
- current state disimpan langsung

Pada event sourcing:
- perubahan disimpan sebagai fakta berurutan

Contoh CRUD:
- `appointment.status = rescheduled`

Contoh event-sourced:
- `AppointmentCreated`
- `AppointmentRescheduled`
- `AppointmentReminderSent`

Ini memberi power tertentu,
tapi juga memaksa cara berpikir berbeda.

---

## 3. Kenapa Orang Tertarik?

Karena event sourcing memberi:
- audit trail alami
- ability to replay
- historical reconstruction
- modeling berbasis perubahan domain
- integrasi yang lebih event-centric

Untuk domain tertentu,
ini sangat bernilai.

Tapi manfaat ini bukan gratis.

---

## 4. Event Bukan Log Teknis Acak

Event sourcing butuh event
yang bermakna secara domain.

Bukan:
- `row_updated`
- `field_changed`

melainkan:
- `ClaimApproved`
- `AppointmentCancelled`
- `PatientRegistered`

Kalau event tidak punya makna domain,
model akan cepat jadi jelek.

Event sourcing bukan sekadar append log.

---

## 5. Rehydration

Untuk mendapatkan current state,
sistem melakukan replay event
ke aggregate/model tertentu.

Ini disebut rehydration.

Masalah:
- semakin banyak event,
  semakin berat rehydration

Karena itu biasanya dibutuhkan:
- snapshot
- projection
- caching tertentu

Event sourcing langsung membawa
masalah performa dan storage yang harus dipikir.

---

## 6. Snapshot

Snapshot adalah ringkasan state
di titik tertentu,
agar replay tidak mulai dari nol terus.

Snapshot membantu:
- mempercepat loading aggregate

Tapi snapshot juga menambah:
- complexity
- invalidation/compatibility concern

Sekali lagi:
event sourcing cepat menuntut
mekanisme tambahan.

---

## 7. Event Immutability

Prinsip penting:
- event masa lalu idealnya immutable

Karena event mewakili fakta
yang telah terjadi.

Kalau event sering diubah sembarangan,
nilai event sourcing runtuh.

Tapi ini juga memunculkan masalah:
- bagaimana menangani bug schema event?
- bagaimana versioning event?

Jadi immutability itu kuat,
tapi mahal secara evolusi.

---

## 8. Event Versioning

Begitu event menjadi kontrak historis,
perubahan shape event jadi sensitif.

Kamu harus pikirkan:
- backward compatibility
- upcaster/transformasi saat replay
- projection lama vs baru

Ini salah satu biaya besar
yang sering tidak disadari pemula.

---

## 9. Projection

Karena current state sulit dibaca langsung
dari stream event mentah,
event-sourced systems sering punya projection:
- read model
- dashboard state
- query view

Projection ini biasanya eventual.

Artinya event sourcing
sering datang satu paket dengan:
- asynchronous projection
- lag
- rebuild concerns

---

## 10. Audit Trail Bukan Alasan Cukup

Banyak orang berkata:
- "kami butuh audit trail,
  jadi pakai event sourcing"

Itu sering berlebihan.

Kalau yang dibutuhkan cuma:
- change log
- audit history

sering ada solusi lebih sederhana:
- audit tables
- append-only logs
- outbox + log

Event sourcing layak
jika manfaat domain-nya benar-benar besar,
bukan sekadar karena ingin sejarah.

---

## 11. Domain Suitability

Event sourcing lebih cocok jika:
- domain sangat berorientasi perubahan/fakta
- history penting secara bisnis
- replay punya nilai nyata
- audit dan temporal reasoning sangat penting

Kurang cocok jika:
- sistem mostly CRUD sederhana
- team belum matang event thinking
- manfaat replay minim

Jangan pakai meriam
untuk memukul lalat CRUD.

---

## 12. Healthcare Example

Area yang mungkin cocok:
- klaim asuransi
- status workflow medis tertentu
- audit proses approval

Area yang mungkin tidak layak:
- master data sederhana
- konfigurasi CRUD kecil
- lookup tabel biasa

Misal status claim berubah banyak tahap,
history benar-benar penting,
dan reconstruct flow berguna,
event sourcing bisa relevan.

Tapi untuk direktori klinik sederhana?
Biasanya tidak perlu.

---

## 13. Debugging dan Reasoning

Event sourcing bisa membantu debugging
karena ada jejak perubahan.

Tapi ia juga bisa mempersulit
karena current state tidak langsung kasat mata.

Tim harus siap dengan tooling:
- event browser
- projection inspection
- replay support

Tanpa tooling,
event sourcing cepat terasa menyiksa.

---

## 14. Rebuild dan Repair

Salah satu kekuatan:
- projection bisa direbuild dari event log

Ini hebat.

Tapi rebuild besar juga mahal:
- waktu
- compute
- compatibility issue

Kalau event store atau versioning event buruk,
rebuild bisa jadi mimpi buruk.

---

## 15. Consistency Trade-Off

Event sourcing sering berarti:
- write side jelas
- read side via projection

yang berarti:
- eventual consistency untuk banyak query

Kalau produk tidak siap
dengan model ini,
UX bisa kacau.

Event sourcing bukan hanya data storage pattern.
Ia mengubah seluruh arsitektur reasoning.

---

## 16. Anti-Pattern Umum

1. Memilih event sourcing untuk CRUD biasa.
2. Event yang tidak punya makna domain.
3. Tidak memikirkan snapshot, projection, dan rebuild.
4. Menganggap audit trail saja cukup jadi alasan.
5. Tidak menyiapkan tooling untuk inspeksi dan debugging.

---

## 17. Best Practices

- pilih event sourcing hanya untuk domain yang benar-benar mendapat manfaatnya.
- modelkan event sebagai fakta domain, bukan log teknis.
- pikirkan versioning event dari awal.
- siapkan snapshot/projection/tooling bila diperlukan.
- pahami bahwa event sourcing biasanya membawa eventual consistency dan complexity tambahan.

---

## 18. Pertanyaan Desain Penting

Sebelum memakai event sourcing, tanya:
1. Nilai bisnis dari history dan replay apa?
2. Apakah domain benar-benar event-centric?
3. Apakah CRUD biasa + audit log sebenarnya sudah cukup?
4. Bagaimana event versioning akan dikelola?
5. Apakah tim siap dengan projection dan tooling tambahan?

---

## 19. Mini Latihan

Latihan:
1. Ambil satu domain dan nilai apakah event sourcing layak.
2. Tulis contoh event domain yang sehat vs event teknis yang buruk.
3. Rancang projection dasar untuk read side.
4. Tentukan kapan snapshot dibutuhkan.
5. Bandingkan event sourcing vs audit log biasa untuk use case tertentu.

---

## 20. Jawaban Contoh Ringkas

Layak dipertimbangkan:
- workflow kaya state transition
- audit/history sangat penting
- replay/projection bernilai nyata

Tidak layak dipaksakan:
- CRUD sederhana
- master data biasa
- tim tanpa kebutuhan dan tooling yang jelas

---

## 21. Checklist Kelulusan Topik Event Sourcing Dasar

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan event sourcing lebih dari sekadar "menyimpan event",
- membedakan domain event dan log teknis,
- menilai kapan pattern ini layak,
- memahami biaya snapshot, projection, versioning, dan rebuild,
- menolak event sourcing bila problemnya tidak layak membayar kompleksitas itu.

---

## 22. Ringkasan Brutal

- Event sourcing itu kuat.
- Event sourcing juga mahal.
- Kalau kamu belum bisa menjelaskan manfaat replay dan history secara konkret,
  kamu kemungkinan belum butuh event sourcing.
