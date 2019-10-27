'use strict';
console.log('Articles.js');

var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
    title: {
        // `title` is required and of type String
        type: String,
        required: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },
    // `headline` is an object that stores a Headline id
    // The ref property links the ObjectId to the Headline model
    // This allows us to populate the Article with an associated Headline
    headline: {
        type: Schema.Types.ObjectId,
        ref: 'Headline'
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model('Article', ArticleSchema);

// export the Article model
module.exports = Article;