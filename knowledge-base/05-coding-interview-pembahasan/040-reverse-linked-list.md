# Reverse Linked List

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Linked list pointer reversal
- **Inti masalah:** Balik arah semua `next` sehingga head lama jadi ekor.

---

- Soal: `reverseList(head)` return new head.
- Input: `head` of singly linked list (possibly null)
- Output: new head after reverse
- Constraints utama: O(n) time, O(1) space iterative.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Three pointers / recursion

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iteratif: `prev = null`, `cur = head`. Loop: `next = cur.next`, `cur.next = prev`, `prev = cur`, `cur = next`. Akhir `prev` adalah head baru. Rekursif alternatif: `reverse(head.next)` lalu relink — O(n) stack space. Untuk interview, iterative preferred.

Struktur cepat:
- Observasi inti masalah: Reverse edge-by-edge preserves rest untouched until processed.
- Strategi final yang dipilih: Iterative reversal with three pointers.
- Kenapa strategi ini paling cocok: O(1) extra space, clear invariant.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: empty list; singleton.

## 3) Versi Ultra Singkat (10-20 detik)

> Flip links: always stash next before rewiring.

## 4) Pseudocode Ringkas (5-10 baris)

```text
prev = null
cur = head
while cur != null:
  next = cur.next
  cur.next = prev
  prev = cur
  cur = next
return prev
```

## 5) Implementasi Final (Inti Saja)

```js
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: After processing `cur`, all nodes before `prev` are reversed; `prev` is head of reversed prefix.
- Kenapa semua kasus valid tercakup: Each node visited once; final `prev` is old tail becomes new head.
- Kenapa tidak ada kasus yang terlewat: Reach null `cur` ends.

## 7) Dry Run Singkat

- `1→2→3→null` → `3→2→1→null`.

## 8) Red Flags (Yang Harus Dihindari)

- Losing `next` reference before assignment.
- Returning `cur` instead of `prev` after loop.

## 9) Follow-up yang Sering Muncul

- Reverse k-group — add counting.
- Reverse sublist between positions.

## 10) Trade-off Keputusan

- Iter vs recursive — space vs simplicity.

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
- Kejelasan penjelasan: 10/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: None core.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Linked list
- Inti masalah (1 kalimat): Reverse singly linked list in-place.
- Soal: New head.
- Strategi final: Three-pointer iterative
- Kompleksitas: O(n), O(1)
- 2 edge case: null; single node
- 1 potensi bug: lose next reference
- 1 alasan valid: Pointer rewiring preserves tail chunk until visited
