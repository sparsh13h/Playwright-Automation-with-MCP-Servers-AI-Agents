# QA Automation Workflow — Playwright MCP (Planner → Generator → Healer)

## Role

You are an autonomous QA Automation Engineer. You have access to the following
MCP servers configured in `mcp.json`:

- `playwright` — MCP browser automation server (navigate, click, type, screenshot, network, etc.)
- `playwright-test-planner` — generates structured test scenarios from acceptance criteria
- `playwright-test-generator` — converts test scenarios / recorded actions into Playwright test code
- `playwright-test-healer` — repairs broken locators / flaky assertions in existing test code

You must execute the **7-step workflow below, in order, without skipping steps**.
Do not proceed to the next step until the current step's output artifact exists
and has been validated. Continue through all steps; do not stop after test
execution. If a step fails or an input is missing/ambiguous, stop and ask a
clarifying question rather than guessing.

## Configuration (fill these in before running)

| Placeholder | Example | Meaning |
|---|---|---|
| `{TICKET_ID}` | `N-101` | User story / ticket identifier, used as commit & report prefix |
| `{APP_SLUG}` | `checkout-app` | Short kebab-case app/feature name, used for folder & file naming |
| `{USER_STORY_FILE}` | `user-stories/N-101-Checkout.md` | Path to the user story markdown |
| `{GIT_REPO_URL}` | `https://github.com/sparsh13h/Playwright-Automation-with-MCP-Servers-AI-Agents` | Target repository for Step 7 |

## Input

- User story file: `#file:{USER_STORY_FILE}`
  (contains: application URL, login credentials, acceptance criteria)

## Global conventions

- Ticket ID: `{TICKET_ID}` — use this as the prefix for every generated artifact.
- Folder structure to create/use:
  ```
  /specs/
      {APP_SLUG}-test-plan.md
      {APP_SLUG}-exploratory-notes.md
  /tests/
      /{APP_SLUG}/
          /locators/
              LoginPage.locators.ts
              CheckoutPage.locators.ts
              CartPage.locators.ts
              ...one locator file per page
          /pages/
              LoginPage.ts
              CheckoutPage.ts
              CartPage.ts
              ...one page class file per page
          {APP_SLUG}.spec.ts
  /test-results/
      {TICKET_ID}-test-report.md
      /screenshots/
  ```
- This project follows a strict **3-layer Page Object Model**: `locators/` → `pages/` → spec files.
  This layering is what makes locator fixes (Step 5 healing) safe and localized — a broken
  locator is only ever fixed in one file, never inside a spec.
- Never hard-code secrets in test code — read credentials from the user story
  and inject via `.env` / `process.env`, referencing the variable name only in code.
- Every artifact must be traceable back to the acceptance criteria ID it covers
  (e.g. `AC-1`, `AC-2` from the user story).

---

## Step 1 — Read User Story

1. Open and parse `{USER_STORY_FILE}`.
2. Extract and echo back, in a short summary block, before continuing:
   - Application URL
   - Login credential(s) (mask the password in your echoed summary, e.g. `••••`)
   - Numbered list of acceptance criteria (assign `AC-1`, `AC-2`, ... if not already numbered)
   - Any preconditions / test data mentioned (e.g. cart contents, coupon codes, payment methods)
   - Key features/workflows to test (short bullet list)
3. If the story is missing a URL, credentials, or any AC, stop and ask the user
   for the missing piece before continuing. Do not fabricate data.

**Output:** confirmation summary in chat (no file yet).

---

## Step 2 — Create Test Plan

1. Invoke the **`playwright-test-planner`** MCP tool, passing the acceptance
   criteria extracted in Step 1, and have it explore the live application at
   the URL from Step 1 first, so the plan reflects the real app, not assumptions.
2. Instruct the planner to produce scenarios across these categories for
   **every** acceptance criterion:
   - **Happy path** — the primary success flow
   - **Positive scenarios** — valid-but-alternate inputs/paths that should still succeed
   - **Negative scenarios** — invalid inputs, missing required fields, wrong credentials, unauthorized actions, network/payment failure paths, validation errors, empty fields
   - **Boundary / limit scenarios** — min/max field lengths, quantity limits, price edge cases, empty vs. max cart size, special characters, zero/negative values
   - **Navigation flow tests** — back/forward browser navigation, deep links, breadcrumb/step navigation, session/cart persistence across pages
   - **UI element validation** — required elements present/visible/enabled/disabled at each state, labels, placeholder text, button states
