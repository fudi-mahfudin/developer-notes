# SQL Exit Criteria Senior - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa yang benar-benar membedakan senior di area SQL/data
- standar kemampuan senior
- ekspektasi desain, review, operasional, dan kepemimpinan teknis

Senior bukan orang yang sekadar tahu banyak syntax.
Senior adalah orang yang:
- mencegah masalah,
- membuat keputusan yang sehat,
- dan meningkatkan kualitas tim secara sistemik.

---

## 1. Apa Itu Exit Criteria Senior?

Exit criteria senior berarti seseorang:
- kuat di fondasi dan praktik menengah,
- mampu mengambil keputusan desain yang tepat,
- bisa menilai trade-off,
- mampu menjaga correctness, performa, security, dan operability
  secara bersamaan,
- serta menjadi multiplier untuk tim lain.

Kalau seseorang hanya jago menulis query rumit,
itu belum otomatis senior.

---

## 2. Fondasi dan Menengah Harus Sudah Tuntas

Semua hal level junior dan mid:
- basic query
- join/agregasi
- CTE/window
- query plan
- index
- transaction
- migration safety

Di level senior,
semua itu harus sudah menjadi refleks.

Senior tidak boleh masih sering terpeleset
di kesalahan dasar yang sama.

---

## 3. Systems Thinking

Inilah pembeda utama.

Senior melihat SQL bukan sebagai query tunggal,
tapi sebagai bagian dari sistem:
- aplikasi
- worker
- cache
- replica
- analytics
- compliance
- operasional

Senior bertanya:
- perubahan ini memengaruhi siapa lagi?
- bagaimana dampaknya ke write path, read path, monitoring, dan rollback?

---

## 4. Correctness Under Complexity

Senior harus bisa menjaga kebenaran hasil
bahkan saat:
- relasi banyak
- data besar
- definisi bisnis rumit
- workflow lintas layanan

Mereka tidak cepat puas
hanya karena query "keluar hasil".

Mereka skeptis, memverifikasi, dan mencari edge case.

---

## 5. Performance Trade-off Awareness

Senior tidak hanya tahu satu query bisa dipercepat.

Senior paham trade-off:
- read vs write
- index vs storage
- latency vs consistency
- strong vs eventual
- convenience vs operability

Yang dicari bukan query paling cepat di satu sudut,
tapi sistem paling sehat secara keseluruhan.

---

## 6. Concurrency dan Reliability Maturity

Senior harus matang di:
- locking
- deadlock
- contention
- idempotency
- retry behavior
- outbox / orchestration boundary

Mereka tidak mendesain write path
seolah semua request datang satu per satu.

Itu pola pikir orang yang belum pernah kena sistem nyata.

---

## 7. Schema Evolution Thinking

Senior berpikir jangka panjang:
- bagaimana schema ini berubah?
- bagaimana migration aman?
- bagaimana rollback?
- bagaimana data historis, retention, dan archive?

Mereka tidak sembarang rename/drop
hanya karena "lebih bersih".

Senior paham bahwa perubahan data
punya biaya dan blast radius.

---

## 8. Security dan Privacy Awareness

Senior tidak boleh menunda security sebagai urusan orang lain.

Minimal harus kuat di:
- SQL injection prevention
- least privilege
- PII exposure minimization
- masking/tokenization awareness
- backup dan data security implications

Query yang cepat tapi membocorkan data
tetap query yang gagal.

---

## 9. Analytics Literacy

Senior SQL/data engineer
sebaiknya nyaman dengan:
- grain analytics
- fact vs dimension
- retention/funnel/cohort logic
- timezone-aware reporting
- denominator correctness

Karena banyak keputusan bisnis
lahir dari analytics.

Senior yang buta analytics
sering melewatkan bug data yang lebih berbahaya
daripada bug API biasa.

---

## 10. Review Quality

Senior harus jadi reviewer yang bisa dipercaya.

Mereka harus mampu mereview:
- correctness
- performance
- migration risk
- operational blast radius
- security implications

Review senior yang baik
menyelamatkan tim dari incident.

Review senior yang dangkal
hanya memberi label status.

---

## 11. Decision Making

Senior harus bisa memilih:
- kapan query dioptimasi
- kapan schema diubah
- kapan butuh replica
- kapan butuh partitioning
- kapan butuh redesign, bukan tambalan

