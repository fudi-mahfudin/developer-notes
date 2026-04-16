# Event loop

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Event loop** menjadwalkan eksekusi kode JavaScript **single-threaded**: satu stack call; antrian **task** (callback timer, I/O) dan **microtask** (Promise `then`).

### Urutan klasik (disederhanakan)

1. Jalankan **script sinkron** sampai stack kosong.  
2. Drain **microtask** (Promise) sampai kosong.  
3. Ambil **satu** macrotask (mis. satu `setTimeout`).  
4. Ulangi — drain microtask lagi, lalu task berikutnya.

### Contoh per pola

#### Microtask vs task

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// A, D, C, B (microtask sebelum timer setelah sinkron selesai)
```

### Kesalahan umum

- Mengira `setTimeout(0)` jalan sebelum `Promise.then` setelah sinkron.  
- **Starvation** microtask jika loop microtask tanpa henti.

---

# Contoh soal coding: `orderOfLogs`

## 1) Ringkasan Soal

- **Tingkat:** Medium (konsep)  
- **Topik:** Event loop, urutan  
- **Inti:** Diberikan potongan kode, prediksi urutan string; **tanpa** menjalankan (latihan analisis).

---

- Soal: Jelaskan urutan isi array di `runOrderDemo()` (sinkron → microtask → macrotask), lalu verifikasi dengan `await runOrderDemo()`.  
- (Gunakan snippet di bagian “Implementasi referensi” untuk tes mandiri.)

## 2) Jawaban Ideal Singkat

> Sinkron dulu → microtask (`then`) → macrotask (`setTimeout`). Jika ada `await` di fungsi async, sisa fungsi jadi microtask.

## 3) Versi Ultra Singkat

> Promise.then sebelum setTimeout(0) setelah sinkron.

## 4) Pseudocode (analisis)

```text
log sinkron
queue microtask
queue macrotask
setelah stack kosong: drain microtasks lalu satu macrotask
```

## 5) Implementasi referensi (untuk tes)

```js
export function runOrderDemo() {
  const out = [];
  out.push('1-sync');
  setTimeout(() => out.push('4-timeout'), 0);
  Promise.resolve().then(() => out.push('3-micro'));
  out.push('2-sync');
  return new Promise((resolve) => {
    setTimeout(() => resolve(out), 0);
  });
}
```

## 6) Bukti

- Sesuai model event loop; verifikasi dengan engine.

## 7) Dry Run

- Urutan **push**: sinkron `1-sync`, `2-sync` → microtask `3-micro` → dua `setTimeout(0)` FIFO: dulu `4-timeout`, baru `resolve(out)`.  
- `await runOrderDemo()` → `['1-sync','2-sync','3-micro','4-timeout']` (semua sudah terisi saat Promise selesai).

## 8) Red Flags

- Mengabaikan `await` yang memecah fungsi async.

## 9) Follow-up

- `queueMicrotask` vs `Promise.then`.

## 10) Trade-off

- Model mental vs spesifikasi penuh — cukup untuk interview umum.

## 11) Checklist

- [ ] Bisa menjelaskan `requestAnimationFrame` vs `setTimeout`

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Tulis urutan untuk: `async function main(){ console.log(1); await Promise.resolve(); console.log(2); } main(); console.log(3);`

---

## Tautan

- Materi: `01-fundamental/01-javascript-runtime-dan-event-loop.md`  
- [`README.md`](./README.md)
