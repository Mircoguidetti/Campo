const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

// Connect to DATABASE
const databaseUrl  = process.env.DATABASE_URL || keys.DATABASE_URL_DEV;
mongoose.connect(databaseUrl);

module.exports = {mongoose};
