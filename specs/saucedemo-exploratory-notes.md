# N-101 SauceDemo Exploratory Notes

## Summary
- URL tested: https://www.saucedemo.com/
- Credentials used during exploratory validation: standard_user / masked password
- Result: all core checkout flows worked as expected in the current release.

## Observed Results
- AC-1: Login succeeded with valid credentials and redirected to the products page.
- AC-2: Adding the backpack to cart and completing checkout succeeded end-to-end.
- AC-3: Required field validation triggered correctly when the first name, last name, or postal code were left empty.

## Confirmed Selector Strategy
- Login username: `input[data-test="username"]`
- Login password: `input[data-test="password"]`
- Login button: `input[data-test="login-button"]`
- Product add button: `button[data-test="add-to-cart-sauce-labs-backpack"]`
- Cart button: `a.shopping_cart_link`
- Checkout button: `button[data-test="checkout"]`
- First name: `input[data-test="firstName"]`
- Last name: `input[data-test="lastName"]`
- Postal code: `input[data-test="postalCode"]`
- Continue button: `input[data-test="continue"]`
- Finish button: `button[data-test="finish"]`
- Confirmation header: `.complete-header`

## Test Execution Result
- The automated Playwright run passed: `6 passed (10.4s)`.
- No healer repair was necessary because locator strategies and assertions matched the live app behavior.

## Screenshot References
- Screenshots captured during manual exploration were not required for a green run; the automated test execution confirmed the expected UI flow.
