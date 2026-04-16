# SQL ADR untuk Keputusan Data Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa keputusan arsitektur data perlu dicatat
- apa itu ADR
- isi ADR yang sehat
- contoh keputusan data architecture

Tanpa decision record,
tim akan terus mengulang debat yang sama
dan lupa alasan di balik desain yang ada.

---

## 1. Apa Itu ADR?

ADR = Architecture Decision Record.

ADR adalah dokumen singkat
yang merekam:
- keputusan penting
- konteks
- opsi yang dipertimbangkan
- alasan memilih
- konsekuensi

ADR bukan novel.
ADR adalah catatan keputusan yang bisa diaudit.

---

## 2. Kenapa ADR Penting untuk Data Architecture?

Karena keputusan data biasanya mahal diubah:
- pilih schema pattern
- pilih partitioning strategy
- pilih replication model
- pilih retention policy
- pilih event vs state source of truth

Kalau alasan keputusan tidak didokumentasikan,
tim baru akan bingung:
- kenapa dulu begini?
- apakah masih relevan?
- apa trade-off yang sengaja diterima?

---

## 3. Keputusan yang Layak Dibuat ADR

Contoh:
- memakai UUID vs bigint
- memilih outbox pattern
- memakai read replica untuk reporting
- menentukan retention 24 bulan untuk audit log
- memilih append-only event log untuk domain tertentu

Tidak semua hal butuh ADR.
Tapi keputusan yang memengaruhi banyak tim / jangka panjang
sebaiknya direkam.

---

## 4. Struktur ADR yang Baik

Umumnya berisi:
- title
- status
- date
- context
- decision
- alternatives considered
- consequences

Kalau terlalu singkat,
alasannya kabur.
Kalau terlalu panjang,
orang malas membaca.

---

## 5. Context Harus Tajam

Bagian context harus menjawab:
- masalah apa yang sedang dihadapi?
- constraint apa yang ada?
- kebutuhan bisnis/operasional apa yang relevan?

Context yang lemah membuat ADR tidak berguna.

Contoh context buruk:
- "kami ingin sistem lebih baik"

Contoh context sehat:
- "query operasional aktif hanya memakai 6 bulan data terakhir,
  sementara audit harus menyimpan 24 bulan, sehingga tabel utama terus membesar
  dan maintenance memburuk."

---

## 6. Decision Harus Spesifik

Decision harus jelas,
bukan samar.

Contoh buruk:
- "kami akan meningkatkan performa data"

Contoh baik:
- "kami akan mempartisi `appointments` per bulan
  dan mengarsipkan partisi >18 bulan ke storage sekunder."

Keputusan kabur = ADR gagal.

---

## 7. Alternatives Considered

Bagian ini sangat penting.

Kenapa?
- menunjukkan keputusan tidak diambil asal
- menjelaskan trade-off
- membantu tim mengevaluasi ulang di masa depan

Contoh alternatif:
- tetap single table
- partition by month
- archive ke warehouse saja

Tanpa alternatif,
ADR terasa seperti dogma.

---

## 8. Consequences

Setiap keputusan ada harga.

ADR harus jujur soal:
- keuntungan
- biaya operasional
- kompleksitas baru
- risiko jangka panjang

Kalau consequences tidak ditulis,
tim mudah lupa bahwa setiap keputusan adalah trade-off.

---

## 9. Status ADR

Status umum:
- proposed
- accepted
- superseded
- deprecated

Ini membantu tim tahu:
- apakah ini masih aktif?
- apakah sudah diganti keputusan baru?

ADR tanpa status cepat jadi arsip membingungkan.

---

## 10. ADR Bukan Dokumentasi Desain Lengkap

ADR tidak menggantikan:
- HLD
- LLD
- runbook
- database documentation

ADR fokus pada:
- **kenapa** keputusan itu diambil

Dokumen lain lebih fokus ke:
- **apa** dan **bagaimana** implementasinya

---

## 11. Contoh Keputusan Data Architecture

Contoh yang layak ADR:
- menyimpan semua timestamp dalam UTC
- memakai outbox pattern untuk side effect lintas service
- memakai read replica hanya untuk non-critical analytics
- memilih `DECIMAL` untuk currency
- membatasi PII display lewat masking default

