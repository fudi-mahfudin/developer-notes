# Data Fetching Strategy, Caching, Revalidation, dan Invalidation

## Tujuan

Topik ini penting karena banyak aplikasi frontend memburuk bukan karena UI jelek, tetapi karena data flow-nya tidak punya strategi.
Request terlalu banyak, data stale, invalidation acak, cache tidak dipahami, dan tim mulai menambal perilaku aneh dengan refetch di mana-mana.

Kalau pemahaman data fetching Anda dangkal, gejala yang sering muncul:

- loading berulang yang tidak perlu;
- data lama tampil terlalu lama atau justru refetch berlebihan;
- state client dan server saling bertabrakan;
- biaya network membengkak;
- bug sulit dijelaskan karena siapa pemilik data tidak jelas.

## Kenapa Topik Ini Penting

Untuk aplikasi besar, data bukan hanya "diambil lalu ditampilkan".
Anda harus memikirkan:

- kapan data diambil;
- di mana data diambil;
- berapa lama data dianggap valid;
- kapan data harus di-refresh;
- siapa yang bertanggung jawab meng-invalidasi.

Ini masalah arsitektur, bukan sekadar hook fetching favorit.

## Model Mental yang Benar

Pegang ini:

1. Data fetching adalah keputusan lifecycle dan ownership.
2. Cache tanpa invalidation yang jelas hanya menyimpan bug lebih lama.
3. Refetch berlebihan bukan solusi, hanya pemborosan yang kadang menyamarkan masalah.
4. Staleness bukan selalu buruk; ia harus dikelola sesuai kebutuhan bisnis.
5. Strategi fetching yang sehat bergantung pada jenis data dan UX yang diinginkan.

## Pertanyaan Dasar yang Harus Dijawab

Untuk setiap jenis data, tim harus bisa menjawab:

- apakah data dibutuhkan saat initial render?
- apakah data bersifat user-specific?
- seberapa sering data berubah?
- seberapa mahal request-nya?
- apa konsekuensi menampilkan data stale beberapa detik atau menit?
- siapa pemilik refresh-nya?

Kalau pertanyaan ini tidak dijawab, strategi akan berubah menjadi campuran kebiasaan acak.

## Jenis Data Secara Praktis

Dalam aplikasi besar, data sering bisa dibedakan menjadi:

- static-ish content;
- frequently changing shared data;
- user-specific dashboard data;
- realtime-ish interaction data;
- mutation-driven data yang perlu sinkron cepat.

Setiap tipe butuh strategi berbeda.

## Fetching di Server vs Client

Di `Next.js` modern, salah satu keputusan pertama adalah lokasi fetch:

- server-side fetch;
- client-side fetch;
- kombinasi keduanya.

Server-side fetching cocok saat:

- data diperlukan untuk initial render;
- SEO atau fast first content penting;
- auth/secret ada di server;
- interaktivitas client tidak dominan di tahap awal.

Client-side fetching cocok saat:

- data bergantung pada interaksi setelah page load;
- polling atau live refresh diperlukan;
- perubahan query bergantung pada state browser;
- UX yang sangat interaktif lebih utama.

## Ownership Data

Masalah besar muncul saat resource yang sama di-fetch dari terlalu banyak tempat.

Contoh:

- page fetch `user`;
- header fetch `user` lagi;
- sidebar fetch `user` lagi;
- hook client fetch `user` lagi setelah mount.

Hasilnya:

- network boros;
- consistency sulit dipikirkan;
- invalidation makin rumit;
- debugging jadi berantakan.

Strategi yang sehat biasanya punya ownership cukup jelas per resource utama.

## Caching

### Definisi Singkat

Caching berarti menyimpan hasil fetch agar request serupa tidak selalu mengulang kerja penuh.

Tujuannya bisa:

- mengurangi latency;
- mengurangi load ke backend;
- mengurangi flicker/loading;
- meningkatkan perceived performance.

Tetapi cache tidak gratis.
Ia memperkenalkan kemungkinan data stale.

## Cache Bukan Selalu Benar

Ini poin dasar yang harus diterima.
Cache memberi performa dengan trade-off consistency.

Pertanyaannya bukan:

- "pakai cache atau tidak?"

Tetapi:

- "untuk data ini, berapa tingkat staleness yang dapat diterima?"
- "siapa yang memutuskan kapan cache tidak lagi valid?"

## Jenis Cache yang Relevan

Di aplikasi frontend modern, Anda sering berurusan dengan:

- browser cache;
- framework cache;
- CDN cache;
- application-level fetch cache;
- client state cache library;
- memoized derived data.

Kesalahan umum adalah membicarakan "cache" seolah hanya satu lapisan.
Padahal invalidation di satu lapisan tidak otomatis menyelesaikan lapisan lain.

## Stale Data Tidak Selalu Buruk

Data stale beberapa detik mungkin sangat bisa diterima untuk:

