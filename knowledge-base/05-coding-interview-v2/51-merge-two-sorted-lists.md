# Topik 51 — Merge Two Sorted Linked Lists

Menggabungkan dua sorted linked list menjadi satu sorted list—mirip merge step merge sort. Gunakan **dummy node** untuk menyederhanakan edge head, iterasi membandingkan `l1.val` vs `l2.val`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pointer `cur` menempel pada tail hasil; pilih node lebih kecil, majukan pointer list yang dipilih, lanjut sampai salah satu habis, lalu sambungkan sisa. Kompleksitas O(n+m) waktu, O(1) ruang tambahan (reuse node). Rekursi memakai O(n+m) stack.

---

## 2. Mengapa topik ini keluar di interview

- Subroutine untuk merge k sorted lists (heap/divide conquer).
- Latihan pointer dasar.

---

## 3. Implementasi dummy head

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return dummy.next;
}
```

---

## 4. Kompleksitas

O(n+m) time, O(1) extra.

---

## 5. Pitfall: lupa sambung sisa

Baris `cur.next = l1 || l2`.

---

## 6. Pitfall: membandingkan setelah null

Loop `while (l1 && l2)`.

---

## 7. Variasi: merge k lists

Min-heap of heads O(N log k)—topik terpisah.

---

## 8. Pola interview

Sebutkan dummy node untuk menghindari kasus khusus head.

---

## 9. Latihan

Gabungkan `[1,3,5]` dan `[2,4,6]`.

---

## 10. Checklist

- [ ] Dummy head.
- [ ] Attach sisa.
- [ ] Tahu kompleksitas linear.

---

## 11. Referensi

Merge routine merge sort pada linked list.

---

## 12. Anti-pattern

Konversi ke array sort O(N log N)—tidak diminta.

---

## 13. Flashcard

- **Dummy:** simplify insertion.

---

## 14. Latihan tulis

Versi rekursif `merge(l1,l2)`.

---

## 15. Testing

Property: merged sorted invariant.

---

## 16. Penutup

Merge dua list adalah blok bangunan merge sort linked list.

---

## 17. Tambahan: sort linked list

O(n log n) dengan merge sort—gunakan mergeTwoLists.

---

## 18. Tambahan: descending

Balik komparator atau reverse akhir.

---

## 19. Kompleksitas memori

Tidak mengalokasi node baru jika reuse.

---

## 20. Rangkuman

Bandingkan heads, sambung lebih kecil, sisa tempel.

---

## 21. Soal terkait

Merge sorted array dengan extra space di akhir—dua pointer dari ujung.

---

## 22. Edge: salah satu null

Return yang lain.

---

## 23. Edge: keduanya null

Null.

---

## 24. Drill

Trace manual 3+3 node.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

Generic value type.

---

## 27. Debugging

Print traversal hasil.

---

## 28. Stability

Merge stabil jika `<=` pada tie—penting untuk beberapa konteks.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi ascending vs non-decreasing.

---

Dokumen ini melengkapi merge dua list terurut sebagai pola dasar penggabungan.
