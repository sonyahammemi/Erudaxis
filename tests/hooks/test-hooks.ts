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
