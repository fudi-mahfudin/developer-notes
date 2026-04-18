# Topik 92 — Flatten Array dan Objek Bersarang

**Flatten array** mengubah struktur bertingkat menjadi satu dimensi (atau **depth** tertentu). **Flatten object** mengubah `{a:{b:1}}` menjadi `{'a.b':1}` atau serupa. Soal interview menguji rekursi, iteratif dengan **stack**, dan penanganan **siklus** untuk objek.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Array: `Array.prototype.flat(depth)` built-in; manual dengan DFS stack atau rekursi. Objek: DFS kumpulkan path dengan titik/bracket notation; waspada **referensi siklus**—gunakan `WeakSet` visited. Untuk array dengan `null`/`empty slot`, tentukan apakah dipertahankan. Kompleksitas O(n) node untuk traversal total.

---

## 2. Mengapa topik ini keluar di interview

- “Flatten nested array” klasik.
- “Stringify keys path” untuk form libraries.

---

## 3. Array flat manual

```javascript
function flat(arr, d = Infinity) {
  const res = [];
  const st = arr.map((x) => [x, 0]);
  while (st.length) {
    const [x, depth] = st.pop();
    if (Array.isArray(x) && depth < d) {
      for (let i = x.length - 1; i >= 0; i--) st.push([x[i], depth + 1]);
    } else res.push(x);
  }
  return res.reverse();
}
```

---

## 4. Object flatten

```javascript
function flattenObj(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenObj(v, key));
    } else out[key] = v;
  }
  return out;
}
```

---

## 5. Kompleksitas

O(N) total elemen/properti untuk struktur asli.

---

## 6. Pitfall: siklus objek

Tanpa visited → infinite recursion.

---

## 7. Pitfall: kunci mengandung titik

Gunakan path array atau escape—JSONPath style.

---

## 8. Pitfall: array vs object

Tentukan apakah array diperlakukan sebagai daftar atau objek angka.

---

## 9. Pola interview: unflatten

Reverse map path string ke nested object—split hati-hati.

---

## 10. Pola interview: flatten dengan depth

Mirip `flat`.

---

## 11. Latihan konsep

Bandingkan DFS vs BFS untuk flatten stack.

---

## 12. Latihan kode

`flattenObj` dengan deteksi circular `WeakSet`.

---

## 13. Edge cases

- `null` sebagai object—typeof null bug klasik.
- Sparse array holes.

---

## 14. Checklist

- [ ] Depth limit.
- [ ] Siklus.
- [ ] Format path.

---

## 15. Referensi

MDN flat; lodash `flatMapDeep`.

---

## 16. Anti-pattern

`JSON.stringify` untuk deteksi siklus—bukan untuk flatten umum.

---

## 17. Flashcard

- **DFS stack:** iteratif tanpa call stack besar.

---

## 18. Testing

Struktur dalam dengan back-edge manual.

---

## 19. Performa

Stack eksplisit menghindari stack overflow JS untuk kedalaman ekstrem.

---

## 20. Integrasi TypeScript

Rekursi conditional type untuk flatten tuple—advanced.

---

## 21. Debugging

Log path saat traverse.

---

## 22. Memori

Visited set menambah O(n) referensi.

---

## 23. Parallel

Tidak relevan.

---

## 24. Etika wawancara

Tanyakan apakah built-in `flat` diperbolehkan.

---

## 25. Rangkuman

Flatten adalah traversal struktur dengan aturan depth dan path.

---

## 26. Soal terkait

JSON flatten untuk indexing Elasticsearch dynamic fields.

---

## 27. Drill manual

`[1,[2,[3]]]` depth 1 vs infinity.

---

## 28. Varian: flatten to Map

Path tuple sebagai kunci.

---

## 29. Penutup

Kuasai flatten berarti kuasai rekursi, stack, dan representasi path.

---

Dokumen ini menjelaskan flatten array dan objek, siklus, depth, dan kompleksitas.
