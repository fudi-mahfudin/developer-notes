# Runbook / SOP Operasional (Enterprise) - Reminder Incident

## Incident Definition
- Trigger: reminder failure rate > 20% in 10 minutes.
- Severity mapping: Sev-2 if > 15 minutes; Sev-1 if > 30 minutes.

## Roles
- Incident Commander (IC)
- Communication Lead
- Service Owner (Notification)
- Scribe

## Triage Steps
1. Validate alert source and false-positive check.
2. Inspect queue depth, worker health, provider status.
3. Identify blast radius (affected hospitals/patients).

## Containment
1. Enable SMS fallback.
2. Scale worker replicas.
3. Pause non-critical jobs.

## Recovery Criteria
- Error rate < 2% for 30 minutes
- Queue lag < 100
- No new critical alert

## Communication Protocol
- Internal update every 15 minutes.
- External update to operations stakeholders every 30 minutes.

## Post-Incident
- RCA draft in 24h
- CAPA plan in 72h
