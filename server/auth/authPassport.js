var passport = require('passport');
var bcyrpt = require('bcrypt-nodejs');
var User = require('../db/model/User');
var routes = require('../router');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// testing whether or not findById will work
passport.deserializeUser(function(user, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local', new LocalStrategy({
    username: username,
    password: password
  },
  function(username, password, done) {
    User.where({username: username }, function (err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // do something with hte username and password?
      // hash the password w/ bcrypt somewhere???
      return done(null, user);
    });
  }
));
