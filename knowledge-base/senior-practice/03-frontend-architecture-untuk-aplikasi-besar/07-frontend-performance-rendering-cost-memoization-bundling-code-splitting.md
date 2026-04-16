# Frontend Performance: Rendering Cost, Memoization, Bundling, dan Code Splitting

## Tujuan

Topik ini penting karena banyak tim frontend menganggap performa sebagai urusan Lighthouse score atau optimasi kecil-kecilan setelah fitur selesai.
Itu pemahaman dangkal.

Pada aplikasi besar, performa adalah konsekuensi dari arsitektur, data flow, rendering cost, dan bundling decision.

Kalau pemahaman performa lemah:

- interaksi terasa berat;
- rerender tak perlu menyebar;
- bundle client membesar;
- initial load lambat;
- optimasi dilakukan secara membabi buta lewat memoization yang tidak perlu.

## Kenapa Topik Ini Penting

Frontend performance memengaruhi:

- perceived quality;
- conversion;
- usability di device biasa;
- stabilitas UI;
- biaya pemeliharaan code.

Di tim besar, performa buruk sering bukan satu bug.
Ia akumulasi keputusan kecil yang salah.

## Model Mental yang Benar

Pegang ini:

1. Performa frontend bukan satu angka.
2. Masalah bisa datang dari network, bundle, render, hydration, atau script execution.
3. Memoization bukan default, tetapi alat selektif.
4. Bundle size adalah arsitektur problem, bukan hanya tooling problem.
5. Code splitting yang salah juga bisa menambah kompleksitas tanpa nilai.

## Rendering Cost

Setiap render punya biaya:

- compute tree;
- reconcile;
- diff;
- create/update DOM;
- execute component logic;
- run hooks tertentu;
- recalculate layout/paint di browser bila memicu perubahan visual tertentu.

Pada skala kecil, biaya ini kecil.
Pada tree besar, list besar, atau state yang sering berubah, biaya ini bisa terasa jelas.

## Apa yang Membuat Render Mahal

Beberapa penyebab umum:

- komponen parent sering rerender dan membawa subtree besar;
- prop object/function selalu baru;
- list besar dirender penuh;
- derived computation berat dilakukan setiap render;
- state terlalu tinggi scope-nya;
- context value berubah terlalu luas.

Kalau penyebabnya tidak dikenali, tim sering asal menambah `memo`.

## Rerender Tidak Selalu Buruk

Ini poin penting.
Rerender adalah bagian normal dari React.
Masalahnya bukan keberadaan rerender.
Masalahnya adalah rerender yang mahal, terlalu sering, atau menyebar terlalu luas.

Kalau Anda mengejar "zero rerender", Anda akan menulis code aneh.

## Scope State dan Render Blast Radius

Salah satu penyebab terbesar performa buruk adalah state ditempatkan terlalu tinggi.

Akibatnya:

- perubahan kecil lokal;
- memicu rerender subtree besar;
- komponen yang tak relevan ikut bekerja ulang.

Menurunkan scope state sering lebih efektif daripada menambah memoization.

## Derived Computation

Kalau komponen menghitung:

- filter besar;
- sort besar;
- grouping besar;
- formatting mahal

di setiap render, cost cepat naik.

Solusinya bisa:

- precompute;
- memoize selektif;
- pindahkan compute ke layer lebih tepat;
- ubah flow data agar tidak dihitung ulang terlalu sering.

## Memoization

Memoization berguna.
Tetapi hanya jika ada masalah nyata yang diselesaikan.

Di React, bentuk umum:

- `React.memo`
- `useMemo`
- `useCallback`

Banyak tim memakainya sebagai ritual.
Itu salah.

## Kapan Memoization Membantu

Biasanya saat:

- render subtree cukup mahal;
- prop stabil bisa dipertahankan;
- computation mahal diulang padahal input jarang berubah;
- identity function/object penting bagi child memoized component.

## Kapan Memoization Tidak Membantu

Sering tidak membantu saat:

