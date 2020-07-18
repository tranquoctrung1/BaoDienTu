const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_TAG = "tag";
const TBL_TAG_OF_NEWS = "tag_of_news"

module.exports = {
  loadTopNewsFamous: function (id, limit, offset) {
    return db.load(
      `SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract , n.DatePost, n.Avatar FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} 
      cc on cc.CatChild_ID = n.CatChild_ID join ${TBL_CATEGORY} c on c.CatID = cc.CatID 
      where c.CatID = ${id} limit ${limit} offset ${offset} `
    );
},
  loadNewBySubCategoryID: function(id,limit, offset) {
    return db.load (`Select n.NewsTitle, n.Abstract, n.DatePost,n.Avatar ,cn.CatChild_ID, cn.CatChildName 
                    from ${TBL_NEWS} N JOIN ${TBL_SUBCATEGORY} cn ON cn.CatChild_ID = n.CatChild_ID 
                    where cn.CatChild_ID = '${id}' limit ${limit} offset ${offset}`);
  },
  loadTagListPost: function(id, limit, offset) {
    return db.load (`SELECT n.NewsTitle, cc.CatChildName, c.CatName,n.Abstract, n.DatePost, t.TagName
                from ${TBL_SUBCATEGORY} cc join ${TBL_CATEGORY} c on c.CatID = cc.CatID
                  join ${TBL_NEWS} n on n.CatChild_ID = cc.CatChild_ID 
                  join ${TBL_TAG_OF_NEWS} tn on tn.NewsID= n.NewsID
                  join ${TBL_TAG} t on t.TagID = tn.TagID
                where tn.TagID=${id} limit ${limit} offset ${offset} `)
  }
  
};
