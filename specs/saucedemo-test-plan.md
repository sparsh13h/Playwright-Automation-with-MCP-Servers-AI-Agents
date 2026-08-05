# N-101 SauceDemo Test Plan

## Summary
- Application URL: https://www.saucedemo.com/
- Login: `standard_user` / `••••••••`
- Acceptance criteria:
  - AC-1: User can log in with valid credentials and access products.
  - AC-2: User can add a product to the cart and continue through checkout.
  - AC-3: Required checkout information fields show validation errors when left blank.
- Core workflow: login → add item → cart → checkout → overview → confirmation

## Scenario Matrix

| Category | Scenario ID | AC Ref | Title | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| Happy path | SC-001 | AC-1, AC-2 | Login and complete a purchase | User is not logged in | 1. Open app. 2. Login. 3. Add backpack. 4. Proceed to checkout. 5. Enter valid details. 6. Finish order. | User reaches confirmation page and sees order success message. | P1 |
| Positive | SC-004 | AC-2 | Cart totals display correct values | Product added to cart | 1. Open cart. 2. Verify item name and price. | Item name and price match product details. | P1 |
| Negative | SC-005 | AC-3 | First name required validation | Cart and checkout page open | 1. Leave first name blank. 2. Continue. | Error: `Error: First Name is required` appears. | P1 |
| Negative | SC-006 | AC-3 | Last name required validation | Cart and checkout page open | 1. Leave last name blank. 2. Continue. | Error: `Error: Last Name is required` appears. | P1 |
| Negative | SC-007 | AC-3 | Postal code required validation | Cart and checkout page open | 1. Leave postal code blank. 2. Continue. | Error: `Error: Postal Code is required` appears. | P1 |
| UI validation | SC-010 | AC-2 | Checkout overview shows payment and totals section | Valid shipping details entered | 1. Continue from shipping page. | Payment information and totals headers are visible. | P2 |
| UI validation | SC-013 | AC-2 | Confirmation page shows success message | Order is completed | 1. Finish checkout. | Confirmation message and dispatched text are shown. | P1 |

## Coverage Notes
- Happy path and primary validation flows are covered.
- Boundary and alternate flows are intentionally limited because the app behavior is straightforward and the current UI does not expose broader edge-data states beyond required-field validation.
