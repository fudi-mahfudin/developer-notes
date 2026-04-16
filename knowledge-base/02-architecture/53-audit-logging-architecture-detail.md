# Audit Logging Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu audit logging
- kenapa audit log berbeda dari log biasa
- event apa yang harus diaudit
- bagaimana merancang audit log yang berguna dan aman
- anti-pattern saat audit hanya formalitas

Audit logging sering disamakan
dengan application logging biasa.

Itu salah.

Log biasa membantu debugging sistem.
Audit log membantu menjawab:
- siapa melakukan apa
- kapan
- terhadap resource apa
- dengan hasil apa

Dalam domain sensitif,
audit log bukan bonus.
Ia adalah kebutuhan inti.

---

## 1. Apa Itu Audit Logging?

Audit logging adalah pencatatan terstruktur
atas aksi penting
yang relevan untuk:
- compliance
- security
- accountability
- investigation

Fokusnya bukan semua detail teknis,
melainkan jejak tindakan yang signifikan.

Audit log harus membantu
mere konstruksi kejadian penting
secara dapat dipercaya.

---

## 2. Audit Log vs Debug Log

Debug/app log biasanya menjawab:
- error apa terjadi?
- code path mana dijalankan?

Audit log menjawab:
- siapa mengakses atau mengubah apa?
- apa keputusan izin?
- apa hasil aksi sensitif?

Mencampur keduanya
sering membuat:
- debug log terlalu sensitif
- audit log terlalu berisik

Mereka punya tujuan berbeda.

---

## 3. Kenapa Audit Logging Penting?

Karena sistem sensitif butuh akuntabilitas.

Saat ada pertanyaan:
- siapa lihat data pasien ini?
- siapa approve claim ini?
- siapa ubah konfigurasi ini?

Sistem harus bisa menjawab.

Tanpa audit log,
banyak investigasi berubah jadi tebakan.

---

## 4. Event Apa yang Harus Diaudit?

Tidak semua hal perlu audit log.

Biasanya yang penting:
- login / auth event penting
- akses data sensitif
- perubahan permission/role
- approval/rejection
- export data
- perubahan konfigurasi
- tindakan admin

Kalau semua hal diaudit mentah,
signal tenggelam dalam noise.

Kalau terlalu sedikit,
jejak penting hilang.

---

## 5. Who, What, When, Result

Audit log sehat minimal menjawab:
- who
- what
- when
- target/resource
- result

Sering juga perlu:
- tenant/context
- source IP/device
- correlation/request id

Kalau informasi ini tidak ada,
audit log jadi sulit dipakai saat incident.

---

## 6. Immutability dan Integrity

Audit log idealnya sulit diubah
tanpa jejak.

Kalau attacker atau admin nakal
bisa menghapus audit trail dengan mudah,
nilai audit log runtuh.

Tingkat proteksi bisa beragam,
tapi prinsipnya:
- audit log tidak boleh diperlakukan
  seperti catatan sementara yang mudah ditimpa.

---

## 7. Sensitivity of Audit Data

Ironisnya,
audit log sendiri bisa sensitif.

Karena ia bisa berisi:
- siapa akses apa
- metadata pasien
- identifier penting
- jejak tindakan admin

Jadi audit logging butuh keseimbangan:
- cukup detail untuk investigasi
- tidak bocor berlebihan

Audit log yang terlalu mentah
bisa jadi liability sendiri.

---

## 8. Audit Logging Bukan Full Payload Dump

Anti-pattern umum:
- log seluruh request/response sensitif
  lalu menyebutnya audit

Itu malas dan berbahaya.

Audit log yang baik
memilih field penting secara sengaja.

Tujuannya:
- akuntabilitas
  bukan
- menyalin semua data mentah ke tempat kedua

---

## 9. Authentication dan Authorization Events

Event auth yang sering layak diaudit:
- login berhasil/gagal signifikan
- logout penting
- token/session revoke
- privilege escalation
- authz deny pada operasi sensitif

Tidak semua deny perlu disimpan selamanya,
tapi banyak operasi kritikal
butuh jejak keputusan akses.

---

## 10. Healthcare Example

Dalam sistem healthcare,
audit log sangat penting untuk:
- siapa buka rekam medis pasien
- siapa edit diagnosis
- siapa export data
- siapa approve tindakan administratif penting

Kalau seorang user melihat data sensitif
di luar konteks tugasnya,
audit trail membantu investigasi.

Tanpa itu,
sistem kehilangan akuntabilitas.

---

## 11. Correlation dan Investigation

Audit log lebih berguna
jika bisa dikaitkan dengan:
- request id
- trace id
- workflow id

Karena satu aksi bisnis
sering menyentuh beberapa service.

Audit log tanpa correlation
menyulitkan rekonstruksi kejadian kompleks.

---

## 12. Retention dan Compliance

Audit data sering punya kebutuhan retention
yang berbeda dari log biasa.

Pertanyaan:
- berapa lama harus disimpan?
- siapa yang boleh mengakses?
- bagaimana penghapusan dilakukan?

Retention terlalu pendek:
- investigasi/history hilang

Retention sembarangan:
- biaya dan exposure naik

Ini keputusan governance, bukan cuma storage.

---

## 13. Service-to-Service Actions

Kadang actor bukan manusia.

Audit log juga mungkin perlu mencatat:
- service principal
- automation job
- integration client

Jika perubahan sensitif dilakukan mesin,
tetap harus ada jejak:
- service mana
- atas nama siapa
- dari workflow mana

---

## 14. Anti-Pattern Umum

1. Menyamakan audit log dengan app log biasa.
2. Logging payload sensitif mentah tanpa seleksi.
3. Tidak mencatat actor/resource/result secara jelas.
4. Audit trail mudah dihapus atau diubah tanpa jejak.
5. Tidak punya retention dan access control yang jelas.

---

## 15. Best Practices

- definisikan event audit yang benar-benar penting.
- simpan actor, action, target, time, result, dan context yang cukup.
- lindungi audit log dari perubahan sembarangan.
- batasi akses ke audit data.
- integrasikan audit dengan tracing/investigation workflow.

---

## 16. Pertanyaan Desain Penting

Sebelum menambah audit log, tanya:
1. Aksi apa yang benar-benar butuh akuntabilitas?
2. Detail minimum apa yang perlu disimpan?
3. Apakah log ini mengandung data sensitif?
4. Siapa yang boleh membaca atau menghapusnya?
5. Bagaimana investigasi akan memakai data ini?

---

## 17. Mini Latihan

Latihan:
1. Pilih lima aksi sensitif yang wajib diaudit.
2. Tentukan schema audit log minimal yang berguna.
3. Identifikasi field sensitif yang tidak boleh ditaruh mentah.
4. Hubungkan audit log dengan trace/request id.
5. Tinjau retention dan access control untuk audit store.

---

## 18. Checklist Kelulusan Topik Audit Logging Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan audit log dari debug log,
- memilih event yang layak diaudit,
- merancang log yang cukup detail tapi tidak berlebihan,
- memikirkan integrity, access control, dan retention,
- memakai audit trail untuk accountability nyata, bukan formalitas.

---

## 19. Ringkasan Brutal

- Kalau sistem sensitifmu tidak bisa menjawab
  siapa melakukan apa,
  sistemmu tidak akuntabel.
- Audit log yang malas
  hanya menghasilkan kebisingan sensitif.
- Audit log yang baik
  adalah bukti, bukan sampah teks.
