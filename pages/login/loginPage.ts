/*import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button:has-text("Se connecter")');
  }

  async open() {
    await this.navigateTo('/login');
  }

  async login(email: string, password: string) {
    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async assertLoginSuccess() {
    // Attendre la redirection vers le dashboard
    await this.page.waitForURL(/dashboards\/default/, { timeout: 10000 });  // Attendre l'URL spécifique
    await expect(this.page).toHaveURL(/dashboards\/default/);  // Vérifier l'URL exacte
  }
}*/


import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ENV } from '../../config/env.config';
import { URLS } from '../../config/urls'

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button:has-text("Se connecter")');
  }

  async open() {
    //await this.navigateTo(`${ENV.BASE_URL}${URLS.LOGIN}`);
    await this.navigateTo(URLS.LOGIN);
  }

  async login(email: string, password: string) {
    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async assertLoginSuccess() {
    await this.page.waitForURL(/dashboards\/default/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/dashboards\/default/);
  }
}