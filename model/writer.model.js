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
  }
}