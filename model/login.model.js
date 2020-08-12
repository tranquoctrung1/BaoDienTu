const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const USER = "user";

module.exports.loadTopNewsFamous = function (quantity) {
  return db.load(
    `SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID ORDER BY n.Like DESC limit ${quantity} `
  );
};
module.exports.add = function (entity) {
  return db.add(USER, entity);
};
module.exports.singleByUserName = async function (username) {
  const rows = await db.load(
    `select * from ${USER} where UserName = '${username}'`
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};
module.exports.singleidgoogle = async function (username) {
  const rows = await db.load(
    `select * from ${USER} where UserName = '${username}'`
  );
  if (rows.length === 0) {
    return 0;
  }
  // console.log(rows[0]);
  return rows[0];
};
module.exports.singleByEmail = async function (email) {
  const rows = await db.load(`select * from ${USER} where Email = '${email}'`);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};
module.exports.singleByPatch = async function (entity) {
  const condition = {
    UserID: entity.UserID,
  };
  delete entity.UserID;
  return db.patch(USER, entity, condition);
};

module.exports.getEmail = function (email) {
  return db.load(`select Email from ${USER} where Email = '${email}'`);
};