- komponen murah;
- dependencies sering berubah;
- problem utamanya ada di network atau hydration;
- code jadi jauh lebih sulit dibaca;
- object baru tetap dibuat di tempat lain sehingga memo tidak efektif.

Memoization punya biaya mental dan runtime kecil.
Jangan pakai tanpa alasan.

## `useCallback` Bukan Default

Banyak codebase penuh `useCallback` pada semua handler.
Biasanya itu noise.

Kalau function identity tidak dipakai untuk menghindari rerender mahal atau dependency tertentu, `useCallback` hanya menambah boilerplate.

## `React.memo` Bukan Obat Universal

Kalau parent terus mengirim prop baru yang referensinya berubah:

- `React.memo` bisa gagal memberi manfaat;
- atau custom compare justru memperumit code.

Lihat akar masalah:

- data flow;
- object identity;
- state placement;
- expensive child render.

## List Rendering

List besar adalah sumber biaya umum.

Masalah umum:

- render semua item sekaligus;
- key tidak stabil;
- setiap item membawa logic berat;
- filter/sort dilakukan setiap render;
- state list management terlalu tinggi.

Solusi bisa meliputi:

- virtualization;
- pagination;
- incremental rendering;
- memoized item;
- lebih sedikit work per row.

## Bundling

Bundle size penting karena memengaruhi:

- download cost;
- parse/compile JS;
- execution time;
- memory;
- hydration cost.

Pada device biasa, biaya parse dan execute JS bisa sama pentingnya dengan network.

## Bundle Bloat

Penyebab umum:

- dependency besar yang hanya dipakai sedikit;
- import seluruh library padahal perlu sebagian kecil;
- client boundary terlalu luas;
- komponen berat ada di initial path padahal jarang dipakai;
- banyak polyfill atau helper tak perlu;
- duplicate dependency.

## `use client` dan Bundle

Di `Next.js`, keputusan `use client` langsung memengaruhi bundle.
Semakin tinggi boundary client:

- semakin banyak module ikut ke browser;
- semakin besar hydration workload;
- semakin sulit menjaga initial load ringan.

Ini alasan boundary arsitektur dan performa sangat terkait.

## Code Splitting

Code splitting berarti memecah JavaScript menjadi bagian yang dimuat sesuai kebutuhan.
Tujuan utamanya:

- initial bundle lebih kecil;
- route yang tidak dibutuhkan belum perlu diunduh;
- komponen berat yang jarang dipakai bisa ditunda.

## Kapan Code Splitting Berguna

Biasanya saat:

- ada route besar;
- ada feature admin jarang dipakai;
- ada editor, chart, map, atau library berat;
- ada modal atau panel yang tidak selalu dibuka;
- ada step flow yang tidak selalu diakses.

## Kapan Code Splitting Bisa Berlebihan

Kalau dipecah terlalu kecil:

- request tambahan banyak;
- orchestration lebih rumit;
- loading boundary bertambah;
- keuntungan real bisa kecil.

Jadi tujuan bukan "pecah sebanyak mungkin".
Tujuannya memecah di titik yang bernilai.

## Dynamic Import

Dynamic import berguna untuk:

- heavy charting library;
- editor rich text;
- code viewer;
- admin-only tools;
- modal kompleks yang jarang dibuka.

Tetapi jangan menjadikan dynamic import sebagai solusi reflex.
Kalau komponen ada di critical path utama, menunda load justru bisa memindahkan rasa lambat ke interaksi user.

## Network vs CPU vs Hydration

Performa frontend sering rusak di salah satu atau kombinasi:

- bundle terlalu besar;
- hydration terlalu berat;
- rerender terlalu sering;
- browser work terlalu mahal;
- data waterfall;
- layout shift dan visual instability.

Jangan mengira satu optimasi akan menyelesaikan semuanya.

## Measuring First

Prinsip senior:

jangan optimasi dari asumsi.

Lihat:

- Web Vitals;
- bundle analyzer;
- React profiler;
- browser performance panel;
- network waterfall;
- CPU throttling scenario;
- device realistis, bukan laptop flagship saja.

## Perceived Performance

