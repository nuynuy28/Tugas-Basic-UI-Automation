
describe('E2E - Request & Approve Cuti', () => {

    const newEmployee = {
        username: 'Nuytest01',
        password: 'Test1234'
    };

    const admin = {
        username: 'Admin',
        password: 'admin123'
    };

    it('Karyawan baru request cuti -> Admin approve -> Cuti Approved', () => {
        // a. Login sebagai karyawan
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("[placeholder='Username']").type(newEmployee.username);
        cy.get("[placeholder='Password']").type(newEmployee.password);
        cy.get("button[type='submit']").click();
        cy.url().should("include", "/dashboard");
        cy.screenshot('5-login karyawan-berhasil');

        // b. Request Cuti
        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();
        //assertion
        cy.url().should('include', '/addLeaveEntitlement')

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

        cy.get('input.oxd-input').eq(1).type('5');
    
        cy.get("button[type='submit']").contains("Save").click();

        //assertion dialog message to confirm
        cy.contains('Updating Entitlement').should('be.visible');
        cy.contains('button', 'Confirm').click();
        cy.contains('Leave Entitlements').should('be.visible');
        cy.screenshot('6-karyawan-berhasil-tambah cuti');

        
        // Logout
        cy.get('.oxd-userdropdown-tab').click();
        cy.contains('Logout').click();

        // c. Login sebagai admin
        cy.get("[placeholder='Username']").type(admin.username);
        cy.get("[placeholder='Password']").type(admin.password);
        cy.get("button[type='submit']").click();

        // d. Approve cuti
        cy.contains('Leave').click();
        cy.contains('Leave List').click();

        // Filter tanggal cuti
        cy.get('input[placeholder="yyyy-mm-dd"]').eq(0).type('2024-01-01');
        cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).type('2024-12-31');
        cy.get("button[type='submit']").contains("Search").click();
    });
    });