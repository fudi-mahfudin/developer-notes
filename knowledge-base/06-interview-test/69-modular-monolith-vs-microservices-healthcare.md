# Q69 - Monolith Modular vs Microservices

## Pertanyaan Interview

Bagaimana memilih antara modular monolith dan microservices?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Saya tidak melihat ini sebagai pilihan ideologis.
Modular monolith biasanya lebih cepat dikembangkan saat domain belum stabil,
sementara microservices memberi isolasi skala dan deploy independen
jika batas domain sudah jelas.

Keputusan harus berbasis:
kompleksitas domain, kapasitas tim, kebutuhan scaling,
dan overhead operasional (observability, deployment, incident handling).
Seringnya, strategi terbaik adalah mulai modular monolith yang disiplin,
lalu ekstrak service ketika ada bottleneck nyata.
Di healthcare, ini membantu menjaga kecepatan delivery
tanpa menambah kompleksitas prematur." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan sinyal perlu pecah ke microservices?"
2. "Apa risiko microservices terlalu cepat?"
3. "Bagaimana menjaga modular monolith tetap sehat?"
4. "Bagaimana migrasi bertahap?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Sinyal pecah service:
"Batas domain jelas dan bottleneck tim/scale spesifik berulang."

2) Risiko terlalu cepat:
"Operasional kompleks naik sebelum manfaat nyata muncul."

3) Menjaga monolith:
"Boundary modul ketat, kontrak internal jelas, dan test lintas modul."

4) Migrasi:
"Strangler pattern dengan extraction bertahap."

5) Anti-pattern:
"Microservices karena tren, bukan karena kebutuhan."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pragmatic path:
- mulai dari modular monolith yang rapi
- ukur bottleneck nyata
- ekstrak service selektif
- pastikan platform ops siap

## Penjelasan Detail yang Dicari Interviewer

### 1) Trade-off nyata

Modular monolith:
- plus: sederhana, transaksi lokal mudah
- minus: batas skalabilitas/deploy bersama

Microservices:
- plus: isolasi tim dan scaling
- minus: distributed complexity, konsistensi data lebih sulit

### 2) Kriteria keputusan

- domain bounded context
- beban trafik tidak merata
- kebutuhan release cadence berbeda per area
- kesiapan observability dan SRE

### 3) Migrasi aman

- identifikasi modul kandidat
- definisi kontrak API/event
- dual-run dan monitoring
- rollback path jelas

Mitigasi:
- hindari shared DB antar service
- contract tests wajib
- ownership per service jelas

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const architecturePath = {
  phase1: "modular-monolith",
  phase2: "extract-critical-domains",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare system sering punya domain beragam dengan maturity berbeda.
Memilih arsitektur yang terlalu kompleks terlalu dini
bisa memperlambat delivery fitur kritikal.
Pendekatan bertahap menjaga keseimbangan stabilitas dan evolusi sistem.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim memecah banyak service sekaligus tanpa platform observability matang.
incident lintas service sulit ditelusuri.

Perbaikan:
- konsolidasi sementara ke boundary lebih jelas
- perkuat tracing dan contract testing
- lanjut ekstraksi secara bertahap

## Contoh Pola Kode yang Lebih Aman

```ts
type ArchitectureDecision = {
  current: "modular-monolith" | "microservices";
  rationale: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan trade-off dua pendekatan.
- Menjelaskan kriteria keputusan objektif.
- Menjelaskan jalur migrasi bertahap.
- Menjelaskan risiko operasional distributed system.
- Relevan pada konteks delivery healthcare.

## Ringkasan Final

Monolith modular dan microservices adalah spektrum evolusi.
Keputusan matang didorong data bottleneck, bukan preferensi pribadi.
Pendekatan bertahap memberi hasil paling stabil:
delivery tetap cepat, risiko operasional tetap terkendali.
