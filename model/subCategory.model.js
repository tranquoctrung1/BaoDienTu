const db = require("../utils/db");

const TBL_SUBCATEGORY = "category_child";

module.exports.loadSubCategoryByCatId = function (catId) {
  return db.load(
    `select catchild_id, catchildname from ${TBL_SUBCATEGORY} where catid = '${catId}'`
  );
};
