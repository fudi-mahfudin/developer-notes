# Coupling vs Cohesion - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu coupling
- apa itu cohesion
- kenapa dua konsep ini inti dari desain software
- bagaimana menilai modul yang sehat
- jebakan umum saat membahas coupling dan cohesion

Banyak developer bisa menyebut istilah ini.
Sedikit yang benar-benar memakainya
saat mengambil keputusan desain.

---

## 1. Kenapa Topik Ini Penting?

Coupling dan cohesion adalah dua lensa utama
untuk menilai kesehatan desain.

Kalau kamu bingung:
- kenapa codebase sulit diubah
- kenapa modul terasa "lengket"
- kenapa file terlihat rapi tapi tetap menyebalkan

sering jawabannya ada di sini.

Modul yang sehat biasanya:
- cohesion cukup tinggi
- coupling cukup rendah atau terkendali

Ini bukan hukum absolut,
tapi sangat berguna sebagai kompas desain.

---

## 2. Apa Itu Cohesion?

Cohesion adalah ukuran
seberapa erat isi di dalam sebuah modul
punya tujuan yang sama.

Jika satu modul berisi hal-hal yang:
- saling berkaitan
- berubah karena alasan serupa
- mendukung satu tanggung jawab inti

maka cohesion-nya tinggi.

Kalau satu modul isinya campur:
- auth helper
- date formatter
- HTTP retry
- billing calculator

itu cohesion rendah.

---

## 3. Apa Itu Coupling?

Coupling adalah ukuran
seberapa kuat satu modul bergantung pada modul lain.

Jika perubahan kecil di modul A
mudah memaksa perubahan di modul B, C, D,
coupling kemungkinan tinggi.

Coupling bukan selalu buruk.
Sistem nyata pasti punya dependency.

Yang buruk adalah:
- coupling berlebihan
- coupling tersembunyi
- coupling yang tidak perlu

---

## 4. Ringkasan Sederhana

Kalau ingin mengingat cepat:
- cohesion = kualitas hubungan ke dalam
- coupling = kualitas ketergantungan ke luar

Modul sehat:
- dalamnya nyambung
- luarnya tidak terlalu lengket

Itu inti praktisnya.

---

## 5. Cohesion Tinggi Itu Seperti Apa?

Contoh modul `appointmentScheduling`:
- validasi slot
- cek jam praktik
- create booking
- reschedule rule

Semua isi modul ini
masih berkaitan erat dengan satu domain concern.

Itu contoh cohesion tinggi.

Kalau ada tambahan:
- kirim email marketing
- format invoice PDF

cohesion langsung turun.

---

## 6. Coupling Tinggi Itu Seperti Apa?

Contoh:
- modul `appointment` tahu detail tabel payment
- tahu detail vendor notifikasi
- tahu format UI frontend
- tahu cara kerja auth session

Artinya modul itu bergantung pada banyak hal.

Jika salah satu dependency berubah,
modul ini ikut goyah.

Itu coupling tinggi.

---

## 7. Why It Matters in Real Codebases

Masalah nyata dari coupling tinggi:
- refactor susah
- test berat
- bug menyebar
- reuse semu
- ownership kabur

Masalah nyata dari cohesion rendah:
- modul tidak punya identitas
- perubahan random masuk ke tempat yang sama
- file jadi tempat sampah
- reasoning sulit

Jadi dua konsep ini bukan teori kuliah kosong.
Ini sangat operasional.

---

## 8. Reason to Change

Cara praktis menilai cohesion:
- apakah bagian-bagian ini berubah karena alasan yang sama?

Jika ya,
kemungkinan mereka cocok tinggal bersama.

Jika tidak,
mungkin boundary modul salah.

Contoh:
- perubahan aturan booking
- perubahan vendor SMS

Dua alasan perubahan ini berbeda.
Kalau hidup di satu modul,
itu smell.

---

## 9. Local Change vs Ripple Effect

Cara praktis menilai coupling:
- saat mengubah satu modul,
  seberapa jauh efek rambatnya?

Kalau perubahan kecil memaksa:
- update banyak import
- ubah banyak test tak terkait
- sentuh banyak consumer

itu sinyal coupling tinggi.

Arsitektur sehat berusaha menahan perubahan
agar lebih lokal.

---

## 10. Coupling Bisa Struktural dan Konseptual

Struktural:
- import/dependency langsung

Konseptual:
- asumsi implisit antar modul
- contract tak tertulis
- shared data shape yang rapuh

Kadang code tampak tidak terhubung kuat secara import,
tapi tetap coupled secara konsep.

Ini lebih berbahaya
karena sering tidak terlihat di permukaan.

---

## 11. Contoh Cohesion Rendah: Utils Dump

Folder atau file `utils` sering jadi contoh klasik.

Kenapa?
- semua hal "yang tidak tahu ditaruh di mana"
  dilempar ke sana

Hasil:
- cohesion sangat rendah
- ownership kabur
- util jadi ketergantungan global

Sering kali `utils` besar
adalah tanda desain modular yang lemah.

---

## 12. Contoh Coupling Tinggi: Shared Internal Helper

Masalah lain:
- satu modul mengekspos terlalu banyak helper internal
- modul lain mulai bergantung ke helper-helper itu

Akibat:
- internal detail berubah = banyak modul rusak

Ini coupling tinggi yang lahir
dari public API yang terlalu bocor.

Solusinya:
- kecilkan public surface
- sembunyikan detail internal

---

## 13. Cohesion Tinggi Tidak Sama dengan Modul Besar

