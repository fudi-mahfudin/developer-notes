# Q49 - CSRF dan Kapan Token CSRF Masih Relevan

## Pertanyaan Interview

Apa itu CSRF, dan kapan token CSRF masih relevan?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"CSRF terjadi ketika browser korban mengirim request valid ke aplikasi
tanpa sepengetahuan user, biasanya karena sesi autentikasi (cookie) otomatis ikut.
Token CSRF masih relevan terutama pada aplikasi berbasis cookie session.
Token memastikan request berasal dari aplikasi kita, bukan situs pihak ketiga.

Kalau auth murni pakai bearer token di header dan tidak pakai cookie otomatis,
risiko CSRF lebih kecil, tapi bukan berarti zero risk.
Di healthcare systems, saya tetap menerapkan defense-in-depth:
SameSite cookie, CSRF token jika pakai session cookie, dan origin checks." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah SameSite saja cukup?"
2. "Kapan double-submit cookie dipakai?"
3. "Bagaimana CSRF token divalidasi?"
4. "Apa bedanya CSRF dan XSS?"
5. "Apa anti-pattern proteksi CSRF?"

### Jawaban Singkat untuk Follow-up

1) SameSite cukup?
"Membantu kuat, tapi kombinasi token + origin check lebih aman."

2) Double-submit:
"Saat desain stateless membutuhkan validasi token tanpa server session berat."

3) Validasi token:
"Token dari header/body harus cocok dengan nilai yang server harapkan."

4) CSRF vs XSS:
"CSRF memanfaatkan credential otomatis, XSS menjalankan script berbahaya."

5) Anti-pattern:
"Mematikan CSRF untuk endpoint state-changing karena alasan praktis."

## Jawaban Ideal (Versi Singkat, Level Senior)

CSRF relevan jika:
- browser otomatis kirim credential (cookie)
- ada endpoint mutasi state

Mitigasi utama:
- CSRF token
- SameSite cookie
- Origin/Referer validation

## Penjelasan Detail yang Dicari Interviewer

### 1) Mekanisme serangan

User login ke app A.
User membuka site jahat yang memicu request ke app A.
Browser otomatis kirim cookie session -> request terlihat valid.

### 2) Mitigasi berlapis

- `SameSite=Lax/Strict`
- token per session/request
- validasi method, origin, content-type policy

### 3) Anti-pattern umum

- endpoint POST penting tanpa CSRF check
- token statik jangka panjang
- tidak rotasi token saat session berubah

Mitigasi:
- middleware CSRF standar
- token lifecycle selaras session lifecycle
- security test pada endpoint mutasi

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// konsep: request mutasi harus membawa csrf token
fetch("/api/update", {
  method: "POST",
  headers: { "X-CSRF-Token": csrfToken },
  credentials: "include",
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada aplikasi healthcare:
- perubahan data memiliki dampak operasional besar
- session berbasis cookie masih umum
- request tak sah harus dicegah ketat

CSRF protection adalah kontrol dasar untuk mencegah mutasi data tak diotorisasi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint update status transaksi tidak punya CSRF validation.
site eksternal memicu request tersembunyi dari browser user login.

Perbaikan:
- aktifkan middleware CSRF
- validasi origin
- audit semua endpoint state-changing

## Contoh Pola Kode yang Lebih Aman

```ts
type CsrfPolicy = {
  requireToken: boolean;
  sameSite: "Lax" | "Strict";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan mekanisme CSRF dengan jelas.
- Menjelaskan kapan token masih wajib.
- Menyebut SameSite + origin checks.
- Menyebut perbedaan CSRF vs XSS.
- Relevan ke mutasi data healthcare.

## Ringkasan Final

CSRF tetap relevan pada arsitektur cookie-based session.
Token CSRF masih salah satu kontrol paling efektif untuk request mutasi.
Di domain healthcare, proteksi ini mencegah perubahan data tak sah
yang bisa berdampak langsung ke operasi klinis dan farmasi.
