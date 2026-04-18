# Q71 - Memecah Codebase JS Besar Agar Scalable

## Pertanyaan Interview

Bagaimana memecah codebase JavaScript besar agar scalable untuk tim?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Codebase besar harus dipecah berdasarkan boundary domain, bukan berdasarkan layer teknis saja.
Saya biasanya mulai dari bounded context bisnis, lalu tetapkan ownership per modul.
Setiap modul punya kontrak publik jelas, dependensi dibatasi, dan aturan import ketat.

Tujuan utamanya menurunkan coupling dan mempercepat delivery paralel antar tim.
Kalau semua modul saling panggil tanpa batas, scaling tim akan macet.
Di proyek healthcare, pemecahan yang tepat membuat perubahan domain transaksi
tidak merusak domain lain seperti inventory atau reporting." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa tanda codebase sudah terlalu coupled?"
2. "Bagaimana menentukan boundary modul?"
3. "Apa peran monorepo di sini?"
4. "Bagaimana menghindari cyclic dependency?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Tanda coupling:
"Perubahan kecil memicu edit banyak folder tak relevan."

2) Boundary:
"Ikuti use case dan ownership bisnis, bukan folder random."

3) Monorepo:
"Membantu konsistensi tooling, tapi boundary tetap harus dijaga."

4) Hindari cycle:
"Dependency rule + lint check + arsitektur arah dependensi jelas."

5) Anti-pattern:
"Shared util gemuk yang jadi tempat semua logic lintas domain."

## Jawaban Ideal (Versi Singkat, Level Senior)

Langkah scalable:
- petakan domain utama
- bentuk modul dengan API internal
- batasi dependensi lintas modul
- enforce arsitektur via tooling
- ukur dampak lewat lead time dan defect rate

## Penjelasan Detail yang Dicari Interviewer

### 1) Struktur modular yang sehat

- domain module (mis. payment, order, inventory)
- application service per use case
- infra adapter di tepi modul

### 2) Governance teknis

- rule import path
- forbidden cross-module access
- code owner per area

### 3) Evolusi bertahap

- refactor berdasarkan hotspot dahulu
- jangan big-bang rewrite
- gunakan strangler approach per modul

Mitigasi:
- architecture decision record
- integration contract tests
- dashboard dependency graph

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const moduleBoundaries = {
  payment: ["payment/*"],
  inventory: ["inventory/*"],
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare platform, domain cenderung berkembang cepat.
Tanpa boundary yang jelas:
- bug merambat lintas domain
- release melambat
- ownership kabur saat incident

Modularisasi yang tepat mempercepat respon perubahan regulasi dan bisnis.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
perubahan rule billing ikut mematahkan endpoint inventory
karena util bersama berisi business logic campur.

Perbaikan:
- pisahkan util teknis vs domain logic
- tarik rule billing ke modul payment
- tetapkan kontrak lintas domain

## Contoh Pola Kode yang Lebih Aman

```ts
type ModuleContract = {
  moduleName: string;
  publicApis: string[];
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan domain-based modularization.
- Menjelaskan pembatasan dependensi.
- Menjelaskan ownership dan governance.
- Menjelaskan strategi migrasi bertahap.
- Relevan untuk skala tim healthcare.

## Ringkasan Final

Scalable codebase lahir dari boundary yang disiplin, bukan dari folder rapi saja.
Dengan modul berbasis domain dan kontrak jelas,
tim bisa bergerak paralel tanpa meningkatkan risiko regresi.
Ini sangat penting untuk sistem healthcare yang terus berevolusi.
