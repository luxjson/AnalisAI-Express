# Security Policy

## Supported version

Security reports should target the latest code on the default branch and any currently deployed release.

## Reporting a vulnerability

Please do not publish exploitable details, student data, credentials, session cookies, database URLs, or AI-provider keys in a public issue or pull request. Use GitHub's **Report a vulnerability** feature for this repository when available, or contact the repository owner privately through a verified channel.

Include the affected commit or release, impact, reproduction steps that do not use real student data, and any suggested mitigation. Allow time for triage before public disclosure.

## Sensitive educational data

This frontend can display personal and educational information about students, including minors. Security testing must use synthetic data or an specifically authorized environment. Do not export production records into issue trackers, CI logs, or external AI services for debugging.

## Production checks

- Do not treat a successful build as proof that the API or database is healthy.
- Verify authorization and CSRF behavior end to end against staging before release.
- Confirm backup status from the API; the frontend must not assume scheduled backups are enabled.
- Privacy copy is a starting point and must be validated against the institution's actual controller, contact, retention, and AI-provider processing.
