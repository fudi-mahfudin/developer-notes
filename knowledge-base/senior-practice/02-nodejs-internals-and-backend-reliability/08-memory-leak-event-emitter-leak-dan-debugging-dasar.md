# Memory Leak, Event Emitter Leak, dan Debugging Dasar

## Tujuan

Topik ini penting karena banyak service Node.js tampak sehat saat baru start, tetapi memburuk perlahan seiring waktu.
Memory usage naik, latency melonjak sesekali, restart sementara "menyelesaikan" masalah, lalu siklus itu terulang.

Kalau Anda tidak paham memory leak dan event emitter leak, Anda akan:

- salah menyalahkan database atau traffic;
- mengobati gejala dengan restart terus-menerus;
- sulit menjelaskan kenapa heap terus tumbuh;
- tidak tahu cara mengisolasi object yang tertahan;
- mengabaikan warning penting dari runtime.

## Kenapa Topik Ini Penting

Node.js memakai garbage collection.
Banyak developer salah kaprah bahwa dengan GC, memory leak tidak perlu dikhawatirkan.
Itu salah.

GC hanya membersihkan object yang tidak lagi reachable.
Kalau reference masih tertahan:

- cache tidak dibatasi;
- listener tidak dilepas;
- closure menyimpan data besar;
- map global tumbuh tanpa kontrol;

maka memory tetap bocor secara efektif.

## Definisi Singkat

Memory leak adalah kondisi ketika memory yang tidak lagi berguna bagi bisnis tetap tertahan dan tidak dibebaskan, sehingga footprint terus tumbuh atau tetap terlalu tinggi.

Event emitter leak adalah salah satu bentuk umum leak di Node.js, ketika listener terus ditambahkan ke emitter tanpa dibersihkan dengan benar.

## Model Mental yang Benar

Pegang ini:

1. Memory leak di GC language biasanya berarti retained reference, bukan "malloc tanpa free" manual.
2. Leak bisa lambat dan bertahap, tidak selalu meledak langsung.
3. Event emitter leak adalah sinyal desain lifecycle yang buruk.
4. Restart bisa menyamarkan leak, bukan memperbaikinya.
5. Debugging leak butuh bukti runtime, bukan tebakan.

## Tanda-Tanda Memory Leak

Gejala umum:

- RSS atau heap terus naik seiring waktu;
- GC makin sering atau makin berat;
- latency spike periodik;
- service pulih sementara setelah restart;
- OOM kill pada beban tertentu;
- throughput turun setelah service hidup lama.

Tidak semua kenaikan memory berarti leak.
Tetapi pola pertumbuhan yang tidak kembali turun patut dicurigai.

## Heap Growth vs Working Set

Penting membedakan:

- working set yang memang stabil tetapi besar;
- growth yang tidak terkendali;
- spike sementara lalu turun;
- cache yang sengaja ditahan tetapi tak dibatasi.

Kalau Anda menyebut semua kenaikan memory sebagai leak, diagnosis Anda dangkal.

## Sumber Leak Umum di Node.js

### 1. Cache Tanpa Batas

Misalnya:

- `Map` global terus diisi;
- memoization tanpa eviction;
- response cache tak punya TTL;
- object besar disimpan "sementara" tapi tak pernah dibuang.

Ini leak klasik.

### 2. Event Listener Tidak Dibersihkan

Kalau listener ditambahkan berulang pada object/connection/request tertentu tetapi tidak pernah dihapus, memory dan callback count akan bertambah terus.

### 3. Closure Menahan Data Besar

Factory atau callback menyimpan reference ke object besar yang sudah tidak perlu.

### 4. Timer atau Interval yang Tertinggal

`setInterval` yang tidak di-clear bisa mempertahankan closure dan kerja yang sebenarnya sudah tak relevan.

### 5. Queue atau Buffer Tumbuh Tak Terkontrol

Backpressure buruk sering berubah menjadi memory leak operasional.

### 6. Global State Bertambah Terus

Misalnya registry, correlation map, atau pending request tracker yang tidak pernah dibersihkan.

## EventEmitter Leak

Node.js punya warning seperti `MaxListenersExceededWarning`.
Banyak engineer mengabaikannya atau langsung menaikkan limit.
Itu sering salah.

Warning itu biasanya sinyal:

- listener ditambahkan berulang;
- lifecycle cleanup hilang;
- satu emitter dipakai di pola yang tidak sehat.

Menambah `setMaxListeners()` tanpa root cause analysis sering hanya mematikan alarm.

## Contoh Mental Event Emitter Leak

