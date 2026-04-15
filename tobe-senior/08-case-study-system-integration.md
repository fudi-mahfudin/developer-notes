# Case Study: System Integration

Owner: Mahfudin  
Update cadence: Mingguan

## Judul

Integrasi retur inventory FIFO antara KAIROS dan third-party WMS

## Situation

Sinkronisasi data retur inventory lintas sistem berisiko mismatch karena perbedaan alur dan penyimpanan data.

## Task

Membangun flow integrasi yang menjaga konsistensi data antar sistem dan database (PostgreSQL dan Microsoft SQL Server).

## Action

- Menerapkan logika FIFO untuk alur retur inventory.
- Menyusun mapping data dan validasi antar sistem.
- Menangani sinkronisasi state lintas database.
- Menjalankan verifikasi bertahap untuk memastikan integritas data.

## Result

- Alur retur inventory menjadi lebih konsisten lintas sistem.
- Mengurangi risiko mismatch data pada proses operasional.
- Meningkatkan kepercayaan tim bisnis pada hasil integrasi.

## Trade-off

- Implementasi dilakukan bertahap untuk menekan risiko gangguan produksi.
- Prioritas pada konsistensi data dibanding ekspansi fitur cepat.

## Metrik yang Bisa Disebut di Interview

- Tingkat mismatch sebelum/sesudah.
- Jumlah error sinkronisasi per periode.
- Waktu rekonsiliasi data operasional.

## Jawaban 90 Detik (Ringkas)

Saya mengerjakan integrasi flow retur inventory antara KAIROS dan sistem WMS pihak ketiga, dengan tantangan utama menjaga konsistensi data lintas PostgreSQL dan SQL Server. Saya menerapkan logika FIFO, merapikan mapping data, lalu melakukan validasi sinkronisasi secara bertahap agar aman di produksi. Hasilnya flow retur lebih stabil dan risiko mismatch data operasional menurun.

## Action This Week

- Tambahkan satu contoh edge case integrasi beserta cara Anda menanganinya.
