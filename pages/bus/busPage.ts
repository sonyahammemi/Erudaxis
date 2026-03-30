import { Page, Locator, expect } from "@playwright/test";

export class BusPage {
    readonly page: Page;
    readonly busEtChauffeursLink: Locator;
    readonly modal: Locator;
    readonly busTab: Locator; 
    readonly addBusBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.busEtChauffeursLink = page.locator('a[href="/gestion-bus/bus-chauffeurs"]', { hasText: 'Bus et Chauffeurs' }).first();
        this.busTab = page.locator('button[role="tab"]', { hasText: 'Bus' });
        this.addBusBtn = page.locator('button:has-text("Ajouter")');
        this.modal = page.locator('div[role="dialog"]');
    }

    // ====== Bus ======
    async clickBusTab() {
        await this.page.waitForTimeout(1000);
        await this.busTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.busTab.click();
    }

    // ====== Ajouter un bus ======
    async clickAddBus(NumBus: string, NumImmatriculation: string, NumCarteGrise: string,NumCarteCarburant: string, TypeBus: string, Capacite: string, chauffeur: string) {
        await this.addBusBtn.waitFor({ state: "visible" });
        await this.addBusBtn.click();
        await this.modal.waitFor({ state: "visible", timeout: 60000 });

        // Champs bus
        await this.modal.locator('input[name="busNumber"]').fill(NumBus);
        await this.modal.locator('input[placeholder="Ex: 200 TN 2178"]').fill(NumImmatriculation);
        await this.modal.locator('input[placeholder="Ex: CG-2024-001"]').fill(NumCarteGrise);
        await this.modal.locator('input[placeholder="Ex: FC-001"]').fill(NumCarteCarburant);
        await this.modal.locator('input[placeholder="Ex: Minibus 20 places"]').fill(TypeBus);
        await this.modal.locator('input[placeholder="Ex: 20"]').fill(Capacite);

        // Select Chauffeur
        const selectChauffeur = this.modal.locator('#react-select-6-placeholder');
        await selectChauffeur.click();
        const searchInput = this.page.locator('input[id^="react-select"][id$="-input"]');
        await searchInput.fill(chauffeur);
        const option = this.page.locator('div[id^="react-select"][id*="-option"]', { hasText: chauffeur });
        await option.click();

        // Ajouter
        await this.modal.locator('button:has-text("Ajouter le bus")').click();
        const okBtn = this.page.locator('.swal2-confirm');       
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i); 
        await okBtn.click();
    }

    // ====== Menu ======
    async MenuBtn(busNumber: string) {
        const title = this.page.getByRole('heading', { name: busNumber }).first();
        await title.waitFor({ state: 'visible' });
        const card = title.locator('xpath=ancestor::div[contains(@class,"MuiPaper-root")]').last();
        const menuBtn = card.locator('button').filter({ 
            has: this.page.locator('svg[data-testid="MoreVertIcon"]') 
        }).first();
        await menuBtn.waitFor({ state: 'visible' });
        await menuBtn.click();
    }
    private async selectDriverInModal(driverName: string) {
        // Ouvrir le champ React Select
        const searchInput = this.modal.locator('input[id^="react-select"][id$="-input"]');
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.click({ force: true });
        await searchInput.fill(driverName);

        // Sélectionner l'option correspondante
        const listboxOption = this.page.locator('div[id*="-option"]', { hasText: driverName }).first();
        await listboxOption.waitFor({ state: 'visible', timeout: 10000 });
        await listboxOption.click();
    }

    // ====== Modifier un bus ======
    async EditBus(busNumber: string, newDriver: string) {

    // ouvrir menu
    await this.MenuBtn(busNumber);

    const modifierOption = this.page.locator('li:has(svg[data-testid="EditIcon"])',{ hasText: 'Modifier' });
    await modifierOption.waitFor({ state: 'visible' });
    await modifierOption.click();
    await this.modal.waitFor({ state: 'visible' });

    // sélectionner chauffeur
    await this.selectDriverInModal(newDriver);

    // modifier
    const modifierBtn = this.modal.locator('button:has-text("Modifier le bus")');
    await modifierBtn.click();

    // confirmation
    const okBtn = this.page.locator('.swal2-confirm');
    await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
    await okBtn.click();
}

    // ====== Supprimer un bus ======
    async DeleteBus(busNumber: string) {
        // 1. Ouvrir le menu
        await this.MenuBtn(busNumber);
    
        // 2. Cliquer sur "Supprimer" dans le menu
        const deleteOption = this.page.locator('li:has(svg[data-testid="DeleteIcon"])', { hasText: 'Supprimer' });
        await deleteOption.waitFor({ state: 'visible', timeout: 10000 });
        await deleteOption.click();
    
        // 3. Confirmer la suppression via SweetAlert
        const confirmBtn = this.page.locator('.swal2-confirm');
        await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
        await confirmBtn.click();
    
        // 4. Vérifier succès
        const successTitle = this.page.locator('#swal2-title');
        await successTitle.waitFor({ state: 'visible', timeout: 10000 });
        await expect(successTitle).toContainText(/succès/i);
        await this.page.locator('.swal2-confirm').click();
    
        console.log(`Bus ${busNumber} supprimé avec succès`);
    }
    
} 
