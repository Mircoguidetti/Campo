const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new LocalStrategy(User.authenticate()));


passport.use(new GoogleStrategy({
  clientID: process.env.googleClientID || keys.googleClientID,
  clientSecret: process.env.googleClientSecret || keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({email: profile.emails[0].value}).then((existingUser) => {
    if(existingUser && !existingUser.account.includes('Google')){
      User.findByIdAndUpdate(existingUser.id,
        {$set: {account: existingUser.account.concat('Google')}},
        {new: true}).then((user) => {
          return done(null, existingUser)
        }).catch((error) => {
          return console.log(error)
        })
    }else{
      if(!existingUser) {
        new User({username: profile.displayName, account: 'Google', email: profile.emails[0].value}).save();
        return done(null, existingUser);
      }
      return done(null, existingUser)
    }
  }).catch((error) => {
    return done(error, null);
  });
}));


module.exports = {passport};
