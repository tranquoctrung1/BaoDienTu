const UserModel = require("../model/user.model");

module.exports.loadUser = async function (req, res) {
  const LoadUser = await UserModel.loadUser();

  LoadUser.forEach((item) => {
    if (item.PreID != null) {
      item.IsPremium = 1;
    } else {
      item.IsPremium = 0;
    }
  });

  LoadUser.forEach((item) => {
    if (item.TypeOfUser === 2) {
      item.IsGuest = 1;
    } else {
      item.IsGuest = 0;
    }
  });

  var today = new Date();
  var t = today.setDate(today.getDate());

  LoadUser.forEach((item) => {
    var exp = new Date(item.ExpriryDate);
    var _ex = exp.setDate(exp.getDate());

    if (t <= _ex) {
      item.Ex = 1;
    } else {
      item.Ex = 0;
    }
  });

  res.render("vwUser/indexUser", {
    LoadUser,
  });
};

module.exports.loadSubscriber = async function (req, res) {
  const id = +req.params.id || 1;
  console.log(req.body);
  console.log(id);
  const LoadSubscriber = await UserModel.loadUser_UserID(id);
  const sub = LoadSubscriber[0];

  res.render("vwUser/RegisterPremium", {
    sub,
  });
};

module.exports.registerPre = async function (req, res) {
  const entityupdate = {
    UserID: req.body.UserID,
    TypeOfUser: 2,
  };
  await UserModel.updateTypeOfUser_UserID(entityupdate);

  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = today.getMonth();
  var dd = today.getDate();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var Ex = new Date(yyyy, mm, dd, h, m + 5, s);

  const entityNewAccPremium = {
    UserID: req.body.UserID,
    ExpriryDate: Ex,
  };
  console.log(entityNewAccPremium);
  await UserModel.addNewAccPremium(entityNewAccPremium);

  res.redirect("/");
};

module.exports.loadPremiumRenewals = async function (req, res) {
  const id = +req.params.id || 1;
  const Premium = await UserModel.loadPremium(id);
  const pre = Premium[0];

  var today = new Date();
  var t = today.setDate(today.getDate());
  var ex = new Date(pre.ExpriryDate);

  if (t <= ex) {
    Premium[0].Ex = 1;
  } else {
    Premium[0].Ex = 0;
  }
  console.log(Premium[0].Ex);

  res.render("vwUser/PremiumRenewal", {
    pre,
  });
};

module.exports.renewals = async function (req, res) {
  var exd = new Date(req.body.ExpriryDate);
  var yyyy = exd.getFullYear();
  var mm = exd.getMonth();
  var dd = exd.getDate();
  var h = exd.getHours();
  var m = exd.getMinutes();
  var s = exd.getSeconds();
  var UpdateEx;

  if (req.body.type === "year") {
    UpdateEx = new Date(yyyy + parseInt(req.body.PlusEx), mm, dd, h, m, s);
  } else if (req.body.type === "month") {
    UpdateEx = new Date(yyyy, mm + parseInt(req.body.PlusEx), dd, h, m, s);
  } else if (req.body.type === "day") {
    UpdateEx = new Date(yyyy, mm, dd + parseInt(req.body.PlusEx), h, m, s);
  } else if (req.body.type === "hour") {
    UpdateEx = new Date(yyyy, mm, dd, h + parseInt(req.body.PlusEx), m, s);
  } else if (req.body.type === "minute") {
    UpdateEx = new Date(yyyy, mm, dd, h, m + parseInt(req.body.PlusEx), s);
  } else if (req.body.type === "second") {
    UpdateEx = new Date(yyyy, mm, dd, h, m, s + parseInt(req.body.PlusEx));
  }
  const entity = {
    PreID: req.body.PreID,
    ExpriryDate: UpdateEx,
  };
  console.log(entity);

  await UserModel.updatePremium(entity);
  var url = "/User/PremiumRenewal/" + req.body.UserID;
  res.redirect(url);
};

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
