# Q89 - Menjaga E2E Test Stabil di CI

## Pertanyaan Interview

Bagaimana menjaga E2E tests tetap stabil dan bernilai di pipeline CI?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"E2E stabil dimulai dari scope yang tepat.
Saya hanya menaruh user journey paling kritikal di E2E,
bukan semua skenario.
Test data harus deterministik, environment terisolasi,
dan dependency eksternal dikontrol.

Selain itu, observability test penting:
rekam screenshot/video/log saat gagal agar debugging cepat.
Flaky test harus ditangani sebagai defect, bukan di-retry terus.
Di healthcare, E2E untuk flow kritikal seperti order/payment/status
memberi confidence rilis yang paling nyata." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa E2E sering flaky?"
2. "Bagaimana menentukan flow yang layak E2E?"
3. "Apakah retry boleh dipakai?"
4. "Bagaimana setup test data yang aman?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Sering flaky:
"Environment tidak stabil, timing race, dan data test tidak terisolasi."

2) Flow layak E2E:
"Journey bisnis paling kritikal dan lintas boundary utama."

3) Retry:
"Boleh terbatas sebagai diagnosis, bukan solusi permanen."

4) Test data:
"Seed data khusus test dan reset konsisten per run."

5) Anti-pattern:
"Terlalu banyak E2E hingga CI lambat dan sering red tanpa sinyal jelas."

## Jawaban Ideal (Versi Singkat, Level Senior)

E2E strategy sehat:
- small but critical suite
- deterministic environment
- rich failure artifacts
- flaky triage discipline

## Penjelasan Detail yang Dicari Interviewer

### 1) Stabilitas teknis

- wait by condition, bukan sleep fixed
- isolate browser/session state
- kontrol network dan mock seperlunya

### 2) Stabilitas operasional

- jadwalkan E2E smoke di PR
- full suite di stage tertentu
- buat owner tiap suite kritikal

### 3) Debuggability

- trace logs
- screenshot/video artifacts
- step-level timing metrics

Mitigasi:
- quarantine test bermasalah sementara
- RCA sebelum re-enable
- kurangi overlap skenario redundant

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
await page.getByRole("button", { name: "Submit" }).click();
await expect(page.getByText("Success")).toBeVisible();
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

E2E jadi benteng terakhir sebelum rilis ke user.
Untuk sistem healthcare, kegagalan flow end-to-end dapat berdampak operasional langsung.
Suite E2E yang stabil meningkatkan kepercayaan deployment.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
E2E flow order gagal random karena data test bentrok antar pipeline.

Perbaikan:
- namespace data per run
- cleanup otomatis pasca test
- gunakan environment khusus E2E

## Contoh Pola Kode yang Lebih Aman

```ts
type E2EPolicy = {
  maxCriticalFlows: number;
  requireFailureArtifacts: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan penyebab flaky E2E.
- Menjelaskan scope E2E yang realistis.
- Menjelaskan strategi stabilisasi CI.
- Menjelaskan observability saat gagal.
- Relevan untuk flow healthcare kritikal.

## Ringkasan Final

E2E test bernilai tinggi jika kecil, fokus, dan stabil.
Kunci suksesnya adalah determinisme environment dan disiplin terhadap flaky tests.
Dengan pendekatan ini, E2E menjadi sinyal rilis yang bisa dipercaya,
bukan bottleneck CI.
