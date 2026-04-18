# #44 — Lock tidak di-release saat crash → blocking hingga TTL habis

**Indeks:** [`README.md`](./README.md) · **ID:** `#44` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Saat proses worker crash di tengah critical section **tanpa melepaskan lock** secara eksplisit, sistem mengandalkan **TTL** untuk membersihkan; sampai TTL habis, layanan lain tidak dapat masuk—menyebabkan **antrean macet**. Jika TTL panjang untuk menghindari [#43](43-ttl-distributed-lock-pendek-double-execution.md), crash dapat menghentikan pemrosesan kritis lebih lama dari yang diharapkan.

---

## Mitigasi ideal (~60 detik)

“Gunakan TTL yang seimbang dengan **watchdog** yang mendeteksi heartbeat hilang dan membebaskan atau memutuskan failover manual. Pada Redis, kombinasikan lock dengan **token nilai unik** sehingga hanya pemilik sah yang bisa unlock. Pada Kubernetes, pastikan graceful shutdown mengirim sinyal SIGTERM untuk menyelesaikan lease. Untuk healthcare, dokumentasikan prosedur **break-glass** membuka lock jika automation gagal.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Stale lock:** lock yang masih ada namun pemiliknya sudah tidak hidup.
- **Watchdog:** proses yang memantau keberadaan worker.

---

## Mengapa pola ini sangat umum di healthcare

1. OOM kill pada worker tanpa hook cleanup.
2. Deploy rolling restart memutus pod di tengah lock.
3. Lock library tidak mendukung extend lease.

---

## Pola gagal (ilustrasi)

Pod SIGKILL saat node drain—lock Redis tetap tanpa heartbeat.

---

## Gejala di production

- Seluruh worker berhenti memproses antrian tertentu hingga TTL habis.

---

## Diagnosis

1. Metrik lock age vs TTL.
2. Korelasi dengan event deploy/restart.

---

## Mitigasi yang disarankan

1. Graceful shutdown hook yang release lock.
2. TTL moderat + renewal daripada TTL sangat panjang statis.
3. Admin CLI untuk inspect/delete lock dengan audit.

---

## Trade-off dan risiko

- Menghapus lock manual berisiko double execution—perlu prosedur ketat.

---

## Aspek khusus healthcare

- Lock pada pipeline obat high-alert harus punya escalation manual terdokumentasi.

---

## Checklist review PR

- [ ] Worker yang memegang lock menangani SIGTERM/TTL renewal.

---

## Kata kunci untuk pencarian

`graceful shutdown`, `lease`, `stale lock`, `SIGTERM`

---

## Catatan tambahan operasional

Latih chaos engineering dengan membunuh pod secara acak saat lock aktif untuk menguji pemulihan.

Pertimbangkan **two-person rule** untuk menghapus lock manual di produksi agar tidak terjadi human error saat tekanan tinggi.

Log setiap pembebasan lock manual ke sistem audit untuk kepatuhan dan pembelajaran RCA.

Setelah insiden, jalankan **post-incident unit test** yang mensimulasikan crash untuk memastikan mitigation tetap efektif.

---

## Referensi internal

- [`README.md`](./README.md) · **#43**.
