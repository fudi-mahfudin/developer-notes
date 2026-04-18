# Topik 49 — Reverse Linked List

Membalikkan pointer `next` pada singly linked list sehingga head menjadi tail. Versi iteratif memakai tiga pointer `prev, cur, next`. Versi rekursif mengembalikan head baru dan mengatur pointer secara pasca-DFS.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Iteratif: `prev=null`, `cur=head`, ulangi `next=cur.next; cur.next=prev; prev=cur; cur=next` sampai `cur` null; `prev` adalah head baru. Kompleksitas O(n) waktu, O(1) ruang tambahan. Rekursi O(n) stack. Soal sering meminta reverse sebagian `[m,n]` atau reverse k-group—variasi pointer tambahan.

---

## 2. Mengapa topik ini keluar di interview

- Fundamental manipulasi pointer; sering jadi subtugas.

---

## 3. Implementasi iteratif

```javascript
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
```

---

## 4. Kompleksitas

O(n) waktu, O(1) extra space iteratif.

---

## 5. Pitfall: kehilangan `next`

Simpan `nxt` sebelum overwrite `cur.next`.

---

## 6. Pitfall: cycle tidak disengaja

Pastikan tidak mengarah balik node dua kali tanpa sengaja.

---

## 7. Variasi: reverse k-group

Rekursi/loop dengan counter grup.

---

## 8. Pola interview

Ucapkan tiga pointer dan urutan assignment.

---

## 9. Latihan

Reverse bagian dari indeks m ke n dalam satu pass? butuh extra steps.

---

## 10. Checklist

- [ ] Simpan next sebelum mutasi.
- [ ] Return head baru.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Pointer reversal klasik.

---

## 12. Anti-pattern

Menyalin nilai node array—bukan linked list asli jika diminta pointer.

---

## 13. Flashcard

- **prev/cur/nxt:** trio.

---

## 14. Latihan tulis

Versi rekursif `reverse(cur)` yang mengembalikan newHead.

---

## 15. Testing

Bandingkan traversal output dengan array reversed.

---

## 16. Penutup

Reverse adalah gerbang ke banyak soal list.

---

## 17. Tambahan: doubly linked list

Tukar `prev` dan `next` simetris.

---

## 18. Tambahan: big list

Iteratif untuk menghindari stack overflow.

---

## 19. Kompleksitas memori rekursi

O(n) stack—hindari jika n besar.

---

## 20. Rangkuman

Tiga pointer, jangan lewatkan `next` asli.

---

## 21. Soal terkait

Palindrome linked list—reverse setengah.

---

## 22. Edge: null head

Return null.

---

## 23. Edge: satu node

Tetap valid.

---

## 24. Drill

Gambar pointer sebelum/sesudah untuk tiga node.

---

## 25. Performa

Satu pass.

---

## 26. Integrasi TypeScript

`ListNode` definisi `{val, next}`.

---

## 27. Debugging

Cetak traversal setelah reverse.

---

## 28. Immutable

Jika perlu immutable struktur—buat node baru (jarang).

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi apakah perlu reverse in-place atau buat list baru.

---

Dokumen ini memastikan Anda bisa membalik linked list tanpa kehilangan node.
