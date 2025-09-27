class MessageBox{
    
    automationOptLink = 'a[title="Automation"]';
    createBtn = 'div[class="icon-button g-box-sizing_border-box"] button[name="createOptions"]';
    taskbotOpt = 'button[name="createTaskbot"]';
    taskBotName = 'input[name="name"]';
    submitTaskBotBtn = 'button[name="submit"]';
    searchActionField = 'input[placeholder="Search actions"]';
    messageBoxOpt = 'span[title="Message box"] span[class="clipped-text__string clipped-text__string--for_presentation"]';
    windowTitleField = 'div[placeholder="Required"][name="title"]';
    msgField = '[name="content"]';
    scrollbarAfterLines = '[name="scrollLines"]';
    closeMessageBoxAfter = 'input[name="closeMsgBox"]';
    documentationBtn = 'button[name="node-documentation"]';
    afterLinesField = 'div[data-path="TextInput"][data-name="scrollLines"]';
    secondsField = '[name="timeOut"]';
    closeMessageBoxCheckbox = '[role="checkbox"][aria-label="Close message box after"]';
    saveBtn = 'button[name="save"]';
    confirmationToast = '.toast .toast-content';
    nameColumnFilesTable = 'div[data-column-id="name"]';
  


    navigateToAutomationTab(){
        cy.get(this.automationOptLink).should('be.visible').click();
    }
    clickCreateBtn(){
        cy.get(this.createBtn).should('be.enabled').click();
    }

    clickTaskBotOpt(){
        cy.get(this.taskbotOpt).should('be.visible').click();
    }

    enterTaskBotName(name){
        cy.get(this.taskBotName).should('be.visible').clear().type(name);
    }

    clickSubmitBtn(){
        cy.get(this.submitTaskBotBtn).should('be.enabled').click();
    }

    searchMessageBox(searchItem){
        cy.get(this.searchActionField).should('be.visible').clear().click().type(searchItem);
    }

    selectMessageBox(){
        cy.get(this.messageBoxOpt).should('be.visible').dblclick();
    }

    verifyDocumentationButton(){
        cy.get(this.documentationBtn).should('be.visible').should('be.enabled');
    }

    verifyTitleInput(){
        this.verifyInteractivityOfTheInputFields("title");
        cy.get(this.windowTitleField)
        .invoke('text')
  .then((text) => {
    const normalized = text.trim();
    expect(normalized).to.eq('Automation Anywhere Enterprise Client');
  });
    }

    verifyMsgInput(){
        this.verifyInteractivityOfTheInputFields("content");
        cy.get(this.msgField).clear().type('Test message box')
        
    }

    verifyAfterLinesInput(){
        this.verifyInteractivityOfTheInputFields("scrollLines")
        cy.get(this.afterLinesField)
        .invoke('text')
        .then((text) => {
          const normalized = text.trim();
          expect(normalized).to.eq('30');
        });
        
    }

    verifyCloseMessageBoxCheckbox(){
cy.get(this.closeMessageBoxCheckbox)
.should('exist')
.and('have.attr', 'aria-checked', 'false');

cy.get(this.closeMessageBoxCheckbox)
.click({ force: true });

cy.get(this.closeMessageBoxCheckbox)
.should('have.attr', 'aria-checked', 'true');

    }

    verifySecondsInput(){
        this.verifyInteractivityOfTheInputFields("timeOut")
        cy.get(this.secondsField).invoke('text').should('eq','5')
    }

    clickOnSaveBtn(){
        cy.get(this.saveBtn).should('be.enabled').click();
    }

    assertToastMessage(name,action){
        cy.get('.toast', { timeout: 5000 }).within(() => {
            cy.get('.toast-title > .clipped-text__string--for_presentation')
              .should('contain.text', name);
          
            cy.get('.toast-message > .clipped-text > .clipped-text__string--for_presentation')
              .should('contain.text', `successfully ${action}`);
          });          
    }

    verifyInteractivityOfTheInputFields(fieldName){

  cy.get(`[contenteditable="true"][name="${fieldName}"]`)
    .should('be.visible')
    .and('have.attr', 'contenteditable', 'true');

  cy.get(`div[data-name="${fieldName}"]`)
    .find('button[data-input-status="INTERACTIVE"]')
    .should('be.visible')
    .and('not.be.disabled');

    }



}
export default new MessageBox();