# Q35 - Mendesain Pagination Offset vs Cursor untuk Data Besar

## Pertanyaan Interview

Bagaimana kamu mendesain pagination offset vs cursor untuk data besar?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Offset pagination sederhana dan mudah dipahami, tapi performanya menurun
di page tinggi dan rentan inconsistency saat data sering berubah.
Cursor pagination lebih scalable untuk data besar karena berbasis posisi terakhir,
bukan skip N row. Ini biasanya lebih stabil untuk feed/stream transaksi aktif.

Di production, saya pilih berdasarkan kebutuhan:
offset untuk admin list sederhana dan random access,
cursor untuk data volume tinggi dengan update sering.
Di healthcare integration, cursor biasanya lebih aman untuk sinkronisasi bertahap." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan offset tetap lebih cocok?"
2. "Apa kelemahan cursor pagination?"
3. "Bagaimana desain cursor yang aman?"
4. "Bagaimana hindari data lompat/duplikat?"
5. "Apa strategi backward pagination?"

### Jawaban Singkat untuk Follow-up

1) Offset cocok:
"Untuk dataset kecil dan kebutuhan lompat halaman langsung."

2) Kelemahan cursor:
"Lebih kompleks dan tidak natural untuk random page jump."

3) Cursor aman:
"Gunakan kolom sort stabil + tie-breaker unik (misal id)."

4) Hindari lompat/duplikat:
"Pakai ordering deterministik dan filter `>`/`<` yang konsisten."

5) Backward pagination:
"Simpan arah cursor dan query kebalikan dengan ordering terdefinisi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Offset:
- mudah implementasi
- simple untuk UI tabel kecil
- kurang efisien pada data besar

Cursor:
- performa lebih stabil di volume tinggi
- konsistensi lebih baik saat data berubah
- butuh desain token/order yang benar

## Penjelasan Detail yang Dicari Interviewer

### 1) Trade-off performa

Offset tinggi sering memaksa DB scan lebih banyak.
Cursor memanfaatkan index range scan yang lebih efisien.

### 2) Trade-off konsistensi

Pada data yang terus masuk:
- offset bisa menghasilkan missing/duplicate antar halaman
- cursor lebih tahan karena berdasarkan posisi nyata terakhir

### 3) Anti-pattern umum

- cursor hanya pakai timestamp non-unik
- tidak encode cursor dengan aman
- ubah ordering tanpa migrasi client

Mitigasi:
- sort key: `(createdAt, id)`
- cursor token signed/encoded
- kontrak API versioned

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Offset
GET /transactions?limit=50&offset=1000

// Cursor
GET /transactions?limit=50&after=eyJjcmVhdGVkQXQiOiIyMDI2LTA0LTE3VDEwOjAwOjAwWiIsImlkIjoiVFgxMjMifQ==
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada transaksi rumah sakit:
- volume data bisa besar
- data baru terus masuk
- sinkronisasi perlu konsistensi tinggi

Cursor pagination membantu mencegah data tertinggal saat integrasi incremental.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
sinkronisasi stok pakai offset.
saat proses berjalan, transaksi baru masuk dan menggeser urutan.
beberapa transaksi terlewat, sebagian duplikat diproses.

Perbaikan:
- migrasi ke cursor berbasis `(updatedAt,id)`
- simpan cursor checkpoint terakhir
- lakukan dedup tambahan di sisi consumer

## Contoh Pola Kode yang Lebih Aman

```ts
type Cursor = { updatedAt: string; id: string };

function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan trade-off offset vs cursor.
- Menyebut aspek performa dan konsistensi.
- Menjelaskan desain cursor stabil.
- Menyebut anti-pattern timestamp non-unik.
- Relevan dengan sync data healthcare.

## Ringkasan Final

Offset unggul di kesederhanaan, cursor unggul di skalabilitas dan konsistensi.
Untuk data besar yang berubah cepat, cursor adalah pilihan utama.
Di sistem healthcare, keputusan ini berdampak langsung pada akurasi sinkronisasi
dan keandalan proses operasional.
