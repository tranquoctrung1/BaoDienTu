const db = require("../utils/db");

const TBL_CATEGORY = "category";
const TBL_NEWS = "news";
const TBL_USER = "user";
const TBL_TAG = "tag";
const TBL_TYPE_OF_USER = "type_of_user";
const TBL_SUBCATEGORY = "category_child";
const TBL_TAG_OF_NEWS = "tag_of_news";
const TBL_PREMIUM = "premium";
const TBL_EDITOR_CAT = "editor_cat";

module.exports = {
  loadCat: function () {
    return db.load(`SELECT c.CatID, c.CatName, c.IsDel FROM ${TBL_CATEGORY} c`);
  },
  loadTag: function () {
    return db.load(`SELECT * FROM ${TBL_TAG}`);
  },
  loadNews: function () {
    return db.load(
      `SELECT n.NewsID, n.Avatar, n.NewsTitle, n.DatePost, n.Abstract, n.Status, n.Author, n.Content, n.IsPremium, n.IsDel, u.UserName, u.Name FROM ${TBL_NEWS} n JOIN ${TBL_USER} u ON n.Author = u.UserID`
    );
  },
  loadUser: function () {
    return db.load(
      `SELECT u.UserID, u.UserName, u.Name, u.Password, u.Phone, u.PenName, u.BirthDay, u.IsDel, u.TypeOfUser, tou.TypeName, p.PreID, p.ExpriryDate FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID LEFT JOIN ${TBL_PREMIUM} p ON u.UserID = p.UserID`
    );
  },
  loadUser_Editor: function () {
    return db.load(
      `SELECT u.UserID, u.UserName, u.Name, u.Password, u.Phone, u.PenName, u.BirthDay, u.IsDel, u.TypeOfUser, tou.TypeName, p.PreID, p.ExpriryDate FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID LEFT JOIN ${TBL_PREMIUM} p ON u.UserID = p.UserID WHERE tou.TypeID = 4`
    );
  },
  addNewCategory: function (entity) {
    return db.add(TBL_CATEGORY, entity);
  },
  addNewTag: function (entity) {
    return db.add(TBL_TAG, entity);
  },
  loadCatChild: function () {
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
  },
  loadCatChild_ID: function (CatID) {
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY} WHERE CatID = ${CatID}`);
  },
  loadUpdateCatChild_ID: function (CatChildID) {
    return db.load(
      `SELECT * FROM ${TBL_SUBCATEGORY} WHERE CatChild_ID = ${CatChildID}`
    );
  },
  updateCatChild_ID: function (entity) {
    const condition = {
      CatChild_ID: entity.CatChild_ID,
    };
    delete entity.CaCatChild_IDtID;
    return db.patch(TBL_SUBCATEGORY, entity, condition);
  },
  addNewCatChild: function (entity) {
    return db.add(TBL_SUBCATEGORY, entity);
  },
  addNewPost: function (entity) {
    return db.add(TBL_NEWS, entity);
  },
  loadTypeOfUser: function () {
    return db.load(`SELECT * FROM ${TBL_TYPE_OF_USER}`);
  },
  addNewUser: function (entity) {
    return db.add(TBL_USER, entity);
  },
  loadUpdateCategory: function (CatID) {
    return db.load(
      `SELECT c.CatID, c.CatName, c.IsDel FROM ${TBL_CATEGORY} c  WHERE CatID = ${CatID}`
    );
  },
  loadUEditorCategory: function (CatID) {
    return db.load(
      `SELECT ec.EditorCat_ID, ec.CatID, ec.UserID, c.CatName, u.Name FROM ${TBL_CATEGORY} c JOIN ${TBL_EDITOR_CAT} ec ON c.CatID = ec.CatID JOIN ${TBL_USER} u ON ec.UserID = u.UserID WHERE c.CatID = ${CatID}`
    );
  },
  updateCategory: function (entity) {
    const condition = {
      CatID: entity.CatID,
    };
    delete entity.CatID;
    return db.patch(TBL_CATEGORY, entity, condition);
  },
  delEditorCat: function (id) {
    const condition = {
      EditorCat_ID: id,
    };
    return db.del(TBL_EDITOR_CAT, condition);
  },
  //=============QUẢN LÝ TAG
  loadUpdateTag: function (TagID) {
    return db.load(`SELECT * FROM ${TBL_TAG} WHERE TagID = ${TagID}`);
  },
  updateTag: function (entity) {
    const condition = {
      TagID: entity.TagID,
    };
    delete entity.TagID;
    return db.patch(TBL_TAG, entity, condition);
  },
  loadUpdatePost: function (NewsID) {
    return db.load(
      `SELECT n.NewsID, n.Avatar, n.NewsTitle, n.DatePost, n.CatChild_ID, n.Abstract, n.Author, n.Content, n.IsPremium, n.IsDel, u.UserName, u.Name, cc.CatChildName FROM ${TBL_NEWS} n join ${TBL_USER} u on n.Author = u.UserID join ${TBL_SUBCATEGORY} cc on n.CatChild_ID = cc.CatChild_ID WHERE n.NewsID = ${NewsID}`
    );
  },
  updatePost: function (entity) {
    const condition = {
      NewsID: entity.NewsID,
    };
    delete entity.NewsID;
    return db.patch(TBL_NEWS, entity, condition);
  },
  loadCatChild: function () {
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
  },
  delNews: function (id) {
    const condition = {
      NewsID: id,
    };
    return db.del(TBL_NEWS, condition);
  },
  delTag_Of_News: function (id) {
    const condition = {
      NewsID: id,
    };
    return db.del(TBL_TAG_OF_NEWS, condition);
  },
  updateAvatar: function (entity) {
    const condition = {
      NewsID: entity.NewsID,
    };
    delete entity.NewsID;
    return db.patch(TBL_NEWS, entity, condition);
  },
  //====Quản lý User
  loadUpdateUser: function (UserID) {
    return db.load(
      `SELECT u.UserID, u.UserName, u.Name, u.Password, u.Phone, u.PenName, u.Email, u.BirthDay, u.IsDel, tou.TypeID, tou.TypeName FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID WHERE UserID = ${UserID}`
    );
  },
  updateUser: function (entity) {
    const condition = {
      UserID: entity.UserID,
    };
    delete entity.UserID;
    return db.patch(TBL_USER, entity, condition);
  },
  //===Editor_Category
  loadEditor_Category: function (UserID) {
    return db.load(
      `SELECT ec.EditorCat_ID, ec.UserID, ec.CatID, c.CatName FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_USER} u ON ec.UserID = u.UserID JOIN ${TBL_CATEGORY} c ON ec.CatID = c.CatID WHERE u.UserID = ${UserID} and c.IsDel = 0`
    );
  },
  addEditorCat: function (entity) {
    return db.add(TBL_EDITOR_CAT, entity);
  },
  delEditorCat: function (id) {
    const condition = {
      EditorCat_ID: id,
    };
    return db.del(TBL_EDITOR_CAT, condition);
  },
  loadEditorCat: function () {
    return db.load(
      `SELECT ec.EditorCat_ID, ec.UserID, ec.CatID FROM ${TBL_EDITOR_CAT} ec `
    );
  },
  loadEditor_Category: function () {
    return db.load(
      `SELECT ec.EditorCat_ID, ec.UserID, ec.CatID, c.CatName FROM ${TBL_EDITOR_CAT} ec JOIN ${TBL_CATEGORY} c ON ec.CatID = c.CatID`
    );
  },
  Review_loadNews: function (NewsID) {
    return db.load(
      `SELECT n.NewsID, n.NewsTitle, u.Name, n.DatePost, n.View, n.Like, n.Abstract, n.Content, n.Avatar, cc.CatChildName from ${TBL_NEWS} n JOIN ${TBL_USER} u on n.Author = u.UserID JOIN ${TBL_SUBCATEGORY} cc ON n.CatChild_ID = cc.CatChild_ID JOIN ${TBL_CATEGORY} c ON cc.CatID = c.CatID WHERE NewsID = '${NewsID}'`
    );
  },
  loadCatChild: function () {
    return db.load(`SELECT * FROM ${TBL_SUBCATEGORY}`);
  },
  loadTag: function () {
    return db.load(`SELECT * FROM ${TBL_TAG}`);
  },
  loadTagNews: function (NewsId) {
    return db.load(
      `SELECT t.TagName FROM ${TBL_TAG_OF_NEWS} ton INNER JOIN ${TBL_TAG} t on ton.tagID = t.tagID WHERE ton.NewsID = ${NewsId}`
    );
  },
  addTag: function (entity) {
    return db.add(TBL_TAG_OF_NEWS, entity);
  },
  addNewAccPremium: function (entity) {
    return db.add(TBL_PREMIUM, entity);
  },
  loadPremium: function (UserID) {
    return db.load(
      `SELECT p.PreID, p.ExpriryDate, p.UserID, u.Name FROM ${TBL_PREMIUM} p JOIN ${TBL_USER} u ON p.UserID = u.UserID WHERE p.UserID = ${UserID}`
    );
  },
  updatePremium: function (entity) {
    const condition = {
      PreID: entity.PreID,
    };
    delete entity.PreID;
    return db.patch(TBL_PREMIUM, entity, condition);
  },
  loadEditor: function () {
    return db.load(`SELECT * FROM ${TBL_USER} WHERE TypeOfUser = 4`);
  },
};
