const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const loginModel = require("../model/login.model");
const rn = require("random-number");
const mailer = require("../Mailer/mailer.js");

module.exports.loadFormForgetPassword = function (req, res) {
  res.render("forgetPassword/forgetPassword");
};

module.exports.postFormForgetPassword = async function (req, res) {
  const { email } = req.body;

  let options = {
    // example input , yes negative values do work
    min: 1000,
    max: 9999,
  };

  const data = await loginModel.getEmail(email);

  if (data === undefined || data.length === 0) {
    res.render("forgetPassword/forgetPassword", { err: "Email không tồn tại" });
  } else {
    if (data[0].Email != null && data[0].Email != "") {
      let token = parseInt(rn(options));

      const html = `Hi ${email},
      Mã Xác Nhận: <b>${token}</b>
      Link Xác nhận : <a href="http://localhost:3000/forgetpassword/verify">http://localhost:3000/forgetpassword/verify</a>
      `;

      await mailer.sendMail(
        "phamquangthien.it@gmail.com",
        email,
        "Check Mail",
        html
      );

      let entity = {
        Email: email,
        token: token,
      };

      loginModel.updateToken(entity);
      res.redirect("/forgetpassword/verify");
    }
  }
};

module.exports.loadFormVerifyToken = function (req, res) {
  res.render("forgetPassword/verifyToken");
};

module.exports.postFormVerifyToken = async function (req, res) {
  const { email, token } = req.body;

  const user = await loginModel.singleByEmail(email);

  if (user === null) {
    return res.render("forgetPassword/verifyToken", {
      err: "Sai email hoặc token.",
    });
  }
  if (user.token == token) {
    req.session.emailUpdatePassword = email;
    res.redirect("/forgetPassword/updatepassword");
  } else {
    return res.render("forgetPassword/verifyToken", {
      err: "Sai email hoặc token.",
    });
  }
};

module.exports.loadFormUpdatePassword = function (req, res) {
  res.render("forgetPassword/updatePassword");
};

module.exports.postFormUpdatePassword = async function (req, res) {
  const email = req.session.emailUpdatePassword;

  const { newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(
    newPassword,
    config.authentication.saltRounds
  );
  const entity = {
    Email: email,
    Password: hashedPassword,
  };

  await loginModel.updatePassword(entity);

  res.redirect("/login");
};
