// importing scrape.js and makeDatejs

var Comment = require('../controller/');
var makeDate = require('../scripts/date');


module.exports = {
    get: function (dta, cb) {
        Comment.find({
            _headlineId: data._id
        },
            cb);
    },
    save: function (data, cb) {
        var newComment = {
            _headlineId: data._id,
            date: makeDate(),
            commentText: data.commentText
        };
        Comment.create(newComment, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function (data, cb) {
        Comment.remove({
            _id: data._id
        }, cb);
    }
};