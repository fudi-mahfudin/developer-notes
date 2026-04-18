# Q64 - Global Error Handling (Express/Fastify/Koa)

## Pertanyaan Interview

Bagaimana menerapkan global error handling yang baik di Express/Fastify/Koa?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Global error handling harus konsisten, aman, dan observability-friendly.
Saya pisahkan error operasional (validasi, not found, upstream timeout)
dan error tak terduga (bug).
Respons ke client harus standar: kode, pesan aman, correlation ID,
tanpa membocorkan detail internal.

Di middleware global, semua error dinormalisasi ke format tunggal,
lalu dicatat dengan context request penting.
Untuk framework berbeda (Express/Fastify/Koa), prinsipnya sama:
satu pintu penanganan error, satu kontrak respons.
Di healthcare, konsistensi ini penting untuk troubleshooting cepat
tanpa membocorkan data sensitif." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa perlu error class custom?"
2. "Apa yang tidak boleh muncul ke client?"
3. "Bagaimana mapping error ke status code?"
4. "Bagaimana handle async error?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Error class:
"Agar domain error punya metadata jelas dan konsisten."

2) Tidak boleh tampil:
"Stack trace internal, query mentah, detail infrastruktur."

3) Mapping status:
"Gunakan tabel mapping berdasarkan jenis error operasional."

4) Async error:
"Pastikan promise rejection masuk ke global handler."

5) Anti-pattern:
"Error format berbeda-beda per endpoint."

## Jawaban Ideal (Versi Singkat, Level Senior)

Sistem error handling matang:
- standard response envelope
- typed/domain error
- safe message policy
- centralized logging + correlation
- alerting berdasarkan severity

## Penjelasan Detail yang Dicari Interviewer

### 1) Struktur error response

- `code` (machine-readable)
- `message` (safe human-readable)
- `correlationId`
- optional `details` yang sudah disanitasi

### 2) Kategori error

- client error (4xx): validasi/izin/input
- server error (5xx): bug/upstream/internal
- transient error: retry mungkin relevan

### 3) Logging dan observability

- log detail internal penuh di server
- kirim data aman ke client
- metric per jenis error untuk trend monitoring

Mitigasi:
- lint rule untuk larangan `throw string`
- contract test format error
- fallback default handler untuk unknown errors

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const errorResponse = {
  code: "VALIDATION_ERROR",
  message: "Invalid request payload",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada aplikasi healthcare:
- debugging harus cepat saat incident
- data sensitif tidak boleh bocor via error response
- integrasi lintas sistem butuh kontrak error stabil

Global error handling yang rapi mempercepat recovery
dan menjaga keamanan informasi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint tertentu mengembalikan stack trace database ke client.
informasi internal terekspos.

Perbaikan:
- enforce middleware global
- sanitize semua error response
- audit endpoint yang bypass handler

## Contoh Pola Kode yang Lebih Aman

```ts
type ApiErrorEnvelope = {
  code: string;
  message: string;
  correlationId: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan central error handling lintas framework.
- Menjelaskan pemisahan error operasional vs bug.
- Menjelaskan sanitasi response.
- Menjelaskan logging + correlation.
- Relevan untuk keamanan dan operasi healthcare.

## Ringkasan Final

Global error handling yang baik menyatukan reliability dan security.
Tujuannya: response konsisten ke client, detail lengkap untuk internal.
Pendekatan ini menurunkan MTTR dan mencegah data leakage,
terutama di sistem healthcare yang sensitif.
