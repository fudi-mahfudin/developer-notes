# #49 — Session store Redis down → logout massal / error generik

**Indeks:** [`README.md`](./README.md) · **ID:** `#49` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Autentikasi berbasis **session server-side** yang disimpan di Redis bergantung pada ketersediaan Redis. Restart cluster, failover buruk, atau kesalahan jaringan menyebabkan sesi hilang — semua pengguna mendadak **logout** atau menerima error **500** ketika middleware tidak menangani degradasi dengan baik. Pada portal pasien selama kampanye kesehatan, ini menghasilkan frustrasi besar dan lonjakan beban login.

---

## Mitigasi ideal (~60 detik)

“Rancang **fallback**: gunakan session DB/encrypted cookie dengan trade-off yang disadari; atau multi-AZ Redis dengan sentinel/cluster matang; pastikan aplikasi membaca failover endpoint. Terapkan **circuit breaker** yang menampilkan pesan terkontrol daripada error mentah. Untuk PHI, hindari menyimpan banyak data sesi sensitif tanpa perlindungan. Latih failover Redis dengan chaos drill.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Hard dependency:** layanan kritikal tidak berfungsi tanpa Redis session.
- **Sticky sessions vs stateless JWT:** trade-off disponibilitas.

---

## Mengapa pola ini sangat umum di healthcare

1. Portal pasien membutuhkan session cepat dengan Redis.
2. Cluster Redis tidak diuji failover rutin.
3. Healthcheck aplikasi tidak mendeteksi kematian Redis cepat.

---

## Pola gagal (ilustrasi)

Redis cluster split-brain menyebabkan mayoritas sesi tidak dapat dibaca — seluruh klinisi logout.

---

## Gejala di production

- Lonjakan login bersamaan setelah pemeliharaan Redis tanpa komunikasi pengguna.

---

## Diagnosis

1. Timeline error Redis vs spike login failure.
2. Metrics connection refused ke Redis endpoint.

---

## Mitigasi yang disarankan

1. Stateful session dengan TTL di DB sebagai backup plan.
2. Canary failover tests.
3. Messaging status pada UI maintenance.

---

## Trade-off dan risiko

- Stateless JWT panjang meningkatkan risiko token theft—gunakan refresh pendek dan rotasi.

---

## Aspek khusus healthcare

- Logout mendadak di depan pasien bisa mengganggu alur informed consent digital—sedikan fallback offline?

---

## Checklist review PR

- [ ] Dependensi Redis pada jalur login punya perilaku degraded yang teruji.

---

## Kata kunci untuk pencarian

`Redis session`, `failover`, `circuit breaker`, `sticky session`

---

## Catatan tambahan operasional

Cantumkan Redis dalam daftar komponen **tier-1** untuk wake-up on-call ketika SLA latensi menyimpang drastis.

Latih skenario **split-brain Redis** pada tabletop exercise agar komunikasi ke pengguna terdokumentasi sebelum insiden nyata.

Siapkan **template komunikasi pasien** untuk downtime portal agar tidak ada desinformasi selama insiden autentikasi.

Integrasikan status Redis ke **status page** publik internal rumah sakit bila diperlukan.

---

## Referensi internal

- [`README.md`](./README.md) · **#48**, **#85**.
