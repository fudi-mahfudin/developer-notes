# State Management Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu state management architecture
- jenis-jenis state di frontend
- kapan state lokal cukup
- kapan state global diperlukan
- bagaimana mencegah frontend berubah jadi hutan state

Masalah frontend modern
jarang hanya soal rendering.
Masalah besarnya sering soal state.

Kalau arsitektur state buruk,
UI terasa rapuh, lambat, dan sulit diprediksi.

---

## 1. Apa Itu State?

State adalah data yang memengaruhi perilaku atau tampilan UI.

Contoh:
- input form
- tab aktif
- hasil fetch API
- data user login
- filter pencarian
- modal terbuka atau tertutup

State bukan hanya "data".
State adalah data yang hidup,
berubah,
dan memicu konsekuensi di UI.

---

## 2. Apa Itu State Management Architecture?

Ini adalah cara mengatur:
- state disimpan di mana
- siapa yang boleh mengubah
- siapa yang membaca
- bagaimana sinkronisasi dijaga
- bagaimana perubahan tetap dapat dipahami

Tanpa arsitektur,
state tumbuh liar.

Kalau state tumbuh liar:
- bug sulit dilacak
- flow sulit dipahami
- rerender tidak efisien
- developer takut menyentuh fitur

---

## 3. Semua State Tidak Sama

Kesalahan pemula:
- memperlakukan semua state dengan cara yang sama

Padahal ada banyak kategori:
- local UI state
- shared UI state
- server state
- URL state
- form state
- derived state

Kalau semua dilempar ke global store,
arsitektur akan memburuk.

Kalau semua ditahan lokal,
koordinasi lintas halaman akan berantakan.

---

## 4. Local UI State

Contoh:
- input search
- accordion open/close
- modal visibility
- active tab

Ini biasanya paling sehat
jika dikelola dekat dengan komponen yang membutuhkannya.

Tidak semua hal harus naik ke store global.

State lokal adalah default yang bagus
sampai ada alasan nyata untuk berbagi state lebih luas.

---

## 5. Shared UI State

Contoh:
- theme
- sidebar collapsed
- selected clinic context
- wizard step yang memengaruhi banyak komponen

Ini kadang perlu scope lebih luas
daripada satu komponen.

Tapi shared state pun
tidak otomatis harus global untuk seluruh app.

Sering lebih sehat:
- feature-level provider
- route-level state
- context scoped

---

## 6. Server State

Ini kategori penting yang sering disalahkelola.

Server state adalah data yang:
- berasal dari backend
- punya lifecycle async
- bisa stale
- bisa di-refetch
- bisa gagal

Contoh:
- daftar appointment
- profil pasien
- jadwal dokter

Server state berbeda dari local UI state.

Memaksa semua server state
masuk store manual tradisional
sering menciptakan boilerplate dan bug sinkronisasi.

---

## 7. URL State

Contoh:
- page
- sort
- filter
- search query
- selected tab yang harus shareable

Kalau state penting untuk:
- bookmark
- refresh consistency
- back/forward browser
- shareable deep link

maka URL sering jadi lokasi state yang tepat.

Mengabaikan URL state
sering membuat UX buruk.

---

## 8. Form State

Form state punya kebutuhan sendiri:
- input values
- dirty flag
- validation
- touched state
- submission state

Kalau form kompleks,
perlu struktur jelas.

Jangan campur semua logic form
ke global store tanpa alasan.

Form state umumnya paling sehat
dekat dengan boundary form itu sendiri.

---

## 9. Derived State

Derived state adalah nilai
yang bisa dihitung dari state lain.

Contoh:
- total item terfilter
- apakah tombol submit aktif
- label tampilan berdasarkan status

Kesalahan umum:
- menyimpan derived state secara terpisah
  padahal bisa dihitung

Ini memicu inconsistency.

Kalau bisa dihitung dengan murah dan jelas,
sering lebih sehat tidak disimpan terpisah.

---

## 10. Prinsip Utama

Prinsip brutal:
- simpan state di scope serendah mungkin
- naikkan hanya jika perlu dibagi
- global-kan hanya jika benar-benar lintas aplikasi/fitur

Ini membantu mencegah
global store menjadi tempat sampah.

---

## 11. Single Source of Truth

Untuk satu fakta penting,
usahakan ada satu sumber kebenaran utama.

Kalau satu data user:
- ada di local component
- ada di context
- ada di store
- ada di cache query

tanpa boundary jelas,
konflik dan kebingungan akan muncul.

Arsitektur state yang sehat
butuh kejelasan sumber kebenaran.

---

## 12. Write Path Harus Jelas

Pertanyaan penting:
- siapa yang boleh update state ini?
- lewat mekanisme apa?

