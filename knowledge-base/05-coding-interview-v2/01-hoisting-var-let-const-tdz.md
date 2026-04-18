# Topik 1 — Hoisting, `var` vs `let`/`const`, Temporal Dead Zone (TDZ)

Dokumen ini menjelaskan perilaku deklarasi variabel dan fungsi di JavaScript secara cukup dalam untuk persiapan coding interview dan review kode. Fokusnya bukan hafal istilah, tapi bisa memprediksi output, menjelaskan ke interviewer, dan menghindari bug yang sering muncul di soal live coding.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Hoisting** adalah perilaku di mana deklarasi (bukan seluruh assignment) “diangkat” ke atas scope-nya saat fase kompilasi/creation, sehingga nama bisa dikenali sebelum baris deklarasi tertulis—dengan aturan yang berbeda untuk `var`, `let`/`const`, function declaration, dan `class`. **`var`** dinaikkan dan diinisialisasi `undefined` di seluruh function/global scope. **`let` dan `const`** juga dinaikkan, tetapi berada di **temporal dead zone (TDZ)** sampai baris deklarasi dieksekusi; akses sebelum itu memicu `ReferenceError`. **`const`** wajib diinisialisasi saat deklarasi dan binding-nya tidak bisa di-assign ulang (isi object/array tetap bisa dimutasi kecuali di-freeze).

---

## 2. Mengapa topik ini keluar di interview

- Menguji apakah kandidat memahami **execution context**, **scope**, dan **urutan eksekusi**—bukan hanya “syntax ES6”.
- Banyak bug produksi berasal dari **loop + `var`**, **TDZ dengan `typeof`**, atau **shadowing** yang tidak disadari.
- Soal trivia bergaya “output apa?” memfilter pemahaman mekanisme, bukan hafalan API.

---

## 3. Dua fase eksekusi (konsep yang mendasari hoisting)

Secara mental model (bukan selalu implementasi engine persis):

1. **Creation phase (compile / setup):** Engine mendaftarkan binding untuk variabel dan fungsi di scope saat ini. Di sinilah ide “hoisting” muncul: nama sudah “ada” di scope sebelum baris kode dijalankan.
2. **Execution phase:** Kode dijalankan baris demi baris; assignment dan pemanggilan fungsi terjadi di sini.

Hoisting **bukan** memindahkan kode ke atas secara fisik; itu perilaku hasil dari bagaimana binding dibuat.

---

## 4. Apa yang di-hoist (ringkas)

| Konstruksi | Deklarasi di-hoist? | Inisialisasi awal | Catatan |
|------------|---------------------|-------------------|---------|
| `var` | Ya | `undefined` | Function scope atau global |
| `let` | Ya (binding dibuat) | Tidak (TDZ) | Block scope |
| `const` | Ya (binding dibuat) | Tidak (TDZ) | Wajib inisialisasi di baris deklarasi |
| Function declaration `function f() {}` | Ya | Isi fungsi | Bisa dipanggil sebelum baris teks deklarasi |
| Function expression `const f = function() {}` | Mengikuti `var`/`let`/`const` yang membungkusnya | Sesuai aturan binding | Tidak “utuh” di-hoist seperti declaration |
| `class` | Deklarasi di-hoist dengan TDZ mirip `let` | TDZ sampai baris class dieksekusi | |

---

## 5. `var` secara detail

### 5.1 Function scope, bukan block scope

`var` mengabaikan block `{ }` kecuali function body. Akibat klasik di loop:

```javascript
var callbacks = [];
for (var i = 0; i < 3; i++) {
  callbacks.push(function () {
    return i;
  });
}
// callbacks.map(fn => fn()) sering menghasilkan [3, 3, 3], bukan [0, 1, 2]
```

Penjelasan: satu binding `i` untuk seluruh loop; saat fungsi dipanggil nanti, `i` sudah nilai akhir. Solusi modern: `let` di loop (block scope per iterasi), atau IIFE, atau `bind` index.

### 5.2 Hoisting `var` dan `undefined`

```javascript
console.log(x); // undefined (bukan ReferenceError)
var x = 1;
console.log(x); // 1
```

Setara konseptual dengan urutan: deklarasi `var x` di atas scope, lalu `x = 1` pada baris aslinya. Sebelum assignment, nilai `undefined`.

### 5.3 Redeclarasi

`var` di scope yang sama boleh dideklarasikan ulang tanpa error—sering membingungkan saat merge kode atau copy-paste.

```javascript
var a = 1;
var a = 2; // legal
```

---

## 6. `let` dan `const` secara detail

### 6.1 Block scope

Binding terbatas pada blok `{ }` (termasuk `if`, `for`, `while`, `try`).

```javascript
{
  let x = 1;
}
// x tidak bisa diakses di sini
```

### 6.2 Tidak ada redeclaration di block yang sama

```javascript
let b = 1;
let b = 2; // SyntaxError di scope yang sama
```

### 6.3 `const`

- Harus punya inisialisasi: `const c = value;`
- Binding tidak bisa di-assign ulang: `const c = 1; c = 2;` → `TypeError`
- Untuk object/array, **referensi** konstan; properti masih bisa diubah kecuali object dibekukan (`Object.freeze`).

```javascript
const o = { a: 1 };
o.a = 2; // OK
o = {}; // TypeError
```

---

## 7. Temporal Dead Zone (TDZ)

### 7.1 Definisi

**TDZ** adalah periode dari awat scope hingga baris di mana `let`/`const` (dan `class`) dideklarasikan dieksekusi. Selama TDZ, binding **sudah ada** tetapi **tidak boleh diakses** (baca/tulis). Mengaksesnya melempar **`ReferenceError`**, bukan `undefined`.

