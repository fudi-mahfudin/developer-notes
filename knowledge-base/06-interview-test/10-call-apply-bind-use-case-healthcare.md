# Q10 - `call`, `apply`, dan `bind` dengan Use Case Nyata

## Pertanyaan Interview

Bedakan `call`, `apply`, dan `bind` dengan use case nyata.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Ketiganya dipakai untuk mengatur nilai `this` pada function biasa.
`call` mengeksekusi function langsung dengan argumen dipassing satu per satu.
`apply` juga mengeksekusi langsung, tapi argumen dipassing sebagai array.
`bind` tidak mengeksekusi langsung; dia mengembalikan function baru dengan `this`
yang sudah terikat, bisa dipanggil belakangan.

Di production, `bind` sering dipakai untuk callback yang harus menjaga context object.
`call/apply` lebih cocok untuk invoke sekali pakai atau function borrowing.
Di service healthcare, ini membantu menjaga konsistensi akses config/client instance." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan pilih `call` dibanding `apply`?"
2. "Kapan `bind` lebih tepat?"
3. "Apakah `bind` berdampak performa?"
4. "Bisa pakai `call/apply` pada arrow function?"
5. "Apa alternatif modern selain `apply`?"

### Jawaban Singkat untuk Follow-up

1) `call` vs `apply`:
"`call` untuk argumen eksplisit, `apply` saat argumen sudah berupa array."

2) Kapan bind:
"Saat function akan dipassing sebagai callback dan context harus stabil."

3) Performa:
"Ada overhead kecil pembuatan function baru, biasanya bukan bottleneck utama."

4) Arrow function:
"Tidak efektif mengubah `this` arrow karena `this`-nya lexical."

5) Alternatif:
"Gunakan spread syntax: `fn.call(ctx, ...args)`."

## Jawaban Ideal (Versi Singkat, Level Senior)

Perbedaan inti:
- `call(thisArg, a, b, c)` -> execute now
- `apply(thisArg, [a, b, c])` -> execute now
- `bind(thisArg, a, b)` -> return new function

Gunakan:
- `call` untuk invoke langsung dengan argumen known
- `apply` untuk invoke dengan dynamic arguments list
- `bind` untuk event handler/callback yang butuh context konsisten

## Penjelasan Detail yang Dicari Interviewer

### 1) Relevansi dengan `this` bugs

Mayoritas bug bukan karena API-nya rumit, tapi karena context tidak dikontrol.
`bind` sering menyelesaikan class method callback issue.

### 2) Function borrowing

`call/apply` memungkinkan meminjam method generic ke object lain.
Ini berguna pada util function lintas modul.

### 3) Anti-pattern umum

- overuse `bind` di render path UI
- memakai `apply` padahal spread lebih readable
- mencoba rebind arrow function dan berharap perubahan `this`

Mitigasi:
- pilih API sesuai intent
- gunakan arrow untuk callback sederhana
- dokumentasikan callback contract

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function format(prefix, suffix) {
  return `${prefix}${this.code}${suffix}`;
}

const ctx = { code: "RX-2026" };

console.log(format.call(ctx, "[", "]")); // [RX-2026]
console.log(format.apply(ctx, ["(", ")"])); // (RX-2026)

const bound = format.bind(ctx, "<");
console.log(bound(">")); // <RX-2026>
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam integrasi healthcare:
- client instance memegang base URL, token, timeout
- callback sering dipassing ke scheduler/queue
- kehilangan context berarti request gagal atau salah target

Penguasaan `call/apply/bind` menurunkan risiko context-related outage.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
method `sendReturn` dari `WarehouseClient` dipassing ke queue tanpa bind.
Saat worker menjalankan, `this.token` undefined.
Request gagal autentikasi dan job retry meledak.

Solusi:
- gunakan `bind` saat registrasi handler
- atau ubah method jadi arrow property lexical this

## Contoh Pola Kode yang Lebih Aman

```ts
class WarehouseClient {
  constructor(private readonly token: string) {}

  async sendReturn(payload: unknown) {
    return postWithToken(this.token, payload);
  }
}

const client = new WarehouseClient("secure-token");
const handler = client.sendReturn.bind(client);
registerQueueHandler(handler);
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan execute-now vs return-function.
- Menjelaskan format argumen `call` vs `apply`.
- Menjelaskan konteks penggunaan `bind`.
- Menyebut keterbatasan terhadap arrow function.
- Mengaitkan ke callback reliability pada sistem healthcare.

## Ringkasan Final

`call`, `apply`, dan `bind` adalah alat kontrol context function.
Perbedaan utamanya ada pada cara pass argumen dan timing eksekusi.
Untuk production healthcare, gunakan dengan disiplin agar callback tidak kehilangan context,
request tetap konsisten, dan flow integrasi tetap stabil.
