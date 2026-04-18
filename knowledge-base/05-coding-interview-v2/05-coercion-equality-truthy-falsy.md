# Topik 5 — Coercion, `==` vs `===`, Truthy / Falsy

Dokumen ini menjelaskan bagaimana JavaScript mengubah tipe nilai secara implisit (coercion), perbedaan kesetaraan longgar dan ketat, serta daftar nilai “falsy”. Ini sering diuji lewat soal trivia dan bug produksi di validasi input.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Coercion** adalah konversi tipe otomatis saat operator atau konteks mengharapkan tipe tertentu. Operator **`==`** melakukan **Abstract Equality Comparison** yang dapat meng-coerce salah satu operand; **`===`** memakai **Strict Equality Comparison** tanpa mengubah tipe—lebih disarankan sebagai default. Nilai **falsy** di Boolean context termasuk `false`, `0`, `-0`, `NaN`, `""`, `null`, dan `undefined`; selebihnya umumnya truthy, termasuk `[]` dan `{}`.

---

## 2. Mengapa topik ini keluar di interview

- Menangkap asumsi dari developer bahasa statis tentang perbandingan.
- Validasi form/API: string `"0"` vs number `0`, `null` vs `undefined`.
- Menjelaskan bug `if (value)` yang menolak `0` yang sah.

---

## 3. Strict equality (`===`)

Mengembalikan `true` hanya jika tipe sama dan nilai sama menurut aturan spesifikasi (termasuk `NaN` yang tidak pernah sama dengan apa pun, termasuk dirinya sendiri—gunakan `Number.isNaN`).

```javascript
0 === -0; // true (perhatikan edge case Object.is membedakan)
```

---

## 4. Abstract equality (`==`) — pola umum

Jika tipe berbeda, engine mengikuti algoritma panjang: seringkali angka dipilih sebagai target, string di-parse ke number, boolean di-convert ke number, object di-toPrimitive.

Contoh klasik:

```javascript
"" == 0; // true
"0" == 0; // true
[] == 0; // true (array di-toPrimitive)
```

Ini bukan “aneh” bagi engine; ini konsekuensi aturan coercion.

---

## 5. ToBoolean dan truthy/falsy

Konteks boolean (`if`, `while`, operand `&&`/`||` yang tidak short-circuit ke nilai asli) memakai **ToBoolean**:

**Falsy:** `undefined`, `null`, `false`, `+0`, `-0`, `NaN`, `""`.

**Truthy:** hampir semua lainnya, termasuk `"0"`, `"false"` (string), `[]`, `{}`.

---

## 6. `||` dan `??`

`||` memilih operand pertama yang truthy; **`??`** (nullish coalescing) hanya jatuh ke kanan jika kiri `null` atau `undefined`.

```javascript
0 || 42; // 42
0 ?? 42; // 0
```

Ini topik terkait tapi beda operator; sering dipasangkan dalam interview modern.

---

## 7. `+` dan string concatenation

`+` jika salah satu string bisa memicu concatenation; urutan penting.

```javascript
1 + 2 + "3"; // "33"
```

---

## 8. Perbandingan object

Dua object berbeda identitas tidak pernah `===` kecuali referensi sama. `==` tetap membandingkan referensi setelah kemungkinan coercion—biasanya tidak membuat dua literal object “sama”.

---

## 9. Interview tip: default yang aman

- Bandingkan API dengan **`===`** dan normalisasi tipe di boundary (parseInt dengan radix, validasi schema).
- Jangan mengandalkan `==` kecuali Anda sengaja ingin coercion (jarang).

---

## 10. Contoh bug: `filter(Boolean)`

```javascript
[0, 1, 2].filter(Boolean); // menghilangkan 0
```

`0` falsy sehingga ikut terbuang—kadang tidak diinginkan.

---

## 11. `Number()`, `String()`, `Boolean()` eksplisit

Lebih terbaca daripada membiarkan coercion implisit:

```javascript
const n = Number(input);
if (Number.isNaN(n)) { /* ... */ }
```

---

## 12. Edge: `Object.is`

`Object.is(a,b)` membedakan `+0` dan `-0`, dan menganggap `NaN` sama dengan `NaN`.

---

## 13. Latihan prediksi

```javascript
console.log([] == false);
console.log([] == ![]);
```

---

## 14. Jawaban latihan (ringkas)

- `[]` di `== false`: `[]` → `""` → `0`, `false` → `0` → true.
- `[] == ![]`: `![]` adalah `false`, kembali ke pola serupa → true.

Ini contoh “trivia”; di produksi hindari pola yang membutuhkan penjelasan semacam ini.

---

## 15. Checklist

- [ ] Tahu daftar falsy resmi.
- [ ] Tahu beda `==` dan `===` secara perilaku.
- [ ] Tahu `??` vs `||`.
- [ ] Tahu kapan `0` atau `""` menjadi bug di kondisi.

---

## 16. Referensi

Algoritma `Abstract Equality Comparison` dan `Strict Equality Comparison` ada di ECMAScript specification. Untuk studi cepat, bagan MDN membantu, tapi hafal bagan penuh tidak perlu—pahami prinsip coercion.

---

## 17. Tambahan: template coercion

Template literal mengonversi ekspresi ke string via `ToString`—perhatikan object tanpa `toString` yang ramah.

---

## 18. Tambahan: perbandingan BigInt

BigInt tidak dicampur dengan Number di `===` tanpa error; campuran operand bisa memicu TypeError—waspada di kode finansial.

---

## 19. Tambahan: `Symbol` equality

Symbol unik kecuali `Symbol.for` di registry yang sama—`===` membandingkan identitas symbol.

---

## 20. Pola API: query param

Semua query string adalah string; bandingkan dengan `"true"` atau parse ke boolean eksplisit, jangan `== true` pada string acak.

---

## 21. Rekomendasi gaya kode

Gunakan `eslint eqeqeq` untuk melarang `==` kecuali di-comment dengan alasan kuat.

---

## 22. Quiz tambahan

```javascript
console.log(null == undefined);
console.log(null === undefined);
```

Jawaban: `true` lalu `false` — sering ditanyakan sebagai “pengecualian” `==` yang “masuk akal”.

---

## 23. Menyimpan konsistensi dengan TypeScript

`strictNullChecks` memaksa membedakan `null` vs `undefined` di tipe; runtime JS tetap perlu boundary checks.

---

## 24. Menutup

Coercion bukan “kejahatan”; itu konsekuensi desain bahasa. Kontrol eksplisit di boundary dan `===` default menjaga kode mudah dibaca dan diuji.

---

## 25. Latihan tulis

Tulis fungsi `toFiniteNumber(value)` yang mengembalikan number atau `null` jika tidak bisa di-parse tanpa anomaly, tanpa memakai `==`.

---

## 26. Catatan performa

Coercion sendiri murah; yang mahal adalah validasi berulang di hot path tanpa short-circuit—bukan topik utama di sini.

---

Dokumen ini cukup untuk menjawab sebagian besar pertanyaan interviewer tentang equality dan truthiness tanpa masuk ke corner case esoteris yang tidak membantu engineering.
