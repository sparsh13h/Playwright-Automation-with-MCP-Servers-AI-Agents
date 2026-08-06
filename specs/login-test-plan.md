# Login Test Plan

## Ticket
- **LOGIN**

## Application
- URL: https://www.saucedemo.com/
- Feature: Login workflow

## Acceptance Criteria
- **AC-1:** User can log in with valid credentials.
- **AC-2:** Invalid login shows an error message.
- **AC-3:** Password field enforces required input.

## Scenario Table

### Happy Path
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-001 | AC-1 | Log in successfully with valid credentials | User on login page | 1. Enter valid username and password 2. Click login | User is redirected to inventory page and sees product list | standard_user / secret_sauce | P1 |

### Positive Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-002 | AC-1 | Login persists after reload | User logged in | 1. Reload the inventory page | User remains on inventory page and stays logged in | standard_user / secret_sauce | P2 |

### Negative Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-003 | AC-2 | Invalid credentials show login error | User on login page | 1. Enter invalid username/password 2. Click login | Error message shows invalid credentials and user stays on login page | wrong_user / wrong_pass | P1 |
| SC-004 | AC-3 | Missing password shows required validation | User on login page | 1. Enter username only 2. Click login | Error message shows password is required | standard_user / (empty) | P1 |

### Boundary / Limit Scenarios
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-005 | AC-3 | Empty username and password shows required validation | User on login page | 1. Leave username and password blank 2. Click login | Error message shows username is required or password is required | empty / empty | P2 |

### Navigation Flow Tests
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-006 | AC-1 | Login page displays correct elements | User on login page | 1. Open login page | Username, password, login button, and error area are visible | N/A | P2 |

### UI Element Validation
| Scenario ID | AC ref | Title | Preconditions | Steps | Expected Result | Test data | Priority |
|---|---|---|---|---|---|---|---|
| SC-007 | AC-2 | Error banner is visible for failed login | User submits invalid login | 1. Attempt invalid login | Error banner appears with user-friendly text | wrong_user / wrong_pass | P3 |
