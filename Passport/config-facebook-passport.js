const passport = require('passport');
const config = require("../config/config.json")
const FacebookStrategy = require('passport-facebook').Strategy;
const loginModel = require("../model/login.model");


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: config.Facebook.ClientID,
        clientSecret: config.Facebook.Clientsecret,
        callbackURL: "/login/auth/facebook/redirect",
        profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
    },
    async function(accessToken, refreshToken, profile, done) {

        // console.log(profile._json);

        const picture = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`;
        // console.log(profile);

        process.nextTick(function() {
            return done(null, profile);
        });
    }
));