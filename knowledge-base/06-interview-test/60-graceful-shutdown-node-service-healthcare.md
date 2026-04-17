# Q60 - Graceful Shutdown pada Node Service

## Pertanyaan Interview

Bagaimana menerapkan graceful shutdown pada service Node.js di production?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Graceful shutdown artinya service berhenti dengan aman tanpa kehilangan request/data.
Saat menerima `SIGTERM`, service harus stop menerima request baru,
menyelesaikan request aktif dalam batas waktu,
flush log/metrics, menutup koneksi DB/queue, lalu exit bersih.

Jika tidak graceful, rollout bisa menyebabkan request putus,
job setengah jalan, atau data inkonsisten.
Di environment healthcare, ini kritikal karena transaksi harus konsisten
meskipun ada deploy atau restart node.

Saya juga selalu pasang timeout shutdown maksimum
dan fallback force-exit jika service macet." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa tidak langsung `process.exit(0)`?"
2. "Berapa lama timeout shutdown ideal?"
3. "Bagaimana menangani background jobs?"
4. "Bagaimana verifikasi graceful shutdown berhasil?"
5. "Anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) Langsung exit:
"Berisiko memotong request dan menyebabkan data inconsistency."

2) Timeout ideal:
"Tergantung SLA, umumnya 10-30 detik dengan observasi nyata."

3) Background jobs:
"Pause consumer, selesaikan job in-flight, simpan checkpoint jika perlu."

4) Verifikasi:
"Gunakan shutdown metrics, drain logs, dan chaos test restart."

5) Anti-pattern:
"Menutup process sebelum koneksi dependency benar-benar ditutup."

## Jawaban Ideal (Versi Singkat, Level Senior)

Graceful shutdown checklist:
- tangkap signal
- stop intake traffic
- drain in-flight work
- tutup resources
- exit dengan kode tepat

## Penjelasan Detail yang Dicari Interviewer

### 1) Urutan shutdown yang benar

1. Tandai service "not ready" untuk load balancer.
2. Stop menerima request baru.
3. Tunggu in-flight request selesai.
4. Tutup DB connection, broker consumer, cache client.
5. Flush telemetry.
6. Exit.

### 2) Risiko jika salah urut

- request 5xx saat deploy
- duplicate processing di queue
- kehilangan log penting saat incident

### 3) Integrasi dengan orchestrator

- dukung `SIGTERM` dari Kubernetes/systemd
- sinkronkan `terminationGracePeriodSeconds`
- readiness/liveness probe harus sesuai lifecycle

Mitigasi:
- shutdown timeout eksplisit
- test rutin rolling restart
- runbook incident deploy

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
process.on("SIGTERM", async () => {
  // stop accepting new traffic, then drain and close resources
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare platform, restart service itu normal (deploy, patch, scaling).
Yang tidak boleh normal adalah kehilangan transaksi atau status yang ambigu.
Graceful shutdown menjaga konsistensi operasional
saat perubahan infrastruktur terjadi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
deploy baru mematikan pod cepat.
request pembayaran in-flight gagal setengah jalan.

Perbaikan:
- implement drain request
- ack queue setelah commit sukses
- aktifkan readiness drop sebelum terminate

## Contoh Pola Kode yang Lebih Aman

```ts
type ShutdownState = {
  acceptingTraffic: boolean;
  inflightRequests: number;
  deadlineMs: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep graceful shutdown dengan urutan benar.
- Menjelaskan penanganan signal dan drain traffic.
- Menyebut dependency cleanup.
- Menyebut timeout/fallback.
- Relevan untuk reliabilitas healthcare production.

## Ringkasan Final

Graceful shutdown adalah requirement reliability, bukan fitur tambahan.
Service Node yang matang harus bisa berhenti aman saat deploy/restart.
Dengan urutan shutdown yang benar, kita menghindari data inconsistency
dan menjaga continuity operasional di sistem healthcare.
