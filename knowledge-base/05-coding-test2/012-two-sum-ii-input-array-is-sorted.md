# Two Sum II — Input Array Is Sorted

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Two pointers, array terurut
- **Inti masalah:** Temukan dua indeks (1-based sering di LC) yang jumlahnya sama dengan target, memanfaatkan sorting.

---

- Soal: `numbers` naik terurut; cari dua indeks berbeda dengan jumlah `target` (biasanya harus 1-based di output).
- Input: `numbers: number[]`, `target: number`
- Output: `[i, j]` (indeks sesuai soal, sering 1-based)
- Constraints utama: Satu solusi dijamin; O(n) waktu, O(1) ruang.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Two pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> Karena array terurut naik, saya taruh pointer kiri (kecil) dan kanan (besar). Jika jumlah sama target, selesai; jika jumlah terlalu kecil, geser kiri naik; jika terlalu besar, geser kanan turun. Ini memanfaatkan monotonisitas: memindahkan salah satu pointer secara deterministik mendekati target. O(n) satu pass, O(1) ruang. Perhatikan soal minta indeks 1-based atau 0-based.

Struktur cepat:
- Observasi inti masalah: Sort memungkinkan eliminasi seperti binary search dua ujung.
- Strategi final yang dipilih: `L = 0`, `R = n-1`, sesuaikan berdasarkan perbandingan `sum` dengan `target`.
- Kenapa strategi ini paling cocok: Linear dan tidak perlu hash map karena tidak ada kehilangan struktur order.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: Dua elemen saja; angka duplikat.

## 3) Versi Ultra Singkat (10-20 detik)

> Dua pointer: jumlah kecil → L++; jumlah besar → R-- sampai ketemu.

## 4) Pseudocode Ringkas (5-10 baris)

```text
L = 0
R = n - 1
while L < R:
  sum = numbers[L] + numbers[R]
  if sum == target: return [L + 1, R + 1]   // if problem uses 1-based indices
  if sum < target: L++
  else: R--
```

## 5) Implementasi Final (Inti Saja)

```js
function twoSum(numbers, target) {
  let L = 0;
  let R = numbers.length - 1;
  while (L < R) {
    const sum = numbers[L] + numbers[R];
    if (sum === target) return [L + 1, R + 1];
    if (sum < target) L++;
    else R--;
  }
  return [];
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Semua pasangan `(L,R)` yang mungkin untuk jawaban tetap dalam rentang pencarian; memindahkan pointer yang tepat tidak membuang solusi yang valid (bukti exchange: jika `sum < target`, `numbers[L]` terlalu kecil untuk dipasangkan dengan elemen ≤ posisi L saat ini dengan R tetap).
- Kenapa semua kasus valid tercakup: Setiap langkah mengurangi ruang pencarian secara monoton menuju satu pasangan (dijamin ada).
- Kenapa tidak ada kasus yang terlewat: Duplikat diperbolehkan; pointer tidak melewati solusi unik yang dijamin.

## 7) Dry Run Singkat

- Kasus normal: `numbers = [2,7,11,15]`, `target = 9` → `[1,2]`.
- Kasus edge: `[1,2]` target `3` → `[1,2]`.
- Hasil: Indeks sesuai konvensi soal.

## 8) Red Flags (Yang Harus Dihindari)

- Hash map O(n) ruang padahal dua pointer cukup.
- Keliru indeks 0-based vs 1-based di output.
- Langsung nested loop O(n²).

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Binary search untuk pasangan — O(n log n); dua pointer O(n) lebih baik.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Hash map tetap valid jika tidak terurut; di sini sorting diberikan.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: K banyak pasangan / closest sum — ubah logika berhenti dan output.

## 10) Trade-off Keputusan

- Opsi A: Dua pointer — optimal untuk terurut.
- Opsi B: Map value→index — untuk dua sum tanpa sort (varian lain).
- Kenapa memilih opsi final: Input sudah sorted array II.
- Risiko dari opsi final: Salah arah gerak pointer.
- Mitigasi: Tulis invariant «sum terlalu kecil ⇒ perlu nilai lebih besar ⇒ L++».

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
- Catatan perbaikan: Bukti informal «why pointer move is safe» latihan lisan.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Two pointers
- Inti masalah (1 kalimat): Dua indeks pada array terurut dengan jumlah tepat.
- Soal: Return indeks pair (biasanya 1-based).
- Strategi final: L/R sweep
- Kompleksitas: O(n), O(1)
- 2 edge case: n = 2; duplikat
- 1 potensi bug: Output indeks off-by-one
- 1 alasan solusi ini valid: Monotonic search space shrink tanpa buang solusi
