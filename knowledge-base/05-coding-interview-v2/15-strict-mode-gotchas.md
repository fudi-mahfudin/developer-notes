# Topik 15 — Strict Mode dan Gotchas Umum

Dokumen ini menjelaskan `"use strict"`, perbedaan perilaku dengan sloppy mode, aktivasi implisit (modul, class), serta kumpulan gotcha umum yang sering diuji lewat trivia atau bug hunt.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Strict mode** mengubah perilaku bahasa menjadi lebih aman dan lebih dekat dengan error ketimbang diam-diam salah: variabel harus dideklarasikan, `this` pada fungsi bebas tidak menjadi global object, penulisan ke properti non-writable bisa melempar `TypeError`, dan `delete` pada nama tidak boleh. **Modul ES** dan **class** otomatis strict. Tanpa strict, beberapa perilaku legacy tetap ada demi kompatibilitas.

---

## 2. Mengapa topik ini keluar di interview

- Prediksi output kode lama vs modern.
- Menjelaskan mengapa bundler/modul default strict.
- Menghindari bug global leak dan silent failure.

---

## 3. Mengaktifkan strict

```javascript
"use strict";
function f() {
  // strict untuk f dan isinya (jika di awal function)
}
```

Atau file-level di baris pertama.

---

## 4. Assignment ke undeclared variable

Sloppy: membuat global property. Strict: `ReferenceError`.

---

## 5. `this` pada pemanggilan biasa

Strict: `undefined` (di modul). Sloppy browser: `window`.

---

## 6. `delete` identifier

```javascript
"use strict";
var x = 1;
delete x; // SyntaxError
```

---

## 7. Duplikasi nama parameter

```javascript
function g(a, a) {
  "use strict";
} // SyntaxError
```

---

## 8. `with` statement

Dilarang di strict—menghambat optimasi dan kejelasan.

---

## 9. Octal literal

`0123` tidak boleh ambigu di strict—gunakan `0o123`.

---

## 10. `arguments` tidak alias parameter

Di strict, mutasi `arguments` tidak mengubah parameter (dan sebaliknya) seperti perilaku kuno.

---

## 11. `eval` scope

Di strict, `eval` tidak membuat variabel baru ke lingkungan luar.

---

## 12. Gotcha: `this` di method shorthand

Tetap mengikuti aturan pemanggilan—strict mode tidak mengubah aturan method vs plain call.

---

## 13. Gotcha: `class` selalu strict

Isi class body strict meskipun tidak tertulis.

---

## 14. Gotcha: bundler/minifier

Kode hasil bundling sering strict—perilaku berbeda dari script tag lama.

---

## 15. Checklist

- [ ] Tahu alasan modul strict.
- [ ] Tahu variabel global leak dicegah.
- [ ] Tahu beberapa operasi menjadi throwing.

---

## 16. Referensi

Annex B (legacy) menjelaskan perbedaan; strict diatur di bab utama spesifikasi.

---

## 17. Quiz

```javascript
function f() {
  "use strict";
  return this;
}
f();
```

`undefined` di modul/strict non-browser; di browser sloppy global bisa beda—jelaskan konteks.

---

## 18. Latihan tulis

Tunjukkan perbedaan output sloppy vs strict untuk assignment ke properti non-writable object literal.

---

## 19. Anti-pattern

Sengaja tetap sloppy di file baru—hindari.

---

## 20. Flashcard

- **Strict:** error lebih keras.
- **Module:** strict otomatis.

---

## 21. Gotcha lain: `NaN` comparison

Bukan strict vs sloppy—tapi sering dipasangkan di soal trivia (`NaN === NaN` false).

---

## 22. Gotcha: `==` dan `null`

Tetap relevan—gunakan `===` (topik coercion).

---

## 23. Menutup

Strict mode mengurangi kelas bug yang sulit dilacak; anggap default di codebase modern.

---

## 24. Tambahan: reserved words

Strict menambah ketat pada nama tertentu di beberapa konteks—jarang praktis.

---

## 25. Tambahan: `function` di block

Perilaku `function` declaration di block berbeda non-strict vs strict—jangan mengandalkan pola aneh.

---

Dokumen ini menutup blok “dasar bahasa JS (1–15)” untuk seri v2 dengan penekanan pada perilaku yang lebih aman.

---

## 26. Tambahan: `use strict` di dalam fungsi vs file

Strictness hanya berlaku untuk lexical scope fungsi tersebut; global script bisa sloppy sementara fungsi ketat—polaritas ini jarang disengaja; satukan mode lewat modul.

---

## 27. Tambahan: kompatibilitas lama

Kode pihak ketiga yang mengandalkan `arguments.callee` atau `with` akan pecah di strict—alasan migrasi bertahap.

---

## 28. Ringkasan cepat untuk flashcard akhir

- Sloppy: global leak lebih mudah; strict: lebih ketat.
- ESM/class: strict otomatis.
- `delete` identifier: SyntaxError di strict.

