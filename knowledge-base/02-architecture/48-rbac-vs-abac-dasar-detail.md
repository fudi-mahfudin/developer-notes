# RBAC vs ABAC Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu RBAC
- apa itu ABAC
- kapan role-based access cukup
- kapan attribute-based access diperlukan
- trade-off kesederhanaan vs fleksibilitas

Begitu sistem akses tumbuh,
pertanyaan muncul:
- izin diatur berdasarkan role saja,
  atau perlu context/attribute tambahan?

RBAC dan ABAC
adalah dua model penting
untuk menjawab itu.

Tidak ada yang otomatis lebih hebat.
Yang ada hanyalah
model yang cukup
atau model yang sudah tidak muat lagi.

---

## 1. Apa Itu RBAC?

RBAC = Role-Based Access Control.

Dalam RBAC,
izin diberikan berdasarkan role.

Contoh role:
- admin
- doctor
- nurse
- finance

User mendapat role,
lalu role membawa permission tertentu.

RBAC populer
karena sederhana dipahami.

---

## 2. Apa Itu ABAC?

ABAC = Attribute-Based Access Control.

Dalam ABAC,
keputusan akses didasarkan pada attribute,
misalnya:
- role user
- department
- tenant
- lokasi
- waktu
- ownership resource
- status resource

ABAC lebih fleksibel
karena keputusan tidak hanya bergantung
pada satu label role.

---

## 3. Kenapa RBAC Sangat Populer?

Karena RBAC:
- mudah dijelaskan
- mudah diimplementasikan
- mudah diaudit pada skala kecil sampai menengah

Untuk banyak sistem,
RBAC sudah cukup lama
sebelum complexity meledak.

Kalau kebutuhanmu sederhana,
RBAC adalah pilihan pragmatis.

Jangan meremehkan kesederhanaan yang cukup.

---

## 4. Kelemahan RBAC

Saat sistem tumbuh,
RBAC bisa mulai bermasalah:
- role makin banyak
- role makin mirip
- exception makin banyak
- role name jadi membawa banyak arti tersembunyi

Ini sering disebut role explosion.

Kalau setiap variasi context
dibuatkan role baru,
modelnya mulai patah.

---

## 5. Kelebihan ABAC

ABAC unggul saat keputusan akses
bergantung pada context.

Contoh:
- dokter boleh lihat pasien
  hanya jika assigned pada klinik yang sama
- data tertentu hanya boleh diakses
  pada jam kerja tertentu
- resource hanya bisa diedit
  jika statusnya masih draft

RBAC murni sulit menangani semua ini
tanpa meledak jadi banyak role aneh.

---

## 6. Kelemahan ABAC

ABAC lebih fleksibel,
tapi juga:
- lebih sulit dipahami
- lebih sulit dites
- lebih sulit diaudit
- lebih mudah salah konfigurasi

Kalau tidak dimodelkan dengan rapi,
ABAC bisa berubah jadi policy jungle.

Fleksibilitas tinggi
tanpa governance
cepat menjadi kebingungan tinggi.

---

## 7. Role Explosion

Ini masalah khas RBAC.

Contoh role mulai tumbuh:
- doctor
- senior-doctor
- clinic-a-doctor
- clinic-b-doctor
- read-only-doctor
- lab-doctor
- temporary-doctor

Kalau setiap nuance dibuat role,
sistem akan sulit dikelola.

Itu tanda bahwa mungkin
attribute/context sudah perlu masuk.

---

## 8. Attribute Examples

Attribute dalam ABAC bisa berasal dari:
- subject
- resource
- action
- environment/context

Contoh subject:
- department = cardiology

Contoh resource:
- patient.clinic_id = X

Contoh environment:
- request_time within work shift

Policy kemudian menilai kombinasi itu.

---

## 9. Hybrid Reality

Dalam praktik,
banyak sistem memakai hybrid:
- RBAC sebagai base layer
- ABAC untuk refinement

Contoh:
- hanya role `doctor` yang boleh mengakses fitur klinis
- lalu attribute menentukan pasien mana yang boleh dilihat

Ini sering lebih masuk akal
daripada RBAC murni atau ABAC murni.

---

## 10. Ownership Rules

Banyak kebutuhan akses
sebenarnya terkait ownership:
- user hanya boleh edit resource miliknya
- dokter hanya boleh akses pasien yang assigned

Ini sudah mulai masuk territory
yang lebih mirip ABAC/policy-based thinking
daripada RBAC sederhana.

Jangan paksa semuanya
masuk ke role jika domain-nya contextual.

