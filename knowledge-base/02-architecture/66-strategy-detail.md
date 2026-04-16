# Strategy - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu strategy pattern
- kapan strategy berguna
- bagaimana strategy membantu mengurangi if-else bercabang
- kapan strategy justru terlalu berat

Strategy adalah pattern
yang sangat praktis
untuk mengganti perilaku
berdasarkan konteks tertentu.

Kalau ada logika seperti:
- kalau tipe A lakukan ini
- kalau tipe B lakukan itu
- kalau tipe C lakukan yang lain

dan percabangan itu terus tumbuh,
strategy sering jadi jawaban yang sehat.

---

## 1. Apa Itu Strategy?

Strategy adalah pattern
untuk membungkus beberapa algoritma/perilaku
yang bisa dipertukarkan
di bawah kontrak yang sama.

Intinya:
- consumer memakai interface umum
- implementasi perilaku bisa diganti

Yang berubah:
- cara kerja

Yang tetap:
- kontrak pemakaiannya

---

## 2. Masalah yang Diselesaikan

Strategy cocok saat:
- ada banyak variasi perilaku
- variasi itu setara secara konsep
- caller tidak perlu tahu detail tiap variasi

Tanpa strategy,
sering muncul:
- if-else panjang
- switch-case besar
- logic bercabang tersebar

Itu membuat kode sulit diperluas.

---

## 3. Common Interface

Kekuatan strategy datang dari:
- kontrak umum

Contoh mental model:
- `calculate()`
- `send()`
- `format()`
- `score()`

Setiap strategy implement method yang sama,
tapi dengan perilaku berbeda.

Kalau kontrak tidak jelas,
strategy jadi hanya kumpulan fungsi acak.

---

## 4. Kapan Strategy Cocok?

Biasanya cocok untuk:
- payment fee calculation
- pricing rules
- notification channel behavior
- serialization format
- ranking/scoring logic

Jika variasi perilaku
diperkirakan terus bertambah,
strategy bisa menurunkan biaya perubahan.

---

## 5. Kapan Strategy Tidak Perlu?

Kalau hanya ada:
- dua kondisi kecil
- tidak mungkin tumbuh
- logic sangat sederhana

maka strategy bisa jadi overkill.

Satu function biasa
atau percabangan kecil
mungkin lebih jujur.

Pattern jangan dipakai
sebelum ada complexity yang nyata.

---

## 6. Open for Extension

Salah satu nilai utama strategy:
- menambah variasi baru
  sering tidak perlu mengubah consumer utama

Ini bagus untuk maintainability.

Daripada memodifikasi switch besar
setiap ada tipe baru,
kamu tinggal menambah strategy baru
dan registrasinya.

Ini lebih aman dan lebih modular.

---

## 7. Selection Logic

Strategy pattern tidak otomatis menyelesaikan
cara memilih strategy.

Tetap perlu jawaban:
- siapa yang memilih implementation?
- berdasarkan apa?

Kadang dipilih oleh:
- factory
- config
- dependency injection
- runtime condition

Jangan lupa:
- pemilihan strategy juga bagian desain.

---

## 8. JavaScript-Friendly Strategy

Di JavaScript/TypeScript,
strategy tidak harus class berat.

Sering cukup:
- object dengan function tertentu
- map handler
- plain function implementations

Ini penting.

Pattern strategy adalah soal substitutability,
bukan soal syntax OOP formal.

---

## 9. Healthcare Example

Contoh:
- sistem reminder pasien
  punya strategy berbeda untuk:
  - SMS
  - email
  - WhatsApp

Kontrak umumnya:
- `sendReminder(payload)`

Perilaku detail tiap channel berbeda.

Strategy cocok di sini
karena variasinya setara,
tapi implementasinya berbeda.

---

## 10. Strategy vs If-Else Hell

If-else tidak selalu salah.

Yang salah adalah:
- percabangan besar
- terus tumbuh
- tersebar di banyak tempat

Strategy membantu
jika variasi perilaku
sudah menjadi konsep domain sendiri.

Kalau belum sampai sana,
if sederhana masih boleh.

---

## 11. Testability

Strategy biasanya mudah dites
karena tiap perilaku
bisa diuji secara terpisah.

Ini salah satu manfaat besar:
- logic A tidak bercampur dengan B
- skenario edge case lebih fokus

Tapi kalau strategi terlalu banyak
tanpa boundary yang jelas,
test suite juga bisa ikut membengkak.

---

## 12. Anti-Pattern: Tiny Strategies Everywhere

Kadang tim terlalu semangat
memecah semua hal jadi strategy.

Akibatnya:
- terlalu banyak file kecil
- reasoning sulit
- abstraction cost naik

Kalau variasi perilaku tidak benar-benar independen,
strategy bisa berlebihan.

Gunakan saat ada benefit nyata,
bukan demi pattern purity.

---

## 13. Anti-Pattern Umum

1. Strategy dipakai untuk kasus yang tidak kompleks.
2. Tidak ada kontrak umum yang jelas.
3. Selection logic strategy berantakan.
4. Consumer tetap tahu detail implementasi masing-masing.
5. Strategy terlalu banyak dan terlalu kecil tanpa manfaat.

---

## 14. Best Practices

- gunakan strategy saat variasi perilaku cukup nyata dan cenderung tumbuh.
- definisikan kontrak umum yang bersih.
- pisahkan selection logic dari execution logic bila perlu.
- gunakan bentuk JavaScript yang ringan jika cukup.
- hindari strategi berlebihan untuk kasus trivial.

---

## 15. Pertanyaan Desain Penting

Sebelum membuat strategy, tanya:
1. Apakah variasi perilaku ini memang konsep yang stabil?
2. Apakah percabangan sudah cukup besar untuk dipisah?
3. Apa kontrak umum yang dibutuhkan consumer?
4. Siapa yang memilih strategy?
5. Apakah abstraction ini akan mempermudah perubahan berikutnya?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu switch-case besar dan nilai apakah cocok jadi strategy.
2. Definisikan kontrak umum untuk perilaku yang berbeda.
3. Implement satu strategy baru tanpa mengubah consumer utama.
4. Cari contoh strategy overkill di codebase.
5. Bandingkan readability sebelum dan sesudah.

---

## 17. Checklist Kelulusan Topik Strategy

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan strategy sebagai substitusi perilaku,
- mengenali kapan percabangan layak dipisah,
- membuat kontrak umum yang bersih,
- mengintegrasikan strategy dengan selection logic yang jelas,
- menghindari over-engineering untuk kasus kecil.

---

## 18. Ringkasan Brutal

- Strategy bagus saat variasi perilaku memang nyata.
- Strategy jelek saat dipakai untuk menyamarkan if kecil yang sebenarnya baik-baik saja.
- Pattern ini harus mengurangi keruwetan,
  bukan memindahkannya ke banyak file.
