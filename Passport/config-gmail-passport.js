const passport = require('passport');
const config = require("../config/config.json")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const loginModel = require("../model/login.model");


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

        var d = new Date(13, 7, 1995);
        const entity = {
                UserName: email.id,
                Name: email.displayName,
                Password: email.id,
                Phone: '0909123123',
                Email: email.emails[0].value,
                TypeOfUser: 2,
                Penname: email.displayName,
                BirthDay: d,
                IsActive: 1,
                IsDel: 0,
                token: email.id,
                avata: email.photos[0].value
            }
            // console.log(email);


        await loginModel.add(entity);

        const abc = await loginModel.singleidgoogle(email.id);
        done(null, abc);
    }
));