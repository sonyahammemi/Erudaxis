import { Page, Locator, expect } from "@playwright/test";

export class CantinePage {
  readonly page: Page;
  readonly cantineMenu: Locator;
  readonly gestionCantine: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialisation des locators dans le constructeur
    this.cantineMenu = page.locator('a[href="/dashboards/default"]').filter({
      hasText: "Cantine",
    });
    this.gestionCantine = page.locator('a[href="/cantine/gestion-cantine"]');
  }

  //Cliquer sur le menu Cantine puis sur Gestion Cantine

  async ouvrirGestionCantine() {
    // Attendre dashboard chargé
    await this.page.waitForURL(/dashboards/);

    // Ouvrir menu Cantine (parent)
    await this.cantineMenu.waitFor({ state: "visible", timeout: 60000 });
    await this.cantineMenu.click();

    // Cliquer sous-menu
    await this.gestionCantine.waitFor({ state: "visible", timeout: 60000 });
    await this.gestionCantine.click();
  }
}
