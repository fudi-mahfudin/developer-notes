# Trust Boundary - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu trust boundary
- kenapa trust boundary penting dalam arsitektur
- bagaimana membedakan input yang bisa dipercaya dan yang tidak
- hubungan trust boundary dengan validation, auth, dan internal service design

Banyak sistem rusak
bukan karena algoritmanya buruk,
tapi karena terlalu percaya.

Terlalu percaya pada:
- user input
- service internal
- partner system
- header request
- data cache lama

Trust boundary adalah alat berpikir
untuk menentukan:
- di mana kepercayaan boleh dimulai
- di mana ia harus dibuktikan dulu

---

## 1. Apa Itu Trust Boundary?

Trust boundary adalah batas
antara area yang tidak bisa langsung dipercaya
dan area yang bisa diperlakukan
dengan tingkat kepercayaan tertentu.

Begitu data melintasi boundary,
sistem harus mempertimbangkan:
- validation
- authentication
- authorization
- sanitization
- verification

Boundary ini bisa berupa:
- jaringan
- service interface
- user input
- tenant boundary

---

## 2. Kenapa Ini Penting?

Karena kepercayaan palsu
adalah sumber bug dan insiden security.

Kalau sistem menganggap:
- request dari internal network pasti aman
- header tertentu pasti valid
- data dari partner pasti bersih

tanpa verifikasi,
maka boundary kepercayaan tidak jelas.

Arsitektur sehat
tidak memberi trust gratis.

---

## 3. External vs Internal Tidak Sama dengan Trusted vs Untrusted

Ini kesalahan umum.

Orang sering berpikir:
- external = tidak dipercaya
- internal = dipercaya

Padahal service internal pun bisa:
- bug
- compromise
- salah konfigurasi
- kirim data buruk

"Internal" tidak otomatis berarti "trusted penuh".

Tingkat trust harus proporsional,
bukan biner malas.

---

## 4. User Input Adalah Boundary Jelas

Input dari user/client
jelas berada di luar boundary trust.

Maka perlu:
- validation
- sanitization
- authn/authz
- rate limiting bila perlu

Jangan pernah anggap UI frontend
sudah cukup memvalidasi.

Frontend membantu UX.
Backend menjaga boundary.

---

## 5. Service-to-Service Boundary

Antar service,
tetap ada trust boundary.

Pertanyaan:
- apakah caller benar-benar service yang sah?
- apakah payload valid?
- apakah scope/tenant context benar?

Kalau semua service internal saling percaya penuh,
satu compromise bisa menyebar luas.

Machine trust pun harus dimodelkan.

---

## 6. Auth dan Trust Boundary

Authn/authz sering diterapkan
di titik boundary.

Contoh:
- API gateway memverifikasi user token
- service memverifikasi caller identity
- endpoint memeriksa authorization context

Tapi jangan berhenti di perimeter saja.

Boundary internal tertentu
juga mungkin butuh validasi ulang
atau context verification.

---

## 7. Validation Bukan Hanya untuk User Input

Data dari:
- queue
- event bus
- partner API
- internal service

juga bisa salah bentuk
atau tidak sesuai asumsi.

Trust boundary sehat bertanya:
- dari mana data ini datang?
- apa yang sudah diverifikasi?
- apa yang masih harus diverifikasi di sini?

Kalau tidak,
bad data akan menyebar jauh.

---

## 8. Trust Decay

Kadang data awalnya valid,
tapi trust berkurang seiring waktu.

Contoh:
- cached authorization decision
- copied profile snapshot
- stale token claim

Kepercayaan bukan hanya soal asal data,
tapi juga soal freshness dan context.

Trust boundary bisa berubah
saat konteks berubah.

---

## 9. Principle of Least Trust

Pola pikir sehat:
- percaya seperlunya
- verifikasi sebanyak yang relevan

Bukan:
- curigai semua hal tanpa henti

dan juga bukan:
- percaya semua hal demi kenyamanan coding

Tujuannya adalah desain yang realistis,
bukan paranoia atau kemalasan.

---

## 10. Healthcare Example

Contoh:
- portal partner mengirim data appointment

