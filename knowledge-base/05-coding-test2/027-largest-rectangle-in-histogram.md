# Largest Rectangle in Histogram

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Monotonic stack
- **Inti masalah:** Pada bar historgram `heights[i]`, cari persegi panjang inscribled dengan luas maksimum (lebar = rentang contiguous dengan tinggi ≥ batang pivot).

---

- Soal: `heights: number[]` ≥ 0; return luas integer maksimum.
- Input / Output: array → `number`
- Constraints utama: O(n) dengan stack increasing indices; brute O(n²).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Monotonic stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> Pakai stack indeks dengan tinggi **monoton naik**. Saat `heights[i] < heights[stack.top]`, batang di top adalah **tinggi terbatas** untuk rect yang berakhir sebelum `i`: `h = heights[pop]`; `right = i`; `left = stack.top setelah pop` (atau -1 jika kosong); lebar = `right - left - 1`. Update `maxArea`. Push `i`. Di akhir flush stack dengan sentinel `i = n`. O(n) karena tiap indeks push/pop ≤ sekali.

Struktur cepat:
- Observasi inti masalah: Untuk tinggi `h` di indeks `k`, lebar maks = jarak ke next smaller kiri dan kanan − 1.
- Strategi final yang dipilih: Monotonic increasing stack untuk next smaller left/right.
- Kenapa strategi ini paling cocok: Linear, pola NGE/NSE klasik.
- Time complexity: O(n)
- Space complexity: O(n)
- Edge case utama: Semua sama; satu bar; menurun/monoton.

## 3) Versi Ultra Singkat (10-20 detik)

> Stack naive increasing; saat drop, hitung area dengan popped height × width between boundaries.

## 4) Pseudocode Ringkas (5-10 baris)

```text
stack = empty  // indices, heights strictly increasing
maxArea = 0
for i in 0..n:  // i == n is sentinel with height 0
  cur = i < n ? heights[i] : 0
  while stack not empty and cur < heights[stack.top]:
    h = heights[pop stack]
    left = stack empty ? -1 : stack.top
    width = i - left - 1
    maxArea = max(maxArea, h * width)
  push i
return maxArea
```

## 5) Implementasi Final (Inti Saja)

```js
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i < n ? heights[i] : 0;
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const idx = stack.pop();
      const height = heights[idx];
      const left = stack.length ? stack[stack.length - 1] : -1;
      const width = i - left - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Saat pop `idx`, semua batang di stack kiri lebih pendek sehingga `h` adalah limit vertikal; batas horizontal = prev smaller left dan next smaller right (`i`).
- Kenapa semua kasus valid tercakup: Sentinel 0 memastikan semua batang di-flush.
- Kenapa tidak ada kasus yang terlewat: Setiap batang menjadi «min height» rect tepat saat first smaller kanan ditemukan.

## 7) Dry Run Singkat

- `heights = [2,1,5,6,2,3]` → 10 (standard LC example path).
- Edge `[]` → 0 (handle in code if needed).

## 8) Red Flags (Yang Harus Dihindari)

- O(n²) tiap bar sebagai min.
- Salah width boundary (off-by-one).

## 9) Follow-up yang Sering Muncul

- Maximal square — variasi DP/stack.
- 2D histogram — harder.

## 10) Trade-off Keputusan

- Monotonic stack vs divide & conquer O(n log n) — stack linear preferred.

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
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih boundary dengan sentinel.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Monotonic stack
- Inti masalah (1 kalimat): Max rectangle under histogram.
- Soal: Max area.
- Strategi final: Increasing stack + sentinel 0
- Kompleksitas: O(n), O(n)
- 2 edge case: all equal height; single bar
- 1 potensi bug: width count wrong
- 1 alasan solusi ini valid: Each bar becomes min at pop; width from prev to next smaller
