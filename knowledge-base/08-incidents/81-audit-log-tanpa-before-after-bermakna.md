# #81 — Audit log tidak mencakup before/after yang bermakna

**Indeks:** [`README.md`](./README.md) · **ID:** `#81` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Log audit yang hanya mencatat “user X mengubah record Y” tanpa **nilai sebelum/sesudah** tidak memadai untuk investigasi fraud atau kesalahan entri medis. Tanpa diff bermakna, rekonstruksi keputusan klinis dan billing menjadi mustahil—regulator dapat menilai sistem tidak memenuhi **integrity** requirements.

---

## Mitigasi ideal (~60 detik)

“Simpan **diff terstruktur** untuk field kritis (diagnosis, dosis obat) dengan redaksi field sangat sensitif jika perlu tampilan terbatas—tetapi pertahankan hash atau vault untuk investigasi hukum. Gunakan event sourcing atau tabel riwayat versi. Pastikan zona waktu konsisten [#60](60-round-trip-timezone-lab-server-user.md).”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Semantic diff:** perubahan pada field yang bermakna bisnis, bukan seluruh blob row.

---

## Mengapa pola ini sangat umum di healthcare

1. ORM `updated_at` saja dianggap cukup.
2. Volume data besar membuat tim enggan menyimpan diff.
3. Privasi vs audit tension tidak diselesaikan secara formal.

---

## Pola gagal (ilustrasi)

Log: `UPDATE patients SET ...` tanpa parameter lama/baru di aplikasi.

---

## Gejala di production

- Tim hukum tidak dapat membuktikan siapa mengubah diagnosis.

---

## Diagnosis

1. Audit sample perubahan dan lihat apakah bisa rekonstruksi.
2. Bandingkan dengan persyaratan regulasi setempat.

---

## Mitigasi yang disarankan

1. History table per entitas kritis.
2. Immutability + retained counsel access procedure.

---

## Trade-off dan risiko

- Menyimpan diff meningkatkan storage—arsipkan ke cheap tier.

---

## Aspek khusus healthcare

- Perubahan order obat memerlukan jejak jelas untuk malpractice review.

---

## Checklist review PR

- [ ] Field klinis berisiko punya audit diff atau versioning.

---

## Kata kunci untuk pencarian

`audit trail`, `before after`, `event sourcing`, `immutable log`

---

## Skenario regresi yang disarankan

1. Ubah diagnosis pada staging—query audit harus menunjukkan nilai lama/baru.
2. Uji enkripsi untuk field ultra-sensitif sesuai policy.

---

## KPI pemantauan

- Persentase entitas kritis dengan histori lengkap vs hanya timestamp.

---

## Catatan tambahan operasional

Definisikan **retensi audit** lebih panjang daripada retensi data operasional jika disyaratkan hukum.

---

## Referensi internal

- [`README.md`](./README.md) · **#80**.
