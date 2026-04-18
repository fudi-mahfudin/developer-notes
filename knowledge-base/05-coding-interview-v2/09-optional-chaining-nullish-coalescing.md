# Topik 9 — Optional Chaining (`?.`) dan Nullish Coalescing (`??`)

Dokumen ini menjelaskan operator ES2020 untuk akses aman ke properti/method/index serta pemilihan default hanya untuk `null`/`undefined`, mengurangi rantai guard verbose.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Optional chaining** `?.` mem-short-circuit ke `undefined` jika basisnya `null` atau `undefined`—tanpa melempar error saat mengakses properti berikutnya atau memanggil fungsi yang mungkin tidak ada. **Nullish coalescing** `??` mengembalikan operand kanan hanya jika kiri `null` atau `undefined`, berbeda dari `||` yang juga memicu untuk nilai falsy seperti `0` atau `""`.

---

## 2. Mengapa topik ini keluar di interview

- Menulis kode defensif untuk data API bertingkat.
- Menghindari pola `a && a.b && a.b.c` yang berulang.
- Membedakan kebutuhan default untuk `0` vs benar-benar kosong.

---

## 3. Akses properti

```javascript
const city = user?.address?.city;
```

Jika `user` nullish, ekspresi berhenti `undefined`.

---

## 4. Pemanggilan fungsi opsional

```javascript
maybeFn?.();
```

Jika `maybeFn` nullish, tidak dipanggil—hasil `undefined`.

---

## 5. Akses index array

```javascript
const first = arr?.[0];
```

---

## 6. Kombinasi dengan chaining panjang

Hindari terlalu panjang dalam satu baris—pertimbangkan variabel intermediate untuk debugging.

---

## 7. `??` vs `||`

```javascript
const port = config.port ?? 3000;
const name = input.name || "anon";
```

`port` `0` tetap valid; `name` string kosong akan jatuh ke `"anon"`.

---

## 8. Precedence

`??` memiliki aturan precedence dengan `&&`/`||`—gunakan tanda kurung saat ragu.

```javascript
const x = a ?? b || c; // periksa spesifikasi — lebih amah: (a ?? b) || c jika itu maksudnya
```

---

## 9. Tidak menggantikan validasi domain

`user?.id` aman secara sintaks, tapi tidak memastikan `id` valid secara bisnis—tetap perlu schema validation di boundary.

---

## 10. Dampak ke TypeScript

Optional chaining menyempurnakan narrowing; `strictNullChecks` tetap penting.

---

## 11. Performa

Overhead kecil; lebih baik daripada banyak branching manual yang sama.

---

## 12. Latihan

```javascript
const o = { a: { b: 0 } };
console.log(o?.a?.b ?? 10);
```

Hasil `0` — `??` tidak mengganti karena `0` bukan nullish.

---

## 13. Edge: short-circuit dengan side effect

```javascript
obj?.prop.sideEffect();
```

`sideEffect` tidak jalan jika `obj` nullish—penting untuk memahami urutan evaluasi.

---

## 14. Checklist

- [ ] Tahu beda `?.` dengan logical AND chain.
- [ ] Tahu `??` vs `||`.
- [ ] Tahu perilaku pada `0` dan `""`.

---

## 15. Referensi

Operator diperkenalkan di ES2020; dukungan environment lama perlu transpile (Babel).

---

## 16. Pola API response

```javascript
const title = data?.article?.title ?? "Untitled";
```

---

## 17. Anti-pattern

`foo?.bar` pada `foo` yang selalu ada menambah noise—gunakan hanya ketika memang opsional.

---

## 18. Kombinasi dengan destructuring

```javascript
const { x } = obj ?? {};
```

---

## 19. Quiz

```javascript
null ?? undefined;
undefined ?? null;
```

Jawaban: `undefined` lalu `null` — operator mengembalikan kanan hanya jika kiri nullish; `null` adalah nullish jadi lanjut ke kanan.

Wait: `null ?? undefined` - left is null (nullish), so return right: `undefined`.
`undefined ?? null` - left is undefined (nullish), return right: `null`.

---

## 20. Latihan tulis

Refactor fungsi berikut ke optional chaining:

```javascript
function getZip(u) {
  return u && u.address && u.address.zip;
}
```

---

## 21. Jawaban

```javascript
function getZip(u) {
  return u?.address?.zip;
}
```

---

## 22. Flashcard

- `?.` — stop jika nullish.
- `??` — default hanya nullish.

---

## 23. Catatan Babel

Plugin `proposal-optional-chaining` mengubah menjadi helper checks—aware saat debug stack.

---

## 24. Menutup

Dua operator ini mengurangi noise tanpa menggantikan model data yang jelas.

---

## 25. Tambahan: optional delete

Tidak ada `delete obj?.x` khusus—`delete` dengan optional chaining memiliki aturan; hindari pola aneh; gunakan conditional assign.

---

Dokumen ini mencakup pola interview modern untuk defensive coding ringan.
