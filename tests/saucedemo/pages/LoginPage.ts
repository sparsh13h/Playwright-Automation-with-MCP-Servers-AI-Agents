import { Page } from '@playwright/test';
import { LoginPageLocators as L } from '../locators/LoginPage.locators';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.page.fill(L.usernameInput, username);
    await this.page.fill(L.passwordInput, password);
    await this.page.click(L.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.textContent(L.errorMessage)) ?? '';
  }
}
