beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Successfully add employee and create user account', () => {
    // Go to PIM > Add Employee
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // Fill employee data
    cy.get('input[name="firstName"]').type("Aleena");
    cy.get('input[name="lastName"]').type("Andrian");

    // Save employee
    cy.get('button[type="submit"]').click();

    //Go to Admin -> User management -> Add
    cy.contains('Admin').click();
    cy.contains('User Management').click();
    cy.contains('Add').click();


    //input karyawan
    let dropdown = `.oxd-select-wrapper`;
    cy.get(dropdown).eq(0).click(); // buka dropdown pertama
    cy.contains('.oxd-select-option', 'ESS').click(); // pilih "ESS"

    cy.get(dropdown).eq(1).click();
    cy.contains('.oxd-select-option', 'Enabled').click(); 

    // Klik pada field Employee Name
    cy.get("input[placeholder='Type for hints...']").should('exist')
    .should('be.visible')
    .type("Russel Hamilton");
    cy.wait(500);
    cy.get('.oxd-autocomplete-dropdown > *').contains("Russel Hamilton").click();

    //input username
    cy.get("input.oxd-input.oxd-input--active").eq(1).type("russelokebgt");

    //password
    cy.get('input[type="password"]').eq(0).type("Password1234");
    cy.get('input[type="password"]').eq(1).type("Password1234");

    cy.get("button[type='submit']").contains("Save").click();

    //assertion berhasil save
    cy.url().should('include', 'admin/viewSystemUsers');

  });