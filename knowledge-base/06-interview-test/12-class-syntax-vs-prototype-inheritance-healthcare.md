# Q12 - Class Syntax vs Prototype-based Inheritance

## Pertanyaan Interview

Bedakan class syntax dengan prototype-based inheritance di bawah hood.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`class` di JavaScript adalah syntactic sugar di atas prototype system.
Method pada class sebenarnya ditempatkan di `Constructor.prototype`.
Inheritance lewat `extends` juga tetap menggunakan prototype chain.

Perbedaan utamanya lebih ke ergonomi dan readability:
class memberi struktur lebih familiar untuk tim besar,
sedangkan prototype langsung lebih fleksibel tapi lebih rawan inconsistency.
Di production healthcare, saya pilih pattern yang paling mudah diaudit dan konsisten,
biasanya class + composition, sambil tetap paham mekanisme prototype di runtime." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kalau class cuma sugar, kenapa tetap dipakai?"
2. "Apakah class menghilangkan masalah `this`?"
3. "Kapan langsung pakai prototype API?"
4. "Apa risiko inheritance chain panjang?"
5. "Class vs factory, mana lebih mudah ditest?"

### Jawaban Singkat untuk Follow-up

1) Kenapa class:
"Meningkatkan keterbacaan, onboarding, dan konsistensi style tim."

2) `this`:
"Tidak otomatis hilang; binding `this` tetap harus diperhatikan."

3) Langsung prototype:
"Biasanya jarang, lebih banyak di low-level optimization atau library khusus."

4) Chain panjang:
"Meningkatkan kompleksitas lookup dan memperbesar risiko perilaku tak terduga."

5) Testability:
"Keduanya bisa testable; yang penting dependency injection dan interface jelas."

## Jawaban Ideal (Versi Singkat, Level Senior)

Fakta teknis:
- class tidak membuat model inheritance baru
- tetap pakai prototype chain
- `new` tetap membuat instance yang link ke `prototype`

Trade-off:
- class: jelas, standard, mudah di-review
- prototype manual: fleksibel, tapi lebih verbose dan mudah salah

## Penjelasan Detail yang Dicari Interviewer

### 1) Translasi mental model

Ketika menulis:
`class A { m() {} }`
engine secara konsep menaruh `m` di `A.prototype`.

### 2) Inheritance `extends`

`class B extends A` membuat:
- prototype instance B menunjuk ke B.prototype
- B.prototype mewarisi dari A.prototype

### 3) Anti-pattern umum

- over-inheritance untuk reuse kecil
- class jadi god object
- bisnis logic bercampur I/O side effects tanpa boundary

Mitigasi:
- pilih composition over inheritance saat tepat
- pisahkan domain logic dari adapter/integration
- desain interface yang kecil dan stabil

### 4) Dampak pada maintainability

Class membantu konsistensi naming, lifecycle, dan dependency shape.
Namun tanpa disiplin arsitektur, class tetap bisa jadi kompleks.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
class BaseService {
  log() {
    return "base-log";
  }
}

class ReturnService extends BaseService {
  process() {
    return `process:${this.log()}`;
  }
}

const s = new ReturnService();
console.log(Object.getPrototypeOf(s) === ReturnService.prototype); // true
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di integrasi healthcare:
- service layer biasanya memegang retry, mapping, observability
- tim butuh struktur code mudah diaudit
- incident response butuh tracing yang cepat

Class yang disiplin memberi struktur kuat untuk service contract,
selama tidak berlebihan dalam inheritance.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
beberapa service mewarisi base class yang menyimpan mutable shared state.
Satu service mengubah state itu, service lain terdampak.
Hasilnya perilaku sinkronisasi transaksi menjadi tidak konsisten.

Solusi:
- hindari shared mutable state di prototype/base class
- gunakan immutable config per instance
- lakukan composition untuk behavior lintas service

## Contoh Pola Kode yang Lebih Aman

```ts
type WmsGateway = {
  send(payload: unknown): Promise<void>;
};

class ReturnSyncService {
  constructor(private readonly gateway: WmsGateway) {}

  async sync(payload: unknown) {
    await this.gateway.send(payload);
  }
}
```

Pola ini menekankan composition dan dependency injection.

## Checklist Kualitas Jawaban (Self-Review)

- Menyebut class sebagai sugar di atas prototype.
- Menjelaskan bagaimana method class disimpan.
- Menjelaskan trade-off class vs prototype manual.
- Menyebut risiko inheritance berlebihan.
- Mengaitkan dengan konteks service healthcare production.

## Ringkasan Final

Class syntax mempermudah struktur, tapi mesin dasarnya tetap prototype chain.
Engineer senior harus paham keduanya: ergonomi class untuk tim,
dan mekanisme prototype untuk debugging runtime.
Di domain healthcare, pilih pola yang paling prediktif, terukur, dan mudah diaudit.
