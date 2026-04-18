# Topik 91 — Deep Merge Objek

**Deep merge** menggabungkan dua atau lebih objek **bersarang** sehingga objek dalam digabung rekursif, bukan diganti seluruhnya seperti **spread** dangkal. Berguna untuk konfigurasi default + override, tetapi perlu kebijakan untuk **array** (ganti vs concat), **null prototype**, dan **siklus**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Algoritma rekursif: untuk setiap kunci, jika kedua nilai plain object (cek `Object.prototype.toString` atau `structuredClone` rules), merge anak; jika tidak, override dengan sumber kanan (tergantung konvensi). **Lodash `merge`** adalah referensi perilaku. Hindari merge ke **`__proto__`** — gunakan **`Object.create(null)`** atau cek kunci. Untuk produksi sering cukup **shallow** + pola imutable (topik 100).

---

## 2. Mengapa topik ini keluar di interview

- Soal “implement deepMerge” atau “merge tanpa mutasi input”.
- Diskusi prototype pollution.

---

## 3. Merge dangkal vs dalam

```javascript
const defaults = { a: { x: 1 }, b: 2 };
const override = { a: { y: 3 } };
// { ...defaults, ...override } // a:{y:3} hilang x — shallow
```

---

## 4. Implementasi sketsa (hati-hati produksi)

```javascript
function isPlainObject(v) {
  if (v === null || typeof v !== "object") return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

function deepMerge(target, source) {
  for (const [k, sv] of Object.entries(source)) {
    if (isPlainObject(sv) && isPlainObject(target[k])) {
      target[k] = deepMerge({ ...target[k] }, sv);
    } else {
      target[k] = sv;
    }
  }
  return target;
}
```

---

## 5. Kompleksitas

O(jumlah total properti) pada kedalaman gabungan.

---

## 6. Pitfall: prototype pollution

Kunci `__proto__`/`constructor` — sanitasi atau `Map`.

---

## 7. Pitfall: array

Default lodash merge menggabungkan indeks—sering tidak diinginkan; definisikan aturan.

---

## 8. Pitfall: Date/RegExp

Objek “khusus” bukan plain—copy atau replace.

---

## 9. Pola interview: imutable merge

Return objek baru tanpa mutasi input—gunakan rekursi pure.

---

## 10. Pola interview: schema merge

JSON Schema `allOf` — konteks berbeda tapi analogi.

---

## 11. Latihan konsep

Jelaskan mengapa deep merge sulit untuk graph dengan siklus.

---

## 12. Latihan kode

Deteksi siklus dengan `WeakMap` visited.

---

## 13. Edge cases

- `undefined` vs missing key — apakah menghapus?
- Simbol sebagai kunci — `Object.getOwnPropertySymbols`.

---

## 14. Checklist

- [ ] Definisi plain object.
- [ ] Kebijakan array.
- [ ] Keamanan kunci.

---

## 15. Referensi

Lodash merge; MDN structuredClone (bukan merge tapi terkait clone).

---

## 16. Anti-pattern

`JSON.parse(JSON.stringify(x))` sebagai merge—kehilangan tipe khusus.

---

## 17. Flashcard

- **Shallow spread:** satu level.

---

## 18. Testing

Fixture nested + array + Date.

---

## 19. Performa

Deep besar bisa mahal—pertimbangkan patch-based config.

---

## 20. Integrasi TypeScript

Generik rekursif `DeepPartial<T>` untuk override.

---

## 21. Debugging

Deep freeze input test untuk deteksi mutasi tak sengaja.

---

## 22. Memori

Copy subtree — duplikasi memori; structural sharing (immutable.js) alternatif.

---

## 23. Parallel

Tidak relevan.

---

## 24. Etika wawancara

Tanyakan apakah library boleh (lodash) vs from scratch.

---

## 25. Rangkuman

Deep merge membutuhkan definisi tipe nilai dan kebijakan keamanan kunci.

---

## 26. Soal terkait

`immer` produce untuk patch imutable—idiom modern.

---

## 27. Drill manual

Merge `{a:{b:1}}` dengan `{a:{c:2}}` — hasil `{a:{b:1,c:2}}`.

---

## 28. Varian: mergeWith customizer

Lodash style—pilih perilaku per tipe.

---

## 29. Penutup

Deep merge tampak sederhana hingga edge case keamanan dan tipe data muncul.

---

Dokumen ini menjelaskan deep merge, plain object, prototype pollution, dan kontras dengan spread dangkal.
