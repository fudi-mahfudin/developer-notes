# Permutation in String

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Sliding window fixed size, frequency match
- **Inti masalah:** Apakah ada substring berurutan di `s1` yang merupakan permutasi dari `s2` (panjang sama, multiset karakter sama)?

---

- Soal: `s1`, `s2`; return true jika `s1` mengandung substring panjang `len(s2)` yang anagram dari `s2`.
- Input: `s1: string`, `s2: string`
- Output: `boolean`
- Constraints utama: O(|s1|) window slide; O(1) per langkah untuk alphabet kecil.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Fixed sliding window / rolling hash optional

## 2) Jawaban Ideal Singkat (30-60 detik)

> Jika `len(s2) > len(s1)` langsung false. Buat count kebutuhan karakter `s2` (`need`), lalu window pertama di `s1` panjang m. Bandingkan `windowCount` vs `need`, atau lebih efisien: `diff` = jumlah posisi freq yang belum match, update saat slide: keluar karakter kiri, masuk kanan. Ketika semua frekuensi match ⇒ true. O(|s1|) waktu, O(alphabet) ruang. Edge: string panjang sama persis.

Struktur cepat:
- Observasi inti masalah: Anagram = frekuensi identik pada panjang tetap.
- Strategi final yang dipilih: Rolling window fixed length m dengan array 26 atau Map.
- Kenapa strategi ini paling cocok: Update O(1) per slide untuk alphabet konstan.
- Time complexity: O(|s1|)
- Space complexity: O(1) untuk huruf kecil Inggris
- Edge case utama: `s2` kosong (definisi soal — biasanya false atau true, klarifikasi); `m=1`.

## 3) Versi Ultra Singkat (10-20 detik)

> Window panjang `s2` di `s1`; rolling update freq; bandingkan dengan freq `s2`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if len(s2) > len(s1): return false
need = count(s2)
window = count(s1[0..m-1])
if window == need: return true
for i from m to len(s1)-1:
  remove s1[i-m] from window
  add s1[i] to window
  if window == need: return true
return false
```

*(Implementasi produksi memakai array 26 dan equality check, bukan deep compare setiap slide.)*

## 5) Implementasi Final (Inti Saja)

```js
// LeetCode: s1 = teks panjang, s2 = pattern yang dicari permutasinya
function checkInclusion(s1, s2) {
  if (s2.length > s1.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const ix = (c) => c.charCodeAt(0) - 97;

  for (const c of s2) need[ix(c)]++;
  for (let i = 0; i < s2.length; i++) win[ix(s1[i])]++;
  const match = () => win.every((v, i) => v === need[i]);
  if (match()) return true;

  for (let i = s2.length; i < s1.length; i++) {
    win[ix(s1[i - s2.length])]--;
    win[ix(s1[i])]++;
    if (match()) return true;
  }
  return false;
}
```

*(Catatan: untuk interview, optimasi `match()` menjadi O(26) amortized dengan `satisfied` counter — kurangi pemanggilan each slide.)*

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Substring panjang m anagram `s2` iff frekuensi karakter identik; sliding window memeriksa semua posisi mulai yang mungkin tepat sekali.
- Kenapa semua kasus valid tercakup: Semua start index 0..|s1|-m diperiksa.
- Kenapa tidak ada kasus yang terlewat: Window bergeser satu per satu tanpa overlap yang terlewat.

## 7) Dry Run Singkat

- Kasus normal: `s1="oidbcaf"`, `s2="ab"` → true (`"ba"`).
- Kasus edge: `s2` tidak subset alphabet — false.
- Hasil: Sesuai inclusion.

## 8) Red Flags (Yang Harus Dihindari)

- Sort sliding substring setiap kali — O(m log m) per slide.
- Salah panjang window.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: `satisfied` counter — track berapa indeks `i` dengan `win[i]==need[i]`.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Rolling hash (Rabin–Karp) — risiko collision, lebih kompleks.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Find all anagrams — return indices, sama slide.

## 10) Trade-off Keputusan

- Opsi A: Array 26 + satisfied count — cepat.
- Opsi B: `Map` char → count — Unicode safe.
- Kenapa memilih opsi final: Soal LC typically lowercase English.
- Risiko dari opsi final: Asumsi `a-z` — klarifikasi.
- Mitigasi: Ganti ke Map jika perlu.

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
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Gantikan `match()` every slide dengan diff counter untuk polish.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Fixed window
- Inti masalah (1 kalimat): Anagram `s2` sebagai substring kontigu dalam `s1`.
- Soal: Boolean.
- Strategi final: Rolling freq + compare
- Kompleksitas: O(|s1|), O(1) untuk a-z
- 2 edge case: len(s2)>len(s1); single char
- 1 potensi bug: Off-by-one saat slide
- 1 alasan solusi ini valid: Semua substring panjang m dicek via sliding
