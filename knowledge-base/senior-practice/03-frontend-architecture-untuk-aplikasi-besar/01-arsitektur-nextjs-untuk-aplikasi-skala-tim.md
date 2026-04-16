# Arsitektur `Next.js` untuk Aplikasi Skala Tim

## Tujuan

Topik ini penting karena banyak aplikasi `Next.js` terlihat cepat dibangun di awal, lalu menjadi berantakan ketika tim membesar, fitur bertambah, dan boundary antara UI, data, dan domain tidak jelas.

`Next.js` sangat produktif.
Tetapi produktif bukan berarti arsitekturnya otomatis sehat.

Kalau tidak didesain untuk skala tim, gejala yang sering muncul:

- folder `app` menjadi dumping ground;
- data fetching tersebar tanpa aturan;
- business logic bocor ke komponen presentasi;
- reusable component sulit dipakai ulang;
- ownership antar module kabur;
- refactor kecil menyentuh terlalu banyak file.

## Kenapa Topik Ini Penting

Pada aplikasi kecil, hampir semua organisasi code tampak "cukup baik".
Pada aplikasi skala tim, struktur yang kabur akan memunculkan:

- duplikasi logic;
- coupling antar halaman;
- state management yang tidak konsisten;
- boundary server/client yang tidak jelas;
- konflik antar engineer saat menambah fitur.

Arsitektur yang baik bukan soal folder cantik.
Ia soal bagaimana tim bisa terus mengubah aplikasi tanpa chaos.

## Model Mental yang Benar

Pegang prinsip ini:

1. Arsitektur frontend untuk skala tim adalah soal boundary, ownership, dan evolvability.
2. `Next.js` hanya memberi primitives, bukan arsitektur final.
3. Struktur folder harus mengikuti cara tim memecah masalah, bukan tren internet semata.
4. Batas antara server concerns, client concerns, dan domain concerns harus jelas.
5. Consistency lebih penting daripada kreativitas liar antar fitur.

## `Next.js` Bukan Arsitektur Lengkap

Ini kesalahan besar yang sering terjadi.

Tim melihat:

- routing built-in;
- layouts;
- server/client components;
- data fetching;
- API route;

lalu mengira semua keputusan arsitektur sudah selesai.

Padahal belum.

Anda tetap harus menentukan:

- cara mengelompokkan feature;
- di mana domain logic tinggal;
- bagaimana shared UI dipisah dari feature UI;
- bagaimana akses data diatur;
- bagaimana code ownership dibagi.

## Pertanyaan Arsitektur yang Harus Dijawab

Sebelum memilih struktur detail, tim harus bisa menjawab:

- aplikasi ini feature-heavy atau mostly content pages?
- berapa banyak engineer yang akan menyentuh codebase?
- apakah domain bisnis kompleks?
- seberapa besar reuse antar halaman?
- apakah tim lebih sering bekerja by feature atau by technical layer?

Kalau pertanyaan ini tidak dijawab, struktur cenderung jadi campuran setengah sadar.

## Organisasi Berdasarkan Feature vs Berdasarkan Layer

Dua pendekatan umum:

### By Layer

Contoh:

- `components/`
- `hooks/`
- `utils/`
- `services/`
- `types/`

Masalahnya:

- file terkait satu fitur tersebar;
- ownership sulit;
- perubahan satu fitur menyentuh banyak folder generik;
- `utils` dan `services` cepat menjadi tempat sampah.

### By Feature

Contoh:

- `features/auth/`
- `features/dashboard/`
- `features/appointments/`

Keunggulannya:

- logic terkait fitur lebih dekat;
- ownership lebih jelas;
- coupling lintas fitur lebih terlihat;
- scale tim lebih sehat.

Untuk aplikasi skala tim, feature-oriented structure sering lebih tahan lama.

## Struktur Global yang Sehat

Secara praktis, Anda biasanya butuh beberapa kategori besar:

- app routing layer;
- feature modules;
- shared UI/design system;
- shared infrastructure/client;
- domain or business utilities;
- testing helpers bila perlu.

