const loginModel = require("../model/login.model");
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const rn = require('random-number');
const mailer = require('../Mailer/mailer.js');


var options = {
    // example input , yes negative values do work
    min: 1000,
    max: 9999
}


module.exports.logout = async function(req, res) {
    req.session.UserID = null;
    res.redirect('/');
};
module.exports.loadlogin = async function(req, res) {

    res.render("login/login", {});
};
module.exports.postlogin = async function(req, res) {

    // console.log(req.body);
    const user = await loginModel.singleByUserName(req.body.username);

    // console.log(user);
    if (user.IsActive == 0) {
        // res.locals.error= 'You need to verify email first.'
        return res.render('login/login', {
            error: 'You need to verify email first.'
        })
    }

    if (user === null) {
        // res.locals.error= 'Invalid username or password.'
        return res.render('login/login', {
            error: 'Invalid username or password.'
        })
    }
    const rs = bcrypt.compareSync(req.body.password, user.Password);
    if (rs === false) {
        // res.locals.error= 'Invalid username or password.'
        return res.render('login/login', {
            error: 'Invalid username or password.'
        })
    }
    delete user.Password;
    req.session.UserID = user.UserID;
    req.session.avata = user.avata;
    req.session.Name = user.Name;
    req.session.TypeOfUser = user.TypeOfUser;



    console.log(req.session.UserID);

    res.redirect('/');
};

module.exports.loadVerify = async function(req, res) {
    res.render("login/verify", {});
};
module.exports.postVerify = async function(req, res) {

    console.log(req.body);

    const user = await loginModel.singleByEmail(req.body.verifyemail);
    console.log(user);

    if (user === null) {
        return res.render('login/login', {
            error: 'Invalid Email or Token.'
        })
    }
    if (user.token == req.body.verifytoken) {
        user.IsActive = 1;
        await loginModel.singleByPatch(user);
        //update IsActive Len 1
        res.redirect("/login");
    } else {
        return res.render('login/verify', {
            error: 'Invalid Email or Token'
        })
    }

};



module.exports.loadregister = async function(req, res) {
    res.render("login/register", {});
};
module.exports.postregister = async function(req, res) {

    var token = parseInt(rn(options));
    const ngay = req.body.ngay;
    const thang = req.body.thang;
    const nam = req.body.nam;

    var d = new Date(nam, thang, ngay);
    const password_hash = bcrypt.hashSync(req.body.passworddangnhap, config.authentication.saltRounds);

    console.log(req.file.filename);

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
        IsDel: 0,
        token: token,
        avata: req.file.filename
    }
    const html = `Hi ${req.body.hoten},
    <br/>
    Cảm ơn bạn đã đăng ký!
    <br/> <br/>
    Mã Xác Nhận: <b>${token}</b>
    Link Xác nhận : <a href="http://localhost:3000/login/verify">http://localhost:3000/login/verify</a>
    `;

    await mailer.sendMail('phamquangthien.it@gmail.com', req.body.email, 'Check Mail', html);



    loginModel.add(entity);
    // console.log(req.body);
    // console.log(entity);
    res.redirect("/login/verify");
};

module.exports.loadCheckregister = async function(req, res) {
    // console.log(req.query.UserName);
    const user = await loginModel.singleByUserName(req.query.UserName);
    if (!user) {
        return res.json(true);
    }
    res.json(false);

};