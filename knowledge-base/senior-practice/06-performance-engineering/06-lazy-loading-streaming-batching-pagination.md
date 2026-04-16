# Lazy Loading, Streaming, Batching, Pagination

## Tujuan

Topik ini penting karena banyak optimasi performa gagal karena tim tidak mengatur kapan data/komponen dimuat, berapa banyak data diproses per langkah, dan bagaimana aliran data dikirim.

## Kenapa Topik Ini Penting

Tanpa strategi ini:

- initial load berat;
- payload terlalu besar;
- UI terasa lambat;
- backend tertekan query besar;
- user menunggu data yang sebenarnya belum diperlukan.

## Model Mental yang Benar

Pegang ini:

1. Muat hanya yang dibutuhkan saat dibutuhkan.
2. Kirim data bertahap bila memungkinkan.
3. Kurangi roundtrip berlebihan dengan batching yang tepat.
4. Batasi volume data per request dengan pagination.
5. Semua strategi ini harus sinkron dengan UX dan contract API.

## Lazy Loading

Lazy loading menunda pemuatan resource sampai benar-benar diperlukan.

Cocok untuk:

- komponen berat yang jarang muncul;
- gambar di bawah fold;
- module admin;
- chart/editor optional.

## Benefit Lazy Loading

- initial bundle lebih kecil;
- first render lebih cepat;
- resource network lebih efisien.

## Risiko Lazy Loading

- interaksi pertama bisa terasa delay jika prefetch tidak tepat;
- terlalu banyak split kecil bisa menambah overhead request;
- loading state bertambah kompleks.

## Streaming

Streaming mengirim atau memproses data secara bertahap, bukan menunggu semua siap.

Manfaat:

- time-to-first-byte/content lebih baik;
- memory usage bisa lebih rendah;
- UX bisa menampilkan progres alami.

## Kapan Streaming Berguna

- payload besar;
- SSR streaming;
- file transfer;
- long-running generation.

## Batching

Batching menggabungkan beberapa operasi kecil menjadi satu request/unit kerja.

Manfaat:

- kurangi overhead per request;
- kurangi roundtrip latency total;
- turunkan pressure connection.

## Risiko Batching

- batch terlalu besar jadi berat;
- error handling per-item lebih rumit;
- fairness bisa menurun jika antrean campur.

Jadi batching harus punya batas ukuran/timeout.

## Pagination

Pagination membatasi hasil list agar:

- payload terkendali;
- query lebih ringan;
- UX bisa menavigasi data besar;
- caching dan incremental loading lebih mudah.

## Lazy Loading vs Prefetch

Lazy loading menunda.
Prefetch menyiapkan lebih awal saat peluang akses tinggi.

Kombinasi keduanya bisa kuat:

- lazy untuk non-critical;
- prefetch untuk next-likely action.

## Infinite Scroll vs Page Navigation

Infinite scroll:

- bagus untuk feed;
- buruk untuk target posisi spesifik dan footer access.

Page navigation:

- lebih jelas untuk data terstruktur/admin;
- lebih mudah bookmark/share page.

Pilih berdasar UX, bukan tren.

## API Contract Alignment

Frontend strategy harus cocok dengan API:

- support pagination/cursor;
- support partial fields bila perlu;
- support batching endpoint bila memang masuk akal.

Jika API tidak mendukung, optimasi frontend sering terbatas.

## Backpressure Consideration

Streaming dan batching harus memperhatikan backpressure:

- jangan dorong data lebih cepat dari consumer;
- batasi parallel fetch;
- tangani cancellation saat user pindah context.

## Anti-Pattern Umum

### 1. Load Semua di Awal

Membunuh initial performance.

### 2. Batch Tanpa Limit

Satu batch jadi bottleneck baru.

### 3. Pagination Diabaikan untuk Data Besar

Query dan payload meledak.

### 4. Lazy Loading Tanpa Loading UX yang Jelas

User bingung apakah sistem macet.

## Heuristik Senior

1. Prioritaskan critical path, tunda sisanya.
2. Gunakan streaming saat payload besar dan UX diuntungkan.
3. Batch secukupnya, jangan berlebihan.
4. Gunakan pagination default untuk list besar.
5. Samakan strategi frontend dengan kontrak backend.
6. Uji performa pada device dan network realistis.
7. Ingat bahwa perceived performance sama pentingnya dengan total completion time.

## Pertanyaan Interview

### Dasar

- Apa itu lazy loading?
- Kapan streaming berguna?
- Kenapa pagination penting?
- Apa manfaat batching?

### Menengah

- Kapan lazy loading malah memperburuk UX?
- Apa trade-off infinite scroll vs pagination klasik?
- Bagaimana menentukan ukuran batch yang sehat?
- Bagaimana mengelola loading state untuk konten bertahap?

### Senior

- Bagaimana Anda merancang strategi loading bertahap untuk dashboard kompleks?
- Bagaimana Anda menyeimbangkan batch size, latency, dan error isolation?
- Bagaimana Anda memastikan API dan frontend strategy tidak saling bertentangan?
- Bagaimana Anda mengukur dampak nyata dari lazy loading vs prefetch policy?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- halaman utama lambat karena semua widget load sekaligus;
- list admin membawa ribuan row;
- editor berat membengkakkan initial bundle;
- feed mobile boros data karena strategi fetch buruk.

## Ringkasan Brutal

- Jangan muat semua sekaligus.
- Tunda, pecah, dan kirim bertahap saat masuk akal.
- Batching dan pagination bukan fitur kosmetik, tetapi kontrol biaya.
- Streaming bisa jadi game changer bila dipakai benar.
- Engineer senior merancang aliran data, bukan sekadar menambah spinner.

## Checklist Pemahaman

- Saya tahu kapan lazy loading tepat.
- Saya paham manfaat dan biaya streaming.
- Saya bisa membedakan batching sehat vs batch berlebihan.
- Saya tahu pagination harus jadi default untuk data besar.
- Saya mampu menyelaraskan strategi loading dengan UX dan API contract.

## Penutup

Strategi loading yang baik adalah strategi yang membuat pengguna merasa aplikasi ringan tanpa mengorbankan correctness dan maintainability.
