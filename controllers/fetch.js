// Controller for our scraper
// ============================
var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    // scrape laHora.gt
    return scrape()
      .then(function (articles) {
        // console.log('fetch articles - - > ', articles);
        // then insert articles into the db
        return db.Headline.create(articles);
      })
      .then(function (dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "Nothing new to see, scrape later!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
          console.log('# of Articles -  - > ', dbHeadline);
        }
      })
      .catch(function (err) {
        // console.log('err ', err);
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
