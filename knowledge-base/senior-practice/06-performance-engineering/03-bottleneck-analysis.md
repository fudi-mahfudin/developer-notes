# Bottleneck Analysis

## Tujuan

Topik ini penting karena masalah performa jarang hilang hanya dengan optimasi acak.
Anda harus menemukan bottleneck aktual.
Kalau tidak, tim hanya memoles area yang tidak menentukan.

## Kenapa Topik Ini Penting

Bottleneck analysis menentukan:

- resource mana yang membatasi sistem;
- kapan dan di kondisi apa pembatas itu muncul;
- apa dampaknya ke latency/throughput;
- perubahan apa yang paling bernilai.

Tanpa itu, optimasi performa berubah jadi kegiatan kosmetik.

## Model Mental yang Benar

Pegang ini:

1. Setiap sistem punya bottleneck dominan pada kondisi tertentu.
2. Mengoptimasi non-bottleneck memberi dampak kecil.
3. Bottleneck bisa berpindah setelah perubahan.
4. Bottleneck harus dianalisis end-to-end.
5. Bottleneck analysis adalah proses berulang, bukan one-off.

## Jenis Bottleneck Umum

- CPU bottleneck;
- memory/GC bottleneck;
- disk I/O bottleneck;
- network bottleneck;
- DB query bottleneck;
- lock contention;
- queue backlog;
- dependency latency bottleneck.

## End-to-End Path

Mulai dari alur user nyata:

1. request masuk;
2. auth;
3. app logic;
4. DB query;
5. external API;
6. serialization;
7. response keluar.

Bottleneck bisa ada di tahap mana pun.

## Symptoms vs Root Cause

Contoh:

- symptom: response lambat.
- root cause bisa:
  - dependency timeout;
  - query scan berat;
  - event loop lag;
  - lock wait;
  - serialization besar.

Kalau tim memperbaiki symptom tanpa root cause, masalah akan kembali.

## Capacity Lens

Bottleneck harus dianalisis terhadap beban:

- normal load;
- peak load;
- burst load.

Sistem bisa baik di load rendah tetapi runtuh di burst.
Jadi bottleneck analysis harus punya konteks volume.

## Queueing Effect

Saat resource mendekati saturasi:

- antrean muncul;
- latency melonjak nonlinear;
- tail latency memburuk cepat.

Bottleneck sering terlihat lebih jelas di p95/p99 daripada p50.

## Utilization dan Saturation

Tanyakan:

- resource mana utilization tinggi?
- resource mana wait time tinggi?

CPU tinggi tidak selalu satu-satunya tanda.
Bisa CPU rendah tapi pool wait tinggi.

## Dependency Bottleneck

Sering bottleneck terbesar ada di dependency:

- DB lambat;
- cache miss ke backend lain;
- partner API melambat.

Jika demikian, optimasi app code lokal mungkin tidak banyak membantu.

## Internal Bottleneck

Kadang bottleneck internal:

- JSON serialization besar;
- expensive transform;
- sync operation;
- memory churn;
- lock di app layer.

Profiling membantu memisahkan dua dunia ini.

## Moving Bottleneck

Setelah bottleneck utama diperbaiki, bottleneck berikutnya muncul.
Ini normal.

Kesalahan umum:

- menganggap satu optimasi selesai berarti masalah performa selesai permanen.

## Hypothesis-Driven Analysis

Pola sehat:

1. bentuk hipotesis bottleneck;
2. kumpulkan bukti;
3. uji perubahan;
4. ukur dampak.

Bukan:

- "kayaknya query ini lambat, ayo tambah cache."

## Data yang Dibutuhkan

- latency breakdown;
- throughput;
- error/timeouts;
- resource usage;
- queue depth;
- pool wait;
- query plan;
- trace spans.

Semakin kaya data, semakin tajam diagnosis.

## Bottleneck di Frontend

Bisa berupa:

- bundle besar;
- hydration berat;
- rerender mahal;
- main thread long tasks;
- waterfall data fetch.

Bottleneck analysis frontend harus memisahkan network vs JS execution vs render.

## Bottleneck di Backend

Bisa berupa:

- DB hot query;
- external dependency timeout;
- CPU-heavy transform;
- memory pressure;
- contention pada shared resource.

## Anti-Pattern Umum

### 1. Menyamakan Bottleneck dengan "Komponen yang Paling Terlihat"

Yang paling terlihat belum tentu paling membatasi.

### 2. Optimasi Beruntun Tanpa Ulang Pengukuran

Sulit tahu mana perubahan yang berdampak.

### 3. Mengabaikan Tail Latency

User tetap menderita walau rata-rata bagus.

### 4. Mengabaikan Dependency

App code dipoles, masalah utama tetap.

## Heuristik Senior

1. Cari bottleneck terbesar dulu.
2. Gunakan percentile dan saturation metrics.
3. Lihat seluruh request path.
4. Pisahkan symptom dari root cause.
5. Ulang analisis setelah tiap perbaikan besar.
6. Jangan over-optimize area non-bottleneck.
7. Dokumentasikan temuan untuk mencegah asumsi berulang.

## Pertanyaan Interview

### Dasar

- Apa itu bottleneck?
- Kenapa tidak semua optimasi berdampak sama?
- Kenapa p99 penting?
- Apa bedanya symptom dan root cause?

### Menengah

- Bagaimana Anda menemukan bottleneck pada endpoint lambat?
- Apa peran queueing dalam latency spike?
- Kenapa bottleneck bisa berpindah?
- Kapan dependency menjadi bottleneck dominan?

### Senior

- Bagaimana Anda memimpin bottleneck analysis lintas frontend-backend untuk flow kritis?
- Bagaimana Anda menentukan prioritas perbaikan saat ada banyak bottleneck kecil?
- Bagaimana Anda mengkomunikasikan trade-off optimasi ke stakeholder non-teknis?
- Bagaimana Anda menghindari local optimization yang tidak meningkatkan end-to-end SLA?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- p95 API melonjak saat jam sibuk;
- dashboard lambat meski query utama cepat;
- worker throughput mentok pada volume tertentu;
- frontend terasa laggy walau backend respons cepat.

## Ringkasan Brutal

- Bottleneck analysis adalah fondasi optimasi.
- Tanpa itu, performa engineering berubah jadi spekulasi mahal.
- Fokus pada pembatas terbesar, ukur dampak, ulangi.
- Engineer senior tidak mengejar semua masalah kecil sekaligus.
- Ia memecahkan bottleneck yang paling membatasi nilai bisnis.

## Checklist Pemahaman

- Saya bisa mendefinisikan bottleneck secara operasional.
- Saya paham pentingnya tail latency dan saturation.
- Saya bisa membedakan root cause dari symptom.
- Saya tahu bottleneck bisa berpindah.
- Saya menjalankan analisis berbasis hipotesis dan data.

## Penutup

Bottleneck analysis yang baik membuat optimasi menjadi terarah, terukur, dan bisa dipertanggungjawabkan.
Tanpa itu, tim hanya bergerak cepat ke arah yang salah.
