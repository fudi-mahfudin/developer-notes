# Optimistic vs Pessimistic Locking

## Tujuan

Topik ini penting karena banyak engineer mendengar dua istilah ini lalu berhenti di definisi.
Padahal yang membedakan engineer senior adalah kemampuan memilih kapan masing-masing masuk akal, dan kapan keduanya sama-sama salah karena masalahnya perlu diselesaikan dengan cara lain.

## Kenapa Topik Ini Penting

Ketika beberapa actor bisa mengubah data yang sama:

- saldo;
- stok;
- status approval;
- konfigurasi;
- profile tertentu;

Anda perlu strategi untuk mencegah update salah atau hilang.

Optimistic dan pessimistic locking adalah dua pendekatan umum.
Keduanya punya biaya berbeda.

## Definisi Singkat

### Optimistic Locking

Pendekatan ini berasumsi konflik jarang.
Data dibaca tanpa lock berat jangka panjang.
Saat update dilakukan, sistem memastikan data belum berubah sejak dibaca.

Biasanya memakai:

- version number;
- updated timestamp tertentu;
- compare-and-swap style predicate.

### Pessimistic Locking

Pendekatan ini menganggap konflik cukup berbahaya atau cukup mungkin sehingga resource dikunci lebih awal agar actor lain tidak bisa memodifikasi bebas selama operasi penting berlangsung.

## Model Mental yang Benar

Pegang ini:

1. Optimistic locking membayar cost saat conflict terjadi.
2. Pessimistic locking membayar cost di muka lewat contention.
3. Tidak ada yang selalu lebih baik.
4. Pemilihannya bergantung pada conflict frequency, business criticality, dan latency tolerance.
5. Kadang solusi terbaik justru atomic update atau redesign alur.

## Optimistic Locking Lebih Detail

Alur umum:

1. baca row dengan version saat ini;
2. user atau service memproses perubahan;
3. update dijalankan dengan syarat version masih sama;
4. jika row count `0`, artinya ada konflik.

Keunggulannya:

- tidak menahan lock lama;
- concurrency tinggi lebih mungkin;
- cocok jika konflik relatif jarang.

## Kelemahan Optimistic Locking

- conflict tetap mungkin;
- caller harus tahu cara menangani conflict;
- retry atau merge logic bisa kompleks;
- pada hot row dengan konflik tinggi, retry storm bisa terjadi.

Jadi optimistic bukan gratis.
Ia hanya memindahkan biaya ke path conflict.

## Pessimistic Locking Lebih Detail

Alur umum:

1. ambil lock pada row/resource;
2. lakukan operasi kritis;
3. commit atau release lock.

Keunggulannya:

- actor lain dipaksa menunggu atau gagal;
- cocok saat konflik sering dan invariant sangat sensitif;
- reasoning untuk beberapa kasus bisa lebih langsung.

## Kelemahan Pessimistic Locking

- contention naik;
- throughput bisa turun;
- deadlock risk naik;
- latency bertambah;
- lock hold time menjadi masalah besar.

Kalau dipakai terlalu luas, sistem akan terasa "aman" tetapi lambat dan rapuh di bawah load.

## Kapan Optimistic Locking Masuk Akal

Biasanya saat:

- konflik jarang;
- update tidak terlalu sering pada entity yang sama;
- user bisa diberi pesan conflict dengan wajar;
- retry atau refresh masih acceptable;
- business flow toleran terhadap occasional conflict resolution.

Contoh:

- update profile;
- edit metadata;
- admin mengubah konfigurasi yang jarang diubah bersamaan.

## Kapan Pessimistic Locking Masuk Akal

Biasanya saat:

- konflik cukup sering;
- efek salah sangat mahal;
- resource benar-benar hot;
- operasi tidak boleh saling balapan;
- retry conflict terlalu mahal bagi bisnis.

Contoh:

- alokasi stok sangat terbatas;
- pemrosesan satu task eksklusif;
- beberapa workflow finansial tertentu.

## Conflict Frequency adalah Penentu Besar

Ini poin kunci.

Kalau konflik sangat jarang:

- pessimistic locking mungkin terlalu mahal.

Kalau konflik sangat sering:

- optimistic locking bisa membuat banyak abort/retry.

Engineer senior tidak memilih berdasarkan preferensi pribadi.
Ia melihat pattern konflik nyata.

## User Experience dari Conflict

Optimistic locking sering melempar problem ke layer atas:

- "data sudah berubah, silakan refresh";
- atau sistem merge otomatis bila masuk akal.

Ini bisa sehat.
Tetapi pada beberapa domain, UX seperti itu tidak diterima.

Kalau user tidak bisa realistis menyelesaikan conflict, mungkin Anda butuh strategi lain.

## Hot Row Problem

Entity seperti:

- satu counter global;
- satu stok item populer;
- satu saldo bersama;

bisa menjadi hot row.

Pada kasus seperti ini:

- optimistic locking bisa menyebabkan retry tinggi;
- pessimistic locking bisa menyebabkan antrean panjang.

