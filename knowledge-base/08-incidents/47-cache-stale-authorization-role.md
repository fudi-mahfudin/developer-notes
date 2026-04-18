# #47 — Cache stale untuk authorization / role

**Indeks:** [`README.md`](./README.md) · **ID:** `#47` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Menyimpan **hasil evaluasi izin** atau daftar role pengguna dalam cache tanpa **TTL pendek** atau invalidasi pada perubahan role menyebabkan pengguna mendapatkan **akses atau penolakan salah** untuk periode berbahaya setelah rotasi peran. Di healthcare, ini klasifikasi **break-glass** atau restraksi akses pasien yang tidak konsisten dengan kebijakan aktual.

---

## Mitigasi ideal (~60 detik)

“Jangan cache keputusan auth sensitif dalam durasi panjang—kalau harus, invalidasi pada **event role change**, gunakan **version token** dalam JWT/session store, atau selalu evaluasi ulang untuk aksi high-risk. Untuk attribute-based access pada pasien tertentu, hindari cache global—cache per-request scoped pendek saja.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Stale permission:** izin yang tidak mencerminkan penugasan terbaru.
- **Security-sensitive caching:** caching hasil yang mempengaruhi akses PHI.

---

## Mengapa pola ini sangat umum di healthcare

1. Optimasi latensi dengan caching ACL besar.
2. Federated identity dengan sinkronisasi lambat grup AD.
3. Fitur toggle peran tanpa flush cache.

---

## Pola gagal (ilustrasi)

Redis cache `user:123:roles` TTL 1 jam padahal admin baru mencabut aksus radiologi.

---

## Gejala di production

- Pengguna masih dapat membuka chart setelah dicabut sampai TTL habis—atau sebaliknya terblokir padahal sudah diperbaiki.

---

## Diagnosis

1. Audit TTL cache auth dan bandingkan dengan SLA revokasi organisasi.
2. Reproduksi dengan mengubah role dan mengukur waktu propagate.

---

## Mitigasi yang disarankan

1. Sesuaikan TTL dengan kebutuhan revokasi (sering menit-detik).
2. Gunakan push invalidation dari sistem IAM.
3. Untuk aksi sensitif, bypass cache ACL.

---

## Trade-off dan risiko

- Evaluasi auth setiap request lebih mahal—gunakan struktur data efisien.

---

## Aspek khusus healthcare

- Kebijakan break-glass dan darurat wabah dapat mengubah akses cepat—cache harus mengikuti.

---

## Checklist review PR

- [ ] Tidak ada cache ACL berjam-jam tanpa invalidasi eksplisit pada event IAM.

---

## Kata kunci untuk pencarian

`auth cache`, `stale roles`, `permission revocation`, `ABAC`

---

## Catatan tambahan operasional

Sinergikan dengan [#85](85-jwt-clock-skew-intermittent-401.md) untuk token yang memuat versi klaim izin.

Integrasikan **event IAM** ke bus internal agar invalidasi cache auth dipicu otomatis saat grup LDAP berubah.

Uji **propagasi cabut akses** dalam hitungan menit sesuai SLA organisasi, bukan sekadar best effort.

Buat **laporan audit** bulanan yang menunjukkan waktu rata-rata sinkronisasi role setelah permintaan HR.

---

## Referensi internal

- [`README.md`](./README.md) · **#79**, **#78**.
