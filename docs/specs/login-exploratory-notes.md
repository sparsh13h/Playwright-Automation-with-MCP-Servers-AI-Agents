# Login Exploratory Notes

## SC-001
- Result: Pass
- Confirmed locators:
  - Username input: `input[data-test="username"]`
  - Password input: `input[data-test="password"]`
  - Login button: `input[data-test="login-button"]`
  - Error message area: `[data-test="error"]`
- Notes: Successful login redirects to `/inventory.html` and displays inventory items.
- Screenshots: `test-results/screenshots/login-inventory-page.png`

## SC-003
- Result: Pass
- Confirmed locator:
  - Error message: `[data-test="error"]`
- Notes: Invalid credentials show the standard Saucedemo error banner.
- Screenshots: `test-results/screenshots/login-invalid-credentials.png`

## SC-004
- Result: Pass
- Confirmed locator:
  - Error message: `[data-test="error"]`
- Notes: Leaving password blank displays a required field error.
- Screenshots: `test-results/screenshots/login-missing-password.png`