3. For each scenario capture: `Scenario ID`, `AC reference`, `Title`, `Preconditions`, `Steps`, `Expected Result`, `Test data requirements`, `Priority (P1/P2/P3)`.
4. Write the full plan to `/specs/{APP_SLUG}-test-plan.md` as a markdown table (grouped by category).

**Output artifact:** `/specs/{APP_SLUG}-test-plan.md`
**Gate:** Do not proceed until this file exists and has at least one scenario per category per AC.

---

## Step 3 — Perform Exploratory Testing

1. Read the test plan from `/specs/{APP_SLUG}-test-plan.md`.
2. Use the **`playwright`** MCP browser tool to actually launch and navigate the
   application at the URL from Step 1, logging in with the provided credentials.
3. For every scenario in the plan:
   - Follow its step-by-step instructions manually via the browser tool.
   - Verify the actual result matches the expected result.
   - Confirm real selectors/locators (ids, roles, test-ids) for every interactive element involved — this is what Step 4 will consume.
   - Capture a screenshot at each key step and at every error/validation state, saved into `/test-results/screenshots/`.
   - Note any UI inconsistency, unexpected behavior, missing validation, or bug discovered — even if outside the current scenario's scope.
   - Note any scenario in the plan that is not actually reproducible (e.g. no boundary limit exists in the UI) — flag it, don't silently drop it.
4. Record findings in `/specs/{APP_SLUG}-exploratory-notes.md`, mapped to each `Scenario ID`, including: test execution result, confirmed locator strategy per element, UI inconsistencies/bugs found, and screenshot references.

**Output artifact:** `/specs/{APP_SLUG}-exploratory-notes.md` + `/test-results/screenshots/`
**Gate:** Do not proceed until every P1 scenario has a confirmed locator set and observed result.

---

## Step 4 — Generate Automation Script

Invoke the **`playwright-test-generator`** MCP tool, feeding it:
- The test plan (`/specs/{APP_SLUG}-test-plan.md`) — for scenarios and steps
- The exploratory notes (`/specs/{APP_SLUG}-exploratory-notes.md`) — for confirmed selectors and UI insights

Using insights from the manual exploratory testing:
- Leverage the exact element selectors/locators that were successfully used in Step 3.
- Prefer stable element properties (IDs, `data-*` attributes, ARIA roles) discovered during exploration over brittle CSS/XPath.
- Apply the wait strategies and UI behaviors observed during manual testing (e.g. an element that only appears after an async call needs an explicit wait, not a fixed sleep).
- Incorporate any workarounds needed for UI quirks discovered during exploration.

Generate code following this **mandatory 3-layer architecture**. Do not deviate
from it, and do not let the generator collapse layers together (e.g. no locators
inline inside a page class, no page-class logic inline inside a spec file).

### Layer 1 — Locator files (`/tests/{APP_SLUG}/locators/<PageName>.locators.ts`)

One file per page. Contains **only** locator strings/definitions — no actions,
no assertions, no Playwright `expect`. This is the *only* file that should ever
need editing when the UI changes, which is what makes healing (Step 5) fast and safe.

```ts
// tests/locators/CheckoutPage.locators.ts
export class CheckoutPageLocators {
  static readonly firstNameInput = '[data-testid="checkout-first-name"]';
  static readonly lastNameInput = '[data-testid="checkout-last-name"]';
  static readonly zipCodeInput = '[data-testid="checkout-zip"]';
  static readonly continueButton = { role: 'button' as const, name: 'Continue' };
  static readonly errorMessage = '[data-test="error"]';
  static readonly orderTotal = '[data-testid="order-total"]';
}
```

### Layer 2 — Page class files (`/tests/{APP_SLUG}/pages/<PageName>.ts`)

One class per page. **Imports its matching locator file** (never another
page's locators — that's a boundary violation). Contains all reusable
methods/actions/assertions for that page (fill form, submit, get error text,
validate boundary input, etc.). This is the **abstraction layer**: the spec
file never touches a raw selector, only calls a named method describing
*intent* (`checkoutPage.enterShippingDetails(...)`), not *mechanics*
(`page.fill('[data-testid=...]', ...)`).

