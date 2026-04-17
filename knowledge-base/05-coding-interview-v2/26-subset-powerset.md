# Topik 26 — Subset / Powerset

**Powerset** dari himpunan `S` adalah himpunan semua subset (termasuk kosong dan `S` sendiri), berukuran `2^|S|`. Di interview, sering diminta **mengenumerasi** semua subset atau menghitung properti subset dengan DP bitmask.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk array indeks `0..n-1`, setiap subset dapat dipetakan ke bilangan `mask` dari `0` sampai `2^n-1` di mana bit ke-i menunjukkan apakah elemen ke-i dipilih. Enumerasi iteratif: loop `mask` dan kumpulkan elemen sesuai bit. Alternatif backtracking DFS seperti “setiap elemen dipilih atau tidak”. Kompleksitas waktu `O(n·2^n)` jika setiap subset disalin ke array baru.

---

## 2. Mengapa topik ini keluar di interview

- Soal subset sum, partition, generate subsets dengan duplikat.
- Menguji pemahaman eksponensial dan representasi bitmask.

---

## 3. Backtracking semua subset

```javascript
function subsets(nums) {
  const res = [];
  const path = [];
  function dfs(i) {
    if (i === nums.length) {
      res.push(path.slice());
      return;
    }
    dfs(i + 1);
    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }
  dfs(0);
  return res;
}
```

Urutan output bisa diatur; sering disort dulu jika duplikat.

---

## 4. Iteratif bitmask

```javascript
function subsetsMask(nums) {
  const n = nums.length;
  const total = 1 << n;
  const res = [];
  for (let mask = 0; mask < total; mask++) {
    const cur = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) cur.push(nums[i]);
    res.push(cur);
  }
  return res;
}
```

---

## 5. Kompleksitas

- Waktu: O(n·2^n) untuk materialisasi semua subset.
- Ruang: output besar; tambahan rekursi O(n) stack.

---

## 6. Duplikat input

Sort + skip pola serupa permutasi—hindari subset identik.

---

## 7. Subset sum decision

Bukan selalu perlu enumerasi—DP knapsack subset (topik 75) untuk feasible/nilai optimal.

---

## 8. Pitfall: `n` besar

`2^n` meledak cepat; `n>20` enumerasi penuh biasanya tidak masuk akal.

---

## 9. Pitfall: bitwise di JS

`1 << n` untuk n besar bisa jadi 0 karena 32-bit—gunakan `BigInt` atau loop tanpa shift jika perlu.

---

## 10. Pola interview

Jelaskan trade-off bitmask vs rekursi untuk kejelasan kode.

---

## 11. Latihan

Hitung jumlah subset dengan XOR tertentu—kadang DP bitwise.

---

## 12. Checklist

- [ ] Tahu ukuran 2^n.
- [ ] Tahu mapping bit ke elemen.
- [ ] Tahu duplikat handling.

---

## 13. Referensi

Powerset di teori himpunan; bitmask enumeration umum di competitive programming.

---

## 14. Variasi: incremental subset

Bangun subset dengan Gray code untuk transisi satu bit—advanced.

---

## 15. Anti-pattern

Menyimpan semua subset string panjang untuk n besar.

---

## 16. Flashcard

- **2^n:** jumlah subset.
- **mask:** bit on/off.

---

## 17. Latihan tulis

Implementasikan `subsetsWithDup(nums)` sesuai soal klasik—sort + skip duplicate di loop.

---

## 18. Testing

Bandingkan jumlah hasil dengan `2^n` (setelah dedup rules).

---

## 19. Hubungan kombinasi

Kombinasi ukuran k adalah lapisan subset dengan k bit 1—iterate `C(n,k)`.

---

## 20. Penutup

Powerset adalah fondasi banyak DP subset; kenali kapan enumerasi vs DP.

---

## 21. Tambahan: meet-in-the-middle

Bagi array dua bagian, enumerasi subset tiap bagian—untuk n ~40.

---

## 22. Tambahan: subset convolution

Topik lanjutan—jarang di interview JS umum.

---

## 23. Kompleksitas memori output

Jika hanya perlu hitung tanpa list, jangan materialisasi.

---

## 24. Rekursi tail

Tidak natural untuk subset generation—abaikan optimasi tail call.

---

## 25. Integrasi TypeScript

Tipe `number[][]` untuk hasil—perhatikan salinan.

---

## 26. Edge: array kosong

Subset hanya `[]`? `[[]]` tergantung soal—biasanya satu subset kosong.

---

## 27. Edge: satu elemen

Dua subset: `[]` dan `[x]`.

---

## 28. Rangkuman

Bitmask atau DFS pick/skip—keduanya valid; pilih yang paling jelas saat wawancara.

---

## 29. Soal terkait

Partition equal subset sum → subset sum DP.

---

## 30. Drill

Enumerasi subset dari `{1..4}` dengan mask dan verifikasi 16 subset.

---

Dokumen ini melengkapi enumerasi subset sebagai persiapan DP dan backtracking lanjutan.
