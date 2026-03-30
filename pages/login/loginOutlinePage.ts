import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ENV } from '../../config/env.config';
import { URLS } from '../../config/urls';

export interface LoginAttemptResult {
  url: string;
  hasErrorMessage: boolean;
  errorText: string | null;
  isRedirectedToDashboard: boolean;
}

export class LoginOutlinePage extends BasePage {

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button:has-text("Se connecter")');
    this.errorAlert = page.locator('#error-alert');
  }
  // Navigation
  async open(): Promise<void> {
    await this.navigateTo(`${ENV.BASE_URL}${URLS.LOGIN}`);
    await this.page.waitForLoadState('domcontentloaded');
  }
  // Actions
  async attemptLogin(email: string, password: string): Promise<void> {

    await this.emailInput.clear().catch(() => {});
    await this.passwordInput.clear().catch(() => {});
    if (email.trim()) await this.safeFill(this.emailInput, email);
    if (password.trim()) await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);

    // Attente propre (dashboard OU erreur)
    await Promise.race([
      this.page.waitForURL(/dashboards\/default/, { timeout: 5000 }).catch(() => {}),
      this.errorAlert.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    ]);
  }

  async attemptLoginAndGetResult(email: string, password: string): Promise<LoginAttemptResult> {
    await this.attemptLogin(email, password);
    const url = this.page.url();
    const isRedirectedToDashboard = /dashboards\/default/.test(url);
    const hasErrorMessage = await this.hasAnyErrorVisible();
    const errorText = await this.getErrorText();
    return {
      url,
      hasErrorMessage,
      errorText,
      isRedirectedToDashboard
    };
  }
  // ====== Helpers ======
  public async hasAnyErrorVisible(): Promise<boolean> {
    return await this.errorAlert.isVisible().catch(() => false);
  }
  //
  public async getErrorText(): Promise<string | null> {
    const visible = await this.errorAlert.isVisible().catch(() => false);
    if (visible) {
      return await this.errorAlert.innerText().catch(() => null);
    }
    return null;
  }
  // Assertions
  async assertNotRedirectedToDashboard(): Promise<void> {
    const url = this.page.url();
    expect(url, `Redirection inattendue: ${url}`)
      .not.toMatch(/dashboards\/default/);
  }

  async assertErrorIsVisible(): Promise<void> {
    await expect(this.errorAlert).toBeVisible({ timeout: 5000 });
    const text = await this.errorAlert.textContent();
    expect(text?.trim()).toContain("identification invalides");
  }
  async assertLoginRejected(): Promise<void> {
    await this.assertNotRedirectedToDashboard();
    await this.assertErrorIsVisible();
  }
}