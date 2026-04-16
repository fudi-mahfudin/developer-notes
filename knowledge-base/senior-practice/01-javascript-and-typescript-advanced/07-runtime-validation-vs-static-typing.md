# Runtime Validation vs Static Typing

## Tujuan

Ini topik yang sangat penting karena banyak developer TypeScript membuat kesalahan fatal:
mereka mengira karena code lolos compile, maka data juga aman saat runtime.

Itu delusi.

Static typing dan runtime validation menyelesaikan masalah yang berbeda.
Kalau Anda mencampur keduanya, Anda akan membuat sistem yang terlihat aman di editor tetapi rapuh saat menerima data nyata dari luar.

## Kenapa Topik Ini Penting

Aplikasi bisnis hidup dari data yang datang dari luar:

- request HTTP
- query string
- form input
- environment variable
- file upload
- database record
- external API
- message queue
- local storage

Semua itu adalah boundary runtime.
Dan boundary runtime tidak peduli TypeScript Anda seberapa rapi.

Kalau data datang salah:

- compile-time tidak akan menyelamatkan Anda;
- type assertion tidak akan menyelamatkan Anda;
- autocomplete tidak akan menyelamatkan Anda.

Anda butuh runtime validation.

## Model Mental yang Benar

Pegang ini:

1. TypeScript melindungi asumsi di saat development.
2. Runtime validation melindungi sistem saat data nyata masuk.
3. Static typing tidak bisa memverifikasi payload eksternal yang belum dicek.
4. Runtime validation tanpa type yang baik tetap bisa membuat codebase berantakan.
5. Sistem yang matang biasanya butuh keduanya.

Kalau seseorang berkata "kita pakai TypeScript, jadi tidak perlu validation", itu jawaban yang salah.

## Apa yang Dilakukan Static Typing

Static typing membantu:

- mendeteksi mismatch type saat compile;
- memperjelas kontrak antar module;
- membantu refactor;
- memberi autocomplete dan inference;
- membatasi invalid state di level source code.

Contoh:

```ts
type User = {
  id: string;
  email: string;
};

function sendEmail(user: User) {
  return user.email.toLowerCase();
}
```

Ini bagus.
Kalau Anda memanggil `sendEmail({ id: 1 })`, compiler bisa protes.

Tetapi itu hanya berlaku jika data tersebut memang berada di dunia TypeScript Anda.

## Apa yang Tidak Bisa Dilakukan Static Typing

TypeScript tidak bisa menjamin bahwa:

- response API benar-benar cocok dengan type;
- `process.env.PORT` benar-benar number valid;
- local storage berisi JSON yang sesuai shape;
- body request dari user mengikuti contract;
- database row lama belum korup;
- third-party webhook tidak berubah diam-diam.

TypeScript hanya percaya pada deklarasi Anda.
Kalau deklarasi itu salah, compiler tetap diam.

## Contoh Delusi Umum

```ts
const user = (await response.json()) as User;
```

Ini bukan validation.
Ini hanya memerintahkan compiler untuk diam.

Kalau payload asli ternyata:

```json
{ "id": 123, "email": null }
```

Type assertion tidak memperbaiki data.
Ia hanya mematikan alarm compile-time.

## Runtime Validation

Runtime validation berarti memeriksa data nyata saat program berjalan.

Tujuannya:

- pastikan shape sesuai;
- pastikan field wajib ada;
- pastikan tipe dasar benar;
- pastikan constraint domain tertentu terpenuhi;
- tolak atau normalisasi data yang salah.

Contoh mental:

- apakah `email` string valid?
- apakah `age` number, bukan `"20"`?
- apakah enum hanya salah satu nilai yang diizinkan?
- apakah object nested punya properti wajib?

## Boundary yang Wajib Dicurigai

Semua input eksternal harus dianggap tidak terpercaya.

Boundary umum:

- HTTP request body
- query params
- route params
- cookies
- headers
- environment variables
- API eksternal
- database legacy
- queue messages
- browser storage

