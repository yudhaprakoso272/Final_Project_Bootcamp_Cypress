const element = require ('../elementPage/amazonPage.json');

class AmazonPage {
  search({
    searchName
  }) {
    cy.get(element.inputSearch).type(searchName);
    cy.get(element.buttonSearch).click();
  }

  sortBy() {
    cy.get(element.buttonFilter).contains('Sort by').click();
    cy.get(element.sortType);
    cy.get(element.sortBy).contains('Price: High to Low').click();
    cy.wait(2000);
    // cy.get(element.showButton).contains('Show').click();
    // cy.contains(optionText).click();
  }

  selectFirstNonSponsored() {
    cy.get('[data-component-type="s-search-result"]')
      .not(':has([aria-label="Sponsored"])')
      .first()
      .find('h2 a')
      .click();
  }

  validateProductDetails() {
    cy.get('#productTitle').invoke('text').as('title');
    cy.get('.a-price .a-offscreen').first().invoke('text').as('price');

    cy.get('@title').then((title) => {
      cy.log('Product Title:', title.trim());
    });

    cy.get('@price').then((price) => {
      cy.log('Product Price:', price.trim());
    });
  }
}

export default new AmazonPage();
