# Q84 - Mock vs Stub vs Spy: Use Case Tepat

## Pertanyaan Interview

Apa perbedaan mock, stub, dan spy, dan kapan masing-masing digunakan?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Stub, mock, dan spy punya tujuan berbeda.
Stub memberi data/behavior pengganti agar test deterministik.
Spy mengamati panggilan fungsi tanpa banyak mengubah perilaku.
Mock biasanya memverifikasi interaksi sesuai ekspektasi kontrak.

Saya pilih berdasarkan tujuan test:
jika ingin kontrol input dependency, pakai stub.
jika ingin memastikan fungsi dipanggil dengan argumen tertentu, pakai spy/mock.
Yang penting: jangan over-mock sampai test hanya menguji implementasi sendiri.
Di healthcare, saya fokus pada test behavior penting, bukan detail internal rapuh." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan mock berlebihan jadi masalah?"
2. "Apa bedanya spy dan mock di praktik?"
3. "Kapan sebaiknya pakai real dependency?"
4. "Bagaimana mencegah brittle tests?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Mock berlebihan:
"Saat test gagal karena refactor internal padahal behavior publik sama."

2) Spy vs mock:
"Spy observasi panggilan; mock biasanya punya ekspektasi interaction ketat."

3) Real dependency:
"Pada integration tests untuk validasi boundary nyata."

4) Cegah brittle:
"Assert output/behavior publik, minimalkan assertion detail internal."

5) Anti-pattern:
"Mock semua layer sehingga test kehilangan nilai integrasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pemilihan test double:
- stub untuk kontrol state/input
- spy untuk observasi interaction
- mock untuk kontrak interaction spesifik

Gunakan secukupnya dan tetap behavior-oriented.

## Penjelasan Detail yang Dicari Interviewer

### 1) Tujuan utama test doubles

- menstabilkan test terhadap dependency eksternal
- mempercepat test execution
- membuat failure signal lebih fokus

### 2) Risiko misuse

- assertion terlalu banyak pada call order internal
- coupling test ke implementasi
- false confidence karena dependency nyata tidak pernah diuji

### 3) Strategi seimbang

- unit test: pakai doubles selektif
- integration test: real boundary penting
- contract test: validasi ekspektasi antar service

Mitigasi:
- review test readability
- batasi mocking chain panjang
- gunakan helper test fixtures konsisten

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const paymentGatewayStub = {
  charge: async () => ({ status: "ok" }),
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Flow healthcare sering melibatkan dependency eksternal.
Test double yang tepat membantu test tetap cepat dan stabil
tanpa kehilangan kepercayaan pada perilaku sistem nyata.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
unit test lolos karena gateway dimock terlalu ideal.
di production, response edge-case tidak tertangani.

Perbaikan:
- tambah integration/contract test untuk response nyata
- pertajam stub agar mencakup failure modes

## Contoh Pola Kode yang Lebih Aman

```ts
type TestDoubleChoice = "stub" | "spy" | "mock";
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan beda mock/stub/spy secara jelas.
- Menjelaskan kapan masing-masing dipakai.
- Menjelaskan risiko over-mocking.
- Menjelaskan strategi test-layer seimbang.
- Relevan untuk integrasi healthcare.

## Ringkasan Final

Mock, stub, dan spy adalah alat berbeda, bukan sinonim.
Gunakan berdasarkan tujuan test, bukan kebiasaan.
Pendekatan yang tepat menghasilkan test yang cepat, stabil,
dan tetap merepresentasikan risiko nyata sistem produksi.
