# Release Notes (Enterprise) - MedCare Connect

## Document Control
- Release Version: `2026.04.3`
- Release Date: `2026-04-16`
- Change Window: `22:00-00:00 WIB`
- Release Manager: `SRE Lead`

## Approval Matrix
| Role | Status |
|---|---|
| Product Owner | Approved |
| QA Lead | Approved |
| Engineering Manager | Approved |
| Security Reviewer | Approved |

## Summary
Rilis fokus pada peningkatan reliabilitas booking dan reminder, tanpa downtime terencana.

## Added
- Retry policy reminder (3 attempts + exponential backoff).
- Admin delivery status dashboard.

## Changed
- Slot locking berpindah ke transactional boundary service.
- Error contract distandarkan (`code`, `message`, `traceId`).

## Fixed
- Teleconsult token expiry timezone mismatch.
- Duplicate reminder pada repeated reschedule.

## Breaking / Operational Notes
- Session invalidation untuk role admin (wajib login ulang).
- New environment variable required: `NOTIF_RETRY_BACKOFF_MS`.

## Post-Release Validation
- API smoke: pass
- Queue health: pass
- Delivery success (2 jam pertama): 98.1%
- Incident: none
