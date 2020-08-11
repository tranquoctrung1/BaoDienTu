const UserModel = require("../model/user.model");

module.exports.loadUser = async function (req, res) {
  res.render("vwUser/indexUser");
};

module.exports.loadUpdateUser = async function (req, res) {
  const id = +req.params.id || 1;

  const listUser = await UserModel.loadUpdateUser(id);

  let isWriter = listUser[0].TypeOfUser === 3 ? true : false;

  res.render("vwUser/updateInfo", {
    listUser: listUser[0],
    isWriter,
  });
};
module.exports.updateUser = async function (req, res) {
  console.log(req.body);
  let entity;
  if (req.body.butdanh !== undefined) {
    entity = {
      Name: req.body.UserName,
      Email: req.body.Email,
      BirthDay: req.body.bday,
      PenName: req.body.butdanh,
      avata: req.body.avata,
      UserID: req.body.id,
    };
  } else {
    entity = {
      Name: req.body.UserName,
      Email: req.body.Email,
      BirthDay: req.body.bday,
      UserID: req.body.id,
      avata: req.body.avata,
    };
  }
  await UserModel.updateUser(entity);

  res.redirect("/");
};
