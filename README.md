# Playwright-Automation-with-MCP-Servers-AI-Agents



Playwright Automation with MCP Server AI Agents

Built an AI Agent-Driven QA Automation Framework Using Playwright MCP and Open-Sourced It. I've been deep-diving into agentic AI automation and wanted to move beyond writing test scripts manually. My goal was to understand how AI agents could actually run a real QA workflow: reading requirements, planning tests, exploring the app, generating automation, healing failures on their own, and auto-committing changes using the GitHub MCP server with single prompt.

🔹 Key Highlights
✅ Strict Page Object Model — locators, page classes, and specs kept separate
✅ Self-healing tests — broken locators fixed automatically, in the right layer
✅ Full traceability — every test maps back to a scenario and acceptance criteria
✅ Modular page classes for better maintainability and reusability
✅ Version-controlled — plan, scripts, and reports all committed to Git
Biggest takeaway: AI agents are only as good as the structure around them. A planner, generator, and healer agent are powerful — but clean architecture and clear gates between steps are what make the output trustworthy.



Sample Prompt- First create user story manually in user-stories folder.



I want to run a complete end-to-end QA workflow using natural language and MCP servers.



STEP 1 - READ USER STORY:

First, read the user story from: user-stories/Login.md

Provide a brief summary of what needs to be tested.



STEP 2 - CREATE TEST PLAN:

Use the playwright-test-planner agent to create a comprehensive test plan based on

the user story. Explore the application URL from the user story and cover all

acceptance criteria, including happy path, positive, negative, boundary, navigation

flow, and UI element validation scenarios. Save it as: specs/login-app-test-plan.md



STEP 3 - EXPLORATORY TESTING:

Read the test plan from specs/login-app-test-plan.md and use Playwright MCP browser

tools to manually execute each test scenario. Document findings with screenshots and

note any issues discovered. Save notes as: specs/login-app-exploratory-notes.md



STEP 4 - GENERATE AUTOMATION SCRIPTS:

Review both the test plan and exploratory testing results from Step 3. Use the

playwright-test-generator agent to create Playwright TypeScript automation following

a strict 3-layer Page Object Model: one locators file and one page class per page,

and spec files that only call page-class methods (no raw selectors in specs).

Leverage the element selectors and insights discovered during manual testing.

Save scripts in: tests/login-app/ (locators/, pages/, login-app.spec.ts).



STEP 5 - EXECUTE AND HEAL TESTS:

Run all automation scripts from tests/login-app/. Use the playwright-test-healer

agent to identify and auto-heal any failing tests, fixing each issue in the correct

POM layer (locator fixes only in locators/, logic/wait fixes only in pages/). Re-run

tests until all are stable and passing, or mark genuine app defects as known issues.

Document healing activities.



STEP 6 - CREATE TEST REPORT:

Create a comprehensive test execution report at: test-results/Login-test-report.md

Compile results from Step 3 (manual testing), Step 4 (script generation), and Step 5

(execution and healing). Include an executive summary, PASS/FAIL status, healing

summary, defects log (with Bug ID and Severity), and test coverage/traceability analysis.



STEP 7 - COMMIT TO GIT:

Use the GitHub MCP agent to commit all new files to https://github.com/sparsh13h/Playwright-Automation-with-MCP-Servers-AI-Agents

with a descriptive conventional-commit message referencing Login, then push to the repository

and summarize what was committed.

