# Designing for Maintainability - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa arti maintainability dalam arsitektur
- kenapa sistem harus mudah diubah, bukan hanya berjalan
- faktor desain yang membuat sistem mahal dipelihara
- bagaimana keputusan hari ini memengaruhi biaya perubahan besok

Banyak sistem kelihatan sukses
karena:
- berjalan
- rilis
- user pakai

Tapi dari dalam,
sistem itu bisa sangat mahal untuk disentuh.

Maintainability adalah kemampuan sistem
untuk tetap bisa:
- dipahami
- diubah
- diperluas
- diperbaiki

tanpa setiap perubahan kecil
terasa seperti operasi besar.

---

## 1. Maintainability Is About Future Change

Maintainability bukan sekadar "code rapi".

Ia tentang:
- seberapa mahal perubahan masa depan

Karena software hidup
dalam arus perubahan:
- requirement berubah
- regulasi berubah
- integrasi bertambah
- tim berganti

Kalau sistem hanya nyaman hari ini
tapi menyakitkan besok,
arsitekturnya belum sehat.

---

## 2. Local Reasoning

Salah satu ciri maintainability tinggi:
- engineer bisa memahami perubahan secara lokal

Artinya:
- dampak perubahan cukup terisolasi
- tidak perlu memahami seluruh sistem untuk edit kecil

Kalau tiap perubahan
mengharuskan membaca 12 modul
dan 4 service lain,
maintainability rendah.

Local reasoning adalah hadiah besar
dari boundary yang baik.

---

## 3. Clear Ownership

Maintainability turun
saat tidak jelas:
- siapa memiliki apa
- siapa berhak mengubah apa
- boundary mana yang stabil

Ownership kabur
melahirkan:
- duplicate logic
- inconsistent fixes
- tanggung jawab kabur

Arsitektur maintainable
mempermudah ownership,
bukan mengaburkannya.

---

## 4. Readability and Intent

Code bisa technically correct
tapi sulit dipelihara
jika intent tidak terlihat.

Maintainability naik saat:
- nama jelas
- boundary masuk akal
- flow bisa diikuti
- rule domain tampak eksplisit

Kalau engineer harus terus menerka
"kenapa ini begini?"
maka biaya perubahan akan tinggi.

---

## 5. Change Amplification

Perubahan kecil idealnya
butuh perubahan kecil.

Jika satu requirement kecil
memaksa edit:
- banyak file
- banyak layer
- banyak config
- banyak test yang rapuh

itu tanda maintainability buruk.

Change amplification adalah musuh utama.

Arsitektur bagus
menekan radius perubahan.

---

## 6. Accidental Complexity

Maintainability rusak
bukan hanya oleh complexity yang memang perlu,
tapi terutama oleh accidental complexity:
- abstraction tak perlu
- indirection berlebihan
- pattern dipakai tanpa alasan
- config terlalu pintar

Sistem maintainable
lebih suka kompleksitas yang jujur
daripada kecanggihan palsu.

---

## 7. Documentation as Maintenance Aid

Maintainability juga didukung oleh:
- ADR
- README modul
- contract docs
- operational notes

Bukan berarti semua harus ditulis panjang.

Yang penting:
- keputusan penting terdokumentasi
- asumsi utama tidak hilang saat orang pindah tim

Sistem tanpa memori organisasi
akan mengulang kebodohan yang sama.

---

## 8. Testability Supports Maintainability

Kalau perubahan sulit diverifikasi,
maintainability turun.

Testability membantu karena:
- memberi feedback cepat
- menjaga confidence
- menangkap regresi

Namun test yang buruk juga bisa jadi beban.

Yang dicari:
- test yang mendukung perubahan,
bukan mengunci desain secara tidak sehat.

---

## 9. Healthcare Example

Misal ada perubahan regulasi:
- field consent pasien harus disimpan
- audit event perlu diperkaya
- retention policy berubah

Sistem maintainable akan membuat perubahan ini:
- cukup lokal
- mudah dilacak dampaknya
- aman diverifikasi

Sistem tidak maintainable
akan membuat perubahan sederhana
terasa seperti proyek lintas bumi.

---

## 10. Team Turnover Reality

Maintainability harus dipikir
untuk orang yang belum ada hari ini.

Tim berubah.
Engineer pindah.
Orang lupa.

Kalau sistem hanya bisa dipahami
oleh pembuat aslinya,
itu utang berbahaya.

Arsitektur maintainable
ramah terhadap orang baru
yang masuk dan harus produktif cepat.

---

## 11. Consistency Helps Maintenance

Konsistensi sering diremehkan.

Padahal maintainability naik
kalau pola yang sama
dipakai berulang secara wajar:
- struktur modul seragam
- error handling cukup seragam
- naming cukup seragam

Konsistensi mengurangi beban mental.

Keunikan tak perlu di setiap sudut
adalah bentuk ego teknis yang mahal.

---

## 12. Maintainability vs Flexibility

Kadang tim mengejar "super flexible system"
dan malah merusak maintainability.

Terlalu banyak extension point,
config, plugin hook, generic abstraction
bisa membuat sistem:
- sulit dibaca
- sulit diprediksi
- sulit diubah aman

Flexibility yang tidak diarahkan
sering melawan maintainability.

---

## 13. Anti-Pattern Umum

1. Abstraction berlapis tanpa alasan bisnis jelas.
2. Boundary lemah sehingga perubahan menyebar ke mana-mana.
3. Nama dan intent kabur.
4. Ownership tidak jelas.
5. Pattern dan framework dipakai demi gengsi, bukan kebutuhan.

---

## 14. Best Practices

- desain untuk local reasoning.
- kecilkan change amplification.
- prioritaskan clarity di atas cleverness.
- dokumentasikan keputusan yang mahal untuk dibalik.
- jaga konsistensi agar sistem tidak terasa liar.

---

## 15. Pertanyaan Desain Penting

Saat menilai maintainability, tanya:
1. Seberapa lokal perubahan umum bisa dilakukan?
2. Siapa owner dari area ini?
3. Apakah intent sistem cukup jelas bagi engineer baru?
4. Complexity mana yang benar-benar perlu, mana yang kebetulan tercipta?
5. Jika requirement berubah bulan depan, apa yang paling menyakitkan untuk diubah?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu fitur yang baru diubah dan ukur berapa area yang ikut disentuh.
2. Cari contoh change amplification yang tidak sehat.
3. Identifikasi abstraction yang membuat reasoning lebih sulit daripada membantu.
4. Tulis 3 perbaikan kecil yang akan menaikkan maintainability modul itu.
5. Minta engineer yang tidak familiar membaca modul dan catat titik bingungnya.

---

## 17. Checklist Kelulusan Topik Designing for Maintainability

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat maintainability sebagai biaya perubahan masa depan,
- menilai local reasoning dan change amplification,
- membedakan complexity yang perlu dan yang kebetulan diciptakan,
- menjaga kejelasan, ownership, dan konsistensi,
- mendesain sistem yang masih ramah untuk engineer berikutnya.

---

## 18. Ringkasan Brutal

- Sistem yang "jalan" belum tentu sistem yang sehat.
- Maintainability adalah ujian jangka panjang.
- Kalau tiap perubahan kecil terasa berisiko besar,
  arsitekturnya sedang menagih bunga utang.
