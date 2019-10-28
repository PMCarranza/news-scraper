'use strict';
console.log('app.js');

// Grab the articles as a json
$.getJSON('/Articles', function (data) {
    // for each one
    for (var i = 0; i < 10; i++) {
        // Display the headlines on the page
        $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    };
    console.log('DATA - - > ', data);

});

// Whenever someone clicks a p tag
$(document).on('click', 'p', function () {
    // Empty the headline from the headline section
    $('#headlines').empty();

    // save the id from the p tag
    var thisId = $(this).attr('data-id');
    console.log('THIS ID --> ', thisId);

    // Now make an ajax call for the Article
    $.ajax({
        method: 'GET',
        url: '/Articles/' + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log('DATA - - > ', data);
            // The title of the article
            // $('#headlines').append('<h2>' + data.title + '</h2>');
            // // An input to enter a new title
            // $('#headlines').append('<input id="titleinput" name="title" >');
            // // A textarea to add a new note body
            // $("#headlines").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#headlines").append("<button data-id='" + data._id + "' id='saveheadline'>Save Headline</button>");

            // If there's a note in the article
            if (data.headline) {
                // place te title of the headline in the title input
                $('titleinput').val(data.headline.title);
                // place the body of the note in the body textarea
                $('#bodyinput').val(data.headline.body);
            }
        });
});

// When you click the savenote button
$(document).on('click', '#saveheadline', function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr('data-id');

    // Run a POST request to change the headline, using what's entered in the inputs
    $.ajax({
        method: 'POST',
        url: '/Articles/' + thisId,
        data:{
        // value taken from title input
        title: $('#titleinput').val(),
        // value taken from headline textarea
        body: $('#bodyinput').val()
    }
    })

    // with that done
    .then(function (data) {
        console.log('DATA - - > ', data);
        // empty the headlines section
        $('#headlines').empty();
    });
// Also, remove the values entered in the input and textarea
$("#titleinput").val("");
$("#bodyinput").val("");
});
