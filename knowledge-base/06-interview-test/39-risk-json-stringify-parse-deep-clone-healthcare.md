# Q39 - Risiko JSON stringify/parse untuk Deep Clone

## Pertanyaan Interview

Apa risiko JSON stringify/parse sebagai deep clone cepat?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`JSON.stringify/parse` memang cepat ditulis, tapi bukan deep clone universal.
Pendekatan ini menghilangkan tipe tertentu seperti Date (jadi string), mengabaikan
undefined/function/symbol, gagal untuk circular reference, dan bisa mengubah semantic data.

Untuk production, ini berbahaya jika object memuat tipe penting.
Saya hanya pakai JSON clone pada data plain JSON yang sudah dijamin kompatibel.
Di healthcare integration, salah clone bisa merusak field kritikal seperti timestamp
atau metadata, sehingga validasi downstream bisa gagal diam-diam." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan JSON clone masih acceptable?"
2. "Kenapa Date jadi masalah?"
3. "Bagaimana dampak pada undefined field?"
4. "Apa alternatif aman?"
5. "Bagaimana mencegah misuse di tim?"

### Jawaban Singkat untuk Follow-up

1) Acceptable:
"Saat data murni JSON primitive/object/array tanpa tipe khusus."

2) Date masalah:
"Date berubah string, behavior method Date hilang."

3) undefined:
"Field bisa hilang saat serialization sehingga semantic berubah."

4) Alternatif:
"structuredClone atau library/utility clone yang sesuai kebutuhan."

5) Pencegahan:
"Tetapkan guideline dan utility tunggal untuk cloning."

## Jawaban Ideal (Versi Singkat, Level Senior)

Risiko utama JSON clone:
- kehilangan tipe
- gagal pada circular ref
- perubahan shape data
- overhead serialization besar

Kesimpulan:
jangan gunakan sebagai default deep clone di jalur kritikal.

## Penjelasan Detail yang Dicari Interviewer

### 1) Apa yang hilang/berubah

- `Date` -> string
- `Map/Set` -> object kosong/tidak sesuai
- `undefined` -> dibuang
- function/symbol -> tidak terserialisasi

### 2) Dampak operasional

Data terlihat "berhasil di-clone", tapi maknanya berubah.
Ini menghasilkan bug semantik yang sulit dilacak.

### 3) Anti-pattern umum

- utility global `deepClone = JSON.parse(JSON.stringify(x))`
- dipakai di semua layer tanpa verifikasi tipe
- dipanggil berulang di loop besar

Mitigasi:
- whitelist use case JSON clone
- lint/review guard untuk data tipe kompleks
- benchmark overhead bila payload besar

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const original = { when: new Date(), missing: undefined };
const cloned = JSON.parse(JSON.stringify(original));

console.log(typeof cloned.when); // "string"
console.log("missing" in cloned); // false
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam data healthcare:
- timestamp dan metadata sering penting untuk audit
- perubahan tipe bisa memengaruhi validasi bisnis
- silent data drift berisiko tinggi

Menghindari JSON clone sembarangan adalah langkah quality control.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
payload integrasi di-clone dengan JSON.
field tanggal berubah string format lokal tidak terduga.
downstream parser gagal di sebagian kasus.

Perbaikan:
- gunakan structuredClone untuk object kompatibel
- normalisasi tanggal secara eksplisit
- test contract tipe data antar sistem

## Contoh Pola Kode yang Lebih Aman

```ts
function safeClone<T>(input: T): T {
  return structuredClone(input);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan batasan JSON clone dengan konkret.
- Menyebut perubahan semantic, bukan cuma error teknis.
- Memberi alternatif yang lebih aman.
- Menyebut kapan JSON clone masih boleh.
- Relevan ke audit data healthcare.

## Ringkasan Final

JSON stringify/parse bukan deep clone universal.
Gunakan hanya untuk data plain JSON yang terjamin.
Untuk sistem healthcare, pilih metode cloning yang mempertahankan tipe
agar integritas data dan auditability tetap terjaga.
