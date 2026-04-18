# Q17 - Kapan Async/Await Justru Membuat Lambat (Serial Execution)

## Pertanyaan Interview

Kapan `async/await` justru bikin code lambat (serial execution yang tidak perlu)?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`async/await` jadi lambat saat kita `await` beberapa operasi independen secara berurutan.
Itu membuat total waktu jadi penjumlahan semua latency, padahal bisa diparalelkan.
Pola yang benar adalah jalankan promise dulu, lalu `await Promise.all` jika tidak ada
dependency antar step.

Di production healthcare, dampaknya bisa signifikan pada batch processing dan integrasi.
Saya selalu cek dependency graph dulu: mana yang wajib berurutan, mana yang bisa paralel.
Tujuannya menjaga latency tanpa mengorbankan konsistensi bisnis." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan harus tetap serial?"
2. "Apa risiko paralelisasi berlebihan?"
3. "Bagaimana membatasi concurrency?"
4. "Kapan pilih allSettled dibanding all?"
5. "Bagaimana ukur dampak refactor ini?"

### Jawaban Singkat untuk Follow-up

1) Tetap serial:
"Saat step B bergantung output step A."

2) Risiko paralel:
"Rate limit, resource contention, dan partial failure lebih kompleks."

3) Batasi concurrency:
"Gunakan pool/queue, semaphore, atau batching terkontrol."

4) allSettled:
"Saat ingin kumpulkan semua hasil walau sebagian gagal."

5) Ukur dampak:
"Bandingkan latency p95, throughput, dan error rate sebelum-sesudah."

## Jawaban Ideal (Versi Singkat, Level Senior)

Masalah utama bukan `await`, tapi penggunaan yang salah.

Serial tidak perlu:
- lambat
- membuang peluang paralelisme I/O
- memperpanjang critical path request

Pendekatan senior:
- petakan dependency antar task
- paralelkan task independen
- pasang concurrency limit agar tetap aman

## Penjelasan Detail yang Dicari Interviewer

### 1) Contoh kesalahan umum

```js
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();
```

Jika A/B/C independen, ini suboptimal.

### 2) Perbaikan umum

```js
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
```

### 3) Anti-pattern lanjutan

- paralelisasi tanpa batas di dataset besar
- ignore retry policy per endpoint
- tidak menangani partial failure

Mitigasi:
- concurrency limiter
- circuit breaker/rate limit awareness
- allSettled + kompensasi

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Serial (3 x 200ms = ~600ms)
const x = await getX();
const y = await getY();
const z = await getZ();

// Paralel (maks ~200ms)
const [x2, y2, z2] = await Promise.all([getX(), getY(), getZ()]);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di alur sinkronisasi rumah sakit:
- banyak request ke service berbeda yang kadang independen
- latency tinggi bisa menghambat dashboard operasional
- backlog job cepat menumpuk saat peak hour

Optimasi paralelisasi terkontrol membantu capai SLA tanpa kompromi kualitas data.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
job rekonsiliasi memanggil 3 endpoint referensi berurutan padahal tidak saling tergantung.
Akibatnya satu job lambat, antrean memanjang, dan status transaksi tertunda.

Perbaikan:
- ubah ke Promise.all untuk data independen
- tetap serialkan step final commit agar konsisten
- tambah limiter agar tidak melebihi kapasitas downstream

## Contoh Pola Kode yang Lebih Aman

```ts
async function enrichTransaction(txId: string) {
  const [patient, inventory, rules] = await Promise.all([
    fetchPatient(txId),
    fetchInventory(txId),
    fetchRules(txId),
  ]);

  return { patient, inventory, rules };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan sumber lambat: serial execution yang tidak perlu.
- Menyebut dependency analysis sebelum paralelisasi.
- Menyebut risiko paralel berlebihan.
- Memberi solusi concurrency limit.
- Mengaitkan ke SLA dan throughput healthcare.

## Ringkasan Final

`async/await` tidak lambat secara default; lambat muncul saat dipakai serial tanpa alasan.
Kunci senior ada pada pemetaan dependency dan concurrency control.
Di sistem healthcare, optimasi ini langsung berdampak ke latency operasional
dan kestabilan integrasi lintas sistem.
