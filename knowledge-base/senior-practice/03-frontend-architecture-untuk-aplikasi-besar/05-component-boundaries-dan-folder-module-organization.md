# Component Boundaries dan Folder/Module Organization

## Tujuan

Topik ini penting karena codebase frontend besar jarang rusak karena syntax.
Ia rusak karena boundary komponennya kabur.
Folder tidak mencerminkan ownership.
Module saling tahu terlalu banyak.
Perubahan kecil menyebar ke mana-mana.

Kalau boundary komponen buruk:

- reuse menjadi palsu;
- review jadi lambat;
- refactor jadi mahal;
- bug menyebar lintas fitur;
- onboarding tim baru jadi berat.

## Kenapa Topik Ini Penting

Frontend skala tim bukan sekadar kumpulan halaman.
Ia adalah sistem module.
Kalau module boundary lemah, aplikasi tetap bisa shipping.
Tetapi maintainability akan jatuh.

## Model Mental yang Benar

Pegang ini:

1. Component boundary adalah alat kontrol kompleksitas.
2. Folder structure harus mengikuti ownership yang nyata.
3. Reuse yang sehat lahir dari boundary yang jelas.
4. Module organization bukan kosmetik.
5. Semakin kabur dependency, semakin mahal perubahan.

## Apa Itu Boundary Komponen

Boundary komponen menjawab:

- data apa yang boleh masuk;
- behavior apa yang ditangani;
- dependency apa yang boleh diketahui;
- state apa yang dimiliki;
- apa yang tetap private.

Kalau ini tidak jelas, komponen berubah jadi blob.

## Komponen yang Sehat

Komponen yang sehat biasanya:

- punya tanggung jawab yang jelas;
- prop surface cukup kecil;
- tidak tahu terlalu banyak detail domain lain;
- tidak mengelola terlalu banyak state tak terkait;
- bisa dipahami tanpa membaca setengah codebase.

## Komponen yang Sakit

Tanda-tandanya:

- prop belasan atau puluhan;
- banyak boolean flags;
- logic data, UI, side effect, dan domain bercampur;
- conditional rendering panjang;
- import dari banyak folder berbeda;
- reuse sulit tanpa copy-paste.

## Presentational vs Container

Pemisahan ini masih berguna secara mental.

Presentational component:

- fokus pada rendering;
- menerima data yang sudah relatif siap;
- minim knowledge tentang fetching atau orchestration.

Container/composition component:

- mengatur data flow;
- memilih child component;
- menangani integration point tertentu.

Jangan jadikan ini dogma.
Tetapi bedanya tetap penting.

## Smart vs Dumb Bukan Berarti Satu Selalu Benar

Terlalu banyak dumb component bisa membuat composition layer membengkak.
Terlalu banyak smart component membuat dependency menyebar.

Tujuannya adalah distribution yang sehat.
Bukan slogan.

## Feature Boundary

Dalam aplikasi besar, boundary yang lebih penting sering bukan atom UI kecil.
Boundary yang lebih penting adalah feature.

Contoh:

- `auth`
- `billing`
- `appointment`
- `dashboard`

Feature boundary yang sehat menahan detail internal tetap dekat.

## Public Surface Module

Setiap feature sebaiknya punya public surface yang jelas.

Misalnya:

- page entry;
- feature root component;
- exported hooks tertentu;
- types yang memang perlu dibagi.

Kalau semua file feature bebas diimport dari luar, boundary feature hanya ilusi.

## Folder by Feature

Untuk skala tim, struktur by feature biasanya lebih sehat.

Keunggulannya:

- file yang berubah bersama tinggal berdekatan;
- ownership lebih jelas;
- perubahan fitur tidak terlalu tersebar;
- folder generik seperti `utils` lebih terkendali.

## Folder by Layer

Struktur seperti:

- `components/`
- `hooks/`
- `services/`
- `utils/`

terlihat rapi di awal.
Tetapi pada skala tim:

- fitur terpecah ke banyak tempat;
- ownership kabur;
- folder generik cepat jadi tempat sampah.

## `utils` dan `shared` Harus Dicurigai

Folder generic paling berbahaya:

- `utils`
- `helpers`
- `common`
- `shared`

Bukan berarti tidak boleh ada.
Tetapi isinya harus diawasi.

Pertanyaan wajib:

- ini benar-benar reusable lintas domain?
- atau cuma logic satu fitur yang dipindahkan terlalu cepat?

## Co-location

Co-location berarti file yang berubah bersama diletakkan dekat.
Ini sering sehat untuk:

- component;
- test;
- local styles;
- local hooks;
- mapper lokal;
- constants khusus fitur.

Co-location menurunkan biaya navigasi.

## Over-Co-location

Tetapi terlalu granular juga buruk.
Kalau setiap file kecil dipisah tanpa aturan:

- scanning folder jadi berat;
- struktur terasa pecah;
- orang sulit melihat gambaran utuh.

Jadi co-location harus tetap pragmatis.

## Prop Surface

Boundary komponen salah satu indikator utamanya adalah prop surface.

Kalau prop list panjang:

- komponen mungkin terlalu generik;
- parent tahu terlalu banyak;
- contract susah dijaga;
- reuse sering semu.

Komponen yang baik tidak selalu punya prop sedikit.
Tetapi prop-nya harus masuk akal.

## Boolean Explosion

Contoh tanda desain lemah:

- `isCompact`
- `isPrimary`
- `isError`
- `showHeader`
- `showFooter`
- `showIcon`
- `enableX`

Semakin banyak boolean flag, semakin banyak state kombinasi yang harus dipikirkan.
Sering kali ini tanda komponen memikul terlalu banyak varian.

## Composition Over Mega Component

Sering lebih sehat memecah:

- shell component;
- sub-section;
- action bar;
- content area;
- empty state;

