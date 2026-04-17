# Q52 - SSR vs CSR vs SSG vs ISR

## Pertanyaan Interview

Jelaskan perbedaan SSR, CSR, SSG, dan ISR, serta kapan memilih masing-masing.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"CSR merender utama di browser; interaktif tinggi tapi initial load bisa lebih berat.
SSR merender di server per request; bagus untuk SEO dan first meaningful content.
SSG membangun halaman saat build-time; cepat dan stabil untuk konten relatif statis.
ISR adalah hybrid SSG yang bisa revalidate per interval tanpa full rebuild.

Pilihan tergantung karakter data dan kebutuhan UX:
data real-time kritikal cenderung SSR/hybrid,
konten dokumentasi cocok SSG,
portal internal interaktif bisa CSR dengan optimasi.
Di healthcare, saya pilih pendekatan yang menjaga freshness data sensitif
tanpa mengorbankan performa." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah SSR selalu lebih baik untuk SEO?"
2. "Kapan CSR tetap pilihan tepat?"
3. "Apa risiko ISR?"
4. "Bagaimana memilih per halaman?"
5. "Anti-pattern arsitektur render?"

### Jawaban Singkat untuk Follow-up

1) SSR untuk SEO:
"Sering membantu, tapi biaya server dan cache strategy harus dihitung."

2) CSR tepat:
"Dashboard internal interaktif dengan SEO rendah."

3) Risiko ISR:
"Konten bisa stale selama window revalidate."

4) Memilih per halaman:
"Klasifikasikan: SEO, freshness data, traffic, dan latency target."

5) Anti-pattern:
"Memaksakan satu mode render untuk semua halaman."

## Jawaban Ideal (Versi Singkat, Level Senior)

Tidak ada mode universal terbaik.
Keputusan yang baik biasanya kombinasi:
- SSR untuk halaman sensitif/SEO
- SSG untuk konten statis
- ISR untuk semi-dinamis
- CSR untuk pengalaman aplikasi interaktif

## Penjelasan Detail yang Dicari Interviewer

### 1) Trade-off utama

SSR:
- plus: SEO, first paint bagus
- minus: beban server, TTFB sensitif

CSR:
- plus: interaktif, beban server rendah
- minus: SEO dan startup JS

SSG:
- plus: cepat, murah di runtime
- minus: update konten butuh rebuild

ISR:
- plus: update bertahap tanpa rebuild penuh
- minus: data mungkin stale sementara

### 2) Desain hybrid praktis

Satu aplikasi bisa campur:
- landing publik: SSG/ISR
- detail referensi medis: ISR
- dashboard transaksi: SSR + client hydration

### 3) Risiko implementasi

- hydration mismatch
- data stale karena invalidation lemah
- server overload karena SSR tanpa cache

Mitigasi:
- observability rendering
- cache key benar
- graceful fallback

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const renderStrategyByRoute = {
  "/": "SSG",
  "/knowledge": "ISR",
  "/dashboard": "SSR",
  "/app": "CSR",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare app biasanya gabungan:
- halaman publik edukasi
- halaman operasional sensitif
- dashboard monitoring yang cepat berubah

Memilih mode render yang tepat mengurangi latency,
meningkatkan reliabilitas, dan mencegah data usang tampil ke user.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
halaman status transaksi dipindah ke SSG demi performa.
hasilnya user melihat data lama beberapa menit.

Perbaikan:
- ganti ke SSR atau ISR dengan revalidate lebih ketat
- tambahkan indicator freshness data di UI

## Contoh Pola Kode yang Lebih Aman

```ts
type RenderMode = "CSR" | "SSR" | "SSG" | "ISR";
```

Gunakan matriks keputusan per route, bukan keputusan global.

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan keempat mode rendering dengan jelas.
- Menunjukkan trade-off performa, SEO, dan freshness.
- Menekankan hybrid strategy.
- Menyebut risiko stale/hydration.
- Relevan pada workflow healthcare.

## Ringkasan Final

SSR, CSR, SSG, ISR adalah alat dengan konteks berbeda.
Pendekatan senior adalah memilih per route berdasarkan tujuan bisnis dan risiko data.
Untuk healthcare, freshness dan reliabilitas data harus jadi faktor utama
di samping SEO dan performa.
