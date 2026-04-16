# State Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu state pattern
- kapan state pattern membantu
- bagaimana state pattern mengurangi if-else status-driven logic
- kapan state pattern justru terlalu berat

Banyak sistem punya objek atau workflow
yang perilakunya berubah
tergantung state saat ini.

Masalah muncul saat logika itu ditulis
sebagai:
- if status = A
- else if status = B
- else if status = C

di banyak tempat sekaligus.

Saat itulah state pattern
bisa sangat membantu.

---

## 1. Apa Itu State Pattern?

State pattern adalah cara
merepresentasikan perilaku berbeda
berdasarkan state internal suatu objek/workflow,
dengan memisahkan logika per state
ke unit yang lebih eksplisit.

Alih-alih banyak kondisi status
tersebar di mana-mana,
setiap state
punya perilaku dan transisinya sendiri.

Ini membuat flow lebih mudah dipahami
jika state machine cukup kompleks.

---

## 2. Masalah yang Diselesaikan

State pattern cocok saat:
- perilaku berubah berdasarkan state
- transisi antar state penting
- aturan apa yang boleh/tidak boleh dilakukan
  bergantung pada state

Tanpa pattern ini,
kode sering jadi:
- status check berulang
- transition logic tersebar
- bug invalid transition

Itu sangat umum
di workflow bisnis.

---

## 3. State as Behavior, Not Just Label

Kesalahan umum:
- menganggap state hanya enum/string

Padahal dalam banyak kasus,
state juga menentukan:
- aksi apa yang legal
- respons apa yang dihasilkan
- langkah berikutnya apa

Saat state mulai membawa perilaku,
memodelkannya sebagai pattern
bisa lebih sehat
daripada hanya string compare.

---

## 4. Kapan State Pattern Cocok?

Biasanya cocok untuk:
- approval workflow
- payment lifecycle
- booking lifecycle
- order status transitions
- UI wizard / editor modes

Kalau suatu entity
punya banyak state
dan tiap state punya rule berbeda,
state pattern layak dipertimbangkan.

---

## 5. Kapan Tidak Perlu?

Kalau hanya ada:
- 2-3 state sederhana
- sedikit aturan
- tidak ada perilaku berbeda yang signifikan

if/else atau table sederhana
mungkin sudah cukup.

Jangan jadikan state pattern
sebagai agama untuk semua enum status kecil.

Pattern ini bernilai
saat complexity cukup tinggi.

---

## 6. Transition Rules

Salah satu manfaat utama:
- aturan transisi jadi eksplisit

Contoh:
- `pending -> approved`
- `pending -> rejected`
- `approved -> cancelled` mungkin tidak boleh

Kalau aturan ini tersebar
di banyak handler/service,
inkonsistensi cepat muncul.

State pattern membantu
menaruh aturan di tempat yang lebih sentral.

---

## 7. Illegal Transition Handling

Saat workflow penting,
invalid transition harus jelas.

Contoh:
- claim yang sudah approved
  tidak boleh dikirim ulang seolah draft

State pattern bisa membantu
memastikan aksi yang tidak sah
ditolak secara konsisten.

Ini lebih kuat
daripada berharap semua caller
ingat aturan status.

---

## 8. Healthcare Example

Contoh lifecycle claim:
- draft
- submitted
- under_review
- approved
- rejected
- paid

Perilaku tiap state berbeda:
- draft bisa diedit
- under_review mungkin tidak
- approved tidak bisa kembali draft

Kalau semua itu ditulis
dengan `if status === ...` di banyak tempat,
chaos cepat datang.

---

## 9. State Pattern vs Table-Driven Logic

Kadang alternatif yang cukup sehat adalah:
- transition table
- permission matrix

Ini bisa cukup
untuk kasus yang lebih sederhana.

State pattern menjadi lebih menarik
saat bukan hanya transisi,
tetapi juga perilaku aktif per state
yang makin kaya.

Jangan lupa ada spektrum solusi.

---

## 10. State Explosion Risk

Pattern ini bisa salah
jika jumlah state terlalu banyak
atau dimodelkan terlalu detail.

Akibatnya:
- banyak class/file
- reasoning justru pecah
- state hierarchy membingungkan

Kalau model state dibuat terlalu granular
tanpa manfaat nyata,
pattern ini bisa menjadi beban.

---

## 11. Testing Benefit

State pattern sering membantu testing
karena:
- perilaku per state bisa diuji terpisah
- illegal transitions lebih jelas
- workflow coverage lebih sistematis

Ini sangat membantu
untuk domain dengan lifecycle sensitif.

Namun jika state terlalu banyak,
jumlah skenario test juga bisa melonjak.

---

## 12. Persistence and Reconstruction

Dalam sistem nyata,
state sering disimpan sebagai nilai persisten.

Pertanyaan:
- bagaimana memetakan nilai persisten
  ke behavior state?

Pattern ini harus tetap praktis
di sekitar persistence model.

Kalau mapping-nya terlalu berat
untuk kebutuhan sederhana,
mungkin solusi yang lebih ringan cukup.

---

## 13. Anti-Pattern Umum

1. Memakai state pattern untuk status sederhana yang tidak butuh perilaku khusus.
2. Transition logic tetap tersebar walau pattern sudah diperkenalkan.
3. State terlalu granular tanpa manfaat.
4. Tidak jelas aksi apa yang legal pada tiap state.
5. Enum status dan behavior state hidup tidak sinkron.

---

## 14. Best Practices

- gunakan state pattern saat status mulai menentukan perilaku nyata.
- pusatkan transition rules dan invalid transition handling.
- pertimbangkan solusi lebih ringan untuk kasus kecil.
- jaga model state tetap masuk akal, jangan terlalu granular.
- uji transition matrix dan behavior per state secara eksplisit.

---

## 15. Pertanyaan Desain Penting

Sebelum memakai state pattern, tanya:
1. Apakah status ini benar-benar memengaruhi perilaku?
2. Apakah transition rules sudah cukup kompleks?
3. Apakah logic status sekarang tersebar di banyak tempat?
4. Apakah model state akan tetap mudah dipahami?
5. Apakah table-driven approach lebih cukup?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu workflow status-heavy dan petakan semua state serta transisinya.
2. Identifikasi illegal transitions.
3. Tentukan apakah behavior per state cukup kompleks untuk state pattern.
4. Refactor satu percabangan status besar menjadi model yang lebih eksplisit.
5. Bandingkan dengan alternatif transition table.

---

## 17. Checklist Kelulusan Topik State Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat status sebagai pembawa perilaku, bukan sekadar label,
- mengenali kapan transition complexity layak dipola-kan,
- memusatkan aturan state dan transisi,
- membedakan state pattern dari solusi lebih ringan,
- menghindari state explosion yang tidak perlu.

---

## 18. Ringkasan Brutal

- Kalau statusmu hanya string,
  mungkin state pattern belum perlu.
- Kalau statusmu diam-diam mengendalikan banyak perilaku,
  tapi logiknya tersebar di mana-mana,
  kamu sudah terlambat mempertimbangkannya.
