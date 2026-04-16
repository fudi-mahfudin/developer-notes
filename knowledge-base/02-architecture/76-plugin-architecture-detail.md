# Plugin Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu plugin architecture
- kapan plugin architecture berguna
- bagaimana extension point yang sehat dirancang
- risiko plugin system yang terlalu longgar

Plugin architecture adalah pola
untuk membuat sistem
bisa diperluas
tanpa terus mengubah inti utamanya.

Ini sangat menarik
karena memberi extensibility.

Tapi extensibility yang buruk
mudah berubah menjadi:
- API internal bocor
- lifecycle tidak jelas
- compatibility chaos

Jadi plugin architecture
bukan sekadar "bisa pasang plugin".
Ia soal boundary dan governance extension.

---

## 1. Apa Itu Plugin Architecture?

Plugin architecture adalah desain
di mana sistem inti menyediakan:
- extension points
- contract
- lifecycle

lalu plugin tambahan
bisa menambahkan perilaku
tanpa memodifikasi core secara langsung.

Intinya:
- core stabil
- extension bervariasi

Ini berguna
jika memang ada kebutuhan perubahan/perluasan
yang sering dan beragam.

---

## 2. Kenapa Pattern Ini Dipakai?

Karena beberapa sistem perlu:
- integrasi berbeda per customer
- provider/channel berbeda
- custom rule
- feature extension
- ecosystem pihak ketiga

Kalau semua variasi
terus dimasukkan ke core,
inti sistem cepat membengkak.

Plugin architecture mencoba berkata:
- core fokus pada platform
- variasi hidup di extension

---

## 3. Extension Point Adalah Jantungnya

Plugin architecture sehat
bergantung pada extension point yang jelas.

Pertanyaan penting:
- plugin boleh melakukan apa?
- plugin diberi hook di titik mana?
- data/context apa yang tersedia?
- apa yang tidak boleh disentuh?

Kalau extension point kabur,
plugin akan mulai bergantung
ke detail internal core
dan boundary runtuh.

---

## 4. Contract Stability

Plugin butuh contract yang stabil.

Kalau core berubah sedikit
lalu semua plugin pecah,
arsitektur extension itu lemah.

Ini berarti:
- API plugin harus sengaja dirancang
- perubahan perlu versioning/deprecation
- compatibility harus dipikirkan

Plugin architecture
meningkatkan kebutuhan governance.

---

## 5. Plugin vs Config

Tidak semua variasi
butuh plugin.

Kadang yang dibutuhkan hanya:
- config
- strategy selection
- feature flag

Plugin layak
jika extension membawa logic/perilaku baru,
bukan hanya angka atau pilihan sederhana.

Kalau kebutuhanmu hanya toggle kecil,
plugin system bisa terlalu berat.

---

## 6. Loading dan Discovery

Pertanyaan teknis penting:
- plugin ditemukan bagaimana?
- didaftarkan manual?
- scan runtime?
- load by config?

Cara discovery memengaruhi:
- startup
- security
- debuggability
- deployment model

Sistem plugin sederhana
sering lebih sehat daripada discovery magis
yang sulit dipahami tim.

---

## 7. Isolation Matters

Plugin adalah titik risiko.

Jika plugin jelek
atau crash,
berapa besar dampaknya ke core?

Plugin architecture matang
memikirkan:
- isolation
- timeout
- sandboxing tertentu bila perlu
- failure containment

Kalau plugin bebas melakukan apa saja,
core system menjadi rapuh.

---

## 8. Permission and Capability Model

Plugin tidak selalu boleh
mengakses semua hal.

Kadang perlu capability model:
- plugin ini hanya boleh memformat output
- plugin ini boleh kirim notifikasi
- plugin ini tidak boleh akses data sensitif tertentu

Semakin terbuka sistem plugin,
semakin penting batas kemampuan yang eksplisit.

Tanpa itu,
plugin architecture jadi celah keamanan dan stabilitas.

---

## 9. Plugin Lifecycle

