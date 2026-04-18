# Topik 41 — Longest Substring Without Repeating Characters (Sliding Window Klasik)

Menemukan panjang substring terpanjang tanpa karakter duplikat—**sliding window** dengan `Map` menyimpan indeks terakhir tiap karakter atau array `lastIndex` untuk ASCII.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Jaga jendela `[l,r]` dengan invariant “tidak ada duplikat di dalam”. Perluas `r`, perbarui `last[ch]`. Jika `last[ch] >= l`, geser `l` ke `last[ch]+1`. Panjang terbaik = max(`r-l+1`). Kompleksitas O(n) waktu amortized karena `l` dan `r` masing-masing maju paling banyak n langkah.

---

## 2. Mengapa topik ini keluar di interview

- Soal sliding window paling terkenal.
- Menguji map indeks vs set dengan evict.

---

## 3. Implementasi Map indeks

```javascript
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let l = 0,
    best = 0;
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    if (last.has(ch) && last.get(ch) >= l) l = last.get(ch) + 1;
    last.set(ch, r);
    best = Math.max(best, r - l + 1);
  }
  return best;
}
```

---

## 4. Kompleksitas

O(n) waktu, O(min(n, alphabet)) ruang.

---

## 5. Pitfall: unicode astral

Indeks string UTF-16 vs code point—iterasi `for...of` dengan counter manual jika perlu.

---

## 6. Pitfall: `last` tanpa reset

Pastikan membandingkan dengan `l` saat ini.

---

## 7. Variasi: k distinct

Butuh frekuensi + counter distinct—soal berbeda.

---

## 8. Pola interview

Sebutkan invariant window unik dan pembaruan `l` saat duplikat.

---

## 9. Latihan

Trace `"abcabcbb"` → 3 (`abc`).

---

## 10. Checklist

- [ ] Update `l` ke max.
- [ ] Hitung best setiap langkah.
- [ ] Tahu kompleksitas linear.

---

## 11. Referensi

Sliding window pada string—pintu masuk ke minimum window substring.

---

## 12. Anti-pattern

O(n²) semua substring + set.

---

## 13. Flashcard

- **last index:** geser `l`.

---

## 14. Latihan tulis

Return substring itu sendiri, bukan hanya panjang.

---

## 15. Testing

Random string kecil, brute O(n³) verifikasi.

---

## 16. Penutup

Kuasai versi ini sebelum minimum window substring.

---

## 17. Tambahan: array 128/256

Untuk ASCII extended—lebih cepat dari Map.

---

## 18. Tambahan: bitset

Tidak praktis di JS—abaikan.

---

## 19. Kompleksitas memori

O(alphabet) kecil.

---

## 20. Rangkuman

Dua pointer + last seen map = jawaban linear.

---

## 21. Soal terkait

Longest repeating character replacement—izinkan k perubahan.

---

## 22. Edge: string kosong

0.

---

## 23. Edge: semua unik

Panjang penuh.

---

## 24. Drill

`"dvdf"` → 3 (`vdf`).

---

## 25. Performa

Sangat cepat untuk n besar.

---

## 26. Integrasi TypeScript

Tipe indeks number.

---

## 27. Debugging

Log `l,r` setiap iterasi.

---

## 28. Memori

Jangan clone substring setiap langkah.

---

## 29. Paralel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi apakah case sensitive (biasanya ya).

---

Dokumen ini mengunci pola sliding window paling ikonik untuk string.
