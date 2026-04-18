# Longest Repeating Character Replacement

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Sliding window, frequency counting
- **Inti masalah:** Dengan paling banyak `k` perubahan karakter dalam substring, berapa panjang substring kontigu berisi huruf sama setelah penggantian?

---

- Soal: String `s` huruf besar; boleh ganti paling banyak `k` karakter menjadi huruf lain; maksimalkan panjang substring homogen.
- Input: `s: string`, `k: number`
- Output: `number`
- Constraints utama: O(n) window yang valid dapat dicek dengan count major char dalam window.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Sliding window

## 2) Jawaban Ideal Singkat (30-60 detik)

> Di window `[left, right]` panjang `len`, biaya mengubah semua ke huruf majoritas dalam window adalah `len - maxFreq` (max frekuensi huruf dalam window). Valid jika `len - maxFreq <= k`. Perluas `right`, update freq, `maxFreq` (trik: cukup track maxFreq global monotonic — tidak perlu turun agar bound longeset valid tetap benar), lalu sementara invalid, geser `left`. O(n) amortized. Edge: `k` ≥ panjang string ⇒ jawaban n.

Struktur cepat:
- Observasi inti masalah: Homogen setelah edit sama dengan «semua ke huruf yang paling sering dalam window».
- Strategi final yang dipilih: Sliding window + array 26 atau Map freq.
- Kenapa strategi ini paling cocok: Kondisi validity checkable O(1) per langkah dengan freq.
- Time complexity: O(n)
- Space complexity: O(1) untuk A-Z
- Edge case utama: `k=0` → tanpa duplikat lanjutan panjang terpanjang 1 biasanya.

## 3) Versi Ultra Singkat (10-20 detik)

> Window valid jika `len - countMostFrequent ≤ k`; expand right, shrink left while invalid.

## 4) Pseudocode Ringkas (5-10 baris)

```text
freq[26] = 0
left = 0; maxFreq = 0; best = 0
for right in 0..n-1:
  freq[s[right]]++
  maxFreq = max(maxFreq, freq[s[right]])
  while (right - left + 1) - maxFreq > k:
    freq[s[left]]--
    left++
  best = max(best, right - left + 1)
return best
```

## 5) Implementasi Final (Inti Saja)

```js
function characterReplacement(s, k) {
  const freq = new Array(26).fill(0);
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s.charCodeAt(right) - 65;
    freq[c]++;
    maxFreq = Math.max(maxFreq, freq[c]);
    while (right - left + 1 - maxFreq > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Minimum edit dalam window = panjang − frekuensi huruf terbanyak di window; setelah edit itu ke huruf majoritas, sama dengan soal.
- Kenapa semua kasus valid tercakup: Setiap substring optimal memiliki ujung kanan tertentu — kita mempertahankan invariant window valid terpanjang untuk setiap `right`.
- Kenapa tidak ada kasus yang terlewat: `maxFreq` boleh tidak mengecil — bukti LC: jawaban tidak akan lebih kecil karena bound `right-left+1` tetap dihitung benar.

## 7) Dry Run Singkat

- Kasus normal: `s="AABABBA"`, `k=2` → 4 (mis. `"AAAA"` dengan 2 ganti).
- Kasus edge: `k=0` — longest run huruf sama asli.
- Hasil: Sesuai constraint replacement.

## 8) Red Flags (Yang Harus Dihindari)

- Menghitung ulang max freq setiap shrink O(26) setiap langkah—tetap O(n) tapi bisa dioptimasi (accept atau jelaskan).
- Mengira harus tahu huruf target secara eksplisit — cukup max dalam window.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Unicode — extend freq structure.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Binary search panjang + validity — O(n log n), lebih lambat dari sliding.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Longest dengan set karakter given — serupa beda constraint.

## 10) Trade-off Keputusan

- Opsi A: Sliding window — standar.
- Opsi B: Brute semua substring — terlalu lambat.
- Kenapa memilih opsi final: Linear.
- Risiko dari opsi final: Penjelasan `maxFreq` tidak turun.
- Mitigasi: Rujuk bukti resmi LC atau contoh kecil.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 8/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih penjelasan maxFreq monotonic trick.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Sliding window
- Inti masalah (1 kalimat): Panjang maks substring yang bisa dibuat seragam dengan ≤ k edit.
- Soal: Max length.
- Strategi final: Window + freq + contraction condition
- Kompleksitas: O(n), O(1) for A-Z
- 2 edge case: k very large; k=0
- 1 potensi bug: Recompute condition dengan salah
- 1 alasan solusi ini valid: Min changes = len − max count in window
