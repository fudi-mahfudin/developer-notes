# Evaluate Reverse Polish Notation

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Stack
- **Inti masalah:** Evaluasi ekspresi postfix; operand disimpan hingga operator mengkonsumsi dua operand teratas.

---

- Soal: Array token `tokens` (integer string & `+ - * /`); return hasil integer (biasanya truncate ke nol untuk `/`).
- Input: `tokens: string[]`
- Output: `number`
- Constraints utama: O(n) waktu, O(n) stack Operand.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Stack

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iterasi token: jika angka, push `Number(token)` (atau parse dengan BigInt jika besar — biasanya 32-bit). Jika operator, pop `b` lalu `a` (urutan penting untuk `-` dan `/`), hitung `a op b`, push hasil. Akhir stack berisi satu nilai — return. Untuk pembagian integer toward zero, `Math.trunc(a/b)`. O(n) waktu, O(n) ruang operand stack. Edge: ekspresi valid dijamin; satu operand tidak muncul leetcode valid RPN.

Struktur cepat:
- Observasi inti masalah: Postfix = evaluasi dengan stack; operator binary butuh dua operand terakhir.
- Strategi final yang dipilih: Stack angka.
- Kenapa strategi ini paling cocok: Straightforward, linear.
- Time complexity: O(n)
- Space complexity: O(n)
- Edge case utama: negatif angka; hasil bagi pembulatan ke nol.

## 3) Versi Ultra Singkat (10-20 detik)

> Stack angka; operator → pop dua, apply, push; akhir satu nilai.

## 4) Pseudocode Ringkas (5-10 baris)

```text
stack = []
for t in tokens:
  if t is operator:
    b = pop; a = pop
    push apply(a, t, b)
  else:
    push integer(t)
return stack.top
```

## 5) Implementasi Final (Inti Saja)

```js
function evalRPN(tokens) {
  const st = [];
  const op = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };
  for (const t of tokens) {
    if (op[t]) {
      const b = st.pop();
      const a = st.pop();
      st.push(op[t](a, b));
    } else {
      st.push(Number(t));
    }
  }
  return st[0];
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Stack merepresentasikan evaluasi prefix dari subexpression yang sudah selesai; operator selalu menggabungkan dua subhasil terbaru sesuai RPN semantics.
- Kenapa semua kasus valid tercakup: Ekspresi valid ⇒ setiap operator punya dua operand tersedia.
- Kenapa tidak ada kasus yang terlewat: Scan lengkap memproses semua token.

## 7) Dry Run Singkat

- Kasus normal: `["2","1","+","3","*"]` → 9.
- Kasus edge: `["4","13","5","/","+"]` → 6.
- Hasil: Sesuai evaluasi postfix.

## 8) Red Flags (Yang Harus Dihindari)

- Urutan `a` dan `b` terbalik untuk `-` / `/`.
- Menggunakan pembagian floating tanpa `trunc` jika diminta integer.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):
  - Jawaban ideal singkat: In-place stack di array token jika sangat besar — optimasi lanjutan.
- Follow-up 2 (trade-off):
  - Jawaban ideal singkat: BigInt untuk overflow — sebutkan jika constraint long.
- Follow-up 3 (variasi soal):
  - Jawaban ideal singkat: Unary operator / fungsi — extend dispatch map.

## 10) Trade-off Keputusan

- Opsi A: Map operator → fungsi — bersih.
- Opsi B: Switch case — sama kompleksitas.
- Kenapa memilih opsi final: Readability.
- Risiko dari opsi final: Lupa urutan operand.
- Mitigasi: `const b = pop(); const a = pop();`

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Sebutkan overflow jika bilangan besar.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Stack
- Inti masalah (1 kalimat): Eval postfix dengan operand stack.
- Soal: Integer result.
- Strategi final: Push numbers, reduce on ops
- Kompleksitas: O(n), O(n)
- 2 edge case: negative ints; division truncate
- 1 potensi bug: swap order of operands
- 1 alasan solusi ini valid: RPN = iterative reduce of last two values
