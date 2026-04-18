# #75 — PHI di `console.log` / client error reporter

**Indeks:** [`README.md`](./README.md) · **ID:** `#75` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

**Protected Health Information (PHI)** yang dicetak ke **`console.log`** pada aplikasi browser dapat terlihat oleh siapa pun dengan DevTools serta ikut masuk ke layanan **error reporting** (Sentry, dll.) jika tidak dibersihkan. Ini melanggar kepercayaan pasien dan regulasi seperti HIPAA yang mensyaratkan kontrol pengungkapan minimum serta perjanjian bisnis dengan vendor pihak ketiga.

---

## Mitigasi ideal (~60 detik)

“Matikan logging debug di production build; gunakan **PII scrubbing** pada error reporter dengan daftar field sensitif (`patientName`, `mrn`). Jangan kirim payload request lengkap—kirim fingerprint error saja. Untuk reproducibility gunakan ticket internal tanpa PHI. Edukasi developer untuk tidak log objek pasien lengkap.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **PHI identifiers:** nama, tanggal lahir tepat, MRN, foto, rekaman diagnosis spesifik.
- **Scrubber:** transformer yang menghapus/masking field sensitif.

---

## Mengapa pola ini sangat umum di healthcare

1. Debugging cepat menambahkan `console.log(fullPatient)`.
2. Default SDK error reporter mengumpulkan breadcrumbs luas.
3. Log aplikasi hybrid webview di perangkat klinisi.

---

## Pola gagal (ilustrasi)

`console.log('Saving', patient)` pada build produksi oleh kesalahan konfigurasi source map.

---

## Gejala di production

- Audit vendor menemukan PHI di penyimpanan log eksternal.

---

## Diagnosis

1. Scan bundle prod untuk string log mencurigakan.
2. Audit konfigurasi Sentry `beforeSend`.

---

## Mitigasi yang disarankan

1. ESLint rule melarang console di prod.
2. Central logging wrapper yang redaksi default.
3. BAA dengan vendor observabilitas.

---

## Trade-off dan risiko

- Scrubbing berlebihan menyulitkan debugging—gunakan environment terpisah.

---

## Aspek khusus healthcare

- PHI di log mobile dapat bocor ke layanan analitik OS—review manifest SDK.

---

## Checklist review PR

- [ ] Tidak ada log pasien lengkap di jalur klien produksi.

---

## Kata kunci untuk pencarian

`PHI`, `Sentry scrubbing`, `console.log`, `HIPAA logging`

---

## Skenario regresi yang disarankan

1. Picu error sengaja dengan payload sintetis PHI—pastikan tidak muncul di vendor.
2. Profil DevTools pada staging prod-like build.
3. Review sample event weekly dari error tracker.

---

## KPI pemantauan

- Jumlah field PHI yang terdeteksi oleh scanner log otomatis (harus nol).

---

## Catatan tambahan operasional

Cantumkan **policy scrubbing** pada dokumen vendor SaaS yang ditandatangani compliance.

---

## Referensi internal

- [`README.md`](./README.md) · **#76**, **#77**.
