# Modular Monolith - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu modular monolith
- kenapa sering menjadi pilihan arsitektur yang sangat sehat
- bagaimana membangun boundary internal yang kuat
- bagaimana modular monolith berbeda dari monolith biasa dan microservices

Modular monolith adalah salah satu topik
yang terlalu sedikit dipahami,
padahal sangat sering menjadi jawaban terbaik.

---

## 1. Apa Itu Modular Monolith?

Modular monolith adalah:
- satu deployment utama
- satu sistem runtime utama
- tapi dibagi ke modul-modul internal yang punya boundary jelas

Jadi:
- tetap monolith secara deployment
- tapi modular secara desain internal

Inilah kombinasi yang sering paling rasional
untuk banyak sistem nyata.

---

## 2. Kenapa Modular Monolith Menarik?

Karena ia mencoba mengambil dua keuntungan sekaligus:

Dari monolith:
- operasional lebih sederhana
- transaksi lokal lebih mudah
- debugging lebih mudah

Dari modularity:
- boundary domain lebih jelas
- ownership lebih sehat
- perubahan lebih terlokalisasi

Kalau dilakukan baik,
modular monolith memberi banyak manfaat
tanpa biaya distribusi prematur.

---

## 3. Beda dengan Monolith Biasa yang Berantakan

Monolith biasa yang berantakan:
- semua modul saling tahu
- util jadi tempat sampah
- folder global campur aduk
- tidak ada boundary yang sungguh-sungguh

Modular monolith:
- domain dibatasi jelas
- import/dependency antar modul lebih terkontrol
- public API internal per modul lebih jelas
- struktur mengikuti ownership dan responsibility

Jadi perbedaan utamanya ada di disiplin boundary,
bukan pada jumlah deployable.

---

## 4. Beda dengan Microservices

Microservices:
- boundary ada di jaringan/deployment

Modular monolith:
- boundary ada di dalam codebase dan process yang sama

Artinya modular monolith:
- lebih murah secara operasional
- lebih mudah untuk consistency lokal
- lebih mudah di-refactor lintas modul

Tapi:
- independensi deploy lebih rendah dibanding microservices

Trade-off ini sering justru masuk akal.

---

## 5. Kapan Modular Monolith Cocok?

Biasanya cocok saat:
- domain mulai cukup besar
- tim mulai bertambah
- monolith polos mulai sulit dikelola
- tetapi microservices masih terlalu mahal

Ini adalah sweet spot yang sering sehat:
- struktur internal dewasa
- deployment masih sederhana

Sayangnya banyak tim melompati tahap ini
karena terlalu tergoda distribusi.

---

## 6. Modul dalam Modular Monolith

Modul sebaiknya dibangun berdasarkan domain/problem space,
bukan sekadar layer global.

Contoh:
- `auth`
- `patient`
- `appointment`
- `billing`
- `notification`

Setiap modul bisa punya:
- API internal
- use case
- persistence logic
- domain rules

Ini lebih kuat
daripada satu folder global `/controllers`, `/services`, `/repositories`
untuk seluruh sistem.

---

## 7. Internal Public API

Setiap modul idealnya punya surface yang jelas:
- fungsi/use case apa yang boleh dipanggil dari luar modul?
- bagian mana yang internal?

Kalau seluruh file bebas diimpor lintas modul,
modular monolith akan bocor menjadi monolith biasa.

Boundary internal harus dijaga.

Di TypeScript/JavaScript,
ini bisa dibantu dengan:
- folder structure
- export discipline
- lint rules
- review discipline

---

## 8. Dependency Direction Antar Modul

Modul tidak boleh saling terkait liar.

Pertanyaan penting:
- modul A boleh bergantung pada modul B?
- bolehkah dua modul saling memanggil detail internal?
- apakah dependency harus lewat contract/use case tertentu?

Kalau tidak ada aturan,
modular monolith cepat runtuh.

Boundary internal harus diperlakukan serius,
meski tidak ada network boundary.

---

## 9. Shared Code: Hati-Hati

Bahaya umum:
- semua hal shared dilempar ke `/shared`
- `/common`
- `/utils`

Lama-lama folder shared menjadi pusat coupling.

Modular monolith yang sehat
harus sangat hati-hati dengan kode bersama.

Tanya:
- apakah ini benar-benar generic?
- atau sebenarnya milik satu domain tapi dipinjam semua orang?

Shared code yang salah
merusak modularity dari dalam.

---

## 10. Database dalam Modular Monolith

Biasanya modular monolith masih memakai satu database utama.

Ini memberi keuntungan:
- transaction lokal lebih mudah
- join/reporting tertentu lebih langsung

Tapi tetap:
- boundary data per modul harus dipikirkan
- jangan semua modul mengakses semua tabel sembarangan

Kalau database jadi area tanpa boundary,
modular monolith akan bocor.

---

## 11. Modular Monolith dan Team Ownership

Ini sangat kuat untuk scale tim.

Kalau modul jelas,
tim bisa punya area tanggung jawab yang lebih bersih:
- booking team
- billing team
- notification team

