const element = require ('../elementPage/youtubePage.json');

class YouTubePage {
    selectTrendingCategory({
        tabName
    }) {
        cy.get(element.menuTrending).contains('Trending').click();
        cy.wait(2000);
        cy.get(element.tabTrending).contains(tabName).click();
    }

    selectAndValidateVideos() {
        // Ambil judul dan nama channel dari video trending ke-3
        cy.get(element.selectVideo, { timeout: 10000 })
        .eq(2) // Index ke-2 = video no. 3
        .within(() => {
            cy.get(element.videoTitle).invoke('text').as('videoTitle');
            cy.get(element.videoChannel).invoke('text').as('channelName');
            cy.get(element.videoTitle).click();
        });

        // Validasi judul video dan nama channel
        cy.get(element.validateTitle, { timeout: 10000 }).invoke('text').then((detailTitle) => {
            cy.get('@videoTitle').then((expectedTitle) => {
                // log nama title yang disimpan
                cy.log('Saved video title:', expectedTitle);
                console.log('Saved video title:', expectedTitle);

                expect(detailTitle.trim()).to.include(expectedTitle.trim().slice(0, 10));
            });
            // cy.get('h1.title').should('contain.text', expectedTitle.trim());
        });

        cy.get(element.videoChannel, { timeout: 10000 }).invoke('text').then((detailChannel) => {
            cy.get('@channelName').then((expectedChannel) => {
                // log nama title yang disimpan
                cy.log('Saved channel name:', expectedChannel);
                console.log('Saved channel name:', expectedChannel);

                expect(detailChannel.trim()).to.include(expectedChannel.trim().slice(0, 10));
            });
            // cy.get('ytd-channel-name').first().should('contain.text', expectedChannel.trim());
        });
    }
}

export default new YouTubePage();