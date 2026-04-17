# Q3 - Lexical Scope vs Dynamic Scope di JavaScript

## Pertanyaan Interview

Jelaskan lexical scope vs dynamic scope di konteks JavaScript.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"JavaScript memakai lexical scope, artinya scope ditentukan oleh posisi kode saat ditulis,
bukan oleh siapa yang memanggil function saat runtime. Jadi function akan mengakses variabel
dari lingkungan tempat dia didefinisikan. Dynamic scope kebalikannya: variabel dicari dari
call stack pemanggil. JavaScript tidak memakai dynamic scope untuk variable resolution.

Implikasinya besar untuk maintainability: kita bisa prediksi nilai variabel tanpa menebak
alur caller yang kompleks. Di production healthcare, ini penting untuk menjaga konsistensi
data proses seperti retur farmasi dan integrasi antar sistem, karena logic jadi deterministik
dan lebih aman saat refactor." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kalau JS lexical, kenapa `this` terlihat seperti dynamic?"
2. "Apakah closure bergantung pada lexical scope?"
3. "Contoh bug kalau engineer salah paham lexical scope?"
4. "Apa hubungannya lexical scope dengan module boundaries?"
5. "Bagaimana menjelaskan ini ke tim junior?"

### Jawaban Singkat untuk Follow-up

1) `this` terlihat dynamic:
"Benar, binding `this` ditentukan cara function dipanggil, tapi lookup variabel biasa tetap lexical."

2) Closure dan lexical scope:
"Closure adalah konsekuensi langsung lexical scope: function menyimpan akses ke outer scope saat didefinisikan."

3) Bug umum:
"State global tertimpa karena salah asumsi variabel diambil dari caller, padahal dari definition scope."

4) Module boundaries:
"Lexical scope memperjelas boundary private/public pada module dan menurunkan coupling."

5) Menjelaskan ke junior:
"Tunjukkan bahwa jawaban variabel ditentukan dari 'tempat fungsi dibuat', bukan 'siapa yang manggil'."

## Jawaban Ideal (Versi Singkat, Level Senior)

Lexical scope berarti variable resolution ditentukan oleh struktur source code.
Dynamic scope berarti variable resolution ditentukan call chain saat runtime.
JavaScript memilih lexical scope untuk variabel, sehingga behavior lebih predictable.

Untuk engineer senior:
- mempermudah reasoning saat code review
- mengurangi bug saat refactor besar
- membuat closure, module encapsulation, dan testability lebih kuat

## Penjelasan Detail yang Dicari Interviewer

### 1) Cara lookup pada lexical scope

Saat engine mengevaluasi identifier, pencarian naik dari scope saat ini ke outer scope
berdasarkan struktur code block/function/module.

### 2) Kenapa dynamic scope berisiko

Kalau variabel ditentukan caller:
- function jadi sulit diprediksi
- debugging bergantung jalur eksekusi
- regression mudah muncul saat flow pemanggilan berubah

### 3) Kenapa ini penting untuk refactor

Di codebase besar, lexical scope menjaga function contract tetap stabil meski caller bertambah.
Ini sejalan dengan praktik kamu saat migrasi bertahap dan menjaga rollback risk rendah.

### 4) Anti-pattern umum

- Mengandalkan variabel global implicit.
- Menaruh mutable state di scope terlalu luar.
- Naming shadowing berlebihan yang bikin salah baca nilai.

Mitigasi:
- prefer `const` default
- batasi scope sekecil mungkin
- aktifkan lint rule no-shadow, no-undef

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const location = "global";

function createPrinter() {
  const location = "module-pharmacy";
  return function print() {
    return location; // lexical: ambil dari tempat function didefinisikan
  };
}

function run(printFn) {
  const location = "caller-runtime";
  return printFn();
}

const printer = createPrinter();
console.log(run(printer)); // module-pharmacy
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Kamu pernah menangani integrasi KAIROS dan WMS plus FIFO inventory return.
Dalam alur lintas sistem:
- logic harus deterministik
- state harus tidak ambigu
- root cause harus cepat ditemukan saat incident

Lexical scope membantu memastikan function membaca context yang konsisten,
bukan context kebetulan dari caller tertentu.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
helper transform payload dipakai banyak service.
Jika engineer mengira variabel ikut caller context, mereka memasukkan flag global mutable.
Akhirnya payload retur pasien rawat jalan terbawa aturan rawat inap.

Dengan pendekatan lexical:
- config di-inject eksplisit saat function dibuat
- scope caller tidak mempengaruhi rule mapping
- audit trail lebih jelas saat investigasi mismatch data

## Contoh Pola Kode yang Lebih Aman

```ts
type Mode = "outpatient" | "inpatient";
type ReturnPayload = { encounterId: string; qty: number };

function createReturnMapper(mode: Mode) {
  return (payload: ReturnPayload) => ({
    ...payload,
    flowType: mode,
  });
}

const mapOutpatientReturn = createReturnMapper("outpatient");
```

Pola ini aman karena mode terikat secara lexical saat mapper dibuat.

## Checklist Kualitas Jawaban (Self-Review)

- Menegaskan JS memakai lexical scope untuk variable resolution.
- Menjelaskan dynamic scope sebagai pembanding, bukan fitur utama JS.
- Menjelaskan perbedaan `this` vs lexical variable lookup.
- Memberi dampak praktis pada debugging, refactor, dan reliability.
- Mengaitkan dengan konteks healthcare production.

## Ringkasan Final

Lexical scope adalah alasan JavaScript tetap bisa diprediksi di codebase besar.
Dynamic scope tidak dipakai untuk variabel biasa di JS karena lebih riskan.
Untuk sistem healthcare, lexical scope membantu menjaga konsistensi logic,
mengurangi bug lintas flow, dan mempercepat analisis incident.
