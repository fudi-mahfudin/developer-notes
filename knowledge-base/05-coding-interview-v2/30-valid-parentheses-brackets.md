# Topik 30 — Valid Parentheses / Bracket Matching

Diberikan string hanya berisi bracket pembuka dan penutup `()[]{}`, tentukan apakah urutan **valid** secara tumpukan—setiap penutup cocok dengan pembuka terakhir yang belum ditutup. Struktur data: **stack**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Scan kiri ke kanan: push simbol pembuka; saat penutup, jika stack kosong atau top tidak berpasangan, invalid; pop jika cocok. Akhirnya stack harus kosong. Kompleksitas O(n) waktu, O(n) ruang worst case (seluruh pembuka). Variasi menambahkan `*` wildcard atau beberapa jenis bracket.

---

## 2. Mengapa topik ini keluar di interview

- Soal klasik easy/medium; menguji struktur data stack.
- Variasi generate parentheses (backtracking) berbeda tapi terkait.

---

## 3. Implementasi

```javascript
function isValid(s) {
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else {
      if (stack.length === 0 || stack[stack.length - 1] !== pair[ch]) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}
```

---

## 4. Hanya `(` dan `)`

Counter tunggal bisa cukup—tapi stack lebih konsisten untuk campuran.

---

## 5. Kompleksitas

- Waktu O(n)
- Ruang O(n)

---

## 6. Variasi: minimum tambahan

Dynamic programming pada string panjang—jauh lebih sulit.

---

## 7. Variasi: longest valid substring

Stack menyimpan indeks atau DP—soal terpisah.

---

## 8. Pitfall: karakter lain

Filter atau asumsikan input murni bracket sesuai soal.

---

## 9. Pola interview

Sebutkan invariant: “stack selalu berisi pembuka yang belum seimbang.”

---

## 10. Latihan

Validasi `([)]` → false; `"{[]}"` → true.

---

## 11. Checklist

- [ ] Pop hanya jika pasangan cocok.
- [ ] Cek stack kosong di akhir.
- [ ] Tahu kompleksitas.

---

## 12. Referensi

Struktur data stack klasik; hubungan dengan bahasa formal.

---

## 13. Anti-pattern

Regex untuk nested arbitrary depth—tidak tepat.

---

## 14. Flashcard

- **LIFO:** last opened closed first.

---

## 15. Latihan tulis

`removeInvalidParentheses`—BFS/backtracking—advanced.

---

## 16. Testing

Generator bracket valid dengan DFS + generator invalid.

---

## 17. Integrasi JS

`stack` sebagai array; `push/pop` O(1) amortized.

---

## 18. Penutup

Valid parentheses adalah latihan stack paling standar.

---

## 19. Tambahan: HTML/XML parsing

Konsep serupa dengan tag nesting—lebih kompleks.

---

## 20. Tambahan: multiple types

Gunakan map pair seperti di atas.

---

## 21. Kompleksitas ruang

Jika hanya `(` counter O(1) space memungkinkan—tapi tidak general.

---

## 22. Rangkuman

Linear scan + stack pairing map.

---

## 23. Soal terkait

Generate Parentheses—backtracking, bukan validator saja.

---

## 24. Edge: string kosong

Biasanya valid (tidak ada pelanggaran).

---

## 25. Edge: satu bracket

Invalid.

---

## 26. Drill

Trace stack untuk `"({[]})"`.

---

## 27. Memori

Untuk sangat panjang, pertimbangkan iteratif satu pass—sudah.

---

## 28. Performa

Sangat cepat untuk n besar.

---

## 29. Unicode brackets

Jarang—pastikan soal membatasi ASCII.

---

## 30. Debugging

Cetak stack setelah setiap karakter jika bingung.

---

Dokumen ini melengkapi pola stack untuk bracket matching di interview.
