# Orchestration vs Choreography - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu orchestration
- apa itu choreography
- trade-off koordinasi terpusat vs berbasis event
- kapan masing-masing cocok
- anti-pattern saat workflow lintas service tumbuh tanpa kendali

Begitu sistem punya beberapa service,
workflow lintas boundary akan muncul.

Pertanyaan penting:
- siapa yang mengatur langkah-langkahnya?

Kalau jawabannya tidak jelas,
workflow akan tumbuh liar.

Orchestration dan choreography
adalah dua cara utama
untuk mengatur alur itu.

---

## 1. Apa Itu Orchestration?

Orchestration berarti:
- ada komponen/flow yang secara eksplisit
  mengatur urutan langkah
  dan memanggil pihak lain

Mental model:
- ada conductor

Ia tahu:
- langkah 1
- langkah 2
- langkah 3
- apa yang dilakukan jika salah satu gagal

Alur lebih terpusat dan eksplisit.

---

## 2. Apa Itu Choreography?

Choreography berarti:
- tidak ada satu pengendali pusat yang kuat
- service bereaksi pada event
- alur muncul dari interaksi event tersebut

Mental model:
- setiap peserta tahu kapan harus bergerak
  saat event tertentu muncul

Ini terasa lebih longgar dan terdesentralisasi.

Tapi juga bisa lebih sulit dipahami
jika alur tumbuh besar.

---

## 3. Kelebihan Orchestration

Orchestration unggul pada:
- alur yang jelas
- visibilitas workflow
- langkah dan branching eksplisit
- error/compensation yang lebih terpusat

Jika bisnis ingin tahu:
- "alur lengkapnya bagaimana?"

orchestration sering lebih mudah dijelaskan.

---

## 4. Kelemahan Orchestration

Biaya orchestration:
- coordinator bisa jadi pusat coupling
- risiko god service/workflow engine
- perubahan banyak pihak bisa bertemu di satu tempat

Kalau tidak dijaga,
orchestrator menjadi monster
yang tahu terlalu banyak.

Jadi sentralisasi membantu clarity,
tapi juga membawa risiko konsentrasi complexity.

---

## 5. Kelebihan Choreography

Choreography unggul pada:
- loose temporal coupling
- event-driven reaction
- penambahan consumer baru yang lebih fleksibel
- distribusi tanggung jawab

Jika workflow relatif sederhana
dan domain event cukup stabil,
choreography bisa terasa elegan.

---

## 6. Kelemahan Choreography

Masalah utama choreography:
- alur keseluruhan jadi sulit dilihat
- debugging lintas service lebih sulit
- failure path bisa kabur
- perubahan kecil bisa punya efek kejutan

Kalau terlalu banyak service
saling menari tanpa peta,
sistem berubah jadi pesta misteri.

Kamu tahu event keluar.
Kamu tidak tahu siapa sebenarnya mengendalikan nasib workflow.

---

## 7. Explicit Flow vs Emergent Flow

Ini inti perbedaannya.

Orchestration:
- flow eksplisit

Choreography:
- flow emergent dari reaksi event

Jika workflow kritikal
dan butuh reasoning kuat,
flow eksplisit sering menang.

Jika sistem butuh extensibility
untuk side effect yang longgar,
flow emergent bisa cukup.

---

## 8. Failure Handling

Pada orchestration,
failure handling lebih mudah dipusatkan:
- retry
- compensation
- fallback

Pada choreography,
failure handling tersebar:
- service A publish
- service B gagal
- siapa tahu?
- siapa kompensasi?

Kalau model responsibility tidak jelas,
choreography bisa membuat incident handling kabur.

---

## 9. Domain Complexity Matters

Workflow sederhana dengan side effect longgar:
- sering cocok dengan choreography

Workflow panjang dengan banyak branch,
approval,
timeout,
compensation:
- sering lebih cocok dengan orchestration

Pilih berdasarkan complexity workflow,
bukan ideologi arsitektur.

---

## 10. Observability

Choreography menuntut observability yang jauh lebih matang:
- distributed tracing
- event correlation
- workflow visibility

Kalau tidak,
tim tidak akan tahu:
- event apa memicu apa
- langkah mana yang macet
- siapa yang bertanggung jawab

Orchestration juga butuh observability,
tapi jalur reasoning-nya biasanya lebih jelas.

---

