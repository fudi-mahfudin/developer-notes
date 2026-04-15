# System Design Notes (Healthcare Web Systems)

Owner: Mahfudin  
Update cadence: Mingguan

## Topik 1: Transaction Module at Scale

- Fokus: pagination, filtering, sorting, caching
- Trade-off: query fleksibel vs performa

## Topik 2: Inventory Return FIFO Flow

- Fokus: konsistensi urutan data
- Trade-off: strict consistency vs throughput

## Topik 3: Third-party WMS Integration

- Fokus: retry, timeout, idempotency
- Trade-off: fast fail vs guaranteed delivery

## Topik 4: Observability Baseline

- Fokus: logs, metrics, tracing
- Trade-off: detail data vs biaya/instrumentation noise

## Topik 5: Auth and Role Access

- Fokus: role-based permission untuk admin/operator
- Trade-off: granular policy vs kompleksitas maintenance

## Topik 6: Read/Write Separation

- Fokus: endpoint baca berat vs tulis transaksi
- Trade-off: arsitektur sederhana vs scalability

## Topik 7: Incident Response

- Fokus: alerting, triage, rollback
- Trade-off: cepat rollback vs investigasi penuh

## Topik 8: Database Migration Strategy

- Fokus: phased migration tanpa downtime besar
- Trade-off: durasi migrasi vs risiko perubahan besar

## Topik 9: API Contract Governance

- Fokus: versioning, backward compatibility
- Trade-off: kecepatan release vs stabilitas client

## Topik 10: Printing Workflow Reliability

- Fokus: queue, retry, failure handling
- Trade-off: real-time responsiveness vs reliability guarantee

## Metrik Keberhasilan

- 2 topik dibahas tiap minggu dengan mock Q&A
- 1 diagram sederhana per topik prioritas

## Action This Week

- Latih topik 1 dan 3 dengan format jawaban 10 menit per topik.
