# Q33 - Big-O untuk Method Array Populer

## Pertanyaan Interview

Jelaskan big-O untuk `Array.prototype` method populer (`push`, `shift`, `splice`, `find`).

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk array JS, `push` umumnya O(1) amortized karena tambah di akhir.
`shift` O(n) karena semua elemen setelahnya harus digeser.
`splice` kompleksitasnya tergantung posisi dan jumlah elemen yang digeser,
sering O(n) pada kasus umum. `find` O(n) karena pencarian linear sampai ketemu.

Di production, yang penting bukan hafalan, tapi implikasi desain.
Kalau operasi `shift` atau `splice` berat dipanggil berulang pada data besar,
latency bisa naik signifikan. Di pipeline healthcare volume tinggi, pilihan struktur data
harus mempertimbangkan kompleksitas ini sejak awal." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa push disebut amortized O(1)?"
2. "Kapan shift masih oke dipakai?"
3. "Alternatif kalau sering pop dari depan?"
4. "find vs Map lookup?"
5. "Bagaimana membuktikan bottleneck ini nyata?"

### Jawaban Singkat untuk Follow-up

1) Amortized:
"Kadang resize internal membuat biaya mahal sesekali, rata-ratanya tetap O(1)."

2) Kapan shift oke:
"Data kecil atau frekuensi rendah."

3) Alternatif:
"Gunakan queue structure/deque atau indeks pointer."

4) find vs Map:
"find O(n), Map `get` rata-rata O(1)."

5) Bukti bottleneck:
"Profiling loop kritikal dan bandingkan skenario beban."

## Jawaban Ideal (Versi Singkat, Level Senior)

Kompleksitas umum:
- `push`: O(1) amortized
- `shift`: O(n)
- `splice`: O(n) pada banyak kasus
- `find`: O(n)

Implikasi:
- hindari operasi front-heavy pada array besar
- gunakan struktur data sesuai pola akses

## Penjelasan Detail yang Dicari Interviewer

### 1) Pola akses menentukan biaya

Array efektif untuk append dan akses index.
Kurang efektif untuk operasi frequent insert/remove di depan.

### 2) Anti-pattern umum

- queue diimplementasi pakai `shift` dalam loop besar
- nested `find` dalam nested loops
- splice berulang pada array raksasa

Mitigasi:
- gunakan pointer index untuk queue
- pre-index data ke Map
- batch operasi jika mungkin

### 3) Kaitan dengan maintainability

Kompleksitas buruk bisa tidak terlihat saat data kecil,
tapi meledak saat skala produksi naik.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// anti-pattern queue
while (arr.length) {
  const item = arr.shift(); // O(n) per shift
  process(item);
}

// lebih aman: pointer index
for (let i = 0; i < arr.length; i++) {
  process(arr[i]);
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada data transaksi healthcare:
- ukuran batch bisa besar
- SLA sinkronisasi ketat
- operasi berulang bisa jadi bottleneck utama

Pemahaman kompleksitas mencegah desain yang lambat sejak awal.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
pipeline sinkronisasi pakai `shift` untuk mengambil antrean internal.
Saat batch 50k transaksi, CPU naik dan processing time melonjak.

Perbaikan:
- ganti ke pointer/deque strategy
- pre-index lookup reference ke Map
- kurangi operasi linear berulang

## Contoh Pola Kode yang Lebih Aman

```ts
function processQueue<T>(items: T[], handler: (x: T) => void) {
  for (let i = 0; i < items.length; i++) {
    handler(items[i]);
  }
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menyebut kompleksitas 4 method dengan benar.
- Menjelaskan implikasi desain nyata.
- Menyebut anti-pattern umum di loop besar.
- Menyebut alternatif struktur data.
- Relevan untuk batch processing healthcare.

## Ringkasan Final

Big-O method array penting untuk keputusan desain, bukan sekadar teori interview.
Operasi linear yang berulang bisa menjadi bottleneck utama di produksi.
Dengan pemilihan struktur data tepat, performa sistem healthcare lebih stabil
saat volume transaksi meningkat.
