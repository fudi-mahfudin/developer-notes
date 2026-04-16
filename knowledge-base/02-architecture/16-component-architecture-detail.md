# Component Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu component architecture
- bagaimana membagi UI menjadi komponen yang sehat
- boundary komponen
- reusability vs specificity
- anti-pattern component design

Di frontend modern, component adalah unit arsitektur utama.
Kalau component architecture lemah,
UI akan cepat berubah jadi spaghetti visual.

---

## 1. Apa Itu Component Architecture?

Component architecture adalah cara
menyusun UI dari bagian-bagian kecil
yang punya:
- tanggung jawab jelas
- boundary jelas
- perilaku dan tampilan yang masuk akal

Component bukan sekadar file `.tsx` atau `.vue`.
Component adalah unit desain dan tanggung jawab.

Kalau semua logic dan UI numpuk di satu komponen besar,
arsitektur frontend akan cepat rusak.

---

## 2. Kenapa Ini Penting?

Karena frontend modern:
- terus berubah
- penuh interaksi
- punya banyak state
- harus tetap bisa dirawat dan diuji

Tanpa arsitektur komponen yang baik:
- komponen jadi terlalu besar
- reuse palsu terjadi
- styling dan logic bercampur liar
- debugging state makin sulit

Component architecture adalah fondasi
agar frontend tetap waras saat skala tumbuh.

---

## 3. Tujuan Component Architecture

Tujuan utamanya:
- membagi UI menjadi unit yang masuk akal
- mempermudah pemahaman
- mempermudah reuse yang sehat
- mempermudah testing
- mempermudah perubahan

Bukan tujuannya:
- memecah sebanyak mungkin
- memaksakan "semua harus reusable"
- membuat tree komponen terlihat canggih

Komponen yang sehat harus membantu kerja tim,
bukan sekadar memuaskan rasa rapi.

---

## 4. Komponen Itu Mewakili Apa?

Sebuah komponen bisa mewakili:
- bagian visual tertentu
- unit interaksi tertentu
- boundary state tertentu
- abstraction desain tertentu

Contoh:
- `AppointmentCard`
- `DoctorScheduleTable`
- `PatientSearchInput`
- `ReminderStatusBadge`

Yang penting:
- alasan keberadaan komponen harus jelas.

Kalau kamu tidak bisa menjelaskan
kenapa komponen ini ada,
kemungkinan boundary-nya lemah.

---

## 5. Komponen yang Terlalu Besar

Gejala umum:
- file ratusan baris
- fetch data, transform data, render, modal, validation, analytics event semua campur
- prop banyak dan membingungkan

Masalah:
- sulit dipahami
- sulit diuji
- sulit diubah
- reuse jadi semu

Komponen besar kadang tidak bisa dihindari sepenuhnya,
tapi kalau ini jadi pola dominan,
arsitektur komponen sedang gagal.

---

## 6. Komponen yang Terlalu Kecil

Ekstrem lain juga jelek.

Gejala:
- satu UI kecil dipecah jadi terlalu banyak komponen
- navigation file melelahkan
- abstraction noise tinggi
- flow sulit diikuti

Tujuan component architecture
bukan maksimalisasi jumlah komponen.

Kalau pemecahan terlalu mikro,
biaya mental juga naik.

---

## 7. Presentational vs Behavior-Oriented Component

Sebagian komponen fokus pada:
- tampilan
- struktur visual

Sebagian fokus pada:
- behavior
- orchestration interaksi

Ini tidak selalu harus dipisah kaku,
tapi pembedaan ini berguna
untuk menilai tanggung jawab komponen.

Kalau satu komponen melakukan keduanya secara berlebihan,
boundary mulai kabur.

---

## 8. Reusability yang Sehat

Tidak semua komponen harus reusable lintas aplikasi.

Reusability yang sehat berarti:
- reusable jika memang ada pola yang stabil
- tidak dipaksa generik terlalu cepat

Contoh buruk:
- komponen domain spesifik dipaksa jadi super generic
- API prop jadi rumit
- pemakaian justru membingungkan

Komponen reusable yang baik
lahir dari pola nyata, bukan ambisi awal.

---

## 9. Specificity Itu Bukan Dosa

Komponen yang spesifik pada domain
sering justru lebih sehat.

Contoh:
- `AppointmentStatusBadge`

lebih jelas daripada:
- `StatusRenderer` super generic
  yang diam-diam hanya cocok untuk satu kasus.

Spesifik yang jujur
lebih baik daripada generik palsu.

---

## 10. Component API

Setiap komponen punya API:
- props
- events/callback
- slot/children

API komponen yang baik:
- kecil
- jelas
- tidak bocor terlalu banyak detail internal

Kalau props-nya:
- terlalu banyak
- saling bertabrakan
- butuh banyak flag boolean aneh

itu tanda API komponen buruk.

---

## 11. Boolean Prop Explosion

Ini anti-pattern klasik.

Contoh:
- `isCompact`
- `isDense`
- `isAdminView`
- `isSelected`
- `isReadOnly`
- `showMeta`
- `showExtra`

