import { Page, expect } from '@playwright/test';
import { CartPageLocators as L } from '../locators/CartPage.locators';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getItemName(): Promise<string> {
    return (await this.page.textContent(L.itemName)) ?? '';
  }

  async getItemDescription(): Promise<string> {
    return (await this.page.textContent(L.itemDescription)) ?? '';
  }

  async getItemPrice(): Promise<string> {
    return (await this.page.textContent(L.itemPrice)) ?? '';
  }

  async getItemQuantity(): Promise<string> {
    return (await this.page.textContent(L.itemQuantity)) ?? '';
  }

  async expectCartItemVisible() {
    await expect(this.page.locator(L.cartItem)).toBeVisible();
  }

  async expectCheckoutButtonEnabled() {
    await expect(this.page.locator(L.checkoutButton)).toBeEnabled();
  }

  async expectItemNameContains(name: string) {
    await expect(this.page.locator(L.itemName)).toContainText(name);
  }

  async expectItemPriceVisible() {
    await expect(this.page.locator(L.itemPrice)).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.click(L.checkoutButton);
  }

  async continueShopping() {
    await this.page.click(L.continueShoppingButton);
  }
}
