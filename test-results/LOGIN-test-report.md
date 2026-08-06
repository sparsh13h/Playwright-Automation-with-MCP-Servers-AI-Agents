# LOGIN Test Report

## Executive Summary
- Total planned scenarios: 4
- Automated tests executed: 12 across Chromium, Firefox, and WebKit
- Overall automated result: 12 passed
- URL: https://www.saucedemo.com/
- Report date: 2026-08-06

## Manual Test Results
- Manual exploratory notes were created for login page visibility, invalid credentials, and missing password validation.
- Screenshots were captured for inventory page, invalid login error, and missing password error.

## Automated Test Results
### Final run
- Command: `npx playwright test tests/login/login.spec.ts --reporter=list`
- Result: 12 passed across Chromium, Firefox, and WebKit.

### Test suite coverage
- `SC-001`: Successful login with valid credentials — passed
- `SC-003`: Invalid credentials show login error — passed
- `SC-004`: Missing password shows required validation — passed
- `SC-006`: Login page displays correct elements — passed

## Test Coverage Analysis
| AC | Scenario ID | Test name | Result |
|---|---|---|---|
| AC-1 | SC-001 | log in successfully with valid credentials | Pass |
| AC-1 | SC-006 | login page displays correct elements | Pass |
| AC-2 | SC-003 | invalid credentials show login error | Pass |
| AC-3 | SC-004 | missing password shows required validation | Pass |

## Execution Metadata
- Date: 2026-08-06
- Environment: local Playwright execution
- Browsers: Chromium, Firefox, WebKit
- Duration: ~14.8 seconds for the final suite run
- Screenshots saved under `test-results/screenshots/`
