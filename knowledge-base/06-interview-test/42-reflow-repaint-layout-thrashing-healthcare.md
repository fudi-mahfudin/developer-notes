# Q42 - Reflow/Repaint dan Mengurangi Layout Thrashing

## Pertanyaan Interview

Apa itu reflow/repaint, dan bagaimana mengurangi layout thrashing?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Reflow adalah proses hitung ulang layout elemen (ukuran/posisi).
Repaint adalah menggambar ulang visual saat style berubah tapi layout belum tentu berubah.
Layout thrashing terjadi ketika kode bolak-balik membaca metric layout dan menulis style
secara cepat, sehingga browser dipaksa reflow berulang.

Praktik aman: batch read lalu batch write, minimalkan update DOM yang tersebar,
dan optimasi list besar dengan virtualisasi. Pada dashboard healthcare yang data-heavy,
ini sangat berpengaruh ke kelancaran interaksi user." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa contoh read yang memicu forced layout?"
2. "Apakah repaint selalu ringan?"
3. "Bagaimana mendeteksi layout thrashing?"
4. "Kapan pakai transform/opacity?"
5. "Apa anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Forced layout read:
"`offsetHeight`, `getBoundingClientRect`, dan properti metric serupa."

2) Repaint ringan?
"Tidak selalu; area besar/frekuensi tinggi tetap mahal."

3) Deteksi:
"Profiling frame timeline, lihat banyak layout event beruntun."

4) Transform/opacity:
"Dipilih untuk animasi karena cenderung di-composite, lebih murah."

5) Anti-pattern:
"Read-write DOM dalam loop item besar."

## Jawaban Ideal (Versi Singkat, Level Senior)

Konsep:
- reflow: geometri ulang (mahal)
- repaint: visual ulang
- thrashing: read/write layout tidak teratur

Tujuan optimasi:
- kurangi invalidation
- stabilkan frame time
- jaga respons input

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa thrashing berbahaya

Frame budget 16ms untuk 60fps mudah habis.
Akibatnya input delay dan UI patah.

### 2) Anti-pattern umum

- loop update style per item sambil baca layout
- render ulang tabel besar tiap perubahan kecil
- animasi properti layout-heavy terus-menerus

Mitigasi:
- read phase terpisah dari write phase
- gunakan `requestAnimationFrame`
- virtualize long lists

### 3) Strategi implementasi

- kumpulkan measurement sekali
- terapkan style updates sekaligus
- debounce/throttle event resize/scroll

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// buruk: read + write campur
for (const row of rows) {
  const h = row.offsetHeight;
  row.style.height = `${h + 2}px`;
}

// lebih baik: batch read -> batch write
const heights = rows.map((row) => row.offsetHeight);
rows.forEach((row, i) => {
  row.style.height = `${heights[i] + 2}px`;
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam aplikasi operasional rumah sakit:
- tabel transaksi besar dipakai terus
- user butuh interaksi cepat
- jank UI mengganggu produktivitas dan akurasi kerja

Mengurangi reflow/repaint berlebihan langsung meningkatkan UX.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
setiap update filter memicu render ulang penuh ribuan row.
scroll jadi patah dan klik lambat.

Perbaikan:
- memoization row
- virtualisasi list
- partial update berbasis key

## Contoh Pola Kode yang Lebih Aman

```ts
function scheduleUiWork(work: () => void) {
  requestAnimationFrame(() => {
    work();
  });
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan beda reflow vs repaint.
- Menjelaskan layout thrashing dengan contoh konkret.
- Menawarkan mitigasi read/write batching.
- Menyebut virtualisasi untuk list besar.
- Mengaitkan ke dashboard healthcare data-heavy.

## Ringkasan Final

Reflow/repaint adalah biaya render yang harus dikelola.
Layout thrashing sering jadi akar jank pada UI kompleks.
Dengan batching, virtualisasi, dan update terarah, aplikasi healthcare
bisa tetap responsif pada beban data tinggi.
