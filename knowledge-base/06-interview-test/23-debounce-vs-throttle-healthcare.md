# Q23 - Debounce vs Throttle dan Kapan Dipakai

## Pertanyaan Interview

Jelaskan debounce vs throttle dan kapan masing-masing dipakai.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Debounce menunda eksekusi sampai event berhenti selama durasi tertentu.
Throttle membatasi frekuensi eksekusi agar maksimal sekali per interval.
Jadi debounce cocok untuk aksi 'setelah user selesai', seperti search input.
Throttle cocok untuk event yang terus-menerus, seperti scroll/resize.

Di production, salah pilih bisa berdampak ke UX dan beban API.
Di aplikasi healthcare dengan dashboard real-time, throttle membantu menjaga performa,
sementara debounce membantu mengurangi request tidak perlu saat user mengetik filter." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan debounce justru buruk?"
2. "Kapan throttle tidak cukup?"
3. "Perlu leading/trailing option?"
4. "Bagaimana cancel pending debounce?"
5. "Apa dampaknya ke observability?"

### Jawaban Singkat untuk Follow-up

1) Debounce buruk:
"Saat feedback harus cepat dan kontinu, debounce terasa laggy."

2) Throttle tidak cukup:
"Jika event mahal dan harus berhenti total setelah input selesai."

3) Leading/trailing:
"Ya, dipilih sesuai UX: respon awal cepat atau hasil akhir akurat."

4) Cancel pending:
"Expose method cancel/flush pada util debounce."

5) Observability:
"Catat rate event sebelum-sesudah untuk ukur dampak optimisasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Debounce:
- eksekusi setelah idle
- menekan noise
- cocok untuk input berbasis teks

Throttle:
- eksekusi berkala
- menjaga ritme update
- cocok untuk scroll/drag/realtime listener

## Penjelasan Detail yang Dicari Interviewer

### 1) Trade-off UX dan performa

Debounce menekan call API, tapi bisa menunda feedback.
Throttle memberi update periodik, tapi mungkin melewatkan detail event.

### 2) Anti-pattern umum

- debounce semua event tanpa lihat konteks
- throttle terlalu besar hingga UI terasa patah
- lupa cleanup timer saat component unmount

Mitigasi:
- ukur event frequency
- sesuaikan interval dengan kebutuhan bisnis
- pasang cleanup deterministik

### 3) Implementasi aman

- gunakan util teruji
- support cancel/flush
- hindari closure yang menahan object besar

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const onSearchInput = debounce((q) => fetchResults(q), 300);
const onScroll = throttle(() => updateStickyHeader(), 100);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada aplikasi operasional rumah sakit:
- user sering filter data transaksi cepat
- dashboard bisa punya banyak komponen update
- performa buruk mengganggu workflow klinis

Pemilihan debounce/throttle yang tepat menjaga responsivitas tanpa membebani backend.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
fitur pencarian resep menembak API tiap keypress tanpa debounce.
Saat jam sibuk, server tertekan dan hasil pencarian jadi lambat.

Perbaikan:
- debounce input 250-350ms
- throttle event scroll tabel besar
- gabungkan dengan cache query terbaru

## Contoh Pola Kode yang Lebih Aman

```ts
const debouncedSearch = debounce((query: string) => {
  void fetchPrescription(query);
}, 300);

function onUnmount() {
  debouncedSearch.cancel?.();
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan definisi debounce/throttle secara tepat.
- Menjelaskan kapan memilih masing-masing.
- Menyebut trade-off UX vs load API.
- Menyebut cleanup timer/cancel pending work.
- Mengaitkan ke performa dashboard healthcare.

## Ringkasan Final

Debounce dan throttle adalah kontrol frekuensi event, bukan fitur kosmetik.
Pemilihan yang tepat menurunkan beban sistem dan menjaga UX tetap stabil.
Di domain healthcare, optimisasi ini berkontribusi langsung ke kelancaran operasi harian.
