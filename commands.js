Cypress.Commands.add('login', (credentials) => {
    cy.xpath('//input[contains(@id, "_xaf_dviDatabaseName_Edit_I")]').type(credentials.company);
    cy.xpath('//input[contains(@id, "_xaf_dviUserName_Edit_I")]').type(credentials.username);
    cy.xpath('//input[contains(@id, "_xaf_dviPassword_Edit_I")]').type(credentials.password);
    cy.get('#Logon_PopupActions_Menu_DXI0_T').click();
  });
  
  Cypress.Commands.add('createPunch', (punchData) => {
    cy.get('#Vertical_mainMenu_Menu_DXI0_T').click();
    cy.wait(2000); // Wait for 2 seconds
    cy.xpath('//img[contains(@id, "_dviEmployee_Edit_B-1Img")]').click();
    cy.contains('td', punchData.employeeName).click();
    cy.wait(2000); // Wait for 2 seconds
    cy.xpath('//input[contains(@id, "_dviPunchTime_Edit_I")]').type(punchData.punchTime);
    cy.wait(2000); // Wait for 2 seconds
    cy.xpath('//img[contains(@id, "_dviWorkCode_Edit_dropdown_DD_B-1Img")]').click();
    cy.contains('td', punchData.workCodeIndex).click();
    cy.wait(2000); // Wait for 2 seconds
    cy.xpath('//input[contains(@id, "_dviRemarks_Edit_I")]').type(punchData.remarks);
    cy.get('#Vertical_mainMenu_Menu_DXI1_T').click();
  });  