import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrevisionComponentsPage, PrevisionDeleteDialog, PrevisionUpdatePage } from './prevision.page-object';

const expect = chai.expect;

describe('Prevision e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let previsionComponentsPage: PrevisionComponentsPage;
  let previsionUpdatePage: PrevisionUpdatePage;
  let previsionDeleteDialog: PrevisionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Previsions', async () => {
    await navBarPage.goToEntity('prevision');
    previsionComponentsPage = new PrevisionComponentsPage();
    await browser.wait(ec.visibilityOf(previsionComponentsPage.title), 5000);
    expect(await previsionComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauPrevision.home.title');
    await browser.wait(ec.or(ec.visibilityOf(previsionComponentsPage.entities), ec.visibilityOf(previsionComponentsPage.noResult)), 1000);
  });

  it('should load create Prevision page', async () => {
    await previsionComponentsPage.clickOnCreateButton();
    previsionUpdatePage = new PrevisionUpdatePage();
    expect(await previsionUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauPrevision.home.createOrEditLabel');
    await previsionUpdatePage.cancel();
  });

  it('should create and save Previsions', async () => {
    const nbButtonsBeforeCreate = await previsionComponentsPage.countDeleteButtons();

    await previsionComponentsPage.clickOnCreateButton();

    await promise.all([
      previsionUpdatePage.setNbLatrineInput('5'),
      previsionUpdatePage.setNbPuisardInput('5'),
      previsionUpdatePage.setNbPublicInput('5'),
      previsionUpdatePage.setNbScolaireInput('5'),
      previsionUpdatePage.centreSelectLastOption(),
      previsionUpdatePage.refanneeSelectLastOption(),
    ]);

    expect(await previsionUpdatePage.getNbLatrineInput()).to.eq('5', 'Expected nbLatrine value to be equals to 5');
    expect(await previsionUpdatePage.getNbPuisardInput()).to.eq('5', 'Expected nbPuisard value to be equals to 5');
    expect(await previsionUpdatePage.getNbPublicInput()).to.eq('5', 'Expected nbPublic value to be equals to 5');
    expect(await previsionUpdatePage.getNbScolaireInput()).to.eq('5', 'Expected nbScolaire value to be equals to 5');

    await previsionUpdatePage.save();
    expect(await previsionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await previsionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prevision', async () => {
    const nbButtonsBeforeDelete = await previsionComponentsPage.countDeleteButtons();
    await previsionComponentsPage.clickOnLastDeleteButton();

    previsionDeleteDialog = new PrevisionDeleteDialog();
    expect(await previsionDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauPrevision.delete.question');
    await previsionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(previsionComponentsPage.title), 5000);

    expect(await previsionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
