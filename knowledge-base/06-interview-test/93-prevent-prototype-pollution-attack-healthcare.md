# Q93 - Mencegah Prototype Pollution Attack

## Pertanyaan Interview

Bagaimana mencegah prototype pollution attack di aplikasi JavaScript?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Prototype pollution terjadi saat input user bisa menyuntik properti ke prototype object global,
misalnya lewat merge object yang tidak aman.
Dampaknya bisa luas: behavior aplikasi berubah tak terduga,
bahkan membuka celah keamanan lanjutan.

Pencegahannya:
validasi ketat key input,
hindari deep merge naif pada object untrusted,
gunakan object tanpa prototype untuk map tertentu,
dan update dependency yang memiliki CVE terkait pollution.
Di sistem healthcare, serangan jenis ini berisiko karena efeknya silent
dan sulit dideteksi tanpa kontrol yang tepat." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Contoh payload prototype pollution?"
2. "Kenapa library util sering jadi titik lemah?"
3. "Apa mitigasi di runtime?"
4. "Bagaimana test untuk celah ini?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Payload contoh:
"Key seperti `__proto__`, `constructor.prototype` pada input object."

2) Library util:
"Karena sering melakukan deep merge generic."

3) Runtime mitigasi:
"Denylist key berbahaya + sanitize parser input."

4) Testing:
"Tambahkan security tests dengan payload pollution khas."

5) Anti-pattern:
"Merge object user langsung ke config internal."

## Jawaban Ideal (Versi Singkat, Level Senior)

Mitigasi utama:
- sanitize keys berbahaya
- safe merge strategy
- dependency patching
- security regression tests

## Penjelasan Detail yang Dicari Interviewer

### 1) Mekanisme serangan

- attacker kirim object nested dengan key berbahaya
- fungsi merge menyalin ke prototype chain
- object lain mewarisi properti tak diinginkan

### 2) Kontrol pencegahan

- gunakan parser/validator schema ketat
- block keys: `__proto__`, `prototype`, `constructor`
- gunakan `Object.create(null)` untuk map data mentah

### 3) Operasional keamanan

- pantau advisory dependency
- patch cepat untuk library merge/parser
- lakukan SAST/DAST checks untuk pola raw merge

Mitigasi:
- code review rule khusus merge untrusted objects
- centralized utility merge aman
- unit tests untuk malicious payload

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const blockedKeys = new Set(["__proto__", "prototype", "constructor"]);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Prototype pollution bisa mengubah perilaku sistem secara tersembunyi.
Di platform healthcare, perubahan behavior tak terduga dapat memicu
ketidakakuratan proses operasional dan risiko keamanan lanjut.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint menerima config object dari klien dan merge langsung ke defaults.
attacker menyisipkan `__proto__` dan mengubah flag otorisasi internal.

Perbaikan:
- sanitize keys sebelum merge
- gunakan safe merge utility
- audit endpoint menerima object dinamis

## Contoh Pola Kode yang Lebih Aman

```ts
type SafeMergePolicy = {
  rejectPrototypeKeys: boolean;
  allowUnknownKeys: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan mekanisme prototype pollution.
- Menjelaskan key berbahaya yang harus diblok.
- Menjelaskan safe merge strategy.
- Menjelaskan dependency patching relevan.
- Relevan pada risiko keamanan healthcare.

## Ringkasan Final

Prototype pollution adalah ancaman yang sering tersembunyi di utility code.
Pencegahan efektif memerlukan kombinasi sanitasi input,
merge strategy aman, dan hygiene dependency yang disiplin.
Dengan kontrol ini, risiko perilaku sistem tak terduga dapat ditekan.
