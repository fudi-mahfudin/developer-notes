# Q57 - Kapan Node.js Bukan Pilihan Tepat

## Pertanyaan Interview

Kapan Node.js bukan pilihan backend yang tepat?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Node.js kuat untuk I/O-bound workloads dan aplikasi real-time.
Tapi untuk CPU-bound berat seperti komputasi intensif berkelanjutan,
Node bisa kurang efisien jika tidak dipisah ke worker/service lain.

Node juga bukan pilihan terbaik jika organisasi butuh ekosistem spesifik
yang lebih matang di platform lain, misalnya library domain tertentu.
Intinya bukan 'Node bagus atau buruk', tapi kesesuaian workload, skill tim,
dan kebutuhan operasional.

Di healthcare, saya pragmatis: pakai Node untuk orchestration API dan integrasi,
tapi offload pekerjaan berat ke layanan khusus agar latency stabil." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa contoh workload yang kurang cocok untuk Node?"
2. "Apakah worker_threads menyelesaikan semua masalah?"
3. "Kapan perlu polyglot architecture?"
4. "Bagaimana keputusan teknologinya dibuat?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Kurang cocok:
"CPU-bound kontinu, scientific computing berat, low-latency deterministic tertentu."

2) worker_threads cukup?
"Membantu, tapi menambah kompleksitas koordinasi."

3) Polyglot:
"Saat domain tertentu butuh runtime/library yang jauh lebih tepat."

4) Keputusan:
"Data-driven: benchmark, biaya operasional, skill tim, risiko."

5) Anti-pattern:
"Memaksa satu stack untuk semua jenis masalah."

## Jawaban Ideal (Versi Singkat, Level Senior)

Node tepat jika:
- banyak I/O
- concurrency tinggi
- delivery cepat dibutuhkan

Node kurang tepat jika:
- CPU-heavy dominan
- kebutuhan real-time deterministik ekstrem
- ecosystem mismatch signifikan

## Penjelasan Detail yang Dicari Interviewer

### 1) Kategori mismatch teknis

- komputasi numerik berat
- image/video processing besar inline request path
- job sinkron panjang tanpa isolasi worker

### 2) Faktor organisasi

- tim tidak punya pengalaman observability Node production
- kebutuhan compliance tooling lebih kuat di platform lain
- dependency kritikal hanya stabil di bahasa tertentu

### 3) Solusi hybrid

- Node untuk API gateway/orchestration
- service khusus untuk heavy compute
- async messaging antar layanan

Mitigasi:
- SLO per service
- contract API jelas
- deployment pipeline konsisten lintas stack

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const architectureDecision = {
  apiOrchestration: "nodejs",
  heavyCompute: "dedicated-service",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare platform sering campuran:
- alur transaksi tinggi (cocok Node)
- proses analitik/transform berat (mungkin perlu stack lain)

Keputusan stack yang tepat menjaga response time
dan stabilitas layanan saat beban meningkat.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
proses transform dokumen berat dijalankan langsung di request API Node.
latency endpoint lain ikut naik drastis.

Perbaikan:
- ekstrak proses berat ke worker queue / service terpisah
- API Node hanya orchestration

## Contoh Pola Kode yang Lebih Aman

```ts
type RuntimeFit = {
  workload: "io-bound" | "cpu-bound";
  preferredRuntime: "nodejs" | "specialized";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konteks kapan Node kurang tepat.
- Menjelaskan perbedaan I/O-bound vs CPU-bound.
- Menyebut solusi hybrid/polyglot.
- Menyebut faktor organisasi dan operasional.
- Relevan pada beban kerja healthcare.

## Ringkasan Final

Node.js bukan jawaban universal.
Pilihan runtime harus berbasis karakter workload dan operasi production.
Pendekatan senior adalah pragmatic architecture:
gunakan Node di area yang memberi nilai terbaik,
dan delegasikan beban yang tidak cocok ke layanan yang tepat.
