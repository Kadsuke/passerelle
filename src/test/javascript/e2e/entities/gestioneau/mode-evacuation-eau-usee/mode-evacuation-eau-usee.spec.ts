import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ModeEvacuationEauUseeComponentsPage,
  ModeEvacuationEauUseeDeleteDialog,
  ModeEvacuationEauUseeUpdatePage,
} from './mode-evacuation-eau-usee.page-object';

const expect = chai.expect;

describe('ModeEvacuationEauUsee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let modeEvacuationEauUseeComponentsPage: ModeEvacuationEauUseeComponentsPage;
  let modeEvacuationEauUseeUpdatePage: ModeEvacuationEauUseeUpdatePage;
  let modeEvacuationEauUseeDeleteDialog: ModeEvacuationEauUseeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ModeEvacuationEauUsees', async () => {
    await navBarPage.goToEntity('mode-evacuation-eau-usee');
    modeEvacuationEauUseeComponentsPage = new ModeEvacuationEauUseeComponentsPage();
    await browser.wait(ec.visibilityOf(modeEvacuationEauUseeComponentsPage.title), 5000);
    expect(await modeEvacuationEauUseeComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauModeEvacuationEauUsee.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(modeEvacuationEauUseeComponentsPage.entities), ec.visibilityOf(modeEvacuationEauUseeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ModeEvacuationEauUsee page', async () => {
    await modeEvacuationEauUseeComponentsPage.clickOnCreateButton();
    modeEvacuationEauUseeUpdatePage = new ModeEvacuationEauUseeUpdatePage();
    expect(await modeEvacuationEauUseeUpdatePage.getPageTitle()).to.eq(
      'passerelleApp.gestioneauModeEvacuationEauUsee.home.createOrEditLabel'
    );
    await modeEvacuationEauUseeUpdatePage.cancel();
  });

  it('should create and save ModeEvacuationEauUsees', async () => {
    const nbButtonsBeforeCreate = await modeEvacuationEauUseeComponentsPage.countDeleteButtons();

    await modeEvacuationEauUseeComponentsPage.clickOnCreateButton();

    await promise.all([modeEvacuationEauUseeUpdatePage.setLibelleInput('libelle')]);

    expect(await modeEvacuationEauUseeUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await modeEvacuationEauUseeUpdatePage.save();
    expect(await modeEvacuationEauUseeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await modeEvacuationEauUseeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ModeEvacuationEauUsee', async () => {
    const nbButtonsBeforeDelete = await modeEvacuationEauUseeComponentsPage.countDeleteButtons();
    await modeEvacuationEauUseeComponentsPage.clickOnLastDeleteButton();

    modeEvacuationEauUseeDeleteDialog = new ModeEvacuationEauUseeDeleteDialog();
    expect(await modeEvacuationEauUseeDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauModeEvacuationEauUsee.delete.question');
    await modeEvacuationEauUseeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(modeEvacuationEauUseeComponentsPage.title), 5000);

    expect(await modeEvacuationEauUseeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
