# Code Review Checklist

Panduan ini menjelaskan **fungsi checklist review kode**, **dimensi yang biasa dinilai**, **perbedaan lint otomatis vs judgement manusia**, serta **kesalahan** yang membuat review menjadi formalitas kosong.

---

## 1. Definisi singkat

**Code review checklist** adalah daftar pertanyaan atau kriteria yang membantu reviewer **secara konsisten** menilai perubahan kode: kebenaran, desain, keamanan, pengujian, observabilitas, aksesibilitas, dan kesesuaian dengan requirement.

Checklist bisa hidup di template PR, dokumen tim, atau otomatis sebagian melalui policy-as-code.

---

## 2. Mengapa sering dipakai

Developer melakukan review **beberapa kali per hari**. Checklist mengurangi variansi kualitas antara reviewer senior dan baru—dan membantu tidak melupakan dimensi non-fungsional.

---

## 3. Dimensi umum

| Dimensi | Pertanyaan contoh |
|---------|-------------------|
| Kebenaran | Apakah logika memenuhi AC dan edge case? |
| Desain | Apakah abstraksi tepat? Hindari over-engineering. |
| Keamanan | Validasi input, SQL injection, XSS, secret? |
| Privasi | Logging tidak membocorkan PHI? |
| Kinerja | Query N+1, payload besar? |
| Reliabilitas | Timeout, retry aman, idempotensi? |
| Observabilitas | Metrik/log/trace untuk jalur baru? |
| Uji | Cakupan tes memadai untuk risiko? |
| Dokumentasi | README/API spec diperbarui? |

---

## 4. Ukuran perubahan

Review besar meningkatkan kemungkinan kesalahan terlewat—checklist harus mendukung kebijakan **pecah PR**, bukan sekadar menandatangani PR besar.

---

## 5. Behavioral vs automated

Lint, format, dan SAST otomatis menangani gaya dan pola mudah—reviewer fokus pada **alur bisnis** dan **trade-off**.

---

## 6. Healthcare

Tambahkan pertanyaan **clinical safety**: apakah pesan error dapat disalahartikan oleh pengguna sebagai diagnosis?

---

## 7. Tone review

Checklist organisasi sering mencakup **norma komunikasi**: kritik pada kode, bukan orang; gunakan saran konkret.

---

## 8. Kesalahan umum

- Checklist terlalu panjang sehingga tidak pernah dibaca utuh.
- Checkbox dicentang tanpa verifikasi—budaya percaya semaunya.
- Tidak ada jalur eskalasi ketika reviewer dan author berselisih.

---

## 9. Ringkasan

Checklist review adalah **alat mentralisasi bias** dan **mengangkat standar minimum** pada setiap merge. Dokumen ini termasuk yang sering dibuka junior engineer saat pertama kali mereview senior—dan oleh tim keamanan saat menilai gate SDLC.

---

## 10. Adaptasi berdasarkan risiko

Gunakan **checklist pendek** untuk perubahan dokumentasi saja dan **checklist panjang** ketika menyentuh autentikasi—menghindari fatigue reviewer pada PR rendah risiko tanpa mengorbankan kedalaman pada PR kritis.

---

## 11. Bukti pembelajaran lintas incident

Cantumkan poin pembelajaran dari incident terbaru sebagai pengingat review (“cek timeout downstream”)—menjadikan checklist hidup tanpa menjadi dokumen yang tidak pernah dibaca utuh.

---

## 12. Automatisasi sebagian

Serahkan item yang bisa dicek oleh bot (lint, coverage minimum) kepada CI—checklist manusia seharusnya tidak menduplikasi tugas robot tanpa nilai tambah.

---

## 13. Bahasa inklusif dan budaya psikologis aman

Ingatkan reviewer untuk membedakan kritik pada **desain dan kode**, menyediakan saran patch atau pseudocode ketika memungkinkan—meningkatkan kecepatan iterasi tanpa merusak moral tim.

---

## 14. Rotasi checklist owner

Tetapkan orang yang bertanggung jawab menyegarkan checklist setelah perubahan kebijakan keamanan atau standar pengujian—mencegah checklist menjadi dokumen museologi.

---

## 15. Metrik efektivitas review

Hitung rasio defect yang lolos merge versus temuan review untuk mengukur apakah checklist membantu—bukan untuk menyalahkan individu tetapi untuk menyempurnakan template.
