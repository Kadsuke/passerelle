import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  CentreRegroupementComponentsPage,
  CentreRegroupementDeleteDialog,
  CentreRegroupementUpdatePage,
} from './centre-regroupement.page-object';

const expect = chai.expect;

describe('CentreRegroupement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let centreRegroupementComponentsPage: CentreRegroupementComponentsPage;
  let centreRegroupementUpdatePage: CentreRegroupementUpdatePage;
  let centreRegroupementDeleteDialog: CentreRegroupementDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CentreRegroupements', async () => {
    await navBarPage.goToEntity('centre-regroupement');
    centreRegroupementComponentsPage = new CentreRegroupementComponentsPage();
    await browser.wait(ec.visibilityOf(centreRegroupementComponentsPage.title), 5000);
    expect(await centreRegroupementComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauCentreRegroupement.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(centreRegroupementComponentsPage.entities), ec.visibilityOf(centreRegroupementComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CentreRegroupement page', async () => {
    await centreRegroupementComponentsPage.clickOnCreateButton();
    centreRegroupementUpdatePage = new CentreRegroupementUpdatePage();
    expect(await centreRegroupementUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauCentreRegroupement.home.createOrEditLabel');
    await centreRegroupementUpdatePage.cancel();
  });

  it('should create and save CentreRegroupements', async () => {
    const nbButtonsBeforeCreate = await centreRegroupementComponentsPage.countDeleteButtons();

    await centreRegroupementComponentsPage.clickOnCreateButton();

    await promise.all([
      centreRegroupementUpdatePage.setLibelleInput('libelle'),
      centreRegroupementUpdatePage.setResponsableInput('responsable'),
      centreRegroupementUpdatePage.setContactInput('contact'),
      centreRegroupementUpdatePage.directionregionaleSelectLastOption(),
    ]);

    expect(await centreRegroupementUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await centreRegroupementUpdatePage.getResponsableInput()).to.eq(
      'responsable',
      'Expected Responsable value to be equals to responsable'
    );
    expect(await centreRegroupementUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');

    await centreRegroupementUpdatePage.save();
    expect(await centreRegroupementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await centreRegroupementComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CentreRegroupement', async () => {
    const nbButtonsBeforeDelete = await centreRegroupementComponentsPage.countDeleteButtons();
    await centreRegroupementComponentsPage.clickOnLastDeleteButton();

    centreRegroupementDeleteDialog = new CentreRegroupementDeleteDialog();
    expect(await centreRegroupementDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauCentreRegroupement.delete.question');
    await centreRegroupementDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(centreRegroupementComponentsPage.title), 5000);

    expect(await centreRegroupementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
