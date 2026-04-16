# Dependency injection sederhana

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: pisahkan kebijakan dari implementasi

Dependency injection (DI) berarti dependency tidak dibuat keras di dalam fungsi/class, tapi disuntik dari luar.

### Mengapa dipedulikan di interview & produksi?

- Meningkatkan testability (mudah mock).  
- Mengurangi coupling.  
- Memudahkan ganti implementasi infra.

---

# Contoh soal coding: `createUserService`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** DI, factory function  
- **Inti masalah:** Service menerima `repo` dari luar, bukan import langsung.

---

- Soal: `createUserService({ repo })` dengan method `findById`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Buat factory yang mengembalikan object service; semua akses data lewat `repo` injeksi.

## 3) Versi Ultra Singkat (10-20 detik)

> Inject dependency via parameter, bukan hardcode.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createUserService({repo}):
  findById(id):
    return repo.getById(id)
```

## 5) Implementasi Final (Inti Saja)

```js
export function createUserService({ repo }) {
  return {
    async findById(id) {
      return repo.getById(id);
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- Service tidak tahu detail storage.  
- Repo mock bisa menggantikan repo asli untuk test.

## 7) Dry Run Singkat

- Inject repo fake lalu verifikasi `findById` memanggil fake.

## 8) Red Flags (Yang Harus Dihindari)

- Membuat `new Repo()` di dalam service.  
- DI berlebihan untuk kasus sangat sederhana.

## 9) Follow-up yang Sering Muncul

- DI container vs manual DI.  
- Lifetime singleton/transient.

## 10) Trade-off Keputusan

- Manual DI ringan, container berguna untuk skala besar.

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

- Tambahkan dependency `logger` dan pastikan bisa dimock saat test.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
