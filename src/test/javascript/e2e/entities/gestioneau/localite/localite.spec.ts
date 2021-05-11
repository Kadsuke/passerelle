import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LocaliteComponentsPage, LocaliteDeleteDialog, LocaliteUpdatePage } from './localite.page-object';

const expect = chai.expect;

describe('Localite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localiteComponentsPage: LocaliteComponentsPage;
  let localiteUpdatePage: LocaliteUpdatePage;
  let localiteDeleteDialog: LocaliteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Localites', async () => {
    await navBarPage.goToEntity('localite');
    localiteComponentsPage = new LocaliteComponentsPage();
    await browser.wait(ec.visibilityOf(localiteComponentsPage.title), 5000);
    expect(await localiteComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauLocalite.home.title');
    await browser.wait(ec.or(ec.visibilityOf(localiteComponentsPage.entities), ec.visibilityOf(localiteComponentsPage.noResult)), 1000);
  });

  it('should load create Localite page', async () => {
    await localiteComponentsPage.clickOnCreateButton();
    localiteUpdatePage = new LocaliteUpdatePage();
    expect(await localiteUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauLocalite.home.createOrEditLabel');
    await localiteUpdatePage.cancel();
  });

  it('should create and save Localites', async () => {
    const nbButtonsBeforeCreate = await localiteComponentsPage.countDeleteButtons();

    await localiteComponentsPage.clickOnCreateButton();

    await promise.all([localiteUpdatePage.setLibelleInput('libelle'), localiteUpdatePage.communeSelectLastOption()]);

    expect(await localiteUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await localiteUpdatePage.save();
    expect(await localiteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Localite', async () => {
    const nbButtonsBeforeDelete = await localiteComponentsPage.countDeleteButtons();
    await localiteComponentsPage.clickOnLastDeleteButton();

    localiteDeleteDialog = new LocaliteDeleteDialog();
    expect(await localiteDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauLocalite.delete.question');
    await localiteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(localiteComponentsPage.title), 5000);

    expect(await localiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
