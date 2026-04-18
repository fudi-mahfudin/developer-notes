# Topik 24 — Majority Element dan Algoritma Voting (Boyer–Moore)

**Majority element** adalah elemen yang muncul lebih dari `⌊n/2⌋` kali. **Algoritma Boyer–Moore voting** menemukan kandidat majority dalam **O(n)** waktu dan **O(1)** ruang dengan menjaga penghitung neto terhadap kandidat saat ini.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Invariant: jika majority ada, maka setelah memasangkan elemen berbeda untuk “membatalkan”, elemen majority tetap tersisa di akhir. Implementasi: simpan `candidate` dan `count`; untuk setiap `x`, jika `count===0` set `candidate=x`; lalu `count += (x===candidate?1:-1)`. **Verifikasi kedua** diperlukan jika soal tidak menjamin majority selalu ada—lakukan pass tambahan untuk menghitung frekuensi `candidate`.

---

## 2. Mengapa topik ini keluar di interview

- Linear time, constant space—kontras dengan hash map O(n) space.
- Menguji invariant dan kebutuhan verifikasi.

---

## 3. Implementasi

```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
```

Jika majority dijamin, cukup; jika tidak, verifikasi:

```javascript
function isMajority(nums, c) {
  let k = 0;
  for (const x of nums) if (x === c) k++;
  return k * 2 > nums.length;
}
```

---

## 4. Kompleksitas

- Satu pass: O(n) waktu, O(1) ruang.
- Verifikasi: +O(n) opsional.

---

## 5. Intuisi pairing

Bayangkan menghapus pasangan elemen berbeda; majority tidak bisa habis lebih dulu.

---

## 6. Pitfall: tidak ada majority

Algoritma bisa mengembalikan kandidat salah—wajib verifikasi jika constraint tidak menjamin.

---

## 7. Variasi: threshold > n/3

Ada versi extended untuk dua kandidat—beda algoritma; pelajari terpisah jika sering ditanya.

---

## 8. Perbandingan hash map

`Map` menghitung frekuensi penuh O(n) ruang—lebih sederhana, lebih boros.

---

## 9. Pola interview

Sebutkan “two-pass: voting lalu verify” ketika asumsi tidak eksplisit.

---

## 10. Latihan

Tunjukkan counterexample jika tidak ada majority tanpa verifikasi.

---

## 11. Checklist

- [ ] Tahu update `count`.
- [ ] Tahu kapan perlu pass verifikasi.
- [ ] Tahu kompleksitas.

---

## 12. Referensi

Boyer–Moore 1981; sering disebut “majority vote algorithm”.

---

## 13. Randomized algorithm

Pilih acak elemen dan cek—expected linear dengan probabilitas; voting deterministik lebih standar interview.

---

## 14. Quiz

`[2,2,1,1,1,2,2]` majority? 2 — voting mengarah ke 2.

---

## 15. Anti-pattern

Sort median O(n log n) jika voting tersedia—lebih lambat meskipun simpel.

---

## 16. Flashcard

- **Pairing:** beda membatalkan.
- **Verify:** jika tidak dijamin.

---

## 17. Latihan tulis

Implementasikan `majorityGeneral(nums, k)` untuk elemen > n/k—outline dua kandidat.

---

## 18. Testing

Property: jika majority ada, voting mengembalikannya; generate tanpa majority untuk cek verify gagal.

---

## 19. Bit manipulation variant

Untuk bit-wise majority per posisi—soal berbeda.

---

## 20. Stream

Voting cocok untuk one-pass stream besar dengan memori konstan.

---

## 21. Penutup

Voting adalah trik elegan—tapi jangan lupa lapisan verifikasi ketika soal tidak menjamin eksistensi.

---

## 22. Tambahan: stabilitas

Tidak relevan—fokus frekuensi.

---

## 23. Tambahan: tie-break

Jika beberapa mode, soal harus mendefinisikan—voting tidak menangani ambiguitas itu.

---

## 24. Kompleksitas perbandingan

Hanya equality check—bisa untuk tipe non-number jika equality terdefinisi.

---

## 25. Integrasi JS

Objek sebagai elemen memakai referensi equality—pastikan konsisten.

---

## 26. Rangkuman

O(n) time O(1) space untuk kandidat; verifikasi bila perlu.

---

## 27. Soal terkait

“Sort colors” (Dutch national flag) berbeda meskipun linear scan—jangan tertukar.

---

## 28. Bacaan

Extended Boyer–Moore untuk k-majority—untuk advanced.

---

## 29. Debugging

Jika hasil salah, trace `candidate` dan `count` pada contoh kecil.

---

## 30. Etika wawancara

Jelaskan asumsi majority terlebih dahulu—menunjukkan kehati-hatian produksi.

---

Dokumen ini melengkapi teknik counting tanpa hash map untuk elemen dominan.
