const categoryModel = require("../model/category.model");

module.exports.loginPageWriter = async function(req, res, next) {
    if (req.session.TypeOfUser == 3 || req.session.TypeOfUser == 1) {
        next();
    } else {
        res.redirect("/");
    }
};
module.exports.loginPageEditor = async function(req, res, next) {
    if (req.session.TypeOfUser == 4 || req.session.TypeOfUser == 1) {
        next();
    } else {
        res.redirect("/");
    }
};
module.exports.loginPageAdmin = async function(req, res, next) {
    if (req.session.TypeOfUser == 1) {
        next();
    } else {
        res.redirect("/");
    }
};