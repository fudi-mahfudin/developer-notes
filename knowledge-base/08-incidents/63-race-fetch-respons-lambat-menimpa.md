# #63 — Race fetch: respons lambat menimpa respons baru

**Indeks:** [`README.md`](./README.md) · **ID:** `#63` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Permintaan **lebih lambat** untuk konteks lama dapat menyelesaikan setelah permintaan **lebih cepat** untuk konteks baru—menimpa state dengan data usang. Ini klasik pada jaringan tidak stabil dan cache CDN. Tanpa **sequence token** atau abort, UI dapat menampilkan versi lawas meskipun pengguna sudah berpindah konteks.

---

## Mitigasi ideal (~60 detik)

“Gunakan **AbortController** untuk membatalkan fetch lama ketika konteks berubah; alternatifnya simpan **monotonic request id** dan abaikan respons jika id tidak cocok dengan yang terbaru. Hindari `setState` tanpa guard pada async handler. Untuk GraphQL, gunakan batching yang konsisten dengan server.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Last-write-wins hazard:** yang menang adalah respons terakhir selesai, belum tentu yang terbaru diminta.

---

## Mengapa pola ini sangat umum di healthcare

1. API lambat pada jam sibuk rumah sakit.
2. Wi-Fi pasien pada perangkat seluler tidak stabil.
3. Prefetch agresif background.

---

## Pola gagal (ilustrasi)

```typescript
let seq = 0;
async function load(patientId) {
  const my = ++seq;
  const data = await api.get(patientId);
  if (my !== seq) return; // guard
  setData(data);
}
```

---

## Gejala di production

- Data “melompat” maju mundur saat pengguna menggulir daftar dengan latency tinggi.

---

## Diagnosis

1. Trace network waterfall dan urutan apply state.
2. Instrument `setState` dengan tag versi.

---

## Mitigasi yang disarankan

1. Guard seq atau AbortController.
2. Suspense-friendly data fetching patterns.
3. Debounce navigasi cepat dengan loading gate.

---

## Trade-off dan risiko

- Abort berlebihan meningkatkan beban server—sesuaikan strategi cache.

---

## Aspek khusus healthcare

- Menampilkan order medikasi lawas dapat menyebabkan overdosis yang salah—severity tinggi.

---

## Checklist review PR

- [ ] Handler async yang memanggil `setState` punya guard konteks.

---

## Kata kunci untuk pencarian

`race condition`, `AbortController`, `last write wins`, `request sequencing`

---

## Skenario regresi yang disarankan

1. Simulasikan API dengan delay acak 200–2000 ms untuk endpoint yang sama.
2. Klik cepat antara dua pasien berbeda minimal 50 kali otomatis.
3. Pastikan tidak ada frame dengan MRN yang tidak cocok URL.
4. Uji pada koneksi 3G throttled.
5. Uji dengan service worker caching mati dan hidup.
6. Uji prefetch background tidak menimpa konteks aktif.

---

## KPI pemantauan

- Persentase respons yang dibuang karena stale guard (menandakan proteksi bekerja).
- Insiden laporan data silang per rilis versi aplikasi.

---

## Catatan tambahan operasional

Integrasikan **contract test** antara backend pagination dan frontend guard untuk memastikan ID konteks selalu dikirim di query.

---

## Referensi internal

- [`README.md`](./README.md) · **#61**, **#62**.
