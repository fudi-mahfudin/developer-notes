# Pagination, Filtering, Sorting, dan Search Semantics

## Tujuan

Topik ini penting karena banyak API list endpoint terlihat sederhana, tetapi sebenarnya menjadi sumber inkonsistensi besar antara backend dan frontend.

Kalau semantics list endpoint lemah:

- performa buruk;
- query liar;
- UX tidak stabil;
- hasil page berubah-ubah;
- client menulis banyak workaround.

## Kenapa Topik Ini Penting

List endpoint hampir selalu menjadi jalur terpanas:

- daftar order;
- daftar invoice;
- daftar patient;
- tabel admin;
- hasil pencarian;
- audit log.

Kalau contract-nya kabur, biaya integrasi dan operasional akan terus naik.

## Model Mental yang Benar

Pegang ini:

1. List endpoint adalah contract query, bukan sekadar `GET` dengan banyak parameter.
2. Pagination, filter, sort, dan search harus punya semantics eksplisit.
3. Konsistensi antar endpoint sangat penting.
4. Query power harus seimbang dengan keamanan dan performa.
5. Search semantics yang kabur membuat user bingung dan backend rapuh.

## Pagination

Pagination memecah result besar menjadi chunk yang bisa dikelola.
Tujuannya:

- melindungi backend;
- menurunkan payload size;
- membuat UX lebih terstruktur;
- menghindari load besar yang tidak perlu.

## Offset Pagination

Contoh:

- `page=3&limit=20`

Kelebihan:

- sederhana;
- mudah dipahami UI.

Kekurangan:

- page jauh bisa mahal;
- hasil bisa tidak stabil jika data berubah di tengah;
- duplicate atau missing item bisa muncul saat dataset aktif berubah.

## Cursor/Keyset Pagination

Contoh:

- `after=cursorValue`

Kelebihan:

- lebih stabil untuk dataset yang terus berubah;
- lebih sehat untuk page jauh;
- sering lebih efisien.

Kekurangan:

- lebih kompleks untuk client;
- semantics cursor harus jelas;
- random jump ke page tertentu lebih sulit.

## Pilih Berdasarkan Use Case

Offset cocok untuk:

- dataset kecil-menengah;
- admin list sederhana;
- use case yang tidak terlalu sensitif terhadap drift halaman.

Cursor lebih cocok untuk:

- feed;
- event log;
- dataset besar;
- data yang terus bertambah/berubah.

## Sorting

Sorting harus punya aturan jelas:

- field mana yang boleh dipakai;
- arah ascending/descending;
- default sort apa;
- tie-breaker apa jika nilai sama.

Tanpa tie-breaker yang stabil, pagination bisa berperilaku aneh.

## Stable Ordering

Ini penting.
Kalau dua row punya nilai sort sama, API sebaiknya tetap punya aturan urutan tambahan yang stabil, misalnya by primary key atau timestamp sekunder.

Kalau tidak:

- hasil page bisa lompat;
- item bisa muncul dua kali atau hilang antar page.

## Filtering

Filtering juga perlu kontrak eksplisit:

- filter exact match atau partial?
- multiple value didukung atau tidak?
- kombinasi filter berarti AND atau OR?
- filter pada field tertentu legal atau tidak?

Jika semantics ini tidak jelas, consumer menebak-nebak.

## Search

Search bukan cuma filter dengan nama lain.

Pertanyaan penting:

- search itu full text atau partial string?
- case sensitive atau tidak?
- prefix match atau contains?
- typo tolerance ada atau tidak?
- search berlaku ke field mana saja?

Kalau search semantics kabur, user dan frontend akan menganggap API "bug" padahal kontraknya tidak pernah jelas.

## Query Contract Harus Dibatasi

Jangan memberi client kebebasan tak terbatas:

- sort field bebas;
- filter field bebas;
- arbitrary query grammar tak terkendali.

Kebebasan liar seperti ini:

- sulit diamankan;
- sulit dioptimasi;
- membuat observability berat;
- meningkatkan risiko expensive query.

## Validation Penting

Parameter list endpoint harus divalidasi:

- limit maksimum;
- sort field legal;
- operator legal;
- format cursor valid;
- filter shape benar.

Kalau tidak, API membuka pintu ke performa buruk dan behavior tak terdefinisi.

## Default yang Jelas

List endpoint harus punya default eksplisit:

- default limit;
- default sort;
- apakah archived item ikut atau tidak;
- bagaimana null diperlakukan.

Default tersembunyi yang berbeda antar endpoint menambah friction.

## Total Count

Pertanyaan penting:

- apakah total count selalu perlu?

