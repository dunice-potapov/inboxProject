var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var request = require('request');
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';
var GOOGLE_CLIENT_ID = '26051947364-1ui81sac3cle9qjs904ucg1u165sjajh.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'Wvy19mTF90m5Z-LvyTtkPKs8';

require('./config/db');

var mongoose = require('mongoose');
var User = mongoose.model('User');

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({
      googleId: profile.id
    }, function(err, user) {

      //console.log('RESP_ERR', err);
      //console.log('RESP_USER', user);
      //console.log('RESP_PROFILE', profile);

      if (err) {
        return done(err);
      }

      if (!user) {
        user = new User({
          displayName: profile.displayName,
          name: profile.name,
          photos: profile.photos,
          provider: profile.provider, // google
          google: profile._json
        });
        user.save(function(err) {
          if (err) console.log('user_save_err', err);
          return done(err, user);
        });
      } else {
        //found user. Return
        return done(err, user);
      }

    });

  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(port, function () {
  console.log('App listening on port 5000!');
});