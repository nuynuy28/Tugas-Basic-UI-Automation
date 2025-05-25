context("Intermediate UI Test", function(){
    Cypress.on("uncaught:exception", (err, runnable) =>{
        return false; //ignore AngularJs error
    });

    describe("UI testing", function (){
        it("1.Static dropdown", function(){
            let url = "https://demo.automationtesting.in/Register.html"
            let dropdown = `#Skills`;
            let dropdownXpath = `//select[@id='Skills']`;

            cy.visit(url)
            //cy.get(dropdown).select(3);
            cy.xpath(dropdownXpath).select(10);



        });
        it("2.Static dropdown by visible text", function(){
            let url = "https://demo.automationtesting.in/Register.html"
            let dropdown = `#Skills`;
            let dropdownXpath = `//select[@id='Skills']`;

            cy.visit(url)
            cy.get(dropdown).select("Content Management Systems (CMS)");
    
        });

        it("3.Static dropdown by value", function(){
            let url = "https://demo.automationtesting.in/Register.html"
            let dropdown = `#Skills`;
            let dropdownXpath = `//select[@id='Skills']`;

            cy.visit(url)
            cy.get(dropdown).select("Backup Management");
        });

        it("4.Static dropdown by value", function(){
            let url = "https://demoqa.com/select-menu"
            let dropdown = `#oldSelectMenu`;
            let dropdownXpath = `//select[@id='oldSelectMenu']`;

            cy.visit(url, {
                failOnStatusCode: false,
                timeout: 120000, // tingkatkan waktu tunggu
            });
            cy.get(dropdown).select("4")
        });

        it("5.Static dropdown by value", function(){
            let url = "https://demoqa.com/select-menu"
            let dropdown = `#withOptGroup`;
            let reactInput = `react-select-2-input`;
            

            cy.visit(url, {
                failOnStatusCode: false,
                timeout: 120000, // tingkatkan waktu tunggu
            });
            cy.get(dropdown).click();
            cy.get(`#react-select-2-input-0-0`).click();

        });

        it.only("6.Dropdpwn looping", function(){
            let url = "https://demo.automationtesting.in/Register.html"
            let dropdown = `#Skills`;
            let optionList = [];
            let skill = ["AutoCAD", "Certifications", "Client Support"];            
            

            cy.visit(url, {
                failOnStatusCode: false,
                timeout: 120000, // tingkatkan waktu tunggu
            });
            cy.get(dropdown)
            .find("option")
            .each(function(option){
                const optionValue = option.val()//get value dari option
                optionList.push(optionValue)
            });
            cy.wrap(optionList).should("include.members", skill);
            cy.get(dropdown)
            .select("Certifications")
            .should("have.value", "Certifications")
            
        });

    });
});