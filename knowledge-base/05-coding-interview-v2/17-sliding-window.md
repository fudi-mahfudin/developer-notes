# Topik 17 — Sliding Window (Fixed dan Variable)

Sliding window adalah teknik mengeksekusi invariant pada rentang kontigu `[l, r]` dengan menggeser ujung kiri/kanan sehingga total kerja linear, sering menggantikan brute force O(n²) atau O(n³).

---

## 1. Ringkasan

**Fixed window:** panjang `k` tetap; geser satu langkah, update statistik O(1). **Variable window:** perbesar `r` untuk memperluas, perkecil `l` saat invariant dilanggar (misalnya frekuensi karakter). Struktur data pendukung bisa berupa array frekuensi ukuran tetap (huruf) atau `Map` untuk karakter umum.

---

## 2. Mengapa sering keluar

Longest substring tanpa repeat, minimum window substring, permutation in string, maximum average subarray—semua pola window.

---

## 3. Fixed window: rata-rata

```javascript
function maxAvg(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}
```

Waktu O(n), memori O(1).

---

## 4. Variable window: longest tanpa repeat

```javascript
function longestUnique(s) {
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

Invariant: `[l, r]` selalu unik.

---

## 5. Minimum window substring (ringkas)

Butuh frekuensi target dan `formed` count; geser `r` untuk memperluas, `l` untuk mengecilkan ketika semua requirement terpenuhi—detail implementasi panjang, fokus interview: jelaskan dua pointer + frekuensi.

---

## 6. Kompleksitas

Umumnya O(n) per geser amortized karena setiap indeks masuk/keluar window paling banyak sekali.

---

## 7. Pitfall: off-by-one

Inisialisasi `l` dan update saat duplikat sangat rawan salah—teliti dengan contoh kecil.

---

## 8. Pitfall: map vs array 26

Untuk huruf kecil Inggris, array `int[26]` lebih cepat dan sederhana.

---

## 9. Latihan

Hitung berapa substring dengan tepat `k` distinct—kombinasi window + multiset (advanced).

---

## 10. Checklist

- [ ] Tahu beda fixed vs variable.
- [ ] Tahu invariant yang dijaga.
- [ ] Tahu kompleksitas amortized linear.

---

## 11. Referensi

Teknik ini map ke “sliding window” di string algorithms literature.

---

## 12. Contoh: max in each window size k

Butuh deque monotonic—topik terpisah (47); sliding window murni kadang tidak cukup tanpa struktur tambahan.

---

## 13. Pola interview

Sebutkan “expand-shrink”: expand `r` sampai valid, lalu shrink `l` untuk mencari optimum minimum panjang.

---

## 14. Uji kecil

`s="abcabcbb"` longest unique → `abc` panjang 3—trace manual.

---

## 15. Hubungan two pointers

Window adalah two pointers dengan invariant khusus; sering disebut “two pointers advanced”.

---

## 16. Anti-pattern

Menghitung frekuensi ulang dari awal setiap geser O(alphabet * n).

---

## 17. Flashcard

- **Fixed:** geser satu, tambah baru, buang lama.
- **Variable:** expand sampai valid, contract untuk optimum.

---

## 18. Tambahan: multiset mental model

Untuk “persis k distinct”, butuh struktur menghitung distinct count—bisa dengan frekuensi + counter distinct.

---

## 19. Tambahan: prefix + window

Kadang window statistic dihubungkan dengan prefix sum untuk menghitung jumlah cepat.

---

## 20. Latihan tulis

Implementasikan `minSubArrayLen(s, nums)` dengan window variable di mana `sum >= s`—gunakan prefix sum atau geser langsung.

---

## 21. Jawaban sketsa

Gunakan `sum` variabel; `r` tambah, saat `sum >= target` update minimum panjang lalu kurangi `nums[l++]`.

---

## 22. Edge

Target tidak tercapai → kembalikan 0.

---

## 23. Performa

Map untuk Unicode; array untuk ASCII terbatas.

---

## 24. Penutup

Sliding window adalah pola pertama yang harus dicoba pada soal substring/subarray kontigu.

---

## 25. Drill panjang

Baca pembahasan minimum window substring dan tulis sendiri tanpa melihat—lalu bandingkan.

---

## 26. Variabel vs fixed recap

Fixed: `i` dari `k-1` ke `n-1`; variable: `l` mengikuti constraint.

---

## 27. Kaitan interview JS

Manipulasi string immutable di JS sering memakai indeks, bukan substring baru setiap langkah—hindari slice berulang O(n²).

---

## 28. Testing

Buat generator string acak kecil, brute force O(n³) untuk verifikasi pada n kecil.

---

## 29. Kompleksitas memori Map

O(alphabet) atau O(unique) — biasanya kecil.

---

## 30. Soal klasik

“Permutation in string” — bandingkan frekuensi window panjang pola dengan pola.

---

Dokumen ini memberi fondasi sliding window untuk latihan lanjutan di platform soal.
