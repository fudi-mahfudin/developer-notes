# Topik 2 — Closure dan Lexical Scope

Dokumen ini menjelaskan bagaimana JavaScript menentukan “variabel mana yang terlihat” di suatu titik kode, dan bagaimana fungsi bisa “mengingat” lingkungan tempat ia didefinisikan. Ini fondasi untuk memahami modul, callback, React hooks (secara konsep), dan banyak bug terkait loop atau async.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Lexical scope** berarti aturan visibility variabel ditentukan oleh **posisi penulisan kode** di dalam struktur bersarang (blok, fungsi, modul), bukan oleh urutan pemanggilan runtime. **Closure** terjadi ketika sebuah fungsi mempertahankan akses ke variabel di **outer scope** lewat referensi lingkungan leksikalnya, sehingga variabel itu tetap hidup selama fungsi tersebut (atau turunannya) masih bisa dijangkau—meskipun fungsi luar sudah selesai dieksekusi. Akibat praktis: factory, state privat, dan callback yang “melihat” nilai lama kecuali Anda menyalin nilai ke binding baru per iterasi (misalnya `let` di loop atau parameter fungsi).

---

## 2. Mengapa topik ini keluar di interview

- Hampir semua soal yang melibatkan **nested function**, **event handler**, atau **async** mengandalkan closure secara implisit.
- Interviewer ingin tahu apakah Anda membedakan **scope** vs **execution context**, dan apakah Anda paham **kenapa** loop dengan `var` sering salah.
- Pola desain seperti **currying**, **memoization**, **debounce**, dan **module pattern** semuanya berbicara closure; menjelaskannya menunjukkan kedalaman, bukan sekadar bisa menulis `function` bersarang.

---

## 3. Lexical scope (scope leksikal)

### 3.1 Definisi

Scope **leksikal** artinya penyelesai nama variabel (`x` merujuk ke binding mana) dilakukan dengan melihat **struktur kode statis**: fungsi di dalam fungsi “melihat” outer function, bukan “siapa yang memanggil” (itu lebih dekat ke `this`, topik lain).

### 3.2 Nested scope dan shadowing

```javascript
const x = "outer";
function f() {
  const x = "inner";
  return x;
}
f(); // "inner"
```

Binding `x` di dalam `f` **menutupi (shadow)** `x` luar untuk tubuh `f`. Engine tidak mencari nama di caller chain; ia mencari rantai **lingkungan leksikal** dari dalam ke luar.

### 3.3 Block scope (`let`/`const`) vs function scope (`var`)

```javascript
function g() {
  if (true) {
    let a = 1;
    var b = 2;
  }
  // console.log(a); // ReferenceError
  console.log(b); // 2 — var mengabaikan block
}
```

Untuk interview: sebutkan bahwa **leksikal** untuk `let`/`const` mengikuti **block**; untuk `var` mengikuti **function** (kecuali global script).

### 3.4 Scope chain (rantai lingkungan)

Secara model mental, setiap scope punya tautan ke **outer lexical environment**. Pencarian nama: mulai scope lokal → naik sampai global atau sampai ketemu. Tidak ketemu → `ReferenceError` (di mode strict untuk assignment ke undeclared, perilaku lain untuk global sloppy—topik terpisah).

---

## 4. Closure: definisi operasional

**Closure** adalah kombinasi dari **fungsi** dan **lingkungan leksikal** yang menyimpan variabel bebas yang masih direferensikan oleh fungsi tersebut.

Kalimat sederhana untuk interviewer: “Fungsi dalam JavaScript ‘menutup’ variabel dari scope luar; selama referensi fungsi itu ada, variabel yang diperlukan tidak dibuang sampai tidak lagi terjangkau.”

### 4.1 Contoh minimal

```javascript
function makeCounter() {
  let n = 0;
  return function () {
    n += 1;
    return n;
  };
}
const c = makeCounter();
c(); // 1
c(); // 2
```

`makeCounter` sudah return, tetapi `n` tetap hidup karena fungsi anonim yang dikembalikan masih memegang **closure** atas binding `n`.

### 4.2 Bukan “salinan nilai” otomatis

Closure menyimpan **referensi ke binding**, bukan snapshot nilai kecuali Anda membuat binding baru per pemanggilan (misalnya dengan parameter atau `let` per iterasi).

---

## 5. Loop, closure, dan kesalahan klasik

### 5.1 `var` di `for` + `setTimeout`

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Banyak lingkungan mencetak: 3, 3, 3
```

Alasan singkat: satu binding `i` untuk seluruh loop; saat callback jalan, loop sudah selesai. Perbaikan umum: `let i` (block scope per iterasi), atau IIFE yang menangkap salinan `i`, atau `forEach` dengan parameter.

### 5.2 `let` di `for`

`for (let i = 0; ...)` membuat **per-iteration binding** menurut semantik ES2015—callback menangkap `i` yang berbeda tiap iterasi (untuk pola klasik ini).

### 5.3 Mengapa parameter fungsi membantu

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(
    (j) => {
      console.log(j);
    },
    0,
    i
  );
}
```

