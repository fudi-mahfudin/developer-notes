# ADR (Architecture Decision Record)

Panduan ini menjelaskan **apa itu ADR**, **format Michael Nygard**, **kapan menulis ADR**, **hubungan dengan HLD/TSD**, serta **kesalahan** yang membuat catatan keputusan tidak dapat ditemukan saat dibutuhkan.

---

## 1. Definisi singkat

**ADR (Architecture Decision Record)** adalah dokumen pendek yang menangkap **keputusan arsitektur penting** beserta konteks, opsi yang dipertimbangkan, keputusan, dan konsekuensi. ADR menjawab **“mengapa kita memilih ini”** dalam teks yang dapat diaudit—bukan hanya diagram.

---

## 2. Mengapa ADR sering dibuka

Saat refactor atau incident, engineer bertanya **“siapa yang memutuskan pola ini?”**. ADR memberi jawaban dengan **alasan**, bukan hanya asumsi dari kode mati.

---

## 3. Format klasik

Judul: `ADR-014: Gunakan Kafka untuk domain events referral`

Isi umum:

1. **Status** — proposed/accepted/deprecated/superseded  
2. **Context** — kekuatan dan kelemahan situasi  
3. **Decision** — pilihan yang diambil  
4. **Consequences** — positif, negatif, risiko residual  

---

## 4. Kapan menulis ADR

- Memilih teknologi sulit dibalik (message broker, DB, framework UI besar).
- Trade-off performa vs konsistensi yang kontroversial.
- Integrasi dengan vendor kesehatan yang mengunci kontrak bertahun-tahun.

Tidak perlu ADR untuk pemilihan nama variabel kecil.

---

## 5. Nomor dan lokasi

Simpan ADR di repo `docs/adr/` dengan nomor monoton atau tanggal—**supersede** dengan ADR baru daripada menghapus lama.

---

## 6. Hubungan dokumen lain

HLD menggambarkan sistem; ADR menjelaskan **garis besar keputusan** yang membentuk HLD. TSD untuk fitur dapat merujuk ADR yang relevan.

---

## 7. Proses review

ADR proposal dibahas di **architecture review** singkat; persetujuan dua senior engineer atau arsitek sesuai kebijakan.

---

## 8. Kesalahan umum

- ADR ditulis **setelah** implementasi tanpa mencatat opsi yang ditolak—kehilangan pembelajaran.
- Terlalu panjang—bukan essay.
- Tidak ada status sehingga pembaca tidak tahu apakah masih berlaku.

---

## 9. Ringkasan

ADR adalah **log keputusan** untuk sistem yang kompleks. Dokumen ini sering dibuka saat onboarding arsitektur baru atau saat tim merencanakan migrasi besar—menghindari debat berulang tanpa konteks historis.

---

## 10. Template minimal yang disarankan

Gunakan struktur pendek: judul dengan nomor, status, konteks, keputusan, konsekuensi—opsional tambahkan “alternatif ditolak” sebagai bullet dengan alasan satu kalimat tiap opsi.

---

## 11. Hubungan superseding

Saat ADR baru menggantikan yang lama, tautan dua arah antara dokumen—membantu pembaca melihat evolusi keputusan tanpa menghapus sejarah yang mungkin masih relevan untuk audit.

---

## 12. Review dengan non-teknis

Untuk keputusan yang mempengaruhi compliance, libatkan stakeholder non-engineering dalam komentar ringkas—menghindari penyesalan “kenapa tidak ditanyakan ke legal?”.

---

## 13. Penyimpanan bersama kode

Menyimpan ADR di repo Git membolehkan PR review pada keputusan—wiki boleh menjadi indeks tetapi bukan satu-satunya lokasi untuk tim yang menghargai diff historis.

---

## 14. Ukuran dan ritme

Jangan menulis ADR untuk setiap bugfix kecil—fokus pada keputusan dengan **biaya pembalikan tinggi** atau dampak lintas tim yang luas.

---

## 15. Edukasi tim produk

Berikan seminar singkat tentang cara membaca ADR agar PM memahami trade-off tanpa menghadiri semua diskusi teknik mendalam—meningkatkan empati prioritas roadmap.
