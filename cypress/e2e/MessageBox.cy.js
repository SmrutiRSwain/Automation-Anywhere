import '../support/commands';
import messagebox from '../pageObjects/messageBoxPage';

describe("Testing message box task", () => {
    before("Login", () => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    })
      it("Navigating to Automation tab,create task bot and then create message box", () => {
        messagebox.navigateToAutomationTab();
        messagebox.clickCreateBtn();
        messagebox.clickTaskBotOpt();
        messagebox.enterTaskBotName("Testing message box");
        messagebox.clickSubmitBtn();
        messagebox.assertToastMessage("Testing message box","created")
        messagebox.searchMessageBox("Message Box");
        messagebox.selectMessageBox();
        messagebox.verifyDocumentationButton();
        messagebox.verifyTitleInput();
        messagebox.verifyMsgInput();
        messagebox.verifyAfterLinesInput();
        messagebox.verifyCloseMessageBoxCheckbox();
        messagebox.verifySecondsInput();
        messagebox.clickOnSaveBtn();
      })
    })