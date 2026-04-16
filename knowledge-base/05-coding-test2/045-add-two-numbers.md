# Add Two Numbers

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Linked list simulation, elementary addition
- **Inti masalah:** Dua bilangan besar disimpan digit demi digit (least significant di head); jumlahkan seperti penjumlahan kolom dengan carry.

---

- Soal: return new list represent sum (LSB at head), atau mutate policy tergantung LC (usually new list OK).
- Input: `l1`, `l2` non-negative linked digits
- Output: head sum list
- Constraints utama: O(max(n,m)) time, O(1) extra besides output list.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Two pointers + carry

## 2) Jawaban Ideal Singkat (30-60 detik)

> `carry = 0`. Selama `l1` atau `l2` atau carry: `sum = (l1?val:0)+(l2?val:0)+carry`; digit baru `sum % 10`; `carry = floor(sum/10)`; geser pointer. Gunakan `dummy` tail untuk membangun hasil seperti merge list. Hati-hati **bigint** tidak perlu jika constraint digit panjang aman — else BigInt or arrays. O(n), O(1) extra.

Struktur cepat:
- Observasi inti masalah: Same as grade-school addition aligned to LSB-first representation.
- Strategi final yang dipilih: Iterative digit-wise with carry.
- Kenapa strategi ini paling cocok: Natural linear pass.
- Time complexity: O(max(len1,len2))
- Space complexity: O(1) excluding result
- Edge case utama: Different lengths; trailing carry produces extra node `[1]`.

## 3) Versi Ultra Singkat (10-20 detik)

> Add digits with carry; build new list from dummy tail.

## 4) Pseudocode Ringkas (5-10 baris)

```text
dummy; tail = dummy; carry = 0
while l1 or l2 or carry:
  v = carry + (l1.val if l1 else 0) + (l2.val if l2 else 0)
  tail.next = new Node(v % 10)
  carry = v // 10
  advance l1,l2,tail
return dummy.next
```

## 5) Implementasi Final (Inti Saja)

```js
function addTwoNumbers(l1, l2) {
  const dummy = { next: null };
  let tail = dummy,
    carry = 0;
  while (l1 || l2 || carry) {
    const a = l1 ? l1.val : 0;
    const b = l2 ? l2.val : 0;
    const s = a + b + carry;
    tail.next = { val: s % 10, next: null };
    tail = tail.next;
    carry = (s / 10) | 0;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: carry captures overflow to next decimal position exactly as integer addition.
- Kenapa semua kasus valid tercakup: Process until no operands and no carry.
- Kenapa tidak ada kasus yang terlewat: MSD extra carry handled by final loop condition.

## 7) Dry Run Singkat

- `2→4→3` + `5→6→4` represents 342+465=807 → `7→0→8`.

## 8) Red Flags (Yang Harus Dihindari)

- Reverse lists unnecessarily (already LSB first).
- Using parseInt string conversion — overflow risk / wrong spirit.

## 9) Follow-up yang Sering Muncul

- Multiply two numbers — harder (FFT or grade school double nested).

## 10) Trade-off Keputusan

- Iterative vs recursive — iterative standard.

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
- Kerapihan implementasi: 9/10
- Catatan perbaikan: BigInt path if unlimited length strings asked.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: LL math
- Inti masalah (1 kalimat): Add numbers digit lists LSB first.
- Soal: Sum as list.
- Strategi final: Carry walk
- Kompleksitas: O(n), O(1)
- 2 edge case: unequal length; carry at end
- 1 potensi bug: stop before final carry
- 1 alasan valid: Column add invariant per digit including carry
