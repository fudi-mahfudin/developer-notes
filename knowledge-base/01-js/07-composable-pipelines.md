# Composable pipelines

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Pipeline** (alur) adalah merangkai **transformasi kecil** menjadi satu alur: data masuk → langkah1 → langkah2 → … → keluar. Di JavaScript sering diwujudkan dengan `pipe`/`compose`, atau `then` berantai pada Promise.

### Hubungan dengan HOF

- `pipe`/`compose` adalah **HOF**; setiap langkah adalah fungsi.  
- Menghindari **callback hell** dengan menata transformasi sebagai daftar.

### Contoh per pola

#### `pipe` (kiri ke kanan)

```js
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const add1 = (x) => x + 1;
const double = (x) => x * 2;
pipe(add1, double)(3); // 8
```

#### Rantai `then` (Promise)

```js
fetch('/a')
  .then((r) => r.json())
  .then((u) => u.name)
  .catch(() => 'default');
```

### Kesalahan umum

- **Urutan** `compose` vs `pipe` (kanan vs kiri).  
- Mencampur **sinkron** dan **async** tanpa `async`/`await` atau `then` konsisten.

---

# Contoh soal coding: `compose`

## 1) Ringkasan Soal

- **Tingkat:** Medium  
- **Topik:** Komposisi fungsi, HOF  
- **Inti:** `compose(f,g,h)(x) === f(g(h(x)))` (eksekusi dari **kanan ke kiri**).

---

- Soal: `compose(...fns)`  
- Input: daftar fungsi unary  
- Output: satu fungsi  
- Constraints: `fns` kosong → identity

## 2) Jawaban Ideal Singkat

> Terapkan fungsi dari `fns` ke `x` dengan `reduceRight`: `fns.reduceRight((v,f)=>f(v), x)` atau `reduce` pada `fns.reverse()`.

## 3) Versi Ultra Singkat

> `reduceRight` pada `fns` dengan nilai awal `x`.

## 4) Pseudocode

```text
compose(fns):
  return (x) -> reduceRight fns dengan v mulai dari x
```

## 5) Implementasi

```js
export function compose(...fns) {
  return (x) => fns.reduceRight((v, f) => f(v), x);
}
```

## 6) Bukti

- Setiap `f` diterapkan sekali dari dalam ke luar.

## 7) Dry Run

- `compose(add1, double)(3)` dengan `add1`→+1, `double`→×2: `add1(double(3))` = add1(6)=7

## 8) Red Flags

- Memakai `reduce` biasa tanpa `Right` → urutan pipe, bukan compose.

## 9) Follow-up

- `composeAsync` dengan `reduce` + `async`/`await`.

## 10) Trade-off

- `compose` vs `pipe` — konvensi tim (Ramda vs lodash).

## 11) Checklist

- [ ] Kosong → identity  
- [ ] Sesuai urutan matematika

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Ubah `fetch` + `then` menjadi satu `async` function dengan pipeline jelas.

---

## Tautan

- [`README.md`](./README.md)
