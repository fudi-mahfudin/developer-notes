# Boundaries & ownership

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: batas tanggung jawab antar modul/tim

Boundary menentukan apa yang boleh diakses, ownership menentukan siapa yang bertanggung jawab terhadap perubahan.

### Mengapa dipedulikan di interview & produksi?

- Mengurangi coupling lintas domain.  
- Memperjelas siapa approve perubahan kritikal.  
- Menjaga API internal tetap stabil.

---

# Contoh soal coding: `isAllowedImport`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** architecture rules  
- **Inti masalah:** Cek apakah modul A boleh mengimpor modul B menurut aturan boundary.

---

- Soal: `isAllowedImport(from, to, rules)` -> boolean.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan aturan sebagai map `from -> allowedTargets`, lalu cek membership.

## 3) Versi Ultra Singkat (10-20 detik)

> Boundary rule = whitelist import dependency.

## 4) Pseudocode Ringkas (5-10 baris)

```text
allowed = rules[from] atau []
return allowed includes to
```

## 5) Implementasi Final (Inti Saja)

```js
export function isAllowedImport(from, to, rules) {
  const allowed = rules[from] ?? [];
  return allowed.includes(to);
}
```

## 6) Bukti Correctness (Wajib)

- Hanya dependensi yang terdaftar dianggap valid.  
- Modul tanpa rule default deny.

## 7) Dry Run Singkat

- Rules `{ui:['domain']}` -> `isAllowedImport('ui','infra',rules)` false.

## 8) Red Flags (Yang Harus Dihindari)

- Circular dependency antar layer.  
- Mengabaikan ownership file kritikal.

## 9) Follow-up yang Sering Muncul

- Enforce via lint rule.  
- CODEOWNERS integration.

## 10) Trade-off Keputusan

- Rule ketat menambah kontrol, tapi butuh maintenance.

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

## Template Drill Cepat (Isi < 2 Menit)

- Tambah wildcard sederhana `shared/*` di rules.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
