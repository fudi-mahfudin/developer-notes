# Module Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu module pattern
- kenapa encapsulation penting di JavaScript
- bagaimana module pattern relevan di era ES modules
- kapan module pattern membantu dan kapan tidak perlu dibesar-besarkan

Module pattern adalah salah satu fondasi
cara berpikir arsitektur di JavaScript.

Bahkan sebelum framework besar,
masalah dasarnya sudah sama:
- bagaimana mengelompokkan code,
- menyembunyikan detail internal,
- dan mengekspor hanya yang perlu?

Hari ini kita punya ES modules,
tapi prinsip intinya tetap sama:
- boundary.

---

## 1. Apa Itu Module Pattern?

Module pattern adalah cara
mengelompokkan state dan behavior
ke dalam satu unit
dengan boundary yang jelas:
- apa yang private
- apa yang public

Di JavaScript modern,
ini sering diwujudkan melalui:
- file/module exports
- closure
- factory module

Inti pattern-nya:
- encapsulation dan API surface yang sengaja.

---

## 2. Masalah yang Diselesaikan

Tanpa module thinking,
codebase mudah jadi:
- global-ish
- saling impor liar
- detail internal bocor
- utility acak jadi dependency semua orang

Module pattern membantu menjawab:
- apa yang modul ini tanggung?
- apa yang boleh dipakai dari luar?
- apa yang harus tetap tersembunyi?

Ini fondasi arsitektur,
bukan hanya sintaks import/export.

---

## 3. Historical Context

Sebelum ES modules,
JavaScript sering memakai:
- IIFE
- revealing module pattern
- namespace objects

Hari ini,
ES modules membuat syntax lebih rapi.

Tapi jangan salah:
- masalah arsitekturnya sama

File `export` yang berantakan
tetap bukan module design yang sehat.

---

## 4. Public API Matters

Module sehat punya surface kecil dan jelas.

Semakin banyak hal diekspor,
semakin besar coupling ke modul itu.

Kalau internal helper semua diekspor,
modul kehilangan ability untuk berubah aman.

Module pattern yang baik
memaksa kita memilih:
- apa yang benar-benar kontrak publik

Bukan semua isi file.

---

## 5. Private Internals

Salah satu kekuatan modul:
- implementasi detail bisa disembunyikan

Ini membantu:
- refactor aman
- mencegah pemakaian liar
- menurunkan cognitive load consumer

Kalau semua boleh diakses,
tidak ada encapsulation nyata.

Module pattern
adalah alat membangun batas sehat,
bukan sekadar folder structure cantik.

---

## 6. ES Module Does Not Guarantee Good Design

Banyak developer mengira:
- karena pakai `import/export`,
  maka modulnya otomatis bagus

Salah.

Modul bisa tetap buruk jika:
- tanggung jawab campur aduk
- export terlalu banyak
- dependency direction kacau
- helper internal jadi API tak sengaja

Syntax modern tidak otomatis berarti arsitektur modern.

---

## 7. Single Responsibility at Module Level

Pertanyaan penting:
- modul ini sebenarnya bertanggung jawab atas apa?

Jika jawabannya terlalu banyak,
modul itu mulai kabur.

Contoh modul sehat:
- fokus pada satu feature/helper domain tertentu

Contoh modul buruk:
- sedikit auth
- sedikit date formatting
- sedikit validation
- sedikit config

Itu bukan modul.
Itu laci acak.

---

## 8. Revealing Module Thinking

Prinsip revealing module masih relevan:
- internal bisa banyak
- publik cukup yang diperlukan

Dalam ES module modern,
ini tercermin pada:
- hanya export fungsi/type yang memang perlu

Ini terlihat sederhana,
tapi sangat kuat
untuk menjaga boundary tetap sehat.

---

## 9. Module Pattern dan Testability

Module yang sehat
lebih mudah diuji
karena surface-nya jelas.

Tapi jangan salah arah:
- jangan mengekspor semua internal
  hanya demi test

Kalau perlu menguji terlalu banyak internals,
bisa jadi desain modulnya sendiri bermasalah.

Testability harus sejalan
dengan encapsulation yang masuk akal.

---

## 10. Healthcare Example

Misal ada modul:
- `patient-consent-policy`

Public API:
- `canAccessSensitiveRecord()`
- `canShareToPartner()`

Private internals:
- mapping rule
- helper normalization
- policy detail

Ini lebih sehat
daripada mengekspor semua helper kecil
dan membuat banyak caller bergantung ke detailnya.

---

## 11. Module Pattern vs Folder Worship

Ada tim yang fokus pada:
- struktur folder sangat rapi

tapi modul di dalamnya:
- tetap saling bocor
- export liar
- dependency acak

Itu masalah umum.

Folder membantu,
tapi module pattern yang sehat
ditentukan oleh boundary nyata,
bukan hanya path yang indah.

---

## 12. Anti-Pattern Umum

1. Mengira ES module syntax otomatis berarti design bagus.
2. Mengekspor hampir semua hal.
3. Modul punya tanggung jawab campur aduk.
4. Internal helper ikut jadi kontrak publik tak sengaja.
5. Struktur folder rapi tapi boundary impor/ekspor sebenarnya kacau.

---

## 13. Best Practices

- tentukan tanggung jawab modul dengan jelas.
- jaga public API sekecil mungkin.
- sembunyikan detail internal yang tidak perlu diketahui caller.
- gunakan module boundary sebagai alat menurunkan coupling.
- evaluasi modul dari behavior dependency-nya, bukan dari folder saja.

---

## 14. Pertanyaan Desain Penting

Sebelum membuat modul baru, tanya:
1. Tanggung jawab modul ini apa?
2. Apa yang benar-benar perlu diekspor?
3. Apa yang harus tetap privat?
4. Siapa yang akan bergantung pada modul ini?
5. Apakah modul ini membantu boundary atau malah memperlebar coupling?

---

## 15. Mini Latihan

Latihan:
1. Audit satu modul yang mengekspor terlalu banyak.
2. Kecilkan public API-nya.
3. Pindahkan helper internal yang tidak seharusnya dipakai luar.
4. Cari modul dengan tanggung jawab campur aduk.
5. Refactor jadi dua modul dengan boundary yang lebih jujur.

---

## 16. Checklist Kelulusan Topik Module Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan module pattern sebagai encapsulation boundary,
- membedakan syntax module dari design module,
- menjaga public API tetap sempit,
- menyembunyikan internal detail dengan sengaja,
- menilai kualitas modul dari coupling dan tanggung jawabnya.

---

## 17. Ringkasan Brutal

- File dengan `export` bukan otomatis modul yang sehat.
- Modul yang baik membatasi apa yang orang lain perlu tahu.
- Kalau semua detail bocor keluar,
  kamu belum punya encapsulation.
