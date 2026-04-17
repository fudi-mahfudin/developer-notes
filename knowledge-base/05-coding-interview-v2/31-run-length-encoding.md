# Topik 31 — Run-Length Encoding (RLE)

**Run-length encoding** mengompresi data dengan menyimpan pasangan `(karakter, jumlah berulang)` untuk setiap **run** kontigu. Cocok untuk data dengan banyak pengulangan; buruk untuk data acak. Di interview, sering diminta encode/decode string alfabet atau restore string dari format RLE.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Encode: iterasi string, hitung panjang run saat karakter sama dengan sebelumnya; saat transisi, flush `count+char` atau format yang diminta soal. Decode: parse angka lalu ulang karakter berikutnya sebanyak itu—waspada multi-digit count. Kompleksitas linear O(n) untuk panjang input/output.

---

## 2. Mengapa topik ini keluar di interview

- Latihan manipulasi string, pointer dua arah, edge multi-digit.
- Variasi: string compression in-place panjang tetap (LeetCode 443).

---

## 3. Encode dasar (format count+char)

```javascript
function encode(s) {
  let out = "";
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    let j = i;
    while (j < s.length && s[j] === ch) j++;
    out += String(j - i) + ch;
    i = j;
  }
  return out;
}
```

Format output tergantung soal—kadang `ch+count`.

---

## 4. Decode

```javascript
function decode(s) {
  let out = "";
  let i = 0;
  while (i < s.length) {
    let k = 0;
    while (i < s.length && s[i] >= "0" && s[i] <= "9") {
      k = k * 10 + (s[i].charCodeAt(0) - 48);
      i++;
    }
    const ch = s[i++];
    out += ch.repeat(k);
  }
  return out;
}
```

---

## 5. Kompleksitas

- Waktu O(n) untuk encode/decode panjang string asli.
- Ruang output bisa besar—perhatikan `repeat`.

---

## 6. Pitfall: count multi-digit

Harus membaca seluruh angka sebelum karakter target.

---

## 7. Pitfall: kompresi memperpanjang

Jika `count` panjangnya melebihi penghematan, beberapa soal meminta return asli—baca requirement.

---

## 8. Pola interview

Sebutkan trade-off: hanya efektif jika run panjang.

---

## 9. Latihan

Encode `"aaabccccd"` → format yang konsisten, lalu decode balik.

---

## 10. Checklist

- [ ] Parse digit loop.
- [ ] Handle run terakhir.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

RLE klasik di kompresi gambar sederhana (bitmap).

---

## 12. Anti-pattern

Regex berat untuk decode—loop lebih jelas.

---

## 13. Flashcard

- **Run:** segmen kontigu sama.

---

## 14. Latihan tulis

In-place compression array karakter dengan menggunakan slot untuk menyimpan hasil—advanced.

---

## 15. Testing

Random string kecil, round-trip encode/decode equals original.

---

## 16. Integrasi JS

`String.prototype.repeat` nyaman—waspada memori besar.

---

## 17. Penutup

RLE menguji parsing angka + iterasi string—kombinasi praktis.

---

## 18. Tambahan: binary RLE

Untuk bitstring—konsep sama.

---

## 19. Tambahan: escape character

Jika karakter bisa digit, format harus escape—soal lanjutan.

---

## 20. Kompleksitas memori output

Bisa lebih besar dari input jika tidak ada run—perhatikan soal.

---

## 21. Rangkuman

Hitung run, flush saat break; decode baca digit lalu expand.

---

## 22. Soal terkait

String compression array in-place—variasi dua pointer.

---

## 23. Edge: string kosong

Return kosong.

---

## 24. Edge: satu karakter

Count 1—format bisa tetap perlu digit.

---

## 25. Drill

Buat tabel run untuk `"aaaabbb"` manual.

---

## 26. Performa

Linear—cocok untuk n besar.

---

## 27. Unicode

Run harus karakter sama persis—surrogate pairs dipertahankan jika iterasi `for...of`.

---

## 28. Debugging

Log setiap flush saat encode.

---

## 29. Validasi decode

Jika format salah—throw atau return null sesuai kontrak.

---

## 30. Etika wawancara

Tanyakan format output eksplisit sebelum mengoding.

---

Dokumen ini mencakup RLE string-level yang sering muncul sebagai warm-up.
