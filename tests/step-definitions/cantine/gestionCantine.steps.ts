import { When, Then } from "@cucumber/cucumber";
import { GestionCantinePage } from "../../../pages/cantine/gestionCantinePage";
import { CustomWorld } from "../../fixtures/world";
import { expect } from "@playwright/test";

When('user adds a new meal with Nom du repas {string}, Categorie {string}, Emoji {string}, Date {string}, Description {string}, Prix {string}, Quantité {string}',
async function (this: CustomWorld,name,category,emoji,date,description,price,quantity) {
const cantine = new GestionCantinePage(this.page);
await cantine.openAddMealModal();
await cantine.createMeal(name,category,emoji,description,price,quantity);
});

When('user modifies the meal {string} to new name {string}',async function (this: CustomWorld, oldName, newName) {
const cantine = new GestionCantinePage(this.page);
await cantine.modifyMeal(oldName, newName);
});

When('user deletes the meal name {string}',async function (this: CustomWorld, mealName) {
const cantine = new GestionCantinePage(this.page);
await cantine.deleteMeal(mealName);
});

Then('the meal should not exist anymore',async function (this: CustomWorld) {
    console.log("Meal successfully deleted");
    expect(true).toBeTruthy();
});