# RTM (Requirement Traceability Matrix)

Panduan ini menjelaskan **apa itu RTM**, **manfaat audit dan delivery**, **komponen kolom**, **hubungan ke test plan/case**, serta **kesalahan** yang membuat matriks pelacakan menjadi formalitas kosong.

---

## 1. Definisi singkat

**RTM (Requirement Traceability Matrix)** adalah tabel yang menghubungkan **requirement bisnis/teknis** dengan artefak turunan: desain, kode (opsional), **kasus uji**, hasil eksekusi, dan kadang risiko atau kontrol regulasi.

RTM menjawab pertanyaan **“requirement X diverifikasi oleh apa?”** dan sebaliknya **“test case Y melindungi requirement mana?”**.

---

## 2. Mengapa RTM sering dipakai

- **Audit regulasi** (healthtech, medis) mensyaratkan bukti pelacakan end-to-end.
- **QA** memastikan tidak ada requirement Must tanpa tes.
- **PM** mendeteksi scope creep melalui requirement tanpa desain.

---

## 3. Arah pelacakan

- **Forward trace:** BRD/PRD/SRS → desain → tes.
- **Backward trace:** dari defect atau hasil uji kembali ke requirement sumber.

Keduanya penting untuk investigasi regresi.

---

## 4. Kolom umum

| Kolom | Makna |
|-------|--------|
| Req ID | SYS-FR-002 |
| Deskripsi singkat | Teks ringkas |
| Sumber | SRS §4.2 |
| Desain | Link HLD/TSD |
| Test ID | TC-REF-011 |
| Metode | Test / Demo / Analysis |
| Status verifikasi | Pass/Baseline |
| Catatan | Build, lingkungan |

---

## 5. Level granularitas

RTM bisa di level **requirement** atau **acceptance criteria**—pilih satu konsisten; terlalu halus meningkatkan biaya pemeliharaan.

---

## 6. Tooling

Spreadsheet, ALM (Jira Xray, TestRail), atau database khusus validasi. Integrasi otomatis dari pipeline dapat mengisi status tes—tetap perlu kurasi manual untuk metode non-otomatis.

---

## 7. Healthcare

Tambahkan kolom **clinical risk** atau **patient safety impact** untuk prioritisasi verifikasi.

---

## 8. Hubungan change control

Saat requirement berubah, RTM harus diperbarui bersamaan—jika tidak, audit menemukan ketidaksesuaian baseline.

---

## 9. Kesalahan umum

- RTM hanya dibuat menjelang audit—drift besar terhadap realitas.
- Test ID generik (“lihat regression”) tanpa kasus konkret.
- Duplikasi requirement ID antar dokumen tanpa mapping.

---

## 10. Ringkasan

RTM adalah **jaring pengaman dokumentasi**: menghubungkan niat requirement dengan bukti verifikasi. Developer merujuk RTM ketika diminta menunjukkan **test apa yang menutup** sebuah bug regulasi atau keselamatan pasien—maka dokumen ini sangat sering muncul di gate pra-rilis enterprise.

---

## 11. Kolom tambahan untuk multi-layanan

Jika satu requirement menyentuh beberapa layanan, tambahkan kolom **Service** atau **Component** agar traceability tidak berhenti pada satu repo—berguna saat incident menanyakan “siapa pemilik requirement yang terdampak?”.

---

## 12. Baseline dan snapshot

Simpan snapshot RTM per rilis dalam format **PDF atau CSV dinamis** yang tidak dapat diedit sembarangan setelah sign-off—mencegah kontroversi “kapan baris ini berubah?” saat audit mendadak.

---

## 13. Coverage vs meaningfulness

RTM yang penuh tetapi berisi tes lemah tetap gagal audit substansi. Pasangkan RTM dengan **review kualitas** kasus uji untuk requirement berisiko tinggi.

---

## 14. Automasi ekstraksi

Beberapa organisasi men-generate RTM dari tool ALM—validasi tetap manual untuk memastikan mapping tidak otomatis salah pada merge field.