Yang penting:
jangan taruh semua hal langsung di root hanya karena "masih sedikit".

## Peran Folder `app`

Pada `Next.js` App Router, folder `app` sebaiknya diperlakukan sebagai routing and composition layer.

Ia cocok untuk:

- route segment;
- layout;
- page entry;
- loading;
- error;
- boundary komposisi.

Yang sering buruk adalah menjadikan `app` tempat semua logic fitur tinggal.

Kalau semua query, transformation, hook, component, dan business rules tinggal di bawah `app`, struktur akan cepat rusak.

## Server Component vs Client Component Boundary

Ini salah satu keputusan arsitektur paling penting di `Next.js` modern.

Server component cocok untuk:

- data fetching di server;
- composition yang tidak butuh interaktivitas browser;
- menjaga bundle client tetap kecil;
- access ke secret atau server-only module.

Client component cocok untuk:

- interaksi user;
- local state;
- browser API;
- effect lifecycle;
- event handler.

Kalau boundary ini tidak jelas, codebase akan penuh `use client` yang tidak perlu atau sebaliknya penuh workaround aneh.

## Jangan Menandai `use client` Terlalu Tinggi

Kalau `use client` dipasang terlalu tinggi di tree:

- subtree besar ikut menjadi client bundle;
- data server advantage hilang;
- performa dan separation of concern memburuk.

Pola lebih sehat:

- pertahankan komposisi setinggi mungkin di server;
- dorong interaktivitas ke leaf component yang benar-benar perlu.

Ini bukan hanya optimasi.
Ini juga soal boundary tanggung jawab.

## Data Fetching Harus Punya Aturan

Tanpa aturan, tim akan campur:

- fetch di page;
- fetch di component acak;
- fetch di hook client;
- fetch ganda di parent dan child;
- fetch dengan cache semantics tidak konsisten.

Arsitektur yang sehat harus jelas:

- data apa yang fetched di server;
- data apa yang fetched di client;
- siapa pemilik fetching sebuah resource;
- bagaimana cache/revalidation diatur;
- bagaimana error dan loading state ditangani.

## Ownership Data

Salah satu prinsip penting:

satu jenis data sebaiknya punya titik akses yang cukup jelas.

Kalau resource yang sama di-fetch dengan 5 cara berbeda di 5 tempat:

- caching susah diprediksi;
- invalidation kacau;
- bug konsistensi meningkat;
- onboarding tim jadi sulit.

## Shared Component vs Feature Component

Ini pemisahan krusial.

### Shared Component

Komponen reusable lintas domain, biasanya lebih generik:

- button;
- input;
- modal shell;
- table primitive;
- layout primitive.

### Feature Component

Komponen yang membawa konteks domain:

- `AppointmentForm`
- `BillingSummaryCard`
- `ClaimStatusBadge`

Masalah umum:

komponen feature dipaksa masuk ke shared folder terlalu cepat.

Akibatnya shared layer tercemar domain.

## Design System dan Shared UI

Kalau aplikasi skala tim cukup besar, shared UI layer harus punya aturan:

- primitives apa yang benar-benar generik;
- tokens atau style conventions;
- batas dependency ke domain;
- dokumentasi penggunaan.

Tanpa itu, setiap fitur akan membuat variasi UI sendiri dan consistency turun.

## `lib`, `utils`, dan `services` Adalah Area Berisiko

Folder seperti `lib`, `utils`, dan `services` sering cepat menjadi dumping ground.
Itu bukan berarti tidak boleh ada.
Tetapi isinya harus dijaga.

Pertanyaan yang harus diajukan:

- apakah util ini benar-benar lintas fitur?
- apakah ini sebenarnya logic domain fitur tertentu?
- apakah `service` ini API client, business use case, atau sekadar wrapper fetch?

Kalau semua hal berbeda bercampur, folder generik ini akan menjadi rawa arsitektur.

## API Client Layer

