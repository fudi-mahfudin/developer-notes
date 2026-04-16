# Pure function & efek samping

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Fungsi murni (pure)** — untuk input yang sama, output selalu sama, dan **tidak** menimbulkan efek samping terobservasi (I/O, mutasi variabel luar, `console.log` di konteks ketat, waktu acak).

**Efek samping** — segala sesuatu di luar nilai return: mengubah objek global, DOM, basis data, mencetak log produksi, dsb.

### Mengapa dipedulikan?

- **Uji unit** mudah: tidak perlu mock lingkungan jika murni.  
- **Reasoning** paralel / time-travel debugging di UI.  
- **Immutability** data: menghindari bug “siapa yang mengubah state?”.

### Contoh per kategori

#### Murni

```js
const add = (a, b) => a + b;
```

#### Tidak murni (I/O)

```js
function saveUser(u) {
  localStorage.setItem('user', JSON.stringify(u));
}
```

#### Tidak murni (mutasi argumen)

```js
function pushBad(arr, x) {
  arr.push(x); // memutasi input
  return arr;
}
```

#### Pola “murni” dengan salinan

```js
function pushPure(arr, x) {
  return [...arr, x];
}
```

### Kesalahan umum

- Mengira `map` selalu murni — callback bisa mutasi elemen jika elemen objek.  
- Menggabungkan **logika murni** dan **I/O** dalam satu fungsi besar — sulit diuji.

---

# Contoh soal coding: `pureAppend`

## 1) Ringkasan Soal

- **Tingkat:** Easy  
- **Topik:** Immutability array, pure function  
- **Inti:** Kembalikan array **baru** = elemen lama + `item` di akhir, tanpa mutasi `arr`.

---

- Soal: `pureAppend(arr, item)`  
- Input: `arr` array, `item` apa pun  
- Output: array baru  
- Constraints: `arr` asli tidak berubah panjang/isinya

## 2) Jawaban Ideal Singkat

> Spread atau `slice` + concat; O(n) waktu untuk salinan, O(n) ruang output baru.

## 3) Versi Ultra Singkat

> `return [...arr, item]`

## 4) Pseudocode

```text
pureAppend(arr, item):
  return salinan arr dengan item di ujung
```

## 5) Implementasi

```js
export function pureAppend(arr, item) {
  return [...arr, item];
}
```

## 6) Bukti

- Tidak ada penulisan ke `arr`.  
- Elemen referensi disalin referensinya (shallow) — dokumentasikan jika deep clone dibutuhkan.

## 7) Dry Run

- `const a = [1]; const b = pureAppend(a, 2);` → `a` tetap `[1]`, `b` `[1,2]`

## 8) Red Flags

- `arr.push(item); return arr` — melanggar immutability.

## 9) Follow-up

- `pureUpdateAt(arr, i, v)` dengan spread sebagian.

## 10) Trade-off

- Shallow vs deep clone — biaya vs kebutuhan.

## 11) Checklist

- [ ] Verifikasi `arr` tidak berubah dengan `===` panjang

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `without(arr, x)` murni tanpa `splice` pada input.

---

## Tautan

- [`README.md`](./README.md)
