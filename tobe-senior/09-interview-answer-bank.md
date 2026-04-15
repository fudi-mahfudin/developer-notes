# Interview Answer Bank

Owner: Mahfudin  
Update cadence: Mingguan

## Behavioral

### Ceritakan pencapaian terbesar Anda

- Saya meningkatkan performa modul transaksi di sistem rumah sakit menggunakan Elastic APM dan refactor targeted, dengan peningkatan signifikan pada view yang diukur.

### Ceritakan konflik di tim dan cara menyelesaikannya

- Saya menyamakan prioritas melalui data dampak bisnis dan metrik teknis, lalu menyepakati rollout bertahap agar kualitas tetap terjaga.

### Ceritakan kegagalan dan pelajaran

- Pernah meremehkan kompleksitas integrasi lintas sistem. Pelajarannya: validasi kontrak data lebih awal dan siapkan fallback plan sebelum release.

### Kenapa Anda cocok untuk senior role

- Saya terbiasa menggabungkan delivery cepat dengan reliability, ownership lintas FE/BE, serta komunikasi yang jelas ke stakeholder.

## Technical

### Bagaimana Anda meningkatkan performa aplikasi Next.js?

- Profiling dulu (APM/browser profiling), cari bottleneck berdampak tinggi, optimasi fetch/render/query, ukur sebelum-sesudah, rollout bertahap.

### Bagaimana menangani integrasi lintas sistem?

- Definisikan kontrak data, validasi input/output, idempotency, retry+timeout, observability, dan prosedur rekonsiliasi.

### Kapan memilih SQL vs NoSQL?

- SQL untuk transaksi dan konsistensi tinggi; NoSQL untuk use-case fleksibel/high write yang tidak butuh relasi kuat.

### Bagaimana Anda menentukan readiness produksi?

- Checklist kualitas: test kritikal lulus, monitoring aktif, rollback plan jelas, owner on-call terdefinisi.

## Format Jawaban 60-120 Detik

1. Konteks singkat
2. Tanggung jawab Anda
3. Aksi teknis utama
4. Hasil terukur
5. Pelajaran dan penerapan berikutnya

## Action This Week

- Latih 10 pertanyaan ini dengan timer 90 detik dan rekam 2 sesi.
