# Q32 - Kapan Pakai `Set` dan Kompleksitas Operasi Utamanya

## Pertanyaan Interview

Kapan pakai `Set`, dan apa kompleksitas operasi utamanya?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`Set` saya pakai saat butuh koleksi unik dan operasi membership check cepat.
Operasi umum seperti `add`, `has`, dan `delete` secara rata-rata O(1).
Ini lebih tepat daripada array kalau sering cek duplikasi atau membership.

Di production, `Set` efektif untuk dedup transaksi, filter id yang sudah diproses,
atau mencegah pemrosesan berulang. Di healthcare integration, ini membantu menjaga
integritas alur saat volume data tinggi tanpa biaya iterasi berulang." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan array masih lebih cocok?"
2. "Apa kekurangan Set?"
3. "Bagaimana dedup object di Set?"
4. "Apakah Set menjaga urutan?"
5. "Apa anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Array lebih cocok:
"Saat butuh index-based access dan operasi sekuensial sederhana."

2) Kekurangan Set:
"Tidak punya key-value dan serialisasi JSON tidak langsung."

3) Dedup object:
"Object dibanding by reference, jadi perlu key normalisasi untuk dedup by value."

4) Urutan:
"Ya, Set menjaga insertion order."

5) Anti-pattern:
"Menganggap Set dedup object by deep value secara otomatis."

## Jawaban Ideal (Versi Singkat, Level Senior)

Gunakan `Set` untuk:
- uniqueness guarantee
- lookup membership cepat
- dedup data primitive skala besar

Kompleksitas rata-rata:
- `add`: O(1)
- `has`: O(1)
- `delete`: O(1)

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa Set unggul untuk dedup

Array dedup naive butuh nested check O(n^2).
Set memungkinkan dedup linear O(n) dengan memori tambahan.

### 2) Keterbatasan penting

Set pada object berbasis referensi.
Dua object konten sama tapi referensi beda dianggap berbeda.

### 3) Anti-pattern umum

- pakai `includes` pada array besar berulang kali
- pakai Set untuk data yang sebenarnya butuh metadata per key
- lupa clear Set pada lifecycle panjang

Mitigasi:
- gunakan Map saat butuh value tambahan
- kontrol ukuran set untuk long-running service

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const ids = ["a", "b", "a", "c"];
const unique = new Set(ids);
console.log(unique.has("b")); // true
console.log(unique.size); // 3
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada integrasi healthcare:
- dedup id transaksi penting untuk hindari double processing
- throughput tinggi butuh lookup cepat
- efisiensi algoritma berdampak langsung ke latency pipeline

Set membantu menjaga performa dan akurasi secara bersamaan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
worker memproses batch id transaksi dengan array includes di loop besar.
latency naik drastis saat batch membesar.

Perbaikan:
- ganti struktur ke Set untuk membership check
- tambah ttl/reset strategy untuk menghindari growth berlebihan

## Contoh Pola Kode yang Lebih Aman

```ts
const processedIds = new Set<string>();

function shouldProcess(id: string): boolean {
  if (processedIds.has(id)) return false;
  processedIds.add(id);
  return true;
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kapan Set lebih tepat dari Array.
- Menyebut kompleksitas utama yang relevan.
- Menjelaskan keterbatasan dedup object.
- Menyebut risiko memory growth.
- Mengaitkan ke dedup transaksi healthcare.

## Ringkasan Final

Set adalah pilihan kuat untuk uniqueness dan lookup cepat.
Untuk data volume besar, Set memberi keuntungan kompleksitas signifikan.
Di sistem healthcare, pemakaian Set yang tepat membantu mencegah duplikasi
dan menjaga performa pipeline integrasi.
