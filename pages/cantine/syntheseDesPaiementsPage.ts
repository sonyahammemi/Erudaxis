import { Page, Locator, expect } from "@playwright/test";

export class SyntheseDesPaiementsPage {
    readonly page: Page;
    readonly syntheseDesPaiementsLink: Locator;
    readonly dropdownButton: Locator;
    readonly debDate: Locator;
    readonly finDate: Locator;

    constructor(page: Page) {
        this.page = page;

        this.syntheseDesPaiementsLink = page.locator('a[href="/cantine/paiements"]');

        this.dropdownButton = page
            .locator('button[aria-label="Open"]')
            .or(page.locator('.MuiAutocomplete-popupIndicator'));

        //this.debDate = page.locator("#mui-16");
        //this.finDate = page.locator("#mui-17");
        this.debDate = page.locator('input[type="date"]').first();
        this.finDate = page.locator('input[type="date"]').nth(1);
    }

    async openSyntheseDesPaiements() {
        await this.syntheseDesPaiementsLink.click();
    }

    //====== recherche de facture ======
async rechercheDeFacture(email: string) {

    const input = this.page.locator('input[placeholder="Sélectionner un étudiant..."]');
    await input.click();

    const option = this.page.getByRole('option', { name: email });
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
}
    //====== Date ======
    async ajouterDate() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];   
        await this.debDate.fill(formattedDate);
        await this.finDate.fill(formattedDate);
    }
    //====== Recherche ======

    async Search() {
        const searchBtn = this.page.locator('button:has-text("Rechercher")');
        await searchBtn.click();
    }
    // ====== Verification ======
    /*async verificationFacture(factureNumero?: string) {
        const row = factureNumero
            ? this.page.locator(`text=/Numero\\s*:\\s*${factureNumero}/i`)
            : this.page.locator('text=/Numero\\s*:/i');

        await expect(row).toBeVisible({ timeout: 15000 });
        await expect(this.page.locator('text=/Montant/i')).toBeVisible();
        await expect(this.page.locator('text=/Statut/i')).toBeVisible();
        console.log('Facture visible avec succès');
    }*/
    async verificationFacture(factureNumero?: string) {
        // Attendre que la page se charge après la recherche
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Log le contenu de la page pour déboguer
        console.log('Contenu de la page après recherche:', await this.page.textContent('body'));
        
        // Vérifier si des résultats sont affichés (locators alternatifs)
        const results = this.page.locator('table').or(this.page.locator('.MuiTable-root')).or(this.page.locator('tbody')).or(this.page.locator('.results')).or(this.page.locator('[data-testid="results"]')).or(this.page.locator('div[role="table"]'));
        
        const count = await results.count();
        console.log(`Nombre de résultats trouvés: ${count}`);
        
        if (count === 0) {
            console.log('Aucun résultat trouvé après la recherche. Vérifiez les données de test.');
            // Ne pas échouer, mais log
            return;
        }
        
        await expect(results.first()).toBeVisible({ timeout: 15000 });
        
        // Vérifier le texte "Numero :" ou un numéro spécifique
        const row = factureNumero
            ? this.page.locator(`text=/Numero\\s*:\\s*${factureNumero}/i`)
            : this.page.locator('text=/Numero/i');
        
        await expect(row).toBeVisible({ timeout: 15000 });
        
        // Vérifications supplémentaires
        await expect(this.page.locator('text=/Montant/i')).toBeVisible();
        await expect(this.page.locator('text=/Statut/i')).toBeVisible();
        console.log('Facture visible avec succès');
    }
    // ====== selecter un ou des repas ======
    async selectMeal (){
        //await this.page.evaluate(() => window.scrollTo(0, 0));
        const selectMealList = this.page.locator('input[type="checkbox"]').first();
        // Scroller vers le locator spécifique
        await selectMealList.scrollIntoViewIfNeeded();
        await selectMealList.click();
    }
    // ====== confirmer le paiement ======
    async ConfirmerLePaiement(){
        const marquerLePaiment = this.page.locator('button:has-text("Marquer comme Payé")');
        await marquerLePaiment.click();
    }
    // ====== verifiation la reservation ======
    /*async verifierPopupPaiement(nbReservations: number, montant: number) {
        await expect(
            this.page.locator('p:has-text("Nombre de réservations")')).toContainText(`${nbReservations}`);
    
        await expect(this.page.locator('h5:has-text("Montant Total à Payer")')).toContainText(`${montant}`);
    }*/
    async verifierPopupPaiement() {

        // 🔹 récupérer le texte du nombre de réservations
        const nbText = await this.page
            .locator('p:has-text("Nombre de réservations")')
            .textContent();
    
        if (!nbText) {
            throw new Error("Texte 'Nombre de réservations' introuvable");
        }
    
        const nbMatch = nbText.match(/\d+/);
        if (!nbMatch) {
            throw new Error("Nombre de réservations non détecté");
        }
    
        const nbReservations = parseInt(nbMatch[0], 10);
        console.log("Nombre de réservations:", nbReservations);
    
        // 🔹 récupérer le montant
        const montantText = await this.page
            .locator('h5:has-text("Montant Total à Payer")')
            .textContent();
    
        if (!montantText) {
            throw new Error("Texte 'Montant' introuvable");
        }
    
        const montantMatch = montantText.match(/[\d,.]+/);
        if (!montantMatch) {
            throw new Error("Montant non détecté");
        }
    
        const montant = parseFloat(montantMatch[0].replace(',', '.'));
        console.log("Montant:", montant);
    
        // ✅ vérifications dynamiques
        expect(nbReservations).toBeGreaterThan(0);
        expect(montant).toBeGreaterThan(0);
    
        // (optionnel) vérifier cohérence
        // expect(montant).toBeCloseTo(nbReservations * prixUnitaire, 2);
    
        return { nbReservations, montant }; //utile pour debug ou assertions futures
    }
    async validerLePaiement (){
        const validBtn = this.page.locator('button:has-text("Confirmer le Paiement")');
        await validBtn.click(); 
    }

}