Kalau satu komponen dipenuhi flag seperti ini,
kemungkinan besar ia sedang menampung terlalu banyak mode.

Lebih sehat:
- pecah variant
- gunakan composition
- atau pisahkan komponen domain yang berbeda.

---

## 12. Composition dalam Component Design

Frontend sangat cocok dengan composition.

Daripada membuat komponen super besar
dengan banyak mode,
sering lebih sehat:
- menyusun UI dari komponen lebih kecil yang jelas

Contoh:
- `Card`
- `CardHeader`
- `CardBody`
- `StatusBadge`
- `ActionMenu`

Lalu dirakit oleh parent yang tepat.

Ini membuat struktur lebih fleksibel.

---

## 13. Smart vs Dumb Components Revisited

Istilah lama:
- smart component
- dumb component

Masih berguna sebagai alat berpikir,
tapi jangan dipakai dogmatis.

Intinya:
- pisahkan area yang banyak orchestration/state
  dari area yang hanya fokus rendering jika memang membantu

Jangan jadikan semua komponen presentational semu
tanpa ada alasan desain yang jelas.

---

## 14. State Boundary

Salah satu hal terpenting dalam component architecture:
- state disimpan di mana?

Kalau state terlalu rendah:
- komponen jadi sulit dikoordinasikan

Kalau state terlalu tinggi/global:
- rerender, coupling, dan complexity naik

Boundary state yang baik
sering menentukan apakah tree komponen terasa sehat atau tidak.

---

## 15. Derived Data dan Mapping

Jangan biarkan setiap komponen
melakukan transform data domain secara liar.

Kalau tiap komponen:
- mapping status sendiri
- format tanggal sendiri
- hitung label sendiri

konsistensi UI turun.

Lebih sehat:
- letakkan mapping/formatter
  di tempat yang konsisten sesuai scope-nya

Komponen sebaiknya menerima data
yang cukup siap dipakai bila memungkinkan.

---

## 16. Styling Concern

Styling juga bagian arsitektur komponen.

Tanya:
- styling hidup di mana?
- variant dikelola bagaimana?
- theme/design token masuk lewat apa?

Kalau styling:
- inline random
- hardcoded di banyak tempat
- tidak konsisten dengan design system

component architecture akan cepat rusak secara visual dan teknis.

---

## 17. Accessibility sebagai Concern Arsitektural

Komponen inti seharusnya tidak mengabaikan accessibility.

Contoh:
- button, modal, menu, table interaction

Kalau komponen dasar tidak accessibile,
semua layer di atasnya ikut mewarisi masalah.

Jadi a11y bukan polish belakangan.
Untuk komponen foundational,
ini bagian dari kualitas arsitektur.

---

## 18. Healthcare Example

Misal halaman appointment list:
- `AppointmentPage`
- `AppointmentFilters`
- `AppointmentTable`
- `AppointmentRow`
- `AppointmentStatusBadge`
- `RescheduleModal`

Ini lebih sehat
daripada satu komponen besar `AppointmentPage`
yang memuat semua hal:
- filtering
- sorting
- row action
- modal
- mapping status
- fetch

Component architecture mempermudah reasoning halaman seperti ini.

---

## 19. Anti-Pattern Umum

1. Satu komponen menangani terlalu banyak concern.
2. Semua komponen dipaksa generic.
3. Props API membengkak dengan banyak flag boolean.
4. Data transformation tersebar liar di banyak komponen.
5. Boundary state tidak jelas.

---

## 20. Best Practices

- buat komponen berdasarkan tanggung jawab yang jelas.
- jaga API props tetap kecil dan mudah dipahami.
- gunakan composition untuk fleksibilitas.
- hindari generic abstraction prematur.
- pikirkan state, styling, dan accessibility sebagai bagian dari desain komponen.

---

## 21. Mini Latihan

Latihan:
1. Ambil satu halaman besar, lalu pecah menjadi komponen yang lebih sehat.
2. Identifikasi prop explosion pada satu komponen.
3. Tentukan komponen mana yang sebaiknya spesifik domain.
4. Tentukan boundary state untuk halaman list + modal.
5. Refactor satu komponen generic palsu menjadi desain yang lebih jujur.

---

## 22. Jawaban Contoh Ringkas

Komponen domain spesifik:
- `AppointmentStatusBadge`
- `DoctorAvailabilityCard`

Prop explosion smell:
- terlalu banyak boolean mode
- API sulit dipahami tanpa baca implementasi

Boundary state sehat:
- state page-level untuk filter/query
- state lokal untuk UI kecil yang tidak perlu dibagikan

---

## 23. Checklist Kelulusan Topik Component Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menilai komponen sehat atau tidak,
- membedakan reuse yang sehat vs generic palsu,
- merancang boundary komponen dan API props yang baik,
- memahami hubungan komponen dengan state dan styling,
- menjaga frontend tetap modular pada level UI.

---

## 24. Ringkasan Brutal

- UI yang rapi di layar
  belum tentu rapi di arsitekturnya.
- Component architecture yang buruk
  membuat setiap layar baru terasa makin berat untuk disentuh.
