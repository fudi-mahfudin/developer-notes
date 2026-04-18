# #53 — Memory leak: closure menahan buffer PDF / string besar

**Indeks:** [`README.md`](./README.md) · **ID:** `#53` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

**Closure** JavaScript yang menangkap variabel berisi **Buffer** dokumen PDF atau string JSON besar akan mencegah garbage collection selama fungsi lifetime panjang—misalnya handler EventEmitter global atau timer periodik. RSS proses Node naik perlahan hingga **OOM kill** pod. Di healthcare, dokumen klinis besar sering diproses dalam pipeline yang salah menangkap referensi.

---

## Mitigasi ideal (~60 detik)

“Hindari menutup buffer besar di closure callback global—gunakan **scoped variables** dan nullify setelah selesai. Untuk stream file, gunakan pipeline dan **destroy** pada error. Monitor **heapUsed** dan **external** memory. Untuk caching dokumen, gunakan LRU dengan batas byte eksplisit alih-alih Map tak terbatas.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Closure capture:** penutupan lingkup leksikal yang menjaga referensi hidup.
- **External memory:** buffer native di luar heap V8 yang tetap harus dibebaskan.

---

## Mengapa pola ini sangat umum di healthcare

1. Ringkasan PDF pasien di-cache di closure middleware.
2. Logging yang menyimpan payload besar di konteks async.
3. Global queue yang tidak membersihkan entri setelah selesai.

---

## Pola gagal (ilustrasi)

```typescript
const cache = new Map();
setInterval(() => {
  cache.set(id, hugeBuffer); // tidak pernah dibuang
}, …);
```

---

## Gejala di production

- RSS naik linear selama beberapa hari—restart berkala “memperbaiki”.

---

## Diagnosis

1. Heap snapshot dengan Chrome inspector pada staging.
2. `process.memoryUsage()` trending.

---

## Mitigasi yang disarankan

1. WeakRef jika cocok (hati-hati kompleksitas).
2. LRU cache dengan eviction.
3. Hindari menyimpan buffer di global—streaming ke disk/S3.

---

## Trade-off dan risiko

- LRU bisa mengeluarkan item yang masih dibutuhkan—manajemen kunci yang benar.

---

## Aspek khusus healthcare

- PDF mengandung PHI—memory leak juga meningkatkan risiko exposure residu pada dump memori—minimalkan retensi buffer.

---

## Checklist review PR

- [ ] Tidak ada struktur global yang menyimpan buffer besar tanpa batas.

---

## Kata kunci untuk pencarian

`memory leak`, `closure`, `Buffer`, `LRU`, `heap snapshot`

---

## Catatan tambahan operasional

Jadwalkan **rolling restart** hanya sebagai mitigasi sementara—akar leak harus diperbaiki dan diverifikasi dengan soak test.

Audit **heap snapshot** secara berkala pada workload yang memproses dokumen besar untuk mendeteksi pola closure sebelum leak mencapai OOM.

---

## Referensi internal

- [`README.md`](./README.md) · **#54**, **#55**.
