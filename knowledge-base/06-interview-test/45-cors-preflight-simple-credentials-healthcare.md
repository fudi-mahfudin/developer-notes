# Q45 - CORS: Preflight, Simple Request, Credentials

## Pertanyaan Interview

Jelaskan CORS: preflight, simple request, credentials.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"CORS adalah mekanisme browser untuk membatasi request lintas origin.
Simple request bisa langsung dikirim jika memenuhi syarat tertentu.
Jika tidak memenuhi, browser kirim preflight `OPTIONS` untuk cek izin server dulu.
Untuk request dengan credentials (cookie/auth), server harus set header CORS yang tepat
dan tidak boleh pakai wildcard origin sembarangan.

Di produksi, banyak bug CORS terjadi karena konfigurasi server tidak sinkron dengan kebutuhan frontend.
Di integrasi healthcare, ini krusial karena akses data antar domain harus aman,
tapi tetap andal untuk workflow operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa yang memicu preflight?"
2. "Kenapa `Access-Control-Allow-Origin: *` bermasalah dengan credentials?"
3. "Apa beda CORS error vs network error?"
4. "Bagaimana atur CORS aman di multi-env?"
5. "Apa anti-pattern CORS paling sering?"

### Jawaban Singkat untuk Follow-up

1) Pemicu preflight:
"Method/header non-simple atau content-type tertentu."

2) Wildcard + credentials:
"Spec melarang kombinasi itu demi keamanan."

3) CORS vs network:
"CORS diblok browser policy, request bisa saja sampai server."

4) Multi-env:
"Whitelist origin per environment, bukan wildcard global."

5) Anti-pattern:
"Open CORS ke semua origin tanpa kontrol."

## Jawaban Ideal (Versi Singkat, Level Senior)

Komponen penting:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Credentials`

Prinsip:
- explicit allowlist
- minimal privilege
- observability untuk CORS failure

## Penjelasan Detail yang Dicari Interviewer

### 1) Simple vs preflight

Simple request tidak butuh `OPTIONS` pendahuluan.
Preflight memberi browser sinyal apakah request aktual boleh dijalankan.

### 2) Credentials flow

Jika frontend kirim credentials:
- client harus set `credentials: "include"` (atau setara)
- server harus merespons origin spesifik dan allow credentials

### 3) Anti-pattern umum

- wildcard origin di production
- lupa handle OPTIONS route
- whitelist terlalu longgar tanpa audit

Mitigasi:
- konfigurasi terpusat
- origin validation ketat
- automated tests untuk CORS policy

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// contoh header server aman (konseptual)
Access-Control-Allow-Origin: https://app.hospital.example
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di domain healthcare:
- data sensitif lintas aplikasi harus dilindungi
- integrasi frontend-backend sering beda origin
- salah konfigurasi bisa memblokir workflow penting atau membuka risiko keamanan

CORS harus seimbang antara security dan operability.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
aplikasi frontend pindah domain staging baru.
backend belum update allowlist CORS.
user tidak bisa melakukan sinkronisasi transaksi.

Perbaikan:
- source-of-truth daftar origin per env
- health check dan test CORS pada pipeline deploy
- logging khusus request preflight gagal

## Contoh Pola Kode yang Lebih Aman

```ts
const allowedOrigins = new Set([
  "https://app.hospital.example",
  "https://staging.hospital.example",
]);
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan simple vs preflight dengan benar.
- Menjelaskan aturan credentials + origin spesifik.
- Menyebut header CORS penting.
- Menyebut anti-pattern wildcard sembarangan.
- Relevan ke security-operability healthcare.

## Ringkasan Final

CORS bukan bug frontend, tapi kontrak keamanan lintas origin.
Konfigurasi yang tepat mencegah blok akses tidak perlu sekaligus menjaga keamanan data.
Di sistem healthcare, governance CORS yang disiplin adalah kebutuhan inti produksi.
