console.log('routes.js');

// import scrape function
var scrape = require('../scripts/scrape');

// import headlines and comments from the controller
var headlinesController = require('../controller/headlines');
var commentsController = require('../controller/comments');

module.exports = function (router) {
    // route to render the homepage
    router.get('/', function (req, res) {
        res.render('home');
    });

    // route to render the saved handlebars page
    router.get('/saved', function (req, res) {
        res.render('saved');
    });

    router.get('/api/fetch', function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: 'Noting new at the moment, check back later'
                });
            } else {
                res.json({
                    message: 'Added ' + docs.insertedCount + ' new articles'
                });
            }
        });
    });
    router.get('/api/headlines', function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.jason(data);
        });
    });
    router.delete('/api/headlines/:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.patch('/api/headlines', function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });

    router.get('/api/comments/:headline_id?', function (req, res) {
        var query = {};
        if (req.params.healine_id) {
            query._id = req.params.headline_id;
        }
        commentsController.get(query, function (err, data) {
            res.json(data);
        });
    });

    router.delete('/api/comments/:id', function (eq, res) {
        var query = {};
        query._id = req.params.id;
        commentsController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.post('/api/comments', function (req, res) {
        commentsController.save(req.body, function (data) {
            res.json(data);
        });
    });
};