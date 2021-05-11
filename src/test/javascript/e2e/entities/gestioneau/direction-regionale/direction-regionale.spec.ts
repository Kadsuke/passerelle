import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  DirectionRegionaleComponentsPage,
  DirectionRegionaleDeleteDialog,
  DirectionRegionaleUpdatePage,
} from './direction-regionale.page-object';

const expect = chai.expect;

describe('DirectionRegionale e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let directionRegionaleComponentsPage: DirectionRegionaleComponentsPage;
  let directionRegionaleUpdatePage: DirectionRegionaleUpdatePage;
  let directionRegionaleDeleteDialog: DirectionRegionaleDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DirectionRegionales', async () => {
    await navBarPage.goToEntity('direction-regionale');
    directionRegionaleComponentsPage = new DirectionRegionaleComponentsPage();
    await browser.wait(ec.visibilityOf(directionRegionaleComponentsPage.title), 5000);
    expect(await directionRegionaleComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauDirectionRegionale.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(directionRegionaleComponentsPage.entities), ec.visibilityOf(directionRegionaleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DirectionRegionale page', async () => {
    await directionRegionaleComponentsPage.clickOnCreateButton();
    directionRegionaleUpdatePage = new DirectionRegionaleUpdatePage();
    expect(await directionRegionaleUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauDirectionRegionale.home.createOrEditLabel');
    await directionRegionaleUpdatePage.cancel();
  });

  it('should create and save DirectionRegionales', async () => {
    const nbButtonsBeforeCreate = await directionRegionaleComponentsPage.countDeleteButtons();

    await directionRegionaleComponentsPage.clickOnCreateButton();

    await promise.all([
      directionRegionaleUpdatePage.setLibelleInput('libelle'),
      directionRegionaleUpdatePage.setResponsableInput('responsable'),
      directionRegionaleUpdatePage.setContactInput('contact'),
    ]);

    expect(await directionRegionaleUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await directionRegionaleUpdatePage.getResponsableInput()).to.eq(
      'responsable',
      'Expected Responsable value to be equals to responsable'
    );
    expect(await directionRegionaleUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');

    await directionRegionaleUpdatePage.save();
    expect(await directionRegionaleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await directionRegionaleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DirectionRegionale', async () => {
    const nbButtonsBeforeDelete = await directionRegionaleComponentsPage.countDeleteButtons();
    await directionRegionaleComponentsPage.clickOnLastDeleteButton();

    directionRegionaleDeleteDialog = new DirectionRegionaleDeleteDialog();
    expect(await directionRegionaleDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauDirectionRegionale.delete.question');
    await directionRegionaleDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(directionRegionaleComponentsPage.title), 5000);

    expect(await directionRegionaleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
