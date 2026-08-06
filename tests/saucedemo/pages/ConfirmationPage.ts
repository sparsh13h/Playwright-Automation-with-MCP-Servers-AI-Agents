import { Page, expect } from '@playwright/test';
import { ConfirmationPageLocators as L } from '../locators/ConfirmationPage.locators';

export class ConfirmationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getConfirmationHeader(): Promise<string> {
    return (await this.page.textContent(L.confirmationHeader)) ?? '';
  }

  async getConfirmationText(): Promise<string> {
    return (await this.page.textContent(L.confirmationText)) ?? '';
  }

  async expectConfirmationVisible() {
    await expect(this.page.locator(L.confirmationHeader)).toBeVisible();
    await expect(this.page.locator(L.confirmationText)).toBeVisible();
  }

  async expectBackHomeButtonVisible() {
    await expect(this.page.locator(L.backHomeButton)).toBeVisible();
  }

  async goBackHome() {
    await this.page.click(L.backHomeButton);
  }
}
