# Q75 - Dependency Management dan Supply Chain Risk

## Pertanyaan Interview

Bagaimana mengelola dependency JavaScript dan risiko supply chain di production?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Supply chain risk di ekosistem JS itu nyata, jadi dependency management harus disiplin.
Saya membatasi dependency baru dengan kebijakan review:
cek reputasi package, maintenance aktif, ukuran transitive deps, dan lisensi.

Untuk operasional:
lockfile wajib, vulnerability scanning rutin, update terjadwal,
dan policy pinning untuk paket sensitif.
Saya juga menghindari package kecil yang bisa diganti util internal sederhana.
Di healthcare, kontrol ini penting karena kompromi dependency
bisa berdampak ke keamanan dan availability sistem." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bagaimana menilai package layak dipakai?"
2. "Apakah selalu update ke versi terbaru?"
3. "Bagaimana menangani vulnerability high severity?"
4. "Apa peran lockfile?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Menilai package:
"Lihat maintainer health, release cadence, issue security, dan footprint."

2) Selalu latest?
"Tidak selalu; update terkontrol dengan test compatibility."

3) Vulnerability high:
"Risk triage cepat, patch/mitigasi, dan rollout terukur."

4) Lockfile:
"Menjamin reproducible build lintas environment."

5) Anti-pattern:
"Menambah dependency kecil tanpa review governance."

## Jawaban Ideal (Versi Singkat, Level Senior)

Dependency governance:
- intake review policy
- SBOM/asset inventory
- automated scanning
- patch cadence
- incident playbook untuk compromised package

## Penjelasan Detail yang Dicari Interviewer

### 1) Risk model dependency

- typo-squatting package
- maintainer compromise
- malicious postinstall scripts
- vulnerable transitive dependencies

### 2) Kontrol teknis

- registry allowlist
- lockfile integrity check
- signed artifacts jika tersedia
- CI policy fail untuk severity tertentu

### 3) Operasional dan proses

- dependency review board ringan
- patch window rutin
- emergency override flow untuk CVE kritikal

Mitigasi:
- minimal dependency principle
- ownership per critical package
- audit trail perubahan dependency

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const dependencyPolicy = {
  requireSecurityReview: true,
  maxTransitiveDepth: "controlled",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare mengelola data dan proses sensitif.
Dependency yang lemah bisa membuka celah keamanan besar
atau menyebabkan outage saat package rusak.
Governance dependency menjaga keandalan jangka panjang.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
package util populer ternyata mengandung payload berbahaya.
pipeline produksi terpengaruh.

Perbaikan:
- revoke package versi terdampak
- pin versi aman
- audit package intake policy

## Contoh Pola Kode yang Lebih Aman

```ts
type DependencyRisk = {
  packageName: string;
  riskLevel: "low" | "medium" | "high";
  mitigation: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan risiko supply chain utama.
- Menjelaskan governance dependency intake.
- Menjelaskan scanning + patch process.
- Menjelaskan lockfile dan reproducibility.
- Relevan untuk keamanan healthcare.

## Ringkasan Final

Dependency management bukan pekerjaan sekali jalan.
Ia harus dikelola sebagai proses keamanan berkelanjutan.
Dengan policy intake, scanning rutin, dan patch discipline,
risiko supply chain pada aplikasi JavaScript bisa ditekan secara realistis.
