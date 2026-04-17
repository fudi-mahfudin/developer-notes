# Q43 - Event Propagation: Capturing, Target, Bubbling

## Pertanyaan Interview

Bagaimana cara kerja event propagation: capturing, target, bubbling?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Event propagation punya tiga fase: capturing (dari atas ke target),
target phase (di elemen target), lalu bubbling (naik kembali ke parent).
Default listener biasanya di fase bubbling, kecuali kita set capture true.

Memahami propagation penting untuk mencegah bug interaksi UI,
misalnya klik pada child memicu handler parent yang tidak diinginkan.
Di aplikasi healthcare dengan banyak aksi cepat pada tabel/form,
kontrol propagation yang benar menjaga perilaku UI tetap presisi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan pakai capturing?"
2. "Kapan pakai stopPropagation?"
3. "Apa beda stopPropagation vs preventDefault?"
4. "Bagaimana pengaruh event delegation?"
5. "Apa anti-pattern event handling umum?"

### Jawaban Singkat untuk Follow-up

1) Capturing:
"Saat parent perlu intercept event lebih awal."

2) stopPropagation:
"Saat ingin cegah event naik/turun ke handler lain."

3) preventDefault:
"Mencegah aksi default browser, bukan alur propagasi."

4) Delegation:
"Memanfaatkan bubbling untuk handle banyak child dari parent tunggal."

5) Anti-pattern:
"Menebar banyak listener individual tanpa alasan."

## Jawaban Ideal (Versi Singkat, Level Senior)

Propagation flow:
- capture: root -> target
- target
- bubble: target -> root

Prinsip:
- desain listener hierarchy jelas
- gunakan delegation saat skala elemen besar
- batasi `stopPropagation` hanya saat perlu

## Penjelasan Detail yang Dicari Interviewer

### 1) Nilai praktis propagation

Dengan memahami fase event, kita bisa menghindari side effect handler ganda
dan mengelola interaksi kompleks lebih mudah.

### 2) Anti-pattern umum

- `stopPropagation` digunakan berlebihan hingga debug sulit
- listener didaftarkan ke tiap row ribuan item
- tidak konsisten antara capture dan bubble strategy

Mitigasi:
- standar event policy di komponen
- event delegation untuk list dinamis
- dokumentasi event ownership

### 3) Performa dan maintainability

Event delegation mengurangi jumlah listener dan mempermudah maintainability
pada komponen data-heavy.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
parent.addEventListener("click", () => {
  console.log("parent bubble");
});

parent.addEventListener(
  "click",
  () => {
    console.log("parent capture");
  },
  true,
);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di UI operasional:
- banyak tombol aksi dalam tabel transaksi
- klik cepat sangat sering
- bug event double-trigger bisa menyebabkan aksi salah

Kontrol propagation mencegah aksi tidak disengaja.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
klik tombol "print label" di row juga memicu handler select row parent.
hasilnya state UI berubah tak terduga.

Perbaikan:
- atur propagation dengan jelas
- pisahkan area interaktif
- gunakan delegation dengan filter target yang eksplisit

## Contoh Pola Kode yang Lebih Aman

```ts
table.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.matches("[data-action='print']")) {
    event.stopPropagation();
    handlePrint(target);
  }
});
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan 3 fase propagation dengan urutan benar.
- Menjelaskan kapan use `stopPropagation`/`preventDefault`.
- Menyebut event delegation untuk skala besar.
- Menyebut anti-pattern listener berlebihan.
- Relevan untuk UI transaksi healthcare.

## Ringkasan Final

Event propagation adalah fondasi interaksi UI yang benar.
Tanpa kontrol propagation, aksi user bisa memicu efek samping tak terduga.
Di aplikasi healthcare, ketepatan event handling membantu menjaga akurasi workflow
dan mencegah kesalahan operasional dari interaksi UI.
