# ADR untuk Keputusan Arsitektur - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu ADR
- kenapa keputusan arsitektur perlu dicatat
- struktur ADR yang efektif
- bagaimana ADR membantu maintainability, alignment, dan governance teknis

Banyak tim membuat keputusan penting
secara lisan,
di chat,
atau di meeting,
lalu beberapa bulan kemudian
semua orang lupa:
- kenapa pilihan itu diambil
- alternatif apa yang ditolak
- asumsi apa yang berlaku saat itu

ADR hadir untuk mencegah amnesia teknis.

ADR bukan dokumen birokratis untuk pamer.
ADR adalah catatan keputusan
agar masa depan tidak perlu menebak masa lalu.

---

## 1. Apa Itu ADR?

ADR berarti:
- Architecture Decision Record

Ini adalah dokumen ringkas
yang mencatat:
- keputusan arsitektur penting
- konteks saat keputusan dibuat
- opsi yang dipertimbangkan
- alasan pemilihan
- konsekuensi keputusan itu

Fungsinya sederhana:
- menjaga memori keputusan teknis

ADR yang baik
lebih fokus pada reasoning
daripada dekorasi.

---

## 2. Kenapa ADR Penting?

Karena keputusan arsitektur
jarang netral.

Setiap pilihan membawa:
- manfaat
- biaya
- constraint
- trade-off

Tanpa catatan,
tim di masa depan sering bertanya:
- kenapa kita pilih ini?
- kenapa tidak pakai opsi lain?
- apakah alasan itu masih berlaku?

Jika jawabannya hanya:
- "kayaknya dulu begini"

itu tanda organisasi teknis
tidak punya memori yang sehat.

---

## 3. ADR Bukan Hanya untuk Sistem Besar

Ada salah paham umum:
- ADR hanya untuk enterprise raksasa

Salah.

ADR berguna setiap kali
keputusan arsitektur:
- cukup penting
- cukup mahal untuk dibalik
- cukup berdampak lintas tim/modul

Contoh:
- pilih async vs sync
- pilih multi-tenant isolation model
- pilih DB strategy
- pilih auth approach
- pilih caching model

Tidak semua keputusan perlu ADR.
Tapi keputusan yang mengubah shape sistem?
Sering sangat layak dicatat.

---

## 4. What Counts as Architecture Decision?

Bukan hanya:
- microservices vs monolith

Keputusan arsitektur juga bisa berupa:
- event bus atau direct API
- outbox dipakai atau tidak
- satu database per tenant atau shared schema
- REST vs GraphQL
- adopt queue untuk workflow tertentu
- gunakan feature flag framework tertentu

Intinya:
- keputusan yang memengaruhi struktur, evolusi,
  operasi, atau governance sistem

Kalau efeknya jangka panjang,
kemungkinan ADR layak dibuat.

---

## 5. Struktur ADR yang Efektif

ADR yang efektif umumnya punya:
- title
- status
- context
- decision
- alternatives considered
- consequences

Opsional:
- assumptions
- risks
- follow-up actions

Yang penting:
- ringkas
- jelas
- bisa dipahami engineer lain

ADR bukan esai akademik.

---

## 6. Context Matters

Bagian context sering paling penting.

Karena keputusan yang tampak aneh hari ini
mungkin sangat masuk akal
dalam konteks masa lalu.

Misal:
- tim kecil
- deadline ketat
- partner API tidak stabil
- kebutuhan audit regulasi tinggi

Tanpa context,
keputusan terlihat arbitrary.

Padahal keputusan teknis yang waras
selalu hidup di bawah constraint tertentu.

---

## 7. Alternatives Must Be Honest

ADR yang baik
tidak hanya menulis keputusan final.

Ia juga menunjukkan:
- opsi apa yang dipertimbangkan
- kenapa ditolak

Ini penting karena:
- menghindari perdebatan berulang
- menunjukkan bahwa keputusan bukan kebetulan
- membantu review ulang di masa depan

Jika alternatif dihilangkan,
ADR kehilangan sebagian besar nilainya.

---

## 8. Consequences Should Include Costs

Banyak ADR terlalu optimistis.

Isinya hanya:
- keuntungan keputusan

Padahal keputusan arsitektur sehat
harus mengakui:
- complexity baru
- operational burden
- migration cost
- org impact

Consequences yang jujur
membuat ADR lebih bisa dipercaya.

Kalau semua terlihat positif,
kemungkinan dokumennya tidak dewasa.

---

## 9. Status Helps Governance

ADR biasanya punya status seperti:
- proposed
- accepted
- superseded
- deprecated

Status penting untuk memberi tahu:
- apakah ini ide
- keputusan aktif
- keputusan lama yang sudah diganti

Tanpa status,
tim bisa bingung mana yang masih berlaku.

Governance teknis butuh kejelasan ini.

---

## 10. ADR Is Not a Substitute for Thinking

Menulis ADR
tidak otomatis membuat keputusan jadi bagus.

ADR hanya memaksa reasoning menjadi eksplisit.

Kalau reasoning-nya lemah,
ADR justru akan mengekspos kelemahannya.

Dan itu bagus.

Lebih baik keputusan lemah terlihat jelas
daripada tersembunyi di balik otoritas informal.

---

