# PRD (Product Requirements Document)

Dokumen ini menjelaskan **apa itu PRD**, **perbedaannya dengan BRD dan FRD/FSD**, **isi yang biasanya ada**, **siapa pemakainya**, serta **praktik yang membuat PRD bisa dieksekusi** oleh desain, engineering, dan QA.

---

## 1. Definisi singkat

**PRD (Product Requirements Document)** adalah dokumen yang mendeskripsikan **apa yang harus dibuat atau diubah pada produk** dari sudut pandang **produk dan pengguna**: masalah pengguna, perilaku fitur, alur (user flow), batasan, prioritas, dan **acceptance criteria** yang memungkinkan pengujian “selesai atau belum”.

PRD menjawab **“apa yang produk lakukan”** dan **“untuk siapa”**, sering dengan menyambungkan ke **BRD** (“mengapa secara bisnis”) tanpa menggantikan keputusan teknis detail di **TSD/LLD** atau kontrak API di **OpenAPI**.

---

## 2. PRD vs FRD vs FSD (penamaan di industri)

Organisasi memakai istilah berbeda:

- **FRD (Functional Requirements Document)** sering **sama domainnya dengan PRD** atau lebih “kering”: daftar requirement fungsional tanpa narasi produk.
- **FSD (Functional Specification Document)** kadang dipakai untuk **spesifikasi fungsional** yang lebih dekat implementasi atau untuk modul tertentu.

Praktik umum: **PRD** menekankan **konteks produk, prioritas, dan outcome**; **FRD/FSD** bisa menjadi **lampiran** atau bagian yang sangat terstruktur (ID requirement, prioritas MoSCoW). Yang penting adalah **satu sumber kebenaran** untuk perilaku yang disepakati—bukan ambigu titel file.

---

## 3. Tujuan utama PRD

1. **Menjembatani bisnis dan delivery**: menerjemahkan arah BRD menjadi **fitur dan perilaku** yang bisa dipecah jadi epic/story.
2. **Mengurangi revisi akhir sprint**: acceptance criteria yang jelas mengurangi interpretasi liar di development.
3. **Dasar QA dan UAT**: tester dapat memetakan skenario ke requirement PRD (sering dilengkapi RTM).
4. **Dasar diskusi UX**: scope layar dan edge case dapat dirundingkan dari dokumen yang sama.
5. **Pelacakan perubahan**: versi PRD mencatat apa yang masuk/keluar dari rilis tertentu.

---

## 4. Audiens dan pemakai utama

| Peran | Mengapa membaca PRD |
|--------|---------------------|
| **Product Owner / PM** | Pemilik prioritas; menyelaraskan stakeholder ke satu narasi fitur. |
| **UX / UI designer** | Memahami flow, error state, dan constraint untuk wireframe/prototype. |
| **Engineering** | Mengetahui perilaku yang harus diimplementasi; estimasi dan trade-off. |
| **QA / tester** | Menyusun test case dari acceptance criteria. |
| **Compliance / clinical safety** (healthcare, dll.) | Memastikan requirement privasi/alur klinis tercakup dalam ruang lingkup produk. |

Eksekutif bisnis biasanya membaca **ringkasan** PRD atau **slide**; detail penuh sering tidak diperlukan kecuali audit atau proyek regulasi berat.

---

## 5. Hubungan BRD → PRD → dokumen lain

| Sumber | Fokus |
|--------|--------|
| **BRD** | Outcome bisnis, KPI, scope bisnis tinggi. |
| **PRD** | Fitur, user journey, acceptance criteria, NFR tingkat produk (performa UX, aksesibilitas prioritas). |
| **SRS** (jika ada) | Formalisasi requirement sistem; bisa menyerap isi PRD untuk proyek yang mensyaratkan traceability ketat. |
| **Design** | Mockup/high-fidelity mengikat detail visual yang tidak selalu ditulis ulang di PRD jika ada link ke Figma/dsb. |
| **Technical spec** | Bagaimana sistem mencapai perilaku (arsitektur, API, skema)—di luar detail PRD. |

Alur sehat: setiap **epik besar** di PRD dapat ditunjuk balik ke **butir atau bab** di BRD yang membenarkan investasinya.

