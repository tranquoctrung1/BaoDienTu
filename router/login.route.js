///
const express = require("express");
const route = express.Router();
const passport = require('passport');
const getLogin = require("../controller/getLogin.controller");
const passportSetup = require("../Passport/config-gmail-passport");
const passportSetup1 = require("../Passport/config-facebook-passport");
const multer = require('multer');

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
    destination(req, file, cb) {
        cb(null, './public/images/');
    }

});
const upload = multer({ storage });


route.get("/", getLogin.loadlogin);
route.post("/", getLogin.postlogin);

route.get("/register", getLogin.loadregister);

route.post("/register", upload.single("avata"), getLogin.postregister);

route.get("/check", getLogin.loadCheckregister);

route.get("/verify", getLogin.loadVerify);

route.post("/verify", getLogin.postVerify);

route.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

route.get('/auth/google/redirect', passport.authenticate('google'), function(req, res) {
    // res.send(req.user);

    res.redirect('/');
});

// facebook
route.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: 'email'
    }));


route.get('/auth/facebook/redirect',
    passport.authenticate('facebook'),
    function(req, res) {
        console.log(req.user);
        res.redirect('/');
    });


module.exports = route;