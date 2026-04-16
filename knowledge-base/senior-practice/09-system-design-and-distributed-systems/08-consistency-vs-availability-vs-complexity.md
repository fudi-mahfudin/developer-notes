# Consistency vs Availability vs Complexity

## Tujuan

Topik ini menjelaskan trade-off utama pada sistem terdistribusi: menjaga data konsisten, sistem tetap tersedia, dan kompleksitas tetap terkendali.

## Kenapa Penting

- Banyak desain gagal karena mengejar semua hal sekaligus.
- Konsistensi tinggi biasanya punya biaya availability/latency.
- Solusi "praktis" sering menambah kompleksitas operasi.

## Model Mental

1. Tidak ada sistem terdistribusi yang gratis trade-off.
2. Pilihan harus didorong kebutuhan bisnis per domain data.
3. Konsistensi tidak hitam-putih; ada spektrum.
4. Availability juga berspektrum.
5. Kompleksitas adalah biaya yang harus dihitung eksplisit.

## Konsistensi

Pertanyaan:

- Setelah write berhasil, apakah semua read langsung melihat nilai terbaru?
- Apakah urutan update selalu terjaga?

Strong consistency memberi kepastian tinggi, tapi bisa meningkatkan latensi dan mengurangi tolerance saat partisi.

## Availability

Availability berarti sistem tetap dapat melayani request dalam kondisi gangguan.

Ketersediaan tinggi sering butuh:

- fallback;
- replica;
- degradasi fitur;
- eventual consistency di beberapa area.

## Kompleksitas

Kompleksitas muncul dari:

- mekanisme replikasi;
- konflik data;
- retry/idempotency;
- saga/rekonsiliasi;
- observability lintas komponen.

Kompleksitas berlebih bisa memicu incident meski desain teorinya kuat.

## Domain-Based Decision

Contoh:

- saldo akun: konsistensi ketat.
- notifikasi badge: eventual acceptable.
- analytics dashboard: delay menit sering acceptable.

Satu kebijakan global untuk semua data biasanya salah.

## CAP Intuition

Saat partition jaringan:

- Anda sering harus memilih: konsistensi ketat atau availability tinggi.

Dalam praktik, keputusan dibuat per operasi/per domain, bukan satu kalimat slogan.

## Latency Impact

Konsistensi lebih ketat biasanya:

- butuh koordinasi lebih;
- menambah roundtrip;
- meningkatkan tail latency.

Ini harus dibandingkan dengan nilai bisnis dari correctness instan.

## Conflict Handling

Jika memilih availability + eventual consistency:

- konflik update bisa terjadi.
- butuh resolusi conflict policy.

Tanpa policy ini, data drift menumpuk.

## Reconciliation Cost

Eventual consistency butuh:

- process rekonsiliasi;
- audit trail;
- alert mismatch.

Ini biaya operasional nyata, bukan "nanti saja".

## User Expectation Management

Produk harus jujur soal behavior:

- "perubahan mungkin butuh beberapa detik muncul".

UX yang tidak sinkron dengan model consistency memicu kebingungan user.

## Availability with Degradation

Availability tidak selalu berarti semua fitur sempurna.
Bisa berarti:

- core flow tetap hidup;
- fitur tambahan ditunda.

## Anti-Pattern

### 1. Memaksa Strong Consistency di Semua Area

Biaya dan latensi meledak.

### 2. Memilih Eventual Tanpa Rekonsiliasi

Data drift tak terkendali.

### 3. Tidak Mengkomunikasikan Trade-off ke Produk

Ekspektasi user tidak realistis.

### 4. Mengabaikan Kompleksitas Operasional

Sistem sulit dipelihara.

## Heuristik Senior

1. Klasifikasikan data berdasarkan dampak kesalahan.
2. Tetapkan level consistency per use case.
3. Hitung biaya latensi dan operasi dari tiap pilihan.
4. Siapkan mekanisme rekonsiliasi jika memilih eventual.
5. Dokumentasikan kontrak consistency ke tim produk.
6. Pantau mismatch sebagai metrik first-class.
7. Tinjau ulang keputusan saat skala/fitur berubah.

## Pertanyaan Interview

### Dasar

- Apa bedanya consistency dan availability?
- Kenapa trade-off tidak bisa dihindari?
- Kapan eventual consistency bisa diterima?
- Apa risiko mengabaikan kompleksitas?

### Menengah

- Bagaimana menentukan level consistency per domain?
- Bagaimana mengelola conflict pada sistem eventual?
- Apa dampak strong consistency ke latency?
- Bagaimana mengukur kualitas availability?

### Senior

- Bagaimana Anda membuat keputusan consistency strategy untuk sistem multi-service finansial?
- Bagaimana Anda menjelaskan trade-off ini ke stakeholder non-teknis?
- Bagaimana Anda membangun operasi rekonsiliasi yang tidak membebani tim?
- Bagaimana Anda mengevaluasi apakah kompleksitas yang ditambah masih sepadan?

## Kasus Nyata

- saldo wallet tampil beda antar halaman karena eventual flow tanpa rekonsiliasi.
- sistem lock ketat menjaga konsistensi tapi p99 melonjak saat peak.
- notifikasi real-time dipaksa strong consistency dan justru sering timeout.
- tim produk kebingungan karena perilaku data tidak pernah dijelaskan.

## Ringkasan Brutal

- Anda tidak bisa maksimal di semua sisi sekaligus.
- Pilih trade-off berdasarkan nilai bisnis, bukan ego teknis.
- Tim senior berani menyatakan apa yang dikorbankan dan kenapa.

## Checklist

- Saya memetakan consistency requirement per domain.
- Saya memahami dampak availability dan latency.
- Saya menghitung biaya kompleksitas operasional.
- Saya punya mekanisme rekonsiliasi bila perlu.
- Saya mengkomunikasikan ekspektasi data ke produk.

## Penutup

Arsitektur matang bukan yang mengklaim "solved distributed systems".
Arsitektur matang adalah yang jujur pada trade-off dan siap mengelolanya.

## Lampiran Praktik Tim

Agar topik ini tidak berhenti di teori, lakukan ritual bulanan:

1. pilih satu keputusan consistency penting;
2. ukur dampak ke availability dan latency;
3. catat biaya operasional yang muncul;
4. putuskan apakah policy perlu diubah.

Ritual ini menjaga keputusan tetap berbasis data, bukan dogma lama.
