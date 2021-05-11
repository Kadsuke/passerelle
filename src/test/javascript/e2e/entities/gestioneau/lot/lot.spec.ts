import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LotComponentsPage, LotDeleteDialog, LotUpdatePage } from './lot.page-object';

const expect = chai.expect;

describe('Lot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lotComponentsPage: LotComponentsPage;
  let lotUpdatePage: LotUpdatePage;
  let lotDeleteDialog: LotDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lots', async () => {
    await navBarPage.goToEntity('lot');
    lotComponentsPage = new LotComponentsPage();
    await browser.wait(ec.visibilityOf(lotComponentsPage.title), 5000);
    expect(await lotComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauLot.home.title');
    await browser.wait(ec.or(ec.visibilityOf(lotComponentsPage.entities), ec.visibilityOf(lotComponentsPage.noResult)), 1000);
  });

  it('should load create Lot page', async () => {
    await lotComponentsPage.clickOnCreateButton();
    lotUpdatePage = new LotUpdatePage();
    expect(await lotUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauLot.home.createOrEditLabel');
    await lotUpdatePage.cancel();
  });

  it('should create and save Lots', async () => {
    const nbButtonsBeforeCreate = await lotComponentsPage.countDeleteButtons();

    await lotComponentsPage.clickOnCreateButton();

    await promise.all([lotUpdatePage.setLibelleInput('libelle'), lotUpdatePage.sectionSelectLastOption()]);

    expect(await lotUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await lotUpdatePage.save();
    expect(await lotUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Lot', async () => {
    const nbButtonsBeforeDelete = await lotComponentsPage.countDeleteButtons();
    await lotComponentsPage.clickOnLastDeleteButton();

    lotDeleteDialog = new LotDeleteDialog();
    expect(await lotDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauLot.delete.question');
    await lotDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(lotComponentsPage.title), 5000);

    expect(await lotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
