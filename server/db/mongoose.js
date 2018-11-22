const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

// Connect to DATABASE
const url  =  process.env.DATABASE || keys.DATABASE_URL_DEV ;
mongoose.connect(url);

module.exports = {mongoose};
