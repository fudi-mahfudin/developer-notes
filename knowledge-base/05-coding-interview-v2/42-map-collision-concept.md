# Topik 42 — Collision Handling (Konsep untuk Menjelaskan `Map`)

**Hash map** menyimpan pasangan kunci-nilai dengan menghitung **indeks bucket** dari hash kunci. **Collision** terjadi ketika dua kunci berbeda memetakan ke bucket yang sama. Strategi umum: **chaining** (linked list di bucket) atau **open addressing** (probing). Di JavaScript, `Map` adalah struktur built-in—Anda jarang mengimplementasikan hash table, tetapi Anda harus bisa menjelaskan kompleksitas rata-rata O(1) dan degradasi ke O(n) worst-case jika semua tabrakan.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Hash function ideal mendistribusikan kunci merata; collision tidak bisa dihindari sepenuhnya sehingga struktur sekunder menangani bucket penuh. **Load factor** (isi/kapasitas) memicu **rehashing** untuk menjaga performa. Serangan adversarial dapat memaksa banyak collision—di beberapa lingkungan menggunakan hash acak per instance (hashDoS mitigation).

---

## 2. Mengapa topik ini keluar di interview

- Pertanyaan sistem: “Bagaimana `Map` cepat?”
- Membedakan average-case vs worst-case.

---

## 3. Chaining

Setiap bucket berisi list elemen dengan hash sama—insert dengan scan list pendek.

---

## 4. Open addressing

Coba slot berikutnya dengan linear/quadratic probing—cache friendly tetapi lebih rumit delete.

---

## 5. Kompleksitas

- Average O(1) untuk insert/lookup asumsi hash bagus.
- Worst O(n) jika semua tabrak.

---

## 6. Pitfall: mutable key

Jika kunci objek berubah, hash slot salah—`Map` menggunakan referensi stabil.

---

## 7. Pitfall: `NaN` keys

`Map` memperlakukan `NaN` sebagai kunci yang dapat dicocokkan—SameValueZero.

---

## 8. Pola interview

Sebutkan “collision resolution strategy + rehash on load factor”.

---

## 9. Latihan

Jelaskan mengapa string hash butuh fungsi non-trivial untuk distribusi.

---

## 10. Checklist

- [ ] Tahu chaining vs probing secara konsep.
- [ ] Tahu O(1) average, O(n) worst.
- [ ] Tahu implikasi serangan collision.

---

## 11. Referensi

Knuth hashing; Cormen hash tables.

---

## 12. Anti-pattern

Menganggap hash selalu O(1) tanpa menyebut asumsi distribusi.

---

## 13. Flashcard

- **Load factor:** trigger resize.

---

## 14. Latihan tulis

Implementasikan hash map sederhana dengan chaining untuk string keys.

---

## 15. Testing

Insert banyak kunci acak, ukur distribusi bucket (konsep).

---

## 16. Penutup

Konsep collision menjawab pertanyaan “mengapa hash map cepat?” secara jujur.

---

## 17. Tambahan: immutable keys

String/number aman; objek sebagai kunci hidup selama referensi sama.

---

## 18. Tambahan: WeakMap

Kunci objek lemah untuk metadata—bukan untuk counting umum.

---

## 19. Kompleksitas memori

Overhead pointer chaining.

---

## 20. Rangkuman

Hash + collision handling + resizing menjaga amortized O(1).

---

## 21. Soal terkait

Design hash map—interview sistem.

---

## 22. Edge: tabel kecil

Konstanta besar—tetap O(1) asimptotik.

---

## 23. Edge: universal hashing

Keluarga fungsi hash mengurangi collision probabilitas—teori.

---

## 24. Drill

Hitung load factor jika 10 item di 8 bucket.

---

## 25. Performa

Rehash jarang jika strategi baik.

---

## 26. Integrasi JS

`Map` vs object—pertimbangkan insertion order dan key types.

---

## 27. Debugging

Sulit melihat collision internal—gunakan struktur custom untuk edukasi.

---

## 28. Bloom filter

Probabilitistik—bukan hash map sejati.

---

## 29. Consistent hashing

Distribusi cluster—advanced.

---

## 30. Etika wawancara

Jujur tentang worst-case; tunjukkan pemahaman praktis vs teoretis.

---

## 31. Load factor dan resize (konsep)

Tabel hash dinamis sering mempertahankan **rasio isi** (load factor) di bawah ambang tertentu. Saat ambang terlampaui, struktur **di-resize** (biasanya menggandakan jumlah bucket) dan semua entri di-hash ulang. Operasi amortized tetap O(1) rata-rata pada model umum, tetapi satu penyisipan bisa jadi O(n) pada resize—nilai itu jarang ditanyakan secara numerik di interview JS, cukup sebagai narasi.

---

## 32. Mengapa interview tetap membahas collision

Meskipun Anda jarang mengimplementasikan hash map dari nol di pekerjaan harian, pemahaman collision menjawab pertanyaan “mengapa `Map` lebih cocok untuk kunci non-string daripada pola `{}`?” dan “apa trade-off struktur hash?” dengan nada engineer, bukan hafalan API.

---

Dokumen ini memberi landasan menjawab pertanyaan internal `Map` tanpa reverse-engineer engine.
