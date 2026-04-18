# Topik 27 — Anagram dan Frequency Counter (Hash Map)

Dua string adalah **anagram** jika multiset karakternya identik. Pola utama: hitung frekuensi per karakter dengan **`Map`** atau array ukuran tetap (huruf kecil `a-z`), bandingkan vektor frekuensi atau signature yang kanonik.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Normalisasi dengan menghitung `count[ch]` untuk setiap karakter, lalu bandingkan dua vektor—O(n) waktu, O(alphabet) ruang. Alternatif: sort kedua string dan bandingkan—O(n log n). Untuk banyak string, **group anagrams** memakai signature `sorted(s)` atau `count` sebagai kunci `Map`. Di JS, `Object` sebagai map karakter cepat untuk ASCII terbatas; `Map` lebih aman untuk Unicode arbitrer.

---

## 2. Mengapa topik ini keluar di interview

- Soal valid anagram, group anagrams, permutation in string (window + count diff).
- Menguji manipulasi string dan kompleksitas.

---

## 3. Valid anagram dengan array 26

```javascript
function countLetters(s) {
  const c = new Array(26).fill(0);
  for (const ch of s) {
    c[ch.charCodeAt(0) - 97]++; // asumsi a-z
  }
  return c;
}
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const ca = countLetters(a),
    cb = countLetters(b);
  for (let i = 0; i < 26; i++) if (ca[i] !== cb[i]) return false;
  return true;
}
```

---

## 4. Dengan Map Unicode

```javascript
function freq(s) {
  const m = new Map();
  for (const ch of s) m.set(ch, (m.get(ch) || 0) + 1);
  return m;
}
```

Bandingkan dua `Map` dengan iterasi kunci—perhatikan biaya.

---

## 5. Signature sort

```javascript
const sig = (s) => [...s].sort().join("");
```

Sederhana tetapi O(n log n) per string.

---

## 6. Kompleksitas

- Counting: O(n) time, O(A) space untuk alphabet A.
- Sort signature: O(n log n).

---

## 7. Group anagrams

Kunci: `signature(s)`; nilai: array string dalam grup.

---

## 8. Sliding window vs anagram

Kurangi/menambah count saat geser window—O(1) update per langkah.

---

## 9. Pitfall: spasi dan casing

Normalisasi `toLowerCase`, aturan spasi sesuai soal.

---

## 10. Pitfall: unicode surrogate

Iterasi `for...of` aman untuk astral characters; `charCodeAt` bisa salah untuk emoji.

---

## 11. Pola interview

Sebutkan “vector frequency compare linear time” vs sort.

---

## 12. Latihan

Deteksi anagram dengan satu array dan satu loop kedua mengurangi—hemat memori.

---

## 13. Checklist

- [ ] Pilih representasi frekuensi.
- [ ] Tahu kompleksitas bandingkan.
- [ ] Tahu unicode caveats.

---

## 14. Referensi

Multiset equality; hashing signature untuk grup.

---

## 15. Variasi: anagram substring

Gunakan rolling hash (Rabin-Karp) atau window count—topik string lanjutan.

---

## 16. Anti-pattern

Nested loop semua pasangan string untuk grup—gunakan hash map.

---

## 17. Flashcard

- **Frequency:** count per char.
- **Signature:** canonical form.

---

## 18. Latihan tulis

Implementasikan `findAnagrams(s, p)` dengan window fixed length `p.length`.

---

## 19. Testing

Property: random string, shuffle → anagram.

---

## 20. Memori

Alphabet kecil ⇒ array lebih cepat dari `Map`.

---

## 21. Penutup

Frequency counter adalah alat pertama untuk string equality multiset.

---

## 22. Tambahan: prime product trick

Kalikan prime per huruf—risiko overflow; jangan di JS number besar tanpa BigInt.

---

## 23. Tambahan: multiset tanpa order

Sama dengan anagram—istilah sering dipakai di diskusi formal.

---

## 24. Kompleksitas grup

Total panjang string N, k string: total O(N·L) untuk signatures sort vs O(N) counting per string tergantung metode.

---

## 25. Rangkuman

Hitung frekuensi, bandingkan vektor, atau hash signature untuk grup.

---

## 26. Soal terkait

“Minimum window substring” memakai frekuensi target vs window—lebih kompleks.

---

## 27. Integrasi JS

`Array(26)` vs `Uint32Array` untuk micro perf.

---

## 28. Edge: empty strings

Dua string kosong anagram? biasanya ya.

---

## 29. Edge: panjang beda

Langsung false.

---

## 30. Drill

Buat tabel frekuensi untuk `"aba"` dan `"baa"` lalu cocokkan.

---

Dokumen ini mendukung pola string paling sering setelah two pointers/sliding window.
