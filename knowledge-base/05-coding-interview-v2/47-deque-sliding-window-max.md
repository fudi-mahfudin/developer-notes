# Topik 47 — Deque / Sliding Window Maximum

Untuk setiap window berukuran `k` bergeser sepanjang array, cari **maksimum** dalam window dalam **O(n)** total menggunakan **deque** yang menyimpan indeks elemen dalam urutan **monoton menurun** (front selalu elemen maksimum window saat ini).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Invariant: deque menyimpan indeks kandidat maksimum; saat elemen baru lebih besar atau sama, pop dari belakang selama `nums[back] <= nums[i]` karena tidak akan jadi maksimum. Saat jendela bergeser, pop front jika indeks keluar dari window (`i-k+1`). Push `i` setelah itu. Setiap indeks masuk dan keluar deque paling banyak sekali → O(n).

---

## 2. Mengapa topik ini keluar di interview

- Sliding window maximum adalah standar “deque monotonic”.
- Kontras dengan heap O(n log k).

---

## 3. Implementasi inti

```javascript
function maxSlidingWindow(nums, k) {
  const dq = [];
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) out.push(nums[dq[0]]);
  }
  return out;
}
```

Optimasi `shift` dengan indeks head jika perlu.

---

## 4. Kompleksitas

O(n) waktu, O(k) deque size.

---

## 5. Pitfall: `shift` O(n)

Gunakan pointer head pada implementasi produksi.

---

## 6. Pitfall: duplikat nilai

Monotonic non-strict `<=` memastikan elemen lebih baru menggantikan lama jika sama—sesuaikan requirement.

---

## 7. Variasi: minimum window

Balik komparasi.

---

## 8. Pola interview

Jelaskan deque menyimpan indeks, bukan nilai saja (kadang keduanya).

---

## 9. Latihan

Trace `nums=[1,3,-1,-3,5,3,6,7]`, `k=3`.

---

## 10. Checklist

- [ ] Evict out-of-window dari depan.
- [ ] Pop smaller dari belakang.
- [ ] Tahu linear total.

---

## 11. Referensi

Monotonic deque technique.

---

## 12. Anti-pattern

Heap untuk setiap window O(n log k) jika O(n) tersedia.

---

## 13. Flashcard

- **Deque:** push/pop both ends.

---

## 14. Latihan tulis

Versi dengan `Uint32Array` sebagai ring buffer manual.

---

## 15. Testing

Bandingkan dengan brute setiap window untuk array kecil.

---

## 16. Penutup

Monotonic deque adalah struktur untuk “nearest dominant” dalam window geser.

---

## 17. Tambahan: two-ended queue JS

Tidak ada stdlib—simulasikan dengan array + pointers.

---

## 18. Tambahan: multi window sizes

Ulangi algoritma—tidak bisa gabung trivial.

---

## 19. Kompleksitas memori

O(k) indeks.

---

## 20. Rangkuman

Pop rear smaller, pop front outdated, front = max.

---

## 21. Soal terkait

Shortest subarray dengan sum ≥ K—deque monotonic pada prefix (berbeda).

---

## 22. Edge: k=1

Output sama dengan array.

---

## 23. Edge: k=n

Satu output.

---

## 24. Drill

Implementasikan min sliding window dengan struktur sama.

---

## 25. Performa

Sangat cepat untuk n besar.

---

## 26. Integrasi TypeScript

Tipe deque `number[]`.

---

## 27. Debugging

Log deque state tiap i.

---

## 28. GPU/parallel

Tidak relevan.

---

## 29. Variasi 2D

Jauh lebih sulit—jarang.

---

## 30. Etika wawancara

Jika waktu pendek, setidaknya jelaskan ide deque; implementasi penuh bonus.

---

Dokumen ini melengkapi sliding window dengan struktur selain dua pointer murni.
