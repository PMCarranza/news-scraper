// 'use strict';

// express, exphbs, cheerio, axios were installed 10/25/ 5:44pm
// added logger and mongoose 10/26 5pm
const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const cheerio = require('cheerio');
const axios = require('axios');

// Initialize Express
const app = express();

// set up an Express router
const router = express.Router();
require('./config/routes')(router);

// Require all models
// var db = require('./models');

// code needed for heroku deployment




// Configure middleware
// Use morgan logger for logging requests
app.use(logger('dev'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static(__dirname + '/public'));
console.log('__DIRNAME - -> ', __dirname);

// // use bodyParser
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// use handlebars
// By default, Express will require() the engine based on the file extension. In this case handlebar and express-handlebars are being required.
// the folder structure for this is the views(folder)layouts,partials(subfolders), index.handelbars in views
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

// request going through router middleware
app.use(router);


const database = process.env.MONGODB_URI || 'mongodb://localhost/newsScraper';


// Connect to the Mongo DB and if ti hasn't been created already, creates a DB named newsScraperDB
// useNewUrlParser parses the db url
// mongoose.connect('mongodb://localhost/newsScraper', { useNewUrlParser: true });
mongoose.connect(database, { useNewUrlParser: true }, function (error) {
    if (error) {
        console.log(error);
    }
});

// // connect mongoose to the database
// mongoose.connect(database, function (error) {
//     // log any errors connecting with mongoose
//     if (error) {
//         console.log(error);
//     }
//     // log succesful connection
//     else {
//         console.log('Connected to mongoose');
//     };
// });

    var PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, function () {
    console.log('App running on port - - > ' + PORT);
});