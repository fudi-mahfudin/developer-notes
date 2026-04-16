# Object literal

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Object literal** `{ }` membuat objek dengan properti. ES6+ menambahkan **shorthand** agar kode ringkas.

### Fitur umum

| Sintaks | Arti |
|---------|------|
| `{ x }` | `{ x: x }` jika variabel `x` ada |
| `{ x: y }` | properti bernama `x`, nilai `y` |
| `{ [expr]: v }` | nama properti dinamis (computed) |
| `{ ...obj }` | spread (shallow copy properti enumerable) |

### Contoh per pola

#### Property shorthand

```js
const name = 'Ada';
const user = { name, age: 36 };
```

#### Computed

```js
const key = 'id';
const o = { [key]: 1 };
```

#### Spread

```js
const base = { a: 1 };
const next = { ...base, b: 2 };
```

### Kesalahan umum

- **Spread** tidak menggabungkan **deep**; nested object tetap shared.  
- `__proto__` / prototype pollution jika merge object dari input tidak tepercaya.

---

# Contoh soal coding: `pick`

## 1) Ringkasan Soal

- **Tingkat:** Easy  
- **Topik:** Object literal, key  
- **Inti:** Kembalikan objek baru yang hanya berisi **properti** yang ada di `keys` (jika ada di `obj`).

---

- Soal: `pick(obj, keys)`  
- Input: `obj` plain object, `keys` array string  
- Output: objek baru `{ [k]: obj[k] }` untuk k yang ada di `obj`

## 2) Jawaban Ideal Singkat

> Iterasi `keys` — jika `Object.prototype.hasOwnProperty.call(obj, k)` atau `k in obj` sesuai kebutuhan — assign ke `out`. O(keys).

## 3) Versi Ultra Singkat

> Loop keys + literal `out[k] = obj[k]`.

## 4) Pseudocode

```text
pick(obj, keys):
  out = {}
  untuk k dalam keys:
    jika k ada di obj: out[k] = obj[k]
  return out
```

## 5) Implementasi

```js
export function pick(obj, keys) {
  const out = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}
```

## 6) Bukti

- Hanya own property; tidak menyalin chain prototype.

## 7) Dry Run

- `pick({ a: 1, b: 2 }, ['a', 'c'])` → `{ a: 1 }`

## 8) Red Flags

- `keys.map` + `filter` berlebihan untuk satu loop.

## 9) Follow-up

- `omit`, `mergeDeep`.

## 10) Trade-off

- `hasOwn` vs `in` — inherited keys.

## 11) Checklist

- [ ] Urutan key — tidak dijamin sama di semua engine untuk iterasi object; di sini urutan `keys`

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `omit(obj, keys)` dengan `Object.fromEntries` + `Object.entries`.

---

## Tautan

- [`README.md`](./README.md)
