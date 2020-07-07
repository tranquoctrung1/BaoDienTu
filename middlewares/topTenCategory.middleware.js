const categoryModel = require("../model/category.model");

module.exports.loadTopTenCategory = async function (req, res, next) {
  const data = await categoryModel.loadTopTenCategory();
  if (data) {
    res.locals.topTenCategory = data;
  }

  next();
};