Setiap request:

- menambah listener pada emitter global;
- tetapi listener tidak pernah dilepas saat request selesai.

Setelah ribuan request:

- listener menumpuk;
- memory naik;
- callback cost bertambah;
- warning muncul.

Ini bukan noise.
Ini bug nyata.

## Leak Tidak Selalu Datang dari Satu Tempat

Sering kali leak muncul dari kombinasi:

- cache tidak dibatasi;
- timer tidak dibersihkan;
- pending promise map tidak dihapus saat timeout;
- listener tertinggal pada socket lama.

Karena itu debugging leak butuh pendekatan sistematis.

## Garbage Collection dan Ilusi Aman

GC membantu, tetapi juga bisa menipu observasi.

Misalnya:

- memory naik, lalu turun sedikit setelah GC;
- developer merasa "berarti aman";
- padahal baseline minimum terus merayap naik.

Yang harus dilihat bukan hanya spike.
Lihat tren pasca-GC dari waktu ke waktu.

## Heap vs RSS

Di Node.js, heap JavaScript bukan satu-satunya memory.
Ada juga:

- native memory;
- buffer;
- addon allocation;
- overhead runtime;
- memory dari library tertentu.

Kalau RSS tinggi tetapi heap snapshot tidak menjelaskan semuanya, curigai area di luar heap JS murni.

## Debugging Dasar: Mulai dari Gejala

Jangan langsung loncat ke tool canggih.
Mulai dari:

- kapan leak muncul;
- traffic pattern apa yang memicunya;
- endpoint apa yang paling terkait;
- apakah restart langsung mengurangi memory;
- apakah growth linear, stepwise, atau bursty.

Ini membantu menyempitkan hipotesis.

## Metrics yang Perlu Dilihat

- heap used;
- heap total;
- RSS;
- external memory bila tersedia;
- GC pause/frequency;
- event loop lag;
- request volume;
- endpoint distribution;
- queue depth;
- active handles.

Tanpa metrik dasar ini, Anda men-debug sambil menutup mata.

## Heap Snapshot

Heap snapshot adalah alat penting untuk melihat object apa yang tertahan.
Tujuan utamanya:

- lihat dominator object;
- lihat retained size;
- cari collection yang tumbuh;
- cari path reference kenapa object belum dibebaskan.

Tetapi snapshot besar perlu dibaca dengan disiplin.
Kalau Anda tidak tahu apa yang dicari, hasilnya hanya dump besar yang membingungkan.

## Compare Snapshot

Sering lebih berguna membandingkan:

- baseline setelah start;
- setelah workload tertentu;
- setelah GC;
- setelah beberapa jam.

Perbandingan ini membantu melihat class/object mana yang terus bertambah.

## Leak Reproduction

Debugging akan lebih cepat jika Anda bisa mereproduksi leak secara deterministik atau semi-deterministik.

Misalnya:

- panggil endpoint tertentu 10.000 kali;
- simulasikan koneksi websocket buka-tutup;
- kirim payload besar berulang;
- trigger timeout flow.

Kalau reproduction tidak ada, Anda akan terlalu bergantung pada tebakan production.

## Event Listener Inspection

Untuk event emitter leak, pertanyaan penting:

- listener ditambahkan di mana?
- kapan seharusnya dihapus?
- apakah per-request atau global?
- apakah object emitter punya lifecycle panjang?

Pola sehat:

- tambahkan listener sekali untuk lifecycle yang benar;
- bersihkan pada close/end/destroy/unmount equivalent.

## Active Handles dan Resource Leak

Kadang masalah bukan hanya heap object.
Bisa juga active handle yang tidak selesai:

- timer;
- socket;
- file handle;
- interval;
- open stream.

Ini bisa membuat process tidak keluar bersih atau menjaga memory/context tetap hidup.

## Cache: Leak atau Design?

Cache besar tidak selalu leak.
Tetapi cache tanpa:

- size limit;
- TTL;
- eviction policy;
- observability

cepat berubah menjadi leak fungsional.

Kalau cache memakan memory dan tidak ada kontrol, dari sudut operasional itu sama buruknya.

## Pending Promise Map

Pola yang sering bermasalah:

- simpan resolver atau metadata per request dalam map;
- hapus saat sukses;
- lupa hapus saat timeout atau error.

Akibatnya pending map tumbuh terus.
Ini leak yang sangat realistis di integrasi dan correlation-based flow.

## Stream dan Buffer Leak

Kalau stream tidak ditutup atau error path tidak dibersihkan:

