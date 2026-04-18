# Contoh Runbook — DLQ Notifikasi Rujukan (Fiksi)

> **Disclaimer:** Prosedur ilustratif; sesuaikan dengan cluster dan kebijakan akses Anda.

**ID Runbook:** `RB-CLIN-NOTIF-DLQ`  
**Versi:** 1.2  
**Tanggal:** 18 April 2026  
**Pemilik:** Platform Reliability — Clinical

---

## 1. Pemicu

- Alert `NOTIF_DLQ_DEPTH > 50` selama 10 menit.
- Dashboard menunjukkan backlog consumer `notification-relay`.

---

## 2. Dampak

Pasien/klinisi mungkin **tidak menerima** email/in-app untuk event rujukan—tim perlu menilai apakah ada dampak keselamatan komunikasi klinis (protokol site mengatur eskalasi manual).

---

## 3. Diagnosis awal

1. Buka dashboard Kafka consumer lag untuk topik `referral.events`.
2. Periksa error rate pod `notification-relay` di namespace `clinical-prod`.
3. Cek status vendor SMS/email pada halaman status pihak ketiga.

---

## 4. Mitigasi bertahap

### Langkah A — restart aman

```bash
kubectl rollout restart deployment/notification-relay -n clinical-prod
```

Tunggu rollout selesai; pantau error log.

### Langkah B — kurangi tekanan

Jika vendor down: aktifkan flag `notifications.email.enabled=false` **hanya** setelah menyetujui komunikasi alternatif dengan PM klinis—catat di incident channel.

---

## 5. Replay DLQ

Setelah akar masalah teratasi, gunakan skrip internal `replay-dlq.sh --topic referral.events --batch 200` **hanya** setelah review pasangan engineer.

---

## 6. Komunikasi

Template Slack `#incidents`:

> Investigasi keterlambatan notifikasi rujukan; pemantauan pasien mengikuti protokol manual site — lihat KB-441.

---

## 7. Eskalasi

| Waktu sejak pager | Tindakan |
|-------------------|----------|
| 15 menit | Page integration on-call |
| 30 menit | VP Digital notified |

---

## 8. Pasca-insiden

Hubungkan ke template postmortem `PMT-DEFAULT`; sertakan estimasi pesan tertunda.

---

## 9. Riwayat revisi

| Versi | Perubahan |
|-------|-----------|
| 1.2 | Tambah langkah cek vendor |

---

## 10. Post-check setelah mitigasi

- [ ] DLQ depth kembali di bawah ambang 30 menit  
- [ ] Tidak ada peningkatan error 5xx pada UI referensi  
- [ ] Entri incident diperbarui dengan timeline  

---

## 11. Lampiran diagram alir (deskripsi)

Alarm → cek lag → restart → jika gagal kurangi beban → eskalasi integration on-call → komunikasi stakeholder.

---

## 12. Daftar perintah berbahaya

Perintah yang dapat menghapus pesan DLQ **tanpa replay** memerlukan persetujuan dua orang pada jam kerja—daftar eksplisit disimpan di vault runbook tier-2.

---

## 13. Kontak vendor notifikasi

| Kanal | Nomor/waktu respons (fiksi) |
|-------|------------------------------|
| Email priority | support@vendor.example |

**Akhir contoh runbook.**
