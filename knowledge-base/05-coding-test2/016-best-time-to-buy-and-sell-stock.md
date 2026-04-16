# Best Time to Buy and Sell Stock

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Array satu pass, greedy / DP ringkas
- **Inti masalah:** Satu transaksi beli sebelum jual; maksimalkan selisih harga.

---

- Soal: `prices[i]` = harga hari i; beli satu hari, jual hari setelahnya; profit maksimum (boleh 0).
- Input: `prices: number[]`
- Output: `number`
- Constraints utama: O(n) satu arah; O(1) ruang.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Min prefix + max profit

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya track `minPrice` sejauh ini. Untuk setiap hari, profit jika jual hari ini adalah `price - minPrice`; update `maxProfit`. `minPrice` di-update ke minimum antara kandidat lama dan harga hari ini. Satu pass O(n). Tidak perlu dua pointer karena hanya satu pasangan (beli lalu jual). Edge: turun terus ⇒ profit 0.

Struktur cepat:
- Observasi inti masalah: Jual di i optimal ⇒ beli di minimum sebelum i.
- Strategi final yang dipilih: Scan sambil simpan min prefix dan max gap.
- Kenapa strategi ini paling cocok: Linear, satu variabel status.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: Panjang 1; array monoton naik/turun.

## 3) Versi Ultra Singkat (10-20 detik)

> Simpan harga beli minimum hingga sekarang; profit = max(hari ini − min).

## 4) Pseudocode Ringkas (5-10 baris)

```text
minPrice = +infinity
maxProfit = 0
for p in prices:
  minPrice = min(minPrice, p)
  maxProfit = max(maxProfit, p - minPrice)
return maxProfit
```

## 5) Implementasi Final (Inti Saja)

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    maxProfit = Math.max(maxProfit, p - minPrice);
  }
  return maxProfit;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Setelah iterasi i, `minPrice` adalah minimum exact dari prefix — menjual pada prefix sama dengan memilih buy day optimal untuk sell day ≤ i.
- Kenapa semua kasus valid tercakup: Profit max satu transaksi pasti pasangan (buy day, sell day) dengan buy minimum di depannya.
- Kenapa tidak ada kasus yang terlewat: Kita evaluasi sell day setiap indeks dengan min prefix yang benar.

## 7) Dry Run Singkat

- Kasus normal: `[7,1,5,3,6,4]` → 5 (beli 1, jual 6).
- Kasus edge: `[7,6,4,3,1]` → 0.
- Hasil: Selisih maksimum sekali beli-jual.

## 8) Red Flags (Yang Harus Dihindari)

- Nested loop O(n²) tanpa perlu.
- Mencoba jual sebelum beli (urutan indeks salah).
- Lupa profit bisa nol.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Variasi unlimited transactions (greedy valley-peak) — berbeda soal.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: DP `hold/cash` 2 state untuk dua transaksi — lebih rumit.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Dengan cooldown / fee — state machine.

## 10) Trade-off Keputusan

- Opsi A: Min prefix scan — optimal untuk satu transaksi.
- Opsi B: Brute semua pasangan — mudah salah kompleksitas.
- Kenapa memilih opsi final: Linear waktu.
- Risiko dari opsi final: Varian multi-transaksi butuh pendekatan baru.
- Mitigasi: Klarifikasi constraints «satu vs banyak» lebih dulu.

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
- Catatan perbaikan: Siap lompat ke follow-up II (cooldown/stock series).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Array, greedy
- Inti masalah (1 kalimat): Satu buy sebelum sell, profit maks.
- Soal: Max profit.
- Strategi final: Track min price prefix
- Kompleksitas: O(n), O(1)
- 2 edge case: length 1; always decreasing
- 1 potensi bug: Jual tanpa beli (gunakan min infinity)
- 1 alasan solusi ini valid: Optimal sell at i uses cheapest prior day