Kalau boundary seperti ini tidak divalidasi, Anda sedang membangun kepercayaan di atas asumsi palsu.

## Static Typing Bekerja Baik di Internal Boundary

Di dalam codebase sendiri, static typing sangat kuat.

Misalnya:

- module A memanggil module B;
- generic utility menjaga hubungan type;
- discriminated union mencegah invalid state;
- refactor property memicu compile error.

Itu nilai besar.
Tetapi jangan memindahkan kepercayaan internal ini ke boundary eksternal tanpa verifikasi runtime.

## Runtime Validation Bisa Sekaligus Menjadi Parsing

Validation tidak selalu berarti hanya `true/false`.
Sering kali ia sekaligus parsing dan normalisasi.

Contoh:

- string `"42"` diubah menjadi number `42`;
- tanggal string diubah menjadi `Date` atau format internal;
- field optional diberi default;
- whitespace dibersihkan.

Tetapi hati-hati:
semakin banyak transformasi, semakin penting kontrak validator jelas.

## Fail Closed vs Fail Open

Ini pertanyaan penting.

### Fail Closed

Jika data tidak valid, tolak.

Ini tepat saat:

- data kritis;
- keamanan penting;
- operasi tulis sensitif;
- state corrupt berbahaya.

### Fail Open

Jika data tidak valid, mungkin beri default atau lanjut sebagian.

Ini hanya tepat saat:

- risikonya rendah;
- fallback valid secara bisnis;
- pengalaman pengguna lebih penting daripada ketepatan penuh;
- field tidak kritis.

Kalau Anda fail open di tempat yang salah, Anda menciptakan silent corruption.

## Validation di Frontend

Frontend tetap butuh validation walaupun backend juga memvalidasi.

Alasannya:

- UX butuh feedback cepat;
- state lokal bisa salah;
- browser storage bisa korup;
- API response eksternal bisa melenceng;
- feature flag atau config runtime bisa salah.

Tetapi jangan tertipu:
validasi frontend tidak menggantikan validasi backend.
Frontend adalah lapisan kenyamanan.
Backend tetap lapisan kepercayaan utama untuk operasi server-side.

## Validation di Backend

Backend adalah tempat boundary trust harus paling jelas.

Yang biasanya perlu divalidasi:

- request body;
- params;
- query;
- auth payload;
- config environment;
- response dependency eksternal sebelum dipakai ke domain.

Kalau backend menerima input mentah lalu langsung meneruskannya ke domain logic, Anda sedang mengundang bug dan potensi celah keamanan.

## Schema Validation

Schema validation membantu membuat kontrak runtime eksplisit.
Alih-alih sekadar berharap payload benar, Anda mendeklarasikan aturan yang harus lolos.

Contoh mental dengan library validator:

- `name` wajib string non-empty;
- `age` wajib integer >= 0;
- `status` hanya salah satu dari nilai tertentu.

Keuntungannya:

- kontrak lebih jelas;
- error message lebih konsisten;
- reuse lebih mudah;
- integrasi dengan TypeScript sering lebih baik.

## Type Inference dari Schema

Salah satu pattern bagus adalah:

- definisikan schema runtime;
- derive type statis dari schema itu.

Keuntungannya:

- satu sumber kebenaran;
- drift antara runtime dan compile-time berkurang.

Tetapi tetap cek trade-off:

- apakah schema terlalu kompleks?
- apakah inference membuat type susah dibaca?
- apakah tim nyaman memakainya?

## Type Assertion Adalah Bahaya Tersembunyi

`as` sering dipakai sebagai obat cepat.
Padahal sering menjadi cara menyembunyikan ketidakpastian.

Contoh:

```ts
const config = process.env as unknown as AppConfig;
```

Ini nyaris selalu buruk.
Anda baru saja mengatakan ke compiler:
"tolong pura-pura semua environment variable valid."

Itu bukan safety.
Itu teater.

