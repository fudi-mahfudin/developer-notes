# SQL Data Masking, Tokenization, dan PII - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu PII
- data masking
- tokenization
- kapan masking cukup
- kapan tokenization lebih tepat
- dampak ke query, debugging, dan keamanan

Kalau timmu menyimpan dan menampilkan data sensitif apa adanya
tanpa kontrol,
itu bukan "praktis".
Itu ceroboh.

---

## 1. Apa Itu PII?

PII = Personally Identifiable Information.

Contoh:
- nama lengkap
- nomor telepon
- email
- alamat
- nomor identitas
- tanggal lahir
- medical record number tertentu

Di domain sensitif seperti healthcare,
bahkan kombinasi beberapa field
bisa membuat identitas orang mudah dikenali.

---

## 2. Kenapa PII Harus Dilindungi?

Karena kebocoran PII bisa menyebabkan:
- pelanggaran privasi
- penyalahgunaan identitas
- kerugian reputasi
- sanksi regulasi
- hilangnya kepercayaan user

Data sensitif bukan sekadar "kolom biasa".
Cara menyimpan, menampilkan, dan melogging-nya harus beda.

---

## 3. Data Masking

Masking berarti:
- menyembunyikan sebagian data
- tapi masih mempertahankan bentuk tertentu

Contoh:
- nomor telepon `081234567890` jadi `0812******90`
- email `andi@mail.com` jadi `a***@mail.com`

Tujuannya:
- user/operator tetap bisa mengenali konteks secukupnya
- tanpa melihat nilai penuh

---

## 4. Kapan Masking Cocok?

Masking cocok untuk:
- UI operasional
- dashboard admin
- log aplikasi
- export terbatas
- customer support tooling

Prinsip:
- tampilkan hanya yang benar-benar perlu.

Jika operator hanya perlu verifikasi 2 digit akhir,
jangan tampilkan 12 digit penuh.

---

## 5. Tokenization

Tokenization berarti:
- mengganti nilai sensitif dengan token pengganti
- token itu tidak memuat makna asli secara langsung

Contoh:
- `MRN-839201` diganti jadi `tok_8ab23f...`

Token bisa dipakai sebagai referensi internal,
sementara nilai asli disimpan di tempat yang lebih terlindungi.

---

## 6. Masking vs Tokenization

Perbedaannya:
- masking masih menyimpan kemiripan bentuk asli
- tokenization mengganti nilai dengan representasi baru

Masking:
- cocok untuk display/logging

Tokenization:
- cocok untuk memisahkan penggunaan operasional
  dari data asli yang sangat sensitif

Jangan campur dua istilah ini.

---

## 7. Static Masking vs Dynamic Masking

### Static Masking

Data dimasking permanen pada salinan tertentu.

Cocok untuk:
- data test
- sandbox
- training environment

### Dynamic Masking

Data asli tetap ada,
tapi tampilan dibatasi tergantung role/konteks.

Cocok untuk:
- aplikasi operasional
- role-based display

---

## 8. Data Non-Production

Ini area yang sering lalai.

Banyak kebocoran bukan dari produksi,
tapi dari:
- staging
- dump lokal
- QA environment
- laptop developer

Kalau non-prod memakai data asli tanpa masking,
permukaan risiko membengkak.

---

## 9. Masking di Log

Log sering jadi sumber kebocoran paling bodoh.

Contoh buruk:
- log request body penuh
- log query parameter mentah
- log error yang menyertakan nomor identitas lengkap

Best practice:
- mask data sensitif sebelum masuk log
- log secukupnya untuk debug, bukan semua hal

---

## 10. Tokenization dan Queryability

Tokenization punya trade-off:
- lebih aman
- tapi query langsung ke nilai asli jadi sulit

Pertanyaan penting:
- apakah sistem masih perlu lookup berdasarkan nilai asli?
- apakah perlu deterministic token?
- apakah pencarian dilakukan di secure vault/mapper?

Kalau tidak dipikirkan dari awal,
tokenization bisa mempersulit operasi.

---

## 11. Deterministic vs Random Token

Secara konsep:
- deterministic token menghasilkan token konsisten untuk input sama
- random token bisa berbeda tiap kali

Deterministic membantu lookup/join tertentu,
tapi punya trade-off keamanan dan pola data.

Random lebih aman untuk beberapa use case,
tapi lebih sulit untuk matching.

Pilih berdasarkan kebutuhan bisnis dan threat model.

---

