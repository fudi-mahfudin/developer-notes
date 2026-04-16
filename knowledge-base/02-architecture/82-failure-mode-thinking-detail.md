# Failure Mode Thinking - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu failure mode thinking
- kenapa sistem perlu didesain dengan asumsi kegagalan nyata
- bagaimana memetakan cara-cara sistem bisa gagal
- bagaimana pola pikir ini memengaruhi desain arsitektur dan operasi

Failure mode thinking
adalah salah satu tanda kematangan teknis.

Engineer junior sering bertanya:
- "bagaimana ini bekerja saat normal?"

Engineer senior bertanya juga:
- "bagaimana ini gagal?"
- "dan seperti apa kegagalan itu terasa?"

Karena banyak sistem
baru tampak kualitas aslinya
saat sesuatu mulai rusak.

---

## 1. Apa Itu Failure Mode Thinking?

Ini adalah kebiasaan
memikirkan cara-cara
suatu komponen, alur, atau sistem
bisa gagal.

Bukan hanya:
- "apakah bisa gagal?"

melainkan:
- gagal seperti apa?
- di titik mana?
- efeknya apa?
- siapa yang terdampak?
- bagaimana terdeteksi?
- bagaimana dipulihkan?

Ini membuat desain lebih realistis.

---

## 2. Kenapa Ini Penting?

Karena sistem nyata
tidak gagal hanya satu cara.

Kegagalan bisa berupa:
- timeout
- stale data
- duplicate processing
- partial success
- wrong order
- queue backlog
- dependency unreachable
- slow degradation

Kalau tim hanya memikirkan "error atau tidak",
arsitekturnya terlalu dangkal.

---

## 3. Happy Path Bias

Bias paling umum:
- desain hanya untuk happy path

Ini membuat code demo terasa indah,
tapi operasi produksi menyakitkan.

Happy path bias menghasilkan:
- rollback tidak jelas
- timeout tidak dipikir
- duplicate handling tidak ada
- observability minim

Failure mode thinking memaksa kita
keluar dari bias itu.

---

## 4. Failure Is Not Binary

Sistem tidak hanya:
- up
- down

Ada banyak kegagalan parsial:
- service hidup tapi lambat
- data masuk tapi sinkronisasi tertinggal
- write sukses tapi notification gagal
- sebagian tenant terdampak, sebagian tidak

Failure mode thinking yang sehat
melihat spektrum ini,
bukan hanya status merah/hijau.

---

## 5. Typical Failure Modes

Beberapa failure mode umum:
- request timeout
- duplicate message
- partial transaction completion
- stale cache read
- out-of-order event
- dependency rate-limited
- retry storm
- configuration drift

Setiap sistem punya kombinasi sendiri.

Tugas arsitek/senior engineer
bukan menghafal daftar,
tapi belajar mengenali pola yang relevan.

---

## 6. Blast Radius Thinking

Failure mode thinking juga bertanya:
- jika ini gagal, seberapa luas dampaknya?

Ini berkaitan dengan:
- isolation
- tenancy
- service boundary
- fallback

Kegagalan kecil
tidak seharusnya selalu menjatuhkan seluruh sistem.

Kalau satu dependency opsional down
lalu semua user journey ikut rusak,
desainnya belum sehat.

---

## 7. Detection Matters

Failure yang tidak terdeteksi cepat
sering lebih berbahaya
daripada failure yang keras tapi jelas.

Contoh:
- projection tertinggal pelan-pelan
- queue menumpuk diam-diam
- stale cache leak
- audit trail berhenti masuk

Failure mode thinking harus selalu bertanya:
- bagaimana kita tahu ini terjadi?

Kalau jawabannya tidak ada,
itu masalah desain.

---

## 8. Recovery Matters Too

Tidak cukup tahu failure mode.

Harus dipikirkan juga:
- recovery path-nya apa?
- otomatis atau manual?
- reversible atau tidak?

Misal:
- duplicate event processed
- bagaimana repair-nya?

Failure mode thinking tanpa recovery thinking
hanya setengah matang.

---

## 9. Healthcare Example

Pada workflow booking appointment,
failure mode yang mungkin:
- slot terbaca kosong padahal sudah diambil user lain
- payment reserve sukses, booking save gagal
- booking save sukses, reminder gagal
- sync ke sistem partner tertunda

Setiap mode punya:
- dampak berbeda
- observability berbeda
- recovery berbeda

Ini contoh mengapa
gagal tidak pernah "satu jenis".

---

## 10. Design Consequences

Jika failure mode dipikir serius,
desain bisa berubah:
- pakai idempotency
- tambahkan outbox
- tambah timeout
- pilih graceful degradation
- kecilkan blast radius
- buat health/readiness yang lebih tepat

Failure mode thinking
bukan aktivitas filosofis.
Ia harus mengubah desain nyata.

---

## 11. Pre-Mortem Mindset

Salah satu latihan bagus:
- anggap sistem ini gagal di produksi
- kira-kira gagal bagaimana?

Lalu tanya:
- kegagalan paling mungkin apa?
- paling mahal apa?
- paling sulit dideteksi apa?

Ini membantu tim
memprioritaskan risiko yang benar,
bukan hanya yang paling dramatis di kepala.

---

## 12. Hidden Failure Is Expensive

Kegagalan yang diam-diam
sering lebih mahal
daripada error keras.

Karena:
- user mungkin sudah membuat keputusan dari data salah
- tim baru sadar terlambat
- blast radius membesar sebelum mitigasi

Failure mode thinking matang
secara alami sangat menghargai observability.

---

## 13. Anti-Pattern Umum

1. Mendesain hanya untuk happy path.
2. Menganggap semua kegagalan hanya berupa exception langsung.
3. Tidak memikirkan partial failure.
4. Tidak menghubungkan failure mode dengan detection dan recovery.
5. Hanya membahas failure saat incident sudah terjadi.

---

## 14. Best Practices

- biasakan bertanya "bagaimana ini gagal?" pada desain penting.
- petakan failure mode, blast radius, detection, dan recovery.
- prioritaskan failure yang paling mungkin atau paling mahal.
- gunakan hasil analisis untuk mengubah desain konkret.
- lakukan pre-mortem sebelum sistem terlalu besar untuk diubah murah.

---

## 15. Pertanyaan Desain Penting

Sebelum menyetujui desain, tanya:
1. Failure mode paling mungkin apa?
2. Failure mode paling mahal apa?
3. Mana yang paling sulit dideteksi?
4. Bagaimana mitigasi dan recovery-nya?
5. Apa yang harus berubah di desain agar kegagalan itu lebih aman?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu workflow penting dan tulis minimal 7 failure mode.
2. Kelompokkan failure mode menjadi immediate, partial, dan hidden.
3. Tulis bagaimana masing-masing dideteksi.
4. Tulis recovery path untuk tiga yang paling kritikal.
5. Ubah satu keputusan desain setelah latihan ini.

---

## 17. Checklist Kelulusan Topik Failure Mode Thinking

Kamu dianggap lulus topik ini jika sudah bisa:
- memandang kegagalan sebagai spektrum, bukan biner,
- memetakan failure mode penting pada sistem,
- menghubungkan failure dengan blast radius, detection, dan recovery,
- memakai analisis itu untuk memperbaiki desain,
- menghindari happy-path-only architecture.

---

## 18. Ringkasan Brutal

- Sistem yang tampak rapi di happy path
  bisa tetap jelek secara arsitektur.
- Kualitas desain terlihat jelas
  saat kita bertanya bagaimana ia gagal.
- Kalau pertanyaan itu jarang diajukan,
  masalahnya hanya menunggu giliran muncul.