---

## 6. Isi tipikal sebuah PRD

Struktur bervariasi; kerangka berikut banyak dipakai:

1. **Ringkasan & latar belakang** — konteks singkat; referensi BRD jika ada.
2. **Tujuan dan metrik produk** — bagaimana sukses fitur diukur (bukan duplikasi penuh KPI bisnis kecuali relevan).
3. **Persona / pengguna utama** — siapa pemakai primer dan sekunder.
4. **Ruang lingkup & non-goals** — apa yang **tidak** dilakukan di rilis ini.
5. **User stories atau capability list** — format “Sebagai … saya ingin … agar …”.
6. **User flows** — langkah utama, cabang error, state kosong.
7. **Requirement fungsional** — bisa bernomor (FR-001) untuk RTM.
8. **Requirement non-fungsional (NFR)** — latensi yang dirasakan pengguna, ketersediaan layar kritis, audit log level produk, aksesibilitas prioritas.
9. **Acceptance criteria** — per story atau per requirement; preferensi format **Given/When/Then** atau checklist teruji.
10. **Dependensi** — integrasi ke sistem lain, flag fitur, data yang harus ada.
11. **Rilis & rollout** — phased rollout, experiment, fallback.
12. **Analitik & event** (opsional) — event naming jika produk berbasis data.
13. **Risiko produk & mitigasi** — adoption, kesalahan penggunaan klinis (domain-specific), dll.
14. **Lampiran** — diagram, daftar field, referensi regulasi ringkas.

---

## 7. Acceptance criteria: mengapa ini inti PRD

Tanpa acceptance criteria, PRD hanya narasi. Kriteria yang baik:

- **Terverifikasi** oleh observer ketiga (QA bisa menjalankan skenario).
- **Tidak ambigu** (“sistem cepat” buruk; “daftar pasien muncul dalam 2 detik pada jaringan referensi X” lebih baik jika terukur).
- **Mencakup negatif**: input tidak valid, timeout, izin ditolak.

Untuk healthcare: tambahkan skenario **keselamatan** (misalnya peringatan alergi konflik) sebagai AC eksplisit bila relevan.

---

## 8. Prioritas dan penandaan requirement

Metode umum:

- **MoSCoW** (Must / Should / Could / Won’t) untuk rilis.
- **Prioritas P0–P3** dengan definisi dampak bisnis.

PRD harus menyatakan apa yang **terpotong** jika timeline terdesak—biasanya **Could** pertama yang ditunda, bukan Must tanpa keputusan tertulis.

---

## 9. Versi, status, dan change control

- Cantumkan **versi**, **tanggal**, **pemilik dokumen**, dan **status** (Draft / Review / Approved).
- Perubahan material setelah persetujuan mengikuti **change request** atau catatan revisi agar engineering tidak bekerja pada PRD kadaluarsa.

---

## 10. Kesalahan umum

- **Mencampur solusi teknis mendalam** (skema DB, library) ke dalam PRD—membuat dokumen cepat basi saat opsi teknis berubah.
- **Tidak ada non-goals** — scope melebar tanpa diskusi.
- **AC generik** — “user bisa login” tanpa error handling dan lockout policy.
- **Duplikasi penuh BRD** — PRD memanjang tanpa menambah perilaku yang dapat diuji.
- **Tidak sinkron dengan backlog** — story di Jira bertentangan dengan PRD.

---

## 11. Ringkasan untuk engineer dan QA

- PRD adalah tempat mencari **perilaku yang disepakati** dan **batas keberhasilan fitur**.
- Jika ada konflik PRD vs desain vs komentar Slack, **urutan resolusi** harus diputuskan PO; PRD yang disetujui biasanya menang kecuali patch formal.
- QA memetakan **satu AC → satu atau lebih test case**; celah AC = celah cacat produksi.

---

## Referensi kerangka berpikir

Saat menulis atau meninjau PRD, uji dengan pertanyaan: **Siapa pengguna? Apa alurnya? Apa yang salah bisa terjadi? Bagaimana kita tahu “selesai”? Apa yang sengaja tidak kita bangun kali ini?** Jawaban yang konsisten menjadikan PRD alat delivery, bukan dokumen estetika.
