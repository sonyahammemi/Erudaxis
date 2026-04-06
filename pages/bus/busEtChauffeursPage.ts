/*import { Page, Locator, expect } from "@playwright/test";

export class BusEtChauffeursPage {
    readonly page: Page;
    readonly addBtn: Locator;
    readonly busEtChauffeursLink: Locator;
    readonly modal: Locator;
    readonly chauffeursTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.busEtChauffeursLink = page.locator('a[href="/gestion-bus/bus-chauffeurs"]', { hasText: 'Bus et Chauffeurs' }).first();
        this.chauffeursTab = page.locator('button[role="tab"]', { hasText: 'Chauffeurs' });
        this.addBtn = page.locator('button:has-text("Ajouter")');
        this.modal = page.locator('div[role="dialog"]');
    }

    // ====== Trouver la carte exacte d'un chauffeur ======
    private async findChauffeurCard(prenom: string): Promise<number> {
        // Scroll progressif pour trouver le chauffeur
        let found = false;
        let scrollY = 0;
        const scrollStep = 300;
        const maxScroll = 5000;

        while (!found && scrollY <= maxScroll) {
            await this.page.evaluate((y) => window.scrollTo(0, y), scrollY);
            await this.page.waitForTimeout(300);

            const heading = this.page.getByRole('heading', { name: prenom }).first();
            if (await heading.isVisible()) {
                found = true;
            } else {
                scrollY += scrollStep;
            }
        }

        if (!found) {
            throw new Error(`Chauffeur "${prenom}" introuvable après scroll`);
        }

        // Trouver la carte exacte avec MoreVertIcon === 1
        const allCards = this.page.locator('div.MuiPaper-root');
        const count = await allCards.count();

        for (let i = 0; i < count; i++) {
            const card = allCards.nth(i);
            const moreVertCount = await card
                .locator('svg[data-testid="MoreVertIcon"]')
                .count();

            if (moreVertCount === 1) {
                const text = await card.textContent();
                if (text?.includes(prenom)) {
                    console.log(`Carte trouvée à l'index ${i} pour "${prenom}"`);
                    return i;
                }
            }
        }

        throw new Error(`Carte avec MoreVertIcon introuvable pour "${prenom}"`);
    }

    // ====== Menu : ouvrir le menu d'un chauffeur ======
    async MenuBtn(prenom: string) {
        const index = await this.findChauffeurCard(prenom);
        const card = this.page.locator('div.MuiPaper-root').nth(index);
        const menuBtn = card.locator('button:has(svg[data-testid="MoreVertIcon"])');
        await menuBtn.scrollIntoViewIfNeeded();
        await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
        await menuBtn.click();
    }

    // ====== Open page Bus et chauffeurs ======
    async openBusEtChauffeurs() {
        await this.busEtChauffeursLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.busEtChauffeursLink.click();
    }

    // ====== Cliquer sur l'onglet Chauffeurs ======
    async clickChauffeursTab() {
        await this.page.waitForTimeout(1000);
        await this.chauffeursTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.chauffeursTab.click();
    }

    // ====== Ajouter un chauffeur ======
    async cliquerAjouterChauffeur(Prenom: string, Nom: string, Email: string,CIN: string, Tel: string, Adresse: string,
        Pays: string, Ville: string
    ) {
        await this.addBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.addBtn.click();
        await this.modal.waitFor({ state: 'visible', timeout: 60000 });

        // Prénom
        const prenomInput = this.modal.locator('input[placeholder="Ex: Ahmed"]');
        await prenomInput.waitFor({ state: 'visible', timeout: 10000 });
        await prenomInput.fill(Prenom);

        // Nom
        const nomInput = this.modal.locator('input[placeholder="Ex: Benali"]');
        await nomInput.waitFor({ state: 'visible', timeout: 10000 });
        await nomInput.fill(Nom);

        // Email
        const emailInput = this.modal.locator('input[placeholder="Ex: ahmed.benali@email.com"]');
        await emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await emailInput.fill(Email);

        // CIN
        const cinInput = this.modal.locator('input[placeholder="Ex: 12345678"]');
        await cinInput.waitFor({ state: 'visible', timeout: 10000 });
        await cinInput.pressSequentially(CIN, { delay: 100 });
        console.log(`CIN value: ${await cinInput.inputValue()}`);

        // Téléphone
        const telInput = this.modal.locator('input[placeholder="1 (702) 123-4567"]');
        await telInput.waitFor({ state: 'visible', timeout: 10000 });
        await telInput.fill(Tel);

        // Adresse
        const adresseInput = this.modal.locator('input[name="address"]');
        await adresseInput.waitFor({ state: 'visible', timeout: 10000 });
        await adresseInput.fill(Adresse);

        // Pays
        //const paysSelect = this.modal.locator('#react-select-6-input');
        const paysSelect = this.modal.locator('#react-select-10-input');
        await paysSelect.click();
        //await this.page.locator('#react-select-6-option-141').click();
        await paysSelect.waitFor({ state: 'visible', timeout: 40000 });
        await paysSelect.fill(Pays);
        await paysSelect.press('Enter');
        

        // Ville
        //const villeSelect = this.modal.locator('#react-select-7-input');
        const villeSelect = this.modal.locator('#react-select-11-input');
        await villeSelect.click();
        //await this.page.locator('#react-select-7-option-0').click();
        await paysSelect.waitFor({ state: 'visible', timeout: 60000 });
        await paysSelect.fill(Ville);
        //await paysSelect.press('Enter');

        // Créer
        const createBtn = this.modal.locator('button:has-text("Créer")');
        await createBtn.waitFor({ state: 'visible', timeout: 10000 });
        await createBtn.click();

        console.log(`Chauffeur "${Prenom} ${Nom}" créé avec succès`);
    }

    // ====== Valider le SweetAlert ======
    async validBoutton() {
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
        await this.page.locator('.swal2-confirm').click();
    }

    // ====== Modifier un chauffeur ======
    async EditChauffeur(prenomActuel: string, nouveauPrenom: string) {
        // 1. Ouvrir menu
        await this.MenuBtn(prenomActuel);

        // 2. Cliquer sur "Modifier"
        const modifierOption = this.page.locator(
            'li:has(svg[data-testid="EditIcon"])',
            { hasText: 'Modifier' }
        ).first();
        await modifierOption.waitFor({ state: 'visible', timeout: 10000 });
        await modifierOption.click();

        // 3. Attendre le modal
        await this.modal.waitFor({ state: 'visible', timeout: 10000 });

        // 4. Modifier le prénom
        const prenomInput = this.modal.locator('input[placeholder="Ex: Ahmed"]');
        await prenomInput.waitFor({ state: 'visible', timeout: 10000 });
        await prenomInput.clear();
        await prenomInput.fill(nouveauPrenom);

        // 5. Sauvegarder
        const modifierBtn = this.modal.locator('button:has-text("Modifier le chauffeur")');
        await modifierBtn.waitFor({ state: 'visible', timeout: 10000 });
        await modifierBtn.click();

        // 6. Vérifier succès
        await this.validBoutton();

        console.log(`Chauffeur "${prenomActuel}" modifié en "${nouveauPrenom}" ✓`);
    }

    // ====== Supprimer un chauffeur ======
    async DeleteChauffeur(nouveauPrenom: string) {
        // 1. Ouvrir menu avec scroll
        await this.MenuBtn(nouveauPrenom);
    
        // 2. Cliquer sur "Supprimer"
        const supprimerOption = this.page.locator('li:has(svg[data-testid="DeleteIcon"])',{ hasText: 'Supprimer' });
        await supprimerOption.waitFor({ state: 'visible', timeout: 10000 });
        await supprimerOption.click();
    
        // 3. Confirmer via SweetAlert2
        const deleteBtn = this.page.locator('button.swal2-confirm');
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.scrollIntoViewIfNeeded();
        await deleteBtn.click();
    
        // 4. Vérifier succès
        await this.validBoutton();
        console.log(`Chauffeur "${nouveauPrenom}" supprimé avec succès `);
    }
}*/

