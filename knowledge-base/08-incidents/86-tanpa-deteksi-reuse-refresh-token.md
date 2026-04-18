# #86 — Tanpa deteksi reuse refresh token

**Indeks:** [`README.md`](./README.md) · **ID:** `#86` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Tanpa **deteksi reuse** refresh token (token dipakai dua kali), pencuri yang mencuri refresh token dapat terus memperbaruh akses tanpa diketahui. Pola **rotation dengan deteksi reuse** mencabut seluruh rantai refresh ketika token lama digunakan kembali—menandakan kemungkinan pencurian atau bug klien.

---

## Mitigasi ideal (~60 detik)

“Implementasikan **refresh token rotation** dengan server menyimpan hash token aktif/keluarga; ketika token lama digunakan lagi setelah rotasi, **cabut semua sesi** pengguna tersebut. Gunakan penyimpanan database/redis untuk revoke cepat. Pantau metrik reuse.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Reuse detection:** mendeteksi penggunaan token yang sudah diganti.

---

## Mengapa pola ini sangat umum di healthcare

1. OAuth tutorial sederhana tanpa rotation.
2. Mobile app menyimpan refresh token di secure storage tetapi tanpa binding device kuat.
3. Multi-tab browser refresh race.

---

## Pola gagal (ilustrasi)

Refresh token statis hingga expired panjang—dicuri sekali, akses abadi sampai expiry.

---

## Gejala di production

- Akun pasien diambil alih tanpa reset password.

---

## Diagnosis

1. Audit implementasi OAuth server internal.
2. Forensics pada pola token reuse logs.

---

## Mitigasi yang disarankan

1. Rotation + reuse detection + session revoke.
2. Short-lived access token + binding refresh ke device id.

---

## Trade-off dan risiko

- Revoke agresif dapat logout pengguna sah pada multi device—UX penjelasan.

---

## Aspek khusus healthcare

- Akun portal pasien mengakses PHI—token harus kuat.

---

## Checklist review PR

- [ ] Sistem auth internal mengikuti best practice refresh rotation.

---

## Kata kunci untuk pencarian

`refresh token rotation`, `reuse detection`, `OAuth2`, `session revoke`

---

## Skenario regresi yang disarankan

1. Gunakan refresh token dua kali berturut dalam staging—harus revoke rantai.
2. Uji multi device sah vs reuse jahat.

---

## KPI pemantauan

- Jumlah reuse events yang memicu revoke (harus rendah tetapi tidak nol).

---

## Catatan tambahan operasional

Koordinasikan pesan UX ketika pengguna terlogout karena deteksi reuse untuk mengurangi panic.

---

## Referensi internal

- [`README.md`](./README.md) · **#83**.
