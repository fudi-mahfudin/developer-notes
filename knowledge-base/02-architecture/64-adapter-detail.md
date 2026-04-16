# Adapter - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu adapter pattern
- kapan adapter diperlukan
- bagaimana adapter membantu integrasi antar interface yang tidak cocok
- anti-pattern saat adapter hanya menjadi wrapper tipis tanpa nilai

Adapter adalah pattern
yang sangat praktis.

Ia muncul bukan karena teori OOP berat,
tapi karena dunia nyata penuh hal seperti:
- library pihak ketiga
- legacy API
- partner integration
- interface lama dan baru

Saat dua sisi tidak cocok bicara,
adapter menjadi penerjemah.

---

## 1. Apa Itu Adapter?

Adapter adalah komponen
yang mengubah satu interface
ke bentuk lain yang diharapkan consumer.

Intinya:
- consumer tidak perlu tahu detail asli pihak luar
- pihak luar tidak perlu diubah

Adapter menyesuaikan kontrak di tengah.

Ia berguna saat ingin
melindungi domain atau aplikasi
dari bentuk antarmuka yang tidak ideal.

---

## 2. Masalah yang Diselesaikan

Adapter cocok saat:
- nama method berbeda
- shape data berbeda
- format error berbeda
- library eksternal terlalu low-level
- legacy interface tidak cocok dengan desain baru

Tanpa adapter,
detail buruk dari dependency luar
sering bocor ke seluruh codebase.

Itu menaikkan coupling.

---

## 3. Adapter vs Wrapper Tipis

Tidak semua wrapper adalah adapter yang berguna.

Kalau kamu hanya membuat:
- `foo()` memanggil `bar()`
  tanpa transformasi makna

nilainya kecil.

Adapter yang sehat
benar-benar menerjemahkan:
- contract
- shape
- semantics

Kalau tidak,
bisa jadi itu hanya lapisan ekstra tanpa manfaat.

---

## 4. Boundary Protection

Kekuatan adapter:
- melindungi core app/domain
  dari bentuk API luar yang jelek atau berubah-ubah

Core app bisa memakai interface yang bersih,
sementara adapter menangani:
- mapping field
- normalisasi status
- transformasi error
- quirk vendor

Ini sangat sehat
untuk menjaga boundary tetap rapi.

---

## 5. Legacy Integration

Adapter sering sangat berguna
saat harus hidup dengan legacy system.

Daripada menyebar if-else legacy
ke mana-mana,
lebih baik:
- satu adapter menampung kekhususan itu

Dengan begitu,
bagian lain dari sistem
tetap berbicara dalam bahasa yang lebih masuk akal.

Adapter adalah alat kompromi yang elegan.

---

## 6. Third-Party SDK Shielding

Kalau aplikasi langsung tergantung
ke SDK/vendor library di banyak tempat,
penggantian vendor nanti mahal.

Adapter membantu:
- satu interface internal
- satu tempat integrasi vendor

Kalau nanti vendor berganti,
permukaan perubahan lebih kecil.

Tidak selalu worth untuk semua library,
tapi sangat berguna
untuk dependency penting atau volatile.

---

## 7. Error Mapping

Adapter yang baik
tidak hanya mengubah data sukses,
tapi juga error.

Contoh:
- error vendor mentah
  diubah jadi error domain/aplikasi yang konsisten

Ini membantu layer atas
tidak harus memahami
semua detail aneh dependency luar.

Kalau error mapping dibiarkan bocor,
boundary adapter setengah gagal.

---

## 8. Data Shape Translation

Salah satu use case paling umum:
- response luar punya field aneh
- internal app ingin model yang rapi

Adapter bisa:
- rename field
- merge/split field
- convert enum
- normalize nullability

Ini lebih sehat
daripada data mentah vendor
dioper terus sampai ke UI/domain.

---

## 9. Healthcare Example

Misal integrasi ke vendor lab eksternal.

Vendor mengirim:
- status kode numerik
- field campur snake_case
- error code proprietary

Internal app ingin:
- status enum yang jelas
- field konsisten
- error type yang bisa ditangani service layer

Adapter menjadi tempat yang tepat
untuk menerjemahkan semua itu.

---

## 10. Adapter vs Facade

Adapter:
- mengubah satu interface menjadi interface lain

Facade:
- menyederhanakan akses ke sistem/subsystem kompleks

Kadang satu komponen bisa terasa seperti keduanya,
tapi perbedaannya penting:
- adapter fokus pada compatibility
- facade fokus pada simplification

Pahami niat utamanya.

---

## 11. Testing Benefit

Adapter membantu testing
karena integration boundary jadi jelas.

Kamu bisa:
- test mapping contract adapter
- mock interface internal yang lebih bersih

Tapi jangan terlalu banyak adapter palsu
hanya demi mocking.

Adapter bernilai
jika boundary eksternalnya memang bermasalah atau berubah.

---

## 12. Anti-Pattern: Leaky Adapter

Adapter jelek sering:
- masih mengekspos nama/error/status vendor mentah
- hanya setengah menerjemahkan
- membuat consumer tetap tahu detail dependency luar

Jika consumer masih harus tahu semua detail asal,
adapter gagal.

Boundary seharusnya makin bersih,
bukan sekadar dipindah tempat.

---

## 13. Anti-Pattern Umum

1. Membuat wrapper tipis lalu menyebutnya adapter.
2. Membiarkan error dan field vendor bocor ke layer atas.
3. Tidak konsisten menerjemahkan contract.
4. Menyebar logika mapping vendor di banyak tempat, bukan satu adapter.
5. Membuat adapter padahal dependency-nya sudah sangat cocok dan stabil.

---

## 14. Best Practices

- gunakan adapter untuk boundary yang memang perlu translation.
- jaga interface internal tetap bersih dan konsisten.
- terjemahkan data, error, dan semantics di satu tempat.
- jangan takut "mengurung" keanehan vendor di adapter.
- hindari adapter kosong tanpa nilai transformasi nyata.

---

## 15. Pertanyaan Desain Penting

Sebelum membuat adapter, tanya:
1. Interface mana yang sebenarnya tidak cocok?
2. Apa yang perlu diterjemahkan: data, method, error, atau semantics?
3. Apakah adapter akan mengurangi coupling nyata?
4. Seberapa volatile dependency luar ini?
5. Apakah boundary internal akan jadi lebih bersih setelah adapter ada?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu SDK/vendor integration dan petakan keanehannya.
2. Desain interface internal yang lebih bersih.
3. Tulis mapping data dan error ke interface baru.
4. Cari leaky adapter yang masih mengekspos detail vendor.
5. Evaluasi apakah semua pemanggil bisa berhenti tahu bentuk API vendor.

---

## 17. Checklist Kelulusan Topik Adapter

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan adapter sebagai penerjemah interface,
- mengenali kapan translation benar-benar dibutuhkan,
- melindungi domain/app dari detail dependency luar,
- membedakan adapter dari wrapper kosong,
- membuat boundary integrasi lebih bersih dan lebih tahan perubahan.

---

## 18. Ringkasan Brutal

- Adapter yang baik mengurung keanehan.
- Adapter yang buruk hanya memindahkan keanehan ke file lain.
- Kalau dependency luar tetap bocor ke mana-mana,
  adapter-mu belum bekerja.
