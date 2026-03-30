import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import { BusPage } from '../../../pages/bus/busPage';

// BUS
When('user clicks on {string}', async function (this:CustomWorld, string) {
    const busPage = new BusPage(this.page);
    await busPage.clickBusTab();
});
When('user adds a new bus with Numéro de Bus {string}, Numéro d\'Immatriculation {string}, Numéro de Carte Grise {string}, Numéro de Carte Carburant {string}, Type de Bus {string}, Capacite {string}, Chauffeur {string}', 
async function (this:CustomWorld, NumBus, NumImmatriculation, NumCarteGrise, NumCarteCarburant, TypeBus, Capacite, chauffeur) {
    const busPage = new BusPage(this.page);
    await busPage.clickAddBus(NumBus, NumImmatriculation, NumCarteGrise, NumCarteCarburant, TypeBus, Capacite, chauffeur);
});


When('user modifies the bus number {string} new driver to {string}', async function (this:CustomWorld, busNumber: string, newdriver: string) {
    const busPage = new BusPage(this.page);
    await busPage.EditBus(busNumber, newdriver);

    //await busPage.openDriverDropdownOnly(busNumber);
    //await busPage.selectDriverInModal(driverName);
});
Then('user deletes the bus {string}', async function (this:CustomWorld, busNumber: string) {
    const busPage = new BusPage(this.page);
    await busPage.DeleteBus(busNumber);
});
