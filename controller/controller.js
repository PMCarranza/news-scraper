

// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const cheerio = require('cheerio');
// const app = express();

// var Headline = require('../models/Headline');
// var Comment = require('../models/Comments');


// // routes

// // A GET route for scraping the lahora.gt website
// app.get('/scrape', function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get('https://lahora.gt/').then(function (response) {
//         // Load the Response into cheerio and save it to a variable
//         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//         var $ = cheerio.load(response.data);

//         // console.log('$ - - > ', $);

//         // With cheerio, find each h3-tag with the "title" class
//         // (i: iterator. element: the current element)
//         $('h3').each(function (i, element) {

//             // An empty object to save the data that we'll scrape
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children('a')
//                 .text();
//             result.link = $(this)
//                 .children('a')
//                 .attr('href');

//             // Create a new Article using the `result` object built from scraping mongoose uses promises, mongo does not.
//             // this is Article exported from Article.js
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log('Articles--> ', dbArticle);

//                 })
//                 .catch(function (err) {
//                     // if error ocurred, log it
//                     console.log(err);
//                 });
//         });

//         // Send a message to the client
//         // res.send('Scrape Complete');
//         res.redirect("/");
//     });
// });

// app.get('/', function (req, res) {
//     // res.render('index');
//     // console.log('RES - - > ', res);
//     db.Article.find({}).then(function (allArticles) {
//         for (let i = 0; i < 20; i++) {
//             // console.log(allArticles[i].title)
//         }
//         res.render('index', { data: allArticles });
//     })

//     // console logs the function
//     // console.log('DBARTICLE', db.Article);

// });
// // Route for getting all Articles from the db
// app.get('/articles', function (req, res) {

//     // Grab every document in the Articles collection
//     db.Article.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// // Route for grabbing a specific Article by id, populate it with it's headline
// app.get('/articles/:id', function (req, res) {
//      // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//         // ..and populate all of the headlines associated with it
//         // .populate('headline') references the 'headline' field and supplies the headline object with the data that is collected via the _id currently stored, this populates headline object ref:'Headline'in Article.js
//         .populate('headline')
//         .then(function (dbArticle) {
//             // If we were able to successfully find an Article with the given id, send it back to the client
//             res.json(dbArticle)
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// // Route for saving/updating an Article's associated headline
// // create an association with the headline it belongs to
// app.post('articles/:id', function (req, res) {
//     // Create a new headline and pass the req.body to the entry
//     db.Headline.create(req.body)
//         .then(function (dbHeadline) {
//             // If a Headline was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Headline
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { headline: dbHeadline._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             console.log('NEW ARTICLE - - > ', dbArticle);
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });