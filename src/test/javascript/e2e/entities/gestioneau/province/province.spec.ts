import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProvinceComponentsPage, ProvinceDeleteDialog, ProvinceUpdatePage } from './province.page-object';

const expect = chai.expect;

describe('Province e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provinceComponentsPage: ProvinceComponentsPage;
  let provinceUpdatePage: ProvinceUpdatePage;
  let provinceDeleteDialog: ProvinceDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Provinces', async () => {
    await navBarPage.goToEntity('province');
    provinceComponentsPage = new ProvinceComponentsPage();
    await browser.wait(ec.visibilityOf(provinceComponentsPage.title), 5000);
    expect(await provinceComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauProvince.home.title');
    await browser.wait(ec.or(ec.visibilityOf(provinceComponentsPage.entities), ec.visibilityOf(provinceComponentsPage.noResult)), 1000);
  });

  it('should load create Province page', async () => {
    await provinceComponentsPage.clickOnCreateButton();
    provinceUpdatePage = new ProvinceUpdatePage();
    expect(await provinceUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauProvince.home.createOrEditLabel');
    await provinceUpdatePage.cancel();
  });

  it('should create and save Provinces', async () => {
    const nbButtonsBeforeCreate = await provinceComponentsPage.countDeleteButtons();

    await provinceComponentsPage.clickOnCreateButton();

    await promise.all([provinceUpdatePage.setLibelleInput('libelle'), provinceUpdatePage.regionSelectLastOption()]);

    expect(await provinceUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await provinceUpdatePage.save();
    expect(await provinceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await provinceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Province', async () => {
    const nbButtonsBeforeDelete = await provinceComponentsPage.countDeleteButtons();
    await provinceComponentsPage.clickOnLastDeleteButton();

    provinceDeleteDialog = new ProvinceDeleteDialog();
    expect(await provinceDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauProvince.delete.question');
    await provinceDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(provinceComponentsPage.title), 5000);

    expect(await provinceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
