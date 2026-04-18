# #87 — Versi resource FHIR di cache vs server tidak konsisten

**Indeks:** [`README.md`](./README.md) · **ID:** `#87` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Ketika klien mengandalkan **cache lokal** (browser, Redis) untuk resource FHIR, perubahan di server memperbarui **`meta.versionId`**—klien yang memakai entri usang dapat melakukan **update kondisional** yang gagal atau, lebih buruk, menimpa data berdasarkan bacaan usang jika mekanisme If-Match tidak ketat. Interop klinis membutuhkan semantik **concurrency** yang jelas.

---

## Mitigasi ideal (~60 detik)

“Hormati **ETag/If-Match** pada setiap write; cache entri dengan kunci yang menyertakan `versionId` + `lastUpdated`. Invalidasi cache saat menerima notifikasi subscription atau setelah TTL pendek. Gunakan **If-None-Match** untuk revalidasi. Jangan cache resource yang sering diubah multipemeran tanpa mekanisme live update.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Optimistic locking:** update hanya jika version sesuai.

---

## Mengapa pola ini sangat umum di healthcare

1. Aplikasi mobile dengan cache agresif koneksi buruk.
2. Server melindungi write tanpa mewajibkan If-Match (config lemah).
3. Multi-writer pada encounter tim bedah.

---

## Pola gagal (ilustrasi)

Client mengirim `PUT` tanpa header If-Match sehingga menimpa perubahan perawat lain.

---

## Gejala di production

- Data klinis “tertimpa” tanpa merge—keluhan tim.

---

## Diagnosis

1. Log response 409/412 dari server FHIR.
2. Uji konflik simultan di staging.

---

## Mitigasi yang disarankan

1. Wajib If-Match di server.
2. UI menampilkan conflict resolution.
3. WebSocket/Sub notifikasi perubahan.

---

## Trade-off dan risiko

- Notifikasi real-time menambah infrastruktur.

---

## Aspek khusus healthcare

- Tim medis simultan pada pasien kritis—konflik harus jelas, bukan diam.

---

## Checklist review PR

- [ ] Klien internal memakai semantik versi FHIR dengan benar.

---

## Kata kunci untuk pencarian

`FHIR versionId`, `ETag`, `If-Match`, `concurrency`

---

## Skenario regresi yang disarankan

1. Dua sesi mengedit resource yang sama—satu harus conflict.
2. Simulasikan cache lama + update server + aksi klien.

---

## KPI pemantauan

- Jumlah response 409/412 per endpoint klinis (indikator edit paralel sehat).

---

## Catatan tambahan operasional

Dokumentasikan **policy merge** medis ketika conflict—jangan hanya teknis.

---

## Referensi internal

- [`README.md`](./README.md) · **#88**, **#19**.
