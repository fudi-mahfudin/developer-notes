# Q85 - Mengetes Code Coupled Tanpa Refactor Besar

## Pertanyaan Interview

Bagaimana mengetes code yang sangat coupled tanpa refactor besar dulu?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk code coupled, saya pakai pendekatan bertahap.
Langkah pertama biasanya characterization tests:
rekam perilaku saat ini dulu agar perubahan berikutnya aman.

Lalu saya buat seam kecil di titik dependency paling mahal,
misalnya wrapper atau adapter tipis,
tanpa langsung rewrite arsitektur.
Targetnya bukan kesempurnaan instan, tapi menurunkan risiko perubahan.
Setelah ada safety net test, baru refactor incremental dilakukan.
Di healthcare, cara ini penting karena kita sering harus memperbaiki legacy
tanpa mengganggu operasi harian." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa itu characterization test?"
2. "Bagaimana membuat seam tanpa ubah banyak kode?"
3. "Kapan harus stop dan lakukan refactor besar?"
4. "Bagaimana menangani side effect eksternal?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Characterization:
"Test yang mendokumentasikan behavior existing sebelum perubahan."

2) Seam kecil:
"Ekstrak wrapper fungsi untuk dependency eksternal."

3) Kapan refactor besar:
"Saat incremental fix tidak lagi menurunkan kompleksitas signifikan."

4) Side effect:
"Isolasi via fakes/stubs di boundary I/O."

5) Anti-pattern:
"Refactor besar tanpa baseline test pengaman."

## Jawaban Ideal (Versi Singkat, Level Senior)

Legacy testing strategy:
- capture current behavior
- isolate critical seams
- prioritize high-risk paths
- refactor small and safe

## Penjelasan Detail yang Dicari Interviewer

### 1) Tantangan utama code coupled

- dependency langsung ke DB/network
- global state
- fungsi panjang multi-tanggung jawab

### 2) Teknik praktis

- golden master/characterization tests
- approval-style checks untuk output kompleks
- dependency wrapper untuk inject test double

### 3) Roadmap perbaikan

- fase 1: safety net tests
- fase 2: micro-refactor (extract function/module)
- fase 3: improve architecture secara bertahap

Mitigasi:
- ubah sedikit tiap iterasi
- review regression risk sebelum merge
- pantau defect trend setelah perubahan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function processOrder(order, deps = defaultDeps) {
  return deps.gateway.charge(order);
}
```

Menambah `deps` seam kecil bisa membuka ruang test tanpa rewrite besar.

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Legacy module umum di sistem healthcare jangka panjang.
Perubahan besar sekaligus sering terlalu berisiko.
Pendekatan bertahap memungkinkan modernisasi aman
sambil menjaga layanan tetap berjalan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim langsung refactor besar modul transaksi legacy.
tanpa baseline test, bug penting lolos ke produksi.

Perbaikan:
- kembalikan ke incremental strategy
- buat characterization test dulu
- refactor dalam potongan kecil terukur

## Contoh Pola Kode yang Lebih Aman

```ts
type LegacyTestPlan = {
  hasCharacterizationTests: boolean;
  seamIntroduced: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan strategi tanpa big-bang refactor.
- Menjelaskan characterization tests.
- Menjelaskan seam-based testing.
- Menjelaskan langkah refactor bertahap.
- Relevan pada legacy healthcare production.

## Ringkasan Final

Code coupled bisa diuji tanpa menunggu refactor besar selesai.
Kuncinya membangun safety net dulu, lalu memperbaiki desain perlahan.
Pendekatan ini menekan risiko produksi dan memberi jalur modernisasi
yang realistis untuk sistem legacy.
