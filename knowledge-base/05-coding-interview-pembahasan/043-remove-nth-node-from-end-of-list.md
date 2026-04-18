# Remove Nth Node From End of List

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Linked list two pointers
- **Inti masalah:** Hapus node ke-n dari belakang dalam satu pass (atau dua pointer dengan jarak `n`).

---

- Soal: `removeNthFromEnd(head, n)` n valid.
- Input: head, integer n (1-indexed from end)
- Output: new head (possibly changed if remove first)
- Constraints utama: One pass: fast advances n steps first then move both.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Dummy + gap two pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dummy.next = head` untuk handle hapus head. `fast` jalan `n` langkah dari dummy (atau `n+1` depending template — **konsisten**). Lalu `slow` dan `fast` bersamaan sampai `fast.next === null` (fast di tail). `slow.next = slow.next.next`. Return `dummy.next`. Jarak antara slow dan node target = n. O(L) satu pass, O(1).

Struktur cepat:
- Observasi inti masalah: Node before removal is `n+1` steps from start sentinel when fast at end.
- Strategi final yang dipilih: Dummy + two pointers with gap n.
- Kenapa strategi ini paling cocok: One pass linear.
- Time complexity: O(L)
- Space complexity: O(1)
- Edge case utama: Remove first node; remove last; single node.

## 3) Versi Ultra Singkat (10-20 detik)

> Dummy node; fast n ahead; advance together; unlink node after slow.

## 4) Pseudocode Ringkas (5-10 baris)

```text
dummy = new ListNode(0); dummy.next = head
slow = fast = dummy
for i in 0..n: fast = fast.next   // create gap n+1 if needed
while fast.next != null:
  slow = slow.next; fast = fast.next
slow.next = slow.next.next
return dummy.next
```

## 5) Implementasi Final (Inti Saja)

```js
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy,
    slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}
```

*(Catatan: loop `i < n` vs `i <= n` menentukan apakah slow stop sebelum node target — set sesuai implementasi: di atas fast mulai n+1 steps sehingga slow sebelum remove.)*

Adjust: Standard pattern - move fast n steps from head (not dummy), then both until fast.next null - then slow.next skips.

Let me verify the code:
Standard:
```
dummy -> head
slow = fast = dummy
for (0 to n) fast = fast.next  // n+1 moves from dummy puts fast n+1 after dummy
while fast:
  slow = slow.next; fast = fast.next
slow.next = slow.next.next
```
When for runs n+1 times? Actually `for (let i = 0; i < n; i++)` moves fast n steps from dummy - then slow stops before node to delete if we want node before removed.

LC typical:
```
fast = head
for i in 0..n-1: fast = fast.next
slow = dummy
while fast:
  slow = slow.next
  fast = fast.next
slow.next = slow.next.next
```

I'll fix Section 5 to match the bullet-proof pattern:

```js
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = head;
  for (let i = 0; i < n; i++) fast = fast.next;
  let slow = dummy;
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}
```

I'll update the file with this version and fix pseudocode section 4 for consistency.
</think>


<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace