# Server Components vs Client Components

## Tujuan

Topik ini penting karena banyak tim memakai `Next.js` App Router tetapi boundary antara Server Components dan Client Components tetap kabur.
Akibatnya, mereka memakai `use client` terlalu luas, data fetching menjadi tidak konsisten, dan bundle client membengkak tanpa alasan kuat.

Kalau Anda tidak benar-benar paham perbedaannya, gejala yang sering muncul:

- terlalu banyak komponen menjadi client component;
- secret atau server-only logic nyaris bocor ke tempat yang salah;
- fetch dilakukan di tempat yang tidak efisien;
- hydration cost naik tanpa disadari;
- code review jadi penuh debat soal "ini taruh di server atau client?" tanpa model mental yang jelas.

## Kenapa Topik Ini Penting

Di `Next.js` modern, pemisahan server dan client bukan sekadar detail implementasi.
Ini memengaruhi:

- performa;
- ukuran bundle;
- data fetching;
- security boundary;
- arsitektur komponen;
- pengalaman developer;
- cara tim memecah tanggung jawab.

Kalau boundary ini lemah, aplikasi akan kehilangan banyak keuntungan `Next.js` modern dan tetap menanggung kompleksitasnya.

## Definisi Singkat

### Server Component

Server Component dirender di server.
Ia bisa:

- mengakses data server-side;
- memanggil resource backend langsung;
- memakai secret atau module server-only;
- mengurangi JavaScript yang harus dikirim ke browser.

Ia tidak cocok untuk interaksi browser langsung seperti state lokal interaktif atau event handler DOM.

### Client Component

Client Component berjalan di browser.
Ia diperlukan untuk:

- event handler;
- local state interaktif;
- effect browser;
- akses API browser;
- library yang butuh DOM atau lifecycle client.

Ia menambah JavaScript yang harus dibundle dan dihydrate di client.

## Model Mental yang Benar

Pegang ini:

1. Server Component adalah default yang lebih murah untuk banyak use case display dan composition.
2. Client Component dipakai hanya saat browser interactivity benar-benar dibutuhkan.
3. `use client` bukan sekadar flag teknis; ia mengubah boundary bundling dan execution.
4. Boundary server/client harus sengaja dirancang, bukan terjadi kebetulan.
5. Semakin tinggi `use client` diletakkan, semakin besar subtree yang ikut pindah ke dunia client.

## Default yang Sehat

Dalam App Router, pola sehat biasanya:

- mulai dari Server Component sebagai default;
- pindahkan hanya bagian interaktif ke Client Component;
- pertahankan composition dan data access sedekat mungkin dengan server saat masuk akal.

Masalah besar muncul ketika tim membalik default:

- semua dianggap client dulu;
- baru belakangan dicari mana yang bisa dipindah ke server.

Hasilnya hampir selalu jelek.

## Apa yang Bisa Dilakukan Server Component

Server Component kuat untuk:

- page composition;
- layout composition;
- fetch data awal;
- render konten yang tidak interaktif;
- mengakses database atau backend internal melalui server-side function;
- menyembunyikan detail sensitif;
- menyiapkan props untuk komponen interaktif kecil.

Ini membuat Server Component cocok sebagai tulang punggung struktur halaman.

## Apa yang Tidak Bisa Dilakukan Server Component

Server Component tidak cocok untuk:

- `useState`
- `useEffect`
- event handler seperti `onClick`
- akses `window`, `document`, `localStorage`
- library yang mutlak butuh DOM browser.

Kalau kebutuhan ini muncul, boundary client memang dibutuhkan.

## Apa yang Bisa Dilakukan Client Component

Client Component cocok untuk:

- form interaktif;
- dropdown, modal, accordion;
- live search;
- drag and drop;
- optimistic UI;
- subscription browser;
- integrasi library client-only.

Tetapi jangan lupa:
setiap Client Component membawa biaya bundle dan hydration.

## `use client` Bukan Detail Ringan

Begitu sebuah file diberi `use client`, file itu dan subtree import terkait dalam boundary tertentu akan diperlakukan sebagai client-side code.

Dampak praktis:

- JavaScript untuk komponen itu harus dikirim ke browser;
- hydration diperlukan;
- dependency client ikut terbawa;
- peluang memanfaatkan server-only boundary berkurang.

