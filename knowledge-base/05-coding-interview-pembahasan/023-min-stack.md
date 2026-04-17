# Min Stack

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Stack, auxiliary min tracking
- **Inti masalah:** Stack dengan `push`, `pop`, `top`, dan `getMin` dalam O(1) waktu amortized per operasi.

---

- Soal: Design struktur data stack bilangan dengan `getMin()`.
- Input: Operasi interatif (method calls)
- Output: Sesuai method
- Constraints utama: O(1) per operasi; duplikat nilai boleh.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Dual stack atau stack pair (value, current min)

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk menjaga min dalam O(1), simpan paralel stack `minStack` yang top adalah minimum elemen di stack utama hingga saat ini. Pada `push(x)`, `minStack.push(min(x, minStack.top atau x))`. Pada `pop()`, pop kedua stack. `getMin` = `minStack.top`. Alternatif: simpan tuples `(val, minSoFar)` atau hanya push ke min stack jika `x ≤ currentMin` untuk hemat memori (perlu hati-hati saat pop). O(1) per op, O(n) ruang worst case.

Struktur cepat:
- Observasi inti masalah: Min global saat ini hanya bergantung pada history minimum prefix.
- Strategi final yang dipilih: Secondary stack menyimpan running minimum.
- Kenapa strategi ini paling cocok: Update O(1) terstruktur.
- Time complexity: O(1) per operation
- Space complexity: O(n) untuk duplicate min stack (varian optimised bisa lebih hemat tetapi lebih rumit penjelasan)
- Edge case utama: Push duplicate min; pop sampai min berubah.

## 3) Versi Ultra Singkat (10-20 detik)

> Stack kedua mirrors current minimum; push min baru, pop sinkron.

## 4) Pseudocode Ringkas (5-10 baris)

```text
stack = []
minStack = []
push(x):
  stack.push(x)
  minStack.push(min(x, minStack.top if minStack else x))
pop(): stack.pop(); minStack.pop()
top(): return stack.top
getMin(): return minStack.top
```

## 5) Implementasi Final (Inti Saja)

```js
class MinStack {
  constructor() {
    this.st = [];
    this.mn = [];
  }
  push(val) {
    this.st.push(val);
    const curMin = this.mn.length === 0 ? val : Math.min(val, this.mn[this.mn.length - 1]);
    this.mn.push(curMin);
  }
  pop() {
    this.st.pop();
    this.mn.pop();
  }
  top() {
    return this.st[this.st.length - 1];
  }
  getMin() {
    return this.mn[this.mn.length - 1];
  }
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Setelah setiap operasi, `mn` top menyimpan minimum exact dari elemen yang masih di `st`.
- Kenapa semua kasus valid tercakup: `push` update running min; `pop` menghapus elemen bersamaan dengan snapshot min untuk prefix yang tersisa.
- Kenapa tidak ada kasus yang terlewat: Histori min tersimpan sebagaimana stack.

## 7) Dry Run Singkat

- Kasus normal: push 0, push 1, push 0; getMin, pop, getMin → 0 lalu 0.
- Kasus edge: monoton naik — min stack is plateau of same min at bottom.
- Hasil: getMin konsisten.

## 8) Red Flags (Yang Harus Dihindari)

- Rescan stack untuk min — O(n).
- Varian optimasi pop salah ketika duplicate min dihapus (perlu push count atau full min stack).

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Push ke min stack hanya saat `x <= min`; saat pop, jika `pop()==min` pop min stack (handle duplicate dengan count).
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Max stack simetris.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Queue dengan min — harder (deque monotonic).

## 10) Trade-off Keputusan

- Opsi A: Dual stack min mirror — mudah dibuktikan.
- Opsi B: Single stack node `(val, minSoFar)` — sama saja konseptual.
- Kenapa memilih opsi final: Jelas saat interview.
- Risiko dari opsi final: Memori 2n vs optimised.
- Mitigasi: Sebutkan optimasi push-rare min stack.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih varian hemat memori dengan counts.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Stack, design
- Inti masalah (1 kalimat): Min elemen stack dengan O(1).
- Soal: ADT MinStack.
- Strategi final: Auxiliary min stack
- Kompleksitas: O(1) ops, O(n) space
- 2 edge case: duplicate values; pop until empty
- 1 potensi bug: min stack out of sync
- 1 alasan solusi ini valid: Running min invariant per depth
