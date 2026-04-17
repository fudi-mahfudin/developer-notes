# Topik 38 — First Unique Character / First Non-Repeating

Menemukan **karakter pertama** dalam string yang frekuensinya tepat satu—linear dengan dua pass: hitung frekuensi, lalu scan urutan string untuk mencari yang `count===1`. Satu pass dengan struktur tambahan (misalnya queue + order) memungkinkan tetapi lebih kompleks.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pass 1: bangun `Map` atau array `26` untuk frekuensi. Pass 2: iterasi indeks string dari kiri ke kanan, kembalikan indeks pertama dengan frekuensi 1; jika tidak ada, kembalikan `-1`. Kompleksitas O(n) waktu, O(alphabet) ruang. Urutan iterasi string harus asli—`Map` iterasi tidak menjamin urutan kemunculan kecuali Anda scan string lagi.

---

## 2. Mengapa topik ini keluar di interview

- Soal easy string + hash map.
- Variasi stream first unique—queue + linked structure (LRU-like).

---

## 3. Dua pass klasik

```javascript
function firstUniqChar(s) {
  const m = new Map();
  for (const ch of s) m.set(ch, (m.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (m.get(s[i]) === 1) return i;
  }
  return -1;
}
```

---

## 4. Kompleksitas

O(n) time, O(min(n, A)) space untuk alphabet size A.

---

## 5. Pitfall: unicode

Gunakan indeks string asli; `for...of` kehilangan indeks—gunakan `for (let i...)`.

---

## 6. Pitfall: casing

Normalisasi `toLowerCase` jika soal case-insensitive.

---

## 7. Variasi: stream

Pertahankan antrian kandidat dan decrement—advanced.

---

## 8. Pola interview

Sebutkan “frequency then left-to-right scan”.

---

## 9. Latihan

Modifikasi untuk mengembalikan karakter, bukan indeks.

---

## 10. Checklist

- [ ] Dua pass jelas.
- [ ] Urutan asli string.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Streaming first unique menggunakan deque—topik desain.

---

## 12. Anti-pattern

Nested loop O(n²) cari duplikat untuk setiap posisi.

---

## 13. Flashcard

- **First unique:** scan kiri ke kanan setelah count.

---

## 14. Latihan tulis

Versi satu pass dengan `Map` menyimpan `{count, firstIndex}` update saat counting—tetap perlu final scan min index dengan count 1.

---

## 15. Testing

Kasus `"loveleetcode"` → `v` indeks sesuai soal.

---

## 16. Penutup

Masalah sederhana untuk menguji kebersihan implementasi hash + indeks.

---

## 17. Tambahan: bitmap tidak cukup

Perlu frekuensi >1 beda dari 1—bukan hanya bit.

---

## 18. Tambahan: array panjang tetap

Untuk `a-z`, gunakan `Int32Array(26)` cepat.

---

## 19. Kompleksitas memori

Alphabet kecil ⇒ O(1) konstan.

---

## 20. Rangkuman

Count dulu, scan asli untuk pertama dengan count satu.

---

## 21. Soal terkait

All unique characters—gunakan Set size vs length.

---

## 22. Edge: string kosong

Return -1.

---

## 23. Edge: satu karakter unik di tengah

Pastikan loop indeks benar.

---

## 24. Drill

Manual untuk `"aabbc"`.

---

## 25. Performa

Linear—optimal.

---

## 26. Integrasi TypeScript

Return type `number` index.

---

## 27. Debugging

Log map kecil.

---

## 28. Emoji

Panjang string vs code point—pakai indeks UTF-16 atau codepoints sesuai requirement.

---

## 29. Memori

Jangan simpan seluruh substring—cukup count.

---

## 30. Etika wawancara

Tanyakan apakah case sensitive.

---

Dokumen ini fokus pada pola dua pass yang andal untuk first unique.

---

## 31. Tambahan: kompleksitas amortized

Dua pass tetap O(n) bahkan untuk string sangat panjang; tidak ada faktor log tambahan kecuali sorting kunci (di sini tidak digunakan).