Kalau banyak area UI bisa update state yang sama
tanpa disiplin flow,
debugging akan menyiksa.

State management architecture
bukan cuma soal tempat menyimpan data,
tapi juga soal jalur perubahan yang jelas.

---

## 13. Read Path Juga Penting

Pertanyaan lain:
- siapa yang membaca state ini?
- seberapa lebar dampak perubahannya?

Jika perubahan kecil
memicu rerender besar ke mana-mana,
arsitektur pembacaan state juga bermasalah.

Granularity matter.

---

## 14. Performance dan Subscription

Pada skala besar,
state architecture memengaruhi performa.

Masalah umum:
- terlalu banyak komponen subscribe ke state besar
- selector buruk
- perubahan kecil memicu rerender luas

Arsitektur state yang baik
memikirkan:
- scope
- subscription boundary
- data normalization bila perlu

---

## 15. Healthcare Example

Dalam aplikasi klinik:

Local state:
- modal reschedule terbuka
- nilai input pencarian lokal

URL state:
- filter tanggal
- page number
- selected doctor

Server state:
- daftar appointment
- detail pasien

Shared app state:
- user session
- role
- selected clinic context

Memisahkan kategori ini
membantu memilih alat dan pola yang tepat.

---

## 16. Global Store Bukan Solusi Universal

Banyak tim terlalu cepat
meletakkan semua hal di global store.

Akibatnya:
- coupling naik
- perubahan sederhana jadi rumit
- tracing update lebih susah

Global store bagus
untuk state yang memang shared dan penting.

Tapi menjadikan global store
sebagai default,
biasanya keputusan malas.

---

## 17. Server State Tools

Untuk server state,
sering lebih sehat memakai tooling
yang memang memahami:
- cache
- refetch
- stale data
- retries
- loading/error

Daripada bikin semua mekanisme itu manual.

Intinya bukan nama library.
Intinya:
- bedakan server state dari client-only state.

---

## 18. Event vs Mutation Flow

Saat state berubah,
flow-nya harus dapat dipahami:
- user action
- handler
- mutation/update
- success/failure
- UI refresh

Kalau flow update state kabur,
bug race condition dan inconsistency gampang muncul.

Arsitektur yang baik
membuat flow perubahan bisa dilacak.

---

## 19. Anti-Pattern Umum

1. Semua state dimasukkan ke global store.
2. Derived state disimpan sebagai state terpisah tanpa perlu.
3. Server state dan UI state dicampur tanpa boundary.
4. URL state diabaikan padahal UX membutuhkannya.
5. Sumber kebenaran ganda untuk data yang sama.

---

## 20. Best Practices

- identifikasi kategori state sebelum memilih solusi.
- letakkan state sedekat mungkin dengan pemakai utamanya.
- gunakan URL untuk state yang perlu shareable dan navigable.
- perlakukan server state sebagai kategori khusus.
- jaga single source of truth untuk fakta penting.

---

## 21. Pertanyaan Desain yang Wajib Ditanya

Saat menambah state baru, tanya:
1. Ini state lokal, shared, server, URL, atau derived?
2. Siapa yang membaca?
3. Siapa yang mengubah?
4. Apa dampak performanya?
5. Apa yang terjadi saat refresh halaman?
6. Apakah state ini harus bisa dibagikan lewat URL?

Kalau pertanyaan ini tidak dijawab,
arsitektur state biasanya dibangun dengan tebakan.

---

## 22. Mini Latihan

Latihan:
1. Ambil satu halaman besar dan klasifikasikan semua state di dalamnya.
2. Temukan state yang salah scope.
3. Pindahkan satu derived state agar tidak disimpan manual.
4. Tentukan state mana yang seharusnya ada di URL.
5. Tentukan mana yang seharusnya local, shared, dan server state.

---

## 23. Jawaban Contoh Ringkas

State yang cocok di URL:
- filter
- pagination
- sorting

State yang cocok lokal:
- modal open
- input draft kecil

State yang cocok shared:
- session user
- clinic context

State yang cocok dikelola sebagai server state:
- hasil query appointment
- detail pasien

---

## 24. Checklist Kelulusan Topik State Management Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan kategori state utama,
- menentukan scope state yang tepat,
- menghindari global store abuse,
- memahami perbedaan server state vs UI state,
- merancang alur perubahan state yang jelas dan bisa dirawat.

---

## 25. Ringkasan Brutal

- Frontend rusak jarang karena JSX.
- Frontend rusak biasanya karena state yang tidak punya arsitektur.
- Kalau semua state ditaruh di satu tempat,
  kamu tidak sedang menyederhanakan.
  Kamu sedang menumpuk bom waktu.
