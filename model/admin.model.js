const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_NEWS = "news";
const TBL_USER = "user";
const TBL_TAG = 'tag';
const TBL_TYPE_OF_USER = "type_of_user";

module.exports = {
    loadCat: function(){
        return db.load(`SELECT * FROM ${TBL_CATEGORY} c JOIN ${TBL_USER} u ON c.Manager = u.UserID`);
    },
    loadTag: function(){
        return db.load(`SELECT * FROM ${TBL_TAG}`);
    },
    loadNews: function(){
        return db.load(`SELECT * FROM ${TBL_NEWS}`);
    },
    loadUser: function(){
        return db.load(`SELECT * FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID`);
    },
}