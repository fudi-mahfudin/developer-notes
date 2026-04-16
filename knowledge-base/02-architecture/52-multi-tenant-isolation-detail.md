# Multi-Tenant Isolation - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu multi-tenant isolation
- kenapa isolasi tenant penting
- bentuk-bentuk isolasi data dan compute
- risiko noisy neighbor dan data leak
- trade-off shared infrastructure vs safety

Begitu satu sistem melayani banyak tenant,
arsitektur harus menjawab pertanyaan serius:
- bagaimana memastikan tenant A
  tidak merusak,
  melihat,
  atau memengaruhi tenant B?

Kalau jawabannya kabur,
multi-tenant system itu belum matang.

Isolasi tenant bukan fitur tambahan.
Ia adalah properti inti sistem.

---

## 1. Apa Itu Multi-Tenant Isolation?

Multi-tenant isolation adalah kemampuan sistem
untuk memisahkan:
- data
- akses
- resource usage
- failure impact

antar tenant yang berbagi platform.

Tujuannya:
- tidak ada data leak lintas tenant
- tidak ada akses ilegal lintas tenant
- satu tenant tidak mudah menjatuhkan yang lain

---

## 2. Kenapa Ini Penting?

Karena multi-tenant tanpa isolasi kuat
adalah undangan insiden:
- tenant salah lihat data tenant lain
- satu tenant hog resource
- bug query membuka data lintas account

Di domain sensitif seperti healthcare,
ini bisa langsung menjadi insiden serius
secara bisnis, legal, dan reputasi.

---

## 3. Bentuk Isolasi

Isolasi tenant bisa mencakup:
- data isolation
- access isolation
- compute/resource isolation
- queue/job isolation
- observability/log isolation tertentu

Banyak tim hanya memikirkan data,
padahal noisy neighbor dan blast radius
juga bagian dari isolasi.

---

## 4. Logical vs Physical Isolation

Logical isolation:
- tenant berbagi infrastruktur yang sama
- dibedakan secara logis lewat tenant ID/scope

Physical isolation:
- tenant dipisah lebih keras
  pada database, compute, atau lingkungan tertentu

Logical isolation lebih efisien,
tapi butuh disiplin tinggi.

Physical isolation lebih aman pada beberapa aspek,
tapi lebih mahal dan kompleks di operasi.

---

## 5. Shared Table dengan Tenant Key

Ini pola umum:
- semua data ada di tabel yang sama
- tiap row punya tenant identifier

Keuntungannya:
- sederhana secara operasional
- hemat resource

Risikonya:
- query bug bisa melewatkan filter tenant
- admin tooling bisa bocor
- audit butuh disiplin kuat

Pola ini layak,
tapi tidak memaafkan kelalaian query.

---

## 6. Separate Schema / Separate DB

Opsi lain:
- schema per tenant
- database per tenant

Keuntungan:
- boundary lebih keras
- sebagian risiko query leakage menurun

Biaya:
- operasional lebih berat
- migration lebih rumit
- fleet management lebih kompleks

Semakin keras isolasi,
semakin mahal pengelolaannya.

---

## 7. Application-Layer Isolation

Banyak keputusan isolasi
tetap hidup di application layer:
- scope tenant pada request
- policy akses
- query scoping
- cache key scoping

Walaupun storage dipisah sebagian,
app logic yang ceroboh
masih bisa membocorkan data.

Jangan merasa aman
hanya karena topologi data terlihat rapi.

---

## 8. Tenant Context

Pertanyaan penting:
- bagaimana tenant context ditentukan?
- dari token?
- dari subdomain?
- dari route?
- dari header?

Dan lebih penting:
- bagaimana diverifikasi?

Kalau tenant context terlalu dipercaya
dari input mentah tanpa check,
isolasi itu rapuh.

---

## 9. Noisy Neighbor Problem

Isolasi bukan cuma soal data.

Satu tenant bisa:
- mengirim traffic besar
- membuat export berat
- menjalankan job mahal

lalu mengganggu tenant lain.

Karena itu multi-tenant isolation sehat
juga memikirkan:
- quota
- rate limit per tenant
- queue separation
- resource fairness

---

