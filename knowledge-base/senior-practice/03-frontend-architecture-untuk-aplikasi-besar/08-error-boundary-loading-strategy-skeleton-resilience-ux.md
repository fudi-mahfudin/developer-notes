# Error Boundary, Loading Strategy, Skeleton, dan Resilience UX

## Tujuan

Topik ini penting karena frontend yang matang tidak hanya bagus saat semua hal berjalan mulus.
Ia juga harus tetap bisa dipakai saat data lambat, sebagian gagal, atau komponen meledak.

Kalau resilience UX lemah:

- user melihat blank screen;
- error kecil mematikan satu halaman penuh;
- loading state terasa kasar;
- retry dan fallback tidak jelas;
- rasa percaya user ke aplikasi turun.

## Kenapa Topik Ini Penting

Sistem nyata selalu punya kegagalan parsial:

- API lambat;
- satu widget gagal;
- route transition menunggu;
- data kosong;
- permission terbatas;
- browser atau device user tidak ideal.

Frontend yang kuat harus dirancang untuk kondisi ini.
Bukan hanya untuk screenshot happy path.

## Model Mental yang Benar

Pegang ini:

1. Error handling di UI adalah bagian arsitektur, bukan tambahan kosmetik.
2. Loading state adalah kontrak ekspektasi dengan user.
3. Skeleton bukan sekadar hiasan; ia alat perceived performance.
4. Error boundary harus menahan blast radius kegagalan.
5. Resilience UX berarti aplikasi tetap berguna walau sebagian fungsi gagal.

## Error Boundary

Error boundary membantu menangkap error rendering tertentu agar satu subtree gagal tanpa meruntuhkan seluruh aplikasi.

Ini penting karena tanpa boundary yang tepat:

- satu komponen rusak;
- seluruh route atau app shell ikut rusak.

## Blast Radius

Pertanyaan utama:

- kalau satu widget gagal, area mana yang boleh ikut mati?

Jawaban sehat biasanya:

- sekecil mungkin;
- cukup besar untuk memberi fallback yang masuk akal;
- tidak terlalu tinggi sehingga satu error kecil mematikan page penuh.

## Granularity Error Boundary

Terlalu sedikit boundary:

- blast radius besar.

Terlalu banyak boundary:

- tree jadi rumit;
- fallback terasa fragmentaris;
- observability bisa sulit.

Boundary harus mengikuti area kegagalan yang masuk akal secara UX.

## Error UI Bukan Hanya "Something went wrong"

Fallback error yang baik seharusnya mempertimbangkan:

- apa yang gagal;
- apakah user bisa retry;
- apakah fungsi lain masih bisa dipakai;
- apakah error bersifat sementara atau final;
- apakah ada langkah lanjut yang jelas.

Kalau semua error UI sama, pengalaman pengguna terasa malas dan tidak jujur.

## Loading Strategy

Loading bukan sekadar spinner.
Loading strategy menjawab:

- kapan blocking UI diterima;
- kapan partial content lebih baik;
- kapan skeleton dipakai;
- kapan placeholder cukup;
- kapan background refresh sebaiknya halus tanpa merusak interaksi.

## Spinner vs Skeleton

Spinner cocok untuk:

- aksi singkat;
- area kecil;
- status proses sederhana.

Skeleton cocok untuk:

- layout yang sudah dapat diprediksi;
- konten list/card/detail yang sedang dimuat;
- menjaga stabilitas visual;
- perceived performance yang lebih baik daripada blank area.

Kalau semua loading hanya spinner, UI sering terasa lebih lambat dari kenyataan.

## Blank Screen adalah Kegagalan Desain

Blank screen saat load sering menandakan:

- loading strategy tidak dipikirkan;
- boundary terlalu tinggi;
- route terlalu blocking;
- progressive rendering tidak dimanfaatkan.

Pada aplikasi besar, blank screen panjang adalah UX yang lemah.

## Progressive Disclosure

Kadang lebih sehat menampilkan:

- shell layout dulu;
- navigasi dulu;
- summary dulu;
- detail menyusul;
- widget gagal secara lokal tanpa mematikan seluruh page.

Ini membuat aplikasi terasa hidup walaupun belum semua data selesai.

## Empty State

Empty state bukan error.
Ini kategori tersendiri.

Contoh:

- belum ada data;
- hasil filter kosong;
- user baru belum punya aktivitas;
- resource ada tetapi belum terisi.

Kalau empty state diperlakukan seperti error atau loading, UX jadi membingungkan.

## Retry Strategy di UI

Pertanyaan penting:

- apakah user boleh retry manual?
- apakah aplikasi retry otomatis di background?
- apakah retry aman?
- kapan user harus diberi CTA jelas?

Retry UX yang sehat harus sejalan dengan semantics backend dan idempotency.

## Partial Failure

Di dashboard besar, partial failure sangat umum.

Contoh:

- metrics A gagal;
- chart B sukses;
- table C lambat;
- widget D unauthorized.

Frontend yang matang tetap menampilkan bagian yang berhasil dan memberi feedback lokal untuk yang gagal.
Tidak semua failure harus menjatuhkan seluruh page.

## Resilience UX

Resilience UX berarti aplikasi tetap terasa dapat diandalkan saat ada gangguan.

Bentuknya bisa:

- fallback lokal;
- stale data lama tetap ditampilkan dengan status refresh gagal;
- retry CTA;
- optimistic UI rollback yang jelas;
- preserving shell/layout saat detail gagal.

## Error Boundary Bukan Pengganti Semua Error Handling

