# Frontend Module Boundaries - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu module boundary di frontend
- kenapa boundary penting untuk maintainability
- bagaimana membagi feature, shared code, dan domain code
- tanda-tanda boundary yang sehat atau rusak
- anti-pattern modularisasi frontend

Masalah frontend skala besar
jarang berhenti di level komponen.

Begitu aplikasi tumbuh,
masalah berikutnya adalah:
- file bergantung ke mana-mana
- shared folder jadi tempat sampah
- domain logic tersebar
- perubahan kecil menjalar terlalu luas

Itu semua biasanya masalah boundary.

---

## 1. Apa Itu Module Boundary?

Module boundary adalah batas tanggung jawab
antara bagian-bagian kode.

Boundary menjawab:
- modul ini boleh tahu apa?
- modul ini boleh impor apa?
- modul ini bertanggung jawab atas apa?
- apa yang harus disembunyikan dari luar?

Tanpa boundary,
struktur folder hanya kosmetik.

---

## 2. Kenapa Boundary Penting?

Boundary yang sehat membantu:
- membatasi coupling
- memperjelas ownership
- mempermudah refactor
- mempermudah testing
- mencegah perubahan menyebar liar

Kalau boundary lemah:
- semua modul terasa "shared"
- domain logic bocor ke UI mana-mana
- dependensi jadi kusut

---

## 3. Folder Bukan Boundary

Kesalahan umum:
- merasa sudah modular hanya karena punya banyak folder

Folder hanyalah representasi fisik.

Boundary baru nyata
jika ada disiplin:
- dependency direction
- public API modul
- larangan impor sembarangan

Kalau semua file bebas impor semua file,
struktur folder cuma dekorasi.

---

## 4. Cara Paling Umum Membagi Modul

Beberapa pendekatan:
- by technical layer
- by feature
- by domain
- hybrid

Tidak ada satu jawaban mutlak.

Yang penting:
- pembagian membantu tim memahami dan mengubah sistem

Kalau pembagian membuat semua orang bingung,
arsitektur itu gagal.

---

## 5. Shared Folder Problem

`shared/`, `common/`, `utils/`
sering menjadi kuburan arsitektur.

Gejala:
- isinya campur aduk
- siapa saja boleh masuk
- domain logic ikut nyasar ke sana

Folder shared yang sehat
harus punya kriteria ketat:
- benar-benar lintas fitur
- stabil
- tidak bergantung ke domain spesifik

Kalau tidak,
shared folder akan menggerogoti boundary.

---

## 6. Feature-Based Structure

Pendekatan feature-based sering sehat
untuk frontend modern.

Contoh:
- `appointments/`
- `patients/`
- `billing/`

Keuntungan:
- code terkait satu workflow berdekatan
- ownership lebih jelas
- perubahan fitur lebih terlokalisasi

Tapi tetap butuh disiplin
agar feature tidak saling impor internals sembarangan.

---

## 7. Public API Modul

Modul yang sehat
idealnya punya surface yang jelas:
- file export utama
- apa yang boleh dipakai dari luar

Luar modul
sebaiknya tidak masuk ke internal implementation
tanpa alasan kuat.

Kalau setiap orang mengimpor file terdalam,
modul kehilangan encapsulation.

---

## 8. Domain Logic Jangan Tersebar

Frontend sering punya logic domain juga:
- permission check
- status mapping
- business rule ringan
- workflow branching

Kalau logic ini tersebar di banyak komponen,
boundary domain menjadi rusak.

Lebih sehat:
- kumpulkan pada layer feature/domain yang konsisten

UI seharusnya tidak menjadi tempat
logika domain berpindah-pindah.

---

## 9. Cross-Feature Dependency

Pertanyaan penting:
- boleh tidak satu feature memakai feature lain?

Jawabannya:
- boleh, tapi harus terkendali.

Jika semua feature saling tergantung langsung,
modularitas akan runtuh.

Biasanya lebih sehat:
- interaksi lewat public API
- atau lewat shared abstractions yang benar-benar netral

---

## 10. Layer di Dalam Feature

Satu feature bisa punya sub-layer:
- UI
- hooks
- services
- model
- utils internal

Ini membantu menjaga boundary internal.

Feature-based structure
bukan berarti semua file dicampur
dalam satu folder besar.

Modul tetap butuh struktur internal yang masuk akal.

---

## 11. Import Direction

Salah satu alat berpikir terbaik:
- siapa boleh mengimpor siapa?

Contoh sehat:
- UI mengimpor hooks/service feature
- service tidak mengimpor komponen UI

