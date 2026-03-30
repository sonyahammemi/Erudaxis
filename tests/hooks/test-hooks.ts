/*import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';
import { LoginPage } from '../../pages/login/loginPage';
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';

Before(async function (this: CustomWorld) {
  // Créer une nouvelle page pour chaque scénario
  this.page = await (global as any).browser.newPage();
  // Initialiser les instances de pages
  this.loginPage = new LoginPage(this.page);
  this.cantinePage = new CantinePage(this.page);
  this.gestionCantinePage = new GestionCantinePage(this.page);
  this.syntheseDesPaiementsPage = new SyntheseDesPaiementsPage(this.page);
  this.gestionDesBusPage = new GestionDesBusPage(this.page);
  this.busEtChauffeursPage = new BusEtChauffeursPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  // Vérifier si scenario.result existe et si le status est 'FAILED'
  if (scenario.result && scenario.result.status === 'FAILED') {
    try {
      await this.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
    } catch (error) {
      console.log('Screenshot failed:', error);
    }
  }
  // Ne fermez pas la page ici – laissez AfterAll gérer
});*/

/*
import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "../fixtures/world";
import { LoginPage } from "../../pages/login/loginPage";
import { LoginOutlinePage } from "../../pages/login/loginOutlinePage";
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // Instanciation des pages
  this.loginPage = new LoginPage(this.page);
  this.loginOutlinePage = new LoginOutlinePage(this.page); 
  this.cantinePage = new CantinePage(this.page);
  this.gestionCantinePage = new GestionCantinePage(this.page);
  this.syntheseDesPaiementsPage = new SyntheseDesPaiementsPage(this.page);
  this.gestionDesBusPage = new GestionDesBusPage(this.page);
  this.busEtChauffeursPage = new BusEtChauffeursPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.context?.close();
  await this.browser?.close();
});*/
// pour corriger loginOutline 
/*
import { Before, After, AfterStep, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
//import { allure } from "allure-cucumberjs"; // ✅ reporter officiel Allure Cucumber 2
import { AllureRuntime, InMemoryAllureWriter } from 'allure-js-commons';
import { CucumberJSAllureFormatter } from '@shelex/cucumberjs-allure2';

import { CustomWorld } from "../fixtures/world";
import { LoginPage } from "../../pages/login/loginPage";
import { LoginOutlinePage } from "../../pages/login/loginOutlinePage";
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';

// ⏱ Timeout global
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld, scenario) {
  // 🚀 Lancement navigateur
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // 📄 Initialisation des pages
  this.loginPage = new LoginPage(this.page);
  this.loginOutlinePage = new LoginOutlinePage(this.page);
  this.cantinePage = new CantinePage(this.page);
  this.gestionCantinePage = new GestionCantinePage(this.page);
  this.syntheseDesPaiementsPage = new SyntheseDesPaiementsPage(this.page);
  this.gestionDesBusPage = new GestionDesBusPage(this.page);
  this.busEtChauffeursPage = new BusEtChauffeursPage(this.page);

  // ✅ Allure labels
  allure.label("layer", "e2e");
  allure.feature(scenario.pickle.name);
  allure.severity("critical");
});

// 📸 Screenshot automatique après chaque step
AfterStep(async function (this: CustomWorld, step) {
  try {
    const screenshot = await this.page.screenshot({ fullPage: true });
    allure.attachment(`Step: ${step.pickleStep.text}`, screenshot, "image/png");
  } catch (err) {
    console.log("Erreur screenshot AfterStep:", err);
  }
});

// ❌ Screenshot en cas d'échec + fermeture navigateur
After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === "FAILED") {
      const screenshot = await this.page.screenshot({ fullPage: true });
      allure.attachment("Failure Screenshot", screenshot, "image/png");
    }
  } catch (err) {
    console.log("Erreur screenshot After:", err);
  }

  await this.context?.close();
  await this.browser?.close();
});*/

// tests/hooks/test-hooks.ts
import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../fixtures/world";
import { LoginPage } from "../../pages/login/loginPage";
import { LoginOutlinePage } from "../../pages/login/loginOutlinePage";
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await (require('@playwright/test').chromium).launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.loginPage          = new LoginPage(this.page);
  this.loginOutlinePage   = new LoginOutlinePage(this.page);
  this.cantinePage        = new CantinePage(this.page);
  this.gestionCantinePage = new GestionCantinePage(this.page);
  this.syntheseDesPaiementsPage = new SyntheseDesPaiementsPage(this.page);
  this.gestionDesBusPage  = new GestionDesBusPage(this.page);
  this.busEtChauffeursPage = new BusEtChauffeursPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === "FAILED") {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");
    }
  } catch (err) {
    console.log("Erreur screenshot:", err);
  }
  await this.context?.close();
  await this.browser?.close();
});