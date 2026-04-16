# Defect / Bug Report (Enterprise) - Template + Example

## Defect Header
- Defect ID: `BUG-221`
- Module: `Teleconsult`
- Environment: `Staging`
- Severity: `High`
- Priority: `High`
- Reporter: `QA Analyst`

## Business Impact
Pasien dan dokter gagal memulai konsultasi tepat waktu, berpotensi menurunkan kepatuhan layanan.

## Reproduction
1. Create teleconsult appointment at `10:00 UTC+7`
2. Open link at `09:50`
3. System returns `Link expired`

## Expected vs Actual
- Expected: valid T-15 to T+60
- Actual: expired before session start

## Evidence
- Screenshot reference
- API response payload
- Trace ID: `req-8821`

## Root Cause
Token expiry calculated in UTC without timezone offset reconciliation.

## Fix and Verification
- Fix owner: Backend engineer
- ETA: 2 days
- Verification tests: TS-TELE-004 + timezone regression suite
