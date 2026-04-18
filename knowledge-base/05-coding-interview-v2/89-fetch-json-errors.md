# Topik 89 — fetch, JSON, dan Penanganan Error

**`fetch`** mengembalikan **Promise** yang resolve ke **`Response`**. **`response.ok`** adalah `true` untuk status 200–299; di luar itu Anda biasanya ingin **melempar error** manual karena `fetch` **tidak reject** pada 404/500. **`response.json()`** mengurai body sebagai JSON—bisa gagal jika body bukan JSON. **CORS**, **network failure**, dan **abort** menghasilkan reject dengan error berbeda.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Alur aman: `const res = await fetch(url, opts)`; cek `res.ok`; jika tidak, baca teks/error body untuk pesan; `return await res.json()`. Bungkus dengan **`try/catch`** untuk jaringan putus. Bedakan **`HTTPError`** dari **`ParseError`**. Untuk API yang mengembalikan error dalam JSON meski status 4xx, parser pesan dari body. Gunakan **`AbortSignal`** untuk timeout/cancel.

---

## 2. Mengapa topik ini keluar di interview

- Bug umum: menganggap 404 sebagai sukses.
- Soal “wrapper fetch yang melempar pada non-OK”.

---

## 3. Pola dasar

```javascript
async function getJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}
```

---

## 4. JSON parse aman

```javascript
async function safeJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    throw new SyntaxError(`Invalid JSON: ${text.slice(0, 120)}`);
  }
}
```

---

## 5. Kompleksitas

Parsing O(n) terhadap ukuran body.

---

## 6. Pitfall: `fetch` tidak reject 404

Selalu cek `ok` atau `status`.

---

## 7. Pitfall: double consume body

`json()` atau `text()` hanya sekali—clone `res.clone()` jika perlu dua kali baca.

---

## 8. Pitfall: Content-Type salah

Server bisa kirim HTML error page — `json()` gagal.

---

## 9. Pola interview: typed client

Map status ke kelas error kustom.

---

## 10. Pola interview: retry hanya 5xx

Lihat topik retry.

---

## 11. Latihan konsep

Jelaskan perbedaan `TypeError: Failed to fetch` vs `403`.

---

## 12. Latihan kode

Fungsi `parseErrorBody` yang mencoba JSON lalu fallback string.

---

## 13. Edge cases

- Body kosong pada 204 — jangan panggil `json`.
- Redirect 3xx — `fetch` mengikuti secara default; `redirect: 'manual'` untuk kontrol.

---

## 14. Checklist

- [ ] Cek `res.ok`.
- [ ] Tangani non-JSON.
- [ ] Abort/timeout.

---

## 15. Referensi

Fetch Living Standard; MDN Response.

---

## 16. Anti-pattern

`await fetch` lalu langsung `json()` tanpa cek status.

---

## 17. Flashcard

- **ok:** shorthand 200-299.

---

## 18. Testing

`msw` mock HTTP untuk status matrix.

---

## 19. Performa

Streaming `res.body` untuk payload besar—tidak memuat seluruh buffer sekaligus.

---

## 20. Integrasi TypeScript

`as unknown as T` berbahaya—validasi schema (zod) setelah JSON.

---

## 21. Debugging

Network tab + copy as curl.

---

## 22. Memori

Hindari menyimpan seluruh response besar di string jika streaming cukup.

---

## 23. Parallel

Banyak fetch paralel — gunakan pool (topik 87).

---

## 24. Etika wawancara

Sebutkan validasi schema untuk respons API.

---

## 25. Rangkuman

fetch resolve pada HTTP error; tanggung jawab developer menormalisasi error.

---

## 26. Soal terkait

GraphQL errors dalam 200 OK — cek field `errors`.

---

## 27. Drill manual

Tulis cabang untuk status 401 vs 403 pada klien auth.

---

## 28. Varian: FormData upload

`fetch` dengan `body` FormData; jangan set Content-Type manual.

---

## 29. Varian: credentials

`credentials: 'include'` untuk cookie cross-site—perlu CORS benar.

---

## 30. Penutup

Klien HTTP yang robust memisahkan kegagalan transport, status HTTP, dan parse body.

---

Dokumen ini menjelaskan pola fetch + JSON, cek `ok`, error jaringan, dan validasi respons.