Plugin architecture yang baik
punya lifecycle jelas:
- init
- register
- execute
- shutdown/unload bila perlu

Kalau lifecycle tidak jelas,
resource leaks, race, dan startup order bug
akan mudah muncul.

Plugin system
selalu lebih dari sekadar `load()` dan selesai.

---

## 10. Healthcare Example

Contoh:
- platform healthcare punya integrasi provider notifikasi
- tiap rumah sakit/klinik bisa memakai vendor berbeda

Plugin architecture bisa menyediakan:
- contract sender
- registration hook
- capability boundary

Sehingga core sistem reminder
tetap stabil,
sementara implementasi vendor
tinggal ditambahkan sebagai plugin.

Ini contoh use case yang masuk akal.

---

## 11. Anti-Pattern: Core Leaks Everywhere

Plugin system jelek sering terjadi saat:
- plugin butuh import internal core yang tidak resmi
- plugin tahu terlalu banyak detail runtime
- plugin mengandalkan state global aneh

Jika plugin hanya bekerja
karena kenal isi dapur inti,
itu bukan extension architecture yang sehat.

Itu coupling yang disamarkan.

---

## 12. Versioning and Migration

Begitu ada plugin ecosystem,
pertanyaan muncul:
- plugin versi lama masih jalan?
- bagaimana deprecation?
- bagaimana migrasi extension point?

Core team tak bisa lagi bergerak bebas total.

Ini biaya nyata dari plugin architecture:
- extensibility naik
- freedom to change core turun

Trade-off ini harus disadari sejak awal.

---

## 13. Testing Strategy

Plugin system perlu test di beberapa level:
- contract test untuk plugin API
- compatibility test
- failure/isolation test

Tanpa ini,
regresi mudah muncul
karena masalah sering ada di boundary,
bukan di logic inti masing-masing.

Plugin architecture tanpa testing discipline
mudah berubah jadi lotre integrasi.

---

## 14. Anti-Pattern Umum

1. Membuat plugin architecture saat kebutuhan extension belum nyata.
2. Extension point terlalu longgar atau terlalu bocor.
3. Plugin bebas mengakses internals core.
4. Tidak ada versioning/deprecation policy untuk contract plugin.
5. Tidak memikirkan isolation dan failure containment.

---

## 15. Best Practices

- bangun plugin architecture hanya jika extensibility memang kebutuhan inti.
- definisikan contract dan extension points secara sempit dan jelas.
- jaga core tidak bocor ke plugin.
- pikirkan capability, lifecycle, dan compatibility dari awal.
- treat plugin boundary sebagai API produk, bukan helper internal.

---

## 16. Pertanyaan Desain Penting

Sebelum membangun plugin system, tanya:
1. Variasi apa yang benar-benar perlu diperluas di luar core?
2. Mengapa config atau strategy biasa tidak cukup?
3. Apa extension point yang stabil?
4. Bagaimana plugin ditemukan, dijalankan, dan dibatasi?
5. Apa blast radius jika plugin rusak?

---

## 17. Mini Latihan

Latihan:
1. Identifikasi satu area sistem yang sering di-custom dan nilai apakah cocok jadi plugin point.
2. Definisikan contract plugin minimal yang sehat.
3. Tentukan data/context apa yang boleh diakses plugin.
4. Buat daftar incompatibility risk saat core berubah.
5. Evaluasi apakah kebutuhan sebenarnya cukup dengan config/strategy biasa.

---

## 18. Checklist Kelulusan Topik Plugin Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan plugin architecture sebagai extensibility system, bukan gimmick,
- merancang extension point yang sempit dan stabil,
- memahami biaya compatibility dan governance,
- memikirkan isolation dan capability boundary,
- menolak plugin system jika kebutuhan belum cukup kuat.

---

## 19. Ringkasan Brutal

- Plugin architecture itu mahal.
- Kalau kebutuhan extensibility belum nyata,
  kamu sedang membangun masalah masa depan lebih cepat.
- Extension yang sehat butuh boundary yang ketat,
  bukan kebebasan liar.
