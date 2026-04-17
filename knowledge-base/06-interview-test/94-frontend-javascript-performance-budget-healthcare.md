# Q94 - Performance Budget Frontend JavaScript

## Pertanyaan Interview

Bagaimana menerapkan performance budget untuk frontend JavaScript?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Performance budget adalah batas kuantitatif
untuk menjaga pengalaman pengguna tetap konsisten.
Di frontend JavaScript, budget biasanya ditetapkan
untuk ukuran bundle, LCP, INP, dan TTI.

Praktiknya:
tetapkan target per halaman kritis,
ukur otomatis di CI,
blok merge jika melampaui ambang signifikan,
dan berikan exception proses yang ketat.
Pendekatan ini membuat performa jadi kontrak engineering,
bukan harapan informal.
Untuk produk healthcare, ini penting
karena pengguna sering memakai perangkat menengah dan jaringan tidak stabil." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Metrik mana yang paling penting?"
2. "Bagaimana menentukan angka budget awal?"
3. "Apa tindakan jika budget terlewati?"
4. "Siapa pemilik budget?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Metrik utama:
"Core Web Vitals + ukuran JS kritis."

2) Menentukan budget:
"Mulai dari baseline nyata dan target perbaikan bertahap."

3) Budget lewat:
"Rollback/optimasi prioritas sebelum rilis penuh."

4) Ownership:
"Shared ownership FE + product + platform."

5) Anti-pattern:
"Mengejar fitur tanpa guardrail performa."

## Jawaban Ideal (Versi Singkat, Level Senior)

Performance budget efektif harus:
- terukur
- terotomasi
- enforceable
- dimiliki lintas tim

## Penjelasan Detail yang Dicari Interviewer

### 1) Definisi budget

- JS bundle initial max size
- LCP/INP threshold
- jumlah request kritis
- CPU main-thread budget

### 2) Implementasi

- tambahkan check di pipeline CI
- tampilkan delta performa per PR
- fail build jika melewati hard limit

### 3) Operasional

- review mingguan halaman kritis
- exception hanya dengan expiry date
- refactor backlog untuk debt performa

Mitigasi:
- code splitting berbasis route
- lazy loading komponen berat
- cache strategy dan preloading selektif

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const performanceBudget = {
  maxInitialJsKb: 220,
  maxLcpMs: 2500,
  maxInpMs: 200,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di produk healthcare, alur kritis sering digunakan dalam kondisi waktu sensitif.
Aplikasi lambat dapat memperlambat proses operasional.
Budget performa menjaga fitur baru tidak menggerus kualitas pengalaman inti.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
dashboard bertambah library chart berat
tanpa budget guardrail,
LCP naik tajam di perangkat klinik lama.

Perbaikan:
- pecah bundle dan lazy-load chart
- tetapkan budget khusus dashboard
- aktifkan performance gate di CI

## Contoh Pola Kode yang Lebih Aman

```ts
type BudgetResult = {
  metric: "bundle" | "lcp" | "inp";
  value: number;
  passed: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan definisi performance budget.
- Menjelaskan metrik teknis yang dipantau.
- Menjelaskan enforcement di CI/CD.
- Menjelaskan ownership dan exception.
- Relevan dengan konteks healthcare.

## Ringkasan Final

Performance budget mengubah performa dari "nice to have"
menjadi quality gate yang objektif.
Dengan target jelas, automasi CI, dan ownership lintas tim,
frontend bisa tumbuh tanpa mengorbankan kecepatan pengalaman pengguna.
