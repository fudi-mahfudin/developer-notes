# Q98 - Checklist Release Aman untuk JS Skala Besar

## Pertanyaan Interview

Apa checklist release aman untuk aplikasi JavaScript skala besar?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Release aman di skala besar harus berbasis checklist yang disiplin,
bukan sekadar feeling bahwa fitur sudah siap.
Saya biasanya membagi checklist ke 4 fase:
pre-release, deployment, post-deploy monitoring, dan rollback readiness.

Contohnya:
semua test kritis hijau,
migration tervalidasi,
feature flag disiapkan,
dan dashboard observability sudah dipantau real-time.
Kalau ada anomali, rollback harus bisa dieksekusi cepat.
Di healthcare, praktik ini penting karena kegagalan release
bisa berdampak langsung ke alur operasional pengguna." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa item wajib sebelum tekan deploy?"
2. "Bagaimana meminimalkan blast radius?"
3. "Kapan release dibatalkan?"
4. "Peran canary?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Wajib:
"Test kritis, migration plan, dan rollback plan."

2) Blast radius:
"Canary/gradual rollout + feature flags."

3) Batal release:
"Jika guardrail kualitas kritikal gagal."

4) Canary:
"Menguji dampak nyata ke subset traffic."

5) Anti-pattern:
"Deploy besar tanpa observability readiness."

## Jawaban Ideal (Versi Singkat, Level Senior)

Checklist release aman harus:
- measurable
- repeatable
- auditable
- enforced by process and tooling

## Penjelasan Detail yang Dicari Interviewer

### 1) Pre-release gate

- unit/integration/e2e kritis pass
- security scan pass
- performance regression check
- compatibility migration diverifikasi

### 2) Deployment strategy

- canary atau blue-green
- feature flag default-safe
- communication channel incident standby

### 3) Post-release verification

- monitor SLO 15-60 menit awal
- cek error rate, latency, business KPI
- keputusan lanjut/rollback berbasis data

Mitigasi:
- template checklist standar organisasi
- automation gate di CI/CD
- release retrospective berkala

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const releaseGuardrail = {
  testsPassed: true,
  securityScanPassed: true,
  rollbackPlanReady: true,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, release gagal bisa mengganggu layanan penting.
Checklist yang kuat menurunkan risiko regresi
dan meningkatkan kepercayaan tim lintas fungsi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
rilis modul jadwal dokter tanpa load-test jam sibuk.
setelah deploy, latency naik drastis dan booking gagal sebagian.

Perbaikan:
- jadikan load-test sebagai release gate
- canary pada jam traffic representatif
- rollback otomatis berdasarkan threshold error

## Contoh Pola Kode yang Lebih Aman

```ts
type ReleaseChecklistItem = {
  name: string;
  required: boolean;
  status: "pass" | "fail" | "waived";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan fase checklist release.
- Menjelaskan deployment strategy aman.
- Menjelaskan guardrail observability pasca deploy.
- Menjelaskan rollback readiness.
- Relevan pada operasi healthcare skala besar.

## Ringkasan Final

Release aman adalah disiplin operasional yang konsisten.
Dengan gate pre-release, rollout bertahap, dan monitoring ketat,
tim dapat merilis lebih sering dengan risiko lebih terkendali
tanpa mengorbankan stabilitas produksi.
