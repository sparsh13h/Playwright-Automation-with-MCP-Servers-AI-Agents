# Saucedemo Checkout Test Plan

## Ticket
- **N-101**

## Application
- URL: https://www.saucedemo.com
- Feature: Saucedemo checkout flow

## Acceptance Criteria
- **AC-1:** Cart Review
- **AC-2:** Checkout Information Entry
- **AC-3:** Order Overview
- **AC-4:** Order Completion
- **AC-5:** Error Handling

## Scenario Table

### Happy Path
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-001 | AC-1/AC-2/AC-3/AC-4 | Complete checkout from cart through confirmation | Logged in as standard_user; cart contains Sauce Labs Backpack | 1. Add Sauce Labs Backpack to cart 2. Open cart 3. Proceed to checkout 4. Enter first name, last name, postal code 5. Continue 6. Finish order 7. Return home | User sees cart contents, checkout info page, overview totals, confirmation page, and returns to products page | standard_user/secret_sauce; firstName=John; lastName=Doe; postalCode=90210; product=sauce-labs-backpack | P1 |

### Positive Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-002 | AC-1 | View cart item details | User logged in and cart contains one item | 1. Add item to cart 2. Open cart | Cart page shows item name, description, price, quantity, total, Continue Shopping and Checkout buttons | product=sauce-labs-backpack | P2 |
| SC-003 | AC-3 | Verify order overview includes payment and shipping summary | User has valid checkout info entered | 1. Start checkout 2. Enter valid info 3. Continue to overview | Overview page shows payment/shipping summary, item list, subtotal, tax, total, Cancel and Finish buttons | valid checkout info | P2 |

### Negative Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-004 | AC-2 | Missing first name shows required validation | User on checkout information page | 1. Leave First Name empty 2. Enter Last Name and Postal Code 3. Click Continue | Error message indicates first name is required and user cannot proceed | lastName=Doe; postalCode=90210 | P1 |
| SC-005 | AC-2 | Missing last name shows required validation | User on checkout information page | 1. Enter First Name 2. Leave Last Name empty 3. Enter Postal Code 4. Click Continue | Error message indicates last name is required and user cannot proceed | firstName=John; postalCode=90210 | P1 |
| SC-006 | AC-2 | Missing postal code shows required validation | User on checkout information page | 1. Enter First Name and Last Name 2. Leave Postal Code empty 3. Click Continue | Error message indicates postal code is required and user cannot proceed | firstName=John; lastName=Doe | P1 |
| SC-007 | AC-5 | Invalid postal code prevents checkout | User on checkout information page | 1. Enter invalid postal code 2. Click Continue | Error message indicates postal code is required or invalid and user remains on checkout info page | postalCode=@!# | P2 |

### Boundary / Limit Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-008 | AC-5 | Empty checkout form prevents continue | User on checkout information page | 1. Leave all fields empty 2. Click Continue | Error message appears and checkout does not proceed | empty fields | P2 |
| SC-009 | AC-1 | Cart quantity remains accurate after adding one item | Logged in user on products page | 1. Add one item to cart 2. Open cart | Cart quantity indicator increments to 1 and cart item quantity is 1 | product=sauce-labs-backpack | P3 |

### Navigation Flow Tests
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-010 | AC-2 | Cancel checkout returns to cart | User on checkout information page | 1. Click Cancel | User returns to cart page and cart contents remain intact | N/A | P2 |
| SC-011 | AC-4 | Back home returns to products page after order completion | User on confirmation page | 1. Click Back Home | User returns to products page and cart is cleared | N/A | P2 |

### UI Element Validation
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-012 | AC-2 | Checkout form displays mandatory fields | User on checkout information page | 1. Open checkout page | First Name, Last Name, Postal Code fields and Continue/Cancel buttons are visible | N/A | P2 |
| SC-013 | AC-3 | Overview page shows order summary labels | User on checkout overview page | 1. Navigate to overview | Summary labels for payment, shipping, subtotal, tax, total, cancel, and finish are visible | N/A | P2 |
