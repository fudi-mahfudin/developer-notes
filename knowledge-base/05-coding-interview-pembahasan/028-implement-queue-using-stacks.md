# Implement Queue Using Stacks

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Stack, amortized analysis
- **Inti masalah:** FIFO dengan dua LIFO stacks — `push` ke stack input; `pop/peek` dari stack output, pindahkan saat perlu.

---

- Soal: `MyQueue`: `push`, `pop`, `peek`, `empty`.
- Input/Output: class API
- Constraints utama: Amortized O(1) per operasi.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Dual stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> `inStack` untuk enqueue (push); `outStack` untuk dequeue. Saat `pop`/`peek`, jika `outStack` kosong, **transfer** semua elemen dari `inStack` ke `outStack` (membalik urutan menjadi FIFO). Ini amortized O(1): setiap elemen dipindah paling sekali per «cycle». `empty` ⇔ kedua stack kosong.

Struktur cepat:
- Observasi inti masalah: Dua reverse sequential = queue order.
- Strategi final yang dipilih: input stack + output stack dengan lazy transfer.
- Kenapa strategi ini paling cocok: Simple proof & standard interview answer.
- Time complexity: Amortized O(1) per operation
- Space complexity: O(n) total elements
- Edge case utama: Banyak push lalu burst pop — transfer satu kali batch.

## 3) Versi Ultra Singkat (10-20 detik)

> Push in; pop from out; if out empty, pour all in→out.

## 4) Pseudocode Ringkas (5-10 baris)

```text
inStack, outStack
push(x): inStack.push(x)
moveIfNeeded():
  if outStack empty while inStack not empty: outStack.push(inStack.pop())
pop(): moveIfNeeded(); return outStack.pop()
peek(): moveIfNeeded(); return outStack.top
empty(): return inStack empty and outStack empty
```

## 5) Implementasi Final (Inti Saja)

```js
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  _pour() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop());
    }
  }
  push(x) {
    this.inStack.push(x);
  }
  pop() {
    this._pour();
    return this.outStack.pop();
  }
  peek() {
    this._pour();
    return this.outStack[this.outStack.length - 1];
  }
  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: `outStack` top selalu elemen paling depan queue saat `_pour` sudah dipanggil sebelum peek/pop.
- Kenapa semua kasus valid tercakup: Urutan FIFO preserved by reverse twice (in stack + transfer).
- Kenapa tidak ada kasus yang terlewat: Every element enters inStack, eventually moves to outStack exactly once before leaving.

## 7) Dry Run Singkat

- Push 1,2; peek→1; push 3; pop→1; peek→2.

## 8) Red Flags (Yang Harus Dihindari)

- Memindahkan bolak-balik setiap operasi — masih bisa benar tapi naik konstanta; harus lazy pour.
- O(n) worst-case per pop without amortized explanation.

## 9) Follow-up yang Sering Muncul

- Stack using two queues — reverse idea.
- Thread-safe queue — locks.

## 10) Trade-off Keputusan

- Lazy transfer vs always balanced — lazy wins amortized.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Sebutkan amortized analysis saat ditanya worst-case satu pop O(n).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Two stacks
- Inti masalah (1 kalimat): Queue dari dua stack.
- Soal: FIFO API.
- Strategi final: in/out lazy pour
- Kompleksitas: amortized O(1), O(n) space
- 2 edge case: empty pop (undefined—soal biasa tidak); many pushes
- 1 potensi bug: empty check hanya satu stack
- 1 alasan valid: reverse of reverse preserves queue order per batch
