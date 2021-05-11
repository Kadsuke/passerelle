import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TypeCommuneComponentsPage, TypeCommuneDeleteDialog, TypeCommuneUpdatePage } from './type-commune.page-object';

const expect = chai.expect;

describe('TypeCommune e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeCommuneComponentsPage: TypeCommuneComponentsPage;
  let typeCommuneUpdatePage: TypeCommuneUpdatePage;
  let typeCommuneDeleteDialog: TypeCommuneDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TypeCommunes', async () => {
    await navBarPage.goToEntity('type-commune');
    typeCommuneComponentsPage = new TypeCommuneComponentsPage();
    await browser.wait(ec.visibilityOf(typeCommuneComponentsPage.title), 5000);
    expect(await typeCommuneComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauTypeCommune.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(typeCommuneComponentsPage.entities), ec.visibilityOf(typeCommuneComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TypeCommune page', async () => {
    await typeCommuneComponentsPage.clickOnCreateButton();
    typeCommuneUpdatePage = new TypeCommuneUpdatePage();
    expect(await typeCommuneUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauTypeCommune.home.createOrEditLabel');
    await typeCommuneUpdatePage.cancel();
  });

  it('should create and save TypeCommunes', async () => {
    const nbButtonsBeforeCreate = await typeCommuneComponentsPage.countDeleteButtons();

    await typeCommuneComponentsPage.clickOnCreateButton();

    await promise.all([typeCommuneUpdatePage.setLibelleInput('libelle')]);

    expect(await typeCommuneUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await typeCommuneUpdatePage.save();
    expect(await typeCommuneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await typeCommuneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TypeCommune', async () => {
    const nbButtonsBeforeDelete = await typeCommuneComponentsPage.countDeleteButtons();
    await typeCommuneComponentsPage.clickOnLastDeleteButton();

    typeCommuneDeleteDialog = new TypeCommuneDeleteDialog();
    expect(await typeCommuneDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauTypeCommune.delete.question');
    await typeCommuneDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(typeCommuneComponentsPage.title), 5000);

    expect(await typeCommuneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
