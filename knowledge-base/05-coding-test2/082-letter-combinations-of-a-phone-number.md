# Letter Combinations of a Phone Number

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking / iterative product
- **Inti masalah:** Pad digit `2-9` ke huruf sesuai tombol telepon; hasilkan **semua** string panjang `digits.length` (urutan digit tetap).

---

- Soal: `letterCombinations(digits)` string[].
- Input: string digits `'2'-'9'`, bisa kosong?
- Output: semua kombinasi huruf
- Constraints utama: O(4^n) output; map digit → letters array.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Mapping digit→`['abc',...]`. DFS `path` posisi `i`: jika `i===digits.length` push string ke `ans`. Else untuk tiap huruf pada digit ke-`i`, append char, `dfs(i+1)`, pop. **Iteratif**: reduce results by cartesian product per digit. Edge `digits===''` return `[]` per LC.

Struktur cepat:
- Observasi inti masalah: Cartesian product across positional letter sets.
- Strategi final yang dipilih: Backtracking BFS-like expansion.
- Kenapa strategi ini paling cocok: Simple enumeration.
- Time complexity: O(4^n) output size approximate
- Space complexity: O(n) depth
- Edge case utama: empty input string.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS index; branch each letter for current digit; or iterative queue extension.

## 4) Pseudocode Ringkas (5-10 baris)

```text
map digit -> letters
function dfs(i, path):
  if i == len(digits): ans.append(path); return
  for ch in map[digits[i]]:
    dfs(i+1, path + ch)  // or push/pop buffer
```

## 5) Implementasi Final (Inti Saja)

```js
function letterCombinations(digits) {
  if (!digits.length) return [];
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const res = [],
    buf = [];
  const dfs = (i) => {
    if (i === digits.length) {
      res.push(buf.join(''));
      return;
    }
    for (const ch of map[+digits[i]]) {
      buf.push(ch);
      dfs(i + 1);
      buf.pop();
    }
  };
  dfs(0);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Depth equals digit count; every path corresponds to unique combination.

## 7) Dry Run Singkat

- `"23"` → `["ad","ae","af","bd","be","bf","cd","ce","cf"]`.

## 8) Red Flags (Yang Harus Dihindari)

- Including digit 0/1 mapping if not in problem.

## 9) Follow-up yang Sering Muncul

- Generate parentheses style complexity — similar product.

## 10) Trade-off Keputusan

- Queue iterative same complexity.

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
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking
- Inti masalah (1 kalimat): All keypad letter strings for digit sequence.
- Soal: String array.
- Strategi final: DFS per digit index
- Kompleksitas: O(4^n) output-dominated
- 2 edge case: empty digits; single digit
- 1 potensi bug: wrong phone mapping array index
- 1 alasan valid: depth-n tree of choices equals product of branch factors
