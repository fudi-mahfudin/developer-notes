# Frontend Caching Strategy - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu caching di frontend
- jenis cache yang relevan
- trade-off cache freshness vs speed
- strategi invalidasi
- hubungan cache dengan UX dan arsitektur

Caching terdengar seperti optimisasi.
Padahal pada skala tertentu,
ini adalah keputusan arsitektur.

Cache yang baik membuat aplikasi terasa cepat.
Cache yang buruk membuat user melihat kebohongan.

---

## 1. Apa Itu Cache?

Cache adalah penyimpanan sementara
untuk mempercepat akses data atau asset.

Di frontend, yang bisa di-cache antara lain:
- static assets
- API responses
- query results
- images
- halaman/rendered output tertentu

Tujuan cache:
- mengurangi latency
- mengurangi beban network
- meningkatkan perceived performance

Tapi konsekuensinya:
- risiko stale data

---

## 2. Cache Selalu Trade-Off

Tidak ada cache gratis.

Saat kamu membuat sesuatu lebih cepat,
kamu juga berpotensi membuatnya:
- lebih stale
- lebih sulit diinvalidasi
- lebih sulit dipahami

Pertanyaan utama:
- seberapa lama data boleh basi?

Kalau itu tidak dijawab,
strategi cache biasanya asal cepat saja.

---

## 3. Jenis Cache di Frontend

Beberapa kategori penting:
- browser cache untuk asset
- in-memory cache di app runtime
- query/data cache
- service worker cache
- CDN/edge cache yang berdampak ke frontend experience

Masing-masing punya karakter berbeda.

Jangan campur semua istilah cache
seolah sama.

---

## 4. Static Asset Cache

Untuk JS, CSS, image, font,
caching sangat penting.

Strategi umum:
- file diberi content hash
- cache panjang di browser/CDN
- saat konten berubah, URL berubah

Ini relatif aman
karena invalidasi mengikuti perubahan nama file.

Static asset cache
biasanya area paling mudah dan paling bernilai tinggi.

---

## 5. API/Data Cache

Ini lebih sulit.

Karena data API:
- bisa berubah
- punya freshness requirement
- bisa berbeda per user

Caching response data
butuh jawaban untuk:
- kapan dianggap stale?
- kapan di-refresh?
- kapan dihapus?

Kalau jawaban ini kabur,
bug data lama akan muncul.

---

## 6. In-Memory Cache

Keunggulan:
- cepat
- sederhana
- cocok untuk session runtime aktif

Kelemahan:
- hilang saat refresh
- tidak tahan across tabs/session

Cocok untuk:
- query result sementara
- detail data yang baru diakses
- cache ringan selama aplikasi terbuka

---

## 7. Persistent Cache

Contoh:
- localStorage
- IndexedDB

Keunggulan:
- bertahan lebih lama
- bisa dipakai untuk offline-ish experience

Kelemahan:
- invalidasi lebih sulit
- risiko data lama makin besar
- perlu hati-hati dengan data sensitif

Jangan simpan data sensitif sembarangan
demi "performance".

---

## 8. Service Worker Cache

Ini kuat,
tapi juga berbahaya jika tidak dipahami.

Bisa dipakai untuk:
- asset offline
- caching response
- app shell

Tetapi:
- debugging lebih sulit
- invalidasi bisa membingungkan
- user bisa terjebak pada versi lama

Kalau tim belum siap,
service worker cache mudah jadi sumber frustrasi.

---

## 9. Cache Freshness Models

Beberapa pendekatan umum:
- cache-first
- network-first
- stale-while-revalidate
- no-cache / always revalidate

Pemilihan tergantung:
- pentingnya freshness
- toleransi latency
- kebutuhan offline

Tidak ada satu model cocok untuk semua endpoint.

---

## 10. Stale-While-Revalidate

Ini pola populer:
- tampilkan cache lebih dulu
- ambil data baru di background
- update UI saat data baru datang

Keuntungannya:
- UI terasa cepat
- data tetap bisa diperbarui

Kelemahannya:
- user sempat melihat data lama

Pola ini bagus
jika data boleh sedikit stale.

---

## 11. Invalidation Adalah Masalah Utama

Menyimpan cache itu mudah.
Menginvalidasi dengan benar itu sulit.

Pertanyaan penting:
- data apa yang berubah setelah mutation?
- cache mana yang harus dibersihkan?
- kapan re-fetch dilakukan?

Sebagian besar bug cache
terjadi bukan karena caching ada,
tapi karena invalidasinya lemah.

---

## 12. Mutation dan Cache

Saat user:
- create
- update
- delete

cache terkait harus dipikirkan.

Contoh:
- update appointment status