Tidak semua masalah butuh solusi yang sama.
Senior dinilai dari kualitas keputusan,
bukan dari volume opini.

---

## 12. Evidence-Driven Engineering

Senior tidak menebak.

Senior membawa:
- metric
- plan
- benchmark
- slow query evidence
- incident history

Kalau argumen teknis selalu berbasis feeling,
itu belum senior yang matang.

---

## 13. Incident and Postmortem Literacy

Senior harus nyaman dengan:
- triage database issue
- containment
- recovery
- postmortem
- action item sistemik

Ketika insiden muncul,
senior tidak panik dan tidak asal menembak.
Mereka menjaga struktur respons.

---

## 14. Teaching and Multiplying

Pembeda besar senior:
- bisa membuat orang lain lebih baik

Contoh:
- memberi review yang mendidik
- menulis guideline/query checklist
- membagikan pattern yang benar
- menyederhanakan masalah kompleks

Kalau seseorang jago sendiri
tapi tim sekitarnya tetap lemah,
nilai senioritasnya belum penuh.

---

## 15. Knowing When Not to Use SQL Tricks

Senior tahu:
- tidak semua masalah perlu query canggih
- tidak semua optimasi perlu index baru
- tidak semua workflow cocok di DB transaction

Senior sering memilih solusi yang lebih sederhana
jika itu cukup aman dan lebih maintainable.

Kompleksitas bukan tanda senioritas.

---

## 16. Healthcare Example

Kasus:
- sistem booking sering contention di jam sibuk
- tim awal ingin tambah hardware

Senior yang matang akan mengevaluasi:
- hot rows?
- unique constraint?
- transaction boundary?
- replica/read path?
- retry/idempotency?
- user-facing freshness requirement?

Mungkin solusi akhirnya:
- ubah write path
- tambah idempotency
- pendekkan transaction
- bukan sekadar scale instance

Itulah cara pikir senior.

---

## 17. Apa yang Harus Bisa Ditangani Senior?

Contoh:
- merancang migration besar yang aman
- memperbaiki bottleneck produksi lintas query/schema
- mendefinisikan retention/partitioning strategy
- memimpin investigasi incident DB
- membuat guideline review SQL tim

Kalau semua keputusan seperti ini
masih harus menunggu orang lain,
senioritasnya belum utuh.

---

## 18. Anti-Pattern yang Menghambat Jadi Senior

1. Jago syntax tapi lemah trade-off.
2. Bisa optimasi query, tapi tidak paham business impact.
3. Bisa bicara banyak, tapi tanpa evidence.
4. Selalu pilih solusi teknis paling rumit.
5. Tidak membantu tim berkembang.

---

## 19. Best Practices untuk Menjadi Senior Nyata

- pikirkan correctness, performance, security, operability sekaligus.
- dokumentasikan keputusan penting.
- biasakan root-cause thinking.
- latih komunikasi teknis yang jelas.
- jadilah reviewer dan problem-shaper, bukan hanya problem-solver.

---

## 20. Mini Latihan

Latihan:
1. Sebutkan 10 ciri senior SQL engineer yang sehat.
2. Bedakan mid dan senior di area decision making.
3. Bedakan senior yang nyata dengan "query wizard" semu.
4. Buat contoh review senior yang bernilai tinggi.
5. Jelaskan kenapa teaching termasuk indikator senior.

---

## 21. Jawaban Contoh Ringkas

Mid:
- bisa menyelesaikan banyak masalah menengah dengan baik.

Senior:
- menentukan arah desain,
- mengelola trade-off,
- mencegah masalah sistemik,
- dan meningkatkan standar tim.

Teaching penting karena:
- senior bukan hanya aset individu,
- tapi pengungkit kemampuan kolektif.

---

## 22. Checklist Kelulusan Topik 49

Kamu dianggap lulus jika bisa:
- membuat keputusan SQL/data yang kuat secara teknis dan bisnis,
- mereview perubahan dengan sudut pandang menyeluruh,
- menangani incident dan migration besar dengan tenang,
- menghubungkan desain data ke dampak jangka panjang,
- membuat tim di sekitarmu ikut naik kualitasnya.

---

## 23. Ringkasan Brutal

- Senior bukan orang yang paling banyak hafal fungsi SQL.
- Senior adalah orang yang paling kecil kemungkinan
  membawa tim ke bencana yang sebenarnya bisa dicegah.
