# #12 — Deadlock dua transaksi dengan urutan akses resource berbeda

**Indeks:** [`README.md`](./README.md) · **ID:** `#12` · **Kategori:** Database & transaksi

---

## Ringkasan

**Deadlock** terjadi ketika dua transaksi atau lebih menahan lock pada sumber berbeda dan menunggu satu sama lain membentuk siklus. Urutan mengunci **encounter** lalu **invoice** pada satu jalur kode, tetapi jalur lain mengunci **invoice** lalu **encounter**, klasik menyebabkan deadlock di production. Healthcare punya banyak entitas terkait (pasien, kunjungan, billing, inventory) sehingga kemungkinan pola berbeda tinggi.

---

## Mitigasi ideal (~60 detik)

“Deadlock itu biasanya masalah **urutan lock**, bukan kebetulan. Mitigasinya: tetapkan **canonical order** penguncian entitas—misalnya selalu patient → encounter → charge; refactor jalur yang menyimpang. Kurangi transaction scope—**commit lebih cepat**. Tambahkan **retry dengan backoff** pada deadlock error code yang dapat diprediksi (40001 di Postgres). Logging harus menyimpan **graph deadlock** dari DB untuk analisis.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Wait-for graph:** siklus tunggu lock antar transaksi.
- **Lock ordering discipline:** kontrak pengembangan untuk urutan mengunci row.

---

## Mengapa pola ini sangat umum di healthcare

1. Fitur tersebar (farmasi, radiologi, billing) mengunci subset berbeda.
2. Background job rekonsiliasi bersinggungan dengan UI klinisi.
3. Integrasi webhook men-trigger update paralel pada entitas sama.

---

## Pola gagal (ilustrasi)

Transaksi A: update `billing_line` where encounter_id=E lalu update `encounters`.  
Transaksi B: update `encounters` where id=E lalu update `billing_line`.

---

## Gejala di production

- Error sporadis `deadlock detected` pada jam sibuk.
- Retry otomatis menyembunyikan masalah sampai latency naik.

---

## Diagnosis

1. Aktifkan **deadlock logs** dan capture query fingerprint.
2. Mapping stack trace aplikasi Node ke urutan repository calls.

---

## Mitigasi yang disarankan

1. Dokumentasi **lock order** di modul domain.
2. Pecah transaksi panjang menjadi dua commit lebih kecil bila aman secara bisnis.
3. Retry idempoten untuk deadlock—pastikan tidak menggandakan efek (lihat [#35](35-retry-non-idempotent-duplikat.md)).

---

## Trade-off dan risiko

- Komit lebih pendek bisa mengorbankan konsistensi—gunakan pola outbox/compensation jika perlu.

---

## Aspek khusus healthcare

- Billing dan encounter sering berada dalam satu workflow—rapat lintas tim untuk menyepakati urutan.

---

## Checklist review PR

- [ ] Kode baru yang mengunci dua tabel mengikuti urutan standar tim.
- [ ] Ada tes konkurensi ringan untuk skenario paralel umum.

---

## Kata kunci untuk pencarian

`deadlock`, `lock ordering`, `retry 40001`, `transaction scope`

---

## Catatan tambahan operasional

Gunakan timeout transaksi yang wajar agar deadlock tidak menahan pool koneksi terlalu lama.

Deadlock sering muncul saat **job batch** dan **request interaktif** mengunci subset yang sama—jadwalkan job di luar jam klinis atau gunakan isolation yang lebih longgar hanya jika valid secara bisnis.

---

## Referensi internal

- [`README.md`](./README.md) · **#13**, **#14**.
