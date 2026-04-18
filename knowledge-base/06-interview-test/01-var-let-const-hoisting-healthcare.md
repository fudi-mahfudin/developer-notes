# Q1 - Perbedaan `var`, `let`, dan `const` + Implikasi Hoisting (Healthcare Context)

## Pertanyaan Interview

Jelaskan perbedaan `var`, `let`, dan `const` beserta implikasi hoisting-nya.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Perbedaannya ada di scope, hoisting, dan mutability binding.
`var` function-scoped, di-hoist sekaligus initialized `undefined`, dan boleh re-declare.
Ini rawan bug karena variabel bisa dipakai sebelum terlihat dideklarasikan dan bisa bocor dari block.

`let` dan `const` block-scoped.
Keduanya tetap hoisted, tapi sebelum declaration berada di TDZ, jadi akses lebih awal akan error.
`let` bisa di-reassign, `const` tidak bisa.

Di production saya default `const`, lalu `let` kalau nilainya memang berubah.
Saya hindari `var` untuk menekan scope-related bug, terutama di workflow healthcare yang sensitif,
misalnya proses inventory return dan integrasi lintas sistem yang butuh state handling presisi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kalau `const` object bisa diubah propertinya, gimana cara enforce immutability?"
2. "Apa contoh bug nyata dari hoisting/TDZ yang pernah kamu lihat?"
3. "Di TypeScript project kamu, aturan lint apa yang kamu pasang soal declaration?"
4. "Kapan `let` lebih tepat daripada `const`?"
5. "Bagaimana migrasi aman dari legacy `var` code?"

### Jawaban Singkat untuk Follow-up

1) Enforce immutability pada object `const`:
"Saya treat `const` sebagai immutable binding, lalu untuk object state saya enforce dengan
lint rule, `readonly` di TypeScript, dan utility seperti `Object.freeze` untuk data yang memang
harus benar-benar tidak berubah."

2) Contoh bug hoisting/TDZ nyata:
"Kasus umum: variabel config dipakai sebelum diinisialisasi di jalur async tertentu.
Dengan `var`, nilainya jadi `undefined` dan bug-nya silent; dengan `let/const`, error muncul
lebih cepat sehingga lebih mudah ditrace saat testing."

3) Aturan lint declaration di project TypeScript:
"Saya biasanya aktifkan prefer-const, no-var, dan block scoping rules.
Tujuannya konsistensi code style, mencegah re-declare tidak sengaja, dan memperkecil
scope-related bug di modul production."

4) Kapan `let` lebih tepat:
"Saat variabel memang harus berubah selama lifecycle logic, misalnya pointer iterasi,
accumulator, atau state sementara dalam loop. Di luar itu, default saya tetap `const`."

5) Migrasi aman dari `var` legacy code:
"Saya migrasi bertahap per modul kecil, lindungi dulu dengan test, ubah `var` ke `let/const`,
lalu verifikasi behavior lewat CI dan log production. Hindari big-bang refactor supaya risiko
regresi tetap terkontrol."

## Jawaban Ideal (Versi Singkat, Level Senior)

`var`, `let`, dan `const` sama-sama declaration keyword, tetapi perilakunya beda pada:
scope, hoisting, re-declaration, dan mutability reference.

- `var`
  - function-scoped (atau global kalau di luar function)
  - di-hoist dan di-initialize ke `undefined`
  - boleh re-declare dan re-assign
  - rawan bug karena bisa dipakai sebelum terlihat dideklarasikan
- `let`
  - block-scoped
  - di-hoist tapi tidak di-initialize (kena TDZ sebelum declaration line)
  - tidak boleh re-declare dalam scope yang sama
  - boleh re-assign
- `const`
  - block-scoped
  - sama seperti `let` untuk hoisting + TDZ
  - tidak boleh re-declare, tidak boleh re-assign
  - untuk object/array, yang immutable adalah binding-nya, bukan isi internal object

Kesimpulan praktik produksi:
default gunakan `const`, pakai `let` kalau memang butuh re-assignment, dan hindari `var`
kecuali sedang maintain legacy code.

## Penjelasan Detail yang Dicari Interviewer

### 1) Scope behavior

`var` mengikat variabel ke function scope, bukan block scope.
Ini sering menimbulkan nilai variabel "bocor" keluar dari block `if` atau `for`.

`let` dan `const` adalah block scoped.
Nilai hanya hidup di dalam block tempat dia dideklarasikan.
Untuk codebase besar, ini menurunkan risiko side effect antar bagian logic.

