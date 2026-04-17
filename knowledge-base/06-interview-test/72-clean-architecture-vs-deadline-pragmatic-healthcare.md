# Q72 - Batasan Clean Architecture vs Deadline

## Pertanyaan Interview

Bagaimana menerapkan clean architecture secara pragmatis saat deadline ketat?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Clean architecture itu alat, bukan agama.
Saat deadline ketat, saya fokus ke prinsip bernilai tinggi dulu:
pisahkan domain logic dari framework, batasi coupling, dan jaga testability di area kritikal.

Tidak semua hal harus ideal di sprint pertama.
Saya biasanya pilih hotspot yang paling berisiko untuk diproteksi arsitekturnya,
sementara area rendah risiko boleh lebih pragmatis.
Lalu jadwalkan debt repayment yang terukur.
Di healthcare, pendekatan ini menjaga delivery tetap jalan
tanpa mengorbankan stabilitas domain penting." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bagaimana menentukan bagian yang wajib clean?"
2. "Kapan kompromi arsitektur masih aman?"
3. "Bagaimana mengelola technical debt?"
4. "Apa indikator arsitektur sudah kebablasan?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Wajib clean:
"Area core business rules dan integrasi kritikal."

2) Kompromi aman:
"Saat terdokumentasi, dibatasi scope, dan ada rencana perbaikan."

3) Kelola debt:
"Buat backlog debt dengan prioritas berbasis dampak."

4) Indikator kebablasan:
"Perubahan kecil makin sulit, bug lintas modul meningkat."

5) Anti-pattern:
"Alasan deadline dipakai terus untuk mengabaikan desain."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pragmatis berarti:
- jaga boundary inti
- kompromi terkontrol
- dokumentasi keputusan
- debt repayment terjadwal

## Penjelasan Detail yang Dicari Interviewer

### 1) Prinsip minimal yang harus dijaga

- domain logic tidak tergantung framework
- dependency direction jelas
- side effect dipisah dari keputusan bisnis

### 2) Strategi delivery cepat

- gunakan vertical slice per use case
- hindari over-abstraction di awal
- test fokus pada high-risk flows

### 3) Governance keputusan

- catat ADR untuk kompromi teknis
- tetapkan expiry date untuk temporary solution
- review arsitektur tiap milestone

Mitigasi:
- guardrail linting/dependency rules
- arsitektur checklist di PR review
- metrik maintainability

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const architectureTradeoff = {
  protectedCoreDomain: true,
  temporaryShortcut: "adapter-inline",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, tekanan deadline tinggi sering terjadi.
Jika semua kompromi dibiarkan, kualitas turun drastis di area sensitif.
Pendekatan pragmatis menjaga dua hal:
time-to-delivery dan keamanan operasional.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
deadline mendesak membuat business rule ditaruh di controller acak.
beberapa sprint kemudian, aturan sulit dilacak dan sering regress.

Perbaikan:
- ekstrak rule ke domain service
- tambah test untuk flow kritikal
- dokumentasikan batas kompromi

## Contoh Pola Kode yang Lebih Aman

```ts
type ArchitectureCompromise = {
  reason: string;
  scope: string;
  cleanupDeadline: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan clean architecture sebagai spektrum.
- Menjelaskan prioritas area kritikal.
- Menjelaskan kompromi terkontrol.
- Menjelaskan debt management.
- Relevan pada tekanan delivery healthcare.

## Ringkasan Final

Arsitektur bagus bukan berarti lambat, dan cepat bukan berarti berantakan.
Kuncinya adalah kompromi sadar dengan guardrail yang jelas.
Dengan fokus pada boundary domain kritikal,
kita bisa menjaga kualitas sambil tetap memenuhi deadline bisnis.
