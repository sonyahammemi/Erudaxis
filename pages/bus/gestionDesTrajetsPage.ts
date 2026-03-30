import { Page, Locator, expect } from "@playwright/test";

export class GestionDesTrajetsPage {
    readonly page: Page;
    readonly gestionDesTrajetsLink: Locator;
    readonly modal: Locator;
    readonly addTrajetBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.gestionDesTrajetsLink = page.locator('a[href="/gestion-bus/trajet"]', { hasText: 'Gestion Trajets' }).first();
        this.addTrajetBtn = page.locator('button:has-text("Ajouter un trajet")');
        this.modal = page.locator('div[role="dialog"]');
    }

    // Helper pour convertir la date
    private formatDate(dateString: string): string {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    async openGestionDesTrajets() {
        await this.gestionDesTrajetsLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.gestionDesTrajetsLink.click();
    }

    // ====== Ajouter un trajet ======
    async clickAddTrajet(date: string, time: string, departure: string, arrival: string, busNumber: string) {
        await this.addTrajetBtn.waitFor({ state: "visible", timeout: 10000 });
        await this.addTrajetBtn.click();
        await this.modal.waitFor({ state: "visible", timeout: 60000 });

        const formattedDate = this.formatDate(date);

        await this.modal.locator('input[name="date"]').evaluate((el, value) => {
            (el as HTMLInputElement).value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, formattedDate);

        await this.modal.locator('input[name="time"]').fill(time);
        await this.modal.locator('input[name="departure"]').fill(departure);
        await this.modal.locator('input[name="arrival"]').fill(arrival);
        
        const busSelect = this.modal.locator('#react-select-6-placeholder');
        await busSelect.click();
        const busInput = this.page.locator('input[id^="react-select"][id$="-input"]');
        await busInput.fill(busNumber);

        const busOption = this.page.locator('div[id^="react-select"][id*="-option"]', { hasText: busNumber }).first();
        await busOption.click();
        await this.modal.locator('button:has-text("Ajouter le trajet")').click();

        const okBtn = this.page.locator('.swal2-confirm');
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
        await okBtn.click();
        console.log(`Trajet ${busNumber} ajouté avec succès`);
    }
     //====== Ajouter un étudiant ======
    
        // autre vérification 
        /*const capacity = card.locator('h5');
        const before = await capacity.textContent();
        await ajouterBtn.click();
        await expect(capacity).not.toHaveText(before!);       
    }*/
    async addStudent(studentName: string, busNumber: string, className: string) {
        // 1. Carte du bus
        const card = this.page.locator('div.MuiPaper-root', { hasText: busNumber }).first();
        await card.waitFor({ state: 'visible', timeout: 10000 });
    
        // 2. Bouton Ajouter élèves
        const addStudentBtn = card.getByRole('button', { name: /Ajouter élèves/i }).first();
        await addStudentBtn.click();
    
        // 3. Rechercher la classe
        const searchClass = this.page.locator('input[placeholder="🔍 Rechercher une classe..."]');
        await searchClass.fill(className);
        await this.page.waitForTimeout(500);
    
        // 4. Sélectionner la classe
        const classeTitle = this.page.getByRole('heading', { name: className });
        await classeTitle.click();
        await this.page.waitForTimeout(500);
    
        // 5. Sélectionner un élève dans le modal actif -- OU selectionner tous(pas encore) 
        const addStudentModal = this.page.locator('div[role="dialog"]').filter({ hasText: 'Ajouter des élèves' }).first();
        const student = addStudentModal.locator('p.MuiTypography-root', { hasText: studentName }).first();
        await student.waitFor({ state: 'visible', timeout: 10000 });
        await student.click();
    
        // 6. Cliquer sur Ajouter
        const ajouterBtn = addStudentModal.locator('button', { hasText: /Ajouter \d+ élève/ });
        await ajouterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await ajouterBtn.click();
    
        // 7. Vérifier succès (popup Swal2)
        const successModal = this.page.locator('.swal2-popup');
        await expect(successModal.locator('#swal2-title')).toContainText(/succès/i);
        await successModal.locator('.swal2-confirm').click();
    
        console.log(`Élève ajouté au bus ${busNumber} depuis la classe ${className}`);
    
        // 8. Fermer le modal Ajouter élèves
        const closeBtn = addStudentModal.locator('button:has([data-testid="CloseIcon"])');
        await closeBtn.waitFor({ state: 'visible', timeout: 10000 });
        await closeBtn.click();
        console.log(`add Student ${studentName} to bus number ${busNumber} from class ${className} ajouté avec succès`);
    }

    // bouton menu 
    async MenuBtn(busNumber: string) {
        // Localiser la carte MuiPaper qui CONTIENT le busNumber
        const card = this.page.locator('div.MuiPaper-root').filter({ hasText: busNumber }).first();
        const menuBtn = card.locator('button svg[data-testid="MoreVertIcon"]').locator('xpath=..').first();
        await menuBtn.click();
    }

    // ====== modifier un trajet ======
    async modifyTrajetTime(busNumber: string, newTime: string) {
        // 1. Ouvrir le menu
        await this.MenuBtn(busNumber);
    
        // 2. Cliquer sur "Modifier"
        const modifierOption = this.page.locator('li:has(svg[data-testid="EditIcon"])',{ hasText: 'Modifier' });
        await modifierOption.waitFor({ state: 'visible', timeout: 10000 });
        await modifierOption.click();
    
        // 3. Attendre le modal
        await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    
        // 4. Localiser le champ time
        const timeInput = this.modal.locator('input[name="time"]');
        await timeInput.waitFor({ state: 'visible', timeout: 10000 });
        const [hh, mm] = newTime.split(':');
    
        // 5. Cliquer sur le début du champ (section HH)
        await timeInput.click();
        await this.page.waitForTimeout(300);
    
        // 6. Sélectionner HH et remplacer
        await this.page.keyboard.press('Home'); // aller au début
        await this.page.keyboard.press('ArrowLeft'); // s'assurer qu'on est sur HH
        await this.page.keyboard.type(hh); // taper les heures → passe auto à MM
        await this.page.waitForTimeout(200);
    
        // 7. Taper les minutes (on est déjà sur la section MM)
        await this.page.keyboard.type(mm);
        await this.page.waitForTimeout(300);
        console.log(`Time input value après saisie: ${await timeInput.inputValue()}`);
    
        // 8. Sauvegarder
        const modifierBtn = this.modal.locator('button:has-text("Modifier le trajet")');
        await modifierBtn.waitFor({ state: 'visible', timeout: 10000 });
        await modifierBtn.click();
    
        // 9. Vérifier succès
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
        await this.page.locator('.swal2-confirm').click();
        console.log(`Heure modifiée avec succès : ${newTime}`);
        console.log(`Trajet ${busNumber} modifié avec succès`);
    }

    // ====== Supprimer un trajet ======
    async deleteTrajet(busNumber: string) {
        // 1. Ouvrir le menu
        await this.MenuBtn(busNumber);
    
        // 2. Cliquer sur "Supprimer"
        const deleteOption = this.page.locator('li:has(svg[data-testid="DeleteIcon"])',{ hasText: 'Supprimer' });
        await deleteOption.waitFor({ state: 'visible', timeout: 10000 });
        await deleteOption.click();
    
        // 3. Confirmer via le bouton exact "Supprimer définitivement"
        const validDeleteBtn = this.page.locator('button.MuiButton-containedPrimary', {hasText: 'Supprimer définitivement'});
        await validDeleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await validDeleteBtn.click();
    
        // 4. Vérifier succès
        await expect(this.page.locator('#swal2-title')).toContainText(/succès/i);
        await this.page.locator('.swal2-confirm').click();
        console.log(`Trajet ${busNumber} supprimé avec succès`);
    }
}
