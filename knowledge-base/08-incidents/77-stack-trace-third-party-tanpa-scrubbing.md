# #77 — Stack trace ke third-party tanpa scrubbing

**Indeks:** [`README.md`](./README.md) · **ID:** `#77` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Layanan observabilitas dan error tracker mengumpulkan **stack trace** serta **locals** konteks yang bisa berisi PHI jika tidak dikonfigurasi. Vendor di luar wilayah hukum dapat menyimpan data sensitif lebih lama daripada kebijakan rumah sakit. Tanpa **beforeSend** scrubbing dan sampling policy, kebocoran sulit terdeteksi sampai audit vendor.

---

## Mitigasi ideal (~60 detik)

“Gunakan **beforeSend** untuk membuang payload dan menjaga hanya metadata error; strip query string URL; minimalkan breadcrumbs user action yang menyebut nama. Tandatangani **BAA/DPA** dengan vendor. Pertimbangkan **self-hosted** collector untuk PHI ketat.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Scrubber pipeline:** rantai transformasi event sebelum meninggalkan boundary trust.

---

## Mengapa pola ini sangat umum di healthcare

1. Quick enable Sentry dengan defaults luas.
2. Source map upload mengungkap struktur internal.
3. Tim tidak membaca privacy policy vendor.

---

## Pola gagal (ilustrasi)

Error boundary mengirim `componentProps` berisi objek pasien ke Sentry.

---

## Gejala di production

- Audit compliance menemukan nama pasien pada issue tracker eksternal.

---

## Diagnosis

1. Sample event dari vendor API.
2. Review `beforeSend` implementation.

---

## Mitigasi yang disarankan

1. Allowlist fields.
2. Environment separation—no PHI di prod issues.
3. Retensi event pendek.

---

## Trade-off dan risiko

- Kurang konteks membuat debugging sulit—gunakan internal ticket correlation id.

---

## Aspek khusus healthcare

- Insiden keselamatan pasien memerlukan detail—simpan di sistem internal, bukan vendor umum.

---

## Checklist review PR

- [ ] Konfigurasi error reporter menjalankan scrubbing PHI pada merge produksi.

---

## Kata kunci untuk pencarian

`beforeSend`, `Sentry PHI`, `error reporting`, `DPA`

---

## Skenario regresi yang disarankan

1. Lempar error dengan payload sintetis PHI—pastikan tidak tersimpan.
2. Audit hak akses tim ke dashboard vendor.

---

## KPI pemantauan

- Review kuartalan konfigurasi scrubbing vs template terbaru vendor.

---

## Catatan tambahan operasional

Simpan **versi konfigurasi** scrubbing di Git untuk audit perubahan.

---

## Referensi internal

- [`README.md`](./README.md) · **#75**.
