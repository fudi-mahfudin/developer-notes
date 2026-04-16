# CI/CD Fundamentals

## Tujuan

Dokumen ini merangkum konsep dasar **Continuous Integration (CI)** dan **Continuous Delivery/Deployment (CD)** serta praktik yang membuatnya bernilai nyata di tim, bukan sekadar badge hijau di README.

## Kenapa Topik Ini Penting

- CI tanpa integrasi sering berarti “server menjalankan skrip” tanpa mengubah perilaku tim.
- CD tanpa disiplin gate sama dengan deploy otomatis ke kekacauan.

Memahami fondasi membantu memilih tooling dan mengukur ROI.

## Continuous Integration

### Definisi ketat

Setiap perubahan kode diintegrasikan ke trunk utama **sering**, dengan build dan test otomatis yang memberi sinyal cepat.

Bukan definisi: “ada Jenkins tapi merge bulanan”.

### Manfaat

- deteksi konflik integrasi lebih awal;
- mengurangi branch panjang yang mahal;
- feedback loop cepat untuk developer.

### Praktik inti

- trunk-based atau short-lived branches;
- test otomatis pada setiap push/PR;
- build hijau adalah norma, bukan pengecualian.

## Continuous Delivery

### Definisi

Setiap perubahan yang lolos pipeline dapat **dideploy** ke produksi secara aman kapan saja dengan prosedur yang dapat diulang.

Belum tentu deploy otomatis; bisa memerlukan tombol manusia.

### Manfaat

- mengurangi batch besar berisiko;
- mempercepat feedback dari pengguna;
- memaksa desain rollback dan observability.

## Continuous Deployment

### Definisi

Setiap perubahan yang lolos gate **langsung** ke produksi tanpa langkah manual approve.

### Kapan masuk akal

- coverage test kuat;
- feature flag matang;
- observability dan rollback cepat;
- domain risiko rendah atau tim sangat matang.

### Kapan berhati-hati

- regulasi ketat;
- domain finansial dengan toleransi error rendah tanpa mitigasi lain.

## Pipeline stages umum

1. checkout;
2. restore cache;
3. install;
4. lint/typecheck;
5. unit test;
6. build artefak;
7. integration test;
8. publish artefak;
9. deploy ke staging/prod (opsional otomatis).

## Feedback time

Target: gagal cepat di stage murah. Lint sebelum e2e mahal.

## Flaky test

Flaky test merusak CI karena developer mengabaikan merah.

Kebijakan:

- kuarantina sementara dengan tiket wajib;
- tidak dibiarkan permanen hijau palsu.

## Paralelisasi

Gunakan paralel job dengan bijak—biaya compute vs waktu feedback.

## Caching

Cache dependency dengan key yang tepat; invalidasi saat lockfile berubah.

Cache rusak bisa menghasilkan build hijau palsu—bersihkan cache berkala.

## Environment parity

CI environment harus mendekati produksi untuk kategori risiko (kernel, libc, flags compiler). Paritas sempurna mahal; prioritaskan dimensi yang mempengaruhi bug produksi Anda.

## Security di CI

- secret scanning;
- dependency audit;
- SAST bila sesuai ukuran tim;
- pembatasan permission token.

## Observability CD

Metrik:

- frekuensi deploy;
- lead time for changes;
- change failure rate;
- mean time to restore (DORA).

Tanpa metrik, “kita CD” sulit dibuktikan.

## Anti-pattern

### CI hanya jalan di malam hari

Bukan integrasi kontinu.

### Merge dengan override gate rutin

Norma buruk.

### CD tanpa rollback

Bukan delivery, itu roulette.

### Terlalu banyak stage seri tanpa alasan

Pipeline lambat mengurangi frekuensi integrasi.

## Heuristik senior

1. Ukur waktu pipeline dan flaky rate bulanan.
2. Satu source of truth untuk definisi “hijau”.
3. CD dimulai dari staging otomatis penuh, baru produksi bertahap.

## Pertanyaan interview

### Dasar

- Apa perbedaan delivery dan deployment?
- Apa manfaat integrasi sering?

### Menengah

- Bagaimana Anda menangani flaky test tanpa membunuh kepercayaan CI?
- Metrik DORA mana yang paling sensitif untuk tim Anda?

### Senior

- Bagaimana Anda memperkenalkan CD di organisasi yang trauma dengan deploy?

## Kasus nyata

- Tim mengklaim CD tetapi deploy manual dua minggu sekali—metrik DORA mengekspos kebohongan proses.

## Ringkasan brutal

- CI/CD adalah **perilaku dan metrik**, bukan nama alat.

## Checklist

- [ ] Setiap PR menjalankan test otomatis.
- [ ] Artefak deployable tersimpan per merge/tag.
- [ ] Ada environment promosi terdokumentasi.
- [ ] Metrik DORA minimal lead time dan change failure rate terukur.

## Penutup

Fundamentals yang kuat membuat keputusan tooling (GitHub Actions, GitLab, Jenkins, dll.) menjadi implementasi, bukan debat identitas.

## Kedalaman: hermetic build

Build hermetic mengurangi “works on CI” dengan mengisolasi network dan dependency—berguna untuk supply chain tinggi.

## Kedalaman: policy as code

Gate deploy berdasarkan policy (misalnya image harus ditandatangani) mengurangi human error dan politik manual.

## Latihan meja

Hitung lead time dari commit pertama fitur hingga produksi untuk satu rilis terakhir. Identifikasi satu bottleneck pipeline.

## Glosarium

- **Lead time for changes**: waktu dari commit ke produksi siap digunakan pengguna.

## Ekstensi: feature flag dan CD

CD aman sering mengandalkan flag untuk mengurangi blast radius perilaku baru.

## Penutup organisasi

Dukung CI/CD dengan budaya: gate yang bermakna, bukan gate yang dilompati saat deadline.

## Lampiran: definisi “green”

- semua test wajib lulus;
- tidak ada lint error level blokir;
- build artefak sukses;
- security scan kritis tidak ada temuan baru tanpa pengecualian yang disetujui.

## Refleksi

Jika developer menghindari CI karena lambat, perbaiki waktu feedback sebelum menambah aturan.

## Penutup akhir

CI/CD fundamentals adalah fondasi **kecepaman aman**—tanpa itu, cloud dan Kubernetes hanya memindahkan kekacauan ke infrastruktur lain.
