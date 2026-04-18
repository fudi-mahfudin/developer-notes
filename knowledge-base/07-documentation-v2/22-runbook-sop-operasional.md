# Runbook & SOP Operasional

Panduan ini menjelaskan **definisi runbook dan SOP**, **kapan masing-masing dipakai**, **isi standar**, **hubungan dengan on-call**, serta **kesalahan** yang membuat prosedur darurat tidak dapat diikuti di bawah tekanan.

---

## 1. Definisi singkat

**Runbook** adalah panduan langkah-demi-langkah untuk **kejadian operasional** tertentu: incident produksi, failover, rotasi kunci, scaling darurat, atau pemulihan database.  
**SOP (Standard Operating Procedure)** lebih luas dan sering mencakup proses bisnis/regulasi—jalankan backup harian, onboarding akses, penanganan permintaan data pasien.

Keduanya adalah dokumentasi yang **sangat sering dibuka** saat pager berbunyi.

---

## 2. Mengapa penting

Pada incident, kognisi menurun—runbook mengurangi kesalahan prosedural dan mempercepat mitigasi. Untuk healthcare, menunda respons dapat berarti risiko pasien atau pelanggaran SLA kontrak.

---

## 3. Isi runbook incident tipikal

1. **Judul & pemicu alert** — query PromQL atau nama alarm.
2. **Severity & dampak** — siapa yang harus dipanggil.
3. **Diagnosis awal** — grafik/dashboard yang ditinjau.
4. **Mitigasi aman** — langkah berurutan dengan peringatan destructive.
5. **Rollback / workaround** — jika ada.
6. **Komunikasi** — template status internal/eksternal.
7. **Pasca-insiden** — referensi template postmortem.

---

## 4. Isi SOP operasional non-incident

1. **Tujuan & ruang lingkup**  
2. **Peran bertanggung jawab**  
3. **Langkah prosedural** dengan titik kontrol  
4. **Referensi regulasi** jika ada  
5. **Audit trail** — log yang harus disimpan  

---

## 5. Versi dan latihan

Runbook harus **berversi** dan diuji melalui **game day** berkala—prosedur yang tidak pernah dilatih sering salah.

---

## 6. Akses dan rahasia

Cantumkan **siapa** yang memiliki kredensial break-glass dan bagaimana aktivitasnya diaudit—tanpa menulis secret di dokumen.

---

## 7. Kesalahan umum

- Langkah mengasumsikan pengetahuan implisit (“restart seperti biasa”).
- Tidak ada **perintah salin-tempel** yang telah diuji.
- Kontak on-call kedaluwarsa.

---

## 8. Ringkasan

Runbook/SOP adalah **instruksi darurat dan operasi rutin** yang stabil saat manusia tidak stabil. Developer platform dan on-call membuka dokumen ini lebih sering daripada hampir semua dokumen strategis lainnya.

---

## 9. Variasi tingkat kedalaman

Sediakan **quick path** satu halaman untuk mitigasi awal dan **deep path** dengan diagram untuk engineer yang tidak familier dengan subsistem—membantu rotasi on-call lintas tim.

---

## 10. Koordinasi komunikasi pasien/klinis

Pada healthcare, cantumkan kontak **clinical ops** atau protokol komunikasi ketika workaround mempengaruhi data yang dilihat pengguna medis—teknologi tidak boleh mengabaikan jalur komunikasi medis sah.

---

## 11. Dependensi tool eksternal

Catat versi CLI (`kubectl`, `aws`) yang ditest dengan runbook—ketidaksesuaian versi sering menjadi penyebab langkah “gagal tanpa alasan”.

---

## 12. Latihan tabletop

Jadwalkan tabletop triwulan dengan skenario kartu (misalnya “vendor SMS down + lonjakan DLQ”) untuk menguji kejelasan bahasa—bukan hanya infra readiness.

---

## 13. Penandaan runbook kedaluwarsa

Jika subsistem pensiun, arahkan pembaca ke runbook pengganti atau proses permanen untuk menghindari mitigasi legacy berbahaya.

---

## 14. Integrasi dengan sistem paging

Cantumkan link langsung ke dashboard alarm yang dirujuk alert—mengurangi navigasi manual saat stres tinggi.