## Parsing Environment Variable

Environment variable selalu datang sebagai string atau undefined.
Kalau Anda langsung menggunakannya sebagai type yang lebih kaya tanpa parsing, Anda berbohong pada sistem.

Contoh masalah:

- port bukan number valid;
- boolean `"false"` dianggap truthy string;
- URL kosong tetap lolos;
- secret penting tidak ada.

Config startup seharusnya divalidasi di awal.
Lebih baik gagal cepat saat boot daripada gagal acak di runtime nanti.

## Validation dan Domain Invariant

Ada dua level penting:

### Shape Validation

Memastikan data punya bentuk dasar yang benar.

### Domain Validation

Memastikan data masuk akal bagi bisnis.

Contoh:

- `startDate` dan `endDate` keduanya valid tanggal;
- tetapi `endDate` tidak boleh sebelum `startDate`.

Yang pertama shape.
Yang kedua domain invariant.

Sistem matang butuh keduanya.

## Validation di Response Eksternal

Banyak tim rajin memvalidasi request masuk, tetapi malas memvalidasi response dari dependency eksternal.
Itu kesalahan besar.

Kalau external API berubah:

- field hilang;
- tipe berubah;
- null muncul di tempat tak terduga;
- enum baru dikirim;

dan Anda langsung percaya payload itu, sistem internal Anda bisa rusak.

Boundary eksternal tetap boundary, bahkan jika sumbernya "partner resmi".

## Trust Boundary

Konsep penting:

- di dalam trust boundary, static typing bisa sangat kuat;
- saat melintasi trust boundary, runtime validation wajib dipertimbangkan.

Contoh trust boundary:

- dari browser ke backend;
- dari service A ke service B;
- dari storage ke application memory;
- dari env ke config object.

Kalau Anda gagal mengenali boundary, Anda akan salah menaruh validation.

## Runtime Validation Tidak Gratis

Validation punya biaya:

- CPU tambahan;
- verbosity;
- maintenance schema;
- potensi duplikasi jika tidak dirancang baik.

Tetapi biaya ini harus dibandingkan dengan:

- crash production;
- silent corruption;
- security issue;
- debugging time;
- incorrect business decision akibat data salah.

Dalam banyak sistem bisnis, biaya validation jauh lebih murah daripada biaya kebocoran data salah.

## Kapan Validation Bisa Diringankan

Tidak semua boundary butuh validasi super berat.

Contoh:

- antar function internal kecil dalam module yang sama;
- data yang baru saja dibuat oleh code tervalidasi di path yang sama;
- hot path tertentu yang sudah punya kontrak kuat dan pengukuran jelas.

Tetapi keputusan merelaksasi validation harus sadar, bukan asal.

## Narrowing Manual

Kadang Anda tidak perlu library besar.
Type guard manual bisa cukup.

```ts
function isUser(value: unknown): value is { id: string; email: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}
```

Ini berguna untuk kasus kecil.
Tetapi untuk schema besar, pendekatan manual cepat menjadi rapuh.

## Static Typing Membantu Setelah Validation

Urutan sehat biasanya:

1. terima data `unknown`;
2. validasi atau parse;
3. ubah menjadi type internal yang dipercaya;
4. setelah itu, nikmati kekuatan TypeScript sepenuhnya.

Ini jauh lebih jujur daripada langsung menganggap payload eksternal sudah sesuai interface.

## Validation Error Harus Jelas

Kalau validation gagal, output error harus cukup jelas untuk:

- user, bila relevan;
- developer atau operator;
- logging/monitoring.

Error seperti "Invalid input" kadang terlalu kabur.
Tetapi membocorkan detail internal mentah ke user juga buruk.

Sekali lagi, audiens berbeda butuh level detail berbeda.

## Sinkronisasi Schema dan Type

Masalah umum di codebase besar:

- type TypeScript berubah;
- validator runtime lupa diubah;
- keduanya drift;
- bug lolos review karena masing-masing terlihat "benar".

