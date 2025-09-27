import '../support/commands';
import Formupload from '../pageObjects/formUploadPage';
import messagebox from '../pageObjects/messageBoxPage';

describe('Test Form Upload WorkFlow', () => {
    before("Login", () => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.get('.homepage-welcome-title',{timeout:10000}).should('be.visible');
    cy.url().should('include', '/home');
    })
  it('Creating a form and Save it', () => {
    messagebox.navigateToAutomationTab()
    messagebox.clickCreateBtn();
    Formupload.selectFormOption();
    messagebox.enterTaskBotName("Testing form upload");
    messagebox.clickSubmitBtn();
    messagebox.assertToastMessage("Testing form upload","created");
    Formupload.dragAndAddElements();
    Formupload.clickOnThetextBoxElement();
    Formupload.verifyTextBoxrelatedElement();
     Formupload.clickOnTheSelectFileElement();
     Formupload.verifyAllElementsForSelectFiles();
     Formupload.enterValueInTheTextField("Testing");
     Formupload.clickOnSaveBtn()
     messagebox.assertToastMessage("Testing form upload","edited")
  })
});