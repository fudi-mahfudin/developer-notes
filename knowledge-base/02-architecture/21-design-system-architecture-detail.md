# Design System Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu design system architecture
- perbedaan UI kit, component library, dan design system
- hubungan token, komponen, guideline, dan governance
- kapan sebuah tim benar-benar butuh design system
- anti-pattern umum saat membangun design system

Banyak tim merasa punya design system
hanya karena punya kumpulan komponen.

Itu biasanya ilusi.

Design system architecture
bukan sekadar folder `components`.
Ia adalah sistem keputusan,
aturan,
dan kontrak bersama
antara desain dan engineering.

---

## 1. Apa Itu Design System?

Design system adalah kumpulan standar
yang mengatur:
- visual language
- interaction pattern
- accessibility baseline
- token desain
- komponen reusable
- aturan penggunaan

Tujuannya:
- konsistensi
- efisiensi
- skalabilitas

Kalau definisinya hanya "library button",
itu terlalu dangkal.

---

## 2. UI Kit vs Component Library vs Design System

UI kit biasanya:
- kumpulan aset desain
- misalnya di Figma

Component library biasanya:
- kumpulan komponen implementasi
- misalnya `Button`, `Modal`, `Input`

Design system lebih luas:
- prinsip
- token
- komponen
- guideline
- governance
- release process

Jadi:
- semua design system punya component library
- tapi tidak semua component library adalah design system

---

## 3. Kenapa Arsitekturnya Penting?

Kalau tidak ada arsitektur,
design system cepat berubah jadi:
- dump komponen random
- naming tidak konsisten
- variant tak terkendali
- style override di mana-mana

Arsitektur design system
dibutuhkan agar sistem ini:
- bisa tumbuh
- bisa dipakai banyak tim
- tidak jadi beban maintenance

---

## 4. Core Layer dalam Design System

Biasanya ada beberapa layer:
- design tokens
- primitives/foundations
- base components
- composed components
- pattern/guideline

Layer ini membantu memisahkan:
- keputusan visual dasar
- implementasi teknis
- penggunaan level produk

Kalau semua layer dicampur,
perubahan kecil bisa merusak banyak tempat.

---

## 5. Design Tokens

Token adalah representasi sistematis
dari keputusan desain:
- color
- spacing
- radius
- typography
- shadow
- z-index

Token membantu menghindari hardcode liar.

Contoh buruk:
- `#1677ff` tersebar di 40 file

Contoh lebih sehat:
- `color.primary.default`

Token adalah fondasi arsitektur,
bukan aksesoris.

---

## 6. Foundation Layer

Foundation mencakup:
- warna
- grid
- typography scale
- spacing scale
- iconography
- motion principle

Kalau foundation tidak stabil,
komponen di atasnya ikut goyah.

Banyak tim salah fokus:
- langsung bikin 100 komponen
  tanpa foundation yang matang

Hasilnya:
- komponen konsisten secara nama
  tapi tidak konsisten secara desain.

---

## 7. Primitive Components

Primitive adalah komponen dasar
yang sangat umum:
- `Box`
- `Text`
- `Stack`
- `Button`
- `Input`

Tujuan primitive:
- membentuk building block yang konsisten

Tapi hati-hati:
- primitive yang terlalu abstrak
  bisa sulit dipahami oleh product team.

Primitive harus berguna,
bukan sekadar terlihat "sistematis".

---

## 8. Composed Components

Level berikutnya adalah komponen
yang lebih kaya makna:
- `SearchBar`
- `AppointmentCard`
- `DatePickerField`
- `EmptyStatePanel`

Di sini mulai muncul pertanyaan:
- mana yang masih bagian design system,
- mana yang sudah domain product?

Tidak semua komponen produk
layak masuk design system inti.

---

## 9. Generic vs Domain Boundary

Design system idealnya menampung
elemen yang cukup stabil lintas domain.

Kalau komponen terlalu domain-spesifik,
sering lebih sehat ditaruh di layer produk/fitur,
bukan di design system inti.

Contoh:
- `Button` cocok di design system
- `PatientRiskBadge` kemungkinan tidak

Memasukkan terlalu banyak komponen domain
ke design system
akan membuat sistem ini berat dan kabur.

---

## 10. Variant Management

Masalah klasik:
- variant meledak liar

Contoh:
- `primary`
- `secondary`
- `ghost`
- `danger`
- `compact`
- `dense`
- `elevated`
- `medical-theme-x`

Kalau variant tumbuh tanpa governance,
komponen akan jadi sulit dirawat.

Variant harus mengikuti kebutuhan nyata,
bukan setiap permintaan visual sesaat.

---

## 11. Accessibility Baseline