Solusi yang sehat:

- satu sumber kebenaran bila memungkinkan;
- test untuk boundary kritis;
- disiplin review pada schema dan contract.

## Frontend Form Validation vs Server Validation

Ini harus dibedakan.

Frontend form validation:

- untuk UX;
- feedback cepat;
- mengurangi request sia-sia.

Server validation:

- untuk trust boundary;
- proteksi final;
- keamanan dan integritas data.

Kalau Anda hanya punya frontend validation, Anda belum aman.
Kalau Anda hanya punya backend validation, UX bisa buruk tetapi keamanan masih lebih sehat.

## Anti-Pattern Umum

### 1. `as` untuk Semua Payload

Ini bukan validasi.

### 2. Menganggap DB Selalu Benar

Data lama, migrasi setengah jalan, atau integrasi manual bisa membuat data database tidak sesuai asumsi type.

### 3. Memvalidasi Hanya Input, Tidak Output Dependency

Ini setengah sadar.

### 4. Mencampur Parsing, Validation, dan Business Logic Tanpa Boundary

Hasilnya sulit dites dan sulit dipelihara.

## Heuristik Senior

1. Semua data eksternal dianggap `unknown` sampai terbukti valid.
2. TypeScript sangat membantu, tetapi tidak memverifikasi runtime reality.
3. Validasi sebaiknya dilakukan di boundary terdekat.
4. Bedakan shape validation dari domain validation.
5. Fail fast pada config dan input kritis.
6. Jangan pakai type assertion sebagai pengganti validation.
7. Setelah data tervalidasi, baru manfaatkan type system secara maksimal.

## Pertanyaan Interview

### Dasar

- Kenapa TypeScript tidak cukup untuk memvalidasi request body?
- Apa beda static typing dan runtime validation?
- Kenapa `as User` bukan validasi?
- Kenapa env var perlu diparse?

### Menengah

- Kapan type guard manual cukup dan kapan perlu schema validator?
- Apa beda shape validation dan domain validation?
- Kenapa response API eksternal juga perlu divalidasi?
- Bagaimana Anda menentukan boundary trust?

### Senior

- Bagaimana Anda mendesain pipeline dari `unknown` menjadi domain object yang dipercaya?
- Bagaimana Anda mencegah drift antara runtime schema dan static type?
- Kapan biaya runtime validation tidak sepadan?
- Bagaimana Anda menjelaskan trade-off validation di hot path production?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- menerima payload dari form;
- membaca `process.env`;
- memproses webhook pihak ketiga;
- parse JSON dari local storage;
- membaca response partner API;
- menormalisasi data database lama;
- membangun API client internal;
- membuat config startup service.

Ini topik operasional inti.

## Ringkasan Brutal

- TypeScript membantu saat development.
- Runtime validation melindungi saat data nyata masuk.
- `as` bukan validation.
- Semua external boundary harus dicurigai.
- Sistem yang matang biasanya butuh static typing dan runtime validation sekaligus.

Kalau Anda masih percaya compile success berarti data aman, berarti Anda belum memahami kenyataan sistem runtime.

## Checklist Pemahaman

- Saya tahu kapan TypeScript membantu dan kapan ia tidak cukup.
- Saya menganggap input eksternal sebagai `unknown`.
- Saya bisa membedakan shape validation dan domain validation.
- Saya tidak memakai type assertion sebagai pengganti validation.
- Saya sadar response dependency eksternal juga perlu diverifikasi.
- Saya paham env var harus diparse dan divalidasi.
- Saya bisa menjelaskan trust boundary secara konkret.

## Penutup

Perbedaan antara static typing dan runtime validation terdengar teoritis hanya bagi orang yang belum pernah kena incident karena payload eksternal ternyata tidak sesuai asumsi.

Begitu Anda pernah mengalami satu bug serius akibat kepercayaan buta pada data luar, topik ini tidak lagi terasa akademik.
Ia menjadi disiplin dasar.
