# Minimum Window Substring

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Sliding window, frequency multiset
- **Inti masalah:** Substring terpendek di `s` yang memuat semua karakter `t` dengan multiplisitas yang cukup.

---

- Soal: Cari substring minimum `s[l..r]` yang mencakup multiset `t` (biasanya case-sensitive).
- Input: `s: string`, `t: string`
- Output: `string` ("" jika tidak ada)
- Constraints utama: O(|s|+|t|) atau O(|s|·alphabet) dengan window; dua map `need` dan `have`.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Sliding window + required count

## 2) Jawaban Ideal Singkat (30-60 detik)

> Hitung kebutuhan per karakter di `t` (`need`). `right` jalan maju, update `have` dan `formed` (berapa karakter yang requirement-nya sudah terpenuhi). Saat window valid (`formed == uniqueNeed`), coba persempit dengan menggeser `left` sampai tidak valid, sambil track indeks window terpendek. Window invalid atau belum cukup ⇒ geser `right` lagi. O(n) scanned `right` sekali, `left` paling n kali. Ruang O(k) untuk alfabet. Edge: `t` lebih panjang dari `s`; duplikat di `t`.

Struktur cepat:
- Observasi inti masalah: Validity hanya bergantung pada frekuensi relatif dalam window vs `need`.
- Strategi final yang dipilih: Expand/shrink sliding window dengan counter `required` satisfied.
- Kenapa strategi ini paling cocok: Setiap pergeseran meningkatkan/menurunkan progress deterministik menuju substring minimal.
- Time complexity: O(|s| + |t|) (pointer maju total linear)
- Space complexity: O(|unique in alphabet|)
- Edge case utama: `t` kosong (sering edge LC: return ""); tidak ada jawaban.

## 3) Versi Ultra Singkat (10-20 detik)

> Hitung kebutuhan `t`; expand dengan `right` sampai valid; shrink `left` untuk minimum; repeat.

## 4) Pseudocode Ringkas (5-10 baris)

```text
build need map from t
have = empty map
formed = 0; required = size(need)
left = 0; bestLen = infinity; bestL = 0
for right in 0..n-1:
  add s[right] to have; if have[ch] == need[ch]: formed++
  while formed == required:
    update best window if smaller
    remove s[left]; if have[ch] < need[ch]: formed--
    left++
return slice(bestL, bestL+bestLen) or ""
```

## 5) Implementasi Final (Inti Saja)

```js
function minWindow(s, t) {
  if (!t.length) return "";
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  const have = new Map();
  let formed = 0, required = need.size;
  let left = 0, bestLen = Infinity, start = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    have.set(ch, (have.get(ch) || 0) + 1);
    if (need.has(ch) && have.get(ch) === need.get(ch)) formed++;
    while (formed === required) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        start = left;
      }
      const c = s[left];
      have.set(c, have.get(c) - 1);
      if (need.has(c) && have.get(c) < need.get(c)) formed--;
      left++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(start, start + bestLen);
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Window valid ⇔ multiset `have` mengcover `need`; shrinking hingga border pertama yang invalid memberikan window minimal untuk ujung kanan tertentu yang sama.
- Kenapa semua kasus valid tercakup: Setiap substring optimum punya pasangan `(left,right)` — algoritma mengunjungi semua `right` dan minimum `left` yang masih valid per fase expand.
- Kenapa tidak ada kasus yang terlewat: Bukti standar sliding window untuk minimum covering substring.

## 7) Dry Run Singkat

- Kasus normal: `s="ADOBECODEBANC"`, `t="ABC"` → `"BANC"`.
- Kasus edge: tidak ada window → `""`.
- Hasil: Minimal sesuai constraint.

## 8) Red Flags (Yang Harus Dihindari)

- Nested loop brute O(n³) substring.
- Salah hitung `formed` saat duplikat di `t`.
- Return window bukan minimal karena tidak shrink setelah valid.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Array 128 untuk ASCII jika `s` kecil charset.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Minimum window multiset dengan wildcard — perlu generalisasi matcher.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Concatenate all words — hard variant (different problem).

## 10) Trade-off Keputusan

- Opsi A: Dua map `need`/`have` — fleksibel.
- Opsi B: Array fixed 26 — jika dibatasi huruf kecil saja.
- Kenapa memilih opsi final: Umum.
- Risiko dari opsi final: Update `formed` salah satu off.
- Mitigasi: Hanya increment `formed` saat mencapai tepat target untuk pertama kali per karakter requirement.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 8/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Trace contoh kecil untuk `formed` increments.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Sliding window
- Inti masalah (1 kalimat): Cover multiset `t` dengan substring `s` terpendek.
- Soal: Substring minimum.
- Strategi final: Expand + shrink + formed counter
- Kompleksitas: O(|s|+|t|), O(alphabet) space
- 2 edge case: impossible; duplicate letters in t
- 1 potensi bug: formed/need mismatch on decrement
- 1 alasan solusi ini valid: Monotonic left per valid window captures minimum for each phase
