# Production Readiness Review

Review baseline: branch `fix/production-readiness-2026-10-18`, based on the repository's main branch at the time the review branches were created.

## Automated checks added

- Unit/regression tests.
- Vite production build.
- Local import resolution across JS/JSX source and scripts.
- Manifest-to-page, component, loading-skeleton, stylesheet, and interaction-module checks.
- Route-to-view and duplicate API mapping checks.
- npm dependency audit and CodeQL static analysis.
- Exact-version install-script approval for the Vite/esbuild build dependency, plus checks for missing static public assets referenced by source files.
- Weekly Dependabot proposals for npm and GitHub Actions dependencies.

## Confirmed fixes in this branch

- Coordinator users receive the teacher navigation on both manual pages.
- The public privacy-policy route/page is registered in navigation and the manifest and linked from login.
- The table repair button passes the selected table identifier rather than the literal string `"t.table"`.
- The backup banner no longer always claims that automatic backups are active. It uses status returned by the API and labels JSON backups as stored in the same database.

## Risks that remain

1. **Privacy and AI processing:** the API can send student names and educational records to the configured AI provider for teacher chat. Confirm data minimization, institutional legal basis, provider retention/training terms, access controls, and the actual controller's identity and contact before publishing the privacy notice as final.
2. **Backup recovery:** the deployed Render configuration currently sets `BACKUP_ENABLED=false`. A JSON backup stored in the same PostgreSQL database is not an independent recovery copy. Enable a verified external snapshot/backup path and test restoration before claiming disaster-recovery readiness.
3. **Integration coverage:** automated source checks do not replace staging E2E tests for login, session renewal/logout, student/teacher/admin role isolation, CSRF rejection, file upload/download authorization, spreadsheet import/export, task assignment, AI grade confirmation, password-reset approval, migration rollout, and database recovery.
4. **GitHub protections:** workflows provide status checks, but branch protection or repository rulesets must be enabled in GitHub settings if merges should be blocked until checks pass.

## Review conclusion

The checks increase confidence and catch structural regressions. They do not, on their own, certify the deployed application as production-ready. Complete the operational and privacy validations before final sign-off.
