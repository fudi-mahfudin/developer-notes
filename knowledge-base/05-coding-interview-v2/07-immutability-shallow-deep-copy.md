# Topik 7 — Immutability, Spread Object/Array, Shallow vs Deep Copy

Dokumen ini menjelaskan mutasi vs pembuatan salinan di JavaScript, perbedaan salinan dangkal dan dalam, serta implikasi ke React state, Redux, dan bug umum di interview.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Mutasi** mengubah data di tempat; **immutability** mendorong membuat nilai baru saat perubahan agar perbandingan referensi dan riwayat perubahan lebih mudah. Operator **spread** (`...`) pada array/object membuat **shallow copy** satu level—nested object masih berbagi referensi. **Deep copy** memerlukan traversal rekursif, `structuredClone` (modern), atau library; `JSON.parse(JSON.stringify(x))` cepat tapi kehilangan `Date`, `Map`, `undefined`, dan lain-lain.

---

## 2. Mengapa topik ini keluar di interview

- Bug “state tidak re-render” karena mutasi array yang sama.
- Soal implementasi `cloneDeep` terbatas (tanpa lib) di live coding.
- Diskusi performa: salinan besar vs structural sharing (konsep).

---

## 3. Mutasi array

```javascript
const a = [1, 2, 3];
a.push(4); // mutasi
```

Alternatif imutabel:

```javascript
const b = [...a, 4];
```

---

## 4. Mutasi object

```javascript
const o = { x: 1 };
o.x = 2; // mutasi
const p = { ...o, x: 2 }; // shallow baru, x diganti
```

---

## 5. Shallow copy: apa yang tersalin?

```javascript
const inner = { z: 1 };
const outer = { y: inner };
const copy = { ...outer };
copy.y.z = 99;
console.log(outer.y.z); // 99 — nested masih sama
```

---

## 6. `Object.assign`

`Object.assign({}, src)` juga shallow. Urutan properti dan getter bisa membingungkan—spread sering lebih jelas.

---

## 7. `structuredClone` (browser modern / Node 17+)

```javascript
const c = structuredClone(original);
```

Menyalin banyak tipe built-in lebih baik daripada JSON trick—cek dukungan lingkungan.

---

## 8. JSON deep clone — batasan

- Kehilangan `undefined`, function, symbol.
- `Date` jadi string.
- Circular structure meledak.

---

## 9. Deep clone manual (pola interview)

```javascript
function cloneDeep(value, seen = new WeakMap()) {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value);
  if (Array.isArray(value)) {
    const out = [];
    seen.set(value, out);
    for (const item of value) out.push(cloneDeep(item, seen));
    return out;
  }
  const out = {};
  seen.set(value, out);
  for (const k of Object.keys(value)) {
    out[k] = cloneDeep(value[k], seen);
  }
  return out;
}
```

Versi produksi perlu menangani `Map`, `Set`, typed array, dll.

---

## 10. Immutability di React

Set state dengan referensi baru:

```javascript
setItems((prev) => [...prev, item]);
```

Mutasi `prev` langsung melanggar kontrak dan bisa mem-bypass optimisasi.

---

## 11. `Object.freeze` (dangkal)

`Object.freeze` mencegah penambahan/hapus properti dan reassignment value langsung—**tidak** membekukan nested secara default (`deep freeze` perlu rekursi).

---

## 12. Performa

Shallow lebih murah; deep clone besar di setiap action bisa mahal—pertimbangkan struktur data atau immer.

---

## 13. Latihan prediksi

```javascript
const a = [{ v: 1 }];
const b = a.map((x) => x);
b[0].v = 2;
console.log(a[0].v);
```

---

## 14. Jawaban

`2` — `map` membuat array baru, tetapi elemen masih objek yang sama.

---

## 15. Checklist

- [ ] Tahu beda shallow vs deep.
- [ ] Tahu batasan JSON clone.
- [ ] Tahu mengapa spread nested tidak aman untuk isolasi penuh.
- [ ] Tahu kapan `structuredClone` layak.

---

## 16. Referensi

Konsep immutability populer di FP; di JS implementasinya pragmatis. Untuk interview, fokus pada referensi vs nilai.

---

## 17. Tambahan: copy symbol keys

Spread dan `Object.assign` tidak menyalin symbol keys enumerable secara konsisten dengan semua kasus—periksa kebutuhan.

---

## 18. Tambahan: prototype chain

Clone dangkal tidak menyalin prototype—hasil biasanya plain object.

---

## 19. Tambahan: `concat` vs spread

`arr.concat` membuat shallow baru; elemen nested tetap shared.

---

## 20. Pola Redux toolkit

Immer memungkinkan “mutasi” sintaksis dengan copy-on-write di balik layar—wawasan konsep tetap berguna.

---

## 21. Quiz: `slice` vs `splice`

`slice` non-mutating copy shallow portion; `splice` mutasi—sering tertukar di junior.

---

## 22. Latihan tulis

Implementasikan `updateIn(obj, ['a','b'], fn)` imutabel shallow per level yang dilalui.

---

## 23. Anti-pattern

`JSON.parse(JSON.stringify)` untuk state besar dengan `Date` di produksi tanpa tes regressi.

---

## 24. Flashcard

- **Shallow:** satu lapisan pointer baru.
- **Deep:** subtree independen (idealnya).
- **Freeze:** tidak mengganti model data fungsional otomatis.

---

## 25. Menutup

Pilih strategi copy sesuai kedalaman struktur dan tipe data; jangan mendalamkan clone tanpa kebutuhan.

---

Dokumen ini mendukung menjawab “bagaimana Anda menghindari mutasi siluman?” dengan contoh konkret.
