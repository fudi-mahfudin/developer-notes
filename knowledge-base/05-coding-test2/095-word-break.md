# Word Break

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming / Trie + DFS memo
- **Inti masalah:** Boleh memecah `s` menjadi substring-substring yang **semuanya** ada di kamus `wordDict` (wordDict as set). Return bisa atau tidak.

---

- Soal: `wordBreak(s, wordDict)` boolean.
- Input: string, array kata (unik)
- Constraints utama: `dp[i]` bisa direpresentasikan prefix length `i` breakable; `dp[0]=true`; for `i` 1..n try all words `w` if `s` ends with `w` at i and `dp[i-|w|]` true. O(n² * L) naive; trie optional.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Buat `Set` kata. `dp` length `n+1` boolean. `dp[0]=true`. For `i` from 1 to n: for each `j<i` if `dp[j]` and `s.slice(j,i)` in set then `dp[i]=true` break. Optimasi: iterate word lengths from dict max only; or scan words smaller than i. Top-down memo `can(i)` same recurrence.

Struktur cepat:
- Observasi inti masalah: Concatenation feasibility prefix DP akin to segmented partition with dictionary membership test.
- Strategi final yang dipilih: Boolean DP forward.
- Kenapa strategi ini paling cocok: Polynomial with set lookups average O(1).
- Time complexity: O(n² * maxWord) substring cost in JS; O(n * dict) with trie optimized
- Space complexity: O(n)
- Edge case utama: empty string corner per variant; full string single word.

## 3) Versi Ultra Singkat (10-20 detik)

> dp[i] if prefix breakable; check all splits ending at i with dictionary.

## 4) Pseudocode Ringkas (5-10 baris)

```text
set = wordDict set
dp[0] = true
for i in 1..n:
  for j in 0..i-1:
    if dp[j] and s[j:i] in set: dp[i]=true; break
return dp[n]
```

## 5) Implementasi Final (Inti Saja)

```js
function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
```

## 6) Bukti Correctness (Wajib)

- `dp[i]` true iff exists cut j with valid prefix and tail word.

## 7) Dry Run Singkat

- `"leetcode"`, `["leet","code"]` → true.

## 8) Red Flags (Yang Harus Dihindari)

- Greedy longest match can fail — need DP.

## 9) Follow-up yang Sering Muncul

- Word Break II — enumerate all sentences with same DP + backtrack paths.

## 10) Trade-off Keputusan

- BFS queue positions also works.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 8/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Substring cost — mention trie optimization for production.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP + hash set
- Inti masalah (1 kalimat): Segment string into dictionary words.
- Soal: Boolean.
- Strategi final: dp[i] prefix breakable
- Kompleksitas: O(n²) rough substring
- 2 edge case: exact dict word; impossible
- 1 potensi bug: reuse word multiple times confusion — allowed
- 1 alasan valid: concatenation structure is prefix DP
