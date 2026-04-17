# Daily Temperatures

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Monotonic stack (next greater element)
- **Inti masalah:** Untuk tiap hari, berapa hari harus menunggu sampai suhu lebih hangat; jika tidak ada, 0.

---

- Soal: `temperatures[i]` integer; return `answer[i]` = jarik ke hari pertama dengan `temperatures[j] > temperatures[i]`, atau 0.
- Input: `temperatures: number[]`
- Output: `number[]`
- Constraints utama: O(n) dengan stack monoton turun indeks (cari next greater); brute O(n²).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Monotonic stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan indeks di stack dengan nilai suhu menurun (monotonic decreasing). Saat `temperatures[i]` lebih besar dari suhu indeks stack top, kita menemukan «next warmer day» untuk hari tersebut: `answer[idx] = i - idx`, lalu pop. Ulangi sampai top tidak lebih dingin dari hari ini atau stack kosong, lalu push `i`. Iterasi sampai akhir; indeks yang tersisa stack tidak punya next warmer ⇒ 0 sudah default. O(n) karena setiap indeks push/pop paling sekali. Ruang O(n) untuk stack jawaban array.

Struktur cepat:
- Observasi inti masalah: Ini varian next greater element dengan jarak.
- Strategi final yang dipilih: Monotonic decreasing stack of indices.
- Kenapa strategi ini paling cocok: Tiap perbandingan menyelesaikan backlog hari yang menunggu warmer future.
- Time complexity: O(n)
- Space complexity: O(n)
- Edge case utama: Monoton menurun (semua 0); semua sama (semua 0); single day.

## 3) Versi Ultra Singkat (10-20 detik)

> Stack indeks suhu turun; ketika hari lebih panas, pop dan isi wait = i − idx.

## 4) Pseudocode Ringkas (5-10 baris)

```text
n = len(temperatures)
ans = array of n zeros
stack = empty
for i in 0..n-1:
  while stack not empty and temperatures[i] > temperatures[stack.top]:
    idx = pop stack
    ans[idx] = i - idx
  push i on stack
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && temperatures[i] > temperatures[st[st.length - 1]]) {
      const idx = st.pop();
      ans[idx] = i - idx;
    }
    st.push(i);
  }
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Elemen di stack adalah hari yang belum menemukan next warmer; ketika hari panas datang, ini adalah first future day lebih tinggi untuk semua yang di-pop (karena suhu tidak meningkat hingga saat ini di antara mereka — monotonic property).
- Kenapa semua kasus valid tercakup: Setiap pasangan (earlier, later) dengan next greater pertama dicek ketika later diproses.
- Kenapa tidak ada kasus yang terlewat: Jika tidak ada hari lebih hangat, indeks tetap di stack hingga akhir.

## 7) Dry Run Singkat

- Kasus normal: `[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`.
- Kasus edge: `[30,30,30]` → `[0,0,0]`.
- Hasil: Hari tunggu masing-masing.

## 8) Red Flags (Yang Harus Dihindari)

- Nested loop O(n²) untuk setiap i scan ke depan.
- Menggunakan queue bukan stack untuk pola ini (salah struktur).

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Serupa next greater element II (circular) — duplikasi array atau dua pass.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Brute jelas O(n²) — acceptable if n kecil saja.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Stock span — sangat terkait (monotonic stack).

## 10) Trade-off Keputusan

- Opsi A: Monotonic stack — optimal.
- Opsi B: Dari kanan dengan struktur tambahan — bisa tapi lebih rumit.
- Kenapa memilih opsi final: Standar NGE linear.
- Risiko dari opsi final: Salah arah perbandingan (strict greater).
- Mitigasi: Ikuti soal `>` vs `>=`.

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
- Catatan perbaikan: Hubungkan dengan pola next greater universal.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Monotonic stack
- Inti masalah (1 kalimat): Jarak ke hari pertama lebih panas.
- Soal: Array wait days.
- Strategi final: Decreasing stack of indices
- Kompleksitas: O(n), O(n)
- 2 edge case: strictly increasing (mostly 1s); all equal
- 1 potensi bug: using >= instead of > breaks definition
- 1 alasan solusi ini valid: Next warmer for cooler days resolved in order
