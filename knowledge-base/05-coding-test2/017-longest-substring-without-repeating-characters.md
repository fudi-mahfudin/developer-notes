# Longest Substring Without Repeating Characters

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Sliding window, hash map
- **Inti masalah:** Substring kontinu terpanjang tanpa karakter berulang.

---

- Soal: String `s`; return panjang substring valid terpanjang.
- Input: `s: string`
- Output: `number`
- Constraints utama: O(n) waktu per karakter amortized; O(min(n, charset)) ruang untuk map indeks/last seen.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Sliding window

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya pakai window `[left, right]` yang mewakili substring unik. `right` maju tiap karakter; jika karakter sudah ada di window, geser `left` ke `max(left, lastIndex+1)` (atau map last position +1). Panjang window `right-left+1` di-track sebagai jawaban. Map menyimpan indeks terakhir tiap karakter. O(n) satu pass, O(k) ruang untuk ukuran alfabet/unicode sesuai representasi. Edge: string kosong; semua sama.

Struktur cepat:
- Observasi inti masalah: Duplikat memotong window di kiri ke posisi setelah duplikat sebelumnya.
- Strategi final yang dipilih: Sliding window dengan `Map`/array untuk last index ASCII.
- Kenapa strategi ini paling cocok: Setiap `right` hanya geser `left` maju, tidak mundur — linear total.
- Time complexity: O(n)
- Space complexity: O(min(n, m)) untuk charset m
- Edge case utama: `""`; satu karakter; `abba` pattern untuk geser `left` benar.

## 3) Versi Ultra Singkat (10-20 detik)

> Dua pointer; map last index; `left = max(left, last[ch]+1)`; update jawaban panjang window.

## 4) Pseudocode Ringkas (5-10 baris)

```text
last = empty map
left = 0
best = 0
for right in 0..n-1:
  ch = s[right]
  if ch in last: left = max(left, last[ch] + 1)
  last[ch] = right
  best = max(best, right - left + 1)
return best
```

## 5) Implementasi Final (Inti Saja)

```js
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch)) left = Math.max(left, last.get(ch) + 1);
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: `left` selalu indeks mulai substring unik yang memuat `right`; semua karakter antara `left` dan `right` unik.
- Kenapa semua kasus valid tercakup: Setiap substring unik terpanjang punya ujung kanan `right` tertentu — algoritme mengukur panjangnya saat `right` di ujung tersebut.
- Kenapa tidak ada kasus yang terlewat: `left` hanya maju; tidak membuang solusi valid.

## 7) Dry Run Singkat

- Kasus normal: `"abcabcbb"` → 3 (`"abc"`).
- Kasus edge: `""` → 0; `"bbbbb"` → 1.
- Hasil: Panjang maksimum.

## 8) Red Flags (Yang Harus Dihindari)

- O(n²) per substring tanpa window.
- Menggeser `left` ke duplikat tanpa `max(left, ...)` (bug pada pola `abba`).
- Lupa Unicode vs ASCII — gunakan Map untuk karakter penuh.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Array ukuran 128 untuk ASCII jika diberikan.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Set + queue bisa O(n) tapi lebih mahal konstanta.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Longest dengan paling banyak k distink / at most k repeats — beda constraint window.

## 10) Trade-off Keputusan

- Opsi A: `Map` karakter → indeks — fleksibel Unicode.
- Opsi B: Array `last[128]` — cepat untuk ASCII.
- Kenapa memilih opsi final: Interview sering pakai string umum.
- Risiko dari opsi final: Pemahaman `last[ch]+1` vs reset seluruh window.
- Mitigasi: Uji `"abba"`.

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
- Catatan perbaikan: Latih analisis amoritisasi «total geser left ≤ n».

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Sliding window
- Inti masalah (1 kalimat): Substring terpanjang tanpa duplikat.
- Soal: Integer length.
- Strategi final: Last seen map + left bound
- Kompleksitas: O(n), O(alphabet)
- 2 edge case: empty; repeating pattern abba
- 1 potensi bug: left moves backward incorrectly
- 1 alasan solusi ini valid: Window always unique by construction
