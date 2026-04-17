# Q81 - Testing Pyramid Realistis di JS Modern

## Pertanyaan Interview

Bagaimana menerapkan testing pyramid yang realistis di JavaScript modern?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Testing pyramid tetap relevan, tapi implementasinya harus realistis.
Saya biasanya menyeimbangkan:
banyak unit test untuk logic kritikal,
integration test untuk boundary antar komponen,
dan E2E test secukupnya untuk user journey utama.

Masalah umum adalah over-invest di satu layer saja.
Unit test banyak tapi tidak menangkap integrasi,
atau E2E terlalu banyak sampai CI lambat dan flaky.
Di sistem healthcare, saya fokus test pada flow risiko tinggi
agar kualitas naik tanpa membuat pipeline tidak efisien." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Berapa komposisi ideal per layer?"
2. "Kapan integration test lebih bernilai dari unit test?"
3. "Bagaimana menjaga E2E tetap stabil?"
4. "Apa hubungan test strategy dan release speed?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Komposisi ideal:
"Tidak angka baku; sesuaikan risiko dan kompleksitas domain."

2) Integration lebih bernilai:
"Saat bug sering muncul di boundary antar komponen."

3) E2E stabil:
"Scope ketat pada critical path + data test terkontrol."

4) Test dan speed:
"Strategi tepat menurunkan bug tanpa memperlambat CI berlebihan."

5) Anti-pattern:
"Menyamakan coverage tinggi dengan kualitas tinggi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pyramid realistis:
- unit test: cepat, banyak, fokus logic
- integration: validasi kontrak antar modul
- E2E: sedikit tapi bernilai bisnis tinggi

## Penjelasan Detail yang Dicari Interviewer

### 1) Tujuan tiap layer

- Unit: verifikasi behavior kecil secara deterministik
- Integration: cek interaksi nyata dependency
- E2E: memastikan flow user end-to-end

### 2) Strategi pragmatis

- petakan risiko per fitur
- pilih layer test paling efektif untuk risiko itu
- hindari duplicate assertion lintas layer berlebihan

### 3) Operasional CI

- unit + sebagian integration di PR gate
- E2E lengkap di stage tertentu
- flaky test policy ketat

Mitigasi:
- parallel test execution
- test data isolation
- failure triage yang cepat

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const testStrategy = {
  unit: "business-rules",
  integration: "module-contracts",
  e2e: "critical-user-journeys",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare workflows sensitif terhadap regresi kecil.
Tanpa strategi test yang tepat:
- bug lolos ke produksi
- incident meningkat
- release jadi lambat karena firefighting

Pyramid realistis membantu quality dan delivery berjalan seimbang.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
unit test hijau, tapi integrasi payment-inventory rusak.
status transaksi tidak sinkron.

Perbaikan:
- tambah integration test lintas modul kritikal
- kurangi duplikasi unit test yang rendah nilai

## Contoh Pola Kode yang Lebih Aman

```ts
type TestLayerPriority = {
  layer: "unit" | "integration" | "e2e";
  riskCoverage: "low" | "medium" | "high";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan peran tiap layer test.
- Menjelaskan trade-off kecepatan vs confidence.
- Menjelaskan prioritas berdasarkan risiko.
- Menjelaskan stabilitas CI.
- Relevan untuk flow healthcare kritikal.

## Ringkasan Final

Testing pyramid modern bukan soal dogma jumlah test,
melainkan alokasi effort berdasarkan risiko nyata.
Dengan strategi berlapis yang pragmatis,
tim bisa menjaga kualitas produksi sekaligus mempertahankan kecepatan rilis.
