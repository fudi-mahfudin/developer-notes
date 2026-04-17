# Q38 - Menangani Deep Clone Object Kompleks

## Pertanyaan Interview

Bagaimana menangani deep clone object kompleks (Date, Map, circular reference)?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Deep clone object kompleks tidak bisa diselesaikan aman dengan cara naif.
`JSON.stringify/parse` gagal untuk Date, Map, Set, function, dan circular reference.
Untuk kasus modern, opsi pertama biasanya `structuredClone` jika didukung runtime.
Kalau butuh kontrol khusus, pakai library teruji atau custom clone terarah.

Di production, saya hindari deep clone buta pada object besar karena biaya memori/CPU.
Saya lebih pilih immutable update targeted jika memungkinkan.
Di sistem healthcare, ini penting supaya transform data tetap akurat dan tidak merusak tipe." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan structuredClone cukup?"
2. "Apa keterbatasan structuredClone?"
3. "Kapan perlu custom clone?"
4. "Bagaimana menangani circular refs?"
5. "Apa dampak performa deep clone?"

### Jawaban Singkat untuk Follow-up

1) structuredClone cukup:
"Saat tipe data didukung dan kebutuhan cloning generik."

2) Keterbatasan:
"Tidak cocok untuk function/class instance behavior tertentu."

3) Custom clone:
"Jika ada aturan domain spesifik per field."

4) Circular refs:
"Gunakan algoritma dengan WeakMap untuk tracking visited objects."

5) Performa:
"Bisa mahal; hindari di hot path request."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pilihan teknik:
- `structuredClone` untuk baseline modern
- library clone untuk kompatibilitas luas
- custom clone untuk domain rules spesifik

Prinsip:
- clone seperlunya
- pertahankan tipe penting
- ukur biaya performa

## Penjelasan Detail yang Dicari Interviewer

### 1) Tantangan tipe data

Object kompleks bisa berisi:
- `Date`
- `Map` / `Set`
- nested arrays
- circular links

Setiap tipe perlu perlakuan tepat agar semantic tidak hilang.

### 2) Anti-pattern umum

- clone dengan JSON untuk semua kasus
- deep clone full payload padahal hanya butuh 2 field berubah
- clone berulang di loop besar

Mitigasi:
- targeted copy-on-write
- utility clone terstandar
- profiling pada hot path

### 3) Kapan tidak perlu deep clone

Jika data read-only atau hanya subset berubah,
lebih efisien lakukan partial clone pada jalur yang dibutuhkan.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const original = {
  createdAt: new Date(),
  meta: new Map([["a", 1]]),
};

const cloned = structuredClone(original);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam integrasi healthcare:
- payload sering kaya metadata
- tipe tanggal dan mapping kode penting
- salah clone bisa ubah makna data

Clone yang benar menjaga integritas transform sebelum kirim antar sistem.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
payload transaksi di-clone pakai JSON.
field Date berubah jadi string, Map hilang struktur.
validasi downstream gagal atau data salah interpretasi.

Perbaikan:
- gunakan structuredClone/library yang mempertahankan tipe
- tambahkan test khusus untuk tipe data penting

## Contoh Pola Kode yang Lebih Aman

```ts
function cloneTransaction<T>(data: T): T {
  return structuredClone(data);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kenapa JSON clone tidak universal.
- Menyebut solusi modern dan trade-off.
- Menyebut circular reference handling.
- Menyinggung biaya performa.
- Relevan dengan payload kompleks healthcare.

## Ringkasan Final

Deep clone kompleks harus dipilih dengan sadar, bukan default refleks.
Gunakan teknik yang menjaga tipe data dan efisiensi runtime.
Di sistem healthcare, clone yang salah bisa menimbulkan bug data serius,
jadi validasi tipe dan testing wajib diperkuat.