- daftar artikel;
- statistik yang tidak kritis real-time;
- daftar referensi;
- profile info yang jarang berubah.

Tetapi bisa berbahaya untuk:

- saldo;
- stok;
- status pembayaran;
- approval state yang kritis.

Jadi strategi cache harus mengikuti risiko bisnis, bukan kebiasaan coding.

## Revalidation

Revalidation adalah proses memperbarui data cached agar tetap cukup segar tanpa selalu memaksa fetch penuh di setiap render.

Ini berguna untuk menyeimbangkan:

- freshness;
- performance;
- load ke backend.

## Kapan Revalidation Tepat

Revalidation masuk akal saat:

- data relatif stabil tetapi tetap berubah sesekali;
- first render cepat penting;
- data tidak harus selalu real-time sempurna;
- backend ingin dilindungi dari fetch berlebihan.

## Invalidation

Invalidation menjawab:

"Kapan cache lama tidak boleh lagi dipercaya?"

Ini bagian tersulit.
Karena cache mudah dibuat.
Yang sulit adalah tahu kapan ia harus dibuang atau direfresh.

## Kenapa Invalidation Sulit

Karena perubahan data bisa dipicu dari banyak tempat:

- user mutation lokal;
- background sync;
- admin panel lain;
- webhook atau event;
- perubahan resource turunan;
- update lintas halaman.

Kalau invalidation logic tidak jelas, data yang salah bisa bertahan terlalu lama atau refetch terjadi di mana-mana tanpa kendali.

## Event-Driven Invalidation vs Time-Based Revalidation

Ada dua pendekatan besar:

### Time-Based

Data dianggap valid selama jangka waktu tertentu.
Setelah itu boleh di-refresh.

Kelebihan:

- sederhana;
- murah untuk dipikirkan.

Kekurangan:

- tidak responsif terhadap mutation penting;
- bisa terlalu stale atau terlalu agresif.

### Event-Driven

Mutation atau event tertentu memicu invalidation.

Kelebihan:

- lebih akurat terhadap perubahan nyata.

Kekurangan:

- lebih kompleks;
- butuh ownership dan dependency graph yang jelas.

Sistem matang sering memakai kombinasi keduanya.

## Mutation dan Cache Consistency

Begitu user mengubah data, pertanyaan besar muncul:

- apakah cache resource ini harus langsung invalid?
- apakah update optimistik dipakai?
- apakah semua dependent query harus di-refresh?
- apakah derived list juga perlu sinkron?

Kalau mutation strategy tidak selaras dengan cache strategy, UI akan terasa tidak dapat dipercaya.

## Optimistic Update vs Refetch

Optimistic update bisa membuat UX cepat.
Tetapi risikonya:

- rollback rumit jika gagal;
- derived data bisa inkonsisten;
- beberapa cache entry perlu diubah sinkron.

Refetch lebih sederhana secara mental, tetapi:

- lebih lambat;
- menambah network cost;
- kadang flicker.

Tidak ada jawaban universal.
Pilih berdasarkan kompleksitas domain dan toleransi inconsistency sementara.

## Request Waterfall

Masalah klasik di aplikasi besar:

- parent fetch;
- child baru render lalu fetch lagi;
- child berikutnya bergantung pada child sebelumnya lalu fetch lagi.

Waterfall seperti ini membuat perceived performance jelek.

Strategi fetching yang matang berusaha:

- parallelize bila aman;
- lift data ownership ke layer yang tepat;
- mengurangi fetch berantai yang tidak perlu.

## Preloading dan Prefetching

Kadang data bisa diambil sebelum user benar-benar membutuhkannya.

Contoh:

- route prefetch;
- hover prefetch;
- dashboard sections predicted by flow.

Tetapi hati-hati:

- prefetch berlebihan memboroskan bandwidth;
- data bisa stale sebelum dipakai;
- low-priority traffic bisa mengganggu critical path.

## Client Cache Library

Library seperti React Query atau SWR memberi primitives untuk:

- dedupe request;
- stale-while-revalidate;
- invalidation;
- mutation handling;
- retry control.

Tetapi library bukan strategi.
Kalau tim tidak punya aturan kapan query key, ownership, dan invalidation dipakai, library hanya mempercepat kekacauan.

## Query Key Discipline

Bila memakai cache/query library, query key harus konsisten dan bermakna.

Kalau query key:

- tidak stabil;
- terlalu generik;
- tidak mencerminkan parameter penting;

maka invalidation dan dedupe akan salah.

Ini kelihatannya detail.
Sebenarnya ini fondasi maintainability cache.

## Cache Stampede di Frontend

Meski istilah ini sering dipakai di backend, versi frontend juga ada:

- banyak komponen mount bersamaan;
- semua meminta resource sama;
- tanpa dedupe atau ownership yang jelas.

Hasilnya:

