# Authn vs Authz - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- perbedaan authentication dan authorization
- kenapa banyak sistem mencampur keduanya
- konsekuensi desain jika keduanya tidak dibedakan
- contoh penerapan pada sistem nyata

Ini topik dasar,
tapi dampaknya besar.

Banyak bug security dan arsitektur akses
berasal dari satu hal sederhana:
- tim tidak jelas
  apakah mereka sedang memastikan identitas
  atau sedang memastikan izin.

Authn dan authz itu dekat,
tapi tidak sama.

Kalau dicampur,
logic akses cepat berantakan.

---

## 1. Apa Itu Authentication?

Authentication adalah proses
memastikan siapa subjeknya.

Pertanyaan authn:
- siapa kamu?

Contoh:
- login dengan password
- OTP verification
- session validation
- token verification

Hasil authn biasanya:
- identitas diketahui
- principal/user terikat ke request

---

## 2. Apa Itu Authorization?

Authorization adalah proses
memastikan apa yang boleh dilakukan subjek itu.

Pertanyaan authz:
- boleh ngapain?

Contoh:
- apakah user ini boleh lihat data pasien?
- apakah role ini boleh approve claim?
- apakah tenant ini boleh mengakses resource ini?

Identitas bisa valid,
tapi izin bisa tetap ditolak.

---

## 3. Kenapa Sering Tercampur?

Karena secara alur,
authn sering terjadi lebih dulu,
lalu authz setelahnya.

Tim lalu berpikir:
- ini satu masalah yang sama

Padahal beda.

Seseorang bisa:
- authenticated
  tapi
- unauthorized

Kalau distinction ini kabur,
sistem akan membuat keputusan akses yang lemah.

---

## 4. Authn Menjawab "Who", Authz Menjawab "Can"

Cara paling sederhana mengingat:
- Authn = who are you?
- Authz = what can you do?

Ini bukan slogan kosong.

Ini membantu membedakan layer desain:
- identity proof
- access decision

Dua masalah ini punya logika,
data,
dan evolusi yang berbeda.

---

## 5. Authn Tanpa Authz Tidak Cukup

Kalau sistem hanya memastikan user login,
tapi tidak memeriksa izin,
semua user terautentikasi
bisa menjadi terlalu kuat.

Ini sangat umum
di aplikasi internal yang tumbuh cepat.

Begitu jumlah role dan domain sensitif naik,
ketidakjelasan authz menjadi bahaya nyata.

---

## 6. Authz Tanpa Authn yang Jelas Juga Bermasalah

Kalau principal/request context tidak jelas,
authz juga goyah.

Karena keputusan izin
bergantung pada:
- siapa actor-nya
- tenant apa
- role apa
- scope apa

Kalau identitas longgar atau ambigu,
otorisasi jadi rawan salah.

Authn adalah fondasi context.
Authz memakai context itu untuk keputusan.

---

## 7. Authentication Methods Beragam

Authn bisa berbentuk:
- password
- session cookie
- token
- SSO
- API key
- mTLS untuk machine identity tertentu

Yang penting:
- metode authn
  tidak otomatis menentukan authz model

Jangan campur mekanisme identitas
dengan model izin akses.

---

## 8. Authorization Models Beragam

Authz bisa berbasis:
- role
- attribute
- ownership
- policy
- scope
- tenant boundary

Di sistem kecil,
authz mungkin cukup sederhana.

Di sistem besar,
authz bisa menjadi salah satu domain paling kompleks.

Itu sebabnya pemisahan konsep penting.

---

## 9. Request Lifecycle

Urutan sehat biasanya:
1. identitas diverifikasi
2. principal dibangun
3. resource/action diketahui
4. policy akses diperiksa
5. keputusan allow/deny dibuat

Kalau langkah-langkah ini bercampur
di handler acak,
reasoning security akan cepat rusak.

---

## 10. Resource-Centric Thinking

Authz yang baik
sering berpikir dalam bentuk:
- actor
- action
- resource
- context

Contoh:
- dokter A boleh `read`
  resource `patient_record`
  dalam konteks `assigned clinic`

