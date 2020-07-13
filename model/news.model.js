const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_COMMENT = "comment";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_TAG = "tag";
const TBL_USER = "user";

module.exports = {
  loadTopNewsFamous: function(quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID ORDER BY n.Like DESC limit ${quantity}`);
  },
  singleNewsDetails: function (NewsId) {
    return db.load(`SELECT n.NewsTitle, u.Name, n.DatePost, n.View, n.Like, n.Abstract, n.Content from ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID WHERE NewsID = '${NewsId}'`);
  },
  loadTagNews: function(NewsId){
    return db.load(`SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId}`)
  },
  loadCmt: function(NewsId){
    return db.load(`SELECT u.UserName, cmt.content, cmt.datetime FROM ${TBL_COMMENT} cmt INNER join ${TBL_NEWS} n on cmt.NewsID = n.NewsID INNER join ${TBL_USER} u on cmt.userID = u.UserID WHERE n.NewsID = ${NewsId}`)
  },
  loadFiveRelatedPosts: function(NewsId, quantity) {
    return db.load(`SELECT n.NewsTitle, n.Abstract FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID WHERE c.CatID = (SELECT c2.CatID FROM ${TBL_NEWS} nn JOIN ${TBL_SUBCATEGORY} cc2 on nn.CatChild_ID = cc2.CatChild_ID JOIN ${TBL_CATEGORY} c2 on cc2.CatID = c2.CatID WHERE nn.NewsID = ${NewsId}) LIMIT ${quantity}`);
  },
  loadViewestNewsByCatId: function (id, quantity) {
  return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' ORDER BY n.View DESC limit ${quantity}`);
  },
  loadMostSoonNewsByCatId: function (id, quantity) {
  return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' ORDER BY n.DatePost limit ${quantity}`);
  },
}