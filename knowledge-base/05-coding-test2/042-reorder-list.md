# Reorder List

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Linked list: slow-fast, reverse, merge
- **Inti masalah:** Susun `L0→L1→…→Ln-1` menjadi `L0→Ln→L1→Ln-1→…` **in-place**.

---

- Soal: `reorderList(head)` mutates in-place.
- Input: head singleton LL
- Output: void / return head per signature
- Constraints utama: O(n) time, O(1) extra if careful (reverse in-place).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Find middle, reverse second half, interleave

## 2) Jawaban Ideal Singkat (30-60 detik)

> **(1)** Slow-fast pointers: `slow`, `fast` dengan `fast.next.next`; putus di slow — second half dimulai `slow.next`. **(2)** Reverse second half seperti soal reverse list. **(3)** Merge dua list: `a = head`, `b` reversed head; while `b`: `tmp=a.next`, `a.next=b`, `b=b.next`, `a.next.next=tmp`, `a=tmp`. Untuk panjang genap/ganjil, slow berada di node sebelum half kanan (pastikan split dengan benar). O(n), O(1).

Struktur cepat:
- Observasi inti masalah: Reordering alternatif = first half + reversed second half zip.
- Strategi final yang dipilih: Middle + reverse + merge.
- Kenapa strategi ini paling cocok: Each substage linear constant space.
- Time complexity: O(n)
- Space complexity: O(1) pointers only
- Edge case utama: length ≤2; middle split off-by-one.

## 3) Versi Ultra Singkat (10-20 detik)

> Cut at middle, reverse tail, interleave two lists.

## 4) Pseudocode Ringkas (5-10 baris)

```text
slow, fast = head, head
while fast and fast.next:
  slow = slow.next; fast = fast.next.next
second = reverse(slow.next)
slow.next = null
merge(head, second)
```

## 5) Implementasi Final (Inti Saja)

```js
function reorderList(head) {
  if (!head || !head.next) return;
  let slow = head,
    fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let second = slow.next;
  slow.next = null;
  second = reverse(second);
  let first = head;
  while (second) {
    const t1 = first.next,
      t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
}
function reverse(head) {
  let prev = null,
    cur = head;
  while (cur) {
    const n = cur.next;
    cur.next = prev;
    prev = cur;
    cur = n;
  }
  return prev;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Reversed tail produces correct pairing order Ln, Ln-1… for zipper with prefix 0..k.
- Kenapa semua kasus valid tercakup: Second half length differs by at most one — merge loop handles leftover first segment.
- Kenapa tidak ada kasus yang terlewat: Exhaustive interleaving until second exhausted.

## 7) Dry Run Singkat

- `1→2→3→4` → `1→4→2→3`; `1…5` similar.

## 8) Red Flags (Yang Harus Dihindari)

- Array copy then rebuild — violates in-place O(1) if not allowed.
- Wrong middle when breaking links (cycle).

## 9) Follow-up yang Sering Muncul

- Palindrome linked list — same reverse half trick.

## 10) Trade-off Keputusan

- Stack of nodes O(n) ok but reverse O(1) leaner.

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Practice split variants for even/odd lengths.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: LL three-step
- Inti masalah (1 kalimat): L0 Ln L1 Ln-1 …
- Soal: reorder in-place
- Strategi final: middle + reverse second + weave
- Kompleksitas: O(n), O(1)
- 2 edge case: 1-2 nodes; odd len
- 1 potensi bug: forget nullify slow.next
- 1 alasan valid: Zip matches interleaving two half sequences
