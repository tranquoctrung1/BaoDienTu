const categoryModel = require("../model/category.model");

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

  next();
};
