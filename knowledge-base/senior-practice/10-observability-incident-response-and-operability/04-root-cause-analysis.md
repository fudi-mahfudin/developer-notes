# Root Cause Analysis (RCA)

## Tujuan

Dokumen ini menjelaskan **root cause analysis** dalam konteks engineering produksi: bagaimana menemukan penyebab yang dapat diperbaiki agar insiden **tidak berulang**, tanpa jatuh ke jebakan menyalahkan individu atau mengunci pada satu faktor palsu.

RCA yang buruk menghasilkan “fix” permukaan; RCA yang baik mengubah sistem, proses, atau observability agar kegagalan serupa lebih sulit terjadi atau lebih cepat terdeteksi.

## Kenapa Topik Ini Penting

- Tanpa RCA, organisasi mengulang **insiden yang sama** dengan biaya operasional dan reputasi.
- RCA yang disalahgunakan memicu **blame culture** dan menyembunyikan faktor sistemik.
- RCA yang matang mendukung **postmortem** dan perbaikan berbasis bukti.

## Model Mental

1. **Root cause** jarang satu titik tunggal; sering ada **rantai kausal** dan **faktor kontribusi**.
2. Tujuan RCA bukan memenangkan argumen, melainkan **mengurangi risiko kejadian ulang**.
3. Bukti (log, trace, metrik, timeline perubahan) lebih penting dari intuisi.
4. **Proximate cause** mudah terlihat; **latent** cause (desain, dokumen, kepemilikan) sering yang sebenarnya perlu diperbaiki.
5. RCA selesai ketika ada **tindakan remediasi** yang terukur dan bertanggung jawab.

## Istilah: root vs contributing

- **Root cause (praktis)**: faktor yang jika dihilangkan atau diperbaiki, mencegah recurrence atau mengurangi probabilitas/severity secara signifikan.
- **Contributing factors**: kondisi yang memperparah atau memungkinkan (misalnya kurangnya guardrail, alert lambat, dokumentasi salah).

Menolak mengakui multiple contributing factors sering menghasilkan narasi oversimplified.

## Metode lima mengapa (5 Whys)

Alur:

1. Jelaskan gejala spesifik.
2. Tanya “mengapa?” dan jawab dengan bukti.
3. Ulangi hingga mencapai lapisan yang dapat diperbaiki (kode, proses, konfigurasi).

Keterbatasan:

- rantai “mengapa” bisa cabang;
- jawaban spekulatif tanpa data menghasilkan cerita fiksi.

Gunakan 5 Whys sebagai **alat diskusi**, bukan ritual form yang harus tepat lima langkah.

## Timeline reconstruksi

Langkah praktis:

- kumpulkan timestamp deploy, perubahan flag, traffic spike;
- overlay dengan metrik error/latency;
- identifikasi **perubahan terkorelasi** vs **koinsidensi**.

Tanpa timeline, RCA menjadi debat opini.

## Bukti dari observability

- **Metrics**: kapan mulai degradasi, seberapa dalam dampaknya.
- **Traces**: span mana yang pertama melambat atau gagal.
- **Logs**: error pertama, correlation id, versi build.

Hindari RCA yang hanya mengutip satu log baris tanpa konteks.

## Blameless culture

Blameless berarti fokus pada **sistem dan proses**, bukan menyalahkan orang secara personal. Ini **bukan** berarti tidak ada akuntabilitas.

Akuntabilitas sehat:

- kepemilikan peran (who approves change);
- review yang terlewat;
- gap runbook.

Dokumentasikan sebagai **gap sistem**, bukan sebagai serangan personal di chat publik.

## Anti-pattern RCA

### Satu orang disalahkan

Menutup diskusi tanpa perbaikan sistem.

### “Root cause: human error”

Terlalu dangkal; tanyakan mengapa kesalahan manusia dimungkinkan oleh sistem.

### Tidak ada action item

RCA dokumen yang tidak mengubah backlog adalah buang waktu.

### Hanya technical root

