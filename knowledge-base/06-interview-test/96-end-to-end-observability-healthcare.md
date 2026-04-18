# Q96 - Observability End-to-End

## Pertanyaan Interview

Bagaimana membangun observability end-to-end untuk sistem JavaScript?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Observability end-to-end berarti kita bisa mengikuti perjalanan request
dari frontend ke backend sampai dependency eksternal.
Tiga pilar tetap penting: metrics, logs, traces.
Tapi yang membedakan adalah korelasi antar-sinyal dengan context ID yang konsisten.

Saya biasanya memastikan:
frontend kirim trace context,
backend menyebarkan correlation ID ke semua service,
serta dashboard SLO untuk alur kritis.
Dengan begitu, saat ada insiden, kita tidak menebak.
Kita langsung tahu titik bottleneck dan dampak bisnis.
Di healthcare, ini krusial untuk menjaga reliability proses operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Mulai dari mana jika observability masih minim?"
2. "Peran tracing dibanding logging?"
3. "Bagaimana menghindari noise alert?"
4. "Metric apa yang wajib?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Mulai dari:
"Petakan critical user journey lalu instrument bertahap."

2) Tracing vs logging:
"Tracing untuk alur lintas service, log untuk detail event."

3) Noise alert:
"Alert berbasis SLO burn-rate, bukan threshold mentah."

4) Metric wajib:
"Latency, error rate, traffic, saturation."

5) Anti-pattern:
"Logging banyak tapi tanpa struktur/correlation ID."

## Jawaban Ideal (Versi Singkat, Level Senior)

Observability matang mencakup:
- sinyal lengkap
- context propagation
- SLO-oriented alerting
- runbook respons

## Penjelasan Detail yang Dicari Interviewer

### 1) Instrumentation strategy

- standard metadata: service, env, version, request_id
- structured logs JSON
- distributed tracing untuk lintas boundary

### 2) SLO dan alerting

- definisikan SLI untuk journey penting
- tetapkan error budget
- gunakan multi-window burn-rate alerts

### 3) Incident usability

- dashboard per domain bisnis
- link dari alert ke trace exemplar
- runbook yang actionable

Mitigasi:
- sampling trace adaptif
- log retention policy agar biaya terkendali
- review alert quality bulanan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const logContext = {
  requestId: "req-123",
  service: "patient-api",
  route: "/v1/patients",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare sering terintegrasi dengan banyak komponen.
Tanpa observability end-to-end, akar masalah sulit ditemukan cepat.
Ini langsung berdampak ke kecepatan pemulihan layanan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
user mengeluh proses registrasi pasien lambat.
metric backend terlihat normal,
tapi tracing menunjukkan bottleneck di service verifikasi eksternal.

Perbaikan:
- tambahkan timeout + fallback
- buat dashboard latensi dependency eksternal
- tetapkan alert khusus dependency degradation

## Contoh Pola Kode yang Lebih Aman

```ts
type TraceContext = {
  traceId: string;
  spanId: string;
  serviceName: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan 3 pilar observability.
- Menjelaskan correlation/context propagation.
- Menjelaskan SLO dan model alerting.
- Menjelaskan aspek incident response.
- Relevan untuk sistem healthcare terintegrasi.

## Ringkasan Final

Observability end-to-end memberi kemampuan diagnosis cepat dan presisi.
Dengan korelasi logs-metrics-traces dan alert berbasis SLO,
tim dapat mengurangi MTTR secara signifikan
serta menjaga kualitas layanan kritis tetap stabil.
