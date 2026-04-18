# Q97 - Incident Response saat Error Produksi Naik

## Pertanyaan Interview

Bagaimana incident response ketika error produksi tiba-tiba naik?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Saat error produksi naik, prioritas pertama saya adalah stabilisasi,
bukan langsung mencari root cause paling detail.
Saya jalankan incident mode: bentuk PIC, nilai blast radius,
aktifkan mitigasi cepat seperti rollback, feature flag off, atau rate limit.

Setelah layanan lebih stabil,
baru masuk fase diagnosis terstruktur dengan data observability:
timeline perubahan, log, trace, dan metric.
Komunikasi ke stakeholder harus berkala dan jelas.
Setelah recovery, wajib ada post-incident review
agar pembelajaran berubah jadi perbaikan sistemik.
Di healthcare, kecepatan dan ketepatan respons ini sangat kritikal." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan rollback dibanding hotfix?"
2. "Bagaimana menentukan severity incident?"
3. "Siapa yang harus dilibatkan?"
4. "Komunikasi ke bisnis seperti apa?"
5. "Anti-pattern utama?"

### Jawaban Singkat untuk Follow-up

1) Rollback vs hotfix:
"Rollback dulu jika paling cepat menurunkan dampak."

2) Severity:
"Berdasarkan impact user, scope, dan durasi gangguan."

3) Tim:
"On-call engineer, incident commander, dan stakeholder layanan."

4) Komunikasi:
"Update periodik singkat: status, dampak, ETA."

5) Anti-pattern:
"Debat solusi terlalu lama saat layanan belum stabil."

## Jawaban Ideal (Versi Singkat, Level Senior)

Incident response efektif:
- stabilize fast
- diagnose with evidence
- communicate transparently
- learn and harden system

## Penjelasan Detail yang Dicari Interviewer

### 1) Fase stabilisasi

- freeze deploy non-esensial
- aktifkan mitigasi cepat
- proteksi sistem dari cascading failure

### 2) Fase investigasi

- identifikasi perubahan terakhir
- korelasikan alert dengan timeline deploy
- tentukan root cause dan contributing factors

### 3) Fase pemulihan dan pencegahan

- recovery verification melalui SLO
- action items dengan owner dan deadline
- update runbook incident

Mitigasi:
- game day incident drill
- pre-defined rollback strategy
- alert tuning agar sinyal kritis tidak tenggelam noise

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const incidentState = {
  severity: "sev1",
  mitigation: "rollback",
  status: "monitoring",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Layanan healthcare sering dipakai pada proses operasional penting.
Keterlambatan respons saat incident dapat mengganggu alur kerja lapangan.
Runbook respons yang matang membantu menekan durasi gangguan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
error rate API registrasi pasien naik tajam setelah deploy.
tim melakukan rollback cepat, lalu investigasi menemukan migration query lambat.

Perbaikan:
- pisahkan migration berat dari jam sibuk
- tambah canary stage untuk endpoint kritis
- tambahkan guardrail otomatis sebelum rollout penuh

## Contoh Pola Kode yang Lebih Aman

```ts
type IncidentUpdate = {
  timestamp: string;
  status: "investigating" | "mitigating" | "resolved";
  message: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan prioritas stabilisasi layanan.
- Menjelaskan alur investigasi berbasis data.
- Menjelaskan komunikasi insiden.
- Menjelaskan post-incident improvement.
- Relevan dengan operasi healthcare kritikal.

## Ringkasan Final

Incident response bukan sekadar memperbaiki bug secepat mungkin.
Yang terpenting adalah menurunkan dampak cepat,
menginvestigasi berbasis bukti,
dan memastikan pembelajaran insiden menjadi peningkatan sistem permanen.
