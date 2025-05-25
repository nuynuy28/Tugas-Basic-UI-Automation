context("Coba coba UI testing with cypress", function(){
    describe("e2e testing", function (){
        it("Bisa masuk web", function(){
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
           
            //input user dan password
            cy.get("[placeholder='Username']").type("Admin");
            let password = cy.xpath("//input[@placeholder='Password']");
            password.type('admin123');

            //klik tombol login
            cy.xpath("//button[@type='submit']").click();

            //verifikasi sudah masuk dashboard
            cy.url().should("include", "/dashboard")


        });
    });
});