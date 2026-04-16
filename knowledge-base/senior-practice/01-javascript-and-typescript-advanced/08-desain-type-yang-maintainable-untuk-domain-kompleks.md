# Desain Type yang Maintainable untuk Domain Kompleks

## Tujuan

Topik ini penting karena banyak codebase TypeScript rusak bukan karena kurang banyak type, tetapi karena type yang ada tidak mencerminkan domain secara maintainable.

Ada dua ekstrem yang sama buruk:

- type terlalu longgar sehingga hampir tidak melindungi apa pun;
- type terlalu rumit sehingga setiap perubahan domain terasa seperti operasi bedah saraf.

Engineer senior harus bisa merancang type yang:

- cukup ketat untuk menjaga kontrak;
- cukup jelas untuk dibaca tim;
- cukup fleksibel untuk berkembang;
- cukup jujur terhadap realitas domain dan runtime.

## Kenapa Topik Ini Penting

Semakin kompleks domain, semakin besar risiko:

- invalid state;
- duplicated concept dengan nama beda;
- coupling antar module;
- DTO bocor ke seluruh aplikasi;
- business rule tersebar di if-else tanpa model type yang jelas;
- refactor menjadi mahal karena type tidak punya boundary.

Type design yang maintainable bukan kosmetik.
Ia memengaruhi:

- kecepatan perubahan;
- akurasi reasoning;
- kualitas review;
- stabilitas integrasi;
- onboarding anggota tim baru.

## Model Mental yang Benar

Pegang prinsip ini:

1. Type harus memodelkan bahasa domain, bukan hanya shape data mentah.
2. Type yang baik mengurangi invalid state.
3. Type yang baik menjaga boundary antar layer tetap jelas.
4. Type yang terlalu clever bisa merusak maintainability.
5. Domain kompleks butuh evolusi type, bukan sekali desain lalu selesai.

Kalau type Anda tidak membantu orang memahami bisnis, kemungkinan besar ia hanya formalitas teknis.

## Mulai dari Bahasa Domain

Kesalahan besar yang sering terjadi:

- langsung meniru shape response API;
- menamai type berdasarkan nama tabel;
- menumpuk optional field di satu interface raksasa;
- menggunakan `any` atau `string` untuk semua hal yang sebenarnya punya makna domain berbeda.

Pendekatan yang lebih sehat:

1. identifikasi konsep inti domain;
2. beri nama yang sesuai bahasa bisnis;
3. bedakan representasi transport, persistence, dan domain;
4. modelkan state penting secara eksplisit.

## Bedakan DTO, Entity, dan Domain Model

Ini sangat penting.

Contoh kasar:

- `OrderApiResponse`
- `OrderRow`
- `Order`

Ketiganya mungkin mirip, tetapi tidak harus sama.

Kalau satu type dipakai untuk:

- response eksternal;
- row database;
- state UI;
- domain logic;

maka coupling akan meledak.

## Jangan Bocorkan Transport Shape ke Seluruh Sistem

Misalnya external API mengirim:

```ts
type PaymentApiResponse = {
  payment_id: string;
  payment_status: "PENDING" | "PAID" | "FAILED";
  paid_at: string | null;
};
```

Kalau shape ini langsung dipakai di seluruh aplikasi:

- snake_case bocor ke mana-mana;
- nullability eksternal ikut menyebar;
- perubahan provider langsung menghantam domain;
- rule bisnis tercampur dengan kontrak transport.

Lebih sehat:

- parse di boundary;
- ubah ke model internal yang lebih masuk akal.

## Hindari "God Interface"

Contoh buruk:

```ts
type User = {
  id: string;
  email?: string;
  role?: string;
  permissions?: string[];
  patientProfile?: object;
  adminProfile?: object;
  vendorProfile?: object;
  lastLoginAt?: string | null;
  // ... dan puluhan field lain
};
```

Biasanya ini sinyal bahwa:

- beberapa konsep dipaksa masuk satu type;
- state dan persona berbeda tidak dimodelkan dengan jelas;
- optional field dipakai untuk menutupi desain yang kabur.

Optional field yang terlalu banyak sering berarti invalid state terlalu mudah terbentuk.

## Gunakan Discriminated Union untuk State Domain

Kalau domain punya status berbeda dengan aturan data berbeda, union sering jauh lebih maintainable daripada satu object longgar.

```ts
type Payment =
  | { status: "pending"; paymentId: string }
  | { status: "paid"; paymentId: string; paidAt: Date }
  | { status: "failed"; paymentId: string; reason: string };
```

Keuntungannya:

- field yang relevan jelas;
- invalid combination berkurang;
- branch logic lebih aman;
- perubahan status baru lebih eksplisit.

## Primitive Obsession

Ini penyakit umum.