daripada satu komponen raksasa dengan banyak cabang.

Tetapi pemecahan harus mengikuti concept boundary, bukan sekadar jumlah baris.

## Domain Leakage

Komponen shared sering rusak saat detail domain bocor ke dalamnya.

Contoh:

- `Table` generik tahu soal `invoice status`;
- `Badge` shared tahu mapping warna dari domain tertentu;
- `Modal` shared tahu workflow approval.

Begitu domain leakage masuk, shared layer tercemar.

## UI Primitive vs Domain Component

UI primitive:

- button;
- input;
- card shell;
- modal shell;
- layout wrapper.

Domain component:

- `InvoiceSummaryCard`
- `PatientScheduleRow`
- `PaymentStatusBadge`

Jangan campur dua kelas ini.

## Dependency Direction

Dependency sehat biasanya bergerak:

- feature bergantung ke shared primitive;
- route layer bergantung ke feature;
- shared primitive tidak bergantung ke feature.

Kalau arah dependency kebalik:

- shared layer mulai tahu domain;
- coupling meningkat;
- refactor jadi lebih mahal.

## Import Discipline

Boundary tidak hanya soal folder.
Ia juga soal import pattern.

Kalau satu komponen:

- import langsung dari feature lain;
- import internal file random;
- import private helper yang tidak seharusnya public,

boundary menjadi bocor.

## Module Organization dan Ownership Tim

Folder structure terbaik biasanya membantu menjawab:

- siapa owner fitur ini;
- change request ini harus menyentuh area mana;
- apakah dua squad sering berbenturan;
- apakah review bisa difokuskan ke owner yang tepat.

Kalau struktur tidak membantu ownership, friction kolaborasi naik.

## Reusability yang Sehat

Reuse yang sehat datang setelah pola stabil.
Bukan sebelum ada bukti.

Kalau abstraction dibuat terlalu cepat:

- props jadi aneh;
- komponen generik terasa dipaksa;
- readability turun;
- domain intent hilang.

## Testability

Boundary module yang jelas juga membuat testing lebih sehat.

Karena:

- unit lebih kecil dan jelas;
- mock boundary lebih masuk akal;
- behavior domain tidak terlalu tersebar;
- integration point lebih eksplisit.

## Folder Naming

Penamaan folder harus jujur.
Nama seperti:

- `feature`
- `modules`
- `ui`
- `shared`
- `app`

harus punya arti operasional.

Kalau nama besar tetapi isinya campur aduk, struktur hanya dekorasi.

## Anti-Pattern Umum

### 1. One Big Components Folder

Semua komponen ditaruh bersama.
Di awal terasa cepat.
Di skala tim terasa beracun.

### 2. One Big Shared Folder

Semua hal yang tidak jelas masuk `shared`.
Ini biasanya awal rawa arsitektur.

### 3. Import Antar Feature Tanpa Boundary

Perubahan kecil cepat menyebar ke banyak area.

### 4. File Organization by Habit

Struktur diwariskan begitu saja tanpa dipikirkan ulang saat tim bertumbuh.

## Heuristik Senior

1. Organisasikan codebase berdasarkan ownership dan change pattern.
2. Jadikan feature boundary sebagai alat utama.
3. Jaga shared layer tetap benar-benar shared.
4. Jangan mengekstrak reuse terlalu cepat.
5. Curigai komponen dengan prop surface besar dan boolean explosion.
6. Tegakkan dependency direction yang sehat.
7. Perlakukan folder structure sebagai keputusan arsitektur.

## Pertanyaan Interview

### Dasar

- Kenapa folder structure penting pada aplikasi skala tim?
- Apa beda UI primitive dan domain component?
- Kapan by feature lebih sehat daripada by layer?
- Kenapa terlalu banyak boolean prop berbahaya?

### Menengah

- Bagaimana Anda mendeteksi komponen yang terlalu gemuk?
- Apa risiko shared folder yang terlalu besar?
- Bagaimana menjaga public surface sebuah feature?
- Kapan co-location membantu dan kapan justru berlebihan?

### Senior

- Bagaimana Anda mendesain module organization untuk beberapa squad?
- Bagaimana Anda mencegah domain leakage ke shared layer?
- Bagaimana Anda mengevaluasi apakah boundary saat ini masih sehat setelah codebase tumbuh?
- Bagaimana Anda melakukan refactor bertahap dari struktur generik ke feature-oriented?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- folder `components` sudah ratusan file;
- feature billing menyentuh `services`, `utils`, `hooks`, dan `components` terpisah;
- shared UI mulai membawa logic domain;
- perubahan satu card kecil mengharuskan update banyak area berbeda.

## Ringkasan Brutal

- Folder dan module organization bukan urusan estetika.
- Boundary komponen yang buruk mengubah setiap perubahan menjadi mahal.
- Shared layer yang tidak dijaga cepat menjadi tempat sampah.
- Reuse prematur sering lebih mahal daripada duplikasi kecil.
- Engineer senior mendesain boundary untuk menahan kompleksitas, bukan sekadar memindahkan file.

## Checklist Pemahaman

- Saya bisa membedakan feature boundary dan shared boundary.
- Saya tahu kapan folder generik mulai berbahaya.
- Saya paham prop surface dan dependency direction sebagai sinyal arsitektur.
- Saya tidak terlalu cepat mengekstrak shared abstraction.
- Saya melihat folder structure sebagai alat ownership tim.

## Penutup

Codebase frontend besar tidak menjadi rapi dengan sendirinya.
Ia menjadi rapi ketika boundary komponen, boundary feature, dan public surface module dipikirkan dengan disiplin.

Itulah yang membedakan struktur yang tahan pertumbuhan dari struktur yang hanya terlihat bagus minggu pertama.
