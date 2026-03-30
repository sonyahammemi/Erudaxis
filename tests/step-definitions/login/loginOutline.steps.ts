/*import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../fixtures/world";
import { attachment, step } from "allure-js-commons";
import { LoginOutlinePage } from "../../../pages/login/loginOutlinePage";



When('I login with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
    await step(`Login avec email="${email}" password="${password}"`, async () => {

        await attachment("données de test",JSON.stringify({ email, password }, null, 2),
        "application/json"
        );
        //  Screenshot AVANT action
        const before = await this.page.screenshot({ fullPage: true });
        await attachment("avant soumission", before, "image/png");
        //  Stocker le résultat dans le World
        this.loginResult = await this.loginOutlinePage.attemptLoginAndGetResult(email, password);
          //  Screenshot APRÈS action
        const after = await this.page.screenshot({ fullPage: true });
        await attachment("après soumission", after, "image/png");
        await attachment("résultat de la tentative",JSON.stringify(this.loginResult, null, 2),
            "application/json");
        this.log(`[INFO] Résultat: ${JSON.stringify(this.loginResult)}`);
        });
});
Then('I should see an error message', async function (this: CustomWorld) {
    await step("Vérifier message d'erreur", async () => {
        const result = this.loginResult;
        if (!result) {
            throw new Error("Aucun résultat de login trouvé");
        }
        // Cas 1 : erreur backend (#error-alert)
        if (result.hasErrorMessage) {
            await this.loginOutlinePage.assertErrorIsVisible();
        }
        // Cas 2 : validation HTML5 (email invalide)
        else {
            const isInvalid = await this.loginOutlinePage.emailInput.evaluate(
            (el: HTMLInputElement) => !el.validity.valid).catch(() => false);
            if (!isInvalid) {
                throw new Error("Aucune erreur détectée (ni backend ni HTML5)");
            }
        }
        const screenshot = await this.page.screenshot({ fullPage: true });
        await attachment("erreur affichée", screenshot, "image/png");
    });
});
Then('I should not be redirected to dashboard', async function (this: CustomWorld) {
    await step("Vérifier absence de redirection", async () => {
        const result = this.loginResult;
        if (!result) {
            throw new Error("Aucun résultat de login trouvé");
        }
        if (result.isRedirectedToDashboard) {
            throw new Error("Redirection inattendue vers dashboard");
        }
        await this.loginOutlinePage.assertNotRedirectedToDashboard();
        await attachment("url finale", this.page.url(), "text/plain");
    });
});
*/
/*
import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../fixtures/world";
//import { allure } from "allure-cucumberjs";
//import * as allure from "allure-js-commons";
import { LoginOutlinePage } from "../../../pages/login/loginOutlinePage";

import { attachment, step } from "allure-js-commons";


When('I login with email {string} and password {string}',async function (this: CustomWorld, email: string, password: string) {
    await allure.step(`Login avec email="${email}"`, async () => {
      await allure.attachment(
        "données de test",
        JSON.stringify({ email, password }, null, 2),
        "application/json"
      );

      // Screenshot AVANT
      const before = await this.page.screenshot({ fullPage: true });
      await allure.attachment("avant soumission", before, "image/png");

      // Action
      this.loginResult = await this.loginOutlinePage.attemptLoginAndGetResult(email, password);

      // Screenshot APRÈS
      const after = await this.page.screenshot({ fullPage: true });
      await allure.attachment("après soumission", after, "image/png");

      await allure.attachment(
        "résultat de la tentative",
        JSON.stringify(this.loginResult, null, 2),
        "application/json"
      );

      this.log(`[INFO] Résultat: ${JSON.stringify(this.loginResult)}`);
    });
  }
);


Then('I should see an error message', async function (this: CustomWorld) {

  await allure.step("Vérifier message d'erreur", async () => {

    const result = this.loginResult;

    if (!result) {
      throw new Error("Aucun résultat de login trouvé");
    }

    if (result.hasErrorMessage) {
      await this.loginOutlinePage.assertErrorIsVisible();
    } else {
      const isInvalid = await this.loginOutlinePage.emailInput.evaluate(
        (el: HTMLInputElement) => !el.validity.valid
      ).catch(() => false);

      if (!isInvalid) {
        throw new Error("Aucune erreur détectée");
      }
    }

    const screenshot = await this.page.screenshot({ fullPage: true });
    await allure.attachment("erreur affichée", screenshot, "image/png");
  });
});



Then(
  'I should not be redirected to dashboard',
  async function (this: CustomWorld) {

    await allure.step("Vérifier absence de redirection", async () => {

      const result = this.loginResult;

      if (!result) {
        throw new Error("Aucun résultat de login trouvé");
      }

      if (result.isRedirectedToDashboard) {
        throw new Error("Redirection inattendue vers dashboard");
      }

      await this.loginOutlinePage.assertNotRedirectedToDashboard();

      await allure.attachment(
        "url finale",
        this.page.url(),
        "text/plain"
      );
    });
  }
);*/


// tests/step-definitions/login/loginOutline.steps.ts
// tests/step-definitions/login/loginOutline.steps.ts
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