Kalau `use client` dipasang sembarangan, Anda sedang membayar biaya frontend yang tidak perlu.

## Kesalahan Umum: `use client` Terlalu Tinggi

Contoh pola buruk:

- layout besar diberi `use client`;
- page besar diberi `use client`;
- wrapper tingkat atas diberi `use client` hanya karena satu child perlu interaksi.

Akibatnya:

- subtree besar ikut menjadi client bundle;
- fetching server-side jadi lebih sulit atau tidak optimal;
- logic yang seharusnya tetap di server bocor ke client boundary.

Pola yang lebih sehat:

- isolasi bagian interaktif ke leaf component atau island kecil;
- biarkan parent tetap server component.

## Composition Pattern yang Sehat

Pattern umum yang sehat:

1. Server Component fetch data dan menyusun layout;
2. Server Component meneruskan data minimum yang dibutuhkan;
3. Client Component menangani interaksi lokal;
4. mutation atau refresh punya boundary jelas.

Dengan pola ini:

- bundle client lebih kecil;
- data fetching lebih efisien;
- separation of concern lebih bersih.

## Data Fetching dan Boundary

Salah satu keuntungan terbesar Server Component adalah kemampuan fetch di server tanpa selalu membawa fetch logic ke browser.

Ini berguna karena:

- secret atau credential tidak bocor;
- request roundtrip client tambahan bisa berkurang;
- data bisa tersedia saat render awal;
- composition server jadi lebih kuat.

Tetapi ini tidak berarti semua fetch harus dipindah ke server.
Interaktivitas client tetap bisa memerlukan fetch client-side.

## Kapan Fetch di Server Lebih Masuk Akal

Biasanya saat:

- data dibutuhkan untuk initial render;
- data tidak bergantung pada interaksi browser sesudah load;
- auth/secret lebih aman di server;
- SEO atau first content penting;
- bundle client perlu dijaga tetap kecil.

## Kapan Fetch di Client Lebih Masuk Akal

Biasanya saat:

- data bergantung pada interaksi user real-time;
- polling atau live refresh diperlukan;
- state lokal browser memengaruhi query;
- UX interaktif lebih dominan;
- dependency library client-driven memang diperlukan.

## Hydration Cost

Client Component harus dihydrate.
Artinya browser tidak hanya menerima HTML, tetapi juga JavaScript yang perlu dijalankan agar UI menjadi interaktif.

Biaya hydration mencakup:

- download JS;
- parse JS;
- execute JS;
- attach event handlers;
- memory usage tambahan.

Semakin banyak komponen yang tidak perlu dijadikan client, semakin besar biaya ini.

## Security Boundary

Server Component membantu menjaga:

- environment variables sensitif;
- direct backend integration;
- server-side auth logic tertentu;
- business logic yang tidak perlu diekspos ke client.

Kalau semuanya dipindahkan ke client demi kemudahan, Anda mempersempit ruang aman aplikasi.

## Serialization Boundary

Data dari Server Component ke Client Component harus melewati boundary serializable tertentu.
Ini penting karena:

- tidak semua object bisa diteruskan mentah;
- fungsi tidak bisa diperlakukan sembarang;
- class instance tertentu dan object kompleks bisa bermasalah;
- Anda dipaksa memikirkan kontrak data lebih eksplisit.

Ini kadang terasa membatasi.
Tetapi justru sering menyehatkan desain.

## Client Component Bukan Musuh

Jangan jatuh ke ekstrem lain.
Client Component bukan buruk.
Ia esensial untuk UX modern.

Yang salah adalah:

- memakainya tanpa alasan;
- menaruhnya terlalu tinggi;
- tidak sadar trade-off-nya.

Tujuan Anda bukan meminimalkan client component secara ideologis.
Tujuannya adalah menempatkan interaktivitas di boundary yang tepat.

## State Ownership

Server Component dan Client Component juga memengaruhi di mana state seharusnya hidup.

Pertanyaan penting:

- apakah state ini murni interaksi UI lokal?
- apakah state ini hasil data server yang lebih cocok dimiliki server?
- apakah state ini perlu survive navigasi atau tidak?

Kalau semua state dilempar ke client tanpa berpikir, arsitektur jadi berat di browser.

## Library Compatibility

Banyak library frontend lama diasumsikan berjalan full client.
Saat tim berpindah ke App Router, masalah umum muncul:

