# Q11 - Prototype Chain dan Property Lookup

## Pertanyaan Interview

Jelaskan prototype chain dan bagaimana property lookup terjadi.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Di JavaScript, object punya internal link ke prototype (`[[Prototype]]`).
Saat kita akses properti, engine cari dulu di object itu sendiri.
Kalau tidak ada, engine naik ke prototype, lalu ke prototype berikutnya,
sampai ketemu atau mentok di `null`.
Itu yang disebut prototype chain.

Untuk level senior, poin pentingnya bukan definisi, tapi efek ke maintainability
dan performa lookup. Chain yang terlalu dalam, override properti yang tidak jelas,
atau mutasi prototype global bisa bikin bug sulit dilacak.
Di sistem healthcare, ini berisiko karena behavior object bisa berubah diam-diam
dan mempengaruhi flow integrasi production." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa bedanya own property vs inherited property?"
2. "Apa risiko ubah `Object.prototype`?"
3. "Bagaimana cek properti milik object sendiri?"
4. "Apakah prototype chain berpengaruh ke performa?"
5. "Kapan class syntax lebih aman dipakai?"

### Jawaban Singkat untuk Follow-up

1) Own vs inherited:
"Own property langsung ada di object, inherited datang dari prototype chain."

2) Ubah Object.prototype:
"Sangat berisiko karena efeknya global ke semua object biasa."

3) Cek own property:
"Pakai `Object.hasOwn(obj, key)` atau `hasOwnProperty.call`."

4) Performa:
"Ada biaya lookup tambahan saat chain panjang, walau engine punya optimasi."

5) Kapan class:
"Saat ingin kontrak instansiasi lebih jelas dan konsisten di tim besar."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prototype chain adalah mekanisme inheritance utama JavaScript.
Property lookup berjalan bertingkat:
- object sendiri
- prototype level 1
- prototype level berikutnya
- berhenti di `null`

Implikasi senior:
- pahami shadowing property
- hindari mutasi prototype global
- desain object model yang mudah diprediksi

## Penjelasan Detail yang Dicari Interviewer

### 1) Lookup algorithm secara praktis

Saat akses `obj.x`:
- cek `x` di `obj` (own property)
- jika tidak ada, cek di `Object.getPrototypeOf(obj)`
- ulangi sampai ketemu atau `null`

### 2) Shadowing behavior

Jika prototype punya `status`, lalu instance juga punya `status`,
maka milik instance yang dipakai (shadowing).
Ini bisa bagus, tapi juga bisa membingungkan saat debug.

### 3) Anti-pattern umum

- monkey patch `Object.prototype`
- chain inheritance terlalu dalam
- campur data mutable shared di prototype

Mitigasi:
- hindari patch global
- batasi kedalaman inheritance
- pilih composition saat lebih sederhana

### 4) Hubungan dengan class syntax

`class` di JS hanyalah syntactic sugar di atas prototype.
Memahami prototype chain tetap wajib agar ngerti behavior runtime sebenarnya.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const base = { source: "kiosk", retry: 2 };
const child = Object.create(base);
child.txId = "RX-2026-0001";

console.log(child.txId);   // own property
console.log(child.source); // inherited from prototype

child.source = "mobile";
console.log(child.source); // shadowing own value
console.log(base.source);  // tetap "kiosk"
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sistem healthcare:
- object sering dipakai untuk payload transaksi
- metadata retry/audit sering dibawa lintas layer
- debugging incident harus cepat dan deterministik

Salah paham prototype chain bisa membuat engineer salah identifikasi
apakah nilai berasal dari instance aktual atau dari inheritance.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim membuat `basePayload` dengan properti default di prototype.
di beberapa jalur, properti tidak dioverride di instance.
hasilnya payload ke WMS membawa nilai default yang tidak sesuai unit layanan.

Dampak:
- status sinkronisasi tidak akurat
- investigasi sulit karena data terlihat "ada", tapi asal nilainya keliru

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnPayload = {
  encounterId: string;
  warehouseCode: string;
  qty: number;
};

function createReturnPayload(input: ReturnPayload): ReturnPayload {
  return {
    encounterId: input.encounterId,
    warehouseCode: input.warehouseCode,
    qty: input.qty,
  };
}
```

Alasan:
- object plain dengan own property jelas
- tidak bergantung inheritance implicit untuk data domain kritikal

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan mekanisme lookup bertingkat dengan benar.
- Menjelaskan own property vs inherited property.
- Menyebut risiko shadowing dan patching prototype global.
- Menunjukkan hubungan `class` dengan prototype.
- Mengaitkan ke reliability integrasi healthcare.

## Ringkasan Final

Prototype chain adalah fondasi inheritance JavaScript.
Property lookup selalu berjalan dari object ke atas rantai prototype.
Untuk production healthcare, gunakan model object yang eksplisit,
hindari mutasi prototype global, dan pastikan source nilai mudah diaudit.
