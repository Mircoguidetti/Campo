const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

// Connect to DATABASE
const url  = keys.mongoURI ;
mongoose.connect(url);

module.exports = {mongoose};
