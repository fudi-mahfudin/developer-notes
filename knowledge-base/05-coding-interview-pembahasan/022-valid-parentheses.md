# Valid Parentheses

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Stack
- **Inti masalah:** String hanya `()` `[]` `{}`; apakah urutan buka-tutup valid menurut aturan nesting?

---

- Soal: Return true if bracket sequence valid.
- Input: `s: string`
- Output: `boolean`
- Constraints utama: O(n) satu pass; stack size O(n).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> Scan kiri ke kanan: buka push ke stack; tutup harus cocok dengan top stack (`(` → `)`, dst). Map atau if untuk expected closing. Jika stack kosong saat tutup atau mismatch ⇒ false. Akhir: stack harus kosong. O(n) waktu, O(n) ruang worst case semua buka. Edge: string kosong (biasanya true); satu pasangan; salah urutan.

Struktur cepat:
- Observasi inti masalah: Validitas = konteks nesting terakhir ditutup dulu (LIFO).
- Strategi final yang dipilih: Stack karakter buka atau stack expected close.
- Kenapa strategi ini paling cocok: Natural untuk bracket matching.
- Time complexity: O(n)
- Space complexity: O(n)
- Edge case utama: `"]"` pertama; `"((]);"`.

## 3) Versi Ultra Singkat (10-20 detik)

> Stack buka; tutup harus cocok top; akhir stack kosong.

## 4) Pseudocode Ringkas (5-10 baris)

```text
stack = []
map = {')':'(', ']':'[', '}':'{'}
for ch in s:
  if ch is opening: push ch
  else:
    if stack empty or stack.pop() != map[ch]: return false
return stack is empty
```

## 5) Implementasi Final (Inti Saja)

```js
function isValid(s) {
  const stack = [];
  const pair = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else {
      if (!stack.length || stack.pop() !== pair[ch]) return false;
    }
  }
  return stack.length === 0;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Stack berisi urutan buka yang belum ditutup; penutup valid hanya jika cocok dengan buka terdalam.
- Kenapa semua kasus valid tercakup: Setiap karakter diproses; penutup dievaluasi terhadap konteks stack terkini.
- Kenapa tidak ada kasus yang terlewat: Penutup lebih banyak dari buka atau sisa buka terdeteksi di akhir atau saat pop kosong.

## 7) Dry Run Singkat

- Kasus normal: `"()[]{}"` → true.
- Kasus edge: `"([)]"` → false.
- Hasil: Validitas struktural.

## 8) Red Flags (Yang Harus Dihindari)

- Hanya hitung jumlah tanpa urutan — salah untuk nested.
- Tidak cek stack kosong sebelum pop.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: String panjang: tetap O(n); tidak ada shortcut substansi.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Counter depth + validate — hanya untuk satu jenis kurung; multi-tipe perlu stack.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Longest valid substring — DP atau stack indices (`)`).

## 10) Trade-off Keputusan

- Opsi A: Stack opens — jelas.
- Opsi B: Expected close push — beberapa prefer pattern ini.
- Kenapa memilih opsi final: Interview mudah dibaca.
- Risiko dari opsi final: Map harus lengkap untuk penutup.
- Mitigasi: Default branch invalid.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih follow-up longest valid parentheses.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Stack
- Inti masalah (1 kalimat): Cocokkan kurung dengan urutan benar.
- Soal: Boolean.
- Strategi final: Stack LIFO
- Kompleksitas: O(n), O(n)
- 2 edge case: empty string; extra closing
- 1 potensi bug: Pop tanpa cek empty
- 1 alasan solusi ini valid: LIFO matches nesting
