const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_NEWS = "news";
const TBL_USER = "user";
const TBL_TAG = 'tag';
const TBL_TYPE_OF_USER = "type_of_user";
const TBL_SUBCATEGORY = "category_child";
const TBL_TAG_OF_NEWS = "tag_of_news";

module.exports = {
    loadCat: function(){
        return db.load(`SELECT c.CatID, c.CatName, u.Name, c.IsDel FROM ${TBL_CATEGORY} c JOIN ${TBL_USER} u ON c.Manager = u.UserID`);
    },
    loadTag: function(){
        return db.load(`SELECT * FROM ${TBL_TAG}`);
    },
    loadNews: function(){
        return db.load(`SELECT n.NewsID, n.Avatar, n.NewsTitle, n.DatePost, n.Abstract, n.Author, n.Content, n.IsDel, u.UserName, u.Name FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID`);
    },
    loadUser: function(){
        return db.load(`SELECT u.UserID, u.UserName, u.Name, u.BirthDay, u.IsDel, tou.TypeName FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID`);
    },
    addNewCategory: function(entity){
        return db.add(TBL_CATEGORY, entity);
    },
    addNewTag: function(entity){
        return db.add(TBL_TAG, entity);
    },
    loadCatChild: function(){
        return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
    },
    addNewPost: function(entity){
        return db.add(TBL_NEWS, entity);
    },
    loadTypeOfUser: function(){
        return db.load(`SELECT * FROM ${TBL_TYPE_OF_USER}`);
    },
    addNewUser: function(entity){
        return db.add(TBL_USER, entity);
    },
    loadUpdateCategory: function(CatID){
        return db.load(`SELECT c.CatID, c.CatName, u.Name, c.IsDel FROM ${TBL_CATEGORY} c JOIN ${TBL_USER} u ON c.Manager = u.UserID WHERE CatID = ${CatID}`);
    },
    updateCategory: function (entity) {
        const condition = {
          CatID: entity.CatID
        }
        delete entity.CatID;
        return db.patch(TBL_CATEGORY, entity, condition);
    },
    loadUpdateTag: function(TagID){
        return db.load(`SELECT * FROM ${TBL_TAG} WHERE TagID = ${TagID}`);
    },
    updateTag: function (entity) {
        const condition = {
          TagID: entity.TagID
        }
        delete entity.TagID;
        return db.patch(TBL_TAG, entity, condition);
    },
    loadUpdatePost: function(NewsID){
        return db.load(`SELECT n.NewsID, n.Avatar, n.NewsTitle, n.DatePost, n.Abstract, n.Author, n.Content, n.IsDel, u.UserName, u.Name, cc.CatChildName FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE n.NewsID = ${NewsID}`);
    },
    updatePost: function (entity) {
        const condition = {
          NewsID: entity.NewsID
        }
        delete entity.NewsID;
        return db.patch(TBL_NEWS, entity, condition);
    },
    loadCatChild: function(){
        return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
    },
    delNews: function (id) {
        const condition = {
          NewsID: id
        }
        return db.del(TBL_NEWS, condition);
    },
    delTag_Of_News: function (id) {
        const condition = {
          NewsID: id
        }
        return db.del(TBL_TAG_OF_NEWS, condition);
    },
    updateAvatar: function(entity){
        const condition = {
          NewsID: entity.NewsID
        }
        delete entity.NewsID;
        return db.patch(TBL_NEWS, entity, condition);
    },
    //====Quản lý User
    loadUpdateUser: function(UserID){
        return db.load(`SELECT u.UserID, u.UserName, u.Name, u.BirthDay, u.IsDel, tou.TypeName FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID WHERE UserID = ${UserID}`);
    },
    updateUser: function (entity) {
        const condition = {
            UserID: entity.UserID
        }
        delete entity.UserID;
        return db.patch(TBL_USER, entity, condition);
    },

}