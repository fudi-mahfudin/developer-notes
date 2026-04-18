# #41 — Cron overlap (job lama belum selesai, job baru berjalan)

**Indeks:** [`README.md`](./README.md) · **ID:** `#41` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

**Cron** yang diasumsikan selalu lebih cepat dari intervalnya dapat **overlap** ketika data tumbuh atau infrastruktur melambat—dua eksekusi bersamaan memproses subset data yang sama, menggandakan efek samping (duplikat notifikasi, race pada file lock). Tanpa **mutex** terdistribusi atau **single-flight** guard, overlap sulit dideteksi karena masing-masing job tampak valid.

---

## Mitigasi ideal (~60 detik)

“Gunakan **distributed lock** dengan TTL lebih panjang dari durasi job terburuk, atau **cron leader election**—hanya satu pod menjalankan. Tambahkan **timeout absolut** untuk job agar tidak menggantung selamanya. Untuk job yang bisa overlap aman, desain **idempotent** dengan watermark. Di healthcare, overlap laporan billing adalah risiko finansial dan regulasi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Overlap window:** ketika start job N+1 terjadi sebelum job N selesai.
- **Single-flight:** mekanisme mencegah eksekusi paralel sama.

---

## Mengapa pola ini sangat umum di healthcare

1. Dataset naik tetapi jadwal cron tetap.
2. Deploy lambat meningkatkan durasi job tanpa disadari.
3. Multi-instance Kubernetes menjalankan cron tanpa koordinasi.

---

## Pola gagal (ilustrasi)

Cron setiap 5 menit tetapi job kadang memakan 12 menit—overlap permanen.

---

## Gejala di production

- Duplikat baris summary harian.
- Lonjakan beban DB berperiodik ganda.

---

## Diagnosis

1. Log start/end timestamp job—deteksi overlap.
2. Matikan semua instance kecuali satu untuk melihat apakah masalah hilang.

---

## Mitigasi yang disarankan

1. Lock Redis dengan token owner.
2. Ubah cron menjadi queue dengan concurrency 1 per namespace.
3. Skalakan vertical job atau pecah dataset.

---

## Trade-off dan risiko

- Lock terlalu pendek bisa membiarkan overlap—sesuaikan TTL.

---

## Aspek khusus healthcare

- Job rekap klaim tidak boleh menggandakan entri ke payer—overlap berbahaya.

---

## Checklist review PR

- [ ] Scheduled job punya proteksi overlap atau pembuktian idempotensi kuat.

---

## Kata kunci untuk pencarian

`cron overlap`, `distributed lock`, `single flight`, `Kubernetes CronJob`

---

## Catatan tambahan operasional

Gunakan **CronJob concurrencyPolicy: Forbid** di Kubernetes saat overlap tidak dapat diterima.

Cantumkan **estimated runtime** pada definisi cron di dokumen operasi agar tim tahu kapan interval perlu diperbesar.

Pasang alarm jika durasi eksekusi mendekati interval cron—peringatan overlap sebelum overlap aktual menghantam produksi.

---

## Referensi internal

- [`README.md`](./README.md) · **#42**, **#43**.
