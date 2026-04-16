# Normalization vs Denormalization

## Tujuan

Topik ini penting karena banyak engineer berbicara tentang performa database seolah jawabannya selalu index atau cache.
Padahal struktur data dasarnya sendiri sering sudah menentukan apakah sistem akan mudah dijaga atau justru terus dipenuhi kompromi.

Normalization dan denormalization bukan pertanyaan akademik.
Ini pertanyaan biaya:

- biaya write;
- biaya read;
- biaya consistency;
- biaya query;
- biaya evolution schema;
- biaya debugging data salah.

## Kenapa Topik Ini Penting

Kalau skema terlalu ternormalisasi:

- query baca bisa kompleks;
- join membengkak;
- reporting jadi berat;
- latency untuk read pattern tertentu naik.

Kalau skema terlalu terdenormalisasi:

- duplicate data menyebar;
- update satu fakta butuh banyak write;
- inconsistency mudah terjadi;
- audit dan correction jadi lebih sulit.

Engineer senior harus bisa menjelaskan trade-off itu dengan jujur.

## Definisi Singkat

### Normalization

Normalization berarti menyusun data ke tabel terpisah agar satu fakta disimpan di satu tempat yang tepat, mengurangi duplikasi, dan menjaga konsistensi.

### Denormalization

Denormalization berarti dengan sengaja menyimpan redundansi tertentu untuk mengoptimalkan read path, menyederhanakan query, atau menurunkan biaya join di use case tertentu.

## Model Mental yang Benar

Pegang ini:

1. Normalization mengoptimalkan integritas dan mengurangi duplicate fact.
2. Denormalization mengoptimalkan read pattern tertentu dengan membayar biaya consistency tambahan.
3. Keduanya bukan ideologi.
4. Bentuk yang sehat bergantung pada workload nyata.
5. Setiap redundansi harus punya alasan, owner, dan strategi sinkronisasi.

## Kenapa Normalization Muncul

Jika satu fakta disimpan berkali-kali:

- nama customer;
- alamat;
- status;
- kategori;

maka update satu fakta mudah lupa memperbarui salinan lain.

Normalization lahir untuk mengurangi anomali seperti:

- insert anomaly;
- update anomaly;
- delete anomaly.

## Bentuk Intuisi Sederhana

Jika data pelanggan tersimpan di setiap order:

- perubahan nama pelanggan perlu update banyak baris;
- risiko data lama tertinggal besar;
- storage lebih boros;
- query tertentu mungkin mudah,

tetapi integrity cost meningkat.

Kalau pelanggan dipisah ke tabel `customers` dan order hanya simpan `customer_id`:

- satu sumber kebenaran lebih jelas;
- write update identitas lebih mudah dijaga;
- join mungkin dibutuhkan saat read.

## Normalization dan Integritas

Manfaat utama normalization:

- satu fakta punya satu rumah utama;
- foreign key relation lebih jelas;
- duplicate update berkurang;
- schema reasoning lebih kuat;
- domain model lebih rapi.

Ini sangat penting untuk sistem transaksi.

## Denormalization dan Read Performance

Denormalization sering dipilih karena read path tertentu terlalu mahal atau terlalu sering.

Contoh:

- dashboard summary;
- feed list;
- invoice snapshot;
- reporting aggregate;
- search index materialized fields.

Pada kasus ini, menyimpan redundansi terkendali bisa bernilai tinggi.

## Snapshot vs Live Join

Pertanyaan penting:

- Apakah data harus selalu merefleksikan fakta terbaru?
- Atau justru perlu merekam snapshot saat event terjadi?

Contoh:

- invoice sering perlu menyimpan snapshot nama produk dan harga saat transaksi;
- bukan selalu join ke data produk terbaru.

Ini bentuk denormalization yang sah dan sering perlu.

## Duplicate Fact yang Berbahaya

Tidak semua redundansi sama.

Redundansi berbahaya biasanya ketika fakta operasional yang sama disimpan berkali-kali tanpa owner jelas.

Contoh:

- saldo user disalin ke banyak tabel transaksi tanpa mekanisme sinkron;
- status order disalin ke beberapa tabel tanpa kontrak update jelas.

Ini cepat menjadi sumber inconsistency.

## Redundansi yang Masuk Akal

Redundansi lebih masuk akal saat:

- tujuannya jelas;
- read pattern memang berat;
- freshness requirement dipahami;
- update path terkontrol;
- consistency lag masih diterima bisnis;
- ada strategi backfill atau repair.

## Read Model vs Write Model

Ini cara pikir yang lebih matang.

Kadang write model perlu lebih normalized untuk menjaga integritas.
Tetapi read model tertentu boleh lebih denormalized untuk kebutuhan query cepat.

Contoh:

- OLTP tables normalized;
- reporting table atau materialized view lebih denormalized.

Ini sering lebih sehat daripada memaksa satu model melayani semua kebutuhan.

## Join Bukan Musuh Otomatis

Banyak engineer junior menghindari join seolah join selalu buruk.
Itu salah.

Join yang tepat di skema yang sehat bisa sangat masuk akal.
Yang penting:

- cardinality dipahami;
- index mendukung;
- query pattern jelas;
- volume realistis.

Menghindari join secara membabi buta sering menghasilkan duplicate data yang lebih mahal.

## Denormalization Bukan Izin untuk Kekacauan

