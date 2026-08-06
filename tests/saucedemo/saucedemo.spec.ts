import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutInformationPage } from './pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

const USERNAME = process.env.SAUCEDEMO_USER;
const PASSWORD = process.env.SAUCEDEMO_PASS;

const CHECKOUT_FIRST_NAME = 'John';
const CHECKOUT_LAST_NAME = 'Doe';
const CHECKOUT_POSTAL_CODE = '90210';
const PRODUCT_ID = 'sauce-labs-backpack';

if (!USERNAME || !PASSWORD) {
  throw new Error('Environment variables SAUCEDEMO_USER and SAUCEDEMO_PASS must be set before running tests.');
}

function getScreenshotPath(testName: string, step: string) {
  return `test-results/screenshots/N-101-${testName}-${step}.png`;
}

test.describe('N-101 Checkout flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let confirmationPage: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    confirmationPage = new ConfirmationPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test.describe('Happy Path', () => {
    test('SC-001 / AC-1 / AC-2 / AC-3 / AC-4 - complete checkout from cart through confirmation', async ({ page }) => {
      await productsPage.addProductToCart(PRODUCT_ID);
      await productsPage.goToCart();

      await expect(page).toHaveURL(/cart.html/);
      await cartPage.expectCartItemVisible();
      await cartPage.expectCheckoutButtonEnabled();
      await cartPage.expectItemNameContains('Sauce Labs Backpack');
      await cartPage.expectItemPriceVisible();
      await page.screenshot({ path: getScreenshotPath('complete-checkout', 'cart-page') });

      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(/checkout-step-one.html/);
      await checkoutInformationPage.expectFormVisible();
      await page.screenshot({ path: getScreenshotPath('complete-checkout', 'checkout-info-page') });

      await checkoutInformationPage.enterShippingInformation(CHECKOUT_FIRST_NAME, CHECKOUT_LAST_NAME, CHECKOUT_POSTAL_CODE);
      await checkoutInformationPage.continue();

      await expect(page).toHaveURL(/checkout-step-two.html/);
      await checkoutOverviewPage.expectOverviewVisible();
      await checkoutOverviewPage.expectTotalsVisible();
      await checkoutOverviewPage.expectItemVisible('Sauce Labs Backpack');
      await page.screenshot({ path: getScreenshotPath('complete-checkout', 'overview-page') });

      await checkoutOverviewPage.finishOrder();
      await expect(page).toHaveURL(/checkout-complete.html/);
      await confirmationPage.expectConfirmationVisible();
      await confirmationPage.expectBackHomeButtonVisible();
      await page.screenshot({ path: getScreenshotPath('complete-checkout', 'confirmation-page') });

      await confirmationPage.goBackHome();
      await expect(page).toHaveURL(/inventory.html/);
    });
  });

  test.describe('Negative Path', () => {
    test('SC-004 / AC-2 / AC-5 - show validation error when required checkout fields are missing', async ({ page }) => {
      await productsPage.addProductToCart(PRODUCT_ID);
      await productsPage.goToCart();
      await cartPage.proceedToCheckout();

      await checkoutInformationPage.enterShippingInformation('', CHECKOUT_LAST_NAME, CHECKOUT_POSTAL_CODE);
      await checkoutInformationPage.continue();
      await checkoutInformationPage.expectErrorVisible('First Name is required');

      await checkoutInformationPage.enterShippingInformation(CHECKOUT_FIRST_NAME, '', CHECKOUT_POSTAL_CODE);
      await checkoutInformationPage.continue();
      await checkoutInformationPage.expectErrorVisible('Last Name is required');

      await checkoutInformationPage.enterShippingInformation(CHECKOUT_FIRST_NAME, CHECKOUT_LAST_NAME, '');
      await checkoutInformationPage.continue();
      await checkoutInformationPage.expectErrorVisible('Postal Code is required');
    });

    // KNOWN DEFECT: invalid postal code characters are accepted by the current checkout validation flow
    test('SC-007 / AC-5 - known defect: invalid postal code characters are accepted by current checkout validation', async ({ page }) => {
      await productsPage.addProductToCart(PRODUCT_ID);
      await productsPage.goToCart();
      await cartPage.proceedToCheckout();

      await checkoutInformationPage.enterShippingInformation(CHECKOUT_FIRST_NAME, CHECKOUT_LAST_NAME, '@!#');
      await checkoutInformationPage.continue();
      await expect(page).toHaveURL(/checkout-step-two.html/);
      await page.screenshot({ path: getScreenshotPath('invalid-postal', 'overview-page') });
    });
  });
});
