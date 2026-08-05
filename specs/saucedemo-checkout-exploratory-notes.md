# SauceDemo Checkout Exploratory Notes

**Ticket:** N-101
**Application URL:** https://www.saucedemo.com
**Credentials:** `standard_user` / `••••`

## Summary of Key Observations
- Login and checkout flow are functional for `standard_user`.
- Required field validation is present on the checkout information page.
- The checkout overview page shows payment info, item summary, subtotal, tax, and total.
- Order confirmation page displays a success message and `Back Home` button.

## P1 Scenario Findings

### SC-001 — Cart review happy path
- Result: Pass
- Actual item displayed: `Sauce Labs Backpack`
- Selectors confirmed:
  - Product add button: `button[data-test="add-to-cart-sauce-labs-backpack"]`
  - Cart link: `a.shopping_cart_link`
  - Cart item name: `.inventory_item_name`
  - Cart item description: `.inventory_item_desc`
  - Cart item price: `.inventory_item_price`
  - Cart item quantity: `.cart_quantity`
  - Checkout button: `button[data-test="checkout"]`
  - Continue Shopping button: `button[data-test="continue-shopping"]`
- Screenshot: `test-results/screenshots/step-cart-page.png`

### SC-004 — Checkout information page happy path navigation
- Result: Pass
- Selectors confirmed:
  - First Name: `input[data-test="firstName"]`
  - Last Name: `input[data-test="lastName"]`
  - Zip/Postal Code: `input[data-test="postalCode"]`
  - Continue button: `input[data-test="continue"]`
  - Cancel button: `button[data-test="cancel"]`
  - Error message: `[data-test="error"]`
- Screenshot: `test-results/screenshots/step-checkout-info-page.png`

### SC-005 / SC-006 / SC-007 — Required field negative tests
- Result: Pass for all three required field cases
- Observed validation messages:
  - First Name required: `Error: First Name is required`
  - Last Name required: `Error: Last Name is required`
  - Postal Code required: `Error: Postal Code is required`
- Screenshots:
  - `test-results/screenshots/step-checkout-error-firstname.png`
  - `test-results/screenshots/step-checkout-error-lastname.png`
  - `test-results/screenshots/step-checkout-error-postalcode.png`

### SC-010 — Order overview happy path
- Result: Pass
- Selectors confirmed:
  - Order summary section: `.summary_info`
  - Payment information label: `.summary_value_label`
  - Item names: `.inventory_item_name`
  - Item descriptions: `.inventory_item_desc`
  - Item prices: `.inventory_item_price`
  - Subtotal label: `.summary_subtotal_label`
  - Tax label: `.summary_tax_label`
  - Total label: `.summary_total_label`
  - Finish button: `button[data-test="finish"]`
  - Cancel button: `button[data-test="cancel"]`
- Screenshot: `test-results/screenshots/step-checkout-overview-page.png`

### SC-013 — Order completion happy path
- Result: Pass
- Observed confirmation text:
  - Title: `Thank you for your order!`
  - Description: `Your order has been dispatched, and will arrive just as fast as the pony can get there!`
- Selectors confirmed:
  - Confirmation header: `.complete-header`
  - Confirmation text: `.complete-text`
  - Back Home button: `button[data-test="back-to-products"]`
- Screenshot: `test-results/screenshots/step-order-confirmation-page.png`

## Additional Notes
- Boundary scenarios for invalid characters and max length were not fully validated during this exploratory pass; the UI does not present specific character validation messages beyond required-field checks.
- Cart quantity boundary and price-update tests were not observed due to a single-item add flow; these can be added if quantity controls are exposed in the UI.

## Test Results Files
- Screenshot folder: `test-results/screenshots/`
- Exploratory findings JSON: `test-results/exploratory-findings.json`
