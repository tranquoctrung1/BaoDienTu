const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "category_child";
const TBL_NEWS = "news";
const TBL_USER = "user";
const TBL_TAG = 'tag';

module.exports = {
    loadListPost_chuaduyet: function(CatID) {
        return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 4`);
        // truy vấn chuyên mục do biên tập viên quản lý
        // return db.load(`SELECT * FROM ${TBL_NEWS} n JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID JOIN ${TBL_USER} u ON n.Author = u.UserID WHERE Status = 4 and c.CatID = ${CatID}`);
    },
    Review_loadNews: function(NewsID){
        return db.load(`SELECT * FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE n.NewsID = ${NewsID}`);
    },
    loadCatChild: function(){
        return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
    },
    loadTag: function(){
        return db.load(`SELECT * FROM ${TBL_TAG}`);
    },
    
}