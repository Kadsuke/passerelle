import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TypeHabitationComponentsPage, TypeHabitationDeleteDialog, TypeHabitationUpdatePage } from './type-habitation.page-object';

const expect = chai.expect;

describe('TypeHabitation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeHabitationComponentsPage: TypeHabitationComponentsPage;
  let typeHabitationUpdatePage: TypeHabitationUpdatePage;
  let typeHabitationDeleteDialog: TypeHabitationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TypeHabitations', async () => {
    await navBarPage.goToEntity('type-habitation');
    typeHabitationComponentsPage = new TypeHabitationComponentsPage();
    await browser.wait(ec.visibilityOf(typeHabitationComponentsPage.title), 5000);
    expect(await typeHabitationComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauTypeHabitation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(typeHabitationComponentsPage.entities), ec.visibilityOf(typeHabitationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TypeHabitation page', async () => {
    await typeHabitationComponentsPage.clickOnCreateButton();
    typeHabitationUpdatePage = new TypeHabitationUpdatePage();
    expect(await typeHabitationUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauTypeHabitation.home.createOrEditLabel');
    await typeHabitationUpdatePage.cancel();
  });

  it('should create and save TypeHabitations', async () => {
    const nbButtonsBeforeCreate = await typeHabitationComponentsPage.countDeleteButtons();

    await typeHabitationComponentsPage.clickOnCreateButton();

    await promise.all([typeHabitationUpdatePage.setLibelleInput('libelle')]);

    expect(await typeHabitationUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await typeHabitationUpdatePage.save();
    expect(await typeHabitationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await typeHabitationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TypeHabitation', async () => {
    const nbButtonsBeforeDelete = await typeHabitationComponentsPage.countDeleteButtons();
    await typeHabitationComponentsPage.clickOnLastDeleteButton();

    typeHabitationDeleteDialog = new TypeHabitationDeleteDialog();
    expect(await typeHabitationDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauTypeHabitation.delete.question');
    await typeHabitationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(typeHabitationComponentsPage.title), 5000);

    expect(await typeHabitationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
