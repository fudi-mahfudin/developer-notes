# Contoh Dokumentasi API — Referral Service v1 (Fiksi)

> **Disclaimer:** Spesifikasi ilustratif. Base URL, skema token, dan data contoh bersifat fiksi. Jangan memakai secret dari contoh ini di lingkungan nyata.

**API:** NHA Clinical Hub — Referral API  
**Versi:** `v1`  
**Base URL (contoh):** `https://clinical-api.nha.example.com/v1`  
**Format:** OpenAPI 3.0 (cuplikan YAML; file lengkap di repo `api-specs`)

---

## 1. Gambaran umum

API ini mendukung pembuatan dan pengelolaan **rujukan** antar-site dalam jaringan NHA. Semua endpoint memerlukan **Bearer JWT** dari SSO organisasi kecuali endpoint health internal.

---

## 2. Autentikasi

**Skema:** `bearerAuth` (HTTP Bearer)

```
Authorization: Bearer <access_token>
```

Token membawa klaim `sub`, `sites[]`, dan `roles[]`. Akses data dibatasi oleh kombinasi site dan policy masking.

---

## 3. Konvensi error (ringkas)

Semua error bisnis menggunakan envelope:

```json
{
  "error": {
    "code": "REF_VALIDATION",
    "message": "Ringkasan belum memenuhi field wajib tenant.",
    "details": [
      { "field": "summary.allergies", "issue": "required" }
    ],
    "traceId": "a1b2c3d4"
  }
}
```

| HTTP | Arti umum |
|------|-----------|
| 400 | Validasi input |
| 401 | Tidak terautentikasi |
| 403 | Terlarang oleh policy |
| 404 | Entitas tidak ditemukan / tidak terlihat |
| 409 | Konflik status / optimistic lock |
| 422 | Dependensi eksternal gagal (misalnya pasien tidak ter-resolve) |
| 429 | Rate limit |

---

## 4. Cuplikan OpenAPI (YAML)

```yaml
openapi: 3.0.3
info:
  title: NHA Referral API
  version: 1.0.0
paths:
  /referrals:
    post:
      summary: Buat rujukan (Draft)
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateReferralRequest'
      responses:
        '201':
          description: Dibuat
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Referral'
        '400':
          description: Validasi gagal
  /referrals/{referralId}/submit:
    post:
      summary: Submit rujukan
      parameters:
        - name: referralId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      security:
        - bearerAuth: []
      parameters:
        - name: Idempotency-Key
          in: header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Disubmit
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    CreateReferralRequest:
      type: object
      required: [patientCanonicalId, originSiteId, destSiteId]
      properties:
        patientCanonicalId:
          type: string
          format: uuid
        originSiteId:
          type: string
        destSiteId:
          type: string
        summaryDraft:
          $ref: '#/components/schemas/ClinicalSummaryDraft'
```

---

## 5. Skema ringkasan (intentionally ringkas)

`ClinicalSummaryDraft` mencakup daftar alergi, diagnosis aktif, dan obat aktif—detail field pada lampiran terpisah untuk menghindari duplikasi panjang di contoh ini.

---

## 6. Pagination daftar rujukan

`GET /referrals?cursor=&limit=50&status=Submitted`

Respons menyertakan `items`, `nextCursor`, `totalHint` (opsional, eventual).

---

## 7. Postman — environment contoh

| Variable | Nilai contoh |
|----------|----------------|
| `baseUrl` | `https://clinical-api.nha.example.com/v1` |
| `token` | `{{isi_manual_satu_kali}}` |

Collection menyertakan folder **Happy path** dan **Validation errors** untuk QA.

---

## 8. Webhook (ilustrasi)

Event `referral.submitted` dapat dikirim ke endpoint partner terdaftar dengan header `X-NHA-Signature` HMAC—detail verifikasi di panduan integrasi partner (bukan bagian contoh minimal ini).

---

## 9. Deprecation

Header respons dapat menyertakan:

`Deprecation: true`  
`Sunset: Sat, 01 Nov 2026 00:00:00 GMT`

untuk endpoint yang digantikan oleh versi mayor berikutnya.

---

## 10. Changelog API (cuplikan)

| Tanggal | Perubahan |
|---------|-----------|
| 2026-04-01 | `v1` beta publik untuk pilot site |
| 2026-04-18 | Menambahkan kode error `REF_CONFLICT` untuk optimistic locking |

**Akhir contoh dokumentasi API.**
