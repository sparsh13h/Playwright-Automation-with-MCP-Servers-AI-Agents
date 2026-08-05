# SauceDemo Checkout Test Plan

**Ticket:** N-101
**Application URL:** https://www.saucedemo.com
**Feature:** SauceDemo Checkout Flow

## Overview
This test plan covers the end-to-end checkout experience for SauceDemo. It maps each acceptance criterion (AC) to detailed scenarios across happy path, positive, negative, boundary, navigation, and UI validation coverage.

## Scenario Table

| Scenario ID | AC Reference | Category | Title | Preconditions | Steps | Expected Result | Test Data | Priority |
|---|---|---|---|---|---|---|---|---|
| SC-001 | AC-1 | Happy Path | Review cart page displays correct item details | User is logged in as `standard_user` and has added one item to cart | 1. Login to SauceDemo. 2. Add one item to cart from products page. 3. Navigate to cart page. | Cart page displays added item name, description, price, quantity, and total price. Continue Shopping and Checkout buttons are visible. | Product added to cart | P1 |
| SC-002 | AC-1 | Positive Scenario | Continue shopping returns user to products page | User is on cart page with item(s) in cart | 1. On cart page, click Continue Shopping. | User returns to products page and cart count remains visible. | N/A | P2 |
| SC-003 | AC-1 | UI Validation | Cart totals and item details are visible and labeled | User is on cart page | 1. Open cart page. | Item names, descriptions, quantities, and item total are visible. Total price section is present and labeled. | N/A | P2 |
| SC-004 | AC-2 | Happy Path | Proceed to checkout information page | User is on cart page with items | 1. On cart page, click Checkout. | User lands on checkout information page with First Name, Last Name, Zip/Postal Code fields and Continue button. | N/A | P1 |
| SC-005 | AC-2 | Negative Scenario | Empty required field prevents checkout | User is on checkout information page | 1. Leave First Name empty. 2. Enter `Doe` and `10001`. 3. Click Continue. | Validation error shows that First Name is required and user remains on checkout information page. | Incomplete checkout form | P1 |
| SC-006 | AC-2 | Negative Scenario | Missing Last Name prevents checkout | User is on checkout information page | 1. Enter `Jane`; leave Last Name empty; enter `10001`. 2. Click Continue. | Validation error shows Last Name is required and user remains on page. | Incomplete checkout form | P1 |
| SC-007 | AC-2 | Negative Scenario | Missing Zip/Postal Code prevents checkout | User is on checkout information page | 1. Enter `Jane`; `Doe`; leave Zip/Postal Code empty. 2. Click Continue. | Validation error shows Zip/Postal Code is required and user remains on page. | Incomplete checkout form | P1 |
| SC-008 | AC-2 | Boundary Scenario | Max length character validation on checkout fields | User is on checkout information page | 1. Enter 255-character strings in First Name and Last Name; enter `10001`. 2. Click Continue. | Form either accepts valid-length inputs or displays a validation message if length is exceeded without allowing checkout. | Long first/last name values | P3 |
| SC-009 | AC-2 | UI Validation | Checkout information page fields are mandatory and visible | User is on checkout information page | 1. Verify First Name, Last Name, Zip/Postal Code fields, labels, and Continue button. | All required fields and labels are visible and required. | N/A | P2 |
| SC-010 | AC-3 | Happy Path | Order overview displays summary and totals | User completed checkout information with valid data | 1. On checkout information page, enter `Jane`, `Doe`, `10001`. 2. Click Continue. | User lands on overview page with item summary, payment and shipping info, subtotal, tax, total, Cancel and Finish buttons. | Valid checkout info | P1 |
| SC-011 | AC-3 | Positive Scenario | Order overview shows correct item count for multiple items | User has two items in cart and completes checkout info | 1. Add two items to cart. 2. Complete checkout info. 3. Land on overview page. | Overview displays both items, item quantities, subtotal, tax, and total. | Two cart items | P2 |
| SC-012 | AC-3 | UI Validation | Overview page displays payment and shipping sections | User is on checkout overview page | 1. Review the page content. | Payment and shipping information labels and summary content are visible. | N/A | P2 |
| SC-013 | AC-4 | Happy Path | Finish order and see confirmation page | User is on checkout overview page | 1. Click Finish. | User is redirected to order confirmation page with success message and Back Home button. | N/A | P1 |
| SC-014 | AC-4 | Positive Scenario | Back Home returns user to products page and cart is cleared | User is on order confirmation page | 1. Click Back Home. | User returns to products page; cart count shows zero or cart is empty. | N/A | P2 |
| SC-015 | AC-4 | Navigation Scenario | Cancel from overview returns to cart page | User is on checkout overview page | 1. Click Cancel. | User is returned to cart page with existing cart items preserved. | N/A | P2 |
| SC-016 | AC-5 | Negative Scenario | Invalid characters in name fields show validation error | User is on checkout information page | 1. Enter `Jane!@#`; `Doe`; `10001`. 2. Click Continue. | Validation error indicates invalid characters in First Name, or user is prevented from proceeding until corrected. | Invalid first name | P2 |
| SC-017 | AC-5 | Negative Scenario | Invalid Zip/Postal Code shows validation error | User is on checkout information page | 1. Enter `Jane`; `Doe`; `ABCDE`. 2. Click Continue. | Validation error indicates Zip/Postal Code must be numeric or valid format and user cannot proceed. | Invalid zip code | P2 |
| SC-018 | AC-5 | Boundary Scenario | Zero or negative quantity should be prevented in cart | User is on cart page if quantity controls exist | 1. Attempt to set item quantity to zero or negative value. | UI prevents invalid quantity or shows validation/error message. | Quantity edit tools | P3 |
| SC-019 | AC-1 / AC-3 | Navigation Flow | Browser back button preserves cart and checkout progress | User is on checkout overview page | 1. Click browser Back. | User returns to checkout information or cart page with entered values preserved or user is directed appropriately. | N/A | P2 |
| SC-020 | AC-2 / AC-3 | Navigation Flow | Deep link direct access to checkout overview is blocked if not completed | Fresh browser session | 1. Navigate directly to the checkout overview URL. | User is redirected to login or cart/checkout information as required. | N/A | P3 |
| SC-021 | AC-1 | UI Validation | Cart button badge shows correct item count | User adds item to cart | 1. Add an item to cart and check cart badge. | Badge increments correctly and matches cart contents. | N/A | P2 |
| SC-022 | AC-4 | UI Validation | Confirmation page shows success header and button label | User completes checkout | 1. Complete purchase. | Confirmation message is visible and Back Home button is present with correct label. | N/A | P2 |
| SC-023 | AC-1 | Negative Scenario | Checkout blocked when cart is empty | User is logged in with empty cart | 1. Attempt to proceed to checkout from an empty cart. | Checkout button is disabled or user is prevented from proceeding, with message indicating cart cannot be empty. | Empty cart state | P2 |
| SC-024 | AC-5 | UI Validation | Error messages are visible, descriptive, and tied to fields | User triggers form validation | 1. Submit checkout information with invalid/empty fields. | Error messages are visible and indicate the specific field issue. | Invalid form submission | P2 |
| SC-025 | AC-3 | Boundary Scenario | Price totals update correctly for quantity changes | User has quantity controls on cart page | 1. Increase or decrease item quantity. 2. Proceed to checkout and overview. | Subtotal and total amounts update correctly based on quantity. | Quantity change | P3 |

## Scenario Grouping

### Cart Review
- SC-001 
- SC-002 
- SC-003 
- SC-021 
- SC-023

### Checkout Information Entry
- SC-004 
- SC-005 
- SC-006 
- SC-007 
- SC-008 
- SC-009 
- SC-016 
- SC-017 
- SC-024

### Order Overview
- SC-010 
- SC-011 
- SC-012 
- SC-015 
- SC-019 
- SC-020 
- SC-025

### Order Completion
- SC-013 
- SC-014 
- SC-022

### Error Handling
- SC-005 
- SC-006 
- SC-007 
- SC-016 
- SC-017 
- SC-018 
- SC-023 
- SC-024

## Notes
- The plan assumes `standard_user` can add products to cart and proceed to checkout.
- Test data may be seeded using the product list available on SauceDemo.
- `N-101` is used as the ticket prefix for traceability.
