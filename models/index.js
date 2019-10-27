'use strict';
console.log('index.js');

// Exporting an object containing all of our models
module.exports = {
    Article: require('./Articles'),
    Headline: require('./Headlines')
};