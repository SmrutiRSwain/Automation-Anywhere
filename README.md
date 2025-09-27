# AutomationAnywhere Cypress Automation Project

This project contains **UI and API automation** for AutomationAnywhere using **Cypress 15.3.0**.  
It follows the **Page Object Model (POM)** design pattern for maintainability and scalability.

---

## Folder Structure

AUTOMATIONANYWHERE_PROJECT/
├─ cypress/
│ ├─ e2e/
│ │ ├─ JS FormUpload.cy.js
│ │ ├─ JS LearningInstance.cy.js
│ │ ├─ JS Login.cy.js
│ │ └─ JS MessageBox.cy.js
│ ├─ fixtures/
│ │ ├─ env.json
│ │ └─ learningInstance.json
│ ├─ pageObjects/
│ │ ├─ JS authAPI.js
│ │ ├─ JS formUploadPage.js
│ │ ├─ JS learningInstanceAPI.js
│ │ ├─ JS loginPage.js
│ │ └─ JS messageBoxPage.js
│ ├─ screenshots/
│ └─ support/
│ ├─ JS commands.js
│ └─ JS e2e.js
├─ node_modules/
├─ cypress.config.js
├─ package.json
└─ package-lock.json

# install dependencies
npm install

# run all testcases
npm run test

# run a single file
npx cypress run --spec "cypress/e2e/Login.cy.js"

# Open Cypress Test Runner (interactive mode):
npx cypress open

# Framework & Tools
Cypress 15.3.0 – UI & API automation
Page Object Model (POM) – structured test design
Fixtures – storing API payloads and credentials
Custom Cypress Commands – in commands.js
Chai Assertions – built-in with Cypress
cy.request() – for API calls

