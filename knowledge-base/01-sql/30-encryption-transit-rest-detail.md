# SQL Encryption in Transit dan at Rest - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- encryption in transit
- encryption at rest
- kenapa keduanya berbeda
- threat model dasar
- key management awareness

Kalau data pentingmu tidak dilindungi saat transit dan saat disimpan,
kamu sedang mengandalkan keberuntungan, bukan keamanan.

---

## 1. Kenapa Encryption Penting?

Database sering menyimpan:
- identitas user
- PII
- data transaksi
- audit log
- credential turunan

Jika data ini bocor,
dampaknya bisa:
- finansial
- reputasi
- hukum/compliance
- kepercayaan user hancur

Encryption adalah salah satu kontrol dasar.

---

## 2. Encryption in Transit

Ini berarti data dienkripsi
saat bergerak di jaringan.

Contoh jalur:
- app -> database
- database -> replica
- backup transfer
- admin tool -> database

Tanpa ini,
data bisa disadap di jalur komunikasi.

---

## 3. Encryption at Rest

Ini berarti data dienkripsi
saat disimpan di media/storage.

Contoh:
- data files
- volume/disk
- backup
- snapshot

Tanpa ini,
jika storage atau backup jatuh ke tangan salah,
data lebih mudah diakses.

---

## 4. Keduanya Berbeda

Banyak orang puas dengan salah satu.
Itu tidak cukup.

Contoh:
- at rest aktif, tapi koneksi app ke DB plaintext -> tetap berbahaya
- in transit aktif, tapi backup tidak terenkripsi -> tetap berbahaya

Keamanan yang matang harus melihat dua sisi ini.

---

## 5. Threat Model Sederhana

Encryption in transit melindungi dari:
- sniffing jaringan
- MITM tertentu jika TLS benar
- penyadapan antar layanan

Encryption at rest melindungi dari:
- pencurian disk/storage
- snapshot/backup jatuh ke pihak tak berwenang
- media disposal yang buruk

Pahami ancamannya,
jangan hanya mengejar checklist.

---

## 6. TLS untuk Koneksi Database

In transit biasanya diwujudkan dengan:
- TLS/SSL pada koneksi database

Prinsip:
- koneksi terenkripsi
- sertifikat diverifikasi
- jangan asal disable verification demi "cepat"

Kalau verification dimatikan sembarangan,
rasa amanmu menurun drastis.

---

## 7. Internal Network Bukan Alasan

Alasan buruk yang sering dipakai:
- "ini kan internal"

Objektifnya:
- internal network bukan tempat suci
- lateral movement itu nyata
- misconfiguration juga nyata

Jadi:
- internal traffic sensitif tetap layak dienkripsi.

---

## 8. Encryption at Rest pada Disk/Volume

Sering disediakan oleh platform/storage layer.

Ini membantu,
tapi tetap tanya:
- siapa pegang key?
- backup ikut terenkripsi?
- snapshot ikut terlindungi?

Jangan puas hanya karena ada checkbox "encrypted".

---

## 9. Backup Harus Ikut Dilindungi

Banyak tim fokus database utama,
tapi lupa:
- backup
- export
- dump
- file staging restore

Padahal di sanalah data sering tercecer.

Encryption yang matang
harus mencakup salinan data juga.

---

## 10. Key Management

Encryption tanpa manajemen key yang sehat
itu setengah matang.

Pertanyaan penting:
- key disimpan di mana?
- siapa yang bisa mengakses?
- bagaimana rotasi?
- bagaimana audit akses key?

Kalau key hardcoded atau tercecer,
encryption kehilangan banyak nilainya.

---

## 11. Application-Level Encryption

Kadang ada data yang sangat sensitif
dan butuh perlindungan ekstra.

Selain encryption at rest level storage,
beberapa field bisa dienkripsi di level aplikasi.

Namun ini menambah kompleksitas:
- search/filter sulit
- indexing sulit
- key handling lebih berat

