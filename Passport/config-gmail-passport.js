const passport = require('passport');
const config = require("../config/config.json")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const loginModel = require("../model/login.model");


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: config.Google.ClientID,
        clientSecret: config.Google.Clientsecret,
        callbackURL: "/login/auth/google/redirect"
    },
    async function(accessToken, refreshToken, email, done) {
        // console.log(email);
        process.nextTick(function() {
            return done(null, email);
        });
    }
));