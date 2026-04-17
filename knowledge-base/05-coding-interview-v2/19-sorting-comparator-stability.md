# Topik 19 — Sorting (Custom Comparator, Stability)

Sorting adalah operasi fundamental: mengurutkan elemen menurut kunci yang dapat diekstrak dari data. Di JavaScript, `Array.prototype.sort` membandingkan elemen setelah dikonversi ke string secara default—**sangat berbahaya untuk angka**—sehingga hampir selalu Anda menyertakan **comparator** `(a,b) => number`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Comparator mengembalikan nilai negatif jika `a` harus sebelum `b`, positif jika sebaliknya, nol jika setara. **Stability** berarti elemen yang setara mempertahankan urutan relatif seperti di input—penting untuk **sort by multiple keys** (misalnya umur lalu nama). Di V8 modern, `sort` untuk array object dengan comparator sering stabil, tetapi jangan mengandalkan perilaku default numerik tanpa comparator eksplisit.

---

## 2. Mengapa topik ini keluar di interview

- Bug produksi: `["10","2"].sort()` lexicographic.
- Soal “meeting rooms”, “custom ordering”, “largest number formed from nums”.
- Menjelaskan kompleksitas: di JS engine umumnya **O(n log n)** comparisons untuk general sort.

---

## 3. Comparator numerik naik

```javascript
nums.sort((a, b) => a - b);
```

Untuk descending:

```javascript
nums.sort((a, b) => b - a);
```

---

## 4. Comparator untuk string

```javascript
names.sort((a, b) => a.localeCompare(b));
```

`localeCompare` mempertimbangkan locale dan lebih aman daripada `<` untuk unicode.

---

## 5. Sort by multiple keys (stability)

Jika engine stabil, Anda bisa sort bertahap dari kunci **least significant** ke **most significant**:

```javascript
users.sort((a, b) => a.age - b.age);
users.sort((a, b) => a.city.localeCompare(b.city));
```

Setelah sort kota, sort umur mempertahankan urutan kota untuk umur sama—**hanya jika stabil**.

Alternatif satu pass:

```javascript
users.sort((a, b) => {
  const c = a.city.localeCompare(b.city);
  if (c !== 0) return c;
  return a.age - b.age;
});
```

---

## 6. Urutan tie-break eksplisit

Selalu lebih aman satu comparator dengan rantai if daripada mengandalkan multiple passes jika stabilitas engine diragukan.

---

## 7. Kompleksitas

- Waktu: umumnya O(n log n) untuk perbandingan-based sort.
- Ruang: O(log n) atau O(n) tergantung algoritma internal—transparan di JS tapi relevan jika ditanya “mengapa merge sort dipilih di engine”.

---

## 8. Pitfall: mutasi saat sort

Comparator tidak boleh mengubah array dalam cara yang mengacaukan—hindari side effect.

---

## 9. Pitfall: non-transitive comparator

Jika comparator tidak konsisten (A<B, B<C, tapi C<A), hasil tidak terdefinisi—debug sulit.

---

## 10. Object sorting by property

```javascript
items.sort((a, b) => a.priority - b.priority);
```

Perhatikan `undefined` properti—definisikan fallback.

---

## 11. Pola interview: interval sorting

Sort by `start`, lalu sweep—merge intervals (topik 21).

---

## 12. Custom key extraction

```javascript
function sortBy(arr, keyFn) {
  return [...arr].sort((a, b) => {
    const ka = keyFn(a),
      kb = keyFn(b);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
}
```

Salin array jika input tidak boleh dimutasi.

---

## 13. Immutability

`sort` in-place; gunakan spread `[...a].sort` jika perlu menjaga `a` asli.

---

## 14. Latihan

Urutkan array orang berdasarkan `lastName` lalu `firstName` dalam satu comparator.

---

## 15. Checklist

- [ ] Selalu comparator untuk angka.
- [ ] Tahu ide stabilitas.
- [ ] Tahu risiko default `sort()` tanpa fn.
- [ ] Tahu O(n log n) tipikal.

---

## 16. Referensi

Introsort/Timsort di banyak engine; stabilitas tergantung implementasi—MDN mendokumentasikan perilaku modern.

---

## 17. Tambahan: `compareFn` return rules

Nilai negatif/positif/nol—boleh `a-b` untuk number aman rentang.

---

## 18. Tambahan: sorting bigint

Gunakan `-` langsung atau `a < b ? -1 : ...` — konsisten dengan tipe.

---

## 19. Quiz

```javascript
[1, 11, 2].sort();
```

Hasil `[1,11,2]` sebagai string ordering—perbaiki dengan comparator numerik.

---

## 20. Anti-pattern

`parseInt` di comparator tanpa radix saat key string angka—gunakan `Number`.

---

## 21. Flashcard

- **Stable:** tie tidak berubah relatif.
- **Comparator:** mengatur urutan total.

---

## 22. Latihan tulis

Implementasikan `lexNextPermutation` atau diskusikan mengapa sorting membantu “largest number” greedy.

---

## 23. Partial sort

JS tidak punya `nth_element` built-in—untuk top-k lihat heap/quickselect (topik 35).

---

## 24. Locale sorting data

Untuk UI, pertimbangkan `Intl.Collator` untuk bahasa Indonesia/Inggris.

---

## 25. Penutup

Sorting adalah “praprocessor” untuk banyak algoritma greedy dan two pointers—kuasai comparator dulu, baru pola lanjutan.

---

## 26. Integrasi TypeScript

Generic comparator `sort<T>` dengan type guard untuk key optional.

---

## 27. Testing property-based

Generate array acak, bandingkan hasil sort Anda dengan referensi untuk konsistensi total order.

---

## 28. Edge: NaN

`NaN` comparisons aneh—filter/sanitize sebelum sort jika mungkin.

---

## 29. Edge: -0 dan +0

Secara sort biasanya setara; `Object.is` membedakan—jarang jadi masalah.

---

## 30. Rangkuman

Definisikan total order dengan comparator bersih; salin array jika perlu immutability; jangan percaya default sort untuk angka.

---

Dokumen ini menutup dasar sorting untuk persiapan soal yang membutuhkan urutan kustom di JavaScript.
