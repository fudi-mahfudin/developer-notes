# Container vs Presentational Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu container vs presentational pattern
- kenapa pattern ini dulu populer
- kapan masih berguna
- kapan tidak perlu dipaksa
- bagaimana menerapkannya secara modern di frontend JavaScript

Pattern ini sering diajarkan secara dogmatis.
Padahal nilainya tergantung konteks.

Kalau dipakai tepat,
ia membantu separation of concerns.
Kalau dipakai buta,
ia cuma menambah file dan indirection.

---

## 1. Apa Itu Container vs Presentational?

Secara sederhana:

Presentational component:
- fokus pada tampilan
- menerima data via props
- minim logic orchestration

Container component:
- fokus pada orchestration
- ambil data
- kelola state/interaksi tingkat lebih tinggi
- lalu kirimkan ke presentational component

Intinya:
- pisahkan "bagaimana data didapat/diolah"
  dari
- "bagaimana UI dirender"

---

## 2. Kenapa Pattern Ini Muncul?

Karena dulu banyak komponen frontend
menjadi terlalu gemuk:
- fetch data
- mapping
- state
- render
- side effect

Pattern container/presentational
membantu memisahkan concern itu.

Jadi nilai intinya:
- separation of concerns untuk UI.

Itu masih relevan.
Yang tidak relevan adalah penerapan yang terlalu mekanis.

---

## 3. Presentational Component Itu Seperti Apa?

Ciri umumnya:
- menerima data dan callback via props
- fokus pada markup dan interaksi visual
- minim knowledge tentang sumber data

Contoh:
- `AppointmentTable`
- `StatusBadge`
- `PatientCard`

Komponen seperti ini
lebih mudah dipakai ulang dan dites.

---

## 4. Container Component Itu Seperti Apa?

Ciri umumnya:
- mengambil data
- membaca state global/router/query param
- melakukan transformasi
- handle submit/update side effect

Lalu:
- meneruskan hasil ke komponen presentasional

Contoh:
- `AppointmentPageContainer`
- `PatientListContainer`

Container idealnya lebih dekat ke orchestration
daripada visual detail.

---

## 5. Nilai Utama Pattern Ini

Keuntungan jika diterapkan sehat:
- UI rendering lebih fokus
- testing tampilan lebih mudah
- orchestration logic lebih terkonsentrasi
- reuse UI lebih sehat

Ini sangat berguna
saat komponen visual yang sama
perlu digunakan dalam konteks berbeda.

---

## 6. Pattern Ini Bukan Aturan Suci

Tidak semua komponen perlu dipisah
menjadi container dan presentational.

Kalau use case kecil:
- satu komponen sederhana
  dengan state ringan
  bisa jauh lebih masuk akal

Kalau dipaksa,
kamu akan mendapatkan:
- file tambahan
- prop drilling tak perlu
- indirection yang tidak memberi nilai

Pattern harus melayani sistem,
bukan sebaliknya.

---

## 7. Hook Era dan Evolusi Pattern

Di React modern,
banyak peran container
sering berpindah ke:
- custom hooks
- page-level components
- data fetching hooks

Jadi pattern ini tidak hilang,
tapi bentuknya berevolusi.

Container vs presentational sekarang lebih baik dipahami
sebagai separation of concerns pattern,
bukan format file yang wajib sama persis.

---

## 8. Container Tidak Harus Bernama Container

Kadang container adalah:
- page component
- route-level component
- feature shell
- custom hook yang memegang orchestration utama

Yang penting bukan namanya.
Yang penting:
- concern orchestration dipisah dari rendering yang lebih murni.

Kalau terlalu terikat istilah,
kamu bisa kehilangan esensi pattern ini.

---

## 9. Presentational Component Harus "Bodoh"?

Istilah lama sering menyebut:
- dumb component

Istilah ini menyesatkan jika dipahami berlebihan.

Presentational component tetap boleh punya:
- local UI state
- small interaction logic
- formatting ringan

Yang sebaiknya tidak mendominasi:
- data fetching utama
- business orchestration
- global state coordination berat

Jadi "presentational" bukan berarti tanpa logika sama sekali.

---

## 10. Container yang Sehat

Container sehat biasanya:
- fokus pada satu area orchestration
- tidak ikut mengurus tampilan detail
- tidak menjadi god component baru

Ini penting.

