# Contoh BRD — Enterprise Healthcare (Fiksi)

> **Disclaimer:** Ini adalah **contoh ilustratif** untuk pembelajaran. Nama organisasi, angka, dan kebijakan bersifat fiksi. Kebutuhan hukum/regulasi sebenarnya (misalnya HIPAA di AS, GDPR di UE, atau peraturan kesehatan Indonesia) **harus diverifikasi** oleh legal dan compliance di organisasi Anda.

**Judul inisiatif:** Program Integrasi Rekam Medis Terpadu jaringan rumah sakit “Nusantara Health Alliance” (NHA)  
**Versi dokumen:** 1.2  
**Tanggal:** 18 April 2026  
**Klasifikasi:** Internal — Restricted (berisi referensi data sensitif)

---

## Kontrol dokumen

| Peran | Nama | Tindakan |
|--------|------|----------|
| Pemilik bisnis | VP Clinical Operations | Persetujuan akhir |
| Kontributor utama | Head of Digital Health, CFO Office | Review |
| Penyusun | Enterprise PMO | Menyusun dan memelihara versi |

**Riwayat revisi**

| Versi | Tanggal | Perubahan utama |
|--------|---------|-----------------|
| 1.0 | … | Draft awal |
| 1.1 | … | Penyesuaian scope fase 2 |
| 1.2 | 18 Apr 2026 | KPI dan dependensi vendor diperjelas |

---

## 1. Executive summary

Jaringan NHA mengoperasikan **12 fasilitas** (3 rumah sakit tipe A, 9 rumah sakit/klinik terintegrasi) dengan **rencana medis elektronik (EHR)** yang saat ini **terfragmentasi** antar lokasi. Fragmentasi menyebabkan:

- duplikasi pemeriksaan dan risiko keselamatan pasien,
- penundaan perawatan saat rujukan antar-site,
- beban administrasi tinggi untuk rekonsiliasi data dan klaim,
- visibilitas terbatas bagi manajemen mengenai outcome klinis dan utilisasi.

Inisiatif ini bertujuan menyelaraskan **catatan klinis inti** dan **alur rujukan antar-site** dalam **enam kuartal** pertama (fase 1), dengan fondasi **privasi, audit, dan keselamatan pasien** yang dapat diaudit oleh regulator dan akreditasi.

**Investasi bisnis yang diminta (indikatif):** dialokasikan dalam portofolio transformasi digital FY2026–2027 (detail finansial pada lampiran finance, bukan bagian BRD ini).

---

## 2. Latar belakang dan masalah bisnis

### 2.1 Situasi saat ini (as-is)

- Beberapa lokasi memakai vendor EHR berbeda; pertukaran data banyak bergantung pada **PDF, fax, dan email** untuk rujukan.
- Indeks pasien tidak selalu **unik lintas-site**; terjadi kasus duplikasi identitas yang harus diselesaikan manual.
- Tim klaim melaporkan **penolakan klaim** akibat ketidakkonsistenan dokumentasi lintas lokasi.

### 2.2 Tekanan eksternal dan internal

- **Akreditasi** mensyaratkan jejak dokumentasi perawatan yang konsisten.
- **Privasi pasien**: organisasi beroperasi di yurisdiksi dengan persyaratan perlindungan data kesehatan yang ketat; pelanggaran dapat berujung pada **sanksi finansional dan reputasi**.
- **Staf klinis** mengalami burnout akibat beban dokumentasi ganda.

---

## 3. Tujuan bisnis dan KPI

| KPI | Baseline (estimasi) | Target fase 1 | Cara pengukuran |
|-----|---------------------|---------------|-----------------|
| Ketersediaan ringkasan kunjungan terbaru untuk dokumen rujukan antar-site | Di bawah 40% dalam 24 jam | Minimal 85% dalam 24 jam | Sampling audit rekam + log alur kerja |
| Insiden keselamatan pasien terkait **informasi tidak lengkap saat transfer perawatan** | Baseline internal | ↓ ≥ 30% YoY | Pelaporan keselamatan terstandarisasi |
| Waktu administratif rekonsiliasi identitas pasien (per episode rujukan) | X jam | ≤ Y jam | Time-motion study triwulanan |
| Kepercayaan stakeholder klinis (survey) | Skor dasar | +15 poin skala tertutup | Survey anonim kuartalan |

**Catatan BRD:** Definisi operasional tiap KPI diturunkan ke **PRD/measurement playbook**; BRD memegang **intent** dan **target arah**.

---

## 4. Ruang lingkup

### 4.1 Dalam ruang lingkup (in-scope) — fase 1

1. **Master pasien enterprise**: kebijakan deduplikasi tingkat jaringan (business rules), governance pemilik data.
2. **Ringkasan klinis minimal** untuk kontinuitas perawatan antar-site (diagnosis aktif, alergi, obat aktif, hasil kritikal terbaru — detail daftar di PRD).
3. **Workflow rujukan** yang terstandarisasi antar lokasi dalam jaringan NHA.
4. **Audit trail bisnis**: siapa mengakses ringkasan pasien untuk tujuan perawatan, dengan retention policy tingkat bisnis.
5. **Pelatihan dan adoption** untuk peran klinis utama dan administrasi rujukan.

