# Rollback Strategy - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu rollback strategy
- kenapa rollback lebih dari sekadar deploy versi lama
- jenis rollback teknis dan operasional
- hubungan rollback dengan schema, data, dan side effects
- anti-pattern saat rollback hanya dianggap tombol panik

Setiap perubahan produksi
harus datang dengan pertanyaan:
- kalau ini salah, bagaimana kita mundur?

Kalau tidak ada jawaban yang realistis,
rilis itu pada dasarnya berjudi.

Rollback strategy adalah bagian dari desain perubahan,
bukan kegiatan improvisasi saat panik.

---

## 1. Apa Itu Rollback Strategy?

Rollback strategy adalah rencana
untuk mengurangi atau membalik dampak
dari perubahan yang bermasalah.

Perubahan bisa berupa:
- deploy code
- config change
- schema migration
- feature flag activation
- workflow behavior

Rollback yang matang
menentukan:
- apa yang bisa dibalik
- apa yang tidak
- langkah apa yang harus diambil
- siapa yang memutuskan

---

## 2. Kenapa Ini Penting?

Karena incident setelah deploy
sering bergerak cepat.

Jika tim harus berpikir dari nol:
- rollback pakai apa?
- schema aman tidak?
- cache harus dibersihkan tidak?

maka waktu pemulihan membengkak.

Rollback strategy
adalah alat untuk menurunkan MTTR,
bukan dokumen formalitas.

---

## 3. Rollback Tidak Selalu Berarti Revert Code

Ini sangat penting.

Kadang solusi tercepat adalah:
- matikan feature flag
- reroute traffic
- disable integration
- switch ke old environment

Bukan langsung revert commit/image.

Rollback strategy sehat
melihat perubahan sebagai sistem:
- code
- config
- data
- traffic

---

## 4. Code Rollback

Ini bentuk paling intuitif:
- kembali ke versi aplikasi sebelumnya

Ini bisa efektif
jika:
- perubahan hanya ada di code
- compatibility dijaga
- state/data tidak berubah secara breaking

Tapi code rollback sendirian
sering tidak cukup
di sistem modern.

---

## 5. Config Rollback

Banyak insiden
sebenarnya berasal dari:
- config salah
- timeout salah
- feature toggle salah
- dependency endpoint salah

Dalam kasus seperti ini,
rollback tercepat bisa berupa
config rollback atau flag flip.

Karena itu perubahan config
juga harus punya strategi pemulihan,
bukan dianggap sepele.

---

## 6. Schema and Data Complicate Everything

Inilah area paling berbahaya.

Kalau deploy baru:
- mengubah schema
- menulis format data baru
- memicu migration destruktif

maka rollback code
bisa menjadi tidak aman.

Itu sebabnya rollback strategy
harus dibahas bersama:
- schema evolution
- backward compatibility
- data migration plan

---

## 7. Forward-Fix vs Rollback

Kadang rollback bukan pilihan terbaik.

Jika:
- data sudah berubah luas
- rollback risk tinggi
- fix kecil bisa lebih cepat

maka forward-fix
bisa lebih masuk akal.

Rollback strategy yang matang
tidak dogmatis.

Ia menilai:
- mana yang paling cepat dan paling aman
  untuk memulihkan layanan

---

## 8. Feature Flags as Rollback Lever

Feature flags sangat berguna
untuk mengurangi blast radius perubahan.

Jika fitur baru rusak,
flag bisa dimatikan
tanpa deploy baru penuh.

Tapi hanya efektif
jika:
- flag benar-benar memisahkan perilaku
- fallback lama masih sehat

Feature flag palsu
yang hanya membungkus setengah perubahan
tidak akan banyak menolong.

---

## 9. Rollback and Traffic Control

Kadang rollback dilakukan lewat traffic:
- switch back
- stop canary
- remove bad instances
- route only to stable pool

Ini terutama relevan
untuk blue-green/canary rollout.

Arsitektur traffic management yang baik
sering membuat rollback lebih cepat
daripada code redeploy manual.