Mengabaikan organisasi (on-call overload, deadline tidak realistis) sering membuat insiden berulang.

## RCA untuk insiden keamanan

Pertimbangan tambahan:

- containment dulu;
- chain of custody bukti;
- komunikasi legal/PR.

RCA keamanan tidak selalu publik penuh; tetap ada versi internal lengkap.

## Heuristik senior

1. Mulai dari gejala terukur, bukan dari dugaan penyebab.
2. Dokumentasikan hipotesis dan **bukti yang membuktikan/menyangkal**.
3. Akhiri dengan action items: mitigasi, deteksi lebih awal, pengujian.
4. Tautkan ke SLO impact untuk prioritas.
5. Jadwalkan verifikasi fix di produksi atau canary.

## Pertanyaan interview

### Dasar

- Apa beda proximate cause dan root cause?
- Apa itu contributing factor?
- Kenapa blameless penting?

### Menengah

- Bagaimana Anda membangun timeline RCA multi-service?
- Kapan 5 Whys tidak cukup?

### Senior

- Bagaimana Anda memastikan RCA menghasilkan perubahan sistem, bukan dokumen arsip?

## Kasus nyata

- Outage karena limit connection pool: proximate cause pool habis; root kontributif: tidak ada alert queue wait + tidak ada load test sebelum kampanye.

## Ringkasan brutal

- RCA tanpa bukti adalah storytelling.
- RCA tanpa action item adalah teater.

## Checklist

- Saya punya timeline dan bukti.
- Saya memisahkan contributing vs root praktis.
- Saya punya action items dengan owner.

## Penutup

RCA yang jujur membuat organisasi **lebih malu mengulang kesalahan yang sama** daripada malu mengakui kesalahan pertama.

## Lampiran: kerangka dokumen RCA satu halaman

1. Ringkasan insiden dan dampak (durasi, pengguna, SLO).
2. Timeline kunci.
3. Root / contributing factors dengan bukti.
4. Apa yang berjalan baik (respons tim).
5. Action items (mitigasi, deteksi, pencegahan) dengan owner dan target tanggal.

## Kedalaman: diagram ishikawa (fishbone)

Untuk insiden kompleks, diagram fishbone membantu kelompokkan penyebab ke:

- people/process;
- platform/tooling;
- product/change;
- external dependency.

Gunakan sebagai alat brainstorming, lalu **pangkas** cabang yang tidak didukung data.

## Kedalaman: verifikasi hipotesis

Setiap hipotesis utama sebaiknya punya:

- prediksi terukur jika benar;
- eksperimen atau query yang membuktikan;
- hasil ya/tidak.

Ini mencegah RCA berhenti pada “kemungkinan besar karena X”.

## Failure mode manajerial

- deadline postmortem ketat tanpa waktu investigasi → RCA dangkal.
- tidak ada forum untuk membahas faktor organisasi → repeat incident.

## Latihan

Ambil insiden lalu tulis dua versi RCA: satu hanya teknis, satu memasukkan proses. Bandingkan action items yang muncul.

## Glosarium

- **RCA**: proses; bukan dokumen tunggal.
- **Corrective vs preventive**: corrective memperbaiki yang rusak; preventive mengurangi probabilitas masa depan.

## Penutup operasional

RCA sejati mengubah perilaku organisasi minggu berikutnya. Jika tidak, Anda belum selesai.

## Tambahan: RCA dan change management

Setelah RCA, perubahan sering memerlukan:

- review arsitektur singkat;
- update runbook;
- penambahan test atau guardrail otomatis.

Tanpa change management, action item RCA mengendap di backlog sampai insiden berikutnya memaksa prioritas lagi.

## Tambahan: metrik kualitas RCA

Indikator maturitas:

- persentase action item yang selesai sebelum tenggat;
- berapa kali pola insiden yang sama muncul kembali dalam 90 hari;
- waktu dari insiden selesai hingga postmortem dipublikasikan.

Angka-angka ini lebih jujur daripada panjang dokumen RCA.
