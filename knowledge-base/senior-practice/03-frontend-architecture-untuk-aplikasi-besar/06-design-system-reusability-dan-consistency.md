# Design System, Reusability, dan Consistency

## Tujuan

Topik ini penting karena banyak tim frontend menyebut dirinya punya design system, padahal yang mereka punya hanya kumpulan komponen shared tanpa aturan yang jelas.

Akibatnya:

- UI tidak konsisten;
- reuse dipaksa;
- variasi komponen meledak;
- token style tidak disiplin;
- engineer bingung kapan membuat komponen baru dan kapan memakai yang ada.

## Kenapa Topik Ini Penting

Pada aplikasi skala tim, consistency bukan bonus.
Ia memengaruhi:

- kecepatan delivery;
- kualitas UX;
- aksesibilitas;
- maintainability;
- biaya perubahan visual global.

Kalau tiap fitur membangun pola UI sendiri, codebase dan produk akan drift bersamaan.

## Model Mental yang Benar

Pegang ini:

1. Design system adalah sistem keputusan, bukan sekadar library komponen.
2. Reusability yang sehat lahir dari pola stabil, bukan dari abstraksi prematur.
3. Consistency yang baik mengurangi beban desain dan engineering.
4. Shared component tanpa aturan token dan usage tetap akan kacau.
5. Semakin besar tim, semakin penting governance ringan tetapi jelas.

## Apa Itu Design System

Secara praktis, design system mencakup:

- visual tokens;
- komponen dasar;
- pola interaksi;
- aturan penggunaan;
- naming dan variant conventions;
- accessibility baseline.

Kalau hanya ada folder `components/ui`, itu belum tentu design system.

## Tokens Lebih Penting dari Sekadar Komponen

Token seperti:

- color;
- spacing;
- typography;
- radius;
- shadow;
- z-index;
- breakpoints

adalah fondasi consistency.

Kalau token tidak disiplin:

- warna hardcoded menyebar;
- spacing acak;
- perubahan branding mahal;
- dark mode atau theming sulit.

## Komponen Primitive

Bagian inti design system biasanya:

- button;
- input;
- select;
- checkbox;
- radio;
- card shell;
- modal shell;
- table primitives;
- typography primitives.

Mereka harus:

- cukup fleksibel;
- tidak terlalu domain-specific;
- mudah dipahami;
- konsisten dengan token.

## Reusability yang Palsu

Banyak tim membuat komponen reusable terlalu cepat.
Gejalanya:

- props banyak sekali;
- variants terlalu banyak;
- conditional rendering rumit;
- pemakaian di tiap fitur berbeda tipis-tipis;
- tidak ada satu pun penggunaan yang terasa natural.

Ini bukan reuse sehat.
Ini abstraksi prematur.

## Kapan Komponen Layak Masuk Design System

Biasanya saat:

- pola muncul berulang di banyak fitur;
- requirement cukup stabil;
- semantics-nya jelas;
- API bisa tetap sederhana;
- manfaat consistency lebih besar daripada biaya abstraksi.

Kalau pattern baru muncul sekali atau dua kali, sering lebih baik tunggu dulu.

## Consistency Bukan Berarti Semua Sama Persis

Consistency berarti:

- prinsip yang sama;
- bahasa visual yang sama;
- interaksi yang bisa diprediksi;
- variant yang masuk akal.

Bukan berarti semua halaman harus identik atau setiap kasus dipaksa masuk satu komponen.

## Variant Explosion

Salah satu tanda design system mulai rusak:

- terlalu banyak `variant`;
- terlalu banyak `size`;
- terlalu banyak special-case prop.

Contoh:

- `variant="primary|secondary|danger|ghost|link|special|marketing"`
- `compact`, `dense`, `noPadding`, `isInline`, `withIcon`, `withBadge`

Kalau variant berkembang tanpa kontrol, shared component berubah jadi monster.

## API Komponen yang Sehat

Komponen system yang sehat biasanya:

- punya nama yang jelas;
- punya variant terbatas;
- punya default yang baik;
- prop-nya tidak mengekspose detail implementasi berlebihan;
- tidak mengharuskan caller tahu terlalu banyak internal.

## Reuse vs Composition

Kadang reuse terbaik bukan satu komponen super generik.
Kadang reuse terbaik adalah:

- primitive konsisten;
- composition pattern yang sederhana;
- wrapper domain tipis di atas primitive.

Ini sering lebih sehat daripada satu komponen raksasa yang dipaksa melayani semua use case.

## Shared UI vs Domain UI

Design system seharusnya berhenti sebelum domain logic mulai bocor.

Contoh shared:

- button;
- modal shell;
- badge primitive;
- input primitives.

Contoh domain:

- `PaymentStatusBadge`
- `AppointmentCard`
- `ClaimSummaryPanel`

Kalau domain UI dipaksa masuk ke design system, scope shared layer membengkak dan makin rapuh.

## Visual Debt

Tanpa design system yang disiplin, visual debt tumbuh cepat:

- spacing tidak seragam;
- state hover/focus tidak konsisten;
- warna aksi penting berbeda-beda;
- error state dan success state tidak punya grammar visual yang stabil.

Visual debt adalah technical debt yang terlihat oleh user.

## Accessibility Sebagai Baseline

Design system yang matang tidak memikirkan visual saja.
Ia juga harus membawa baseline:

- focus state;
- keyboard navigation;
- aria semantics dasar;
- color contrast;
- disabled state yang benar;
- error state yang dapat dipahami.

Kalau tidak, setiap fitur harus mengingat semuanya sendiri, dan hasilnya tidak konsisten.

