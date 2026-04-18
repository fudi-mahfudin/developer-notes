# Topik 61 — Trie (Prefix Tree)

**Trie** adalah pohon di mana setiap edge dilabeli karakter; path dari root mengeja string. Mendukung operasi **insert**, **search**, **startsWith** dalam O(L) waktu untuk panjang string L dengan alfabet terbatas.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Node memiliki `children` map/array dan flag `isEnd`. Insert: jalan sesuai karakter, buat node jika perlu, tandai akhir. Search: gagal jika cabang hilang sebelum habis string. Trie efisien untuk autocomplete, prefix counting—memori bisa besar (banyak prefix bersama menghemat).

---

## 2. Mengapa topik ini keluar di interview

- Implement Trie, word search II, replace words by shortest root.

---

## 3. Struktur node

```javascript
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) cur.children.set(ch, new TrieNode());
      cur = cur.children.get(ch);
    }
    cur.isEnd = true;
  }
  search(word) {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) return false;
      cur = cur.children.get(ch);
    }
    return cur.isEnd;
  }
}
```

---

## 4. Kompleksitas

O(L) per operasi, memori O(total characters stored) shared prefixes.

---

## 5. Pitfall: `startsWith` vs full word

Periksa `isEnd` hanya untuk search penuh.

---

## 6. Pitfall: lowercase assumption

Sesuaikan ukuran alphabet (26 vs 128).

---

## 7. Variasi: compressed trie (radix)

Menggabungkan edge beruntun—advanced.

---

## 8. Pola interview

Jelaskan sharing prefix menghemat memori vs hash set kata.

---

## 9. Latihan

Hitung berapa kata dengan prefix `app`.

---

## 10. Checklist

- [ ] Node children + isEnd.
- [ ] Perbedaan search vs startsWith.
- [ ] Tahu kompleksitas O(L).

---

## 11. Referensi

Trie classic; Ternary search trie variant.

---

## 12. Anti-pattern

Menyimpan set kata tanpa struktur untuk prefix query berulang.

---

## 13. Flashcard

- **Prefix sharing:** trie strength.

---

## 14. Latihan tulis

Remove word dari trie—hati-hati prune node.

---

## 15. Testing

Insert list kata, query random prefix.

---

## 16. Penutup

Trie adalah struktur teks untuk prefix operations.

---

## 17. Tambahan: bitwise trie

Untuk XOR maximum queries—advanced.

---

## 18. Tambahan: Aho-Corasick

Multi-pattern automaton—advanced.

---

## 19. Kompleksitas memori

Banyak node untuk dataset padat—trade-off.

---

## 20. Rangkuman

Path = string; children map per karakter.

---

## 21. Soal terkait

Word search II—DFS + trie pruning.

---

## 22. Edge: kosong string

Definisikan insertable atau tidak.

---

## 23. Edge: duplicate insert

Tetap `isEnd` true.

---

## 24. Drill

Gambar trie untuk `app, apple, apply`.

---

## 25. Performa

Sangat cepat untuk lookup prefix.

---

## 26. Integrasi TypeScript

Generic char type `string`.

---

## 27. Debugging

Print trie dengan DFS.

---

## 28. Unicode

Map key string satu code unit atau normalisasi—perjelas.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi case sensitivity.

---

Dokumen ini memperkenalkan trie sebagai struktur dasar untuk aplikasi berbasis prefix.