### 4.2 Di luar ruang lingkup (out-of-scope) — fase 1

1. Penggantian total semua modul EHR menjadi satu vendor tunggal di seluruh site (dinilai sebagai **inisiatif terpisah** dengan BRD sendiri).
2. Integrasi penuh dengan **semua** perangkat bedside dan laboratorium tier-3 pada semua lokasi (beberapa akan masuk **fase 2**).
3. Model revenue-cycle lengkap dan otomasi klaim mendalam (hanya **interfaces bisnis** yang mendukung dokumentasi konsisten).
4. Penyimpanan data untuk penelitian sekunder tanpa governance IRB/etik terpisah.

### 4.3 Phase 2 (arah, bukan komitmen anggaran)

- Perluasan integrasi laboratorium/imaging prioritas tinggi.
- Dashboard populasi kesehatan untuk layanan populasi tertentu (butuh BRD tambahan jika scope bisnis berubah material).

---

## 5. Stakeholder dan pemilik keputusan

| Stakeholder | Minat utama | Peran dalam keputusan |
|-------------|-------------|------------------------|
| Chief Medical Officer | Keselamatan pasien, standar perawatan | Persetujuan kebijakan klinis |
| CIO / VP Digital | Arsitektur, vendor, keamanan | Persetujuan dependensi teknis tingkat tinggi |
| CFO | ROI, biaya berkelanjutan | Persetujuan threshold investasi |
| Chief Nursing Officer | Workflow perawat, beban dokumentasi | Validasi adoption |
| Privacy Officer / DPO | Kepatuhan privasi | Veto pada pelanggaran policy |
| Patient Advocacy Council | Pengalaman pasien | Masukan requirement bisnis |

**RACI disederhanakan:** Pemilik bisnis untuk outcome adalah **VP Clinical Operations**; Product Owner bertanggung jawab menyelaraskan BRD ke backlog.

---

## 6. Business rules tingkat tinggi (contoh)

1. **Prinsip minim necessary:** Hanya data klinis yang **dibutuhkan** untuk kontinuitas perawatan pada konteks rujukan yang dibagikan lintas-site sesuai kebijakan.

2. **Break-the-glass (darurat):** Akses luar pola normal dalam keadaan darurat medis mengikuti **prosedur bisnis** yang mendefinisikan review pasca-akses dan eskalasi—detail prosedur operasional tidak mengisi BRD secara penuh tetapi **keberadaan aturan** dicatat di sini.

3. **Persetujuan pasien:** Di mana jurisdiksi mensyaratkan consent untuk pertukaran data tertentu, **alur bisnis consent** harus dipatuhi sebelum berbagi di luar pola standar internal.

4. **Retensi:** Rekam medis mengikuti **retensi hukum** minimum; BRD menyatakan bahwa sistem harus mendukung retention classification tanpa mendefinisikan skema database.

5. **Segregasi peran bisnis:** Pemisahan tugas antara **otorisasi akses** dan **audit** ditetapkan sebagai prinsip tata kelola.

---

## 7. Asumsi dan ketergantungan

### Asumsi

- Seluruh site akan mengikuti **standar identifikasi pasien** enterprise dalam jadwal migrasi yang disepakati.
- Organisasi menyediakan **change management** dan jam pelatihan yang dilindungi untuk unit kritis.

### Ketergantungan

- **Vendor EHR utama** dan kemampuan interoperabilitas (FHIR/API) sesuai kontrak.
- **Infrastruktur identitas** (SSO, MFA) untuk peran klinis dan administratif.
- Keputusan **data residency** dan vendor cloud yang disetujui compliance.

---

## 8. Risiko bisnis (bukan daftar risiko teknis lengkap)

| Risiko | Dampak | Mitigasi tingkat bisnis |
|--------|--------|-------------------------|
| Penolakan adopsi oleh klinisi | Gagal capai KPI utama | Program champion, UX research, penyederhanaan tugas |
| Vendor delay | Mundurnya go-live | Milestone kontrak dan escrow deliverables |
| Pelanggaran privasi | Sanksi, reputasi | Privacy by design sebagai gate; incident response plan |
| Scope creep ke “ganti semua EHR” | Biaya melampaui manfaat | BRD ini mengunci batas fase; perubahan besar via CR formal |

---

## 9. Kriteria keberhasilan (definition of done bisnis)

Fase 1 dianggap **sukses secara bisnis** jika:

1. KPI utama pada bagian 3 **tercapai atau mendekati target** dengan metode pengukuran yang disepakati.
2. **Tidak ada finding material** dari tinjauan compliance terkait kontrol akses bisnis yang didefinisikan dalam BRD (catatan: finding teknis dapat ditindaklanjuti terpisah).
3. Survey adopsi menunjukkan **peningkatan** kepercayaan berkelanjutan pada alur rujukan terpadu.

---

## 10. Persetujuan

| Nama | Jabatan | Tanda / Tanggal |
|------|---------|-----------------|
| … | VP Clinical Operations | |
| … | CIO | |
| … | CFO | |

---

## Lampiran (referensi, bukan bagian kontrak BRD)

- LAMPIRAN A: Peta capability vs fase (high-level)
- LAMPIRAN B: Daftar singkatan (EHR, PHI, MFA, dll.)

**Akhir contoh dokumen.**
