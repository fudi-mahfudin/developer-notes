# Circuit Breaker - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu circuit breaker
- masalah apa yang ingin diselesaikannya
- bagaimana hubungan circuit breaker dengan timeout dan retry
- kapan pattern ini membantu
- kapan ia hanya menjadi konfigurasi kompleks tambahan

Circuit breaker sering terdengar sangat enterprise.

Kadang memang berguna.
Kadang juga hanya jadi lapisan ekstra
yang tidak dipahami tim.

Pattern ini lahir dari satu realita:
- dependency yang sakit
  tidak boleh terus-menerus diserang
  oleh request baru seolah tidak ada masalah.

---

## 1. Apa Itu Circuit Breaker?

Circuit breaker adalah mekanisme
yang menghentikan sementara
panggilan ke dependency
saat kegagalan melebihi ambang tertentu.

Tujuannya:
- mencegah sistem terus menekan dependency yang sedang sakit
- memberi waktu untuk pulih
- mengurangi cascading failure

Mental modelnya:
- seperti sekring listrik

Kalau arus masalah terlalu tinggi,
sirkuit diputus sementara.

---

## 2. Kenapa Ini Penting?

Tanpa circuit breaker,
saat dependency bermasalah:
- semua caller tetap mencoba
- timeout menumpuk
- thread/connection habis
- latency menjalar

Hasilnya:
- dependency makin tenggelam
- caller ikut rusak
- incident meluas

Circuit breaker adalah cara
untuk berkata:
- "berhenti dulu, jangan tambah beban"

---

## 3. Hubungan dengan Timeout

Timeout dan circuit breaker
saling melengkapi.

Timeout:
- membatasi berapa lama menunggu satu call

Circuit breaker:
- membatasi apakah call itu sebaiknya dicoba sama sekali

Kalau hanya ada timeout,
sistem tetap terus mencoba dependency yang sakit.

Kalau hanya ada breaker tanpa timeout,
request masih bisa menggantung.

Keduanya sering perlu bersama.

---

## 4. Closed, Open, Half-Open

State umum circuit breaker:

Closed:
- traffic normal berjalan

Open:
- call ke dependency diblok sementara

Half-open:
- sebagian kecil request diizinkan
  untuk menguji apakah dependency pulih

State machine ini penting dipahami.

Kalau hanya copy config
tanpa paham state-nya,
team akan bingung saat incident.

---

## 5. Closed State

Di state closed:
- breaker mengizinkan request lewat
- tapi memantau error/latency threshold

Kalau kegagalan naik
melewati ambang,
breaker bisa open.

Artinya breaker
bukan sekadar on/off manual.
Ia bereaksi terhadap kesehatan dependency.

---

## 6. Open State

Saat open:
- request ke dependency ditolak cepat
- caller bisa langsung fallback atau fail fast

Ini penting.

Fail fast kadang lebih sehat
daripada semua request menunggu timeout panjang.

Namun konsekuensinya:
- sebagian operasi memang tidak dilakukan

Jadi breaker harus dipakai
di tempat yang semantics kegagalannya dipahami.

---

## 7. Half-Open State

Half-open adalah fase percobaan.

Sebagian kecil traffic
dilewatkan lagi ke dependency
untuk melihat apakah ia pulih.

Kalau hasil bagus:
- breaker bisa closed lagi

Kalau masih gagal:
- balik open

Tanpa half-open logic yang sehat,
recovery bisa terlalu lambat atau terlalu agresif.

---

## 8. Threshold Design

Pertanyaan penting:
- kapan breaker open?

Berdasarkan:
- failure rate?
- consecutive errors?
- latency threshold?

Angka asal
akan membuat breaker tidak berguna
atau terlalu sensitif.

Threshold harus mempertimbangkan:
- karakter dependency
- traffic volume
- noise normal

---

## 9. Fail Fast dan Fallback

Saat breaker open,
apa yang dilakukan caller?

Pilihan:
- return error cepat
- gunakan cached value
- degrade feature
- skip optional dependency

Circuit breaker tanpa fallback semantics
masih bisa berguna,
tapi value-nya lebih besar
jika produk tahu cara berdegradasi dengan masuk akal.

---

## 10. Dependency Classification

Tidak semua dependency sama.