Banyak tim berhasil memindahkan kekacauan
dari komponen UI besar
ke container besar yang sama buruknya.

Itu bukan improvement.

---

## 11. Example: Appointment List

Container:
- ambil filter dari URL
- fetch daftar appointment
- handle pagination
- handle action mutation

Presentational:
- render table
- tampilkan empty/loading state via props
- trigger callbacks pada klik

Pemisahan seperti ini cukup sehat.

Kalau tabel langsung tahu semuanya,
reuse dan testability jadi lebih sulit.

---

## 12. Reusability Benefit

Presentational component yang baik
sering lebih reusable
karena tidak terikat pada satu data source tertentu.

Contoh:
- `AppointmentTable`
  bisa dipakai di admin page,
  dashboard doctor,
  atau modal selection,
  selama kontrak props konsisten.

Ini salah satu manfaat utama pattern ini.

---

## 13. Testing Benefit

Presentational component:
- mudah dites dari sisi rendering/interaction

Container:
- dites sebagai orchestration/data flow

Pemisahan ini membantu
mencegah satu tes mencoba menguji semua hal sekaligus.

Kalau UI dan data orchestration bercampur,
test cenderung lebih rapuh dan berat.

---

## 14. Over-Abstraction Warning

Anti-pattern umum:
- setiap komponen kecil dibuat pasangan container/presentational

Contoh yang absurd:
- `ButtonContainer`
- `BadgeContainer`
- `InputContainer`

Jika tidak ada orchestration nyata,
itu hanya birokrasi.

Pattern ini cocok
untuk komponen/fitur yang memang memisahkan concern signifikan,
bukan untuk semua hal.

---

## 15. Healthcare Example

Misal halaman:
- daftar appointment hari ini

Container:
- ambil data berdasarkan klinik dan dokter
- tangani refresh
- lakukan mutation cancel/reschedule

Presentational:
- render tabel
- badge status
- tombol action

Pemisahan ini membuat:
- visual lebih fokus
- orchestration lebih jelas
- perubahan tampilan tidak merusak fetch logic

---

## 16. Custom Hook as Modern Container Logic

Kadang pola modern:
- hook menyimpan logic container
- komponen UI tetap presentational

Contoh:
- `useAppointmentList()`
- `AppointmentListView`

Ini masih sejalan dengan spirit pattern.

Jangan terjebak bahwa container harus selalu komponen visual penuh.

---

## 17. Anti-Pattern Umum

1. Semua komponen dipaksa punya container.
2. Container jadi god component baru.
3. Presentational component terlalu "bisu" sampai tidak praktis.
4. Pattern diikuti sebagai ritual, bukan untuk memisahkan concern nyata.
5. Hook dan container logic bercampur tanpa boundary jelas.

---

## 18. Best Practices

- gunakan pattern ini saat benar-benar membantu memisahkan orchestration dan rendering.
- jangan paksakan untuk komponen kecil yang sederhana.
- biarkan presentational component punya local UI logic secukupnya.
- gunakan hooks jika itu bentuk pemisahan concern yang lebih natural.
- nilai keberhasilan pattern dari clarity dan maintainability, bukan jumlah file.

---

## 19. Mini Latihan

Latihan:
1. Ambil satu komponen besar dan bagi jadi container + presentational.
2. Identifikasi logic mana yang harus tinggal di container.
3. Identifikasi logic mana yang boleh tetap di presentational.
4. Ubah contoh container logic ke custom hook.
5. Jelaskan kapan pattern ini tidak perlu dipakai.

---

## 20. Jawaban Contoh Ringkas

Container:
- fetch data
- orchestration
- mutation
- global state coordination

Presentational:
- render
- local UI behavior ringan

Tidak perlu dipakai jika:
- komponen kecil
- state ringan
- tidak ada separation benefit yang jelas.

---

## 21. Checklist Kelulusan Topik Container vs Presentational

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan esensi pattern ini tanpa dogma,
- memisahkan orchestration dan rendering dengan sehat,
- memahami evolusi pattern ini di era hooks,
- menghindari container/presentational over-abstraction,
- menggunakan pattern ini hanya saat benar-benar memberi nilai.

---

## 22. Ringkasan Brutal

- Pattern ini bagus saat membantu memisahkan concern.
- Pattern ini jelek saat dipakai seperti agama.
- Arsitektur frontend yang sehat butuh akal,
  bukan sekadar template folder.
