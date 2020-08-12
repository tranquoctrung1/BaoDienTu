const categoryModel = require("../model/category.model");
const userModel = require("../model/user.model");

module.exports.loadTopTenCategory = async function (req, res, next) {
  const data = await categoryModel.loadTopTenCategory();

  let topTenCategory = [];
  for (let item of data) {
    if (item != undefined) {
      topTenCategory.push(item);
    }
  }

  if (topTenCategory) {
    res.locals.topTenCategory = topTenCategory;
  }
  res.locals.isLogined = false;
  res.locals.passport = false;
  if (req.session.passport !== undefined) {
    res.locals.passport = true;
  }
  if (
    req.session.UserID !== undefined &&
    req.session.UserID !== "" &&
    req.session.UserID !== null
  ) {
    res.locals.UserID = req.session.UserID;
    res.locals.Avatar = req.session.avata;
    res.locals.Name = req.session.Name;
    res.locals.isLogined = true;
  }

  next();
};
