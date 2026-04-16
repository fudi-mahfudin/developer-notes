# Test Case & Scenario (Enterprise) - MedCare Connect

## Metadata Standard
- Test Case ID format: `TS-[MODULE]-[NNN]`
- Priority: `P0/P1/P2`
- Type: `Functional/Integration/Security/Performance`

## TS-APPT-001 - Booking Slot Available
- Priority: P0
- Preconditions: patient authenticated, slot free
- Steps: choose doctor -> pick slot -> confirm booking
- Expected:
  - HTTP 201
  - appointment status `confirmed`
  - reminder job created

## TS-APPT-002 - Concurrent Booking Conflict
- Priority: P0
- Type: Integration
- Expected:
  - one request success (201)
  - competing request gets `409 SLOT_NOT_AVAILABLE`
  - conflict event logged with traceId

## TS-NOTIF-003 - Reminder Retry Policy
- Priority: P1
- Expected:
  - temporary failure retries max 3 times
  - failed terminal state moved to DLQ

## TS-TELE-004 - Valid Join Window
- Priority: P0
- Expected:
  - link valid from T-15 to T+60
  - unauthorized user blocked with 403

## Traceability Hint
Setiap test case wajib referensi requirement ID (`FR-*`/`NFR-*`) di sistem test management.
