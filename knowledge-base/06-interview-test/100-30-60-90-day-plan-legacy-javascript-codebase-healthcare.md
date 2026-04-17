# Q100 - 30-60-90 Day Plan untuk Legacy JavaScript Codebase

## Pertanyaan Interview

Bagaimana 30-60-90 day plan Anda untuk menangani legacy JavaScript codebase?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk legacy codebase, saya tidak langsung refactor besar-besaran.
Saya pakai pendekatan 30-60-90 hari agar risikonya terkontrol.

30 hari pertama:
fokus pemahaman domain, mapping arsitektur, baseline reliability/performance,
dan identifikasi area paling riskan.

60 hari:
mulai quick wins berisiko rendah tapi berdampak nyata:
stabilisasi test kritis, observability, dan debt prioritas tinggi.

90 hari:
eksekusi perbaikan struktural bertahap,
misalnya modularisasi, kontrak interface, dan roadmap modernisasi.
Pendekatan ini menjaga delivery tetap jalan sambil menurunkan risiko sistemik.
Di healthcare, ritme ini penting karena sistem harus tetap tersedia sepanjang perubahan." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa prioritas di minggu pertama?"
2. "Bagaimana meyakinkan stakeholder soal refactor?"
3. "Kapan mulai migrasi besar?"
4. "Bagaimana ukur progress?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Minggu pertama:
"Pahami alur bisnis kritis dan pain point operasional."

2) Meyakinkan stakeholder:
"Tunjukkan dampak bisnis dari risk reduction terukur."

3) Migrasi besar:
"Setelah observability dan safety net memadai."

4) Ukur progress:
"Gunakan metric reliabilitas, lead time, dan defect trend."

5) Anti-pattern:
"Refactor total tanpa baseline dan guardrail."

## Jawaban Ideal (Versi Singkat, Level Senior)

30-60-90 plan yang sehat:
- discover and baseline
- stabilize and de-risk
- modernize incrementally

## Penjelasan Detail yang Dicari Interviewer

### Hari 1-30 (Discovery & Baseline)

- architecture mapping high-level
- dependency risk review
- incident history review
- tetapkan KPI baseline: error rate, MTTR, cycle time

### Hari 31-60 (Stabilization & Quick Wins)

- tambah test di jalur kritis
- perkuat observability
- tangani top technical debt yang paling sering memicu insiden
- perbaiki release checklist

### Hari 61-90 (Modernization Roadmap)

- segmentasi modul legacy
- buat anti-corruption layer bila perlu
- mulai migrasi bertahap berbasis business value
- publish roadmap kuartalan lintas tim

Mitigasi:
- hindari big-bang rewrite
- lakukan rollout bertahap dengan fallback jelas
- evaluasi hasil tiap sprint

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const modernizationPlan = {
  day30: "baseline_ready",
  day60: "critical_flows_stabilized",
  day90: "incremental_migration_started",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Legacy system healthcare biasanya memegang proses inti operasional.
Perubahan yang tidak terencana bisa mengganggu layanan.
Rencana 30-60-90 menjaga keseimbangan antara stabilitas harian
dan peningkatan jangka panjang.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim baru langsung mengganti modul jadwal lama secara besar,
tanpa baseline dan tanpa fallback.
hasilnya downtime saat jam sibuk.

Perbaikan:
- pecah migrasi ke fase kecil
- tambahkan feature toggle
- validasi tiap fase dengan KPI operasional

## Contoh Pola Kode yang Lebih Aman

```ts
type DayPlan = {
  phase: "30" | "60" | "90";
  objective: string;
  measurableOutcome: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan objective per fase 30/60/90.
- Menjelaskan quick wins vs structural change.
- Menjelaskan metrik keberhasilan.
- Menjelaskan mitigasi risiko migrasi.
- Relevan dengan konteks legacy healthcare.

## Ringkasan Final

Menangani legacy codebase butuh strategi bertahap dan disiplin eksekusi.
Dengan rencana 30-60-90 yang jelas,
tim dapat menjaga stabilitas operasional sambil memperbaiki fondasi teknis
secara realistis dan berkelanjutan.
