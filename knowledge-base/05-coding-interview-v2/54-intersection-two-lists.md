# Topik 54 — Intersection of Two Linked Lists

Dua linked list **mungkin berbagi suffix** mulai dari node tertentu. Cari node intersect pertama—bukan nilai sama, tapi **referensi node sama**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Hitung panjang kedua list; geser pointer pada list lebih panjang sebesar selisih panjang sehingga sisa panjang sama; majukan bersamaan sampai pointer sama—itu intersection (atau null). Kompleksitas O(A+B) waktu, O(1) ruang. Alternatif: hash set node reference dari list pertama, scan kedua—O(A) memori.

---

## 2. Mengapa topik ini keluar di interview

- Pointer alignment; menguji kesadaran equality by reference.

---

## 3. Implementasi panjang + align

```javascript
function getIntersectionNode(headA, headB) {
  let lenA = 0,
    lenB = 0;
  for (let p = headA; p; p = p.next) lenA++;
  for (let p = headB; p; p = p.next) lenB++;
  let a = headA,
    b = headB;
  if (lenA > lenB) for (let i = 0; i < lenA - lenB; i++) a = a.next;
  else for (let i = 0; i < lenB - lenA; i++) b = b.next;
  while (a !== b) {
    a = a.next;
    b = b.next;
  }
  return a;
}
```

---

## 4. Trik elegan: sambung list

Traverse `a` lalu `b`, dan `b` lalu `a`—bertemu di intersection atau null setelah `lenA+lenB` langkah—tanpa hitung panjang eksplisit.

---

## 5. Kompleksitas

O(A+B) waktu, O(1) ruang untuk kedua pendekatan di atas.

---

## 6. Pitfall: nilai sama node berbeda

Bukan intersection—harus referensi sama.

---

## 7. Pitfall: tidak ada intersection

Keduanya null di akhir—return null.

---

## 8. Pola interview

Jelaskan alignment panjang atau trik dua pointer swap.

---

## 9. Latihan

Buat list berbagi suffix manual, uji.

---

## 10. Checklist

- [ ] Equality referensi.
- [ ] Handle tidak ada intersection.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Pointer intersection by length normalization.

---

## 12. Anti-pattern

Bandingkan nilai array hasil traversal—salah jika nilai duplikat.

---

## 13. Flashcard

- **Intersection:** node sama.

---

## 14. Latihan tulis

Versi dengan `Set` untuk membandingkan kompleksitas memori.

---

## 15. Testing

Kasus tidak berbagi, berbagi di tengah, berbagi di awal (satu list prefix).

---

## 16. Penutup

Alignment panjang adalah cara paling jelas di whiteboard.

---

## 17. Tambahan: potong cycle

Jika ada cycle, soal biasanya berbeda—pastikan asumsi acyclic.

---

## 18. Tambahan: count nodes after intersection

Selisih panjang tetap sama dengan suffix.

---

## 19. Kompleksitas memori

O(1) untuk optimal.

---

## 20. Rangkuman

Samakan sisa panjang lalu jalan bersamaan; atau trik traverse ganda.

---

## 21. Soal terkait

Hapus nth—beda.

---

## 22. Edge: salah satu null

Tidak ada intersection.

---

## 23. Edge: intersection di head list kedua

Tetap valid.

---

## 24. Drill

Trace panjang 5 dan 6 dengan suffix 3.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

`ListNode | null`.

---

## 27. Debugging

Cetak alamat node (tidak langsung di JS) — gunakan counter dummy id.

---

## 28. Memori

Tidak duplikasi node.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi definisi intersection by reference.

---

Dokumen ini memperjelas intersection linked list sebagai masalah penyelarasan pointer, bukan nilai.
