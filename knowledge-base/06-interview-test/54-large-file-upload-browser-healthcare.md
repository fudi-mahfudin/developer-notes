# Q54 - Kelola File Upload Besar di Browser

## Pertanyaan Interview

Bagaimana mengelola upload file besar di browser dengan aman dan andal?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk upload besar, saya hindari single request besar.
Saya pakai chunked upload atau resumable upload,
dengan checksum per chunk, retry terbatas, dan idempotency key.
Progress harus terlihat di UI, serta bisa pause/resume.

Dari sisi backend, setiap chunk diverifikasi lalu disusun ulang.
Dari sisi keamanan, validasi type/size tetap wajib,
dan scanning file berbahaya dilakukan sebelum file aktif dipakai.
Di healthcare, ini penting karena lampiran bisa besar
dan gagal upload tidak boleh merusak alur operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa tidak langsung upload sekali?"
2. "Bagaimana resume upload yang terputus?"
3. "Bagaimana menghindari duplikasi chunk?"
4. "Apa strategi retry yang aman?"
5. "Anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) Single upload:
"Rentan gagal pada jaringan tidak stabil."

2) Resume:
"Simpan state uploadId dan chunk index yang sudah sukses."

3) Duplikasi chunk:
"Gunakan idempotency key atau chunk hash."

4) Retry aman:
"Exponential backoff + batas maksimal retry."

5) Anti-pattern:
"Retry agresif tanpa batas yang memicu overload."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pola production-grade:
- pre-signed URL / upload session
- chunking + checksum
- resumable state
- observability upload failures
- secure validation pipeline

## Penjelasan Detail yang Dicari Interviewer

### 1) Tantangan utama

- jaringan user tidak stabil
- file size besar
- timeout browser/proxy
- pengalaman user saat gagal

### 2) Arsitektur upload yang andal

1. Buat upload session.
2. Bagi file ke chunk tetap.
3. Upload paralel terbatas.
4. Verifikasi hash tiap chunk.
5. Commit merge saat semua chunk valid.

### 3) Keamanan dan compliance

- validasi MIME dan ekstensi
- anti-malware scanning
- enkripsi at-rest
- audit trail siapa upload apa dan kapan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
```

Chunking memberi kontrol retry granular per bagian.

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dokumen healthcare sering besar:
- lampiran hasil pemeriksaan
- dokumen administratif
- berkas integrasi pihak ketiga

Upload pipeline harus stabil agar user tidak kehilangan waktu
dan data tidak rusak saat jaringan buruk.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
upload dokumen 200MB gagal di menit akhir.
user ulang dari awal berkali-kali.

Perbaikan:
- resumable upload
- resume otomatis saat koneksi pulih
- status progress persisten

## Contoh Pola Kode yang Lebih Aman

```ts
type UploadChunkState = {
  index: number;
  checksum: string;
  uploaded: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan chunked/resumable upload.
- Menjelaskan retry dan idempotency.
- Menyebut validasi keamanan file.
- Menyebut UX progress/pause/resume.
- Relevan dengan kebutuhan operasional healthcare.

## Ringkasan Final

Upload file besar harus didesain sebagai workflow tahan gangguan,
bukan satu request besar.
Chunking, resume, retry terkendali, dan validasi keamanan
adalah fondasi arsitektur upload yang matang.
Di domain healthcare, reliability upload berdampak langsung
ke kecepatan layanan dan kualitas data.
