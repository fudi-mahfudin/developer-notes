# Deadlock, Phantom Read, Dirty Read, dan Lost Update

## Tujuan

Topik ini penting karena banyak bug consistency tidak muncul saat local testing sederhana.
Ia muncul saat concurrency nyata di production.

Istilah seperti deadlock, phantom read, dirty read, dan lost update sering dihafal.
Tetapi engineer senior harus bisa menghubungkannya ke failure mode bisnis yang konkret.

## Kenapa Topik Ini Penting

Kalau Anda tidak paham anomaly concurrency:

- tim akan bingung kenapa data kadang salah "secara acak";
- retry bisa diterapkan di tempat yang salah;
- lock ditambah tanpa memahami masalah;
- bug hanya terlihat saat load naik.

Ini jenis masalah yang mahal karena reproduksinya sulit dan dampaknya langsung ke integritas data.

## Model Mental yang Benar

Pegang ini:

1. Concurrency anomaly adalah perilaku sistem, bukan bug sintaks.
2. Mereka muncul dari interleaving transaction yang sah menurut isolation tertentu.
3. Nama anomaly penting hanya jika Anda paham akibat bisnisnya.
4. Solusi bisa berupa isolation, locking, atomic update, atau redesign workflow.
5. Tidak semua anomaly perlu dibayar dengan isolation tertinggi.

## Dirty Read

Dirty read terjadi saat satu transaction membaca data yang ditulis transaction lain sebelum transaction itu commit.

Masalahnya:

- pembaca bisa melihat data yang nanti ternyata di-rollback;
- keputusan berikutnya dibangun di atas data semu.

Dalam banyak sistem modern, dirty read biasanya dihindari oleh isolation default yang cukup masuk akal.
Tetapi konsepnya tetap penting untuk memahami spektrum isolation.

## Contoh Dirty Read

1. Transaction A update saldo sementara;
2. Transaction B membaca saldo baru itu;
3. Transaction A rollback;
4. Transaction B sudah telanjur mengambil keputusan salah.

Ini jelas buruk untuk domain keuangan, approval, inventory, dan hampir semua sistem penting.

## Non-Repeatable Read

Istilah ini tidak diminta eksplisit di judul, tetapi penting sebagai penghubung.

Ini terjadi saat:

1. transaction membaca row;
2. transaction lain commit perubahan pada row itu;
3. pembacaan ulang di transaction pertama mendapat nilai berbeda.

Kadang ini bisa diterima.
Kadang tidak.
Tergantung invariant yang sedang dijaga.

## Phantom Read

Phantom read terjadi saat:

1. transaction menjalankan query dengan kondisi tertentu;
2. transaction lain insert/delete row yang memenuhi kondisi itu;
3. query yang sama di transaction pertama menghasilkan set row berbeda.

Masalahnya bukan satu row berubah.
Masalahnya adalah himpunan hasil berubah.

## Contoh Phantom

Bayangkan transaction A menghitung:

- semua booking untuk slot waktu tertentu.

Sebelum A selesai memutuskan kapasitas masih ada, transaction B menambah booking baru pada slot yang sama.
Saat A cek ulang atau commit logika berikutnya, dunia sudah berubah.

Kalau aturan kapasitas tidak dilindungi dengan benar, oversubscription bisa terjadi.

## Lost Update

Ini salah satu anomaly paling penting secara bisnis.

Terjadi saat:

1. dua actor membaca nilai lama yang sama;
2. keduanya menghitung perubahan sendiri;
3. salah satu update menimpa yang lain;
4. satu perubahan "hilang".

Contoh:

- stok;
- saldo;
- counter;
- status agregat;
- kuota.

## Lost Update Bukan Teori

Contoh sederhana:

saldo awal `100`.

Transaction A:

- baca `100`;
- kurangi `10`;
- mau tulis `90`.

Transaction B:

- baca `100`;
- kurangi `20`;
- mau tulis `80`.

Kalau B menulis terakhir, update A hilang.
Saldo akhir salah.

## Deadlock

Deadlock terjadi saat dua atau lebih transaction saling menunggu resource yang dikunci pihak lain, dan tidak ada yang bisa maju.

Contoh mental:

- A pegang lock row 1, menunggu row 2;
- B pegang lock row 2, menunggu row 1.

Database biasanya akan mendeteksi situasi ini dan memaksa salah satu transaction gagal agar sistem bisa lanjut.

## Deadlock Bukan Bukti DB Rusak

Deadlock adalah sinyal bahwa pola akses bersamaan Anda saling bentrok.
Ia sering muncul karena:

- urutan locking tidak konsisten;
- transaction terlalu lama;
- update pada resource sama terjadi dalam pola berlawanan;
- batch process dan request online berebut resource.

Solusinya bukan marah pada database.
Solusinya adalah perbaiki pola concurrency.

## Dirty Read vs Lost Update

Penting dibedakan:

- dirty read adalah masalah membaca data belum commit;
- lost update adalah masalah perubahan yang saling menimpa.

Dua hal ini berbeda akar dan solusi.

## Phantom vs Lost Update

Phantom berhubungan dengan perubahan himpunan hasil query.
Lost update berhubungan dengan update nilai yang bertumpuk salah.

Kalau Anda menyebut semua bug concurrent sebagai "race condition" tanpa klasifikasi, diagnosis Anda jadi kabur.

## Mengapa Ini Sulit Dideteksi

Karena:

