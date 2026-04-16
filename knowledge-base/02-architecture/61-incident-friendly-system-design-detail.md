# Incident-Friendly System Design - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu incident-friendly system design
- kenapa sistem harus mudah dipulihkan, bukan hanya mudah dibangun
- bagaimana desain memengaruhi triage, diagnosis, dan recovery
- anti-pattern saat sistem terlalu misterius saat gagal

Banyak sistem terlihat bagus
saat semuanya sehat.

Itu bukan standar yang cukup.

Sistem yang matang
harus juga dinilai dari pertanyaan:
- saat insiden terjadi,
  apakah tim bisa memahami,
  membatasi,
  dan memulihkannya dengan cepat?

Incident-friendly design berarti
sistem dirancang
agar manusia bisa menanganinya
saat keadaan buruk.

---

## 1. Apa Itu Incident-Friendly System Design?

Ini adalah pendekatan desain
yang memprioritaskan
kemudahan operasional saat insiden:
- diagnosis
- containment
- mitigation
- rollback
- recovery

Tujuannya bukan mencegah semua insiden.
Itu mustahil.

Tujuannya:
- saat insiden datang,
  sistem tidak menjadi teka-teki beracun.

---

## 2. Kenapa Ini Penting?

Karena biaya insiden
tidak hanya datang dari bug awal,
tapi juga dari:
- lamanya waktu memahami masalah
- luasnya blast radius
- sulitnya rollback
- tidak jelasnya ownership

Dua sistem bisa punya bug yang sama,
tapi sistem yang lebih incident-friendly
akan pulih jauh lebih cepat.

Itu nilai arsitektur nyata.

---

## 3. Diagnosability

Sistem incident-friendly
mudah didiagnosis.

Artinya:
- sinyal cukup
- context cukup
- dependency map cukup jelas
- correlation antar event ada

Kalau saat ada error
tim bahkan tidak tahu
request ini lewat mana,
siapa yang gagal,
dan kapan mulai rusak,
sistem itu tidak incident-friendly.

---

## 4. Controllability

Tim harus punya tuas kendali:
- feature flags
- traffic controls
- breaker/fallback
- queue pause
- kill switch

Kalau satu-satunya pilihan saat insiden
hanya:
- deploy kode baru sambil panik

itu berarti sistem kurang controllable.

Sistem yang baik memberi opsi penahanan cepat.

---

## 5. Blast Radius Awareness

Desain yang baik
memikirkan:
- jika komponen ini gagal,
  siapa saja terdampak?

Komponen yang terlalu sentral
tanpa isolation
akan menciptakan insiden besar.

Incident-friendly design
sering berarti:
- isolasi domain
- isolasi dependency
- isolasi tenant
- isolasi workload

Semakin kecil radius,
semakin mudah penanganannya.

---

## 6. Clear Failure Modes

Sistem ramah insiden
gagal dengan cara yang dapat dipahami.

Contoh baik:
- timeout jelas
- error code konsisten
- fallback state terlihat
- queue lag terukur

Contoh buruk:
- kadang lambat
- kadang diam
- kadang respons sukses palsu
- kadang data setengah benar

Failure mode yang kabur
memperpanjang triage.

---

## 7. Human-Centered Operations

Incident-friendly design
bukan hanya soal mesin.

Ia juga soal manusia operator:
- apakah on-call bisa mengerti keadaan?
- apakah langkah mitigasi jelas?
- apakah dashboard membantu?
- apakah istilah sistem konsisten?

Sistem yang hanya "dipahami penciptanya"
adalah sistem yang rapuh secara organisasi.

---

## 8. Safe Defaults

Saat ketidakpastian tinggi,
default behavior penting.

Contoh:
- fail closed untuk operasi sensitif
- degrade fitur opsional
- reject request berat saat overload

Safe default membantu tim
saat belum sempat menganalisis penuh.

Default yang liar
membuat insiden bergerak lebih cepat
daripada manusia bisa bereaksi.

---

## 9. Reversible Changes

Sistem incident-friendly
lebih suka perubahan yang bisa dibalik:
- backward-compatible schema
- feature flags
- incremental rollout
- replayable jobs

Semakin reversible perubahan,
semakin banyak pilihan mitigasi saat insiden.

