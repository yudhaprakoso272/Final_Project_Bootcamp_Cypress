const element = require ('../elementPage/agodaPage.json');

class BookFlight{
    searchFlying({
        flyingFrom, nameAirports, flyingTo,
        nameAirports2, dateDeparture, passenger
    }){
        cy.get(element.flightMenu).contains(element.flightName).click();
        cy.wait(2000);
        cy.contains('One-way');
        cy.get(element.inputFlyFrom).type(flyingFrom);
        cy.wait(1000);
        cy.contains(nameAirports).click();
        cy.get(element.inputFlyTo).type(flyingTo);
        cy.wait(1000);
        cy.contains(nameAirports2).click();
    }

    selectDate({
        dateDeparture
    }){
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formatted = tomorrow.toISOString().split('T')[0];
        cy.get(`[data-selenium-date]`);
        cy.contains(dateDeparture).first().click();
    }

    selectPassenger({
        passenger
    }){
        cy.get(element.passenger).click({ multiple: true });
        cy.contains(passenger).click();
        cy.wait(1000);
        cy.get(element.searchFlightButton).click();
    }

    selectAirlanes({
        airlanesName
    }){
        cy.get(element.filterAirlanes);
        cy.contains('Show all').click();
        cy.get(element.airlanesName).contains(airlanesName).click();
        cy.wait(2000);
        cy.get(element.sortBy).click();
        // cy.wait(1000);
        cy.get(element.listSortBy).click();
        cy.wait(2000);
        cy.get(element.typeAirlanes).first().click();
        cy.wait(2000);
        cy.get(element.buttonSelect).contains('Select').click();
        cy.wait(2000);
        cy.contains('Contact details');
    }

    inputContact1({
        firstname, lastname, email, country, countryCode,
        phoneNumber
    }){
        cy.get(element.firstname).type(firstname);
        cy.get(element.lastname).type(lastname);
        cy.get(element.email).type(email);
        // cy.get(element.country).type(country);
        // cy.get(element.countryCode).type(countryCode);
        cy.get(element.phoneNumber).type(phoneNumber);
    }

    inputContact2({
        gender, firstMiddleName, lastName,
        dateDay, dateMonth, dateYear, nationality
    }){
        cy.get(element.gender).click();
        cy.contains(gender).click();
        cy.wait(1000);
        cy.get(element.firstMiddleName).type(firstMiddleName);
        cy.get(element.lastName).type(lastName);
        cy.get(element.dateDay).type(dateDay);
        cy.get(element.dateMonth).click();
        cy.wait(1000);
        cy.get(element.month).contains(dateMonth).click();
        cy.get(element.dateYear).type(dateYear);
        cy.get(element.nationality).click();
        cy.wait(1000);
        cy.get(element.searchNationality).contains(nationality).click();
    }

    inputPassport({
        passportNumber,
        passportDay, passportMonth, passportYear, region
    }){
        cy.get(element.passportNumber).type(passportNumber);
        cy.get(element.region).click();
        cy.wait(1000);
        cy.get(element.searchRegion).contains(region).click();
        cy.get(element.passportDay).type(passportDay);
        cy.get(element.passportMonth).click();
        cy.get(element.monthPassport).contains(passportMonth).click();
        cy.get(element.passportYear).type(passportYear);
    }

    inputAddOns(){
        cy.get(element.continueButton).contains('Continue to add-ons').click({force: true});
        cy.wait(5000);
        // cy.get(element.flightUpgrade).contains('Flight upgrades');
        // cy.get(element.flightUpgrade).contains('Basic').click({ multiple: true });
        cy.get(element.addOns).contains('Upgrade your support level');
        cy.get(element.basicAddons).click({ multiple: true });
        cy.get(element.travelProtection).contains('No, thanks, I’ll risk it.').click();
        cy.wait(2000);
        // cy.get(element.paymentButton).contains('Continue to payment').click();
        // cy.wait(2000);
        // cy.get(element.verifyLevel).contains('Upgrade your support level');
        // cy.get(element.buttonNo).contains('No, thanks').click({force: true});
    }

    validateBookFlight(){
        cy.get(element.validateContainer).within(() => {
            // simpan firstname
            cy.get(element.firstMiddleName).invoke('text').as('firstName');

            // simpan lastname
            cy.get(element.lastName).invoke('text').as('lastName');

            // simpan departure time
            cy.get(element.saveDeparture).first().invoke('text').then((departure) => {
                Cypress.env('selectedDeparture', departure.trim());
            });

            // simpan arrival time
            cy.get(element.saveArrival).last().invoke('text').then((arrival) => {
                Cypress.env('selectedArrival', arrival.trim());
            });

            // klik button payment
            cy.get(element.paymentButton).contains('Continue to payment').click();
        });
        
        cy.wait(2000);
        cy.get(element.verifyLevel).contains('Upgrade your support level');
        cy.get(element.buttonNo).contains('No, thanks').click({force: true});

        // validasi firstname di halaman payment
        cy.get(element.validateFirstLast, { timeout: 10000 }).invoke('text').then((detailFirstName) => {
            cy.get('@firstName').then((expectedFirstName) => {
                // log firstname yang disimpan
                cy.log('Saved firstname:', expectedFirstName);
                console.log('Saved firstname:', expectedFirstName);

                expect(detailFirstName.trim()).to.include(expectedFirstName.trim().slice(0, 3));
                // expect(detailFirstName.trim()).to.equal(expectedFirstName.trim());
            });
        });

        // validasi lastname di halaman payment
        cy.get(element.validateFirstLast, { timeout: 10000 }).invoke('text').then((detailLastName) => {
            cy.get('@lastName').then((expectedLastName) => {
                // log firstname yang disimpan
                cy.log('Saved lastname:', expectedLastName);
                console.log('Saved lastname:', expectedLastName);

                expect(detailLastName.trim()).to.include(expectedLastName.trim().slice(5, 10));
                // expect(detailLastName.trim()).to.equal(expectedLastName.trim());
            });
        });

        cy.get(element.buttonDetail).click();

        // validasi departure time di halaman payment
        cy.get(element.validateDeparture).first().invoke('text').then((detailDeparture) => {
            // log departure time yang disimpan
            const savedDeparture = Cypress.env('selectedDeparture');
            cy.log('Saved Departure Time:', savedDeparture);
            console.log('Saved Departure Time', savedDeparture);

            expect(detailDeparture.trim()).to.equal(savedDeparture);
        });

        // validasi arrival time di halaman payment
        cy.get(element.validateArrival).last().invoke('text').then((detailArrival) => {
            // log departure time yang disimpan
            const savedArrival = Cypress.env('selectedArrival');
            cy.log('Saved Arrival Time:', savedArrival);
            console.log('Saved Arrival Time', savedArrival);

            expect(detailArrival.trim()).to.equal(savedArrival);
        });
    }
}

export default new BookFlight();