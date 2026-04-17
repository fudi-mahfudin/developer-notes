# Q31 - Kapan Pakai `Map` vs Object Biasa

## Pertanyaan Interview

Kapan pakai `Map` vs object biasa?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Saya pakai object biasa untuk struktur data sederhana berbasis string key
yang merepresentasikan shape domain tetap, misalnya payload DTO.
Saya pakai `Map` untuk kebutuhan key-value dinamis, sering tambah/hapus,
butuh urutan insertion yang konsisten, atau key non-string.

Di production, `Map` lebih jelas untuk cache/lookup table dinamis,
sementara object lebih natural untuk data model statis.
Di sistem healthcare, memilih struktur yang tepat membantu performa lookup
dan menurunkan bug saat data volume meningkat." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa keuntungan Map terhadap object?"
2. "Apa kelemahan Map?"
3. "Kapan object lebih tepat?"
4. "Bagaimana serialisasi Map?"
5. "Apa anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Keuntungan Map:
"API lebih jelas (`set/get/has/delete`) dan key bisa tipe apa pun."

2) Kelemahan:
"Tidak langsung JSON serializable seperti object biasa."

3) Object lebih tepat:
"Untuk schema domain statis yang butuh interoperabilitas JSON."

4) Serialisasi:
"Konversi `Map` ke array/object sebelum diserialisasi."

5) Anti-pattern:
"Memakai object untuk cache dinamis besar lalu cleanup jadi rumit."

## Jawaban Ideal (Versi Singkat, Level Senior)

`Object`:
- cocok untuk domain data statis
- natural untuk JSON/API payload
- ringan untuk shape tetap

`Map`:
- cocok untuk dictionary dinamis
- operasi CRUD key-value lebih eksplisit
- mendukung key non-string

## Penjelasan Detail yang Dicari Interviewer

### 1) Sifat key

Object mengubah key menjadi string/symbol.
Map mempertahankan tipe key asli.

### 2) Performa dan maintainability

Pada update/delete intensif, `Map` sering lebih ergonomis.
Pada data DTO, object biasanya lebih sederhana dan lebih kompatibel.

### 3) Anti-pattern umum

- object dipakai sebagai LRU cache besar
- map dipakai untuk payload API langsung
- campur keduanya tanpa kontrak jelas

Mitigasi:
- tetapkan guideline data structure per layer
- lakukan benchmark kecil untuk hotspot

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const obj = { a: 1 };
obj["b"] = 2;

const map = new Map();
map.set("a", 1);
map.set({ type: "key" }, 2);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sistem healthcare:
- ada data payload statis untuk integrasi
- ada lookup dinamis seperti status map, retry map, dedup map

Pemilihan salah bisa memicu bug subtle dan overhead operasional.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim menyimpan dedup transaksi di object dengan key gabungan tidak konsisten.
beberapa transaksi lolos duplikasi.

Perbaikan:
- gunakan `Map` dengan key komposit yang terstandardisasi
- buat utility key builder tunggal

## Contoh Pola Kode yang Lebih Aman

```ts
const processed = new Map<string, boolean>();

function markProcessed(txId: string) {
  processed.set(txId, true);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan perbedaan use case object vs Map.
- Menyebut JSON compatibility.
- Menyebut key type behavior.
- Memberi contoh cache/lookup nyata.
- Mengaitkan ke integrasi healthcare.

## Ringkasan Final

Gunakan object untuk model data statis dan interoperabilitas API.
Gunakan Map untuk key-value dinamis dan operasi lookup intensif.
Keputusan tepat memperbaiki maintainability dan performa di sistem produksi.
