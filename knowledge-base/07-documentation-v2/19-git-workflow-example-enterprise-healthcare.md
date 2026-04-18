# Contoh Dokumentasi Git Workflow — Tim Clinical Hub (Fiksi)

> **Disclaimer:** Kebijakan ilustratif; sesuaikan dengan organisasi Anda.

**Tim:** Platform Clinical — NHA  
**Versi:** 2.1  
**Tanggal efektif:** 18 April 2026  
**Pemilik:** Engineering Enablement

---

## 1. Prinsip

- **Trunk-based** ringan: integrasi cepat ke `main` dengan feature flag.
- **Main** selalu deployable ke staging.

---

## 2. Branch

| Pola | Kapan |
|------|--------|
| `feature/<JIRA>-slug` | Pekerjaan fitur |
| `fix/<JIRA>-slug` | Perbaikan defect |
| `hotfix/<versi>-slug` | Patch produksi darurat |
| `release/<versi>` | Hanya jika train rilis membutuhkan cabang stabil (opsional) |

---

## 3. Aturan PR

- Minimal **1 reviewer** untuk area non-kritis; **2 reviewer** untuk `auth`, `phi`, `billing`.
- Template PR wajib diisi (lihat `.github/pull_request_template.md` fiksi).
- Ukuran disarankan **di bawah 400 baris** netto; pecah jika lebih besar.

---

## 4. Commit

Gunakan **Conventional Commits**:

```
feat(referral): add SLA banner

Refs: CLIN-121
```

Commit hook menolak pesan tanpa tipe dikenali pada repo tertentu.

---

## 5. Merge

- Default: **squash merge** ke `main` untuk historia linear.
- Hotfix boleh merge commit jika perlu cherry-pick balik—dokumentasikan di PR.

---

## 6. Protected branch `main`

- CI wajib hijau (unit, lint, contract subset).
- Tidak ada push langsung.

---

## 7. Hotfix produksi

1. Cabang dari tag produksi terakhir.  
2. PR ke `main` dan cherry-pick ke cabang rilis jika ada.  
3. Tag patch baru `v1.5.1`.  
4. Ikuti runbook deploy `RB-CLIN-HOTFIX`.

---

## 8. Secrets

Jangan commit secret—gunakan vault + placeholder; scan secret pada CI.

---

## 9. Issue linkage

Smart commit: `CLIN-121 #comment implemented SLA banner` pada merge squash description.

---

## 10. Ownership

File `CODEOWNERS` merutekan review otomatis:

```
/referral-svc/ @clinical-backend-team
```

---

## 11. Pelanggaran dan eskalasi

Pelanggaran workflow berulang dibahas di guild bulanan—bukan sebagai hukuman tetapi untuk memperbaiki tooling atau dokumentasi.

---

## 12. Revisi dokumen

Setiap perubahan workflow memerlukan PR ke repo `engineering-handbook` (fiksi) dengan pengumuman Slack `#dev-announce`.

**Akhir contoh dokumentasi Git workflow.**
