import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SecteurComponentsPage, SecteurDeleteDialog, SecteurUpdatePage } from './secteur.page-object';

const expect = chai.expect;

describe('Secteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let secteurComponentsPage: SecteurComponentsPage;
  let secteurUpdatePage: SecteurUpdatePage;
  let secteurDeleteDialog: SecteurDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Secteurs', async () => {
    await navBarPage.goToEntity('secteur');
    secteurComponentsPage = new SecteurComponentsPage();
    await browser.wait(ec.visibilityOf(secteurComponentsPage.title), 5000);
    expect(await secteurComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauSecteur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(secteurComponentsPage.entities), ec.visibilityOf(secteurComponentsPage.noResult)), 1000);
  });

  it('should load create Secteur page', async () => {
    await secteurComponentsPage.clickOnCreateButton();
    secteurUpdatePage = new SecteurUpdatePage();
    expect(await secteurUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauSecteur.home.createOrEditLabel');
    await secteurUpdatePage.cancel();
  });

  it('should create and save Secteurs', async () => {
    const nbButtonsBeforeCreate = await secteurComponentsPage.countDeleteButtons();

    await secteurComponentsPage.clickOnCreateButton();

    await promise.all([secteurUpdatePage.setLibelleInput('libelle'), secteurUpdatePage.localiteSelectLastOption()]);

    expect(await secteurUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await secteurUpdatePage.save();
    expect(await secteurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await secteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Secteur', async () => {
    const nbButtonsBeforeDelete = await secteurComponentsPage.countDeleteButtons();
    await secteurComponentsPage.clickOnLastDeleteButton();

    secteurDeleteDialog = new SecteurDeleteDialog();
    expect(await secteurDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauSecteur.delete.question');
    await secteurDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(secteurComponentsPage.title), 5000);

    expect(await secteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
