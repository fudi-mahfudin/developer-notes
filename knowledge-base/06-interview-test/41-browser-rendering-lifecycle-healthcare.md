# Q41 - Browser Rendering Lifecycle (Parse, Style, Layout, Paint, Composite)

## Pertanyaan Interview

Jelaskan lifecycle rendering browser: parse, style, layout, paint, composite.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Browser rendering secara ringkas berjalan dari parsing HTML/CSS, membentuk DOM dan CSSOM,
lalu menghasilkan render tree. Setelah itu browser hitung layout (ukuran/posisi),
melakukan paint (menggambar pixel), lalu compositing layer ke layar.

Masalah performa biasanya muncul saat perubahan UI memicu layout/paint berulang.
Untuk aplikasi kompleks, memahami tahap ini penting agar optimasi tepat sasaran.
Di dashboard healthcare yang padat tabel dan filter, optimasi rendering menjaga UI tetap responsif
saat data transaksi terus berubah." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa beda layout vs paint?"
2. "Apa itu render-blocking resource?"
3. "Kapan browser membuat layer baru?"
4. "Bagaimana mendiagnosis jank?"
5. "Optimasi paling berdampak biasanya di mana?"

### Jawaban Singkat untuk Follow-up

1) Layout vs paint:
"Layout hitung geometri, paint menggambar visual."

2) Render-blocking:
"Resource yang menunda first render, misalnya CSS kritikal belum siap."

3) Layer baru:
"Biasanya saat transform/opacity/position tertentu atau optimisasi compositor."

4) Diagnosa jank:
"Gunakan Performance panel, lihat long tasks dan frame drops."

5) Dampak terbesar:
"Kurangi layout thrash, kurangi DOM update tidak perlu, dan optimasi critical CSS."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pipeline utama:
1. Parse HTML/CSS -> DOM + CSSOM
2. Build render tree
3. Layout
4. Paint
5. Composite

Tujuan optimasi:
- kurangi kerja per frame
- hindari invalidation luas
- jaga frame budget (16ms untuk 60fps)

## Penjelasan Detail yang Dicari Interviewer

### 1) Parse dan konstruksi tree

Browser tidak bisa render sebelum resource penting tersedia.
Urutan dan ukuran asset memengaruhi kecepatan first render.

### 2) Layout cost

Layout mahal pada DOM besar dan perubahan geometri berulang.
Akses sinkron ke metric layout saat mutasi bisa memicu forced reflow.

### 3) Paint dan composite

Tidak semua perubahan perlu layout ulang.
Perubahan properti tertentu bisa cukup di tahap composite (lebih murah).

### 4) Anti-pattern umum

- baca dan tulis layout bergantian dalam loop
- update DOM item-per-item tanpa batching
- animasi properti layout-heavy (`top/left/width`) berlebihan

Mitigasi:
- batch read/write
- virtualize list besar
- animasi via transform/opacity bila memungkinkan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// less optimal: memicu layout berkali-kali
for (const el of items) {
  const h = el.offsetHeight;
  el.style.height = `${h + 1}px`;
}

// lebih aman: pisahkan read lalu write
const heights = items.map((el) => el.offsetHeight);
items.forEach((el, i) => {
  el.style.height = `${heights[i] + 1}px`;
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di aplikasi healthcare:
- user perlu respons cepat untuk alur operasional
- tabel besar dan filter cepat sering digunakan
- jank UI bisa memperlambat tindakan user

Pemahaman rendering lifecycle membantu kamu memutuskan optimasi yang benar, bukan trial-error.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
dashboard transaksi merender ulang seluruh tabel saat 1 filter berubah.
frame drop tinggi, interaksi terasa patah.

Perbaikan:
- memoize row component
- virtualisasi tabel
- update state granular per bagian

## Contoh Pola Kode yang Lebih Aman

```ts
function scheduleUiUpdate(cb: () => void) {
  requestAnimationFrame(() => {
    cb();
  });
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan tahap render pipeline dengan urutan benar.
- Menjelaskan beda layout/paint/composite.
- Menyebut forced reflow dan dampaknya.
- Menyebut strategi optimasi praktis.
- Mengaitkan ke performa dashboard healthcare.

## Ringkasan Final

Rendering browser adalah pipeline bertahap yang punya biaya berbeda tiap tahap.
Optimasi efektif harus tahu tahap mana yang paling mahal.
Untuk aplikasi healthcare yang data-heavy, kontrol layout/paint sangat menentukan
responsivitas UI dan kelancaran operasional.
