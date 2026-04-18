# Q74 - Abstraction vs Over-Engineering

## Pertanyaan Interview

Bagaimana membedakan abstraction yang sehat dengan over-engineering?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Abstraction sehat muncul untuk mengurangi duplikasi dan menurunkan coupling nyata.
Over-engineering terjadi saat kita menambah layer sebelum ada kebutuhan jelas.

Saya pakai aturan praktis:
abstraksi dibuat setelah pola variasi terbukti minimal 2-3 use case.
Kalau baru satu use case, kode sederhana biasanya lebih baik.
Tujuan abstraction adalah mempermudah perubahan, bukan memamerkan desain.
Di proyek healthcare yang cepat berubah, abstraction berlebihan
sering justru memperlambat tim saat debugging dan onboarding." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan waktu tepat membuat abstraction?"
2. "Apa indikator abstraction terlalu jauh?"
3. "Bagaimana review abstraction di PR?"
4. "Apa hubungan abstraction dengan testability?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Waktu tepat:
"Saat ada variasi nyata dan pain point berulang."

2) Indikator terlalu jauh:
"Nama generik abstrak, flow sulit ditelusuri, behavior tersembunyi."

3) Review PR:
"Tanya: ini menyederhanakan use case nyata atau menambah kompleksitas?"

4) Dengan testability:
"Abstraction yang tepat memudahkan mocking; berlebihan justru bikin test rapuh."

5) Anti-pattern:
"Membuat framework mini internal untuk masalah kecil."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prinsip pragmatic abstraction:
- solve present pain
- keep cognitive load low
- optimize for change clarity
- refactor iteratively, not upfront fantasy

## Penjelasan Detail yang Dicari Interviewer

### 1) Ciri abstraction sehat

- nama domain jelas
- API kecil dan fokus
- perilaku mudah diprediksi
- error handling transparan

### 2) Ciri over-engineering

- banyak layer pass-through
- terlalu generic tanpa konteks
- konfigurasi berlebihan untuk flow sederhana

### 3) Cara mengendalikan

- gunakan YAGNI secara disiplin
- lakukan refactor berbasis data perubahan
- ukur dampak terhadap lead time debugging

Mitigasi:
- architecture review ringan
- limit generic utilities
- dokumentasi intent abstraction

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// abstraction sehat: spesifik domain
function calculateInvoiceTotal(items) {}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, perubahan requirement sering cepat.
Jika kode terlalu abstrak:
- bug tracing sulit
- transfer knowledge lambat
- release risk naik

Abstraction yang tepat menjaga kecepatan dan kejelasan perubahan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim membuat generic rule engine kompleks untuk satu alur sederhana.
saat perubahan policy, tim kesulitan menemukan titik perubahan.

Perbaikan:
- sederhanakan layer
- gunakan domain function eksplisit
- abstraksi hanya pada bagian yang benar-benar reuse

## Contoh Pola Kode yang Lebih Aman

```ts
type AbstractionDecision = {
  repeatedUseCases: number;
  expectedVariations: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan beda abstraction vs over-engineering.
- Menjelaskan kriteria keputusan yang objektif.
- Menjelaskan dampak ke maintainability.
- Menjelaskan mitigasi desain.
- Relevan dengan dinamika healthcare.

## Ringkasan Final

Abstraction bernilai jika membuat perubahan nyata lebih mudah.
Jika hanya menambah lapisan tanpa manfaat langsung, itu over-engineering.
Pendekatan senior adalah desain secukupnya,
lalu refactor berdasarkan bukti kebutuhan yang muncul.
