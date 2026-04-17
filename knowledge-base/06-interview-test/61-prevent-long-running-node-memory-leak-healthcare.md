# Q61 - Mencegah Memory Leak Node.js Jangka Panjang

## Pertanyaan Interview

Bagaimana mencegah memory leak pada service Node.js yang jalan lama?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Memory leak di Node biasanya bukan crash instan, tapi degradasi pelan:
RSS naik terus, GC makin sering, latency naik, lalu service tidak stabil.
Pencegahan dimulai dari desain:
hindari global cache tanpa batas, bersihkan listener/timer,
dan pastikan object lifecycle jelas.

Di production, saya pantau heap usage, event loop lag, GC pause, dan restart pattern.
Kalau ada indikasi leak, saya ambil heap snapshot berkala dan bandingkan retained objects.
Di sistem healthcare yang 24/7, memory discipline penting
karena leak kecil bisa jadi incident besar saat traffic puncak." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Sumber leak paling umum di Node?"
2. "Bagaimana deteksi leak sebelum incident?"
3. "Apakah restart berkala solusi?"
4. "Bagaimana menganalisis heap snapshot?"
5. "Anti-pattern paling berbahaya?"

### Jawaban Singkat untuk Follow-up

1) Sumber umum:
"Cache tak terbatas, listener tidak dibersihkan, closure menahan object besar."

2) Deteksi dini:
"Alert tren memory + GC metrics, bukan threshold sesaat."

3) Restart berkala:
"Mitigasi sementara, bukan perbaikan akar masalah."

4) Heap snapshot:
"Bandingkan retained size antar snapshot untuk lihat growth abnormal."

5) Anti-pattern:
"Menyimpan request context besar di global singleton."

## Jawaban Ideal (Versi Singkat, Level Senior)

Strategi anti-leak:
- bounded cache
- cleanup discipline
- observability memory
- profiling rutin
- code review fokus lifecycle object

## Penjelasan Detail yang Dicari Interviewer

### 1) Pola leak yang sering terjadi

- Map/Object cache tanpa TTL/LRU
- event listeners bertambah tanpa remove
- interval/timeout orphaned
- buffer/string besar tertahan di closure

### 2) Pencegahan by design

- pakai cache policy (`maxEntries`, `ttl`)
- gunakan `once` jika listener tidak perlu permanen
- implement cleanup di shutdown/hot path
- pisahkan data besar ke storage sementara

### 3) Investigasi production

- capture baseline heap saat sehat
- capture heap saat memory naik
- lihat dominator tree dan retained path

Mitigasi:
- hotfix cleanup
- limit concurrency
- canary release untuk validasi perbaikan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const cache = new Map(); // harus diberi batas, jangan tanpa policy
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Service healthcare umumnya long-running dan traffic stabil sepanjang hari.
Leak kecil yang dibiarkan akan:
- menurunkan performa endpoint kritikal
- meningkatkan restart tak terencana
- mengganggu integrasi operasional lintas sistem

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
listener event ditambahkan tiap request tanpa remove.
setelah beberapa jam, memory naik dan response melambat.

Perbaikan:
- pindah listener ke inisialisasi service
- gunakan `once`/`off` sesuai lifecycle

## Contoh Pola Kode yang Lebih Aman

```ts
type CachePolicy = {
  maxEntries: number;
  ttlMs: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan gejala memory leak nyata.
- Menjelaskan sumber leak umum.
- Menjelaskan strategi deteksi + investigasi.
- Menjelaskan mitigasi desain.
- Relevan untuk operasi healthcare 24/7.

## Ringkasan Final

Memory leak adalah masalah reliability jangka panjang.
Pencegahan terbaik adalah kombinasi design discipline dan observability.
Di Node production, fokus pada object lifecycle, cache bound, dan snapshot analysis
agar service tetap stabil di beban tinggi.
