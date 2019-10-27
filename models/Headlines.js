'use strict';
console.log('Headlines.js');
var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
    // 'title' is of type string
    title: String,
    // `body` is of type String
    body: String
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model('Headlines', HeadlineSchema);

// Export the Note model
module.exports = Headline;