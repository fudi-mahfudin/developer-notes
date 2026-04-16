# DTO / Mapper Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu DTO
- apa itu mapper
- kenapa boundary data shape penting
- kapan DTO/mapper pattern berguna
- kapan ia berubah jadi ceremony berlebihan

DTO dan mapper pattern
sering terasa membosankan.

Padahal dalam sistem yang cukup besar,
pattern ini sangat membantu
menjaga boundary data tetap waras.

Kalau semua layer saling melempar object mentah,
akhirnya:
- schema bocor
- response berlebihan
- coupling naik
- perubahan kecil merusak banyak tempat

DTO/mapper membantu mencegah itu.

---

## 1. Apa Itu DTO?

DTO = Data Transfer Object.

Ini adalah shape data
yang sengaja dibentuk
untuk berpindah antar boundary,
misalnya:
- API request DTO
- API response DTO
- service output DTO

DTO bukan sekadar object biasa.
Ia adalah kontrak data yang disengaja.

---

## 2. Apa Itu Mapper?

Mapper adalah komponen atau fungsi
yang mengubah satu shape data
ke shape lain.

Contoh:
- DB row/entity -> response DTO
- external API payload -> internal DTO
- request DTO -> command/domain input

Mapper menjaga translation ini
tidak tersebar liar di mana-mana.

---

## 3. Masalah yang Diselesaikan

Tanpa DTO/mapper,
sering terjadi:
- entity database dikirim langsung ke API
- field internal ikut bocor
- perubahan persistence shape merusak consumer
- mapping business meaning tersebar di handler/UI

Pattern ini membantu memisahkan:
- storage shape
- domain shape
- transport shape

Itu boundary yang sehat.

---

## 4. API Boundary Protection

Salah satu use case paling jelas:
- jangan kirim entity mentah langsung ke luar

Kenapa?
- field bisa terlalu banyak
- ada data sensitif
- naming tidak ideal
- struktur persistence bukan kontrak publik

Response DTO membuat API lebih disengaja.

Ini bukan hiasan.
Ini proteksi boundary.

---

## 5. Request DTOs

Request masuk dari luar
tidak seharusnya langsung diperlakukan
sebagai model internal.

Lebih sehat:
- parse/validate request DTO
- lalu map ke input yang lebih masuk akal

Ini membantu memisahkan:
- input transport concern
  dari
- internal use case concern

Boundary yang jelas
mengurangi kebocoran struktur luar ke dalam.

---

## 6. Mapper as Translation Point

Kalau mapping dilakukan
sedikit-sedikit di banyak tempat:
- controller rename field
- service format enum
- UI menggabungkan field

hasilnya:
- inkonsisten
- sulit diubah
- sulit diaudit

Mapper memusatkan translation.

Ini sangat berguna
saat shape data berubah seiring waktu.

---

## 7. DTO Does Not Mean Class Everywhere

Di JavaScript/TypeScript,
DTO tidak harus selalu class formal.

Sering cukup:
- type/interface
- plain object contract
- schema validated object

Yang penting adalah:
- boundary dan shape-nya jelas

Jangan terjebak pada ceremony
jika problemnya belum menuntut itu.

---

## 8. Mapping Domain Meaning

Mapper bukan sekadar rename field.

Ia juga bisa:
- format tanggal
- gabung/split field
- convert enum/status
- sembunyikan data sensitif
- hitung field turunan sederhana

Kalau translation punya makna,
mapper pattern makin bernilai.

---

## 9. Healthcare Example

Misal entity pasien punya field:
- internal notes
- insurance raw ids
- audit metadata
- consent flags internal

API response untuk portal pasien
jelas tidak perlu mengirim semua itu.

Mapper membuat:
- `PatientResponseDto`

dengan hanya field yang aman dan relevan.

Ini boundary hygiene yang sangat penting.

---

## 10. Over-DTO Problem

Pattern ini juga bisa berlebihan.

Kalau untuk setiap langkah kecil
ada banyak DTO yang nyaris sama,
biaya kognitif bisa naik.

Tidak semua internal function call
butuh DTO terpisah.

Gunakan DTO/mapper paling kuat
di boundary yang benar-benar penting:
- API
- external integration
- storage/domain split tertentu

---

## 11. Leakage of Persistence Shape

Kalau repository/entity shape
dipakai langsung sampai ke UI/API,
perubahan database menjadi mahal.

DTO membantu memutus kebocoran itu.

Ini sangat penting
untuk menjaga evolusi schema dan API
tidak terlalu saling mengikat.

Mapper adalah alat decoupling,
bukan sekadar formatter.

---

## 12. Testability

Mapper yang eksplisit
lebih mudah diuji:
- input shape X
- output shape Y

Ini membantu menjaga contract
tetap konsisten.

Kalau mapping tersebar,
bug format/field sering muncul
secara diam-diam.

Testing mapper adalah investasi kecil
dengan manfaat lumayan besar
pada boundary sensitif.

---

## 13. Anti-Pattern Umum

1. Entity DB dikirim mentah ke API.
2. Mapping tersebar di controller/service/UI acak.
3. DTO dibuat terlalu banyak untuk kasus internal trivial.
4. Mapper hanya formalitas tanpa boundary yang jelas.
5. Field sensitif ikut bocor karena tidak ada layer response shaping yang tegas.

---

## 14. Best Practices

- gunakan DTO untuk boundary penting, terutama API dan integration.
- gunakan mapper untuk memusatkan translation shape.
- bedakan storage/internal/public data shape bila perlu.
- jaga DTO tetap purpose-driven, bukan duplikasi ceremonial.
- audit response agar hanya field yang memang perlu yang keluar.

---

## 15. Pertanyaan Desain Penting

Sebelum memperkenalkan DTO/mapper, tanya:
1. Boundary mana yang perlu dilindungi?
2. Apakah persistence shape sedang bocor keluar?
3. Apakah ada field sensitif atau internal yang harus disembunyikan?
4. Apakah mapping sekarang tersebar dan inkonsisten?
5. Apakah DTO baru benar-benar punya tujuan berbeda?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu endpoint yang mengembalikan entity mentah.
2. Definisikan response DTO yang lebih aman.
3. Buat mapper tunggal untuk endpoint itu.
4. Cari mapping tersebar di beberapa layer dan satukan.
5. Audit apakah ada DTO yang sebenarnya tidak perlu dipisah.

---

## 17. Checklist Kelulusan Topik DTO / Mapper Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan DTO sebagai boundary contract data,
- memakai mapper untuk translation terpusat,
- melindungi API/internal layer dari shape yang tidak cocok,
- menghindari field leakage dan persistence coupling,
- tetap pragmatis agar pattern ini tidak berubah jadi ceremony kosong.

---

## 18. Ringkasan Brutal

- DTO/mapper itu membosankan sampai satu hari field sensitif bocor ke API.
- Boundary data yang tidak dijaga
  akan bocor cepat atau lambat.
- Pattern ini bukan glamor,
  tapi sering menyelamatkan kebersihan sistem.
