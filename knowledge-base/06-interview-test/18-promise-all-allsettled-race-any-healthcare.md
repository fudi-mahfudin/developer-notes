# Q18 - `Promise.all`, `allSettled`, `race`, `any` dan Trade-off

## Pertanyaan Interview

Bedakan `Promise.all`, `allSettled`, `race`, `any` dan trade-off-nya.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`Promise.all` sukses kalau semua sukses, dan gagal cepat saat satu gagal.
`Promise.allSettled` menunggu semua selesai dan mengembalikan status masing-masing.
`Promise.race` selesai saat promise pertama settle (sukses atau gagal).
`Promise.any` selesai saat ada satu yang sukses; gagal hanya jika semua gagal.

Pilihan metode harus sesuai kebutuhan bisnis: fail-fast, toleransi partial failure,
atau first-response wins. Di sistem healthcare, saya pilih pola berdasarkan dampak data:
apakah operasi harus atomic semua sukses, atau boleh parsial dengan kompensasi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan all lebih tepat dari allSettled?"
2. "Kapan race dipakai aman?"
3. "Apa jebakan Promise.any?"
4. "Bagaimana handling hasil allSettled?"
5. "Bagaimana menggabungkan timeout dengan promise?"

### Jawaban Singkat untuk Follow-up

1) all:
"Saat semua hasil wajib sukses untuk lanjut."

2) race:
"Untuk timeout/fallback cepat, dengan cleanup task yang kalah."

3) any:
"Jika semua gagal, error-nya AggregateError, harus ditangani eksplisit."

4) allSettled:
"Filter fulfilled/rejected lalu jalankan kompensasi per item gagal."

5) Timeout:
"Gunakan race antara operasi utama dan promise timeout."

## Jawaban Ideal (Versi Singkat, Level Senior)

Mapping cepat:
- `all`: strict success dependency
- `allSettled`: observability lengkap semua hasil
- `race`: first settle control
- `any`: first success strategy

Senior trade-off:
- reliabilitas vs latency
- atomicity vs partial progress
- kompleksitas error handling

## Penjelasan Detail yang Dicari Interviewer

### 1) `Promise.all`

Cocok untuk operasi yang saling membutuhkan.
Kelebihan: sederhana.
Kekurangan: satu gagal, semuanya gagal.

### 2) `Promise.allSettled`

Cocok untuk batch processing yang toleran kegagalan parsial.
Kelebihan: visibilitas lengkap.
Kekurangan: butuh logic tambahan untuk kompensasi.

### 3) `Promise.race`

Cocok untuk timeout/fallback.
Kelebihan: respons cepat.
Kekurangan: task kalah tetap berjalan jika tidak dibatalkan.

### 4) `Promise.any`

Cocok multi-source redundancy.
Kelebihan: cepat dapat sukses pertama.
Kekurangan: error handling lebih kompleks saat semua gagal.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
await Promise.all([a(), b(), c()]);
await Promise.allSettled([a(), b(), c()]);
await Promise.race([primary(), timeout()]);
await Promise.any([source1(), source2(), source3()]);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di integrasi healthcare:
- beberapa operasi wajib konsisten (harus semua sukses)
- sebagian operasi boleh parsial asalkan ada rekonsiliasi
- timeout/fallback penting untuk menjaga SLA

Pemilihan primitive promise yang tepat mengurangi insiden data dan latency.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
batch sinkronisasi 100 transaksi memakai `Promise.all`.
Satu transaksi invalid membuat 99 lainnya ikut dianggap gagal.

Perbaikan:
- gunakan `allSettled`
- commit yang sukses
- kirim yang gagal ke retry queue dengan reason spesifik

## Contoh Pola Kode yang Lebih Aman

```ts
async function syncBatch(items: string[]) {
  const results = await Promise.allSettled(items.map((id) => syncOne(id)));
  const failed = results.filter((r) => r.status === "rejected");
  return { total: results.length, failed: failed.length };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan perbedaan empat API secara akurat.
- Menyebut use case bisnis masing-masing.
- Menyebut trade-off fail-fast vs partial success.
- Menyebut risiko race/any.
- Mengaitkan ke batch sync healthcare.

## Ringkasan Final

Tidak ada satu API promise yang paling benar untuk semua kasus.
Pilihan harus mengikuti kebutuhan atomicity, latency, dan strategi recovery.
Di healthcare, keputusan ini menentukan apakah sistem stabil,
responsif, dan tetap konsisten saat terjadi kegagalan parsial.
