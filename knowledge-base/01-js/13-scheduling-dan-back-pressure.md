# Scheduling & back-pressure

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Scheduling** mengatur *kapan* kerja jalan. **Back-pressure** berarti **membatasi konkurensi** atau **rate** agar tidak membanjiri I/O, memori, atau API rate limit.

### Pola umum

| Pola | Arti |
|------|------|
| **Queue** | Antri satu per satu atau batch. |
| **Concurrency limit** | Maksimal N promise sekaligus (mis. 3). |
| **Throttling** | Maksimal sekali per interval waktu. |

### Contoh (konsep limit)

```js
// Pseudocode: jalankan tasks dengan max 2 paralel
async function runPool(tasks, limit) {
  // implementasi: iterator + slot kosong
}
```

### Kesalahan umum

- `Promise.all(array.map(asyncFn))` pada **ribuan** item → ledakan konkurensi.  
- Tidak ada **retry** atau **jitter** untuk rate limit.

---

# Contoh soal coding: `mapPool`

## 1) Ringkasan Soal

- **Tingkat:** Medium  
- **Topik:** Promise, konkurensi terbatas  
- **Inti:** Map array dengan `fn` async **tanpa** melebihi `limit` eksekusi paralel; jaga urutan hasil sama dengan input.

---

- Soal: `mapPool(items, limit, fn)`  
- Input: `items` array, `limit` integer ≥ 1, `fn(item, index)` → Promise  
- Output: array hasil dalam urutan `items`

## 2) Jawaban Ideal Singkat

> Slot `limit`: isi dari depan; saat satu selesai, ambil item berikutnya; kumpulkan hasil by index. O(n) pemanggilan; paling banyak `limit` paralel.

## 3) Versi Ultra Singkat

> Pool + iterator + index.

## 4) Pseudocode

```text
mapPool(items, limit, fn):
  hasil = array size n
  next = 0
  worker = async:
    while next < n:
      i = next++
      hasil[i] = await fn(items[i], i)
  jalankan limit kali worker
  await semua worker
  return hasil
```

## 5) Implementasi

```js
export async function mapPool(items, limit, fn) {
  const n = items.length;
  const out = new Array(n);
  let next = 0;

  async function worker() {
    while (next < n) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(limit, n) }, () => worker());
  await Promise.all(workers);
  return out;
}
```

## 6) Bukti

- `next` atomic dalam satu thread; tidak ada race pada JS single-threaded.

## 7) Dry Run

- `items` 5, `limit` 2 — paling banyak 2 `await` fn bersamaan.

## 8) Red Flags

- `Promise.all(items.map(fn))` — paralel penuh.

## 9) Follow-up

- `p-limit` (npm) atau queue berbasis stream.

## 10) Trade-off

- Urutan selesai vs urutan hasil — simpan by index.

## 11) Checklist

- [ ] `limit` > n — tidak error

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `throttle(fn, ms)` yang mengembalikan fungsi bersarang.

---

## Tautan

- [`README.md`](./README.md)
