// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape the lahora.gt website
var scrape = function() {
  // Scrape the lahora.gt website
  return axios.get("https://lahora.gt/").then(function(res) {
    var $ = cheerio.load(res.data);
    // console.log("scraping");
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the ".entry-title td-module-title" class
    // (i.e, the section holding the articles)
    $("h3").each(function(i, element) {
      // In each article section, we grab the headline, URL

      // Grab the headline of the article
      var head = $(this)
        .find("a")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .attr("href");

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // console.log('headneat - - > ', headNeat);

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          headline: headNeat,
          url: url
        };

        // Push new article into articles array
        articles.push(dataToAdd);
        // console.log('articles push - - > ', dataToAdd);
        // console.log('articles - - > ', articles);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
