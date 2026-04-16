# Kapan Tidak Memakai Microservices - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa microservices bukan default terbaik
- sinyal bahwa sistem belum layak dipecah
- biaya nyata microservices
- kapan monolith atau modular monolith justru lebih sehat

Microservices adalah salah satu topik
yang paling sering dirusak oleh hype.

Banyak tim melihat:
- scale besar
- perusahaan terkenal
- konferensi

lalu menyimpulkan:
- microservices pasti langkah dewasa

Padahal sangat sering
jawaban yang lebih dewasa justru:
- belum.

Menolak microservices terlalu dini
sering lebih senior
daripada mendorongnya tanpa alasan kuat.

---

## 1. Microservices Itu Mahal

Ini titik awal yang harus jujur.

Microservices menambah:
- deployment unit
- network boundary
- observability complexity
- data consistency complexity
- testing complexity
- ops burden
- ownership coordination

Kalau seseorang hanya bicara
tentang scaling dan autonomy,
tapi tidak membahas biaya ini,
analisisnya belum lengkap.

---

## 2. Monolith Bukan Musuh

Banyak tim memperlakukan monolith
seolah dosa desain.

Padahal monolith yang sehat:
- cepat dibangun
- mudah dipahami end-to-end
- mudah di-debug
- tidak punya network hop internal
- lebih murah secara operasional

Masalah sering bukan monolith-nya,
tapi:
- boundary buruk
- code hygiene buruk
- ownership buruk

Jangan salah diagnosis.

---

## 3. Pertanyaan Utama

Sebelum memecah sistem, tanya:
- masalah apa yang sebenarnya ingin diselesaikan?

Jika jawabannya kabur,
microservices hampir pasti keputusan buruk.

Contoh alasan yang bisa valid:
- deployment independence yang benar-benar dibutuhkan
- blast radius yang perlu dipisah
- team autonomy dengan boundary domain nyata
- scale characteristic yang sangat berbeda

Contoh alasan lemah:
- "biar kelihatan modern"
- "karena startup X pakai ini"

---

## 4. Team Size Matters

Microservices sering baru masuk akal
saat ada tekanan organisasi nyata:
- beberapa tim
- domain cukup besar
- ownership perlu dipisah

Kalau tim masih kecil,
satu codebase sehat
sering jauh lebih efisien.

Memecah sistem terlalu cepat
bisa membuat satu tim kecil
harus mengoperasikan kompleksitas
yang seharusnya ditangani banyak tim.

Itu tidak rasional.

---

## 5. Domain Boundary Must Be Real

Microservices tanpa boundary domain jelas
hanya memecah kekacauan
menjadi kekacauan berjaringan.

Kalau service sering:
- saling panggil rapat
- saling butuh data inti
- saling sinkronisasi rumit

mungkin boundary-nya belum matang.

Service boundary yang salah
lebih menyakitkan daripada monolith yang belum rapi.

---

## 6. Data Ownership Problem

Begitu microservices hadir,
pertanyaan besar muncul:
- siapa punya data apa?
- bagaimana join lintas service?
- bagaimana consistency dijaga?

Kalau tim belum siap memikirkan:
- outbox
- eventual consistency
- saga
- denormalized read model

maka microservices akan terasa menyiksa.

Data boundary adalah biaya nyata.

---

## 7. Operational Burden

Satu aplikasi jadi banyak service berarti:
- banyak pipeline deploy
- banyak config
- banyak secrets
- banyak dashboards
- banyak alerts
- banyak on-call surface

Ops load meledak
jauh lebih cepat
daripada yang dibayangkan di whiteboard.

Kalau organisasi belum siap,
microservices akan menjadi pajak harian.

---

## 8. Debugging Cost

Di monolith:
- request flow relatif mudah dilihat

Di microservices:
- trace lintas network
- async eventing
- retry chain
- partial failure

Debugging jadi jauh lebih mahal.

Kalau observability dan tracing belum matang,
tim akan buta saat produksi bermasalah.

Itu harga yang sering diremehkan.

---

## 9. Independent Deploy Myth

Microservices sering dijual
sebagai jalan menuju deploy independen.

