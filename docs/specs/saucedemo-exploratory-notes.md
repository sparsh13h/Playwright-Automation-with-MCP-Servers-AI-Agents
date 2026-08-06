# Saucedemo Checkout Exploratory Notes

## SC-001
- Result: Pass
- Confirmed locators:
  - Cart item: `.cart_item`
  - Product name: `.inventory_item_name`
  - Product price: `.inventory_item_price`
  - Checkout button: `button[data-test="checkout"]`
  - First name input: `input[data-test="firstName"]`
  - Last name input: `input[data-test="lastName"]`
  - Postal code input: `input[data-test="postalCode"]`
  - Continue button: `input[data-test="continue"]`
  - Finish button: `button[data-test="finish"]`
  - Confirmation header: `.complete-header`
  - Back home button: `button[data-test="back-to-products"]`
- Screenshots: N/A
- Notes: Order overview page includes subtotal, tax, and total labels. Confirmation page shows success message.

## SC-004 / SC-005 / SC-006
- Result: Pass
- Confirmed locators:
  - Error message: `[data-test="error"]`
- Notes: Checkout information page validation appears via the same error banner for required fields.
