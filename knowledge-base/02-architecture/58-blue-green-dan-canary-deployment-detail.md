# Blue-Green dan Canary Deployment - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu blue-green deployment
- apa itu canary deployment
- perbedaan trade-off keduanya
- kapan masing-masing cocok
- bagaimana deployment strategy memengaruhi risiko rilis

Deployment strategy bukan soal gaya DevOps.
Ia soal manajemen risiko perubahan.

Setiap deploy
berarti memperkenalkan kemungkinan kerusakan.

Pertanyaannya:
- bagaimana mengurangi blast radius saat perubahan salah?

Blue-green dan canary
adalah dua jawaban umum.

Keduanya berguna.
Keduanya juga punya biaya.

---

## 1. Kenapa Deployment Strategy Penting?

Karena bug produksi
sering tidak terlihat di staging.

Kalau semua traffic langsung dipindah
ke versi baru tanpa kontrol,
satu kesalahan bisa memukul semua user sekaligus.

Deployment strategy membantu:
- mengontrol exposure
- mempercepat rollback
- mengurangi ketidakpastian rollout

Ia adalah bagian arsitektur operasional.

---

## 2. Apa Itu Blue-Green Deployment?

Blue-green berarti:
- ada dua environment setara
- satu aktif melayani traffic
- satu lagi menampung versi baru

Setelah versi baru siap,
traffic dipindahkan dari environment lama
ke environment baru.

Keuntungan utamanya:
- switch relatif cepat
- rollback juga relatif cepat

Tapi ada biaya:
- butuh dua lingkungan siap

---

## 3. Kelebihan Blue-Green

Keuntungan umum:
- rollback cepat dengan switch balik
- validasi sebelum cutover lebih mudah
- lebih sedikit campuran versi di tengah rollout

Ini bagus
jika sistem butuh perubahan cepat
dengan window cutover yang jelas.

Blue-green terasa tegas dan operasionalnya jelas,
selama infrastrukturnya mendukung.

---

## 4. Kelemahan Blue-Green

Biaya umumnya:
- butuh resource ganda
- sinkronisasi environment harus rapi
- data/schema compatibility tetap harus dipikirkan

Blue-green tidak menghapus masalah:
- migration breaking
- cache state
- connection draining

Jangan mengira dua environment
otomatis menyelesaikan semua risiko release.

---

## 5. Apa Itu Canary Deployment?

Canary berarti:
- versi baru dirilis ke sebagian kecil traffic dulu
- diamati
- lalu exposure dinaikkan bertahap

Tujuannya:
- mengurangi blast radius
- melihat dampak nyata sebelum full rollout

Ini sangat berguna
untuk mendeteksi masalah
yang hanya muncul pada traffic produksi nyata.

---

## 6. Kelebihan Canary

Canary unggul pada:
- risk reduction bertahap
- exposure terbatas
- observability-driven rollout
- deteksi dini pada subset traffic

Jika ada bug serius,
hanya sebagian kecil user terdampak dulu.

Ini sangat kuat
jika telemetry dan rollback automation matang.

---

## 7. Kelemahan Canary

Canary membawa kompleksitas:
- dua versi hidup bersamaan
- metric comparison harus jelas
- route distribution harus andal
- version skew bisa bikin debugging lebih susah

Kalau observability buruk,
canary hanya menjadi rollout lambat
tanpa insight berarti.

Canary butuh telemetry yang bagus.

---

## 8. Blue-Green vs Canary

Ringkasnya:

Blue-green:
- switch tegas antar environment
- rollback cepat
- resource overhead lebih tinggi

Canary:
- rollout bertahap
- risiko exposure lebih kecil
- observability dan routing lebih kompleks

Tidak ada yang otomatis lebih baik.
Pilih berdasarkan:
- infra
- risk tolerance
- observability maturity

---

## 9. Traffic Shaping

Canary bergantung pada traffic shaping:
- 1%
- 5%
- 20%
- 50%
- 100%