---

## 11. Healthcare Example

RBAC:
- doctor bisa melihat data klinis
- finance bisa melihat billing

ABAC/refinement:
- doctor hanya boleh melihat pasien di kliniknya
- nurse hanya boleh update bagian tertentu
- record sensitif tertentu butuh additional attribute/policy

Ini menunjukkan
kenapa sistem healthcare
sering membutuhkan lebih dari RBAC murni.

---

## 12. Audit dan Explainability

RBAC lebih mudah dijelaskan:
- user punya role X,
  role X punya izin Y

ABAC lebih sulit:
- keputusan datang dari kombinasi attribute dan policy

Jika memakai ABAC,
tim harus serius memikirkan:
- explainability
- auditability
- testing

Kalau tidak,
deny/allow akan terasa misterius.

---

## 13. Testing Policy

RBAC relatif mudah dites.

ABAC perlu lebih banyak skenario:
- attribute berbeda
- state resource berbeda
- context berbeda

Jadi biaya testing ABAC lebih tinggi.

Kalau tim tidak siap menguji policy,
flexibility ABAC bisa menjadi liability.

---

## 14. Governance

Semakin fleksibel model akses,
semakin penting governance:
- siapa boleh menambah policy?
- bagaimana review policy?
- bagaimana deprecate rule lama?

ABAC tanpa governance
sering berubah menjadi aturan yang saling bertabrakan.

RBAC juga butuh governance,
tapi biasanya lebih mudah dikelola.

---

## 15. Kapan RBAC Cukup?

RBAC sering cukup jika:
- organisasi kecil/menengah
- role jelas dan stabil
- exception sedikit
- context access tidak rumit

Jangan over-engineer.

Kalau role sederhana cukup,
tidak perlu buru-buru membuat policy engine rumit.

---

## 16. Kapan ABAC Dibutuhkan?

ABAC mulai masuk akal jika:
- akses sangat contextual
- ownership/resource state penting
- tenant/location/time/status memengaruhi izin
- role explosion mulai terasa

ABAC bukan upgrade wajib.
Ia adalah respons terhadap kebutuhan yang benar-benar ada.

---

## 17. Anti-Pattern Umum

1. Memaksa semua nuance ke role baru tanpa batas.
2. Memakai ABAC penuh padahal kebutuhan sederhana.
3. Policy ABAC dibuat tanpa explainability.
4. Tidak menguji kombinasi attribute penting.
5. Tidak punya governance untuk perubahan model akses.

---

## 18. Best Practices

- mulai sederhana dengan RBAC jika itu cukup.
- perkenalkan attribute/policy saat context benar-benar dibutuhkan.
- pertimbangkan hybrid RBAC + ABAC sebagai pendekatan pragmatis.
- buat keputusan akses bisa dijelaskan dan diaudit.
- jaga governance policy/access model dengan serius.

---

## 19. Pertanyaan Desain Penting

Sebelum memilih RBAC atau ABAC, tanya:
1. Apakah role cukup merepresentasikan izin?
2. Seberapa besar peran context/resource ownership?
3. Apakah role mulai meledak jumlahnya?
4. Apakah tim siap menguji dan mengaudit policy yang lebih fleksibel?
5. Apakah hybrid model lebih masuk akal?

---

## 20. Mini Latihan

Latihan:
1. Petakan satu sistem kecil ke model RBAC.
2. Identifikasi exception yang sulit dijelaskan hanya dengan role.
3. Tambahkan attribute rule untuk kasus contextual.
4. Nilai apakah hybrid model lebih sehat.
5. Tulis contoh alasan allow/deny yang harus bisa dijelaskan ke auditor.

---

## 21. Jawaban Contoh Ringkas

RBAC cocok untuk:
- izin berbasis peran yang stabil

ABAC cocok untuk:
- izin berbasis context, ownership, state, atau environment

Hybrid sering paling realistis.

---

## 22. Checklist Kelulusan Topik RBAC vs ABAC Dasar

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan model RBAC dan ABAC secara praktis,
- mengenali gejala role explosion,
- memahami kapan context/attribute diperlukan,
- memilih model yang sesuai kompleksitas domain,
- menjaga access model tetap bisa diuji dan diaudit.

---

## 23. Ringkasan Brutal

- RBAC itu sederhana sampai role-mu mulai beranak liar.
- ABAC itu kuat sampai policy-mu jadi hutan.
- Model akses yang sehat
  adalah yang cukup jelas untuk tim
  dan cukup tepat untuk domain.
