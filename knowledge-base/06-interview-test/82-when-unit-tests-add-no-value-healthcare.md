# Q82 - Kapan Unit Test Tidak Memberi Nilai

## Pertanyaan Interview

Kapan unit test tidak memberi nilai signifikan, dan bagaimana menyikapinya?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Unit test tidak selalu bernilai tinggi di semua area.
Jika test hanya memverifikasi hal trivial atau implementation detail rapuh,
biaya maintenance bisa lebih besar daripada manfaat.

Saya biasanya menghindari unit test untuk glue code sangat tipis
yang lebih efektif diverifikasi lewat integration test.
Fokus unit test saya ada di business rules yang kompleks dan berisiko tinggi.
Intinya, kualitas test diukur dari kemampuan mencegah bug bermakna,
bukan dari jumlah test semata.
Di healthcare, prioritas harus ke flow yang berdampak operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Contoh unit test yang low value?"
2. "Bagaimana memutuskan skip unit test?"
3. "Apakah coverage target jadi tidak penting?"
4. "Kapan integration test lebih tepat?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Low value:
"Test getter/setter trivial atau framework behavior standar."

2) Skip unit test:
"Jika behavior lebih bermakna diuji di level integrasi."

3) Coverage target:
"Berguna sebagai indikator kasar, bukan tujuan utama."

4) Integration lebih tepat:
"Saat bug dominan terjadi di interaksi komponen/dependency."

5) Anti-pattern:
"Menulis test demi angka coverage tanpa nilai deteksi bug."

## Jawaban Ideal (Versi Singkat, Level Senior)

Value-driven testing:
- prioritaskan area risiko tinggi
- hindari test rapuh implementation detail
- pilih layer test paling efektif
- evaluasi biaya maintain test

## Penjelasan Detail yang Dicari Interviewer

### 1) Ciri unit test bernilai rendah

- assertion terlalu dangkal
- mudah patah saat refactor non-behavioral
- tidak pernah menangkap bug riil

### 2) Framework keputusan

- apakah logic ini kompleks?
- apakah area ini sering berubah?
- apakah kegagalan di area ini berdampak besar?

Jika jawaban "tidak", mungkin unit test bukan prioritas.

### 3) Rebalancing strategy

- kurangi test yang noisy
- tambah integration tests di boundary kritikal
- pantau defect escape rate

Mitigasi:
- test review rutin
- tag test berdasarkan business criticality
- hapus test legacy yang redundant

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// low value: hanya cek pass-through sederhana
function getName(user) {
  return user.name;
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Resource testing terbatas harus diarahkan ke area paling berdampak.
Di healthcare, false confidence dari test low value berbahaya
karena bug kritikal bisa tetap lolos.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
coverage tinggi, tapi bug integrasi status transaksi lolos produksi.
unit test fokus ke helper trivial.

Perbaikan:
- refocus test ke business rules dan integration boundaries
- turunkan prioritas test yang tidak menangkap risiko nyata

## Contoh Pola Kode yang Lebih Aman

```ts
type TestValueAssessment = {
  complexity: "low" | "medium" | "high";
  businessImpact: "low" | "medium" | "high";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan bahwa unit test tidak selalu bernilai.
- Menjelaskan indikator low-value tests.
- Menjelaskan keputusan berbasis risiko.
- Menjelaskan rebalancing ke layer lain.
- Relevan untuk domain healthcare kritikal.

## Ringkasan Final

Unit test yang baik adalah investasi, bukan checklist.
Jika test tidak meningkatkan kepercayaan terhadap behavior penting,
lebih baik alihkan effort ke test layer yang lebih efektif.
Pendekatan value-driven menghasilkan kualitas yang lebih nyata.
