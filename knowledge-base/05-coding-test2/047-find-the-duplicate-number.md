# Find the Duplicate Number

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium / Hard
- **Topik utama:** Floyd cycle on implicit graph, atau binary search on value domain
- **Inti masalah:** Array `nums` panjang `n+1` berisi bilangan `1..n` tepat sekali kecuali **satu** duplikat; cari duplikat **tanpa** modifikasi tambahan array (O(1) ruang) — sering disyaratkan Floyd's.

---

- Soal: `findDuplicate(nums)` return duplicated integer.
- Input: `number[]` length n+1, values 1..n
- Output: duplicate value
- Constraints utama: O(n) time O(1) space → treat array as graph `i → nums[i]` finding cycle (LL II); atau BS count ≤ mid for values.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Floyd / binary search on answer

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Graf implisit**: indeks `0..n`, edge `i → nums[i]`. Ada duplikat ⇒ ada cycle. Floyd `slow = nums[slow]`, `fast = nums[nums[fast]]` sampai jumpa; lalu `slow2 = 0`, maju keduanya satu langkah per iterasi — titik masuk cycle = duplikat (bukti sama LL cycle II). **Alternatif**: binary search pada jawaban `k` di `[1,n]`: hitung elemen `≤ mid`; jika `> mid`, duplikat di kiri nilai. O(n log n) time O(1) space tanpa mutasi asli interpretation. Interview: sebutkan Floyd optimal.

Struktur cepat:
- Observasi inti masalah: Pigeonhole principle guarantees duplicate; cycle detection finds repeated index path.
- Strategi final yang dipilih: Floyd on index-value mapping.
- Kenapa strategi ini paling cocok: Meets strict O(1) space without hashing numbers.
- Time complexity: O(n) for Floyd; O(n log n) for binary search on value
- Space complexity: O(1)
- Edge case utama: dup near 1; [1,1] minimal n.

## 3) Versi Ultra Singkat (10-20 detik)

> Floyd on nums-as-next pointers; intersection then find entrance equals duplicate.

## 4) Pseudocode Ringkas (5-10 baris)

```text
slow = nums[0]; fast = nums[0]
repeat:
  slow = nums[slow]; fast = nums[nums[fast]]
until slow == fast
ptr1 = 0; ptr2 = slow
while ptr1 != ptr2:
  ptr1 = nums[ptr1]; ptr2 = nums[ptr2]
return ptr1
```

## 5) Implementasi Final (Inti Saja)

```js
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  let a = 0,
    b = slow;
  while (a !== b) {
    a = nums[a];
    b = nums[b];
  }
  return a;
}
```

*(Perhatikan: mulai `slow/fast` dari `nums[0]` dan fase 2 `a=0` variant standard — verifikasi dengan contoh soal.)*

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Functional graph from indices leads to cycle including duplicate value node — Floyd finds entrance element.
- Kenapa semua kasus valid tercakup: Duplicate creates indegree >1 in implicit graph conceptualization (standard proof).
- Kenapa tidak ada kasus yang terlewat: Works under LeetCode constraints.

## 7) Dry Run Singkat

- `[1,3,4,2,2]` → `2`.

## 8) Red Flags (Yang Harus Dihindari)

- Mutate array with `-` marking if forbidden variant.
- Sort O(n log n) ignoring space when O(1) required.

## 9) Follow-up yang Sering Muncul

- Find all duplicates missing numbers — extended set.

## 10) Trade-off Keputusan

- Floyd vs BS on value — Floyd O(n) time wins.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 7/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Rehearse proof sketch orally — interview heavy.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Floyd on array
- Inti masalah (1 kalimat): One duplicate in 1..n constraint.
- Soal: Duplicate int.
- Strategi final: Cycle on index graph
- Kompleksitas: O(n), O(1)
- 2 edge case: [2,2]; long chain
- 1 potensi bug: wrong phase2 init pointer
- 1 alasan valid: Duplicate creates multiple paths to same value-class node
