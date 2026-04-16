# Command - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu command pattern
- kapan command berguna
- bagaimana command membantu memisahkan request dari execution
- kapan command terlalu formal untuk masalah sederhana

Command adalah pattern
yang sangat cocok
untuk merepresentasikan aksi
sebagai objek atau unit eksplisit.

Ini berguna saat sistem butuh:
- queueing
- retry
- undo-like thinking
- audit trail aksi
- pemisahan antara peminta aksi dan pelaksana aksi

Kalau dipakai tepat,
command memberi clarity.
Kalau dipakai berlebihan,
ia hanya menambah birokrasi.

---

## 1. Apa Itu Command?

Command adalah representasi eksplisit
dari satu aksi atau permintaan kerja.

Alih-alih langsung memanggil:
- lakukan X sekarang

kita membentuk unit:
- `CreateAppointmentCommand`
- `ApproveClaimCommand`

lalu unit itu diproses
oleh handler/executor yang sesuai.

Intinya:
- request dipisah dari execution.

---

## 2. Masalah yang Diselesaikan

Command cocok saat:
- aksi ingin diperlakukan sebagai data/objek
- perlu antrean atau deferred execution
- perlu logging/audit aksi
- perlu pemisahan trigger dan handling

Tanpa command,
aksi sering terlalu melekat
pada titik pemanggilan langsung.

Ini bisa membatasi fleksibilitas arsitektur.

---

## 3. Command vs Direct Method Call

Direct method call:
- sederhana
- bagus untuk kasus sederhana

Command:
- lebih eksplisit
- lebih cocok untuk sistem
  yang perlu memproses aksi
  secara terstruktur

Kalau semua aksi cukup synchronous dan kecil,
method call biasa bisa cukup.

Command mulai bernilai
ketika aksi punya lifecycle sendiri.

---

## 4. Handler Separation

Biasanya command datang bersama:
- command handler

Command:
- membawa intent dan data

Handler:
- menjalankan aksi

Pemisahan ini membantu:
- testability
- queueability
- orchestration clarity

Tapi jangan jadikan ini ritual
untuk setiap operasi trivial.

---

## 5. Explicit Intent

Keunggulan besar command:
- intent jadi eksplisit

`ApproveClaimCommand`
lebih jelas daripada:
- `process(data)`

Nama command
memaksa arsitektur lebih jujur
tentang aksi yang sebenarnya terjadi.

Ini sangat berguna
untuk domain yang kaya workflow.

---

## 6. Queueing dan Async Execution

Command pattern sangat cocok
untuk async systems.

Karena command bisa:
- dibuat sekarang
- dijalankan nanti
- di-retry
- di-log

Ini membuat command natural
untuk job queue, workflow engine,
atau processing pipeline tertentu.

Command memisahkan "niat"
dari "waktu eksekusi".

---

## 7. Auditability

Karena command bersifat eksplisit,
sistem bisa lebih mudah mencatat:
- command apa yang diminta
- oleh siapa
- kapan
- hasilnya apa

Ini berguna
di domain yang perlu accountability tinggi.

Command sebagai unit intent
sering lebih enak diaudit
daripada call chain implisit.

---

## 8. Retry dan Idempotency

Kalau command bisa di-retry,
pertanyaan penting muncul:
- command ini idempotent tidak?
- apa duplicate execution aman?

Command pattern tidak otomatis
menyelesaikan masalah ini.

Tapi ia membuat area masalahnya lebih eksplisit,
karena satu aksi punya boundary jelas.

Itu membantu desain reliability.

---

## 9. Healthcare Example

Contoh command:
- `RescheduleAppointmentCommand`
- `ApproveInsuranceClaimCommand`
- `SendReminderCommand`

Setiap command:
- punya payload jelas
- punya handler jelas
- bisa dicatat, diantrekan, atau di-retry

Ini membantu
jika workflow healthcare
punya banyak aksi penting
dengan audit trail dan processing terpisah.

---

## 10. Command vs Event

Ini beda penting.

Command:
- permintaan untuk melakukan sesuatu
- biasanya punya satu owner/handler utama

Event:
- pemberitahuan bahwa sesuatu sudah terjadi
- bisa punya banyak subscriber

Kalau mencampur keduanya,
arsitektur akan kabur.

Command itu imperative.
Event itu factual.

---

## 11. Over-Formalization Risk

Sebagian codebase
terlalu memformalkan command:
- command class
- handler class
- bus
- registry
- middleware

bahkan untuk aksi kecil sederhana.

Hasilnya:
- file meledak
- navigation berat
- signal-to-noise turun

Command harus dipakai
saat struktur ini memberi manfaat nyata.

---

## 12. UI / Undo Use Case

Secara klasik,
command pattern juga sering dipakai
untuk:
- undo/redo
- action history

Karena command merepresentasikan aksi
sebagai unit tersendiri.

Di frontend/tooling/editor,
ini sangat masuk akal.

Di backend,
nilai utamanya lebih sering pada
workflow, queue, dan auditability.

---

## 13. Anti-Pattern Umum

1. Menggunakan command untuk operasi yang sangat trivial.
2. Tidak membedakan command dan event.
3. Command punya intent kabur seperti `ProcessCommand`.
4. Handler logic tersebar tidak jelas walau command sudah ada.
5. Over-formalization sampai biaya kognitif terlalu tinggi.

---

## 14. Best Practices

- gunakan command untuk aksi yang memang penting dan eksplisit.
- namai command berdasarkan intent domain.
- pisahkan command dari event secara konsep.
- pikirkan idempotency dan retry bila command bisa async.
- tetap pragmatis: tidak semua method call perlu diangkat jadi command.

---

## 15. Pertanyaan Desain Penting

Sebelum memperkenalkan command, tanya:
1. Aksi ini cukup penting untuk jadi unit eksplisit?
2. Apakah perlu queue, audit, retry, atau deferred execution?
3. Apa handler tunggalnya jelas?
4. Apakah ini command atau sebenarnya event?
5. Apakah struktur tambahan ini sepadan dengan manfaatnya?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu workflow bisnis dan identifikasi aksi yang layak menjadi command.
2. Namai command dengan intent yang jelas.
3. Tentukan handler dan aturan retry/idempotency-nya.
4. Cari contoh event yang salah diberi nama command, atau sebaliknya.
5. Evaluasi satu area yang over-commanded tanpa manfaat cukup.

---

## 17. Checklist Kelulusan Topik Command

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan command sebagai unit aksi eksplisit,
- membedakannya dari direct call dan event,
- memakai command untuk queue/audit/workflow saat relevan,
- menjaga intent command tetap jelas,
- menghindari formalisasi berlebihan untuk kasus sederhana.

---

## 18. Ringkasan Brutal

- Command bagus saat aksi memang perlu dianggap sebagai entitas penting.
- Command jelek saat semua hal kecil dipaksa jadi kelas khusus.
- Kalau pattern ini tidak menambah clarity pada intent dan execution,
  ia hanya menambah upacara.
