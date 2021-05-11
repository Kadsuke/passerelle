import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  FicheSuiviOuvrageComponentsPage,
  FicheSuiviOuvrageDeleteDialog,
  FicheSuiviOuvrageUpdatePage,
} from './fiche-suivi-ouvrage.page-object';

const expect = chai.expect;

describe('FicheSuiviOuvrage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ficheSuiviOuvrageComponentsPage: FicheSuiviOuvrageComponentsPage;
  let ficheSuiviOuvrageUpdatePage: FicheSuiviOuvrageUpdatePage;
  let ficheSuiviOuvrageDeleteDialog: FicheSuiviOuvrageDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FicheSuiviOuvrages', async () => {
    await navBarPage.goToEntity('fiche-suivi-ouvrage');
    ficheSuiviOuvrageComponentsPage = new FicheSuiviOuvrageComponentsPage();
    await browser.wait(ec.visibilityOf(ficheSuiviOuvrageComponentsPage.title), 5000);
    expect(await ficheSuiviOuvrageComponentsPage.getTitle()).to.eq('passerelleApp.gestioneauFicheSuiviOuvrage.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ficheSuiviOuvrageComponentsPage.entities), ec.visibilityOf(ficheSuiviOuvrageComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FicheSuiviOuvrage page', async () => {
    await ficheSuiviOuvrageComponentsPage.clickOnCreateButton();
    ficheSuiviOuvrageUpdatePage = new FicheSuiviOuvrageUpdatePage();
    expect(await ficheSuiviOuvrageUpdatePage.getPageTitle()).to.eq('passerelleApp.gestioneauFicheSuiviOuvrage.home.createOrEditLabel');
    await ficheSuiviOuvrageUpdatePage.cancel();
  });

  it('should create and save FicheSuiviOuvrages', async () => {
    const nbButtonsBeforeCreate = await ficheSuiviOuvrageComponentsPage.countDeleteButtons();

    await ficheSuiviOuvrageComponentsPage.clickOnCreateButton();

    await promise.all([
      ficheSuiviOuvrageUpdatePage.setPrjAppuisInput('prjAppuis'),
      ficheSuiviOuvrageUpdatePage.setNomBenefInput('nomBenef'),
      ficheSuiviOuvrageUpdatePage.setPrenomBenefInput('prenomBenef'),
      ficheSuiviOuvrageUpdatePage.setProfessionBenefInput('professionBenef'),
      ficheSuiviOuvrageUpdatePage.setNbUsagersInput('5'),
      ficheSuiviOuvrageUpdatePage.setContactsInput('contacts'),
      ficheSuiviOuvrageUpdatePage.setLongitudeInput('5'),
      ficheSuiviOuvrageUpdatePage.setLatitudeInput('5'),
      ficheSuiviOuvrageUpdatePage.setDateRemiseDevisInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ficheSuiviOuvrageUpdatePage.setDateDebutTravauxInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ficheSuiviOuvrageUpdatePage.setDateFinTravauxInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ficheSuiviOuvrageUpdatePage.setRueInput('rue'),
      ficheSuiviOuvrageUpdatePage.setPorteInput('porte'),
      ficheSuiviOuvrageUpdatePage.setCoutMenageInput('coutMenage'),
      ficheSuiviOuvrageUpdatePage.setSubvOneaInput('5'),
      ficheSuiviOuvrageUpdatePage.setSubvProjetInput('5'),
      ficheSuiviOuvrageUpdatePage.setAutreSubvInput('5'),
      ficheSuiviOuvrageUpdatePage.setTolesInput('5'),
      ficheSuiviOuvrageUpdatePage.setAnimateurInput('animateur'),
      ficheSuiviOuvrageUpdatePage.setSuperviseurInput('superviseur'),
      ficheSuiviOuvrageUpdatePage.setControleurInput('controleur'),
      ficheSuiviOuvrageUpdatePage.parcelleSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.previsionSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.natureouvrageSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.typehabitationSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.sourceapprovepSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.modeevacuationeauuseeSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.modeevacexcretaSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.maconSelectLastOption(),
      ficheSuiviOuvrageUpdatePage.prefabricantSelectLastOption(),
    ]);

    expect(await ficheSuiviOuvrageUpdatePage.getPrjAppuisInput()).to.eq('prjAppuis', 'Expected PrjAppuis value to be equals to prjAppuis');
    expect(await ficheSuiviOuvrageUpdatePage.getNomBenefInput()).to.eq('nomBenef', 'Expected NomBenef value to be equals to nomBenef');
    expect(await ficheSuiviOuvrageUpdatePage.getPrenomBenefInput()).to.eq(
      'prenomBenef',
      'Expected PrenomBenef value to be equals to prenomBenef'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getProfessionBenefInput()).to.eq(
      'professionBenef',
      'Expected ProfessionBenef value to be equals to professionBenef'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getNbUsagersInput()).to.eq('5', 'Expected nbUsagers value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getContactsInput()).to.eq('contacts', 'Expected Contacts value to be equals to contacts');
    expect(await ficheSuiviOuvrageUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getDateRemiseDevisInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateRemiseDevis value to be equals to 2000-12-31'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getDateDebutTravauxInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebutTravaux value to be equals to 2000-12-31'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getDateFinTravauxInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateFinTravaux value to be equals to 2000-12-31'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getRueInput()).to.eq('rue', 'Expected Rue value to be equals to rue');
    expect(await ficheSuiviOuvrageUpdatePage.getPorteInput()).to.eq('porte', 'Expected Porte value to be equals to porte');
    expect(await ficheSuiviOuvrageUpdatePage.getCoutMenageInput()).to.eq(
      'coutMenage',
      'Expected CoutMenage value to be equals to coutMenage'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getSubvOneaInput()).to.eq('5', 'Expected subvOnea value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getSubvProjetInput()).to.eq('5', 'Expected subvProjet value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getAutreSubvInput()).to.eq('5', 'Expected autreSubv value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getTolesInput()).to.eq('5', 'Expected toles value to be equals to 5');
    expect(await ficheSuiviOuvrageUpdatePage.getAnimateurInput()).to.eq('animateur', 'Expected Animateur value to be equals to animateur');
    expect(await ficheSuiviOuvrageUpdatePage.getSuperviseurInput()).to.eq(
      'superviseur',
      'Expected Superviseur value to be equals to superviseur'
    );
    expect(await ficheSuiviOuvrageUpdatePage.getControleurInput()).to.eq(
      'controleur',
      'Expected Controleur value to be equals to controleur'
    );

    await ficheSuiviOuvrageUpdatePage.save();
    expect(await ficheSuiviOuvrageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ficheSuiviOuvrageComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FicheSuiviOuvrage', async () => {
    const nbButtonsBeforeDelete = await ficheSuiviOuvrageComponentsPage.countDeleteButtons();
    await ficheSuiviOuvrageComponentsPage.clickOnLastDeleteButton();

    ficheSuiviOuvrageDeleteDialog = new FicheSuiviOuvrageDeleteDialog();
    expect(await ficheSuiviOuvrageDeleteDialog.getDialogTitle()).to.eq('passerelleApp.gestioneauFicheSuiviOuvrage.delete.question');
    await ficheSuiviOuvrageDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(ficheSuiviOuvrageComponentsPage.title), 5000);

    expect(await ficheSuiviOuvrageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
