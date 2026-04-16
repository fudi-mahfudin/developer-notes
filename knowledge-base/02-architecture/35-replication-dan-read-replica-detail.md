# Replication dan Read Replica - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu replication
- apa itu read replica
- kenapa orang memakai replica
- trade-off freshness, scale, dan failover
- kesalahan umum saat memakai replica seolah gratis

Banyak tim ingin read replica
karena terdengar seperti:
- scaling gampang
- tinggal arahkan read ke replica

Realitanya tidak sesederhana itu.

Replica bisa sangat berguna.
Replica juga bisa menciptakan bug aneh
jika ekspektasi konsistensinya tidak jelas.

---

## 1. Apa Itu Replication?

Replication adalah proses
menduplikasi perubahan data
dari satu node utama
ke node lain.

Tujuannya bisa untuk:
- high availability
- read scaling
- disaster recovery
- geographic distribution

Tapi setiap tujuan
membawa konsekuensi desain yang berbeda.

---

## 2. Apa Itu Read Replica?

Read replica adalah replika database
yang biasanya dipakai untuk beban baca.

Mental model umum:
- write ke primary
- sebagian read ke replica

Ini membantu
mengurangi tekanan read pada primary.

Tetapi replica sering tidak selalu
100% up to date pada setiap saat.

Itu inti trade-off-nya.

---

## 3. Kenapa Orang Memakainya?

Alasan umum:
- banyak query baca
- reporting/read traffic tinggi
- ingin isolasi workload
- ingin cadangan failover tertentu

Jika read jauh lebih dominan daripada write,
replica bisa sangat membantu.

Tapi hanya jika aplikasi siap
menghadapi lag dan routing complexity.

---

## 4. Replica Lag

Masalah paling penting:
- replication lag

Artinya:
- primary sudah menerima write
- replica belum melihatnya

Akibatnya:
- stale read
- read-after-write inconsistency
- UI terlihat "tidak menyimpan"

Ini bukan bug minor.
Ini karakter arsitektur yang harus dipahami.

---

## 5. Read-After-Write Problem

Use case klasik:
1. user update profil
2. request berikutnya membaca dari replica
3. replica belum sinkron
4. user melihat data lama

Kalau tim tidak sadar ini mungkin terjadi,
debugging akan melelahkan.

Karena secara teknis write sukses,
tapi user experience terasa gagal.

---

## 6. Tidak Semua Read Cocok ke Replica

Ini aturan penting.

Read yang cocok ke replica:
- dashboard
- analytics operasional ringan
- list yang toleran sedikit stale
- reporting

Read yang sering tidak cocok:
- read-after-write kritikal
- validasi keputusan bisnis inti
- permission/security-sensitive checks tertentu

Replica harus dipilih per use case,
bukan semua SELECT dilempar ke sana.

---

## 7. Primary untuk Source of Truth

Primary biasanya tetap:
- sumber write
- sumber freshest truth

Replica adalah turunan.

Kalau aplikasi lupa siapa source of truth-nya,
reasoning consistency jadi kacau.

Gunakan replica
untuk mengurangi beban,
bukan untuk mengaburkan otoritas data.

---

## 8. Scaling Myth

Replica membantu read scaling,
tapi tidak menyelesaikan semua masalah database.

Ia tidak memperbaiki:
- query buruk
- indexing buruk
- schema buruk
- N+1 liar

Kalau masalah utama adalah query jelek,
replica hanya memberi napas sementara.

Masalah dasarnya tetap hidup.

---

## 9. Failover Tidak Sama dengan Read Scaling

Orang sering mencampur:
- replica untuk failover
- replica untuk read scaling

Padahal kebutuhannya beda.

Untuk failover,
kamu butuh:
- promotion strategy
- replication health check
- split-brain avoidance

Untuk read scaling,
kamu butuh:
- routing strategy
- lag awareness

Jangan campur tujuan tanpa desain jelas.

---

## 10. Routing Strategy

Pertanyaan penting:
- read mana ke primary?
- read mana ke replica?

Pilihan umum:
- route by endpoint
- route by consistency requirement
- stick to primary after recent write

Kalau routing tidak eksplisit,
bug consistency akan acak.

Arsitektur replica sehat
butuh aturan routing yang bisa dijelaskan.

---

## 11. Sticky Read After Write

