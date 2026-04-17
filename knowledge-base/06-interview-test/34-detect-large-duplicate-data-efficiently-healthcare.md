# Q34 - Deteksi Duplicate Data Besar Secara Efisien di JS

## Pertanyaan Interview

Bagaimana mendeteksi duplicate data besar secara efisien di JS?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk dataset besar, pendekatan efisien biasanya O(n) dengan struktur hash seperti Set/Map,
bukan nested loop O(n^2). Untuk data primitive, Set cukup langsung.
Untuk object, saya buat key normalisasi yang deterministik (misalnya gabungan field bisnis)
lalu cek duplikasi via Map/Set berdasarkan key itu.

Di produksi, penting juga memperhatikan memory footprint.
Jika dataset terlalu besar, proses dilakukan streaming/chunking, bukan load sekaligus.
Di domain healthcare, ini penting untuk dedup transaksi agar tidak ada pemrosesan ganda." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bagaimana dedup object yang field-nya banyak?"
2. "Apa risiko key normalisasi salah?"
3. "Kapan perlu chunking?"
4. "Bagaimana dedup lintas batch?"
5. "Apa metrik yang dipantau?"

### Jawaban Singkat untuk Follow-up

1) Object field banyak:
"Tentukan composite key bisnis yang benar-benar unik."

2) Risiko key salah:
"False positive/false negative duplicate."

3) Kapan chunking:
"Saat data tidak muat memory aman jika diproses sekaligus."

4) Lintas batch:
"Gunakan store dedup persistent dengan TTL sesuai kebutuhan."

5) Metrik:
"duplicate ratio, memory usage, processing latency, false duplicate incidents."

## Jawaban Ideal (Versi Singkat, Level Senior)

Strategi dedup besar:
- gunakan Set/Map untuk lookup O(1) average
- buat key canonical berbasis aturan domain
- proses incremental jika volume tinggi
- simpan checkpoint untuk recovery

## Penjelasan Detail yang Dicari Interviewer

### 1) Algoritma dasar

Iterasi satu kali:
- bangun key item
- cek Set/Map
- jika sudah ada -> duplicate
- jika belum -> simpan key

### 2) Tantangan nyata

- object key ambiguity
- memory growth
- data out-of-order antar sumber

### 3) Anti-pattern umum

- nested loop pada data besar
- dedup berdasarkan field yang tidak unik
- tidak ada observability duplicate event

Mitigasi:
- domain key registry
- bounded memory strategy
- duplicate audit logging

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function findDuplicates(items) {
  const seen = new Set();
  const duplicates = [];
  for (const item of items) {
    const key = `${item.encounterId}|${item.sku}|${item.batchNo}`;
    if (seen.has(key)) duplicates.push(item);
    else seen.add(key);
  }
  return duplicates;
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada integrasi healthcare:
- duplikasi transaksi bisa merusak stok
- data datang dari beberapa sistem
- dedup harus cepat dan tepat

Desain dedup yang buruk bisa menyebabkan mismatch operasional serius.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
retur farmasi dikirim dua kali dari jaringan tidak stabil.
sistem tanpa dedup memproses dua-duanya.
hasilnya stok berubah dua kali.

Perbaikan:
- idempotency + dedup key domain
- duplicate event dicatat untuk audit
- retry pipeline cek dedup sebelum commit

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnTx = { encounterId: string; sku: string; batchNo: string };

function dedupKey(tx: ReturnTx): string {
  return `${tx.encounterId}|${tx.sku}|${tx.batchNo}`;
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kompleksitas O(n) via hash structure.
- Menjelaskan dedup object berbasis key domain.
- Menyebut memory consideration/chunking.
- Menyebut risiko false dedup.
- Relevan dengan integritas data healthcare.

## Ringkasan Final

Dedup data besar harus dirancang algoritmis, bukan sekadar implementasi cepat.
Set/Map + key domain deterministik adalah fondasi utamanya.
Di sistem healthcare, dedup efisien menjaga akurasi transaksi
dan mencegah dampak operasional dari pemrosesan ganda.
