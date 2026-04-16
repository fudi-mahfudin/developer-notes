# XSS & injeksi HTML

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: jangan percaya input sebagai HTML

XSS terjadi saat data tak tepercaya dieksekusi sebagai script di browser. Sumber umum: `innerHTML` dari input user.

### Mengapa dipedulikan di interview & produksi?

- Dampak keamanan tinggi: session hijack, defacement, data theft.  
- Bug sering terjadi dari fitur kecil komentar/search highlight.  
- Menuntut disiplin context-aware escaping/sanitasi.

### Kesalahan umum

- Menyamakan "escape string" dengan sanitasi penuh semua konteks.  
- Memakai `innerHTML` saat cukup `textContent`.

---

# Contoh soal coding: `escapeHtmlText`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** secure output encoding  
- **Inti masalah:** Escape karakter utama agar aman ditampilkan sebagai teks HTML.

---

- Soal: `escapeHtmlText(s)` escape `& < > " '`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Ganti karakter khusus ke entitas HTML, dengan `&` diproses dulu. Ini untuk konteks teks, bukan sanitasi atribut/URL/script lengkap.

## 3) Versi Ultra Singkat (10-20 detik)

> Encoding output sesuai konteks; untuk teks HTML, escape lima karakter dasar.

## 4) Pseudocode Ringkas (5-10 baris)

```text
escapeHtmlText(s):
  replace & -> &amp;
  replace < -> &lt;
  replace > -> &gt;
  replace " -> &quot;
  replace ' -> &#39;
```

## 5) Implementasi Final (Inti Saja)

```js
export function escapeHtmlText(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
```

## 6) Bukti Correctness (Wajib)

- Karakter pemicu tag/script diubah ke entitas teks.  
- Urutan `&` dulu mencegah double encode entitas baru.

## 7) Dry Run Singkat

- `escapeHtmlText('<img onerror=1>')` -> string aman sebagai teks.

## 8) Red Flags (Yang Harus Dihindari)

- Menganggap fungsi ini aman untuk semua konteks (atribut URL, JS inline).  
- Menonaktifkan CSP tanpa alasan.

## 9) Follow-up yang Sering Muncul

- Sanitizer library (`DOMPurify`).  
- CSP sebagai lapis tambahan.

## 10) Trade-off Keputusan

- Escaping cepat untuk teks sederhana, sanitasi penuh butuh library tepercaya.

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

- Bandingkan `textContent` vs `innerHTML` untuk menampilkan input user.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
