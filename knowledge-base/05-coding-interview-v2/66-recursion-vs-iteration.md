# Topik 66 — Rekursi vs Iterasi

**Rekursi** memecah masalah menjadi submasalah sejenis dengan **base case**; **iterasi** memakai loop eksplisit. Setiap rekursi memakai **stack call frame**—setara dengan stack manual dalam versi iteratif.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Rekursi lebih ekspresif untuk struktur pohon/graph DFS, divide & conquer. Iterasi lebih aman untuk kedalaman besar (menghindari stack overflow) dan sering lebih cepat konstan. Transformasi rekursi tail ke loop memungkinkan jika tail-recursive—JS engine tidak menjamin optimasi tail call kecuali strict mode dan posisi tertentu.

---

## 2. Mengapa topik ini keluar di interview

- Menjelaskan trade-off memori stack.
- Mengubah DFS rekursif ke iteratif dengan stack eksplisit.

---

## 3. Contoh: factorial

Rekursif vs loop accumulator.

---

## 4. Tree traversal

Preorder rekursif vs stack push nodes.

---

## 5. Kompleksitas

Sama secara asimptotik sering, tetapi faktor konstan dan stack depth berbeda.

---

## 6. Pitfall: kedalaman besar

`n=1e5` rekursi bisa melebihi stack limit.

---

## 7. Pitfall: duplikasi subproblem

Tanpa memo menjadi eksponensial—Fibonacci naif.

---

## 8. Pola interview

Sebutkan kapan iteratif stack menggantikan rekursi.

---

## 9. Latihan

Tulis binary tree inorder iteratif.

---

## 10. Checklist

- [ ] Base case jelas.
- [ ] Stack depth awareness.
- [ ] Tail call caveat di JS.

---

## 11. Referensi

Recursion theory; tail call optimization ES6 optional.

---

## 12. Anti-pattern

Rekursi dalam untuk masalah linear sederhana—overkill.

---

## 13. Flashcard

- **Recursion:** call stack implicit.

---

## 14. Latihan tulis

DFS graph iteratif dengan stack + visited.

---

## 15. Testing

Bandingkan hasil rekursif vs iteratif.

---

## 16. Penutup

Pilih gaya sesuai kedalaman dan kejelasan.

---

## 17. Tambahan: trampoline

Untuk mutual recursion—jarang.

---

## 18. Tambahan: continuation

FP—jarang di interview JS umum.

---

## 19. Kompleksitas memori

O(depth) rekursi.

---

## 20. Rangkuman

Rekursi untuk kejelasan; iteratif untuk batas stack.

---

## 21. Soal terkait

Fibonacci—gunakan iterasi + dua variabel.

---

## 22. Edge: base case missing

Stack overflow.

---

## 23. Edge: infinite recursion

Cycle tanpa base.

---

## 24. Drill

Hitung depth pohon rekursif vs iteratif.

---

## 25. Performa

Iteratif sering lebih cepat konstan.

---

## 26. Integrasi TypeScript

Type rekursi dalam untuk AST—natural.

---

## 27. Debugging

Stack trace lebih pendek dengan iterasi.

---

## 28. Memori heap vs stack

Objek besar di frame—hati-hati.

---

## 29. Parallel

Rekursi tidak otomatis parallel.

---

## 30. Etika wawancara

Jika khawatir stack, tawarkan versi iteratif.

---

## 31. Tail recursion (konsep)

Bahasa yang mengoptimalkan **tail call** dapat mengubah rekursi ekor menjadi loop mesin tanpa menumbuk stack. **JavaScript** mengizinkan tail-call optimization hanya dalam mode dan pola tertentu serta jarang diandalkan di lingkungan nyata—jadi jangan mengandalkan TCO sebagai solusi stack di interview JS; lebih aman menunjukkan versi iteratif atau stack eksplisit.

---

## 32. Kapan rekursi tetap lebih baik

Struktur **tree/graph** dengan cabang dinamis, **backtracking** dengan undo, dan pembagian **divide & conquer** sering lebih jelas dalam bentuk rekursi. Iterasi tetap mungkin, tetapi sering mengganti kejelasan dengan manajemen stack manual.

---

Dokumen ini menyeimbangkan rekursi dan iterasi sebagai dua gaya kontrol alur.
