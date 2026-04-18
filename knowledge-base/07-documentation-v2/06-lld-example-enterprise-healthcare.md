# Contoh LLD — Modul `referral-svc` (Fiksi)

> **Disclaimer:** Contoh implementasi; tidak mengikat produk nyata.

**Layanan:** referral-svc  
**Versi LLD:** 0.2  
**Tanggal:** 18 April 2026  
**Referensi:** TSD Referral Service v0.3

---

## 1. Cakupan modul

LLD ini mencakup paket domain **referral**, lapisan **application** command handler, dan **adaptor** repositori Postgres untuk operasi siklus hidup rujukan.

---

## 2. Struktur paket (ilustrasi)

```
referral-svc/
  internal/
    domain/
      referral.go       // agregat, status, invariant
      errors.go
    app/
      commands.go       // SubmitReferral, AcceptReferral, ...
    adapters/
      postgres/
        repository.go
        migrations/
    ports/
      patient_index.go  // interface klien outbound
```

---

## 3. Agregat domain

**ReferralAggregate** menahan:

- `ID`, `TenantID`, `PatientCanonicalID`, `OriginSiteID`, `DestSiteID`
- `Status` (enum ketat)
- `Summary` (struct versi dengan `Version` optimistic locking)
- `TransitionLog` (append-only dalam transaksi untuk audit domain)

Invariant: tidak ada transisi status tanpa validasi rule table yang dimuat dari konfigurasi tenant.

---

## 4. Sequence — Submit

1. `SubmitCommand` masuk dengan `referralID`, actor, idempotency key.
2. Handler memuat aggregate dari repo dengan `SELECT ... FOR UPDATE`.
3. Domain memanggil `Submit()` yang memvalidasi field wajib melalui `ValidationPolicy` (cached per tenant).
4. Jika lolos: status `Submitted`, append log, tulis event domain `ReferralSubmitted`.
5. Komit transaksi; publisher kafka membaca outbox table **pola transaksional outbox**.

---

## 5. Skema basis data (cuplikan)

**Tabel `referrals`**

| Kolom | Tipe | Catatan |
|-------|------|---------|
| id | UUID | PK |
| tenant_id | UUID | indeks |
| patient_canonical_id | UUID | FK logis ke index |
| status | VARCHAR | cek constraint |
| summary_version | INT | optimistic lock |
| created_at | TIMESTAMPTZ | |

**Tabel `referral_outbox`**

| Kolom | Tipe |
|-------|------|
| id | BIGSERIAL |
| payload | JSONB |
| published_at | TIMESTAMPTZ NULL |

---

## 6. Penanganan error

| Kondisi | HTTP mapping |
|---------|----------------|
| Validasi gagal | 400 + kode `REF_VALIDATION` |
| Transisi ilegal | 409 + `REF_INVALID_TRANSITION` |
| Pasien tidak ditemukan di index | 422 + `PATIENT_NOT_RESOLVED` |
| Optimistic lock gagal | 409 + `REF_CONFLICT` |

---

## 7. Konsistensi

Transaksi tunggal untuk: update aggregate + insert outbox. Tidak ada partial publish tanpa komit.

---

## 8. Integrasi `patient-index`

Adaptor HTTP dengan circuit breaker; timeout 300ms; retry idempotent hanya untuk GET.

---

## 9. Pengujian unit

- Table-driven tests untuk semua pasangan transisi status legal/ilegal.
- Fake policy untuk variasi field wajib tenant.

---

## 10. Migrasi

File `V014__referral_tables.sql`; rollback script `U014` menghapus tabel dengan peringatan data—hanya untuk lingkungan non-prod.

---

## 11. Risiko implementasi

| Risiko | Mitigasi |
|--------|----------|
| Deadlock pada hot row | Urutan kunci konsisten; retry transaksi |
| Outbox backlog | Worker dedicated + alarm mendalam |

---

## 12. Checklist review LLD

- [ ] Semua transisi status tercakup tes.
- [ ] Idempotency submit diverifikasi.
- [ ] Outbox pattern diuji integrasi.

**Akhir contoh LLD.**
