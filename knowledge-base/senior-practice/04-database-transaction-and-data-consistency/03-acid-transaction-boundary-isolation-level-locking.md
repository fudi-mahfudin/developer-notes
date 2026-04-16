# ACID, Transaction Boundary, Isolation Level, dan Locking

## Tujuan

Topik ini penting karena banyak engineer bisa menyebut ACID, tetapi gagal menjelaskan kapan transaction perlu dibuka, seberapa besar boundary yang sehat, atau kenapa locking bisa menyelamatkan sekaligus merusak throughput.

Kalau topik ini dangkal:

- transaction terlalu besar;
- lock bertahan terlalu lama;
- latency meningkat;
- data race lolos;
- bug consistency terjadi walau "sudah pakai transaction".

## Kenapa Topik Ini Penting

Sistem transaksi tidak hanya soal berhasil insert/update.
Ia soal memastikan beberapa perubahan yang saling terkait terjadi dengan cara yang benar di bawah concurrency nyata.

Tanpa pemahaman transaction boundary dan isolation:

- saldo bisa salah;
- inventory bisa oversell;
- state workflow bisa lompat;
- partial update bisa lolos saat error.

## ACID Singkat

- Atomicity
- Consistency
- Isolation
- Durability

Empat istilah ini sering dihafal.
Yang penting adalah konsekuensi operasionalnya.

## Atomicity

Atomicity berarti sekumpulan perubahan dalam transaction terjadi sebagai satu unit.
Kalau gagal di tengah, efek parsial tidak boleh dibiarkan seolah sukses.

Ini penting untuk operasi seperti:

- create order dan order items;
- debit satu akun dan kredit akun lain;
- simpan record utama dan audit terkait.

## Consistency

Consistency berarti setelah transaction selesai, data tetap memenuhi invariant yang dijaga sistem.

Catatan penting:

database membantu, tetapi consistency penuh tetap bergantung pada rule bisnis dan desain aplikasi.

## Isolation

Isolation menjawab:

- seberapa jauh transaction lain boleh melihat atau memengaruhi kerja transaction ini sebelum selesai.

Ini area paling sering disalahpahami.

## Durability

Durability berarti setelah transaction committed, hasilnya tahan terhadap crash sesuai jaminan engine/database tersebut.

Dalam praktik sistem, durability juga terkait replication, failover, dan storage guarantees.

## Model Mental yang Benar

Pegang ini:

1. Transaction adalah alat untuk menjaga sekumpulan perubahan tetap konsisten.
2. Boundary transaction yang terlalu lebar bisa sama buruknya dengan tidak ada transaction.
3. Isolation level adalah trade-off antara correctness tertentu dan concurrency.
4. Locking adalah mekanisme koordinasi, bukan default yang selalu gratis.
5. "Sudah pakai transaction" belum tentu berarti bug consistency selesai.

## Transaction Boundary

Pertanyaan inti:

- operasi mana yang benar-benar harus berhasil atau gagal bersama?

Kalau boundary terlalu sempit:

- partial state bisa lolos.

Kalau boundary terlalu lebar:

- lock lebih lama;
- contention naik;
- deadlock risk naik;
- latency naik.

## Boundary yang Sehat

Transaction sebaiknya membungkus:

- perubahan yang memang punya invariant bersama;
- langkah yang perlu atomic;
- operasi database yang harus konsisten sebagai satu unit.

Transaction sebaiknya tidak menahan:

- network call luar;
- proses yang sangat lama;
- logic yang bisa dipisah;
- user interaction step.

## Jangan Membungkus External Call di Transaction DB

Contoh buruk:

1. buka transaction;
2. insert/update data;
3. panggil third-party API lambat;
4. tunggu response;
5. commit.

Masalah:

- lock bisa tertahan lama;
- contention naik;
- failure mode rumit;
- throughput turun.

Untuk kasus lintas sistem, pattern seperti outbox atau saga sering lebih sehat.

## Isolation Level

Isolation level mengatur seberapa kuat separasi antar transaction.
Secara umum ada tingkat seperti:

- read uncommitted
- read committed
- repeatable read
- serializable

Detail perilaku berbeda antar engine, tetapi trade-off umumnya sama:

- semakin kuat isolasi, semakin sedikit anomaly;
- sering kali concurrency atau throughput tertentu ikut terpengaruh.

## Read Committed

Sering dipakai sebagai default praktis.
Ia menghindari sebagian masalah kasar seperti membaca data yang belum commit.
Tetapi masih bisa membiarkan anomaly tertentu seperti non-repeatable read atau phantom dalam konteks tertentu.

## Repeatable Read

Memberi pembacaan yang lebih stabil untuk row yang sama selama transaction tertentu.
Tetapi semantics persisnya bergantung engine.
Jangan hafal namanya saja tanpa memahami perilaku DB yang dipakai.

## Serializable

Ini level paling ketat secara konsep.
Tujuannya membuat hasil concurrent execution setara dengan serial execution tertentu.

Kelebihan:

- anomaly paling banyak dicegah.

Kekurangan:

- contention/abort bisa naik;
- throughput bisa turun;
- harus siap retry transaction tertentu.

## Locking

Locking adalah cara database atau aplikasi mengontrol akses bersamaan ke resource tertentu.

Ada beberapa bentuk:

- shared/read lock;
- exclusive/write lock;
- row-level lock;
- table-level lock;
- intent lock, tergantung engine.

Yang penting bagi engineer aplikasi:

- lock scope;
- lock duration;
- contention impact.

## Row Lock vs Table Lock

Semakin sempit lock scope, biasanya semakin baik untuk concurrency.
Tetapi tidak semua operasi selalu bisa sesempit itu.

