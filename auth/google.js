const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../model/Users_google');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    console.log(data);

    User.findOrCreate({
      'googleId': data.id
    },
      {
        name: data.given_name,
        surname: data.family_name,
        profilePhotoUrl: data.picture
      }, (err, user) => {
        return done(err, user)
      }
    );
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport





