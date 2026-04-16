# Relational vs Document vs Key-Value Trade-Off - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- perbedaan model database relational, document, dan key-value
- trade-off utama dari masing-masing pendekatan
- kapan tiap model cocok dipakai
- anti-pattern saat memilih database berdasarkan hype

Banyak tim memilih database
berdasarkan tren,
bukan berdasarkan bentuk masalah.

Itu keputusan mahal.

Database choice bukan soal identitas teknologi.
Ini soal:
- shape data
- query pattern
- consistency need
- scale profile
- operational maturity

---

## 1. Kenapa Pemilihan Database Penting?

Karena database bukan sekadar tempat simpan data.

Ia memengaruhi:
- cara data dimodelkan
- cara query ditulis
- consistency guarantee
- scalability pattern
- biaya operasional

Kalau model database tidak cocok,
engineering akan terus membayar bunganya.

---

## 2. Relational Database Itu Apa?

Relational database menyimpan data
dalam tabel dengan schema jelas
dan relasi eksplisit.

Kekuatan utamanya:
- struktur kuat
- join
- transaksi
- integrity constraint
- query expressive

Untuk banyak sistem bisnis,
ini tetap pilihan default yang sangat kuat.

---

## 3. Document Database Itu Apa?

Document database biasanya menyimpan data
dalam bentuk dokumen semi-terstruktur.

Contoh mental model:
- satu record bisa membawa nested structure yang kaya

Kekuatan utamanya:
- fleksibilitas shape dokumen
- natural untuk beberapa jenis aggregate
- cocok untuk data yang berubah bentuknya lebih sering

Tapi fleksibilitas ini ada biayanya.

---

## 4. Key-Value Store Itu Apa?

Key-value store biasanya menyimpan:
- key unik
- value terkait

Akses utamanya:
- ambil berdasarkan key
- simpan berdasarkan key

Ini sangat cocok
untuk access pattern sederhana dan sangat cepat.

Tapi jangan berharap
query ad hoc kompleks alami di sini.

---

## 5. Jangan Mulai dari Teknologi, Mulai dari Query Pattern

Pertanyaan pertama:
- data akan diakses bagaimana?

Bukan:
- database mana yang terdengar keren?

Kalau kebutuhanmu:
- filter kompleks
- relasi kaya
- reporting cukup dalam

relational sering unggul.

Kalau kebutuhanmu:
- aggregate mandiri
- struktur nested alami
- akses per dokumen

document bisa cocok.

Kalau kebutuhanmu:
- lookup super cepat by key
- caching/session/state sederhana

key-value sering lebih tepat.

---

## 6. Kekuatan Relational

Relational unggul pada:
- model data yang saling berhubungan
- transaksi multi-entity
- constraint integrity
- query fleksibel
- reporting operasional

Join adalah kekuatan,
bukan dosa.

Banyak tim terlalu cepat lari dari relational
padahal problem mereka justru sangat relational.

---

## 7. Kelemahan Relational

Relational bisa terasa berat
jika:
- model data sangat nested dan jarang di-query silang
- perubahan schema sangat liar
- tim buruk dalam modeling dan indexing

Tapi sering kali masalahnya bukan relational itu sendiri.
Masalahnya:
- schema design buruk
- query buruk
- scaling strategy buruk

Jangan salah menyalahkan alat.

---

## 8. Kekuatan Document Database

Document database unggul ketika:
- satu aggregate punya shape yang natural sebagai dokumen
- nested structure penting
- schema bisa berevolusi lebih longgar
- query utama fokus pada satu dokumen/agregat

Ini bisa mengurangi impedance mismatch
untuk beberapa domain tertentu.

---

## 9. Kelemahan Document Database

Document database bisa menyakitkan
jika kebutuhanmu diam-diam adalah:
- relasi kaya
- join berat
- consistency lintas dokumen
- reporting fleksibel lintas entitas

Kalau semua hubungan tetap ada,
tapi kamu memilih document karena "join jelek",
sering yang terjadi hanya:
- join berpindah ke application layer
- complexity naik

---

## 10. Kekuatan Key-Value

Key-value unggul untuk:
- cache
- session store
- feature flag state
- lookup sederhana
- counter atau token tertentu

Ia cepat
karena model aksesnya sempit.

Begitu kamu memaksa kebutuhan query kompleks,
kekuatan itu hilang.

---

## 11. Kelemahan Key-Value

Key-value lemah untuk:
- query kaya
- filtering kompleks
- relationship traversal
- ad hoc analytics

Kalau kamu butuh lebih dari:
- get by key
- set by key

hati-hati.

Sering kali kamu sedang memilih alat yang salah.

---

## 12. Schema Discipline

Relational mendorong schema discipline lebih kuat.

Document memberi fleksibilitas lebih besar,
tapi fleksibilitas tanpa governance
mudah berubah jadi chaos.

Key-value hampir tidak menolongmu
memodelkan struktur domain yang sehat.

Jadi pilihan database
juga memengaruhi disiplin modeling tim.

---

## 13. Consistency Consideration

Relational biasanya paling kuat
untuk transaksi dan consistency tradisional.

Document bisa baik
untuk aggregate-level atomicity tertentu.

Key-value sangat bergantung use case dan produk,
tapi umumnya tidak dipilih
untuk relational integrity kaya.

Kalau domain sangat sensitif pada correctness lintas entitas,
relational sering menang.

---

## 14. Scalability Myths

Banyak orang berkata:
- relational susah scale
- NoSQL lebih mudah scale

Itu setengah benar,
sering dipakai terlalu malas.

Scaling selalu punya biaya.

Document/key-value tertentu
memang bisa lebih natural untuk scale pattern tertentu.

Tapi kalau query dan consistency need-mu relational,
biaya pindah model bisa lebih mahal
daripada scale relational dengan benar.

---

## 15. Operational Maturity

Pertanyaan penting:
- timmu siap mengoperasikan apa?

Karena database choice
tidak berhenti di coding.

Ia menyentuh:
- backup
- failover
- observability
- indexing
- migration
- incident response

Teknologi sedikit lebih cocok secara teori
tapi tidak siap dioperasikan
sering kalah dari pilihan yang lebih stabil.

---

## 16. Polyglot Persistence

Kadang jawaban sehat adalah kombinasi:
- relational untuk transaksi inti
- key-value untuk cache/session
- document/search store untuk kebutuhan spesifik

Ini normal.

Tapi polyglot persistence
juga menambah kompleksitas operasional.

Jangan pakai banyak database
hanya demi terlihat canggih.

---

## 17. Healthcare Example

Dalam sistem healthcare:

Relational cocok untuk:
- patient
- appointment
- billing
- audit transaksi

Document bisa cocok untuk:
- snapshot form medis tertentu
- template kuesioner fleksibel
- dokumen clinical note tertentu

Key-value cocok untuk:
- session
- cache OTP
- idempotency key

Mayoritas core business healthcare
sering tetap sangat relational.

---

## 18. Anti-Pattern Umum

1. Memilih NoSQL hanya karena hype skalabilitas.
2. Memilih document database untuk data yang sebenarnya sangat relational.
3. Memaksa key-value untuk kebutuhan query yang kaya.
4. Mengira fleksibilitas schema berarti tidak perlu governance.
5. Menambah banyak database tanpa kesiapan operasional.

---

## 19. Best Practices

- mulai dari access pattern dan consistency need.
- pakai relational sebagai default kuat untuk domain bisnis yang saling terhubung.
- pilih document jika aggregate/dokumen benar-benar natural.
- pilih key-value untuk lookup/cache/state sederhana.
- gunakan polyglot persistence hanya jika manfaatnya nyata.

---

## 20. Pertanyaan Desain Penting

Sebelum memilih database model, tanya:
1. Query utama seperti apa?
2. Seberapa kaya relasinya?
3. Seberapa penting transaksi lintas entitas?
4. Apakah data lebih natural sebagai aggregate dokumen?
5. Apakah tim siap mengoperasikan pilihan ini?

---

## 21. Mini Latihan

Latihan:
1. Ambil satu domain dan klasifikasikan bagian mana yang relational, document-like, atau key-value-like.
2. Evaluasi apakah kebutuhan join benar-benar kuat.
3. Tentukan cache/session/idempotency store yang cocok.
4. Nilai risiko memilih document DB untuk workflow transaksional.
5. Buat argumen kapan polyglot persistence layak.

---

## 22. Jawaban Contoh Ringkas

Relational:
- transaksi bisnis inti
- reporting operasional
- data saling berhubungan

Document:
- aggregate nested
- schema lebih fleksibel

Key-value:
- session
- cache
- lookup sederhana

---

## 23. Checklist Kelulusan Topik Relational vs Document vs Key-Value Trade-Off

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan kekuatan dan kelemahan tiap model,
- memilih berdasarkan query pattern dan consistency need,
- menghindari database hype-driven decisions,
- memahami biaya operasional pilihan data store,
- memakai polyglot persistence secara sadar, bukan impulsif.

---

## 24. Ringkasan Brutal

- Tidak ada database yang modern hanya karena namanya NoSQL.
- Yang ada hanyalah database yang cocok atau salah konteks.
- Kalau kamu memilih data store tanpa memahami access pattern,
  kamu sedang menulis masalah jangka panjang.
