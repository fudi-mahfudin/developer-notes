# Topik 53 — Remove Nth Node From End

Menghapus node ke-n dari **belakang** dalam satu pass: gunakan **dua pointer** `lead` dan `follow` dengan jarak `n`. Majukan `lead` `n` langkah dulu, lalu majukan keduanya sampai `lead.next` null; `follow.next` adalah node sebelum target untuk dihapus.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Gunakan **dummy head** untuk menyederhanakan penghapusan node pertama. Setelah loop, `follow.next = follow.next.next`. Kompleksitas O(L) waktu satu pass, O(1) ruang. Pastikan `n` valid—jika tidak, tangani error sesuai soal.

---

## 2. Mengapa topik ini keluar di interview

- Pointer distance pattern; mirip kth from end value.

---

## 3. Implementasi

```javascript
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let lead = dummy,
    follow = dummy;
  for (let i = 0; i <= n; i++) lead = lead.next;
  while (lead) {
    lead = lead.next;
    follow = follow.next;
  }
  follow.next = follow.next.next;
  return dummy.next;
}
```

Perhatikan loop `i <= n` untuk menjaga jarak—sesuaikan dengan definisi penghitungan.

---

## 4. Kompleksitas

O(L) time, O(1) space.

---

## 5. Pitfall: off-by-one jarak

Trace contoh kecil `L=5,n=2`.

---

## 6. Pitfall: menghapus head

Dummy menangani.

---

## 7. Pola interview

Jelaskan menjaga gap `n` antara pointer.

---

## 8. Latihan

Hapus node terakhir (`n=1`).

---

## 9. Checklist

- [ ] Dummy head.
- [ ] Jarak pointer benar.
- [ ] Null safety.

---

## 10. Referensi

Two pointers on linked list.

---

## 11. Anti-pattern

Dua pass hitung panjang jika satu pass diminta—masih valid jika tidak dilarang.

---

## 12. Flashcard

- **Gap n:** lead ahead.

---

## 13. Latihan tulis

Return kth node from end tanpa hapus.

---

## 14. Testing

List panjang variatif, bandingkan dengan array conversion.

---

## 15. Penutup

Jarak dua pointer menggantikan indeks dari belakang.

---

## 16. Tambahan: doubly linked

Lebih mudah remove—tapi jarang.

---

## 17. Tambahan: n besar

Pastikan `n <= length`—validasi.

---

## 18. Kompleksitas memori

O(1).

---

## 19. Rangkuman

Dummy + gap traversal + relink.

---

## 20. Soal terkait

Rotate list—mirip manipulasi tail/head.

---

## 21. Edge: satu node, n=1

Return null.

---

## 22. Edge: n sama panjang list

Hapus head.

---

## 23. Drill

Gambar pointer untuk `L=4,n=4`.

---

## 24. Performa

Satu pass.

---

## 25. Integrasi TypeScript

Handle undefined next dengan optional chaining hati-hati.

---

## 26. Debugging

Log posisi lead/follow.

---

## 27. Immutability

Mutasi pointer—sesuai linked list.

---

## 28. Parallel

Tidak relevan.

---

## 29. Recursion

Bisa O(n) stack—kurang disukai untuk n besar.

---

## 30. Etika wawancara

Konfirmasi 1-indexed vs 0-indexed untuk n.

---

Dokumen ini melengkapi pola jarak tetap pada linked list untuk operasi dari ujung belakang.
