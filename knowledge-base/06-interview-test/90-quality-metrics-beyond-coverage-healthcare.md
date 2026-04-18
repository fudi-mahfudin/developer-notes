# Q90 - Metrik Kualitas Selain Coverage

## Pertanyaan Interview

Selain test coverage, metrik apa yang lebih bermakna untuk kualitas software?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Coverage itu metrik pendukung, bukan metrik kualitas utama.
Untuk kualitas nyata, saya lihat kombinasi:
defect escape rate, change failure rate, MTTR, flaky test rate,
serta reliability flow bisnis kritikal.

Metrik yang baik harus terhubung ke outcome operasional.
Kalau coverage naik tapi incident juga naik, berarti quality strategy salah arah.
Di healthcare, saya utamakan metrik yang langsung memengaruhi
stabilitas layanan dan kecepatan pemulihan saat gangguan." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Metrik mana yang paling actionable?"
2. "Bagaimana menyeimbangkan speed dan quality?"
3. "Apa itu change failure rate?"
4. "Bagaimana mengukur kualitas test suite?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Paling actionable:
"Defect escape + MTTR + flaky rate per area kritikal."

2) Speed vs quality:
"Gunakan release metrics dan SLO sebagai guardrail bersama."

3) Change failure rate:
"Persentase deploy yang menyebabkan gangguan atau rollback."

4) Kualitas test suite:
"Lihat stabilitas, sinyal bug nyata, dan maintenance cost."

5) Anti-pattern:
"Menetapkan satu angka coverage sebagai satu-satunya KPI kualitas."

## Jawaban Ideal (Versi Singkat, Level Senior)

Quality dashboard efektif:
- production reliability metrics
- release health metrics
- test suite health metrics
- customer impact metrics

## Penjelasan Detail yang Dicari Interviewer

### 1) Kategori metrik kualitas

- **Build/Test:** flaky rate, test duration, failure signal quality
- **Release:** deployment frequency, CFR, rollback frequency
- **Runtime:** error rate, latency SLO, incident count
- **Business:** success rate flow utama

### 2) Cara membaca metrik

- hindari metrik tunggal
- analisis tren, bukan snapshot
- segmentasi per domain/fitur kritikal

### 3) Implementasi praktis

- buat baseline tiap metrik
- set threshold alert realistis
- review mingguan lintas engineering + product

Mitigasi:
- jangan gamify metrik
- pasang ownership per indikator
- evaluasi metrik yang tidak lagi relevan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const qualityScorecard = {
  defectEscapeRate: 0.02,
  changeFailureRate: 0.08,
  flakyTestRate: 0.03,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Kualitas di healthcare harus terukur dari dampak operasional nyata.
Metrik yang tepat membantu tim:
- mendeteksi penurunan kualitas lebih cepat
- memprioritaskan perbaikan dengan objektif
- menjaga continuity layanan kritikal

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim fokus menaikkan coverage, tapi rollback release meningkat.
tidak ada metrik CFR yang dipantau.

Perbaikan:
- tambah dashboard release health
- evaluasi test strategy berdasarkan incident data

## Contoh Pola Kode yang Lebih Aman

```ts
type QualityMetric = {
  name: string;
  target: number;
  current: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan batasan coverage.
- Menyebut metrik kualitas alternatif yang konkret.
- Menjelaskan relasi metrik dengan outcome operasional.
- Menjelaskan cara implementasi dashboard quality.
- Relevan untuk reliability healthcare production.

## Ringkasan Final

Kualitas software tidak bisa diwakili satu angka coverage.
Pendekatan yang matang memakai kombinasi metrik teknis dan dampak bisnis.
Dengan scorecard yang tepat, keputusan kualitas jadi objektif
dan perbaikan bisa diprioritaskan secara lebih efektif.