Salah satu strategi:
- setelah user melakukan write,
  baca untuk user/request itu sementara diarahkan ke primary

Ini membantu mengurangi
read-after-write inconsistency.

Tidak selalu perlu,
tapi sangat berguna untuk use case tertentu.

Ini contoh bahwa solusi replica
sering butuh lapisan kebijakan aplikasi.

---

## 12. Replica untuk Reporting

Replica sangat cocok
untuk query baca berat tertentu:
- reporting
- export
- dashboard agregasi

Kenapa?
- primary tidak terlalu terganggu
- stale beberapa detik/menit kadang masih dapat diterima

Tapi tetap pastikan
reporting query yang gila
tidak menghancurkan replica juga.

---

## 13. Healthcare Example

Dalam sistem healthcare:

Cocok ke replica:
- dashboard manajemen
- laporan operasional
- statistik antrian

Hati-hati atau tetap ke primary:
- cek ketersediaan slot sebelum booking
- lihat hasil update terbaru untuk tindakan kritis
- pemeriksaan state yang menentukan keputusan medis/operasional sensitif

Freshness requirement
harus memimpin routing choice.

---

## 14. Monitoring Replication Health

Kalau memakai replica,
kamu harus memantau:
- replication lag
- replica availability
- query load per replica
- failover readiness
- stale read complaints

Tanpa itu,
tim hanya akan berkata:
- "mungkin replikanya telat"

Itu bukan operasi sehat.

---

## 15. Replica Promotion dan Incident

Saat primary gagal,
apa yang terjadi?

Pertanyaan:
- siapa yang dipromosikan?
- berapa data loss window?
- bagaimana aplikasi reroute?
- bagaimana mencegah dua primary?

Replica strategy tanpa failover plan
adalah setengah arsitektur.

---

## 16. Cross-Region Complexity

Kalau replication lintas region,
lag bisa lebih besar.

Keuntungan:
- regional resilience
- locality read tertentu

Biaya:
- consistency makin rumit
- failover makin kompleks

Jangan tambah region
hanya demi arsitektur terlihat internasional.

---

## 17. Anti-Pattern Umum

1. Mengirim semua read ke replica tanpa klasifikasi.
2. Mengira replica menyelesaikan query buruk.
3. Mengabaikan read-after-write inconsistency.
4. Tidak memonitor replication lag.
5. Memiliki replica untuk failover tanpa plan promotion yang jelas.

---

## 18. Best Practices

- gunakan replica untuk use case baca yang memang toleran terhadap lag.
- pertahankan primary sebagai freshest source of truth.
- rancang routing berdasar kebutuhan consistency.
- monitor lag dan health replica secara aktif.
- gabungkan replica strategy dengan incident/failover plan yang nyata.

---

## 19. Pertanyaan Desain Penting

Sebelum menambah read replica, tanya:
1. Masalah utama apa yang ingin dipecahkan?
2. Query mana yang boleh membaca data sedikit stale?
3. Apakah ada read-after-write requirement?
4. Bagaimana read routing akan dikontrol?
5. Bagaimana failover dan lag dimonitor?

---

## 20. Mini Latihan

Latihan:
1. Klasifikasikan endpoint yang cocok ke primary vs replica.
2. Rancang strategy sticky read-after-write sederhana.
3. Tentukan metrik untuk replication lag incident.
4. Evaluasi apakah replica dipakai untuk read scaling atau failover.
5. Cari query buruk yang seharusnya diperbaiki, bukan dilempar ke replica.

---

## 21. Jawaban Contoh Ringkas

Replica cocok untuk:
- dashboard
- reporting
- analytics baca

Primary tetap untuk:
- write
- fresh read kritikal
- validasi state penting

---

## 22. Checklist Kelulusan Topik Replication dan Read Replica

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan manfaat replica tanpa hype,
- memahami replication lag dan stale read,
- merancang routing primary vs replica,
- memikirkan failover dan observability,
- menghindari penggunaan replica sebagai plester untuk query buruk.

---

## 23. Ringkasan Brutal

- Read replica bukan tombol "scale database".
- Ia adalah trade-off freshness demi kapasitas dan fleksibilitas.
- Kalau kamu tidak tahu read mana yang boleh stale,
  kamu belum siap memakai replica dengan aman.
