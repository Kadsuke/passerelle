import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ParcelleComponentsPage, ParcelleDeleteDialog, ParcelleUpdatePage } from './parcelle.page-object';

const expect = chai.expect;

describe('Parcelle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parcelleComponentsPage: ParcelleComponentsPage;
  let parcelleUpdatePage: ParcelleUpdatePage;
  let parcelleDeleteDialog: ParcelleDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parcelles', async () => {
    await navBarPage.goToEntity('parcelle');
    parcelleComponentsPage = new ParcelleComponentsPage();
    await browser.wait(ec.visibilityOf(parcelleComponentsPage.title), 5000);
    expect(await parcelleComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauParcelle.home.title');
    await browser.wait(ec.or(ec.visibilityOf(parcelleComponentsPage.entities), ec.visibilityOf(parcelleComponentsPage.noResult)), 1000);
  });

  it('should load create Parcelle page', async () => {
    await parcelleComponentsPage.clickOnCreateButton();
    parcelleUpdatePage = new ParcelleUpdatePage();
    expect(await parcelleUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauParcelle.home.createOrEditLabel');
    await parcelleUpdatePage.cancel();
  });

  it('should create and save Parcelles', async () => {
    const nbButtonsBeforeCreate = await parcelleComponentsPage.countDeleteButtons();

    await parcelleComponentsPage.clickOnCreateButton();

    await promise.all([parcelleUpdatePage.setLibelleInput('libelle'), parcelleUpdatePage.lotSelectLastOption()]);

    expect(await parcelleUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await parcelleUpdatePage.save();
    expect(await parcelleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parcelleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parcelle', async () => {
    const nbButtonsBeforeDelete = await parcelleComponentsPage.countDeleteButtons();
    await parcelleComponentsPage.clickOnLastDeleteButton();

    parcelleDeleteDialog = new ParcelleDeleteDialog();
    expect(await parcelleDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauParcelle.delete.question');
    await parcelleDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(parcelleComponentsPage.title), 5000);

    expect(await parcelleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
