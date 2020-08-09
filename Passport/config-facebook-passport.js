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
        // console.log(picture);




        var d = new Date(13, 7, 1995);
        const entity = {
                UserName: profile._json.id,
                Name: profile._json.name,
                Password: profile._json.id,
                Phone: '0909123123',
                Email: profile._json.email,
                TypeOfUser: 2,
                Penname: profile._json.name,
                BirthDay: d,
                IsActive: 1,
                IsDel: 0,
                token: profile._json.id,
                avata: picture
            }
            // console.log(email);


        await loginModel.add(entity);

        const abc = await loginModel.singleidgoogle(profile._json.id);

        process.nextTick(function() {
            return done(null, abc);
        });
    }
));