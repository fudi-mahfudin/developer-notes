# Mentoring Junior dan Pair Debugging

## Tujuan

Dokumen ini menjelaskan pendekatan **mentoring** engineer junior dan teknik **pair debugging** yang mempercepat pembelajaran tanpa membuat junior merasa bodoh atau bergantung permanen.

## Kenapa Topik Ini Penting

- Junior yang tidak diajar pola produksi akan memperlambat tim dan meningkatkan risiko insiden.
- Mentoring tanpa struktur membosankan senior dan membingungkan junior.

## Tujuan mentoring

1. Transfer **keterampilan** (debugging, testing, komunikasi).
2. Bangun **otonomi** bertahap.
3. Selaraskan **standar** kualitas dan keamanan.

Bukan tujuan: membuat klon kepribadian mentor.

## Prinsip psikologi aman

- normalisasi kesalahan sebagai data;
- pisahkan kritik kode dari identitas orang;
- beri waktu berpikir sebelum menyela dengan solusi.

## Model mentoring

### Scheduled 1:1 teknis

Fokus pada pertumbuhan, bukan status proyek saja.

### Shadowing on-call (read-only)

Junior mengamati alur insiden tanpa tekanan mengetik.

### Reverse teaching

Junior menjelaskan modul yang mereka kuasai—membangun kepercayaan diri.

## Pair debugging: alur

1. **Reproduksi**: junior menjelaskan langkah reproduksi.
2. **Hipotesis**: junior menulis hipotesis; mentor menantang dengan pertanyaan, bukan jawaban langsung.
3. **Eksperimen kecil**: junior menjalankan; mentor menjaga guardrail (misalnya jangan query prod berat).
4. **Sintesis**: tulis catatan singkat pasca-sesi.

## Balancing steering vs autonomy

Gunakan spektrum:

- awal: mentor banyak mengemudi;
- pertengahan: bergantian keyboard;
- akhir: junior mengemudi dengan mentor mengawasi.

## Feedback cepat loop

Setelah PR, beri feedback dalam 24 jam bila memungkinkan agar memori konteks segar.

## Goal-setting SMART

Contoh: “Dalam dua minggu, junior bisa menulis test integrasi untuk endpoint CRUD dengan minimal bimbingan.”

## Anti-pattern

### “Biar cepat saya saja”

Mencuri kesempatan belajar dan memperkuat ketergantungan.

### Mentor tidak pernah memberi area ownership nyata

Junior stagnan di task trivial.

### Kritik publik keras

Menghancurkan psikologi tim.

### Over-explaining tanpa latihan

Pengetahuan tidak mengkristal tanpa praktik.

## Heuristik senior

1. Ajukan pertanyaan Socratic sebelum solusi.
2. Beri reading list singkat, bukan ensiklopedia.
3. Rayakan kemajuan kecil yang terukur.

## Pertanyaan interview

### Dasar

- Bagaimana Anda mengajar debugging sistematis?
- Apa tanda junior siap on-call shadow?

### Menengah

- Bagaimana Anda menangani junior yang defensif terhadap feedback?

### Senior

- Bagaimana Anda menskalakan mentoring saat jumlah junior > kapasitas senior?

## Kasus nyata

- Senior selalu fix bug sendiri—junior tidak pernah belajar RCA. Program rotasi bugfix mingguan diperkenalkan.

## Ringkasan brutal

- Mentoring yang baik mengurangi **beban support jangka panjang**; mentoring buruk menambah hero culture.

## Checklist sesi pair

- [ ] Tujuan sesi jelas (bug X, bukan “belajar semuanya”).
- [ ] Junior punya kesempatan menyimpulkan sendiri.
- [ ] Catatan tindakan lanjut ditulis.

## Penutup

Pair debugging bukan tentang **siapa lebih pintar**, melainkan **model berpikir** yang dapat ditiru.

## Kedalaman: dokumentasi learning path

Buat jalur kurikulum internal: git, CI, observability dasar—junior tahu urutan belajar.

## Kedalaman: mentoring lintas tim

Rotasi shadow dengan tim platform memperluas perspektif infrastruktur.

## Latihan meja

Rencanakan 30 menit pair untuk bug race condition—siapa mengemudi menit ke berapa?

## Glosarium

- **Socratic method**: mengajar melalui pertanyaan terarah.

## Ekstensi: code kata

Latihan kecil berkala meningkatkan fluensi tanpa tekanan produksi.

## Penutup organisasi

Waktu mentoring harus **visible** dalam kapasitas sprint, bukan “sisa waktu”.

## Lampiran: template feedback

- apa yang kuat;
- satu area perbaikan konkret;
- sumber belajar opsional.

## Refleksi

Jika junior selalu bertanya hal yang sama, perbaiki dokumentasi atau contoh referensi, bukan hanya menjawab berulang.

## Penutup akhir

Mentor hebat membuat dirinya **tidak diperlukan** untuk tugas rutin—itu metrik sukses, bukan ancaman.

## Tambahan: batas waktu pair

Pair marathon 4 jam melelahkan; sesi 60–90 menit dengan istirahat lebih produktif.

## Tambahan: bahasa non-teknis

Ajarkan junior menjelaskan fix mereka dalam dua kalimat untuk PM—keterampilan karier.

## Penutup praktis

Catat pola kesalahan junior per kuartal untuk menyesuaikan materi onboarding, bukan asumsi generik “kurang pengalaman”.

## Tambahan: ekspektasi respons

Sepakati SLA respons chat bantuan (misalnya “dalam jam kerja, jawab dalam 2 jam kecuali deep focus block”). Junior tidak menebak apakah mereka “mengganggu” senior.

## Tambahan: proyek ownership bertahap

Mulai dari bug terisolasi dengan test, naik ke fitur kecil dengan desain template, lalu area tanpa template. Loncatan terlalu besar membuat ansietas dan shadowing berkepanjangan.

## Tambahan: psikologi feedback negatif

Gunakan format situasi-perilaku-dampak; hindari label karakter. “PR ini melewatkan edge case X” lebih aman daripada “kamu ceroboh”.

## Tambahan: dokumentasi jawaban umum

FAQ internal untuk pertanyaan berulang mengurangi beban senior dan memberi junior kecepatan mandiri tanpa merasa ditolak.

## Tambahan: evaluasi mentor

Mentor juga butuh umpan balik—junior bisa anonim melalui survei singkat tentang kejelasan arahan. Mentoring satu arah sering membusuk.

## Penutup operasional

Jadwalkan mentoring seperti pekerjaan: entri kalender recurring dengan agenda ringan agar tidak selalu tergeser oleh “urgent” produk.

## Tambahan: batasan topik

Sesi debugging fokus pada satu bug; jangan bocor menjadi kuliah arsitektur total kecuali junior meminta konteks lebih luas.

## Tambahan: keselamatan psikologis saat insiden

Jangan menjadikan junior kambing hitam di channel insiden publik. Kesalahan mereka adalah kegagalan proses review dan onboarding, bukan hanya individu.

## Penutup akhir praktis

Mentoring yang terukur menurunkan defect rate junior dan meningkatkan retensi tim—ROI-nya nyata, bukan “kerja baik” kosmetik.

## Tambahan: metrik kemajuan

Contoh metrik: jumlah PR merge mandiri per bulan, waktu median dari pick task hingga PR ready, jumlah bug reopen. Angka membuat diskusi promosi lebih adil daripada kesan subjektif.

## Penutup refleksi

Jika senior merasa “tidak ada waktu mentor”, tim sedang under-staffed atau prioritas leadership salah—jangan normalisasikan sebagai martabat engineer.
