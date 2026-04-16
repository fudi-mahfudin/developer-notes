# Kontrak antar tim

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: API contract sebagai janji lintas boundary

Kontrak antar tim (OpenAPI/Schema/events) menentukan format request/response, versi, dan deprecation policy.

### Mengapa dipedulikan di interview & produksi?

- Mengurangi miskomunikasi antar tim backend/frontend.  
- Memudahkan testing kompatibilitas.  
- Memungkinkan evolusi API tanpa breaking mendadak.

---

# Contoh soal coding: `validateRequiredFields`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** schema-lite validation  
- **Inti masalah:** Pastikan payload punya field wajib sesuai kontrak.

---

- Soal: `validateRequiredFields(payload, requiredFields)` -> `{ ok, missing }`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iterasi field wajib dan kumpulkan yang nullish/hilang.

## 3) Versi Ultra Singkat (10-20 detik)

> Kontrak minimal = semua required field hadir.

## 4) Pseudocode Ringkas (5-10 baris)

```text
missing = []
untuk f di required:
  jika payload[f] nullish: missing.push(f)
return { ok: missing kosong, missing }
```

## 5) Implementasi Final (Inti Saja)

```js
export function validateRequiredFields(payload, requiredFields) {
  const missing = [];
  for (const f of requiredFields) {
    if (payload?.[f] == null) missing.push(f);
  }
  return { ok: missing.length === 0, missing };
}
```

## 6) Bukti Correctness (Wajib)

- Semua field wajib dicek tepat sekali.  
- `ok` true hanya jika tidak ada yang missing.

## 7) Dry Run Singkat

- Payload `{id:1}` + required `['id','email']` -> missing `['email']`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengubah kontrak tanpa versi/deprecation window.  
- Validasi hanya di client.

## 9) Follow-up yang Sering Muncul

- JSON Schema/OpenAPI validator.  
- Backward-compatible evolution.

## 10) Trade-off Keputusan

- Validasi ringan cepat, schema penuh lebih ketat dan lebih verbose.

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

- Tambah validasi tipe sederhana (`string`, `number`) di samping required.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
