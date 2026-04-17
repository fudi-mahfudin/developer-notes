# Topik 10 — Template Literals dan Tagged Templates

Dokumen ini menjelaskan string multi-baris dengan interpolasi `${}` serta bentuk fungsi **tag** yang menerima potongan string mentah dan nilai, dipakai di DSL seperti styled-components atau sanitasi.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Template literals** (backtick) memungkinkan interpolasi ekspresi dan baris baru tanpa `\n` escape. **Tagged template** memanggil fungsi dengan array **cooked** strings, array **raw** (untuk escape), dan nilai interpolasi sebagai argumen terpisah—memungkinkan transformasi string seperti escaping HTML atau membangun CSS.

---

## 2. Mengapa topik ini keluar di interview

- Membaca kode CSS-in-JS dan library yang memakai tag.
- Memahami perbedaan cooked vs raw untuk regex/string kompleks.
- Menulis mini-DSL sederhana di soal live coding.

---

## 3. Interpolasi dasar

```javascript
const name = "Ada";
const s = `Hello ${name}`;
```

---

## 4. Multi-line

```javascript
const sql = `
  SELECT *
  FROM users
  WHERE id = ${id}
`;
```

Perhatikan SQL injection—template literal **tidak** aman otomatis; gunakan parameterized query.

---

## 5. Ekspresi arbitrer

```javascript
`2 + 2 = ${2 + 2}`;
```

---

## 6. Tagged template: bentuk pemanggilan

```javascript
function tag(strings, ...values) {
  return strings[0] + values.map(String).join("|");
}
tag`a${1}b${2}`;
```

`strings.length === values.length + 1` biasanya.

---

## 7. `String.raw` sebagai tag built-in

```javascript
String.raw`\n`; // "\\n" panjang 2? — berisi backslash + n sebagai teks
```

Berguna untuk regex atau path Windows.

---

## 8. Cooked vs raw

- **Cooked:** interpretasi escape seperti string biasa.
- **Raw:** isi persis seperti di source, akses via `strings.raw[i]`.

---

## 9. Pola interview: escape HTML

```javascript
function html(strings, ...values) {
  return strings.reduce((acc, s, i) => {
    const v = values[i] ?? "";
    return acc + s + escapeHtml(String(v));
  }, "");
}
```

---

## 10. I18n placeholder

Tagged template bisa memetakan placeholder ke katalog terjemahan—nilai sebagai argumen terpisah.

---

## 11. Kompleksitas

Linear pada jumlah segmen; tidak ada jebakan kompleksitas untuk interview standar.

---

## 12. Latihan

Tulis `upper` tag yang mengubah semua interpolasi menjadi huruf besar.

---

## 13. Solusi sketsa

```javascript
function upper(strings, ...values) {
  return strings.reduce(
    (acc, s, i) => acc + s + String(values[i] ?? "").toUpperCase(),
    ""
  );
}
```

---

## 14. Checklist

- [ ] Tahu urutan argumen tag.
- [ ] Tahu `String.raw`.
- [ ] Tahu risiko injeksi pada template SQL/string.

---

## 15. Referensi

Tagged templates dijelaskan di ECMAScript dengan operasi `GetTemplateObject` untuk reuse literal yang sama.

---

## 16. Nested template

Bisa nested; hindari kecuali readability jelas buruk.

---

## 17. `Function` constructor vs template

Jangan eval string dari user—tag tidak menggantikan sandboxing.

---

## 18. Quiz

```javascript
function id(strings) {
  return strings[0];
}
id`\\n`;
```

Perilaku raw/cooked—penting untuk membaca hasil.

---

## 19. Tambahan: styled-components mental model

`styled.div`...` adalah tag function yang mengembalikan component—bukan magic, hanya higher-order pattern.

---

## 20. Tambahan: indent strip helper

Banyak library strip leading whitespace pada template multi-line—implementasi interview: split lines, trim minimal indent.

---

## 21. Anti-pattern

Template SQL dengan interpolasi langsung dari input user.

---

## 22. Flashcard

- **Backtick:** literal + `${}`.
- **Tag:** function form `fn`...``.

---

## 23. Latihan tulis

Buat tag `dedent` sederhana yang menghapus indentasi umum dari setiap baris.

---

## 24. Menutup

Tagged template adalah titik temu antara string dan DSL—pahami argumennya maka library CSS-in-JS menjadi transparan.

---

## 25. Tambahan: TypeScript literal types

Template literal types (`${T}`) berbeda topik—tapi nama sama, jangan bingung saat interview TS.

---

Dokumen ini mendukung menjawab “apa itu tagged template?” dengan contoh konkret.