Pertanyaan penting:
- traffic dipilih acak?
- berdasarkan tenant?
- berdasarkan region?
- berdasarkan user cohort?

Cara memilih subset user
memengaruhi kualitas sinyal rollout.

---

## 10. Metric Gating

Canary sehat biasanya punya gating:
- error rate
- latency
- saturation
- domain success rate

Jika metric tertentu memburuk,
rollout dihentikan atau dibalik.

Tanpa gating yang jelas,
canary kehilangan nilai.

Itu hanya rilis bertahap tanpa keputusan terukur.

---

## 11. Data and Schema Compatibility

Baik blue-green maupun canary
tetap harus memikirkan:
- schema changes
- backward compatibility
- cache format
- message compatibility

Kalau versi lama dan baru
tidak bisa hidup berdampingan,
canary akan sulit.

Kalau data migration breaking,
blue-green rollback bisa semu.

Deployment strategy dan schema evolution
selalu terkait.

---

## 12. Healthcare Example

Misal fitur baru pada portal klinik:

Canary cocok jika:
- ingin expose ke sebagian klinik dulu
- lihat error dan workflow success nyata

Blue-green cocok jika:
- ingin cutover versi besar
- environment cukup stabil dan mahal rollback harus cepat

Untuk fitur sensitif,
canary sering memberi rasa aman lebih besar
asal monitoring kuat.

---

## 13. Rollback Reality

Rollback mudah di teori,
tidak selalu mudah di praktik.

Pertanyaan:
- apa state sudah berubah?
- apa schema sudah terlanjur dipakai?
- apa side effect irreversible sudah terjadi?

Strategy deployment tidak boleh dibahas
tanpa rollback semantics.

Rollback yang hanya "ganti image lama"
sering terlalu naif.

---

## 14. Anti-Pattern Umum

1. Memakai canary tanpa telemetry yang bisa dipercaya.
2. Menganggap blue-green otomatis aman walau schema breaking.
3. Tidak punya gating/abort criteria yang jelas.
4. Rollout bertahap tapi tanpa observability domain metrics.
5. Mengabaikan version skew saat dua versi hidup bersamaan.

---

## 15. Best Practices

- pilih deployment strategy berdasarkan risk profile dan kemampuan operasional tim.
- gabungkan rollout dengan observability dan abort criteria.
- pastikan schema/message compatibility dipikirkan sebelum rollout.
- siapkan rollback plan yang realistis.
- gunakan domain metrics, bukan hanya CPU/memory, untuk menilai rollout sehat.

---

## 16. Pertanyaan Desain Penting

Sebelum memilih blue-green atau canary, tanya:
1. Seberapa besar blast radius yang ingin dikurangi?
2. Apakah tim siap mengoperasikan dua versi sekaligus?
3. Metric apa yang menentukan rollout sehat?
4. Apakah rollback benar-benar mungkin?
5. Bagaimana schema/data compatibility dijaga?

---

## 17. Mini Latihan

Latihan:
1. Ambil satu layanan dan pilih blue-green atau canary dengan alasan jelas.
2. Tentukan rollout stages dan metric gating.
3. Tentukan abort criteria.
4. Evaluasi dampak schema change terhadap rollout strategy.
5. Simulasikan satu rollback scenario yang tidak sesederhana switch image.

---

## 18. Checklist Kelulusan Topik Blue-Green dan Canary Deployment

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan mekanisme blue-green dan canary,
- menilai trade-off infra, telemetry, dan rollback,
- menghubungkan deployment strategy dengan schema compatibility,
- menentukan gating dan abort criteria,
- memilih strategi rollout berdasarkan risiko nyata, bukan trend tooling.

---

## 19. Ringkasan Brutal

- Deployment strategy adalah strategi manajemen risiko.
- Canary tanpa observability hanyalah drama bertahap.
- Blue-green tanpa compatibility discipline hanyalah ilusi rollback cepat.
