# Git Workflow (Enterprise) - MedCare Connect

## Branch Model
- `main`: production branch (protected)
- `develop`: integration branch
- `feature/<ticket-id>-<slug>`
- `release/<version>`
- `hotfix/<incident-id>`

## Commit Convention
- `feat(scope): ...`
- `fix(scope): ...`
- `chore(scope): ...`
- include ticket id in body (`MC-1842`)

## Pull Request Standard
- Minimum 2 reviewers for critical modules.
- Mandatory checks: lint, unit test, security scan, contract test.
- PR template required: context, risk, rollback, test evidence.

## Merge Strategy
- Feature -> squash merge
- Release/hotfix -> merge commit with traceability

## Branch Protection Rules
- No direct push to protected branches
- Required status checks must pass
- Dismiss stale reviews on new commits