Parameter `j` adalah binding baru setiap pemanggilan `setTimeout` callback setup—menangkap nilai saat iterasi.

---

## 6. Pola yang sering diuji atau dibahas

### 6.1 Module / revealing module

```javascript
const counter = (function () {
  let n = 0;
  return {
    inc() {
      n += 1;
    },
    get() {
      return n;
    },
  };
})();
```

`n` “privat” karena tidak diekspos; hanya method yang share closure yang bisa mengubahnya.

### 6.2 Factory dan dependency injection ringan

Fungsi yang mengembalikan fungsi sering dipakai untuk mengikat konfigurasi (`baseUrl`, `apiKey`) tanpa variabel global.

### 6.3 Memoization

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

`cache` hidup di closure; perhatikan **retensi memori** jika cache tak dibatasi.

### 6.4 Partial application / currying (kaitan)

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

Closure menangkap `a` dari outer call.

---

## 7. Hubungan dengan `this` (sentuhan saja)

Closure menjawab “variabel leksikal mana?”; **`this`** menjawab “konteks pemanggilan apa?” (untuk fungsi biasa). Arrow function **tidak** punya `this` sendiri—mewarisi `this` leksikal luar. Jangan mencampuradukkan “closure atas variabel” dengan “binding `this`”; di interview, pisahkan penjelasan dua mekanisme ini.

---

## 8. Memori, garbage collection, dan jebakan

- Jika fungsi menutup variabel besar (misalnya DOM node, buffer) dan referensi fungsi disimpan lama (event listener global), **objek yang ditutup tidak bisa dikumpulkan** sampai fungsi tersebut dilepas.
- Menyimpan `element` besar di closure tanpa perlu → pertimbangkan menyimpan id atau melepaskan listener saat unmount (pola UI).

Ini jarang ditanya detail di coding test algoritmik, tapi sering muncul di **system design front-end** atau behavioral.

---

## 9. Dynamic scope di JS?

JavaScript **bukan** dynamic scoped untuk variabel biasa. Fitur seperti `eval`/`with` (deprecated/jahat) bisa mengaburkan perilaku; di kode modern hindari. Untuk interview: tegaskan **lexical** adalah default.

---

## 10. Contoh latihan berpikir

Tulis prediksi output atau error, lalu verifikasi.

```javascript
function quizA() {
  const fs = [];
  for (var i = 0; i < 3; i++) {
    fs.push(() => i);
  }
  return fs.map((f) => f());
}

function quizB() {
  const fs = [];
  for (let i = 0; i < 3; i++) {
    fs.push(() => i);
  }
  return fs.map((f) => f());
}

function quizC() {
  let fns = [];
  {
    let i = 0;
    fns.push(() => i);
    i = 1;
  }
  return fns[0]();
}
```

Refleksi: `quizA` vs `quizB` membedakan binding per iterasi; `quizC` menunjuk closure atas **satu** binding `i` yang bisa berubah setelah fungsi dibuat.

---

## 11. Jawaban singkat latihan (opsional, untuk cek cepat)

- **`quizA`:** biasanya `[3, 3, 3]` (satu `var i`).
- **`quizB`:** `[0, 1, 2]` (binding `let` per iterasi).
- **`quizC`:** `1` — callback melihat binding yang sama; nilai terbaru setelah assignment.

---

## 12. Checklist sebelum menutup topik

- [ ] Bisa menjelaskan **lexical scope** vs **dynamic** (dan bahwa JS lexical untuk `let`/`const`/`var` dalam aturan masing-masing).
- [ ] Bisa menjelaskan **closure** sebagai fungsi + lingkungan yang menahan variabel bebas.
- [ ] Bisa menjelaskan bug **`var` + loop + async/callback** dan perbaikannya.
- [ ] Tahu closure menyimpan **referensi binding**, bukan selalu snapshot.
- [ ] Tahu implikasi **retensi memori** bila menahan referensi besar.

---

## 13. Referensi konsep

Formalnya, ECMAScript mendefinisikan **Lexical Environment**, **Environment Record**, dan aturan untuk **Function Environment** saat fungsi dibuat—closure adalah konsekuensi alami dari menyimpan referensi inner function yang masih mengakses outer binding. Nama “closure” berasal dari literatur bahasa pemrograman fungsional; di JS istilah itu dipakai sehari-hari oleh praktisi.

---

Dokumen ini disengaja padat agar bisa dipakai untuk repetisi cepat sebelum interview. Tambahkan contoh dari framework yang Anda pakai (misalnya efek stale closure di React jika dependency array keliru) untuk mengaitkan teori dengan pengalaman nyata.
