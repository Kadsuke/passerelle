import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SectionComponentsPage, SectionDeleteDialog, SectionUpdatePage } from './section.page-object';

const expect = chai.expect;

describe('Section e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sectionComponentsPage: SectionComponentsPage;
  let sectionUpdatePage: SectionUpdatePage;
  let sectionDeleteDialog: SectionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sections', async () => {
    await navBarPage.goToEntity('section');
    sectionComponentsPage = new SectionComponentsPage();
    await browser.wait(ec.visibilityOf(sectionComponentsPage.title), 5000);
    expect(await sectionComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauSection.home.title');
    await browser.wait(ec.or(ec.visibilityOf(sectionComponentsPage.entities), ec.visibilityOf(sectionComponentsPage.noResult)), 1000);
  });

  it('should load create Section page', async () => {
    await sectionComponentsPage.clickOnCreateButton();
    sectionUpdatePage = new SectionUpdatePage();
    expect(await sectionUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauSection.home.createOrEditLabel');
    await sectionUpdatePage.cancel();
  });

  it('should create and save Sections', async () => {
    const nbButtonsBeforeCreate = await sectionComponentsPage.countDeleteButtons();

    await sectionComponentsPage.clickOnCreateButton();

    await promise.all([sectionUpdatePage.setLibelleInput('libelle'), sectionUpdatePage.secteurSelectLastOption()]);

    expect(await sectionUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await sectionUpdatePage.save();
    expect(await sectionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Section', async () => {
    const nbButtonsBeforeDelete = await sectionComponentsPage.countDeleteButtons();
    await sectionComponentsPage.clickOnLastDeleteButton();

    sectionDeleteDialog = new SectionDeleteDialog();
    expect(await sectionDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauSection.delete.question');
    await sectionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(sectionComponentsPage.title), 5000);

    expect(await sectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
