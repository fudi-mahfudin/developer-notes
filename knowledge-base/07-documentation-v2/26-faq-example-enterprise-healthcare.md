# Contoh FAQ & Troubleshooting — Clinical Hub Rujukan (Fiksi)

> **Disclaimer:** Jawaban ilustratif; verifikasi terhadap versi produk Anda.

**Produk:** Clinical Hub — Modul Rujukan  
**Versi dokumen:** 1.1  
**Berlaku untuk:** build `>= 1.5.0`  
**Tanggal:** 18 April 2026

---

## FAQ umum

### Mengapa tombol Kirim tetap nonaktif?

Tombol Kirim aktif hanya jika **field wajib ringkasan** untuk tenant Anda terisi valid. Periksa indikator merah pada panel ringkasan; diagnosis utama dan alergi biasanya wajib.

---

### Mengapa saya tidak melihat rujukan dari site lain?

Akun Anda mungkin tidak memiliki **izin site** atau filter default menyembunyikan site lain. Periksa dropdown site di sudut atas—pastikan Anda berada dalam konteks yang benar.

---

### Email notifikasi tidak sampai — apakah bug?

Belum tentu. Periksa folder spam dan pastikan notifikasi email **diaktifkan** untuk tenant di pengaturan admin. Jika antrean internal masih kosong padahal status sudah berubah, lanjut ke troubleshooting.

---

## Troubleshooting — tidak ada notifikasi setelah Submit

| Langkah | Tindakan |
|---------|----------|
| 1 | Konfirmasi status rujukan benar-benar **Submitted** (refresh halaman). |
| 2 | Periksa inbox dalam aplikasi — jalur fallback jika email tertunda. |
| 3 | Jika persist >15 menit pada jam kerja — buka tiket dengan trace ID dari banner error. |

**Peringatan klinis:** operasikan protokol komunikasi manual site Anda jika informasi time-sensitive.

---

## Troubleshooting — error 409 saat Kirim

**Gejala:** pesan konflik versi atau idempotensi.  
**Penyebab umum:** permintaan ganda (double-click) atau sesi paralel mengedit ringkasan.

**Langkah:**

1. Refresh halaman dan pastikan tidak ada tab lain mengedit rujungan sama.  
2. Kirim ulang dengan **Idempotency-Key** baru (otomatis pada UI terbaru).  
3. Jika masih gagal — lampirkan trace ID ke tiket `CLIN-support`.

---

## Troubleshooting — data pasien tidak ditemukan

Pastikan Anda memilih pasien dari **hasil pencarian indeks**, bukan menempel ID manual yang sudah tidak valid. Jika pasien baru saja digabung (deduplikasi), tunggu sinkronisasi indeks (biasanya di bawah 5 menit).

---

## Eskalasi

Berikan selalu:

- Site ID  
- Referral internal ID (bukan nama pasien)  
- Timestamp konteks  
- Trace ID  

---

## Revisi dokumen

| Versi | Catatan |
|-------|---------|
| 1.1 | Tambah 409 retry |

---

## Versi dokumen dan umpan balik

| Versi | Perubahan |
|-------|-----------|
| 1.1 | Tambah pemecahan masalah 409 |

Tombol umpan balik halaman (fiksi): `Was this helpful?` — metrik membantu memprioritaskan pembaruan.

---

## Kontak dukungan tingkat 2

Email `clinical-support@nha.example.com` dengan subjek `[FAQ-escalation]` — lampirkan trace ID.

---

## Referensi terkait

- Runbook DLQ notifikasi internal  
- Release notes 1.5.0  

**Akhir contoh FAQ/troubleshooting.**
