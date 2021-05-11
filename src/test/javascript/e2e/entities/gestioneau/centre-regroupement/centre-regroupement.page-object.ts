import { element, by, ElementFinder } from 'protractor';

export class CentreRegroupementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-centre-regroupement div table .btn-danger'));
  title = element.all(by.css('jhi-centre-regroupement div h2#page-heading span')).first();
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

export class CentreRegroupementUpdatePage {
  pageTitle = element(by.id('jhi-centre-regroupement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  libelleInput = element(by.id('field_libelle'));
  responsableInput = element(by.id('field_responsable'));
  contactInput = element(by.id('field_contact'));

  directionregionaleSelect = element(by.id('field_directionregionale'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setResponsableInput(responsable: string): Promise<void> {
    await this.responsableInput.sendKeys(responsable);
  }

  async getResponsableInput(): Promise<string> {
    return await this.responsableInput.getAttribute('value');
  }

  async setContactInput(contact: string): Promise<void> {
    await this.contactInput.sendKeys(contact);
  }

  async getContactInput(): Promise<string> {
    return await this.contactInput.getAttribute('value');
  }

  async directionregionaleSelectLastOption(): Promise<void> {
    await this.directionregionaleSelect.all(by.tagName('option')).last().click();
  }

  async directionregionaleSelectOption(option: string): Promise<void> {
    await this.directionregionaleSelect.sendKeys(option);
  }

  getDirectionregionaleSelect(): ElementFinder {
    return this.directionregionaleSelect;
  }

  async getDirectionregionaleSelectedOption(): Promise<string> {
    return await this.directionregionaleSelect.element(by.css('option:checked')).getText();
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

export class CentreRegroupementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-centreRegroupement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-centreRegroupement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
