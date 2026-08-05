import { Page, expect } from '@playwright/test';
import { CheckoutInformationPageLocators as L } from '../locators/CheckoutInformationPage.locators';

export class CheckoutInformationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterShippingInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(L.firstNameInput, firstName);
    await this.page.fill(L.lastNameInput, lastName);
    await this.page.fill(L.postalCodeInput, postalCode);
  }

  async continue() {
    await this.page.click(L.continueButton);
  }

  async cancel() {
    await this.page.click(L.cancelButton);
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.textContent(L.errorMessage)) ?? '';
  }

  async expectErrorVisible(expectedText: string) {
    await expect(this.page.locator(L.errorMessage)).toContainText(expectedText);
  }
}
