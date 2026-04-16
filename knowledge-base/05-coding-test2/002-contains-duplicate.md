# Contains Duplicate

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Array & HashSet
- **Inti masalah:** Mengecek apakah ada nilai yang muncul lebih dari satu kali.

---

- Soal: Diberi array integer, kembalikan true jika ada duplikat, false jika semua unik.
- Input: nums: number[]
- Output: boolean
- Constraints utama: Panjang array bisa besar, butuh solusi efisien.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): HashSet

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya mulai dari observasi bahwa pola soal ini paling cocok diselesaikan dengan **HashSet**. Strategi intinya adalah menyimpan informasi yang dibutuhkan agar keputusan di tiap langkah bisa diambil dalam waktu konstan atau linear. Dengan strategi ini, solusi tetap efisien untuk ukuran input besar dan tetap mudah dijelaskan saat interview. Saya juga cek edge case utama seperti input kosong, nilai duplikat, atau kombinasi khusus sesuai constraints. Hasil akhirnya memenuhi kebutuhan correctness dan performa.

Struktur cepat:
- Observasi inti masalah: Permasalahan bisa dipetakan ke pola HashSet.
- Strategi final yang dipilih: Gunakan HashSet untuk menghindari perhitungan berulang.
- Kenapa strategi ini paling cocok: Memberikan keseimbangan terbaik antara simplicity dan efficiency.
- Time complexity: O(n) *(kecuali disebut lain pada kasus signature sorting)*.
- Space complexity: O(n) / O(1) tergantung struktur data.
- Edge case utama: Input minimal, duplikat, dan nilai batas.

## 3) Versi Ultra Singkat (10-20 detik)

> Gunakan Set untuk deteksi cepat: kalau elemen sudah pernah ada, langsung true. O(n) time, O(n) space.

## 4) Pseudocode Ringkas (5-10 baris)

```text
empty set
for each x in nums:
  if x exists in set: return true
  add x to set
return false
```

## 5) Implementasi Final (Inti Saja)

```js
function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Tiap iterasi mempertahankan informasi yang cukup untuk menentukan jawaban parsial yang benar.
- Kenapa semua kasus valid tercakup: Semua elemen diproses sistematis sesuai pola inti.
- Kenapa tidak ada kasus yang terlewat: Edge case kunci sudah ditangani eksplisit oleh kondisi loop/lookup.

## 7) Dry Run Singkat

- Kasus normal: nums=[1,2,3,1] -> true
- Kasus edge: nums=[] -> false
- Hasil: Sesuai expected output.

## 8) Red Flags (Yang Harus Dihindari)

- Langsung coding tanpa klarifikasi constraints.
- Salah pilih data structure untuk pola soal.
- Tidak menyebut kompleksitas.
- Tidak cek edge case minimum.
- Kode benar di kasus normal tapi gagal di batasan input.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Saya evaluasi apakah ada cara menurunkan kompleksitas waktu/ruang tanpa mengorbankan correctness.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Saya jelaskan trade-off readability vs performa, lalu pilih yang paling sesuai constraints.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Saya adaptasi pola inti ke constraint baru sambil menjaga invariant solusi.

## 10) Trade-off Keputusan

- Opsi A (lebih sederhana): Brute force / pendekatan langsung tapi lebih mahal.
- Opsi B (lebih optimal): Gunakan pola utama dan struktur data pendukung.
- Kenapa memilih opsi final: Sesuai constraints dan lebih scalable.
- Risiko dari opsi final: Implementasi lebih mudah salah di edge case.
- Mitigasi: Verifikasi invariant + dry run kasus tepi.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Tambahkan 1-2 test tambahan untuk edge case ekstrem saat latihan.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan:
- Topik utama:
- Inti masalah (1 kalimat):
- Soal:
- Strategi final:
- Kompleksitas:
- 2 edge case:
- 1 potensi bug:
- 1 alasan solusi ini valid:

