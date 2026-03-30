import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';
import { CantinePage } from '../../pages/cantine/cantinePage';
import { GestionCantinePage } from '../../pages/cantine/gestionCantinePage';
import { SyntheseDesPaiementsPage } from '../../pages/cantine/syntheseDesPaiementsPage';
import { GestionDesBusPage } from '../../pages/bus/gestionDesBusPage';
import { BusEtChauffeursPage } from '../../pages/bus/busEtChauffeursPage';
import { BusPage } from '../../pages/bus/busPage';
import { GestionDesTrajetsPage } from '../../pages/bus/gestionDesTrajetsPage';

export class TestContext {
    page!: Page;
    loginPage!: LoginPage;
    cantinePage!: CantinePage;
    gestionCantinePage!: GestionCantinePage;
    syntheseDesPaiementsPage!: SyntheseDesPaiementsPage;
    gestionDesBusPage!: GestionDesBusPage;
    busEtChauffeursPage!: BusEtChauffeursPage;
    busPage!: BusPage;
    gestionDesTrajetsPage!: GestionDesTrajetsPage;

}