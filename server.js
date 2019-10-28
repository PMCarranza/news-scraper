'use strict';

// express, exphbs, cheerio, axios were installed 10/25/ 5:44pm
// added logger and mongoose 10/26 5pm
const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const cheerio = require('cheerio');
const axios = require('axios');

// Require all models
var db = require('./models');

// code needed for heroku deployment

var PORT = 3000;

// Initialize Express
const app = express();


// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static('public'));

// use handlebars
// By default, Express will require() the engine based on the file extension. In this case handlebar and express-handlebars are being required.
// the folder structure for this is the views(folder)layouts,partials(subfolders), index.handelbars in views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// After the view engine is set, there is no need to specify the engine or load the template engine module in the app; Express loads the module internally
// this is better explained in controller.js where the html files are referenced
app.set('view engine', 'handlebars');

// Connect to the Mongo DB and if ti hasn't been created already, creates a DB named newsScraperDB
// useNewUrlParser parses the db url
mongoose.connect('mongodb://localhost/newsScraper', { useNewUrlParser: true });

// store the mongoose connection in a variable
const dbConnection = mongoose.connection;

// listening for DB connection error
dbConnection.on('error', console.error.bind(console, 'connection error:'));

// listening for DB connection succes
dbConnection.once('open', () => {
    console.log('connected to Mongoose');
    // performs DB on connection queries here (e.g. run a bulkinsert)
});

// routes

// A GET route for scraping the lahora.gt website
app.get('/scrape', function (req, res) {
    // First, we grab the body of the html with axios
    axios.get('https://lahora.gt/').then(function (response) {
        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // With cheerio, find each h3-tag with the "title" class
        // (i: iterator. element: the current element)
        $('h3').each(function (i, element) {

            // An empty object to save the data that we'll scrape
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children('a')
                .text();
            result.link = $(this)
                .children('a')
                .attr('href');

            // Create a new Article using the `result` object built from scraping mongoose uses promises, mongo does not.
            // this is Article exported from Article.js
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log('Articles--> ', dbArticle);
                })
                .catch(function (err) {
                    // if error ocurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send('Scrape Complete');

    });
});

app.get('/', function (req, res) {
    res.render('index');

    // res.render('index', { nws: db.Article });
    // console logs the function
    // console.log('DBARTICLE', db.Article);

});
// Route for getting all Articles from the db
app.get('/articles', function (req, res) {

    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's headline
app.get('/articles/:id', function (req, res) {
     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the headlines associated with it
        // .populate('headline') references the 'headline' field and supplies the headline object with the data that is collected via the _id currently stored, this populates headline object ref:'Headline'in Article.js
        .populate('headline')
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle)
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated headline
// create an association with the headline it belongs to
app.post('articles/:id', function (req, res) {
    // Create a new headline and pass the req.body to the entry
    db.Headline.create(req.body)
        .then(function (dbHeadline) {
            // If a Headline was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Headline
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { headline: dbHeadline._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function () {
    console.log('App running on port - - > ' + PORT);
});