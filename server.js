const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('./server/db/mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const flash	= require('connect-flash');
const passportAuth = require('./server/services/passportAuth');
const { sessionSecret } = require('./server/config/keys');

// Requiring models
const Comment	= require('./server/models/comment');
const User = require('./server/models/user');

// Requiring controllers
const campgrounds	 = require('./server/controllers/campgrounds')
const comments = require('./server/controllers/comments')
const index = require('./server/controllers/index');

// PORT config
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './server/views'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());


app.use(require('express-session')({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/comments',comments);
app.use(index);


//RUN THE SERVER
app.listen(port, () => {
  console.log(`The campo server is up on port ${port}`);
});
