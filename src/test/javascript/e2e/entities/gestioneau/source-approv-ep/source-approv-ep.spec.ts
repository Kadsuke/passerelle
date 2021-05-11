import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SourceApprovEpComponentsPage, SourceApprovEpDeleteDialog, SourceApprovEpUpdatePage } from './source-approv-ep.page-object';

const expect = chai.expect;

describe('SourceApprovEp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sourceApprovEpComponentsPage: SourceApprovEpComponentsPage;
  let sourceApprovEpUpdatePage: SourceApprovEpUpdatePage;
  let sourceApprovEpDeleteDialog: SourceApprovEpDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SourceApprovEps', async () => {
    await navBarPage.goToEntity('source-approv-ep');
    sourceApprovEpComponentsPage = new SourceApprovEpComponentsPage();
    await browser.wait(ec.visibilityOf(sourceApprovEpComponentsPage.title), 5000);
    expect(await sourceApprovEpComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauSourceApprovEp.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(sourceApprovEpComponentsPage.entities), ec.visibilityOf(sourceApprovEpComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SourceApprovEp page', async () => {
    await sourceApprovEpComponentsPage.clickOnCreateButton();
    sourceApprovEpUpdatePage = new SourceApprovEpUpdatePage();
    expect(await sourceApprovEpUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauSourceApprovEp.home.createOrEditLabel');
    await sourceApprovEpUpdatePage.cancel();
  });

  it('should create and save SourceApprovEps', async () => {
    const nbButtonsBeforeCreate = await sourceApprovEpComponentsPage.countDeleteButtons();

    await sourceApprovEpComponentsPage.clickOnCreateButton();

    await promise.all([sourceApprovEpUpdatePage.setLibelleInput('libelle')]);

    expect(await sourceApprovEpUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await sourceApprovEpUpdatePage.save();
    expect(await sourceApprovEpUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sourceApprovEpComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SourceApprovEp', async () => {
    const nbButtonsBeforeDelete = await sourceApprovEpComponentsPage.countDeleteButtons();
    await sourceApprovEpComponentsPage.clickOnLastDeleteButton();

    sourceApprovEpDeleteDialog = new SourceApprovEpDeleteDialog();
    expect(await sourceApprovEpDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauSourceApprovEp.delete.question');
    await sourceApprovEpDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(sourceApprovEpComponentsPage.title), 5000);

    expect(await sourceApprovEpComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
