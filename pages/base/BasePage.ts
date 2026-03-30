import { Page, Locator, expect } from "@playwright/test";
import { ENV } from '../../config/env.config'; 

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    const fullUrl = new URL(path, ENV.BASE_URL).toString();  // ← Build full URL
    await this.page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.waitForPageLoad();
  }
/* async navigateTo(path: string) {
    if (!ENV.BASE_URL) {
      throw new Error("❌ BASE_URL is undefined");
    }
  
    const fullUrl = new URL(path, ENV.BASE_URL).toString();
  
    console.log("Navigating to:", fullUrl);
  
    await this.page.goto(fullUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  
    await this.waitForPageLoad();
  }*/

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");  // Changé à domcontentloaded pour éviter les attentes longues
  }

  async safeClick(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 10000 });
    await locator.click();
  }

  async safeFill(locator: Locator, value: string) {
    await expect(locator).toBeVisible({ timeout: 10000 });
    await locator.fill(value);
  }
}