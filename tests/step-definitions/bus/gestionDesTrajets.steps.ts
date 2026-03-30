import { When, Then, Given } from '@cucumber/cucumber';
import { GestionDesTrajetsPage } from '../../../pages/bus/gestionDesTrajetsPage';
import { expect } from '@playwright/test';

// ====== Navigation ======
When('user clicks on {string} for gestion des trajets', async function (string) {
    const gestionDesTrajetPage = new GestionDesTrajetsPage(this.page);
    await gestionDesTrajetPage.openGestionDesTrajets();
});

// ====== Ajouter un trajet ======
When('user adds a new route with date of the route {string}, heure de départ {string}, point de départ {string}, destination {string}, bus affecté {string} and click {string}', async function (date, time, departure, arrival, busNumber, btnText) {
    const gestionDesTrajetPage = new GestionDesTrajetsPage(this.page);
    await gestionDesTrajetPage.clickAddTrajet(date, time, departure, arrival, busNumber);
});
When('user adds a new student {string} to bus number {string} from class {string}', async function (studentName, busNumber, className) {
    const gestionDesTrajetPage = new GestionDesTrajetsPage(this.page);
    await gestionDesTrajetPage.addStudent(studentName, busNumber, className);
});

// ====== Modifier un trajet ======
When('user modifies the time {string} of the bus number {string}', async function (newTime, busNumber) {
    const gestionDesTrajetPage = new GestionDesTrajetsPage(this.page);
    await gestionDesTrajetPage.modifyTrajetTime(busNumber, newTime);
});

// ====== Supprimer un trajet ======
Then('user deletes the bus route {string}', async function (busNumber) {
    const gestionDesTrajetPage = new GestionDesTrajetsPage(this.page);
    await gestionDesTrajetPage.deleteTrajet(busNumber);
});
