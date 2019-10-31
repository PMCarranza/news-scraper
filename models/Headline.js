// 'use strict';
console.log('Headline.js');

var mongoose = require('mongoose');

// Save a reference to the Schema constructor
// extract the Schema constructor from the mongoose object
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
// This is similar to a Sequelize model
// everything declared inside the new Schema object will be fields in the Article collection
var headlineSchema = new Schema({
    headline: {
        // `title` is required and of type String
        type: String,
        required: true,
        unique: true
    },
    // `summary` is required and of type String
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model('Headline', headlineSchema);

// export the Headline model
module.exports = Headline;