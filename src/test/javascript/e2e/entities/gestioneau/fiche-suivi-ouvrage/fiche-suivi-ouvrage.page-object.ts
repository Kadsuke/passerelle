import { element, by, ElementFinder } from 'protractor';

export class FicheSuiviOuvrageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fiche-suivi-ouvrage div table .btn-danger'));
  title = element.all(by.css('jhi-fiche-suivi-ouvrage div h2#page-heading span')).first();
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

export class FicheSuiviOuvrageUpdatePage {
  pageTitle = element(by.id('jhi-fiche-suivi-ouvrage-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  prjAppuisInput = element(by.id('field_prjAppuis'));
  nomBenefInput = element(by.id('field_nomBenef'));
  prenomBenefInput = element(by.id('field_prenomBenef'));
  professionBenefInput = element(by.id('field_professionBenef'));
  nbUsagersInput = element(by.id('field_nbUsagers'));
  contactsInput = element(by.id('field_contacts'));
  longitudeInput = element(by.id('field_longitude'));
  latitudeInput = element(by.id('field_latitude'));
  dateRemiseDevisInput = element(by.id('field_dateRemiseDevis'));
  dateDebutTravauxInput = element(by.id('field_dateDebutTravaux'));
  dateFinTravauxInput = element(by.id('field_dateFinTravaux'));
  rueInput = element(by.id('field_rue'));
  porteInput = element(by.id('field_porte'));
  coutMenageInput = element(by.id('field_coutMenage'));
  subvOneaInput = element(by.id('field_subvOnea'));
  subvProjetInput = element(by.id('field_subvProjet'));
  autreSubvInput = element(by.id('field_autreSubv'));
  tolesInput = element(by.id('field_toles'));
  animateurInput = element(by.id('field_animateur'));
  superviseurInput = element(by.id('field_superviseur'));
  controleurInput = element(by.id('field_controleur'));

  parcelleSelect = element(by.id('field_parcelle'));
  previsionSelect = element(by.id('field_prevision'));
  natureouvrageSelect = element(by.id('field_natureouvrage'));
  typehabitationSelect = element(by.id('field_typehabitation'));
  sourceapprovepSelect = element(by.id('field_sourceapprovep'));
  modeevacuationeauuseeSelect = element(by.id('field_modeevacuationeauusee'));
  modeevacexcretaSelect = element(by.id('field_modeevacexcreta'));
  maconSelect = element(by.id('field_macon'));
  prefabricantSelect = element(by.id('field_prefabricant'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPrjAppuisInput(prjAppuis: string): Promise<void> {
    await this.prjAppuisInput.sendKeys(prjAppuis);
  }

  async getPrjAppuisInput(): Promise<string> {
    return await this.prjAppuisInput.getAttribute('value');
  }

  async setNomBenefInput(nomBenef: string): Promise<void> {
    await this.nomBenefInput.sendKeys(nomBenef);
  }

  async getNomBenefInput(): Promise<string> {
    return await this.nomBenefInput.getAttribute('value');
  }

  async setPrenomBenefInput(prenomBenef: string): Promise<void> {
    await this.prenomBenefInput.sendKeys(prenomBenef);
  }

  async getPrenomBenefInput(): Promise<string> {
    return await this.prenomBenefInput.getAttribute('value');
  }

  async setProfessionBenefInput(professionBenef: string): Promise<void> {
    await this.professionBenefInput.sendKeys(professionBenef);
  }

  async getProfessionBenefInput(): Promise<string> {
    return await this.professionBenefInput.getAttribute('value');
  }

  async setNbUsagersInput(nbUsagers: string): Promise<void> {
    await this.nbUsagersInput.sendKeys(nbUsagers);
  }

  async getNbUsagersInput(): Promise<string> {
    return await this.nbUsagersInput.getAttribute('value');
  }

  async setContactsInput(contacts: string): Promise<void> {
    await this.contactsInput.sendKeys(contacts);
  }

  async getContactsInput(): Promise<string> {
    return await this.contactsInput.getAttribute('value');
  }

  async setLongitudeInput(longitude: string): Promise<void> {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput(): Promise<string> {
    return await this.longitudeInput.getAttribute('value');
  }

  async setLatitudeInput(latitude: string): Promise<void> {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput(): Promise<string> {
    return await this.latitudeInput.getAttribute('value');
  }

  async setDateRemiseDevisInput(dateRemiseDevis: string): Promise<void> {
    await this.dateRemiseDevisInput.sendKeys(dateRemiseDevis);
  }

  async getDateRemiseDevisInput(): Promise<string> {
    return await this.dateRemiseDevisInput.getAttribute('value');
  }

  async setDateDebutTravauxInput(dateDebutTravaux: string): Promise<void> {
    await this.dateDebutTravauxInput.sendKeys(dateDebutTravaux);
  }

  async getDateDebutTravauxInput(): Promise<string> {
    return await this.dateDebutTravauxInput.getAttribute('value');
  }

  async setDateFinTravauxInput(dateFinTravaux: string): Promise<void> {
    await this.dateFinTravauxInput.sendKeys(dateFinTravaux);
  }

  async getDateFinTravauxInput(): Promise<string> {
    return await this.dateFinTravauxInput.getAttribute('value');
  }

  async setRueInput(rue: string): Promise<void> {
    await this.rueInput.sendKeys(rue);
  }

  async getRueInput(): Promise<string> {
    return await this.rueInput.getAttribute('value');
  }

  async setPorteInput(porte: string): Promise<void> {
    await this.porteInput.sendKeys(porte);
  }

  async getPorteInput(): Promise<string> {
    return await this.porteInput.getAttribute('value');
  }

  async setCoutMenageInput(coutMenage: string): Promise<void> {
    await this.coutMenageInput.sendKeys(coutMenage);
  }

  async getCoutMenageInput(): Promise<string> {
    return await this.coutMenageInput.getAttribute('value');
  }

  async setSubvOneaInput(subvOnea: string): Promise<void> {
    await this.subvOneaInput.sendKeys(subvOnea);
  }

  async getSubvOneaInput(): Promise<string> {
    return await this.subvOneaInput.getAttribute('value');
  }

  async setSubvProjetInput(subvProjet: string): Promise<void> {
    await this.subvProjetInput.sendKeys(subvProjet);
  }

  async getSubvProjetInput(): Promise<string> {
    return await this.subvProjetInput.getAttribute('value');
  }

  async setAutreSubvInput(autreSubv: string): Promise<void> {
    await this.autreSubvInput.sendKeys(autreSubv);
  }

  async getAutreSubvInput(): Promise<string> {
    return await this.autreSubvInput.getAttribute('value');
  }

  async setTolesInput(toles: string): Promise<void> {
    await this.tolesInput.sendKeys(toles);
  }

  async getTolesInput(): Promise<string> {
    return await this.tolesInput.getAttribute('value');
  }

  async setAnimateurInput(animateur: string): Promise<void> {
    await this.animateurInput.sendKeys(animateur);
  }

  async getAnimateurInput(): Promise<string> {
    return await this.animateurInput.getAttribute('value');
  }

  async setSuperviseurInput(superviseur: string): Promise<void> {
    await this.superviseurInput.sendKeys(superviseur);
  }

  async getSuperviseurInput(): Promise<string> {
    return await this.superviseurInput.getAttribute('value');
  }

  async setControleurInput(controleur: string): Promise<void> {
    await this.controleurInput.sendKeys(controleur);
  }

  async getControleurInput(): Promise<string> {
    return await this.controleurInput.getAttribute('value');
  }

  async parcelleSelectLastOption(): Promise<void> {
    await this.parcelleSelect.all(by.tagName('option')).last().click();
  }

  async parcelleSelectOption(option: string): Promise<void> {
    await this.parcelleSelect.sendKeys(option);
  }

  getParcelleSelect(): ElementFinder {
    return this.parcelleSelect;
  }

  async getParcelleSelectedOption(): Promise<string> {
    return await this.parcelleSelect.element(by.css('option:checked')).getText();
  }

  async previsionSelectLastOption(): Promise<void> {
    await this.previsionSelect.all(by.tagName('option')).last().click();
  }

  async previsionSelectOption(option: string): Promise<void> {
    await this.previsionSelect.sendKeys(option);
  }

  getPrevisionSelect(): ElementFinder {
    return this.previsionSelect;
  }

  async getPrevisionSelectedOption(): Promise<string> {
    return await this.previsionSelect.element(by.css('option:checked')).getText();
  }

  async natureouvrageSelectLastOption(): Promise<void> {
    await this.natureouvrageSelect.all(by.tagName('option')).last().click();
  }

  async natureouvrageSelectOption(option: string): Promise<void> {
    await this.natureouvrageSelect.sendKeys(option);
  }

  getNatureouvrageSelect(): ElementFinder {
    return this.natureouvrageSelect;
  }

  async getNatureouvrageSelectedOption(): Promise<string> {
    return await this.natureouvrageSelect.element(by.css('option:checked')).getText();
  }

  async typehabitationSelectLastOption(): Promise<void> {
    await this.typehabitationSelect.all(by.tagName('option')).last().click();
  }

  async typehabitationSelectOption(option: string): Promise<void> {
    await this.typehabitationSelect.sendKeys(option);
  }

  getTypehabitationSelect(): ElementFinder {
    return this.typehabitationSelect;
  }

  async getTypehabitationSelectedOption(): Promise<string> {
    return await this.typehabitationSelect.element(by.css('option:checked')).getText();
  }

  async sourceapprovepSelectLastOption(): Promise<void> {
    await this.sourceapprovepSelect.all(by.tagName('option')).last().click();
  }

  async sourceapprovepSelectOption(option: string): Promise<void> {
    await this.sourceapprovepSelect.sendKeys(option);
  }

  getSourceapprovepSelect(): ElementFinder {
    return this.sourceapprovepSelect;
  }

  async getSourceapprovepSelectedOption(): Promise<string> {
    return await this.sourceapprovepSelect.element(by.css('option:checked')).getText();
  }

  async modeevacuationeauuseeSelectLastOption(): Promise<void> {
    await this.modeevacuationeauuseeSelect.all(by.tagName('option')).last().click();
  }

  async modeevacuationeauuseeSelectOption(option: string): Promise<void> {
    await this.modeevacuationeauuseeSelect.sendKeys(option);
  }

  getModeevacuationeauuseeSelect(): ElementFinder {
    return this.modeevacuationeauuseeSelect;
  }

  async getModeevacuationeauuseeSelectedOption(): Promise<string> {
    return await this.modeevacuationeauuseeSelect.element(by.css('option:checked')).getText();
  }

  async modeevacexcretaSelectLastOption(): Promise<void> {
    await this.modeevacexcretaSelect.all(by.tagName('option')).last().click();
  }

  async modeevacexcretaSelectOption(option: string): Promise<void> {
    await this.modeevacexcretaSelect.sendKeys(option);
  }

  getModeevacexcretaSelect(): ElementFinder {
    return this.modeevacexcretaSelect;
  }

  async getModeevacexcretaSelectedOption(): Promise<string> {
    return await this.modeevacexcretaSelect.element(by.css('option:checked')).getText();
  }

  async maconSelectLastOption(): Promise<void> {
    await this.maconSelect.all(by.tagName('option')).last().click();
  }

  async maconSelectOption(option: string): Promise<void> {
    await this.maconSelect.sendKeys(option);
  }

  getMaconSelect(): ElementFinder {
    return this.maconSelect;
  }

  async getMaconSelectedOption(): Promise<string> {
    return await this.maconSelect.element(by.css('option:checked')).getText();
  }

  async prefabricantSelectLastOption(): Promise<void> {
    await this.prefabricantSelect.all(by.tagName('option')).last().click();
  }

  async prefabricantSelectOption(option: string): Promise<void> {
    await this.prefabricantSelect.sendKeys(option);
  }

  getPrefabricantSelect(): ElementFinder {
    return this.prefabricantSelect;
  }

  async getPrefabricantSelectedOption(): Promise<string> {
    return await this.prefabricantSelect.element(by.css('option:checked')).getText();
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

export class FicheSuiviOuvrageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ficheSuiviOuvrage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ficheSuiviOuvrage'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
