# Message Queue dan Background Jobs

## Core Idea (Feynman Concept Applied)

Queue itu seperti nomor antrean bank. Permintaan masuk disimpan dulu, lalu petugas memproses satu per satu secara teratur.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Queue memisahkan jalur request user dan proses berat di background.
- Producer menulis job, consumer memproses dengan ack/retry.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: single queue.
  - Kapan dipakai: volume menengah.
  - Kelebihan: sederhana.
  - Keterbatasan: prioritas job terbatas.
- Strategi 2: priority queue + DLQ.
  - Kapan dipakai: proses kritikal.
  - Kelebihan: kontrol prioritas dan isolasi gagal.
  - Keterbatasan: setup lebih kompleks.

### Risiko dan Pitfall
- Risiko 1: poison message.
  - Gejala: job gagal berulang.
  - Dampak: backlog menumpuk.
  - Mitigasi: dead-letter queue.
- Risiko 2: consumer tidak idempotent.
  - Gejala: proses ganda.
  - Dampak: duplikasi data.
  - Mitigasi: idempotency key.

### Pros dan Cons
- **Pros**
  - Menahan spike traffic.
  - Memisahkan concern sinkron vs async.
- **Cons**
  - Eventual consistency.
  - Observability alur lebih menantang.

### Trade-off Praktis di Produksi
- Respons cepat user vs konsistensi real-time.
- Throughput tinggi vs kompleksitas operasi.
- Keputusan berdasarkan queue lag dan failure retry rate.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Notifikasi pasca transaksi**
  - Kondisi: transaksi tinggi.
  - Masalah tanpa strategi: endpoint lambat.
  - Solusi: notifikasi via queue.
  - Hasil yang diharapkan: checkout cepat.
  - Catatan trade-off: notifikasi tidak instan.
- **Kasus 2: Sinkronisasi ke pihak ketiga**
  - Kondisi: vendor sering timeout.
  - Masalah tanpa strategi: request user ikut gagal.
  - Solusi: background job + retry terkontrol.
  - Hasil yang diharapkan: reliability naik.
  - Catatan trade-off: perlu monitoring backlog.

## Best Practices

- Job payload kecil, simpan data besar di DB.
- Idempotent consumer agar retry aman.
- Pantau queue depth dan processing lag.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
type Job = { id: string; type: "SYNC_INVENTORY" };

const queue: Job[] = [];

function enqueue(job: Job) {
  // Simulasi producer
  queue.push(job);
}

function consume() {
  // Simulasi consumer
  const job = queue.shift();
  if (job) console.log("processing", job.id);
}
```

## Checklist Pemahaman

- [ ] Tahu peran producer dan consumer.
- [ ] Tahu kapan job harus diproses async/background.

## Latihan Mandiri

- Desain flow retry 3 kali lalu kirim ke dead-letter queue.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: queue lag, retry rate, DLQ count.
- Metrik bisnis: keterlambatan notifikasi/sinkronisasi.
- Ambang batas awal: DLQ tidak bertambah kontinu.