Untuk aplikasi besar, akses ke backend sebaiknya tidak tersebar sembarangan di semua komponen.

Biasanya lebih sehat punya boundary:

- low-level HTTP client;
- domain-specific data access function;
- mapping atau normalization;
- hooks atau server functions di layer yang sesuai.

Ini membantu:

- change management;
- auth header handling;
- observability;
- contract evolution.

## Domain Logic Jangan Bocor ke UI Tipis

Contoh masalah:

- komponen presentasi menghitung rule bisnis;
- halaman menggabungkan banyak if domain spesifik;
- formatter bercampur dengan workflow decision.

Saat logic domain bocor ke mana-mana, review dan refactor menjadi mahal.

Arsitektur sehat berusaha menjaga:

- decision logic di module yang bisa diuji dan dibaca ulang;
- UI fokus pada representasi dan interaksi.

## Routing Layer Tidak Sama dengan Feature Layer

Halaman route adalah pintu masuk.
Bukan selalu tempat terbaik untuk semua logic.

Pola yang lebih sehat:

- route merakit layout dan feature entry;
- feature module memegang detail domain UI dan data access yang relevan;
- shared layer menyediakan building blocks.

Ini menjaga `app` tetap relatif tipis.

## Co-location yang Sehat

Co-location itu baik kalau dipakai dengan disiplin.

Contoh sehat:

- component feature;
- test;
- style;
- hook khusus fitur;
- mapper lokal

tinggal dekat dengan fitur yang memakainya.

Contoh tidak sehat:

- setiap file kecil dipencar tanpa batas sampai struktur terlalu granular dan sulit dipindai.

## Arsitektur dan Ownership Tim

Di aplikasi skala tim, arsitektur harus membantu ownership.

Pertanyaan penting:

- tim mana punya modul auth?
- siapa yang bertanggung jawab atas billing flow?
- shared UI siapa yang review?
- apakah perubahan fitur A sering menyentuh fitur B tanpa alasan?

Kalau ownership tidak tercermin di struktur, friction kolaborasi akan naik.

## Boundary Internal yang Sehat

Feature module idealnya punya boundary:

- public surface yang jelas;
- internal file yang tidak bebas dipakai dari luar;
- dependency ke shared layer yang wajar;
- dependency lintas fitur yang dibatasi.

Kalau semua fitur bebas import apa pun dari mana pun, codebase akan cepat kusut.

## Reuse yang Salah Arah

Salah satu penyakit di codebase besar adalah terlalu cepat mengekstrak reuse.

Gejalanya:

- satu komponen generik punya puluhan props;
- abstraction dibuat sebelum pola stabil;
- feature kehilangan kejelasan demi "DRY".

Engineer senior tahu:

duplication kecil kadang lebih murah daripada abstraction prematur yang mengaburkan domain.

## Loading, Error, dan Empty State

Arsitektur yang matang tidak hanya memikirkan happy path.
Ia juga memikirkan:

- di mana loading ditangani;
- siapa yang punya error boundary;
- bagaimana fallback UI per route/feature;
- siapa pemilik empty state semantics.

Kalau semua itu dibiarkan ad hoc, UX dan maintainability sama-sama turun.

## Server Action, Route Handler, dan Client Fetch

Di `Next.js` modern, pilihan mekanisme interaksi makin banyak.
Karena itu boundary harus lebih eksplisit.

Tanyakan:

- ini mutation sebaiknya lewat route handler, server action, atau API terpisah?
- apa implikasinya untuk auth, validation, observability, testing?
- apakah tim siap dengan semantics dan trade-off tiap mekanisme?

Kalau tidak, codebase akan penuh campuran pola setengah matang.

## Testability dan Arsitektur

Arsitektur yang baik mempermudah testing karena:

- logic domain tidak terkunci di komponen besar;
- data access punya boundary;
- UI bisa diuji per layer;
- mocking lebih terarah.

Kalau semua logic ditanam di page besar atau komponen client raksasa, test akan mahal dan rapuh.

## Evolvability

