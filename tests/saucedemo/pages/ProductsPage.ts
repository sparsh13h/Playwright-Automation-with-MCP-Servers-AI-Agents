import { Page, expect } from '@playwright/test';
import { ProductsPageLocators as L } from '../locators/ProductsPage.locators';

export class ProductsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productId: string) {
    await this.page.click(L.productAddButton(productId));
  }

  async goToCart() {
    await this.page.click(L.cartLink);
  }

  async getFirstProductName(): Promise<string> {
    return (await this.page.textContent(L.productName)) ?? '';
  }

  async expectProductVisible(productName: string) {
    await expect(this.page.locator(L.productName)).toContainText(productName);
  }

  async expectCartLinkVisible() {
    await expect(this.page.locator(L.cartLink)).toBeVisible();
  }
}
