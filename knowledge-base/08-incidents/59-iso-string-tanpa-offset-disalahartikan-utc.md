# #59 — ISO string tanpa offset disalahartikan sebagai UTC

**Indeks:** [`README.md`](./README.md) · **ID:** `#59` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

String seperti `2026-04-18T10:00:00` **tanpa `Z` atau offset** bersifat ambigu—`Date.parse` dan beberapa library mengasumsikan **local** atau **UTC** tergantung konteks. API lintas sistem healthcare sering mengirim format ini dari vendor yang tidak konsisten, menyebabkan pergeseran jam medis.

---

## Mitigasi ideal (~60 detik)

“Terima-kirim selalu dengan **offset eksplisit** (`+07:00`) atau **Z** untuk UTC. Tolak input tanpa offset pada API publik atau nyatakan aturan parsing dalam kontrak. Gunakan parser yang memaksa zona—Luxon `fromISO(..., { setZone: true })`. Jangan mengandalkan `Date` native saja untuk input eksternal.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Ambiguous local:** tidak jelas zona mana yang dimaksud string tanpa offset.

---

## Mengapa pola ini sangat umum di healthcare

1. CSV export dari sistem lama tanpa offset.
2. JSON generator yang memakai `toISOString` di satu sisi tetapi tidak di sisi lain.
3. Integrasi internasional.

---

## Pola gagal (ilustrasi)

Vendor mengirim waktu sampling lab tanpa offset—kita parse sebagai UTC padahal lokal.

---

## Gejala di production

- Selisih jam tetap sesuai offset zona server vs klinik.

---

## Diagnosis

1. Log raw string datetime vs hasil parse.
2. Kontrak API dengan vendor—klarifikasi zona.

---

## Mitigasi yang disarankan

1. Validasi schema (Zod) memaksa offset atau zona terpisah.
2. Kolom DB `timestamptz` dengan aturan insert konsisten.
3. Tolak payload tanpa offset pada endpoint regulasi ketat.

---

## Trade-off dan risiko

- Menolak payload dapat memutus integrasi—setuju fallback sementara dengan dokumentasi risiko.

---

## Aspek khusus healthcare

- Waktu sampling lab kritis—offset salah dapat mengubah interpretasi klinis.

---

## Checklist review PR

- [ ] Parser datetime eksternal punya aturan offset eksplisit.

---

## Kata kunci untuk pencarian

`ISO 8601`, `timezone offset`, `Date.parse`, `ambiguous datetime`

---

## Catatan tambahan operasional

Simpan **trace id vendor** bersama payload mentah datetime untuk RCA cepat saat sengketa waktu.

Buat **lint kontrak OpenAPI** yang menolak skema string datetime tanpa offset untuk API internal baru.

Simpan **timezone pengirim** sebagai metadata ketika menerima file flat dari sistem legacy tanpa offset eksplisit.

Buat **alur manual review** ketika parser harus menebak offset—jangan otomatis sepenuhnya tanpa human gate untuk kasus kritis.

---

## Referensi internal

- [`README.md`](./README.md) · **#57**, **#60**.