- library hanya jalan di client;
- wrapper besar diberi `use client`;
- akibatnya boundary server menyusut.

Keputusan yang sehat:

- batasi library client-only ke area yang perlu;
- jangan biarkan satu dependency memaksa seluruh tree menjadi client jika bisa diisolasi.

## Testability

Boundary yang sehat juga membantu testing.

Server Component:

- lebih cocok diuji sebagai composition/data boundary tertentu;
- bisa lebih dekat ke contract server-side.

Client Component:

- lebih fokus pada interaksi, event, UI state.

Kalau boundary tidak jelas, testing juga ikut blur.

## Anti-Pattern Umum

### 1. Menandai Page Besar dengan `use client`

Ini paling sering terjadi karena cepat dan terasa mudah.
Biasanya hasil akhirnya buruk.

### 2. Fetch Ganda di Server dan Client Tanpa Alasan Jelas

Ini membuat data flow kabur dan caching sulit dipikirkan.

### 3. Memindahkan Logic Server ke Client Demi Kenyamanan

Keamanan dan performa ikut terkikis.

### 4. Tidak Mengisolasi Library Client-Only

Satu dependency memaksa subtree besar menjadi client boundary.

## Heuristik Senior

1. Default ke Server Component.
2. Gunakan Client Component hanya untuk interaktivitas yang benar-benar perlu.
3. Tempatkan `use client` serendah mungkin.
4. Jaga data fetching awal sedekat mungkin ke server saat masuk akal.
5. Isolasi dependency client-only agar tidak meracuni subtree besar.
6. Perlakukan boundary serialisasi sebagai alat memperjelas kontrak.
7. Review boundary server/client sebagai keputusan arsitektur, bukan detail syntax.

## Pertanyaan Interview

### Dasar

- Apa beda Server Component dan Client Component?
- Kenapa `use client` harus dipakai hati-hati?
- Kapan komponen sebaiknya tetap di server?
- Kenapa Client Component menambah hydration cost?

### Menengah

- Kapan fetch di server lebih baik daripada fetch di client?
- Apa risiko menaruh `use client` terlalu tinggi?
- Bagaimana Anda mengisolasi library yang hanya bisa jalan di client?
- Kenapa boundary server/client juga soal security?

### Senior

- Bagaimana Anda mendesain halaman kompleks agar interaktivitas tinggi tidak membuat seluruh tree menjadi client-side?
- Bagaimana Anda menilai trade-off antara UX interaktif dan bundle size?
- Bagaimana Anda menjaga data ownership tetap jelas di App Router?
- Bagaimana Anda melakukan code review terhadap boundary server/client dalam codebase tim besar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- bundle client tiba-tiba besar;
- halaman dashboard lambat hydrate;
- secret atau fetch internal hampir bocor ke client flow;
- tim bingung kenapa satu komponen kecil membuat seluruh route harus `use client`;
- data fetching menjadi duplikat dan sulit diprediksi.

## Ringkasan Brutal

- Server Component adalah default yang sehat untuk banyak UI modern `Next.js`.
- Client Component wajib untuk interaksi browser, tetapi mahal jika dipakai terlalu luas.
- `use client` adalah boundary arsitektur, bukan tempelan syntax.
- Kalau boundary server/client kabur, performa, security, dan maintainability sama-sama memburuk.
- Engineer senior tahu bahwa keputusan ini harus sengaja, bukan kebetulan.

## Checklist Pemahaman

- Saya bisa membedakan kemampuan dan batasan Server Component vs Client Component.
- Saya tahu kenapa `use client` harus serendah mungkin.
- Saya paham hydration cost dan bundle impact.
- Saya tahu kapan fetch lebih tepat di server atau client.
- Saya sadar boundary ini juga menyentuh security dan architecture ownership.
- Saya tidak lagi memandang semua komponen interaktif sebagai alasan untuk meng-client-kan satu halaman penuh.

## Penutup

Perbedaan Server Component dan Client Component bukan gimmick framework.
Ini adalah salah satu keputusan desain paling mahal di codebase `Next.js` modern.

Kalau Anda menguasainya, aplikasi bisa tetap cepat, aman, dan terstruktur.
Kalau tidak, Anda hanya memindahkan kebiasaan SPA lama ke framework baru dengan kompleksitas tambahan.