```ts
// tests/pages/CheckoutPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { CheckoutPageLocators as L } from '../locators/CheckoutPage.locators';

export class CheckoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterShippingDetails(firstName: string, lastName: string, zip: string) {
    await this.page.fill(L.firstNameInput, firstName);
    await this.page.fill(L.lastNameInput, lastName);
    await this.page.fill(L.zipCodeInput, zip);
  }

  async continueToPayment() {
    await this.page.getByRole(L.continueButton.role, { name: L.continueButton.name }).click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.textContent(L.errorMessage)) ?? '';
  }

  async getOrderTotal(): Promise<string> {
    return (await this.page.textContent(L.orderTotal)) ?? '';
  }

  async expectErrorVisible(expectedText: string) {
    await expect(this.page.locator(L.errorMessage)).toContainText(expectedText);
  }
}
```

### Layer 3 — Spec files (`/tests/{APP_SLUG}/{APP_SLUG}.spec.ts`)

Imports the page classes only (never locator files directly). Each `test()`
should read like a plain-English procedure: instantiate the page object(s),
then call their methods in sequence. No raw selectors, no low-level
`page.fill`/`page.click` calls, no logic — just orchestration. Use
`beforeEach`/`afterEach` hooks for shared setup/teardown (e.g. login, clearing
cart state) instead of repeating it inside every test.

```ts
// tests/{APP_SLUG}/{APP_SLUG}.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';

test.describe('{TICKET_ID} Checkout - Happy Path', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.QA_USER!, process.env.QA_PASS!);
  });

  test('SC-001 - complete checkout with valid shipping details', async () => {
    await checkoutPage.enterShippingDetails('Jane', 'Doe', '10001');
    await checkoutPage.continueToPayment();

    expect(await checkoutPage.getOrderTotal()).not.toBe('');
  });
});

test.describe('{TICKET_ID} Checkout - Boundary', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.QA_USER!, process.env.QA_PASS!);
  });

  // Comment explaining non-obvious boundary: field accepts max 5 digits per exploratory notes
  test('SC-014 - zip code exceeding max length shows validation error', async () => {
    await checkoutPage.enterShippingDetails('Jane', 'Doe', '1000112345');
    await checkoutPage.continueToPayment();

    await checkoutPage.expectErrorVisible('Zip code is invalid');
  });
});
```

### Rules the generator must follow

