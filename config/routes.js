module.exports = function (router) {
    // route to render the homepage
    router.get('/', function (req, res) {
        res.render('home');
    });

    // route to render the saved handlebars page
    router.get('/saved', function (req, res) {
        res.render('saved');
    });
};