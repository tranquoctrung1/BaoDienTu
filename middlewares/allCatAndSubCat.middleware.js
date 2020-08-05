const categoryModel = require("../model/category.model");
const subCategoryModel = require("../model/subCategory.model");

module.exports.loadCatAndSubCat = async function (req, res, next) {
  let listData = [];
  const catData = await categoryModel.loadAllCategory();
  if (catData) {
    for (data of catData) {
      if (data != undefined) {
        let objData = {
          ...data,
        };

        let subCatData = await subCategoryModel.loadSubCategoryByCatId(
          data.catid
        );

        if (subCatData) {
          // create ojbect contain category data and sub category data.
          Object.assign(objData, { subCatData });
        }

        // and then push it into list data for display header view
        listData.push(objData);
      }
    }
  }

  res.locals.catAndSubCat = listData;

  next();
};
