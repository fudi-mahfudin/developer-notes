# #83 — Rate limiting lemah pada portal pasien

**Indeks:** [`README.md`](./README.md) · **ID:** `#83` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

**Portal pasien** merupakan target **credential stuffing** dan brute force OTP. Tanpa **rate limiting** per IP, per akun, dan per device fingerprint, penyerang dapat mencoba kata sandi secara massal atau menyalahgunakan reset password—mengakibatkan kebocoran PHI dan gangguan layanan.

---

## Mitigasi ideal (~60 detik)

“Terapkan limit bertingkat: global IP, per username hash, per session—dengan **exponential backoff** dan CAPTCHA adaptif setelah beberapa gagal. Gunakan WAF managed rules. Pantau metrik login gagal. Koordinasikan dengan [#52](52-crypto-hash-sinkron-jalur-panas.md) agar rate limit tidak mengalahkan UX sah.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Adaptive challenge:** CAPTCHA setelah ambang tertentu.

---

## Mengapa pola ini sangat umum di healthcare

1. Portal sering underinvest compared to internal apps.
2. NAT besar membagi IP—perlu limit per akun juga.
3. SMS OTP tanpa throttle.

---

## Pola gagal (ilustrasi)

10.000 percobaan login per jam dari bot tanpa pemblokiran.

---

## Gejala di production

- Lonjakan login gagal; biaya SMS OTP membengkak.

---

## Diagnosis

1. Metrik 401/403 vs baseline.
2. Correlation dengan geografi IP anomali.

---

## Mitigasi yang disarankan

1. WAF + app-level limiter (Redis).
2. Device binding untuk sesi sensitif.
3. Alert SOC untuk pola stuffing.

---

## Trade-off dan risiko

- Limit ketat dapat mengunci pasien sah—sedikan jalur support.

---

## Aspek khusus healthcare

- Akses pasien ke hasil lab adalah hak—jangan blok permanen tanpa jalur manusia.

---

## Checklist review PR

- [ ] Endpoint login/OTP memiliki rate limit dan tes otomatis.

---

## Kata kunci untuk pencarian

`rate limiting`, `credential stuffing`, `WAF`, `CAPTCHA`

---

## Skenario regresi yang disarankan

1. Harness brute force dari banyak IP rendah—harus terdeteksi oleh akun.
2. Uji login sah setelah beberapa gagal—CAPTCHA muncul.

---

## KPI pemantauan

- Percobaan login gagal per akun per jam (percentiles).

---

## Catatan tambahan operasional

Bagikan **playbook SOC** dengan tim IT rumah sakit untuk respons insiden stuffing.

---

## Referensi internal

- [`README.md`](./README.md) · **#52**.
