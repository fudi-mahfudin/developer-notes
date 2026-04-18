# Q80 - Menentukan Boundary Modul

## Pertanyaan Interview

Bagaimana menentukan boundary modul yang tepat pada codebase besar?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Boundary modul harus mengikuti domain dan alur bisnis,
bukan sekadar struktur folder atau teknologi.
Saya biasanya memetakan use case utama, data ownership, dan aktor sistem,
lalu menentukan modul berdasarkan cohesion tinggi dan coupling rendah.

Boundary yang baik punya kontrak jelas:
apa yang boleh diakses publik, apa yang internal.
Jika boundary salah, perubahan kecil akan merambat ke mana-mana.
Di sistem healthcare, boundary yang tepat membantu tim bergerak cepat
tanpa saling mengganggu domain kritikal lain." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa indikator boundary modul buruk?"
2. "Bagaimana memvalidasi boundary sudah benar?"
3. "Bagaimana menangani kebutuhan lintas modul?"
4. "Apakah boundary bisa berubah?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Boundary buruk:
"Dependensi silang tinggi dan ownership tidak jelas."

2) Validasi:
"Lihat change history: satu feature apakah menyentuh banyak modul?"

3) Lintas modul:
"Gunakan kontrak API/event, hindari akses langsung internal."

4) Boundary berubah:
"Ya, dievaluasi berkala seiring evolusi domain."

5) Anti-pattern:
"Membuat modul per layer teknis tanpa konteks bisnis."

## Jawaban Ideal (Versi Singkat, Level Senior)

Framework keputusan boundary:
- domain cohesion
- data ownership
- change frequency
- team ownership
- operational dependency

## Penjelasan Detail yang Dicari Interviewer

### 1) Heuristik boundary

- entities dan use case yang sering berubah bersama -> satu modul
- dependency satu arah antar modul
- minim shared mutable state

### 2) Kontrak antar modul

- interface/service contract
- event contract
- schema versioning jika lintas layanan

### 3) Governance

- architecture lint rules
- codeowners
- dependency graph review rutin

Mitigasi:
- strangler refactor untuk boundary yang sudah terlanjur buruk
- anti-corruption layer saat integrasi domain berbeda
- ADR untuk perubahan boundary penting

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const moduleBoundary = {
  orders: ["createOrder", "cancelOrder"],
  billing: ["charge", "refund"],
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Domain healthcare memiliki aturan kompleks dan sensitif.
Boundary yang tepat membantu:
- isolasi perubahan regulasi
- stabilitas rilis lintas domain
- investigasi incident lebih cepat

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
modul inventory dapat langsung update data billing internal.
perubahan schema billing mematahkan flow inventory.

Perbaikan:
- tutup akses internal
- expose API kontrak resmi
- tambah contract tests lintas modul

## Contoh Pola Kode yang Lebih Aman

```ts
type ModuleBoundaryDecision = {
  module: string;
  ownsData: string[];
  exposesApis: string[];
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan prinsip cohesion/coupling.
- Menjelaskan ownership dan kontrak modul.
- Menjelaskan evaluasi boundary berkala.
- Menjelaskan mitigasi boundary buruk.
- Relevan untuk kompleksitas healthcare domain.

## Ringkasan Final

Boundary modul adalah fondasi skala teknis dan skala tim.
Jika boundary tepat, perubahan menjadi lokal dan aman.
Jika boundary salah, kompleksitas akan menyebar cepat.
Karena itu boundary harus ditetapkan berbasis domain nyata
dan dievaluasi terus seiring evolusi sistem.
