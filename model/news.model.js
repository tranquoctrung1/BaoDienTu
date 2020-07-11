const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_COMMENT = "comment";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_TAG = "tag";
const TBL_USER = "user";

// module.exports.loadTopNewsFamous = function (quantity) {
//   return db.load(
//     `SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID ORDER BY n.Like DESC limit ${quantity} `
//   );
// };

module.exports = {
  loadTopNewsFamous: function(quantity) {
    return db.load(
      `SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID ORDER BY n.Like DESC limit ${quantity} `
    );
  },
  singleNewsDetails: function (NewsId) {
    // return db.load(`select * from ${TBL_NEWS} where NewsID = ${id}`);
    return db.load(`SELECT n.NewsTitle, n.Author, n.DatePost, n.View, n.Like, n.Abstract, n.Content from ${TBL_NEWS} n  WHERE NewsID = '${NewsId}'`);

    //SELECT * FROM news n inner join comment cmt on n.newsID = cmt.newsID WHERE n.NewsID = 1
  },
  loadTagNews: function(NewsId){
    return db.load(`SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId}`)
  },
  loadCmt: function(NewsId){
    return db.load(`SELECT u.UserName, cmt.content FROM ${TBL_COMMENT} cmt INNER join ${TBL_NEWS} n on cmt.NewsID = n.NewsID INNER join ${TBL_USER} u on cmt.userID = u.UserID WHERE n.NewsID = ${NewsId}`)
  }
}
