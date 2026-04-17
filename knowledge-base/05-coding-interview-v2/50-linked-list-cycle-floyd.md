# Topik 50 — Deteksi Cycle (Floyd’s Tortoise and Hare)

Untuk mendeteksi **cycle** pada singly linked list dengan **O(1)** ruang tambahan, gunakan dua pointer **slow** (1 langkah) dan **fast** (2 langkah). Jika ada cycle, mereka pasti bertemu; jika `fast` mencapai `null`, tidak ada cycle.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Setelah bertemu, untuk menemukan **titik masuk cycle**, pindahkan satu pointer ke `head`, lalu majukan keduanya satu langkah hingga bertemu lagi—titik pertemuan adalah start cycle (bukti matematis jarak). Kompleksitas O(n) waktu, O(1) ruang. Alternatif: gunakan `Set` simpan node visited—O(n) memori tapi lebih mudah.

---

## 2. Mengapa topik ini keluar di interview

- Linked list cycle detection; happy number variant pada integer function.
- Bukti mengapa algoritma Floyd bekerja sering bonus.

---

## 3. Deteksi ada/tidak

```javascript
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

---

## 4. Temukan titik mulai cycle

```javascript
function detectCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }
  return null;
}
```

---

## 5. Kompleksitas

O(n) waktu, O(1) ruang.

---

## 6. Pitfall: fast null check

`while (fast && fast.next)` menghindari dereference null.

---

## 7. Pitfall: self-loop

Tetap ditangani.

---

## 8. Pola interview

Jelaskan fase meet dan fase cari start.

---

## 9. Latihan

Buktikan secara intuitif mengapa `head` dan `slow` bertemu di entri.

---

## 10. Checklist

- [ ] Dua fase algoritma.
- [ ] Null checks.
- [ ] Tahu alternatif hash set.

---

## 11. Referensi

Floyd cycle detection; Brent’s algorithm alternatif.

---

## 12. Anti-pattern

Menyimpan seluruh node dalam array O(n) memori jika O(1) diminta.

---

## 13. Flashcard

- **Tortoise/Hare:** speeds 1 dan 2.

---

## 14. Latihan tulis

Hitung panjang cycle setelah menemukan meet point.

---

## 15. Testing

Bangun list dengan cycle manual, uji deteksi.

---

## 16. Penutup

Floyd adalah pola dua pointer pada linked structure.

---

## 17. Tambahan: duplicate number array

Floyd pada fungsi `f(x)=nums[x]`—mirip cycle detection.

---

## 18. Tambahan: Brent’s

Mengurangi evaluasi beberapa kasus—jarang diminta.

---

## 19. Kompleksitas konstan

Sangat memori hemat.

---

## 20. Rangkuman

Meet fast/slow, lalu reset satu ke head untuk start node.

---

## 21. Soal terkait

Intersection of two lists—beda tetapi mirip pointer techniques.

---

## 22. Edge: null head

Tidak ada cycle.

---

## 23. Edge: satu node tanpa cycle

Fast mencapai null.

---

## 24. Drill

Gambar cycle panjang 4 dengan head masuk di posisi berbeda.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

Nullable return `ListNode | null`.

---

## 27. Debugging

Convert ke array dengan batas langkah untuk deteksi infinite.

---

## 28. Immutability

Tidak mengubah nilai node—hanya pointer traversal.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Jika tidak ingat fase kedua, tawarkan hash set sebagai fallback.

---

Dokumen ini melengkapi deteksi siklus dengan teknik Floyd yang sangat standar.
