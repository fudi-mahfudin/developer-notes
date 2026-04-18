# Dokumentasi CI/CD

Panduan ini menjelaskan **apa yang dimaksud dokumentasi CI/CD**, **komponen pipeline**, **promosi lingkungan**, **rollback**, observabilitas deployment, serta **kesalahan** yang membuat pipeline menjadi kotak hitam bagi developer.

---

## 1. Definisi singkat

**CI/CD documentation** menjelaskan **bagaimana kode bergerak dari commit hingga produksi**: tahapan build, tes, analisis statis, packaging artefak, deployment ke staging/produksi, approval gate, strategi rollback, dan siapa yang bertanggung jawab pada kegagalan.

CI (Continuous Integration) mengintegrasikan perubahan dengan cepat; CD (Continuous Delivery/Deployment) mengotomatisasi promosi rilis.

---

## 2. Mengapa sangat sering dirujuk

Developer membuka dokumentasi CI/CD ketika **pipeline gagal**, saat menambahkan **job baru**, atau saat incident menanyakan **versi apa yang berjalan**. Dokumen ini mengurangi waktu debug “kenapa deploy macet?”.

---

## 3. Komponen yang harus dijelaskan

1. **Trigger** — push ke branch, tag, jadwal cron.
2. **Stages** — lint, unit test, integration, security scan.
3. **Artefak** — image container, bundle front-end, SBOM.
4. **Secrets** — dari mana diambil (vault), rotasi.
5. **Environment mapping** — branch/tag mana ke staging/prod.
6. **Approval** — siapa menyetujui promosi produksi.
7. **Rollback** — langkah kanonik dan batas risiko data.

---

## 4. Pipeline as code

Simpan definisi pipeline (`Jenkinsfile`, GitHub Actions workflow, GitLab CI) di repo dengan **versi**—dokumentasi merujuk ke path file tersebut sebagai sumber kebenaran.

---

## 5. Keamanan supply chain

Dokumentasikan **signing image**, verifikasi digest, dan scanning CVE gate—penting untuk healthcare enterprise.

---

## 6. Observabilitas deploy

Tautkan pipeline ke dashboard durasi job dan **deployment markers** pada APM untuk korelasi regresi.

---

## 7. Feature flags vs CD

Jika menggunakan flag, dokumentasikan **default** dan **siapa** mengubah flag produksi—CD sering mengirim kode “mati” yang diaktifkan terpisah.

---

## 8. Kesalahan umum

- Hanya screenshot pipeline tanpa penjelasan variabel lingkungan.
- Tidak ada runbook ketika pipeline infrastructure sendiri rusak.
- Promosi manual tanpa catatan—mustahil audit “siapa deploy?”.

---

## 9. Healthcare

Untuk sistem terregulasi, dokumentasikan **lingkungan validasi** yang terpisah dari staging eksperimen—dan siapa boleh menyentuhnya.

---

## 10. Ringkasan

Dokumentasi CI/CD adalah **manual operator untuk otomasi**: tanpa itu, pipeline menjadi ritual magis. Developer senior tetap membuka dokumen ini saat mendesain release train atau debugging gate yang gagal.

---

## 11. Diagram alir pipeline

Sertakan diagram sederhana yang menunjukkan gate dan paralelisasi job—membantu onboarding platform engineer baru tanpa membaca YAML berjam-jam pada hari pertama.

---

## 12. Kebijakan cache dan reproducibility

Dokumentasikan cara membersihkan cache pipeline ketika artefak korup atau tidak konsisten—masalah langka tetapi membingungkan tanpa panduan eksplisit.

---

## 13. Credential rotation

Cantumkan **frekuensi rotasi** token CI dan siapa pemiliknya—pipeline sering gagal diam-diam ketika secret kedaluwarsa pada akhir pekan.

---

## 14. Drill pemulihan pipeline

Lakukan latihan tahunan membangun pipeline dari nol pada lingkungan sandbox—menguji apakah dokumentasi mencukupi ketika infra CI mengalami kegagalan besar vendor.

---

## 15. Integrasi audit

Untuk industri terregulasi, cantumkan bagaimana log pipeline disimpan dan berapa lama—menyederhanakan jawaban auditor tentang integritas build.

---

## 16. Pemetaan lingkungan multi-region

Jika deployment multi-region, dokumentasikan gate tambahan dan urutan promosi untuk menghindari skew konfigurasi yang menyebabkan perilaku berbeda antar wilayah pengguna.
