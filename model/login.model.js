const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";

const USER = "user";

module.exports.loadTopNewsFamous = function(quantity) {
    return db.load(
        `SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID ORDER BY n.Like DESC limit ${quantity} `
    );
};
module.exports.add = function(entity) {
    return db.add(USER, entity);
};
module.exports.singleByUserName = async function(username) {
    const rows = await db.load(`select * from ${USER} where UserName = '${username}'`);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
};