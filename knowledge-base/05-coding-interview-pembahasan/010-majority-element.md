# Majority Element

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Array, counting / Boyer–Moore majority vote
- **Inti masalah:** Dengan jaminan ada elemen yang muncul lebih dari ⌊n/2⌋ kali, temukan elemen tersebut tanpa hitung frekuensi penuh jika memungkinkan.

---

- Soal: Diberi `nums` dengan jaminan majority element selalu ada, return elemennya.
- Input: `nums: number[]`
- Output: `number`
- Constraints utama: Solusi linier waktu dan konstan ruang ideal (alternatif: hash map O(n) ruang).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Boyer–Moore voting

## 2) Jawaban Ideal Singkat (30-60 detik)

> Majority berarti elemen itu «menang» dalam voting: tiap pasang bilangan berbeda membatalkan satu suara masing-masing. Algoritme Boyer–Moore menyimpan satu kandidat dan counter; counter 0 artinya kita ganti kandidat. Karena majority > n/2, elemen minoritas tidak bisa menghabisi semua suara majority, sehingga kandidat akhir pasti benar. Waktu O(n), ruang O(1). Tidak perlu pass kedua karena soal menjamin majority ada.

Struktur cepat:
- Observasi inti masalah: Hanya satu nilai yang bisa majority; pairing nilai berbeda tidak mengubah siapa yang menang global.
- Strategi final yang dipilih: Boyer–Moore: `candidate`, `count`; reset kandidat saat `count === 0`.
- Kenapa strategi ini paling cocok: Linier waktu, konstan ruang, bukti singkat dan interview-friendly (vs hash map yang O(n) ruang).
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: `n === 1`; array dengan banyak nilai berbeda (counter sering reset, jawaban tetap benar karena constraint).

## 3) Versi Ultra Singkat (10-20 detik)

> Voting Boyer–Moore: kandidat + counter; beda nilai mengurangi counter. Majority tetap tinggal di akhir.

## 4) Pseudocode Ringkas (5-10 baris)

```text
candidate = null
count = 0
for x in nums:
  if count == 0:
    candidate = x
  count += (x == candidate ? 1 : -1)
return candidate
```

## 5) Implementasi Final (Inti Saja)

```js
function majorityElement(nums) {
  let candidate = null;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Pada setiap langkah, elemen yang bukan majority bisa dipasangkan dengan elemen lain sehingga mengurangi counter secara «fair»; elemen majority memiliki lebih dari n/2 kemunculan sehingga tidak bisa habis dilawan semua.
- Kenapa semua kasus valid tercakup: Setiap elemen diproses tepat sekali; constraint menjamin ada jawaban unik yang memenuhi definisi majority.
- Kenapa tidak ada kasus yang terlewat: Jika tidak ada jaminan majority, perlu verifikasi kedua (tidak diminta di soal ini).

## 7) Dry Run Singkat

- Kasus normal: `nums = [2,2,1,1,1,2,2]` → majority 2 (counter tidak nol di akhir pada 2).
- Kasus edge: `nums = [1]` → `1`.
- Hasil: Sesuai expected untuk semua input valid.

## 8) Red Flags (Yang Harus Dihindari)

- Langsung coding tanpa klarifikasi constraints.
- Menggunakan sort O(n log n) hanya untuk mencari majority padahal linear cukup.
- Tidak menyebut kompleksitas.
- Mengira Boyer–Moore butuh pass kedua pada varian «k-th majority» tanpa klarifikasi.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Hash map O(n) waktu dan ruang mudah; Boyer–Moore untuk O(1) ruang bila majority dijamin.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Hash map lebih mudah di-generalisasi (mis. elemen > n/3); Boyer–Moore spesifik majority tunggal > n/2.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Boyer–Moore diperluas untuk «Boyer–Moore general» untuk k kandidat (mis. elemen > n/k).

## 10) Trade-off Keputusan

- Opsi A (lebih sederhana): `Map` hitung frekuensi, cari max — O(n) waktu, O(n) ruang.
- Opsi B (lebih optimal ruang): Boyer–Moore — O(n) waktu, O(1) ruang.
- Kenapa memilih opsi final: Soal classic LC menekankan majority terjamin; Boyer–Moore jawaban standar optimal ruang.
- Risiko dari opsi final: Tanpa constraint «majority ada», jawaban salah tanpa verifikasi.
- Mitigasi: Sebutkan asumsi soal; jika interviewer menghapus jaminan, tambah pass hitung frekuensi kandidat.

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
- Catatan perbaikan: Latih jelaskan kenapa Boyer–Moore tidak perlu sort.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Array, majority vote
- Inti masalah (1 kalimat): Temukan elemen yang muncul lebih dari setengah panjang array.
- Soal: Return majority element.
- Strategi final: Boyer–Moore voting
- Kompleksitas: O(n) waktu, O(1) ruang
- 2 edge case: n = 1; banyak elemen berbeda (counter sering nol)
- 1 potensi bug: Menggunakan algoritme ini tanpa jaminan majority
- 1 alasan solusi ini valid: Pasangan beda membatalkan; suara majority selalu menang