Modul bisa besar tapi tetap cohesive
jika semuanya masih mendukung concern yang sama.

Namun tetap ada batas praktis:
- terlalu besar bisa sulit dikelola

Jadi cohesion bukan soal ukuran semata.
Ini soal keselarasan tujuan internal.

---

## 14. Coupling Rendah Tidak Sama dengan Isolasi Palsu

Kadang developer membuat banyak abstraction
agar terlihat low-coupling,
tapi sebenarnya hanya menambah lapisan.

Kalau semua abstraction itu:
- tidak memberi fleksibilitas nyata
- tidak melindungi area perubahan

maka coupling-nya mungkin hanya dipindah,
bukan benar-benar membaik.

Low coupling bukan tentang jumlah interface.
Ini tentang dependency yang masuk akal.

---

## 15. Afferent vs Efferent Thinking Sederhana

Tanpa terlalu akademis,
kamu bisa pikirkan:
- modul ini dipakai siapa saja?
- modul ini bergantung pada siapa saja?

Jika sebuah modul dipakai banyak tempat
dan juga bergantung pada banyak detail yang labil,
itu kombinasi riskan.

Modul seperti itu sulit diubah aman.

---

## 16. Stable vs Unstable Dependency

Coupling ke sesuatu yang stabil
lebih aman daripada coupling ke sesuatu yang sering berubah.

Contoh:
- coupling ke domain contract yang jelas
  sering lebih aman
daripada
- coupling ke vendor SDK atau detail framework tertentu

Senior engineer tidak hanya menghitung jumlah dependency,
tapi juga menilai stabilitas dependency itu.

---

## 17. Frontend Example

Komponen UI dengan cohesion sehat:
- render tabel patient list
- handle sorting lokal
- terima data dalam shape yang jelas

Cohesion turun jika komponen yang sama juga:
- fetch API
- melakukan auth check
- mengirim analytics event
- menghitung business rule rumit

Coupling naik jika komponen
langsung bergantung ke banyak service global dan shape internal backend.

---

## 18. Backend Example

Service `BillingService` yang sehat:
- hitung total invoice
- validasi rule billing
- create invoice entity

Cohesion turun jika service itu juga:
- urus upload avatar
- kirim OTP
- query schedule dokter

Coupling naik jika service itu:
- langsung tahu detail HTTP client vendor
- tahu schema UI response
- tahu format cache key modul lain

Itu tanda desain belum matang.

---

## 19. Cohesion dan Testing

Cohesion tinggi membantu testing:
- modul fokus
- test case lebih jelas
- setup dependency lebih ringan

Cohesion rendah membuat test:
- campur banyak concern
- sulit dipahami
- mudah brittle

Kalau test untuk satu modul terasa seperti test setengah sistem,
itu tanda cohesion/coupling patut dicurigai.

---

## 20. Coupling dan Refactoring Cost

Semakin tinggi coupling,
semakin mahal refactor.

Kenapa?
- lebih banyak consumer terdampak
- lebih banyak asumsi tersembunyi
- lebih banyak risiko regression

Refactor jadi permainan ranjau.

Low/controlled coupling membantu
perubahan lebih lokal dan terukur.

---

## 21. Cara Praktis Menilai Modul

Tanya:
1. satu modul ini sebenarnya bertanggung jawab untuk apa?
2. apakah isi di dalamnya saling berkaitan?
3. apakah modul ini tahu terlalu banyak hal di luar dirinya?
4. kalau saya ubah X, modul lain berapa banyak ikut goyang?

Pertanyaan sederhana ini
sering lebih berguna daripada jargon berat.

---

## 22. Anti-Pattern Umum

1. Satu modul menjadi penampung concern tak berhubungan.
2. Semua internal detail diexpose ke luar.
3. Modul domain bergantung ke detail framework/vendor.
4. Utility bersama dipakai semua orang tanpa boundary.
5. Refactor dilakukan dengan menambah layer tanpa mengurangi coupling nyata.

---

## 23. Best Practices

- jaga reason to change tetap fokus per modul.
- kecilkan public surface.
- hindari dependency ke detail yang mudah berubah.
- evaluasi efek domino saat mengubah modul.
- refactor util dumping ground menjadi domain/module yang lebih cohesive.

---

## 24. Mini Latihan

Latihan:
1. Ambil satu file/service besar, lalu identifikasi cohesion-nya rendah di bagian mana.
2. Ambil satu modul, lalu daftar semua dependency ke luarnya.
3. Tandai dependency mana yang paling rapuh.
4. Cari contoh public API modul yang terlalu bocor.
5. Buat refactor kecil untuk menaikkan cohesion atau menurunkan coupling.

---

## 25. Jawaban Contoh Ringkas

Modul cohesion rendah:
- file `utils.ts` yang berisi helper tak berhubungan.

Coupling tinggi:
- service domain yang langsung bergantung pada framework, vendor SDK, cache format, dan response shape UI.

Perbaikan:
- pindahkan helper ke domain yang tepat
- buat boundary public API yang lebih kecil

---

## 26. Checklist Kelulusan Topik Coupling vs Cohesion

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan coupling dan cohesion dengan bahasa praktis,
- menilai modul sehat atau tidak menggunakan dua lensa ini,
- mendeteksi gejala coupling berlebihan,
- mendeteksi cohesion rendah,
- mengusulkan refactor sederhana yang benar-benar memperbaiki struktur.

---

## 27. Ringkasan Brutal

- Codebase jelek sering bukan karena syntax buruk.
- Seringnya karena dalamnya tidak nyambung
  dan luarnya terlalu lengket.
