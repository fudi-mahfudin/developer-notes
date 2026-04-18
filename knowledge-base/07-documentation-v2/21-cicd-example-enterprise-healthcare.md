# Contoh Dokumentasi CI/CD — Clinical Hub (Fiksi)

> **Disclaimer:** Pipeline ilustratif; tidak menggambarkan infrastruktur nyata.

**Platform CI:** GitHub Actions (ilustrasi)  
**Registry:** `registry.nha.example.com`  
**Versi dokumen:** 0.8  
**Tanggal:** 18 April 2026

---

## 1. Ringkasan alur

```
push PR → lint + unit → build image → integration tests → scan → publish RC image → deploy staging (auto) → manual approval → deploy prod canary → full rollout
```

---

## 2. Workflow utama (nama fiksi)

File: `.github/workflows/clinical-ci.yml`

| Job | Tujuan | Gate |
|-----|--------|------|
| `lint-test` | ESLint + unit | Wajib hijau |
| `integration` | API contract subset | Wajib hijau |
| `security` | SAST + dependency scan | Wajib tidak ada critical |
| `build-push` | Build image `clinical-bff` | Butuh secret registry |
| `deploy-stg` | Helm upgrade staging | Auto pada `main` |

---

## 3. Variabel lingkungan penting

| Variable | Lingkungan | Makna |
|----------|------------|--------|
| `STAGING_KUBECONFIG` | CI secret | Akses cluster staging |
| `FEATURE_REGISTRY` | staging/prod | Feature flag backend |

---

## 4. Promosi produksi

- Memerlukan persetujuan **Release Manager** melalui environment protection (ilustrasi GitHub).
- Canary **10%** selama 30 menit dengan alert error rate.

---

## 5. Rollback

1. Revert Helm release ke revisi `N-1`.  
2. Atau `kubectl rollout undo deployment/clinical-bff` sesuai runbook `RB-CLIN-DEPLOY`.  
3. Catat incident dan hubungkan ke versi artefak.

---

## 6. Artefak

- Image tag: `clinical-bff:1.5.0-<gitsha>`  
- SBOM disimpan di bucket audit internal.

---

## 7. Lingkungan validasi (GxP-style, fiksi)

Lingkungan `val` memiliki pipeline terpisah dengan akses terbatas—deploy hanya dari tag `val-*` dan log persetujuan QA.

---

## 8. Troubleshooting cepat

| Gejala | Cek pertama |
|--------|---------------|
| Integration gagal | Apakah stub `patient-index` staging hidup? |
| Security gate | Advisory baru pada transitive dep |

---

## 9. Kontak eskalasi

| Level | Channel |
|-------|---------|
| L1 | `#ci-help` |
| L2 | Platform on-call |

---

## 10. Perubahan pipeline

Ubah workflow melalui PR ke repo infra dengan review **Platform + Security**.

---

## 11. Parameter performa gate (fiksi)

| Gate | Ambang |
|------|--------|
| Waktu pipeline p95 | < 25 menit |

Jika melampaui, tim platform meninjau paralelisasi job.

---

## 12. Daftar secrets CI (nama saja)

`REGISTRY_TOKEN`, `STAGING_KUBECONFIG`, `SNYK_TOKEN` — nilai disimpan di vault; tidak pernah di wiki.

**Akhir contoh dokumentasi CI/CD.**
