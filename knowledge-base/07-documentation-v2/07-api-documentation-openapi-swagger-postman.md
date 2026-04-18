# Dokumentasi API (OpenAPI, Swagger UI, Postman)

Artikel ini menjelaskan **peran dokumentasi API** dalam SDLC, **format umum (OpenAPI)**, **alat konsumsi (Swagger UI, Postman, Redoc)**, **praktik versi dan keamanan**, serta **anti-pattern** yang membuat developer mitra atau tim internal rugi waktu.

---

## 1. Definisi singkat

**Dokumentasi API** adalah representasi tertulis (dan mesin-baca) dari **kontrak antar sistem**: endpoint, metode HTTP, skema request/response, kode status, header wajib, model error, skema keamanan (OAuth2, API key), contoh payload, dan kadang SLA atau batas rate.

Tanpa dokumentasi yang akurat, integrasi menjadi **kerja reverse-engineering** dari perilaku runtime yang tidak stabil.

---

## 2. Mengapa ini dokumen yang “sering dipakai” developer

Frontend, mobile, partner eksternal, dan QA automation **membuka dokumentasi API setiap hari**. Ini adalah titik kontak pertama untuk:

- membentuk request yang valid,
- memahami pagination/filter,
- men-debug error dengan semantik yang konsisten.

---

## 3. OpenAPI (dulu Swagger spec)

**OpenAPI Specification (OAS)** adalah format YAML/JSON untuk mendeskripsikan REST API. Keuntungan:

- **Single source** untuk codegen klien/server (dengan hati-hati),
- **Validator** dapat memastikan keselimpangan skema,
- Integrasi CI untuk **contract testing**.

Versi umum: **OpenAPI 3.x** (struktur `components`, `securitySchemes` lebih kaya daripada OAS2).

---

## 4. Swagger UI vs Redoc vs Stoplight

- **Swagger UI**: eksplorasi interaktif (try-it-out)—berguna untuk dev, berisiko jika diekspos publik tanpa kontrol.
- **Redoc / Elements**: baca pengalaman dokumentasi lebih rapi untuk konsumen publik.
- **Stoplight Studio**: authoring kolaboratif dengan lint rules.

Pilihan tooling tidak mengganti **disiplin konten**: schema dan contoh harus benar.

---

## 5. Postman Collections

**Postman** menyimpan kumpulan request sebagai **collection** yang dapat dibagikan:

- environment variables (base URL, token),
- skrip tes ringan,
- contoh respons untuk onboarding partner.

Collection dapat **diekspor/generate** dari OpenAPI untuk mengurangi drift manual.

---

## 6. Isi dokumentasi API yang berkualitas

1. **Ringkasan API** — tujuan domain, versi, kontak pemilik.
2. **Autentikasi** — alur token, refresh, scope, header.
3. **Konvensi error** — struktur JSON error, kode stabil (`REF_VALIDATION`), mapping HTTP.
4. **Pagination & filter** — parameter standar (`cursor`, `limit`), perilaku default.
5. **Idempotency** — header mana yang dipakai untuk operasi tulis aman.
6. **Webhook/event** — jika ada, skema payload dan verifikasi signature.
7. **Contoh realistis** — hindari `foo`/`bar` untuk payload sensitif; gunakan placeholder policy-compliant.
8. **Deprecation** — tanggal sunset, header `Deprecation`.

---

## 7. Versi semantic untuk API publik

Strategi umum:

- **URI versioning** `/v1/` vs header—tim harus konsisten.
- Perubahan **backward compatible** tidak menaikkan versi mayor.
- Breaking change → versi baru + periode overlap dokumentasi.

---

## 8. Keamanan dokumentasi

- Jangan menyematkan **secret** nyata dalam contoh.
- Dokumentasi internal vs eksternal dapat dipisahkan.
- Swagger UI publik dapat menjadi vektor **enumerate endpoint**—lindungi dengan SSO atau network policy.

---

## 9. Integrasi dengan CI/CD

- Lint OpenAPI pada PR (`spectral`, `swagger-cli validate`).
- **Contract tests** consumer-driven (Pact) melengkapi dokumentasi statis.

---

## 10. Kesalahan umum

- Dokumentasi **beda dengan gateway** nyata (proxy path prefix tidak tercatat).
- Skema tidak mencakup **semua** kode error yang dikembalikan produksi.
- Contoh tidak valid terhadap skema—merusak kepercayaan pembaca.
- Tidak ada changelog API untuk konsumen eksternal.

---

## 11. Ringkasan

Dokumentasi API adalah **kontrak yang dapat dibaca manusia dan mesin**. OpenAPI menjadi tulang punggung modern; Swagger UI dan Postman adalah **saluran distribusi** kontrak itu. Investasi di sini membayar di **integrasi lebih cepat** dan **lebih sedikit tiket support**—alasan kuat mengapa dokumen ini selalu masuk daftar referensi harian developer.
