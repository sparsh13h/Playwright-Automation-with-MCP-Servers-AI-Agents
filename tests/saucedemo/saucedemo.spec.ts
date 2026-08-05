import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutInformationPage } from './pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

const USERNAME = process.env.SAUCEDEMO_USER ?? 'standard_user';
const PASSWORD = process.env.SAUCEDEMO_PASS ?? 'secret_sauce';
const PRODUCT_ID = 'sauce-labs-backpack';

test.describe('N-101 SauceDemo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
  });

  test('SC-001 / SC-004 / SC-010 / SC-013 - complete checkout happy path', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await productsPage.addProductToCart(PRODUCT_ID);
    await productsPage.goToCart();

    expect(await cartPage.getItemName()).toContain('Sauce Labs Backpack');
    expect(await cartPage.getItemPrice()).toContain('$29.99');

    await cartPage.proceedToCheckout();

    await checkoutInfoPage.enterShippingInformation('Jane', 'Doe', '10001');
    await checkoutInfoPage.continue();

    expect(await checkoutOverviewPage.getSummaryLabel()).toContain('Payment Information:');
    expect(await checkoutOverviewPage.getSubtotal()).toContain('Item total:');
    expect(await checkoutOverviewPage.getTax()).toContain('Tax:');
    expect(await checkoutOverviewPage.getTotal()).toContain('Total:');

    await checkoutOverviewPage.finishOrder();

    expect(await confirmationPage.getConfirmationHeader()).toBe('Thank you for your order!');
    expect(await confirmationPage.getConfirmationText()).toContain('Your order has been dispatched');
  });

  test('SC-005 / SC-006 / SC-007 - checkout information required field validation', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInformationPage(page);

    await productsPage.addProductToCart(PRODUCT_ID);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutInfoPage.enterShippingInformation('', 'Doe', '10001');
    await checkoutInfoPage.continue();
    await checkoutInfoPage.expectErrorVisible('Error: First Name is required');

    await checkoutInfoPage.enterShippingInformation('Jane', '', '10001');
    await checkoutInfoPage.continue();
    await checkoutInfoPage.expectErrorVisible('Error: Last Name is required');

    await checkoutInfoPage.enterShippingInformation('Jane', 'Doe', '');
    await checkoutInfoPage.continue();
    await checkoutInfoPage.expectErrorVisible('Error: Postal Code is required');
  });
});
