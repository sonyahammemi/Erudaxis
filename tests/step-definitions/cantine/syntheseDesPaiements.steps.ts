import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import { SyntheseDesPaiementsPage } from '../../../pages/cantine/syntheseDesPaiementsPage';
import { expect } from '@playwright/test';



When('user clicks on menu "Synthèse des paiements"', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.openSyntheseDesPaiements();
});

When('user searches for a bill', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.rechercheDeFacture('eleve test (elevetest@gmail.com)');
    await synthesePage.ajouterDate();
    await synthesePage.Search();
});

When('a bill is displayed', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.verificationFacture();
});

When('user selects a meal', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.selectMeal();
});

When('user clicks "Marquer comme payé"', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.ConfirmerLePaiement();
});

When('confirms the payment', async function (this: CustomWorld) {
    const synthesePage = new SyntheseDesPaiementsPage(this.page);
    await synthesePage.verifierPopupPaiement();  // Exemple : 1 réservation, 10dt
    await synthesePage.validerLePaiement();
});

Then('user is redirected to synthèse des paiements', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/cantine\/paiements/);
});