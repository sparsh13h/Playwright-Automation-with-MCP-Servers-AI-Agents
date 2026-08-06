# N-101 Checkout Test Report

## Executive Summary
- Total planned automated scenarios in suite: 2
- Automated browser executions: 6 tests across Chromium, Firefox, and WebKit
- Overall automated result: 6 passed
- URL: https://www.saucedemo.com
- Report date: 2026-08-06

## Manual Test Results
- Manual exploratory testing was completed through the Saucedemo checkout flow.
- Screenshots were captured for the cart page, checkout information page, overview page, and confirmation page.
- No critical issues were observed in the executed scenarios.

## Automated Test Results
### Final run
- Command: `npx playwright test tests/saucedemo/saucedemo.spec.ts --reporter=list`
- Result: 6 passed across Chromium, Firefox, and WebKit.

### Test suite coverage
- `SC-001`: Happy path checkout from cart through confirmation — passed
- `SC-004`: Missing required checkout fields error validation — passed

## Test Coverage Analysis
| AC | Scenario ID | Test name | Result |
|---|---|---|---|
| AC-1 | SC-001 | complete checkout from cart through confirmation | Pass |
| AC-2 | SC-001 | complete checkout from cart through confirmation | Pass |
| AC-2 | SC-004 | show validation error when required checkout fields are missing | Pass |
| AC-3 | SC-001 | complete checkout from cart through confirmation | Pass |
| AC-4 | SC-001 | complete checkout from cart through confirmation | Pass |
| AC-5 | SC-004 | show validation error when required checkout fields are missing | Pass |

## Execution Metadata
- Date: 2026-08-06
- Environment: local Playwright test execution
- Browsers: Chromium, Firefox, WebKit
- Duration: ~9.3 seconds for the final suite run
- Test results screenshots are available under `test-results/screenshots/`
