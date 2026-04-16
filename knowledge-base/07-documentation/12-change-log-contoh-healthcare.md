# Change Log (Enterprise) - MedCare Connect

Format mengikuti prinsip keep-a-changelog.

## [2026.04.3] - 2026-04-16
### Added
- Notification retry orchestration.
- Delivery monitoring panel for operations.
### Changed
- Appointment conflict handling now consistently returns `409`.
### Fixed
- Teleconsult token expiry timezone issue.
### Security
- Masking PII for notification logs.

## [2026.03.6] - 2026-03-29
### Added
- Role `Supervisor` for clinic operations.
### Changed
- Schedule search query optimization.
### Fixed
- Race condition on rapid double booking.

## [2026.02.2] - 2026-02-12
### Added
- Booking MVP and confirmation flow.

## Governance Rules
- Semua entri wajib menyebut dampak operasional jika ada.
- Perubahan schema database wajib mention migration identifier.