### 2) Hoisting behavior

Semua declaration secara teknis di-hoist.
Perbedaan kunci ada di fase initialization:

- `var`: saat execution context dibuat, variabel di-initialize ke `undefined`.
- `let`/`const`: binding dibuat, tetapi belum initialized sampai baris deklarasi dieksekusi.
  Akses sebelum initialized akan throw `ReferenceError` (TDZ).

Jadi kalimat yang tepat saat interview:
"`let` dan `const` tetap hoisted, tapi inaccessible sebelum initialization."

### 3) Re-declare dan re-assign

- `var`: re-declare allowed -> bisa menimpa variabel lama tanpa error.
- `let`: re-declare di scope yang sama tidak boleh.
- `const`: re-declare dan re-assign sama-sama tidak boleh.

Untuk tim besar, larangan re-declare ini sangat membantu mengurangi hidden bug.

### 4) `const` bukan deep immutable

Ini jebakan yang sering keluar saat interview senior.

Contoh:
- `const patient = { name: "A" }` tidak boleh di-reassign ke object baru.
- Tapi `patient.name = "B"` tetap boleh.

Jika butuh immutability data object:
gunakan `Object.freeze`, deep freeze utility, atau pendekatan immutable data pattern.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function demoVar() {
  if (true) {
    var status = "ready";
  }
  return status; // "ready" -> bocor keluar block
}

function demoLet() {
  if (true) {
    let status = "ready";
  }
  // return status; // ReferenceError: status is not defined
}

function demoHoistingVar() {
  console.log(a); // undefined
  var a = 10;
}

function demoHoistingLet() {
  // console.log(b); // ReferenceError (TDZ)
  let b = 10;
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di domain healthcare, bug kecil bisa berdampak ke proses operasional klinis.
Karena itu, pemilihan keyword variable declaration bukan gaya coding doang,
tapi bagian dari risk control.

Konteks yang relevan dengan pengalamanmu:

- Kamu menangani hospital workloads di Node.js/TypeScript.
- Kamu terlibat integrasi lintas database (PostgreSQL + SQL Server).
- Kamu mengerjakan logic inventory return berbasis FIFO.
- Kamu optimize Next.js view dan concern pada stabilitas production.

Dalam kondisi itu:
- `var` berpotensi membuat nilai shared tidak sengaja kepakai ulang.
- `let`/`const` membuat boundaries logic lebih ketat dan lebih mudah di-review.
- TDZ error dari `let`/`const` membantu fail fast saat ada urutan inisialisasi yang salah.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
proses rekonsiliasi retur farmasi mengiterasi daftar transaksi lalu hit API internal.
Jika pakai `var` di loop async, reference index bisa salah karena satu binding dipakai bersama.
Akibatnya log bisa menunjuk transaksi yang salah, dan investigasi incident jadi lebih lama.

Pendekatan aman:
- pakai `const` untuk data yang tidak berubah per iterasi
- pakai `let` hanya untuk state yang benar-benar berubah
- hindari `var` agar tidak ada scope leakage

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnItem = { encounterId: string; sku: string; qty: number };

async function reconcileReturns(items: ReturnItem[]) {
  for (const item of items) {
    const payload = {
      encounterId: item.encounterId,
      sku: item.sku,
      qty: item.qty,
      source: "pharmacy-return",
    };

    // const untuk payload mencegah re-assignment tidak sengaja
    await sendToWarehouseService(payload);
  }
}
```

Alasan senior-level:
- pembacaan code lebih predictable
- mengurangi accidental mutation/re-assignment
- lebih kompatibel dengan static analysis dan code review checklist

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan 4 dimensi: scope, hoisting, re-declare/re-assign, mutability.
- Menyebut TDZ dengan benar (hoisted but uninitialized).
- Tidak bilang "`let`/`const` tidak hoisted" (ini jawaban salah).
- Memberi konteks engineering, bukan definisi textbook saja.
- Mengaitkan ke reliability requirement di domain healthcare.

## Ringkasan Final

Untuk code modern:
- gunakan `const` sebagai default
- gunakan `let` saat nilai perlu berubah
- hindari `var` di code baru

Untuk interview senior:
tunjukkan bukan hanya paham teori, tetapi juga dampaknya ke reliability, debugging speed,
dan safety di sistem production berisiko tinggi seperti healthcare.
