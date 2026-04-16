# Trade-off Design Berdasarkan Konteks Bisnis

## Tujuan

Topik ini menekankan bahwa keputusan arsitektur harus didorong konteks bisnis, bukan preferensi teknologi personal.

## Kenapa Penting

- Desain "paling canggih" belum tentu paling bernilai.
- Banyak keputusan teknis bagus di teori tapi buruk untuk prioritas bisnis.
- Engineer senior dinilai dari keputusan yang berdampak, bukan kompleksitas diagram.

## Model Mental

1. Mulai dari outcome bisnis.
2. Terjemahkan outcome ke constraints teknis.
3. Pilih opsi dengan rasio nilai/biaya terbaik.
4. Nyatakan trade-off secara eksplisit.
5. Revisi keputusan saat konteks berubah.

## Pertanyaan Bisnis Awal

- Apa metrik keberhasilan utama?
- Berapa cost of delay?
- Risiko apa yang paling mahal?
- Horizon produk 6-12 bulan bagaimana?
- Apakah tim punya kapasitas operasional?

## Menerjemahkan ke Keputusan Teknis

Contoh:

- prioritas time-to-market tinggi -> pilih solusi lebih sederhana;
- prioritas compliance tinggi -> investasi kontrol audit lebih awal;
- prioritas scale tinggi -> rancang kapasitas dan isolasi sejak awal.

## Dimensi Trade-off Umum

- speed vs reliability.
- consistency vs latency.
- flexibility vs simplicity.
- build vs buy.
- capex/opex vs control.

## Cost of Complexity

Setiap fitur arsitektur tambahan punya biaya:

- learning curve.
- incident surface area.
- observability burden.
- on-call fatigue.

Jika nilai bisnis kecil, kompleksitas itu rugi.

## Build vs Buy

Kapan buy cocok:

- kebutuhan standar;
- time pressure tinggi;
- tim kecil.

Kapan build cocok:

- differentiator inti produk;
- requirement khusus;
- ketergantungan vendor terlalu berisiko.

## Reliability Investment Timing

Tidak semua kontrol reliability harus level enterprise dari hari pertama.
Tetapi flow yang jika gagal berdampak besar harus diprioritaskan lebih awal.

## Security vs Friction

Keamanan ketat tanpa UX thinking bisa menurunkan konversi.
Sebaliknya UX mulus tanpa security cukup bisa menghasilkan breach.
Butuh tuning berbasis data.

## Product Stage Matters

Tahap awal:

- validasi pasar lebih penting.

Tahap growth:

- scale/reliability mulai dominan.

Tahap mature:

- operability, compliance, cost optimization lebih berat.

## Stakeholder Communication

Engineer senior harus bisa menjelaskan:

- opsi A/B/C;
- dampak bisnis masing-masing;
- risiko yang diterima;
- rencana mitigasi.

## Decision Record

Gunakan catatan keputusan (ADR/design note):

- konteks;
- opsi;
- keputusan;
- trade-off;
- trigger untuk evaluasi ulang.

Ini menghindari debat berulang tanpa memori institusional.

## Anti-Pattern

### 1. Teknologi-First

Memilih stack dulu, masalah belakangan.

### 2. One-Size-Fits-All

Menggunakan pola sama untuk domain berbeda.

### 3. Tidak Menyebut Konsekuensi

Keputusan tampak gratis padahal mahal.

### 4. Tidak Ada Exit Strategy

Saat asumsi berubah, tim terjebak.

## Heuristik Senior

1. Tanyakan "nilai bisnis apa yang dibeli oleh kompleksitas ini?"
2. Tuliskan biaya operasional jangka panjang.
3. Prioritaskan keputusan reversible di fase awal.
4. Simpan keputusan irreversible untuk saat data cukup.
5. Align trade-off dengan risk appetite bisnis.
6. Review keputusan besar secara periodik.
7. Jujur soal ketidakpastian dan asumsi.

## Pertanyaan Interview

### Dasar

- Kenapa desain harus berbasis konteks bisnis?
- Apa contoh trade-off arsitektur umum?
- Kenapa kompleksitas punya biaya?
- Kapan build vs buy?

### Menengah

- Bagaimana menyusun opsi desain untuk stakeholder non-teknis?
- Bagaimana memilih keputusan reversible vs irreversible?
- Bagaimana mengukur keberhasilan keputusan arsitektur?
- Kapan perlu pivot dari keputusan awal?

### Senior

- Bagaimana Anda menyeimbangkan tekanan delivery cepat dan kebutuhan kualitas jangka panjang?
- Bagaimana Anda memfasilitasi keputusan lintas produk, engineering, dan finance?
- Bagaimana Anda mencegah organisasi terjebak pada keputusan arsitektur lama?
- Bagaimana Anda menentukan timing tepat untuk investasi reliability besar?

## Kasus Nyata

- startup membangun infra kompleks sebelum product-market fit.
- enterprise menunda hardening sampai terkena audit gagal.
- tim memilih self-host semua komponen lalu kewalahan operasional.
- keputusan buy cepat berhasil, lalu diganti build saat kebutuhan unik muncul.

## Ringkasan Brutal

- Desain tanpa konteks bisnis adalah engineering vanity.
- Trade-off harus eksplisit dan terukur.
- Tim senior memilih keputusan yang paling bernilai, bukan yang paling "keren".

## Checklist

- Saya tahu outcome bisnis yang ingin dicapai.
- Saya menilai opsi desain dengan biaya dan risiko.
- Saya menulis trade-off dan asumsi.
- Saya punya trigger evaluasi ulang keputusan.
- Saya bisa menjelaskan keputusan ini ke stakeholder non-teknis.

## Penutup

Arsitektur yang benar bukan yang memenangkan debat teknis.
Arsitektur yang benar adalah yang menang untuk bisnis dengan risiko yang dapat diterima.

## Lampiran Review Keputusan

Gunakan pertanyaan ini saat evaluasi ulang keputusan arsitektur:

- apakah asumsi awal masih valid?
- apakah biaya operasional naik di luar prediksi?
- apakah target bisnis berubah?
- apakah ada opsi baru yang lebih sederhana?

Evaluasi terstruktur mencegah organisasi bertahan pada keputusan lama hanya karena inertia.
