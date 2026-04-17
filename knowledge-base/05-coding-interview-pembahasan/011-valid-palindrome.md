# Valid Palindrome

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Two pointers, string normalization
- **Inti masalah:** Setelah mengabaikan casing dan karakter non-alphanumerik, apakah string membaca sama dari kiri dan kanan?

---

- Soal: Return true jika `s` palindrome menurut aturan soal (biasanya hanya `a-zA-Z0-9` relevan).
- Input: `s: string`
- Output: `boolean`
- Constraints utama: Biasanya O(n) satu pass; ruang O(1) jika indeks saja (JavaScript string immutable tapi tidak menyimpan struktur tambahan).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Two pointers

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya pakai dua pointer `left` dan `right`. Di tiap langkah, geser pointer ke dalam sampai menemukan karakter alphanumerik (abaikan yang lain), lalu bandingkan case-insensitive. Jika ada beda, bukan palindrome; jika pointer bertemu atau crossover, true. Satu pass O(n) waktu, O(1) ekstra ruang untuk pointer/helper `isAlnum`. Edge: string kosong atau hanya simbol dianggap palindrome umumnya.

Struktur cepat:
- Observasi inti masalah: Hanya perbandingan simetris pasangan setelah normalisasi.
- Strategi final yang dipilih: Two pointers dari ujung ke tengah.
- Kenapa strategi ini paling cocok: Linear, mudah dijelaskan, tidak peruh buat string baru jika tidak diminta.
- Time complexity: O(n)
- Space complexity: O(1) tambahan (helper char check konstan).
- Edge case utama: `""`, hanya spasi/tanda baca; satu karakter.

## 3) Versi Ultra Singkat (10-20 detik)

> Dua pointer; skip non-alphanumer; bandingkan lowercase. Berhenti jika mismatch.

## 4) Pseudocode Ringkas (5-10 baris)

```text
L = 0, R = length(s) - 1
while L < R:
  while L < R and not isAlnum(s[L]): L++
  while L < R and not isAlnum(s[R]): R--
  if lower(s[L]) != lower(s[R]): return false
  L++; R--
return true
```

## 5) Implementasi Final (Inti Saja)

```js
function isAlnum(ch) {
  return /[a-zA-Z0-9]/.test(ch);
}

function isPalindrome(s) {
  let L = 0, R = s.length - 1;
  while (L < R) {
    while (L < R && !isAlnum(s[L])) L++;
    while (L < R && !isAlnum(s[R])) R--;
    if (s[L].toLowerCase() !== s[R].toLowerCase()) return false;
    L++; R--;
  }
  return true;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Setelah skip karakter diabaikan, urutan karakter penting tetap terjaga; palindrome iff setiap pasangan simetris sama.
- Kenapa semua kasus valid tercakup: Loop sampai `L >= R` memastikan setiap pasangan relevan diperiksa tepat sekali.
- Kenapa tidak ada kasus yang terlewat: Pointer hanya bergerak ke dalam; non-alphanumerik tidak mempengaruhi jawaban.

## 7) Dry Run Singkat

- Kasus normal: `"A man, a plan, a canal: Panama"` → true.
- Kasus edge: `".,` atau `""` → true (sering di soal).
- Hasil: Sesuai definisi palindrome dengan filter.

## 8) Red Flags (Yang Harus Dihindari)

- Langsung `reverse` string penuh lalu banding — boros ruang jika ditanya O(1) ruang.
- Lupa normalisasi case atau filter karakter sesuai soal.
- Off-by-one pada pointer saat skip.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: Tetap linear; hindari alokasi array baru jika constraint ketat.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: Regex replace dulu then palindrome — lebih mudah dibaca tapi bisa O(n) tambahan alokasi.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Palindrome linked list / hanya huruf tanpa angka — sesuaikan `isAlnum`.

## 10) Trade-off Keputusan

- Opsi A: Filter ke array karakter dulu lalu dua pointer — jelas tapi memakai memori O(n).
- Opsi B: Dua pointer langsung pada string — hemat ruang tambahan.
- Kenapa memilih opsi final: Cocok constraint umum interview.
- Risiko dari opsi final: Implementasi skip harus hati-hati agar tidak infinite loop.
- Mitigasi: `while (L < R)` di kedua inner loop.

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
- Catatan perbaikan: Uji string Unicode jika interviewer menyebutkan locale khusus.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Two pointers, string
- Inti masalah (1 kalimat): Cek palindrome dengan abaikan non-alphanumerik dan case.
- Soal: Return boolean.
- Strategi final: Two pointers + skip + toLowerCase per pasangan
- Kompleksitas: O(n) waktu, O(1) ruang ekstra
- 2 edge case: string kosong; hanya simbol
- 1 potensi bug: Inner loop tanpa `L < R` menyebabkan out of range
- 1 alasan solusi ini valid: Palindrome = simetri pasangan yang relevan