## Dokumentasi Penggunaan

Komponen shared tanpa dokumentasi ringan cepat disalahgunakan.
Dokumentasi yang berguna biasanya menjelaskan:

- kapan dipakai;
- kapan jangan dipakai;
- prop inti;
- variant yang tersedia;
- contoh usage;
- accessibility note bila perlu.

Dokumentasi tidak harus mewah.
Tetapi harus cukup untuk mencegah misuse berulang.

## Naming Consistency

Nama komponen dan variant harus jujur.

Contoh buruk:

- `Card2`
- `ButtonNew`
- `PrimaryButtonAlt`
- `SpecialModal`

Nama seperti itu sering menandakan governance lemah.

Nama yang baik mencerminkan:

- peran;
- level abstraction;
- batas domain.

## Theming dan Token Governance

Kalau aplikasi perlu theming atau branding fleksibel, token discipline makin penting.
Hardcoded style kecil yang dibiarkan menyebar akan sangat mahal saat:

- rebrand;
- dark mode;
- white-label product;
- accessibility improvement global.

## Reuse Harus Diukur dengan Biaya Baca

Reusable bukan hanya soal berapa banyak file memakai komponen itu.
Pertanyaan penting:

- apakah API komponen tetap mudah dipahami?
- apakah caller harus membaca source untuk tahu cara pakai?
- apakah variasi baru memperumit semua penggunaan lama?

Kalau biaya baca naik drastis, reuse itu palsu.

## Governance Ringan

Tim besar tidak butuh birokrasi berat untuk design system.
Tetapi butuh aturan minimal:

- siapa owner shared UI;
- review apa yang perlu untuk komponen shared;
- kapan sesuatu boleh masuk shared layer;
- kapan sesuatu tetap tinggal di feature.

Tanpa governance, shared layer akan cepat membusuk.

## Migration Bertahap

Jarang ada tim yang bisa langsung punya design system sempurna.
Biasanya perlu migrasi bertahap:

1. identifikasi primitive yang paling sering diulang;
2. stabilkan token;
3. buat baseline accessibility;
4. migrasikan use case paling umum dulu;
5. hindari big bang rewrite.

Ini lebih realistis daripada mencoba menstandardkan semuanya sekaligus.

## Anti-Pattern Umum

### 1. Shared Folder = Design System

Tidak.
Tanpa token, aturan, dan governance, itu hanya kumpulan komponen.

### 2. Reuse Prematur

Semua UI mirip dipaksa jadi satu komponen sebelum pattern stabil.

### 3. Domain Logic Masuk Shared Layer

Shared jadi sulit dipahami dan sulit dipakai ulang.

### 4. Style Hardcoded di Mana-Mana

Menghancurkan consistency dan membuat perubahan global mahal.

## Heuristik Senior

1. Mulai dari token dan primitive yang stabil.
2. Jangan memasukkan semua komponen ke design system.
3. Jaga API komponen tetap sederhana dan jujur.
4. Pisahkan shared UI dari domain UI.
5. Jadikan accessibility bagian dari baseline, bukan tambahan belakangan.
6. Gunakan governance ringan untuk menjaga shared layer.
7. Ukur reuse dari maintainability, bukan hanya dari jumlah caller.

## Pertanyaan Interview

### Dasar

- Apa beda kumpulan shared component dengan design system?
- Kenapa token penting?
- Kapan sebuah komponen layak dijadikan reusable?
- Kenapa variant explosion berbahaya?

### Menengah

- Bagaimana Anda menjaga shared layer tetap bebas dari domain leakage?
- Apa risiko reuse prematur?
- Bagaimana design system membantu consistency lintas tim?
- Kenapa accessibility harus dibawa oleh primitive?

### Senior

- Bagaimana Anda menentukan governance yang tepat untuk design system di tim produk yang tumbuh?
- Bagaimana Anda memutuskan kapan use case baru pantas masuk shared component atau tetap tinggal di feature layer?
- Bagaimana Anda melakukan migrasi dari codebase yang penuh komponen ad hoc ke design system yang lebih sehat?
- Bagaimana Anda menyeimbangkan flexibility dengan simplicity dalam API komponen?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- button style berbeda-beda antar halaman;
- komponen shared punya terlalu banyak props;
- tim desain meminta perubahan spacing global;
- dark mode atau rebrand terasa sangat mahal;
- komponen domain dipaksa masuk shared lalu sulit dipakai ulang.

## Ringkasan Brutal

- Design system bukan sekadar folder shared.
- Reuse tanpa disiplin hanya memindahkan chaos ke satu tempat.
- Consistency menghemat biaya engineering dan UX.
- Shared layer harus dijaga dari variant explosion dan domain leakage.
- Engineer senior tahu bahwa abstraction yang terlalu cepat sering lebih mahal daripada duplikasi kecil.

## Checklist Pemahaman

- Saya tahu beda design system dan shared component library biasa.
- Saya paham pentingnya token.
- Saya tidak terlalu cepat mengekstrak komponen reusable.
- Saya bisa membedakan shared UI dari domain UI.
- Saya sadar accessibility harus menjadi baseline.
- Saya mengerti governance ringan dibutuhkan untuk menjaga consistency.

## Penutup

Design system yang sehat membuat tim bergerak lebih cepat justru karena ia membatasi kekacauan.
Ia bukan alat untuk membuat semua hal terlihat generic.
Ia adalah alat untuk menjaga bahasa visual, perilaku, dan reuse tetap masuk akal saat aplikasi dan tim sama-sama membesar.
