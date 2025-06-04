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
        // cy.wait(2000);
    }

    selectAirlanes({
        airlanesName
    }){
        cy.get(element.filterAirlanes);
        cy.contains('Show all').click();
        cy.get(element.airlanesName).contains(airlanesName).click();
        cy.wait(2000);
        cy.get(element.typeAirlanes).first().click();
        cy.wait(1000);
        cy.get(element.buttonSelect).contains('Select').click();
        cy.wait(2000);
        cy.contains('Contact details');
    }

    inputContactDetails({
        firstname, lastname, email, country, countryCode,
        phoneNumber, gender, firstMiddleName, lastName,
        dateDay, dateMonth, dateYear, nationality, passportNumber,
        passportDay, passportMonth, passportYear, region
    }){
        cy.get(element.firstname).type(firstname);
        cy.get(element.lastname).type(lastname);
        cy.get(element.email).type(email);
        // cy.get(element.country).type(country);
        // cy.get(element.countryCode).type(countryCode);
        cy.get(element.phoneNumber).type(phoneNumber);
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
        // cy.get(element.passportNumber).type(passportNumber);
        // cy.get(element.region).click();
        // cy.wait(1000);
        // cy.get(element.searchRegion).contains(region).click();
        // cy.get(element.passportDay).type(passportDay);
        // cy.get(element.passportMonth).click();
        // cy.get(element.monthPassport).contains(passportMonth).click();
        // cy.get(element.passportYear).type(passportYear);
        cy.get(element.continueButton).contains('Continue to add-ons').click();
        cy.wait(2000);
        cy.get(element.addOns).contains('Upgrade your support level');
        cy.get(element.basicAddons).click({ multiple: true });
        cy.get(element.travelProtection).contains('No, thanks, I’ll risk it.').click();
        cy.wait(2000);
        cy.get(element.paymentButton).contains('Continue to payment').click();
        cy.wait(2000);
        cy.get(element.verifyLevel).contains('Upgrade your support level');
        cy.get(element.buttonNo).contains('No, thanks').click({force: true});
    }
}

export default new BookFlight();