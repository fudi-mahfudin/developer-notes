# Promise

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Promise** adalah objek yang mewakili **penyelesaian di masa depan** (fulfilled) atau **gagal** (rejected) dari operasi asinkron. Punya metode `then`, `catch`, `finally`.

### State

- **pending** → **fulfilled** (nilai) atau **rejected** (alasan).  
- State tidak bisa kembali ke pending.

### Contoh per API

#### `Promise` konstruktor (jarang dipakai langsung di app modern)

```js
const p = new Promise((resolve, reject) => {
  resolve(42);
});
```

#### Rantai `then`

```js
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x * 2); // 4
```

#### `Promise.all` (gagal cepat jika satu reject)

```js
Promise.all([p1, p2]).then(([a, b]) => {});
```

#### `Promise.allSettled` (tunggu semua)

```js
Promise.allSettled([p1, p2]).then((results) => {});
```

### Kesalahan umum

- **Unhandled rejection** — tidak ada `.catch`.  
- Mengira `then` callback mengembalikan non-Promise vs Promise (keduanya didukung).

---

# Contoh soal coding: `delay`

## 1) Ringkasan Soal

- **Tingkat:** Easy  
- **Topik:** Promise, timer  
- **Inti:** Kembalikan Promise yang **resolve** setelah `ms` milidetik.

---

- Soal: `delay(ms)` → `Promise<void>`  
- Input: `ms` ≥ 0  
- Output: Promise yang resolve tanpa nilai setelah jeda

## 2) Jawaban Ideal Singkat

> `new Promise((resolve) => setTimeout(resolve, ms))` — O(1) membuat Promise; waktu nyata `ms`.

## 3) Versi Ultra Singkat

> `setTimeout` + `resolve`.

## 4) Pseudocode

```text
delay(ms):
  return Promise baru yang resolve setelah ms
```

## 5) Implementasi

```js
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

## 6) Bukti

- Satu `resolve` per pemanggilan; tidak ada race.

## 7) Dry Run

- `await delay(0)` — resolve ke microtask berikutnya setelah timer 0ms.

## 8) Red Flags

- Memanggil `reject` tanpa alasan.  
- Lupa mengembalikan Promise.

## 9) Follow-up

- `delay` dengan `AbortSignal` untuk cancel.

## 10) Trade-off

- `setTimeout` vs `queueMicrotask` — semantik beda.

## 11) Checklist

- [ ] ms negatif — putuskan atau clamp.

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `timeoutPromise(p, ms)` yang `race` antara `p` dan `delay(ms)`.

---

## Tautan

- [`README.md`](./README.md)
