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
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleID: profile.id}).then((existingUser) => {
    if (existingUser) {
      console.log('User already exist')
      return done(null, existingUser)
    }else{
      console.log('User has been registered')
      new User({googleID: profile.id, username: profile.displayName}).save()
      return done(existingUser)
    }
  })
  console.log(profile.id)
}))




module.exports = {passport};
