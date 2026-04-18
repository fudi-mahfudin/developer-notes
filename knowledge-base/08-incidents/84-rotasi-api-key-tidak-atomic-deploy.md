# #84 — Rotasi API key tidak atomic dengan deploy → downtime auth

**Indeks:** [`README.md`](./README.md) · **ID:** `#84` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Saat **memutar API key** layanan integrasi atau webhook secret, jika sistem hanya menerima satu nilai dalam satu waktu tanpa **overlap window**, deployment yang tidak sinkron antara produsen dan konsumen menyebabkan **401 massal** atau webhook gagal diverifikasi. Healthcare integration sering 24/7—downtime auth tidak dapat diterima.

---

## Mitigasi ideal (~60 detik)

“Dukung **multi-key aktif**: terima key lama dan baru selama periode terbatas; dokumentasikan urutan rotasi —deploy konsumen → deploy produsen → revoke lama. Gunakan secret manager dengan versioning. Automate health checks.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Overlap trust:** dua secret sah bersamaan untuk transisi aman.

---

## Mengapa pola ini sangat umum di healthcare

1. Rotasi tahunan compliance tanpa runbook integrasi.
2. Microservice independent deploy order acak.
3. Manual copy secret ke `.env` tiap server.

---

## Pola gagal (ilustrasi)

Hanya satu `API_KEY` env—update produsen sebelum konsumen siap.

---

## Gejala di production

- Lonjakan 401 pada integrasi lab selama satu jam rotasi.

---

## Diagnosis

1. Timeline deploy vs error auth.
2. Secret version logs.

---

## Mitigasi yang disarankan

1. Arrays accepted secrets di middleware.
2. Feature flag untuk phased rollout.

---

## Trade-off dan risiko

- Dua secret meningkatkan permukaan serangan—perpendek overlap.

---

## Aspek khusus healthcare

- Gagal integrasi lab dapat menunda diagnosis—komunikasi dengan vendor sebelum rotasi.

---

## Checklist review PR

- [ ] Perubahan secret menyertakan rencana overlap dan rollback.

---

## Kata kunci untuk pencarian

`secret rotation`, `API key`, `zero downtime`, `dual signing`

---

## Skenario regresi yang disarankan

1. Simulasikan konsumen lama + produsen baru selama 30 menit—semua request sukses.
2. Revoke lama setelah metrik nol penggunaan.

---

## KPI pemantauan

- Error 401 pada endpoint integrasi per jam selama jendela rotasi.

---

## Catatan tambahan operasional

Simpan **calendar rotasi** tahunan yang melibatkan semua vendor terhubung.

---

## Referensi internal

- [`README.md`](./README.md) · **#37**.
