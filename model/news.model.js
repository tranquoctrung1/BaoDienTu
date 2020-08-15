const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_COMMENT = "comment";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_TAG = "tag";
const TBL_USER = "user";
const TBL_TYPE_OF_USER = "type_of_user";
const TBL_PREMIUM = "premium";

module.exports = {
  loadTopNewsFamous: function (quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar,n.IsPremium, c.CatID, cc.CatChild_ID, n.NewsID FROM ${TBL_NEWS} n 
                    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID
                    join ${TBL_CATEGORY} c on c.CatID = cc.CatID WHERE n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.Like DESC limit ${quantity}`);
  },
  singleNewsDetails: function (NewsId) {
    return db.load(
      `SELECT n.NewsID, n.NewsTitle, u.Name, n.DatePost, n.View, n.Like, n.Abstract, n.Content, n.Avatar, n.IsPremium, cc.CatChildName, c.CatID, c.CatName, cc.CatChild_ID from ${TBL_NEWS} n JOIN ${TBL_USER} u on n.Author = u.UserID JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID WHERE NewsID = '${NewsId}' and n.isDel = 0`
    );
  },
  loadTagNews: function (NewsId) {
    return db.load(`SELECT t.TagName, t.tagID FROM ${TBL_TAG_OF_NEWS} ton 
                    INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId} and t.IsDel = 0`);
  },
  loadCmt: function (NewsId) {
    return db.load(`SELECT u.UserName, u.Name, u.avata, cmt.Content, cmt.DateTime FROM ${TBL_COMMENT} cmt 
                  INNER join ${TBL_NEWS} n on cmt.NewsID = n.NewsID INNER join ${TBL_USER} u on cmt.userID = u.UserID 
                  WHERE n.NewsID = ${NewsId}`);
  },
  loadFiveRelatedPosts: function (NewsId, quantity) {
    return db.load(`SELECT n.NewsTitle, n.Abstract, n.Avatar, n.NewsID, n.IsPremium, n.DatePost, c.CatName, c.CatID FROM ${TBL_NEWS} n
                    join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID
                    join ${TBL_CATEGORY} c on c.CatID = cc.CatID WHERE c.CatID = (SELECT c2.CatID FROM ${TBL_NEWS} nn
                      JOIN ${TBL_SUBCATEGORY} cc2 on nn.CatChild_ID = cc2.CatChild_ID
                      JOIN ${TBL_CATEGORY} c2 on cc2.CatID = c2.CatID WHERE nn.NewsID = ${NewsId} and nn.IsDel = 0) and n.IsDel = 0 LIMIT ${quantity}`);
  },
  loadViewestNewsByCatId: function (id, quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar, n.IsPremium, c.CatID, cc.CatChild_ID, n.NewsID 
                  FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID 
                  join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' and n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.View DESC limit ${quantity}`);
  },
  loadMostSoonNewsByCatId: function (id, quantity) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName, n.DatePost, n.Avatar, n.IsPremium, c.CatID, cc.CatChild_ID, n.NewsID 
                  FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID 
                  join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = '${id}' and n.isDel = 0 and (n.Status = 1 OR n.Status = 2 ) and c.isDel = 0 and cc.isDel = 0 ORDER BY n.DatePost limit ${quantity}`);
  },
  loadNewListPost: function (id, limit, offset) {
    return db.load(
      `SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract , n.DatePost, n.Avatar,n.IsPremium , c.CatID, cc.CatChild_ID, n.NewsID FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} 
      cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID 
      where c.CatID = ${id} and n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 order by n.IsPremium desc limit ${limit} offset ${offset}  `
    );
  },
  loadNewBySubCategoryID: function (id, limit, offset) {
    return db.load(`Select n.NewsTitle, n.Abstract, n.DatePost,n.Avatar, n.IsPremium ,cn.CatChild_ID, cn.CatChildName, c.CatName , c.CatID, cn.CatChild_ID, n.NewsID
                    from ${TBL_NEWS} n JOIN ${TBL_SUBCATEGORY} cn ON cn.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cn.CatChild_ID
                    where cn.CatChild_ID = ${id} and n.isDel = 0  and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cn.isDel = 0 order by n.IsPremium desc limit ${limit} offset ${offset}`);
  },
  loadTagListPost: function (id, limit, offset) {
    return db.load(`SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract, n.DatePost, t.TagName, n.Avatar,n.IsPremium, c.CatID, cc.CatChild_ID, n.NewsID
                from ${TBL_SUBCATEGORY} cc join ${TBL_CATEGORY} c on c.CatID = cc.CatID
                  join ${TBL_NEWS} n on n.CatChild_ID = cc.CatChild_ID 
                  join ${TBL_TAG_OF_NEWS} tn on tn.NewsID= n.NewsID
                  join ${TBL_TAG} t on t.TagID = tn.TagID
                where tn.TagID=${id} and t.isDel = 0  and n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 order by n.IsPremium desc limit ${limit} offset ${offset} `);
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
    join ${TBL_CATEGORY} c on c.CatID = cc.CatID where c.CatID = ${id} and n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 `);
  },

  countNewBySubCat: function (id) {
    return db.load(
      `select count(*) as Count from ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID where cc.CatChild_ID = ${id}  and n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 `
    );
  },

  countNewByTag: function (id) {
    return db.load(
      `SELECT count(*) as Count
      from ${TBL_SUBCATEGORY} cc join ${TBL_CATEGORY} c on c.CatID = cc.CatID
        join ${TBL_NEWS} n on n.CatChild_ID = cc.CatChild_ID 
        join ${TBL_TAG_OF_NEWS} tn on tn.NewsID= n.NewsID
        join ${TBL_TAG} t on t.TagID = tn.TagID
      where tn.TagID=${id} and t.isDel = 0  and n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0`
    );
  },
  getFullTextSearch: function (content, limit, offset) {
    return db.load(
      `SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract , n.DatePost, n.Avatar, n.IsPremium, c.CatID, cc.CatChild_ID, n.NewsID FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} 
      cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID 
      where n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 and match(n.NewsTitle, n.Abstract, n.Content) AGAINST ('${content}' IN NATURAL LANGUAGE MODE) order by n.IsPremium desc limit ${limit} offset ${offset} `
    );
  },

  countByFullTextSearch: function (content) {
    return db.load(
      `SELECT count(*) as Count FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} 
      cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID 
      where n.isDel = 0 and (n.Status = 2 or n.Status = 1) and c.isDel = 0 and cc.isDel = 0 and match(n.NewsTitle, n.Abstract, n.Content) AGAINST ('${content}' IN NATURAL LANGUAGE MODE)`
    );
  },
  loadUser: function (UserID) {
    return db.load(
      `SELECT u.UserID, u.UserName, u.Name, u.IsDel, u.TypeOfUser, tou.TypeName, p.PreID, p.ExpriryDate FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID LEFT JOIN ${TBL_PREMIUM} p ON u.UserID = p.UserID WHERE u.UserID = ${UserID}`
    );
  },
  patchUser: function (entity) {
    const condition = {
      UserID: entity.UserID,
    };
    delete entity.UserID;
    return db.patch(TBL_USER, entity, condition);
  },
  addcomment: function (entity) {
    return db.add(TBL_COMMENT, entity);
  },
};
