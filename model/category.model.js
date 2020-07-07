const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";

module.exports.loadAllCategory = function () {
  return db.load(`select catid, catname from ${TBL_CATEGORY}`);
};

module.exports.loadTopTenCategory = function () {
  return db.load(
    `select c.CatID, c.CatName, COUNT(*) from ${TBL_CATEGORY} c join ${TBL_SUBCATEGORY} cc on cc.CatID = c.CatID join ${TBL_NEWS} n on n.CatChild_ID = cc.CatChild_ID group by c.CatID, c.CatName order by COUNT(*) DESC limit 10 `
  );
};