## 10. Cache dan Tenant Isolation

Cache bisa jadi sumber kebocoran halus.

Kalau key cache
tidak menyertakan scope tenant yang benar,
tenant A bisa melihat hasil tenant B.

Ini salah satu bug
yang kelihatannya teknis kecil,
tapi dampaknya besar.

Semua layer turunan
harus tenant-aware:
- cache
- queue
- projection
- logs tertentu

---

## 11. Search / Analytics / Projection

Data turunan seperti:
- search index
- reporting view
- analytics snapshot

juga harus menjaga isolasi tenant.

Sering sistem utama aman,
tapi projection sekunder longgar.

Insiden tidak peduli
apakah kebocoran datang dari tabel utama
atau dari dashboard turunan.

---

## 12. Healthcare Example

Jika satu platform melayani banyak klinik,
tenant bisa berupa:
- klinik
- grup rumah sakit
- unit bisnis tertentu

Sistem harus memastikan:
- dokter klinik A tidak baca pasien klinik B
- export billing A tidak mencampur data B
- queue/job berat klinik besar tidak menghancurkan klinik kecil

Ini kombinasi access isolation dan resource isolation.

---

## 13. Admin / Support Access

Area rawan lain:
- internal admin tools
- support dashboards

Banyak kebocoran terjadi
bukan dari endpoint publik,
tapi dari tooling internal
yang terlalu kuat dan kurang guardrail.

Multi-tenant isolation
harus mencakup tooling internal,
bukan hanya API publik.

---

## 14. Testing Isolation

Isolasi tenant harus diuji secara eksplisit:
- query lintas tenant
- cache contamination
- search result scoping
- export correctness
- per-tenant limit behavior

Kalau tidak dites,
tim hanya berasumsi filter tenant selalu ada.

Asumsi itu murah.
Insiden leak itu mahal.

---

## 15. Observability dan Audit

Kamu perlu bisa menjawab:
- siapa akses tenant mana
- apakah ada cross-tenant anomaly
- tenant mana yang menyedot resource
- queue/job mana yang dominan per tenant

Tanpa observability,
isolasi resource hanya slogan.

---

## 16. Anti-Pattern Umum

1. Mengandalkan filter tenant di tiap query tanpa guardrail tambahan.
2. Tenant context dipercaya dari input mentah.
3. Cache/projection tidak tenant-aware.
4. Hanya fokus pada data, lupa noisy neighbor.
5. Tooling internal punya akses lintas tenant tanpa audit kuat.

---

## 17. Best Practices

- jadikan tenant context bagian inti request model.
- pastikan semua layer turunan tenant-aware.
- terapkan quota/rate/resource isolation sesuai kebutuhan.
- audit admin/support access lintas tenant.
- uji cross-tenant leak dan noisy-neighbor scenarios secara eksplisit.

---

## 18. Pertanyaan Desain Penting

Sebelum menyebut sistem multi-tenant aman, tanya:
1. Tenant context datang dari mana dan bagaimana diverifikasi?
2. Di layer mana data tenant bisa bocor?
3. Apakah cache, search, dan export tenant-aware?
4. Apa yang mencegah satu tenant menghabiskan kapasitas bersama?
5. Siapa yang bisa melakukan akses lintas tenant, dan bagaimana diaudit?

---

## 19. Mini Latihan

Latihan:
1. Petakan semua titik yang harus membawa tenant context.
2. Audit satu cache layer untuk tenant contamination risk.
3. Tentukan batas resource per tenant.
4. Uji satu export/report agar tidak mencampur tenant.
5. Tinjau tooling internal untuk akses lintas tenant.

---

## 20. Checklist Kelulusan Topik Multi-Tenant Isolation

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat isolasi tenant sebagai data + access + resource problem,
- membedakan logical vs physical isolation,
- merancang tenant-aware behavior di seluruh layer,
- memahami noisy neighbor sebagai risiko nyata,
- mengaudit dan menguji boundary tenant secara serius.

---

## 21. Ringkasan Brutal

- Multi-tenant itu murah sampai tenant mulai saling bocor.
- Isolasi tenant yang lemah
  bukan bug kecil.
- Itu adalah kegagalan arsitektur inti.
