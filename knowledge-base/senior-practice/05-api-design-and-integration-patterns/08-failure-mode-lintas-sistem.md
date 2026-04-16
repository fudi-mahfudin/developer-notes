# Failure Mode Lintas Sistem

## Tujuan

Topik ini penting karena integrasi antar sistem jarang gagal dengan cara yang rapi.
Kegagalan sering parsial, ambigu, terlambat, atau terlihat sukses dari satu sisi tetapi gagal dari sisi lain.

Engineer senior harus bisa memetakan failure mode, bukan sekadar bilang "network issue".

## Kenapa Topik Ini Penting

Tanpa pemahaman failure mode lintas sistem:

- retry diterapkan salah;
- timeout salah arti;
- monitoring kurang tajam;
- incident response lambat;
- desain integrasi terlalu optimistis.

## Model Mental yang Benar

Pegang ini:

1. Kegagalan lintas sistem jarang binary.
2. Success lokal tidak berarti success global.
3. Timeout bukan selalu gagal total.
4. Partial failure adalah baseline reality.
5. Integrasi yang sehat dirancang dengan asumsi komponen lain akan lambat, diam, salah, atau berubah.

## Jenis Failure Mode Umum

- timeout;
- connection failure;
- partial success;
- duplicate delivery;
- out-of-order event;
- stale data;
- schema drift;
- auth/config mismatch;
- downstream overload;
- poisoned retry loop.

## Timeout Ambigu

Ini salah satu failure mode paling mahal.

Caller melihat timeout.
Tetapi tidak tahu:

- request belum diproses;
- request sedang diproses;
- request sudah sukses tetapi response hilang.

Tanpa idempotency atau reconciliation, Anda hidup dalam ketidakpastian.

## Partial Success

Contoh:

1. data lokal tersimpan;
2. event ke downstream gagal;
3. caller menerima error.

Sistem lokal merasa "sebagian sukses".
Caller merasa "gagal".
Sistem lain belum tahu apa-apa.

Inilah sebabnya failure mode lintas sistem tidak boleh dipikirkan secara linear.

## Duplicate Delivery

Karena retry, redelivery, atau jaringan:

- message bisa tiba dua kali;
- webhook bisa dikirim ulang;
- client bisa mengulang call.

Kalau consumer tidak idempotent, duplicate delivery berubah menjadi bug bisnis.

## Out-of-Order Arrival

Pada distributed flow:

- event `B` bisa tiba sebelum `A`;
- retry lama bisa datang setelah perubahan baru;
- projection bisa sesaat memproses urutan salah.

Kalau sistem sangat sensitif pada ordering, desain Anda harus mengakuinya.

## Stale Read

Satu sistem mungkin sudah update.
Sistem lain membaca projection atau cache lama.

Masalahnya:

- keputusan baru dibangun di atas data usang;
- user melihat informasi saling bertentangan;
- debugging menjadi sulit karena tiap sistem terlihat "benar" dari sudutnya.

## Schema Drift

Failure mode ini sering diremehkan.

Contoh:

- producer menambah atau mengubah field;
- consumer membuat asumsi lama;
- parsing gagal atau, lebih berbahaya, sukses tetapi salah arti.

Schema drift adalah bentuk kegagalan yang terlihat seperti bug aplikasi biasa, padahal akar masalahnya kontrak integrasi.

## Auth dan Config Failure

Integrasi juga bisa gagal karena:

- token expired;
- credential salah;
- permission scope berubah;
- endpoint base URL salah;
- secret tak sinkron.

Ini sering tidak dramatis secara teknis, tetapi sangat nyata di production.

## Downstream Overload

Sistem lain bisa hidup tetapi jenuh:

- latency naik;
- 5xx mulai muncul;
- rate limit meningkat;
- timeout bertambah.

Kalau caller terus memukul dengan retry agresif, failure kecil berubah menjadi outage lebih besar.

## Silent Failure

Yang paling berbahaya bukan error keras.
Yang paling berbahaya kadang justru:

- event hilang tanpa alarm;
- webhook gagal diam-diam;
- partial state tidak terdeteksi;
- data drift tidak diketahui berhari-hari.

