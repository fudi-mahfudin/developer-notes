# REST vs GraphQL vs RPC - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- perbedaan REST, GraphQL, dan RPC
- kapan masing-masing cocok dipakai
- trade-off dari sisi evolusi API, performance, coupling, dan operasional
- kesalahan umum saat memilih gaya API

Ini bukan perang agama.

Tidak ada gaya API
yang otomatis superior.

Ada kebutuhan yang berbeda,
dan setiap pilihan membawa biaya sendiri.

---

## 1. REST Itu Apa?

REST biasanya dipahami sebagai pendekatan API
berbasis resource.

Contoh:
- `/patients`
- `/appointments`
- `/doctors`

Operasi umum:
- GET
- POST
- PUT/PATCH
- DELETE

Keunggulan utamanya:
- familiar
- mudah dipahami
- cocok untuk banyak use case CRUD dan integrasi umum

---

## 2. GraphQL Itu Apa?

GraphQL adalah query language untuk API
yang memungkinkan client
meminta data dengan shape tertentu.

Biasanya ada satu endpoint utama,
lalu query/mutation menentukan data yang dibutuhkan.

Keunggulan utamanya:
- fleksibel untuk client
- dapat mengurangi overfetch/underfetch tertentu
- baik untuk graph data atau kebutuhan data kompleks

Tapi fleksibilitas ini punya biaya.

---

## 3. RPC Itu Apa?

RPC menekankan pemanggilan aksi/prosedur.

Contoh:
- `createAppointment`
- `cancelAppointment`
- `generateInvoice`

Ini dekat dengan mental model:
- "jalankan operasi ini"

RPC sering terasa natural
untuk command-heavy workflow
atau internal service interaction tertentu.

---

## 4. REST Berpikir dalam Resource

REST cocok saat domain bisa dimodelkan
sebagai resource dan representasi.

Keuntungan:
- URL dan operasi mudah dimengerti
- caching HTTP lebih natural
- tooling dan ekosistem matang

Kekurangan:
- untuk workflow kompleks,
  kadang terasa dipaksakan
- data composition lintas resource
  bisa jadi berisik

---

## 5. GraphQL Berpikir dalam Data Shape

GraphQL kuat saat client
butuh fleksibilitas data.

Contoh:
- satu layar perlu sebagian data pasien,
  appointment,
  dan doctor profile sekaligus

GraphQL memungkinkan client meminta
apa yang diperlukan saja.

Tetapi:
- schema governance
- query complexity
- caching
- authorization detail

menjadi lebih menantang.

---

## 6. RPC Berpikir dalam Action

RPC cocok saat operasi
lebih alami dipahami sebagai action.

Contoh:
- approve claim
- reschedule appointment
- send reminder

Memaksa semua ini jadi REST murni
kadang menghasilkan desain resource
yang jujur saja aneh.

RPC memberi kejelasan intent
untuk command-style operations.

---

## 7. CRUD vs Workflow

Ini kunci pemilihan.

Jika dominan:
- CRUD resource publik

REST sering cukup.

Jika dominan:
- komposisi data kompleks untuk client

GraphQL bisa menarik.

Jika dominan:
- command/workflow eksplisit

RPC sering lebih natural.

---

## 8. Overfetch dan Underfetch

GraphQL sering dipuji
karena mengatasi overfetch/underfetch.

Benar, tapi jangan dibesar-besarkan.

REST yang dirancang baik
dengan endpoint/use case yang masuk akal
juga bisa efisien.

Jangan memilih GraphQL
hanya karena pernah mendengar kata overfetch.

Pilih jika problem itu nyata dan signifikan.

---

## 9. Caching

REST biasanya unggul
dalam model caching HTTP standar.

GraphQL caching cenderung lebih rumit
karena banyak query melalui satu endpoint
dan shape data bervariasi.

RPC bergantung bentuk implementasinya,
tapi caching tidak selalu senatural REST.

Kalau caching publik penting,
REST sering lebih mudah dioperasikan.

---

## 10. Evolusi Schema dan Client

REST:
- versioning bisa eksplisit
- perubahan field sering manageable

GraphQL:
- schema evolution fleksibel
- deprecation field cukup elegan

RPC:
- perubahan contract harus dijaga hati-hati
- aksi biasanya sangat spesifik

Tidak ada yang gratis.
Semakin fleksibel,
semakin berat governance-nya.

---

## 11. Authorization Complexity

Pada REST,
authorization sering dipikirkan per endpoint/resource.

Pada GraphQL,
authorization bisa lebih rumit
karena satu query bisa menyentuh banyak field dan relationship.