- request ganda;
- UI lebih ribut dari perlu;
- backend menerima load yang sebenarnya bisa dihindari.

## Revalidation Setelah Navigation

Di aplikasi besar, navigasi cepat antar halaman memunculkan pertanyaan:

- apakah data lama masih boleh dipakai sebentar?
- apakah route baru harus blocking menunggu fetch?
- apakah partial stale UI acceptable?

Keputusan ini harus disesuaikan dengan konteks UX.

## Error Handling dan Fetch Strategy

Strategi data yang sehat juga harus memikirkan:

- apa yang terjadi saat fetch gagal;
- apakah data stale lama masih boleh ditampilkan;
- apakah user melihat fallback, toast, atau retry CTA;
- bagaimana membedakan initial load failure vs background revalidation failure.

Kalau semua failure diperlakukan sama, UX dan observability ikut kacau.

## Data Freshness adalah Keputusan Produk Juga

Engineer sering memperlakukan ini sebagai urusan teknis murni.
Padahal freshness threshold sering adalah keputusan produk/bisnis.

Misalnya:

- feed berita boleh stale 1 menit;
- saldo tidak boleh stale 1 menit;
- dashboard admin mungkin cukup stale 10 detik;
- status approval mungkin perlu near-real-time.

Kalau Anda tidak bicara dalam bahasa kebutuhan produk, fetching strategy Anda akan normatif dan dangkal.

## Anti-Pattern Umum

### 1. Refetch di Mana-Mana

Begitu bingung soal consistency, tim menambah refetch manual di berbagai tempat.
Biasanya ini hanya menutupi arsitektur ownership yang buruk.

### 2. Cache Tanpa Invalidation Policy

Ini mengubah cache menjadi sumber data bohong.

### 3. Resource Sama Diambil Ulang oleh Banyak Komponen

Ownership kabur dan network boros.

### 4. Menganggap Semua Data Harus Real-Time

Ini sering hanya memboroskan resource tanpa nilai bisnis nyata.

## Heuristik Senior

1. Mulai dari karakter data dan kebutuhan freshness, bukan dari library.
2. Tentukan ownership resource utama.
3. Bedakan strategi initial fetch, background refresh, dan mutation sync.
4. Pakai cache dengan kebijakan invalidation yang jelas.
5. Jangan refetch berlebihan untuk menutupi desain yang kabur.
6. Gunakan time-based dan event-driven refresh dengan sengaja.
7. Pastikan query key dan cache boundary konsisten.

## Pertanyaan Interview

### Dasar

- Kenapa data fetching strategy bukan sekadar memilih hook fetch?
- Apa beda caching, revalidation, dan invalidation?
- Kapan stale data masih bisa diterima?
- Kenapa refetch berlebihan itu buruk?

### Menengah

- Bagaimana Anda memutuskan fetch di server atau client?
- Apa risiko resource yang sama di-fetch di banyak tempat?
- Kapan optimistic update layak dipakai?
- Bagaimana query key memengaruhi invalidation?

### Senior

- Bagaimana Anda mendesain strategi data untuk aplikasi besar dengan kebutuhan freshness berbeda per resource?
- Bagaimana Anda menggabungkan time-based dan event-driven invalidation?
- Bagaimana Anda mencegah cache menjadi sumber inconsistency lintas halaman?
- Bagaimana Anda melakukan review terhadap fetch ownership di codebase tim besar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dashboard lambat karena fetch waterfall;
- data user di header dan page tidak sinkron;
- mutation berhasil tetapi list tidak ikut update;
- backend dibanjiri request duplikat dari banyak komponen;
- UI menampilkan data lama terlalu lama tanpa kejelasan kapan refresh.

## Ringkasan Brutal

- Data fetching adalah keputusan arsitektur, bukan sekadar implementasi request.
- Cache membantu performa, tetapi membawa utang freshness.
- Revalidation dan invalidation harus dirancang, bukan ditambal.
- Refetch di mana-mana adalah tanda ownership data buruk.
- Engineer senior berbicara tentang freshness, cost, dan invariants data, bukan hanya tentang hook.

## Checklist Pemahaman

- Saya bisa membedakan caching, revalidation, dan invalidation.
- Saya tahu stale data tidak selalu buruk, tergantung konteks bisnis.
- Saya paham ownership resource harus cukup jelas.
- Saya tahu kapan fetch di server atau client lebih masuk akal.
- Saya sadar mutation strategy harus sinkron dengan cache strategy.
- Saya tidak memakai refetch berlebihan sebagai obat semua masalah.

## Penutup

Frontend besar yang sehat tidak hanya cepat dirender.
Ia juga punya aliran data yang dapat dipercaya, masuk akal, dan bisa dijelaskan.

Kalau data strategy Anda tidak bisa dijelaskan dengan jelas, UI cepat atau indah pun tetap berdiri di atas fondasi yang rapuh.
