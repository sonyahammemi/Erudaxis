import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '../../../pages/login/loginPage';
import { CustomWorld } from '../../fixtures/world';
import { validUser } from '../../test-data/users';
import { URLS } from '../../../config/urls';

// Forcer un timeout de 30s pour les steps dans ce fichier
setDefaultTimeout(30000);

Given('I open login page', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);

  console.log('Navigating to login page...');
  await this.loginPage.open();   
  console.log('Navigation successful');
});

When('I login with valid credentials', async function (this: CustomWorld) {
  await this.loginPage.login(validUser.email, validUser.password);
});

Then('I should be redirected to dashboard', async function (this: CustomWorld) {
  console.log('Current URL before assertion:', this.page.url()); 
  await this.loginPage.assertLoginSuccess();
  console.log('Login success asserted');
});