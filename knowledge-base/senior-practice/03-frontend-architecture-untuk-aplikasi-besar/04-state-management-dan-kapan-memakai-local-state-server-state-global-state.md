# State Management dan Kapan Memakai Local State, Server State, Global State

## Tujuan

Topik ini penting karena banyak codebase frontend rusak bukan karena kurang banyak library state management, tetapi karena semua jenis state dicampur tanpa boundary yang jelas.

Akibatnya:

- komponen kecil memakai global store tanpa alasan;
- data server diperlakukan seperti state lokal;
- state UI tersebar di banyak tempat;
- sinkronisasi jadi mahal;
- bug terlihat "acak" padahal sumbernya salah menaruh ownership state.

## Kenapa Topik Ini Penting

State management untuk aplikasi besar bukan soal memilih Redux, Zustand, Context, atau library lain.
Itu pertanyaan kedua.

Pertanyaan pertama yang lebih penting:

- state ini sebenarnya jenis apa?
- siapa pemiliknya?
- berapa lama ia hidup?
- siapa yang perlu mengaksesnya?
- apa sumber kebenarannya?

Kalau jawaban itu tidak jelas, library apa pun hanya mempercepat kebingungan.

## Tiga Jenis State Utama

Secara praktis, pembagian paling berguna:

- local state
- server state
- global client state

Kalau tiga jenis ini dicampur, arsitektur akan cepat kabur.

## Local State

Local state adalah state yang hidup dekat dengan komponen atau fitur UI tertentu.

Contoh:

- modal terbuka atau tertutup;
- tab aktif;
- input sementara;
- dropdown selection sementara;
- step wizard lokal.

Biasanya local state cocok jika:

- scope-nya sempit;
- tidak dibutuhkan banyak area lain;
- lifecycle-nya mengikuti komponen atau subtree kecil.

## Server State

Server state adalah data yang sumber kebenarannya ada di server.

Contoh:

- daftar user dari API;
- profile account;
- daftar invoice;
- hasil query search backend;
- statistik dashboard.

Karakter penting:

- ia datang dari backend;
- bisa stale;
- butuh fetch, refetch, cache, invalidation;
- ownership-nya tidak sama dengan local UI state.

## Global Client State

Global client state adalah state yang memang perlu diakses lintas banyak bagian client app dan sumber kebenarannya ada di sisi client selama session tertentu.

Contoh:

- theme mode;
- UI preferences;
- modal bus tertentu;
- selected workspace aktif;
- wizard multi-step yang melintasi banyak subtree;
- ephemeral auth UI state tertentu.

Ini berbeda dari server state yang seharusnya tidak otomatis ditarik ke global store hanya karena dipakai di banyak tempat.

## Model Mental yang Benar

Pegang ini:

1. Tidak semua data yang dipakai banyak komponen harus masuk global store.
2. Server state bukan global state biasa.
3. Local state adalah default sampai ada alasan kuat untuk mengangkatnya.
4. Global state mahal secara coupling, jadi pakai selektif.
5. State management yang sehat adalah soal ownership dan lifecycle.

## Kesalahan Umum yang Paling Mahal

### 1. Semua Masuk Global Store

Ini membuat:

- coupling tinggi;
- debugging sulit;
- re-render tak perlu;
- boundary tanggung jawab kabur.

### 2. Server Data Disalin ke Client Store Tanpa Alasan

Ini menyebabkan:

- dua sumber kebenaran;
- invalidation rumit;
- sinkronisasi rawan bug.

### 3. Local State Diangkat Terlalu Cepat

State yang seharusnya bisa hidup di komponen kecil dipindah ke parent tinggi atau global hanya karena "mungkin nanti kepakai".

### 4. Context Dipakai untuk Semua Hal

Context berguna, tetapi kalau dipakai untuk state yang sering berubah besar, performa dan readability bisa turun.

## Kapan Local State Cukup

Gunakan local state saat:

- state hanya relevan untuk satu komponen atau subtree kecil;
- tidak perlu persisted lintas halaman;
- tidak perlu diakses banyak fitur lain;
- perubahan state murni UI interaction.

Contoh:

- input filter panel;
- modal open/close;
- selected tab lokal;
- expanded accordion.

Kalau kasusnya seperti ini, global store sering berlebihan.

