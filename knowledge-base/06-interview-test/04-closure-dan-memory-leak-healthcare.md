# Q4 - Closure dan Kapan Menjadi Sumber Memory Leak

## Pertanyaan Interview

Bagaimana closure bekerja, dan kapan closure jadi sumber memory leak?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Closure terjadi ketika function tetap punya akses ke lexical scope tempat dia dibuat,
meskipun outer function sudah selesai dieksekusi. Ini fitur inti JavaScript dan sangat
berguna untuk encapsulation, factory function, dan partial application.

Closure jadi masalah ketika tanpa sadar menahan referensi object besar lebih lama dari
yang dibutuhkan, misalnya cache tidak dibatasi, listener tidak dibersihkan, atau timer
tidak di-clear. Di sistem healthcare dengan traffic stabil sepanjang hari, pola ini bisa
naikkan memory footprint dan memicu degradasi performa bertahap." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Closure itu sendiri leak atau tidak?"
2. "Contoh closure yang aman?"
3. "Bagaimana mendeteksi memory leak dari closure di Node.js?"
4. "Bagaimana mitigasi pada event listener?"
5. "Apa best practice cache berbasis closure?"

### Jawaban Singkat untuk Follow-up

1) Closure bukan leak:
"Closure netral; leak muncul kalau referensi yang disimpan tidak pernah dilepas."

2) Contoh aman:
"Simpan hanya data kecil yang relevan, bukan object besar yang tidak dipakai lagi."

3) Deteksi di Node:
"Gunakan heap snapshot, lihat retained object chain, dan cari closure yang menahan data besar."

4) Listener:
"Pastikan unsubscribe/remove listener saat lifecycle selesai."

5) Cache closure:
"Gunakan TTL/LRU + kapasitas maksimum agar memori terkontrol."

## Jawaban Ideal (Versi Singkat, Level Senior)

Closure adalah mekanisme function menangkap environment lexical.
Nilai plus:
- encapsulation tanpa class
- state private sederhana
- API yang lebih ekspresif

Risiko:
- retained references pada object besar
- cache tanpa eviction
- callback/listener hidup terlalu lama

Senior mindset:
gunakan closure dengan lifecycle jelas, dan selalu desain strategi release reference.

## Penjelasan Detail yang Dicari Interviewer

### 1) Cara kerja closure secara runtime

Saat function dibuat, engine menyimpan akses ke environment yang dibutuhkan.
Jika inner function masih direferensikan, environment itu tetap hidup di memori.

### 2) Kapan jadi leak nyata

- Menyimpan response payload besar di closure cache tanpa batas.
- Menaruh DOM/data map besar di callback interval yang tidak dihentikan.
- Menyimpan map by patientId tanpa TTL pada service long-running.

### 3) Anti-pattern umum

- "temporary debug cache" yang tidak pernah dihapus.
- anonymous listener sehingga sulit di-remove.
- closure pada singleton service yang menyimpan state request-scoped.

Mitigasi:
- batasi retention policy
- gunakan weak references bila cocok
- pisahkan state request-scope vs app-scope

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function createLeakyCache() {
  const cache = new Map();
  return function save(key, value) {
    cache.set(key, value); // tanpa batas dan tanpa TTL
  };
}

function createSafeCache(maxEntries = 200) {
  const cache = new Map();
  return function save(key, value) {
    cache.set(key, value);
    if (cache.size > maxEntries) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  };
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada workload rumah sakit:
- service cenderung aktif terus
- volume transaksi bertahap meningkat
- incident memory leak sering muncul sebagai slow degradation

Dengan pengalaman kamu di Node.js production, closure yang tidak dikelola bisa:
- memperbesar RSS memory
- meningkatkan GC pause
- menurunkan throughput service integrasi

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
service integrasi menyimpan hasil transform payload resep per encounter di closure map.
Awalnya dipasang untuk debug cepat, tetapi tidak ada TTL/eviction.
Setelah beberapa hari, memory naik terus dan latency endpoint meningkat.

Dampaknya:
- antrean job retur melambat
- SLA sinkronisasi ke WMS terganggu
- tim operasi melihat delay status stok

## Contoh Pola Kode yang Lebih Aman

```ts
type CacheRecord<T> = { value: T; expiredAt: number };

function createTtlCache<T>(ttlMs: number, maxEntries: number) {
  const cache = new Map<string, CacheRecord<T>>();

  return {
    get(key: string): T | undefined {
      const found = cache.get(key);
      if (!found) return undefined;
      if (Date.now() > found.expiredAt) {
        cache.delete(key);
        return undefined;
      }
      return found.value;
    },
    set(key: string, value: T) {
      cache.set(key, { value, expiredAt: Date.now() + ttlMs });
      if (cache.size > maxEntries) {
        const first = cache.keys().next().value as string;
        cache.delete(first);
      }
    },
  };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan closure sebagai fitur, bukan otomatis bug.
- Menjelaskan syarat leak: reference retained terlalu lama.
- Memberi teknik deteksi dan mitigasi yang implementable.
- Mengaitkan ke service Node long-running healthcare.
- Menyediakan contoh aman vs berisiko.

## Ringkasan Final

Closure adalah fondasi JavaScript yang sangat berguna.
Masalah muncul saat lifecycle referensi tidak dikontrol.
Di domain healthcare, leak kecil yang dibiarkan bisa menjadi incident operasional.
Strategi senior: desain closure dengan batas memori, cleanup, dan observability sejak awal.
