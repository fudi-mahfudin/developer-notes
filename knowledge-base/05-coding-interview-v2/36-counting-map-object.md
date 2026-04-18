# Topik 36 — Counting dengan `Map` / Object

**Frequency counting** memetakan kunci ke jumlah kemunculan. Di JavaScript, pilih **`Map`** untuk kunci arbitrer (termasuk object, symbol) dan urutan penyisipan; gunakan **plain object** untuk kunci string ketika ergonomis dan tidak perlu prototype aman.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pola umum: iterasi elemen, `count.set(k, (count.get(k) ?? 0) + 1)`. Untuk alfabet kecil, array panjang 26 sering lebih cepat daripada `Map`. Kompleksitas O(n) waktu, O(U) ruang untuk U kunci unik. Perhatikan perbedaan **falsy** `0` vs tidak ada—gunakan `get` + nullish coalescing.

---

## 2. Mengapa topik ini keluar di interview

- Anagram, top-k frequent, counter dalam sliding window.
- Keputusan `Map` vs object vs array.

---

## 3. Map dasar

```javascript
function frequencies(arr) {
  const m = new Map();
  for (const x of arr) m.set(x, (m.get(x) || 0) + 1);
  return m;
}
```

`||` vs `??`: gunakan `??` jika 0 adalah nilai valid yang tidak boleh di-reset.

---

## 4. Object sebagai counter string

```javascript
function freqChars(s) {
  const o = Object.create(null); // tanpa prototype
  for (const ch of s) o[ch] = (o[ch] || 0) + 1;
  return o;
}
```

---

## 5. Kompleksitas

- Sekali pass O(n), memori O(U).

---

## 6. Pitfall: key coercion object

Kunci object di `Map` memakai referensi—dua literal `{}` berbeda kunci.

---

## 7. Pitfall: JSON key order

Object key order aturan ES—untuk determinisme gunakan sort keys saat serialize.

---

## 8. Pola interview

Sebutkan “single pass hash count” untuk frekuensi.

---

## 9. Latihan

Hitung frekuensi kata dalam kalimat dengan normalisasi lowercase.

---

## 10. Checklist

- [ ] Pilih Map vs object.
- [ ] Nullish vs OR untuk increment.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Multiset abstraction; bagan frequency analysis.

---

## 12. Anti-pattern

Nested loop untuk menghitung pasangan frekuensi ketika satu pass cukup.

---

## 13. Flashcard

- **Map:** kunci apa pun.
- **Object:** string keys ergonomis.

---

## 14. Latihan tulis

Implementasikan `topKFrequent(nums, k)` dengan bucket sort pada frekuensi.

---

## 15. Testing

Random array, bandingkan dengan sort+group manual untuk kecil.

---

## 16. Penutup

Counter adalah struktur data pertama untuk banyak soal string/array.

---

## 17. Tambahan: increment besar

Gunakan `BigInt` jika count bisa melebihi `Number.MAX_SAFE_INTEGER`.

---

## 18. Tambahan: decrement

Pastikan tidak turun di bawah nol jika invariant mengharuskan.

---

## 19. Kompleksitas memori

Untuk alphabet kecil, `Uint32Array(26)` efisien.

---

## 20. Rangkuman

Satu pass, struktur hash, increment aman dengan `??`.

---

## 21. Soal terkait

Subarray sum K menggunakan prefix map—hubungan counting + prefix.

---

## 22. Edge: input kosong

Map kosong.

---

## 23. Edge: semua unik

U = n.

---

## 24. Drill

Hitung frekuensi `[1,2,1,3,2,1]` manual.

---

## 25. Performa

Map operations amortized O(1).

---

## 26. Integrasi TypeScript

Tipe `Map<K, number>` dengan defaulting benar.

---

## 27. Serialization

`Object.fromEntries([...m])` untuk JSON jika kunci stringifiable.

---

## 28. Debugging

`console.table` untuk object kecil.

---

## 29. Unicode

`for...of` pada string untuk menghitung code point benar.

---

## 30. Etika wawancara

Jelaskan mengapa tidak pakai array untuk karakter non-Latin.

---

Dokumen ini menguatkan pola counting sebagai fondasi hash-based solutions.
