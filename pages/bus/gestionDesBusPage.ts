import { Page, Locator, expect } from "@playwright/test";

export class GestionDesBusPage {
    readonly page: Page;
    readonly gestionDesBusMenu: Locator;
    readonly BusEtChauffeurs: Locator;

    constructor(page: Page) {
        this.page = page;

    // Initialisation des locators dans le constructeur
    this.gestionDesBusMenu = page.locator('a[href="/dashboards/default"]').filter({hasText: "Gestion des Bus",});
    this.BusEtChauffeurs = page.locator('a[href="/gestion-bus/bus-chauffeurs"]');
    }

  //Cliquer sur le menu gestion des bus puis sur Bud et chauffeurs
    async ouvrirGestionBus() {
    // Attendre dashboard chargé
    await this.page.waitForURL(/dashboards/);

    // Ouvrir menu gestion des bus (parent)
    await this.gestionDesBusMenu.waitFor({ state: "visible", timeout: 60000 });
    await this.gestionDesBusMenu.click();

    // Cliquer sous-menu
    await this.BusEtChauffeurs.waitFor({ state: "visible", timeout: 60000 });
    await this.BusEtChauffeurs.click();
    }
}
