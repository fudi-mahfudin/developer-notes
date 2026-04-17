# Restore IP Addresses

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking / string parsing
- **Inti masalah:** Sisipkan titik sehingga `s` menjadi **IPv4** valid: 4 bagian desimal 0–255, **tanpa leading zero** kecuali angka `0` sendiri.

---

- Soal: `restoreIpAddresses(s)` string[].
- Input: string digits `s` panjang 4..12 typical
- Output: semua IP valid
- Constraints utama: DFS karena 4 segmen; setiap segmen 1–3 digit dengan validasi nilai.

## 2) Jawaban Ideal Singkat (30-60 detik)

> DFS / backtrack posisi `start` segmen ke-`k` (0..3): untuk `len` 1..3 jika `start+len<=n`, ambil `part = s.slice(start,start+len)`; valid jika (panjang>1 && `part[0]=='0'`) invalid; parse int ≤255; jika `k===3` dan mencapai akhir string → push joined `.`; else rekurs `dfs(start+len,k+1)`. O(1) depth bound branches small.

Struktur cepat:
- Observasi inti masalah: Fixed 4 parts segmentation with local constraints.
- Strategi final yang dipilih: Recursive builder with pruning.
- Kenapa strategi ini paling cocok: Tiny search tree per IP length.
- Time complexity: O(1) constants small since max branches bounded
- Space complexity: O(1) recursion depth 4
- Edge case utama: `"0000"` → `["0.0.0.0"]`; leading zeros blocked.

## 3) Versi Ultra Singkat (10-20 detik)

> Backtrack 4 segments; 1–3 chars; validate 0–255 and leading zero rule.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function dfs(start, seg, path):
  if seg == 4: if start == n: ans.append(join path); return
  for len in 1..3:
    if start+len > n: break
    part = s.slice(start, start+len)
    if invalid leading zero or int(part) > 255: continue
    path.push(part); dfs(start+len, seg+1, path); path.pop()
```

## 5) Implementasi Final (Inti Saja)

```js
function restoreIpAddresses(s) {
  const res = [],
    n = s.length;
  const dfs = (start, parts, cur) => {
    if (parts === 4) {
      if (start === n) res.push(cur.join('.'));
      return;
    }
    for (let len = 1; len <= 3; len++) {
      if (start + len > n) break;
      const seg = s.slice(start, start + len);
      if (seg.length > 1 && seg[0] === '0') break;
      const v = +seg;
      if (v > 255) break;
      cur.push(seg);
      dfs(start + len, parts + 1, cur);
      cur.pop();
    }
  };
  dfs(0, 0, []);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Exhaustive partition of string into 4 substrings with local validity equals valid IPv4 textual forms.

## 7) Dry Run Singkat

- `"25525511135"` multiple IP strings LC.

## 8) Red Flags (Yang Harus Dihindari)

- Allowing `256` or `01` segments.

## 9) Follow-up yang Sering Muncul

- IPv6 — different format.

## 10) Trade-off Keputusan

- Iterative three nested loops possible but messy — DFS clearer.

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
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: `break` vs `continue` on length loop—use `break` when longer len also invalid for leading zero case.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking string
- Inti masalah (1 kalimat): All valid IPv4 from digit string.
- Soal: String array.
- Strategi final: DFS 4 parts
- Kompleksitas: O(1) tiny branching
- 2 edge case: all zeros; leading zero block
- 1 potensi bug: forget start==n when seg==4
- 1 alasan valid: finite partitions with local IP rules
