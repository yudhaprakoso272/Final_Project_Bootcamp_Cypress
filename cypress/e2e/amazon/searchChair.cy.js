const amazonPage = require ('../../support/pageObjects/amazonPage');

const searchData = require ('../../fixtures/data/searchChairData.json');

describe('Amazon Search and Validation', () => {

  it('Search for chair, sort by highest price, select item, and validate name and price', () => {
    cy.visit('https://www.amazon.com');
    cy.wait(2000);
    amazonPage.search(searchData.search);
    cy.wait(2000);
    amazonPage.sortBy();
    cy.wait(2000);
    // amazonPage.selectProduct();
    amazonPage.pickAndValidateRightmostProduct();
  });
});