Begitu data didenormalisasi, pertanyaan baru muncul:

- siapa yang update?
- kapan update?
- apakah synchronous atau asynchronous?
- bagaimana mendeteksi drift?
- bagaimana repair jika sebagian write gagal?

Kalau pertanyaan ini tidak dijawab, denormalization berubah jadi technical debt.

## Consistency Cost

Normalization biasanya menurunkan consistency cost.
Denormalization menaikkan consistency cost.

Pertanyaan senior:

- apakah keuntungan read benar-benar sepadan dengan kenaikan complexity write?

Kalau tidak, Anda hanya menambah kerumitan tanpa manfaat jelas.

## Normalization dan Schema Evolution

Schema yang lebih normalized sering lebih mudah dirawat ketika aturan domain berkembang.

Kenapa?

- konsep lebih terpisah;
- perubahan satu entitas tidak selalu menyapu semua tabel;
- boundary data lebih jelas.

Tetapi terlalu ekstrem juga bisa membuat model terlalu terfragmentasi.

## Over-Normalization

Tanda over-normalization:

- query sederhana butuh terlalu banyak join;
- data yang hampir selalu dibaca bersama dipisah tanpa alasan kuat;
- developer sulit memahami jalur data;
- performa baca menderita tanpa manfaat integrity signifikan.

Kalau dua hal selalu hidup dan berubah bersama, pemisahan ekstrem bisa jadi berlebihan.

## Over-Denormalization

Tanda over-denormalization:

- banyak kolom duplikat tanpa owner jelas;
- update satu fakta butuh banyak path;
- bug data tidak sinkron sering terjadi;
- banyak script repair;
- tim takut mengubah model karena efek samping data tersebar.

## Materialized View dan Summary Table

Ini bentuk denormalization yang sering sehat jika dipakai sadar.

Cocok untuk:

- dashboard summary;
- reporting berat;
- precomputed aggregate;
- leaderboard;
- expensive read query.

Tetapi tetap butuh strategi refresh:

- on write;
- scheduled;
- event-driven;
- manual rebuild.

## Search-Oriented Denormalization

Untuk kebutuhan search atau listing, sering masuk akal menyimpan field yang sudah "siap pakai":

- display name;
- status label;
- category path;
- sortable/searchable normalized text.

Ini bisa mengurangi cost join/read path.
Tetapi lagi-lagi harus punya owner sinkronisasi.

## Transactional System vs Analytical Need

Sistem transaksi utama sering lebih membutuhkan normalized core.
Kebutuhan analytics/reporting sering mendorong denormalized read model.

Mencampur keduanya langsung di schema inti sering menciptakan kompromi buruk untuk dua-duanya.

## Heuristik Senior

1. Normalisasi dulu untuk menjaga satu sumber kebenaran.
2. Denormalisasi hanya setelah read pain benar-benar terbukti.
3. Setiap redundansi harus punya owner dan refresh strategy.
4. Bedakan transactional truth dari read-optimized projection.
5. Jangan takut join yang sehat.
6. Jangan takut snapshot jika bisnis memang butuh historical truth.
7. Nilai desain berdasarkan workload nyata, bukan dogma.

## Pertanyaan Interview

### Dasar

- Apa beda normalization dan denormalization?
- Kenapa normalization mengurangi update anomaly?
- Kapan denormalization masuk akal?
- Kenapa join bukan otomatis buruk?

### Menengah

- Bagaimana Anda memutuskan apakah sebuah field perlu disalin ke tabel lain?
- Apa risiko denormalization terhadap consistency?
- Kapan snapshot data lebih tepat daripada referensi live?
- Apa tanda over-normalization?

### Senior

- Bagaimana Anda menyeimbangkan OLTP integrity dengan kebutuhan dashboard/reporting cepat?
- Bagaimana Anda mendesain refresh strategy untuk summary table?
- Bagaimana Anda mengevaluasi apakah redundansi tertentu layak dipertahankan?
- Bagaimana Anda menjelaskan denormalization yang sehat kepada tim agar tidak berubah menjadi duplicate data liar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dashboard butuh query cepat tanpa join berat;
- invoice harus menyimpan harga historis;
- nama entitas berubah dan banyak row lama tidak sinkron;
- reporting membebani tabel transaksi utama;
- tim bingung apakah perlu summary table atau cukup query join.

## Ringkasan Brutal

- Normalization menjaga integritas.
- Denormalization membeli kecepatan baca dengan membayar complexity tambahan.
- Join bukan musuh.
- Duplicate fact tanpa owner adalah racun.
- Engineer senior tidak bertanya mana yang "lebih benar", tetapi mana yang paling jujur terhadap workload dan consistency requirement.

## Checklist Pemahaman

- Saya bisa membedakan duplicate fact berbahaya dan snapshot yang sah.
- Saya paham normalization menurunkan anomaly.
- Saya tahu denormalization menambah consistency cost.
- Saya tidak menghindari join secara dogmatis.
- Saya bisa menjelaskan kapan read model terpisah masuk akal.

## Penutup

Struktur data yang baik bukan soal paling normalized atau paling cepat dibaca.
Ia soal keseimbangan antara kebenaran data, biaya query, dan biaya operasi jangka panjang.

Itulah kenapa topik ini selalu menjadi pembeda engineer yang benar-benar mengerti data dari engineer yang hanya menambal query lambat.
