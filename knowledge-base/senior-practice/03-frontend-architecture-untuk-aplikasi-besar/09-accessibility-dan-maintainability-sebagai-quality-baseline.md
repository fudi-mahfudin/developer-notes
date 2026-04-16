# Accessibility dan Maintainability sebagai Quality Baseline

## Tujuan

Topik ini penting karena banyak tim masih memperlakukan accessibility dan maintainability sebagai bonus jika ada waktu.
Itu pola pikir yang lemah.

Dalam aplikasi besar, keduanya harus dianggap baseline quality.
Bukan lapisan tambahan setelah fitur selesai.

Kalau accessibility dan maintainability diabaikan:

- sebagian user tidak bisa memakai produk dengan layak;
- perubahan kecil jadi mahal;
- UI cepat membusuk;
- tim terus menerus membayar ulang keputusan buruk lama.

## Kenapa Topik Ini Penting

Accessibility bukan hanya soal kepatuhan.
Ia soal usable interface.

Maintainability bukan hanya soal kebersihan code.
Ia soal apakah tim masih bisa bergerak cepat tanpa merusak banyak hal.

Pada skala tim, dua hal ini sangat terkait:

- UI yang accessible biasanya punya semantics lebih sehat;
- code yang maintainable biasanya punya boundary lebih jelas;
- quality baseline yang konsisten menurunkan biaya regresi.

## Model Mental yang Benar

Pegang ini:

1. Accessibility adalah bagian dari correctness UI.
2. Maintainability adalah bagian dari delivery speed jangka panjang.
3. Keduanya harus dipikirkan sejak desain dan implementasi awal.
4. Menunda keduanya hampir selalu membuat biaya perbaikan naik.
5. Baseline quality yang konsisten lebih bernilai daripada heroics sporadis.

## Accessibility Bukan Add-On

Kesalahan umum:

- baru memikirkan a11y di akhir sprint;
- baru memperbaiki saat audit;
- mengandalkan design system tanpa mengecek usage;
- menganggap semantic HTML tidak penting.

Accessibility yang sehat harus hidup di:

- komponen primitive;
- pattern interaksi;
- form;
- navigation;
- feedback states;
- content structure.

## Semantic HTML

Fondasi paling murah dan paling kuat sering justru semantic HTML yang benar.

Contoh:

- tombol sungguhan untuk aksi;
- link sungguhan untuk navigasi;
- heading hierarchy jelas;
- list memakai list semantics;
- form control punya label.

Banyak masalah accessibility muncul karena tim terlalu cepat mengganti elemen dasar dengan div yang dipaksa interaktif.

## Keyboard Accessibility

Aplikasi tidak boleh mengasumsikan semua user memakai mouse.

Minimal Anda harus memikirkan:

- focus order;
- keyboard navigation;
- visible focus state;
- modal focus trap bila perlu;
- escape behavior;
- actionable element bisa dijangkau keyboard.

Kalau komponen hanya "bisa diklik", itu belum cukup.

## Focus Management

Salah satu area yang sering diabaikan:

- setelah modal terbuka fokus ke mana;
- setelah modal ditutup fokus kembali ke mana;
- setelah route change user kehilangan konteks atau tidak;
- saat error muncul fokus perlu dipindah atau tidak.

Fokus yang tidak dikelola membuat aplikasi terasa kacau terutama bagi user keyboard dan assistive tech.

## Color Contrast dan Visual State

Contrast buruk bukan masalah kosmetik.
Itu masalah usability.

Jangan mengandalkan:

- warna saja untuk meaning;
- placeholder saja sebagai label;
- subtle gray untuk semua secondary text tanpa cek contrast;
- state disabled/error yang tidak jelas.

## Form Accessibility

Form adalah area paling sering bermasalah.
Perlu dipikirkan:

- label jelas;
- hint/help text relevan;
- error association;
- required field semantics;
- validation feedback yang bisa dipahami;
- fokus ke field bermasalah bila tepat.

Kalau form hanya "cantik" tetapi membingungkan screen reader dan keyboard user, kualitasnya rendah.

## Dynamic UI dan Announcement

Beberapa perubahan state butuh cara agar user assistive tech tahu sesuatu berubah:

- loading selesai;
- error muncul;
- hasil search diperbarui;
- item berhasil ditambahkan.

Tidak semua perubahan harus diumumkan.
Tetapi perubahan penting tidak boleh sepenuhnya diam bagi user yang tidak melihat visual cue yang sama.

## Maintainability sebagai Baseline

Maintainability berarti code masih bisa:

- dibaca;
- diubah;
- diuji;
- di-review;
- diperbaiki;
- diperluas

tanpa biaya tidak proporsional.

Kalau setiap perubahan kecil terasa berisiko besar, baseline maintainability sudah gagal.

## Apa yang Membunuh Maintainability

Penyebab umum:

- boundary lemah;
- copy-paste besar;
- abstraction prematur;
- naming kabur;
- global dependency tersembunyi;
- folder generic membesar;
- state ownership tidak jelas;
- prop surface terlalu besar.

Ini tidak selalu langsung terasa di awal.
Tetapi dampaknya akumulatif.

## Accessibility dan Maintainability Saling Menguatkan

Pola yang sehat sering membantu keduanya sekaligus:

- semantic primitives mengurangi custom hack;
- design system dengan baseline a11y mengurangi duplikasi fix;
- component boundary jelas memudahkan audit;
- naming yang jujur membantu memahami interaction semantics.

Jadi dua topik ini tidak terpisah.

## Quality Baseline Harus Dibawa Primitive