Semua hal dimodelkan sebagai `string`, `number`, atau `boolean`, padahal maknanya beda.

Contoh:

- `UserId` vs `OrderId`
- `Email` vs `PlainText`
- `CurrencyCode` vs `CountryCode`

Kalau semuanya `string`, pertukaran value salah menjadi terlalu mudah.

Type branding atau wrapper tertentu bisa membantu jika memang penting.

## Branded Type Secara Praktis

Contoh mental:

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
```

Ini bisa berguna untuk domain yang rawan tertukar.
Tetapi jangan overuse.
Kalau semua primitive diberi brand tanpa manfaat nyata, cognitive load naik.

## Explicit Invariant

Type yang maintainable membantu menyatakan invariant secara eksplisit.

Contoh:

- draft order belum punya invoice number;
- paid order harus punya payment timestamp;
- canceled booking harus punya cancellation reason;
- approved request harus punya approver id.

Kalau invariant seperti ini tidak termodelkan, logic akan tersebar di berbagai if statement dan review menjadi lebih sulit.

## Optional Bukan Selalu Fleksibel

Banyak orang memakai optional field agar "mudah".
Padahal optional field yang berlebihan justru menurunkan ketepatan kontrak.

Pertanyaan yang harus diajukan:

- apakah field ini benar-benar opsional secara domain?
- atau field ini hanya ada pada state tertentu?

Kalau jawabannya state tertentu, union biasanya lebih tepat daripada optional field tunggal.

## Nullability Harus Jujur

`null`, `undefined`, dan optional tidak sama persis.
Gunakan dengan sengaja.

Contoh pertanyaan:

- field ini tidak dikirim sama sekali?
- field ini memang diketahui kosong?
- field ini belum diinisialisasi?

Kalau ketiganya dicampur sembarangan, code akan penuh defensive check tanpa kejelasan.

## Pisahkan Read Model dan Write Model

Untuk domain kompleks, model baca dan model tulis sering tidak sama.

Contoh:

- create payload berbeda dari full entity;
- update patch berbeda dari detail view;
- query filter berbeda dari response aggregate.

Memaksa satu type untuk semua use case biasanya membuat type jadi besar, ambigu, dan penuh optional.

## Gunakan Composition

Type yang maintainable sering dibangun dari bagian kecil yang jelas.

```ts
type AuditInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type UserIdentity = {
  id: string;
  email: string;
};

