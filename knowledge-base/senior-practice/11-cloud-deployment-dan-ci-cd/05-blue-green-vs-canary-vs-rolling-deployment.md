# Blue-Green vs Canary vs Rolling Deployment

## Tujuan

Dokumen ini membandingkan strategi deploy **blue-green**, **canary**, dan **rolling**: mekanisme, trade-off risiko, biaya resource, dan kapan masing-masing masuk akal.

## Kenapa Topik Ini Penting

- Memilih strategi tanpa memahami trade-off menghasilkan insiden saat traffic dialihkan.
- “Zero downtime” marketing sering menyembunyikan biaya dan kompleksitas.

## Rolling deployment

### Cara kerja

Versi baru digulirkan ke subset instance secara bertahap hingga semua instance baru.

### Kelebihan

- sederhana di banyak orchestrator;
- tidak memerlukan duplikasi kapasitas penuh kedua versi sepanjang waktu.

### Kekurangan

- periode campuran versi lama dan baru—penting backward/forward compatibility;
- deteksi masalah bisa tertunda jika rollout lambat tanpa metrik per versi.

### Cocok untuk

stateless service dengan migrasi kompatibel dan health check baik.

## Blue-green deployment

### Cara kerja

Dua environment penuh: **blue** (current) dan **green** (new). Switch traffic sekaligus setelah verifikasi green.

### Kelebihan

- cutover cepat dan jelas;
- rollback sering secepat switch balik ke blue;
- memudahkan smoke test terhadap green sebelum switch.

### Kekurangan

- membutuhkan **kapasitas ganda** sementara atau auto-scale agresif;
- stateful component (DB, queue) perlu strategi migrasi hati-hati;
- session affinity bisa rumit.

### Cocok untuk

release besar dengan test pasca-deploy ketat dan budget infra memadai.

## Canary deployment

### Cara kerja

Traffic kecil dialirkan ke versi baru; metrik dan error memandu **promosi bertahap** atau **rollback otomatis**.

### Kelebihan

- blast radius kecil pada fase awal;
- mendeteksi regresi performa/error rate lebih awal pada traffic nyata.

### Kekurangan

- membutuhkan **routing** dan observability per versi;
- durasi canary lebih panjang;
- lalu lintas campuran memerlukan kompatibilitas API/schema.

### Cocok untuk

layanan dengan traffic besar dan metrik matang.

## Perbandingan cepat

| Aspek | Rolling | Blue-Green | Canary |
|-------|---------|------------|--------|
| Blast radius | Medium | High saat switch | Low awal |
| Biaya resource | Rendah-sedang | Tinggi sementara | Sedang |
| Kompleksitas routing | Rendah | Sedang | Tinggi |
| Waktu rollback | Tergantung stage | Cepat | Cepat jika otomatis |

## Kompatibilitas versi

Semua strategi memerlukan:

- API backward compatible atau dual-write/dual-read sementara;
- migrasi DB dua fase bila perlu;
- feature flag untuk perilaku berisiko.

Tanpa kompatibilitas, canary hanya menunda kehancuran.

## Database dan state

Deploy aplikasi tidak sama dengan migrasi skema:

- expand/contract migration;
- urutan deploy consumer vs producer;
- job replay compatibility.

## Observability wajib

Metrik per versi (image tag, build id) dan trace sampling memadai.

Tanpa itu, canary buta.

## Load balancer dan mesh

Implementasi sering melalui:

- weighted routes;
- service mesh traffic split;
- ingress annotations.

Dokumentasikan perilaku saat health check flaky.

## Anti-pattern

### Canary 1% tanpa cukup traffic

Sinyal statistik tidak bermakna.

### Blue-green tanpa smoke test green

Switch adalah big bang berisiko.

### Rolling terlalu cepat tanpa automated stop

Error melebar sebelum deteksi.

## Heuristik senior

1. Mulai rolling yang baik sebelum canary otomatis kompleks.
2. Canary otomatis butuh SLO dan alert yang sudah matang.
3. Blue-green pertimbangkan biaya dan stateful edge cases.

## Pertanyaan interview

### Dasar

- Apa perbedaan rolling dan blue-green?
- Kenapa canary membutuhkan traffic cukup?

### Menengah

- Bagaimana Anda menangani session sticky saat blue-green?
- Bagaimana migrasi DB mempengaruhi pilihan strategi?

### Senior

- Bagaimana Anda mendesain progressive delivery di multi-region?

## Kasus nyata

- Canary otomatis rollback gagal karena metrik global tercampur—perbaikan: breakdown per pod/version.

## Ringkasan brutal

- Strategi deploy adalah **trade-off risiko, biaya, dan kompleksitas routing**—pilih berdasarkan data traffic dan kematangan observability.

## Checklist

- [ ] Metrik per versi tersedia.
- [ ] Rencana rollback terdokumentasi.
- [ ] Kompatibilitas versi diuji.
- [ ] DB migration path jelas.

## Penutup

Nama strategi kurang penting dibanding **disiplin kompatibilitas** dan **sinyal rollback**.

## Kedalaman: progressive delivery

Gabungan canary + feature flag + automated analysis—kuat tetapi butuh governance.

## Kedalaman: Kubernetes defaults

Rolling update default Kubernetes bukan canary otomatis—tambahkan analysis tool atau mesh jika perlu.

## Latihan meja

Pilih strategi untuk layanan pembayaran vs landing page marketing dengan alasan spesifik.

## Glosarium

- **Blast radius**: luas dampak jika versi baru buruk.

## Ekstensi: serverless

Cold start dan concurrency limits mempengaruhi perceived canary—sesuaikan concurrency provision.

## Penutup organisasi

Standarisasi strategi per kelas layanan mengurangi kebingungan on-call.

## Lampiran: keputusan tree sederhana

- traffic kecil + tim kecil → rolling hati-hati;
- traffic besar + observability kuat → canary;
- cutover besar + duplikasi OK → blue-green.

## Refleksi

Jika rollback selalu panik, perbaiki health check dan deployment pipeline sebelum strategi eksotis.

## Penutup akhir

Deploy strategy tanpa observability per versi adalah **teater aman**—industri melihat metrik, bukan slide.
