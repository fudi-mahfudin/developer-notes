# Topik 45 — Queue Menggunakan Dua Stack

Antrian FIFO bisa diimplementasikan dengan **dua stack** `in` dan `out`. Operasi `enqueue` push ke `in`; `dequeue` pop dari `out`, dan jika `out` kosong, **pindahkan seluruh** `in` ke `out` (pop `in` push `out`). Amortized O(1) per operasi.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Intuisi: stack membalik urutan; dua stack membalik dua kali sehingga urutan FIFO pulih. Biaya memindahkan elemen terjadi sporadis tetapi rata-rata tetap konstan karena setiap elemen pindah paling banyak sekali dari `in` ke `out`. Ini contoh **amortized analysis** klasik.

---

## 2. Mengapa topik ini keluar di interview

- Implement My Queue dengan stack saja.
- Menjelaskan amortized complexity.

---

## 3. Implementasi

```javascript
class QueueStacks {
  constructor() {
    this.in = [];
    this.out = [];
  }
  enqueue(x) {
    this.in.push(x);
  }
  dequeue() {
    if (this.out.length === 0) {
      while (this.in.length) this.out.push(this.in.pop());
    }
    return this.out.pop();
  }
  peek() {
    if (this.out.length === 0) {
      while (this.in.length) this.out.push(this.in.pop());
    }
    return this.out[this.out.length - 1];
  }
}
```

---

## 4. Kompleksitas

- Amortized O(1) enqueue/dequeue.
- Worst-case satu operasi bisa O(n) saat transfer—jelaskan amortized.

---

## 5. Pitfall: peek tanpa transfer

Harus sama seperti dequeue untuk mengisi `out`.

---

## 6. Pitfall: empty queue

Return `undefined` atau throw—sesuai kontrak.

---

## 7. Pola interview

Jelaskan “lazy transfer” dari `in` ke `out`.

---

## 8. Latihan

Hitung total pushes/pops untuk pola enqueue/dequeue bergantian.

---

## 9. Checklist

- [ ] Transfer saat `out` kosong.
- [ ] Amortized analysis argument.
- [ ] Tahu worst-case sekali O(n).

---

## 10. Referensi

Okasaki functional queues; CLRS amortized analysis.

---

## 11. Anti-pattern

Memindahkan elemen setiap enqueue—tidak perlu.

---

## 12. Flashcard

- **in stack:** enqueue side.
- **out stack:** dequeue side.

---

## 13. Latihan tulis

Tambahkan `size()` akurat tanpa memindahkan lebih dari perlu.

---

## 14. Testing

Random operasi bandingkan dengan `Array` queue referensi.

---

## 15. Penutup

Struktur sederhana tetapi menguji pemahaman amortized.

---

## 16. Tambahan: stack dengan linked list

Alternatif implementasi queue O(1) worst-case—beda soal.

---

## 17. Tambahan: persistent queue

Functional—advanced.

---

## 18. Kompleksitas memori

O(n) total elemen tersebar dua stack.

---

## 19. Rangkuman

Dua stack merekonstruksi FIFO dengan transfer lazy.

---

## 20. Soal terkait

Implement stack using two queues—dualitas latihan.

---

## 21. Edge: banyak enqueue tanpa dequeue

Semua di `in`.

---

## 22. Edge: dequeue sampai kosong

Kedua stack kosong.

---

## 23. Drill

Simulasikan 5 operasi campuran.

---

## 24. Performa

Praktis cepat untuk banyak operasi.

---

## 25. Integrasi TypeScript

Generik `QueueStacks<T>`.

---

## 26. Debugging

Log `in` dan `out` setelah operasi.

---

## 27. Concurrency

Butuh locking jika multi-thread—bukan JS murni.

---

## 28. Iterasi

Tidak natural—bukan tujuan struktur ini.

---

## 29. Micro-opts

`while (this.in.length)` lebih cepat daripada `>0`? minor.

---

## 30. Etika wawancara

Jika ditanya worst-case, jawab jujur O(n) untuk satu dequeue, amortized O(1).

---

Dokumen ini melengkapi pola klasik “queue from stacks” dengan argumen amortized yang rapi.
