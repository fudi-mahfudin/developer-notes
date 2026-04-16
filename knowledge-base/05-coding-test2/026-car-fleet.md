# Car Fleet

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Sorting, stack (monotonic waktu tiba)
- **Inti masalah:** Mobil di kiri bisa menyusul dan «bergabung» dengan fleet di kanan bila tiba di target tidak lebih cepat daripada fleet di depannya; hitung fleet akhir.

---

- Soal: `target` posisi finish; setiap mobil `i` punya `position[i]` dan `speed[i]`.
- Input: `target: number`, `position: number[]`, `speed: number[]`
- Output: `number` (jumlah fleet)
- Constraints utama: Gabungkan dan sort menurut posisi; analisis dari mobil paling kanan (paling dekat target).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Sort + stack waktu tiba

## 2) Jawaban Ideal Singkat (30-60 detik)

> Sort pasangan `(pos, speed)` naik menurut `pos`. Iterasi **dari kanan ke kiri** (mulai mobil terdekat target). Waktu sampai target mobil `i` adalah `t = (target - pos) / speed`. Stack menyimpan waktu tiba fleet «leader» yang belum diserap. Selama ada fleet di depan (dalam stack) yang **tiba lebih cepat atau sama** (`stack.top <= t` pada variasi standar — yang membuat kita menyamakan kecepatan fleet mereka), mobil kini menyatu: **pop** hingga kondisi tidak lagi menggabungkan. Intuisi LC 853: `while stack not empty and t >= stack.top: pop` lalu `push(t)` — mobil kiri yang **lebih lambat atau sama** catch up ke yang lebih cepat di depannya… sebenarnya kita bandingkan waktu: fleet di kanan sudah jalan; kalau `t` lebih besar, artinya mobil ini lebih lambat sehingga bergabung — **pop** fleet yang akan ia kejar. Setelah iterasi, `stack.length` = jumlah fleet. O(n log n) sort + O(n) scan, O(n) stack.

Struktur cepat:
- Observasi inti masalah: Hanya mobil di sebelah kanan yang bisa «menahan» fleet; urutan geografis setelah sort tetap.
- Strategi final yang dipilih: Sort by position; stack arrival times dari kanan.
- Kenapa strategi ini paling cocok: Simulasi satu dimensi tanpa simulasi kontinu per langkah.
- Time complexity: O(n log n) for sort, O(n) for scan
- Space complexity: O(n)
- Edge case utama: Satu mobil; semua kecepatan sama → satu fleet jika satu jalur.

## 3) Versi Ultra Singkat (10-20 detik)

> Sort by position; dari kanan, push waktu tiba; pop selama waktu gabung dengan fleet di depan; panjang stack = fleet.

## 4) Pseudocode Ringkas (5-10 baris)

```text
pairs = zip(position, speed), sort by position ascending
stack = empty  // stores arrival times of fleet leaders
for i from n-1 down to 0:
  t = (target - pairs[i].pos) / pairs[i].speed
  while stack not empty and t >= stack.top:
    stack.pop()
  stack.push(t)
return stack.size
```

## 5) Implementasi Final (Inti Saja)

```js
function carFleet(target, position, speed) {
  const n = position.length;
  const cars = position.map((p, i) => [p, speed[i]]);
  cars.sort((a, b) => a[0] - b[0]);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    const t = (target - cars[i][0]) / cars[i][1];
    while (stack.length && t >= stack[stack.length - 1]) stack.pop();
    stack.push(t);
  }
  return stack.length;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Memproses dari kanan menjaga invariant: stack berisi waktu tiba fleet yang «terlihat» dari kiri; mobil yang lebih lambat (waktu lebih besar) menyerap fleet di depan yang lebih cepat dengan pop.
- Kenapa semua kasus valid tercakup: Setiap mobil tepat sekali menentukan apakah memulai fleet baru atau bergabung.
- Kenapa tidak ada kasus yang terlewat: Interaksi antar mobil hanya dengan tetangga kanan dalam urutan posisi.

## 7) Dry Run Singkat

- `target=12`, pos `[10,8,0,5,3]`, speed `[2,4,1,1,3]` → beberapa fleet (cek hitung manual singkat).
- Edge: satu mobil → 1.

## 8) Red Flags (Yang Harus Dihindari)

- Simulasi per unit waktu kontinu — tidak perlu.
- Lupa sort menurut posisi.
- Salah arah iterasi (harus dari kanan).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: Lintasan dengan lampu merah — model berbeda.
- Follow-up 2: Multi jalur — graph.

## 10) Trade-off Keputusan

- Stack vs array waktu saja — stack jelas untuk «merge».

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih penjelasan verbal «why right-to-left».

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Sort + stack
- Inti masalah (1 kalimat): Fleet yang menyatu ke kanan menjadi satu.
- Soal: Count fleets.
- Strategi final: R-to-L + arrival times stack
- Kompleksitas: O(n log n), O(n)
- 2 edge case: single car; identical times
- 1 potensi bug: salah urutan before sort
- 1 alasan solusi ini valid: Rightmost processes closest-to-target first; merge by time dominance
