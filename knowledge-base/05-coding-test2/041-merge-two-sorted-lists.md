# Merge Two Sorted Lists

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Linked list merge
- **Inti masalah:** Dua linked list terurut naik; gabung jadi satu terurut **in-place** (reuse node, bukan buat array baru).

---

- Soal: `mergeTwoLists(list1, list2)` return head merged sorted.
- Input: dua heads (nullable)
- Output: head merged
- Constraints utama: O(n+m) time, O(1) extra (pointer only).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Dummy head + two pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dummy` node; `tail = dummy`. While both lists: sambung node dengan `val` lebih kecil, majukan pointer itu. Sisanya attach list tidak habis. Return `dummy.next`. Recursive variant: compare heads, recurse — O(n+m) stack. Dummy node menghindari edge case menentukan head nyata.

Struktur cepat:
- Observasi inti masalah: Merge seperti merge step merge-sort pada linked lists.
- Strategi final yang dipilih: Iterative with sentinel dummy.
- Kenapa strategi ini paling cocok: Clean head handling.
- Time complexity: O(n+m)
- Space complexity: O(1)
- Edge case utama: Salah satu null; both null.

## 3) Versi Ultra Singkat (10-20 detik)

> Dummy tail; repeatedly pick smaller head; append remainder.

## 4) Pseudocode Ringkas (5-10 baris)

```text
dummy = new ListNode(0)
tail = dummy
while list1 and list2:
  if list1.val <= list2.val: tail.next = list1; list1 = list1.next
  else: tail.next = list2; list2 = list2.next
  tail = tail.next
tail.next = list1 or list2
return dummy.next
```

## 5) Implementasi Final (Inti Saja)

```js
function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: `tail` always at end of merged sorted prefix containing exactly next nodes from input lists in order.
- Kenapa semua kasus valid tercakup: Each node appended once; ordering by comparison guarantees global sort when inputs sorted.
- Kenapa tidak ada kasus yang terlewat: Remainder attach covers tails.

## 7) Dry Run Singkat

- `1→2→4` + `1→3→4` → `1→1→2→3→4→4`.

## 8) Red Flags (Yang Harus Dihindari)

- Allocating new nodes unnecessarily.
- Losing reference without linking remainder.

## 9) Follow-up yang Sering Muncul

- Merge k lists — heap or divide conquer.

## 10) Trade-off Keputusan

- Dummy vs pick head first — dummy reduces branching.

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
- Catatan perbaikan: Use real `ListNode` class if provided.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Merge lists
- Inti masalah (1 kalimat): Merge two sorted linked lists.
- Soal: Head merged.
- Strategi final: Dummy + two pointers
- Kompleksitas: O(n+m), O(1)
- 2 edge case: one empty; both empty
- 1 potensi bug: not advancing tail
- 1 alasan valid: merge sort merge step correctness
