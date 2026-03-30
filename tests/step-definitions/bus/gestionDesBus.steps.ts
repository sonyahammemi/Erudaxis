import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import { GestionDesBusPage } from '../../../pages/bus/gestionDesBusPage';
import { expect } from '@playwright/test';
import { URLS } from '../../../config/urls';



When('user opens the bus menu', async function () {
    const gestionDesBusPage = new GestionDesBusPage(this.page);
    await gestionDesBusPage.ouvrirGestionBus();
});

Then('user is redirected to gestion bus page', async function (this: CustomWorld){
    await expect(this.page).toHaveURL(new RegExp(URLS.GESTION_DES_BUS, 'i'));
});




