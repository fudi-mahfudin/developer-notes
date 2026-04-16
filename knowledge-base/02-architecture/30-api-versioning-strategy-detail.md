# API Versioning Strategy - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa API versioning diperlukan
- berbagai strategi versioning
- kapan harus membuat breaking change
- bagaimana menjaga evolusi API tetap sehat
- anti-pattern umum dalam versioning

API yang dipakai orang lain
akan hidup lebih lama
daripada rasa percaya diri orang yang menulisnya.

Kalau evolusinya tidak dipikirkan,
setiap perubahan akan terasa seperti bom.

Versioning bukan tanda kelemahan desain.
Ia adalah bentuk kejujuran
bahwa kontrak akan berevolusi.

---

## 1. Kenapa API Versioning Penting?

Karena API adalah kontrak.

Begitu client bergantung padanya,
perubahan tidak lagi gratis.

Tanpa strategi versioning:
- breaking change merusak client diam-diam
- rollout jadi menegangkan
- compatibility sulit dipahami
- tim takut memperbaiki desain buruk

Versioning membantu mengelola evolusi.

---

## 2. Tidak Semua Perubahan Butuh Version Baru

Ini penting.

Perubahan non-breaking biasanya:
- tambah field opsional
- tambah endpoint baru
- tambah behavior kompatibel

Perubahan breaking biasanya:
- hapus field
- ubah makna field
- ubah format respons penting
- ubah contract request yang wajib

Kalau semua perubahan dianggap breaking,
versioning akan meledak sia-sia.

---

## 3. Apa Itu Breaking Change?

Breaking change adalah perubahan
yang bisa membuat client lama gagal
atau berperilaku salah
tanpa penyesuaian.

Bukan hanya error 500.

Perubahan makna data
juga bisa lebih berbahaya
karena client tetap jalan
tapi mengambil keputusan salah.

Jadi definisi breaking
harus dipahami secara kontraktual,
bukan sekadar teknis sempit.

---

## 4. Strategi Versioning Umum

Beberapa pendekatan:
- path versioning
- header/media type versioning
- hostname/subdomain versioning
- versionless with strong compatibility discipline

Tidak ada satu jawaban sakral.

Yang penting:
- client dan server sama-sama jelas
  tentang kontrak yang sedang dipakai.

---

## 5. Path Versioning

Contoh:
- `/api/v1/patients`
- `/api/v2/patients`

Keunggulan:
- mudah dilihat
- mudah dipahami tim dan client
- tooling dan routing sederhana

Kelemahan:
- bisa membuat duplikasi route
- cenderung mendorong coarse-grained versioning

Tetap, untuk banyak organisasi,
ini sangat pragmatis.

---

## 6. Header / Media Type Versioning

Contoh:
- versi ditentukan lewat header tertentu

Keunggulan:
- URL tetap bersih
- lebih fleksibel secara representasi

Kelemahan:
- lebih sulit dilihat/debug secara kasat mata
- client tooling/documentation bisa lebih ribet

Pendekatan ini bisa elegan,
tapi jangan dipilih kalau tim belum siap discipline-nya.

---

## 7. Versionless API Discipline

Sebagian tim mencoba:
- tanpa versi eksplisit
- hanya additive changes
- deprecation panjang

Ini bisa berhasil
jika governance sangat kuat.

Tapi kalau discipline lemah,
"no versioning" sering berarti:
- breaking changes terselubung
- harapan palsu

Jangan romantisasi versionless API
kalau kultur engineering belum matang.

---

## 8. Coarse vs Fine-Grained Versioning

Pertanyaan:
- apakah seluruh API naik versi sekaligus?
- atau hanya subset tertentu?

Coarse-grained versioning
lebih simpel dipahami,
tapi bisa terlalu besar dampaknya.

Fine-grained lebih fleksibel,
tapi governance lebih sulit.

Pilih berdasarkan skala dan kemampuan tim,
bukan teori murni.

---

## 9. Deprecation Strategy

Versioning sehat
selalu terkait deprecation.

Pertanyaan:
- kapan endpoint lama ditandai deprecated?
- bagaimana client diberi tahu?
- berapa lama masa transisi?
- bagaimana migrasi didukung?

Kalau versi baru keluar
tanpa deprecation plan,
itu bukan strategi.

Itu lempar masalah ke client.

---

## 10. Documentation dan Communication

API versioning bukan cuma routing.

Ia juga tentang:
- changelog
- migration guide
- sunset notice
- compatibility note

Client tidak bisa menebak niatmu.

Kalau komunikasi buruk,
bahkan versioning yang technically rapi
tetap akan gagal secara operasional.

---

## 11. Data Semantics Matter

Kadang bentuk field sama,
tapi maknanya berubah.

