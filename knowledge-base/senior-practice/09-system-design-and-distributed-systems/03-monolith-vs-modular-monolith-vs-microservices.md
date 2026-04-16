# Monolith vs Modular Monolith vs Microservices

## Tujuan

Topik ini membantu memilih bentuk arsitektur layanan yang sesuai konteks, bukan sesuai tren industri.

## Kenapa Penting

- Salah pilih model arsitektur memberi biaya jangka panjang besar.
- Banyak tim pindah ke microservices terlalu cepat.
- Banyak tim bertahan di monolith terlalu lama tanpa modularitas.

## Model Mental

1. Tidak ada arsitektur absolut terbaik.
2. Pilihan tergantung kompleksitas domain, ukuran tim, dan kebutuhan scale.
3. Operasional cost harus dihitung sejak awal.
4. Evolusi bertahap biasanya lebih sehat daripada lompatan ekstrem.
5. Boundary domain lebih penting dari jumlah service.

## Monolith

Ciri:

- satu deployable unit.
- satu runtime utama.
- integrasi internal langsung.

Kelebihan:

- sederhana di awal.
- DX cepat.
- observability dan debugging relatif mudah.

Kekurangan:

- deploy coupling tinggi.
- scaling granular sulit.
- batas domain sering kabur seiring waktu.

## Modular Monolith

Ciri:

- satu deployable unit.
- modul internal dengan boundary ketat.
- kontrak antar modul eksplisit.

Kelebihan:

- complexity management lebih baik dari monolith biasa.
- operasi tetap sederhana.
- jalan transisi natural ke service split jika perlu.

Kekurangan:

- butuh disiplin arsitektur internal.
- boundary bisa dilanggar jika governance lemah.

## Microservices

Ciri:

- banyak deployable units.
- ownership per service.
- komunikasi via network/event.

Kelebihan:

- scale/independent deploy per domain.
- isolation fault lebih baik bila didesain benar.
- cocok untuk organisasi besar dengan domain jelas.

Kekurangan:

- operasional kompleks.
- distributed system failure modes.
- observability/testing lebih sulit.
- biaya platform naik.

## Kapan Monolith Cocok

- produk tahap awal.
- tim kecil.
- domain belum stabil.
- kebutuhan scale masih moderat.

## Kapan Modular Monolith Cocok

- produk mulai kompleks.
- tim bertambah namun belum besar.
- ingin boundary domain kuat tanpa overhead microservices.

## Kapan Microservices Cocok

- domain matang dan terpisah jelas.
- tim banyak dengan ownership kuat.
- kebutuhan scale/deploy independence nyata.
- organisasi siap mengelola platform complexity.

## Organizational Fit

Arsitektur harus cocok dengan:

- struktur tim.
- kemampuan operasional.
- budaya ownership.

Microservices tanpa kesiapan organisasi sering gagal.

## Data dan Transaksi

Monolith lebih mudah transaksi lintas modul.
Microservices butuh pendekatan:

- saga.
- eventual consistency.
- idempotency.

Ini menambah kompleksitas bisnis dan teknis.

## Debugging dan Incident

Monolith:

- trace lokal lebih mudah.

Microservices:

- butuh tracing kuat.
- root cause lintas service lebih sulit.

## Deployment Trade-off

Monolith:

- satu deploy bisa berisiko besar.

Microservices:

- blast radius per service lebih kecil.
- tetapi jumlah deploy events jauh lebih banyak.

## Evolution Strategy

Praktik sehat:

- mulai dari monolith/modular monolith.
- pecah service berdasarkan pain nyata.
- bukan pecah berdasarkan spekulasi awal.

## Anti-Pattern

### 1. "Microservices = senior"

Salah.
Bisa jadi anti-produktif.

### 2. Monolith tanpa boundary

Akhirnya jadi big ball of mud.

### 3. Split berdasarkan layer teknis, bukan domain

Coupling tetap tinggi.

### 4. Mengabaikan biaya operasional

Sistem sulit dipelihara.

## Heuristik Senior

1. Pilih arsitektur paling sederhana yang memenuhi kebutuhan saat ini.
2. Invest boundary domain sejak awal, apapun modelnya.
3. Jangan migrasi ke microservices tanpa pain yang jelas.
4. Hitung cost observability dan platform.
5. Jadikan modular monolith sebagai opsi serius, bukan kompromi "setengah matang".
6. Split service berdasarkan domain ownership, bukan mode.
7. Review arsitektur berkala berdasarkan data operasional.

## Pertanyaan Interview

### Dasar

- Apa beda monolith dan microservices?
- Apa itu modular monolith?
- Kenapa microservices tidak selalu lebih baik?
- Kapan monolith justru ideal?

### Menengah

- Bagaimana menentukan readiness organisasi untuk microservices?
- Apa risiko transaksi lintas microservice?
- Bagaimana membuat boundary modul sehat di modular monolith?
- Kapan service split pertama dilakukan?

### Senior

- Bagaimana Anda memimpin transisi dari monolith ke modular monolith/microservices secara bertahap?
- Bagaimana menilai apakah microservices adoption Anda saat ini memberi net benefit?
- Bagaimana mencegah organisasi "distributed monolith"?
- Bagaimana mengkomunikasikan keputusan arsitektur ini ke stakeholder bisnis?

## Kasus Nyata

- startup kecil adopsi microservices terlalu cepat lalu slowdown.
- monolith besar tanpa modularitas menghambat semua tim.
- service split prematur memicu latensi dan incident baru.
- modular monolith yang disiplin memperpanjang runway tanpa rewrite.

## Ringkasan Brutal

- Arsitektur bukan soal gengsi.
- Monolith yang bersih sering lebih baik dari microservices yang kacau.
- Microservices memberi manfaat besar hanya jika domain dan organisasi siap.

## Checklist

- Saya tahu konteks tim/produk saat ini.
- Saya memahami biaya operasional pilihan arsitektur.
- Saya punya boundary domain yang jelas.
- Saya memilih evolusi bertahap, bukan lompatan emosional.
- Saya bisa menjelaskan trade-off ke stakeholder.

## Penutup

Pilih arsitektur yang mempercepat nilai bisnis dengan risiko terkelola, bukan arsitektur yang terlihat paling modern di slide.
