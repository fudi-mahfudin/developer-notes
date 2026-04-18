# Topik 93 — Kesetaraan Dalam (Deep Equality) Terbatas

**Deep equality** membandingkan dua nilai secara rekursif untuk objek/array. **Tidak ada** satu jawaban untuk semua kasus: `===` untuk primitif; `Object.is` untuk `NaN` dan `-0`; `Map`/`Set` perlu iterasi; `Date` membandingkan waktu; **fungsi** sering dibandingkan referensi; **siklus** memerlukan **visited** map. Di interview, biasanya diminta **versi terbatas** (plain object + array) dengan kompleksitas jelas.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Algoritma DFS: jika tipe berbeda → false; primitif → `Object.is`/`===`; array → bandingkan panjang lalu elemen; plain object → bandingkan kunci (urutan tidak selalu penting untuk equality set—gunakan `Object.keys` sort atau frequency). Untuk siklus, simpan mapping `Map(a,b)` pasangan yang sedang dibandingkan. **Tidak** sebandingkan `JSON.stringify` untuk umum—urutan kunci dan undefined hilang.

---

## 2. Mengapa topik ini keluar di interview

- Soal “deepEqual(a,b)” klasik.
- Menguji pemahaman referensi vs nilai.

---

## 3. Implementasi terbatas

```javascript
function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (seen.get(a) === b) return true;
    seen.set(a, b);
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i], seen)) return false;
      return true;
    }
    const ak = Object.keys(a),
      bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    for (const k of ak) if (!deepEqual(a[k], b[k], seen)) return false;
    return true;
  }
  return false;
}
```

---

## 4. Kompleksitas

O(n) node struktur untuk traversal (dengan amortized map).

---

## 5. Pitfall: `null` dan `typeof`

`typeof null === 'object'` — tangani eksplisit.

---

## 6. Pitfall: key order

`{a:1,b:2}` vs `{b:2,a:1}` — equality struktural biasanya true; stringify bisa beda.

---

## 7. Pitfall: `NaN`

`Object.is(NaN, NaN)` true; `===` false.

---

## 8. Pola interview: `expect` matcher

Jest `toEqual` memakai algoritma mirip.

---

## 9. Pola interview: patch diff

Equality untuk immutable updates—bandingkan referensi dulu.

---

## 10. Latihan konsep

Jelaskan mengapa `WeakMap` untuk visited, bukan `Set` pasangan.

---

## 11. Latihan kode

Tambahkan dukungan `Date` dan `RegExp`.

---

## 12. Edge cases

- Prototype berbeda — `Object.getPrototypeOf`.
- Getter yang side-effect — deep compare sulit.

---

## 13. Checklist

- [ ] Siklus.
- [ ] NaN.
- [ ] Array vs object.

---

## 14. Referensi

Node `assert.deepStrictEqual`; lodash `isEqual`.

---

## 15. Anti-pattern

`JSON.stringify` untuk equality.

---

## 16. Flashcard

- **Structural:** isi sama, bukan identitas.

---

## 17. Testing

Property-based: roundtrip clone structuredClone.

---

## 18. Performa

Set besar — early exit pada panjang/kunci berbeda.

---

## 19. Integrasi TypeScript

Discriminated union compare—switch on `kind`.

---

## 20. Debugging

Log path string saat mismatch.

---

## 21. Memori

WeakMap tidak mencegah GC untuk key—baik untuk graph sementara.

---

## 22. Parallel

Tidak relevan.

---

## 23. Etika wawancara

Batasi scope tipe yang didukung agar selesai tepat waktu.

---

## 24. Rangkuman

Deep equality membutuhkan definisi domain nilai dan penanganan edge primitif khusus.

---

## 25. Soal terkait

`fast-deep-equal` package — produksi.

---

## 26. Drill manual

`{a:{b:1}}` vs `{a:{b:1}}` referensi berbeda — true.

---

## 27. Varian: approximate float

Epsilon compare untuk angka floating—beda soal.

---

## 28. Penutup

Versi interview adalah subset ter dokumentasi, bukan replika pustaka penuh.

---

Dokumen ini menjelaskan deep equality terbatas, siklus, NaN, dan bahaya JSON stringify.
