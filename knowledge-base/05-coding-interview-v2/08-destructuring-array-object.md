# Topik 8 — Destructuring (Array dan Object)

Dokumen ini menjelaskan sintaks destructuring ES2015 untuk mengekstrak nilai dari array dan properti object, nilai default, rest pattern, serta pola umum di API modern dan React.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Destructuring** memungkinkan “membuka” struktur data di sisi kiri assignment atau parameter fungsi: array memakai posisi, object memakai nama properti. **Default value** dipakai jika `undefined`. **Rest** (`...rest`) mengumpulkan sisa elemen atau properti. Ini mengurangi kode boilerplate tanpa mengubah semantik referensi object—hanya mengekstrak binding baru.

---

## 2. Mengapa topik ini keluar di interview

- Membaca kode library/modern yang padat destructuring.
- Menghindari bug saat rename properti atau urutan array berubah.
- Kombinasi dengan parameter fungsi dan nested pattern.

---

## 3. Array destructuring dasar

```javascript
const [a, b] = [1, 2];
```

Skip posisi dengan hole:

```javascript
const [x, , z] = [1, 2, 3];
```

---

## 4. Default values

```javascript
const [m = 10] = [undefined];
```

Hanya `undefined` memicu default (mirip parameter default).

---

## 5. Rest di array

```javascript
const [head, ...tail] = [1, 2, 3, 4];
```

`tail` adalah array baru.

---

## 6. Object destructuring dasar

```javascript
const { name, age } = { name: "A", age: 20 };
```

---

## 7. Rename

```javascript
const { name: fullName } = { name: "A" };
```

---

## 8. Default + rename

```javascript
const { x: y = 1 } = {};
```

---

## 9. Nested

```javascript
const {
  user: { id },
} = { user: { id: 7 } };
```

Akses path yang tidak ada melempar error kecuali Anda beri default di setiap level.

---

## 10. Destructuring di parameter

```javascript
function draw({ x = 0, y = 0 } = {}) {
  return [x, y];
}
```

` = {}` mencegah error jika argumen tidak ada.

---

## 11. Pola interview: swap tanpa temp

```javascript
let a = 1,
  b = 2;
[a, b] = [b, a];
```

---

## 12. Keterbatasan

Destructuring **menyalin** nilai primitif atau binding baru; untuk object nested, inner masih referensi kecuali Anda nested-destructure dengan hati-hati.

---

## 13. Kompleksitas

Operasi O(jumlah binding) — tidak masalah untuk interview kecuali loop besar dengan pola aneh.

---

## 14. Latihan

```javascript
const meta = { title: "T", author: { name: "N" } };
// Ekstrak title dan author name dalam dua binding
```

---

## 15. Solusi singkat

```javascript
const {
  title,
  author: { name: authorName },
} = meta;
```

---

## 16. Checklist

- [ ] Tahu default hanya untuk `undefined`.
- [ ] Tahu rename syntax.
- [ ] Tahu rest untuk sisa properti/elemen.
- [ ] Tahu default parameter `= {}` untuk obj opsional.

---

## 17. Referensi

Spesifikasi menggunakan struktur pattern dan iterator untuk array-like. Object destructuring memakai `GetValue` ke properti.

---

## 18. Tambahan: destructuring Map/Set

Tidak langsung; iterasi `for (const [k, v] of map)`.

---

## 19. Tambahan: computed key

```javascript
const key = "id";
const { [key]: id } = { id: 5 };
```

---

## 20. React props

```javascript
function Card({ title, children, ...rest }) {}
```

`rest` menampung props lain untuk spread ke DOM element.

---

## 21. Anti-pattern

Destructuring terlalu dalam di satu baris mengurangi readability—pecah jika error debugging sulit.

---

## 22. Quiz

Apa hasil:

```javascript
const { a = 2 } = { a: null };
```

`null` tidak memicu default—`a` adalah `null`.

---

## 23. Quiz 2

```javascript
let obj = { x: 1 };
({ x } = obj);
```

Perlu tanda kurung di luar saat bukan deklarasi—menghindari parser mengira block statement.

---

## 24. Latihan tulis

Tulis `pick(obj, keys)` memakai destructuring/rest tanpa library.

---

## 25. Menutup

Destructuring adalah gula sintaksis yang kuat; pahami default dan null vs undefined.

---

## 26. Flashcard

- **Array:** posisi.
- **Object:** nama properti / rename.
- **Rest:** sisa ke struktur baru.

---

Dokumen ini mencakup kebutuhan interview umum untuk membaca dan menulis pola destructuring.