Kalau tim punya primitive UI sehat:

- button sudah keyboard-friendly;
- input sudah berlabel dengan benar;
- modal sudah punya focus handling dasar;
- alert/status pattern konsisten;

maka fitur baru lebih mudah tetap berada di baseline.

Kalau primitive tidak sehat, setiap fitur harus memperbaiki ulang dari nol.

## Code Review dan Baseline Quality

Code review yang baik harus mempertanyakan:

- apakah komponen ini accessible secara dasar?
- apakah state dan prop boundary-nya masuk akal?
- apakah markup semantik benar?
- apakah abstraction ini membuat code lebih mudah atau lebih sulit dirawat?

Kalau review hanya fokus pada "jalan atau tidak", kualitas jangka panjang turun.

## Linting dan Tooling Membantu, Bukan Menyelesaikan

Lint rules, testing library, atau accessibility checker bisa membantu.
Tetapi mereka tidak menggantikan reasoning.

Tool bisa menangkap:

- atribut hilang;
- contrast issue tertentu;
- anti-pattern umum.

Tetapi tool tidak otomatis tahu:

- UX ini membingungkan atau tidak;
- abstraction ini sehat atau tidak;
- focus flow ini masuk akal atau tidak.

## Maintainability dan Naming

Naming jujur sangat penting.
Kalau nama:

- tidak menjelaskan intent;
- memakai istilah sementara;
- menumpuk `new`, `old`, `temp`, `v2`,

codebase cepat kehilangan kejelasan.

Maintainability sering rusak bukan karena algoritma sulit.
Tetapi karena intent tidak lagi terbaca.

## Accessibility Debt dan Maintainability Debt

Keduanya menumpuk seperti utang:

- satu shortcut kecil;
- satu komponen tanpa label;
- satu modal custom tanpa focus handling;
- satu abstraction shared yang terlalu pintar.

Masing-masing tampak kecil.
Bersama-sama mereka memperlambat tim dan merusak produk.

## Pragmatic Baseline

Tidak semua screen perlu level kompleksitas yang sama.
Tetapi baseline minimal harus konsisten:

- semantic markup;
- keyboard support yang wajar;
- focus state terlihat;
- label/error form benar;
- code structure yang masih masuk akal untuk dirawat.

Kalau baseline tidak ada, kualitas akan menjadi keberuntungan per engineer.

## Anti-Pattern Umum

### 1. Accessibility Belakangan

Biaya fix biasanya jauh lebih mahal.

### 2. Maintainability Dikorbankan Demi "Cepat Dulu"

Kalau dilakukan terus, tim justru melambat permanen.

### 3. Custom UI Berat Tanpa Semantics

Hasilnya cantik tetapi rapuh dan sulit diakses.

### 4. Shared Primitive Tidak Membawa Baseline Quality

Masalah yang sama diulang di semua fitur.

## Heuristik Senior

1. Perlakukan accessibility sebagai correctness, bukan garnish.
2. Perlakukan maintainability sebagai investasi delivery speed.
3. Mulai dari semantic HTML dan focus behavior yang benar.
4. Bawa baseline quality ke primitive dan shared pattern.
5. Gunakan review untuk menjaga kualitas, bukan hanya memeriksa bug fungsional.
6. Hindari shortcut berulang yang menciptakan debt sistemik.
7. Ingat bahwa kualitas yang tidak konsisten adalah kualitas yang tidak ada.

## Pertanyaan Interview

### Dasar

- Kenapa accessibility harus dianggap baseline?
- Apa pentingnya semantic HTML?
- Kenapa focus state penting?
- Apa yang membuat code frontend maintainable?

### Menengah

- Bagaimana design system membantu accessibility?
- Kenapa keyboard accessibility tidak boleh diabaikan?
- Apa tanda-tanda maintainability mulai turun di codebase frontend?
- Bagaimana code review bisa menjaga baseline quality?

### Senior

- Bagaimana Anda membangun standar a11y dan maintainability yang realistis untuk tim produk yang cepat bergerak?
- Bagaimana Anda memprioritaskan perbaikan accessibility debt dan maintainability debt?
- Bagaimana Anda mendesain primitive component agar membawa quality baseline secara default?
- Bagaimana Anda menghindari trade-off palsu antara speed dan maintainability?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- form cantik tetapi sulit dipakai keyboard;
- modal custom kehilangan fokus;
- perubahan UI kecil memicu refactor luas;
- komponen shared sulit dipahami dan sulit dipakai;
- audit accessibility menemukan banyak isu dasar yang tersebar di seluruh aplikasi.

## Ringkasan Brutal

- Accessibility bukan nice-to-have.
- Maintainability bukan kemewahan teknis.
- Keduanya adalah baseline kualitas untuk frontend yang serius.
- Shortcut kecil yang dibiarkan berulang akan berubah menjadi debt mahal.
- Engineer senior menjaga agar kualitas dasar tidak bergantung pada keberuntungan.

## Checklist Pemahaman

- Saya tahu semantic HTML adalah fondasi a11y murah dan kuat.
- Saya paham keyboard dan focus management bukan detail kecil.
- Saya melihat maintainability sebagai bagian dari speed jangka panjang.
- Saya tahu primitive component harus membawa baseline quality.
- Saya tidak lagi memisahkan accessibility dan maintainability dari kualitas produk.

## Penutup

Frontend yang benar-benar matang bukan hanya cepat terlihat jadi.
Ia juga dapat dipakai oleh lebih banyak orang dan tetap bisa dirawat oleh tim saat sistem terus tumbuh.

Itulah arti quality baseline yang sebenarnya.
