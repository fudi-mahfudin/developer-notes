# Closure

Materi ini melengkapi baris indeks di `README.md`. Satu bagian **penjelasan**; satu bagian **contoh soal** mengikuti template coding test.

---

## Pengantar: apa itu closure?

**Closure** adalah kemampuan fungsi untuk **mengakses variabel dari lingkungan luar** (scope) tempat fungsi itu **didefinisikan**, meskipun fungsi dipanggil di luar scope tersebut.

### Mengapa penting?

- **Data privat** tanpa `class` (factory, modul).  
- **Callback** yang “mengingat” konfigurasi (`setInterval` dengan counter).  
- **Partial application** dan HOF.

### Contoh minimal

```js
function outer(x) {
  return function inner(y) {
    return x + y; // inner “melihat” x
  };
}
const add5 = outer(5);
add5(3); // 8
```

### Contoh per pola

#### Counter tertutup

```js
function createCounter(start = 0) {
  let n = start;
  return () => ++n;
}
const next = createCounter(10);
next(); // 11
next(); // 12
```

#### Loop klasik + closure (perhatikan `var` vs `let`)

```js
const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
fns.map((f) => f()); // [0,1,2] dengan let; dengan var bisa jadi bug [3,3,3]
```

### Kesalahan umum

- **Menutup loop var** — gunakan `let` atau IIFE.  
- **Closure memegang referensi besar** — risiko bocor memori (lihat materi senior GC).

---

# Contoh soal coding: `createCounter`

## 1) Ringkasan Soal

**Info soal**

- **Tingkat:** Easy–Medium  
- **Topik:** Closure, state tertutup  
- **Inti masalah:** Factory yang mengembalikan fungsi `next()` dan `peek()` tanpa mengekspos `n` langsung.

---

- Soal: `createCounter(initial)` mengembalikan objek `{ next, peek }` dengan `next()` menambah 1 dan mengembalikan nilai baru, `peek()` nilai saat ini tanpa menambah.  
- Input: `initial` integer (default 0).  
- Output: `{ next: () => number, peek: () => number }`.  
- Constraints: pemanggilan berulang konsisten.

## 2) Jawaban Ideal Singkat

> Simpan `let n = initial` di luar objek yang dikembalikan; `next` mutasi `n` dan return; `peek` return `n`. O(1) per operasi.

## 3) Versi Ultra Singkat

> Satu `let` di closure; dua method mengakses variabel yang sama.

## 4) Pseudocode

```text
createCounter(initial):
  n = initial
  return {
    next: () -> { n++; return n }   // atau return ++n sesuai spesifikasi
    peek: () -> n
  }
```

(Sesuaikan apakah `next` mengembalikan nilai sebelum/sesudah increment — di implementasi di bawah: return nilai setelah increment.)

## 5) Implementasi Final

```js
export function createCounter(initial = 0) {
  let n = initial;
  return {
    next: () => {
      n += 1;
      return n;
    },
    peek: () => n,
  };
}
```

## 6) Bukti Correctness

- `n` hanya lewat method; tidak ada akses global.  
- Urutan `next`/`peek` konsisten dengan invariant `n`.

## 7) Dry Run

- `const c = createCounter(0); c.next(); c.peek()` → 1,1 atau 1,2 tergantung spesifikasi; dokumentasikan satu.

## 8) Red Flags

- Menggunakan `this` tanpa perlu untuk state.  
- Mengembalikan `n` langsung (memecah enkapsulasi).

## 9) Follow-up

- `reset()` — tambah method yang menulis ulang `n` di closure.

## 10) Trade-off

- Object literal vs class private `#` — closure portabel di ES lama.

## 11) Checklist

- [ ] Peek tidak mengubah state (jika itu kontrak).  
- [ ] Beberapa instance counter independen.

## 12) Skor Diri

- …

---

## Template Drill Cepat — `memoize(fn)`

- Closure menyimpan `Map` hasil `arg -> result`; topik lanjutan bersinggungan dengan pure function.

---

## Tautan ke indeks

- [`README.md`](./README.md)