Benar, tapi hanya jika:
- contract antar service stabil
- backward compatibility disiplin
- dependency graph tidak terlalu rapat

Kalau kenyataannya setiap rilis
masih butuh koordinasi banyak service,
keuntungan deploy independence mengecil drastis.

Jangan beli janji yang tidak tercapai.

---

## 10. Performance and Latency Reality

Memecah satu proses lokal
menjadi banyak hop network
berarti:
- latency naik
- failure mode bertambah
- timeout/retry jadi perlu

Jika motivasinya justru kecepatan development
atau simplicity,
microservices sering bergerak ke arah sebaliknya.

Local call jauh lebih murah
daripada distributed call.

---

## 11. Healthcare Example

Misal platform klinik masih dikelola
oleh satu tim kecil-menengah
dengan domain:
- appointment
- patient
- billing
- notification

Jika boundary belum matang,
lebih sehat mungkin:
- modular monolith

daripada memecah cepat jadi:
- appointment-service
- patient-service
- billing-service
- notification-service

lalu tenggelam dalam orchestration dan consistency pain.

---

## 12. Premature Distribution

Premature abstraction itu buruk.
Premature distribution lebih buruk.

Karena begitu dibagi ke network boundary,
biaya operasional dan arsitektur naik drastis.

Kalau problem masih bisa diselesaikan
dengan modularity internal yang disiplin,
itu sering pilihan lebih sehat.

Microservices terlalu dini
adalah salah satu bentuk over-engineering paling mahal.

---

## 13. When Monolith Is Better

Monolith/modular monolith sering lebih baik saat:
- tim kecil
- domain masih berkembang cepat
- boundary belum stabil
- throughput masih wajar
- observability ops belum matang
- kecepatan perubahan internal lebih penting daripada distribusi

Ini bukan tanda kurang senior.
Ini tanda penilaian yang waras.

---

## 14. Anti-Pattern Umum

1. Memilih microservices karena hype organisasi/industri.
2. Memecah service sebelum domain boundary jelas.
3. Mengabaikan biaya data consistency dan observability.
4. Satu tim kecil mengoperasikan terlalu banyak service.
5. Menganggap monolith otomatis berarti desain buruk.

---

## 15. Best Practices

- mulai dari masalah nyata, bukan arsitektur favorit.
- optimalkan modular monolith dulu jika banyak keuntungan masih bisa didapat di sana.
- pecah hanya pada boundary domain yang cukup stabil.
- hitung biaya operasional, bukan hanya manfaat teoretis.
- evaluasi kesiapan tim, observability, dan data ownership sebelum distribusi.

---

## 16. Pertanyaan Desain Penting

Sebelum memutuskan microservices, tanya:
1. Problem apa yang tidak bisa lagi diselesaikan dengan monolith/modular monolith?
2. Apakah boundary domain-nya benar-benar jelas?
3. Apakah tim siap mengoperasikan banyak service?
4. Bagaimana data dan consistency akan dikelola?
5. Apakah keuntungan yang diharapkan lebih besar dari biaya harian yang pasti muncul?

---

## 17. Mini Latihan

Latihan:
1. Ambil satu sistem monolith dan tulis alasan nyata pro dan kontra memecahnya.
2. Identifikasi boundary yang masih kabur.
3. Nilai apakah masalah utama lebih cocok diselesaikan dengan modular monolith.
4. Hitung komponen operasional baru jika dipecah jadi 5 service.
5. Tulis argumen jujur kapan "belum pakai microservices" justru keputusan senior.

---

## 18. Checklist Kelulusan Topik Kapan Tidak Memakai Microservices

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat biaya nyata microservices, bukan hanya janji skalabilitas,
- membedakan masalah boundary buruk dari masalah monolith itu sendiri,
- menilai kesiapan tim dan organisasi,
- mempertahankan modular monolith saat itu pilihan paling sehat,
- menolak distribusi dini yang hanya menambah penderitaan.

---

## 19. Ringkasan Brutal

- Microservices bukan level-up otomatis.
- Sangat sering, microservices hanyalah cara mahal
  untuk menyebarkan masalah yang belum dipahami.
- Engineer senior tahu kapan harus memecah.
- Engineer yang lebih senior lagi tahu kapan belum saatnya.