## Kapan Server State Tidak Boleh Diperlakukan Seperti Local State

Server state punya masalah yang berbeda:

- freshness;
- refetch;
- dedupe;
- cache;
- loading/error state;
- mutation sync.

Kalau Anda menyimpannya ke `useState` atau store global mentah lalu lupa soal invalidation, data akan cepat menjadi stale dan tidak terpercaya.

## Kapan Global State Benar-Benar Masuk Akal

Global client state masuk akal saat:

- banyak bagian UI perlu akses yang sama;
- state itu benar-benar milik client session;
- prop drilling menjadi tidak sehat;
- state perlu bertahan lintas route atau layout tertentu;
- shared interaction pattern sulit dipertahankan secara lokal.

Tetapi alasan "biar gampang dipanggil dari mana saja" bukan alasan yang sehat.

## Source of Truth

Untuk setiap state, tanyakan:

- siapa sumber kebenarannya?

Contoh:

- data user profile utama: server;
- tema dark/light: client preference;
- nilai input yang belum disubmit: komponen lokal.

Kalau satu state punya dua sumber kebenaran aktif, bug tinggal menunggu waktu.

## Derived State

Kesalahan lain adalah menyimpan terlalu banyak derived state.

Contoh:

- simpan `filteredItems` padahal bisa dihitung dari `items` dan `filter`;
- simpan `fullName` padahal bisa dirender dari `firstName` dan `lastName`;
- simpan `isValid` padahal bisa diturunkan dari form state.

Derived state yang disimpan menambah titik sinkronisasi dan rawan stale.

Pola sehat:

- simpan state minimum;
- turunkan sisanya saat perlu bila biayanya masuk akal.

## Co-location State

Secara umum, state sebaiknya diletakkan sedekat mungkin dengan tempat ia digunakan.
Ini mengurangi:

- coupling;
- prop drilling yang tak perlu;
- cognitive overhead;
- blast radius perubahan.

State baru sebaiknya mulai lokal dulu.
Naikkan scope-nya hanya jika benar-benar perlu.

## Prop Drilling Bukan Selalu Musuh

Banyak tim terlalu cepat lari ke global state hanya untuk menghindari beberapa level prop drilling.
Padahal kadang beberapa prop lewat 2-3 layer masih jauh lebih sehat daripada:

- store global baru;
- context tambahan;
- implicit dependency ke state eksternal.

Jangan obati masalah kecil dengan abstraction yang lebih berat dari penyakitnya.

## Context vs Store

Context bagus untuk:

- dependency injection ringan;
- theme;
- locale;
- state yang relatif stabil dan tidak terlalu sering berubah.

Store global lebih cocok ketika:

- state berubah cukup sering;
- banyak consumer independen;
- selective subscription penting;
- logic update lebih kompleks.

Kalau Context dipakai untuk state besar yang sangat dinamis, rerender bisa menyebar terlalu luas.

## Server State Library

Server state biasanya lebih sehat ditangani dengan tool yang paham:

- fetching;
- caching;
- invalidation;
- background refresh;
- retry;
- mutation sync.

Kalau server state dimasukkan ke global store biasa tanpa primitives itu, Anda sedang membangun ulang problem space yang sebenarnya sudah berbeda.

## Mutation dan State Ownership

Begitu user melakukan aksi mutation:

- state mana yang diubah optimistik?
- data mana yang harus di-refresh?
- apakah local form state harus direset?
- apakah global UI state ikut berubah?

Kalau ownership state tidak jelas, mutation flow cepat menjadi tumpukan side effect sulit dilacak.

## Cross-Route State

Untuk aplikasi besar, beberapa state hidup lintas route atau segment.

Contoh:

- selected organization/workspace;
- current impersonation mode;
- active UI shell preference.

Ini kandidat global state yang lebih masuk akal daripada state lokal biasa.

Tetapi sekali lagi, jangan campur dengan server state hanya karena data itu dipakai lintas route.

## Form State

Form state sering menjadi area abu-abu.

Biasanya:

- input values draft: local state atau form library lokal;
- data awal form: server state;
- submission status: local feature state;
- validasi hasil server: server response integrated ke local flow.

Mencampur semua ini ke satu global store sering membuat form kompleks jauh lebih sulit dirawat.