Pertanyaan senior bukan:

- "apakah struktur ini bagus sekarang?"

Tetapi:

- "apakah struktur ini tetap masuk akal saat fitur dua kali lipat?"
- "apakah tim baru bisa cepat paham?"
- "apakah perubahan kontrak data akan menyebar liar?"
- "apakah shared layer akan tetap bersih?"

Arsitektur yang baik mempersiapkan pertumbuhan, bukan hanya kondisi hari ini.

## Anti-Pattern Umum

### 1. Folder Generic Besar Tanpa Boundary

`components`, `hooks`, `utils`, `services` menjadi rawa.

### 2. Semua Logic di `app`

Route layer jadi gemuk dan susah dirawat.

### 3. `use client` Menyebar Terlalu Tinggi

Bundle membengkak dan boundary server/client rusak.

### 4. Shared Layer Tercemar Domain

Shared component tidak lagi benar-benar shared.

## Heuristik Senior

1. Perlakukan `app` sebagai routing/composition layer, bukan tempat semua logic tinggal.
2. Default ke organisasi berbasis feature untuk aplikasi skala tim.
3. Jaga server/client boundary sejelas mungkin.
4. Simpan domain logic dekat dengan fitur atau modul yang memilikinya.
5. Shared layer harus benar-benar generic.
6. Hindari abstraction prematur demi reuse semu.
7. Rancang struktur yang mendukung ownership tim dan refactor jangka panjang.

## Pertanyaan Interview

### Dasar

- Kenapa `Next.js` tidak otomatis memberi arsitektur aplikasi yang baik?
- Apa beda shared component dan feature component?
- Kenapa `use client` harus dipakai hati-hati?
- Kenapa `app` sebaiknya tetap relatif tipis?

### Menengah

- Kapan struktur by feature lebih sehat daripada by layer?
- Bagaimana Anda memutuskan data fetching dilakukan di server atau client?
- Apa risiko folder `utils` dan `services` menjadi dumping ground?
- Bagaimana menjaga shared UI layer tetap bersih?

### Senior

- Bagaimana Anda mendesain arsitektur `Next.js` untuk tim yang terus bertambah?
- Bagaimana Anda mencegah boundary server/client bocor ke seluruh codebase?
- Bagaimana Anda menyeimbangkan co-location dengan keterbacaan struktur?
- Bagaimana Anda memutuskan kapan abstraksi reusable layak dibuat?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- aplikasi `Next.js` tumbuh dari satu engineer menjadi beberapa squad;
- folder `app` penuh file logic yang tak punya boundary;
- fetching data resource yang sama dilakukan di banyak tempat;
- shared component mulai berisi props dan aturan domain aneh;
- bundle client membesar karena `use client` terlalu luas.

## Ringkasan Brutal

- `Next.js` memberi primitives, bukan arsitektur final.
- Aplikasi skala tim butuh boundary jelas antara route, feature, shared UI, dan data access.
- Organisasi code yang terlalu generic cepat berubah menjadi dumping ground.
- `use client` yang sembarangan adalah utang arsitektur.
- Kalau ownership tim tidak tercermin di struktur, friction akan terus naik.

## Checklist Pemahaman

- Saya tahu `app` bukan tempat semua logic.
- Saya bisa membedakan feature module dari shared layer.
- Saya paham boundary server/client harus dijaga.
- Saya tidak terlalu cepat mengekstrak shared abstraction.
- Saya memikirkan ownership tim saat mendesain struktur.
- Saya melihat arsitektur sebagai alat evolusi, bukan sekadar estetika folder.

## Penutup

Arsitektur `Next.js` untuk aplikasi skala tim bukan soal mengikuti template populer.
Ini soal menjaga agar puluhan atau ratusan perubahan berikutnya tetap bisa dilakukan tanpa membuat codebase kehilangan bentuk.

Engineer senior tidak hanya membangun halaman.
Ia membangun medan kerja yang masih masuk akal untuk seluruh tim enam bulan dari sekarang.
