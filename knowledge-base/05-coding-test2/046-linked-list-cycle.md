# Linked List Cycle

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Floyd cycle detection (two pointers)
- **Inti masalah:** Deteksi apakah linked list memiliki siklus (node `next` kembali ke node sebelumnya di path).

---

- Soal: `hasCycle(head)` boolean.
- Input: head (posible null)
- Output: boolean
- Constraints utama: O(n) time, O(1) space — Floyd's tortoise & hare; alternative hash set O(n) space.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Fast/slow pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> `slow` maju 1 langkah, `fast` maju 2. Jika ada siklus, secara matematis fast akan «menyusul» slow di dalam loop. Jika `fast` atau `fast.next` null, tidak ada cycle. Jika `slow === fast` setelah start, cycle. **Mulai**: banyak implementasi mulai kedua dari head — saat `fast` selisih, periksa `while fast && fast.next`. Proof: dalam cycle dengan panjang L, gap mod L eventually 0.

Struktur cepat:
- Observasi inti masalah: Cycle equivalent to existence of node visited twice on traversal in linked structure.
- Strategi final yang dipilih: Floyd's cycle detection.
- Kenapa strategi ini paling cocok: O(1) memory vs hashing.
- Time complexity: O(n) — actually ≤ number steps bounded by cycle length entry analysis
- Space complexity: O(1)
- Edge case utama: empty list; single node self-loop; cycle not at head.

## 3) Versi Ultra Singkat (10-20 detik)

> Slow/fast; if meet inside traversal → cycle; fast reaches end → none.

## 4) Pseudocode Ringkas (5-10 baris)

```text
slow = fast = head
while fast and fast.next:
  slow = slow.next
  fast = fast.next.next
  if slow == fast: return true
return false
```

## 5) Implementasi Final (Inti Saja)

```js
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: In cyclic linked list, two pointers with speed ratio 2:1 eventually meet; in acyclic, fast reaches null.
- Kenapa semua kasus valid tercakup: Exhaustive movement until termination condition.
- Kenapa tidak ada kasus yang terlewat: Standard proof in computational number theory / linked list cycle detection.

## 7) Dry Run Singkat

- Cycle `3→2→0→-4→(back to 2)` meet.

## 8) Red Flags (Yang Harus Dihindari)

- Visited set if O(1) space required.
- Incorrect while condition causing null deref.

## 9) Follow-up yang Sering Muncul

- **Cycle start node** — phase 2 after meet: reset one to head, move both one step.

## 10) Trade-off Keputusan

- Floyd vs hashing — Floyd when space tight.

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
- Catatan perbaikan: Learn Part II (start of cycle).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Floyd cycle
- Inti masalah (1 kalimat): Detect cycle in linked list.
- Soal: Boolean.
- Strategi final: slow/fast pointers
- Kompleksitas: O(n), O(1)
- 2 edge case: null head; two nodes cycle
- 1 potensi bug: fast.next when fast null
- 1 alasan valid: Relative speed 2:1 catches cycle; acyclic ends at null
