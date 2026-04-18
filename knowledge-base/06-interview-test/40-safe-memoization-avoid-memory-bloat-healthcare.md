# Q40 - Memoization yang Aman dari Memory Bloat

## Pertanyaan Interview

Bagaimana kamu melakukan memoization yang aman dari memory bloat?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Memoization mempercepat komputasi berulang dengan menyimpan hasil sebelumnya.
Masalahnya, cache bisa tumbuh tanpa batas dan menyebabkan memory bloat.
Strategi aman: batasi ukuran cache, pakai TTL/LRU, definisikan key stabil,
dan monitor hit rate vs memory cost.

Di production, memoization tidak boleh jadi black box.
Kalau cache hit rendah tapi memory tinggi, berarti strategi salah.
Di sistem healthcare, saya pakai memoization selektif pada operasi mahal
yang deterministic, bukan pada data yang cepat berubah." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan memoization tidak cocok?"
2. "Apa bedanya TTL vs LRU?"
3. "Bagaimana desain key memoization?"
4. "Apa risiko cache stale?"
5. "Bagaimana validasi manfaat memoization?"

### Jawaban Singkat untuk Follow-up

1) Tidak cocok:
"Untuk fungsi dengan input sangat bervariasi dan hit rate rendah."

2) TTL vs LRU:
"TTL berbasis umur data, LRU berbasis frekuensi penggunaan terbaru."

3) Desain key:
"Deterministik, ringkas, dan merepresentasikan input penting."

4) Risiko stale:
"Hasil lama dipakai saat data sumber sudah berubah."

5) Validasi manfaat:
"Pantau hit ratio, latency turun, dan memory footprint tetap sehat."

## Jawaban Ideal (Versi Singkat, Level Senior)

Memoization aman membutuhkan:
- bounded cache
- eviction policy (TTL/LRU)
- observability metrics
- scope penggunaan yang tepat

Tujuan:
performa naik tanpa mengorbankan stabilitas memori.

## Penjelasan Detail yang Dicari Interviewer

### 1) Sumber memory bloat

- key tidak pernah dihapus
- input space terlalu besar
- cache global hidup sepanjang proses

### 2) Anti-pattern umum

- memoize fungsi yang hasilnya bergantung waktu eksternal
- cache value besar tanpa batas
- tidak ada invalidation strategy

Mitigasi:
- max entries
- TTL konservatif
- segmentasi cache per domain

### 3) Trade-off

Cache besar:
- hit rate bisa naik
- tapi memory dan GC pressure naik

Cache kecil:
- memory aman
- hit rate mungkin turun

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function memoizeWithLimit(fn, maxEntries = 200) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    if (cache.size > maxEntries) {
      const oldest = cache.keys().next().value;
      cache.delete(oldest);
    }
    return result;
  };
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada service healthcare long-running:
- memory leak/bloat berdampak jangka panjang
- restart mendadak bisa ganggu operasional
- cache harus seimbang antara speed dan safety

Memoization tanpa batas bisa jadi sumber incident tersembunyi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
fungsi mapping kode obat dimemoize global tanpa batas.
setelah beberapa hari, key terus bertambah dari variasi input.
memory naik bertahap dan service melambat.

Perbaikan:
- batasi entri cache
- tambahkan TTL
- ukur cache hit ratio untuk memastikan nilai bisnis nyata

## Contoh Pola Kode yang Lebih Aman

```ts
type CacheStats = { hits: number; misses: number; size: number };

function createMemoizedMapper(maxEntries: number) {
  const cache = new Map<string, string>();
  const stats: CacheStats = { hits: 0, misses: 0, size: 0 };
  return { cache, stats, maxEntries };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan manfaat dan risiko memoization.
- Menyebut eviction policy dan batas ukuran.
- Menyebut stale data risk.
- Menyebut metrik evaluasi cache.
- Relevan dengan service healthcare long-running.

## Ringkasan Final

Memoization efektif jika terukur dan dibatasi.
Tanpa policy eviction, cache bisa berubah jadi memory bomb.
Di sistem healthcare, memoization harus dirancang disiplin
agar performa meningkat tanpa mengorbankan stabilitas produksi.
