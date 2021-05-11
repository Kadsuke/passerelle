import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NatureOuvrageComponentsPage, NatureOuvrageDeleteDialog, NatureOuvrageUpdatePage } from './nature-ouvrage.page-object';

const expect = chai.expect;

describe('NatureOuvrage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let natureOuvrageComponentsPage: NatureOuvrageComponentsPage;
  let natureOuvrageUpdatePage: NatureOuvrageUpdatePage;
  let natureOuvrageDeleteDialog: NatureOuvrageDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NatureOuvrages', async () => {
    await navBarPage.goToEntity('nature-ouvrage');
    natureOuvrageComponentsPage = new NatureOuvrageComponentsPage();
    await browser.wait(ec.visibilityOf(natureOuvrageComponentsPage.title), 5000);
    expect(await natureOuvrageComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauNatureOuvrage.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(natureOuvrageComponentsPage.entities), ec.visibilityOf(natureOuvrageComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NatureOuvrage page', async () => {
    await natureOuvrageComponentsPage.clickOnCreateButton();
    natureOuvrageUpdatePage = new NatureOuvrageUpdatePage();
    expect(await natureOuvrageUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauNatureOuvrage.home.createOrEditLabel');
    await natureOuvrageUpdatePage.cancel();
  });

  it('should create and save NatureOuvrages', async () => {
    const nbButtonsBeforeCreate = await natureOuvrageComponentsPage.countDeleteButtons();

    await natureOuvrageComponentsPage.clickOnCreateButton();

    await promise.all([natureOuvrageUpdatePage.setLibelleInput('libelle')]);

    expect(await natureOuvrageUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await natureOuvrageUpdatePage.save();
    expect(await natureOuvrageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await natureOuvrageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NatureOuvrage', async () => {
    const nbButtonsBeforeDelete = await natureOuvrageComponentsPage.countDeleteButtons();
    await natureOuvrageComponentsPage.clickOnLastDeleteButton();

    natureOuvrageDeleteDialog = new NatureOuvrageDeleteDialog();
    expect(await natureOuvrageDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauNatureOuvrage.delete.question');
    await natureOuvrageDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(natureOuvrageComponentsPage.title), 5000);

    expect(await natureOuvrageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
