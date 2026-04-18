# Test Case & Test Scenario

Panduan ini menjelaskan **definisi test scenario vs test case**, **struktur field**, **hubungan ke requirement**, praktik **otomatisasi**, serta **kesalahan** yang membuat kasus uji tidak dapat dieksekusi ulang.

---

## 1. Definisi singkat

**Test scenario** adalah narasi **alur bisnis atau pengguna** yang ingin diverifikasi, misalnya “staf rujukan menyelesaikan antrian sebelum SLA habis”. **Test case** adalah turunan yang lebih terperinci dengan **langkah**, **data masukan**, dan **hasil yang diharapkan** yang dapat diobservasi.

Satu scenario dapat memecah menjadi beberapa test case positif/negatif.

---

## 2. Mengapa dokumen ini sering dipakai

QA mengeksekusi test case setiap hari; developer merujuknya saat **repro bug** atau saat menulis tes otomatis. Kasus yang baik mengurangi noise komunikasi “coba lagi”.

---

## 3. Field standar test case

| Field | Deskripsi |
|-------|-----------|
| ID unik | Contoh: TC-REF-021 |
| Requirement ref | SYS-FR-002 |
| Preconditions | Data awal, peran user |
| Steps | Langkah bernomor |
| Test data | Nilai spesifik |
| Expected result | Observable outcome |
| Actual result | Diisi saat eksekusi |
| Status | Pass/Fail/Blocked |
| Environment | staging/build |

---

## 4. Positif vs negatif

- **Positif**: mengonfirmasi perilaku sesuai spesifikasi pada input valid.
- **Negatif**: input tidak valid, izin ditolak, timeout downstream—sering terlupakan tetapi kritis untuk healthcare.

---

## 5. Given / When / Then

Format BDD membantu menyelaraskan test case dengan acceptance criteria PRD dan dengan tes otomatis Gherkin.

---

## 6. Otomasi

Prioritaskan otomasi untuk **regresi tinggi** dan **alur kritis keselamatan**. Catat **selector stabil** dan hindari mengandalkan data yang berubah acak tanpa fixture.

---

## 7. Data sensitif

Jangan menaruh PHI nyata di spreadsheet test—gunakan **synthetic patients** dengan ID internal.

---

## 8. Versi dan pemeliharaan

Saat UI berubah, update step sebelum sprint berikutnya; defect sering berasal dari test case usang.

---

## 9. Kesalahan umum

- Langkah ambigu (“klik tombol yang benar”).
- Expected result subjektif (“tampak baik”).
- Tidak ada cleanup data—menyebabkan flaky test.
- Duplikasi TC tanpa merujuk scenario induk.

---

## 10. Ringkasan

Test scenario memberi **konteks**, test case memberi **instruksi yang dapat diikuti**. Keduanya adalah dokumen operasional QA yang paling sering dibuka selama hardening rilis—dan menjadi dasar **bukti verifikasi** pada audit produk terregulasi.

---

## 11. Prioritas dan pemetaan risiko

Tandai test case dengan **tingkat risiko bisnis/klinis** agar regresi partial tetap menjaga cakupan jalur berbahaya—meskipun waktu tidak mencukupi untuk menjalankan seluruh suite manual.

---

## 12. Flaky tests

Untuk tes otomatis yang tidak stabil, dokumentasikan **penanda flaky**, pemilik perbaikan, dan apakah caso tersebut memblokir pipeline—menghindari kebiasaan “rerun sampai hijau” tanpa akar masalah.

---

## 13. Pelacakan perubahan

Setiap perubahan langkah harus memiliki **nomor revisi** kecil pada dokumen agar penguji tidak mencampur versi lama dan baru selama sprint paralel.

---

## 14. Integrasi dengan RTM

Cantumkan **Req ID** pada header test case sehingga pembaruan requirement dapat memicu review kasus terkait secara sistematis.