## 11. Healthcare Example

Contoh keputusan:
- untuk notifikasi hasil lab,
  sistem memakai outbox + worker async
  bukan synchronous callback ke vendor

Context:
- reliabilitas partner buruk
- audit trail penting
- user flow tidak boleh tertahan

Alternatif:
- direct synchronous integration
- cron polling

Consequences:
- kompleksitas worker bertambah
- observability harus lebih baik
- retry dan idempotency wajib

Ini contoh ADR yang berguna:
jelas,
berbasis konteks,
dan jujur soal biaya.

---

## 12. ADR Helps New Engineers

Engineer baru sering paling menderita
jika keputusan lama tidak terdokumentasi.

Mereka melihat sistem dan berpikir:
- kenapa diputar begini?
- kenapa tidak lebih sederhana?

ADR yang baik membantu mereka memahami:
- constraint sejarah
- alasan trade-off
- pola keputusan tim

Ini mempercepat onboarding
dan mengurangi asumsi yang salah.

---

## 13. ADR Supports Reversal Too

Keputusan arsitektur
tidak harus abadi.

ADR yang baik mempermudah evaluasi ulang:
- apakah context awal masih berlaku?
- apakah cost sekarang lebih besar daripada benefit?
- apakah ada opsi baru yang lebih masuk akal?

Tanpa ADR,
review keputusan lama cenderung emosional
atau spekulatif.

Dengan ADR,
review bisa lebih objektif.

---

## 14. Common Failure: ADR as Tombstone

Salah satu anti-pattern:
- ADR ditulis sekali lalu dilupakan

Hasilnya:
- repo penuh dokumen mati
- tidak jelas mana yang aktif
- tim tidak percaya pada dokumentasi

ADR harus cukup hidup untuk:
- dirujuk saat diskusi penting
- diperbarui statusnya
- disupersede saat keputusan berubah

Kalau tidak,
ia jadi kuburan teks.

---

## 15. When Not to Write ADR

Tidak semua hal layak ADR.

Hindari ADR untuk:
- keputusan sangat kecil
- keputusan sementara yang trivial
- detail implementasi lokal yang mudah berubah

Kalau terlalu banyak ADR,
noise naik
dan keputusan penting tenggelam.

Gunakan ADR secara selektif
untuk keputusan yang memang signifikan.

---

## 16. ADR and Team Alignment

ADR berguna untuk alignment
karena memaksa tim menyepakati:
- problem statement
- context
- option set
- consequences

Tanpa ini,
tim sering tampak sepakat
padahal sebenarnya
masing-masing membawa asumsi berbeda.

ADR membantu mengurangi persetujuan palsu.

---

## 17. Minimal Template Sederhana

Contoh struktur minimal:

- Judul
- Status
- Tanggal
- Konteks
- Keputusan
- Alternatif yang dipertimbangkan
- Konsekuensi

Kalau bagian-bagian ini jelas,
ADR biasanya sudah cukup berguna.

Lebih baik ADR pendek yang dipakai
daripada ADR megah yang tidak dibaca.

---

## 18. Pertanyaan yang Harus Bisa Dijawab ADR

ADR yang baik harus menjawab:
1. Masalah apa yang sedang diselesaikan?
2. Constraint apa yang relevan?
3. Opsi apa yang dipertimbangkan?
4. Kenapa opsi ini dipilih?
5. Harga yang kita bayar apa?
6. Bagaimana tahu jika keputusan ini nanti perlu diganti?

Kalau pertanyaan ini tidak terjawab,
ADR-nya mungkin terlalu lemah.

---

## 19. Anti-Pattern Umum

1. ADR ditulis terlalu panjang dan kabur.
2. Tidak mencatat context dan alternatif.
3. Hanya menulis sisi positif keputusan.
4. Status tidak pernah diperbarui.
5. Menulis ADR untuk hal sepele sehingga repo penuh noise.

---

## 20. Best Practices

- tulis ADR untuk keputusan yang signifikan dan mahal dibalik.
- jaga tetap ringkas, fokus pada reasoning.
- catat alternatif dan alasan penolakan.
- akui konsekuensi negatif secara jujur.
- rawat status ADR agar tetap relevan.

---

## 21. Mini Latihan

Latihan:
1. Pilih satu keputusan arsitektur penting di proyekmu.
2. Tulis context yang benar-benar memengaruhinya.
3. Daftar minimal dua alternatif yang masuk akal.
4. Jelaskan kenapa keputusan final dipilih.
5. Tulis konsekuensi negatifnya tanpa defensif.

---

## 22. Checklist Kelulusan Topik ADR untuk Keputusan Arsitektur

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan keputusan yang layak ADR dan yang tidak,
- menulis ADR yang ringkas tapi jelas,
- mendokumentasikan context, alternatif, dan konsekuensi,
- memakai ADR untuk alignment dan evaluasi ulang,
- menghindari ADR yang berubah menjadi birokrasi mati.

---

## 23. Ringkasan Brutal

- Keputusan arsitektur yang tidak dicatat
  akan berubah menjadi mitos internal.
- ADR bukan soal dokumentasi demi dokumentasi.
- ADR adalah cara murah
  untuk mencegah tim masa depan
  menebak-nebak alasan masa lalu.