Maka mungkin perlu invalidasi:
- daftar appointment
- detail appointment
- dashboard summary

Kalau tidak,
UI akan saling bertentangan.

---

## 13. Personalization dan Security

Cache untuk data personal
harus lebih hati-hati.

Pertanyaan:
- apakah data ini spesifik per user?
- aman tidak jika tersimpan persisten?
- apakah ada risiko data user lain bocor?

Di aplikasi healthcare,
ini sangat sensitif.

Kecepatan tidak boleh menang
atas keamanan data pasien.

---

## 14. Healthcare Example

Contoh:

Boleh di-cache agresif:
- icon
- CSS
- gambar edukasi
- halaman help publik

Boleh di-cache dengan kontrol:
- daftar jadwal dokter publik
- direktori layanan

Harus hati-hati:
- detail pasien
- hasil lab
- catatan medis
- informasi appointment personal

Semua data sensitif
butuh kebijakan cache yang konservatif.

---

## 15. Cache dan Perceived Performance

Kadang user tidak butuh data absolut tercepat.
User butuh aplikasi terasa responsif.

Cache membantu:
- mengurangi loading kosong
- mempercepat navigasi ulang
- membuat UI terasa stabil

Tetapi perceived performance
tidak boleh dicapai dengan dusta operasional.

Kalau user melihat status lama dan membuat keputusan salah,
cache menjadi bahaya.

---

## 16. Cache Scope

Tanya:
- cache ini per component?
- per page?
- per feature?
- per user session?
- lintas user di CDN?

Scope menentukan risiko dan manfaat.

Semakin luas scope cache,
semakin besar dampak bug invalidasi.

---

## 17. TTL Bukan Solusi Universal

Banyak tim malas dan berkata:
- "sudah kasih TTL 5 menit saja"

TTL membantu,
tapi bukan obat universal.

Kalau data kritikal berubah dalam 30 detik,
TTL 5 menit itu kebohongan yang rapi.

TTL harus mengikuti kebutuhan bisnis,
bukan kenyamanan engineer semata.

---

## 18. Observability untuk Cache

Jika caching penting,
kamu perlu tahu:
- cache hit rate
- miss rate
- staleness complaints
- mutation-induced inconsistency

Kalau tidak diukur,
kamu tidak benar-benar tahu
apakah strategi cache membantu atau merusak.

---

## 19. Anti-Pattern Umum

1. Meng-cache semua data tanpa klasifikasi.
2. Menyimpan data sensitif secara persisten tanpa kontrol.
3. Mengandalkan TTL sembarangan.
4. Tidak memikirkan invalidasi setelah mutation.
5. Menganggap cache sebagai trik performa tanpa dampak UX dan keamanan.

---

## 20. Best Practices

- klasifikasikan data berdasarkan sensitivity dan freshness requirement.
- cache asset statis secara agresif dengan content hashing.
- gunakan data cache hanya jika invalidasinya bisa dipahami.
- pilih strategi freshness sesuai use case.
- konservatif untuk data sensitif dan user-specific.

---

## 21. Pertanyaan Desain Penting

Sebelum menambah cache, tanya:
1. Apa yang sebenarnya ingin dipercepat?
2. Seberapa stale data ini boleh?
3. Apakah data ini sensitif?
4. Apa yang memicu invalidasi?
5. Apa dampaknya jika user melihat data lama?
6. Apakah cache ini bisa dijelaskan dan dioperasikan oleh tim?

---

## 22. Mini Latihan

Latihan:
1. Klasifikasikan endpoint mana yang boleh di-cache agresif.
2. Tentukan endpoint mana yang harus sangat konservatif.
3. Buat skenario invalidasi setelah update appointment.
4. Nilai apakah TTL 10 menit masuk akal untuk dashboard operasional.
5. Tentukan strategi cache untuk asset, query, dan data sensitif.

---

## 23. Jawaban Contoh Ringkas

Agresif:
- JS/CSS hashed assets
- dokumentasi publik

Moderat:
- direktori dokter publik
- katalog layanan

Konservatif:
- detail pasien
- jadwal personal
- catatan medis

---

## 24. Checklist Kelulusan Topik Frontend Caching Strategy

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan jenis cache frontend utama,
- menilai trade-off speed vs freshness,
- merancang invalidasi dasar,
- memahami risiko keamanan pada data sensitif,
- memilih strategi cache yang sesuai konteks bisnis.

---

## 25. Ringkasan Brutal

- Cache bukan cuma alat bikin cepat.
- Cache adalah alat menukar kebenaran dengan kecepatan.
- Kalau kamu tidak sadar apa yang kamu korbankan,
  strategi cache-mu belum matang.
