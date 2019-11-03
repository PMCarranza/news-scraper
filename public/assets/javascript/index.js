console.log('index.js');

$(document).ready(function () {

    // settin a reference to the article-container div where all the dynamic content will go
    // adding event listeners to any dynamically generated 'save article'
    // and 'scrape new article' buttons
    var articleContainer = $('.article-container');

    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleScrape);

    // once the page is ready, run the initPage function to kick things off
    initPage();

    function initPage() {
        // empty the article container, run an ajax request for any unsaved headlines
        articleContainer.empty();
        $.get('/api/headlines?saved=false').then(function (data) {
            console.log('DATA - - > ', data);
            // if there are headlines render them to the page
            if (data && data.length) {
                renderArticles(data);
            } else {
                // otherwise render message saying there are no articles
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        // this function handles appending html containing our article data to the page
        // array of JSON containing all available articles is passed
        var articlePanels = [];
        // each article object is passed to the createPanel function which returns a bootstrap panel with the article data inside
        for (var i = 0; i < 20; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        // once all of the html for the articles is in the articlePanels
        // append them to the articlePanels container
        articleContainer.append(articlePanels);
    };

    function createPanel(article) {
        // this function takes in  a single JSON object for an article/headline
        // it constructs a jQuery element containing all of the formatted html for the artticle panel
        var panel =
            $(['<div class="panel panel-default">',
                '<div class="panel-heading">',
                '<h3>',
                article.headline,
                '<a class="btn btn-success save">',
                'Save Article',
                '</a>',
                '</h3>',
                '</div>',
                '<div class="panel-body">',
                '<a href=>',
                article.link,
                '</a>',
                '</div>',
                '</div'].join(''));

        // attaches the article's id to the jQuery element
        // will use this when trying to figure out which article the user wants to save
        panel.data('_id', article._id);
        // returns the constructed panel jQuery element
        return panel;
    };

    function renderEmpty() {

        // this funtion renders some html to the page explaining there are not any articles to view
        // using a joined array of html string data vecause it's easier to read/change than a concatenated string
        var emptyAlert =
            $(['<div class="alert alert-warning text-center">',
                '<h4> No new articles.</h4>',
                '</div>',
                '<div class="panel panel-default">',
                '<div class="panel-heading text-center">',
                '<h3>What would you like to do?</h3',
                '</div>',
                '<div class-"panel-body text-center">',
                '<h4><a class="scrape-new">Try Scraping New Articles</a><h4>',
                '<h4><a href="/saved">Go to Saved Articles</a><h4>',
                '</div>',
                '</div>'
            ].join(''));
        // append data to the page
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        // funtion runs when user wants to save an article
        // when articles are initially rendered a js object containing the headline id is attached to the element using the .data method
        // below that data is retrieved
        var articleToSave = $(this).parents('.panel').data();
        // console.log('ARTICLE TO SAVE - - > ', articleToSave);

        // Remove panel from page
        $(this)
            .parents(".panel")
            .remove();

        articleToSave.saved = true;
        console.log('ARTICLE TO SAVE - - > ', articleToSave);

        // using a patch method to be semantic since this is an update to an existing record in the collection
        $.ajax({
            method: 'PUT',
            url: '/api/headlines',
            data: articleToSave
        })
            .then(function (data) {
                console.log(data);
                // if succesful, mongoose will send back an object containing a key of 'ok with the value of 1
                // (which casrts to 'true')
                if (data.saved) {
                    // run the iniPage function again.  this will reload the entire list of articles
                    intiPage();
                };
            });
    };

    function handleArticleScrape() {
        // this function handles the user clicking any 'scrape new article' buttons
        $.get('/api/fetch')
            .then(function (data) {
                // if we are able to succesfully scrape LaHora.gt and compare the articles to those already in the collection, re render the articles on the page
                // and let the user know how many unique articles we were able to save
                initPage();
                // alert(data.message);
                bootbox.alert('<h3 class="text-center m-top-80">' + data.message + '</h3>');
            });
    }

    function handleArticleClear() {
        $.get("api/clear").then(function () {
            articleContainer.empty();
            initPage();
        });
    }
});