type User = UserIdentity & AuditInfo & {
  name: string;
};
```

Composition bisa membantu, asalkan bagian-bagiannya memang punya makna yang stabil.

## Hati-hati dengan Type Alias yang Terlalu Bertingkat

Abstraksi type juga bisa kebablasan.
Kalau satu type harus dilacak lewat lima helper sebelum dipahami, maintainability turun.

Tujuan type system bukan membuat puzzle.
Tujuannya membuat intent lebih jelas.

## Keep External and Internal Types Separate

Boundary penting:

- API response type
- database persistence type
- domain model
- UI view model

Anda tidak harus memisahkan semuanya untuk setiap kasus kecil.
Tetapi untuk domain kompleks atau integration-heavy system, pemisahan ini sering sangat bernilai.

## Mapping Layer Itu Sehat

Banyak developer malas menulis mapper karena dianggap boilerplate.
Padahal mapper sering menjadi tempat paling sehat untuk:

- normalisasi shape;
- rename field;
- menyempitkan nullability;
- membangun domain object lebih kuat;
- menahan kebocoran layer luar.

Boilerplate kecil kadang lebih murah daripada coupling besar.

## Type Design dan Evolvability

Pertanyaan senior bukan cuma "apakah type ini benar sekarang?"
Pertanyaannya:

- apa yang terjadi kalau status baru muncul?
- apa yang terjadi kalau provider eksternal berubah?
- apa yang terjadi kalau satu role punya field tambahan?
- apa yang terjadi kalau workflow bisnis bertambah cabang?

Type yang maintainable mempersiapkan evolusi dengan struktur yang wajar, bukan dengan fleksibilitas palsu.

## Enum vs Union Literal

Dalam banyak kasus TypeScript application code, union literal cukup:

```ts
type Status = "draft" | "submitted" | "approved" | "rejected";
```

Ini ringan dan enak untuk narrowing.

`enum` juga punya tempat, tetapi sering membawa behavior runtime tambahan yang tidak selalu perlu.
Pilih dengan sadar.

## Modeling Workflow

Domain kompleks sering punya workflow.
Jangan modelkan workflow hanya sebagai `status: string`.

Minimal:

- pakai union literal;
- lebih baik lagi pakai discriminated union bila data per state berbeda;
- kalau perlu, definisikan transition rule terpisah.

Dengan begitu, invalid transition lebih mudah terlihat.

## Avoid Leaking Database Nullability

Database sering punya nullability historis atau kompromi schema.
Jangan otomatis wariskan semua itu ke domain.

Misalnya database mengizinkan `middle_name` null.
Belum tentu domain internal perlu terus memikirkan `null` di semua tempat.

Anda bisa normalisasi di boundary:

- `null` menjadi empty string jika memang masuk akal;
- atau pertahankan nullable jika itu benar-benar bermakna.

Yang penting, keputusan ini sengaja.

## Type Design dan Error Message

Type yang baik juga memengaruhi kualitas error compile-time.

Kalau type terlalu rumit:

- pesan error menjadi panjang dan sulit dibaca;
- developer mulai memakai `as any`;
- trust pada type system turun.

Maintainability bukan hanya soal kebenaran formal.
Ia juga soal seberapa mudah sistem type membantu manusia.

## Generics untuk Domain yang Reusable

Generic berguna jika ada pola domain berulang.

Contoh:

- paginated response;
- API result wrapper;
- form field state;
- entity with audit metadata.

Tetapi hati-hati.
Jangan memaksa seluruh domain menjadi generic hanya demi reuse teoretis.

## Jangan Biarkan Internal Utility Mendikte Domain

Kadang codebase menjadi aneh karena domain dipaksa mengikuti utility type yang sudah ada.
Itu terbalik.

Utility harus melayani domain.
Bukan domain dipangkas agar cocok dengan helper abstrak.

## Type dan Testing

Type yang baik tidak menggantikan test.
Tetapi ia membantu fokus test pada behavior, bukan hal-hal mekanis yang sudah dijaga compiler.

Kalau type lemah, test sering terpaksa mengisi banyak kasus invalid shape.
Kalau type kuat, test bisa lebih fokus ke aturan bisnis.

## Heuristik Senior

1. Bedakan type boundary eksternal dari model internal.
2. Hindari satu type raksasa untuk semua use case.
3. Gunakan union untuk state berbeda, bukan banyak optional field.
4. Pastikan nama type mengikuti bahasa domain.
5. Buat invalid state lebih sulit dibangun.
6. Gunakan mapper bila itu mengurangi coupling.
7. Hindari type yang terlalu pintar jika tim sulit memeliharanya.

## Pertanyaan Interview

### Dasar

- Kenapa satu interface besar penuh optional field itu berbahaya?
- Apa beda DTO dengan domain model?
- Kenapa discriminated union bagus untuk workflow state?
- Kapan `string` terlalu lemah sebagai representasi domain?

### Menengah

- Kapan Anda membuat mapper antar layer?
- Bagaimana Anda memodelkan state yang berubah sepanjang lifecycle?
- Apa risiko membocorkan response API eksternal ke seluruh aplikasi?
- Kapan branded type berguna?

### Senior

- Bagaimana Anda mendesain type untuk domain yang terus berkembang?
- Bagaimana Anda menyeimbangkan ketelitian type dengan biaya maintainability?
- Kapan harus memisahkan persistence model dan domain model?
- Bagaimana Anda mencegah type system menjadi terlalu abstrak untuk tim?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- membangun modul pembayaran;
- mendesain state order dan shipment;
- memodelkan role dan permission;
- menangani data pasien, jadwal, dan status integrasi;
- memisahkan response third-party dengan domain internal;
- mendesain form multi-step;
- membangun dashboard admin dengan banyak state.

Ini adalah topik design inti, bukan dekorasi TypeScript.

## Ringkasan Brutal

- Type yang maintainable memodelkan domain, bukan hanya shape mentah.
- Optional field berlebihan biasanya tanda desain kabur.
- Boundary type harus jelas.
- Mapper kecil sering lebih murah daripada coupling besar.
- Type yang terlalu cerdas bisa sama merusaknya dengan type yang terlalu longgar.

Kalau Anda belum bisa menjelaskan kenapa suatu type ada, state apa yang ia lindungi, dan boundary apa yang ia jaga, berarti desain type itu belum matang.

## Checklist Pemahaman

- Saya membedakan DTO, persistence model, dan domain model.
- Saya tidak memakai god interface untuk semua state.
- Saya bisa memilih union dibanding optional field saat state berbeda.
- Saya sadar primitive obsession bisa merusak kejelasan domain.
- Saya tahu kapan mapper justru meningkatkan maintainability.
- Saya menjaga type tetap cukup kuat tanpa menjadikannya puzzle.
- Saya memikirkan evolusi domain saat mendesain type.

## Penutup

Desain type yang maintainable adalah bagian dari desain sistem.
Ia menentukan apakah perubahan domain berikutnya terasa seperti update wajar atau seperti membuka jebakan teknis lama.

Engineer senior tidak mengejar type yang paling canggih.
Ia mengejar type yang paling membantu sistem tetap benar, jelas, dan bisa berkembang.
