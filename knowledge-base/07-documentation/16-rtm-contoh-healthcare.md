# RTM (Enterprise) - Requirement Traceability Matrix

## Document Control
- RTM ID: `RTM-MCC-S12`
- Owner: `QA Lead`
- Updated: `2026-04-16`

| Requirement ID | Requirement | Test Case | Release | Result | Defect |
|---|---|---|---|---|---|
| FR-03 | Real-time booking | TS-APPT-001/002 | 2026.04.3 | Pass | - |
| FR-04 | Reminder H-24/H-2 | TS-NOTIF-003 | 2026.04.3 | Pass | - |
| FR-05 | Teleconsult join | TS-TELE-004 | 2026.04.3 | Partial | BUG-221 |
| NFR-02 | API p95 < 3s | PERF-APPT-002 | 2026.04.3 | Pass | - |
| BR-01 | No double booking | TS-APPT-002 | 2026.04.3 | Pass | - |

## Governance Rules
- Requirement tanpa test case = release blocker.
- Defect severity High/Critical harus terhubung ke requirement ID.
