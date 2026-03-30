import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../fixtures/world";

Given('I open the login page', async function (this: CustomWorld) {
  await this.loginOutlinePage.open();
});

When('I login with email {string} and password {string}',
  async function (this: CustomWorld, email: string, password: string) {

    // Données de test
    await this.attach(
      JSON.stringify({ email, password }, null, 2),
      'application/json'
    );

    // Screenshot AVANT
    const before = await this.page.screenshot({ fullPage: true });
    await this.attach(before, 'image/png');

    // Action
    this.loginResult = await this.loginOutlinePage.attemptLoginAndGetResult(email, password);

    // Screenshot APRÈS
    const after = await this.page.screenshot({ fullPage: true });
    await this.attach(after, 'image/png');

    // Résultat structuré
    await this.attach(
      JSON.stringify(this.loginResult, null, 2),
      'application/json'
    );
  }
);

Then('I should see an error message', async function (this: CustomWorld) {
  const result = this.loginResult;

  if (!result) throw new Error("Aucun résultat de login trouvé");

  if (result.hasErrorMessage) {
    await this.loginOutlinePage.assertErrorIsVisible();
  } else {
    const isInvalid = await this.loginOutlinePage.emailInput
      .evaluate((el: HTMLInputElement) => !el.validity.valid)
      .catch(() => false);

    if (!isInvalid) throw new Error("Aucune erreur détectée");
  }

  const screenshot = await this.page.screenshot({ fullPage: true });
  await this.attach(screenshot, 'image/png');
});

Then('I should not be redirected to dashboard',
  async function (this: CustomWorld) {
    const result = this.loginResult;

    if (!result) throw new Error("Aucun résultat de login trouvé");
    if (result.isRedirectedToDashboard) throw new Error("Redirection inattendue vers dashboard");

    await this.loginOutlinePage.assertNotRedirectedToDashboard();
    await this.attach(this.page.url(), 'text/plain');
  }
);
