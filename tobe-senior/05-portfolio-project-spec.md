# Spesifikasi Project Portofolio (Healthcare-like)

Owner: Mahfudin  
Update cadence: Mingguan

## Nama Project

CareFlow Ops Dashboard

## Problem Statement

Tim operasional healthcare membutuhkan alur kerja yang cepat, reliabel, dan mudah dipantau untuk tracking transaksi, retur inventory, dan pencetakan label lintas sistem.

## Tujuan

Membangun project full stack production-like untuk membuktikan ownership level senior pada:

- Feature delivery (UI + API + data)
- Performance optimization
- System integration dan reliability

## Scope MVP

- Modul manajemen transaksi (filter, sort, pagination, status workflow)
- Flow retur inventory berbasis FIFO
- Simulasi adapter integrasi ke third-party WMS
- Halaman print queue (terinspirasi workflow QZ Tray)

## User

- Admin operasional
- Operator farmasi/logistik
- Tim support engineering

## Stack Teknis

- Frontend: Next.js + TypeScript
- Backend: Node.js (Express) + TypeScript
- Database: PostgreSQL
- Observability: structured logging + metrik APM-like
- Testing: Jest + Playwright

## Target Non-Fungsional

- P95 API latency < 300 ms pada endpoint list utama
- Waktu respon list view < 1.5 s untuk 5k data (dengan pagination)
- Error rate < 1% pada sync job integrasi
- Test coverage modul kritikal >= 80%

## Milestone

1. Minggu 1-2: auth dasar, skema data, transaction list
2. Minggu 3-4: FIFO return logic, adapter integrasi
3. Minggu 5-6: optimasi performa dan dashboard metrik
4. Minggu 7-8: hardening reliability, dokumentasi, video demo

## Definition of Done

- Demo ter-deploy dengan seeded data
- Readme berisi arsitektur dan runbook
- Metrik before/after performa terdokumentasi
- Minimal 1 simulasi insiden + log penyelesaian

## Metrik Keberhasilan

- 3 cerita technical deep-dive siap interview
- 1 diagram arsitektur + 1 incident postmortem
- 1 video demo (< 5 menit) yang mudah dipahami recruiter

## Action This Week

- Implement endpoint transaction list dan UI pagination end-to-end.
