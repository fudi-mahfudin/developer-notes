# #80 — Break-glass tanpa audit trail memadai

**Indeks:** [`README.md`](./README.md) · **ID:** `#80` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Fitur **break-glass** memungkinkan akses darurat ke catatan terkunci—namun tanpa **audit trail** lengkap (siapa, kapan, pasien apa, alasan, durasi), organisasi tidak dapat membuktikan pemenuhan regulasi dan menyelidiki penyalahgunaan. Log yang tersebar di banyak sistem tanpa korelasi membuat investigasi gagal.

---

## Mitigasi ideal (~60 detik)

“Catat setiap aktivasi break-glass pada **append-only audit store** dengan user id, IP, alasan wajib, dan scope pasien. Kirim notifikasi ke tim compliance real-time. Integrasikan dengan SIEM. Pastikan log tidak dapat diedit oleh admin biasa.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Break-glass:** override kontrol akses normal untuk situasi klinis darurat.

---

## Mengapa pola ini sangat umum di healthcare

1. Implementasi cepat saat insiden tanpa desain audit.
2. Log tersebar antara app, VPN, EMR.
3. Retensi log pendek mengorbankan investigasi bulanan.

---

## Pola gagal (ilustrasi)

Tombol darurat membuka chart tanpa persistence alasan—hanya console log.

---

## Gejala di production

- Audit regulator meminta bukti akses tidak dapat diproduksi.

---

## Diagnosis

1. Trace path aktivasi fitur dan semua sink log.
2. Verifikasi immutability penyimpanan audit.

---

## Mitigasi yang disarankan

1. Structured audit events schema.
2. Dual control review weekly atas pemakaian break-glass.
3. Export ke cold storage jangka panjang.

---

## Trade-off dan risiko

- Notifikasi berlebihan menyebabkan fatigue—atur deduplikasi.

---

## Aspek khusus healthcare

- Akses darurat dapat menyelamatkan nyawa—audit harus mendukung, bukan menghambat, dengan UX jelas.

---

## Checklist review PR

- [ ] Fitur bypass akses menyertakan logging tidak dapat dilewati pengguna.

---

## Kata kunci untuk pencarian

`break glass`, `audit trail`, `SIEM`, `emergency access`

---

## Skenario regresi yang disarankan

1. Aktifkan break-glass pada staging—verifikasi event masuk ke audit store terpisah.
2. Coba edit/hapus log sebagai admin biasa—harus gagal.

---

## KPI pemantauan

- Kelengkapan field alasan pada % aktivasi break-glass (target 100%).

---

## Catatan tambahan operasional

Libatkan **HIM/compliance** dalam desain UX agar alasan yang diminta bermakna untuk audit legal.

---

## Referensi internal

- [`README.md`](./README.md) · **#81**, **#82**.
