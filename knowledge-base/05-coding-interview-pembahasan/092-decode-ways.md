# Decode Ways

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming
- **Inti masalah:** `A=1` … `Z=26`; string digit `s` bisa dipetakan ke huruf jika **satu digit** 1–9 atau **dua digit** 10–26. Hitung **jumlah** dekode valid (tanpa leading zero invalid splits).

---

- Soal: `numDecodings(s)` int.
- Input: string digits
- Output: number of ways
- Constraints utama: `dp[i]` = ways untuk `s[0..i)` prefix; `dp[0]=1`; at i try take 1 digit if `s[i]!='0'` add `dp[i]` from `dp[i-1]`; take 2 digits if 10–26 add from `dp[i-2]`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dp[i]` number ways parse first `i` chars. Transitions from position `i-1`: single step if current digit not `0`; double step if `s.slice(i-2,i)` ∈ `[10..26]`. Rolling variables `a=dp[i-2]`, `b=dp[i-1]`. **Edge**: leading `0` whole or local makes 0 ways. O(n) time O(1) space.

Struktur cepat:
- Observasi inti masalah: Markov choice of 1–2 digit parse like climbing stairs with constraints.
- Strategi final yang dipilih: Linear DP with character checks.
- Kenapa strategi ini paling cocok: Natural left-to-right parse count.
- Time complexity: O(n)
- Space complexity: O(1) rolling
- Edge case utama: `"0"` → 0; `"10"` one way.

## 3) Versi Ultra Singkat (10-20 detik)

> DP: ways at i from 1-digit if not 0 and 2-digit if 10–26.

## 4) Pseudocode Ringkas (5-10 baris)

```text
dp[0] = 1
for i from 1 to n:
  if s[i-1] != '0': dp[i] += dp[i-1]
  if i >= 2 and 10 <= int(s[i-2:i]) <= 26: dp[i] += dp[i-2]
return dp[n]
```

## 5) Implementasi Final (Inti Saja)

```js
function numDecodings(s) {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== '0') dp[i] += dp[i - 1];
    if (i >= 2) {
      const v = +s.slice(i - 2, i);
      if (v >= 10 && v <= 26) dp[i] += dp[i - 2];
    }
  }
  return dp[n];
}
```

## 6) Bukti Correctness (Wajib)

- Partition last 1 or 2 digits disjoint cases covering all parses; invalid branches zero contribution.

## 7) Dry Run Singkat

- `"226"` → 3 (`2|26`, `22|6`, `2|2|6`).

## 8) Red Flags (Yang Harus Dihindari)

- Treating `"06"` as 6 — invalid two-digit mapping.

## 9) Follow-up yang Sering Muncul

- Decode ways II with `*` wildcard — harder DP.

## 10) Trade-off Keputusan

- Array `dp[n+1]` for readability vs rolling.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Submit clear `dp` array version first to avoid off-by-one in rolling.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP string
- Inti masalah (1 kalimat): Count decodings 1–26 letter mapping.
- Soal: Integer ways.
- Strategi final: DP prefix with 1–2 char tails
- Kompleksitas: O(n), O(1)
- 2 edge case: starts with 0; 100 has weird splits
- 1 potensi bug: leading zero handling
- 1 alasan valid: optimal substructure on prefix length
