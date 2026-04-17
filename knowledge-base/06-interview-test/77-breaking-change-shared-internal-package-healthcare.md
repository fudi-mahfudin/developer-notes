# Q77 - Menangani Breaking Change di Shared Internal Package

## Pertanyaan Interview

Bagaimana menangani breaking change pada shared internal package?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Breaking change di shared package harus diperlakukan seperti product change.
Saya selalu mulai dengan semver discipline, changelog jelas, dan migration guide.
Lalu lakukan rollout bertahap: release candidate, consumer testing, dan telemetry adopsi.

Strategi aman biasanya:
sediakan compatibility layer sementara,
tandai API lama sebagai deprecated dulu,
baru lakukan removal setelah adopsi cukup.
Di lingkungan healthcare dengan banyak service integrasi,
memaksa breaking change sekaligus sangat berisiko." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan disebut breaking change?"
2. "Bagaimana meminimalkan dampak ke consumer?"
3. "Perlukah codemod?"
4. "Bagaimana enforce migration timeline?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Breaking change:
"Perubahan yang mengharuskan consumer mengubah kode."

2) Minim dampak:
"Deprecation window + compatibility adapter + komunikasi proaktif."

3) Codemod:
"Sangat membantu jika perubahan API masif dan pola jelas."

4) Enforce timeline:
"Gunakan policy sunset bertahap dengan usage metrics."

5) Anti-pattern:
"Major release tanpa migration guide."

## Jawaban Ideal (Versi Singkat, Level Senior)

Playbook breaking change:
- klasifikasi impact
- desain migrasi
- compatibility phase
- komunikasi lintas tim
- sunset berdasarkan data

## Penjelasan Detail yang Dicari Interviewer

### 1) Persiapan rilis

- release notes rinci
- mapping API lama -> baru
- contoh kode sebelum/sesudah

### 2) Dukungan adopsi

- contract tests untuk consumer utama
- office hour migration support
- dashboard adopsi per service

### 3) Risiko dan mitigasi

- consumer tertinggal versi lama
- perilaku runtime berubah diam-diam
- hidden dependency chain

Mitigasi:
- dependency graph visibility
- rollback package version cepat
- feature flag untuk transisi behavior

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const packageLifecycle = {
  current: "2.x",
  deprecatedApis: ["oldCalculate()"],
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Shared package sering dipakai lintas banyak service healthcare.
Satu perubahan tanpa governance bisa memicu incident berantai.
Migrasi yang terkontrol menjaga stabilitas ekosistem internal.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
fungsi validasi utama di package berubah signature tanpa adaptor.
beberapa service gagal runtime setelah deploy.

Perbaikan:
- rilis patch compatibility
- tambah deprecation warning
- jadwalkan migrasi terkoordinasi

## Contoh Pola Kode yang Lebih Aman

```ts
type DeprecationPlan = {
  apiName: string;
  removalDate: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan semver dan deprecation.
- Menjelaskan migration guide.
- Menjelaskan rollout bertahap.
- Menjelaskan monitoring adopsi consumer.
- Relevan untuk dependency internal healthcare.

## Ringkasan Final

Breaking change harus dikelola sebagai proses perubahan lintas tim.
Kunci keberhasilan ada pada compatibility phase, komunikasi, dan data adopsi.
Dengan playbook yang tepat, evolusi package tetap cepat tanpa mengorbankan stabilitas.
