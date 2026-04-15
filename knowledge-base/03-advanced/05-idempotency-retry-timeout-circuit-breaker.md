# Idempotency, Retry, Timeout, Circuit Breaker

## Core Idea (Feynman Concept Applied)

Ini seperti prosedur darurat: kalau bel pintu tidak dibuka, kamu coba lagi beberapa kali. Kalau tetap gagal, berhenti dulu agar tidak merusak pintu.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Idempotency mencegah efek ganda request berulang.
- Retry/timeout/circuit breaker melindungi sistem dari dependency tidak stabil.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: retry exponential backoff.
  - Kapan dipakai: error sementara.
  - Kelebihan: peluang sukses naik.
  - Keterbatasan: bisa menambah beban jika salah setting.
- Strategi 2: circuit breaker bertingkat.
  - Kapan dipakai: dependency sering fail.
  - Kelebihan: isolasi kegagalan.
  - Keterbatasan: perlu parameter tuning.

### Risiko dan Pitfall
- Risiko 1: retry storm.
  - Gejala: traffic meningkat saat gangguan.
  - Dampak: outage memburuk.
  - Mitigasi: jitter + retry cap.
- Risiko 2: timeout tidak proporsional.
  - Gejala: false failure.
  - Dampak: request valid ikut gagal.
  - Mitigasi: baseline latency per endpoint.

### Pros dan Cons
- **Pros**
  - Reliability meningkat.
  - Kegagalan dependency lebih terkontrol.
- **Cons**
  - Konfigurasi kompleks.
  - Butuh observability kuat.

### Trade-off Praktis di Produksi
- Availability tinggi vs kompleksitas runtime policy.
- Respons cepat error vs kemungkinan recovery otomatis.
- Keputusan dari timeout rate, retry success rate, dan breaker trip rate.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Payment callback**
  - Kondisi: callback duplicate.
  - Masalah tanpa strategi: transaksi ganda.
  - Solusi: idempotency key.
  - Hasil yang diharapkan: transaksi aman.
  - Catatan trade-off: storage key management.
- **Kasus 2: Vendor API lambat**
  - Kondisi: timeout sporadis.
  - Masalah tanpa strategi: cascading failure.
  - Solusi: timeout + retry + breaker.
  - Hasil yang diharapkan: core service tetap sehat.
  - Catatan trade-off: beberapa request perlu retry manual.

## Best Practices

- Gunakan idempotency key untuk operasi create/payment.
- Retry dengan exponential backoff.
- Kombinasikan timeout + circuit breaker untuk proteksi sistem.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
async function retry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= max) throw err;
      await new Promise((r) => setTimeout(r, attempt * 200)); // backoff sederhana
    }
  }
}
```

## Checklist Pemahaman

- [ ] Tahu kenapa retry tanpa batas berbahaya.
- [ ] Tahu kapan idempotency wajib dipakai.

## Latihan Mandiri

- Tambahkan idempotency key pada endpoint create order.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: retry success rate, breaker open count.
- Metrik bisnis: transaksi ganda, transaksi gagal.
- Ambang batas awal: duplicate transaction = 0.
