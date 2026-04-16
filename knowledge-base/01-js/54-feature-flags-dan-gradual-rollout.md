# Feature flags & gradual rollout

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: rilis bertahap dengan kontrol risiko

Feature flag memungkinkan fitur aktif/nonaktif tanpa redeploy penuh, lalu rollout bertahap (mis. 1% -> 10% -> 100%).

### Mengapa dipedulikan di interview & produksi?

- Mengurangi risiko deploy besar.  
- Memudahkan rollback cepat.  
- Mendukung eksperimen/A-B testing.

---

# Contoh soal coding: `isEnabledForUser`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** deterministic rollout  
- **Inti masalah:** Aktifkan flag untuk persentase user tertentu secara konsisten.

---

- Soal: `isEnabledForUser(userId, percentage)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Hash sederhana `userId` ke rentang 0-99, lalu bandingkan dengan `percentage`.

## 3) Versi Ultra Singkat (10-20 detik)

> Rollout stabil per user = hash mod 100.

## 4) Pseudocode Ringkas (5-10 baris)

```text
h = hash(userId) % 100
return h < percentage
```

## 5) Implementasi Final (Inti Saja)

```js
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function isEnabledForUser(userId, percentage) {
  const bucket = simpleHash(String(userId)) % 100;
  return bucket < percentage;
}
```

## 6) Bukti Correctness (Wajib)

- User sama selalu masuk bucket sama.  
- Persentase kira-kira sesuai distribusi hash.

## 7) Dry Run Singkat

- `percentage=0` selalu false, `percentage=100` selalu true.

## 8) Red Flags (Yang Harus Dihindari)

- Random per request (tidak stabil).  
- Tidak ada sunset plan untuk flag lama.

## 9) Follow-up yang Sering Muncul

- Segment-based rollout.  
- Kill switch global.

## 10) Trade-off Keputusan

- Flag memberi fleksibilitas, tapi menambah kompleksitas branching.

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

- Tambah allowlist user yang selalu enabled.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
