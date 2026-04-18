# #32 — Waterfall `async` tanpa parallelisasi yang tepat → latency tinggi

**Indeks:** [`README.md`](./README.md) · **ID:** `#32` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Rantai `await` berurutan untuk operasi yang **tidak saling bergantung** menjumlahkan latency—misalnya memanggil layanan asuransi, lab eksternal, dan geocoder secara serial padahal bisa paralel aman. Di healthcare API gateway, ini memperpanjang waktu respons registrasi pasien atau verifikasi eligibility di layar yang sensitif.

---

## Mitigasi ideal (~60 detik)

“Identifikasi dependensi sebenarnya—kalau tiga layanan tidak saling membutuhkan output satu sama lain, jalankan dengan **`Promise.all` atau `allSettled`** dengan timeout per call. Untuk yang butuh hasil parsial, mulai early fetch paralel lalu gabungkan. Tetap beri **bulkhead**—jangan biarkan satu layanan lambat menghancurkan semua jika ada fallback. Ukur dengan tracing untuk melihat waterfall.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Critical path:** rantai minimum yang menentukan latency total.
- **Bulkhead:** membatasi dampak kegagalan satu integrasi.

---

## Mengapa pola ini sangat umum di healthcare

1. Kode ditulis secara imperatif mudah dibaca tetapi serial.
2. Khawatir race condition sehingga developer memilih serial tanpa analisis.
3. SDK pihak ketiga dibungkus tanpa pooling HTTP.

---

## Pola gagal (ilustrasi)

```typescript
const a = await fetchInsurance(...);
const b = await fetchLabCatalog(...); // independent of a
```

---

## Gejala di production

- p95 latency endpoint naik linear dengan jumlah integrasi meskipun CPU idle.

---

## Diagnosis

1. Trace waterfall pada APM—span serial panjang.
2. Hitung durasi tiap `await`.

---

## Mitigasi yang disarankan

1. Paralelisasi independen dengan `Promise.all`.
2. Gunakan `AbortSignal` timeout per fetch.
3. Pertimbangkan cache singkat untuk lookup statis.

---

## Trade-off dan risiko

- Paralel meningkatkan beban burst ke sistem lain—koordinasi rate limit.

---

## Aspek khusus healthcare

- Eligibility dan benefit check sering bisa paralel dengan validasi identitas internal—desain dengan hati-hati PHI.

---

## Checklist review PR

- [ ] Review async chain untuk peluang paralelisasi tanpa melanggar invariant.

---

## Kata kunci untuk pencarian

`Promise.all`, `waterfall`, `parallel requests`, `bulkhead`

---

## Catatan tambahan operasional

Simpan diagram dependency pada ADR endpoint kompleks agar refactor paralel tidak melanggar urutan audit.

Gunakan **feature flag** untuk mengaktifkan jalur paralel secara bertahap pada endpoint produksi dengan canary traffic.

---

## Referensi internal

- [`README.md`](./README.md) · **#33**.
