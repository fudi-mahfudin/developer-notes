# ADR-007 (Enterprise) - Asynchronous Reminder via Queue

## Document Control
- Status: Accepted
- Date: 2026-04-16
- Deciders: Head of Eng, SRE Lead, Product Lead

## Context
Synchronous reminder dispatch increased booking latency and caused user-visible failures when provider response degraded.

## Decision
Adopt asynchronous queue architecture for reminder dispatch with retry policy and dead-letter queue.

## Decision Drivers
- Booking latency target (p95 < 3s)
- Reliability target (delivery success >= 97%)
- Auditability requirement (traceable delivery lifecycle)

## Considered Options
1. Keep synchronous call
2. Cron-based batch dispatcher
3. Queue-based event-driven dispatcher (selected)

## Consequences
### Positive
- Better user response time
- Improved resiliency and observability
### Negative
- Added operational complexity
- Additional infrastructure cost

## Follow-up Actions
- Implement queue dashboard
- Run chaos test for provider outage
