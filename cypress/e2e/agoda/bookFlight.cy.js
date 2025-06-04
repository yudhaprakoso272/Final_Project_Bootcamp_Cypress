const agodaPage = require ('../../support/pageObjects/agodaPage');

const bookData = require ('../../fixtures/data/bookFlightData.json');

describe('Agoda Flight Booking E2E', () => {

  it('Search flight from Jakarta to Singapore and validate Malaysia Airlines booking', () => {
    cy.visit('https://www.agoda.com');
    cy.wait(2000);
    agodaPage.searchFlying(bookData.oneWay);
    agodaPage.selectDate(bookData.oneWay);
    agodaPage.selectPassenger(bookData.oneWay);
    cy.wait(2000);
    agodaPage.selectAirlanes(bookData.oneWay);
    cy.wait(10000)
    agodaPage.inputContact1(bookData.oneWay);
    agodaPage.inputContact2(bookData.oneWay);
    agodaPage.inputPassport(bookData.oneWay);
    agodaPage.inputAddOns();
    agodaPage.validateBookFlight();
  });
});
