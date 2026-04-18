# Dokumentasi UAT (User Acceptance Testing)

Panduan ini menjelaskan **apa itu UAT**, **siapa pelakunya**, **perbedaan dengan QA internal**, **isi dokumentasi UAT**, serta **kesalahan** yang menyebabkan UAT menjadi pertemuan kosong tanpa keputusan.

---

## 1. Definisi singkat

**UAT (User Acceptance Testing)** adalah fase verifikasi di mana **pengguna bisnis atau perwakilan domain** (misalnya klinisi, staf rujukan) mengkonfirmasi bahwa sistem memenuhi **kebutuhan operasional** mereka sebelum go-live luas atau penandatanganan serah terima.

UAT berfokus pada **acceptance dari sudut pandang pengguna**, bukan pada cakupan teknis QA internal semata.

---

## 2. UAT vs QA

| Aspek | QA internal | UAT |
|--------|-------------|-----|
| Pelaku | QA engineer | Pengguna bisnis |
| Fokus | defect & regresi sesuai spec | kelayakan operasional & workflow |
| Lingkungan | staging terkendali | sering staging atau pilot terbatas |

---

## 3. Mengapa dokumentasi UAT penting

Menyediakan **bukti persetujuan**, daftar skenario, hasil pass/fail, dan eskalasi—penting untuk **kontrak** dan **governance klinis**.

---

## 4. Isi dokumen UAT tipikal

1. **Rencana UAT** — scope, kriteria masuk, jadwal, peran.
2. **Skenario UAT** — langkah dari sudut pandang pengguna.
3. **Data & akun** — sintetis/de-identified.
4. **Formulir hasil** — Pass/Fail, komentar, lampiran screenshot.
5. **Ringkasan eksekutif** — siap/tidak siap go-live.
6. **Daftar isu** — defect dialihkan ke Jira dengan prioritas.

---

## 5. Kriteria masuk UAT

Build stabil, defect kritis tertutup, data siap, pelatihan singkat pengguna.

---

## 6. Healthcare

Libatkan **clinical safety** untuk skenario yang berdampak pada peringatan pasien; hindari PHI nyata di formulir.

---

## 7. Persetujuan

Sign-off oleh sponsor bisnis atau peran yang ditunjuk kontrak—dokumentasikan nama dan tanggal.

---

## 8. Kesalahan umum

- UAT diisi oleh QA atas nama pengguna—menghancurkan legitimasi.
- Skenario terlalu teknis—pengguna tidak mengerti langkah.
- Tidak ada keputusan eksplisit go/no-go.

---

## 9. Ringkasan

Dokumentasi UAT adalah **rekaman persetujuan pengguna**—sering menjadi lampiran BAST atau gate release. Developer merujuknya ketika ada perdebatan “siapa yang menyetujui perilaku ini?” setelah go-live.

---

## 10. Peran fasilitator

Sediakan **fasilitator netral** yang membantu pengguna mengikuti skenario tanpa mengarahkan jawaban—menjaga validitas hasil UAT sebagai bukti operasional.

---

## 11. Pelacakan versi skenario

Nomori skenario UAT dengan **versi dokumen** sehingga perubahan PRD tidak membuat hasil sesi lama tidak dapat dibandingkan—catat delta antar versi di changelog UAT kecil.

---

## 12. Remote vs on-site

Untuk UAT jarak jauh, dokumentasikan **rekaman sesi** (jika diizinkan kebijakan) dan mekanisme berbagi layar—menunjukkan bahwa pengguna benar-benar mengoperasikan sistem, bukan sekadar menyetujui email.

---

## 13. Eskalasi

Jika UAT gagal, definisikan **timeline perbaikan** dan **siapa** yang bertanggung jawab mengkoordinasi patch sebelum sesi ulang—menghindari status “open-ended”.

---

## 14. Integrasi dengan pelatihan

Tautkan dokumen UAT ke **modul LMS** singkat yang harus diselesaikan pengguna sebelum sesi—mengurangi noise defect palsu akibat kesalahpahaman UI.

