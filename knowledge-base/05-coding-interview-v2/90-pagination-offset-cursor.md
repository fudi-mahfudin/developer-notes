# Topik 90 — Pagination: Offset vs Cursor

**Pagination** membagi hasil besar menjadi **halaman**. Dua pola utama: **offset/limit** (`SELECT ... LIMIT y OFFSET x`) dan **cursor** (kunci seperti `id`/`created_at` + `WHERE id > ? ORDER BY id LIMIT y`). Masing-masing punya trade-off konsistensi dan performa.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Offset** sederhana untuk UI “halaman ke-k”, tetapi **mahal** pada offset besar (DB scan) dan **rentan drift** jika data baru dimasukkan saat user membuka halaman berikutnya (item bisa hilang/duplikat). **Cursor** stabil untuk feed real-time dan biasanya **O(log n) + limit** dengan indeks, tetapi sulit lompat ke “halaman 17” tanpa metadata tambahan. **Keyset pagination** memakai `(sort_value, id)` tie-breaker.

---

## 2. Mengapa topik ini keluar di interview

- Desain API `?page=` vs `?cursor=`.
- Diskusi performa Postgres/MySQL pada offset besar.

---

## 3. Offset API (REST)

`GET /items?offset=40&limit=20`

---

## 4. Cursor API

`GET /items?cursor=eyJpZCI6MTIzfQ&limit=20` — cursor sering opaque base64 JSON.

---

## 5. Kompleksitas DB

Offset besar: semakin dalam semakin lambat tanpa optimasi. Cursor dengan indeks komposit: lebih stabil.

---

## 6. Pitfall: offset tanpa order by deterministik

Hasil tidak stabil antar request—selalu `ORDER BY` unik.

---

## 7. Pitfall: cursor tanpa tie-breaker

Duplikat/miss jika nilai sort tidak unik—tambahkan `id`.

---

## 8. Pitfall: encode/decode cursor

Validasi tanda tangan/HMAC jika perlu anti-tamper.

---

## 9. Pola interview: infinite scroll

Cursor + `IntersectionObserver`.

---

## 10. Pola interview: total count

Offset mudah hitung `totalPages`; cursor sering tidak tahu total tanpa `COUNT(*)` mahal.

---

## 11. Latihan konsep

Jelaskan anomaly saat insert row baru saat user di offset 100.

---

## 12. Latihan kode

Fungsi `encodeCursor({created_at,id})` dan decode dengan validasi.

---

## 13. Edge cases

- Sort descending: operator `WHERE (t, id) < (?,?)` komposit.
- Filter berubah antar request — reset cursor.

---

## 14. Checklist

- [ ] Order deterministik.
- [ ] Indeks mendukung predicate cursor.
- [ ] UX infinite vs numbered pages.

---

## 15. Referensi

Use the Index Luke; Slack/Stripe API pagination patterns.

---

## 16. Anti-pattern

`OFFSET` jutaan pada tabel besar tanpa cursor.

---

## 17. Flashcard

- **Keyset:** pagination tanpa offset.

---

## 18. Testing

Snapshot urutan dengan fixture data concurrent inserts.

---

## 19. Performa

Covering index untuk kolom sort + filter.

---

## 20. Integrasi TypeScript

Tipe `Page<T> = { items: T[]; nextCursor?: string }`.

---

## 21. Debugging

Log cursor decoded untuk melihat leak field internal.

---

## 22. Memori

Klien menyimpan cursor ringan vs array seluruh halaman.

---

## 23. Parallel

Prefetch halaman berikutnya dengan cursor.

---

## 24. Etika wawancara

Tanyakan apakah lompat halaman diperlukan.

---

## 25. Rangkuman

Offset mudah, cursor skalabel dan stabil untuk feed.

---

## 26. Soal terkait

GraphQL Relay connections — spesifikasi cursor.

---

## 27. Drill manual

Tiga insert saat user paginate — bandingkan hasil offset vs cursor.

---

## 28. Varian: seek method

Hybrid offset kecil + cursor setelahnya.

---

## 29. Penutup

Memilih pagination adalah memilih konsistensi UX dan biaya query.

---

## 30. Contoh SQL keyset (Postgres)

Misal urutkan menurun berdasarkan `created_at`, lalu `id` sebagai tie-breaker:

```sql
SELECT *
FROM posts
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Parameter `($1, $2)` diambil dari cursor halaman sebelumnya. Indeks komposit pada `(created_at DESC, id DESC)` membuat predicate ini efisien dibanding `OFFSET` besar pada tabel yang sama.

---

## 31. API respons yang ramah klien

Selain `items` dan `nextCursor`, pertimbangkan `hasMore` boolean untuk UI infinite scroll tanpa menebak dari cursor kosong. Untuk offset, `total` opsional—hitung bisa mahal; beberapa API memisahkan endpoint `HEAD` atau `COUNT` dengan cache.

---

Dokumen ini membandingkan offset dan cursor, indeks, dan implikasi API.