Gunakan hanya jika memang ada justifikasi jelas.

---

## 12. Tokenization / Masking

Tidak semua kebutuhan privasi diselesaikan dengan encryption penuh.

Kadang perlu:
- masking
- tokenization
- redaction

Contoh:
- UI tidak perlu menampilkan full identifier
- log tidak perlu menyimpan nilai sensitif penuh

Encryption dan masking sering saling melengkapi.

---

## 13. Performance Trade-off

Encryption punya biaya,
tapi biasanya biaya itu layak.

Jangan terlalu cepat memakai alasan:
- "takut performa turun"

Tanpa pengukuran,
itu cuma alasan malas.

Keputusan harus berbasis:
- sensitivitas data
- kewajiban compliance
- hasil pengujian nyata

---

## 14. Studi Kasus Healthcare

Data healthcare sangat sensitif:
- patient profile
- diagnosis
- contact info
- appointment history

Minimal:
- koneksi app ke DB terenkripsi
- backup terenkripsi
- akses key terbatas
- field sensitif di log dimasking

Jika ini tidak ada,
postur keamananmu lemah.

---

## 15. Rotation dan Lifecycle

Kunci dan sertifikat tidak boleh dianggap abadi.

Pikirkan:
- rotasi berkala
- expiry handling
- rollout tanpa downtime besar
- monitoring masa berlaku sertifikat

Insiden "sertifikat expired" itu klasik,
dan memalukan kalau terjadi karena lalai.

---

## 16. Restore dan Encryption

Saat restore:
- apakah environment target bisa mengakses key?
- apakah backup terenkripsi dapat dipulihkan aman?
- apakah data sensitif tetap terlindungi di environment non-prod?

Restore aman harus memperhitungkan encryption juga,
bukan cuma "DB berhasil naik".

---

## 17. Compliance Perspective

Banyak domain regulated menuntut:
- proteksi transit
- proteksi storage
- akses terbatas
- audit trail

Jadi encryption bukan hanya best practice teknis,
tapi juga bagian dari kewajiban tata kelola.

---

## 18. Anti-Pattern Umum

1. Hanya andalkan internal network tanpa TLS.
2. Backup tidak terenkripsi.
3. Sertifikat diverifikasi secara longgar atau dimatikan.
4. Key disimpan sembarangan.
5. Menganggap encryption at rest cukup untuk semua risiko.

---

## 19. Best Practices

- aktifkan encryption in transit untuk koneksi sensitif.
- pastikan encryption at rest untuk DB dan backup.
- kelola key secara terpusat dan teraudit.
- mask data sensitif di log dan UI.
- review skenario restore dan non-prod exposure.

---

## 20. Mini Latihan

Latihan:
1. Jelaskan beda encryption in transit dan at rest.
2. Jelaskan kenapa backup harus ikut terenkripsi.
3. Jelaskan risiko mematikan certificate verification.
4. Tentukan kapan application-level encryption layak dipertimbangkan.
5. Buat checklist proteksi data dasar untuk sistem healthcare.

---

## 21. Jawaban Contoh Ringkas

In transit:
- melindungi data saat dikirim.

At rest:
- melindungi data saat disimpan.

Backup harus terenkripsi karena:
- backup adalah salinan lengkap data sensitif,
- sering dipindah/disimpan di lokasi berbeda,
- sering dilupakan tapi sangat berharga bagi attacker.

---

## 22. Checklist Kelulusan Topik 30

Kamu dianggap lulus jika bisa:
- menjelaskan perbedaan transit vs rest encryption,
- memahami kenapa keduanya dibutuhkan,
- menilai pentingnya key management,
- memasukkan backup dan restore ke model perlindungan,
- berpikir threat-model oriented, bukan sekadar checklist.

---

## 23. Ringkasan Brutal

- Encryption yang setengah-setengah itu rasa aman palsu.
- Data sensitif butuh perlindungan menyeluruh,
  bukan checkbox compliance kosong.
