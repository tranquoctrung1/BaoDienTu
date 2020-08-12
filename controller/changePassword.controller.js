const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");

module.exports.loadChangePassword = function (req, res) {
  if (req.session.UserID === undefined) {
    res.redirect("/login");
    return;
  }
  res.render("changePassword/changePassword");
};

module.exports.postChangePassword = async function (req, res) {
  const id = +req.params.id;

  const password = await userModel.loadPassword(id);

  const result = await bcrypt.compare(
    req.body.oldPassword,
    password[0].password
  );

  if (result) {
    const hashedPassword = await bcrypt.hash(
      req.body.newPassword,
      config.authentication.saltRounds
    );
    const entity = {
      UserID: id,
      Password: hashedPassword,
    };

    await userModel.changePassword(entity);

    res.redirect("/");
  } else {
    res.render("changePassword/changePassword", { err: "Sai mật khẩu" });
  }
};
