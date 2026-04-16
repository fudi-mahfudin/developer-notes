# TypeScript Advanced Types: Generics, Utility Types, Mapped Types, Conditional Types, dan Discriminated Unions

## Tujuan

Topik ini penting karena banyak developer bisa menulis TypeScript yang "jalan", tetapi type system-nya hanya dipakai sebagai pelapis tipis di atas JavaScript.
Itu tidak cukup untuk level senior.

Kalau Anda ingin dianggap kuat di TypeScript, Anda harus bisa:

- mendesain generic yang berguna;
- membedakan type yang membantu dengan type yang membuat codebase gelap;
- memanfaatkan utility type tanpa membabi buta;
- membangun model domain yang aman terhadap perubahan;
- menjelaskan kapan type canggih bernilai dan kapan ia hanya akrobat syntax.

## Kenapa Topik Ini Penting

TypeScript bukan sekadar alat untuk menghindari typo.
Nilai besarnya ada pada:

- kontrak antar module;
- design reasoning;
- refactor safety;
- dokumentasi yang executable;
- pembatasan invalid state;
- komunikasi intent lintas tim.

Kalau advanced types dipakai dengan benar, codebase menjadi lebih aman dan lebih expressive.
Kalau dipakai sembarangan, codebase justru menjadi sulit dibaca dan sulit diperbaiki.

## Model Mental yang Benar

Pegang prinsip ini:

1. Type system harus membantu reasoning domain.
2. Semakin canggih type, semakin tinggi biaya pembacaan.
3. Generic yang bagus mengekspresikan hubungan, bukan sekadar membuat semuanya fleksibel.
4. Utility type dan mapped type adalah alat komposisi, bukan hiasan.
5. Discriminated union sangat kuat untuk memodelkan state dan branching.

Kalau type Anda terlihat pintar tetapi susah dijelaskan ke teammate, kemungkinan besar ia belum baik.

## Generics

### Definisi Dasar

Generic memungkinkan Anda membuat type atau function yang bekerja untuk berbagai tipe sambil tetap mempertahankan hubungan type tersebut.

Contoh sederhana:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Di sini `T` bukan dekorasi.
Ia menyatakan hubungan:

- input bertipe `T`;
- output juga `T`.

Itu lebih kuat daripada `any`.

## Generic vs `any`

Ini pembedaan penting.

```ts
function identityAny(value: any): any {
  return value;
}
```

Versi `any` membuang informasi type.
Versi generic mempertahankan informasi type.

Kalau Anda memakai `any` saat sebenarnya butuh generic, Anda sedang mengorbankan safety dan inference.

## Generic Constraint

Kadang generic tidak boleh benar-benar bebas.
Di situlah constraint berguna.

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}
```

Sekarang function ini mengatakan:

- saya fleksibel;
- tetapi saya butuh minimal properti `id`.

Ini jauh lebih jujur daripada menerima type terlalu umum lalu melakukan cast di dalam.

## Generic untuk Hubungan Antar Parameter

Contoh berguna:

```ts
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Type ini penting karena menghubungkan:

- object `T`;
- key yang valid dari `T`;
- nilai hasil yang sesuai dengan key tersebut.

Inilah kekuatan utama generic:
menjaga relasi antar type tetap utuh.

## Generic yang Terlalu Longgar

Contoh buruk:

```ts
function process<T>(value: T): T {
  return value;
}
```

Kalau function nyata Anda sebenarnya hanya cocok untuk subset tertentu, generic seperti ini terlalu kabur.

Senior engineer tidak memakai generic hanya agar terlihat fleksibel.
Ia memakai generic saat ada hubungan type yang benar-benar perlu dipertahankan.

## Utility Types

TypeScript menyediakan utility type bawaan yang sangat membantu.

Yang paling sering dan paling berguna:

- `Partial<T>`
- `Required<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Omit<T, K>`
- `Record<K, T>`
- `ReturnType<T>`
- `Parameters<T>`
- `Awaited<T>`

