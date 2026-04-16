# Private fields `#`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: enkapsulasi nyata di class

**Private instance fields** `#field` di **class** benar-benar **tidak terlihat** dari luar (bukan konvensi underscore). Akses hanya dari dalam body class. **Private method** juga ada (`#method()`).

### Contoh

```js
class Box {
  #value;
  constructor(v) {
    this.#value = v;
  }
  get() {
    return this.#value;
  }
}
```

### Kesalahan umum

- `#` **tidak** bisa dinamai dinamis — bukan `this['#x']` untuk field berbeda.  
- Private field **bukan** di prototype — semantik warisan berbeda dari method publik.

---

# Contoh soal coding: `SecretBox` (private state)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `#` dan API class. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy–Medium  
- **Topik utama:** class syntax, private fields  
- **Inti masalah:** Simpan state internal yang tidak bisa diakses sebagai `box._value` dari luar.

---

- Soal: Definisikan class `SecretBox` dengan constructor `(initial)`, method `get()`, `set(v)`.  
- Input/Output: perilaku method seperti getter/setter biasa.  
- Constraints utama: state hanya lewat `#value`; tidak menambah properti publik rahasia.  
- Pattern utama: `#value` + method instance.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Private field menyimpan nilai; method membatasi akses. Tidak ada algoritma berat — fokus **enkapsulasi**. Pastikan `constructor` memanggil inisialisasi `#value`.

Struktur cepat:

- Observasi: akses luar `instance['#value']` tidak sama dengan field private.  
- Strategi: satu `#value` + `get`/`set`.  
- Edge: subclass tidak mewarisi `#value` dari superclass kecuali aturan khusus — di luar scope minimal.

## 3) Versi Ultra Singkat (10-20 detik)

> `class` dengan `#value` dan `get`/`set`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
class SecretBox:
  #value
  constructor(initial): set #value
  get(): return #value
  set(v): #value = v
```

## 5) Implementasi Final (Inti Saja)

```js
export class SecretBox {
  #value;

  constructor(initial) {
    this.#value = initial;
  }

  get() {
    return this.#value;
  }

  set(v) {
    this.#value = v;
  }
}
```

## 6) Bukti Correctness (Wajib)

- State hanya berubah lewat `set`.  
- Tidak ada properti enumerable `#value` di objek hasil `Object.keys`.

## 7) Dry Run Singkat

- `const b = new SecretBox(1); b.set(2); b.get()` → `2`.

## 8) Red Flags (Yang Harus Dihindari)

- `_value` publik — bukan private sesungguhnya.  
- Menyimpan secret di `WeakMap` manual — pola valid tapi bukan latihan `#`.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: private static `#count` untuk jumlah instance.  
- Follow-up 2: private method `#validate` sebelum `set`.  
- Follow-up 3: kompatibilitas transpiler lama untuk private fields.

## 10) Trade-off Keputusan

- Opsi A (`#`): enkapsulasi keras, tooling modern.  
- Opsi B (closure factory): bekerja di ES lama, tidak `class`.  
- Risiko: refleksi/debug lebih sulit — sengaja.

## 11) Checklist Siap Submit

- [ ] Solusi lolos contoh soal.  
- [ ] Kompleksitas disebutkan jelas.  
- [ ] Edge case minimum sudah dicek.  
- [ ] Nama variabel jelas dan tidak ambigu.  
- [ ] Tidak ada mutasi input yang tidak perlu.  
- [ ] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 1-10  
- Efisiensi: 1-10  
- Kejelasan penjelasan: 1-10  
- Kerapihan implementasi: 1-10  
- Catatan perbaikan:

---

## Template Drill Cepat (Isi < 2 Menit) — `#validate`

- Tingkat kesulitan: Medium  
- Topik utama: private method  
- Inti masalah: `set` hanya menerima number finite; jika tidak, lempar atau abaikan — pilih kontrak.  
- Strategi: `#validate(v)` dipanggil di `set`.  
- 1 potensi bug: reentrancy / `set` dipanggil dari `get`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
