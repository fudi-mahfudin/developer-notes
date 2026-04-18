# FAQ & Troubleshooting Guide

Panduan ini menjelaskan **peran FAQ/troubleshooting**, **perbedaan dengan dokumentasi referensi lengkap**, **praktik penulisan jawaban**, **integrasi dengan support**, serta **kesalahan** yang membuat panduan menjadi tidak terpercaya.

---

## 1. Definisi singkat

**FAQ** menjawab pertanyaan yang **sering diajukan berulang** dalam bentuk ringkas. **Troubleshooting guide** membantu pembaca **mendiagnosis gejala** mengikuti pohon keputusan hingga langkah pemulihan atau eskalasi.

Keduanya adalah dokumen yang **sangat sering dibuka** oleh developer dan support saat mencari jawaban cepat.

---

## 2. Mengapa tidak cukup dengan dokumentasi utama

Referensi besar sering sulit dicari dalam tekanan—FAQ/troubleshooting menyediakan **alur yang dimulai dari gejala nyata**, bukan dari nama komponen.

---

## 3. Struktur troubleshooting yang baik

1. **Gejala pengguna** — bahasa yang mereka gunakan di tiket support.  
2. **Penyebab kemungkinan** — dari yang paling umum.  
3. **Langkah verifikasi** — perintah/query singkat.  
4. **Perbaikan** — dengan peringatan risiko.  
5. **Jika masih gagal** — tiket informasi untuk eskalasi engineering.  

---

## 4. FAQ versus tiket duplikat

FAQ mengurangi tiket berulang—namun harus **diperbarui** ketika gejala sebenarnya berubah setelah rilis.

---

## 5. Healthcare

Cantumkan **peringatan keselamatan pasien** jika workaround melibatkan alur manual—dan arahkan ke protokol klinis resmi.

---

## 6. Versi dan konteks lingkungan

Cantumkan **versi produk** dan lingkungan untuk mana jawaban berlaku—menghindari jawaban yang benar pada staging tetapi salah pada prod.

---

## 7. Kesalahan umum

- Menulis jawaban tanpa tanggal atau versi—menyesatkan setelah refactor besar.
- Menggunakan jargon internal tanpa glosarium.
- Tidak menghubungkan ke runbook ketika incident skala besar.

---

## 8. Ringkasan

FAQ/troubleshooting adalah **lapisan pertama dukungan mandiri**. Developer senior tetap membuka panduan ini untuk jawaban cepat daripada membaca ulang seluruh TSD—maka kualitasnya langsung mempengaruhi produktivitas organisasi.

---

## 9. Tata urut penyortiran pertanyaan

Urutkan FAQ berdasarkan **frekuensi tiket dukungan**, bukan abjad—agar pengguna mendapat jawaban cepat untuk masalah yang paling sering terjadi di lapangan.

---

## 10. Bukti dan log yang diminta pengguna

Sertakan daftar informasi yang harus dilampirkan saat eskalasi (trace ID, tenant, build) agar tidak terjadi ping-pong komentar yang memperpanjang downtime.

---

## 11. Sinkron dengan status insiden

Saat ada incident besar, tambahkan banner di halaman FAQ yang menaut ke **status page** resmi—menghindari jawaban yang sudah tidak akurat saat sistem masih dalam pemulihan parsial.

---

## 12. Glosarium singkat di bagian atas

Definisikan istilah seperti **trace ID**, **tenant**, atau **site** yang mungkin asing bagi staf klinis yang membaca FAQ—tanpa mengorbankan akurasi teknis pada bagian troubleshooting lanjutan.

---

## 13. Uji coba dokumen

Lakukan **drill triwulan** dengan orang di luar tim untuk mengikuti panduan troubleshooting tanpa bantuan—kegagalan langkah mengungkap bagian yang ambigu lebih cepat daripada komplain produksi.

---

## 14. Metrik efektivitas

Pantau penurunan tiket duplikat dan waktu penyelesaian median setelah revisi FAQ—data sederhana ini membantu memprioritaskan pembaruan konten dibanding opini semata.

---

## 15. A/B jawaban singkat

Untuk pertanyaan dengan banyak mitos, sediakan jawaban **Ya/Tidak** diikuti penjelasan—membantu pemindaian cepat pada perangkat mobile di lorong rumah sakit.

---

## 16. Koordinasi dengan dokumentasi hukum

Pastikan FAQ tidak menggantikan kebijakan privasi resmi—tautkan ke dokumen legal untuk persyaratan consent dan retensi data yang kompleks.

---

## 17. Bahasa yang menghormati pengguna klinis

Hindari menyalahkan pengguna (“Anda salah klik”); gunakan bahasa netral tentang penyebab teknis dan langkah pemulihan—penting untuk menjaga kepercayaan pada sistem klinis.

---

## 18. Automatisasi dari tiket support

Gunakan tag tiket untuk mengusulkan pertanyaan FAQ baru secara berkala—menjadikan dukungan sebagai sensor permintaan dokumentasi.

---

## 19. Panduan multimedia

Untuk langkah rumit UI, lampirkan GIF pendek atau video tanpa PHI—sekali lagi verifikasi kepatuhan privasi dalam rekaman.

---

## 20. Ownership dokumen

Cantumkan pemilik FAQ per domain produk agar pembaruan tidak tertunda ketika satu-satunya penulis sedang cuti panjang.
