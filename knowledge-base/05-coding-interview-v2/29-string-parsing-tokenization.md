# Topik 29 — Parsing String (Tokenisasi Sederhana, Delimiter)

**Tokenisasi** memecah string menjadi token menurut aturan—delimiter, whitespace, atau grammar sederhana. Di interview JS, sering muncul sebagai bagian dari evaluator, calculator, atau parser path/query tanpa `eval`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pendekatan dasar: iterasi karakter, akumulasikan buffer saat dalam token, flush saat bertemu delimiter atau transisi state. Untuk delimiter tunggal, `split` bisa cukup—tapi perhatikan token kosong di awal/akhir. Untuk multiple delimiter atau quoted strings, gunakan **state machine** eksplisit (`IN_TOKEN`, `IN_QUOTES`). Kompleksitas linear O(n).

---

## 2. Mengapa topik ini keluar di interview

- Implementasi calculator/RPN, decode string, parse log.
- Menguji manajemen indeks dan edge case.

---

## 3. Split sederhana

```javascript
const tokens = s.trim().split(/\s+/);
```

Hati-hati string kosong menghasilkan `[""]` vs `[]`.

---

## 4. Scanner manual

```javascript
function tokenize(expr) {
  const out = [];
  let buf = "";
  for (const ch of expr) {
    if (ch === " ") {
      if (buf) {
        out.push(buf);
        buf = "";
      }
    } else buf += ch;
  }
  if (buf) out.push(buf);
  return out;
}
```

---

## 5. Delimiter multi karakter

Gunakan `indexOf` berulang atau regex dengan hati-hati performa.

---

## 6. Quoted strings

State: dalam quote, kumpulkan sampai quote penutup—escape `\"` jika diperlukan.

---

## 7. Kompleksitas

Satu pass O(n), memori O(n) output.

---

## 8. Pitfall: unicode whitespace

`\s` regex luas; mungkin perlu filter eksplisit.

---

## 9. Pitfall: delimiter berturut-turut

Putuskan apakah menghasilkan token kosong.

---

## 10. Pola interview

Gambarkan state diagram di whiteboard sebelum kode.

---

## 11. Latihan

Parse `"a=b;c=d"` menjadi pasangan kunci=nilai.

---

## 12. Checklist

- [ ] Spesifikasi token kosong.
- [ ] Escape rules.
- [ ] Kompleksitas linear.

---

## 13. Referensi

Compiler front-end tokenizing/lexing—versi mini di interview.

---

## 14. Anti-pattern

`eval` pada string user—bahaya keamanan.

---

## 15. Flashcard

- **Token:** unit bermakna.
- **Scanner:** satu pass.

---

## 16. Latihan tulis

Tokenizer untuk angka desimal sederhana dengan `+ - * /` dan spasi.

---

## 17. Testing

Kasus: kosong, spasi saja, tab/newline, multiple delimiter.

---

## 18. Integrasi JS

`String.prototype.matchAll` untuk pola kompleks.

---

## 19. Penutup

Tokenizer jelas lebih mudah dirawat daripada regex monolitik.

---

## 20. Tambahan: recursive descent

Untuk grammar bertingkat—di luar pengantar token.

---

## 21. Tambahan: JSON.parse

Jangan reimplement JSON kecuali soal meminta—gunakan parser siap pakai.

---

## 22. Kompleksitas memori buffer

Potong string berulang membuat substring baru—gunakan indeks range jika perlu optimasi.

---

## 23. Rangkuman

State + buffer + flush adalah pola dasar tokenisasi.

---

## 24. Soal terkait

Basic Calculator II—tokenize lalu stack eval.

---

## 25. Edge: trailing delimiter

Flush buffer terakhir.

---

## 26. Edge: hanya delimiter

Output [] atau [""]—sepakat dengan soal.

---

## 27. Drill

Tulis test table 5 baris input kecil.

---

## 28. Unicode identifiers

Jika token identifier unicode, regex `\p{L}` (ES2018) dengan flag `u`.

---

## 29. Performa

Linear scan cukup cepat untuk input interview.

---

## 30. Debugging

Log state setiap karakter untuk bug quote/escape.

---

Dokumen ini mendukung soal parsing string tanpa library parser berat.
