# Sliding Window Maximum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Monotonic deque / heap
- **Inti masalah:** Untuk setiap window berukuran `k` bergeser satu di array, outputkan maksimum di window tersebut.

---

- Soal: `nums`, `k`; return array jawaban panjang `n-k+1`.
- Input: `nums: number[]`, `k: number`
- Output: `number[]`
- Constraints utama: O(n) dengan deque monotonik menurun (indices dengan nilai besar di depan); heap O(n log k) alternatif.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Deque, sliding window

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan indeks di deque sedemikian sehingga nilai `nums` untuk indeks di deque monoton menurun dari depan ke belakang: depan selalu indeks elemen maksimum di window saat ini. Saat `i` maju, keluarkan indeks di luar window dari depan (while `front < i-k+1`), keluarkan dari belakang selama `nums[i]` ≥ `nums[back]` (mereka tidak akan jadi max selama `i` masuk window). Push `i`. Setiap kali `i ≥ k-1`, jawaban adalah `nums[deque.front]`. O(n) total karena setiap indeks masuk/keluar deque paling sekali. Ruang O(k) untuk deque.

Struktur cepat:
- Observasi inti masalah: Max window adalah kandidat yang tidak «dibayangi» elemen lebih baru yang lebih besar atau sama.
- Strategi final yang dipilih: Monotonic decreasing deque of indices.
- Kenapa strategi ini paling cocok: Linear dan menjawab semua window sekali jalan.
- Time complexity: O(n)
- Space complexity: O(k)
- Edge case utama: `k=1`; `k=n`; elemen sama semua.

## 3) Versi Ultra Singkat (10-20 detik)

> Deque indeks; pop from back while smaller; pop from front if out of window; max = front.

## 4) Pseudocode Ringkas (5-10 baris)

```text
deque = empty (stores indices)
result = []
for i in 0..n-1:
  while deque not empty and deque.front <= i - k: pop_front
  while deque not empty and nums[deque.back] <= nums[i]: pop_back
  push_back i
  if i >= k - 1: append nums[deque.front] to result
return result
```

## 5) Implementasi Final (Inti Saja)

```js
function maxSlidingWindow(nums, k) {
  const dq = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}
```

*(Untuk performa JS murni interview, sebutkan bahwa `shift` di array O(n) — idealnya deque khusus atau simpan head pointer; dalam Python `collections.deque` O(1).)*

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Elemen di deque urut menurun nilai; elemen yang dikeluarkan dari belakang tidak akan pernah menjadi max untuk window current atau future selama `i` ada.
- Kenapa semua kasus valid tercakup: Tiap window mempertahankan kandidat max valid di front.
- Kenapa tidak ada kasus yang terlewat: Setiap posisi i dipertimbangkan sebagai max potensial saat dimasukkan.

## 7) Dry Run Singkat

- Kasus normal: `nums=[1,3,-1,-3,5,3,6,7]`, `k=3` → `[3,3,5,5,6,7]`.
- Kasus edge: `k=n` → satu elemen max array.
- Hasil: Max per window.

## 8) Red Flags (Yang Harus Dihindari)

- Re-max setiap window O(k) → O(nk) total.
- Menggunakan `shift` pada array besar tanpa menyebut kompleksitas amoritisasi di JS.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Min sliding window — deque monoton naik.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Max-heap — O(n log k), lebih sederhana konsep tapi lebih lambat.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Sliding window median — dua heap atau multiset.

## 10) Trade-off Keputusan

- Opsi A: Deque monotonic — O(n).
- Opsi B: Priority queue — O(n log k).
- Kenapa memilih opsi final: Optimal waktu.
- Risiko dari opsi final: Implementasi deque indeks error-prone.
- Mitigasi: Uji contoh step-by-step.

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
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Di JS gunakan indeks head untuk hindari `shift` O(n), atau terangkan trade-off.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Monotonic deque
- Inti masalah (1 kalimat): Max tiap subarray panjang k bergeser.
- Soal: Array jawaban.
- Strategi final: Decreasing deque of indices
- Kompleksitas: O(n) time, O(k) space
- 2 edge case: k=1; decreasing array
- 1 potensi bug: Off-by-one window eviction
- 1 alasan solusi ini valid: Elemen terkalahkan keluar dari belakang sebelum i
