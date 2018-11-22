const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

// Connect to DATABASE
const url  =  keys.DATABASE_URL_DEV || process.env.DATABASE;
mongoose.connect(url);

module.exports = {mongoose};