- buffer bisa tertahan;
- file handle/sockets tetap hidup;
- memory naik bersama backlog.

Kesalahan di error path sering lebih sering jadi sumber leak daripada happy path.

## Debugging Dasar yang Sehat

Urutannya:

1. konfirmasi ada pertumbuhan memory yang mencurigakan;
2. ukur metrik heap/RSS/GC;
3. cari correlation dengan traffic atau endpoint;
4. reproduksi bila bisa;
5. ambil heap snapshot atau inspeksi listener/handle;
6. validasi hipotesis dengan perbaikan kecil;
7. ukur ulang setelah fix.

Kalau Anda lompat langsung ke patch tanpa bukti, Anda sedang menebak.

## Fix yang Sering Tepat

- tambahkan eviction pada cache;
- bersihkan listener setelah selesai;
- `clearInterval` dan `clearTimeout`;
- hapus entry map pada sukses, gagal, dan timeout;
- batasi backlog/queue;
- gunakan stream dengan backpressure benar;
- pastikan cleanup ada di `finally`.

## Fix yang Sering Salah

- restart lebih sering;
- naikkan memory limit tanpa root cause;
- `setMaxListeners(Infinity)`;
- menonaktifkan warning;
- mengurangi observability agar "tidak berisik".

Semua itu hanya menyembunyikan gejala.

## Memory Leak dan Throughput

Leak bukan cuma soal OOM.
Sebelum crash, Anda bisa kena:

- GC lebih sering;
- pause lebih panjang;
- latency naik;
- throughput turun;
- jitter makin buruk.

Jadi leak sering merusak performa jauh sebelum mematikan process.

## Heuristik Senior

1. Anggap warning emitter sebagai sinyal, bukan noise.
2. Bedakan cache terkontrol dari leak terselubung.
3. Debugging leak harus berbasis metrik dan snapshot, bukan intuisi saja.
4. Cek error path dan timeout path, bukan hanya happy path.
5. Cleanup resource harus ada untuk success, failure, dan cancel.
6. Jangan mematikan warning demi ketenangan palsu.
7. Restart boleh jadi mitigasi sementara, bukan solusi.

## Pertanyaan Interview

### Dasar

- Apa itu memory leak di environment dengan garbage collector?
- Kenapa `MaxListenersExceededWarning` penting?
- Apa contoh sumber leak umum di Node.js?
- Kenapa restart bukan solusi root cause?

### Menengah

- Bagaimana Anda membedakan cache besar dari memory leak?
- Kenapa listener per request pada emitter global berbahaya?
- Metrics apa yang Anda lihat saat mencurigai leak?
- Apa gunanya heap snapshot?

### Senior

- Bagaimana Anda menyusun langkah debugging leak dari production symptom sampai fix validation?
- Bagaimana Anda menangani kasus RSS tinggi tetapi heap JS tidak terlalu besar?
- Bagaimana event emitter leak bisa memengaruhi performa selain memory?
- Bagaimana Anda mendesain cleanup yang aman untuk async flow yang bisa timeout atau cancel?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- service makin berat setelah hidup beberapa jam;
- deploy ulang sementara "menyembuhkan" gejala;
- warning listener meningkat saat traffic tertentu;
- job correlation map tumbuh tak pernah turun;
- WebSocket atau SSE connection menambah listener dan timer yang tidak dibersihkan.

## Ringkasan Brutal

- GC tidak membuat Anda kebal dari leak.
- Leak di Node.js biasanya berarti reference tertahan terlalu lama.
- Event emitter leak adalah warning penting, bukan kosmetik.
- Restart hanya menyapu debu ke bawah karpet.
- Kalau Anda tidak bisa membaca gejala memory dan menghubungkannya ke lifecycle object, debugging Anda masih reaktif.

## Checklist Pemahaman

- Saya tahu source leak umum di Node.js.
- Saya paham warning emitter harus diinvestigasi.
- Saya bisa membedakan heap growth normal dari pola leak mencurigakan.
- Saya tahu pentingnya cleanup di success, error, dan timeout path.
- Saya mengerti kapan memakai heap snapshot dan metrics.
- Saya tidak lagi menganggap restart sebagai solusi.

## Penutup

Memory leak dan event emitter leak adalah jenis masalah yang sering mempermalukan service yang tampak "baik-baik saja" saat baru start.
Engineer senior tidak puas ketika restart membuat grafik turun.
Ia ingin tahu kenapa memory naik, siapa yang menahan referensi, dan bagaimana memastikan masalah itu tidak kembali.
