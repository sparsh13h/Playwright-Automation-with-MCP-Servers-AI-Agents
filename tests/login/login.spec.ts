import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const USERNAME = process.env.SAUCEDEMO_USER ?? 'standard_user';
const PASSWORD = process.env.SAUCEDEMO_PASS ?? 'secret_sauce';
const INVALID_USERNAME = 'wrong_user';
const INVALID_PASSWORD = 'wrong_pass';

if (!process.env.SAUCEDEMO_USER || !process.env.SAUCEDEMO_PASS) {
  console.warn('Using default Saucedemo credentials because environment variables are not set.');
}

test.describe('LOGIN Login Workflow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoginFieldsVisible();
  });

  test('SC-001 / AC-1 - log in successfully with valid credentials', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/screenshots/login-inventory-page.png' });
  });

  test('SC-003 / AC-2 - invalid credentials show login error', async ({ page }) => {
    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    await loginPage.expectErrorVisible('Epic sadface: Username and password do not match any user in this service');
    await page.screenshot({ path: 'test-results/screenshots/login-invalid-credentials.png' });
  });

  test('SC-004 / AC-3 - missing password shows required validation', async ({ page }) => {
    await loginPage.login(USERNAME, '');
    await loginPage.expectErrorVisible('Epic sadface: Password is required');
    await page.screenshot({ path: 'test-results/screenshots/login-missing-password.png' });
  });

  test('SC-006 / AC-1 - login page displays correct elements', async ({ page }) => {
    await loginPage.expectLoginFieldsVisible();
  });
});
