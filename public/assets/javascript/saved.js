console.log('savedjs');

$(document).ready(function () {
    // getting a reference to the article container div we will be rendering all articles
    var articleContainer = $('.article-container');
    // addin event listeners for dynamically generated buttons for deleting articles,
    // pulling up articles notes, saving articles notes, and deleting article notes
    $(document).on('click', 'btn.delete', handleArticleDelete);
    $(document).on('click', 'btn.notes', handleArticleComments);
    $(document).on('click', 'btn.save', handleCommentSave);
    $(document).on('click', 'btn.note-delete', handleCommentDelete);

    // initPage kicks everything off when the page is loaded
    initPage();

    function initPage() {
        // empty the article container, run an ajax request for any saved headlines
        $.get('/api/headlines?saved=true').then(function (data) {
            // if there are headlines, render them to the page
            if (data && data.length) {
                renderArticles(data);
            } else {
                // otherwise render a message explaining there are no articles
                renderEmpty();
            };
        });
    };

    function renderArticles(articles) {
        // this function handles appending html containing the article data to the page
        // an array of json containing all available articles in the db is passed
        var articlePanels = [];

        // we pass each article json object to the createPanel function which returns a bootstrap panel with the article data inside
        for (var i = 0; i < 20; i++) {
            articlePanels.push(cratePanel(articles[i]));
        }

        // once we have all of the html for the articles stored in the articlePanels array
        // append them to the articlePanels containe
        articlesContainer.append(articlePanels);
    };

    function createPanel(article) {
        // this function takes in a single jason object for an article/headline
        // it constructs a jQuery element containing all of the formatted html for the article panel
        var panel =
            $(['<div class="panel panel-default">',
                '<div class="panel-heading">',
                '<h3>',
                article.headline,
                '<a class="btn btn-danger delete">',
                'Delete from Saved',
                '</a>',
                '</div>',
                '<div class="panel-body">',
                article.summary,
                '</div>',
                '</div>'
            ].join(''));

        // attaching the article's id to the jQuery element
        // we will use this when trying to figure out which article the user wants to remove or open notes for
        panel.data('_id', article._id);
        // return the constructed panel jQuery element
        return panel;
    }

    function renderEmpty() {
        // this function renders some html to the page explaining there are no articles to view
        // using a joined array of html string data b/c it's easier to read/change than a concatenated string
        var emptyAlert =
            $(['<div class="alert alert-warning text-center">',
                '<h4> No articles have been saved</h4>',
                '</div>',
                '<div class="panel panel-default">',
                '<div class="panel-heading text-center">',
                '<h3>Would you like to Browse available articles?</h3>',
                '</div>',
                '</div>'
            ].join(''));
        // appending this data to the page
    }

    function renderCommentsList(data) {

        // this function handles rendering comments list items to our comments modal
        // setting up an array of comments to render after finished
        // also setting up a currentComment variab le to temporarily store each comment
        var commentsToRender = [];
        var currentComment = [];
        if (!data.comments.length) {
            // if there are no comments, just display a message saying this
            currentComment = [
                '<li class="list-group-item">',
                'No comments for this article yet.',
                '</li>'
            ].join('');
            commentsToRender.push(currentComment);
        } else {

            // if there are comments, go through eah one
            for (var i = 0; i < 20; i++){
                // constructs an li element to contain the comments and a delete button
                currentComment.children('button').data('_id', data.comments[i]._id);
                // adding our currentComment to the CommentsToRender array
                commentsToRender.push(currentComment);
            };
        };
        // now append the commentsToRender to the note-container inside the comment modal
        $('.note-container').append(commentsToRender);
    };

    function handleArticleDelete() {

        // this function handles dleteing articles/headlines
        // grabbing the id of the article to get comments from the panel element, the delete button sits inside
        var articleToDelete = $(this).parents('.panel').data();
        // using a delete method here just to be semantic since we are deleting an article/headline
        $.ajax({
            method: 'DELETE',
            url: '/api/headlines/' + articleToDelete.id
        }).then(function (data) {
            // if this works out, run initPage again which will rerender our list of saved articles
            if (data.ok) {
                initPage();
            };
        });
};

function handleArticleDelete() {

    // this function handles dleteing articles/headlines
    // grabbing the id of the article to get comments from the panel element, the delete button sits inside
    var currentArticle = $(this).parents('.panel').data();
    // grab any comments with this headline/article id
    $.get('/api/comments' + currentArticle._id).then(function (data) {
        // constructing our initial html to add to the comments modal
        var modalText = [
            '<div class="container-fluid text-center">',
            '<h4>Comments for Article: ',
            currentArticle._id,
            '</h4>',
            '<hr />',
            '<ul class="list-group note-container',
            '</ul>',
            '<textarea placeholder="New Comment" rows="5" cols="60></textarea>',
            '<button class="btn-success save">Save Comment</button',
        ]
    })
}

});