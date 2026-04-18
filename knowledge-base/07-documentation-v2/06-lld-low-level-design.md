# LLD (Low-Level Design)

Dokumen ini menjelaskan **apa itu LLD**, **kapan LLD dibutuhkan**, **perbedaannya dengan HLD dan TSD**, struktur isi yang umum, serta **kesalahan** yang membuat LLD tidak terpakai di tim.

---

## 1. Definisi singkat

**LLD (Low-Level Design)** adalah spesifikasi pada **level modul atau komponen implementasi**: struktur kelas/paket, skema basis data detail, algoritma utama, kontrak internal antar modul, penanganan error pada satu layanan, dan sometime pseudocode atau diagram urutan untuk jalur rumit.

LLD menjawab **“bagaimana bagian dalam satu layanan atau bounded context diimplementasi dengan benar”**—lebih dalam dari HLD yang hanya menunjukkan container.

---

## 2. Tujuan utama LLD

1. **Menyebar pengetahuan** dalam tim agar tidak terkunci pada satu engineer.
2. **Mempercepat review kode** dengan konteks desain yang sudah disepakati.
3. **Mengurangi bug integrasi internal** antar modul dalam satu repo besar.
4. **Menjembatani QA** untuk memahami titik cabang logika yang harus diuji.
5. **Menyediakan basis refaktor** ketika modul dipindahkan atau dipecah.

---

## 3. Kapan LLD diperlukan

- Fitur dengan **logika domain rumit** (state machine klinis, perhitungan dosering).
- Perubahan **skema data** yang menyentuh banyak query dan migrasi berisiko.
- **Optimasi kinerja** yang mengubah struktur data internal.
- Tim besar dengan **parallel development** pada satu layanan.

Untuk CRUD sederhana, LLD ekstensif sering **tidak cost-effective**—cukup TSD ringkas + PR ringkas.

---

## 4. Audiens

| Peran | Manfaat |
|--------|---------|
| **Engineer implementasi** | Panduan modul yang jelas. |
| **Reviewer** | Memverifikasi kesesuaian dengan desain. |
| **QA** | Mengetahui cabang edge case. |
| **Maintainer masa depan** | Memahami trade-off historis. |

---

## 5. LLD vs HLD vs TSD

- **HLD**: banyak layanan; siapa berbicara dengan siapa.
- **TSD**: solusi fitur/rilis—bisa mencakup beberapa layanan tetapi masih berorientasi deliverable.
- **LLD**: **di dalam satu layanan** atau subset modul—detail kelas, tabel, transaksi.

---

## 6. Isi tipikal LLD

1. **Identifikasi modul** — paket, namespace, ownership.
2. **Diagram kelas / sequence** untuk jalur rumit.
3. **Skema basis data** — tabel, indeks, constraint, strategi migrasi.
4. **Kontrak internal** — interface antar lapisan (domain/application/infrastructure).
5. **Transaksi dan konsistensi** — boundary transaksi, saga/step jika ada.
6. **Penanganan error** — pemetaan exception ke kode API publik.
7. **Performa** — query plan yang diharapkan, pola cache lokal.
8. **Keamanan modul** — validasi input, sanitasi, pemeriksaan otorisasi di lapisan mana.
9. **Testabilitas** — hook untuk unit test, data fixture.

---

## 7. Praktik baik

- Tulis LLD **sebelum** implementasi besar dimulai; revisi setelah spike jika temuan mengubah desain.
- Simpan LLD **di dekat kode** (folder `docs/` modul) agar mudah diperbarui.
- Gunakan **nomor requirement** dari SRS jika organisasi mensyaratkan traceability.

---

## 8. Kesalahan umum

- **LLD meniru kode baris demi baris** — menjadi basi segera setelah merge pertama.
- **Tidak ada versi** — sulit tahu LLD mana yang berlaku untuk rilis tertentu.
- **Mengabaikan migrasi** — skema baru tanpa rencana rollback.
- **Detail UI** di LLD backend—seharusnya di spec desain/PRD.

---

## 9. Hubungan dengan pengujian

LLD yang baik memetakan **titik cabang** ke **kasus uji negatif**—misalnya duplikasi pasien, transisi status ilegal, timeout downstream.

---

## 10. Ringkasan

LLD adalah **cetak biru dalam satu layanan**: dokumen ini sering menjadi **referensi harian developer** ketika menyentuh domain kompleks seperti healthcare, di mana kesalahan state atau skema dapat berakibat pada keselamatan pasien atau audit gagal—maka diskuali untuk fitur trivial, LLD tetap relevan sebagai investasi komunikasi tim.

---

## 11. Kolaborasi dengan dokumentasi API

Untuk layanan dengan kontrak publik, **OpenAPI** sering menjadi sumber kebenaran struktur payload. LLD menjelaskan **bagaimana** kontrak itu dipenuhi secara internal—validasi tambahan, agregasi, atau transformasi—sehingga reviewer dapat memastikan tidak ada perilaku “tersembunyi” di luar spesifikasi yang terdokumentasi dengan baik.
