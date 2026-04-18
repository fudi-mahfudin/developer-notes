# Topik 52 — Middle of Linked List

Menemukan **middle node** untuk list panjang tidak diketahui: gunakan **slow/fast** pointer—`slow` maju 1, `fast` maju 2. Saat `fast` mencapai akhir, `slow` berada di tengah (definisi tengah untuk genap bisa node kedua atau pertama—perjelas soal).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Jika `fast` berakhir di `null` (panjang genap), `slow` pada middle kedua untuk pola umum LeetCode. Jika ingin middle pertama, modifikasi kondisi loop. Kompleksitas O(n) waktu, O(1) ruang. Alternatif: hitung panjang lalu jalan `n/2`—dua pass.

---

## 2. Mengapa topik ini keluar di interview

- Subroutine untuk palindrome linked list, reorder list.
- Kontras dengan menyimpan array.

---

## 3. Implementasi

```javascript
function middleNode(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

---

## 4. Kompleksitas

O(n) time, O(1) space.

---

## 5. Pitfall: definisi middle genap

Soal bisa minta first middle—gunakan `while (fast.next && fast.next.next)`.

---

## 6. Pitfall: fast null

Cek `fast && fast.next`.

---

## 7. Pola interview

Jelaskan dua kecepatan dan terminasi.

---

## 8. Latihan

List genap 4 node—tentukan middle sesuai dua definisi.

---

## 9. Checklist

- [ ] Kondisi while untuk definisi middle.
- [ ] Null checks.
- [ ] Tahu satu pass.

---

## 10. Referensi

Tortoise-hare tanpa cycle.

---

## 11. Anti-pattern

Konversi ke array O(n) memori.

---

## 12. Flashcard

- **Slow/fast:** middle finder.

---

## 13. Latihan tulis

Fungsi return index middle 0-based jika array—beda struktur.

---

## 14. Testing

Random list, bandingkan dengan length count.

---

## 15. Penutup

Middle pointer sering dipasangkan dengan reverse half untuk palindrome.

---

## 16. Tambahan: doubly linked list

Sama dengan slow/fast.

---

## 17. Tambahan: circular list

Definisi middle ambigu—hindari asumsi.

---

## 18. Kompleksitas konstan

Satu pass optimal.

---

## 19. Rangkuman

Pilih kondisi loop sesuai definisi middle genap.

---

## 20. Soal terkait

Delete middle node—perlu prev pointer.

---

## 21. Edge: null

Null.

---

## 22. Edge: satu node

Middle adalah node itu.

---

## 23. Drill

Trace 5 node vs 6 node.

---

## 24. Performa

Linear.

---

## 25. Integrasi TypeScript

Return `ListNode | null`.

---

## 26. Debugging

Cetak nilai slow setiap iterasi.

---

## 27. Memori

Tidak alokasi baru.

---

## 28. Parallel

Tidak relevan.

---

## 29. Variasi: kth from end

Fast maju k dulu lalu bersamaan—topik 53 mirip.

---

## 30. Etika wawancara

Tanyakan aturan middle untuk panjang genap.

---

Dokumen ini menegaskan slow/fast untuk middle tanpa menghitung panjang.
