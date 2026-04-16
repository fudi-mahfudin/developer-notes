# Bounded Context Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu bounded context
- kenapa penting dalam arsitektur dan domain modeling
- bagaimana membedakan context yang sehat
- kesalahan umum saat satu model dipaksa melayani semua kebutuhan

Bounded context sering terdengar "enterprise banget".
Padahal idenya sangat praktis:
- satu istilah atau model
  tidak selalu punya makna sama di seluruh sistem.

Kalau ini diabaikan,
software cepat penuh konflik semantik.

---

## 1. Apa Itu Bounded Context?

Bounded context adalah batas
di mana sebuah model, istilah, dan aturan
memiliki makna yang konsisten.

Artinya:
- di dalam context tertentu,
  kata, entity, dan rule punya arti jelas
- di luar context itu,
  arti yang sama belum tentu berlaku

Ini membantu mencegah satu model
dipaksa menjelaskan semua hal di seluruh sistem.

---

## 2. Kenapa Konsep Ini Penting?

Karena domain bisnis besar
jarang punya istilah yang universal sempurna.

Contoh kata:
- `User`
- `Order`
- `Account`
- `Appointment`
- `Status`

Di satu area,
kata-kata ini bisa punya makna sangat spesifik.
Di area lain,
maknanya berubah.

Kalau semua dipaksa jadi satu model global,
hasilnya:
- model membengkak
- rule bertabrakan
- naming kabur
- ownership kacau

---

## 3. Contoh Sederhana

Dalam sistem healthcare:

`Appointment` di context operasional bisa berarti:
- jadwal konsultasi yang aktif dikelola staf

`Appointment` di context analytics bisa berarti:
- fakta historis untuk reporting

`Appointment` di context billing bisa berarti:
- dasar penagihan atau claim tertentu

Secara kata sama.
Secara makna dan kebutuhan model,
bisa berbeda.

Di sinilah bounded context menjadi penting.

---

## 4. Universal Model Itu Mitos

Banyak tim mencoba membuat satu model pusat
untuk semua use case.

Niatnya:
- rapi
- konsisten

Hasilnya sering:
- model jadi terlalu generik
- field makin banyak
- logic bercampur
- semua tim saling rebut makna istilah

Bounded context mengakui kenyataan:
- tidak semua hal perlu satu model tunggal.

Ini justru lebih jujur dan lebih sehat.

---

## 5. Context = Boundary Semantik

Bounded context bukan sekadar folder atau service.

Ia adalah boundary semantik:
- di sini istilah X artinya apa?
- siapa yang punya authority?
- rule apa yang berlaku?

Kalau boundary ini jelas,
tim lebih mudah:
- berkomunikasi
- mendesain model
- menghindari konflik

Kalau tidak jelas,
argumen teknis sering sebenarnya argumen makna.

---

## 6. Bounded Context dan Ubiquitous Language

Di dalam sebuah context,
tim idealnya berbagi bahasa yang konsisten.

Contoh:
- `BookingConfirmed`
- `NoShow`
- `LateCancel`

Istilah-istilah ini
harus bermakna jelas di context tersebut.

Kalau istilah dipakai longgar dan berubah-ubah,
code, query, dan diskusi tim akan sama-sama kabur.

---

## 7. Bagaimana Mengenali Context yang Berbeda?

Tanda bahwa dua area mungkin context berbeda:
- aturan bisnisnya berbeda
- prioritas datanya berbeda
- istilah sama dipakai dengan makna berbeda
- ownership tim berbeda
- lifecycle data berbeda

Kalau semua sinyal ini ada,
memaksa satu model yang sama
biasanya justru memperburuk sistem.

---

## 8. Example: User

Kata `User` bisa berbeda:

### Auth Context
- identitas login
- password/credential
- session
- MFA

### Billing Context
- customer billing profile
- invoice identity
- tax status

### Product Context
- profile, preference, onboarding

Kalau semua hal ini dipaksa ke satu objek `User`,
entity itu cepat menjadi monster.

---

## 9. Example: Status

`status` adalah kata yang sering merusak model.

Contoh:
- status operasional
- status billing
- status fulfillment
- status analytics classification

Kalau satu kolom `status`
dipakai untuk semua makna ini,
sistem akan kacau.

Bounded context memaksa kita bertanya:
- status ini status dalam context apa?

Itu pertanyaan yang sangat sehat.

---

## 10. Bounded Context Tidak Harus Microservice

Ini salah paham umum.

Bounded context bisa hidup di:
- satu monolith
- modular monolith
- satu repo
- beberapa service

Context adalah konsep desain domain.
Bukan otomatis keputusan deployment.

Kalau langsung menganggap:
- "bounded context = microservice"

itu terlalu cepat dan sering salah.

---

## 11. Context di Dalam Monolith

Bahkan dalam satu codebase,
bounded context tetap berguna.

Contoh:
- modul auth
- modul appointment
- modul billing
- modul reporting

Masing-masing bisa punya:
- model
- istilah
- aturan

