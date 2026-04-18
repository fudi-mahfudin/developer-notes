# #82 — Break-glass tanpa alasan wajib → gap compliance

**Indeks:** [`README.md`](./README.md) · **ID:** `#82` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Tanpa **alasan tekstual wajib** saat aktivasi break-glass, audit tidak dapat menilai legitimasi akses darurat versus penyalahgunaan. Regulator mengharapkan dokumentasi konteks klinis atau insiden—bukan aktivasi senyap satu klik.

---

## Mitigasi ideal (~60 detik)

“Wajibkan **free-text reason** dengan minimum karakter dan kategori dropdown (misalnya ‘resusitasi aktif’, ‘pasien tidak responsif‘). Validasi tidak boleh kosong atau generik (‘test’). Tampilkan ringkasan konsekuensi hukum sebelum konfirmasi. Log reason ke sistem audit [#80](80-break-glass-audit-trail-tidak-memadai.md).”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Justification capture:** bukti niat pada saat akses dilakukan.

---

## Mengapa pola ini sangat umum di healthcare

1. UX ingin cepat pada emergensi.
2. Prototype tanpa kolom alasan.
3. Integrasi SSO tanpa prompt kedua.

---

## Pola gagal (ilustrasi)

Break-glass aktif tanpa modal alasan—hanya banner kecil.

---

## Gejala di production

- Audit menemukan ratusan aktivasi tanpa konteks.

---

## Diagnosis

1. Query audit untuk reason null atau template pendek.

---

## Mitigasi yang disarankan

1. Block activation tanpa reason.
2. NLP sederhana untuk mendeteksi alasan generik berulang.

---

## Trade-off dan risiko

- Form tambahan menambah detik pada emergensi—optimalkan UX tanpa menghapus bukti.

---

## Aspek khusus healthcare

- Kolaborasi dengan tim klinis untuk template alasan yang realistis.

---

## Checklist review PR

- [ ] Fitur bypass akses tidak dapat diselesaikan tanpa alasan non-kosong.

---

## Kata kunci untuk pencarian

`break glass`, `justification`, `compliance`, `emergency access`

---

## Skenario regresi yang disarankan

1. Cobalah aktivasi dengan string kosong/spasi—harus ditolak.
2. Monitor tingkat aktivasi per shift untuk anomaly.

---

## KPI pemantauan

- Rasio aktivasi dengan alasan < minimum karakter (harus nol).

---

## Catatan tambahan operasional

Berikan **pelatihan tahunan** tentang dokumentasi akses darurat kepada perawat dan dokter.

---

## Referensi internal

- [`README.md`](./README.md) · **#80**.