Pada RPC,
authorization sering jelas per action,
tapi jumlah action bisa banyak.

Jadi pemilihan API style
memengaruhi desain security model.

---

## 12. Observability

REST relatif mudah dipantau
karena endpoint jelas.

GraphQL butuh observability lebih matang:
- operation name
- resolver performance
- query depth/complexity

RPC juga butuh penamaan dan tracing yang baik,
terutama jika operation count tinggi.

Kalau tim belum matang secara operasional,
pilihan API yang lebih fleksibel
bisa menambah beban observability.

---

## 13. Team Skill dan Cost

Faktor manusia penting.

REST biasanya paling mudah diadopsi
oleh banyak tim.

GraphQL butuh kedisiplinan schema dan tooling.

RPC butuh naming dan command modeling yang jelas.

Pilih yang bisa dikelola tim,
bukan yang paling keren di konferensi.

---

## 14. Public API vs Internal API

Untuk public API umum,
REST sering jadi pilihan pragmatis.

Untuk backend-for-frontend tertentu,
GraphQL bisa memberi nilai besar.

Untuk internal command service
atau strongly typed internal contract,
RPC sering sangat nyaman.

Konteks interface berbeda
berarti trade-off juga berbeda.

---

## 15. Healthcare Example

REST cocok untuk:
- public directory dokter
- patient CRUD admin tertentu

GraphQL cocok untuk:
- portal frontend yang butuh gabungan data
  dari banyak resource dalam satu view kompleks

RPC cocok untuk:
- `rescheduleAppointment`
- `approveInsuranceClaim`
- `sendMedicationReminder`

Satu organisasi bisa memakai kombinasi,
dan itu normal.

---

## 16. Hybrid Approach

Banyak sistem sehat memakai campuran:
- REST untuk public/simple resources
- GraphQL untuk BFF/client composition
- RPC untuk action-heavy internal operations

Ini bukan inkonsistensi otomatis.

Yang penting:
- boundary jelas
- alasan jelas
- operasional jelas

Hybrid tanpa disiplin akan kacau.
Hybrid dengan alasan yang tepat bisa sangat efektif.

---

## 17. Anti-Pattern Umum

1. Memilih GraphQL hanya karena hype.
2. Memaksa semua workflow menjadi REST resource palsu.
3. Membuat RPC action liar tanpa naming discipline.
4. Mengabaikan biaya authorization dan observability.
5. Menganggap satu gaya harus dipakai untuk semua interface.

---

## 18. Best Practices

- nilai apakah domain lebih natural sebagai resource, data graph, atau action.
- pertimbangkan siapa client-nya dan kebutuhan mereka.
- masukkan faktor caching, observability, dan security dalam keputusan.
- jangan dogmatis terhadap satu gaya API.
- dokumentasikan alasan pemilihan interface style.

---

## 19. Pertanyaan Desain Penting

Sebelum memilih REST, GraphQL, atau RPC, tanya:
1. Masalah utama yang ingin diselesaikan apa?
2. Apakah client butuh fleksibilitas shape data yang tinggi?
3. Apakah operasi lebih natural sebagai resource atau action?
4. Bagaimana caching dan observability akan bekerja?
5. Apakah tim siap mengelola kompleksitas pilihan ini?

---

## 20. Mini Latihan

Latihan:
1. Ambil lima endpoint dan tentukan lebih cocok REST, GraphQL, atau RPC.
2. Cari satu workflow yang dipaksa jadi REST padahal lebih natural sebagai RPC.
3. Cari satu view kompleks yang mungkin cocok dengan GraphQL/BFF.
4. Evaluasi dampak authorization dari tiap pilihan.
5. Buat argumen kapan hybrid approach masuk akal.

---

## 21. Jawaban Contoh Ringkas

REST:
- resource umum
- integrasi publik

GraphQL:
- kebutuhan data composition kompleks
- client flexibility tinggi

RPC:
- command/action eksplisit
- workflow bisnis yang tidak natural sebagai resource CRUD

---

## 22. Checklist Kelulusan Topik REST vs GraphQL vs RPC

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan model mental tiap gaya API,
- memilih berdasarkan use case, bukan slogan,
- menilai trade-off caching, schema evolution, dan observability,
- memahami kapan hybrid approach masuk akal,
- menghindari pemilihan API style karena hype semata.

---

## 23. Ringkasan Brutal

- API style adalah alat.
- Masalah muncul saat alat diperlakukan seperti identitas.
- Kalau kamu memilih GraphQL, REST, atau RPC tanpa tahu problem yang disasar,
  kamu tidak sedang mendesain.
  Kamu sedang meniru.