Karena itu observability dan reconciliation sama pentingnya dengan retry.

## Failure Propagation

Satu dependency lambat bisa memicu:

- timeout caller;
- retry caller;
- pool saturation;
- queue backlog;
- user menekan tombol lagi;
- downstream makin jenuh.

Failure mode lintas sistem sering punya efek berantai.

## Defensive Design

Desain yang lebih sehat biasanya mencakup:

- timeout;
- idempotency;
- retry selektif;
- backoff;
- circuit breaker/fail-fast tertentu;
- dead-letter handling;
- reconciliation;
- observability yang cukup.

Tidak semua flow butuh semua alat itu.
Tetapi semua flow penting harus punya jawaban failure mode yang realistis.

## Consumer Contract Harus Tahu Failure Semantics

Consumer perlu tahu:

- apakah error boleh di-retry;
- apakah duplicate request aman;
- apa arti timeout;
- apakah status tertentu final atau sementara.

Kalau producer tidak menjelaskan semantics ini, consumer akan berimprovisasi. Biasanya buruk.

## Anti-Pattern Umum

### 1. Menganggap Timeout = Gagal Total

Sering salah dan berbahaya.

### 2. Menganggap 200 = Selesai Global

Bisa jadi baru sukses lokal.

### 3. Tidak Mengasumsikan Duplicate dan Delay

Integrasi jadi rapuh.

### 4. Tidak Menyiapkan Deteksi Drift

Silent failure hidup lama.

## Heuristik Senior

1. Identifikasi failure mode sebelum implementasi, bukan setelah incident.
2. Bedakan clearly between local success and global success.
3. Timeout ambiguity harus punya strategi.
4. Asumsikan duplicate dan delay sebagai normal.
5. Rancang observability untuk partial failure dan drift.
6. Pastikan consumer tahu semantics retry dan finality.
7. Jangan mendesain integrasi seolah semua komponen lain sempurna.

## Pertanyaan Interview

### Dasar

- Apa itu partial failure?
- Kenapa timeout bisa ambigu?
- Apa risiko duplicate delivery?
- Kenapa 200 response tidak selalu berarti sistem global selesai?

### Menengah

- Bagaimana schema drift menjadi failure mode?
- Apa efek downstream overload ke upstream?
- Kenapa stale read lintas sistem berbahaya?
- Apa beda hard failure dan silent failure?

### Senior

- Bagaimana Anda memetakan failure mode untuk integrasi baru sebelum go-live?
- Bagaimana Anda mendesain observability yang bisa mendeteksi partial success dan drift?
- Bagaimana Anda menjelaskan ke bisnis bahwa beberapa failure mode memang tidak bisa dihilangkan, hanya dikelola?
- Bagaimana Anda menurunkan blast radius saat satu dependency mulai melambat?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- request timeout tetapi order ternyata sudah tersimpan;
- event publish gagal setelah DB commit;
- webhook tiba dua kali;
- dashboard internal dan partner menunjukkan status berbeda;
- dependency lambat memicu retry storm.

## Ringkasan Brutal

- Failure lintas sistem jarang rapi.
- Partial success dan timeout ambiguity adalah kenyataan.
- Duplicate, delay, stale data, dan schema drift harus diasumsikan dari awal.
- Integrasi yang matang bukan yang menghindari semua kegagalan, tetapi yang sudah tahu bentuk kegagalan yang paling mungkin dan cara membatasi dampaknya.

## Checklist Pemahaman

- Saya tahu local success tidak sama dengan global success.
- Saya paham timeout ambiguity butuh strategi.
- Saya menganggap duplicate dan delayed delivery sebagai kondisi normal.
- Saya sadar drift dan silent failure perlu deteksi aktif.
- Saya tahu consumer butuh contract failure semantics yang jelas.

## Penutup

Begitu Anda berhenti melihat integrasi sebagai jalur lurus request-response dan mulai melihatnya sebagai rangkaian boundary yang bisa gagal dengan banyak cara, desain Anda akan naik satu tingkat secara drastis.