Count bisa mahal pada dataset tertentu.
Jangan menganggap metadata count selalu gratis.

Kadang UI butuh.
Kadang tidak.
Kadang cukup approximate.

## Search vs Filter Mixing

Kalau satu endpoint mendukung:

- search;
- banyak filter;
- sort;
- pagination,

kombinasinya harus dipikirkan.

Contoh:

- search dijalankan dulu lalu filter?
- atau semua predicate setara?
- bagaimana empty search diperlakukan?

Kalau tidak jelas, hasil API terasa arbitrer.

## Security dan Query Exposure

List endpoint bisa menjadi jalur bocor data jika:

- filter memperbolehkan field sensitif;
- sort berdasarkan field yang tak semestinya diungkap;
- search mengizinkan enumeration terlalu mudah.

API list bukan hanya soal UX.
Ia juga soal kontrol exposure data.

## Performance Guardrails

Untuk menjaga backend:

- limit maksimum;
- field whitelist;
- indexed filter preference;
- rate limit tertentu bila perlu;
- dedicated search backend untuk kebutuhan berat.

Jangan paksa database OLTP biasa melayani search semantics berat jika bukan tempat yang tepat.

## Search Engine vs Database Query

Untuk kebutuhan sederhana, database search mungkin cukup.
Untuk kebutuhan:

- relevansi kompleks;
- typo tolerance;
- ranking;
- highlighting;
- beban besar,

search engine atau read model khusus mungkin lebih sehat.

## API Shape Consistency

Semantics list endpoint sebaiknya konsisten lintas service/resource:

- `limit`
- `cursor`
- `sort`
- `order`
- `filter`

atau pola lain yang dipilih.

Yang penting: seragam.

## Anti-Pattern Umum

### 1. Limit Tak Terbatas

Cepat menjadi masalah performa.

### 2. Sorting Bebas pada Semua Field

Tidak aman dan tidak selalu efisien.

### 3. Search Semantics Tidak Didefinisikan

User bingung, tim support bingung, backend bingung.

### 4. Offset Pagination Dipakai di Dataset Sangat Aktif Tanpa Sadar Trade-off

Hasil page menjadi tidak stabil.

## Heuristik Senior

1. Tentukan contract query secara eksplisit.
2. Gunakan stable ordering untuk list yang dipaginate.
3. Batasi field filter/sort/search pada whitelist yang jelas.
4. Pilih offset atau cursor berdasarkan dataset dan UX.
5. Jangan anggap total count selalu gratis.
6. Search semantics harus bisa dijelaskan dalam satu paragraf yang jujur.
7. Lindungi backend dengan validation dan limit default yang sehat.

## Pertanyaan Interview

### Dasar

- Apa beda offset dan cursor pagination?
- Kenapa stable sort penting?
- Kenapa filter semantics harus jelas?
- Kenapa search bukan sekadar filter biasa?

### Menengah

- Kapan offset masih cukup baik?
- Kenapa total count bisa mahal?
- Apa risiko memberi kebebasan sort/filter ke semua field?
- Bagaimana Anda mendesain contract query yang konsisten lintas endpoint?

### Senior

- Bagaimana Anda memilih antara cursor dan offset untuk admin list vs activity feed?
- Bagaimana Anda menjelaskan trade-off search di database vs search engine?
- Bagaimana Anda menjaga list endpoint tetap kuat saat data volume naik?
- Bagaimana Anda menyeimbangkan power user query needs dengan safety dan performance guardrail?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- tabel admin lambat di page jauh;
- hasil list berubah-ubah saat data aktif berubah;
- frontend tidak tahu bagaimana menggabungkan search dan filter;
- total count query membebani database;
- search sederhana berkembang menjadi kebutuhan produk yang lebih kompleks.

## Ringkasan Brutal

- List endpoint adalah contract yang harus dirancang, bukan parameter liar.
- Pagination, sort, filter, dan search butuh semantics eksplisit.
- Stable ordering dan guardrail performa itu wajib.
- Search semantics kabur adalah sumber kebingungan permanen.
- Engineer senior mendesain list API agar scalable, predictable, dan aman dipakai.

## Checklist Pemahaman

- Saya tahu trade-off offset vs cursor.
- Saya paham stable ordering penting.
- Saya tidak membiarkan query field bebas tanpa aturan.
- Saya tahu search semantics harus dijelaskan eksplisit.
- Saya sadar total count tidak selalu murah.

## Penutup

Endpoint list yang baik terasa membosankan.
Dan itu justru bagus.
Karena artinya consumer bisa memakainya tanpa terus menebak-nebak perilaku sistem.
