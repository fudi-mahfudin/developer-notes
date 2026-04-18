# Q78 - Feature Flag / Canary / Gradual Rollout

## Pertanyaan Interview

Bagaimana menggunakan feature flag, canary, dan gradual rollout secara aman?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Feature flag dan canary rollout dipakai untuk menurunkan risiko release.
Alih-alih aktifkan fitur ke semua user sekaligus,
kita buka bertahap berdasarkan segmen atau persentase traffic.

Saya selalu mengaitkan rollout dengan guardrail metrics:
error rate, latency, business KPI utama.
Jika metrik memburuk, rollback harus cepat lewat flag toggle.
Penting juga: lifecycle flag harus dikelola, jangan jadi utang permanen.
Di healthcare, gradual rollout sangat berguna
karena risiko gangguan operasional harus ditekan semaksimal mungkin." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan pakai canary dibanding blue-green?"
2. "Bagaimana memilih segmen awal rollout?"
3. "Apa metrik rollback otomatis?"
4. "Bagaimana mengelola flag debt?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Canary vs blue-green:
"Canary lebih granular dan observability-driven untuk transisi bertahap."

2) Segmen awal:
"Internal user / low-risk tenant dulu."

3) Metrik rollback:
"Error spike, latency regress, atau drop conversion kritikal."

4) Flag debt:
"Set expiry date dan cleanup ticket sejak flag dibuat."

5) Anti-pattern:
"Flag banyak tanpa owner dan tanpa dokumentasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Rollout aman membutuhkan:
- targeting strategy
- real-time telemetry
- fast rollback path
- flag lifecycle governance

## Penjelasan Detail yang Dicari Interviewer

### 1) Desain rollout bertahap

- phase 0: internal
- phase 1: 1-5% user
- phase 2: 20-50%
- phase 3: 100% setelah stabil

### 2) Kontrol operasional

- predefine SLO guardrails
- automated halt jika threshold terlampaui
- on-call aware saat rollout

### 3) Risiko yang sering muncul

- segment mismatch
- stale flag conditions
- kombinasi flag membuat perilaku sulit diprediksi

Mitigasi:
- test matrix untuk kombinasi flag penting
- max active flags policy
- observability tag per flag state

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const rolloutPlan = {
  feature: "new-order-flow",
  initialPercentage: 5,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Perubahan mendadak pada sistem healthcare bisa berdampak besar ke operasional.
Gradual rollout memberi ruang deteksi dini masalah
sebelum dampak meluas ke seluruh user.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
fitur baru langsung 100% rollout.
ternyata ada bug pada satu browser mayoritas pengguna.

Perbaikan:
- rollout ulang via canary 5% -> 20% -> 100%
- pasang rollback otomatis berdasarkan error budget

## Contoh Pola Kode yang Lebih Aman

```ts
type FeatureFlagPolicy = {
  key: string;
  owner: string;
  expiresAt: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep gradual rollout.
- Menjelaskan guardrail metrics.
- Menjelaskan rollback cepat.
- Menjelaskan manajemen flag debt.
- Relevan untuk risiko release healthcare.

## Ringkasan Final

Feature flag dan canary adalah alat risk management release.
Nilainya muncul saat dikombinasikan dengan observability dan governance yang disiplin.
Dengan rollout bertahap, tim bisa tetap cepat merilis
tanpa mempertaruhkan stabilitas sistem produksi.
