describe('OrangeHRM Basic Tests', () => {
    const adminUser = 'Admin';
    const adminPass = 'admin123';
    const employeeUser = 'adit123';
    const employeePass = 'Adit123';
  
    it('Employee Login & Apply for Leave', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type(employeeUser);
      cy.get('[name="password"]').type(employeePass);
      cy.get('[type="submit"]').click();
  
      cy.contains('Leave').click();
      cy.contains('Apply').click();
      cy.contains('Apply Leave').should('exist');
  
      cy.get('.oxd-select-text').first().click();
      cy.contains('CAN - Vacation').click();
  
      cy.get('input[placeholder="yyyy-dd-mm"]').first().click();
      cy.get('.oxd-calendar-date').contains('20').click();
  
      cy.get('input[placeholder="yyyy-dd-mm"]').eq(1).click();
      cy.get('.oxd-calendar-date').contains('22').click();
  
      cy.get('div.oxd-select-text').contains('-- Select --').click();
      cy.get('.oxd-select-dropdown .oxd-select-option').contains('All Days').click();
  
      cy.get('div.oxd-select-text').contains('-- Select --').click();
      cy.get('.oxd-select-dropdown .oxd-select-option').contains('Half Day - Morning').click();
  
      cy.get('[type="submit"]').click();
      cy.contains('Success').should('exist');
  
      cy.get('.oxd-userdropdown-tab').click();
      cy.contains('Logout').click();
      cy.get('[name="username"]').should('exist');
    });
  
    it('Admin Login & Approve Leave', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type(adminUser);
      cy.get('[name="password"]').type(adminPass);
      cy.get('[type="submit"]').click();
  
      cy.contains('Leave').click();
      cy.contains('Leave List').click();
  
      cy.get('.oxd-autocomplete-text-input input').type('Adit');
      cy.wait(1000);
      cy.contains('.oxd-autocomplete-option', 'Adit').click();
  
      cy.get('.oxd-button--label-success').click();
      cy.contains('Success').should('exist');
    });
  
    it('Employee Apply Leave - Negative Case', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('[name="username"]').type(employeeUser);
      cy.get('[name="password"]').type(employeePass);
      cy.get('[type="submit"]').click();
  
      cy.contains('Leave').click();
      cy.contains('Apply').click();
      cy.contains('Apply Leave').should('exist');
  
      cy.get('[type="submit"]').click();
      cy.contains('Required').should('exist');
    });
  });