Kadang solusi sebenarnya adalah redesign:

- partition state;
- queue serialization;
- pre-allocation;
- eventual model yang berbeda.

## Lock Duration adalah Segalanya

Pessimistic locking sangat sensitif pada durasi.
Kalau lock dipegang lama:

- contention naik cepat;
- deadlock risk naik;
- throughput turun tajam.

Jadi kalau memilih pessimistic locking:

- transaction harus ringkas;
- jangan ada network call lambat;
- jangan ada logic tak perlu di dalamnya.

## Retry Behavior

Optimistic locking biasanya butuh retry atau conflict resolution.
Pessimistic locking sering butuh timeout handling atau deadlock retry.

Jadi dua-duanya tetap memerlukan strategi failure.

Kalau tim mengira "pakai locking berarti selesai", itu naif.

## Atomic Update Bisa Lebih Baik

Kadang Anda tidak perlu optimistic atau pessimistic locking eksplisit.
Atomic statement di database bisa lebih sehat.

Contoh:

- update counter;
- decrement stock jika masih cukup;
- claim row dengan condition tertentu.

Semakin banyak invariant bisa dijaga dengan statement atomic, semakin kecil window conflict.

## Distributed System Reality

Optimistic/pessimistic locking di database hanya melindungi boundary tertentu.
Kalau workflow lintas service:

- lock DB lokal tidak otomatis cukup;
- Anda mungkin butuh idempotency, queue, outbox, atau compensation.

Jangan memperluas janji locking lebih dari scope sebenarnya.

## Monitoring yang Relevan

Untuk optimistic:

- conflict rate;
- retry rate;
- user-facing conflict occurrence.

Untuk pessimistic:

- lock wait time;
- deadlock count;
- transaction latency;
- throughput under contention.

Tanpa metrik ini, pemilihan strategi hanya asumsi.

## Anti-Pattern Umum

### 1. Pakai Pessimistic Lock untuk Semua

Sistem jadi lambat dan sulit scale.

### 2. Pakai Optimistic Lock pada Hot Row Berat

Conflict dan retry meledak.

### 3. Tidak Menangani Conflict Outcome

Version check ada, tetapi caller tidak tahu harus apa.

### 4. Menahan Lock Sambil Memanggil Dependency Eksternal

Ini desain yang buruk.

## Heuristik Senior

1. Lihat frequency conflict sebelum memilih strategi.
2. Optimistic cocok jika konflik jarang dan retry/refresh masih masuk akal.
3. Pessimistic cocok jika konflik sering dan invariant sangat sensitif.
4. Jika hot row terlalu ekstrem, pertimbangkan redesign, bukan sekadar ganti jenis lock.
5. Lock duration harus ditekan serendah mungkin.
6. Atomic SQL sering lebih baik daripada workflow aplikasi yang panjang.
7. Ukur conflict dan lock wait, jangan menebak.

## Pertanyaan Interview

### Dasar

- Apa beda optimistic dan pessimistic locking?
- Kapan optimistic locking berguna?
- Kenapa pessimistic locking bisa menurunkan throughput?
- Apa itu hot row?

### Menengah

- Bagaimana version-based update bekerja?
- Kenapa conflict resolution penting pada optimistic locking?
- Apa risiko memegang pessimistic lock terlalu lama?
- Kapan atomic SQL lebih baik daripada explicit lock?

### Senior

- Bagaimana Anda memilih strategi locking untuk inventory sangat terbatas?
- Bagaimana Anda mengevaluasi bahwa optimistic locking gagal karena conflict terlalu sering?
- Bagaimana Anda merancang UX atau API semantics untuk conflict update?
- Bagaimana Anda menjelaskan bahwa locking DB lokal tidak otomatis menyelesaikan workflow lintas service?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dua admin mengedit entity yang sama;
- stok item flash sale cepat habis;
- satu status workflow diubah dari banyak jalur;
- retry update sering gagal conflict;
- lock wait mulai tinggi di bawah traffic puncak.

## Ringkasan Brutal

- Optimistic locking membayar biaya saat conflict.
- Pessimistic locking membayar biaya di muka lewat contention.
- Keduanya valid, tidak ada yang suci.
- Hot row sering menuntut desain ulang, bukan sekadar ganti strategi lock.
- Engineer senior memilih berdasarkan konflik nyata dan invariant bisnis, bukan preferensi gaya.

## Checklist Pemahaman

- Saya bisa menjelaskan trade-off optimistic vs pessimistic locking.
- Saya tahu kapan conflict rate menjadi sinyal penting.
- Saya paham lock duration sangat menentukan biaya pessimistic locking.
- Saya tidak lupa conflict resolution saat memilih optimistic locking.
- Saya tahu atomic update kadang lebih baik dari keduanya.

## Penutup

Memilih strategi locking adalah keputusan bisnis sekaligus teknis.
Ia menentukan berapa banyak concurrency yang bisa Anda izinkan dan berapa besar biaya yang rela Anda bayar untuk menjaga kebenaran data.