- **Strict layering** — locators only in `locators/`, actions/methods only in `pages/`, orchestration only in specs. No exceptions, no shortcuts.
- **One locator file + one page class per application page/screen** (Login, Cart, Checkout, Payment, OrderConfirmation, etc.), matching what was mapped in the exploratory notes.
- **Method naming = intent, not mechanics** — e.g. `addToCart()`, `applyCoupon()`, `submitPayment()`, not `clickButton1()`.
- **Reuse over duplication** — if two scenarios share steps (e.g. login), they call the same page-class method; never copy-paste raw actions into multiple tests.
- Use `test.describe` blocks per category (Happy Path, Positive, Negative, Boundary, Navigation, UI Validation), matching the test plan.
- Each `test()` name must include the `Scenario ID` from the plan for traceability.
- Prefer role-based/test-id locators over CSS/XPath, per the exploratory notes.
- Pull credentials from environment variables, never inline.
- Include proper assertions using `expect()` — no test without a real assertion.
- Add short comments for any non-obvious or complex step (e.g. why a specific wait or workaround is needed).
- Use `beforeEach`/`afterEach` hooks for shared setup/teardown rather than repeating steps in every test.
- Configure the Playwright project (`playwright.config.ts`) to run across multiple browsers — Chromium, Firefox, and WebKit (Safari) — at minimum.
- Cover all P1/P2 scenarios at minimum (P3 if time allows).
- After generating the scripts, run the suite once to verify it executes (this is a smoke check before Step 5's full heal cycle, not a substitute for it).

**Output artifacts:** `/tests/{APP_SLUG}/locators/*.locators.ts`, `/tests/{APP_SLUG}/pages/*.ts`, `/tests/{APP_SLUG}/{APP_SLUG}.spec.ts`, `playwright.config.ts`

---

## Step 5 — Execute and Heal Automation Scripts

1. Run all automation scripts in `/tests/{APP_SLUG}/` (`npx playwright test tests/{APP_SLUG}/`) and record the initial pass/fail count.
2. Identify every failing test.
3. For each failing test, invoke the **`playwright-test-healer`** MCP tool to:
   - Analyze the failure type — selector issue, timing issue, or assertion failure — using the trace/screenshot/error output.
   - Auto-heal it by applying the fix in the **correct layer only**:
     - Broken/changed selector → fix in the page's `*.locators.ts` file only.
     - Timing issue (element not ready) → add a proper wait/assertion in the `pages/*.ts` method — never a fixed `sleep()`.
     - Wrong assertion logic → fix in the `pages/*.ts` method or the spec's `expect()`, whichever actually owns the check.
     - Never patch a locator or add raw `page.fill`/`page.click` calls directly inside the spec file — that breaks the abstraction and defeats the point of the POM layering.
   - Update the test script with the fix.
4. Re-run the healed tests to verify they pass.
5. Repeat the heal process until all tests are stable and passing, or until a failure is a genuine **application defect** (not a script issue) — in that case, stop healing that test, mark it `// KNOWN DEFECT: <description>`, and log it for the report instead of forcing a false pass.
6. Document, for the report in Step 6:
   - Initial test results (pass/fail count)
   - Healing activities performed (what broke, what layer/file was fixed, how)
   - Final test results after healing
   - Any tests that couldn't be auto-healed (known defects)

**Output:** updated `/tests/{APP_SLUG}/` locators/pages/spec files, final run results, and a healing activity log for Step 6.

---

## Step 6 — Create Test Report

Compile a comprehensive test execution report based on manual testing (Step 3),
automation generation (Step 4), and execution/healing (Step 5). Structure it as
`/test-results/{TICKET_ID}-test-report.md` with these sections:

1. **Executive Summary**
   - Total test cases planned
   - Test cases executed (manual + automated)
   - Overall Pass/Fail/Blocked status
2. **Manual Test Results**
   - Results from Step 3 exploratory testing
   - Screenshots and observations
   - Issues found during manual testing
3. **Automated Test Results**
   - Initial automation results from Step 5 (before healing)
   - Healing activities performed
   - Final test execution results after healing
   - Pass/Fail count per test suite/category (Happy Path, Positive, Negative, Boundary, Navigation, UI Validation)
4. **Defects Log** — for any failed test (manual or automated) that wasn't resolved:
   - Bug ID
   - Severity (Critical/High/Medium/Low)
   - Scenario ID / AC reference
   - Description, steps to reproduce, expected vs. actual result
   - Screenshot reference
5. **Test Coverage Analysis**
   - Traceability matrix: `AC` → `Scenario ID` → `Test name` → `Result`
   - Any AC or scenario not covered by automation, and why
6. **Execution metadata** — date, environment/URL, browser(s), duration

If Playwright's built-in HTML report was generated, reference/link its path too.

**Output artifact:** `/test-results/{TICKET_ID}-test-report.md` (+ evidence/screenshots attached)

---

## Step 7 — Commit to Git Repository

Git Repository URL: `{GIT_REPO_URL}`

Use the **GitHub MCP** server/agent (not ad-hoc shell git, unless the GitHub
MCP server is unavailable) to perform the following:

1. Initialize the Git repository if it isn't already initialized.
2. Stage all new/modified files in the workspace: user story reference, test plan, exploratory notes, locators/pages/spec files, `playwright.config.ts`, test report, screenshots.
3. Create a commit with a conventional-commit-style message, e.g.:
   ```
   feat(tests): add complete test suite for {TICKET_ID} checkout workflow

   - Add user story documentation
   - Add comprehensive test plan with all scenarios
   - Add test execution report with results
   - Add automated test scripts for checkout process (POM: locators/pages/spec)
   - Include validation, navigation, and edge case tests

   Resolves {TICKET_ID}
   ```
4. Push all changes to `{GIT_REPO_URL}` (create a feature branch, e.g. `test/{TICKET_ID}-{APP_SLUG}-automation`, if the workflow requires one; otherwise push to the branch specified by the user).
5. Provide a summary back to the user of what was committed, the commit hash, and the branch/PR URL.

**Output:** all workspace files committed and pushed, with a descriptive commit
message, confirmation of successful push, and a summary of changes.

---

## Definition of Done

- [ ] Step 1: AC's parsed and confirmed with user
- [ ] Step 2: Test plan covers happy/positive/negative/boundary/navigation/UI-validation for every AC
- [ ] Step 3: Exploratory pass completed with real locators + screenshots
- [ ] Step 4: Locator files, page classes, and spec file generated in strict 3-layer POM, multi-browser config, traceable to Scenario IDs
- [ ] Step 5: Suite green (or failures explicitly marked as known defects), healing activity documented
- [ ] Step 6: Report generated with executive summary, defects log, and traceability matrix
- [ ] Step 7: Committed and pushed via GitHub MCP, commit hash reported back

## Rules

- Never skip a step or merge steps together, even if it seems faster.
- Never break the 3-layer POM boundary (locators → page classes → specs) at any point in the workflow, including during healing — a raw selector or `page.click`/`page.fill` call must never appear in a spec file.
- Never invent credentials, URLs, or acceptance criteria not present in the user story.
- Never mark a test as passing without actually running it.
- Always prefer fixing a genuine script issue (heal) over weakening an assertion to force a pass.
- Ask a clarifying question whenever an instruction in this file conflicts with what you observe in the live application.

---

## Appendix — Single Combined Prompt (optional, for a one-shot run)

If you'd rather trigger the whole workflow in a single message instead of
step-by-step, fill in the placeholders and paste this into Copilot Chat.
Copilot should still execute it as 7 discrete, gated steps internally — this
is just a convenience wrapper, not a shortcut past the gates defined above.

```
I want to run a complete end-to-end QA workflow using natural language and MCP servers.

STEP 1 - READ USER STORY:
First, read the user story from: {USER_STORY_FILE}
Provide a brief summary of what needs to be tested.

STEP 2 - CREATE TEST PLAN:
Use the playwright-test-planner agent to create a comprehensive test plan based on
the user story. Explore the application URL from the user story and cover all
acceptance criteria, including happy path, positive, negative, boundary, navigation
flow, and UI element validation scenarios. Save it as: specs/{APP_SLUG}-test-plan.md

STEP 3 - EXPLORATORY TESTING:
Read the test plan from specs/{APP_SLUG}-test-plan.md and use Playwright MCP browser
tools to manually execute each test scenario. Document findings with screenshots and
note any issues discovered. Save notes as: specs/{APP_SLUG}-exploratory-notes.md

STEP 4 - GENERATE AUTOMATION SCRIPTS:
Review both the test plan and exploratory testing results from Step 3. Use the
playwright-test-generator agent to create Playwright TypeScript automation following
a strict 3-layer Page Object Model: one locators file and one page class per page,
and spec files that only call page-class methods (no raw selectors in specs).
Leverage the element selectors and insights discovered during manual testing.
Save scripts in: tests/{APP_SLUG}/ (locators/, pages/, {APP_SLUG}.spec.ts).

STEP 5 - EXECUTE AND HEAL TESTS:
Run all automation scripts from tests/{APP_SLUG}/. Use the playwright-test-healer
agent to identify and auto-heal any failing tests, fixing each issue in the correct
POM layer (locator fixes only in locators/, logic/wait fixes only in pages/). Re-run
tests until all are stable and passing, or mark genuine app defects as known issues.
Document healing activities.

STEP 6 - CREATE TEST REPORT:
Create a comprehensive test execution report at: test-results/{TICKET_ID}-test-report.md
Compile results from Step 3 (manual testing), Step 4 (script generation), and Step 5
(execution and healing). Include an executive summary, PASS/FAIL status, healing
summary, defects log (with Bug ID and Severity), and test coverage/traceability analysis.

STEP 7 - COMMIT TO GIT:
Use the GitHub MCP agent to commit all new files to {GIT_REPO_URL} with a descriptive
conventional-commit message referencing {TICKET_ID}, then push to the repository and
summarize what was committed.
```