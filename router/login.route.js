///
const express = require("express");
const route = express.Router();
const passport = require("passport");
const getLogin = require("../controller/getLogin.controller");
const passportSetup = require("../Passport/config-gmail-passport");
const passportSetup1 = require("../Passport/config-facebook-passport");
const multer = require("multer");
const loginModel = require("../model/login.model");

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
    destination(req, file, cb) {
        cb(null, "./public/images/");
    },
});
const upload = multer({ storage });

route.get("/", getLogin.loadlogin);
route.post("/", getLogin.postlogin);

route.get("/register", getLogin.loadregister);

route.post("/register", upload.single("avata"), getLogin.postregister);

route.get("/checkEmail", getLogin.checkEmail);

route.get("/check", getLogin.loadCheckregister);

route.get("/verify", getLogin.loadVerify);

route.post("/verify", getLogin.postVerify);

route.get("/logout", getLogin.logout);

route.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);

route.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    async function(req, res) {
        // res.send(req.user);
        const email = req.user;
        var d = new Date(13, 7, 1995);
        const entity = {
            UserName: email.id,
            Name: email.displayName,
            Password: email.id,
            Phone: "0909123123",
            Email: email.emails[0].value,
            TypeOfUser: 5,
            Penname: email.displayName,
            BirthDay: d,
            IsActive: 1,
            IsDel: 0,
            token: email.id,
            avata: email.photos[0].value,
        };
        const abc = await loginModel.singleidgoogle(email.id);
        // console.log(abc);

        if (abc == 0) {
            await loginModel.add(entity);
            const abc = await loginModel.singleidgoogle(email.id);
            req.session.UserID = abc.UserID;
            req.session.avata = abc.avata;
            req.session.Name = abc.Name;
            req.session.TypeOfUser = abc.TypeOfUser;

            res.redirect("/");
        } else {
            req.session.UserID = abc.UserID;
            req.session.avata = abc.avata;
            req.session.Name = abc.Name;
            req.session.TypeOfUser = abc.TypeOfUser;
            res.redirect("/");
            // console.log(req.session.UserID);
            // console.log(req.session.avata);
            // console.log(req.session.Name);
        }
    }
);

// facebook
route.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        authType: "rerequest",
        scope: ["user_likes"],
    })
);

route.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook"),
    async function(req, res) {
        // console.log(req.user);
        const profile = req.user;
        var d = new Date(13, 7, 1995);
        const entity = {
            UserName: profile._json.id,
            Name: profile._json.name,
            Password: profile._json.id,
            Phone: "0909123123",
            Email: profile._json.email,
            TypeOfUser: 5,
            Penname: profile._json.name,
            BirthDay: d,
            IsActive: 1,
            IsDel: 0,
            token: profile._json.id,
            avata: profile.photos[0].value,
        };
        const abc = await loginModel.singleidgoogle(profile._json.id);
        if (abc == 0) {
            await loginModel.add(entity);
            const abc = await loginModel.singleidgoogle(profile._json.id);
            req.session.UserID = abc.UserID;
            req.session.avata = abc.avata;
            req.session.Name = abc.Name;
            res.redirect("/");
        } else {
            req.session.UserID = abc.UserID;
            req.session.avata = abc.avata;
            req.session.Name = abc.Name;
            res.redirect("/");
            console.log(req.session.UserID);
            console.log(req.session.avata);
            console.log(req.session.Name);
        }
    }
);

module.exports = route;