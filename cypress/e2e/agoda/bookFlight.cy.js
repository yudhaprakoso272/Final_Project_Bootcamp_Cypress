const agodaPage = require ('../../support/pageObjects/agodaPage');

const bookData = require ('../../fixtures/data/bookFlightData.json');

describe('Agoda Flight Booking E2E', () => {

  it('Search flight from Jakarta to Singapore and validate Malaysia Airlines booking', () => {
    // agodaPage.acceptCookies();
    cy.visit('https://www.agoda.com/');
    cy.wait(2000);
    agodaPage.searchFlying(bookData.oneWay);
    agodaPage.selectDate(bookData.oneWay);
    agodaPage.selectPassenger(bookData.oneWay);
    cy.wait(2000);
    agodaPage.selectAirlanes(bookData.oneWay);
    cy.wait(2000)
    agodaPage.inputContactDetails(bookData.oneWay);
    // agoda.goToFlights();
    // agoda.fillSearchForm('Jakarta', 'Singapore');
    // agoda.selectDateTomorrow();
    // agoda.clickSearch();

    // agoda.filterByAirline('Malaysia Airlines');
    // agoda.pickEarliestFlight();

    // agoda.fillPassengerDetails(
    //   Cypress.env('passengerFirstName'),
    //   Cypress.env('passengerLastName'),
    //   Cypress.env('passengerEmail')
    // );

    // agoda.captureBookingDetails();
    // agoda.goToPaymentPage();
    // agoda.validateBookingSummary();
  });
});