## 11. Healthcare Example

Workflow sederhana:
- appointment dibuat
- notifikasi dan analytics bereaksi

Ini bisa cocok dengan choreography.

Workflow kompleks:
- claim submission
- validation
- manual review
- approval/rejection
- payment release
- audit & compensation

Ini sering lebih cocok dengan orchestration
karena alurnya penting dan eksplisit.

---

## 12. Choreography untuk Side Effects

Salah satu use case sehat:
- event domain utama dipublish
- beberapa side effect non-blocking bereaksi

Contoh:
- `AppointmentCreated`
  memicu:
  - notification
  - analytics
  - search projection

Di sini choreography memberi fleksibilitas
tanpa harus satu service pusat tahu semua hal kecil.

---

## 13. Orchestration untuk Business Workflow Inti

Jika bisnis benar-benar peduli
terhadap urutan dan status tiap langkah,
orchestration sering lebih baik.

Kenapa?
- progress jelas
- failure state jelas
- ownership workflow lebih jelas

Jangan takut sentralisasi
jika itu memang membantu reasoning.

Sentralisasi tidak otomatis jelek.

---

## 14. Hybrid Approach

Banyak sistem sehat memakai hybrid:
- orchestration untuk alur bisnis inti
- choreography untuk side effects turunan

Ini sering paling masuk akal.

Satu pola untuk semua workflow
jarang optimal.

Masalahnya bukan hybrid.
Masalahnya adalah hybrid tanpa boundary jelas.

---

## 15. Organizational Ownership

Pertanyaan penting:
- siapa pemilik workflow ini?

Orchestration sering lebih mudah
untuk ownership yang jelas.

Choreography kadang membuat tanggung jawab
tersebar terlalu halus.

Jika tidak ada yang benar-benar merasa memiliki
alur end-to-end,
incident akan lama dipulihkan.

---

## 16. Anti-Pattern Umum

1. Semua workflow dipaksa choreography karena ingin "loosely coupled".
2. Orchestrator dijadikan god service untuk semua hal.
3. Choreography dipakai tanpa tracing/correlation yang cukup.
4. Tidak jelas siapa owner failure handling.
5. Workflow inti kritikal dibiarkan menjadi emergent chaos.

---

## 17. Best Practices

- pilih orchestration untuk workflow inti yang kompleks dan sensitif.
- pilih choreography untuk side effects dan reaction yang cukup longgar.
- gunakan correlation/trace ID pada kedua model.
- pastikan ownership workflow jelas.
- jangan dogmatis: kombinasi sering paling sehat.

---

## 18. Pertanyaan Desain Penting

Sebelum memilih orchestration atau choreography, tanya:
1. Seberapa kompleks alur bisnis ini?
2. Apakah urutan langkah perlu eksplisit?
3. Siapa yang bertanggung jawab jika satu langkah gagal?
4. Apakah side effect ini cukup longgar untuk event-driven reaction?
5. Apakah tim punya observability yang memadai?

---

## 19. Mini Latihan

Latihan:
1. Ambil tiga workflow dan tentukan mana yang cocok orchestration vs choreography.
2. Identifikasi satu alur yang terlalu emergent dan sulit dilacak.
3. Identifikasi satu orchestrator yang mulai jadi god component.
4. Rancang hybrid model untuk satu proses bisnis.
5. Tentukan ownership dan observability requirement untuk workflow tersebut.

---

## 20. Jawaban Contoh Ringkas

Orchestration cocok untuk:
- approval flow
- multi-step workflow inti
- compensation-heavy process

Choreography cocok untuk:
- side effects
- event reaction longgar
- projection/notification/analytics style flow

---

## 21. Checklist Kelulusan Topik Orchestration vs Choreography

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan perbedaan flow eksplisit vs emergent,
- memilih pola sesuai kompleksitas workflow,
- memahami trade-off observability dan ownership,
- menghindari orchestrator monster dan choreography chaos,
- merancang hybrid workflow bila itu yang paling rasional.

---

## 22. Ringkasan Brutal

- Choreography yang tak terlihat indah di diagram
  sering terasa jelek di incident room.
- Orchestration yang terlalu besar
  terasa seperti monolith baru.
- Tugasmu bukan memilih pola yang terdengar keren.
- Tugasmu adalah membuat workflow bisa dipahami, dijalankan, dan dipulihkan.
