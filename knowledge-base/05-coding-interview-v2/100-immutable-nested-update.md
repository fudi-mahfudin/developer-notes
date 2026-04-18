# Topik 100 — Pembaruan Bersarang Imutable

Memperbarui objek bersarang **tanpa mutasi** (imutable) menghindari bug ketika ada **referensi bersama** dan memudahkan **undo/time-travel** di state management. Pola umum: **spread** per level, atau helper **`produce`** (Immer) yang menulis kode “mutatif” sintaks tetapi menghasilkan struktur baru.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk mengubah `state.user.address.city`, buat salinan path dari root: `{...state, user: {...state.user, address: {...state.user.address, city: next}}}`. **Hanya cabang yang berubah** yang dialokasikan ulang—sharing subtree lain. **Structural sharing** mengurangi biaya. Alternatif: **`structuredClone`** lalu mutasi salinan (tidak immer, tetapi sederhana untuk deep kecil). **Lens** (fp) mengabstraksi path—lanjutan.

---

## 2. Mengapa topik ini keluar di interview

- Redux reducer murni membutuhkan update imutable.
- Soal “set nested field tanpa mutate”.

---

## 3. Update manual satu path

```javascript
function setCity(state, city) {
  return {
    ...state,
    user: {
      ...state.user,
      address: { ...state.user.address, city },
    },
  };
}
```

---

## 4. Helper rekursif terbatas

```javascript
function setPath(obj, path, value) {
  if (path.length === 0) return value;
  const [k, ...rest] = path;
  return {
    ...obj,
    [k]: setPath(obj[k] ?? {}, rest, value),
  };
}
```

---

## 5. Kompleksitas

O(kedalaman path × ukuran objek per level copy)—biasanya kecil vs deep clone penuh.

---

## 6. Pitfall: array update

Gunakan `slice`/`map` untuk elemen tertentu; hindari `arr[i]=` pada state Redux.

---

## 7. Pitfall: lupa menyalin level atas

Mutasi bersarang `state.user.address.city = x` jika `address` masih referensi lama.

---

## 8. Pitfall: performa update sangat dalam sering

Pertimbangkan normalisasi state (flat map id).

---

## 9. Pola interview: Immer

```javascript
import { produce } from "immer";
const next = produce(state, (draft) => {
  draft.user.address.city = "Jakarta";
});
```

---

## 10. Pola interview: normalisasi entities

`byId` + `allIds` mengurangi nested update.

---

## 11. Latihan konsep

Jelaskan structural sharing vs deep clone.

---

## 12. Latihan kode

Update elemen array of objects by `id`.

---

## 13. Edge cases

- `undefined` vs missing key — merge policy.
- `Object.freeze` shallow — tidak melindungi nested tanpa deep freeze.

---

## 14. Checklist

- [ ] Salin setiap level di path.
- [ ] Array immutability.
- [ ] Pertimbangkan normalisasi.

---

## 15. Referensi

Redux style guide; Immer docs; Marty Fowler nested state.

---

## 16. Anti-pattern

`JSON.parse(JSON.stringify(x))` untuk update—mahal dan kehilangan tipe.

---

## 17. Flashcard

- **Structural sharing:** subtree tidak berubah direuse.

---

## 18. Testing

Referential equality: node tak berubah `===` prev.

---

## 19. Performa

Immer proxy overhead—ukur jika hot path.

---

## 20. Integrasi TypeScript

`WritableDraft` Immer; utility `DeepReadonly`.

---

## 21. Debugging

`immer` middleware log diff patches.

---

## 22. Memori

Sharing mengurangi duplikasi besar vs naive deep clone.

---

## 23. Parallel

Tidak relevan.

---

## 24. Etika wawancara

Tanyakan apakah library Immer diperbolehkan.

---

## 25. Rangkuman

Update nested imutable = salin path, bagikan sisanya.

---

## 26. Soal terkait

Deep merge (topik 91) — terkait tapi fokus berbeda (gabung vs set).

---

## 27. Drill manual

State `{a:{b:{c:1}}}` — set `c` ke 2 — sebut referensi yang baru vs reuse.

---

## 28. Varian: persistent data structures

Immutable.js — sharing struktural formal.

---

## 29. Penutup

Nested imutable update menutup seri pola JS modern untuk state aman dan prediktif.

---

Dokumen ini menjelaskan update bersarang imutable, spread path, Immer, dan normalisasi state.
