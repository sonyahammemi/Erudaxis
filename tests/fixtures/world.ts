/*import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';  
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';
import { BusPage } from '../../pages/bus/busPage';
import { GestionDesTrajetsPage } from '../../pages/bus/gestionDesTrajetsPage';
import { LoginAttemptResult } from "../../pages/login/loginOutlinePage";
import { LoginOutlinePage } from "../../pages/login/loginOutlinePage";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  loginPage!: LoginPage;  
  cantinePage!: CantinePage;
  gestionCantinePage!: GestionCantinePage;
  syntheseDesPaiementsPage!: SyntheseDesPaiementsPage;
  gestionDesBusPage!: GestionDesBusPage;
  busEtChauffeursPage!: BusEtChauffeursPage;
  busPage!: BusPage;
  gestionDesTrajetsPage!: GestionDesTrajetsPage;
  loginOutlinePage!: LoginOutlinePage;
  constructor(options: any) {
    super(options);
  }
  loginResult?: LoginAttemptResult;
}

setWorldConstructor(CustomWorld);*/

import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";
import { LoginOutlinePage } from "../../pages/login/loginOutlinePage";
import { LoginAttemptResult } from "../../pages/login/loginOutlinePage";
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';
import { BusPage } from '../../pages/bus/busPage';
import { GestionDesTrajetsPage } from '../../pages/bus/gestionDesTrajetsPage';


export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Pages
  loginPage!: LoginPage;
  loginOutlinePage!: LoginOutlinePage; 
  cantinePage!: CantinePage;
  gestionCantinePage!: GestionCantinePage;
  syntheseDesPaiementsPage!: SyntheseDesPaiementsPage;
  gestionDesBusPage!: GestionDesBusPage;
  busEtChauffeursPage!: BusEtChauffeursPage;
  busPage!: BusPage;
  gestionDesTrajetsPage!: GestionDesTrajetsPage;

  // State partagé entre steps
  loginResult?: LoginAttemptResult; 

  constructor(options: IWorldOptions) {
    super(options);
  }

  
}

setWorldConstructor(CustomWorld);