Kalau lock meluas terlalu besar:

- request lain menunggu;
- throughput turun;
- tail latency naik.

## Lock Hold Time

Ini salah satu faktor paling penting.

Lock yang dipegang:

- selama query cepat singkat;

berbeda sangat jauh dengan lock yang dipegang:

- selama transaction panjang plus logic aplikasi.

Banyak masalah performa transaksi bukan karena lock type, tetapi karena lock duration.

## Consistency vs Throughput

Inilah trade-off nyata.

Kalau invariant sangat penting:

- lebih banyak koordinasi mungkin perlu;
- concurrency efektif turun.

Kalau concurrency sangat tinggi dikejar tanpa kontrol:

- invariant bisa bocor.

Engineer senior harus bisa menjelaskan mengapa satu operasi layak membayar biaya koordinasi lebih mahal daripada yang lain.

## Transaction Retry

Pada beberapa isolation level atau saat konflik tertentu, transaction bisa gagal dan perlu retry.
Ini berarti aplikasi harus:

- tahu kapan retry masuk akal;
- menjaga operasi tetap idempotent atau aman diulang;
- membatasi retry agar tidak memperparah beban.

"Pakai serializable" tanpa memikirkan retry adalah jawaban setengah matang.

## Locking di Application Layer vs Database

Kadang engineer mencoba mengunci di aplikasi untuk masalah yang sebenarnya lebih aman dijaga database.

Kalau correctness bergantung pada data persisted bersama lintas banyak instance, database constraint/transaction sering lebih kuat.

Application lock lokal tidak cukup untuk masalah distributed global.

## Anomaly Bukan Teori Kosong

Masalah seperti:

- dirty read;
- non-repeatable read;
- phantom;
- lost update

bukan hafalan ujian.
Mereka menjelaskan failure mode nyata saat beberapa actor mengakses data yang sama secara bersamaan.

Kalau Anda tidak bisa mengaitkan anomaly ke bug bisnis nyata, pemahaman Anda masih dangkal.

## Read-Modify-Write

Pola paling rawan:

1. baca nilai;
2. hitung hasil baru di aplikasi;
3. tulis kembali.

Kalau dilakukan tanpa proteksi:

- actor lain bisa menyela;
- lost update mudah terjadi.

Solusi bisa berupa:

- lock;
- optimistic version check;
- atomic SQL update;
- stronger isolation.

## Atomic Database Operation

Sering kali solusi terbaik bukan transaction panjang, tetapi operasi SQL yang lebih atomic.

Contoh:

- `UPDATE ... SET balance = balance - 100 WHERE ...`

daripada:

- baca balance;
- hitung di app;
- update hasil.

Semakin banyak kerja bisa didorong ke operasi atomic yang tepat, semakin kecil race window.

## Heuristik Senior

1. Transaction boundary harus sekecil mungkin tetapi cukup untuk menjaga invariant.
2. Jangan menahan transaction saat menunggu dependency luar.
3. Pilih isolation level berdasarkan anomaly yang ingin dicegah, bukan berdasarkan rasa aman abstrak.
4. Pahami biaya lock duration, bukan hanya lock existence.
5. Pertimbangkan operasi atomic di database sebelum membuat workflow aplikasi yang rapuh.
6. Ingat bahwa stronger isolation bisa berarti retry dan contention lebih tinggi.
7. Gunakan database sebagai penjaga consistency utama bila masalahnya memang ada di persistent state.

## Pertanyaan Interview

### Dasar

- Apa arti ACID secara praktis?
- Kenapa transaction boundary penting?
- Kenapa transaction terlalu besar berbahaya?
- Apa fungsi isolation level?

### Menengah

- Kapan read-modify-write menjadi berbahaya?
- Kenapa memanggil external API di dalam transaction DB sering buruk?
- Apa trade-off isolation level yang lebih tinggi?
- Mengapa lock duration penting?

### Senior

- Bagaimana Anda menentukan boundary transaction untuk workflow bisnis yang kompleks?
- Kapan Anda memilih atomic SQL update dibanding logic aplikasi plus lock?
- Bagaimana Anda menjelaskan trade-off serializable isolation kepada tim produk atau engineer lain?
- Bagaimana Anda membedakan masalah yang cukup diselesaikan di application layer dari yang harus dijaga database?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- transfer saldo;
- checkout stok terbatas;
- approval workflow multi-step;
- create entity utama plus audit row;
- sistem retry transaction saat conflict.

## Ringkasan Brutal

- Transaction adalah alat correctness, bukan selimut ajaib.
- Boundary terlalu sempit bocor; terlalu lebar mencekik throughput.
- Isolation level adalah trade-off, bukan ranking moral.
- Locking membantu consistency tetapi harus dibayar dengan contention.
- Engineer senior tahu invariant apa yang dijaga dan biaya concurrency apa yang harus dibayar.

## Checklist Pemahaman

- Saya tahu ACID secara praktis, bukan hafalan kosong.
- Saya paham boundary transaction harus sengaja dirancang.
- Saya sadar transaction tidak boleh dibuka saat menunggu network call eksternal.
- Saya tahu isolation level adalah trade-off.
- Saya mengerti atomic DB operation sering lebih aman daripada read-modify-write naif.

## Penutup

Di sistem transaksi nyata, kesalahan kecil pada boundary transaction bisa berubah menjadi incident besar.
Karena itu engineer senior tidak hanya bertanya "pakai transaction atau tidak", tetapi "transaction ini melindungi apa, berapa lama ia hidup, dan apa biaya concurrency yang sedang dibayar".
