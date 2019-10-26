'use strict';

// all four were installed 10/25/ 5:44pm
const express = require('express');
const exphbs = require('express-handlebars');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Making a request via axios for The Onion site

axios.get('https://www.theonion.com/').then(function (response) {
    // Load the Response into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);
    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $('section').each(function (i, element) {
        // Save the text of the element in a "title" variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element).children().attr('href');

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: link
        });

    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);

});