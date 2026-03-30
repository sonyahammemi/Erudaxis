import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import { BusEtChauffeursPage } from '../../../pages/bus/busEtChauffeursPage';

// ====== Navigation ======
When('user clicks on "Chauffeurs" button', async function (this: CustomWorld) {
    const chauffeurPage = new BusEtChauffeursPage(this.page);
    await chauffeurPage.clickChauffeursTab();
});

// ====== Ajouter un chauffeur ======
When('user adds a new chauffeur with Prénom {string}, Nom {string}, Email {string}, CIN {string}, Numéro de Téléphone {string}, Adresse {string}, Pays {string}, Ville {string}',
    async function (this: CustomWorld, prenom: string, nom: string, email: string, cin: string, telephone: string, adresse: string, pays: string, ville: string) {
        const chauffeurPage = new BusEtChauffeursPage(this.page);
        await chauffeurPage.cliquerAjouterChauffeur(prenom, nom, email, cin, telephone, adresse, pays, ville);
    }
);

// ====== Valider l'ajout ======
When('user validates the creation of chauffeur', async function (this: CustomWorld) {
    const chauffeurPage = new BusEtChauffeursPage(this.page);
    await chauffeurPage.validBoutton();
});

// ====== Modifier un chauffeur ======
When('user modifies the chauffeur name {string} to {string}',
    { timeout: 60 * 1000 },
    async function (this: CustomWorld, prenomActuel: string, nouveauPrenom: string) {
        const chauffeurPage = new BusEtChauffeursPage(this.page);
        await chauffeurPage.EditChauffeur(prenomActuel, nouveauPrenom);
    }
);

// ====== Supprimer un chauffeur ======
Then('user deletes the chauffeur {string}',
    async function (this: CustomWorld, nouveauPrenom: string) {
        const chauffeurPage = new BusEtChauffeursPage(this.page);
        await chauffeurPage.DeleteChauffeur(nouveauPrenom);
    }
);