## URL State

Beberapa state sebaiknya hidup di URL:

- search query;
- current filter penting;
- pagination;
- sort order;
- tab yang perlu bisa di-share.

Keuntungannya:

- shareable;
- bookmarkable;
- back/forward browser sinkron.

Kalau state seperti ini disimpan hanya di local/global client state, UX dan deep linking bisa buruk.

## Persisted Client State

Beberapa global state perlu persisted:

- theme;
- dismissed tutorial flags;
- UI preference tertentu.

Tetapi persistence juga membawa risiko:

- data lama tak kompatibel;
- hydration mismatch bila tidak hati-hati;
- state usang bertahan terlalu lama.

Persist hanya yang benar-benar bernilai.

## Re-render dan Granularity

State placement memengaruhi performa render.

Kalau state global terlalu besar:

- perubahan kecil bisa memicu banyak consumer;
- selective subscription jadi penting;
- debugging render makin sulit.

State lokal yang tepat sering lebih murah daripada centralization berlebihan.

## Anti-Pattern Umum

### 1. Menyimpan Semua Response API di Global Store

Ini sering menciptakan duplicate cache dan invalidation chaos.

### 2. Context untuk State yang Sangat Dinamis dan Besar

Rerender menyebar dan structure jadi berat.

### 3. State Naik Scope Terlalu Cepat

Parent atau layout menjadi state dumping ground.

### 4. Derived State Disimpan Tanpa Alasan

Sumber stale bug bertambah.

## Heuristik Senior

1. Mulai dari pertanyaan ownership dan source of truth.
2. Default ke local state sampai ada alasan naik scope.
3. Perlakukan server state sebagai kategori khusus, bukan sekadar global object.
4. Gunakan global client state hanya untuk kebutuhan lintas area yang benar-benar nyata.
5. Pertimbangkan URL sebagai tempat state yang perlu shareability.
6. Simpan state minimum; turunkan sisanya bila memungkinkan.
7. Pilih tool berdasarkan jenis state, bukan hype library.

## Pertanyaan Interview

### Dasar

- Apa beda local state, server state, dan global state?
- Kenapa server state tidak sama dengan global client state?
- Kapan local state cukup?
- Kenapa derived state yang disimpan bisa berbahaya?

### Menengah

- Kapan Context cukup dan kapan perlu store?
- Kenapa menyimpan API response ke global store sering buruk?
- Bagaimana Anda memutuskan state sebaiknya ada di URL?
- Kapan prop drilling masih lebih sehat daripada global store?

### Senior

- Bagaimana Anda mendesain ownership state pada aplikasi frontend besar dengan banyak fitur?
- Bagaimana Anda mencegah dua sumber kebenaran untuk resource yang sama?
- Bagaimana Anda mengevaluasi apakah suatu state layak menjadi global?
- Bagaimana Anda melakukan review arsitektur terhadap penggunaan store di codebase tim?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dashboard kompleks punya banyak widget dan filter;
- data profile dipakai di banyak tempat;
- form besar dicampur dengan store global;
- pencarian dan pagination perlu shareable via URL;
- tim mulai menambahkan store untuk semua hal karena prop drilling terasa mengganggu.

## Ringkasan Brutal

- State management bukan soal memilih library dulu.
- Pertama, pahami jenis state dan source of truth-nya.
- Local state adalah default sehat.
- Server state harus diperlakukan berbeda dari client state.
- Global state yang dipakai sembarangan adalah utang arsitektur mahal.

## Checklist Pemahaman

- Saya bisa membedakan local, server, dan global state.
- Saya tahu ownership dan source of truth harus jelas.
- Saya tidak otomatis memindahkan semua data ke global store.
- Saya paham URL juga bisa menjadi tempat state yang tepat.
- Saya tidak menyimpan terlalu banyak derived state.
- Saya memilih tool berdasarkan jenis state, bukan kebiasaan tim semata.

## Penutup

Codebase frontend besar yang sehat bukan yang punya banyak store canggih.
Ia adalah codebase yang tahu state mana harus hidup di mana, siapa pemiliknya, dan kapan state itu layak dibagikan.

Engineer senior membedakan antara state yang memang perlu dikelola bersama dan state yang hanya butuh dibiarkan dekat dengan tempat ia dipakai.
