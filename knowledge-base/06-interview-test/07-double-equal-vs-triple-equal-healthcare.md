# Q7 - Perbedaan `==` vs `===` dan Risiko Coercion

## Pertanyaan Interview

Apa perbedaan `==` dan `===`, dan kapan coercion bisa berbahaya?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`==` melakukan perbandingan longgar dan bisa memicu type coercion otomatis.
`===` melakukan perbandingan ketat: tipe dan nilai harus sama. Di code production,
saya default pakai `===` untuk menghindari bug implisit. `==` hanya saya pakai di kasus
sangat spesifik yang dipahami jelas, misalnya `value == null` untuk cek `null` atau `undefined`.

Di sistem healthcare, coercion yang tidak disengaja berisiko memvalidasi data secara salah,
misalnya ID transaksi, flag status, atau quantity jadi lolos padahal formatnya tidak valid." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan `==` masih boleh?"
2. "Kenapa `[] == false` bisa true?"
3. "Bagaimana aturan lint terbaik?"
4. "Apakah `Object.is` sama dengan `===`?"
5. "Contoh bug real dari coercion?"

### Jawaban Singkat untuk Follow-up

1) Kapan boleh:
"Terbatas, biasanya `value == null` untuk nullish check yang disengaja."

2) `[] == false`:
"Karena coercion bertahap ke primitive lalu number, hasil akhirnya sama-sama 0."

3) Lint:
"Aktifkan `eqeqeq` dan exception seminimal mungkin."

4) `Object.is`:
"Mirip tapi tidak identik; `NaN` dan `-0` diperlakukan berbeda."

5) Bug real:
"String angka dibanding longgar dengan number dan lolos validasi yang seharusnya gagal."

## Jawaban Ideal (Versi Singkat, Level Senior)

`===`:
- tanpa coercion
- prediktif
- aman untuk codebase besar

`==`:
- coercion implisit
- rawan edge case
- bisa valid di use case sempit dengan kontrak jelas

Rekomendasi senior:
jadikan `===` default policy, dokumentasikan pengecualian secara eksplisit.

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa coercion membahayakan maintainability

Coercion membuat niat bisnis tidak jelas.
Reviewer harus mensimulasikan aturan konversi JS, bukan membaca intent langsung.

### 2) Edge cases yang sering menjebak

- `0 == false` -> true
- `"" == 0` -> true
- `null == undefined` -> true
- `"01" == 1` -> true

### 3) Anti-pattern umum

- validasi input memakai `==` tanpa normalisasi tipe
- perbandingan status code campur string/number
- fallback logic berdasarkan truthy/falsy tanpa kontrak tipe

Mitigasi:
- normalize input boundary
- gunakan schema validation
- enforce strict equality

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
console.log("0" == 0);   // true
console.log("0" === 0);  // false

const apiStatus = "200";
if (apiStatus == 200) {
  // lolos karena coercion
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di alur healthcare, akurasi data lebih penting dari shortcut coding.
Kesalahan equality bisa berdampak pada:
- status sinkronisasi salah
- quantity inventory salah hitung
- audit trail tidak konsisten

Dengan latar kamu di integrasi lintas database, strict typing mindset sangat relevan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
`returnQty` dari API datang sebagai string `"0"`.
Rule bisnis memakai `if (returnQty == false)` untuk memblok retur nol.
Nilai `"0"` jadi true pada ekspresi itu, alur menjadi ambigu dan memicu penanganan salah.

Perbaikan:
- parse ke number di boundary
- validasi schema
- gunakan perbandingan eksplisit `returnQty === 0`

## Contoh Pola Kode yang Lebih Aman

```ts
function validateReturnQty(rawQty: unknown): number {
  const qty = Number(rawQty);
  if (!Number.isFinite(qty) || qty < 0) {
    throw new Error("Invalid return quantity");
  }
  return qty;
}

const qty = validateReturnQty("0");
if (qty === 0) {
  // explicit and deterministic
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan `==` sebagai loose equality dengan coercion.
- Menjelaskan `===` sebagai strict equality tanpa coercion.
- Menunjukkan edge case nyata.
- Memberi policy praktis untuk production team.
- Mengaitkan risiko ke data consistency healthcare.

## Ringkasan Final

Gunakan `===` sebagai default karena paling jelas dan aman.
`==` hanya untuk use case sangat terbatas dan terdokumentasi.
Untuk sistem kritikal seperti healthcare, strict equality mengurangi bug diam-diam
dan memperkuat konsistensi antar layanan.
