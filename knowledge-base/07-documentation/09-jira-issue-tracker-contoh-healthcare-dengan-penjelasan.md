# Contoh JIRA / Issue Tracker Healthcare (Realistis)

## 1. Konteks Proyek

**Produk**: MedCare Connect  
**Periode Sprint**: Sprint 12 (2 minggu)  
**Goal Sprint**: Menurunkan no-show dengan reminder yang lebih andal dan meningkatkan stabilitas booking.

> Dokumen issue tracker yang realistis harus terkait langsung dengan sprint goal, bukan daftar tiket acak.

## 2. Struktur Board

- **Backlog**: item siap refinement.
- **Selected for Sprint**: item yang sudah punya estimasi dan owner.
- **In Progress**: sedang dikerjakan.
- **In Review**: menunggu review QA/Code Review.
- **Done**: lolos acceptance criteria.

> Definisi kolom harus jelas agar status tiket tidak manipulatif.

## 3. Contoh Epic

### EPIC-102: Appointment Reliability Improvement

**Business Value**: mengurangi gagal booking akibat race condition slot.  
**Owner**: Product Manager  
**Target**: selesai akhir Q2

> Epic dipakai untuk mengelompokkan story besar lintas sprint.

## 4. Contoh User Story (Realistis)

### MC-1842 - Prevent Double Booking on Concurrent Requests

- **Type**: Story
- **Priority**: High
- **Epic Link**: EPIC-102
- **Assignee**: Backend Engineer
- **Story Point**: 8
- **Description**:  
  Saat 2 pasien memilih slot dokter yang sama dalam waktu berdekatan, sistem kadang mengonfirmasi keduanya.  
  Sistem harus memastikan hanya 1 booking berhasil untuk slot yang sama.
- **Acceptance Criteria**:
  1. Jika dua request masuk bersamaan untuk slot sama, hanya satu yang `201`.
  2. Request lain mendapat `409 SLOT_NOT_AVAILABLE`.
  3. Audit log menyimpan konflik slot dengan `traceId`.
- **Definition of Done**:
  - Unit test concurrency lulus.
  - Integration test lulus di staging.
  - Tidak ada critical bug dari QA.

> Story yang baik: ada masalah, konteks bisnis, AC testable, dan DoD tegas.

### MC-1847 - Add Reminder Retry for Failed WhatsApp Delivery

- **Type**: Story
- **Priority**: Medium
- **Epic Link**: EPIC-102
- **Assignee**: Backend Engineer
- **Story Point**: 5
- **Description**:  
  Reminder WhatsApp kadang gagal kirim karena error vendor sementara.  
  Tambahkan retry maksimal 3x dengan exponential backoff.
- **Acceptance Criteria**:
  1. Retry terjadi otomatis untuk status `TEMPORARY_FAILURE`.
  2. Gagal 3x dipindahkan ke dead-letter queue.
  3. Admin bisa melihat status akhir pengiriman.

> Ini contoh story operasional yang berdampak langsung ke no-show rate.

## 5. Contoh Bug Tickets

### MC-1859 - Teleconsult Link Expired Too Early

- **Type**: Bug
- **Severity**: Major
- **Priority**: High
- **Environment**: Staging
- **Steps to Reproduce**:
  1. Buat appointment telekonsultasi untuk hari ini.
  2. Buka link 10 menit sebelum jadwal.
  3. Sistem menampilkan `Link expired`.
- **Expected**: link valid dari H-15 menit sampai H+60 menit.
- **Actual**: link kadaluarsa sebelum sesi.
- **Root Cause (sementara)**: mismatch timezone di token expiry.

> Bug ticket harus punya reproducible steps. Tanpa ini, engineer buang waktu menebak.

## 6. Contoh Task Teknis

### MC-1861 - Add DB Index for Appointment Slot Lookup

- **Type**: Task
- **Priority**: Medium
- **Assignee**: Backend Engineer
- **Estimate**: 1 day
- **Technical Notes**:
  - Tambah index komposit `(doctor_id, schedule_at, status)`.
  - Verifikasi query plan sebelum/sesudah.
  - Rollout via migration bertahap.

> Task teknis tidak selalu user-facing, tapi tetap krusial untuk performa dan reliabilitas.

## 7. Contoh Sprint Report Ringkas

- **Planned SP**: 34
- **Completed SP**: 29
- **Carry Over**: 5
- **Bug reopened**: 2
- **Production incident**: 0

Highlight:
- Double booking turun dari 7 kasus/minggu menjadi 0 di staging.
- Reminder delivery success naik dari 91% ke 97%.

> Angka sprint report harus nyambung ke outcome bisnis, bukan sekadar velocity.

## 8. Anti-Pattern yang Harus Dihindari

- Ticket tanpa acceptance criteria.
- Story point diisi setelah tiket selesai (manipulatif).
- Semua tiket langsung diberi priority `Highest`.
- Ticket `Done` padahal belum diuji QA.

> Ini kesalahan umum yang bikin issue tracker terlihat rapi tapi tidak berguna untuk eksekusi.
