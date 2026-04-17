# Trapping Rain Water

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Two pointers atau stack / monotonic
- **Inti masalah:** Hitung total air yang tertampung antar batu setelah hujan, diberi tinggi per indeks.

---

- Soal: `height[i]` tinggi batu; air tidak tumpah keluar sisi.
- Input: `height: number[]`
- Output: `number` (satuan volume dalam satuan lebar 1)
- Constraints utama: O(n) waktu, O(1) atau O(n) ruang tergantung metode.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Two pointers / stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> Air di indeks `i` ditentukan oleh `min(maxLeft, maxRight) - height[i]`. Pendekatan optimal ruang: dua pointer `L,R` dengan `leftMax` dan `rightMax`. Jika `height[L] < height[R]`, kita tahu level air di `L` dibatasi `leftMax` (karena ada tembok kanan setidaknya `height[R]`). Akumulasi water di `L` atau geser `L`. Simetris untuk `R`. O(n), O(1). Alternatif: prefix/suffix max array O(n) ruang jelas untuk pemula.

Struktur cepat:
- Observasi inti masalah: Volume per pilar = batas efektif dari kiri-kanan − tinggi.
- Strategi final yang dipilih: Dua pointer + tracking max kiri/kanan.
- Kenapa strategi ini paling cocok: Satu pass, konstan ruang, bukti via invariant water level.
- Time complexity: O(n)
- Space complexity: O(1) extra (dibanding dua array max)
- Edge case utama: Bentuk datar; lembah sempit; n < 3 tidak menampung.

## 3) Versi Ultra Singkat (10-20 detik)

> Dua pointer; selalu proses sisi dengan tinggi lebih kecil; kurangi `height[i]` dari `max` sisi yang relevan.

## 4) Pseudocode Ringkas (5-10 baris)

```text
L = 0; R = n - 1
leftMax = 0; rightMax = 0
ans = 0
while L < R:
  if height[L] < height[R]:
    leftMax = max(leftMax, height[L])
    ans += leftMax - height[L]
    L++
  else:
    rightMax = max(rightMax, height[R])
    ans += rightMax - height[R]
    R--
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function trap(height) {
  let L = 0, R = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let ans = 0;
  while (L < R) {
    if (height[L] < height[R]) {
      leftMax = Math.max(leftMax, height[L]);
      ans += leftMax - height[L];
      L++;
    } else {
      rightMax = Math.max(rightMax, height[R]);
      ans += rightMax - height[R];
      R--;
    }
  }
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Saat `height[L] < height[R]`, `rightMax` setidaknya `height[R]` jadi air di `L` tidak bisa «bocor» kanan sebelum kita selesai; kita isi sesuai `leftMax`. Simetris.
- Kenapa semua kasus valid tercakup: Setiap batang diproses saat menjadi ujung yang lebih pendek dibanding lawan.
- Kenapa tidak ada kasus yang terlewat: Semua indeks internal tercakup (proof: standard LC two-pointer trap).

## 7) Dry Run Singkat

- Kasus normal: `[0,1,0,2,1,0,1,3,2,1,2,1]` → 6.
- Kasus edge: `[3,0,0,2,0,4]` → 7.
- Hasil: Sesuai simulasi air.

## 8) Red Flags (Yang Harus Dihindari)

- O(n²) scan kiri/kanan tiap i tanpa diskusi.
- Menggunakan stack tanpa perlu jika diminta O(1) ruang.
- Salah mengurangkan dengan `height` tanpa update max.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: DP dua array prefix max jika pointer sulit dijelaskan.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Stack bagus untuk variasi «histogram» bentuk puncak; pointer lebih hemat memori.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: 2D trapping / dengan lubang — topik berbeda.

## 10) Trade-off Keputusan

- Opsi A: Arrays `prefixMax`, `suffixMax` — mudah dibuktikan, O(n) ruang.
- Opsi B: Two pointers — O(1) ruang, butuh penjelasan invariant.
- Kenapa memilih opsi final: Interview sering tanya solusi O(1) ruang.
- Risiko dari opsi final: Kesalahan kondisi `<` vs `<=` pada edge.
- Mitigasi: Dry run kecil + bandingkan dengan brute di contoh.

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
- Catatan perbaikan: Latih jelaskan kenapa aman mengunci sisi lebih pendek.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Two pointers / stack
- Inti masalah (1 kalimat): Tampung air berdasarkan min wall kiri-kanan.
- Soal: Total volume.
- Strategi final: Dual pointer + leftMax/rightMax
- Kompleksitas: O(n) time, O(1) extra
- 2 edge case: flat; one pit
- 1 potensi bug: Update max sebelum kurangi
- 1 alasan solusi ini valid: Tighter bound dari sisi lebih rendah terjamin oleh sisi lawan
