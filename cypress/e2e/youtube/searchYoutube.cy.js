const youtubePage = require ('../../support/pageObjects/youtubePage');

const youtubeData = require ('../../fixtures/data/youtubeData.json');

describe('YouTube Trending Movie Test', () => {

  it('Open third video in Movies and validate title and channel', () => {
    cy.visit('https://www.youtube.com');
    cy.wait(2000);
    youtubePage.selectTrendingCategory(youtubeData.TrendingYoutube);
    cy.wait(4000);
    youtubePage.selectAndValidateVideos();
  });
});