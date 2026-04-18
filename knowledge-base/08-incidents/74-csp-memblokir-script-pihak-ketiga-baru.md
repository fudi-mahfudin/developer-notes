# #74 — CSP memblokir script pihak ketiga baru tanpa deploy koordinasi

**Indeks:** [`README.md`](./README.md) · **ID:** `#74` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

**Content-Security-Policy** ketat melindungi dari XSS tetapi dapat memutus integrasi baru—analytics kualitas, widget appointment pihak ketiga, atau library PDF—ketika domain tidak ditambahkan ke **`script-src`** / **`frame-src`**. Tanpa pipeline koordinasi antara tim produk dan keamanan, fitur baru tampak “rusak hanya di prod” ketika header CSP hanya diterapkan di edge.

---

## Mitigasi ideal (~60 detik)

“Kelola CSP sebagai **kode infrastruktur** dengan review; gunakan **`report-only`** mode sebelum enforce. Untuk domain baru, tambahkan melalui PR yang sama dengan fitur. Pertimbangkan **nonce/hash** untuk script inline. Untuk healthcare, widget eksternal harus melalui vendor risk assessment.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Report-Only CSP:** memonitor pelanggaran tanpa memblokir.

---

## Mengapa pola ini sangat umum di healthcare

1. Vendor layanan telemedicine menambahkan domain CDN baru.
2. Header dikelola oleh WAF terpisah dari repo aplikasi.
3. Staging tidak mengaktifkan CSP sama dengan prod.

---

## Pola gagal (ilustrasi)

Fitur baru memuat `https://scripts.vendor.com` tidak ada di allowlist—konsol penuh pelanggaran.

---

## Gejala di production

- Halaman putih parsial atau tombol tidak responsif tanpa error server.

---

## Diagnosis

1. Browser console CSP violation logs.
2. Diff header staging vs prod.

---

## Mitigasi yang disarankan

1. CSP reports ke endpoint observabilitas.
2. Dokumen daftar vendor domain approved.
3. Canary enforce untuk subset pengguna internal.

---

## Trade-off dan risiko

- CSP terlalu longgar mengalahkan tujuan—gunakan nonce ketika memungkinkan.

---

## Aspek khusus healthcare

- Widget pembayaran dan asuransi sering mengubah domain—proses change management ketat.

---

## Checklist review PR

- [ ] Perubahan yang menambahkan aset eksternal menyertakan update CSP/WAF.

---

## Kata kunci untuk pencarian

`Content-Security-Policy`, `report-only`, `script-src`, `vendor risk`

---

## Skenario regresi yang disarankan

1. Jalankan smoke test otomatis yang memuat halaman utama dengan CSP aktual.
2. Monitor violation reports selama seminggu sebelum enforce baru.

---

## KPI pemantauan

- Jumlah violation per halaman dan domain baru.

---

## Catatan tambahan operasional

Sinkronkan CSP dengan **privacy policy** pasien mengenai skrip pihak ketiga yang diperbolehkan.

---

## Referensi internal

- [`README.md`](./README.md) · **#75**.
