import { Page } from '@playwright/test';
import { CheckoutOverviewPageLocators as L } from '../locators/CheckoutOverviewPage.locators';

export class CheckoutOverviewPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getSummaryLabel(): Promise<string> {
    return (await this.page.textContent(L.summaryInfoLabel)) ?? '';
  }

  async getPaymentSectionText(): Promise<string> {
    return (await this.page.textContent(L.paymentInfoLabel)) ?? '';
  }

  async getSubtotal(): Promise<string> {
    return (await this.page.textContent(L.subtotalLabel)) ?? '';
  }

  async getTax(): Promise<string> {
    return (await this.page.textContent(L.taxLabel)) ?? '';
  }

  async getTotal(): Promise<string> {
    return (await this.page.textContent(L.totalLabel)) ?? '';
  }

  async finishOrder() {
    await this.page.click(L.finishButton);
  }

  async cancel() {
    await this.page.click(L.cancelButton);
  }
}