Hal-hal seperti ini
mempunyai dampak lintas tim dan jangka panjang.

---

## 12. ADR Mencegah Re-Discussion Tak Sehat

Tanpa ADR:
- engineer baru mempertanyakan ulang keputusan lama
- tim mengulang debat
- alasan sejarah hilang

Dengan ADR:
- diskusi bisa dimulai dari konteks yang ada,
  bukan nol lagi.

Ini sangat berguna saat tim bertumbuh.

---

## 13. ADR Harus Bisa Ditantang

ADR bukan kitab suci.

Keputusan lama bisa jadi tidak relevan lagi
karena:
- volume data berubah
- bisnis berubah
- teknologi berubah

Kalau perlu berubah,
buat ADR baru yang:
- merevisi
- atau menggantikan yang lama.

Tim yang sehat berani memperbarui keputusan,
bukan memuja masa lalu.

---

## 14. Contoh ADR Singkat: Read Replica

Context:
- dashboard analytics menekan primary
- query non-kritis mendominasi read load

Decision:
- arahkan query analytics non-kritis ke read replica
- critical read-after-write tetap ke primary

Consequences:
- primary lebih ringan
- tapi ada stale-read risk
- perlu monitoring replication lag

Itu contoh ADR yang jelas dan berguna.

---

## 15. Contoh ADR Singkat: Partitioning

Context:
- tabel `appointments` tumbuh 12% per bulan
- backup window makin panjang
- query operasional fokus 6 bulan terakhir

Decision:
- partition by month
- archive >18 bulan

Consequences:
- maintenance lebih mudah
- query hot-data lebih fokus
- kompleksitas schema/ops bertambah

Ini jauh lebih bernilai
daripada keputusan hanya hidup di chat lisan.

---

## 16. Kapan ADR Dibuat?

Idealnya:
- saat keputusan penting akan diambil,
atau
- segera setelah keputusan diambil jika belum sempat

Jangan tunggu 6 bulan sampai semua orang lupa konteks.

ADR yang ditulis terlalu telat
sering berubah jadi rekonstruksi ingatan,
bukan catatan keputusan.

---

## 17. Siapa yang Menulis?

Tidak harus arsitek formal.

Bisa:
- senior engineer
- tech lead
- DBA
- EM
- arsitek data

Yang penting:
- orang yang paham konteks
- dan bisa menulis trade-off dengan jujur

---

## 18. Anti-Pattern Umum

1. ADR terlalu panjang dan abstrak.
2. Tidak menulis alternatif.
3. Tidak menulis consequences.
4. ADR dibuat untuk keputusan sepele.
5. ADR lama tidak pernah diberi status baru saat sudah tidak relevan.

---

## 19. Best Practices

- buat ADR untuk keputusan yang mahal atau lintas tim.
- fokus pada konteks, keputusan, dan trade-off.
- gunakan bahasa spesifik.
- update status saat keputusan berubah.
- tautkan ADR ke dokumen teknis terkait.

---

## 20. Mini Latihan

Latihan:
1. Tentukan 3 keputusan data architecture yang layak jadi ADR.
2. Buat draft context untuk keputusan partitioning.
3. Tulis alternative considered untuk penggunaan read replica.
4. Jelaskan beda ADR dan HLD.
5. Jelaskan kapan ADR perlu diganti.

---

## 21. Jawaban Contoh Ringkas

ADR layak untuk:
- partitioning strategy
- read replica policy
- retention policy

ADR beda dengan HLD:
- ADR menjelaskan kenapa keputusan diambil
- HLD menjelaskan gambaran desain sistem

ADR perlu diganti saat:
- asumsi lama tidak lagi benar
- keputusan baru menggantikan yang lama

---

## 22. Checklist Kelulusan Topik 40

Kamu dianggap lulus jika bisa:
- menjelaskan fungsi ADR,
- membedakan ADR dari dokumen desain lain,
- menulis keputusan yang spesifik dan bisa diaudit,
- mencatat trade-off secara jujur,
- menjaga keputusan arsitektur tetap hidup dan dapat dievaluasi ulang.

---

## 23. Ringkasan Brutal

- Keputusan penting yang tidak dicatat
  akan berubah jadi mitos tim.
- ADR mencegah arsitektur ditopang oleh ingatan kabur dan ego senior.
