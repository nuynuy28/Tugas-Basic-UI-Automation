beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.screenshot('1-login-berhasil'); // Screenshot login berhasil
  });

  it('1. Add employee', () => {
    // Go to PIM > Add Employee
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // Fill employee data
    cy.get('input[name="firstName"]').type("Nurul");
    cy.get('input[name="lastName"]').type("Septariani");

    // Save employee
    cy.get('button[type="submit"]').click();
    cy.contains('Nurul Septariani').should('be.visible');
    cy.screenshot('2-employee-berhasil-ditambah');

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
    .type("Nurul Septariani");
    cy.wait(500);
    cy.get('.oxd-autocomplete-dropdown > *').contains("Nurul Septariani").click();

    //input username
    cy.get("input.oxd-input.oxd-input--active").eq(1).type("Nuy12345");

    //password
    cy.get('input[type="password"]').eq(0).type("Test1234");
    cy.get('input[type="password"]').eq(1).type("Test1234");

    cy.get("button[type='submit']").contains("Save").click();

    //assertion berhasil save
    cy.url().should('include', 'admin/viewSystemUsers');
    cy.screenshot('3-akun-karyawan-berhasil-ditambah');

  });

  it("2.Add Jatah cuti karyawan", function(){
    //go to Leave
    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();
    //assertion
    cy.url().should('include', '/addLeaveEntitlement')

    //
    cy.get('.oxd-autocomplete-text-input').click();  
    cy.get("input[placeholder='Type for hints...']").type("Nurul Septariani");
    cy.wait(500);
    cy.get('.oxd-autocomplete-dropdown > *').contains("Nurul Septariani").click();

    // Klik dropdown Leave Type (dropdown pertama)
    cy.get('.oxd-select-wrapper').eq(0).click();

    // Pilih opsi 'CAN - Vacation'
    cy.get('.oxd-select-dropdown').contains('CAN - Vacation').click();

    // Verifikasi bahwa nilai sudah terpilih
    cy.get('.oxd-select-wrapper').eq(0).should('contain', 'CAN - Vacation');

    cy.get('.oxd-select-wrapper').eq(1).click(); // Klik dropdown Leave Period
    cy.get('.oxd-select-dropdown').should('be.visible');
    cy.get('.oxd-select-dropdown').contains('2025-01-01 - 2025-31-12').click(); 

    cy.get('input.oxd-input').eq(1).type('10');
    
    cy.get("button[type='submit']").contains("Save").click();

    cy.contains('Confirm').click();
    cy.screenshot('4-entitlement-berhasil-ditambahkan');







  });

  