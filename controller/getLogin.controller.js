const loginModel = require("../model/login.model");
const config = require('../config/config.json');
const bcrypt = require('bcrypt');

module.exports.loadlogin = async function(req, res) {
    req.session.error = 'Incorrect username or password';
    res.render("login/login", {});
};


module.exports.postlogin = async function(req, res) {

    console.log(req.body);
    const user = await loginModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('login/login', {
            error: 'Invalid username or password.'
        })
    }
    const rs = bcrypt.compareSync(req.body.password, user.Password);
    if (rs === false) {
        return res.render('login/login', {
            error: 'Invalid username or password.'
        })
    }
    delete user.Password;

    res.redirect('/');
};
module.exports.loadregister = async function(req, res) {
    res.render("login/register", {});
};
module.exports.postregister = async function(req, res) {

    const ngay = req.body.ngay;
    const thang = req.body.thang;
    const nam = req.body.nam;

    var d = new Date(nam, thang, ngay);
    const password_hash = bcrypt.hashSync(req.body.passworddangnhap, config.authentication.saltRounds);

    const entity = {
        UserName: req.body.userdangnhap,
        Name: req.body.hoten,
        Password: password_hash,
        Phone: req.body.phone,
        Email: req.body.email,
        TypeOfUser: req.body.loaiuser,
        Penname: req.body.penname,
        BirthDay: d,
        IsActive: 0,
        IsDel: 0
    }

    loginModel.add(entity);
    // console.log(req.body);
    // console.log(entity);
    res.render("login/register", {});
};

module.exports.loadCheckregister = async function(req, res) {
    // console.log(req.query.UserName);
    const user = await loginModel.singleByUserName(req.query.UserName);
    if (!user) {
        return res.json(true);
    }
    res.json(false);

};