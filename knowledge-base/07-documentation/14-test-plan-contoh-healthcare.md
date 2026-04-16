# Test Plan (Enterprise) - MedCare Connect

## Document Control
- Test Plan ID: `TP-MCC-S12`
- Version: `2.1`
- Owner: `QA Lead`
- Test Cycle: `Sprint 12`

## Objectives
- Validate critical workflows (booking, reminder, teleconsult).
- Prevent regression on production-critical APIs.
- Ensure NFR baseline for response time and reliability.

## Scope
### In Scope
- Auth OTP, booking/reschedule/cancel, reminder scheduler, teleconsult join.
### Out of Scope
- Insurance claim integration, inpatient billing.

## Test Strategy
- Risk-based testing for P0 flows.
- API-first validation + UI end-to-end smoke.
- Regression suite for all incident-prone modules.

## Entry Criteria
- Approved requirement baseline
- Build promoted to staging
- Test data and environment ready

## Exit Criteria
- 0 open Sev-1 / Sev-2
- pass rate >= 95%
- all critical requirements mapped to tests

## Deliverables
- Test execution report
- Defect summary by severity
- UAT handover pack

## RACI
| Activity | QA | Eng | Product | Ops |
|---|---|---|---|---|
| Test design | R | C | C | I |
| Defect triage | R | R | C | I |
| Sign-off | C | C | A | I |
