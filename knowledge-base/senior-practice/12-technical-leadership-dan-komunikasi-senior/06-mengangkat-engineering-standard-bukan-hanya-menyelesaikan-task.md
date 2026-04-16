# Mengangkat Engineering Standard, Bukan Hanya Menyelesaikan Task

## Tujuan

Dokumen ini menjelaskan bagaimana engineer senior menyeimbangkan **penyelesaian tugas** dengan **pengangkatan standar** engineering (kualitas, keamanan, observability, kecepaman) tanpa menjadi bottleneck moralistik.

## Kenapa Topik Ini Penting

- Tim yang hanya chase story point akan menumpuk utang teknis hingga kecepatan kolaps.
- Standar tanpa pragmatisme menghambat delivery dan membuat standar diabaikan.

## Definisi “standard”

Standar adalah **perjanjian tim** tentang:

- definisi selesai (DoD);
- praktik wajib (review, test, observability minimal);
- batas yang tidak boleh dilintasi (secret di repo, SQL tanpa parameterisasi).

Bukan daftar preferensi pribadi mentor.

## Cara mengangkat standar

### Demonstrasi, bukan doktrin

Tunjukkan PR contoh, template, dan tooling yang membuat “cara benar” lebih mudah.

### Automate enforcement

Lint, typecheck, policy CI mengurangi debat manusia berulang.

### Incremental adoption

Grand rewrite policy jarang berhasil; perkenalkan standar per layanan atau per kuartal.

## Menghubungkan standar ke risiko bisnis

Jelaskan dalam bahasa dampak:

- tanpa test integrasi X, regresi checkout berulang—biaya support naik.

Stakeholder memahami angka lebih dari idealisme.

## Champion dan owner

Setiap standar punya owner yang menjawab pertanyaan dan mereview pengecualian.

Standar tanpa owner mati.

## Proses pengecualian

Break-glass documented:

- siapa approve;
- durasi;
- follow-up wajib.

Tanpa ini, standar dianggap fanatisme.

## Metrik adopsi

- persentase layanan dengan health check;
- cakupan test kritis;
- lead time tidak boleh merosot drastis saat standar naik.

Jika metrik delivery hancur, sesuaikan standar atau tooling, bukan hanya menyalahkan tim.

## Anti-pattern

### “Karena best practice” tanpa konteks

Tidak meyakinkan.

### Menambah proses tanpa menghapus yang redundan

Kelebihan birokrasi.

### Double standard: VIP bypass review

Norma buruk menular.

### Standar dokumen panjang yang tidak dibaca

Buang dan ganti checklist executable.

## Heuristik senior

1. Satu perbaikan standar per sprint untuk tim kecil.
2. Ukur sebelum/ setelah perubahan proses.
3. Rayakan tim yang mengadopsi, jangan hanya mengaudit yang melanggar.

## Pertanyaan interview

### Dasar

- Apa contoh standar engineering yang layak diotomatisasi?
- Bagaimana Anda menangani konflik deadline vs standar?

### Menengah

- Bagaimana Anda memperkenalkan SAST ke pipeline tanpa memblokir semua PR?

### Senior

- Bagaimana Anda merevisi standar yang sudah usang tetapi “suci” di budaya tim?

## Kasus nyata

- Standar coverage 90% memaksa test palsu—standar direvisi ke coverage area kritis + mutasi selektif.

## Ringkasan brutal

- Standar tanpa **tooling dan contoh** adalah dokumen tidur; task tanpa standar adalah **pinjaman berbunga tinggi**.

## Checklist

- [ ] Standar punya owner dan metrik.
- [ ] Ada jalur pengecualian jelas.
- [ ] Tooling mendukung jalur bahagia.
- [ ] Revisi berkala berdasarkan data.

## Penutup

Mengangkat standar adalah **investasi compounding**—hasilnya terlihat lambat lalu tiba-tiba sangat terasa saat skala naik.

## Kedalaman: platform golden path

Template layanan dengan observability dan CI default mengangkat median kualitas tanpa ceramah.

## Kedalaman: guild lintas tim

Forum bulanan untuk berbagi lesson learned mencegah standar silo antar squad.

## Latihan meja

Pilih satu praktik (misalnya structured logging). Rencanakan rollout 4 minggu dengan metrik adopsi.

## Glosarium

- **DoD**: Definition of Done—kriteria task dianggap selesai.

## Ekstensi: compliance vs velocity

Mapping standar ke persyaratan regulasi membantu prioritisasi yang tidak terasa arbitrer.

## Penutup organisasi

Leadership harus melindungi waktu untuk perbaikan standar, bukan hanya fitur.

## Lampiran: review standar triwulanan

- apa yang tidak dipakai;
- apa yang sering dilanggar (tanda tooling lemah);
- apa yang perlu didemokratisasikan ke RFC.

## Refleksi

Jika standar hanya diikuti saat audit mendekat, itu performa compliance, bukan kultur.

## Penutup akhir

Senior engineer membangun sistem di mana **melakukan hal benar adalah path of least resistance**.

## Tambahan: negosiasi dengan product

Bawa data defect dan MTTR saat meminta slot untuk standar—argumen emosional kalah dari argumen ekonomi operasional.

## Tambahan: dokumentasi singkat “why”

Setiap standar punya paragraf “kenapa ada” agar generasi baru tim memahami sejarah, bukan hanya aturan kering.

## Penutup praktis

Mulai dari satu titik nyeri insiden terakhir: standar yang lahir dari nyeri dipercaya lebih dari slide policy.

## Tambahan: standar untuk layanan legacy

Standar baru sering bentrok dengan kode lama. Gunakan “strangler” rule: setiap sentuhan area lama harus meningkatkan satu aspek (test, logging, typing) sesuai batas waktu PR.

## Tambahan: dokumentasi “cara benar”

Contoh PR emas per layanan mengurangi interpretasi ganda. Link contoh di CONTRIBUTING lebih efektif daripada aturan abstrak panjang.

## Tambahan: friction log

Catat setiap minggu: proses mana yang paling sering dilanggar dan kenapa—biasanya sinyal tooling atau beban sprint, bukan moral tim.

## Tambahan: standar keamanan non-negosiasi

Beberapa aturan (secret scanning, SQL injection baseline) tidak boleh dinegosiasikan deadline—kecuali break-glass tertulis dengan persetujuan eksekutif risiko.

## Tambahan: komunikasi ke manajemen

Laporan bulanan singkat: berapa insiden dicegah oleh standar baru, berapa waktu pipeline bertambah. Tanpa angka, standar dianggap biaya murni.

## Penutup operasional

Standar harus direvisi saat konteks berubah—standar suci yang tidak relevan akan diabaikan diam-diam oleh engineer praktis.

## Tambahan: guild review standar

Forum lintas squad untuk mengusulkan perubahan standar mencegah aturan “jakarta sentral” yang tidak cocok di edge case domain.

## Penutup akhir praktis

Standar hidup yang punya owner, metrik, dan revisi berkala mengalahkan poster agile yang mengumpulkan debu di dinding.

## Tambahan: onboarding standar

Checklist hari pertama: akses CI, contoh PR, definisi done, tautan security baseline. Standar yang tidak diajarkan tidak bisa dipatuhi.

## Penutup refleksi

Jika standar hanya diikuti saat audit, evaluasi apakah standar terlalu berat atau apakah leadership tidak pernah membayar utang proses—dua masalah berbeda membutuhkan solusi berbeda.
