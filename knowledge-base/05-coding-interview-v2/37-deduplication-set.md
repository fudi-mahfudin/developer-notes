# Topik 37 — Deduplication dengan `Set`

**Set** menyimpan nilai unik berdasarkan **SameValueZero** equality (mirip `===` kecuali `NaN` dianggap sama dengan `NaN`). Digunakan untuk mengecek keberadaan cepat, menghitung elemen unik, atau sebagai struktur pendukung traversal graph.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Operasi `add`, `has`, `delete` rata-rata O(1). Untuk menghitung elemen unik dari array, `new Set(arr).size` atau iterasi add. Untuk dua himpunan, gunakan operasi seperti intersection dengan loop + `has`. `Set` tidak menyimpan duplikat object reference—dua objek berbeda tetap berbeda meskipun isi sama.

---

## 2. Mengapa topik ini keluar di interview

- Contains duplicate, intersection of two arrays, visited nodes in graph.
- Perbedaan `Set` vs sorting unique.

---

## 3. Unik array

```javascript
const uniq = [...new Set(arr)];
```

Urutan: sesuai pertama kali muncul (ES2015+).

---

## 4. Intersection

```javascript
function intersection(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}
```

Unikkan hasil jika perlu.

---

## 5. Kompleksitas

Bangun set O(n), query O(1) average—total linear untuk banyak pola.

---

## 6. Pitfall: object identity

Equality by reference—deep equality tidak otomatis.

---

## 7. Pitfall: `-0` dan `+0`

Di Set dianggap sama—jarang masalah.

---

## 8. Pola interview

Jelaskan `visited` set pada DFS/BFS.

---

## 9. Latihan

Hitung jumlah elemen unik dengan `Set` vs sort unique.

---

## 10. Checklist

- [ ] Tahu equality Set.
- [ ] Tahu kompleksitas operasi.
- [ ] Tahu kapan perlu Map frekuensi, bukan hanya Set.

---

## 11. Referensi

Struktur data set matematika; implementasi hash table.

---

## 12. Anti-pattern

`Array.includes` berulang dalam loop nested O(n²) ketika Set bisa O(n).

---

## 13. Flashcard

- **Set:** unique values.
- **has:** membership test.

---

## 14. Latihan tulis

Implementasikan `symmetricDifference(a,b)` menggunakan Set.

---

## 15. Testing

Property: `size` ≤ panjang array asal.

---

## 16. Penutup

Set adalah alat pertama untuk membership dan unik.

---

## 17. Tambahan: WeakSet

Hanya object, garbage-collectable—untuk metadata private ringan.

---

## 18. Tambahan: urutan

Iterasi `Set` sesuai penyisipan—berguna untuk stable unique.

---

## 19. Kompleksitas memori

O(unique elements).

---

## 20. Rangkuman

Gunakan Set ketika pertanyaannya keanggotaan atau dedup cepat.

---

## 21. Soal terkait

Longest consecutive sequence—kombinasi Set + scan.

---

## 22. Edge: array kosong

Set kosong.

---

## 23. Edge: semua duplikat

Set berukuran 1.

---

## 24. Drill

Dedup `[1,1,2,2,3]` → `[1,2,3]`.

---

## 25. Performa

Sangat cepat untuk n besar.

---

## 26. Integrasi TypeScript

`Set<T>` dengan generic.

---

## 27. Serialization

Set tidak JSON native—`[...set]`.

---

## 28. Debugging

`console.log([...s])` untuk melihat isi.

---

## 29. Unicode

String unik by value—`"a"` satu entri.

---

## 30. Etika wawancara

Jika perlu hitung frekuensi, jangan pakai Set saja—gunakan Map.

---

Dokumen ini melengkapi pola deduplication dengan struktur built-in JavaScript.
