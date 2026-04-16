# Menjelaskan Trade-off Teknis ke Stakeholder Non-teknis

## Tujuan

Dokumen ini menjelaskan teknik komunikasi untuk menyampaikan **trade-off teknis** (waktu, risiko, biaya, skalabilitas) kepada **stakeholder non-teknis** tanpa merendahkan atau mengaburkan risiko.

## Kenapa Topik Ini Penting

- Kesenjangan bahasa menghasilkan ekspektasi palsu (“seminggu pasti selesai”).
- Jargon tanpa konteks membuat stakeholder mengabaikan peringatan penting.

Senior engineer harus menjadi **penerjemah risiko**, bukan gatekeeper sinis.

## Prinsip dasar

1. Mulai dari **outcome bisnis**, bukan dari stack.
2. Beri **tiga opsi** bila memungkinkan: cepat/berisiko, seimbang, lambat/aman.
3. Nyatakan **asumsi** dan apa yang membuat estimasi berubah.
4. Akhiri dengan **keputusan yang diminta** dari stakeholder.

## Bahasa yang membantu

Ganti jargon dengan analogi terukur:

- **utang teknis** → “biaya bunga yang memperlambat fitur berikutnya”;
- **latency** → “waktu tunggu pengguna setelah klik”;
- **availability** → “seberapa sering layanan tidak bisa dipakai”.

Hindari analogi yang misleading (misalnya “seperti menambah jalur tol” untuk sharding yang kompleks).

## Visual sederhana

Timeline, diagram alur tinggi, atau tabel opsi sering lebih efektif dari paragraf panjang.

## Risiko dalam bahasa probabilitas kasar

Gunakan rentang dan pemicu:

- “Risiko medium jika traffic naik 2x minggu promo tanpa caching—mitigasi X.”

Hindari “mustahil gagal” kecuali benar-benar terbukti.

## Mendengarkan constraint bisnis

Tanyakan:

- deadline keras vs fleksibel;
- toleransi downtime;
- regulasi atau komitmen pelanggan.

Tanpa constraint, rekomendasi teknis mengambang.

## Menolak permintaan dengan konstruktif

Bukan “tidak bisa”, melainkan:

- “Bisa jika kita menurunkan scope A atau menambah kapasitas B dengan biaya C.”

## Dokumentasi ringkas

Setelah rapat, kirim email/Notion satu layar:

- opsi;
- rekomendasi;
- risiko residual;
- owner tindakan berikutnya.

## Anti-pattern

### Lecture 30 menit tentang TCP

Stakeholder hilang di menit kedua.

### Janji tanpa buffer

Menghancurkan kepercayaan jangka panjang.

### Menyembunyikan risiko agar “approved”

Insiden kemudian menghancurkan kredibilitas.

### Menghina keputusan bisnis di depan umum

Bahkan jika benar secara teknis, saluran salah.

## Heuristik senior

1. Siapkan angka kasar (order of magnitude) sebelum rapat.
2. Bawa satu contoh pengguna yang terdampak.
3. Latih penjelasan 2 menit (“elevator”) dan 10 menit (“briefing”).

## Pertanyaan interview

### Dasar

- Bagaimana Anda menjelaskan downtime terencana ke customer success?

### Menengah

- Bagaimana Anda membahas trade-off keamanan vs kecepatan rilis?

### Senior

- Bagaimana Anda menangani stakeholder yang mendesak deadline tidak realistis tanpa data?

## Kasus nyata

- Engineer menjelaskan migrasi DB dengan istilah ORM—product owner menyetujui jadwal salah. Perbaikan: diagram data dan contoh dampak fitur.

## Ringkasan brutal

- Komunikasi trade-off yang buruk menghasilkan **keputusan salah** yang kemudian disalahkan pada engineering saja.

## Checklist

- [ ] Outcome bisnis di awal.
- [ ] Opsi dan rekomendasi eksplisit.
- [ ] Risiko dan mitigasi.
- [ ] Permintaan keputusan jelas.

