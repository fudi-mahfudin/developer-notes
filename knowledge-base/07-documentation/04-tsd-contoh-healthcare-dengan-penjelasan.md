# Contoh TSD Healthcare (Dengan Penjelasan Belajar)

## 1. Tujuan Teknis

Menjabarkan desain teknis implementasi MedCare Connect untuk modul appointment, reminder, dan telekonsultasi.

> TSD menerjemahkan requirement bisnis ke rancangan teknis yang bisa diimplementasi engineer.

## 2. Arsitektur Solusi (Ringkas)

- Frontend Web/Mobile
- API Gateway
- Service: Auth, Appointment, Notification, Teleconsult
- Database: PostgreSQL
- Queue: Redis-based queue untuk reminder async

> TSD menekankan komponen teknis dan hubungan antar komponen.

## 3. Component Responsibility

- `Auth Service`: login OTP, token/session, RBAC.
- `Appointment Service`: slot management, booking, reschedule.
- `Notification Service`: scheduler reminder dan delivery status.
- `Teleconsult Service`: generate/join session, session status.

> Pisahkan tanggung jawab service untuk mengurangi coupling.

## 4. Data Flow Utama

1. Pasien booking slot.
2. Appointment Service simpan data dan publish event.
3. Notification Service consume event dan jadwalkan reminder.
4. Reminder dikirim H-24 dan H-2.

> Data flow membantu tim melihat dependensi runtime, bukan hanya struktur kode.

## 5. Error Handling Strategy

- Retry notifikasi 3x dengan exponential backoff.
- Dead-letter queue untuk event gagal.
- Error response API standar dengan `code`, `message`, `traceId`.

> Tanpa strategi error, sistem terlihat benar saat happy-path tapi rapuh di produksi.

## 6. Security Considerations

- JWT/session token dengan masa aktif terkontrol.
- PII masking di log.
- Audit trail untuk CRUD data pasien dan appointment.

> Security di healthcare bukan fitur tambahan, tapi syarat dasar.

## 7. Deployment Notes

- CI/CD pipeline: test -> security scan -> deploy staging -> deploy production.
- Blue-green deployment untuk minim downtime.

> Bagian ini mencegah gap antara desain teknis dan cara rilis sebenarnya.
