import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ModeEvacExcretaComponentsPage, ModeEvacExcretaDeleteDialog, ModeEvacExcretaUpdatePage } from './mode-evac-excreta.page-object';

const expect = chai.expect;

describe('ModeEvacExcreta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let modeEvacExcretaComponentsPage: ModeEvacExcretaComponentsPage;
  let modeEvacExcretaUpdatePage: ModeEvacExcretaUpdatePage;
  let modeEvacExcretaDeleteDialog: ModeEvacExcretaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ModeEvacExcretas', async () => {
    await navBarPage.goToEntity('mode-evac-excreta');
    modeEvacExcretaComponentsPage = new ModeEvacExcretaComponentsPage();
    await browser.wait(ec.visibilityOf(modeEvacExcretaComponentsPage.title), 5000);
    expect(await modeEvacExcretaComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauModeEvacExcreta.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(modeEvacExcretaComponentsPage.entities), ec.visibilityOf(modeEvacExcretaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ModeEvacExcreta page', async () => {
    await modeEvacExcretaComponentsPage.clickOnCreateButton();
    modeEvacExcretaUpdatePage = new ModeEvacExcretaUpdatePage();
    expect(await modeEvacExcretaUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauModeEvacExcreta.home.createOrEditLabel');
    await modeEvacExcretaUpdatePage.cancel();
  });

  it('should create and save ModeEvacExcretas', async () => {
    const nbButtonsBeforeCreate = await modeEvacExcretaComponentsPage.countDeleteButtons();

    await modeEvacExcretaComponentsPage.clickOnCreateButton();

    await promise.all([modeEvacExcretaUpdatePage.setLibelleInput('libelle')]);

    expect(await modeEvacExcretaUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await modeEvacExcretaUpdatePage.save();
    expect(await modeEvacExcretaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await modeEvacExcretaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ModeEvacExcreta', async () => {
    const nbButtonsBeforeDelete = await modeEvacExcretaComponentsPage.countDeleteButtons();
    await modeEvacExcretaComponentsPage.clickOnLastDeleteButton();

    modeEvacExcretaDeleteDialog = new ModeEvacExcretaDeleteDialog();
    expect(await modeEvacExcretaDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauModeEvacExcreta.delete.question');
    await modeEvacExcretaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(modeEvacExcretaComponentsPage.title), 5000);

    expect(await modeEvacExcretaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