Walau partner resmi,
payload tetap harus:
- divalidasi
- dicek tenant/clinic context
- diaudit bila perlu

Jangan karena "partner terpercaya"
lalu semua field dibiarkan masuk mentah.

Trust boundary tetap ada
di antara organisasi dan sistem.

---

## 11. Multi-Tenant Boundary

Dalam multi-tenant system,
tenant boundary adalah trust boundary penting.

Pertanyaan:
- apakah data tenant A
  bisa terbaca tenant B?
- apakah scope tenant diverifikasi di setiap akses relevan?

Kesalahan di boundary ini
bisa langsung menjadi insiden besar.

Trust boundary sering punya dampak privacy langsung.

---

## 12. Logging dan Observability

Boundary trust juga memengaruhi logging:
- apa yang perlu dicatat?
- apa yang perlu disensor?
- kapan input mencurigakan harus terlihat?

Kalau boundary dilanggar,
tim harus bisa mendeteksi.

Observability adalah bagian dari pertahanan,
bukan sekadar dashboard cantik.

---

## 13. Trust Boundary dan DTO / Contract

Contract yang jelas membantu boundary sehat.

Saat data masuk:
- parse
- validate
- map ke internal model

Ini lebih aman
daripada membiarkan payload liar
mengalir jauh ke internal layer.

Boundary sering lebih sehat
jika ada model "outer world"
dan model internal yang berbeda.

---

## 14. Transitive Trust Problem

Masalah umum:
- service A percaya B
- B percaya C
- A lalu secara implisit percaya C

Ini berbahaya.

Trust yang ditransfer secara tidak sadar
bisa menciptakan rantai asumsi palsu.

Setiap boundary utama
harus jelas apa yang benar-benar diverifikasi,
bukan hanya diwariskan.

---

## 15. Anti-Pattern Umum

1. Menganggap internal traffic otomatis aman.
2. Mengandalkan frontend validation sebagai kontrol utama.
3. Tidak memvalidasi event/message dari sistem lain.
4. Menganggap partner system selalu mengirim data benar.
5. Mencampur untrusted payload langsung ke model internal.

---

## 16. Best Practices

- identifikasi trust boundary secara eksplisit pada arsitektur.
- validasi data di titik masuk yang relevan.
- verifikasi identity dan context, bukan hanya asal jaringan.
- bedakan external contract dan internal model bila perlu.
- treat internal systems with bounded trust, not blind trust.

---

## 17. Pertanyaan Desain Penting

Sebelum menerima data atau call baru, tanya:
1. Dari boundary mana data ini datang?
2. Apa yang sudah diverifikasi, dan oleh siapa?
3. Apa yang masih harus divalidasi di sini?
4. Apakah ada tenant/user context yang harus dibuktikan?
5. Jika asumsi ini salah, apa blast radius-nya?

---

## 18. Mini Latihan

Latihan:
1. Petakan trust boundary utama pada satu sistem.
2. Identifikasi input yang sekarang dipercaya terlalu cepat.
3. Pisahkan validation yang harus terjadi di edge vs di service internal.
4. Cari satu transitive trust assumption yang berbahaya.
5. Tentukan logging/audit yang perlu di titik boundary kritikal.

---

## 19. Jawaban Contoh Ringkas

Trust boundary sehat berarti:
- data diverifikasi sesuai asal dan konteksnya
- trust tidak diberikan gratis

Trust boundary buruk berarti:
- internal dianggap otomatis aman
- payload masuk jauh tanpa pemeriksaan

---

## 20. Checklist Kelulusan Topik Trust Boundary

Kamu dianggap lulus topik ini jika sudah bisa:
- mengidentifikasi boundary kepercayaan utama,
- membedakan trusted, partially trusted, dan untrusted context,
- merancang validasi dan verifikasi di titik yang tepat,
- menghindari transitive trust yang naif,
- menghubungkan trust boundary dengan auth, tenant isolation, dan contract design.

---

## 21. Ringkasan Brutal

- Arsitektur yang terlalu percaya
  cepat atau lambat akan ditipu.
- Trust boundary bukan teori security abstrak.
- Ia adalah cara mencegah asumsi nyaman
  berubah menjadi insiden nyata.
