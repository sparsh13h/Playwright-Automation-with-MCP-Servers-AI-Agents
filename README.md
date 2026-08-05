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