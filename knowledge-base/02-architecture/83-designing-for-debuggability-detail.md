# Designing for Debuggability - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa arti merancang sistem agar mudah di-debug
- kenapa debuggability harus dipikir sejak desain
- bagaimana observability, clarity, dan explicit state membantu debugging
- anti-pattern saat sistem terlalu misterius saat bermasalah

Sistem yang sulit di-debug
adalah sistem yang mahal dipelihara.

Bukan hanya saat incident besar,
tapi setiap hari:
- bug lambat ditemukan
- false fix sering terjadi
- confidence tim menurun

Designing for debuggability berarti
sistem sengaja dibangun
agar perilakunya bisa ditelusuri,
dijelaskan,
dan diuji hipotesisnya
saat ada masalah.

---

## 1. Apa Itu Debuggability?

Debuggability adalah kualitas sistem
yang membuat masalah
lebih mudah:
- diamati
- dilokalisasi
- dijelaskan
- diperbaiki

Ini bukan satu tool.

Ini kombinasi dari:
- observability
- naming
- state visibility
- boundary clarity
- deterministic behavior

Sistem dengan debuggability buruk
terasa seperti teka-teki kabur.

---

## 2. Kenapa Harus Dipikir di Desain?

Karena banyak penyebab sulit debug
muncul dari keputusan arsitektur:
- hidden coupling
- async flow tak terlihat
- state tersebar
- error tidak konsisten
- context hilang di tengah

Kalau debuggability dipikir belakangan,
sering context penting sudah tidak ada,
dan perbaikannya mahal.

Debuggability adalah arsitektur concern,
bukan sekadar tooling concern.

---

## 3. Clear Boundaries Help Debugging

Kalau boundary komponen jelas,
debugging lebih cepat
karena tim bisa bertanya:
- error ini kemungkinan di layer mana?
- data rusak sebelum atau sesudah boundary ini?

Kalau semuanya saling bocor,
setiap bug terasa bisa berasal dari mana saja.

Boundary clarity
adalah salah satu alat debug terbaik,
meski jarang dipuji secara eksplisit.

---

## 4. Explicit State Helps

State yang jelas
mempermudah menjawab:
- sekarang sistem ada di kondisi apa?
- kenapa aksi ini ditolak?
- transisi apa yang sudah terjadi?

Jika state tersembunyi
atau implicit di banyak tempat,
debugging jadi berat.

Sistem debug-friendly
lebih suka state yang eksplisit
daripada side effect samar.

---

## 5. Correlation Context

Banyak bug sulit dilacak
karena context hilang antar hop.

Contoh context penting:
- request id
- trace id
- tenant id
- actor id
- workflow id

Tanpa ini,
log dan event terlihat terpisah.

Debuggability meningkat drastis
jika context dibawa konsisten
melewati boundary penting.

---

## 6. Stable Naming and Semantics

Nama event, metric, status, dan method
yang buruk
membuat debugging lebih mahal.

Contoh buruk:
- `process()`
- `done`
- `updated`

Nama yang kabur
memaksa engineer menebak maksud.

Debuggability yang baik
bergantung pada vocabulary sistem
yang cukup presisi.

---

## 7. Determinism Matters

Semakin nondeterministic sistem,
semakin sulit di-debug.

Penyebab umum:
- implicit time dependency
- random behavior tanpa kontrol
- race condition
- hidden cache state
- duplicate async handling

Tidak semua nondeterminism bisa dihilangkan,
tapi desain yang baik
berusaha membatasi dan memperjelasnya.

---

## 8. Healthcare Example

Misal bug:
- reminder pasien kadang tidak terkirim

Sistem yang debug-friendly harus membantu menjawab:
- event `AppointmentCreated` dipublish tidak?
- outbox row ada tidak?
- worker memproses tidak?
- provider menolak tidak?
- retry sudah berapa kali?

Kalau jawaban untuk hal-hal ini
tidak mudah didapat,
arsitektur reminder-nya belum debug-friendly.

---

## 9. Async Flow Is a Debug Trap

Async system memberi fleksibilitas,
tapi juga sering merusak debuggability
jika tidak disiplin.

Perlu jelas:
- event apa memicu apa
- job mana menghasilkan side effect apa
- retry/duplicate apa terjadi

Async flow yang tidak bisa ditelusuri
akan memakan banyak jam engineering.

---

## 10. Error Messages and Error Types

Error yang terlalu umum
membuat debugging lambat.

Contoh buruk:
- `Something went wrong`
- `Unknown error`

Sistem yang debug-friendly
punya error classification yang cukup jelas:
- validation error
- transient dependency failure
- authorization denial
- concurrency conflict

Bukan untuk user saja,
tapi juga untuk engineer dan operator.

---

## 11. Intermediate Visibility

Kadang penting tahu
langkah-langkah antara input dan output.

Contoh:
- command diterima
- outbox ditulis
- message dipublish
- consumer start
- consumer success/fail

Intermediate visibility seperti ini
sangat membantu isolasi masalah.

Kalau sistem hanya log awal dan akhir,
tengahnya menjadi area gelap.

---

## 12. Avoid Too Much Magic

Magic framework, implicit wiring,
decorator chain tak terlihat,
global state,
container resolution yang kabur
semuanya bisa membuat debugging berat.

Abstraction boleh,
tapi jika abstraction menghilangkan
jalur reasoning manusia,
biaya debug naik.

Debuggability butuh keseimbangan
antara elegance dan explicitness.

---

## 13. Anti-Pattern Umum

1. Hidden control flow dan hidden dependency.
2. Async processing tanpa correlation context.
3. Error classification sangat kabur.
4. State penting tidak terlihat.
5. Terlalu banyak framework magic yang sulit ditelusuri.

---

## 14. Best Practices

- bawa correlation context lintas boundary penting.
- buat state dan transition cukup eksplisit.
- gunakan naming yang presisi untuk event, status, dan errors.
- minimalkan hidden flow dan hidden dependency.
- ukur dan log langkah antara yang penting pada workflow kompleks.

---

## 15. Pertanyaan Desain Penting

Sebelum menyetujui desain, tanya:
1. Jika bug muncul, bagaimana kita akan melokalisasi layer yang salah?
2. Context apa yang perlu ikut dibawa?
3. State penting apa yang harus terlihat?
4. Seberapa banyak flow yang tersembunyi di balik abstraction?
5. Apa hal paling membingungkan untuk engineer baru saat sistem ini gagal?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu bug production lama dan analisis kenapa lama didiagnosis.
2. Tandai context apa yang hilang.
3. Tambahkan state/trace/logging yang akan mempercepat diagnosis di masa depan.
4. Cari abstraction "magis" yang sulit ditelusuri.
5. Buat checklist debug-readiness untuk workflow async penting.

---

## 17. Checklist Kelulusan Topik Designing for Debuggability

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat debuggability sebagai kualitas desain, bukan bonus tooling,
- menjaga boundary, state, dan context tetap cukup eksplisit,
- merancang sistem yang lebih mudah ditelusuri saat gagal,
- mengurangi hidden flow dan magic berlebihan,
- memikirkan kebutuhan engineer on-call sebagai pengguna sistem.

---

## 18. Ringkasan Brutal

- Sistem yang sulit di-debug
  akan selalu terasa lebih mahal dari seharusnya.
- Keindahan abstraction tidak ada gunanya
  kalau saat rusak tak seorang pun tahu jalurnya.
