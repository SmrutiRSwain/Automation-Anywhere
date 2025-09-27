class LogoutPage {
  settingsButton = '[name="mysettings"]';
  expandButton = 'button[data-path="Pathfinder.expander"]';
  logoutButton = '.trayprofile-controls > .command-button > .rio-focus';

  settingsButtonElem() {
    return cy.get(this.settingsButton);
  }

  expandButtonElem() {
    return cy.get(this.expandButton);
  }

  logoutButtonElem() {
    return cy.get(this.logoutButton);
  }

  openSettingsIfNeeded() {
    cy.get('body').then(($body) => {
      if ($body.find(this.settingsButton).is(':visible')) {
        this.settingsButtonElem().click();
      } else {
        this.expandButtonElem().click();
        this.settingsButtonElem().should('be.visible').click();
      }
    });
  }

  logout() {
    this.openSettingsIfNeeded();
    this.logoutButtonElem().should('be.visible').click();
  }
}

export default LogoutPage;
