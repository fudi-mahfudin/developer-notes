# Topik 40 — Subarray Sum Equals K (Prefix + Map)

Diberikan array integer (bisa negatif), hitung **jumlah subarray kontigu** yang berjumlah `k`. Teknik: gunakan **prefix sum** + **`Map` frekuensi prefix** untuk mencari berapa banyak indeks sebelumnya dengan nilai `prefix - k`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Definisikan `P[i]` jumlah elemen `0..i`. Untuk subarray `l..i`, jumlah = `P[i] - P[l-1]`. Kita ingin `P[i] - x = k` ⇒ `x = P[i] - k`. Selama scan membangun `P`, simpan frekuensi setiap nilai prefix yang pernah terjadi; pada indeks `i`, tambahkan `freq.get(P[i]-k) ?? 0` ke jawaban. Awali `freq.set(0,1)` untuk menangani prefix yang persis `k`. Kompleksitas O(n) waktu, O(n) ruang.

---

## 2. Mengapa topik ini keluar di interview

- Subarray sum equals K klasik; menggabungkan hash map dengan invariant prefix.
- Variasi: dengan hanya bilangan positif bisa sliding window—beda constraint.

---

## 3. Implementasi

```javascript
function subarraySum(nums, k) {
  let pref = 0;
  let ans = 0;
  const freq = new Map([[0, 1]]);
  for (const x of nums) {
    pref += x;
    ans += freq.get(pref - k) || 0;
    freq.set(pref, (freq.get(pref) || 0) + 1);
  }
  return ans;
}
```

---

## 4. Kompleksitas

O(n) time, O(n) space untuk map prefix distinct.

---

## 5. Pitfall: bigint

Gunakan BigInt konsisten jika perlu.

---

## 6. Pitfall: floating prefix

Hindari float—gunakan integer atau rasional.

---

## 7. Variasi: count subarray divisible by K

Modulo prefix map—beda rumus.

---

## 8. Pola interview

Jelaskan transformasi ke mencari `pref - k` yang pernah ada.

---

## 9. Latihan

Trace pada `[1,2,3]` dengan `k=3` → subarray `[1,2]`, `[3]`.

---

## 10. Checklist

- [ ] Inisialisasi `0→1`.
- [ ] Update freq setelah query untuk menghindari double count? Urutan penting—pada kode di atas, query dulu baru increment freq saat ini (periksa soal duplicate index rules).

---

## 11. Catatan urutan update

Untuk **jumlah subarray yang berakhir di i**, biasanya tambahkan `freq[pref-k]` **sebelum** menambahkan `pref` saat ini ke map? Tergantung definisi; standar di atas: kita hitung pasangan dengan prefix sebelumnya, lalu increment `freq[pref]`—benar untuk menghitung semua `(l,i]`.

---

## 12. Referensi

Prefix sum + hash map pattern di competitive programming.

---

## 13. Anti-pattern

O(n²) semua pasangan.

---

## 14. Flashcard

- **pref - k:** cari kemunculan sebelumnya.

---

## 15. Latihan tulis

Versi dengan output daftar indeks—gunakan map of lists (advanced).

---

## 16. Testing

Random array kecil, brute force O(n³) bandingkan count.

---

## 17. Penutup

Ini adalah salah satu pola hash map paling “magis” tetapi harus dipahami aljabarnya.

---

## 18. Tambahan: array positif saja

Two pointers bisa menghitung dalam O(n)—lebih sederhana jika memungkinkan.

---

## 19. Tambahan: path sum III tree

Konsep prefix map pada path DFS—variasi tree.

---

## 20. Kompleksitas memori

O(jumlah prefix unik).

---

## 21. Rangkuman

Map prefix counts + target complement `pref-k`.

---

## 22. Soal terkait

Longest subarray sum k—maximize length dengan map simpan first index prefix.

---

## 23. Edge: k=0

Tetap valid; perhatikan subarray kosong biasanya tidak dihitung.

---

## 24. Edge: semua nol

Banyak subarray—map menangani duplikasi prefix.

---

## 25. Drill

Hitung manual untuk `[1,-1,0]` k=0.

---

## 26. Performa

Linear sangat cepat.

---

## 27. Integrasi TypeScript

Tipe `Map<number, number>`—hati-hati key NaN.

---

## 28. Debugging

Log `pref` dan map setiap langkah.

---

## 29. Modulo variant

Simpan `pref % K` dengan penyesuaian negatif.

---

## 30. Etika wawancara

Tegaskan apakah subarray minimal panjang 1.

---

Dokumen ini menjembatani prefix sum dengan hash map untuk counting subarray.
