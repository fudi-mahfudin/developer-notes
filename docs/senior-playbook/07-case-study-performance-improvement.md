# Case Study: Performance Improvement

Owner: Mahfudin  
Update cadence: Mingguan (saat persiapan technical interview)

## Judul

Optimasi modul transaksi Next.js menggunakan Elastic APM

## Situation

Modul transaksi terasa lambat pada beban data tinggi, menyebabkan pengalaman user menurun dan memperlambat proses operasional.

## Task

Mengidentifikasi bottleneck utama dan meningkatkan performa render serta efisiensi API call tanpa mengorbankan stabilitas.

## Action

- Menggunakan Elastic APM untuk memetakan endpoint/flow yang paling lambat.
- Refactor pola fetch agar mengurangi request redundan.
- Menata ulang logika data-table agar render lebih ringan.
- Uji hasil perubahan dengan metrik before/after.

## Result

- Terjadi peningkatan performa signifikan pada view yang diukur (sekitar 70%).
- Pengalaman user membaik dan alur transaksi lebih responsif.
- Memberikan baseline observability untuk optimasi lanjutan.

## Trade-off

- Menunda fitur minor untuk memprioritaskan bottleneck berdampak tinggi.
- Memilih perubahan incremental agar aman di produksi.

## Metrik yang Bisa Disebut di Interview

- Persentase peningkatan render/perceived latency.
- Penurunan jumlah API call redundan.
- Dampak ke keluhan user/ops (jika ada data).

## Jawaban 90 Detik (Ringkas)

Saya menangani performa modul transaksi yang lambat di aplikasi Next.js. Saya mulai dari data, bukan asumsi, dengan Elastic APM untuk menemukan bottleneck utama. Setelah itu saya refactor pola fetch dan logika data-table untuk mengurangi render berat serta request yang tidak perlu. Hasil pengukuran pada view utama menunjukkan peningkatan sekitar 70%, dan tim punya baseline observability yang lebih baik untuk iterasi berikutnya.

## Action This Week

- Lengkapi metrik teknis pendukung (misalnya TTFB, jumlah request, atau waktu render).
