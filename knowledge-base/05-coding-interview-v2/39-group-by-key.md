# Topik 39 — Group By Key (misalnya Anagram Groups)

**Group by** mengelompokkan elemen berdasarkan kunci yang diekstrak dari setiap elemen—misalnya signature anagram `sorted(word)`, atau `user.country`. Di JS, gunakan `Map<string, Item[]>` atau `Object` jika kunci string aman.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Algoritma: untuk setiap elemen hitung `key = groupKey(item)`, lalu `map.get(key).push(item)` dengan inisialisasi array jika belum ada. Kompleksitas O(n·f) di mana `f` adalah biaya menghitung kunci—untuk anagram sort kunci, `f= L log L` per kata; total bisa O(N·L log L) untuk N kata panjang L. Alternatif kunci: frekuensi vektor yang di-hash.

---

## 2. Mengapa topik ini keluar di interview

- Group anagrams, group by parity, categorize logs.
- Memilih representasi kunci yang efisien.

---

## 3. Pola Map array

```javascript
function groupBy(items, keyFn) {
  const m = new Map();
  for (const it of items) {
    const k = keyFn(it);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(it);
  }
  return [...m.values()];
}
```

---

## 4. Kompleksitas

Bergantung pada `keyFn`; dominasi sering pada sort signature.

---

## 5. Pitfall: kunci kolision

Dua grup berbeda tidak boleh share key—pilih representasi unik.

---

## 6. Pitfall: JSON.stringify sebagai key

Urutan kunci object mempengaruhi—tidak stabil untuk objek sembarang.

---

## 7. Pola interview

Diskusikan trade-off sort signature vs 26-length frequency string.

---

## 8. Latihan

Group strings by first character case-insensitive.

---

## 9. Checklist

- [ ] Inisialisasi bucket.
- [ ] Kompleksitas key.
- [ ] Output format (array of arrays).

---

## 10. Referensi

SQL `GROUP BY` analogi; Map-reduce pattern.

---

## 11. Anti-pattern

O(n²) pairwise compare semua string untuk grup anagram.

---

## 12. Flashcard

- **Bucket:** array per key.

---

## 13. Latihan tulis

Group `users` by `age` bracket `[0,18),[18,65),[65,∞)`.

---

## 14. Testing

Properti: total elemen tetap setelah group.

---

## 15. Penutup

Group by adalah pola Map + key function.

---

## 16. Tambahan: lodash groupBy

Di produksi bisa pakai util—di interview tulis manual.

---

## 17. Tambahan: stable order

Map mempertahankan urutan penyisipan kunci—berguna.

---

## 18. Kompleksitas memori

O(n) elemen disimpan dalam buckets.

---

## 19. Rangkuman

Pilih key yang murah dan unik; bucket dengan Map.

---

## 20. Soal terkait

Vertical order traversal binary tree—group by column.

---

## 21. Edge: kosong

Return [].

---

## 22. Edge: semua sama key

Satu bucket berisi semua.

---

## 23. Drill

Group `[1,2,3,4,5]` by `n%2`.

---

## 24. Performa

Linear jika key O(1).

---

## 25. Integrasi TypeScript

Type key `string | number` union.

---

## 26. Serialization

Kunci kompleks → string kanonik stabil.

---

## 27. Debugging

Log distribusi ukuran bucket.

---

## 28. Unicode collation

Grouping teks manusia mungkin perlu `Intl.Collator`.

---

## 29. Paralel

Group by di MapReduce—advanced.

---

## 30. Etika wawancara

Konfirmasi format output—kumpulan array atau Map.

---

Dokumen ini menyiapkan pola group-by untuk banyak soal kategorisasi.