Jika setiap perubahan bersifat sekali jalan,
ruang gerak operasi menyempit.

---

## 10. Visibility of State

Operator perlu tahu:
- sistem sedang di mode apa?
- fitur mana yang degrade?
- queue mana yang macet?
- apakah breaker sedang open?
- apakah rollout baru aktif?

State operasional yang tersembunyi
membuat insiden terasa seperti sihir hitam.

State penting harus terlihat.

---

## 11. Healthcare Example

Dalam sistem klinik,
incident-friendly design bisa berarti:
- booking core dipisah dari analytics tambahan
- notifikasi bisa dimatikan terkontrol
- operator bisa lihat queue reminder backlog
- feature rollout bisa dihentikan cepat
- audit akses sensitif bisa ditelusuri

Saat insiden terjadi,
tim tidak perlu menebak-nebak
area mana yang masih aman.

---

## 12. Runbooks and System Shape

Runbook penting,
tapi runbook tidak bisa menyelamatkan
sistem yang bentuknya sendiri tidak bisa dikendalikan.

Desain dan runbook harus selaras.

Kalau arsitekturnya:
- tidak punya signal
- tidak punya switch
- tidak punya ownership jelas

runbook hanya akan berbunyi:
- "semoga berhasil"

Itu bukan strategi.

---

## 13. Ownership dan Boundaries

Saat insiden, pertanyaan awal selalu:
- siapa yang memegang ini?

Boundary ownership yang jelas
membantu:
- eskalasi cepat
- keputusan cepat
- containment cepat

Arsitektur yang semua komponennya
setengah dimiliki semua orang
akan lambat saat krisis.

---

## 14. Testing Failure Paths

Desain ramah insiden
tidak hanya memikirkan happy path.

Perlu diuji:
- dependency down
- queue backlog
- partial failure
- bad rollout
- stale cache

Kalau failure path tidak pernah diuji,
kepercayaan pada sistem saat insiden
lebih banyak didasarkan pada doa.

---

## 15. Anti-Pattern Umum

1. Sistem hanya dioptimalkan untuk happy path.
2. Tidak ada switch mitigasi cepat.
3. Error/failure mode terlalu misterius.
4. Ownership tidak jelas saat komponen gagal.
5. State operasional penting tidak terlihat di telemetry/tooling.

---

## 16. Best Practices

- desain sistem agar mudah dipahami saat gagal.
- sediakan tuas mitigasi yang cepat dan aman.
- kecilkan blast radius lewat isolasi.
- buat state operasional penting terlihat.
- pikirkan manusia on-call sebagai pengguna sistem juga.

---

## 17. Pertanyaan Desain Penting

Sebelum menyebut sistem siap produksi, tanya:
1. Jika komponen ini gagal, bagaimana tim akan tahu?
2. Tuas mitigasi tercepat apa yang tersedia?
3. Seberapa besar blast radius-nya?
4. Siapa owner yang bertanggung jawab?
5. Apakah operator bisa memahami mode sistem saat ini tanpa tebak-tebakan?

---

## 18. Mini Latihan

Latihan:
1. Ambil satu arsitektur layanan dan petakan blast radius komponen inti.
2. Identifikasi tuas mitigasi cepat yang tersedia dan yang belum ada.
3. Tinjau apakah state rollout/degrade/breaker terlihat jelas.
4. Simulasikan insiden dan lihat apakah ownership cepat ditentukan.
5. Buat daftar perbaikan agar sistem lebih mudah ditriage saat gagal.

---

## 19. Checklist Kelulusan Topik Incident-Friendly System Design

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat desain sistem dari perspektif penanganan insiden,
- memikirkan diagnosability, controllability, dan blast radius,
- menyediakan tuas mitigasi dan state visibility yang cukup,
- memprioritaskan reversible change dan clear ownership,
- membangun sistem yang tidak berubah jadi misteri saat gagal.

---

## 20. Ringkasan Brutal

- Sistem yang sulit ditangani saat insiden
  adalah sistem yang belum selesai didesain.
- Kehebatan arsitektur diuji
  bukan saat demo berjalan mulus,
  tapi saat operator harus menyelamatkannya.