Design system yang sehat
harus membawa baseline accessibility:
- focus state
- color contrast
- keyboard behavior
- aria semantics dasar

Kalau komponen inti tidak accessible,
maka semua produk di atasnya
mewarisi hutang kualitas.

A11y pada design system
memberi leverage besar.

---

## 12. Theming dan Branding

Sebagian organisasi butuh:
- multi-brand
- dark mode
- white-label support

Arsitektur design system harus jelas:
- token mana yang brandable
- komponen mana yang netral
- bagaimana theme diterapkan

Kalau theme dicampur langsung di komponen
tanpa struktur,
biaya maintenance akan naik drastis.

---

## 13. Documentation adalah Bagian Sistem

Kalau komponen ada
tapi cara pakainya tidak jelas,
adopsi akan rendah.

Dokumentasi idealnya mencakup:
- tujuan komponen
- kapan dipakai
- kapan tidak dipakai
- daftar props/variants
- contoh
- accessibility note

Tanpa dokumentasi,
design system hanya berguna
bagi pembuat aslinya.

---

## 14. Governance

Pertanyaan penting:
- siapa yang boleh menambah komponen?
- siapa yang review perubahan token?
- kapan breaking change diizinkan?
- bagaimana release dikelola?

Design system tanpa governance
akan rusak oleh niat baik banyak orang.

Governance tidak harus birokratis,
tapi harus nyata.

---

## 15. Versioning dan Migration

Kalau banyak tim memakai design system,
perubahan harus dipikirkan:
- backward compatibility
- deprecation policy
- migration guide

Breaking change tanpa jalur migrasi
akan membuat tim produk memusuhi design system.

Arsitektur yang baik
memikirkan evolusi,
bukan hanya bentuk awal.

---

## 16. Healthcare Example

Dalam aplikasi healthcare,
design system bisa memuat:
- form controls
- status badge
- table patterns
- modal
- notification pattern
- empty states

Tapi komponen domain spesifik seperti:
- `LabResultInterpretationPanel`

belum tentu cocok masuk design system inti.

Pisahkan:
- reusable design language
  dari
- domain workflow component

---

## 17. Adoption Problem

Banyak design system gagal
bukan karena teknis,
tapi karena adopsi.

Penyebab umum:
- komponen sulit dipakai
- dokumentasi buruk
- API prop membingungkan
- terlalu kaku
- tim produk lebih cepat copy-paste sendiri

Design system yang sehat
harus lebih mudah dipakai
daripada diakali.

---

## 18. Anti-Pattern Umum

1. Mengira component library otomatis adalah design system.
2. Memasukkan komponen domain produk ke core tanpa boundary.
3. Variant dan props tumbuh tanpa governance.
4. Tidak punya token yang jelas.
5. Tidak punya dokumentasi dan migration path.

---

## 19. Best Practices

- bangun dari token dan foundation yang stabil.
- bedakan primitive, reusable component, dan domain component.
- buat accessibility sebagai baseline, bukan tambahan.
- kelola variant secara disiplin.
- siapkan documentation dan governance sejak awal.

---

## 20. Pertanyaan Desain Penting

Sebelum membangun atau memperluas design system, tanya:
1. Apakah ini benar-benar reusable lintas produk/fitur?
2. Apakah ini bagian dari language system atau domain workflow?
3. Apa token yang mendasarinya?
4. Siapa pemilik perubahan?
5. Bagaimana tim lain akan mempelajari dan mengadopsinya?

---

## 21. Mini Latihan

Latihan:
1. Pisahkan komponen mana yang cocok di design system vs feature layer.
2. Identifikasi hardcoded values yang seharusnya jadi token.
3. Evaluasi satu komponen yang variant-nya terlalu banyak.
4. Buat guideline singkat "kapan pakai komponen ini".
5. Tentukan governance minimal untuk release design system.

---

## 22. Jawaban Contoh Ringkas

Cocok di design system:
- `Button`
- `Input`
- `Modal`
- `Toast`

Belum tentu cocok di design system inti:
- `PatientHistoryTimeline`
- `PrescriptionApprovalPanel`

Karena domain coupling-nya lebih tinggi.

---

## 23. Checklist Kelulusan Topik Design System Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan design system dari component library biasa,
- memahami pentingnya token, foundation, dan governance,
- menentukan boundary antara sistem desain dan komponen domain,
- merancang design system yang bisa diadopsi dan berevolusi,
- menghindari anti-pattern variant chaos dan abstraction palsu.

---

## 24. Ringkasan Brutal

- Kalau design system hanya kumpulan komponen,
  itu belum sistem.
- Kalau tidak ada token, guideline, dan governance,
  itu hanya inventaris UI.
- Inventaris tidak sama dengan arsitektur.