## 12. Masking Bukan Encryption

Masking:
- fokus ke presentasi/eksposur terbatas

Encryption:
- fokus ke perlindungan storage/transit

Keduanya berbeda.
Masking tidak menggantikan encryption.
Encryption juga tidak otomatis menggantikan masking.

Sistem matang sering butuh keduanya.

---

## 13. PII Classification

Tidak semua data sensitif levelnya sama.

Klasifikasi membantu:
- mana yang wajib dimasking
- mana yang wajib ditokenisasi
- mana yang boleh tampil terbatas

Contoh level:
- public
- internal
- confidential
- highly sensitive

Kalau tidak ada klasifikasi,
tim akan inkonsisten.

---

## 14. Studi Kasus Healthcare

Data berikut sangat sensitif:
- nama pasien
- nomor telepon
- tanggal lahir
- alamat
- nomor rekam medis
- detail diagnosis

Contoh kebijakan:
- UI antrean hanya tampil inisial + nomor antrean
- dashboard support hanya tampil nomor telepon termasking
- export audit memakai token untuk identifier tertentu

Itu jauh lebih sehat
daripada membiarkan semua staf melihat data penuh.

---

## 15. Debugging vs Privacy

Argumen buruk yang sering muncul:
- "kalau dimasking nanti susah debug"

Jawaban objektif:
- debug itu penting,
  tapi tidak membenarkan kebocoran data penuh ke semua tempat.

Solusi:
- role terbatas untuk unmask yang benar-benar perlu
- akses teraudit
- environment khusus dan terkontrol

Privasi tidak boleh dikorbankan demi kemalasan debugging.

---

## 16. Query Design dengan Data Masked

Kalau data sudah dimasking di layer tertentu,
pastikan:
- sorting/filtering tidak bergantung pada nilai tampilan palsu
- nilai asli dan tampilan terpisah jelas

Contoh:
- tampilkan phone masked di UI,
  tapi filter tetap dilakukan pada field aman di backend.

Jangan bikin logika bisnis berdasarkan string masked.

---

## 17. Token Vault / Mapping Layer

Tokenization yang serius sering butuh:
- mapping store
- vault
- akses terbatas
- audit lookup

Kalau tokenization dilakukan asal,
tapi mapping disimpan sembarangan,
manfaatnya runtuh.

---

## 18. Retention dan PII

Semakin lama PII disimpan,
semakin besar risiko.

Maka masking/tokenization harus dipikirkan bersama:
- retention
- purge
- archive

Pertanyaan:
- apakah semua PII masih perlu disimpan penuh setelah 2 tahun?
- apakah sebagian bisa dianonimkan?

Ini penting secara teknis dan compliance.

---

## 19. Anti-Pattern Umum

1. Pakai data produksi asli di staging tanpa masking.
2. Log PII mentah demi "kemudahan debug".
3. Semua role bisa melihat data penuh.
4. Menganggap masking = encryption.
5. Tokenization dilakukan tanpa mapping security yang benar.

---

## 20. Best Practices

- klasifikasikan data sensitif.
- mask display dan log secara default.
- gunakan tokenization untuk data sangat sensitif jika ada justifikasi.
- audit siapa yang bisa unmask.
- lindungi juga non-production data.

---

## 21. Mini Latihan

Latihan:
1. Sebutkan contoh PII di sistem healthcare.
2. Jelaskan beda masking dan tokenization.
3. Buat kebijakan tampilan data pasien untuk role support.
4. Jelaskan risiko menggunakan data produksi mentah di staging.
5. Tentukan data mana yang cocok dimasking vs ditokenisasi.

---

## 22. Jawaban Contoh Ringkas

Masking:
- sembunyikan sebagian nilai untuk display/log.

Tokenization:
- ganti nilai sensitif dengan token baru.

Staging dengan data asli berbahaya karena:
- permukaan akses lebih luas,
- kontrol sering lebih longgar,
- kebocoran jadi lebih mungkin.

---

## 23. Checklist Kelulusan Topik 31

Kamu dianggap lulus jika bisa:
- mengidentifikasi PII,
- menjelaskan masking vs tokenization,
- menerapkan prinsip minimal exposure,
- melindungi log dan non-prod data,
- menilai trade-off usability vs privacy dengan dewasa.

---

## 24. Ringkasan Brutal

- Kalau semua orang bisa lihat data sensitif penuh,
  sistemmu tidak aman.
- Bukan karena hack canggih.
  Karena desain aksesnya malas.
