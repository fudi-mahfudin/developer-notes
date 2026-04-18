# Contoh HLD — Platform Digital NHA (Fiksi)

> **Disclaimer:** Diagram bersifat deskriptif; tidak merepresentasikan deployment aktual mana pun.

**Domain:** Clinical Integration — Rujukan & Rekam Ringkas  
**Versi HLD:** 1.1  
**Tanggal:** 18 April 2026  
**Penulis:** Enterprise Architecture Office

---

## 1. Tujuan dokumen

Memberikan gambaran **arsitektur tingkat tinggi** untuk kapabilitas **Clinical Hub** pada jaringan NHA, termasuk integrasi ke sistem identitas pasien dan saluran notifikasi.

---

## 2. Ruang lingkup

**Termasuk:** layanan aplikasi Clinical Hub, BFF, API gateway internal, platform pesan, cluster data klinis referensi.  
**Tidak termasuk:** data warehouse analitik jarak jauh, sistem payroll.

---

## 3. Diagram konteks (deskripsi tekstual)

**Aktor manusia:** klinisi, staf rujukan, administrator tenant.  
**Sistem eksternal:** IdP SSO perusahaan, vendor EHR site (melalui adaptor), gateway SMS/email pihak ketiga (notifikasi).

Alur utama: pengguna mengakses portal Clinical Hub melalui jaringan korporat atau VPN; identitas diverifikasi oleh IdP; permintaan melewati **API Gateway** menuju layanan internal.

---

## 4. Diagram container (ringkas)

| Container | Teknologi (ilustrasi) | Tanggung jawab |
|-----------|------------------------|----------------|
| `web-clinical-ui` | SPA | Antarmuka pengguna |
| `clinical-bff` | Layanan Node/Go | Agregasi API, session boundary |
| `referral-svc` | Layanan domain | Workflow rujukan |
| `patient-index` | Layanan + DB | Identitas kanonis |
| `policy-engine` | Layanan kebijakan | Masking & otorisasi fine-grained |
| `notification-relay` | Worker | Kirim event ke kanal |
| `audit-ingest` | Stream processor | Normalisasi jejak audit |
| `clinical-db` | Cluster SQL terkelola | Persistensi domain Clinical Hub |
| `kafka` | Cluster pesan | Domain events |

---

## 5. Aliran data kritikal — submit rujukan

1. UI → BFF: HTTPS (TLS 1.2+), bearer token.
2. BFF → referral-svc: mTLS internal melalui service mesh (asumsi).
3. referral-svc → patient-index: lookup ID kanonis (timeout ketat).
4. referral-svc → kafka: event `referral.submitted`.
5. notification-relay konsumsi event → adaptor SMS/email (tanpa PHI di payload kanal tidak aman).

---

## 6. Boundary keamanan

- **Zona terpercaya:** subnet layanan backend dan basis data; akses admin terpisah.
- **PHI:** tidak ditulis ke log aplikasi level INFO; masking sebelum respons ke UI sesuai policy-engine.
- **Secrets:** di vault; rotasi mengikuti kebijakan TI pusat.

---

## 7. Deployment view (ringkas)

Lingkungan **prod** direncanakan multi-AZ dalam satu region utama; DR cold standby direferensikan di dokumen DR terpisah. Pilot tenant berjalan pada subset cluster dengan feature flag.

---

## 8. Integrasi eksternal

| Sistem | Pola |
|--------|------|
| EHR site | FHIR read-only subset + adaptor batch untuk site tanpa API real-time |
| IdP | OIDC |
| Email/SMS | Vendor terkelola dengan template audit |

---

## 9. Observabilitas arsitektur

Trace terdistribusi dari gateway ke layanan; metrik RED pada setiap container kritis; log terpusat dengan retensi sesuai kebijakan.

---

## 10. Asumsi

- Throughput puncak sesuai profil hasil capacity planning internal.
- Latency antar-zona dalam SLO yang disepakati untuk layanan referensi.

---

## 11. Daftar ADR terkait

- ADR-014: Pemilihan service mesh vs library sidecar-only (draft).
- ADR-009: Strategi event schema versioning.

**Akhir contoh HLD.**
