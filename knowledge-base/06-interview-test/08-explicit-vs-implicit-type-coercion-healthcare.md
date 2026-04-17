# Q8 - Type Coercion Eksplisit vs Implisit

## Pertanyaan Interview

Jelaskan type coercion eksplisit vs implisit dengan contoh kasus bug production.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Type coercion eksplisit adalah konversi tipe yang kita lakukan secara sadar, seperti
`Number(value)` atau `String(value)`. Type coercion implisit terjadi otomatis oleh engine
saat operasi tertentu, misalnya perbandingan longgar atau operasi aritmetika campur tipe.

Di production, implisit coercion sering bikin bug karena intent tidak terlihat.
Saya pilih strategi: normalisasi tipe di boundary sistem, validasi schema, lalu operasi
internal menggunakan tipe yang sudah pasti. Ini penting di healthcare agar data kuantitas,
status, dan identifier tidak salah tafsir." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah coercion implisit harus selalu dihindari?"
2. "Contoh coercion implisit yang sering luput?"
3. "Bagaimana desain boundary validation?"
4. "Apa peran TypeScript di sini?"
5. "Apa trade-off explicit conversion?"

### Jawaban Singkat untuk Follow-up

1) Harus selalu dihindari?
"Tidak selalu, tapi untuk logic bisnis kritikal sebaiknya diminimalkan."

2) Sering luput:
"String angka dipakai pada operasi `+` sehingga jadi concatenation."

3) Boundary validation:
"Normalize input dari API/DB di awal, jangan di tengah business logic."

4) Peran TypeScript:
"Membantu saat compile time, tapi runtime data tetap perlu validasi."

5) Trade-off:
"Sedikit lebih verbose, tapi jauh lebih aman dan mudah diaudit."

## Jawaban Ideal (Versi Singkat, Level Senior)

Eksplisit coercion:
- intent jelas
- mudah direview
- stabil untuk evolusi codebase

Implisit coercion:
- ringkas
- berisiko ambigu
- sering memunculkan edge case runtime

Policy senior:
coerce sekali di boundary, simpan domain model dalam tipe konsisten.

## Penjelasan Detail yang Dicari Interviewer

### 1) Titik rawan implisit coercion

- operator `+` campur string dan number
- `==` dengan nilai nullish/boolean
- truthy/falsy check pada data yang seharusnya numerik

### 2) Contoh bug production klasik

`"10" + 5` menghasilkan `"105"` bukan `15`.
Jika ini terjadi di kalkulasi quantity, hasil inventory menjadi salah.

### 3) Anti-pattern umum

- menunda validasi sampai layer akhir
- parse angka berulang di banyak titik
- memproses payload external langsung sebagai trusted type

Mitigasi:
- centralized parser/validator
- fail fast saat tipe invalid
- standard util untuk konversi

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const qtyFromApi = "10";

const implicitTotal = qtyFromApi + 5; // "105"
const explicitTotal = Number(qtyFromApi) + 5; // 15

console.log({ implicitTotal, explicitTotal });
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam workflow rumah sakit:
- quantity, dosage, dan status transaksi harus akurat
- integrasi lintas sistem sering mengirim tipe data berbeda
- kualitas data menentukan kecepatan dan akurasi operasional

Dengan pengalaman kamu di integrasi PostgreSQL dan SQL Server, mismatch tipe adalah
risiko nyata yang harus dikendalikan sejak boundary layer.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
WMS mengirim `qty` sebagai string, service internal menganggap number.
Saat agregasi harian, operasi `+` menghasilkan concatenation.
Laporan retur terlihat valid formatnya tapi nilainya salah.

Dampak:
- rekonsiliasi stok meleset
- proses audit memakan waktu
- keputusan operasional berbasis data menjadi bias

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnPayload = {
  encounterId: string;
  qty: number;
};

function parseReturnPayload(input: { encounterId: unknown; qty: unknown }): ReturnPayload {
  if (typeof input.encounterId !== "string" || input.encounterId.length === 0) {
    throw new Error("Invalid encounterId");
  }
  const qty = Number(input.qty);
  if (!Number.isInteger(qty) || qty < 0) {
    throw new Error("Invalid qty");
  }
  return { encounterId: input.encounterId, qty };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan eksplisit vs implisit dengan contoh jelas.
- Menyebut bug runtime konkret akibat coercion implisit.
- Memberi strategi boundary normalization.
- Menjelaskan peran TypeScript + runtime validation.
- Mengaitkan ke data consistency healthcare.

## Ringkasan Final

Coercion eksplisit membuat intent teknis jelas dan aman untuk production.
Coercion implisit boleh terjadi, tapi harus dibatasi pada konteks non-kritikal.
Untuk sistem healthcare, normalisasi tipe di boundary adalah guardrail utama
agar data operasional tetap konsisten dan dapat diaudit.
