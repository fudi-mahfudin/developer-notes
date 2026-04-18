# #61 — Wrong patient context: race saat ganti pasien cepat di SPA

**Indeks:** [`README.md`](./README.md) · **ID:** `#61` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Pada aplikasi **single-page**, pengguna dapat membuka beberapa pasien secara cepat atau mengklik daftar sebelum navigasi selesai. Permintaan data untuk **pasien A** dapat selesai setelah permintaan **pasien B**, sehingga UI menampilkan catatan atau order yang salah—insiden keselamatan pasien kritis. Tanpa **cancellation token** atau `requestId`, race ini sulit direproduksi tetapi sering terjadi di lingkungan sibuk.

---

## Mitigasi ideal (~60 detik)

“Selalu ikat fetch ke **ID pasien pada saat mulai**—abaikan respons jika ID tidak cocok dengan konteks aktif. Gunakan **React Query/SWR key** yang menyertakan patientId. Gunakan `AbortController` untuk membatalkan fetch lama saat navigasi. Jangan simpan ‘pasien aktif’ hanya di variabel global tanpa sinkron route. Untuk aksi berisiko tinggi, minta **konfirmasi kedua** dengan nama pasien.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Stale response:** data dari permintaan sebelumnya yang tiba terlambat.
- **Optimistic routing:** URL berubah sebelum data siap—perlu guard.

---

## Mengapa pola ini sangat umum di healthcare

1. EMR web dengan banyak tab dan navigasi cepat.
2. Search pasien dengan autocomplete debounce memicu banyak request.
3. State management global tanpa strict ownership.

---

## Pola gagal (ilustrasi)

```typescript
useEffect(() => {
  fetchNotes(patientId); // patientId berubah sebelum fetch selesai
}, [patientId]); // tanpa cleanup cancel
```

---

## Gejala di production

- Keluhan klinisi “layar menampilkan pasien lain” tanpa pola jelas.

---

## Diagnosis

1. Logging correlation request vs patient aktif di UI.
2. Tes e2e dengan network throttle dan klik cepat.

---

## Mitigasi yang disarankan

1. AbortController pada unmount/route change.
2. Source-of-truth patient id dari URL params.
3. Banner warning saat data loading tidak cocok route.

---

## Trade-off dan risiko

- Terlalu banyak abort meningkatkan permintaan ulang—pastikan cache benar.

---

## Aspek khusus healthcare

- Campuran konteks pasien dapat menyebabkan kesalahan medikasi—severity sangat tinggi.

---

## Checklist review PR

- [ ] Data pasien sensitif tidak ditampilkan tanpa validasi ID pada respons.

---

## Kata kunci untuk pencarian

`race condition`, `AbortController`, `stale response`, `React Query key`

---

## Catatan tambahan operasional

Latih skenario **keyboard superuser** pada demo acceptance dengan pemangku kepentingan klinis untuk mendapatkan buy-in guard tambahan.

Simpan rekaman sesi pengguna (**session replay** selektif non-PHI) ketika investigating bug sulit direproduksi untuk melihat timing klik vs respons jaringan.

---

## Referensi internal

- [`README.md`](./README.md) · **#62**, **#63**.
