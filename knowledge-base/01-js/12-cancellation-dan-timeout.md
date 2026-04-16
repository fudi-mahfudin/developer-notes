# Cancellation & timeout

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

Operasi asinkron sering perlu **dibatalkan** (navigasi halaman, input baru) atau **dibatasi waktu**. Di web modern, **`AbortSignal`** (dari `AbortController`) adalah cara standar untuk memberi sinyal pembatalan ke `fetch` dan API lain.

### `AbortController`

```js
const ac = new AbortController();
fetch('/api', { signal: ac.signal });
// later:
ac.abort();
```

### Timeout

- Gabungkan **timer** + `abort()` setelah `ms`.  
- Atau **`Promise.race`** antara operasi dan `delay(ms)` (operasi tidak selalu bisa dibatalkan tanpa signal).

### Kesalahan umum

- Memanggil `abort()` **setelah** `fetch` selesai — aman, tapi tidak ada efek.  
- Lupa membersihkan timer jika operasi selesai lebih cepat.

---

# Contoh soal coding: `withTimeout`

## 1) Ringkasan Soal

- **Tingkat:** Medium  
- **Topik:** Promise, race, timeout  
- **Inti:** Kembalikan Promise yang **reject** dengan `Error('timeout')` jika `p` belum selesai dalam `ms`; jika `p` selesai lebih cepat, kembalikan nilainya.

---

- Soal: `withTimeout(p, ms)`  
- Input: `p` Promise, `ms` > 0  
- Output: Promise yang resolve/reject seperti `p`, atau reject timeout

## 2) Jawaban Ideal Singkat

> `Promise.race([p, delayReject(ms)])` — `delayReject` reject setelah `ms` dengan `setTimeout`.

## 3) Versi Ultra Singkat

> `race` + timer reject.

## 4) Pseudocode

```text
withTimeout(p, ms):
  timer = reject setelah ms
  race p dengan timer
```

## 5) Implementasi

```js
export function withTimeout(p, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}
```

## 6) Bukti

- Timer dibersihkan saat `p` selesai; tidak bocor untuk kasus sukses/gagal.

## 7) Dry Run

- `withTimeout(Promise.resolve(1), 1000)` → 1  
- `withTimeout(new Promise(() => {}), 10)` → reject timeout

## 8) Red Flags

- Menggunakan `race` tanpa `clearTimeout` — bisa leak atau reject ganda (gunakan pola di atas).

## 9) Follow-up

- `AbortSignal.timeout(ms)` (environment yang mendukung).

## 10) Trade-off

- Timeout tidak membatalkan kerja di `p` — hanya mengabaikan hasil.

## 11) Checklist

- [ ] `clearTimeout` pada semua path

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis `fetchWithTimeout(url, ms)` memakai `AbortSignal` + `setTimeout` + `abort()`.

---

## Tautan

- [`README.md`](./README.md)
