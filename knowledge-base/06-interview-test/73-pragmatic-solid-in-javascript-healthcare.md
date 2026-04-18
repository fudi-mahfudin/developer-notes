# Q73 - SOLID Pragmatik di JavaScript

## Pertanyaan Interview

Bagaimana menerapkan prinsip SOLID secara pragmatis di JavaScript?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"SOLID di JavaScript harus dipakai sebagai panduan maintainability, bukan aturan kaku.
Saya fokus ke dampak praktis: SRP untuk memecah tanggung jawab,
OCP untuk extensibility yang masuk akal, dan DIP untuk testability.

Karena JavaScript dinamis, over-abstraction mudah terjadi.
Jadi saya hanya menambah interface/abstraction saat ada variasi nyata,
bukan prediksi berlebihan.
Di sistem healthcare, pendekatan pragmatis ini membantu kode tetap bersih
tanpa menghambat delivery fitur yang mendesak." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bagaimana contoh SRP di codebase JS?"
2. "Kapan abstraction justru merugikan?"
3. "Bagaimana menerapkan DIP tanpa over-engineering?"
4. "Apakah SOLID wajib di semua file?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) SRP:
"Pisahkan business rule dari I/O dan formatting."

2) Abstraction merugikan:
"Saat menambah lapisan tanpa variasi use case nyata."

3) DIP pragmatis:
"Gunakan dependency injection ringan pada unit yang perlu diuji."

4) Wajib semua file?
"Tidak, fokus pada area kompleks dan sering berubah."

5) Anti-pattern:
"Memaksakan pattern enterprise pada kasus sederhana."

## Jawaban Ideal (Versi Singkat, Level Senior)

SOLID pragmatis:
- pakai saat menurunkan coupling nyata
- hindari class explosion
- prioritaskan readability dan changeability
- ukur manfaat lewat kemudahan testing/refactor

## Penjelasan Detail yang Dicari Interviewer

### 1) Penerapan per prinsip secara realistis

- SRP: satu modul, satu alasan utama untuk berubah
- OCP: tambah behavior via extension points
- LSP: kontrak perilaku konsisten
- ISP: interface kecil sesuai kebutuhan konsumen
- DIP: logic bergantung pada kontrak, bukan implementasi keras

### 2) Tantangan di JavaScript

- tipe dinamis membuat kontrak longgar
- tooling harus bantu (lint/type checks)
- pola fungsi kadang lebih tepat dari class hierarchy

### 3) Strategi implementasi

- mulai dari refactor hotspot
- tambahkan pattern saat ada pain point
- review design pada PR kompleks

Mitigasi:
- guideline coding internal
- example repository pattern usage
- test coverage untuk domain logic

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function calculateTotal(order, taxPolicy) {
  return taxPolicy.apply(order.subtotal);
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, perubahan rule bisnis sering terjadi.
Jika kode terlalu coupled, update kecil menjadi berisiko tinggi.
SOLID pragmatis membantu tim melakukan perubahan cepat
dengan risiko regresi yang lebih terkendali.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
logic pajak, formatting response, dan akses DB tercampur di satu fungsi.
perubahan kecil memicu bug lintas endpoint.

Perbaikan:
- pisahkan domain service
- pisahkan adapter DB
- pertahankan kontrak fungsi yang jelas

## Contoh Pola Kode yang Lebih Aman

```ts
type TaxPolicy = {
  apply(subtotal: number): number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan SOLID sebagai alat pragmatis.
- Menjelaskan risiko over-abstraction.
- Menjelaskan fokus area kompleks.
- Menjelaskan manfaat terhadap testability.
- Relevan pada perubahan rule healthcare.

## Ringkasan Final

SOLID efektif jika diterapkan untuk memecahkan masalah nyata.
Di JavaScript, pragmatisme lebih penting daripada kepatuhan dogmatis.
Tujuan akhirnya sederhana:
kode mudah dipahami, diuji, dan diubah dengan aman.