## Penutup

Kepercayaan stakeholder diukur dari **ketepatan prediksi** dan **kejujuran saat berita buruk**, bukan dari slide indah.

## Kedalaman: biaya opportunity

Jelaskan apa yang tidak dilakukan jika resource dialihkan—stakeholder sering tidak melihat trade-off implisit.

## Kedalaman: bahasa hukum/sales

Untuk kontrak SLA, libatkan legal/sales awal; engineer menjelaskan feasibility angka, bukan janji retoris.

## Latihan meja

Rekam diri menjelaskan CAP trade-off untuk product manager dalam tiga kalimat tanpa akronim CAP.

## Glosarium

- **Stakeholder**: siapa pun yang mempengaruhi atau dipengaruhi prioritas hasil.

## Ekstensi: komunikasi insiden

Bahasa insiden ke non-teknis: dampak pengguna, ETA perkiraan dengan rentang, tidak spekulasi akar penyebab dini.

## Penutup organisasi

Pelatihan presentasi singkat untuk engineer staff meningkatkan kualitas keputusan portofolio.

## Lampiran: template email pasca-rapat

- ringkasan keputusan;
- tindakan dengan owner;
- risiko yang diterima;
- review date.

## Refleksi

Jika rapat selalu berakhir tanpa keputusan, periksa apakah Anda memberikan rekomendasi eksplisit atau hanya daftar masalah.

## Penutup akhir

Trade-off yang dijelaskan dengan baik membuat stakeholder **mitra**, bukan musuh dalam cerita delay.

## Tambahan: metrik yang dipahami bisnis

Hubungkan teknis ke revenue/churn hanya jika ada data—spekulasi menghancurkan kredibilitas.

## Tambahan: budaya “bad news first”

Kecepatan eskalasi masalah mendalam mendapat kepercayaan lebih dari polish komunikasi saat semuanya hijau palsu.

## Penutup praktis

Latih satu slide “opsi” untuk setiap inisiatif besar; gunakan kembali format yang sama agar stakeholder terlatih membaca trade-off.

## Tambahan: rapat dengan data tidak lengkap

Nyatakan ketidakpastian dan rencana pengumpulan data (log tambahan sementara, eksperimen terbatas) daripada memberi angka palsu. Stakeholder lebih memaafkan rentang jujur daripada janji presisi palsu yang meledak minggu depan.

## Tambahan: dokumentasi keputusan bersama

Setelah rapat berat, tulis ringkasan “yang disetujui” dan “yang ditunda” agar interpretasi berbeda antar pihak tidak memicu rework. Email satu layar cukup jika taut ke tiket.

## Tambahan: menyesuaikan kedalaman teknis

Product owner yang teknis boleh menerima diagram sequence; stakeholder legal mungkin butuh matriks risiko dan mitigasi tanpa istilah RPC. Satu materi dasar dengan lampiran teknis opsional sering efisien.

## Tambahan: eskalasi tanpa drama

Jika trade-off macet, naikkan dengan opsi tiga jalur dan rekomendasi tunggal. Eskalasi tanpa rekomendasi sering dikembalikan ke engineering tanpa keputusan.

## Tambahan: bahasa risiko regulasi

Untuk domain sensitif, libatkan compliance lebih awal dalam bahasa risiko yang mereka kenal (retensi data, DPIA, audit trail), bukan hanya “kami perlu refactor”.

## Penutup operasional

Komunikasi trade-off adalah iterasi: perbaiki slide/template berdasarkan pertanyaan yang berulang di rapat berikutnya—pertanyaan berulang adalah sinyal kejelasan yang belum cukup.

## Tambahan: latihan presentasi

Rekam diri menjelaskan satu trade-off dalam 120 detik; potong kata sambil dan jargon hingga audiens non-teknis paham tanpa interupsi.

## Penutup akhir praktis

Stakeholder mempercayai engineer yang konsisten dalam **ketepatan perkiraan** dan **transparansi ketika salah**—bukan karena slide paling banyak warna.
