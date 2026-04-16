# Decorator - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu decorator pattern
- kapan decorator membantu menambahkan perilaku tanpa mengubah inti objek
- bagaimana decorator berbeda dari inheritance dan middleware
- kapan decorator justru membuat alur terlalu sulit dipahami

Decorator adalah pattern
untuk menambah perilaku
di sekitar komponen yang sudah ada
tanpa harus mengubah implementasi intinya secara langsung.

Kalau dipakai tepat,
pattern ini memberi fleksibilitas.

Kalau dipakai serampangan,
ia membuat eksekusi terasa seperti bawang:
- lapis demi lapis
- tapi semua orang lupa isi intinya apa.

---

## 1. Apa Itu Decorator?

Decorator adalah komponen
yang membungkus komponen lain
dan menambahkan perilaku
sebelum,
sesudah,
atau di sekitar operasi aslinya.

Kunci utamanya:
- kontrak yang dipakai tetap sama
- perilaku bertambah lewat pembungkusan

Jadi consumer masih bisa memakai objek
melalui interface yang sama,
tapi behavior-nya kini lebih kaya.

---

## 2. Masalah yang Diselesaikan

Decorator berguna saat:
- ingin menambah concern tambahan
- tanpa mengubah core implementation
- dan tanpa membuat inheritance tree meledak

Contoh concern tambahan:
- logging
- metrics
- tracing
- caching
- retry
- authorization wrapper tertentu

Jika semua concern ini dimasukkan
langsung ke kelas inti,
kode inti cepat menjadi gemuk.

---

## 3. Decorator vs Inheritance

Inheritance mencoba menambah perilaku
dengan membuat turunan baru.

Masalahnya:
- kombinasi perilaku cepat meledak
- hierarchy jadi kaku

Decorator lebih fleksibel
karena behavior bisa disusun lewat komposisi.

Contoh:
- service inti
- dibungkus logging decorator
- lalu metrics decorator
- lalu caching decorator

Ini lebih lentur
daripada membuat banyak subclass kombinasi.

---

## 4. Contract Consistency

Decorator yang sehat
tetap menghormati kontrak objek asal.

Artinya:
- consumer tidak perlu tahu
  apakah yang dipakai objek asli atau decorated version

Kalau decorator mengubah kontrak terlalu jauh,
ia mulai keluar dari pola ini
dan boundary jadi kabur.

Decorator menambah behavior,
bukan mengganti keseluruhan interface secara acak.

---

## 5. Kapan Decorator Cocok?

Biasanya cocok untuk:
- cross-cutting concern di service/repository/client
- augmenting behavior pada boundary integrasi
- adding observability/retry/caching
- instrumentation di sekitar call utama

Decorator masuk akal
jika concern tambahan itu:
- orthogonal
- reusable
- tidak mengubah domain intent utama

---

## 6. Kapan Decorator Tidak Perlu?

Kalau tambahan behavior:
- sangat kecil
- hanya sekali pakai
- tidak reusable
- atau justru bagian inti domain logic

decorator bisa berlebihan.

Kadang function biasa
atau explicit wrapper call
lebih jujur.

Pattern jangan dipakai
kalau kebutuhan sebenarnya belum ada.

---

## 7. Cross-Cutting Concern Sweet Spot

Decorator sangat kuat
untuk concern lintas banyak komponen:
- logging query repository
- tracing external API client
- metrics service call
- caching read-only lookup

Keuntungannya:
- logic inti tetap fokus
- concern tambahan bisa dilepas/pasang

Ini sejalan dengan separation of concerns.

---

## 8. Order Matters

Jika ada beberapa decorator,
urutan pembungkusannya penting.

Contoh:
- retry di luar metrics?
- metrics di luar cache?
- tracing di lapisan terluar?

Urutan ini memengaruhi:
- hasil observability
- semantics retry
- apa yang benar-benar diukur

Decorator bukan sekadar "tambahkan semua".
Komposisinya harus disengaja.

---

## 9. JavaScript-Friendly Decorator Thinking

Di JavaScript/TypeScript,
decorator pattern tidak harus
berbentuk fitur bahasa `@decorator`.

