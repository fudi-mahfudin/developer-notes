# CQRS Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu CQRS
- pemisahan command dan query
- kapan CQRS berguna
- kapan CQRS justru berlebihan
- hubungan CQRS dengan scaling dan complexity

CQRS sering terdengar canggih.
Tapi seperti banyak pattern lain,
nilainya muncul hanya jika dipakai pada masalah yang tepat.

---

## 1. Apa Itu CQRS?

CQRS = Command Query Responsibility Segregation.

Intinya:
- command (write/change state)
  dipisahkan dari
- query (read/view state)

Pemisahan ini bisa:
- sangat ringan
- atau sangat ekstrem

Penting:
- CQRS bukan otomatis event sourcing
- CQRS bukan otomatis microservices

Itu konsep yang berbeda.

---

## 2. Command vs Query

Command:
- berniat mengubah state
- punya side effect

Contoh:
- `CreateAppointment`
- `CancelAppointment`
- `ApproveRefund`

Query:
- membaca data
- tidak mengubah state

Contoh:
- daftar appointment hari ini
- laporan no-show dokter
- detail invoice

Pemahaman dasar ini harus jelas dulu.

---

## 3. Kenapa Dipisah?

Karena kebutuhan write dan read
sering sangat berbeda.

Write side biasanya fokus pada:
- consistency
- business rules
- invariants

Read side biasanya fokus pada:
- kecepatan baca
- fleksibilitas tampilan
- agregasi/reporting

Kalau satu model dipaksa melayani keduanya,
desain sering menjadi canggung.

---

## 4. CQRS Ringan vs CQRS Berat

CQRS ringan:
- command handler dan query handler dipisah secara kode/logika
- belum tentu ada storage terpisah

CQRS berat:
- read model dan write model sangat berbeda
- bisa ada projection
- bisa ada event-driven update read side

Banyak tim tidak butuh versi berat.
Tapi pemisahan ringan sering sudah sangat berguna.

---

## 5. Kapan CQRS Berguna?

Biasanya saat:
- read model sangat berbeda dari write model
- query reporting/dashboard kompleks
- domain write penuh aturan konsistensi
- read performance butuh optimasi terpisah

Contoh:
- booking system dengan write rules ketat
- dashboard operasional dengan query agregasi kaya

Di situ CQRS bisa memberi kejelasan.

---

## 6. Kapan CQRS Tidak Perlu?

Kalau:
- aplikasi kecil
- read dan write sederhana
- query model tidak jauh beda
- tim belum siap dengan kompleksitas tambahan

maka memaksa CQRS sering hanya menambah layer
tanpa nilai nyata.

Jangan pakai CQRS hanya karena terdengar maju.

---

## 7. Write Model vs Read Model

Write model:
- dioptimalkan untuk validasi rule dan perubahan state

Read model:
- dioptimalkan untuk konsumsi data
- sering lebih datar / denormalized / siap tampil

Ini inti CQRS:
- satu model tidak harus melayani dua kebutuhan yang sangat berbeda.

---

## 8. Read Model Bisa Berbeda Total

Contoh:
- write side `Appointment` punya rule, invariant, dan transisi status
- read side `AppointmentDashboardRow` hanya butuh:
  - patient name
  - doctor name
  - slot time
  - clinic
  - status ringkas

Memaksa domain entity write
langsung menjadi response dashboard
sering menyulitkan kedua sisi.

CQRS memberi izin untuk memisahkan keduanya.

---

## 9. Consistency Trade-Off

CQRS ringan bisa tetap strong
kalau query masih baca sumber data sama.

CQRS berat sering mengarah ke eventual consistency:
- write side update
- projection/read model menyusul

Ini penting.

Kalau tim memilih projection async,
maka freshness harus dikelola.

CQRS bisa memberi performa dan clarity,
tapi kadang dibayar dengan consistency lag.

---

## 10. Query Side Bisa Sangat Pragmatik

Read side dalam CQRS
tidak harus "murni domain".

Justru query side sering boleh lebih pragmatik:
- denormalized
- tailored untuk UI
- aggregated
- optimized untuk read