## `Partial<T>`

`Partial<T>` membuat semua properti menjadi optional.

```ts
type User = {
  id: string;
  name: string;
  email: string;
};

type UserPatch = Partial<User>;
```

Ini berguna untuk update payload.
Tetapi hati-hati:
`Partial` sering terlalu longgar jika domain Anda sebenarnya butuh aturan lebih ketat.

Misalnya:

- boleh update `name`;
- tidak boleh update `id`;
- minimal satu field harus ada.

Kalau begitu, `Partial<User>` saja tidak cukup.

## `Readonly<T>`

`Readonly<T>` membantu memperjelas kontrak bahwa data ini tidak boleh dimutasi.

```ts
type Config = Readonly<{
  baseUrl: string;
  timeout: number;
}>;
```

Ini bagus untuk config, DTO tertentu, atau result yang harus diperlakukan immutable di level type.

Tetapi ingat:
ini perlindungan compile-time, bukan runtime.

## `Pick` dan `Omit`

`Pick` dan `Omit` membantu membentuk type turunan dengan cepat.

```ts
type UserSummary = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
```

Ini berguna.
Tetapi jika Anda terlalu sering membentuk type turunan ad hoc dari entity besar, itu bisa menjadi sinyal bahwa model domain Anda kurang jelas.

## `Record<K, T>`

`Record` berguna untuk map object dengan key yang terkontrol.

```ts
type Status = "idle" | "loading" | "success" | "error";

const labels: Record<Status, string> = {
  idle: "Idle",
  loading: "Loading",
  success: "Success",
  error: "Error",
};
```

Ini bagus karena memastikan semua key ditangani.

## Mapped Types

Mapped type memungkinkan Anda membangun type baru dengan mentransform properti dari type lain.

Contoh mental sederhana:

```ts
type ReadonlyUser<T> = {
  readonly [K in keyof T]: T[K];
};
```

Ini contoh bahwa utility type bawaan sebenarnya banyak dibangun dari konsep mapped type.

## Kenapa Mapped Type Penting

Karena dalam sistem besar, Anda sering butuh:

- membuat semua field optional;
- membuat semua field readonly;
- membungkus setiap field dengan metadata;
- mengubah shape berdasarkan key asli.

Mapped type memberi cara yang sistematis.

## Conditional Types

Conditional type memungkinkan type berubah berdasarkan kondisi type lain.

Contoh dasar:

```ts
type IsString<T> = T extends string ? true : false;
```

Ini terlihat kecil, tetapi konsepnya sangat kuat.
Dengan ini Anda bisa membangun type yang mengekspresikan branching logic di level type system.

## Contoh Berguna Conditional Type

```ts
type ApiResult<T> = T extends undefined
  ? { ok: false }
  : { ok: true; data: T };
```

Contoh ini memang sederhana, tetapi menunjukkan bahwa type bisa merespons input type dengan cara yang terkontrol.

## Distributive Conditional Type

Ini area yang sering mengejutkan developer.

Ketika conditional type diterapkan pada union, ia bisa menjadi distributive.

```ts
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;
```

`Result` menjadi:

```ts
string[] | number[]
```

Bukan:

```ts
(string | number)[]
```

Kalau Anda tidak paham perilaku ini, Anda akan bingung kenapa hasil type tidak sesuai intuisi awal.

## `infer`

`infer` memungkinkan TypeScript menangkap bagian dari type di dalam conditional type.

Contoh:

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

Ini sangat berguna untuk mengekstrak type dari wrapper.

## Discriminated Union

Ini salah satu fitur TypeScript paling bernilai untuk codebase aplikasi.

Contoh:

