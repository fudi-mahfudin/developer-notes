# Contoh ADR — Event Bus untuk Domain Rujukan (Fiksi)

> **Disclaimer:** Keputusan fiksi; tidak merekomendasikan teknologi tertentu untuk sistem nyata.

**ADR:** `ADR-018`  
**Judul:** Menggunakan Kafka untuk publikasi event rujukan  
**Tanggal:** 18 April 2026  
**Status:** Accepted  
**Penulis:** Principal Engineer — Clinical Platform

---

## Konteks

Modul rujukan perlu mengirim notifikasi dan sinkronisasi sekunder tanpa mengikat latensi permintaan pengguna. Integrasi masa depan (analytics operasional, auditor pipeline) membutuhkan stream kejadian yang dapat diputar ulang dengan semantik yang jelas.

---

## Keputusan

Menggunakan **Apache Kafka** sebagai **event backbone** untuk topik domain `referral.*`, dengan pola **outbox transaksional** dari layanan `referral-svc`.

---

## Opsi yang dipertimbangkan

| Opsi | Kelebihan | Kekurangan |
|------|-----------|------------|
| RabbitMQ | Operasi lebih sederhana untuk tim kecil | Kurang cocok untuk replay skala besar |
| Kafka | Durability + replay + ekosistem stream | Kompleksitas operasional lebih tinggi |
| Sync HTTP calls langsung | Implementasi cepat | Kopling ketat; gagal menyebarkan beban |

---

## Konsekuensi positif

- Producer dapat tetap cepat dengan menulis ke outbox dalam transaksi DB.
- Consumer `notification-relay` dapat diskalakan independen.

---

## Konsekuensi negatif / risiko

- Membutuhkan keahlian cluster Kafka dan pemantauan lag DLQ.
- Semantik pengiriman **setidaknya sekali** — consumer harus idempotent.

---

## Mitigasi

- Jalankan managed Kafka dengan SLA vendor.  
- Gunakan **schema registry** untuk versi payload event.  
- Alarm mendalam pada lag dan DLQ (`RB-CLIN-NOTIF-DLQ`).

---

## Status revisi mendatang

Jika volume rendah stabil selama 12 bulan, evaluasi ulang apakah kompleksitas Kafka masih sebanding—bukan untuk mengganti sekarang.

---

## Referensi

- TSD Referral Service v0.3  
- HLD Clinical Hub v1.1  

---

## Lampiran ringkas — metrik evaluasi pasca-keputusan

| Metrik | Target review 6 bulan |
|--------|------------------------|
| Lag consumer `referral.events` | Di bawah ambang operasi |
| Incident terkait duplikasi pesan | Nol kejadian material |

---

## Persetujuan (ilustrasi)

| Nama | Peran |
|------|-------|
| … | Principal Engineer |
| … | SRE Lead |

---

## Riwayat status

| Tanggal | Status | Catatan |
|---------|--------|---------|
| 2026-04-10 | Proposed | Diskusi architecture guild |
| 2026-04-18 | Accepted | Dirilis bersama rilis RFC |

---

## Tautan diskusi

- Thread Slack `#architecture` tanggal 2026-04-11 (fiksi) merangkum kekhawatiran biaya operasi Kafka versus alternatif managed.

---

## Implikasi pemantauan

Dashboard baru harus menambahkan panel lag consumer dan DLQ untuk topik `referral.events` sebagai konsekuensi langsung keputusan ini.

**Akhir contoh ADR.**

