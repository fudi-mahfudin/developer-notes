# Topik 43 — Stack untuk Parsing dan Pola Undo/Redo

**Stack** (LIFO) cocok untuk mencocokkan struktur bersarang (bracket), mengevaluasi ekspresi, serta menyimpan **history** untuk undo. **Undo/redo** sering diimplementasikan dengan dua stack: `undoStack` dan `redoStack` yang saling mentransfer state.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Parsing: push token pembuka; saat penutup, pop dan cocokkan. Undo: push snapshot command ke `undoStack`; saat undo, pop dari `undoStack`, terapkan inverse operation, push ke `redoStack`. Redo kebalikan. Kompleksitas per operasi amortized O(1) jika state yang disimpan ringkas (perintah, bukan seluruh dunia).

---

## 2. Mengapa topik ini keluar di interview

- Valid parentheses, decode string, path simplification `/../`.
- Desain editor text mini dengan undo.

---

## 3. Contoh path simplification

Gunakan stack untuk komponen path; `..` pop jika bisa, `.` abaikan.

---

## 4. Undo stack desain

```javascript
class Editor {
  constructor() {
    this.text = "";
    this.undo = [];
    this.redo = [];
  }
  type(ch) {
    this.undo.push(["delete", 1]);
    this.text += ch;
    this.redo = [];
  }
  undoOp() {
    const op = this.undo.pop();
    if (!op) return;
    if (op[0] === "delete") {
      const last = this.text.slice(-1);
      this.text = this.text.slice(0, -1);
      this.redo.push(["insert", last]);
    }
  }
}
```

Contoh ilustratif—perlu penyempurnaan untuk produksi.

---

## 5. Kompleksitas

Operasi stack O(1); memori O(history).

---

## 6. Pitfall: menyimpan seluruh snapshot

Boros—simpan **delta** atau command.

---

## 7. Pitfall: redo invalid setelah edit baru

Kosongkan redo stack setelah aksi baru (seperti contoh).

---

## 8. Pola interview

Jelaskan dua stack untuk undo/redo.

---

## 9. Latihan

Implementasikan `simplifyPath` dengan stack token.

---

## 10. Checklist

- [ ] LIFO untuk nested match.
- [ ] Inverse command untuk undo.
- [ ] Clear redo on new action.

---

## 11. Referensi

Command pattern di OOP; editor undo stacks.

---

## 12. Anti-pattern

Array `unshift` untuk undo—O(n).

---

## 13. Flashcard

- **Undo stack:** history.
- **Redo stack:** future.

---

## 14. Latihan tulis

HTML tag matcher dengan stack nama tag.

---

## 15. Testing

Simulasi rangkaian type/undo/redo/type.

---

## 16. Penutup

Stack adalah struktur pertama untuk nested syntax dan history linear.

---

## 17. Tambahan: persistent data structures

Undo tanpa duplikasi besar—advanced.

---

## 18. Tambahan: transactional stack

Rollback multi-step—gunakan nested stacks atau journal.

---

## 19. Kompleksitas memori

Riwayat bisa besar—pertimbangkan batas.

---

## 20. Rangkuman

Parsing + undo = stack klasik.

---

## 21. Soal terkait

Decode string `3[a2[c]]`—recursive/stack.

---

## 22. Edge: undo kosong

No-op.

---

## 23. Edge: redo kosong

No-op.

---

## 24. Drill

Trace `type a, type b, undo, redo`.

---

## 25. Performa

Stack operations cepat.

---

## 26. Integrasi JS

`Array` sebagai stack—`push/pop`.

---

## 27. Debugging

Log isi kedua stack.

---

## 28. Concurrency

Undo dalam multi-user butuh CRDT—luar cakupan.

---

## 29. UI/UX

Disable tombol undo/redo saat stack kosong.

---

## 30. Etika wawancara

Tanyakan apa yang disimpan per operasi—delta vs snapshot.

---

Dokumen ini menghubungkan stack parsing dengan desain undo/redo praktis.