---

## 10. Irreversible Side Effects

Beberapa perubahan
tidak bisa dibatalkan sepenuhnya:
- email sudah terkirim
- payment eksternal sudah diproses
- event sudah dikonsumsi downstream

Di sini rollback teknis
tidak cukup.

Perlu:
- compensation
- manual repair
- communication plan

Rollback strategy matang
jujur soal apa yang irreversibel.

---

## 11. Healthcare Example

Misal fitur baru booking
merusak alur reschedule.

Pilihan pemulihan mungkin:
- matikan feature flag baru
- arahkan traffic ke versi lama
- tahan rollout

Jika schema belum breaking,
code rollback bisa mudah.

Jika data booking baru sudah ditulis
dengan format tak kompatibel,
tim harus berhati-hati:
- rollback app saja
  bisa menambah kerusakan

---

## 12. Decision Criteria

Saat insiden rilis terjadi,
tim harus cepat menjawab:
- rollback atau forward-fix?
- risiko masing-masing apa?
- perubahan mana yang terlibat?
- apakah data sudah berubah?

Tanpa decision framework,
tim bisa terjebak debat
saat waktu paling mahal.

---

## 13. Playbook dan Ownership

Rollback strategy perlu:
- langkah-langkah jelas
- owner keputusan
- guardrail
- komunikasi

Kalau semua orang mengira orang lain tahu caranya,
eksekusi akan lambat dan kacau.

Rollback yang baik
sering terdengar membosankan di dokumen,
tapi sangat berharga saat incident.

---

## 14. Testing Rollback

Rollback yang tidak pernah diuji
sering hanya asumsi.

Perlu latihan:
- bisakah image lama naik lagi?
- bisakah traffic switch cepat?
- apa yang terjadi jika schema sudah berubah?
- apakah flag benar-benar mematikan perilaku baru?

Rollback confidence
datang dari rehearsal,
bukan dari optimisme.

---

## 15. Anti-Pattern Umum

1. Menganggap rollback selalu berarti deploy versi lama.
2. Melakukan migration breaking tanpa rencana pemulihan.
3. Tidak tahu apakah perubahan bersifat reversible.
4. Tidak menguji rollback path.
5. Menganggap feature flag otomatis berarti aman rollback.

---

## 16. Best Practices

- desain perubahan dengan rollback in mind sejak awal.
- prioritaskan backward-compatible rollout bila mungkin.
- gunakan feature flag dan traffic controls sebagai levers tambahan.
- dokumentasikan keputusan rollback vs forward-fix.
- uji rollback path secara berkala.

---

## 17. Pertanyaan Desain Penting

Sebelum merilis perubahan, tanya:
1. Apa rollback tercepat jika ini gagal?
2. Apakah data/schema tetap kompatibel?
3. Apa yang tidak bisa dibalik?
4. Apakah feature flag atau traffic switch tersedia?
5. Siapa yang berwenang menekan rem?

---

## 18. Mini Latihan

Latihan:
1. Ambil satu rilis besar dan desain rollback plan-nya.
2. Pisahkan rollback code, config, traffic, dan data.
3. Tentukan kapan forward-fix lebih masuk akal.
4. Audit satu feature flag apakah benar-benar usable untuk rollback.
5. Buat checklist keputusan 10 menit pertama saat post-deploy incident.

---

## 19. Checklist Kelulusan Topik Rollback Strategy

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan rollback lebih dari sekadar revert code,
- melihat hubungan rollback dengan data dan schema,
- memilih rollback vs forward-fix secara pragmatis,
- merancang playbook rollback yang nyata,
- menguji asumsi rollback sebelum insiden nyata terjadi.

---

## 20. Ringkasan Brutal

- Rollback yang tidak diuji
  hanyalah harapan yang terdokumentasi.
- Kalau perubahanmu tidak punya jalan mundur yang jelas,
  perubahanmu terlalu mahal untuk dirilis dengan tenang.
