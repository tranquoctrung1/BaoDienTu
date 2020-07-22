const db = require("../utils/db");

// const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
// const TBL_COMMENT = "comment";
// const TBL_TAG_OF_NEWS = "tag_of_news";
// const TBL_TAG = "tag";
const TBL_USER = "user";

module.exports = {
  loadListPost: function() {
    return db.load(`SELECT * FROM ${TBL_NEWS}`);
  },
  addNewPost: function(entity){
    return db.add(TBL_NEWS, entity);
  },
  loadAuthor: function(){
    return db.load(`SELECT * FROM ${TBL_USER}`);
  },
  loadCatChild: function(){
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
  },
  Edit_loadNews: function(NewsID){
    // return db.load(`SELECT * FROM ${TBL_NEWS} WHERE NewsID = ${NewsID}`);
    return db.load(`SELECT * FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE n.NewsID = ${NewsID}`);
  },
  Edit_loadAuthor: function(NewsID){
    return db.load(`SELECT u.UserID, u.Name FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID WHERE n.NewsID = ${NewsID}`)
  },
  Edit_loadCatChild: function(NewsID){
    return db.load(`SELECT cc.CatChild_ID, cc.CatChildName FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE NewsID = ${NewsID}`);
  },
  del: function (id) {
    const condition = {
      NewsID: id
    }
    return db.del(TBL_NEWS, condition);
  },
  patch: function (entity) {
    const condition = {
      NewsID: entity.NewsID
    }
    delete entity.NewsID;
    return db.patch(TBL_NEWS, entity, condition);
  },
}