import { Page, Locator, expect } from "@playwright/test";

export class BusEtChauffeursPage {
    readonly page: Page;
    readonly addBtn: Locator;
    readonly busEtChauffeursLink: Locator;
    readonly modal: Locator;
    readonly chauffeursTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.busEtChauffeursLink = page.locator('a[href="/gestion-bus/bus-chauffeurs"]', { hasText: 'Bus et Chauffeurs' }).first();
        this.chauffeursTab = page.locator('button[role="tab"]', { hasText: 'Chauffeurs' });
        this.addBtn = page.locator('button:has-text("Ajouter")');
        this.modal = page.locator('div[role="dialog"]');
    }

    // ====== Sélectionner une option React Select par label du champ ======
    private async selectReactSelect(fieldLabel: string, value: string): Promise<void> {
        // Trouver le conteneur React Select par le label associé
        const label = this.modal.locator('label', { hasText: fieldLabel });
        const container = this.modal.locator('.react-select__control').filter({
            has: this.page.locator(`label:has-text("${fieldLabel}")`)
        });

        // Fallback : chercher par position dans le modal
        // Pays = premier react-select, Ville = deuxième
        const allControls = this.modal.locator('.react-select__control');
        const index = fieldLabel.toLowerCase().includes('pays') ? 0 : 1;
        const control = allControls.nth(index);

        await control.click();

        // Saisir dans l'input qui apparaît après le click
        const input = this.modal.locator('.react-select__input input').nth(index);
        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.fill(value);

        // Attendre les options et sélectionner la première correspondance
        const option = this.page.locator('.react-select__option', { hasText: value }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    // ====== Trouver la carte exacte d'un chauffeur ======
    private async findChauffeurCard(prenom: string): Promise<number> {
        let found = false;
        let scrollY = 0;
        const scrollStep = 300;
        const maxScroll = 5000;

        while (!found && scrollY <= maxScroll) {
            await this.page.evaluate((y) => window.scrollTo(0, y), scrollY);
            await this.page.waitForTimeout(300);
            const heading = this.page.getByRole('heading', { name: prenom }).first();
            if (await heading.isVisible()) {
                found = true;
            } else {
                scrollY += scrollStep;
            }
        }

        if (!found) throw new Error(`Chauffeur "${prenom}" introuvable après scroll`);

        const allCards = this.page.locator('div.MuiPaper-root');
        const count = await allCards.count();

        for (let i = 0; i < count; i++) {
            const card = allCards.nth(i);
            const moreVertCount = await card.locator('svg[data-testid="MoreVertIcon"]').count();
            if (moreVertCount === 1) {
                const text = await card.textContent();
                if (text?.includes(prenom)) {
                    console.log(`Carte trouvée à l'index ${i} pour "${prenom}"`);
                    return i;
                }
            }
        }

        throw new Error(`Carte avec MoreVertIcon introuvable pour "${prenom}"`);
    }

    // ====== Menu : ouvrir le menu d'un chauffeur ======
    async MenuBtn(prenom: string) {
        const index = await this.findChauffeurCard(prenom);
        const card = this.page.locator('div.MuiPaper-root').nth(index);
        const menuBtn = card.locator('button:has(svg[data-testid="MoreVertIcon"])');
        await menuBtn.scrollIntoViewIfNeeded();
        await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
        await menuBtn.click();
    }

    // ====== Open page Bus et chauffeurs ======
    async openBusEtChauffeurs() {
        await this.busEtChauffeursLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.busEtChauffeursLink.click();
    }

    // ====== Cliquer sur l'onglet Chauffeurs ======
    async clickChauffeursTab() {
        await this.chauffeursTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.chauffeursTab.click();
    }

    // ====== Ajouter un chauffeur ======
    // ====== Ajouter un chauffeur ======
async cliquerAjouterChauffeur(
    Prenom: string, Nom: string, Email: string,
    CIN: string, Tel: string, Adresse: string,
    Pays: string, Ville: string
) {
    await this.addBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.addBtn.click();
    await this.modal.waitFor({ state: 'visible', timeout: 60000 });

    // Prénom
    await this.modal.locator('input[placeholder="Ex: Ahmed"]').fill(Prenom);

    // Nom
    await this.modal.locator('input[placeholder="Ex: Benali"]').fill(Nom);

    // Email
    await this.modal.locator('input[placeholder="Ex: ahmed.benali@email.com"]').fill(Email);

    // CIN
    const cinInput = this.modal.locator('input[placeholder="Ex: 12345678"]');
    await cinInput.waitFor({ state: 'visible', timeout: 10000 });
    await cinInput.pressSequentially(CIN, { delay: 100 });
    console.log(`CIN value: ${await cinInput.inputValue()}`);

    // Téléphone
    await this.modal.locator('input[placeholder="1 (702) 123-4567"]').fill(Tel);

    // Adresse
    await this.modal.locator('input[name="address"]').fill(Adresse);

    // Pays — cibler par role="combobox" position 0 dans le modal
    const comboboxes = this.modal.locator('input[role="combobox"]');
    const paysInput = comboboxes.nth(0);
    await paysInput.waitFor({ state: 'visible', timeout: 10000 });
    await paysInput.click();
    await paysInput.fill(Pays);

    // Attendre et sélectionner l'option Pays
    const paysOption = this.page.locator('[class*="option"]', { hasText: Pays }).first();
    await paysOption.waitFor({ state: 'visible', timeout: 10000 });
    await paysOption.click();

    // Attendre que Ville se charge après sélection Pays
    await this.page.waitForTimeout(1000);

    // Ville
    const villeInput = comboboxes.nth(1);
    await villeInput.waitFor({ state: 'visible', timeout: 10000 });
    await villeInput.click();
    await villeInput.fill(Ville);

    // Attendre et sélectionner l'option Ville
    const villeOption = this.page.locator('[class*="option"]', { hasText: Ville }).first();
    await villeOption.waitFor({ state: 'visible', timeout: 10000 });
    await villeOption.click();

    // Créer 
    const createBtn = this.modal.locator('button:has-text("Créer")');
    await createBtn.waitFor({ state: 'visible', timeout: 10000 });
    await createBtn.click();

    console.log(`Chauffeur "${Prenom} ${Nom}" créé avec succès`);
}
    // ====== Valider le SweetAlert ======
    async validBoutton() {
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
        await this.page.locator('.swal2-confirm').click();
    }

    // ====== Modifier un chauffeur ======
    async EditChauffeur(prenomActuel: string, nouveauPrenom: string) {
        await this.MenuBtn(prenomActuel);

        const modifierOption = this.page.locator(
            'li:has(svg[data-testid="EditIcon"])',
            { hasText: 'Modifier' }
        ).first();
        await modifierOption.waitFor({ state: 'visible', timeout: 10000 });
        await modifierOption.click();

        await this.modal.waitFor({ state: 'visible', timeout: 10000 });

        const prenomInput = this.modal.locator('input[placeholder="Ex: Ahmed"]');
        await prenomInput.waitFor({ state: 'visible', timeout: 10000 });
        await prenomInput.clear();
        await prenomInput.fill(nouveauPrenom);

        const modifierBtn = this.modal.locator('button:has-text("Modifier le chauffeur")');
        await modifierBtn.waitFor({ state: 'visible', timeout: 10000 });
        await modifierBtn.click();

        await this.validBoutton();
        console.log(`Chauffeur "${prenomActuel}" modifié en "${nouveauPrenom}" ✓`);
    }

    // ====== Supprimer un chauffeur ======
    async DeleteChauffeur(prenom: string) {
        await this.MenuBtn(prenom);

        const supprimerOption = this.page.locator(
            'li:has(svg[data-testid="DeleteIcon"])',
            { hasText: 'Supprimer' }
        );
        await supprimerOption.waitFor({ state: 'visible', timeout: 10000 });
        await supprimerOption.click();

        const deleteBtn = this.page.locator('button.swal2-confirm');
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.scrollIntoViewIfNeeded();
        await deleteBtn.click();

        await this.validBoutton();
        console.log(`Chauffeur "${prenom}" supprimé avec succès`);
    }
}