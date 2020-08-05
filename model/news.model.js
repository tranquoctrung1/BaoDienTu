const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_COMMENT = "comment";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_TAG = "tag";
const TBL_USER = "user";

module.exports = {
  loadTopNewsFamous: function (quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar FROM ${TBL_NEWS} n 
                    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID
                    join ${TBL_CATEGORY} c on c.CatID = cc.CatID WHERE n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.Like DESC limit ${quantity}`);
  },
  singleNewsDetails: function (NewsId) {
    return db.load(`SELECT n.NewsID, n.NewsTitle, u.Name, n.DatePost, n.View, n.Like, n.Abstract, n.Content, n.Avatar, cc.CatChildName from ${TBL_NEWS} n JOIN ${TBL_USER} u on n.Author = u.UserID JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID WHERE NewsID = '${NewsId}' and n.isDel = 0`);
  },
  loadTagNews: function (NewsId) {
    return db.load(`SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton 
                    INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId} and t.IsDel = 0`);
  },
  loadCmt: function (NewsId) {
    return db.load(`SELECT u.UserName, cmt.Content, cmt.DateTime FROM ${TBL_COMMENT} cmt 
                  INNER join ${TBL_NEWS} n on cmt.NewsID = n.NewsID INNER join ${TBL_USER} u on cmt.userID = u.UserID 
                  WHERE n.NewsID = ${NewsId}`);
  },
  loadFiveRelatedPosts: function (NewsId, quantity) {
    return db.load(`SELECT n.NewsTitle, n.Abstract, n.Avatar FROM ${TBL_NEWS} n 
                    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID 
                    join ${TBL_CATEGORY} c on c.CatID = cc.CatID WHERE c.CatID = (SELECT c2.CatID FROM ${TBL_NEWS} nn 
                      JOIN ${TBL_SUBCATEGORY} cc2 on nn.CatChild_ID = cc2.CatChild_ID 
                      JOIN ${TBL_CATEGORY} c2 on cc2.CatID = c2.CatID WHERE nn.NewsID = ${NewsId} and nn.IsDel = 0) and n.IsDel = 0 LIMIT ${quantity}`);
  },
  loadViewestNewsByCatId: function (id, quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar 
                  FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID 
                  join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' and n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.View DESC limit ${quantity}`);
  },
  loadMostSoonNewsByCatId: function (id, quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar 
                  FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID 
                  join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' and n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.DatePost limit ${quantity}`);
  },
  loadNewListPost: function (id, limit, offset) {
    return db.load(
      `SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract , n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} 
      cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID 
      where c.CatID = ${id} limit ${limit} offset ${offset} `
    );
  },
  loadNewBySubCategoryID: function (id, limit, offset) {
    return db.load(`Select n.NewsTitle, n.Abstract, n.DatePost,n.Avatar ,cn.CatChild_ID, cn.CatChildName, c.CatName
                    from ${TBL_NEWS} N JOIN ${TBL_SUBCATEGORY} cn ON cn.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cn.CatChild_ID
                    where cn.CatChild_ID = '${id}' limit ${limit} offset ${offset}`);
  },
  loadTagListPost: function (id, limit, offset) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract, n.DatePost, t.TagName, n.Avatar
                from ${TBL_SUBCATEGORY} cc join ${TBL_CATEGORY} c on c.CatID = cc.CatID
                  join ${TBL_NEWS} n on n.CatChild_ID = cc.CatChild_ID 
                  join ${TBL_TAG_OF_NEWS} tn on tn.NewsID= n.NewsID
                  join ${TBL_TAG} t on t.TagID = tn.TagID
                where tn.TagID=${id} limit ${limit} offset ${offset} `);
  },
  patch: function (entity) {
    const condition = {
      NewsID: entity.NewsID,
    };
    delete entity.NewsID;
    return db.patch(TBL_NEWS, entity, condition);
  },
  countNewByCat: function (id) {
    return db.load(`SELECT count(*) as Count FROM ${TBL_NEWS} n 
    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID
    join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = ${id}`);
  },

  countNewBySubCat: function (id) {
    return db.load(`SELECT count(*) as Count FROM ${TBL_NEWS} n 
    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID
    join ${TBL_CATEGORY} c on c.CatID = cc.CatID where cc.CatChild_ID = ${id}`);
  },

  countNewBySubCat: function (id) {
    return db.load(
      `SELECT count(*) as Count FROM ${TBL_TAG_OF_NEWS} t WHERE t.TagID = ${id}`
    );
  },
};
