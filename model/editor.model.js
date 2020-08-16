const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_USER = "user";
const TBL_TAG = 'tag';
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_EDITOR_CAT = "editor_cat";

module.exports = {
    // loadListPost_chuaduyet: function() {
    //     return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 4`);
    //     // truy vấn chuyên mục do biên tập viên quản lý
    //     // return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 4 and c.CatID = ${CatID}`);
    // },
    loadListPost_chuaduyet: function(UserID) {
        // truy vấn bài viết có chuyên mục do biên tập viên quản lý
        return db.load(`SELECT n.NewsID, n.Avatar, n.NewsTitle, n.IsPremium, n.Abstract, n.DatePost, n.CatChild_ID, c.CatName, u.Name FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_SUBCATEGORY} cc ON ec.CatID = cc.CatID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_NEWS} n ON cc.CatChild_ID = n.CatChild_ID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE ec.UserID = ${UserID} and n.Status = 4`);
    },
    loadListPost_bandaduyet: function(UserID) {
        // truy vấn bài viết có chuyên mục do biên tập viên da duyet
        return db.load(`SELECT n.NewsID, n.Avatar, n.NewsTitle, n.IsPremium, n.Abstract, n.DatePost, n.CatChild_ID, c.CatName, u.Name FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_SUBCATEGORY} cc ON ec.CatID = cc.CatID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_NEWS} n ON cc.CatChild_ID = n.CatChild_ID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE n.PEditor = ${UserID} and (n.Status = 1 or n.Status = 2)`);
    },
    loadListPost_bandatuchoi: function(UserID) {
        // truy vấn bài viết có chuyên mục do biên tập viên da tu choi
        return db.load(`SELECT n.NewsID, n.Avatar, n.NewsTitle, n.IsPremium, n.Abstract, n.DatePost, n.CatChild_ID, n.Note, c.CatName, u.Name FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_SUBCATEGORY} cc ON ec.CatID = cc.CatID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_NEWS} n ON cc.CatChild_ID = n.CatChild_ID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE n.PEditor = ${UserID} and n.Status = 3`);
    },
    loadList_CategoryEditorManager: function(UserID) {
        // truy vấn chuyên mục do biên tập viên quản lý
        return db.load(`SELECT ec.CatID, c.CatName FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_CATEGORY} c ON ec.CatID = c.CatID WHERE ec.UserID = ${UserID}`);
    },
    Review_loadNews: function(NewsID){
        return db.load(`SELECT n.NewsID, n.NewsTitle, u.Name, n.DatePost, n.IsPremium, n.View, n.Like, n.Abstract, n.Content, n.Avatar, n.CatChild_ID, n.Note, cc.CatChildName from ${TBL_NEWS} n JOIN ${TBL_USER} u on n.Author = u.UserID JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID WHERE NewsID = '${NewsID}'`);
    },
    loadCatChild: function(){
        return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
    },
    loadTag: function(){
        return db.load(`SELECT * FROM ${TBL_TAG}`);
    },
    addTag: function(entity){
        return db.add(TBL_TAG_OF_NEWS, entity);
    },
    loadTagNews: function(NewsId){
        return db.load(`SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId}`)
    },
    patch: function(entity){
        const condition = {
          NewsID: entity.NewsID
        }
        delete entity.NewsID;
        return db.patch(TBL_NEWS, entity, condition);
    },
    addNewTag: function(entity){
        return db.add(TBL_TAG, entity);
    },
    updatePost: function (entity) {
        const condition = {
          NewsID: entity.NewsID,
        };
        delete entity.NewsID;
        return db.patch(TBL_NEWS, entity, condition);
    },
}