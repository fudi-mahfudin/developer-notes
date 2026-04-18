# BRD (Business Requirements Document)

Dokumen ini menjelaskan **apa itu BRD**, **untuk siapa**, **isi tipikalnya**, **cara memakainya dalam alur produk–engineering**, serta **kesalahan umum** yang membuat BRD tidak efektif.

---

## 1. Definisi singkat

**BRD (Business Requirements Document)** adalah dokumen yang mendeskripsikan **kebutuhan dari sudut pandang bisnis**: masalah yang ingin diselesaikan, peluang, ruang lingkup, stakeholder, aturan bisnis tingkat tinggi, dan cara mengukur keberhasilan (misalnya KPI). BRD menjawab pertanyaan **“mengapa”** dan **“apa yang ingin dicapai secara bisnis”**, bukan detail **“bagaimana membangun sistem secara teknis”**.

BRD menjadi **anchor** bagi diskusi produk, prioritas investasi, dan kesepakatan antar pemilik bisnis sebelum detail fungsional/teknis diturunkan ke dokumen lain (misalnya PRD, SRS, atau backlog).

---

## 2. Tujuan utama BRD

1. **Menyelaraskan pemahaman** antara sponsor bisnis, manajemen, produk, dan pihak lain tentang **tujuan inisiatif**.
2. **Membatasi ruang lingkup** secara eksplisit agar ekspektasi tidak melebar tanpa kontrol (“scope creep”).
3. **Menjembatani bahasa bisnis dan eksekusi**: BRD menjelaskan **nilai dan outcome**, bukan stack teknologi.
4. **Menyediakan dasar pengukuran**: KPI, target, dan definisi sukses yang dapat diaudit setelah rilis.
5. **Mendukung keputusan investasi**: membantu menjawab apakah proyek layak dilanjutkan, ditunda, atau dipangkas fiturnya.

---

## 3. Audiens dan pemakai utama

| Peran | Mengapa membaca BRD |
|--------|----------------------|
| **Sponsor / eksekutif** | Validasi alignment strategi, budget, risiko bisnis. |
| **Product owner / PM** | Menurunkan prioritas backlog dan acceptance criteria tingkat bisnis. |
| **Business analyst** | Menjaga konsistensi requirement dengan proses bisnis aktual. |
| **Compliance / legal** (jika ada) | Memastikan constraint regulasi tercermin di level kebutuhan bisnis. |
| **Engineering lead** (awal fase) | Memahami konteks bisnis sebelum estimasi kasar atau spike teknis—bukan untuk detail implementasi di BRD. |

Developer **tidak** mengharapkan BRD berisi diagram API atau skema database; mereka mengandalkan dokumen turunan (PRD, TSD, LLD). Namun membaca BRD tetap berguna agar fitur yang dibuat **tidak salah konteks**.

---

## 4. Hubungan BRD dengan dokumen lain

- **BRD → PRD / FRD / FSD**: BRD menjelaskan **outcome bisnis dan scope**; PRD/FRD mendetailkan **perilaku produk, user journey, dan acceptance criteria** yang dapat diuji.
- **BRD → SRS**: SRS lebih formal dan sistem-oriented; sering dipakai di proyek regulasi berat. BRD tetap di atas sebagai **justifikasi bisnis** untuk requirement di SRS.
- **BRD dan roadmap**: Roadmap bisa merujuk BRD sebagai **sumber tujuan per fase**; BRD tidak menggantikan roadmap operasional harian.

Aturan praktis: **satu keputusan bisnis utama** di BRD harus bisa dilacak ke **satu atau lebih epik/story** di backlog tanpa ambigu.

---

## 5. Isi tipikal sebuah BRD

Struktur bisa disesuaikan organisasi, tetapi kerangka umum berikut **sering dipakai**:

1. **Executive summary** — ringkasan satu halaman untuk pembaca sibuk.
2. **Latar belakang & masalah bisnis** — data, pain point, peluang pasar atau operasional.
3. **Tujuan bisnis dan KPI** — measurable, time-bound jika memungkinkan.
4. **Ruang lingkup** — **in-scope** dan **out-of-scope** secara eksplisit.
5. **Stakeholder & peran** — RACI atau daftar pemilik keputusan.
6. **As-is vs to-be** (opsional namun kuat) — proses hari ini vs yang diinginkan.
7. **Business rules tingkat tinggi** — contoh: “hanya role X yang boleh menyetujui”, tanpa pseudo-code.
8. **Asumsi dan ketergantungan** — sistem lain, kontrak vendor, kebijakan internal.
9. **Risiko bisnis & mitigasi** — bukan risiko teknis semata.
10. **Kriteria keberhasilan & pengukuran pasca-implementasi** — cara evaluasi setelah go-live.