Masih satu repo/deploy,
tapi ownership dan review boundary lebih sehat.

Ini sering cukup untuk skala tim menengah
tanpa perlu microservices penuh.

---

## 12. Testing Benefit

Boundary modul yang baik membantu:
- integration test per modul
- contract test internal
- unit test domain logic

Tanpa boundary,
test jadi terlalu global
dan sulit memahami apa yang sedang diuji.

Modular monolith yang baik
membuat testing lebih fokus,
meski semuanya masih satu deployable.

---

## 13. Refactoring Benefit

Karena masih satu codebase,
refactor lintas modul lebih mudah
daripada sistem microservices.

Kamu bisa:
- pindah boundary
- ubah kontrak internal
- merapikan domain model

tanpa langsung terbentur network contract dan deployment terpisah.

Ini keuntungan besar
untuk sistem yang domain-nya masih berkembang.

---

## 14. Operational Simplicity

Operasional modular monolith tetap lebih sederhana:
- satu deployment utama
- observability relatif lebih mudah
- lokal development lebih ringan
- tidak perlu service mesh / contract sprawl dini

Ini sering sangat bernilai
bagi tim yang ingin fokus ke business value,
bukan ke biaya distribusi terlalu cepat.

---

## 15. Healthcare Example

Sistem klinik:
- auth
- patient
- appointment
- reminder
- billing

Sangat masuk akal dibangun sebagai modular monolith:
- booking logic dan transaksi lokal mudah
- boundary tiap modul tetap jelas
- reporting/ops masih bisa dikelola

Kalau langsung dipecah ke banyak service,
kompleksitas:
- notifikasi
- consistency
- deployment
- tracing

naik sangat cepat.

---

## 16. Smell bahwa Modular Monolith Gagal

Gejala:
- modul bebas import detail internal modul lain
- shared folder membesar liar
- query DB lintas domain tanpa aturan
- satu tim bisa mengubah semua area tanpa review boundary
- modul hanya nama folder, bukan boundary nyata

Kalau ini terjadi,
kamu punya monolith yang diberi label modular,
bukan modular monolith sungguhan.

---

## 17. Kapan Modular Monolith Bisa Dipecah?

Kalau suatu saat perlu distribusi,
modular monolith sehat justru memberi fondasi lebih baik.

Kenapa?
- boundary domain sudah lebih jelas
- kontrak antar modul sudah lebih rapi
- ownership sudah lebih matang

Ini membuat ekstraksi service nanti
lebih rasional dan lebih aman.

Jadi modular monolith bukan jalan buntu.
Sering justru langkah transisi terbaik.

---

## 18. Bukan Semua Modul Harus Jadi Service Nanti

Kesalahan umum:
- mendesain modular monolith
  seolah semua modul pasti nanti jadi microservice

Itu bisa membuat desain terlalu dipaksakan.

Lebih sehat:
- desain boundary karena memang berguna sekarang
- kalau nanti ada satu-dua modul layak diekstrak, baru dipertimbangkan

Arsitektur sehat menjawab kebutuhan nyata,
bukan ramalan liar.

---

## 19. Anti-Pattern Umum

1. Menyebut monolith "modular" padahal import bebas.
2. Shared/common jadi pusat coupling.
3. Database semua modul diakses liar tanpa boundary.
4. Modul dibagi berdasarkan teknologi, bukan domain.
5. Mendesain setiap modul seolah microservice masa depan tanpa kebutuhan nyata.

---

## 20. Best Practices

- bagi modul berdasarkan domain.
- buat public API internal per modul.
- batasi dependency antar modul.
- perlakukan DB access boundary dengan serius.
- pakai modular monolith sebagai alat fokus, bukan label kosong.

---

## 21. Mini Latihan

Latihan:
1. Pecah sistem healthcare sederhana menjadi 4-6 modul.
2. Tentukan public API internal tiap modul.
3. Identifikasi shared code yang benar-benar layak shared.
4. Jelaskan kenapa modular monolith bisa jadi langkah sebelum microservices.
5. Cari tanda bahwa codebase disebut modular padahal boundary-nya palsu.

---

## 22. Jawaban Contoh Ringkas

Modul contoh:
- `auth`
- `patient`
- `appointment`
- `billing`
- `notification`

Public API `appointment`:
- `createAppointment`
- `cancelAppointment`
- `rescheduleAppointment`

Modular monolith berguna sebelum microservices karena:
- boundary bisa dibentuk tanpa biaya distribusi penuh.

---

## 23. Checklist Kelulusan Topik Modular Monolith

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan apa itu modular monolith secara jelas,
- membedakannya dari monolith biasa dan microservices,
- merancang boundary domain internal yang masuk akal,
- mengenali shared-code trap,
- memahami kenapa modular monolith sering menjadi arsitektur transisi yang sangat sehat.

---

## 24. Ringkasan Brutal

- Modular monolith sering merupakan jawaban dewasa
  yang terlalu jarang dipilih.
- Tidak sepolos monolith kacau.
  Tidak semahal microservices prematur.
  Justru sering paling waras.
