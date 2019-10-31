// 'use strict';
console.log('Comments.js');
var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var commentSchema = new Schema({
    // associating article comment goes with
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: 'Headline'
    },
    date: String,
    commentText: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model('Comments', commentSchema);

// Export the Note model
module.exports = Comment;