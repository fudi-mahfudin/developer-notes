# Callback

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: apa itu callback?

**Callback** adalah fungsi yang **diteruskan ke fungsi lain** dan dipanggil nanti (setelah selesai tugas, setelah event, atau setelah interval). Di JavaScript, callback adalah fondasi HOF, asinkron, dan DOM.

### Pola umum

| Konteks | Siapa memanggil callback | Contoh |
|---------|-------------------------|--------|
| Asinkron | runtime / API | `setTimeout`, `fs.readFile`, `fetch().then` |
| Event | browser / host | `el.addEventListener('click', fn)` |
| Array | method array | `arr.map(x => x * 2)` |
| Library | Anda | `array.sort((a,b) => a-b)` |

### Contoh singkat per pola

#### Timer

```js
setTimeout(() => console.log('lagi'), 100);
```

#### Event (callback dipanggil berulang)

```js
button.addEventListener('click', (e) => e.preventDefault());
```

#### Callback terakhir (Node gaya “error-first”)

```js
// pola: (err, result) => void
```

### Kesalahan umum

- **Callback hell** — rantai nested; mitigasi: `async/await`, `pipe`, modul kecil.
- **Lupa menangani error** di callback asinkron (terutama pola error-first).
- **`this`** di callback method — sering perlu `bind` atau arrow (lihat materi `this`).

---

# Contoh soal coding: `repeatSync`

## 1) Ringkasan Soal

**Info soal**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** Callback, kontrol alur  
- **Inti masalah:** Panggil fungsi callback **n** kali secara berurutan secara sinkron, tanpa `setTimeout`.

---

- Soal: `repeatSync(n, callback)` memanggil `callback(i)` untuk `i = 0 .. n-1` berurutan.  
- Input: `n` bilangan bulat ≥ 0, `callback` `(index: number) => void`.  
- Output: `undefined`; efek samping hanya dari `callback`.  
- Constraints: `n === 0` tidak memanggil callback.  
- Pattern: callback sebagai argumen

## 2) Jawaban Ideal Singkat (30-60 detik)

> Satu loop `for` dari 0 sampai n-1; di tiap langkah panggil `callback(i)`. O(n) waktu, O(1) ruang tambahan. Edge: n=0 tidak memanggil.

Struktur cepat:

- Observasi: urutan tetap sinkron.  
- Strategi: loop eksplisit.  
- Time: O(n); Space: O(1).  
- Edge: n = 0.

## 3) Versi Ultra Singkat (10-20 detik)

> Loop i dari 0 ke n-1, panggil `callback(i)`.

## 4) Pseudocode Ringkas

```text
repeatSync(n, callback):
  untuk i dari 0 sampai n-1:
    callback(i)
```

## 5) Implementasi Final (Inti Saja)

```js
export function repeatSync(n, callback) {
  for (let i = 0; i < n; i++) callback(i);
}
```

## 6) Bukti Correctness

- Invariant: setelah iterasi i, `callback` telah dipanggil untuk semua indeks `< i`.  
- Semua indeks 0..n-1 tercakup tepat sekali.

## 7) Dry Run Singkat

- `repeatSync(3, i => console.log(i))` → 0,1,2  
- `repeatSync(0, fn)` → tidak ada pemanggilan

## 8) Red Flags

- Memakai `setTimeout` tanpa perlu (mengubah urutan asinkron).  
- Memanggil `callback` dengan argumen salah (mis. 1..n).

## 9) Follow-up

- Async: `repeatAsync` dengan `setTimeout` berantai atau `for await` — jawaban: beda semantik waktu.

## 10) Trade-off

- Loop vs `Array.from({length:n})` — loop lebih jelas untuk pemula.

## 11) Checklist Siap Submit

- [ ] n=0  
- [ ] Kompleksitas disebutkan  
- [ ] Tidak mutasi argumen selain efek callback

## 12) Skor Evaluasi Diri

- Correctness: 1-10  
- Efisiensi: 1-10  
- Kejelasan: 1-10  
- Kerapihan: 1-10  
- Catatan:

---

## Template Drill Cepat — `once` (lihat juga HOF)

- Topik: callback + closure  
- Soal mini: bungkus `addListener` agar callback hanya terdaftar sekali.

---

## Tautan ke indeks

- [`README.md`](./README.md)