Ini lebih sehat
daripada if-else liar tersebar di controller.

---

## 11. Healthcare Example

Contoh:
- user login berhasil sebagai dokter

Itu authn.

Lalu sistem memeriksa:
- apakah dokter ini memang assigned ke pasien itu?
- apakah ia punya scope untuk melihat hasil lab tertentu?

Itu authz.

Kalau sistem berhenti di "dia dokter",
data sensitif bisa bocor lintas pasien.

---

## 12. Service-to-Service Context

Pada arsitektur service,
pertanyaan juga muncul:
- service ini bertindak sebagai siapa?
- atas nama user?
- atas nama system principal?

Authn dan authz
tidak hanya untuk manusia.

Machine identity dan permission
juga bagian dari arsitektur keamanan.

---

## 13. Caching Access Decisions

Kadang authz decision di-cache.

Hati-hati:
- role bisa berubah
- assignment bisa dicabut
- tenant scope bisa diperbarui

Kalau access decision di-cache sembarangan,
izin lama bisa bertahan terlalu lama.

Authz freshness
adalah pertimbangan nyata.

---

## 14. Error Semantics

Kadang penting membedakan:
- unauthenticated
- unauthorized

Karena maknanya beda:
- belum terbukti identitas
- identitas valid tapi tidak punya izin

Ini memengaruhi:
- UX
- API semantics
- audit log
- troubleshooting

Jangan menyamakan semuanya jadi "forbidden-ish".

---

## 15. Auditability

Keputusan authz yang penting
sering perlu bisa diaudit:
- siapa mencoba apa
- kenapa ditolak
- policy apa yang dipakai

Di domain sensitif seperti healthcare,
ini sangat bernilai.

Security bukan hanya blokir.
Security juga perlu jejak keputusan.

---

## 16. Anti-Pattern Umum

1. Mengira login sukses berarti akses sah ke semua resource.
2. Menyebar logic authz ke handler random tanpa model jelas.
3. Mencampur identitas dan izin dalam satu blob yang kabur.
4. Tidak membedakan unauthenticated vs unauthorized.
5. Tidak memikirkan machine identity dan service-to-service auth.

---

## 17. Best Practices

- pisahkan dengan jelas authentication dan authorization.
- bangun request context yang konsisten setelah authn.
- modelkan authz berdasarkan actor, action, resource, dan context.
- audit keputusan akses penting.
- anggap authz sebagai domain desain serius, bukan if statement kecil.

---

## 18. Pertanyaan Desain Penting

Sebelum mendesain access control, tanya:
1. Bagaimana identitas dibuktikan?
2. Setelah identitas diketahui, keputusan izin ditentukan dari apa?
3. Resource dan action apa yang perlu diproteksi?
4. Apakah machine/service principal juga perlu diatur?
5. Keputusan akses mana yang harus bisa diaudit?

---

## 19. Mini Latihan

Latihan:
1. Ambil satu endpoint dan pisahkan logic authn vs authz-nya.
2. Tentukan actor-action-resource-context untuk tiga use case.
3. Bedakan response untuk unauthenticated vs unauthorized.
4. Petakan satu alur service-to-service dan principal-nya.
5. Identifikasi logic authz liar yang tersebar di UI/controller.

---

## 20. Jawaban Contoh Ringkas

Authn:
- memastikan siapa actor-nya

Authz:
- memastikan apa yang boleh actor lakukan

Keduanya saling terkait,
tapi tidak boleh dicampur secara konsep.

---

## 21. Checklist Kelulusan Topik Authn vs Authz

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan identitas dan izin secara tegas,
- merancang flow request yang memisahkan authn dan authz,
- memahami actor-action-resource-context,
- memikirkan human dan machine principal,
- menghindari desain akses yang kabur dan tidak bisa diaudit.

---

## 22. Ringkasan Brutal

- Login bukan izin.
- Identitas bukan otoritas.
- Kalau sistemmu menganggap user yang sudah masuk otomatis boleh banyak hal,
  sistemmu belum aman.
