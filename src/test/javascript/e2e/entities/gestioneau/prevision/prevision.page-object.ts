import { element, by, ElementFinder } from 'protractor';

export class PrevisionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prevision div table .btn-danger'));
  title = element.all(by.css('jhi-prevision div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PrevisionUpdatePage {
  pageTitle = element(by.id('jhi-prevision-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nbLatrineInput = element(by.id('field_nbLatrine'));
  nbPuisardInput = element(by.id('field_nbPuisard'));
  nbPublicInput = element(by.id('field_nbPublic'));
  nbScolaireInput = element(by.id('field_nbScolaire'));

  centreSelect = element(by.id('field_centre'));
  refanneeSelect = element(by.id('field_refannee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNbLatrineInput(nbLatrine: string): Promise<void> {
    await this.nbLatrineInput.sendKeys(nbLatrine);
  }

  async getNbLatrineInput(): Promise<string> {
    return await this.nbLatrineInput.getAttribute('value');
  }

  async setNbPuisardInput(nbPuisard: string): Promise<void> {
    await this.nbPuisardInput.sendKeys(nbPuisard);
  }

  async getNbPuisardInput(): Promise<string> {
    return await this.nbPuisardInput.getAttribute('value');
  }

  async setNbPublicInput(nbPublic: string): Promise<void> {
    await this.nbPublicInput.sendKeys(nbPublic);
  }

  async getNbPublicInput(): Promise<string> {
    return await this.nbPublicInput.getAttribute('value');
  }

  async setNbScolaireInput(nbScolaire: string): Promise<void> {
    await this.nbScolaireInput.sendKeys(nbScolaire);
  }

  async getNbScolaireInput(): Promise<string> {
    return await this.nbScolaireInput.getAttribute('value');
  }

  async centreSelectLastOption(): Promise<void> {
    await this.centreSelect.all(by.tagName('option')).last().click();
  }

  async centreSelectOption(option: string): Promise<void> {
    await this.centreSelect.sendKeys(option);
  }

  getCentreSelect(): ElementFinder {
    return this.centreSelect;
  }

  async getCentreSelectedOption(): Promise<string> {
    return await this.centreSelect.element(by.css('option:checked')).getText();
  }

  async refanneeSelectLastOption(): Promise<void> {
    await this.refanneeSelect.all(by.tagName('option')).last().click();
  }

  async refanneeSelectOption(option: string): Promise<void> {
    await this.refanneeSelect.sendKeys(option);
  }

  getRefanneeSelect(): ElementFinder {
    return this.refanneeSelect;
  }

  async getRefanneeSelectedOption(): Promise<string> {
    return await this.refanneeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PrevisionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prevision-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prevision'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