- tidak selalu muncul;
- butuh timing tertentu;
- load kecil sering tidak memicu;
- local dev jarang mereplikasi concurrency nyata;
- logs biasa sering tidak cukup.

Karena itu engineer senior harus punya model mental sebelum bug datang.

## Cara Mengurangi Lost Update

Pilihan umum:

- optimistic locking dengan version check;
- pessimistic lock;
- atomic update SQL;
- stronger isolation jika memang perlu.

Tidak ada satu solusi universal.

## Cara Mengurangi Phantom

Tergantung invariant:

- lock yang lebih tepat;
- serializable isolation;
- range locking pada engine tertentu;
- redesign workflow;
- materialized decision boundary yang lebih aman.

Yang jelas, query set-based invariants perlu perhatian khusus.

## Cara Mengurangi Deadlock

Pendekatan umum:

- konsisten urutan akses resource;
- perkecil transaction duration;
- hindari lock tak perlu;
- pecah operasi besar jika masuk akal;
- retry transaction yang gagal deadlock dengan batas sehat.

## Retry Setelah Deadlock

Deadlock biasanya salah satu kasus di mana retry bisa masuk akal.
Tetapi:

- operasi harus aman diulang;
- retry harus terbatas;
- observability harus mencatat frekuensi deadlock.

Kalau deadlock sering terjadi, retry bukan root fix.
Ia hanya mitigasi sementara.

## Isolation Level dan Anomaly

Secara umum:

- isolation lemah membiarkan lebih banyak anomaly;
- isolation kuat mencegah lebih banyak anomaly tetapi bisa menambah cost concurrency.

Pertanyaan senior:

- anomaly mana yang benar-benar tidak boleh terjadi di use case ini?

Bukan:

- "pakai level tertinggi saja biar aman."

## Application Logic yang Memperparah Masalah

Pattern berbahaya:

- baca data;
- lakukan logika panjang di app;
- panggil service lain;
- lalu write balik.

Semakin lama jendela antara read dan write, semakin besar peluang anomaly.

## Constraint dan Invariant

Kadang solusi terbaik adalah memindahkan invariant ke database:

- unique constraint;
- check constraint;
- atomic statement;
- proper lock scope.

Semakin banyak invariant bisa dijaga dekat data, semakin kecil kemungkinan bug bocor karena race di aplikasi.

## Observability untuk Masalah Ini

Yang perlu diamati:

- lock wait time;
- deadlock frequency;
- transaction retry count;
- conflict rate;
- error khusus serializable/deadlock;
- throughput vs contention.

Tanpa observability ini, tim sering mengira bug data adalah bug acak.

## Heuristik Senior

1. Kenali anomaly berdasarkan dampak bisnisnya.
2. Lost update adalah risiko default pada read-modify-write naif.
3. Deadlock biasanya menunjukkan pola lock order yang buruk atau transaction terlalu lama.
4. Phantom penting saat invariant berbasis himpunan row, bukan hanya satu row.
5. Retry deadlock boleh, tetapi frekuensi tinggi adalah bau desain.
6. Jangan memilih isolation level tanpa tahu anomaly apa yang ingin dicegah.
7. Atomic SQL dan constraint sering lebih kuat daripada logic aplikasi yang panjang.

## Pertanyaan Interview

### Dasar

- Apa itu dirty read?
- Apa itu phantom read?
- Apa itu lost update?
- Apa itu deadlock?

### Menengah

- Kenapa lost update sering muncul pada pola read-modify-write?
- Kenapa phantom penting untuk inventory atau booking system?
- Bagaimana deadlock bisa terjadi walaupun query individual tampak benar?
- Kapan retry setelah deadlock masuk akal?

### Senior

- Bagaimana Anda memilih solusi berbeda untuk lost update vs phantom?
- Bagaimana Anda mendesain transaction agar risiko deadlock lebih rendah?
- Bagaimana Anda menjelaskan trade-off isolation kepada engineer aplikasi lain?
- Bagaimana Anda menggunakan observability untuk membuktikan bahwa incident data berasal dari concurrency anomaly tertentu?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- stok tiba-tiba negatif;
- booking melebihi kapasitas;
- update user profile tertentu "hilang";
- job batch dan request API saling deadlock;
- retry transaction serializable mulai meningkat saat traffic naik.

## Ringkasan Brutal

- Dirty read, phantom, deadlock, dan lost update bukan istilah teori kosong.
- Mereka menjelaskan kenapa data bisa salah walaupun semua query tampak benar sendiri-sendiri.
- Lost update dan deadlock adalah kejadian yang sangat nyata di production.
- Isolation yang tepat harus dipilih berdasarkan anomaly yang benar-benar berbahaya.
- Engineer senior tidak puas dengan label "race condition"; ia ingin tahu race jenis apa dan invariant mana yang bocor.

## Checklist Pemahaman

- Saya bisa membedakan dirty read, phantom, deadlock, dan lost update.
- Saya paham lost update sangat terkait dengan read-modify-write.
- Saya tahu deadlock sering berkaitan dengan lock order dan transaction duration.
- Saya sadar phantom penting untuk invariant berbasis set/query result.
- Saya tahu retry deadlock bukan pengganti desain yang sehat.

## Penutup

Begitu Anda memahami anomaly concurrency sebagai sesuatu yang konkret, banyak bug "acak" tiba-tiba menjadi sangat masuk akal.
Dan dari sana, solusi Anda juga jadi jauh lebih tajam.
