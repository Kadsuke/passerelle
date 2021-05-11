import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MaconComponentsPage, MaconDeleteDialog, MaconUpdatePage } from './macon.page-object';

const expect = chai.expect;

describe('Macon e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let maconComponentsPage: MaconComponentsPage;
  let maconUpdatePage: MaconUpdatePage;
  let maconDeleteDialog: MaconDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Macons', async () => {
    await navBarPage.goToEntity('macon');
    maconComponentsPage = new MaconComponentsPage();
    await browser.wait(ec.visibilityOf(maconComponentsPage.title), 5000);
    expect(await maconComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauMacon.home.title');
    await browser.wait(ec.or(ec.visibilityOf(maconComponentsPage.entities), ec.visibilityOf(maconComponentsPage.noResult)), 1000);
  });

  it('should load create Macon page', async () => {
    await maconComponentsPage.clickOnCreateButton();
    maconUpdatePage = new MaconUpdatePage();
    expect(await maconUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauMacon.home.createOrEditLabel');
    await maconUpdatePage.cancel();
  });

  it('should create and save Macons', async () => {
    const nbButtonsBeforeCreate = await maconComponentsPage.countDeleteButtons();

    await maconComponentsPage.clickOnCreateButton();

    await promise.all([maconUpdatePage.setLibelleInput('libelle')]);

    expect(await maconUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await maconUpdatePage.save();
    expect(await maconUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await maconComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Macon', async () => {
    const nbButtonsBeforeDelete = await maconComponentsPage.countDeleteButtons();
    await maconComponentsPage.clickOnLastDeleteButton();

    maconDeleteDialog = new MaconDeleteDialog();
    expect(await maconDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauMacon.delete.question');
    await maconDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(maconComponentsPage.title), 5000);

    expect(await maconComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
