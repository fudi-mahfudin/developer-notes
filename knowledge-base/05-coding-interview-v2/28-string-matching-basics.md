# Topik 28 — String Matching Dasar (Brute Force; Sentuhan KMP)

Pencocokan pola `P` dalam teks `T` mencari semua kemunculan atau boolean. **Brute force** mencoba setiap offset `O(|T|·|P|)` worst case. **KMP** dan algoritma serupa mempercepat dengan **failure function** `pi` pada pola—linear `O(|T|+|P|)` untuk satu pass.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Brute force membandingkan karakter per karakter dari setiap posisi awal; saat mismatch, geser satu. KMP memanfaftar informasi prefix pola untuk menggeser `P` lebih jauh tanpa memindahkan pointer teks mundur. Di interview JS, sering cukup brute force atau built-in `indexOf` untuk diskusi kompleksitas—KMP ditanyakan sebagai pengetahuan algoritmik, bukan selalu implementasi penuh.

---

## 2. Mengapa topik ini keluar di interview

- Dasar pemahaman kompleksitas substring search.
- Diskusi optimasi ketika pola dipanggil berulang (Rabin-Karp rolling hash).

---

## 3. Brute force

```javascript
function findAllBrute(t, p) {
  const out = [];
  const n = t.length,
    m = p.length;
  for (let i = 0; i + m <= n; i++) {
    let ok = true;
    for (let j = 0; j < m; j++) {
      if (t[i + j] !== p[j]) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(i);
  }
  return out;
}
```

---

## 4. Kasus buruk

`T = "aaaaa"`, `P="aaab"` — banyak perbandingan berulang.

---

## 5. Outline KMP

- Precompute `pi[q]` = panjang prefix proper terpanjang dari `P[0..q]` yang juga suffix `P[0..q]`.
- Saat mismatch di `q`, lompat ke `pi[q-1]` tanpa menggeser indeks teks.

---

## 6. Kompleksitas

- Brute: O(nm)
- KMP: O(n+m)

---

## 7. Rabin-Karp (sentuhan)

Hash rolling window; collision perlu verifikasi karakter—amortized linear dengan hash bagus.

---

## 8. Pitfall: unicode

Panjang karakter vs code unit—gunakan iterasi yang benar jika emoji.

---

## 9. Pola interview

Jelaskan brute dulu, baru “bisa dioptimasi KMP jika pola dicari berkali-kali”.

---

## 10. Latihan

Hitung jumlah perbandingan brute pada contoh buruk kecil.

---

## 11. Checklist

- [ ] Tahu O(nm) brute.
- [ ] Tahu ide prefix function KMP setingkat tinggi.
- [ ] Tahu trade-off implementasi di waktu terbatas.

---

## 12. Referensi

CLRS string matching chapter; KMP 1977.

---

## 13. Built-in JS

`str.indexOf`, `search`, `match`—engine bisa Boyer-Moore/Horspool—jangan asumsikan naive.

---

## 14. Anti-pattern

Regex berat untuk literal sederhana—lebih lambat dan kompleks.

---

## 15. Flashcard

- **Brute:** coba setiap shift.
- **KMP:** prefix function.

---

## 16. Latihan tulis

Implementasikan `computePi(p)` untuk KMP—uji dengan pola `"ababaca"`.

---

## 17. Testing

Random string kecil, bandingkan brute vs KMP jika Anda implementasi.

---

## 18. Multiple patterns

Aho-Corasick—advanced, jarang dituntut.

---

## 19. Penutup

Kuasai brute dan big-O; KMP sebagai bonus pengetahuan.

---

## 20. Tambahan: Z-algorithm

Alternatif untuk longest prefix match—topik lanjutan.

---

## 21. Tambahan: Boyer-Moore

Skip lebih agresif dengan heuristik—umum di praktik library.

---

## 22. Kompleksitas rata-rata

Brute bisa lebih baik pada data acak—worst case tetap nm.

---

## 23. Rangkuman

Mulai naive, lalu diskusikan struktur prefix untuk linear.

---

## 24. Soal terkait

Repeated substring pattern—kait dengan KMP `pi`.

---

## 25. Memori KMP

O(m) untuk `pi` array.

---

## 26. Edge: pola kosong

Definisikan sesuai soal—biasanya 0 atau n+1 match aneh.

---

## 27. Edge: pola lebih panjang dari teks

Tidak ada match.

---

## 28. Integrasi JS

Untuk file besar, streaming search berbeda—jarang di interview.

---

## 29. Performa konstanta

Perbandingan karakter murah—optimasi prematur jarang perlu.

---

## 30. Drill

Trace manual KMP kecil atau setidaknya jelaskan mengapa teks index tidak mundur.

---

Dokumen ini menempatkan string matching dalam konteks kompleksitas dan opsi optimasi standar.
