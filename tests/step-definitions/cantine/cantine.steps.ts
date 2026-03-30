import { Given, When, Then } from '@cucumber/cucumber';
import { CantinePage } from '../../../pages/cantine/cantinePage';
import { CustomWorld } from '../../fixtures/world';
import { URLS } from '../../../config/urls';
import { expect } from '@playwright/test'

When('user opens the cantine menu', async function (this: CustomWorld) {
    const cantinePage = new CantinePage(this.page);
    await cantinePage.ouvrirGestionCantine();
});

Then('user is redirected to gestion cantine page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(new RegExp(URLS.GESTION_CANTINE, 'i'));
});