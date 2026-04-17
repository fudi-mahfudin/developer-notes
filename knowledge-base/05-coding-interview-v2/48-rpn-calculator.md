# Topik 48 — Evaluasi Ekspresi (RPN / Kalkulator Stack)

**Reverse Polish Notation** menempatkan operator setelah operand, memungkinkan evaluasi dengan **satu stack** tanpa tanda kurung. Pola serupa untuk kalkulator infix dengan dua stack (operator/operand) atau **shunting-yard**, tetapi RPN adalah yang paling sering di whiteboard.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Tokenisasi string menjadi angka dan operator; iterasi: jika angka, push; jika operator, pop dua operand (perhatikan urutan untuk `-` dan `/`), terapkan operator, push hasil. Akhir stack berisi satu nilai. Kompleksitas O(n) waktu, O(n) stack untuk banyak operand.

---

## 2. Mengapa topik ini keluar di interview

- Evaluate RPN, basic calculator II.
- Menguji parsing token dan integer overflow (jika soal mensyaratkan).

---

## 3. Implementasi RPN

```javascript
function evalRPN(tokens) {
  const st = [];
  const op = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (a / b) | 0,
  };
  for (const t of tokens) {
    if (t in op) {
      const b = st.pop();
      const a = st.pop();
      st.push(op[t](a, b));
    } else st.push(Number(t));
  }
  return st.pop();
}
```

Perhatikan urutan `b` pop terakhir untuk non-komutatif.

---

## 4. Kompleksitas

O(n) waktu, O(n) ruang stack.

---

## 5. Pitfall: pembagian integer

Soal LeetCode sering truncate ke nol—gunakan `trunc` bukan floor untuk negatif.

---

## 6. Pitfall: unary minus

RPN klasik tidak punya unary minus tanpa representasi khusus—perjelas token.

---

## 7. Variasi: infix ke postfix

Shunting-yard—lebih panjang.

---

## 8. Pola interview

Jelaskan stack operand dan pop dua saat operator.

---

## 9. Latihan

Evaluasi `["2","1","+","3","*"]` → 9.

---

## 10. Checklist

- [ ] Urutan operand untuk `-`/`/`.
- [ ] Konversi string ke number.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Dijkstra shunting yard; postfix evaluation.

---

## 12. Anti-pattern

`eval` pada string user.

---

## 13. Flashcard

- **Postfix:** operator after operands.

---

## 14. Latihan tulis

Basic Calculator II dengan `+ - * /` dan precedence—gunakan stack ganda.

---

## 15. Testing

Generator ekspresi kecil, bandingkan dengan eval aman (hanya angka).

---

## 16. Penutup

RPN adalah inti evaluasi stack untuk banyak soal kalkulator.

---

## 17. Tambahan: BigInt

Untuk bilangan besar—operator custom.

---

## 18. Tambahan: error handling

Stack underflow berarti ekspresi invalid.

---

## 19. Kompleksitas memori

Sebanding kedalaman ekspresi.

---

## 20. Rangkuman

Angka push, operator pop dua, hasil push.

---

## 21. Soal terkait

Decode string nested `2[3[a]]`—stack berbeda tapi mirip.

---

## 22. Edge: satu token

Harus angka.

---

## 23. Edge: banyak operator

Pastikan cukup operand.

---

## 24. Drill

Trace `["4","13","5","/","+"]`.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

Union type token.

---

## 27. Debugging

Log stack setiap token.

---

## 28. Floating point

Gunakan epsilon jika tidak integer—soal biasanya integer.

---

## 29. Locale

Pemisah desimal—soal biasanya titik.

---

## 30. Etika wawancara

Tanyakan aturan pembagian dan truncating.

---

Dokumen ini menyiapkan evaluasi postfix sebagai fondasi kalkulator stack.
