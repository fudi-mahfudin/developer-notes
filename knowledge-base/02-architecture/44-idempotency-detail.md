# Idempotency - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu idempotency
- kenapa idempotency penting di sistem terdistribusi
- hubungan idempotency dengan retry, duplicate delivery, dan API design
- kapan operasi harus dirancang idempotent
- anti-pattern umum terkait idempotency

Idempotency adalah konsep
yang sering terdengar akademis,
padahal sangat praktis.

Begitu sistem menghadapi:
- retry
- timeout ambigu
- duplicate request
- duplicate message

idempotency berubah
dari konsep bagus
menjadi alat bertahan hidup.

---

## 1. Apa Itu Idempotency?

Secara sederhana:
- menjalankan operasi yang sama berulang kali
  menghasilkan efek akhir yang sama
  seperti menjalankannya sekali

Fokusnya adalah:
- efek sistem,
bukan hanya response mentah.

Kalau satu aksi diulang
dan sistem tidak membuat efek ganda yang salah,
operasi itu idempotent.

---

## 2. Kenapa Ini Penting?

Karena dunia nyata penuh ambiguitas:
- request berhasil tapi response hilang
- client timeout lalu retry
- worker crash lalu job diulang
- message dikirim lebih dari sekali

Kalau operasi tidak idempotent,
hasilnya bisa:
- pembayaran ganda
- email ganda
- booking ganda
- status kacau

Idempotency adalah perisai
terhadap duplikasi dunia nyata.

---

## 3. Idempotency Bukan Berarti "Tidak Ada Perubahan"

Ini salah paham umum.

Operasi idempotent
tetap bisa mengubah state.

Contoh:
- set status order menjadi `cancelled`

Dipanggil sekali:
- status jadi cancelled

Dipanggil lagi:
- tetap cancelled

Itu idempotent.

Jadi idempotent
bukan berarti read-only.

---

## 4. HTTP Method Tidak Cukup

Memang dalam teori HTTP:
- GET, PUT, DELETE sering dianggap idempotent

Tapi arsitektur nyata
tidak boleh berhenti di label method.

POST pun bisa dirancang idempotent
misalnya untuk create operation tertentu
dengan idempotency key.

Sebaliknya,
method yang secara teori idempotent
bisa gagal secara praktik
jika implementasinya ceroboh.

---

## 5. Retry Membuat Idempotency Penting

Setiap kali kamu bilang:
- "boleh retry"

sebenarnya kamu sedang berkata:
- "semoga operasi ini tahan duplikasi"

Kalau retry diaktifkan
pada operasi non-idempotent tanpa proteksi,
kamu sedang memproduksi bug sistematis.

Retry dan idempotency
hampir selalu harus dipikir bersama.

---

## 6. Duplicate Message di Async System

Pada queue/event systems,
delivery sering:
- at least once

Artinya duplicate normal,
bukan anomali.

Kalau consumer tidak idempotent,
efek duplikat akan menyebar:
- stok berkurang dua kali
- event turunan ganda
- invoice ganda

Async architecture tanpa idempotency discipline
adalah bom waktu.

---

## 7. Idempotency Key

Salah satu teknik umum:
- idempotency key

Caller mengirim identifier unik
untuk satu niat operasi.

Server memakai key ini
untuk mengenali bahwa request serupa
sudah diproses.

Ini sangat berguna
untuk create/payment-like operations
yang rawan retry ambigu.

---

## 8. Kapan Idempotency Key Berguna?

Biasanya sangat berguna untuk:
- payment request
- booking creation
- claim submission
- job creation

Terutama saat client bisa retry
karena timeout/network ambiguity.

Kalau tidak ada idempotency key
dan operasi create sangat sensitif,
duplikasi akan cepat jadi masalah nyata.

---

## 9. Deduplication Window

Idempotency key tidak selalu disimpan selamanya.

Perlu kebijakan:
- berapa lama key dianggap valid?
- bagaimana cleanup dilakukan?

Kalau terlalu singkat,
retry lambat bisa lolos sebagai request baru.

Kalau terlalu lama,
storage dan semantics bisa membingungkan.

Ini keputusan desain,
bukan detail sepele.

---

## 10. Semantic Idempotency

Kadang idempotency tidak pakai key eksplisit.

Ia bisa datang dari semantics domain.

Contoh:
- `markAppointmentAsCancelled(appointmentId)`

