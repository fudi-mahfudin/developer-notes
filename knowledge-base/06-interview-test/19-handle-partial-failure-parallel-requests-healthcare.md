# Q19 - Menangani Partial Failure di Request Paralel

## Pertanyaan Interview

Bagaimana menangani partial failure di beberapa request paralel?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Partial failure harus diperlakukan sebagai skenario normal, bukan edge case.
Saya biasanya pisahkan operasi menjadi yang wajib sukses bersama (critical)
dan yang boleh gagal parsial (non-critical). Untuk paralel request, saya pakai
`Promise.allSettled` agar dapat hasil lengkap, lalu klasifikasikan error untuk
retry, kompensasi, atau fail final.

Di production healthcare, kuncinya ada pada idempotency, observability, dan
reconciliation. Tujuannya: data tetap konsisten walau sebagian call gagal." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan partial failure harus bikin seluruh proses gagal?"
2. "Bagaimana desain retry aman?"
3. "Bagaimana menghindari double processing?"
4. "Apa metrik utama untuk memonitor partial failure?"
5. "Kapan perlu dead-letter queue?"

### Jawaban Singkat untuk Follow-up

1) Seluruh proses gagal:
"Saat operasi bersifat atomic dan tidak boleh ada state setengah jalan."

2) Retry aman:
"Gunakan exponential backoff + jitter + idempotency key."

3) Hindari double process:
"Enforce idempotency token dan status checkpoint per item."

4) Metrik:
"failure ratio per dependency, retry success rate, dan processing latency."

5) DLQ:
"Saat ada kegagalan berulang yang butuh investigasi manual."

## Jawaban Ideal (Versi Singkat, Level Senior)

Kerangka penanganan:
1. klasifikasi critical vs non-critical
2. eksekusi paralel dengan hasil granular
3. retry terkontrol untuk transient error
4. kompensasi/rollback untuk side effect parsial
5. audit trail untuk rekonsiliasi

## Penjelasan Detail yang Dicari Interviewer

### 1) Jenis kegagalan

- transient (timeout/network): kandidat retry
- permanent (validation/schema): jangan retry buta
- dependency outage: aktifkan fallback/circuit breaker

### 2) Pola arsitektur

- allSettled + per-item decision
- queue-based recovery
- compensating transaction untuk side effect yang sudah terjadi

### 3) Anti-pattern umum

- retry semua error tanpa klasifikasi
- tidak ada idempotency key
- hasil parsial tidak dicatat detail

Mitigasi:
- error taxonomy
- structured logging
- deterministic state machine

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const results = await Promise.allSettled(tasks.map((t) => runTask(t)));

for (const result of results) {
  if (result.status === "fulfilled") {
    // mark success
  } else {
    // classify and route retry / DLQ
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sinkronisasi rumah sakit:
- satu batch bisa berisi banyak transaksi
- dependency eksternal bisa fluktuatif
- operasi harus tetap berlanjut tanpa mengorbankan konsistensi

Penanganan partial failure yang matang mencegah backlog dan mismatch data.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
100 transaksi retur diproses paralel.
10 gagal timeout, 5 gagal validation.
Sistem lama retry semuanya, termasuk validation error, sampai antrean penuh.

Perbaikan:
- retry hanya transient
- validation error langsung DLQ + notifikasi
- transaksi sukses tetap di-commit

## Contoh Pola Kode yang Lebih Aman

```ts
type SyncOutcome = { id: string; ok: boolean; reason?: string };

async function syncMany(ids: string[]): Promise<SyncOutcome[]> {
  const settled = await Promise.allSettled(ids.map((id) => syncOne(id)));
  return settled.map((r, idx) =>
    r.status === "fulfilled"
      ? { id: ids[idx], ok: true }
      : { id: ids[idx], ok: false, reason: String(r.reason) },
  );
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menunjukkan strategi granular per item.
- Menyebut retry policy berbasis klasifikasi error.
- Menyebut idempotency dan audit trail.
- Menyebut DLQ dan observability.
- Relevan untuk batch healthcare integration.

## Ringkasan Final

Partial failure adalah realitas sistem terdistribusi.
Kunci senior adalah meminimalkan dampak, bukan menganggapnya anomali.
Dengan klasifikasi error, retry terkontrol, dan rekonsiliasi rapi,
sistem healthcare tetap andal meski dependency tidak selalu stabil.
