# House Robber II

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming, circular constraint
- **Inti masalah:** Sama House Robber I tetapi rumah membentuk **lingkaran**: rumah 0 dan `n-1` dianggap **tetangga** — tidak boleh rampok keduanya.

---

- Soal: `rob(nums)` max sum.
- Input: `number[]` length ≥1
- Constraints utama: **Dua kasus**: (a) rampok di rentang `[0..n-2]` linear; (b) rampok `[1..n-1]` linear — ambil **max** karena tidak bisa simultan ambil 0 dan n-1. Gunakan helper `linearRob(slice)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `helper(arr)` = House Robber I di array linear `arr`. Jawaban: `max(helper(nums.slice(0,-1)), helper(nums.slice(1)))` **jika** `nums.length > 1`. Jika satu elemen hanya `nums[0]`. Reduksi mengubah siklus menjadi dua path DP linear independen mencakup semua valid rob sets.

Struktur cepat:
- Observasi inti masalah: Choosing house 0 forbids last; not choosing allows last — partition optima.
- Strategi final yang dipilih: Two linear DP runs max rolling.
- Kenapa strategi ini paling cocok: O(n) simple extension of I.
- Time complexity: O(n)
- Space complexity: O(1) each pass
- Edge case utama: `[1]`, `[1,2]`.

## 3) Versi Ultra Singkat (10-20 detik)

> Rob max on `0..n-2` OR on `1..n-1`; take max of two linear robber solutions.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if len == 1: return nums[0]
function scan(lo, hi): // inclusive indices House Robber I on subarray
  prev2=0; prev1=0
  for i from lo to hi:
    cur = max(prev1, nums[i] + prev2)
    prev2=prev1; prev1=cur
  return prev1
return max(scan(0,n-2), scan(1,n-1))
```

## 5) Implementasi Final (Inti Saja)

```js
function rob(nums) {
  if (nums.length === 1) return nums[0];
  const line = (a, b) => {
    let p2 = 0,
      p1 = 0;
    for (let i = a; i <= b; i++) {
      const c = Math.max(p1, p2 + nums[i]);
      p2 = p1;
      p1 = c;
    }
    return p1;
  };
  const n = nums.length;
  return Math.max(line(0, n - 2), line(1, n - 1));
}
```

## 6) Bukti Correctness (Wajib)

- Any optimal circular solution either excludes first or excludes last (cannot include both). Best in each case covered by one linear run.

## 7) Dry Run Singkat

- `[2,3,2]` → 3; `[1,2,3,1]` → 4.

## 8) Red Flags (Yang Harus Dihindari)

- Running three-window wrong decomposition — two cases suffice.

## 9) Follow-up yang Sering Muncul

- Tree house robber — tree DP.

## 10) Trade-off Keputusan

- Duplicate small helper inline vs separate function.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Explain partition proof orally.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP circular
- Inti masalah (1 kalimat): Adjacent on circle—exclude first or last house globally.
- Soal: Max sum.
- Strategi final: Two House Robber I ranges
- Kompleksitas: O(n), O(1)
- 2 edge case: single house; two houses
- 1 potensi bug: forget length==1
- 1 alasan valid: optimal loot either skips index 0 or skips n-1
