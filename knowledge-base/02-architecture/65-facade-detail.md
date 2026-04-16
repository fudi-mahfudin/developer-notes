# Facade - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu facade pattern
- kapan facade membantu menyederhanakan subsystem
- perbedaan facade dengan service layer atau adapter
- anti-pattern saat facade hanya jadi lapisan pasif tanpa nilai

Facade adalah pattern
yang sangat berguna
saat sistem mulai terasa terlalu berisik
untuk dipakai langsung.

Bukan karena subsistem itu salah,
tapi karena consumer
tidak seharusnya tahu
semua detail internal subsistem tersebut.

Facade memberi antarmuka yang lebih sederhana
untuk kebutuhan yang paling umum.

---

## 1. Apa Itu Facade?

Facade adalah antarmuka sederhana
di depan subsystem yang lebih kompleks.

Tujuannya:
- menyederhanakan pemakaian
- mengurangi coupling ke detail internal
- memberi entry point yang lebih mudah dipahami

Facade tidak harus menyembunyikan
semua kemampuan subsystem.

Ia hanya memberi jalur yang lebih sederhana
untuk kebutuhan yang paling penting atau sering.

---

## 2. Masalah yang Diselesaikan

Facade cocok saat consumer
harus berurusan dengan:
- terlalu banyak langkah
- terlalu banyak objek
- terlalu banyak detail konfigurasi
- urutan pemanggilan yang mudah salah

Tanpa facade,
logic orchestration kecil itu
bisa tersebar ke banyak caller.

Akibatnya:
- boilerplate
- coupling
- inkonsistensi

---

## 3. Facade Menyederhanakan, Bukan Mengganti Semuanya

Ini penting.

Facade biasanya tidak menghapus subsystem asli.

Ia memberi "jalur cepat" atau "jalur umum"
yang lebih nyaman.

Power user atau area tertentu
mungkin masih perlu akses ke layer bawah.

Facade sehat
tidak harus memenjarakan semua kemampuan.
Ia mempermudah mayoritas use case.

---

## 4. Kapan Facade Berguna?

Biasanya berguna saat:
- ada beberapa dependency yang sering dipakai bersama
- pemanggilan butuh urutan tertentu
- subsystem terlalu low-level untuk consumer biasa
- ingin menyederhanakan use case umum

Contoh:
- file upload flow
- notification pipeline
- payment orchestration ringan
- search client abstraction

Facade bagus saat complexity pemakaian
lebih berat daripada yang seharusnya.

---

## 5. Facade vs Service Layer

Mirip, tapi tidak sama.

Service layer:
- fokus pada use case aplikasi/business orchestration

Facade:
- fokus pada penyederhanaan akses ke subsystem

Kadang secara implementasi dekat,
tapi niatnya berbeda.

Jika yang kamu lakukan adalah
menyederhanakan penggunaan beberapa komponen teknis,
itu lebih mirip facade.

Jika yang diorkestrasi adalah use case bisnis,
itu cenderung service layer.

---

## 6. Facade vs Adapter

Adapter:
- menerjemahkan satu interface ke interface lain

Facade:
- menyederhanakan subsystem kompleks

Facade tidak selalu mengubah contract secara radikal.
Sering ia hanya:
- menyusun
- menata
- menyederhanakan

Adapter lebih soal compatibility.
Facade lebih soal usability dan complexity hiding.

---

## 7. Reducing Boilerplate

Salah satu manfaat paling nyata:
- caller tidak perlu menulis urutan langkah sama berulang-ulang

Misal tanpa facade:
1. build payload
2. validate config
3. pick provider
4. send
5. map result

Dengan facade:
- `notificationFacade.sendReminder(...)`

Ini contoh nilai facade yang konkret.

---

## 8. Encapsulating Order

Kadang subsystem butuh urutan langkah
yang jika salah bisa bikin bug.

Facade bisa memaksa urutan yang masuk akal
untuk use case umum.

Ini membantu:
- mengurangi misuse
- mengurangi copy-paste orchestration
- menurunkan beban mental consumer

Jika urutan penting tapi dibiarkan ke semua caller,
bug akan muncul cepat.

