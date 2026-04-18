# Topik 32 — Longest Common Prefix / Substring (Varian)

**Longest Common Prefix (LCP)** antar array string sering diselesaikan dengan membandingkan karakter per posisi sampai mismatch pertama—O(S) total panjang dibandingkan. **Longest Common Substring** antara dua string adalah DP atau suffix automaton untuk umum; untuk beberapa string, lebih kompleks. Interview sering menyentuh LCP vertikal sederhana atau substring dengan DP 2D.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

LCP dari list string: ambil string pertama sebagai kandidat prefix, potong saat ada string yang tidak cocok di indeks `i`. Alternatif: sort lexicographic, bandingkan hanya first & last—tetap perlu hati-hati jika sort mengubah interpretasi (LCP semua string, bukan hanya ekstrem). **Longest common substring** dua string `A,B`: DP dengan `dp[i][j]` panjang LCSuffix yang berakhir di `i,j`; jawaban max `dp`.

---

## 2. Mengapa topik ini keluar di interview

- Soal “longest common prefix” mudah sebagai pembuka.
- Substring DP menguji tabulasi 2D.

---

## 3. LCP vertikal

```javascript
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let pref = strs[0];
  for (let i = 1; i < strs.length; i++) {
    const s = strs[i];
    let j = 0;
    while (j < pref.length && j < s.length && pref[j] === s[j]) j++;
    pref = pref.slice(0, j);
    if (pref === "") return "";
  }
  return pref;
}
```

Perhatikan `slice` membuat string baru—bisa optimasi indeks saja.

---

## 4. Kompleksitas LCP

Worst-case O(N·L) dengan N string, L panjang maks—setiap karakter bisa dibandingkan berulang.

---

## 5. Longest common substring DP

Rekurens:

- Jika `A[i]===B[j]` maka `dp[i][j]=dp[i-1][j-1]+1`
- Else `dp[i][j]=0`

Jawaban maksimum di seluruh `dp`.

---

## 6. Kompleksitas substring DP

O(|A|·|B|) waktu, O(|A|·|B|) ruang—bisa optimasi baris tunggal O(min).

---

## 7. Pitfall: substring vs subsequence

Subsequence boleh tidak kontigu—DP berbeda (LCS subsequence).

---

## 8. Pola interview

Nyatakan dengan jelas apakah substring atau subsequence.

---

## 9. Latihan

Hitung LCP dari `["flower","flow","flight"]` → `"fl"`.

---

## 10. Checklist

- [ ] Bedakan prefix vs substring vs subsequence.
- [ ] Tahu DP untuk substring dua string.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Suffix array / trie untuk banyak string—advanced.

---

## 12. Anti-pattern

Triple nested loop semua triple untuk LCP list—tidak perlu.

---

## 13. Flashcard

- **Prefix:** awalan bersama semua.
- **Substring:** kontigu dalam masing-masing string.

---

## 14. Latihan tulis

Implementasikan space-optimized LCS substring hanya dua baris DP.

---

## 15. Testing

Random string kecil, brute force substring untuk verifikasi.

---

## 16. Penutup

Mulai dari LCP mudah; naik ke DP 2D untuk substring pasangan.

---

## 17. Tambahan: rolling hash

Cari substring panjang tetap dengan hash—binary search panjang.

---

## 18. Tambahan: trie untuk LCP

Bentuk trie dari semua string—LCP adalah path bersama hingga bercabang.

---

## 19. Kompleksitas trie

O(total characters) build.

---

## 20. Rangkuman

Clarify problem statement; pilih vertical scan, trie, atau DP.

---

## 21. Soal terkait

Longest palindromic substring—DP atau expand around center—beda soal.

---

## 22. Edge: salah satu string kosong

LCP "".

---

## 23. Edge: tidak ada common prefix non-trivial

Output "".

---

## 24. Drill

Trace DP kecil untuk `A="abcde"`, `B="xbcdz"` substring terpanjang `bcd`.

---

## 25. Memori

Untuk substring DP, rolling array mengurangi footprint.

---

## 26. Performa

Untuk string sangat panjang, perhatikan limit stack jika rekursi.

---

## 27. Integrasi JS

Gunakan `Math.max` dengan accumulator untuk max DP.

---

## 28. Unicode

Code point equality—iterasi `for...of`.

---

## 29. Debugging

Cetak matriks DP kecil untuk pemahaman.

---

## 30. Etika wawancara

Tulis tabel kecil 5x5 untuk menjelaskan DP kepada interviewer.

---

Dokumen ini memisahkan varian prefix/substring agar tidak salah rumus saat tekanan wawancara.
