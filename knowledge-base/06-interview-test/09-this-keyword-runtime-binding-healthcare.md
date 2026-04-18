# Q9 - `this` di JavaScript dan Penentuan Nilainya Saat Runtime

## Pertanyaan Interview

Apa itu `this` di JavaScript, dan bagaimana nilainya ditentukan saat runtime?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`this` adalah binding kontekstual pada saat function dieksekusi, bukan saat function
didefinisikan. Nilainya bergantung cara pemanggilan: method call, plain function,
constructor dengan `new`, atau explicit binding lewat `call/apply/bind`. Arrow function
tidak punya `this` sendiri; dia mewarisi `this` lexical dari scope luar.

Di production, bug `this` sering muncul saat method dipassing sebagai callback tanpa binding.
Pada service healthcare, ini bisa membuat akses config atau state object gagal di runtime.
Karena itu saya cenderung pakai arrow function untuk callback dan explicit bind kalau perlu." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa arrow function berbeda untuk `this`?"
2. "Apa default `this` di strict mode?"
3. "Contoh bug callback kehilangan `this`?"
4. "Kapan pakai `bind` di constructor?"
5. "Best practice di class-based code?"

### Jawaban Singkat untuk Follow-up

1) Arrow function:
"Arrow tidak membuat `this` baru; dia capture `this` dari lexical scope."

2) Strict mode:
"Default `this` pada plain function call adalah `undefined`."

3) Bug callback:
"Method dipassing langsung ke setTimeout sehingga `this` bukan object asal."

4) Bind di constructor:
"Saat method sering dipassing sebagai callback dan harus stabil context-nya."

5) Best practice:
"Minimalkan ambiguity: pakai arrow callback atau bind eksplisit."

## Jawaban Ideal (Versi Singkat, Level Senior)

Aturan umum binding `this`:
- **method call**: `obj.fn()` -> `this` mengacu ke `obj`
- **plain function call**: `fn()` -> `undefined` (strict mode)
- **constructor**: `new Fn()` -> `this` adalah instance baru
- **explicit binding**: `fn.call(obj)`/`apply`/`bind`
- **arrow function**: lexical `this`, tidak bisa diubah `call/apply/bind`

## Penjelasan Detail yang Dicari Interviewer

### 1) Mengapa `this` sering disalahpahami

Developer sering mengira `this` mengikuti lokasi deklarasi.
Padahal `this` pada function biasa ditentukan call-site.

### 2) Dampak di codebase besar

- callback event kehilangan context
- method utility gagal akses dependency internal
- bug muncul intermittent saat refactor atau pass function antar layer

### 3) Anti-pattern umum

- destructure method lalu panggil tanpa bind
- campur function biasa dan arrow tanpa aturan
- mengandalkan global `this` di environment berbeda

Mitigasi:
- aktifkan strict mode (TS default)
- gunakan lint rule soal unbound methods
- dokumentasikan pattern callback di tim

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const service = {
  name: "inventory-sync",
  getName() {
    return this.name;
  },
};

const fn = service.getName;
// console.log(fn()); // undefined (strict mode)
console.log(service.getName()); // "inventory-sync"
console.log(fn.call(service)); // "inventory-sync"
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di proyek kamu, service integrasi memegang config koneksi, retry policy, dan mapper.
Jika `this` salah binding:
- config bisa tidak terbaca
- retry handler bisa gagal
- status sinkronisasi jadi tidak stabil

Untuk sistem kritikal, kehilangan context kecil bisa berujung incident besar.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
class `WmsClient` punya method `send`.
Method ini dipassing ke queue worker tanpa `bind`.
Saat dieksekusi, `this.baseUrl` jadi `undefined`, request gagal sporadis.

Dampak:
- job retry melonjak
- antrean proses retur menumpuk
- monitoring menampilkan error koneksi palsu

## Contoh Pola Kode yang Lebih Aman

```ts
class WmsClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs: number,
  ) {}

  // arrow property menjaga lexical this saat dipassing sebagai callback
  send = async (payload: unknown) => {
    return postToWarehouse(this.baseUrl, payload, this.timeoutMs);
  };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan `this` berdasarkan call-site.
- Menjelaskan pengecualian arrow function (lexical this).
- Menjelaskan strict mode behavior.
- Menyediakan contoh bug callback context loss.
- Mengaitkan ke reliability service healthcare.

## Ringkasan Final

`this` pada JavaScript adalah runtime binding untuk function biasa.
Kesalahan memahami call-site sering memicu bug production yang sulit dilacak.
Di sistem healthcare, gunakan pola binding yang eksplisit agar callback tetap aman,
prediktif, dan tidak merusak alur integrasi kritikal.
