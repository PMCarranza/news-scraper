console.log('scrape.js');

const cheerio = require('cheerio');
const request = require('request');

var scrape = function (cb) {
    request('https://lahora.gt/', function (err, res, body) {
        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(body);
        // console.log('BODY - - > ', body);
        // console.log('ERROR - - > ', err);
        // console.log('$', $);

        var articles = [];

        // With cheerio, find each h3-tag with the "title" class
        // (i: iterator. element: the current element)
        $('h3').each(function (i, element) {
                
            var head = $(this).children('a').text();
            var link = $(this).children('a').attr('href');
            // console.log('link - - > ', link);

                var dataToAdd = {
                    headline: head,
                    link: link
                };
                articles.push(dataToAdd);
                // console.log('DATA TO ADD - - > ', dataToAdd);
        });
        cb(articles);
        // console.log('ARTICLES - - > ', articles);
    });
};

module.exports = scrape;