Error boundary terutama relevan untuk render/runtime subtree tertentu.
Ia tidak otomatis menggantikan:

- fetch error handling;
- mutation error handling;
- validation error handling;
- domain-specific fallback.

Kalau semua diserahkan ke error boundary, UX akan terlalu kasar.

## Loading State Harus Jujur

Jangan menampilkan skeleton atau spinner hanya untuk terlihat aktif kalau sebenarnya tidak ada progres berarti.
User butuh sinyal yang jujur:

- apakah benar sedang load;
- apakah menunggu mutation;
- apakah gagal;
- apakah data hanya sedang refresh di background.

Kebohongan kecil di loading state cepat mengikis trust.

## Background Refresh

Saat data lama masih ada dan refresh sedang berjalan:

- jangan selalu blank-kan UI;
- tampilkan data lama bila masih cukup aman;
- beri affordance halus bahwa update sedang berlangsung bila perlu.

Ini sering jauh lebih baik daripada mengulang loading penuh.

## Skeleton Harus Mirip Layout Nyata

Skeleton terbaik:

- menjaga layout shift kecil;
- memberi ekspektasi bentuk konten;
- tidak menipu berlebihan;
- tidak lebih kompleks dari konten akhirnya.

Skeleton generik yang tidak mirip struktur nyata sering terasa murahan.

## UX untuk Error yang Bisa Dipulihkan

Kalau error sementara:

- beri retry;
- jelaskan area yang gagal;
- pertahankan area lain tetap bisa dipakai;
- jangan membuat user mulai ulang semuanya tanpa alasan.

Ini terutama penting untuk form panjang dan dashboard kerja.

## UX untuk Error yang Tidak Bisa Dipulihkan

Kalau error final:

- jelaskan dengan jujur;
- beri next step bila ada;
- jangan beri retry kosong yang tidak akan membantu;
- pastikan messaging sesuai konteks.

## Accessibility dalam Loading dan Error State

State seperti loading dan error juga harus accessible:

- status perubahan harus bisa dipahami screen reader bila relevan;
- fokus jangan hilang tanpa arah;
- CTA retry harus jelas;
- skeleton jangan merusak navigasi keyboard.

Resilience UX tanpa aksesibilitas tetap setengah matang.

## Anti-Pattern Umum

### 1. Satu Error Kecil Menjatuhkan Seluruh Halaman

Boundary terlalu tinggi atau fallback terlalu kasar.

### 2. Semua Loading = Spinner Tengah Layar

Ini membuat aplikasi terasa lambat dan kasar.

### 3. Blank UI Saat Background Refresh

Data yang sebenarnya masih berguna dibuang sia-sia.

### 4. Error Message Generik Tanpa Aksi

User tidak tahu harus berbuat apa.

## Heuristik Senior

1. Tempatkan error boundary sesuai blast radius yang masuk akal.
2. Bedakan error, empty, loading, dan refreshing state.
3. Gunakan skeleton untuk struktur yang dapat diprediksi.
4. Pertahankan bagian UI yang masih berguna saat partial failure.
5. Jangan reset seluruh UI hanya karena satu resource refresh.
6. Pastikan fallback dan retry sesuai konteks bisnis.
7. Perlakukan resilience UX sebagai bagian inti kualitas frontend.

## Pertanyaan Interview

### Dasar

- Apa fungsi error boundary?
- Kenapa spinner tidak selalu cukup?
- Apa beda empty state dan error state?
- Kenapa partial failure harus dipikirkan?

### Menengah

- Bagaimana Anda menentukan granularity error boundary?
- Kapan skeleton lebih baik daripada spinner?
- Bagaimana menangani background refresh tanpa merusak UX?
- Kenapa stale data kadang lebih baik daripada blank state?

### Senior

- Bagaimana Anda mendesain resilience UX untuk dashboard kompleks dengan banyak dependency?
- Bagaimana Anda menyeimbangkan kejujuran status sistem dengan perceived performance?
- Bagaimana Anda menangani retry UX untuk operasi yang mungkin tidak idempotent?
- Bagaimana Anda mengintegrasikan accessibility ke loading dan error strategy?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dashboard admin punya satu widget gagal dan seluruh page ikut rusak;
- user menunggu blank screen saat route berubah;
- refresh kecil memicu flicker besar;
- mutation gagal tetapi user tidak tahu apa yang tersimpan dan apa yang belum;
- skeleton tidak sesuai layout akhir sehingga UI terasa lompat-lompat.

## Ringkasan Brutal

- UI yang bagus di happy path saja belum matang.
- Error boundary harus mengontrol blast radius.
- Loading strategy menentukan rasa cepat atau lambat.
- Skeleton dan fallback yang baik meningkatkan trust.
- Engineer senior mendesain aplikasi agar tetap berguna saat realitas sistem tidak ideal.

## Checklist Pemahaman

- Saya bisa membedakan error, empty, loading, dan refreshing state.
- Saya tahu error boundary harus ditempatkan dengan sengaja.
- Saya paham kapan skeleton lebih tepat daripada spinner.
- Saya sadar partial failure tidak boleh otomatis menjatuhkan seluruh page.
- Saya mengerti resilience UX juga mencakup accessibility.
- Saya tidak lagi menganggap fallback UI sebagai detail kecil.

## Penutup

Frontend besar yang matang tidak terlihat kuat karena tidak pernah gagal.
Ia terlihat kuat karena saat gagal, ia gagal dengan terkendali, jelas, dan tetap menjaga pengguna bisa melanjutkan kerja semampunya.