Itu bisa breaking.

Contoh:
- `status=done`
  dulu berarti "sudah diproses"
  sekarang berarti "diproses atau dibatalkan"

Secara schema mungkin tidak berubah,
tapi contract bisnis berubah.

Versioning yang matang
harus peka pada semantic compatibility.

---

## 12. Backward Compatibility as a Habit

Sebelum membuat versi baru,
tanya dulu:
- bisakah ini additive?
- bisakah field lama tetap dipertahankan sementara?
- bisakah behavior lama tetap dihormati?

Kalau semua hal cepat-cepat dipecah ke v2,
ada kemungkinan desain evolusinya malas.

Versioning bukan alasan
untuk tidak peduli compatibility.

---

## 13. Internal API vs Public API

Public API:
- butuh versioning discipline lebih ketat
- kontrak hidup lebih lama

Internal API:
- bisa lebih fleksibel,
  tapi tetap tidak bebas chaos

Banyak tim meremehkan internal API
lalu terjebak ketergantungan antar service
tanpa kompatibilitas yang jelas.

Internal pun butuh governance.

---

## 14. Healthcare Example

Misal API publik partner klinik:
- v1 mengembalikan patient summary dasar
- v2 menambah struktur insurance dan consent baru

Jika perubahan struktur request booking
membuat client lama gagal,
itu kandidat version bump.

Tapi menambah field opsional baru
belum tentu perlu v2.

Penting membedakan evolusi sehat
dari breaking noise.

---

## 15. Sunset dan Removal

Versi lama tidak bisa hidup selamanya
tanpa biaya.

Karena itu perlu:
- policy sunset
- tanggal penghentian
- monitoring usage versi lama
- komunikasi ke integrator

Kalau tidak,
organisasi akan memelihara banyak versi
sampai jadi museum API.

---

## 16. Testing Across Versions

Jika mendukung banyak versi,
tes harus mencerminkan itu.

Minimal:
- kontrak versi aktif
- compatibility path penting
- migration scenario kritikal

Kalau versioning ada
tapi tidak dites,
kepercayaan pada kontrak akan runtuh.

---

## 17. Avoid Version Proliferation

Terlalu banyak versi aktif
adalah biaya besar:
- dokumentasi membengkak
- support membengkak
- testing membengkak
- monitoring membengkak

Versioning perlu disiplin
bukan hanya mekanisme membuat versi baru.

Kalau setiap perubahan kecil bikin v baru,
itu tanda governance lemah.

---

## 18. Anti-Pattern Umum

1. Breaking change dilakukan tanpa versioning atau deprecation.
2. Semua perubahan kecil langsung bikin versi baru.
3. Tidak ada migration guide dan communication plan.
4. Menganggap internal API tidak butuh compatibility discipline.
5. Memelihara terlalu banyak versi tanpa sunset policy.

---

## 19. Best Practices

- pahami bedanya additive vs breaking change.
- pilih strategi versioning yang jelas bagi tim dan client.
- siapkan deprecation, migration, dan sunset process.
- jaga backward compatibility sebisa mungkin.
- monitor penggunaan versi lama sebelum removal.

---

## 20. Pertanyaan Desain Penting

Sebelum merilis perubahan API, tanya:
1. Ini breaking atau additive?
2. Apakah client lama akan gagal atau salah memahami data?
3. Strategi versioning mana yang paling mudah dioperasikan tim?
4. Bagaimana migrasi client dilakukan?
5. Kapan versi lama akan disunset?

---

## 21. Mini Latihan

Latihan:
1. Ambil lima perubahan API dan klasifikasikan breaking vs non-breaking.
2. Pilih apakah perubahan itu butuh v2 atau cukup additive.
3. Buat outline migration guide sederhana.
4. Rancang sunset policy untuk v1.
5. Tentukan metrik adopsi versi baru.

---

## 22. Jawaban Contoh Ringkas

Butuh versi baru:
- perubahan request/response yang merusak client lama

Tidak selalu butuh versi baru:
- tambah field opsional
- tambah endpoint baru

Yang wajib selalu ada:
- komunikasi
- migration path
- sunset policy

---

## 23. Checklist Kelulusan Topik API Versioning Strategy

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan alasan versioning tanpa dogma,
- membedakan breaking dan additive changes,
- memilih strategi versioning yang operasional,
- menyiapkan deprecation dan migration plan,
- menjaga API berevolusi tanpa chaos kontrak.

---

## 24. Ringkasan Brutal

- API tanpa versioning strategy adalah kontrak tanpa rencana hidup.
- Versi baru bukan solusi untuk desain malas.
- Kalau timmu tidak bisa menjelaskan apa itu breaking change,
  API-mu hanya menunggu waktu untuk menyakiti client.
