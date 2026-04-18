# Q87 - False Confidence dari Coverage Tinggi

## Pertanyaan Interview

Mengapa coverage tinggi bisa memberi rasa aman palsu, dan bagaimana menghindarinya?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Coverage tinggi hanya menunjukkan baris kode dieksekusi saat test,
bukan jaminan behavior penting benar.
Kita bisa punya 90% coverage tapi tetap miss bug kritikal
jika assertion dangkal atau skenario edge case tidak diuji.

Cara menghindarinya: gunakan coverage sebagai indikator sekunder,
bukan KPI utama.
Saya fokus pada risk-based testing:
uji alur kritikal, failure modes, dan integrasi nyata.
Di healthcare, false confidence berbahaya karena bug pada flow inti
bisa berdampak langsung ke operasi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Coverage metrik apa yang paling menipu?"
2. "Bagaimana mendeteksi test yang dangkal?"
3. "Apakah coverage target tetap perlu?"
4. "Apa metrik pelengkap selain coverage?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Paling menipu:
"Line coverage tanpa branch/behavior coverage."

2) Test dangkal:
"Banyak test tapi minim assertion bermakna."

3) Target coverage:
"Boleh ada baseline, tapi jangan jadi tujuan utama."

4) Metrik pelengkap:
"Defect escape rate, flaky rate, incident trend."

5) Anti-pattern:
"Kejar angka coverage dengan test trivial."

## Jawaban Ideal (Versi Singkat, Level Senior)

Coverage dipakai untuk:
- menemukan area belum teruji
- memicu diskusi risiko

Bukan untuk:
- mengklaim kualitas final
- menutup kebutuhan integration/E2E tests

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa false confidence terjadi

- test hanya menyentuh happy path
- branch error handling tidak diuji
- dependency behavior nyata diabaikan

### 2) Cara membangun confidence yang nyata

- risk mapping per fitur
- negative tests dan boundary conditions
- contract/integration tests untuk area kritikal

### 3) Governance kualitas

- review kualitas assertion di PR
- track bug escaped despite tests
- improve test suite berdasarkan postmortem

Mitigasi:
- threshold coverage per modul kritikal
- wajib branch coverage pada domain rules
- test quality rubric internal

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
expect(result.status).toBe("approved");
expect(result.reason).toBeUndefined();
```

Assertion behavior lebih bernilai daripada sekadar "fungsi terpanggil".

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, bug kritikal sering muncul pada edge case.
Coverage tinggi yang salah arah membuat tim terlambat menyadari risiko.
Fokus pada confidence nyata melindungi layanan operasional.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
coverage 92%, tapi kasus refund parsial gagal di produksi.
test hanya menguji alur sukses.

Perbaikan:
- tambah test skenario gagal dan edge values
- review kualitas assertion, bukan jumlah test saja

## Contoh Pola Kode yang Lebih Aman

```ts
type TestConfidenceMetric = {
  coveragePercent: number;
  escapedDefects: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan limit coverage metric.
- Menjelaskan konsep false confidence.
- Menjelaskan metrik kualitas pelengkap.
- Menjelaskan strategi risk-based testing.
- Relevan untuk risk profile healthcare.

## Ringkasan Final

Coverage tinggi itu berguna, tapi tidak cukup.
Kepercayaan kualitas harus dibangun dari test yang menargetkan risiko nyata.
Dengan begitu, tim tidak terjebak angka,
dan kualitas produksi benar-benar meningkat.
