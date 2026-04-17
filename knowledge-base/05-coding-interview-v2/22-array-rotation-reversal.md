# Topik 22 — Rotasi Array dan Teknik Reversal

Rotasi array ke kanan sebanyak `k` langkah memindahkan elemen akhir ke depan. Teknik **triple reverse** memutar in-place dengan O(n) waktu dan O(1) ruang tambahan: reverse seluruh array, reverse bagian `[0,k-1]`, reverse `[k,n-1]` (dengan `k` dinormalisasi modulo `n`).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Normalisasi `k = k % n` menghindari putaran berlebihan. Untuk rotasi ke kanan `k`, setelah normalisasi, reverse global lalu reverse dua segmen membentuk shift siklis. Alternatif: buat array baru dengan indeks `(i+k)%n`—O(n) waktu O(n) ruang, lebih mudah di-debug. Pilih pendekatan sesuai constraint soal (mutasi vs ruang).

---

## 2. Mengapa topik ini keluar di interview

- Menguji pemahaman indeks modulo dan manipulasi in-place.
- Variasi: rotate string, buffer sirkular, ring buffer.

---

## 3. Rotasi dengan array baru

```javascript
function rotateRightCopy(a, k) {
  const n = a.length;
  if (n === 0) return [];
  k = ((k % n) + n) % n;
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[(i + k) % n] = a[i];
  return out;
}
```

Perhatikan arah rotasi kiri/kanan—sesuaikan rumus.

---

## 4. Triple reverse (kanan)

```javascript
function reverseRange(a, lo, hi) {
  while (lo < hi) {
    [a[lo], a[hi]] = [a[hi], a[lo]];
    lo++;
    hi--;
  }
}
function rotateRightInPlace(a, k) {
  const n = a.length;
  if (n === 0) return;
  k = ((k % n) + n) % n;
  reverseRange(a, 0, n - 1);
  reverseRange(a, 0, k - 1);
  reverseRange(a, k, n - 1);
}
```

---

## 5. Kompleksitas

- Reverse in-place: O(n) waktu, O(1) ekstra.
- Copy: O(n) waktu, O(n) ruang.

---

## 6. Edge cases

- `n=0`
- `k` negatif—normalisasi dengan modulo aritmetika.

---

## 7. Pitfall: arah rotasi

Soal “left” vs “right”—trace contoh kecil 5 menit pertama.

---

## 8. Pitfall: mutasi input

Jika API melarang mutasi, gunakan copy.

---

## 9. Variasi: rotate linked list

Operasi pointer berbeda—topik linked list.

---

## 10. Pola interview

Jelaskan dua pendekatan dan trade-off memori sebelum coding.

---

## 11. Latihan

Rotasi kiri `k` dengan reversal—tulis urutan reverse yang setara.

---

## 12. Checklist

- [ ] Normalisasi k modulo n.
- [ ] Bukti invarian triple reverse dengan contoh kecil.
- [ ] Tahu kompleksitas linear.

---

## 13. Referensi

Teknik reversal standar di buku teks algoritma; juga dipakai untuk membalik kata dalam string.

---

## 14. Hubungan string

String immutable di JS—ubah ke array karakter dulu jika perlu in-place mental.

---

## 15. Quiz

`[1,2,3,4,5]`, rotate right 2 → `[4,5,1,2,3]`.

---

## 16. Anti-pattern

`splice` berulang O(n·k) untuk k besar.

---

## 17. Flashcard

- **Modulo:** normalisasi langkah.
- **Triple reverse:** in-place O(1) space.

---

## 18. Latihan tulis

Implementasikan `rotate(nums, k)` mengembalikan void sesuai signature LeetCode dengan in-place.

---

## 19. Testing

Random small arrays, bandingkan copy method vs reverse.

---

## 20. Big arrays

Satu pass linear—cocok untuk n besar.

---

## 21. TypedArray

Sama; hati-hati tipe elemen.

---

## 22. Penutup

Pilih copy vs reversal berdasarkan constraint; kuasai keduanya.

---

## 23. Tambahan: cyclic replacements

Alternatif O(n) dengan mengikuti siklus permutasi—lebih rumit tetapi O(1) space tanpa reverse helper terpisah.

---

## 24. Tambahan: partial rotate

Untuk buffer sirkular UI, sering pakai indeks head daripada memutar fisik.

---

## 25. Kompleksitas konstanta

Reverse tiga kali masih linear total—koefisien kecil.

---

## 26. Debugging

Print setelah setiap reverse untuk trace kesalahan off-by-one.

---

## 27. Modulo matematika

`(i-k+n)%n` untuk shift indeks—hindari bilangan negatif dengan penjumlahan `n`.

---

## 28. Integrasi functional

`const rot = [...a.slice(-k), ...a.slice(0, n-k)]` O(n) ruang—jelas untuk prototipe.

---

## 29. Rangkuman

Normalisasi k, pilih copy atau triple reverse, verifikasi dengan contoh 3 elemen.

---

## 30. Soal terkait

“Rotate Image” 2D adalah transform berbeda (transpose + reverse baris)—jangan tertukar.

---

Dokumen ini melengkapi manipulasi array linear untuk rotasi yang sering muncul di platform soal.
