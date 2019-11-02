// // 'use strict';
// console.log('app.js');
// var scrape;

// $('#scrape').on('click', function (req, res) {

//     scrape = $(this).data('value');

//     console.log('value of button - - > '+ scrape);

    
//     // First, we grab the body of the html with axios

//     // 'https://lahora.gt/'

//     axios.get(scrape).then(function (response) {
//         event.preventDefault();
//         console.log(response);

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

//         // //Send a message to the client
//         // res.send('Scrape Complete');
//         // res.redirect("/");
//     });
// });

// // $('.delete').on('click', function () {
// //     var thisId = $(this).attr('data-id');
// //     $.ajax({
// //         method: 'POST',
// //         url: '/articles/delete' + thisId
// //     }).done(function (data) {
// //         window.location = '/saved';
// //     });
// // });

// $('#save-news').on('click', function (event) {

//     event.preventDefault();

//     // var thisId = $('#save');
//     // console.log('THIS ID - - > ', thisId);
//     if (!$('#save-news' + thisId).val()) {
//         alert('Select news to be saved');
//     } else {
//         $.ajax({
//             method: 'POST',
//             url: '/news/' + thisId,
//             data: {
//                 text: $('#save-news' + thisId).val()
//             }
//         }).done(function (data) {
//             console.log('D A T A - - > ', data);
//             // $('#news-text' + thisId).val('');
//             // $('#.modal-news').modal('hide');
//             // window.location = '/saved';
//         });
//                 res.redirect("/articles");

//     };
// });

// $(".delete-news").on("Click", function(){
// 	var newsId = $(this).attr("data-news-id");
// 	var articleId = $(this).attr("data-article-id");
// 	$.ajax({
// 		method: "DELETE",
// 		url: "/news/delete/" + newsId + "/" + articleId
// 	}).done(function(data){
// 		console.log(data)
// 		$(".modal-news").modal("hide");
// 		window.location = "/saved"
// 	})
// });




// // Grab the articles as a json
// $.getJSON('/Articles', function (data) {
//     //// for each one
//     for (var i = 0; i < 20; i++) {
//         // Display the headlines on the page
//         // $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     };
//     console.log('DATA - - > ', data);

// });

// // Whenever someone clicks a p tag
// $(document).on('click', 'p', function () {
//     // Empty the headline from the headline section
//     $('#headlines').empty();

//     // save the id from the p tag
//     var thisId = $(this).attr('data-id');
//     console.log('THIS ID --> ', thisId);

//     // Now make an ajax call for the Article
//     $.ajax({
//         method: 'GET',
//         url: '/Articles/' + thisId
//     })
//         // With that done, add the note information to the page
//         .then(function (data) {
//             console.log('DATA - - > ', data);
//             // The title of the article
//             // $('#headlines').append('<h2>' + data.title + '</h2>');
//             // // An input to enter a new title
//             // $('#headlines').append('<input id="titleinput" name="title" >');
//             // // A textarea to add a new note body
//             // $("#headlines").append("<textarea id='bodyinput' name='body'></textarea>");
//             // // A button to submit a new note, with the id of the article saved to it
//             // $("#headlines").append("<button data-id='" + data._id + "' id='saveheadline'>Save Headline</button>");

//             // If there's a note in the article
//             if (data.headline) {
//                 // place te title of the headline in the title input
//                 $('titleinput').val(data.headline.title);
//                 // place the body of the note in the body textarea
//                 $('#bodyinput').val(data.headline.body);
//             }
//         });
// });

// // When you click the savenote button
// $(document).on('click', '#saveheadline', function () {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr('data-id');

//     // Run a POST request to change the headline, using what's entered in the inputs
//     $.ajax({
//         method: 'POST',
//         url: '/Articles/' + thisId,
//         data:{
//         // value taken from title input
//         title: $('#titleinput').val(),
//         // value taken from headline textarea
//         body: $('#bodyinput').val()
//     }
//     })

//     // with that done
//     .then(function (data) {
//         console.log('DATA - - > ', data);
//         // empty the headlines section
//         $('#headlines').empty();
//     });
// // Also, remove the values entered in the input and textarea
// $("#titleinput").val("");
// $("#bodyinput").val("");
// });
