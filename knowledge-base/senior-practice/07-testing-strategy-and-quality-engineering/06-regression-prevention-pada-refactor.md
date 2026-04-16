# Regression Prevention pada Refactor

## Tujuan

Topik ini penting karena refactor tanpa perlindungan regression sering berakhir dengan bug mahal.
Refactor yang baik meningkatkan maintainability tanpa merusak perilaku yang disepakati.

## Kenapa Topik Ini Penting

Tanpa strategi regression prevention:

- tim takut refactor;
- codebase membusuk;
- perubahan kecil memicu bug acak;
- velocity jangka panjang turun.

## Model Mental yang Benar

1. Refactor adalah perubahan struktur, bukan perubahan behavior.
2. Regression prevention butuh baseline behavior yang jelas.
3. Test adalah safety net, tetapi tidak cukup tanpa disiplin rollout.
4. Refactor besar sebaiknya dipotong menjadi langkah kecil.
5. Observability pasca deploy adalah bagian dari pencegahan regression.

## Behavior Baseline

Sebelum refactor:

- identifikasi flow kritis;
- identifikasi invariants bisnis;
- identifikasi edge case historis.

Jika baseline kabur, Anda tidak tahu apa yang harus dipertahankan.

## Characterization Tests

Untuk legacy code, karakterisasi perilaku sekarang dulu:

- tulis test yang menangkap output existing;
- lalu refactor di bawah safety net itu.

Ini membantu bahkan ketika code lama tidak ideal.

## Incremental Refactor

Lebih aman:

- refactor kecil bertahap;
- merge sering;
- test run sering.

Refactor big-bang meningkatkan blast radius dan kesulitan rollback.

## Contract Preservation

Saat refactor boundary:

- API contract tetap;
- event schema tetap;
- DB semantics tetap;
- error behavior tetap (kecuali disepakati berubah).

Perubahan internal tidak boleh bocor ke konsumen tanpa kontrol.

## Test Focus During Refactor

Prioritaskan:

- tests untuk behavior kritis;
- integration tests untuk boundary;
- regression cases dari incident lama.

Menambah test acak tanpa prioritas sering tidak membantu.

## Feature Flag / Shadow Mode

Untuk refactor berisiko:

- jalankan implementasi baru di bawah flag;
- bandingkan output lama vs baru;
- rollout bertahap.

Ini menurunkan risiko incident besar.

## Golden Data / Snapshot Strategy

Pada transformasi data kompleks:

- gunakan golden datasets;
- bandingkan hasil sebelum/sesudah.

Namun snapshot harus dirawat, bukan dibiarkan jadi noise.

## Static Analysis dan Type Safety

Refactor terbantu oleh:

- type system;
- lint rules;
- dead code detection.

Tools ini bukan pengganti test, tetapi memperkecil ruang kesalahan.

## Observability During Rollout

Pantau:

- error rate;
- latency;
- business KPI kritis;
- mismatch hasil lama vs baru (jika ada dual-run).

Regression tidak selalu langsung terlihat dari test lokal.

## Rollback Readiness

Sebelum merge/deploy refactor berisiko:

- siapkan rollback plan;
- pastikan migration/release reversible sejauh mungkin;
- minimalkan coupling perubahan.

Refactor tanpa escape hatch adalah perjudian.

## Anti-Pattern Umum

### 1. Refactor Besar Sekali Jalan

Blast radius terlalu besar.

### 2. "Refactor Dulu, Test Nanti"

Risiko regression tinggi.

### 3. Tidak Memisahkan Refactor dari Feature Change

Sangat sulit diagnosis bug.

### 4. Mengabaikan Monitoring Pasca Deploy

Regression diam-diam lolos.

## Heuristik Senior

1. Definisikan apa yang tidak boleh berubah sebelum refactor.
2. Tambah safety tests pada area paling berisiko.
3. Pecah refactor jadi perubahan kecil yang bisa ditinjau.
4. Pisahkan commit structural changes dari behavior changes.
5. Gunakan feature flag untuk refactor dengan dampak besar.
6. Pantau metrik pasca deploy dengan ketat.
7. Dokumentasikan keputusan refactor agar tim memahami intent.

## Pertanyaan Interview

### Dasar

- Apa tujuan refactor?
- Kenapa regression sering terjadi saat refactor?
- Apa itu characterization test?
- Kenapa refactor kecil lebih aman?

### Menengah

- Bagaimana menentukan area yang wajib dijaga saat refactor?
- Kapan perlu feature flag untuk refactor?
- Bagaimana memisahkan refactor dan feature changes?
- Apa indikator bahwa refactor berhasil tanpa regression?

### Senior

- Bagaimana Anda memimpin refactor besar pada sistem kritis dengan downtime tolerance rendah?
- Bagaimana Anda membangun strategi rollback untuk refactor yang melibatkan banyak modul?
- Bagaimana Anda meyakinkan bisnis bahwa refactor layak dibiayai meski tidak menambah fitur langsung?
- Bagaimana Anda mencegah refactor menjadi endless rewrite?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- tim takut menyentuh modul legacy;
- setiap refactor kecil menimbulkan bug tak terduga;
- code review sulit membedakan perubahan struktural vs perubahan behavior;
- performa membaik tapi hasil bisnis diam-diam salah setelah refactor.

## Ringkasan Brutal

- Refactor tanpa regression strategy adalah risiko buta.
- Safety net harus dibangun sebelum bongkar struktur.
- Langkah kecil, observability kuat, rollback siap adalah disiplin inti.
- Engineer senior refactor untuk masa depan, tanpa mengorbankan stabilitas saat ini.

## Checklist Pemahaman

- Saya bisa mendefinisikan behavior yang harus tetap sama.
- Saya tahu kapan perlu characterization tests.
- Saya paham nilai incremental refactor.
- Saya siap dengan monitoring dan rollback plan.
- Saya memisahkan perubahan struktural dari perubahan fungsional.

## Penutup

Refactor yang sehat membuat sistem lebih mudah diubah besok, tanpa membuat pengguna menanggung risiko hari ini.