Ini salah satu alasan CQRS menarik.

Read side tidak perlu dipaksa
memakai model write yang kaku.

---

## 11. Command Side Harus Ketat

Command side adalah tempat aturan hidup.

Di sini fokusnya:
- invariants
- validation
- transaction boundary
- idempotency
- audit trail

Kalau command side dibuat terlalu longgar,
CQRS kehilangan salah satu manfaat utamanya.

Write side harus menjaga kebenaran.

---

## 12. Healthcare Example

Command:
- create appointment
- cancel appointment
- reschedule appointment

Query:
- dashboard antrian per dokter
- histori pasien
- no-show rate per klinik

Jelas sekali kebutuhan write dan read
berbeda.

CQRS bisa membantu:
- write side fokus aturan booking
- query side fokus representasi operasional/analytics

---

## 13. CQRS Bukan Alasan Mengabaikan Simplicity

Banyak tim over-engineer CQRS:
- banyak handler
- banyak model
- banyak bus
- semua jadi command/query walau sepele

Kalau masalahmu sederhana,
itu hanya menciptakan bureaucratic code.

CQRS harus dipakai proporsional.

---

## 14. CQRS dan Event-Driven

CQRS sering dipasangkan dengan event-driven architecture,
karena read model bisa dibangun dari event/projection.

Tapi sekali lagi:
- CQRS tidak sama dengan event-driven
- CQRS tidak sama dengan event sourcing

Kamu bisa punya CQRS sederhana
tanpa event-driven penuh.

Penting membedakan konsep-konsep ini.

---

## 15. CQRS dan Scaling

Kadang CQRS membantu scaling karena:
- query path bisa dioptimalkan sendiri
- read model bisa diletakkan di storage berbeda

Tapi jangan menjadikan scaling sebagai mantra otomatis.

Kalau bottleneck belum nyata,
CQRS berat bisa lebih banyak biaya daripada manfaat.

---

## 16. Anti-Pattern Umum

1. Menerapkan CQRS penuh untuk aplikasi kecil.
2. Tidak menjelaskan consistency model read side.
3. Mencampur command dan query lagi setelah mengklaim pakai CQRS.
4. Membuat handler berlapis tanpa nilai.
5. Mengira CQRS otomatis membuat sistem scalable.

---

## 17. Best Practices

- mulai dari pemisahan command/query secara logika dulu.
- pakai read model berbeda hanya jika memberi nilai nyata.
- jelaskan consistency trade-off.
- jangan campur CQRS dengan buzzword lain tanpa alasan.
- evaluasi apakah kompleksitas yang ditambahkan benar-benar sepadan.

---

## 18. Mini Latihan

Latihan:
1. Ambil satu use case healthcare dan pisahkan command vs query-nya.
2. Buat contoh read model yang lebih cocok untuk dashboard daripada write entity mentah.
3. Jelaskan beda CQRS ringan dan berat.
4. Jelaskan kapan eventual consistency muncul dalam CQRS.
5. Jelaskan kapan CQRS sebaiknya tidak dipakai.

---

## 19. Jawaban Contoh Ringkas

CQRS ringan:
- command dan query dipisah logika/kode,
  tapi bisa tetap satu storage.

CQRS berat:
- read/write model sangat berbeda,
  bisa dengan projection async.

Eventual consistency muncul saat:
- read model diperbarui terpisah dari write side.

---

## 20. Checklist Kelulusan Topik CQRS Dasar

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan command vs query dengan benar,
- memahami kapan model read dan write layak dipisah,
- menilai trade-off CQRS dengan jujur,
- membedakan CQRS dari event sourcing/event-driven,
- menerapkan CQRS secara pragmatis, bukan fanatik.

---

## 21. Ringkasan Brutal

- CQRS bisa sangat berguna
  saat read dan write memang hidup di dunia yang berbeda.
- Tapi kalau kamu memaksakannya di sistem sederhana,
  itu cuma cara elegan untuk memperumit hal-hal yang seharusnya mudah.
