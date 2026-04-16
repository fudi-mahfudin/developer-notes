# Code Review Checklist (Enterprise) - Healthcare

## Security & Privacy (Mandatory)
- [ ] PII tidak muncul di log/exception.
- [ ] AuthN/AuthZ flow sesuai role.
- [ ] Input validation and output encoding lengkap.

## Correctness
- [ ] Requirement ticket ter-cover.
- [ ] Edge cases dan failure paths ditangani.
- [ ] Backward compatibility dievaluasi.

## Performance & Reliability
- [ ] Tidak ada query N+1.
- [ ] Index impact sudah diverifikasi untuk query baru.
- [ ] Retry/circuit-breaker diterapkan untuk dependency eksternal.

## Testing
- [ ] Unit/integration test relevan ditambahkan.
- [ ] Regression untuk incident serupa ada.
- [ ] Test evidence attached in PR.

## Operability
- [ ] Logging, metric, trace cukup untuk troubleshooting.
- [ ] Feature flag/rollback path jelas.
