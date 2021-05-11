import { element, by, ElementFinder } from 'protractor';

export class CentreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-centre div table .btn-danger'));
  title = element.all(by.css('jhi-centre div h2#page-heading span')).first();
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

export class CentreUpdatePage {
  pageTitle = element(by.id('jhi-centre-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  libelleInput = element(by.id('field_libelle'));
  responsableInput = element(by.id('field_responsable'));
  contactInput = element(by.id('field_contact'));

  centreregroupementSelect = element(by.id('field_centreregroupement'));

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

  async centreregroupementSelectLastOption(): Promise<void> {
    await this.centreregroupementSelect.all(by.tagName('option')).last().click();
  }

  async centreregroupementSelectOption(option: string): Promise<void> {
    await this.centreregroupementSelect.sendKeys(option);
  }

  getCentreregroupementSelect(): ElementFinder {
    return this.centreregroupementSelect;
  }

  async getCentreregroupementSelectedOption(): Promise<string> {
    return await this.centreregroupementSelect.element(by.css('option:checked')).getText();
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

export class CentreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-centre-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-centre'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
