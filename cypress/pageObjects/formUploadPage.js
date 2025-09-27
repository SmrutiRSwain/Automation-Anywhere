import '../support/commands';

class Formupload{

    form ='button[name="create-attended-form"]';
    selectFile = 'div[data-item-name="File"] button[name="item-button"]';
    textBox = 'div[data-item-name="TextBox"] button[name="item-button"]';
    canvas = '.formcanvas__leftpane';
    iframe = '.modulepage-frame';
    textBoxInCanvas = 'input[aria-label="TextBox"]';
    selectFileInCanvas = '.file-upload-content';
    saveBtn = 'button[name="save"]';

    selectFormOption(){
        cy.get(this.form).should('be.enabled').click()
    }
    dragAndAddElements(){
      this.dragAndDropElement(this.iframe,['Text Box','Select File'],this.canvas,100)
    }
dragAndDropElement(iframeSelector, elementsTexts, canvasSelector, spacing = 100) {
  cy.getIframeBody(iframeSelector).then($body => {
    const dataTransfer = new DataTransfer();

    cy.wrap($body).find(canvasSelector).then($canvas => {
      const rect = $canvas[0].getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      elementsTexts.reduce((prev, text, i) => {
        return prev.then(() => {
          const dropX = startX;
          const dropY = startY + i * spacing;

          cy.wrap($body)
            .find('button[name="item-button"]').contains(text)
            .scrollIntoView()
            .trigger('mousedown', { which: 1, force: true })
            .trigger('dragstart', { dataTransfer, force: true });

          cy.wrap($body)
            .find(canvasSelector)
            .trigger('dragover', { dataTransfer, force: true, clientX: dropX, clientY: dropY })
            .trigger('drop', { dataTransfer, force: true, clientX: dropX, clientY: dropY })
            .trigger('mouseup', { which: 1, force: true, clientX: dropX, clientY: dropY });

          return cy.wait(300);
        });
      }, cy.wrap());
    });
  });
}

clickOnThetextBoxElement(){
  cy.getIframeBody(this.iframe).then($body => {
    cy.wrap($body)
  .find(this.textBoxInCanvas).should('be.visible').click()
  })
}
verifyTextBoxrelatedElement() {
  cy.getIframeBody(this.iframe).then($body => {
    // Verify header title text
    cy.wrap($body)
      .find('header.editor-details__header .editor-details__header-title-label')
      .should('contain.text', 'Properties - Text Box');

    // Verify Reset button exists, visible, clickable
    cy.wrap($body)
      .find('button[aria-label="Reset"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Verify Delete button exists, visible, clickable
    cy.wrap($body)
      .find('button[aria-label="Delete"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Element settings section
    cy.wrap($body).contains('Element settings').should('be.visible');

    // Element ID field (read-only)
    cy.wrap($body).find('input[name="id"]').should('have.attr', 'readonly');

    // Element label
    cy.wrap($body).find('input[name="label"]').should('be.visible').and('have.attr', 'aria-label', 'Element label');

    // Default value
    cy.wrap($body).find('input[name="defaultValue"]').should('be.visible');

    // Radio buttons (Standard / Custom)
    cy.wrap($body).contains('Standard').should('be.visible');
    cy.wrap($body).contains('Custom').should('be.visible');

    // Character limits
    cy.wrap($body).contains('Character limit').should('be.visible');
    cy.wrap($body).find('input[name="minLength"]').should('be.visible');
    cy.wrap($body).find('input[name="maxLength"]').should('be.visible');

    // Help text options
    cy.wrap($body).contains('Help text option').should('be.visible');
    cy.wrap($body).find('input[name="hintText"]').should('be.visible');
    cy.wrap($body).find('textarea[name="toolTip"]').should('be.visible');

    // Checkboxes
    const checkboxes = [
      'Make field required',
      'Make field uneditable',
      'Mask data',
      'Make field hidden'
    ];

    checkboxes.forEach(label => {
      cy.wrap($body).contains('label', label).find('input[type="checkbox"]').should('exist');
    });
  });
}


clickOnTheSelectFileElement() {
  cy.getIframeBody(this.iframe).then($body => {
    cy.wrap($body).find(this.selectFileInCanvas).should('be.visible').click();
  });
}

verifyAllElementsForSelectFiles() {
  cy.getIframeBody(this.iframe).then($body => {
    // Verify header title text
    cy.wrap($body)
      .find('header.editor-details__header .editor-details__header-title-label')
      .should('contain.text', 'Properties - Select File');

    // Verify Reset button exists and is clickable
    cy.wrap($body)
      .find('button[aria-label="Reset"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Verify Delete button exists and is clickable
    cy.wrap($body)
      .find('button[aria-label="Delete"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Verify Element ID field is readonly
    cy.wrap($body)
      .find('div[data-name="id"] input[name="id"]')
      .should('have.attr', 'readonly');

    // Verify Element label input is visible and editable
    cy.wrap($body)
      .find('div[data-name="label"] input[name="label"]')
      .should('be.visible')
      .and('not.have.attr', 'readonly');

    // Verify radio buttons for file format type
    cy.wrap($body)
      .find('div.radio-group__radios input[type="radio"]')
      .should('have.length.at.least', 2);

    // Verify textarea for file formats
    cy.wrap($body)
      .find('textarea[name="fileFormat"]')
      .should('be.visible')
      .and('have.attr', 'aria-label', 'Enter file formats separated by commas');

    // Verify "Enable file download" checkbox exists and can be toggled
    cy.wrap($body)
      .find('input[type="checkbox"][aria-label="Enable file download"]')
      .should('exist')
      .and('not.be.checked')

    // Verify Hint below field input (max length 30)
    cy.wrap($body)
      .find('input[name="hintText"]')
      .should('be.visible')
      .and('have.attr', 'maxlength', '30');

    // Verify Tool tip textarea (max length 300)
    cy.wrap($body)
      .find('textarea[name="toolTip"]')
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', 'maxlength', '300');

    // Verify checkboxes exists
    const advancedCheckboxes = [
      'Make field required',
      'Make field uneditable',
      'Make field hidden',
    ];

    advancedCheckboxes.forEach(label => {
      cy.wrap($body).contains('label', label).find('input[type="checkbox"]').should('exist');
    });
  });
  
}
enterValueInTheTextField(inputValue){
  cy.getIframeBody(this.iframe).then($body => {
    cy.wrap($body)
    .find(this.textBoxInCanvas).scrollIntoView().should('be.visible').click({ force: true }).type(inputValue)
  })
}
clickOnSaveBtn(){
  cy.getIframeBody(this.iframe).then($body => {
    cy.wrap($body)
    .find(this.saveBtn).should('be.enabled').click()
  })
}



}
export default new Formupload;
