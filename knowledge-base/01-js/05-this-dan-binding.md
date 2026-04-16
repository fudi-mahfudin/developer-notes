# `this` & binding

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**`this`** adalah nilai yang ditentukan **cara pemanggilan fungsi**, bukan tempat definisi (kecuali arrow function yang mengambil `this` dari leksikal luar).

### Perbandingan cepat

| Cara panggil | `this` (biasa) |
|--------------|----------------|
| `obj.method()` | `obj` |
| `func()` (non-strict global) | `global` / `window` |
| `func()` (strict) | `undefined` |
| `new Ctor()` | instance baru |
| `fn.call(asThis, a)` / `apply` | `asThis` |

**Arrow function** — tidak punya `this` sendiri; memakai `this` dari scope yang membungkus.

### Contoh per pola

#### Method vs fungsi lepas

```js
const obj = {
  x: 1,
  getX() {
    return this.x;
  },
};
const fn = obj.getX;
fn(); // undefined (strict) — this kehilangan obj
```

#### `bind`

```js
const bound = obj.getX.bind(obj);
bound(); // 1
```

#### Arrow di dalam class / method

```js
class T {
  x = 2;
  m = () => this.x; // arrow menangkap this instance
}
```

### Kesalahan umum

- Mengoper method sebagai callback tanpa `bind` → kehilangan receiver.  
- Mengira `this` di dalam `map` callback mengacu ke elemen luar (tidak otomatis).

---

# Contoh soal coding: `bindLast`

## 1) Ringkasan Soal

- **Tingkat:** Medium  
- **Topik:** `bind`, partial application  
- **Inti:** Implementasikan `bindLast(fn, ...fixedArgs)` yang memanggil `fn` dengan argumen: `(leading..., ...fixedArgs)`.

---

- Soal: `bindLast(fn, a, b)` mengembalikan fungsi `g` sehingga `g(x, y)` memanggil `fn(x, y, a, b)`.  
- Input: `fn` fungsi, `fixedArgs` nol atau lebih banyak argumen.  
- Output: fungsi baru.  
- Constraints: pertahankan `length` opsional; tidak perlu `new` pada contoh ini.

## 2) Jawaban Ideal Singkat

> Return function yang mengumpulkan argumen depan lalu memanggil `fn(...front, ...fixedArgs)`. O(1) per call amortized untuk spread kecil.

## 3) Versi Ultra Singkat

> Closure menyimpan `fixedArgs`; wrapper menggabungkan.

## 4) Pseudocode

```text
bindLast(fn, fixed...):
  return (...front) -> fn(...front, ...fixed)
```

## 5) Implementasi

```js
export function bindLast(fn, ...fixedArgs) {
  return (...leading) => fn(...leading, ...fixedArgs);
}
```

## 6) Bukti

- Setiap pemanggilan `g` mem-forward `leading` + `fixedArgs` ke `fn`.

## 7) Dry Run

- `const sum3 = (a,b,c) => a+b+c; const g = bindLast(sum3, 10); g(1,2)` → `fn(1,2,10)` = 13

## 8) Red Flags

- Memanggil `fn` dengan urutan argumen terbalik.  
- Lupa `...` spread.

## 9) Follow-up

- Bandingkan dengan `Function.prototype.bind` bawaan.

## 10) Trade-off

- Wrapper vs native `bind` — ini khusus untuk argumen belakang.

## 11) Checklist

- [ ] `fixedArgs` kosong → `g(1,2)` sama dengan `fn(1,2)`

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `callWith(obj, methodName, ...args)` yang memanggil `obj[methodName](...args)` dengan `this === obj`.

---

## Tautan

- [`README.md`](./README.md)