---

## 9. Healthcare Example

Misal modul notifikasi healthcare
punya komponen:
- template service
- consent checker
- preference resolver
- channel sender
- audit logger

Tanpa facade,
setiap caller harus memahami semua bagian itu.

Dengan facade:
- `sendAppointmentReminder(patientId, appointmentId)`

Subsystem tetap kompleks di dalam,
tapi consumer mendapat antarmuka yang jauh lebih wajar.

---

## 10. Facade dan Evolusi Internal

Facade membantu
karena internal subsystem
bisa berevolusi
dengan dampak lebih kecil ke consumer.

Selama kontrak facade stabil,
refactor internal lebih aman.

Ini salah satu alasan facade bagus
untuk subsystem yang cenderung berubah
atau punya banyak moving parts.

---

## 11. Facade Tidak Boleh Jadi God Layer

Anti-pattern umum:
- semua hal dilempar ke satu facade besar
- akhirnya ia tahu semua use case
- method-nya meledak

Itu bukan simplification,
itu penumpukan complexity.

Facade yang sehat
punya scope yang jelas:
- satu subsystem
- satu area problem

Jika terlalu luas,
pecah.

---

## 12. Thin Facade Problem

Kebalikan ekstrem lain:
- facade hanya meneruskan call 1:1
  tanpa menyederhanakan apa pun

Kalau tidak ada reduction in complexity,
nilai facade rendah.

Facade harus membantu consumer.
Kalau hanya menambah lapisan nama,
ia menjadi birokrasi kecil.

---

## 13. Testing Benefit

Facade bisa membantu testing
dengan memberi satu surface yang lebih kecil
untuk kebutuhan umum.

Tapi jangan sampai facade
menjadi tempat semua logic acak
hingga sulit diuji.

Boundary yang jelas tetap penting.

Facade bagus saat mempermudah penggunaan,
bukan saat menjadi dumping ground.

---

## 14. Anti-Pattern Umum

1. Facade menjadi god object untuk banyak subsystem tak terkait.
2. Facade sangat tipis dan tidak menyederhanakan apa pun.
3. Consumer tetap harus tahu terlalu banyak detail internal.
4. Facade dipakai untuk use case bisnis padahal lebih tepat service layer.
5. Tidak jelas scope subsistem yang dibungkus.

---

## 15. Best Practices

- gunakan facade untuk menyederhanakan penggunaan subsystem yang kompleks.
- fokus pada use case umum yang paling butuh penyederhanaan.
- jaga scope facade tetap sempit dan jelas.
- biarkan detail internal berubah di belakang facade.
- hindari facade kosong atau facade monster.

---

## 16. Pertanyaan Desain Penting

Sebelum membuat facade, tanya:
1. Complexity mana yang ingin disembunyikan?
2. Apakah caller saat ini harus tahu terlalu banyak detail?
3. Use case umum apa yang bisa disederhanakan?
4. Apakah ini sebenarnya adapter atau service layer?
5. Apakah facade ini akan tetap punya scope yang sehat?

---

## 17. Mini Latihan

Latihan:
1. Cari subsystem yang sering dipanggil dengan urutan langkah berulang.
2. Desain facade sederhana untuk use case umum.
3. Bandingkan jumlah knowledge yang harus dimiliki caller sebelum dan sesudah facade.
4. Cari facade tipis atau facade monster di codebase.
5. Tentukan batas scope facade agar tidak membengkak.

---

## 18. Checklist Kelulusan Topik Facade

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan facade sebagai penyederhana subsystem,
- membedakannya dari adapter dan service layer,
- mengenali kapan complexity pemakaian layak disembunyikan,
- membuat facade yang benar-benar mengurangi boilerplate dan misuse,
- menghindari facade kosong maupun facade raksasa.

---

## 19. Ringkasan Brutal

- Facade yang baik membuat subsystem kompleks terasa wajar dipakai.
- Facade yang buruk hanya memberi file ekstra.
- Kalau caller tetap harus tahu semua detail internal,
  facade-mu tidak menyederhanakan apa-apa.
