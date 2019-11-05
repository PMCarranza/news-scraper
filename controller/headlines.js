// importing scrape.js and makeDatejs

console.log('headlines.js');

var scrape = require('../scripts/scrape');
var makeDate = require('../scripts/date');

// import the Headline mongoose model

var Headline = require('../models/Headline');

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < 20; i++) {
                // has data 
                // console.log('controller - headlines - ARTICLES - - > ', articles);
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    // updates new articles scraped via ids
    // update: function (query, cb) {
    //     console.log('UPDATING')
    //     Headline.update({ _id: query._id }), {
    //         $set: query
    //     }, {}, cb();
    // }
};