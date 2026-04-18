# #85 — JWT clock skew antar service → 401 sporadis

**Indeks:** [`README.md`](./README.md) · **ID:** `#85` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Validasi JWT membandingkan **`exp`/`nbf`** dengan jam sistem. Jika jam antara layanan pembuat token dan layanan konsumen **tidak sinkron** (skew beberapa menit), token sah dapat ditolak intermittens—menghasilkan **401 sporadis** yang sulit direproduksi. Kontainer tanpa NTP benar rentan.

---

## Mitigasi ideal (~60 detik)

“Sinkronkan waktu semua VM/container dengan **NTP** terpercaya; konfigurasi library JWT dengan **`clockTolerance`** beberapa menit (<5) sebagai jaring pengaman—bukan pengganti sinkronisasi. Monitor drift jam pada node exporter.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Clock skew:** selisih jam antara dua host.

---

## Mengapa pola ini sangat umum di healthcare

1. Lingkungan hybrid on-prem + cloud dengan NTP berbeda.
2. Snapshot VM yang mengembalikan jam salah setelah resume.
3. Library default tolerance nol.

---

## Pola gagal (ilustrasi)

Pod Kubernetes tanpa sync waktu baik—skew 3 menit—token kadaluarsa lebih awal.

---

## Gejala di production

- Insiden “random logout” pada microservices.

---

## Diagnosis

1. Compare `date` across pods vs authoritative NTP.
2. Correlate 401 dengan pod tertentu.

---

## Mitigasi yang disarankan

1. chrony/systemd-timesyncd dikonfigurasi benar.
2. JWT library tolerance kecil.
3. Alert on large drift.

---

## Trade-off dan risiko

- Tolerance besar memperpanjang jendela replay—minimal.

---

## Aspek khusus healthcare

- Session klinisi terputus di tengah prosedur—severity tinggi meskipun “teknis”.

---

## Checklist review PR

- [ ] Infra checklist menyertakan verifikasi NTP pada node baru.

---

## Kata kunci untuk pencarian

`JWT exp`, `clock skew`, `NTP`, `401 intermittent`

---

## Skenario regresi yang disarankan

1. Geser jam kontainer +4 menit di staging—uji autentikasi layanan ke layanan.
2. Monitor drift metrics dengan alarm.

---

## KPI pemantauan

- Skew maksimum antar node dalam cluster (harus < beberapa detik).

---

## Catatan tambahan operasional

Cantumkan **clock sync** dalam checklist disaster recovery setelah restore VM.

---

## Referensi internal

- [`README.md`](./README.md) · **#49**, **#47**.
