import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CentreComponentsPage, CentreDeleteDialog, CentreUpdatePage } from './centre.page-object';

const expect = chai.expect;

describe('Centre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let centreComponentsPage: CentreComponentsPage;
  let centreUpdatePage: CentreUpdatePage;
  let centreDeleteDialog: CentreDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Centres', async () => {
    await navBarPage.goToEntity('centre');
    centreComponentsPage = new CentreComponentsPage();
    await browser.wait(ec.visibilityOf(centreComponentsPage.title), 5000);
    expect(await centreComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauCentre.home.title');
    await browser.wait(ec.or(ec.visibilityOf(centreComponentsPage.entities), ec.visibilityOf(centreComponentsPage.noResult)), 1000);
  });

  it('should load create Centre page', async () => {
    await centreComponentsPage.clickOnCreateButton();
    centreUpdatePage = new CentreUpdatePage();
    expect(await centreUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauCentre.home.createOrEditLabel');
    await centreUpdatePage.cancel();
  });

  it('should create and save Centres', async () => {
    const nbButtonsBeforeCreate = await centreComponentsPage.countDeleteButtons();

    await centreComponentsPage.clickOnCreateButton();

    await promise.all([
      centreUpdatePage.setLibelleInput('libelle'),
      centreUpdatePage.setResponsableInput('responsable'),
      centreUpdatePage.setContactInput('contact'),
      centreUpdatePage.centreregroupementSelectLastOption(),
    ]);

    expect(await centreUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await centreUpdatePage.getResponsableInput()).to.eq('responsable', 'Expected Responsable value to be equals to responsable');
    expect(await centreUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');

    await centreUpdatePage.save();
    expect(await centreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await centreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Centre', async () => {
    const nbButtonsBeforeDelete = await centreComponentsPage.countDeleteButtons();
    await centreComponentsPage.clickOnLastDeleteButton();

    centreDeleteDialog = new CentreDeleteDialog();
    expect(await centreDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauCentre.delete.question');
    await centreDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(centreComponentsPage.title), 5000);

    expect(await centreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
