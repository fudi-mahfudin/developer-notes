# Contoh LLD Healthcare (Dengan Penjelasan Belajar)

## 1. Modul: Appointment Service

> LLD fokus ke detail implementasi modul tertentu: struktur kode, method, validasi, dan alur logika.

## 2. Struktur Komponen Internal

- `AppointmentController`
- `AppointmentUseCase`
- `AppointmentRepository`
- `SlotPolicyValidator`
- `AppointmentEventPublisher`

> Pembagian ini memisahkan layer transport, business logic, persistence, dan event.

## 3. Sequence Ringkas: Create Appointment

1. Controller validasi payload minimum.
2. UseCase cek ketersediaan slot.
3. Validator cek business rules (double booking, jam operasional).
4. Repository simpan appointment.
5. Publisher kirim `appointment.created`.

> Sequence penting untuk menyamakan ekspektasi sebelum coding dimulai.

## 4. Data Contract Internal

### `CreateAppointmentRequest`
- `patientId` (UUID)
- `doctorId` (UUID)
- `scheduleAt` (ISO datetime)
- `channel` (`onsite` | `teleconsult`)

### `CreateAppointmentResult`
- `appointmentId` (UUID)
- `status` (`confirmed` | `waitlisted`)

> Data contract internal mengurangi mismatch antar layer/module.

## 5. Validasi Utama

- Slot harus tersedia.
- Pasien tidak boleh punya slot bentrok.
- Jam booking harus di dalam jam praktik dokter.

> Validasi wajib ditulis eksplisit supaya QA bisa menurunkan test negatif.

## 6. Logging dan Audit

- Log info untuk request sukses dengan `traceId`.
- Log warn untuk konflik slot.
- Audit log untuk create/cancel/reschedule.

> LLD yang baik sudah memikirkan operasional, bukan hanya logika bisnis.
