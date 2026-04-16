# Rekursi

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Rekursi** — fungsi memanggil dirinya sendiri. Wajib ada **kasus dasar** (base case) dan **langkah menuju base case** agar tidak stack overflow.

### Kapan dipakai?

- Struktur **tree** / **graph** (DFS).  
- **Divide & conquer** (binary search, merge sort).  
- **Indeks** masalah yang definisinya rekursif (faktorial, Fibonacci — dengan hati-hati kompleksitas).

### Contoh per pola

#### Faktorial

```js
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
```

#### Tail recursion (ES tidak mengoptimalkan tail call secara default)

```js
function sumTo(n, acc = 0) {
  if (n === 0) return acc;
  return sumTo(n - 1, acc + n);
}
```

### Kesalahan umum

- **Base case salah** atau tidak tercapai → infinite recursion.  
- **Fibonacci naif** O(2^n) — gunakan loop, memo, atau formula.  
- **Kedalaman stack** besar pada input besar — iteratif atau trampoline.

---

# Contoh soal coding: `power`

## 1) Ringkasan Soal

- **Tingkat:** Easy  
- **Topik:** Rekursi, bilangan bulat  
- **Inti:** Hitung `base^exp` untuk `exp` bilangan bulat non-negatif, tanpa `**` bawaan (latihan).

---

- Soal: `power(base, exp)`  
- Input: `base` number, `exp` integer ≥ 0  
- Output: `base ** exp` secara matematis  
- Constraints: `exp === 0` → 1

## 2) Jawaban Ideal Singkat

> Base: exp=0 return 1; rekursi: `base * power(base, exp-1)`. O(exp) waktu. Bisa dioptimalkan exponentiation by squaring O(log exp).

## 3) Versi Ultra Singkat

> Kalikan `base` dengan hasil `exp-1` sampai 0.

## 4) Pseudocode

```text
power(base, exp):
  jika exp == 0: return 1
  return base * power(base, exp-1)
```

## 5) Implementasi

```js
export function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}
```

## 6) Bukti

- Induksi pada `exp`: exp=0 benar; `exp=k+1` mengasumsikan `k` benar.

## 7) Dry Run

- `power(2, 3)` → 8  
- `power(5, 0)` → 1

## 8) Red Flags

- Negatif `exp` tanpa definisi.  
- Overflow number untuk `exp` besar.

## 9) Follow-up

- Versi O(log n) dengan `exp` genap/ganjil.

## 10) Trade-off

- Rekursi vs loop — loop menghindari stack dalam.

## 11) Checklist

- [ ] Base case  
- [ ] exp=0

## 12) Skor Diri

- …

---

## Template Drill Cepat

- `countNodes(node)` pada tree JSON sederhana.

---

## Tautan

- [`README.md`](./README.md)
