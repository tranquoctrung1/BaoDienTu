const db = require("../utils/db");

// const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
// const TBL_COMMENT = "comment";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_TAG = "tag";
const TBL_USER = "user";

module.exports = {
  //Load tất cả bài viết do Writer A viết
  loadListPost: function(UserID) {
    return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE u.UserID = ${UserID}`);
  },
  addNewPost: function(entity){
    return db.add(TBL_NEWS, entity);
  },
  loadAuthor: function(UserID){
    return db.load(`SELECT * FROM ${TBL_USER} WHERE TypeOfUser = 3 and UserID = ${UserID}`);
  },
  loadCatChild: function(){
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
  },
  Edit_loadNews: function(NewsID){
    return db.load(`SELECT n.NewsID, n.NewsTitle, n.Avatar, n.CatChild_ID, n.Abstract, n.Note, n.Content, u.Name, cc.CatChildName FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE n.NewsID = ${NewsID}`);
  },
  Edit_loadAuthor: function(NewsID){
    return db.load(`SELECT u.UserID, u.Name FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID WHERE n.NewsID = ${NewsID}`)
  },
  Edit_loadCatChild: function(NewsID){
    return db.load(`SELECT cc.CatChild_ID, cc.CatChildName FROM ${TBL_NEWS} n join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE NewsID = ${NewsID}`);
  },
  delPost: function (id) {
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
  loadNews: function(NewsID){
    return db.load(`SELECT n.NewsID, n.NewsTitle, u.Name, n.DatePost, n.View, n.Like, n.Abstract, n.Content, cc.CatChildName FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID WHERE NewsID = ${NewsID}`);
  },
  loadTagNews: function(NewsId){
                        
    return db.load(`SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId}`)
  },
  loadTag: function(){
    return db.load(`SELECT * FROM ${TBL_TAG}`);
  },
  addTag: function(entity){
    return db.add(TBL_TAG_OF_NEWS, entity);
  },
  delTagOfNews: function (id) {
    const condition = {
      NewsID: id
    }
    return db.del(TBL_TAG_OF_NEWS, condition);
  },
  daduocduyetvachoxuatban: function(UserID){
    return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 1 and u.UserID = ${UserID}`)
  },
  daxuatban: function(UserID){
    return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 2 and u.UserID = ${UserID}`)
  },
  bituchoi: function(UserID){
    return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 3 and u.UserID = ${UserID}`)
  },
  chuaduocduyet: function(UserID){
    return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 4 and u.UserID = ${UserID}`)
  },
  updateAvatar: function(entity){
    const condition = {
      NewsID: entity.NewsID
    }
    delete entity.NewsID;
    return db.patch(TBL_NEWS, entity, condition);
  },
}