Jika status sudah cancelled,
operasi kedua tidak membuat efek tambahan.

Ini bentuk semantic idempotency.

Sering kali ini lebih elegan
daripada sekadar mekanisme teknis.

---

## 11. Non-Idempotent Side Effects

Beberapa side effect
sangat mudah jadi non-idempotent:
- email sending
- SMS sending
- external charge

Kalau operasi seperti ini
bisa diulang,
harus ada strategi:
- dedupe
- outbox + tracking
- provider-side idempotency support

Jangan hanya berharap "harusnya sekali".

---

## 12. Healthcare Example

Misal pasien submit booking
dan client timeout saat respons balik.

Client retry.

Kalau sistem tidak idempotent:
- dua appointment bisa tercipta

Kalau sistem pakai idempotency key:
- request kedua dikenali
- hasil disamakan dengan niat pertama

Ini contoh sangat nyata
kenapa konsep ini penting.

---

## 13. Storage dan Lookup

Untuk mendukung idempotency,
sering perlu menyimpan:
- key
- request fingerprint tertentu
- hasil/status processing

Pertanyaan:
- di mana data ini disimpan?
- bagaimana lookup dilakukan?
- bagaimana menangani concurrent requests dengan key sama?

Implementasi teknis harus hati-hati
agar race condition tidak lolos.

---

## 14. Concurrency Problem

Kalau dua request identik
masuk hampir bersamaan,
idempotency check yang naif bisa gagal.

Kamu perlu:
- atomic insert/check
- unique constraint
- lock/serialization tertentu

Idempotency bukan hanya "cek dulu sudah ada belum".
Kalau check dan write terpisah longgar,
race condition tetap menang.

---

## 15. Response Semantics

Saat request duplikat datang,
apa yang dikembalikan?

Pilihan:
- hasil yang sama seperti request pertama
- status bahwa request sudah diproses

Yang penting:
- semantics-nya konsisten
- client bisa mengandalkannya

Idempotency bukan cuma dedupe internal.
Ia bagian dari kontrak.

---

## 16. Anti-Pattern Umum

1. Mengaktifkan retry tanpa memikirkan idempotency.
2. Menganggap metode HTTP otomatis menjamin implementasi aman.
3. Idempotency key ada, tapi check/write tidak atomic.
4. Tidak memikirkan duplicate async message.
5. Mengabaikan side effect eksternal yang tidak idempotent.

---

## 17. Best Practices

- desain operasi sensitif agar idempotent bila mungkin.
- gunakan idempotency key untuk create/payment-like operations.
- pastikan dedupe check bersifat atomic.
- anggap duplicate delivery sebagai realita normal.
- dokumentasikan contract idempotency ke client dan operator.

---

## 18. Pertanyaan Desain Penting

Sebelum merilis operasi baru, tanya:
1. Apa yang terjadi jika request ini diproses dua kali?
2. Apakah client akan retry?
3. Apakah queue/worker bisa mengirim ulang?
4. Perlu semantic idempotency atau idempotency key?
5. Bagaimana dedupe dilakukan secara aman dari race condition?

---

## 19. Mini Latihan

Latihan:
1. Ambil satu endpoint create sensitif dan desain idempotency strategy.
2. Tentukan key format dan retention window.
3. Cari satu consumer async yang rawan duplicate effect.
4. Buat skenario race condition pada idempotency check.
5. Tentukan bagaimana response duplikat sebaiknya dikembalikan.

---

## 20. Jawaban Contoh Ringkas

Idempotency penting untuk:
- payment
- booking
- submission
- async consumer

Idempotency bukan:
- sekadar teori HTTP
- sekadar "harusnya tidak diklik dua kali"

---

## 21. Checklist Kelulusan Topik Idempotency

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan efek idempotent vs non-idempotent,
- menghubungkannya dengan retry dan duplicate delivery,
- memakai idempotency key atau semantic idempotency dengan tepat,
- mencegah race condition pada dedupe,
- merancang operasi sensitif yang tahan dunia nyata.

---

## 22. Ringkasan Brutal

- Kalau sistemmu tidak tahan request ganda,
  berarti sistemmu rapuh.
- Duplicate itu bukan edge case.
- Duplicate adalah bagian normal dari sistem terdistribusi.
- Idempotency adalah cara berhenti berfantasi bahwa dunia selalu mengirim sekali.
