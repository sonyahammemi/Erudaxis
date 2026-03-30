import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../../tests/utils/logger";
import { waitForElement } from "../../tests/utils/wait-helper";
import { takeScreenshot } from "../../tests/utils/screenshot-helper";

export class GestionCantinePage {

  readonly page: Page;
  readonly modal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('div[role="dialog"]');
  }

  // ====== NAVIGATION ======

  async openGestionCantine() {
    Logger.info("Ouverture de la page Gestion Cantine");

    const cantineBtn = this.page.locator('a[href="/cantine/gestion-cantine"]');

    await waitForElement(cantineBtn);
    await cantineBtn.click();

    await takeScreenshot(this.page, "openGestionCantine");
  }

  // ====== ADD MEAL ======

  async openAddMealModal() {

    Logger.info("Ouverture du modal Ajouter repas");

    const addBtn = this.page.locator('#add');

    await waitForElement(addBtn);
    await addBtn.click();

    await waitForElement(this.modal);
  }

  async createMeal(
    name: string,
    category: string,
    emoji: string,
    description: string,
    price: string,
    quantity: string
  ) {

    Logger.info(`Création du repas : ${name}`);

    // NOM
    const nameInput = this.modal.locator('input[placeholder="Ex: Pizza Margherita"]');
    await waitForElement(nameInput);
    await nameInput.fill(name);

    // CATEGORIE
    Logger.info("Sélection de la catégorie");

    const categorySelect = this.modal.getByText("Déjeuner");
    await waitForElement(categorySelect);
    await categorySelect.click();

    const listbox = this.page.locator('ul[role="listbox"]');
    await waitForElement(listbox);

    const categoryOption = this.page.locator(`li[data-value="${category}"]`);
    await waitForElement(categoryOption);
    await categoryOption.click();

    // EMOJI
    await this.selectEmoji(emoji);

    // DATE
    await this.fillFutureDate();

    // DESCRIPTION
    const descriptionInput = this.modal.locator('textarea[placeholder="Ex: Délicieuse pizza avec fromage et tomates"]');
    await waitForElement(descriptionInput);
    await descriptionInput.fill(description);

    // PRIX
    const priceInput = this.modal.locator('input[placeholder="0.00"]');
    await waitForElement(priceInput);
    await priceInput.fill(price);

    // QUANTITE
    const quantityInput = this.modal.locator('input[placeholder="100"]');
    await waitForElement(quantityInput);
    await quantityInput.fill(quantity);

    // CREER
    const createBtn = this.modal.getByRole('button', { name: /créer/i });
    await waitForElement(createBtn);
    await createBtn.click();

    await this.confirmPopup();

    Logger.info(`Repas créé : ${name}`);
  }

  // ====== OUVRIR MENU ======

  async openMealMenu(mealName: string) {

    Logger.info(`Ouverture du menu pour le repas : ${mealName}`);

    const mealCard = this.page.locator('.MuiCard-root', { hasText: mealName }).first();

    await waitForElement(mealCard);

    const menuBtn = mealCard.locator('button.MuiIconButton-root').first();

    await waitForElement(menuBtn);
    await menuBtn.click();

    const menu = this.page.locator('ul[role="menu"]');

    await waitForElement(menu);

    return menu;
  }

  // ====== MODIFY MEAL ======

  async modifyMeal(oldName: string, newName: string) {

    Logger.info(`Modification du repas ${oldName} -> ${newName}`);

    const menu = await this.openMealMenu(oldName);

    const modifyBtn = menu.getByText('Modifier');
    await waitForElement(modifyBtn);
    await modifyBtn.click();

    await waitForElement(this.modal);

    const nameInput = this.modal.locator('input[placeholder="Ex: Pizza Margherita"]');

    await waitForElement(nameInput);
    await nameInput.clear();
    await nameInput.fill(newName);

    const saveBtn = this.modal.getByRole('button', { name: /modifier/i });

    await waitForElement(saveBtn);
    await saveBtn.click();

    await this.confirmPopup();

    await expect(this.page.getByText(newName, { exact: true })).toBeVisible();

    Logger.info(`Repas modifié avec succès : ${newName}`);
  }

  // ====== DELETE MEAL ======

  async deleteMeal(mealName: string) {

    Logger.info(`Suppression du repas : ${mealName}`);

    const menu = await this.openMealMenu(mealName);

    const deleteBtn = menu.getByText('Supprimer');

    await waitForElement(deleteBtn);
    await deleteBtn.click();
    await this.confirmPopup();
    await expect(this.page.locator('.MuiCard-root', { hasText: mealName })).toHaveCount(0);

    Logger.info(`Repas supprimé : ${mealName}`);
  }

  // ====== HELPERS ======

  async selectMuiOption(value: string) {

    Logger.info(`Sélection option MUI : ${value}`);

    const combo = this.modal.locator('[role="combobox"]');

    await waitForElement(combo);
    await combo.click();

    const listbox = this.page.locator('ul[role="listbox"]');

    await waitForElement(listbox);

    const option = listbox.getByRole('option', { name: value, exact: true });

    await waitForElement(option);
    await option.click();
  }

  async selectEmoji(emoji: string) {

    Logger.info(`Sélection emoji : ${emoji}`);

    const emojiBtn = this.page.getByText("Cliquer pour choisir");

    await waitForElement(emojiBtn);
    await emojiBtn.click();

    const emojiOption = this.page.locator('button', { hasText: emoji });

    await waitForElement(emojiOption);
    await emojiOption.click();
  }

  // Générer une date automatique (J + 7)

  async fillFutureDate() {

    Logger.info("Remplissage de la date automatique");

    const dateInput = this.modal.locator('input[type="date"]');

    await waitForElement(dateInput);

    const futureDate = new Date();

    futureDate.setDate(futureDate.getDate() + 7);

    const dateString = futureDate.toISOString().split("T")[0];

    await dateInput.fill(dateString);
  }

  // confirmer popup

  async confirmPopup() {

    Logger.info("Confirmation du popup");

    const okBtn = this.page.locator('button.swal2-confirm');

    await waitForElement(okBtn);
    await okBtn.click();
  }

}