Kalau arah dependensi bolak-balik,
itu tanda boundary busuk.

Dependency direction
lebih penting daripada nama folder.

---

## 12. Frontend Boundary dan State

Boundary juga terkait state.

Tanya:
- state milik modul mana?
- siapa pemilik query?
- siapa pemilik mutation?

Kalau ownership state tidak jelas,
modul akan saling tarik tanggung jawab.

Hasilnya:
- coupling
- duplikasi
- inconsistency

---

## 13. Frontend Boundary dan Design System

Design system seharusnya:
- tidak bergantung ke feature domain

Kalau komponen shared dasar
mulai mengimpor domain helper,
boundary runtuh.

Layer umum harus stabil dan netral.

Begitu shared UI tahu terlalu banyak
tentang domain produk,
reusability akan palsu.

---

## 14. Healthcare Example

Misal aplikasi punya feature:
- appointments
- patients
- doctors
- auth

Boundary sehat:
- `appointments` boleh pakai komponen shared UI
- `appointments` punya service dan model sendiri
- komponen internal `appointments`
  tidak diimpor langsung oleh `patients`

Kalau `patients` sering mengimpor file internal `appointments`,
itu tanda boundary lemah.

---

## 15. Over-Sharing

Anti-pattern umum:
- begitu dua feature butuh hal serupa,
  langsung dipindah ke `shared`

Padahal bisa jadi:
- kesamaannya masih kebetulan
- abstraction belum stabil

Terlalu cepat menaruh sesuatu ke shared
sering menghasilkan util/komponen generik palsu.

Boundary sehat juga berarti
berani membiarkan sedikit duplikasi
sampai pola benar-benar matang.

---

## 16. Hidden Cost of Weak Boundaries

Biaya boundary lemah:
- refactor lama
- testing makin luas
- perubahan fitur memicu regression di tempat lain
- ownership tim membingungkan

Masalah ini tidak langsung meledak.

Ia tumbuh perlahan
sampai aplikasi terasa "sulit disentuh".

---

## 17. Tooling dan Enforcement

Kalau boundary penting,
sebaiknya sebagian aturan bisa ditegakkan:
- lint import rules
- path alias terstruktur
- code review checklist
- documentation module contract

Mengandalkan ingatan manusia saja
jarang cukup.

Arsitektur bagus
lebih kuat jika ada guardrail.

---

## 18. Anti-Pattern Umum

1. Menganggap folder otomatis berarti modular.
2. Semua hal dipindah ke `shared/common`.
3. Cross-feature import ke internal file.
4. Domain logic tersebar di banyak komponen acak.
5. Arah dependensi tidak jelas atau berputar.

---

## 19. Best Practices

- buat boundary berdasarkan feature/domain yang nyata.
- definisikan public API untuk modul penting.
- jaga shared layer tetap kecil dan netral.
- batasi cross-feature dependency.
- gunakan tooling bila perlu untuk enforce import boundary.

---

## 20. Pertanyaan Desain Penting

Sebelum membuat modul baru, tanya:
1. Ownership modul ini milik siapa?
2. Apa tanggung jawab utamanya?
3. Apa yang boleh diakses dari luar?
4. Dependensi apa yang seharusnya dilarang?
5. Apakah ini benar-benar shared atau hanya sementara mirip?

---

## 21. Mini Latihan

Latihan:
1. Ambil satu frontend project dan petakan feature boundaries-nya.
2. Identifikasi isi `shared/` yang sebenarnya domain-specific.
3. Tentukan public API untuk satu feature.
4. Cari contoh import yang menembus internal modul lain.
5. Buat aturan sederhana dependency direction.

---

## 22. Jawaban Contoh Ringkas

Boundary sehat:
- feature punya service/model/UI sendiri
- external access lewat entry point yang jelas

Boundary buruk:
- internal file diimpor lintas feature
- shared penuh helper domain
- semua modul boleh bergantung ke semua modul

---

## 23. Checklist Kelulusan Topik Frontend Module Boundaries

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan boundary lebih dari sekadar struktur folder,
- mendesain modul berbasis feature/domain yang jelas,
- membedakan shared yang valid vs shared sampah,
- menjaga dependency direction tetap sehat,
- melihat efek boundary terhadap refactor, state, dan ownership.

---

## 24. Ringkasan Brutal

- Frontend besar tidak mati karena kurang folder.
- Frontend besar mati karena boundary palsu.
- Kalau semua kode bisa masuk ke mana saja,
  berarti sebenarnya tidak ada arsitektur.
