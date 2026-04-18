# #42 — Scheduled job salah timezone atau boundary DST

**Indeks:** [`README.md`](./README.md) · **ID:** `#42` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Job yang dijadwalkan “setiap jam 02:00” dalam **timezone server UTC** tetapi operasi klinis mengacu pada **timezone fasilitas** akan berjalan di waktu yang salah—lebih parah lagi saat **DST** mengubah panjang hari. Node.js `node-cron` atau scheduler cloud membutuhkan konfigurasi zona eksplisit (`TZ` atau `cron-timezone`). Akibatnya batch penutupan billing, purge data, atau sinkronisasi inventaris bisa berjalan di tengah jam sibuk atau mengulang/melewatkan jam.

---

## Mitigasi ideal (~60 detik)

“Simpan semua jadwal dalam **UTC** di konfigurasi tetapi terjemahkan menggunakan **IANA timezone** untuk display dan cron yang mengacu jam lokal fasilitas—gunakan library seperti `luxon`. Uji eksplisit untuk minggu DST. Dokumentasikan timezone pada setiap cron entry. Untuk sistem multi-cabang, pertimbangkan cron per zona atau satu scheduler pusat dengan parameter zona.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **DST boundary:** hari ketika jam lokal maju/mundur.
- **Wall clock vs instant:** cron harus membedakan keduanya.

---

## Mengapa pola ini sangat umum di healthcare

1. Tim dev di zona berbeda dari rumah sakit pelanggan.
2. Cron di container default UTC.
3. Laporan “harian” harus mengikuti cut-off lokal.

---

## Pola gagal (ilustrasi)

Job `0 2 * * *` di server UTC untuk rumah sakit Jakarta—jam eksekusi bergeser tidak intuitif dan DST tidak relevan tetapi zona salah tetap bermasalah.

---

## Gejala di production

- Batch berjalan saat jam kunjungan puncak secara tiba-tiba setelah deploy server region baru.
- Rekap harian kelebihan atau kurang satu jam dua kali setahun di wilayah DST.

---

## Diagnosis

1. Konversi `next_run` cron ke jam lokal fasilitas untuk verifikasi.
2. Simulasikan dengan library timezone pada tanggal DST.

---

## Mitigasi yang disarankan

1. Set `process.env.TZ` dengan hati-hati atau hindari mengandalkan itu global.
2. Simpan **instant** untuk event terjadwal, bukan jam dinding saja.
3. Tes cron unit dengan fixture zona.

---

## Trade-off dan risiko

- Mengelola banyak zona kompleks—otomatisasi konfigurasi per cabang.

---

## Aspek khusus healthcare

- Jadwal obat dan jendela lab sering mengacu jam lokal pasien—salah zona berbahaya.

---

## Checklist review PR

- [ ] Cron baru mencantumkan zona dan dampak DST dievaluasi.

---

## Kata kunci untuk pencarian

`cron timezone`, `DST`, `IANA`, `Luxon`, `TZ`

---

## Catatan tambahan operasional

Cantumkan **timezone owner** bisnis untuk setiap job dalam dokumentasi operasi agar tidak ada asumsi implisit “jam Jakarta”.

Saat negara/klien baru onboarding, jalankan checklist **cron audit** untuk mencocokkan jam eksekusi dengan jam operasional mereka.

Simpan **changelog perubahan DST** dunia pada kalender tim agar tes regresi dijalankan menjelang tanggal sensitif.

---

## Referensi internal

- [`README.md`](./README.md) · **#41**, **#57**.
