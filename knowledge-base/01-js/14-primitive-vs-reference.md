# Primitive vs reference

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Primitive** (mis. `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`) disimpan **by value**; **object** (termasuk array, function, date) disimpan **by reference** (identitas objek).

### Perbandingan

| Aspek | Primitive | Object |
|--------|-----------|--------|
| **Perbandingan** | `===` nilai | `===` identitas (alamat) |
| **Mutasi** | Immutable (reassign) | Properti bisa diubah |

### Contoh per pola

#### Copy

```js
let a = 1;
let b = a;
b = 2; // a tetap 1

const o = { x: 1 };
const p = o;
p.x = 2; // o.x juga 2
```

#### Shallow copy

```js
const q = { ...o };
const r = [1, 2, { a: 3 }];
const s = [...r]; // nested object masih shared
```

### Kesalahan umum

- Mengira **spread** `{...obj}` **deep clone** — tidak.  
- Membandingkan array dengan `===` untuk nilai isi.

---

# Contoh soal coding: `deepClone`

## 1) Ringkasan Soal

- **Tingkat:** Medium (dibatasi)  
- **Topik:** Reference, struktur  
- **Inti:** Implementasi **deep clone** untuk **plain object** dan **array** saja (tanpa circular, tanpa Date/Map), rekursif.

---

- Soal: `deepClone(value)`  
- Input: `value` plain object, array, atau primitive  
- Output: salinan dalam; nested object/array tidak shared reference

## 2) Jawaban Ideal Singkat

> `Array.isArray` → map clone elemen; `typeof === 'object' && value` → clone key; selain itu return value. O(n) node.

## 3) Versi Ultra Singkat

> Rekursi + plain object/array only.

## 4) Pseudocode

```text
deepClone(v):
  jika primitive atau null: return v
  jika array: return v.map(deepClone)
  jika object: salin setiap key deepClone
```

## 5) Implementasi

```js
export function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);
  const out = {};
  for (const k of Object.keys(value)) {
    out[k] = deepClone(value[k]);
  }
  return out;
}
```

## 6) Bukti

- Tidak ada sharing reference pada nested plain object/array.

## 7) Dry Run

- `deepClone({ a: { b: 1 } })` — `a` tidak sama dengan referensi asli.

## 8) Red Flags

- `JSON.parse(JSON.stringify(x))` — kehilangan `undefined`, `Date`, dll.

## 9) Follow-up

- `structuredClone` (browser) untuk kasus umum.

## 10) Trade-off

- Clone manual vs library — scope interview.

## 11) Checklist

- [ ] Circular — soal ini tidak mensyaratkan; jika ditanya, pakai `WeakMap`

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `shallowEqual(a, b)` untuk plain object satu level.

---

## Tautan

- [`README.md`](./README.md)
