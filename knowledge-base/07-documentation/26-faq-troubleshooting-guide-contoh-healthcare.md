# FAQ / Troubleshooting Guide (Enterprise)

## FAQ
### Why reminder not delivered?
- Check `notification_jobs` status and provider response.
- Verify contact data quality and consent status.

### Why booking returns 409?
- Slot conflict due to concurrent booking.
- Refresh slot inventory and retry.

### Why doctor cannot open patient summary?
- Missing active appointment relationship.
- Role scope mismatch in access token.

## Troubleshooting Playbooks
### Case A: Spike in `409 SLOT_NOT_AVAILABLE`
1. Check booking traffic surge.
2. Inspect lock contention and DB latency.
3. Validate cache staleness for slot inventory.

### Case B: Teleconsult invalid link
1. Verify timezone conversion path.
2. Check token TTL and issuer clock skew.
3. Validate NTP synchronization.

### Case C: Admin dashboard slow
1. Review query plan and missing indexes.
2. Verify read-replica lag.
3. Check downstream service timeout chain.

## Escalation Matrix
- L1: On-call engineer (response <= 10 min)
- L2: Service owner (<= 20 min)
- L3: Incident commander (<= 30 min)
