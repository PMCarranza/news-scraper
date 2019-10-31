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
        $.get('/api/headlines?saved-false').then(function (data) {
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
        for (var i = 0; i < 20; i++){
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
            $(['<div class="panel-default">',
                '<div class="panel-heading">',
                '<h3>',
                article.headline,
                '<a class="btn btn-success save">',
                'Save Article',
                '</a>',
                '</h3>',
                '</div>',
                '<div class="panel-body">',
                article.summary,
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
})