# Q37 - Trade-off Recursion vs Iteration di JavaScript

## Pertanyaan Interview

Jelaskan trade-off recursion vs iteration di JavaScript.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Recursion membuat solusi lebih deklaratif untuk masalah bertipe tree/graph,
tapi di JavaScript ada risiko stack overflow jika depth besar.
Iteration biasanya lebih aman untuk data besar karena kontrol memori lebih jelas
dan tidak tergantung call stack dalam.

Saya pilih recursion saat ekspresivitas membantu dan depth terkontrol.
Saya pilih iteration untuk jalur kritikal produksi, terutama batch besar.
Di sistem healthcare, reliabilitas lebih penting daripada elegansi kode,
jadi iteration sering jadi default untuk proses volume tinggi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah JS punya tail-call optimization yang aman dipakai?"
2. "Kapan recursion tetap lebih unggul?"
3. "Bagaimana mitigasi stack overflow?"
4. "Bagaimana dampak ke readability?"
5. "Apa anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) TCO:
"Dukungan tidak konsisten lintas runtime, jangan dijadikan asumsi utama."

2) Recursion unggul:
"Traversal tree/AST saat depth relatif aman dan struktur alami rekursif."

3) Mitigasi:
"Gunakan iteration/stack manual untuk depth besar."

4) Readability:
"Recursion bisa lebih ringkas, tapi debugging stack deep lebih sulit."

5) Anti-pattern:
"Recursion pada input tak terbatas tanpa guard depth."

## Jawaban Ideal (Versi Singkat, Level Senior)

Recursion:
- natural untuk struktur hierarki
- kode singkat dan ekspresif
- berisiko stack overflow

Iteration:
- stabil untuk skala besar
- kontrol performa lebih baik
- kadang lebih verbose

## Penjelasan Detail yang Dicari Interviewer

### 1) Biaya runtime

Recursion menambah frame call stack per level.
Iteration memakai loop dengan overhead stack lebih kecil.

### 2) Kapan keputusan berubah

Di local test data kecil, recursion tampak aman.
Di produksi data besar, depth tak terduga bisa memicu crash.

### 3) Anti-pattern umum

- recursive DFS pada graph besar tanpa visited guard
- tidak ada base case kuat
- deep recursion di endpoint request path

Mitigasi:
- base case eksplisit
- depth guard
- fallback iterative implementation

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Recursive sum
function sumRec(arr, i = 0) {
  if (i >= arr.length) return 0;
  return arr[i] + sumRec(arr, i + 1);
}

// Iterative sum
function sumIter(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) total += arr[i];
  return total;
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada data transaksi healthcare:
- ukuran batch bisa besar
- reliability job lebih penting dari style coding
- crash karena stack overflow bisa mengganggu operasi

Iteration cenderung lebih aman untuk pipeline produksi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
rekonsiliasi hierarki data memakai recursion tanpa guard.
Saat data anomali sangat dalam, service crash dan job tertunda.

Perbaikan:
- ubah traversal ke stack iterative
- tambah limit depth dan alert data anomali

## Contoh Pola Kode yang Lebih Aman

```ts
function traverseIterative(root: Node) {
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    processNode(cur);
    for (const child of cur.children) stack.push(child);
  }
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan trade-off teknis recursion vs iteration.
- Menyebut stack overflow sebagai risiko nyata.
- Menyebut konteks depth dan ukuran data.
- Memberi contoh kapan masing-masing dipilih.
- Relevan untuk workload healthcare produksi.

## Ringkasan Final

Recursion bagus untuk kejelasan struktur masalah.
Iteration lebih aman untuk skala besar dan jalur kritikal.
Di sistem healthcare, keputusan harus mengutamakan stabilitas operasional
dan toleransi terhadap input ekstrem.
