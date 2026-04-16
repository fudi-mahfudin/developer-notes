# UAT Documentation (Enterprise) - MedCare Connect

## UAT Charter
- Objective: validate business readiness for phase-1 go-live.
- Period: 2026-04-08 to 2026-04-12.
- Participants: clinic admins, doctors, operations supervisor.

## Scenario Coverage
1. Create and manage doctor schedule
2. Patient booking and reminder lifecycle
3. Teleconsult start and completion
4. Admin no-show monitoring

## Results
- Total scenarios: 45
- Pass: 42
- Failed: 3
- Critical blockers: 0

## Findings
| ID | Finding | Severity | Action |
|---|---|---|---|
| UAT-11 | Teleconsult timezone invalidation | Medium | fix by 2026-04-30 |
| UAT-15 | Admin filter usability | Low | redesign backlog |
| UAT-19 | Notification message wording | Low | content update |

## Sign-off Decision
- Status: `Conditional Go-Live Approved`
- Condition: all medium findings closed within 14 working days.

## Approval
- Product Owner: Approved
- Operations Head: Approved
- Compliance Lead: Approved