Itu dua hal berbeda.

Pattern decorator bisa diimplementasikan sebagai:
- wrapper object
- higher-order function
- proxy-like wrapper

Jangan bingung antara:
- pattern desain
  dan
- syntax decorator TypeScript

Yang penting adalah pola pembungkusannya.

---

## 10. Healthcare Example

Misal ada `LabClient`
untuk memanggil vendor eksternal.

Kita bisa punya:
- base client
- logging decorator
- retry decorator
- metrics decorator

Setiap lapisan menambah nilai operasional
tanpa membuat implementasi vendor call inti
menjadi tempat sampah concern tambahan.

Ini contoh decorator yang sehat.

---

## 11. Decorator vs Middleware

Keduanya mirip secara semangat:
- behavior di sekitar eksekusi

Tapi middleware lebih cocok dipikir
sebagai chain pipeline
untuk request/flow tertentu.

Decorator lebih cocok
untuk membungkus satu komponen/object
dengan kontrak yang sama.

Middleware = pipeline flow.
Decorator = wrapper around component.

---

## 12. Leaky Decorator Problem

Decorator yang buruk sering:
- mengekspos detail tambahan aneh
- mengubah error/return behavior tanpa jelas
- membuat consumer perlu tahu lapisan mana aktif

Kalau consumer harus tahu terlalu banyak
tentang wrapper yang dipakai,
nilai abstraction turun.

Decorator yang baik
menambahkan behavior tanpa membuat pemakaian makin aneh.

---

## 13. Debugging Complexity

Banyak lapisan decorator
bisa mempersulit debugging:
- call stack lebih panjang
- source perilaku lebih tersembunyi
- urutan wrap membingungkan

Karena itu decorator harus dipakai hemat dan sadar.

Kalau setiap hal dibungkus lima lapis,
clarity yang semula didapat
bisa berubah jadi kabut.

---

## 14. Anti-Pattern Umum

1. Decorator dipakai untuk logic domain inti yang seharusnya eksplisit.
2. Terlalu banyak lapisan tanpa dokumentasi order.
3. Decorator mengubah kontrak dengan cara membingungkan.
4. Consumer tetap harus tahu detail internal wrapper.
5. Menganggap syntax `@decorator` otomatis berarti pattern ini diterapkan dengan baik.

---

## 15. Best Practices

- gunakan decorator untuk concern tambahan yang orthogonal dan reusable.
- jaga kontrak komponen tetap stabil.
- pikirkan urutan pembungkusan secara sengaja.
- bedakan pattern decorator dari syntax language decorator.
- hindari wrapper berlapis berlebihan yang menurunkan readability.

---

## 16. Pertanyaan Desain Penting

Sebelum membuat decorator, tanya:
1. Concern apa yang ingin ditambahkan?
2. Apakah concern ini benar-benar cross-cutting?
3. Apakah decorator menjaga kontrak tetap konsisten?
4. Bagaimana order decorator memengaruhi behavior?
5. Apakah wrapper ini mengurangi atau justru menambah kebingungan?

---

## 17. Mini Latihan

Latihan:
1. Ambil satu service client dan tambahkan logging decorator.
2. Tambahkan metrics decorator dan tentukan urutannya.
3. Evaluasi apakah caching/retry lebih cocok sebagai decorator atau explicit logic.
4. Cari satu decorator berlebihan yang sebenarnya cukup function biasa.
5. Gambarkan call flow setelah beberapa decorator dibungkus.

---

## 18. Checklist Kelulusan Topik Decorator

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan decorator sebagai wrapper perilaku,
- membedakannya dari inheritance dan middleware,
- memilih concern yang tepat untuk dibungkus,
- menjaga kontrak dan order tetap jelas,
- menghindari decorator layering yang hanya menambah kabut.

---

## 19. Ringkasan Brutal

- Decorator bagus saat ia menambah capability tanpa mengotori inti.
- Decorator jelek saat ia membuat semua hal terasa "dibungkus sesuatu" tapi tak jelas apa.
- Jika pembungkusmu membuat alur makin sulit dipahami,
  pattern itu tidak lagi membantu.
