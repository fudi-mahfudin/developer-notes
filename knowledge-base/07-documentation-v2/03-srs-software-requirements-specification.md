# SRS (Software Requirements Specification)

Dokumen ini menjelaskan **apa itu SRS**, **perbedaannya dengan BRD dan PRD**, **kapan SRS dipakai**, **isi tipikal**, **relasi ke pengujian dan regulasi**, serta **kesalahan umum** yang membuat SRS sulit diaudit atau dieksekusi.

---

## 1. Definisi singkat

**SRS (Software Requirements Specification)** adalah dokumen formal yang mendeskripsikan **apa yang harus disediakan oleh sistem perangkat lunak** dalam bahasa yang **dapat diverifikasi**: perilaku fungsional, antarmuka, data, dan sering kali **requirement non-fungsional** (keamanan, kinerja, ketersediaan), beserta **acceptance criteria** atau kriteria keberhasilan yang dapat diuji.

SRS menjawab **“apa yang sistem harus lakukan”** pada level **spesifikasi sistem**, sering lebih terstruktur dan terindeks daripada PRD narratif, sehingga cocok untuk **traceability** ke desain, implementasi, dan kasus uji.

---

## 2. Tujuan utama SRS

1. **Kontrak requirement** antara pemilik produk, engineering, QA, dan pihak audit (internal/regulator) tentang perilaku sistem.
2. **Menurunkan ambiguitas** dengan identifier requirement unik (misalnya SYS-REQ-104).
3. **Dasar RTM**: memetakan setiap requirement ke desain, kode, dan tes.
4. **Dasar baseline versi**: perubahan requirement dikontrol melalui change control.
5. **Mendukung domain terregulasi** (misalnya healthtech, finreg) di mana bukti **design control** atau dokumentasi formal dibutuhkan.

---

## 3. Audiens utama

| Peran | Mengapa membaca SRS |
|--------|---------------------|
| **Engineering / arsitek** | Implementasi dan estimasi; boundary sistem. |
| **QA / validation** | Menyusun test protocol dan trace ke requirement. |
| **Product / BA** | Memastikan requirement mencerminkan niat PRD tanpa kontradiksi. |
| **Compliance / regulatory** | Memverifikasi kontrol privasi, audit, keselamatan pasien (domain health). |
| **Vendor / integrator** | Memahami scope kontrak jika sistem dibeli/dibangun pihak ketiga. |

---

## 4. SRS vs BRD vs PRD

| Dokumen | Fokus tipikal |
|---------|----------------|
| **BRD** | Mengapa investasi, KPI bisnis, scope bisnis. |
| **PRD** | Fitur produk, alur pengguna, AC tingkat produk. |
| **SRS** | Spesifikasi sistem yang **terukur dan terindeks**; antarmuka eksternal; NFR; konsistensi data. |

SRS **bukan** pengganti PRD pada semua organisasi: banyak tim agile menggabungkan PRD + backlog. SRS menjadi penting ketika **formalitas**, **audit**, atau **multi-vendor** mensyaratkan satu baseline tertulis.

---

## 5. Isi tipikal SRS

Struktur mengikuti standar seperti IEEE (adaptif), umumnya mencakup:

1. **Pendahuluan** — tujuan dokumen, ruang lingkup sistem, definisi istilah, referensi (BRD/PRD).
2. **Deskripsi umum** — perspektif produk, fungsi utama, karakteristik pengguna, asumsi dan keterbatasan.
3. **Requirement fungsional** — bernomor; input/proses/output; prioritas; dependency antar requirement.
4. **Requirement non-fungsional** — kinerja, skalabilitas, keamanan, privasi, ketersediaan, observabilitas.
5. **Antarmuka eksternal** — API, format pesan, protokol, integrasi ke sistem lain.
6. **Model data / entitas logis** — ringkasan entitas dan aturan integritas (detail fisik bisa di LLD/ERD).
7. **Keamanan dan privasi** — kontrol akses, enkripsi dalam transit/at rest (level kebijakan), audit.
8. **Keandalan dan pemulihan** — RTO/RPO jika relevan level bisnis.
9. **Appendix** — diagram konteks, state machine, protokol error.

---

## 6. Properti requirement yang baik

- **Atomic** — satu requirement menyatakan satu hal yang dapat diuji (hindari “dan” besar yang mengaburkan).
- **Terverifikasi** — tester dapat memutuskan pass/fail tanpa opini subjektif semata.
- **Konsisten** — tidak bertentangan dengan requirement lain dalam dokumen yang sama.
- **Lacak** — ID stabil; perubahan versi dicatat; alasan perubahan tersimpan.

Gunakan kata **shall** (atau konvensi “harus”) untuk obligation, **should** untuk rekomendasi, dan hindari frasa kabur seperti “user-friendly” tanpa definisi terukur.

---

## 7. Non-functional requirements di SRS

NFR sering menjadi sumber konflik. Contoh pola:

- **Kinerja:** “95 persentil latency operasi X di bawah N detik pada beban referensi Y.”
- **Keamanan:** “Semua akses ke data PHI harus mencatat user, waktu, tujuan klinis (jika policy meminta).”
- **Ketersediaan:** “SLA layanan kritis Z persen uptime per kuartal (definisi incident).”

Tanpa baseline lingkungan uji, NFR sulit dibuktikan—SRS harus menyebut **asumsi lingkungan** atau merujuk dokumen lingkungan validasi.

---

## 8. Versi dan change control

SRS memiliki **nomor versi mayor/minor**. Perubahan material:

- Ditinjau oleh pemilik requirement dan engineering lead.
- Dampak pada **regresi**, **tes**, dan **integrasi** dinilai sebelum merge ke baseline.

Catatan perubahan (change log dokumen) harus menjelaskan **requirement yang berubah** dan **alasan**.

---

## 9. Hubungan ke pengujian

Setiap requirement fungsional/NFR idealnya memiliki:

- **Metode verifikasi** (analisis, demonstrasi, inspeksi, tes).
- **Referensi ke kasus uji** (di RTM atau alat ALM).

Tanpa itu, audit akan menemukan **orphan requirement** atau **orphan test**.

---

## 10. Kesalahan umum

- **Menyalin PRD tanpa struktur ID** — duplikasi panjang tanpa kemampuan traceability.
- **Requirement teknis campur dengan desain implementasi** — SRS mengunci perilaku; pilihan library tidak perlu di SRS kecuali kontrak.
- **Konflik antar bab** — contoh: retensi data berbeda di dua section.
- **Scope kabur** — tidak jelas sistem boundary vs manual process.
- **Menyembunyikan asumsi** — menyebabkan kesalahan interpretasi saat integrasi.

---

## 11. Ringkasan untuk praktisi

SRS adalah **baseline perilaku sistem** yang memungkinkan **engineering** membangun, **QA** memverifikasi, dan **audit** melacak alur dari bisnis hingga tes. Gunakan SRS ketika formalitas atau skala integrasi mensyaratkan satu sumber kebenaran yang terkendali versi—notasi “dokumen yang sering dipakai” mengingatkan kita bahwa tanpa disiplin, SRS menjadi estetika tanpa eksekusi.