yang tidak harus dipaksa seragam penuh.

Ini justru membuat monolith lebih sehat.

---

## 12. Shared Kernel? Hati-Hati

Kadang ada bagian yang benar-benar dibagi,
tapi harus hati-hati.

Semakin banyak shared model lintas context,
semakin besar coupling semantik.

Shared kernel hanya sehat jika:
- benar-benar stabil
- benar-benar dipahami bersama
- skopenya kecil

Kalau terlalu luas,
bounded context runtuh dari dalam.

---

## 13. Translation Antar Context

Kalau context berbeda,
sering perlu translation/mapping.

Contoh:
- event dari booking context
  diterjemahkan menjadi fakta di analytics context

Ini normal.

Yang salah adalah berharap:
- satu model yang sama
  bisa dibawa ke semua context tanpa penyesuaian.

Translation itu biaya,
tapi juga perlindungan boundary.

---

## 14. Data Duplication Bisa Masuk Akal

Sebagian developer takut sekali pada duplikasi model.

Padahal dalam bounded context,
duplikasi tertentu bisa sehat
jika:
- tiap context memang punya kebutuhan berbeda
- ownership berbeda
- coupling lebih terkendali

Contoh:
- reporting snapshot
- billing-facing appointment projection

Ini bukan otomatis anti-pattern.

Yang penting:
- sadar bahwa duplication-nya intentional.

---

## 15. Healthcare Example

Context yang mungkin berbeda:

### Appointment Ops Context
- slot
- booking
- reschedule
- cancellation

### Notification Context
- reminder schedule
- delivery status
- vendor response

### Billing Context
- chargeable visit
- invoice relation
- payment eligibility

### Analytics Context
- fact appointment
- no-show rate
- channel performance

Memaksa semua menjadi satu model global
akan cepat menyakitkan.

---

## 16. Tanda Context Belum Jelas

Gejala:
- debat naming tidak selesai-selesai
- satu tabel/entity punya terlalu banyak field optional
- setiap tim ingin menambah field karena kebutuhannya sendiri
- status/enum makin membengkak
- perubahan satu domain merusak domain lain

Itu biasanya tanda context belum dipisahkan dengan baik.

---

## 17. Bounded Context dan Team Ownership

Context sehat sering sejalan dengan ownership sehat.

Kalau satu tim bertanggung jawab atas:
- model
- rules
- lifecycle

dalam context tertentu,
keputusan jadi lebih jelas.

Kalau ownership campur,
context mudah kabur.

Bounded context sangat membantu
desain organisasi dan review boundary.

---

## 18. Bounded Context dan APIs

API antar modul/service
sering menjadi tempat benturan context.

Kalau satu context mengekspor model mentahnya
dan context lain memakainya tanpa boundary,
coupling semantik naik.

Lebih sehat:
- ekspor contract yang jelas
- terjemahkan sesuai kebutuhan context penerima

Ini membantu mengurangi ketergantungan makna.

---

## 19. Anti-Pattern Umum

1. Satu entity global untuk semua kebutuhan bisnis.
2. Status atau model dipaksa universal.
3. Mengira bounded context otomatis berarti microservice.
4. Tidak ada translation antar context.
5. Shared model terlalu besar sehingga semua context saling terkunci.

---

## 20. Best Practices

- definisikan makna istilah per context.
- bedakan ownership dan aturan domain yang berbeda.
- terima bahwa model bisa berbeda antar area.
- jaga boundary lewat modul/API/translation yang jelas.
- hindari model global raksasa kecuali benar-benar stabil dan kecil.

---

## 21. Mini Latihan

Latihan:
1. Ambil istilah `User` atau `Order` di sistemmu, lalu cari apakah maknanya berbeda di beberapa area.
2. Ambil satu entity yang terlalu gemuk, lalu identifikasi context-context yang sedang bertabrakan di dalamnya.
3. Rancang 2 bounded context untuk domain healthcare sederhana.
4. Jelaskan perbedaan bounded context dan microservice.
5. Buat contoh translation dari booking context ke analytics context.

---

## 22. Jawaban Contoh Ringkas

Bounded context:
- boundary makna dan aturan model

Microservice:
- boundary deployment/runtime

Keduanya bisa berkaitan,
tapi bukan hal yang sama.

Contoh translation:
- `BookingConfirmed` di ops context
  jadi `appointment_fact` di analytics context.

---

## 23. Checklist Kelulusan Topik Bounded Context

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan bounded context tanpa jargon kabur,
- mendeteksi ketika satu model dipaksa terlalu luas,
- membedakan context semantik yang berbeda,
- memahami perlunya translation dan ownership boundary,
- menolak asumsi naif bahwa satu model global selalu paling benar.

---

## 24. Ringkasan Brutal

- Banyak kekacauan arsitektur sebenarnya adalah kekacauan makna.
- Bounded context membantu menghentikan satu model
  agar tidak berpura-pura menjadi jawaban untuk semua hal.
