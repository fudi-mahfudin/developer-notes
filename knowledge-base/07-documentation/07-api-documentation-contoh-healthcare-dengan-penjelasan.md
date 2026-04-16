# Contoh API Documentation Healthcare (Dengan Penjelasan Belajar)

## 1. API Overview

Base URL: `/api/v1`  
Auth: Bearer token (pasien/dokter/admin sesuai role)

> API doc harus jelas dari awal: base URL, auth, versi.

## 2. Endpoint: Buat Appointment

**POST** `/appointments`

Request body:
```json
{
  "doctorId": "c2de3f8d-7cf5-4ef5-9eec-123456789abc",
  "scheduleAt": "2026-04-20T09:00:00Z",
  "channel": "onsite"
}
```

Response `201`:
```json
{
  "appointmentId": "6e4ef766-7771-4b59-9e2c-abcdef123456",
  "status": "confirmed"
}
```

> Contoh request/response mempercepat integrasi frontend dan QA.

## 3. Endpoint: List Appointment Saya

**GET** `/appointments/me?from=2026-04-01&to=2026-04-30`

Response `200`:
```json
{
  "items": [
    {
      "appointmentId": "6e4ef766-7771-4b59-9e2c-abcdef123456",
      "doctorName": "Dr. Sarah",
      "scheduleAt": "2026-04-20T09:00:00Z",
      "status": "confirmed"
    }
  ]
}
```

> Endpoint list wajib punya filter tanggal agar query efisien.

## 4. Endpoint: Batalkan Appointment

**PATCH** `/appointments/{appointmentId}/cancel`

Request body:
```json
{
  "reason": "Tidak bisa hadir"
}
```

Response `200`:
```json
{
  "appointmentId": "6e4ef766-7771-4b59-9e2c-abcdef123456",
  "status": "cancelled"
}
```

> Operasi state change sebaiknya eksplisit (misalnya `/cancel`) agar mudah dibaca.

## 5. Error Format Standar

Response `400/409/500`:
```json
{
  "code": "SLOT_NOT_AVAILABLE",
  "message": "Selected slot is no longer available",
  "traceId": "req-12345"
}
```

> Error contract konsisten membuat debugging lintas tim jauh lebih cepat.
