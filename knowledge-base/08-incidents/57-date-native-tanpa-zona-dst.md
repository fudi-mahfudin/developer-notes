# #57 — `Date` native tanpa zona → kesalahan boundary DST

**Indeks:** [`README.md`](./README.md) · **ID:** `#57` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Menggunakan `Date` JavaScript dengan **`toLocaleString` implisit** atau mengira **server UTC** sama dengan zona rumah sakit menyebabkan kesalahan saat **DST** mulai atau berakhir—jam yang “tidak ada” atau duplikat. Di healthcare, ini mempengaruhi jadwal operasi, pemberian obat interval, dan cut-off klaim.

---

## Mitigasi ideal (~60 detik)

“Gunakan library zona eksplisit (**Luxon**, **date-fns-tz**) dan simpan **instant** dalam UTC di DB—konversi ke zona fasilitas hanya di boundary UI/API. Uji unit dengan fixture tanggal DST untuk wilayah target. Hindari mengandalkan offset numerik saja tanpa aturan zona. Dokumentasikan zona setiap cabang.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Wall time vs instant:** jam dinding berubah pada DST; instant tidak.
- **IANA zone:** penamaan seperti `Asia/Jakarta` stabil untuk aturan politik waktu.

---

## Mengapa pola ini sangat umum di healthcare

1. Server cloud default UTC vs klinisi melihat jam lokal.
2. Kode yang mengandalkan `getHours()` lokal server.
3. Multi-cabang lintas negara.

---

## Pola gagal (ilustrasi)

Menyimpan string jam lokal tanpa offset—ambiguous saat fallback DST.

---

## Gejala di production

- Laporan harian “bertabrakan” atau appointment bergeser satu jam dua kali setahun untuk wilayah tertentu.

---

## Diagnosis

1. Tes dengan tanggal zona US/EU yang punya DST vs tidak.
2. Audit penyimpanan datetime tanpa zona.

---

## Mitigasi yang disarankan

1. Kolom `timestamptz` di Postgres + konversi konsisten.
2. Luxon `DateTime` dengan zone eksplisit.
3. Jangan serialisasi `Date` JSON tanpa ISO offset.

---

## Trade-off dan risiko

- Library tambahan meningkatkan ukuran bundle frontend—tree-shake.

---

## Aspek khusus healthcare

- Obat dengan interval ketat—salah satu jam bisa fatal; verifikasi dengan farmasi.

---

## Checklist review PR

- [ ] Fitur jadwal menyertakan zona dan uji DST.

---

## Kata kunci untuk pencarian

`DST`, `Luxon`, `timestamptz`, `IANA timezone`

---

## Catatan tambahan operasional

Buat **kalender insiden** internal menjelang tanggal DST untuk regresi otomatis dan manual.

Cantumkan **default timezone** pada konfigurasi tenant agar layanan multi-cabang tidak bergantung pada asumsi server tunggal.

Integrasikan **kalender libur nasional** per negara ke uji jadwal karena cuti mempengaruhi interpretasi “hari kerja” klinik.

Tambahkan **widget debug zona** hanya di lingkungan non-prod untuk membantu QA memverifikasi konversi.

---

## Referensi internal

- [`README.md`](./README.md) · **#42**, **#58**.
