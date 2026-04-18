# Topik 18 — Prefix Sum

Prefix sum (juga disebut **running sum** atau **cumulative sum**) adalah teknik pra-komputasi agar jumlah elemen pada rentang kontigu `[l, r]` di array bilangan bisa dijawab dalam **O(1)** setelah preprocessing **O(n)**. Ini fondasi untuk banyak soal rentang, termasuk varian 2D (topik terpisah).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Diberikan array `a[0..n-1]`, kita bentuk array `pref` dengan `pref[0]=a[0]` dan `pref[i]=pref[i-1]+a[i]`. Maka jumlah `sum(l,r) = pref[r] - (pref[l-1] ?? 0)` asumsi indeks inklusif. Struktur ini mengubah banyak pertanyaan “berapa total di rentang ini?” dari O(panjang rentang) menjadi O(1) per query setelah O(n) sekali. Untuk update elemen titik-titik, prefix statis tidak cukup—perlu struktur lanjutan (Fenwick/Segment tree), bukan cakupan dokumen ini.

---

## 2. Mengapa topik ini keluar di interview

- Soal “subarray dengan jumlah K” sering dikombinasikan dengan hash map + prefix (topik 40).
- Soal 2D grid kadang memakai 2D prefix (topik 34).
- Menguji apakah kandidat memahami **inklusif/eksklusif** batas rentang tanpa off-by-one.

---

## 3. Definisi formal (1D)

```javascript
function buildPrefixSum(a) {
  const n = a.length;
  const pref = new Array(n);
  pref[0] = a[0];
  for (let i = 1; i < n; i++) pref[i] = pref[i - 1] + a[i];
  return pref;
}
```

Rentang `[l, r]` inklusif:

```javascript
function rangeSum(pref, l, r) {
  if (l === 0) return pref[r];
  return pref[r] - pref[l - 1];
}
```

---

## 4. Kompleksitas

- **Bangun:** O(n) waktu, O(n) ruang tambahan (bisa dioptimalkan in-place jika boleh mutasi).
- **Query:** O(1) per query asumsi `pref` sudah ada.

---

## 5. Edge cases

- Array kosong: tidak ada prefix; definisikan kontrak di awal.
- Overflow bilangan: di JS `Number` aman untuk banyak kasus, tapi untuk soal kompetisi kadang minta modulo—terapkan `(x % MOD + MOD) % MOD` konsisten.
- Rentang kosong: jika soal mengizinkan panjang 0, definisikan jumlah 0.

---

## 6. Variasi: prefix “exclusive”

Kadang lebih nyaman `pref[i]` = jumlah `a[0..i-1]` dengan `pref[0]=0`, sehingga `sum(l,r) = pref[r+1]-pref[l]`. Pilih satu konvensi dan konsisten.

```javascript
function buildExclusive(a) {
  const pref = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pref[i + 1] = pref[i] + a[i];
  return pref;
}
```

---

## 7. Aplikasi langsung

- Rata-rata pada rentang: `sum/(r-l+1)`.
- Menghitung berapa subarray dengan properti jumlah tertentu dengan teknik map (lihat hubungan topik 40).

---

## 8. Pitfall: mutasi `a` setelah `pref`

Jika `a` berubah, `pref` basi—perlu rebuild atau struktur dinamis.

---

## 9. Contoh soal pola

Diberikan `a` dan banyak query `(l,r)` — jawab jumlah. Tanpa prefix, total O(queries × panjang rentang). Dengan prefix, O(n + queries).

---

## 10. Latihan konsep

Tulis fungsi `countSubarraysWithSum(a, k)` memakai map frekuensi prefix—hubungkan dengan topik 40 (bukan hanya range query murni).

---

## 11. Hubungan dengan difference array

Operasi “tambahkan v ke semua indeks di [l,r]” bisa di-modelkan dengan **difference array** + prefix untuk rekonstruksi—dualitas pola prefix/difference.

---

## 12. Checklist

- [ ] Bisa menjelaskan inklusif vs eksklusif.
- [ ] Bisa menulis rumus `pref[r]-pref[l-1]`.
- [ ] Tahu kompleksitas build dan query.
- [ ] Tahu kapan prefix tidak cukup (update dinamis berat).

---

## 13. Referensi

Teknik ini map ke “prefix sums” di competitive programming; bukti aljabar sederhana dari teleskopik sum.

---

## 14. Contoh trace kecil

`a = [2, -1, 3, 5]`

- `pref = [2, 1, 4, 9]`
- `sum(1,2) = pref[2]-pref[0] = 4-2 = 2` → `-1+3`.

---

## 15. Pola wawancara

Ucapkan: “Saya preprocessing O(n), lalu setiap query rentang O(1) dengan mengurangkan dua prefix.”

---

## 16. Anti-pattern

Menghitung `reduce` pada slice setiap query di JS—membuat salinan/subarray dan O(panjang) per query.

---

## 17. Tambahan: string numerik

Jika `a` adalah digit dan perlu modulo besar, gunakan BigInt hati-hati terhadap performa.

---

## 18. Tambahan: floating point

Jumlah floating bisa mengakumulasi error—untuk finansial, pertimbangkan integer cent atau decimal library.

---

## 19. Quiz

Diberikan `pref`, bisa kah Anda rekonstruksi `a`? Ya: `a[0]=pref[0]`, `a[i]=pref[i]-pref[i-1]`.

---

## 20. Latihan tulis

Implementasikan `rangeAddQueries` pada array nol panjang `n` dengan `m` operasi “tambah v pada [l,r]” lalu output array akhir dalam O(n+m) memakai difference array + prefix.

---

## 21. Jawaban sketsa difference array

Buat `diff` panjang `n+1`, untuk update `diff[l]+=v`, `diff[r+1]-=v`. Akhirnya prefix `diff` menghasilkan nilai akhir tiap indeks.

---

## 22. Flashcard

- **Prefix:** kumulatif dari awal.
- **Range sum:** selisih dua prefix.

---

## 23. Kompleksitas memori

Bisa gunakan satu array jika boleh menimpa `a` menjadi prefix in-place: `a[i]+=a[i-1]`, tapi kehilangan `a` asli.

---

## 24. Uji mental

Mengapa `sum(0,r)` tidak perlu `pref[l-1]`? Karena tidak ada elemen sebelum 0.

---

## 25. Penutup

Prefix sum adalah “cache integral” pada array 1D—hampir selalu dicoba dulu sebelum struktur lebih berat.

---

## 26. Drill lanjutan

Baca soal “submatrix sum query” dan pahami bagaimana 2D prefix menyimpan persegi panjang—lanjut ke topik 34.

---

## 27. Integrasi JavaScript

Gunakan `TypedArray` jika performa numerik besar dan pola akses sequential.

---

## 28. Testing

Buat property test: bandingkan range sum naive vs prefix untuk array acak kecil.

---

## 29. Batasan soal

Jika `l,r` sangat banyak tetapi array statis, prefix optimal; jika update banyak, pertimbangkan Fenwick.

---

## 30. Rangkuman satu kalimat

Bangun kumulatif sekali, jawab rentang dengan satu pengurangan.

---

Dokumen ini melengkapi fondasi rentang statis sebelum masuk ke kombinasi hash map atau 2D.