### 7.2 Contoh klasik

```javascript
console.log(typeof notDeclaredVar); // "undefined" (global yang tidak ada — perilaku khusus di non-strict global, hati-hati)
```

Untuk `let`/`const`:

```javascript
{
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 1;
}
```

Perhatikan: ini **bukan** `undefined` seperti `var`. Ini sengaja membantu menangkap bug akses terlalu awal.

### 7.3 `typeof` dan TDZ

Pengecualian penting: di dalam scope yang sama, **`typeof` nama yang masih TDZ tetap ReferenceError**, bukan `"undefined"`.

```javascript
{
  console.log(typeof x); // ReferenceError jika ada let x di bawah
  let x = 1;
}
```

Ini sering jadi jebakan di soal trivia.

### 7.4 Parameter default function dan TDZ

Parameter dibuat dalam scope terpisah yang rumit; area default parameter punya aturan TDZ sendiri terhadap body. Contoh pola yang sering ditanyakan:

```javascript
function f(a = g(), b = a) {
  return b;
}
```

Urutan evaluasi default parameter dan kapan `let` di body “hidup” bisa rumit—untuk interview, yang penting: **TDZ berlaku per scope dan urutan eksekusi baris**.

---

## 8. Function declaration vs expression (kaitan dengan hoisting)

### 8.1 Function declaration

```javascript
g(); // OK
function g() {
  return 1;
}
```

Seluruh deklarasi fungsi “diangkat”; nama `g` terikat ke fungsi sebelum eksekusi baris.

### 8.2 Function expression dengan `var`

```javascript
h(); // TypeError: h is not a function (karena h === undefined saat dipanggil)
var h = function () {
  return 1;
};
```

Yang di-hoist hanya `var h` → `undefined`; pemanggilan terlalu awal gagal.

### 8.3 Function expression dengan `let`

```javascript
k(); // ReferenceError (TDZ pada let k)
let k = function () {
  return 1;
};
```

---

## 9. `class` dan TDZ

```javascript
const c = new MyClass(); // ReferenceError
class MyClass {}
```

Class declaration mengalami TDZ seperti `let`; tidak bisa dipakai sebelum baris deklarasi.

---

## 10. Pola yang sering muncul di coding test / trivia

1. **Loop + closure:** `var` vs `let` dalam `for` dengan callback async/sync.
2. **Shadowing:** `let` di dalam `for` menutupi `let` luar—output atau error yang tidak intuitif.
3. **Urutan deklarasi dua `let` di block yang sama:** TDZ dari deklarasi pertama ke kedua.
4. **Hoisting bersamaan dengan `try/catch`:** `catch (e)` membuat block scope; `var` di catch bisa “bocor” ke function di ES3-era perilaku tertentu—di ES2019+ perilaku `catch` tanpa parameter opsional lebih ketat; untuk interview modern, pahami block scope `catch`.

---

## 11. Rekomendasi praktis (bukan hanya teori)

- Default gunakan **`const`**; jika perlu reassign, **`let`**. Hindari **`var`** di kode baru kecuali maintain legacy dengan sengaja.
- Di loop yang menghasilkan closure, gunakan **`let`** atau hindari menangkap variabel loop dengan pola yang salah.
- Jangan mengandalkan “hoisting function declaration” untuk menyembunyikan urutan definisi; urutkan kode agar readable; hoisting dipahami untuk debug dan interview.

---

## 12. Contoh latihan berpikir (tanpa jawaban lengkap)

Tulis dulu prediksi output/error, lalu jalankan di konsol atau Node.

```javascript
function quiz1() {
  console.log(a);
  var a = 2;
}

function quiz2() {
  console.log(b);
  let b = 2;
}

function quiz3() {
  console.log(c);
  if (false) {
    var c = 3;
  }
}

function quiz4() {
  "use strict";
  console.log(d);
  d = 1;
}
```

Refleksi: untuk `quiz3`, ingat `var` di-hoist ke function scope meski `if` tidak pernah jalan—nilai awal tetap `undefined` saat log, bukan error (kecuali ada detail lain).

---

## 13. Kaitan dengan strict mode dan global

Di **strict mode**, assignment ke variabel yang tidak dideklarasikan (`d = 1` tanpa `var`/`let`/`const`) melempar **ReferenceError**. Di non-strict browser global, bisa membuat properti global—perilaku berbahaya dan tidak boleh diandalkan.

---

## 14. Checklist sebelum menutup topik

- [ ] Bisa menjelaskan beda **hoisting `var`** (inisialisasi `undefined`) vs **`let`/`const`** (TDZ → `ReferenceError`).
- [ ] Bisa menjelaskan **function declaration** vs **expression** terkait hoisting.
- [ ] Tahu **`typeof` pada nama dalam TDZ** tetap error.
- [ ] Tahu **`const`** konstan pada binding, tidak selalu pada isi object.
- [ ] Tahu **`var` tidak respect block** kecuali function boundary.

---

## 15. Referensi perilaku (spesifikasi)

Perilaku formal diatur oleh **ECMAScript** (Lexical Environment, Environment Record, dan algoritma `CreateMutableBinding` / `InitializeBinding` untuk `var` vs `let`). Nama **Temporal Dead Zone** dipakai di literatur dan spesifikasi modern untuk menjelaskan interval sebelum `InitializeBinding` untuk `let`/`const`.

---

Dokumen ini disengaja panjang agar satu file bisa dipakai ulang sebagai bahas ulang cepat sebelum interview. Tambahkan contoh pribadi dari bug yang pernah Anda temui agar ingatan lebih melekat.
