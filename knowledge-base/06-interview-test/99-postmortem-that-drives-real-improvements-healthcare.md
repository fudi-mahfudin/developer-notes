# Q99 - Postmortem yang Menghasilkan Perbaikan Nyata

## Pertanyaan Interview

Bagaimana menjalankan postmortem yang benar-benar menghasilkan perbaikan nyata?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Postmortem yang efektif bukan dokumen formalitas.
Tujuan utamanya adalah mencegah insiden serupa berulang.
Saya selalu mendorong blameless postmortem:
fokus ke kegagalan sistem dan proses, bukan menyalahkan individu.

Strukturnya:
timeline faktual,
root cause dan contributing factors,
dampak bisnis,
serta action items yang spesifik, punya owner, deadline, dan indikator selesai.
Kalau action item tidak terlacak sampai tuntas,
postmortem hanya jadi arsip.
Di healthcare, kualitas postmortem penting untuk menjaga reliability jangka panjang." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bedanya root cause dan contributing factor?"
2. "Bagaimana memastikan action item dieksekusi?"
3. "Kapan postmortem wajib dibuat?"
4. "Apakah harus selalu detail panjang?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Root vs contributing:
"Root cause inti pemicu; contributing factor memperparah dampak."

2) Eksekusi action:
"Masukkan ke backlog prioritas dan pantau SLA penutupan."

3) Wajib:
"Untuk incident berdampak signifikan atau near miss penting."

4) Panjang dokumen:
"Fokus jelas dan actionable, bukan panjangnya."

5) Anti-pattern:
"Blameless secara kata, tapi menyalahkan individu secara implisit."

## Jawaban Ideal (Versi Singkat, Level Senior)

Postmortem berkualitas:
- faktual
- blameless
- actionable
- tracked until closure

## Penjelasan Detail yang Dicari Interviewer

### 1) Struktur postmortem

- ringkasan insiden
- timeline UTC jelas
- dampak user dan bisnis
- deteksi, respons, recovery

### 2) Analisis akar masalah

- gunakan 5 whys/fishbone seperlunya
- pisahkan technical cause vs process gap
- identifikasi control yang gagal

### 3) Action items

- prevent recurrence (guardrail)
- improve detection (alerting)
- improve response (runbook/on-call)

Mitigasi:
- review postmortem lintas tim
- tetapkan due date yang realistis
- audit action item aging bulanan

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const postmortemAction = {
  title: "Add canary rollback automation",
  owner: "platform-team",
  dueDate: "2026-05-15",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di healthcare, continuity layanan sangat penting.
Postmortem yang ditutup tanpa perbaikan nyata
membiarkan risiko yang sama muncul kembali di masa depan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
insiden downtime singkat sudah dipulihkan,
namun tidak ada tindak lanjut pada alert yang terlambat mendeteksi.
insiden serupa terjadi lagi beberapa minggu kemudian.

Perbaikan:
- jadikan action item alerting sebagai prioritas tinggi
- pantau sampai benar-benar selesai
- verifikasi melalui drill atau simulasi

## Contoh Pola Kode yang Lebih Aman

```ts
type PostmortemActionItem = {
  id: string;
  owner: string;
  status: "open" | "in_progress" | "done";
  measurableOutcome: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan prinsip blameless.
- Menjelaskan struktur postmortem inti.
- Menjelaskan action item yang measurable.
- Menjelaskan tracking hingga closure.
- Relevan pada reliability healthcare.

## Ringkasan Final

Postmortem bernilai tinggi hanya terjadi jika pembelajaran
diterjemahkan menjadi perubahan sistem yang konkret.
Tanpa action item yang dimiliki dan dituntaskan,
postmortem tidak mengurangi risiko jangka panjang.
