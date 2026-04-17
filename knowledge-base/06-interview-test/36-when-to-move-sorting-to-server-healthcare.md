# Q36 - Kapan Sorting di Client Tidak Layak dan Harus Dipindah ke Server

## Pertanyaan Interview

Kapan sorting di client tidak lagi layak dan harus dipindah ke server?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Sorting di client masih layak untuk dataset kecil dan sudah tersedia penuh di browser.
Begitu data besar, paginated, sering berubah, atau butuh konsistensi global lintas halaman,
sorting sebaiknya dipindah ke server. Server bisa memanfaatkan index DB dan menjaga urutan
yang konsisten untuk semua pengguna.

Di production, saya lihat indikatornya: ukuran data, biaya transfer, latency render,
dan kebutuhan audit. Di sistem healthcare, sorting server-side biasanya wajib
karena data transaksi besar dan harus konsisten saat dipakai keputusan operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa batas dataset untuk tetap di client?"
2. "Kapan hybrid sorting masuk akal?"
3. "Bagaimana menjaga UX jika sorting pindah server?"
4. "Apa risiko sorting client pada data realtime?"
5. "Bagaimana test konsistensi sorting?"

### Jawaban Singkat untuk Follow-up

1) Batas dataset:
"Tidak absolut; lihat performa nyata dan target device pengguna."

2) Hybrid sorting:
"Server untuk sort utama, client untuk sort lokal minor pada subset kecil."

3) UX:
"Gunakan loading state cepat, caching query, dan optimistic UI seperlunya."

4) Risiko realtime:
"Urutan bisa tidak konsisten antar user/page saat data berubah."

5) Test konsistensi:
"Contract test query + integration test pagination dan ordering."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pindah sorting ke server jika:
- data terlalu besar untuk di-load semua
- sorting harus konsisten lintas halaman
- query terikat filter kompleks/index DB
- keamanan data membatasi transfer raw data ke client

Tetap di client jika:
- data kecil, statis, dan sudah ada penuh di memori

## Penjelasan Detail yang Dicari Interviewer

### 1) Dampak performa

Sorting client pada data besar:
- konsumsi memory browser naik
- render jank
- waktu interaksi memburuk

Sorting server:
- beban dipindah ke infrastruktur yang lebih tepat
- bisa pakai index dan query planner DB

### 2) Dampak konsistensi

Client sorting pada data paginated sering menyesatkan:
tiap halaman hanya subset, bukan urutan global.

### 3) Anti-pattern umum

- fetch all data hanya untuk sort
- sort di client lalu offset pagination dari server
- sort field tanpa indeks di backend

Mitigasi:
- server-side sort + cursor/offset yang sinkron
- indexing field sort utama
- batasi payload field

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// client sort (hanya layak untuk data kecil)
rows.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

// server sort
GET /transactions?sortBy=createdAt&sortDir=desc&limit=50
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam aplikasi rumah sakit:
- data transaksi terus bertambah
- dashboard dipakai multi user bersamaan
- urutan data mempengaruhi prioritas tindakan

Server-side sorting membantu hasil tetap konsisten dan dapat diaudit.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
UI mengambil 2 halaman data terpisah lalu sort di client.
operator mengira transaksi terbaru sudah di atas,
padahal transaksi baru ada di halaman lain.

Perbaikan:
- lakukan sort langsung di query backend
- tampilkan metadata sort aktif
- sinkronkan pagination + sort contract

## Contoh Pola Kode yang Lebih Aman

```ts
type SortDir = "asc" | "desc";

function buildTransactionQuery(sortBy: string, sortDir: SortDir) {
  return { sortBy, sortDir, limit: 50 };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kriteria kapan pindah ke server.
- Menyebut performa + konsistensi sebagai faktor utama.
- Menjelaskan anti-pattern fetch-all-and-sort.
- Menyebut implikasi pagination.
- Relevan dengan dashboard operasional healthcare.

## Ringkasan Final

Sorting client cocok untuk kasus kecil dan sederhana.
Untuk data besar/dinamis, sorting harus dipindah ke server agar stabil.
Di sistem healthcare, keputusan ini menjaga akurasi tampilan data
dan mencegah keputusan berbasis urutan yang keliru.
