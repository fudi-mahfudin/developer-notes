# Q55 - Frontend Observability

## Pertanyaan Interview

Bagaimana membangun frontend observability yang berguna di production?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Frontend observability bukan sekadar error logging.
Kita perlu melihat health aplikasi dari sisi user:
error rate, performance metrics (LCP, CLS, INP), network failures,
serta business flow critical yang gagal.

Saya biasanya set tiga lapis:
real user monitoring, structured client logs, dan distributed tracing correlation
ke backend via request ID.
Error harus diprioritaskan berdasarkan dampak bisnis, bukan jumlah semata.
Di healthcare, observability frontend penting karena issue UI kecil
bisa menghambat proses operasional penting." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Metrik frontend apa yang paling penting?"
2. "Bagaimana hindari noisy alerts?"
3. "Apa yang harus di-log dari browser?"
4. "Bagaimana menghubungkan FE error ke BE trace?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Metrik penting:
"Core Web Vitals + error journey pada flow bisnis kritikal."

2) Hindari noise:
"Gunakan alert berbasis SLO dan severity, bukan raw volume."

3) Yang di-log:
"Error context, route, release version, user action, network info."

4) FE ke BE trace:
"Propagasikan correlation ID per request."

5) Anti-pattern:
"Mengumpulkan log banyak tapi tanpa prioritas tindakan."

## Jawaban Ideal (Versi Singkat, Level Senior)

Observability matang punya:
- telemetry yang actionable
- korelasi FE-BE
- error budgeting
- release tracking
- incident playbook

## Penjelasan Detail yang Dicari Interviewer

### 1) Pilar observability frontend

- Metrics: vitals, error rate, API latency.
- Logs: structured event per action penting.
- Traces: correlation request lintas layanan.

### 2) Apa yang harus diukur

- crash-free sessions
- JS unhandled exceptions
- resource load failure
- user flow completion rate
- regression per release version

### 3) Penggunaan praktis di incident

- segmentasi issue per browser/device
- deteksi release mana yang memperburuk metrik
- rollback cepat berdasarkan bukti telemetry

Mitigasi:
- sampling policy cerdas
- PII masking ketat
- dashboard per domain bisnis

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const telemetryEvent = {
  event: "submit_order_failed",
  release: "2026.04.17",
  route: "/dashboard/order",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare app:
- downtime UI atau error form berdampak operasional nyata
- auditability dan reliability jadi tuntutan inti
- issue harus diketahui sebelum dilaporkan massal oleh user

Observability frontend yang baik mempersingkat MTTD dan MTTR.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
release baru menaikkan error submit transaksi pada browser tertentu.
tanpa telemetry detail, tim butuh waktu lama menemukan pola.

Perbaikan:
- tambahkan event tracking flow submit
- tambahkan breakdown per browser/version
- pasang alert berbasis error budget flow kritikal

## Contoh Pola Kode yang Lebih Aman

```ts
type FrontendTelemetry = {
  eventName: string;
  severity: "info" | "warn" | "error";
  correlationId?: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan observability lebih dari sekadar error log.
- Menyebut metrics, logs, traces.
- Menjelaskan korelasi dengan backend.
- Menjelaskan prioritas berbasis dampak bisnis.
- Relevan untuk reliability sistem healthcare.

## Ringkasan Final

Frontend observability harus didesain untuk keputusan cepat,
bukan sekadar koleksi data.
Metrik performa, error contextual, dan korelasi trace
membuat tim bisa merespons incident dengan presisi.
Untuk domain healthcare, ini bagian inti dari kualitas layanan digital.
