# Dokumentasi Confluence / Wiki

Panduan ini menjelaskan **peran wiki perusahaan** (sering Atlassian Confluence), **praktik struktur dan kurasi**, **integrasi dengan Jira**, **governance konten**, serta **kesalahan** yang mengubah wiki menjadi kuburan dokumen.

---

## 1. Definisi singkat

**Wiki tim** adalah sistem kolaborasi untuk **halaman dokumentasi**: desain, rapat, kebijakan, panduan onboarding, ruang produk, dan pengetahuan operasional. **Confluence** adalah produk umum di enterprise; prinsipnya berlaku untuk Notion, SharePoint, atau wiki self-hosted.

---

## 2. Mengapa wiki sering dibuka

Developer mencari jawaban **“bagaimana kami melakukan X di perusahaan ini?”**—onboarding, arsitektur, keputusan lampau. Wiki adalah **memori organisasi** jika dikelola dengan baik.

---

## 3. Pola struktur ruang (spaces)

- **Engineering Handbook** — workflow, standar kode, ADR ringkas.
- **Product** — visi, riset pengguna, decision log.
- **Operations** — runbook ringkas (meskipun detail panjang bisa di repo).
- **Program** — charter proyek besar.

---

## 4. Kurasi dan ownership

Setiap ruang memiliki **owner** yang menyetujui struktur folder dan menghapus halaman usang. Tanpa ownership, wiki menjadi padang rumput.

---

## 5. Template halaman

Gunakan template untuk **decision record**, **postmortem**, **RFC**—menyeragamkan kualitas.

---

## 6. Integrasi Jira

Tautkan halaman ke epik; gunakan makro status agar konten tidak drift dari tiket aktual.

---

## 7. Hak akses

Definisikan ruang **internal vs eksternal**; PHI tidak boleh di wiki umum—gunakan referensi ID sintetis.

---

## 8. Pencarian dan penemuan kembali

Cantumkan **label** konsisten (`clinical`, `referral`, `security`). Periodik lakukan **rotasi** konten: arsipkan halaman superseded.

---

## 9. Anti-pattern

- Menyalin dokumen panjang dari Google Docs tanpa struktur—sulit dicari.
- Duplikasi kebenaran dengan repo Git—conflict tak terpecahkan.

---

## 10. Ringkasan

Wiki adalah **lapisan pengetahuan manusia** di atas repo kode. Dokumen ini sangat sering dibuka oleh engineer baru dan saat menyelidiki “keputusan siapa?”—namun hanya bernilai jika organisasi berinvestasi pada kurasi.

---

## 11. Moderasi kontribusi terbuka

Definisikan siapa boleh membuat ruang baru dan proses persetujuan untuk halaman dengan audiensi luas—mencegah proliferasi dokumentasi tidak konsisten.

---

## 12. Ekspor dan cadangan

Rencanakan ekspor berkala wiki strategis ke format mesin—vendor SaaS bisa berubah kebijakan retensi; cadangan mengurangi risiko kehilangan pengetahuan organisasi.

---

## 13. Sinkron dengan Slack

Cantumkan aturan snippet: kutipan wiki harus menyertakan link kanonik agar diskusi Slack tidak menjadi sumber kebenaran kedua yang bertentangan.

---

## 14. Analisis pencarian zero-result

Audit query pencarian tanpa hasil untuk mengarahkan pembuatan halaman baru atau penamaan ulang judul yang lebih intuitif bagi pembaca.

---

## 15. Hak akses berjenjang

Untuk informasi sensitif operasional, gunakan pembatasan ruang dan pelatihan singkat sebelum grant—dokumentasi tidak menggantikan kontrol akses teknis.

---

## 16. Pola dokumentasi API

Preferensikan link ke **OpenAPI** sebagai sumber struktur request—wiki menjelaskan konteks bisnis, bukan menyalin skema panjang yang cepat kedaluwarsa.
