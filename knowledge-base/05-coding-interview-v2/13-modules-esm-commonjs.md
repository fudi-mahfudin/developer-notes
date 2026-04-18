# Topik 13 — Modules (ESM vs CommonJS)

Dokumen ini menjelaskan dua sistem modul utama di ekosistem JavaScript: **ECMAScript modules (ESM)** dengan `import`/`export`, dan **CommonJS** (`require`/`module.exports`) di Node, termasuk interop, perilaku statis vs dinamis, dan implikasi bundler.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**ESM** adalah format standar di spesifikasi: `import`/`export` bersifat statis (analisis statik dependency), **live bindings** untuk export, dan berjalan di strict mode. **CommonJS** memuat modul secara sinkron pada `require`, mengekspor nilai melalui `module.exports`, cocok untuk model Node klasik tetapi sulit di-tree-shake. **Interop** antara keduanya memerlukan aturan khusus (`default` vs namespace) dan konfigurasi TypeScript/`package.json` (`"type": "module"`).

---

## 2. Mengapa topik ini keluar di interview

- Konfigurasi tooling (Node, Jest, Webpack, TS) sering gagal karena salah memahami modul.
- Memahami tree shaking dan side-effect imports.
- Membaca kode library lama vs modern.

---

## 3. ESM export named

```javascript
export const x = 1;
export function f() {}
```

---

## 4. ESM default export

```javascript
export default function () {}
```

---

## 5. ESM import

```javascript
import { x } from "./mod.js";
import mod from "./mod.js";
import * as ns from "./mod.js";
```

---

## 6. Live bindings

```javascript
// a.js
export let v = 1;
export function inc() {
  v++;
}

// b.js
import { v, inc } from "./a.js";
inc();
console.log(v); // 2
```

Import bukan snapshot salinan untuk binding `let`—hidup.

---

## 7. CommonJS export

```javascript
module.exports = { x: 1 };
exports.y = 2;
```

---

## 8. CommonJS require

```javascript
const m = require("./mod.cjs");
```

Sinkron, cache per resolved path.

---

## 9. `__dirname` / `__filename`

Tersedia di CJS; di ESM gunakan `import.meta.url` + `fileURLToPath`.

---

## 10. Dynamic import

```javascript
const m = await import("./mod.js");
```

Mengembalikan module namespace promise—tersedia di ESM dan untuk load CJS di Node.

---

## 11. Hoisting dan urutan

ESM dievaluasi sesuai graf dependency; CJS dievaluasi saat `require` pertama kali.

---

## 12. Circular dependency

Keduanya bisa bermasalah; ESM punya aturan inisialisasi lebih ketat. Hindari desain circular jika mungkin.

---

## 13. Tree shaking

Bundler menghapus export tak terpakai jika side-effect free—lebih mudah dengan ESM statis.

---

## 14. `package.json` `"type"`

`"type": "module"` menjadikan `.js` sebagai ESM di Node; tanpa itu default CJS (tergantung versi Node—cek dokumentasi).

---

## 15. TypeScript interop

`esModuleInterop`, `allowSyntheticDefaultImports` mempengaruhi cara import default dari CJS.

---

## 16. Checklist

- [ ] Tahu beda `import` statis vs `import()`.
- [ ] Tahu live binding ESM.
- [ ] Tahu `module.exports` vs `export default`.

---

## 17. Referensi

Node dokumentasi “ECMAScript Modules” menjelaskan flag dan ekstensi `.mjs`/`.cjs`.

---

## 18. Quiz

Mengapa `require` tidak bisa dipakai sembarangan di file ESM top-level Node?

Karena `require` bukan bagian sintaks ESM—gunakan `createRequire` atau dynamic import.

---

## 19. Anti-pattern

Mencampur `require` dan `import` statis tanpa alasan di satu file (sering error bundler).

---

## 20. Flashcard

- **ESM:** standar, statis.
- **CJS:** Node legacy, sinkron.

---

## 21. Latihan tulis

Tulis dua file: satu ESM mengekspor counter live binding, satu CJS yang meniru pola tanpa live binding—bandingkan output.

---

## 22. Browser vs Node

Browser memuat ESM via `<script type="module">` dengan CORS dan defer semantics.

---

## 23. Bundler

Webpack/Vite menggabungkan modul; perilaku import bisa diubah plugin—waspada saat debug.

---

## 24. Menutup

Pilih format berdasarkan target runtime dan toolchain; pahami interop agar tidak terjebak default import salah.

---

## 25. Tambahan: JSON import

ESM di beberapa environment mengizinkan `import data from './x.json' assert { type: 'json' }`—cek dukungan.

---

Dokumen ini membantu menjawab pertanyaan tooling dan desain modul di interview full-stack.

---

## 26. Tambahan: extension file

Gunakan `.mjs`/`.cjs` bila perlu memaksa format modul di Node tanpa mengubah `"type"` global—mengurangi kejutan saat repositori campuran.

---

## 27. Tambahan: sideEffects field

Field `sideEffects` di `package.json` membantu bundler menghapus modul yang aman—berguna untuk library yang diekspor ESM.

