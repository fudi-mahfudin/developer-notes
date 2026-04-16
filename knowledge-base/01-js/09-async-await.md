# `async` / `await`

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**`async` function** selalu mengembalikan **Promise**. Di dalamnya, **`await`** menunda eksekusi hingga Promise diselesaikan (atau melempar jika reject).

### Manfaat

- Alur asinkron **terbaca seperti sinkron**.  
- **`try/catch`** untuk `await` yang reject.

### Contoh per pola

#### Urutan berurutan

```js
async function run() {
  const a = await fetch('/a');
  const b = await fetch('/b');
  return [a, b];
}
```

#### Paralel (lebih cepat jika independen)

```js
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]);
```

#### Error

```js
try {
  await mightFail();
} catch (e) {
  console.error(e);
}
```

### Kesalahan umum

- **Await di loop** berurutan → lambat; gunakan `Promise.all` jika independen.  
- **`await` pada non-Promise** — dibungkus `Promise.resolve` implisit.

---

# Contoh soal coding: `sequential`

## 1) Ringkasan Soal

- **Tingkat:** Easy–Medium  
- **Topik:** async/await, urutan  
- **Inti:** Jalankan array fungsi `() => Promise<T>` **berurutan** (bukan paralel), kumpulkan hasil.

---

- Soal: `sequential(asyncFns)` → `Promise<Array>`  
- Input: `asyncFns` array fungsi tanpa argumen, mengembalikan Promise  
- Output: array hasil dalam urutan yang sama

## 2) Jawaban Ideal Singkat

> `for...of` + `await` tiap fungsi; push hasil. O(n) waktu total asinkron berurutan.

## 3) Versi Ultra Singkat

> Loop `await` satu per satu.

## 4) Pseudocode

```text
sequential(asyncFns):
  hasil = []
  untuk f dalam asyncFns:
    hasil.push(await f())
  return hasil
```

## 5) Implementasi

```js
export async function sequential(asyncFns) {
  const out = [];
  for (const fn of asyncFns) {
    out.push(await fn());
  }
  return out;
}
```

## 6) Bukti

- Tidak ada `Promise.all` — tidak paralel.

## 7) Dry Run

- `sequential([()=>Promise.resolve(1), ()=>Promise.resolve(2)])` → `[1,2]`

## 8) Red Flags

- `asyncFns.map(fn => fn())` — paralel.

## 9) Follow-up

- `parallel` dengan `Promise.all`.

## 10) Trade-off

- `for` vs `reduce` async — `for` lebih mudah dibaca.

## 11) Checklist

- [ ] Reject pertama memutus rantai (try/catch di luar)

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `retry(fn, n)` dengan `await` dan loop.

---

## Tautan

- [`README.md`](./README.md)
