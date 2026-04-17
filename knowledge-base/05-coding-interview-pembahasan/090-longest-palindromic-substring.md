# Longest Palindromic Substring

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Expand around centers / DP
- **Inti masalah:** Substring **kontinu** paling panjang yang palindrome di `s`.

---

- Soal: `longestPalindrome(s)` string (any valid answer if multiple same length).
- Input: string length up to 1000 typical
- Constraints utama: O(n²) expand from `2n-1` centers (odd/even); Manacher O(n) advanced.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk tiap center `i` **ganjil** (single char) dan **genap** (between `i-1` and `i`), expand `L,R` while `s[L]===s[R]`. Track max length `start`. O(n²) time O(1) space. **DP** `dp[i][j]` true if substring palindrome: `dp[i][j] = s[i]===s[j] && (j-i<3 || dp[i+1][j-1])`.

Struktur cepat:
- Observasi inti masalah: Palindrome symmetric around center(s).
- Strategi final yang dipilih: Center expansion most interview friendly.
- Kenapa strategi ini paling cocok: Simple code, good constants.
- Time complexity: O(n²)
- Space complexity: O(1) expand; O(n²) DP table option
- Edge case utama: length 1; all distinct → length 1 any char.

## 3) Versi Ultra Singkat (10-20 detik)

> For each center expand; odd and even centers; track longest.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function expand(lo, hi):
  while lo >= 0 and hi < n and s[lo]==s[hi]: lo--; hi++
  return hi - lo - 1, lo + 1  // length and start

for i in 0..n-1:
  len1 = expand(i, i)
  len2 = expand(i, i+1)
  update best start/len
return s.slice(start, start+maxLen)
```

## 5) Implementasi Final (Inti Saja)

```js
function longestPalindrome(s) {
  const n = s.length;
  let start = 0,
    max = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1;
    if (len > max) {
      max = len;
      start = l + 1;
    }
  };
  for (let i = 0; i < n; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + max);
}
```

## 6) Bukti Correctness (Wajib)

- Every palindrome has unique center(s); expansion captures maximal palindrome for that center.

## 7) Dry Run Singkat

- `"babad"` → `"bab"` or `"aba"`.

## 8) Red Flags (Yang Harus Dihindari)

- O(n³) checking every substring naively.

## 9) Follow-up yang Sering Muncul

- Longest palindromic subsequence — different (non-contiguous).

## 10) Trade-off Keputusan

- Manacher O(n) — overkill unless required.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Practice Manacher one-liner if targeting hard follow-up.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Palindrome expand
- Inti masalah (1 kalimat): Longest palindrome substring contiguous.
- Soal: String.
- Strategi final: Center expansion odd/even
- Kompleksitas: O(n²), O(1)
- 2 edge case: n=1; two char equal
- 1 potensi bug: wrong start index after expand
- 1 alasan valid: each palindrome has symmetric center