Critical dependency:
- jika gagal, operasi inti memang tak bisa lanjut

Optional dependency:
- jika gagal, sistem masih bisa degrade

Circuit breaker sangat menarik
untuk optional atau semi-optional dependency
karena fail fast + degrade
memberi pengalaman lebih sehat.

Untuk dependency inti,
ia tetap berguna,
tapi fallback-nya mungkin hanya error cepat.

---

## 11. Retry vs Circuit Breaker

Kalau retry dilakukan agresif
sementara breaker belum open,
dependency bisa tetap dibanjiri.

Karena itu retry policy
dan breaker policy
harus selaras.

Retry tanpa breaker:
- bisa memperparah overload

Breaker tanpa retry yang bijak:
- bisa terlalu cepat memutus

Resilience pattern harus dipikir sebagai sistem,
bukan potongan terpisah.

---

## 12. Healthcare Example

Misal service appointment
bergantung pada notification provider.

Jika provider notifikasi sakit:
- booking inti seharusnya tetap bisa berjalan
- notifikasi bisa degrade atau ditunda

Circuit breaker pada call notifikasi
bisa sangat berguna:
- fail fast
- queue later
- jangan biarkan booking endpoint ikut timeout panjang

Ini contoh penggunaan sehat.

---

## 13. Circuit Breaker Tidak Memperbaiki Dependency

Pattern ini tidak menyembuhkan dependency.

Ia hanya:
- membatasi dampak
- memberi ruang bernapas
- mencegah caller ikut rusak

Jadi kalau root cause adalah:
- query buruk
- provider down
- jaringan bermasalah

breaker bukan solusi akhir.
Ia hanya guardrail.

---

## 14. Observability

Kalau punya breaker,
kamu harus tahu:
- kapan open
- berapa lama open
- dependency mana paling sering trigger
- apakah fallback dipakai
- false positive rate

Kalau tidak,
breaker akan jadi perilaku misterius
bagi tim operasi.

Monitoring state breaker itu wajib.

---

## 15. Anti-Pattern Umum

1. Menambahkan circuit breaker ke semua hal tanpa alasan.
2. Threshold ditentukan asal.
3. Breaker dipasang tanpa timeout yang masuk akal.
4. Retry dan breaker saling bertabrakan.
5. Tidak ada observability saat breaker open/half-open.

---

## 16. Best Practices

- gunakan breaker pada dependency yang failure-nya bisa menimbulkan cascading impact.
- kombinasikan dengan timeout dan retry policy yang sehat.
- tentukan fallback atau degrade behavior secara eksplisit.
- pantau state transition breaker.
- uji perilaku breaker dalam simulasi dependency failure.

---

## 17. Pertanyaan Desain Penting

Sebelum memakai circuit breaker, tanya:
1. Dependency mana yang layak diproteksi dengan breaker?
2. Apa dampaknya jika dependency itu terus dicoba saat sakit?
3. Kapan breaker harus open?
4. Apa fallback saat open?
5. Bagaimana tim tahu breaker sedang aktif?

---

## 18. Mini Latihan

Latihan:
1. Pilih satu dependency eksternal dan tentukan apakah butuh breaker.
2. Rancang threshold awal yang masuk akal.
3. Tentukan fallback saat breaker open.
4. Evaluasi interaksi breaker dengan retry policy yang ada.
5. Buat daftar metrik breaker health.

---

## 19. Jawaban Contoh Ringkas

Circuit breaker cocok untuk:
- dependency lambat/gagal yang bisa menjalar
- optional integration
- external provider yang tidak stabil

Circuit breaker bukan pengganti:
- fixing root cause
- timeout
- observability

---

## 20. Checklist Kelulusan Topik Circuit Breaker

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan closed/open/half-open state,
- memahami hubungan breaker dengan timeout dan retry,
- memilih dependency yang benar untuk pattern ini,
- menentukan fallback yang masuk akal,
- mengoperasikan breaker dengan observability yang cukup.

---

## 21. Ringkasan Brutal

- Circuit breaker tidak membuat dependency sehat.
- Ia hanya menghentikan sistemmu ikut tenggelam bersamanya.
- Kalau kamu pasang breaker tanpa tahu fallback dan threshold,
  kamu sedang menambah misteri, bukan resilience.