Lampiran umum: **glosarium istilah bisnis**, referensi regulasi singkat, atau konteks industri (misalnya layanan kesehatan: privasi pasien sebagai constraint bisnis).

---

## 6. KPI dan definisi sukses di BRD

KPI yang baik untuk BRD biasanya:

- **Terukur**: angka, proporsi, atau durasi yang jelas definisinya.
- **Relevan dengan masalah**: tidak sekadar vanity metric.
- **Realistis**: ada baseline atau asumsi data awal.

Contoh pola penulisan: “Mengurangi waktu pemrosesan klaim manual dari **X hari** menjadi **Y hari** untuk **Z%** kasus dalam **kuartal tertentu**.” Hindari KPI yang hanya berbunyi “sistem cepat” tanpa definisi operasional.

---

## 7. Ruang lingkup (scope): mengapa harus keras kepala

**In-scope** menjawab apa yang akan diinvestasikan dalam inisiatif ini. **Out-of-scope** sama pentingnya: fitur yang **sengaja tidak** dilakukan sekarang untuk menghindari ekspektasi salah.

Tips:

- Tulis out-of-scope dengan bahasa netral (“tidak termasuk dalam fase 1”) bukan menyalahkan stakeholder.
- Hubungkan item out-of-scope ke **future consideration** atau roadmap terpisah jika perlu.

Tanpa bagian ini, BRD mudah menjadi dokumen aspirasi tanpa batas yang sulit di-estimasi oleh produk dan engineering.

---

## 8. Business rules vs requirement teknis

Di BRD, **business rule** menjelaskan **kebijakan atau constraint bisnis** (siapa boleh apa, batas nominal, jam operasi layanan pelanggan). Requirement teknis—format API, retries, pagination—tidak menjadi inti BRD.

Jika sebuah aturan bisnis rumit, BRD bisa merangkumnya; detail turunan bisa dipindahkan ke PRD atau dokumen domain.

---

## 9. Proses penyusunan dan persetujuan

Alur umum:

1. **Discovery** — wawancara stakeholder, tinjau data, workshop singkat.
2. **Draft BRD** — versi untuk komentar internal produk/bisnis.
3. **Review stakeholder** — iterasi sampai tidak ada kontradiksi besar pada tujuan dan scope.
4. **Sign-off** sponsor atau pemilik budget — formalitas bervariasi antar organisasi.
5. **Hand-off ke PRD/backlog** — BRD menjadi referensi untuk breakdown pekerjaan.

Versi dokumen dan tanggal revisi harus dicatat agar tim tidak mereferensi BRD kadaluarsa.

---

## 10. Kesalahan umum

- **Mencampur BRD dengan spesifikasi UI/teknis** — membuat dokumen sulit disetujui eksekutif dan tidak stabil.
- **KPI kosong atau tidak terukur** — BRD terasa seperti dokumen politik tanpa akuntabilitas.
- **Scope kabur** — menyebabkan estimasi meleset dan konflik di tengah sprint.
- **Tidak ada pemilik bisnis** — BRD “mengambang” tanpa siapa pun yang bertanggung jawab atas keputusan.
- **Asumsi tidak tertulis** — kemudian disalahartikan oleh tim engineering sebagai requirement implisit.

---

## 11. Ringkasan untuk developer

BRD **bukan** tempat mencari signature endpoint. BRD **adalah** tempat memahami **mengapa fitur ada**, **siapa yang diuntungkan**, dan **apa yang dianggap sukses**. Dokumen ini membantu menghindari penyelesaian yang “benar secara teknis” tetapi **salah secara bisnis**.

---

## Referensi kerangka berpikir

Saat membaca atau menulis BRD, ajukan pertanyaan: **Apa masalah bisnisnya? Siapa yang memutuskan? Apa yang di luar scope? Bagaimana kita tahu berhasil?** Jawaban yang konsisten di BRD akan memperkuat seluruh rantai dokumen di bawahnya.