```ts
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

Kenapa ini kuat?

Karena ia membuat invalid state lebih sulit terjadi.
Anda tidak lagi punya kombinasi aneh seperti:

- `loading: true`
- `error: "failed"`
- `data: [...]`

semua aktif bersamaan tanpa makna jelas.

## Narrowing pada Discriminated Union

```ts
function render(state: RequestState) {
  if (state.status === "success") {
    return state.data.join(", ");
  }

  if (state.status === "error") {
    return state.message;
  }

  return "pending";
}
```

TypeScript bisa mempersempit type berdasarkan discriminator `status`.
Ini sangat membantu readability dan safety.

## Exhaustiveness Checking

Ini pola yang sangat senior.

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function render(state: RequestState) {
  switch (state.status) {
    case "idle":
      return "idle";
    case "loading":
      return "loading";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.message;
    default:
      return assertNever(state);
  }
}
```

Kalau nanti ada state baru ditambahkan dan belum ditangani, compiler bisa membantu.

## Generic API Response

Contoh pola yang sering muncul:

```ts
type ApiSuccess<T> = {
  ok: true;
  data: T;
};

type ApiFailure = {
  ok: false;
  error: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
```

Ini berguna karena:

- shape hasil konsisten;
- caller dipaksa menangani dua cabang;
- type `data` tetap spesifik.

## Type-Level Design yang Buruk

Beberapa anti-pattern umum:

### 1. Overuse `any`

`any` mematikan banyak manfaat TypeScript.

### 2. Over-Generalized Generic

Generic dipakai di mana-mana tanpa hubungan type yang nyata.

### 3. Union Tanpa Discriminator

```ts
type State =
  | { data: string[] }
  | { error: string };
```

Ini bisa dipakai, tetapi sering lebih sulit dinarrow secara aman daripada union dengan discriminator eksplisit.

### 4. Type yang Terlalu "Pintar"

Kalau type butuh 30 detik untuk dibaca dan 5 menit untuk dijelaskan, mungkin ada desain yang lebih sederhana.

## Advanced Types dan Domain Modeling

Advanced types paling bernilai saat dipakai untuk domain yang benar-benar butuh pembatasan state.

Contoh:

- status request;
- payment state;
- workflow approval;
- event payload dengan type berbeda;
- konfigurasi feature flag;
- form state yang punya beberapa tahap validasi.

Di sini discriminated union, generic, dan mapped type benar-benar membantu.

## Advanced Types dan Refactor Safety

Type yang baik membuat perubahan lebih aman.
Misalnya:

- rename property memicu compile error di titik relevan;
- state baru memaksa switch branch diperbarui;
- perubahan return type memaksa caller menyesuaikan.

Inilah manfaat nyata TypeScript.
Bukan sekadar membuat editor lebih berwarna.

## Kapan Jangan Terlalu Canggih

Tidak semua code perlu advanced types.

Jangan terlalu canggih saat:

- plain interface sudah cukup;
- type helper membuat intent kabur;
- tim belum bisa maintain abstraksinya;
- domain belum stabil;
- compile performance memburuk tanpa manfaat sepadan.

Senior engineer tahu kapan berhenti.

## Type Alias vs Interface

Keduanya berguna.

Secara praktis:

- `interface` enak untuk shape object yang akan di-extend;
- `type` lebih fleksibel untuk union, intersection, mapped type, dan utility composition.

Jangan jadikan ini perang ideologis.
Pilih yang paling jelas untuk konteksnya.

## `unknown` vs `any`

Kalau Anda belum tahu tipe data, `unknown` hampir selalu lebih jujur daripada `any`.

`unknown` memaksa narrowing sebelum digunakan.
`any` memberi kebebasan palsu yang menghilangkan safety.

```ts
function parse(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }
}
```

## `never`

`never` penting untuk mengekspresikan kondisi yang seharusnya tidak mungkin terjadi.
Ini sangat berguna untuk exhaustiveness checking dan function yang memang tidak kembali.

Contoh:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

## Utility Type Kustom

Kadang Anda perlu membuat helper sendiri.

Contoh:

