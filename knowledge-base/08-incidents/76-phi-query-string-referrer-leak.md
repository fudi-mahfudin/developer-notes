# #76 — PHI di query string URL (referrer leak)

**Indeks:** [`README.md`](./README.md) · **ID:** `#76` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Menempatkan **MRN**, nama, atau token sensitif pada **query string** (`?patient=...`) membocorkan data melalui header **`Referer`** ke pihak ketiga saat pengguna mengklik tautan keluar, serta tersimpan di log proxy/browser. Meskipun HTTPS melindungi isi, URL penuh dapat bocor melalui referrer policy longgar.

---

## Mitigasi ideal (~60 detik)

“Gunakan **path parameter** atau **POST** untuk identifier; jika harus query, gunakan **opaque token** pendek dengan TTL ketat dan server-side lookup. Set header **`Referrer-Policy: no-referrer`** atau `strict-origin-when-cross-origin` sesuai kebutuhan. Jangan bagikan URL dengan PHI melalui chat/email.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Referrer leakage:** browser mengirim URL penuh ke domain lain sebagai referrer.

---

## Mengapa pola ini sangat umum di healthcare

1. Integrasi cepat menggunakan deep link dengan parameter jelas.
2. Bookmark/internal share link menyalin URL lengkap.
3. Analytics page view mengumpulkan URL utuh.

---

## Pola gagal (ilustrasi)

`/chart?mrn=12345` dibuka lalu pengguna mengklik iklan/contoh keluar—referrer membocorkan MRN.

---

## Gejala di production

- Vendor analytics memuat parameter sensitif dalam laporan tidak sengaja.

---

## Diagnosis

1. Audit route yang membaca PHI dari query.
2. Periksa Referrer-Policy pada respons HTML.

---

## Mitigasi yang disarankan

1. POST + PRG pattern untuk transaksi sensitif.
2. Token satu kali pakai untuk deep link.

---

## Trade-off dan risiko

- Referrer none mengurangi debugging affiliate—gunakan token server-side logging.

---

## Aspek khusus healthcare

- Sharing tautan dengan PHI melalui WhatsApp adalah pelanggaran umum—edukasi pengguna.

---

## Checklist review PR

- [ ] Tidak ada identifier PHI stabil di query string publik.

---

## Kata kunci untuk pencarian

`Referrer-Policy`, `query string PHI`, `deep link token`

---

## Skenario regresi yang disarankan

1. Klik tautan keluar dari halaman dengan query PHI—pastikan referrer tidak membawa parameter.
2. Salin URL dari address bar dan audit string.
3. Uji dengan ekstensi browser yang mencatat referrer.

---

## KPI pemantauan

- Skor scanning ZAP/Burp untuk parameter sensitif di URL.

---

## Catatan tambahan operasional

Tambahkan **pelatihan tahunan** bagi klinisi tentang berbagi tautan aman.

---

## Referensi internal

- [`README.md`](./README.md) · **#75**, **#78**.
