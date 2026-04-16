# Container With Most Water

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Two pointers, greedy reasoning
- **Inti masalah:** Pilih dua garis vertikal sehingga luas air = jarak horizontal × tinggi garis lebih pendek maksimum.

---

- Soal: Diberi `height[i]` tinggi garis ke-i, maksimalkan `(j-i) * min(height[i],height[j])`.
- Input: `height: number[]`
- Output: `number` (luas maksimum)
- Constraints utama: O(n) waktu ada dengan dua pointer; brute O(n²).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Two pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> Luas ditentukan oleh garis lebih pendek dari pasangan; mulai dari ujung kiri dan kanan dengan pointer `L,R`. Area = `(R-L)*min(h[L],h[R])`. Untuk memaksimalkan, kita geser pointer di sisi yang lebih pendek: memindahkan garis lebih tinggi tidak pernah meningkatkan min dan hanya memperpendek jarak, sementara memindahkan yang lebih pendek bisa menemukan min lebih besar. Satu pass O(n), O(1) ruang. Bukti greedy: menyingkirkan garis lebih tinggi tidak bisa menuju optimum baru.

Struktur cepat:
- Observasi inti masalah: Botleneck adalah `min` dari dua ujung; shrinking harus coba naikkan bottleneck.
- Strategi final yang dipilih: Start `L=0`, `R=n-1`, track `maxArea`, pindahkan sisi dengan tinggi lebih kecil.
- Kenapa strategi ini paling cocok: Membuang ruang solusi yang tidak perlu secara aman.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: `n=2`; semua nol; bentuk monoton.

## 3) Versi Ultra Singkat (10-20 detik)

> Dua pointer; simpan luas; selalu geser ujung dengan tinggi lebih kecil.

## 4) Pseudocode Ringkas (5-10 baris)

```text
L = 0; R = n - 1
best = 0
while L < R:
  best = max(best, (R - L) * min(height[L], height[R]))
  if height[L] < height[R]: L++
  else: R--
return best
```

## 5) Implementasi Final (Inti Saja)

```js
function maxArea(height) {
  let L = 0, R = height.length - 1;
  let best = 0;
  while (L < R) {
    const h = Math.min(height[L], height[R]);
    best = Math.max(best, (R - L) * h);
    if (height[L] < height[R]) L++;
    else R--;
  }
  return best;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Setiap pasangan optimum pasti dipertimbangkan ketika pointer mencakup kedua indeks itu di beberapa langkah, atau pasangan yang lebih baik ditemukan lebih awal; menggeser garis lebih tinggi aman untuk dibuang karena tidak ada pasangan dengan garis pendek itu yang bisa mengalahkan best yang mungkin dengan jarak lebih lebar terhadap pointer lain (proof by elimination kasus LC standar).
- Kenapa semua kasus valid tercakup: Pointer menyapu kemungkinan width mengecil sambil eksplorasi height.
- Kenapa tidak ada kasus yang terlewat: Greedy move pada sisi min adalah strategi standar terbukti untuk soal ini.

## 7) Dry Run Singkat

- Kasus normal: `[1,8,6,2,5,4,8,3,7]` → area 49 (indeks 1 dan 8).
- Kasus edge: `[1,1]` → 1.
- Hasil: Sesuai maksimum.

## 8) Red Flags (Yang Harus Dihindari)

- Brute dua loop O(n²) tanpa diskusi.
- Menggeser kedua pointer sekaligus secara acak.
- Lupa `min` dari dua tinggi.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Sudah optimal; segment tree overkill.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: DP tidak cocok — struktur greedy jelas.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Trapping rain water — akumulasi air per indeks, konteks berbeda.

## 10) Trade-off Keputusan

- Opsi A: Two pointers greedy — linear.
- Opsi B: Coba semua pasangan — kuadratik.
- Kenapa memilih opsi final: Bukti greedy untuk dua pointer.
- Risiko dari opsi final: Penjelasan oral harus jelas saat `height[L]==height[R]`.
- Mitigasi: Boleh `R--` atau `L++` jika sama — keduanya valid.

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
- Catatan perbaikan: Latih proof singkat «why move shorter line».

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Two pointers
- Inti masalah (1 kalimat): Maksimalkan luas persegi panjang antara dua tiang.
- Soal: Max area.
- Strategi final: Shorter line moves inward
- Kompleksitas: O(n), O(1)
- 2 edge case: n=2; tie height
- 1 potensi bug: Salah arah saat equal — tetap OK dengan konsistensi
- 1 alasan solusi ini valid: Lebih pendek membatasi air; exploring tinggi baru harus geser sisi limit
