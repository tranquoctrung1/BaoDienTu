const subscriberModel = require("../model/subscriber.model");

module.exports.loadSubscriber = async function (req, res) {
  const LoadUser = await subscriberModel.loadUser();

  res.render("vwSubscriber/RegisterPremium.hbs", {
    LoadUser,
  });
};

module.exports.registerPre = async function (req, res) {
  const entityupdate = {
    UserID: req.body.UserID,
    TypeOfUser: 2,
  };
  await subscriberModel.updateTypeOfUser_UserID(entityupdate);

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
  await subscriberModel.addNewAccPremium(entityNewAccPremium);

  res.redirect("/Subscriber");
};
