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
    // cy.wait(2000);
    // cy.get(element.showButton).contains('Show').click();
    // cy.contains(optionText).click();
  }

  selectProduct() {
    // cy.get(element.product).first()       // ambil baris pertama
    //   .find(element.selectProduct)             // ambil semua produk di baris
    //   .last()                            // ambil yang paling kanan
    //   .click();                          // klik atau aksi lain
    cy.get(element.product).then((items) => {
      const firstRowItems = Cypress._.take(items.toArray(), 5);
      cy.wrap(firstRowItems[4]).click(); // produk ke-3 (kanan)
    });

  }

  pickAndValidateRightmostProduct() {
    // Ambil nama dan harga produk ke-5 dari hasil pencarian
    cy.get(element.product).eq(4).within(() => {
      // Simpan nama produk
      cy.get('h2').invoke('text').as('selectedTitle');

      // Simpan harga produk (whole dollar)
      cy.get('.a-price-whole').first().invoke('text').then((price) => {
        Cypress.env('selectedPrice', price.trim());
      });

      // Klik judul produk untuk buka halaman detail
      cy.get('h2').click();
    });

    // Validasi nama di halaman detail
    cy.get('#title', { timeout: 10000 }).invoke('text').then((detailTitle) => {
      cy.get('@selectedTitle').then((expectedTitle) => {
        // Log nama produk yang disimpan
        cy.log('Saved product title:', expectedTitle);
        console.log('Saved product title:', expectedTitle);

        expect(detailTitle.trim()).to.include(expectedTitle.trim().slice(0, 10));
        // const trimmedDetailTitle = detailTitle.trim();
        // const trimmedExpectedTitle = expectedTitle.trim();

        // cy.log('Detail Title:', trimmedDetailTitle);
        // cy.log('Expected Title:', trimmedExpectedTitle);

        // try {
        //   expect(trimmedDetailTitle).to.equal(trimmedExpectedTitle); // Coba equal
        // } catch (err) {
        //   // Kalau gagal, fallback ke include 15 karakter
        //   cy.log('Judul tidak persis sama, fallback ke pencocokan sebagian');
        //   expect(trimmedDetailTitle).to.include(trimmedExpectedTitle.slice(0, 15));
        // }
      });
    });

    // Validasi harga di halaman detail
    cy.get('.a-price-whole').first().invoke('text').then((detailPrice) => {
      // Log harga yang disimpan
      const savedPrice = Cypress.env('selectedPrice');
      cy.log('Saved product price:', savedPrice);
      console.log('Saved product price:', savedPrice);

      // Detail price mungkin tidak ada tanda $ di whole price, jadi tambahkan sendiri
      expect(detailPrice.trim()).to.equal(savedPrice);
    });
  }
}

export default new AmazonPage();
