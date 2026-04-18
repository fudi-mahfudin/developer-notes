# Q24 - Idempotency dan Hubungannya dengan Retry Async Call

## Pertanyaan Interview

Apa itu idempotency dan hubungannya dengan retry async call?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Idempotency berarti operasi yang sama bisa dipanggil berulang kali
dengan hasil akhir yang sama, tanpa side effect ganda.
Ini krusial untuk retry, karena saat jaringan timeout kita sering tidak tahu
request pertama sudah diproses atau belum.

Kalau endpoint tidak idempotent, retry bisa bikin duplikasi transaksi.
Di healthcare integration, ini berbahaya karena bisa menggandakan update stok
atau status pasien. Jadi retry yang aman harus didukung idempotency key,
state checkpoint, dan deduplication di server." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Metode HTTP mana yang idempotent?"
2. "Apakah POST bisa idempotent?"
3. "Bagaimana desain idempotency key?"
4. "Berapa lama key disimpan?"
5. "Apa anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) HTTP idempotent:
"GET, PUT, DELETE secara semantik; POST default-nya tidak."

2) POST bisa?
"Bisa, jika server menerapkan idempotency key + dedup logic."

3) Desain key:
"Unik per operasi bisnis, stabil, dan terikat context request."

4) TTL key:
"Sesuai window retry bisnis, cukup lama untuk mencegah duplikasi."

5) Anti-pattern:
"Retry POST tanpa key lalu berharap tidak ada duplikasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Idempotency adalah prasyarat retry yang aman pada operasi tulis.

Komponen utama:
- unique operation key
- server-side dedup store
- consistent response replay untuk key yang sama

Manfaat:
- mencegah duplicate side effects
- meningkatkan keandalan saat timeout/intermittent failure

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa retry dan idempotency tidak bisa dipisah

Retry tanpa idempotency = risiko transaksi ganda.
Ini masalah klasik distributed systems.

### 2) Pola implementasi

- client kirim `idempotencyKey`
- server cek key:
  - belum ada: proses dan simpan hasil
  - sudah ada: return hasil sebelumnya

### 3) Anti-pattern umum

- key dibuat random per retry (harusnya sama)
- key tidak diikat ke payload penting
- tidak ada storage dedup yang reliabel

Mitigasi:
- key generation policy
- payload hash validation
- dedup persistence dengan TTL

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const idemKey = `return:${transactionId}`;

await post("/api/returns", payload, {
  headers: { "Idempotency-Key": idemKey },
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam workflow rumah sakit:
- transaksi sering kritikal dan sensitif
- timeout integrasi bisa terjadi
- duplikasi update berdampak langsung ke operasional farmasi

Idempotency menjaga agar retry tidak mengubah hasil bisnis secara salah.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
request retur ke WMS timeout.
client retry tanpa idempotency key.
ternyata request pertama sudah sukses, request kedua diproses lagi.

Akibat:
- stok berkurang dua kali
- rekonsiliasi memakan waktu
- trust ke sistem menurun

Perbaikan:
- enforce idempotency key mandatory
- server simpan hasil per key
- retry policy hanya untuk operasi idempotent

## Contoh Pola Kode yang Lebih Aman

```ts
type SyncRequest = {
  transactionId: string;
  payload: unknown;
};

async function syncReturn(req: SyncRequest) {
  const idempotencyKey = `retur:${req.transactionId}`;
  return sendWithIdempotency(req.payload, idempotencyKey);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan definisi idempotency dengan dampak praktis.
- Menjelaskan kenapa retry butuh idempotency.
- Menyebut desain key dan dedup server.
- Menyebut anti-pattern retry POST tanpa key.
- Mengaitkan ke risiko duplikasi transaksi healthcare.

## Ringkasan Final

Idempotency adalah fondasi reliability untuk operasi tulis yang bisa di-retry.
Tanpa idempotency, retry berpotensi menciptakan kerusakan data.
Di sistem healthcare, penerapan idempotency key yang disiplin
adalah kontrol utama untuk mencegah duplikasi side effect.
