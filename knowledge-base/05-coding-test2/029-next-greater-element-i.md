# Next Greater Element I

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Monotonic stack, hash map
- **Inti masalah:** Untuk tiap elemen di `nums1` (subset urutan dari `nums2`), berapa next greater di `nums2` kanan; jika tidak ada, -1.

---

- Soal: `nums1` unik subset values dari `nums2`; return jawaban alignment dengan `nums1`.
- Input: `nums1: number[]`, `nums2: number[]`
- Output: `number[]`
- Constraints utama: Satu pass `nums2` dengan decreasing stack O(n2 + m).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Monotonic stack + map

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bangun `map: value → next greater` dengan scan `nums2` pakai **stack monoton turun** (indices): saat elemen kini lebih besar dari `nums2[stack.top]`, itu next greater untuk semua yang di-pop. Sisanya -1. Lalu map tiap `nums1[i]`. O(n2 + m), O(n2) stack/map.

Struktur cepat:
- Observasi inti masalah: Classic next greater element on full array then query subset.
- Strategi final yang dipilih: NGE preprocessing + hash lookup for nums1 order.
- Kenapa strategi ini paling cocok: Linear in nums2 size; answers for nums1 are O(m).
- Time complexity: O(len(nums2) + len(nums1))
- Space complexity: O(len(nums2))
- Edge case utama: Tidak ada greater; nums1 length 1.

## 3) Versi Ultra Singkat (10-20 detik)

> Monotonic decreasing stack on nums2; when higher element seen, record answer for popped values; then map nums1.

## 4) Pseudocode Ringkas (5-10 baris)

```text
next = map default -1
stack = empty  // indices, nums2 values decreasing
for i in 0..len(nums2)-1:
  while stack not empty and nums2[i] > nums2[stack.top]:
    j = pop stack
    next[nums2[j]] = nums2[i]
  push i
return nums1.map(x => next[x])
```

## 5) Implementasi Final (Inti Saja)

```js
function nextGreaterElement(nums1, nums2) {
  const map = new Map();
  const st = [];
  for (let i = 0; i < nums2.length; i++) {
    while (st.length && nums2[i] > nums2[st[st.length - 1]]) {
      const j = st.pop();
      map.set(nums2[j], nums2[i]);
    }
    st.push(i);
  }
  return nums1.map((x) => (map.has(x) ? map.get(x) : -1));
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: First element to the right larger than popped value is current `nums2[i]` when condition triggers — earliest by scan order.
- Kenapa semua kasus valid tercakup: Every nums2 index pushed and eventually popped or remains → no NGE.
- Kenapa tidak ada kasus yang terlewat: nums1 values guaranteed in nums2 (distinct) in LC version.

## 7) Dry Run Singkat

- `nums1=[4,1,2]`, `nums2=[1,3,4,2]` → `[-1,3,-1]` (verify LC).

## 8) Red Flags (Yang Harus Dihindari)

- O(m×n) scan per query tanpa preprocessing for large nums2.
- Brute nested loops when stack exists.

## 9) Follow-up yang Sering Muncul

- Next Greater Element II circular — duplicate array or two pass.
- Next greater frequency — harder.

## 10) Trade-off Keputusan

- Stack vs forward scan brute — stack wins.

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
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Jika duplicates allowed in nums2, adjust uniqueness handling.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Monotonic stack, hash map
- Inti masalah (1 kalimat): Next greater for subset queries.
- Soal: Array parallel to nums1.
- Strategi final: NGE map from nums2
- Kompleksitas: O(n2+m), O(n2)
- 2 edge case: no greater; first element largest
- 1 potensi bug: confusing increasing vs decreasing stack
- 1 alasan valid: First resolving collision from left gives nearest NGE