Kadang performa teknis dan performa yang dirasakan user tidak sama.

Contoh:

- skeleton yang baik bisa terasa lebih cepat daripada blank screen singkat;
- progressive rendering bisa terasa lebih baik walau total completion time sama;
- interaksi cepat lebih penting daripada data sekunder yang sempurna.

Karena itu frontend performance selalu terkait UX strategy.

## Avoid Expensive Unnecessary Work

Sering optimasi terbaik adalah menghapus kerja:

- jangan render yang tidak perlu;
- jangan fetch yang tidak perlu;
- jangan hydrate yang tidak perlu;
- jangan load library yang tidak perlu;
- jangan hitung ulang yang tidak perlu.

Ini jauh lebih sehat daripada menambahkan lapisan optimasi di atas arsitektur yang boros.

## Anti-Pattern Umum

### 1. Memoize Everything

Code jadi ribet dan manfaat sering kecil.

### 2. Import Heavy Library in Critical Path

Bundle membesar untuk fitur yang jarang dipakai.

### 3. State Terlalu Global

Render blast radius membesar.

### 4. Performance Tuning Tanpa Profiling

Tim sibuk mengobati area yang bukan bottleneck.

## Heuristik Senior

1. Cari bottleneck dulu: network, JS size, hydration, render, atau browser layout.
2. Kurangi kerja sebelum mengoptimalkan kerja.
3. Tempatkan state serendah mungkin untuk mengecilkan blast radius render.
4. Gunakan memoization hanya jika ada biaya nyata yang sedang dihindari.
5. Jaga client bundle dengan boundary `use client` yang disiplin.
6. Code split di titik yang jarang diakses atau sangat berat.
7. Validasi optimasi dengan pengukuran, bukan rasa.

## Pertanyaan Interview

### Dasar

- Apa yang dimaksud rendering cost?
- Kenapa bundle size penting?
- Kapan memoization membantu?
- Apa itu code splitting?

### Menengah

- Kenapa `useCallback` tidak boleh dipakai otomatis di semua tempat?
- Bagaimana state placement memengaruhi performa render?
- Kapan dynamic import masuk akal?
- Apa risiko code splitting berlebihan?

### Senior

- Bagaimana Anda mendiagnosis apakah masalah performa berasal dari bundle, hydration, atau render tree?
- Bagaimana Anda menilai trade-off antara readability dan memoization?
- Bagaimana Anda merancang initial load yang ringan untuk aplikasi besar dengan banyak feature berat?
- Bagaimana Anda memprioritaskan optimasi berdasarkan dampak user, bukan sekadar angka teknis?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dashboard berat di laptop biasa;
- charting library membengkakkan bundle;
- modal editor jarang dipakai tetapi ikut ke initial load;
- list besar rerender setiap filter kecil;
- tim menambahkan `memo` di banyak tempat tetapi UI tetap lambat.

## Ringkasan Brutal

- Performa frontend bukan soal satu trik.
- Rendering, hydration, bundling, dan fetching saling terkait.
- Memoization yang membabi buta adalah tanda kurang diagnosis.
- Bundle bloat adalah utang arsitektur, bukan sekadar urusan tooling.
- Engineer senior mengukur dulu, lalu mengurangi kerja yang tidak perlu sebelum mengotak-atik detail kecil.

## Checklist Pemahaman

- Saya bisa membedakan masalah render, bundle, dan hydration.
- Saya tidak memakai memoization sebagai ritual.
- Saya tahu state placement memengaruhi rerender.
- Saya paham code splitting harus bernilai, bukan asal pecah.
- Saya sadar `use client` memengaruhi bundle.
- Saya selalu mengukur sebelum optimasi.

## Penutup

Frontend performance yang sehat lahir dari disiplin arsitektur dan pengukuran.
Bukan dari kumpulan micro-optimization yang ditempelkan di akhir.

Kalau Anda bisa melihat biaya render, biaya JavaScript, dan biaya interaksi sebagai satu sistem, Anda sudah berpikir jauh lebih senior daripada sekadar "coba tambahkan memo".
