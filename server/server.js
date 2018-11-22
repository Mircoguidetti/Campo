const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const passport = require ('passport')
const methodOverride = require('method-override');
const flash	= require('connect-flash');
const handlePassportAuth = require ('./services/handlePassportAuth');

// Requiring models
const Comment	= require('./models/comment');
const User = require('./models/user');

// Requiring routes
const campgroundsRoutes	 = require('./routes/campgrounds')
const commentsRoutes = require('./routes/comments')
const indexRoutes = require('./routes/index');

// PORT config
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use(methodOverride('_method'));
app.use(flash());


// Passport config
app.use(require('express-session')({
  secret: 'pam is the cutest cat in the world',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});


app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments',commentsRoutes);
app.use(indexRoutes);


//RUN THE SERVER
app.listen(port, () => {
  console.log(`The campo server is up on port ${port}`);
});