```ts
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
```

Tidak masalah.
Tetapi jangan membuat "kamus type" besar yang hanya memindahkan kompleksitas tanpa mengurangi biaya mental.

## Type Assertion Harus Jarang

`as` punya tempat, tetapi berbahaya jika dipakai untuk menutupi kekurangan model.

Contoh buruk:

```ts
const user = response as User;
```

Kalau data dari luar belum divalidasi, assertion ini bisa menipu compiler dan developer.

Lebih sehat:

- validasi runtime dulu;
- baru sempitkan type.

## Hubungan dengan Runtime Reality

Ini poin yang sangat penting:

TypeScript hanya ada saat development.
Saat runtime, type menghilang.

Karena itu:

- type bagus tidak menggantikan validation runtime;
- data dari API tetap bisa rusak;
- user input tetap bisa salah;
- deserialisasi tetap bisa gagal.

Senior engineer selalu mengingat batas ini.

## Heuristik Senior

1. Gunakan generic untuk relasi type yang nyata.
2. Hindari `any` jika `unknown`, union, atau generic bisa dipakai.
3. Gunakan discriminated union untuk state machine atau branching domain.
4. Utility type berguna, tetapi jangan sampai domain jadi kabur.
5. Jangan membuat type helper terlalu pintar tanpa manfaat nyata.
6. Ingat bahwa TypeScript tidak menggantikan runtime validation.
7. Optimalkan untuk maintainability tim, bukan untuk pamer syntax.

## Pertanyaan Interview

### Dasar

- Apa beda generic dan `any`?
- Kapan Anda memakai `Partial` atau `Readonly`?
- Apa itu discriminated union?
- Apa fungsi `unknown`?

### Menengah

- Kenapa generic constraint penting?
- Kapan mapped type lebih tepat daripada menulis interface manual?
- Apa manfaat exhaustiveness checking?
- Apa risiko type assertion sembarangan?

### Senior

- Bagaimana Anda menilai apakah advanced type membantu atau justru mengaburkan code?
- Kapan Anda memilih discriminated union dibanding banyak boolean flag?
- Bagaimana Anda mendesain generic API yang tetap mudah dibaca?
- Bagaimana Anda menjaga keseimbangan antara type power dan maintainability tim?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- mendesain API client;
- membangun form state;
- memodelkan status async;
- membuat reusable hook atau utility;
- memetakan DTO ke domain model;
- membangun config system;
- menulis event-driven payload type;
- memaksa contract antar package tetap stabil.

Jadi ini bukan soal type wizardry.
Ini soal design clarity.

## Ringkasan Brutal

- Generic yang baik menjaga hubungan type.
- Utility type membantu, tetapi tidak boleh menggantikan design thinking.
- Discriminated union adalah alat yang sangat kuat untuk membunuh invalid state.
- `any` adalah jalan pintas mahal.
- Type yang terlalu pintar bisa sama buruknya dengan type yang terlalu longgar.

Kalau Anda belum bisa menjelaskan kenapa sebuah advanced type ada dan trade-off-nya apa, berarti Anda belum benar-benar menguasainya.

## Checklist Pemahaman

- Saya tahu beda generic dengan `any`.
- Saya bisa memakai constraint untuk membuat generic lebih jujur.
- Saya paham utility type utama dan kapan memakainya.
- Saya bisa membaca dan menulis mapped type dasar.
- Saya paham conditional type dan `infer` pada level praktis.
- Saya bisa memodelkan state dengan discriminated union.
- Saya tidak lupa bahwa runtime tetap butuh validation.

## Penutup

TypeScript advanced types bukan medali.
Ia adalah alat desain.

Dipakai dengan tepat, ia membuat codebase lebih aman, lebih jelas, dan lebih tahan refactor.
Dipakai secara ego-driven, ia membuat codebase penuh type gymnastics yang melelahkan.

Engineer senior tahu bedanya.
