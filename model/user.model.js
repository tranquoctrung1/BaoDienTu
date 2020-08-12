// user model
const db = require("../utils/db");

const TBL_USER = "user";
const TBL_TYPE_OF_USER = "type_of_user";
const TBL_PREMIUM = "premium";

module.exports = {
  loadUpdateUser: function (UserID) {
    return db.load(`SELECT u.UserID, u.TypeOfUser ,u.Name,u.PenName, u.Email,u.BirthDay
        FROM ${TBL_USER} u 
        WHERE UserID = ${UserID}`);
  },
  loadUser_UserID: function (UserID) {
    return db.load(`SELECT * FROM ${TBL_USER} WHERE UserID = ${UserID}`);
  },
  loadUser: function () {
    return db.load(
      `SELECT u.UserID, u.UserName, u.Name, u.Password, u.Phone, u.PenName, u.BirthDay, u.IsDel, u.TypeOfUser, tou.TypeName, p.PreID, p.ExpriryDate FROM ${TBL_USER} u JOIN ${TBL_TYPE_OF_USER} tou ON u.TypeOfUser = tou.TypeID LEFT JOIN ${TBL_PREMIUM} p ON u.UserID = p.UserID`
    );
  },
  updateTypeOfUser_UserID: function (entity) {
    const condition = {
      UserID: entity.UserID,
    };
    delete entity.UserID;
    return db.patch(TBL_USER, entity, condition);
  },
  addNewAccPremium: function (entity) {
    return db.add(TBL_PREMIUM, entity);
  },
  updateUser: function (entity) {
    const condition = {
      UserID: entity.UserID,
    };
    delete entity.UserID;
    return db.patch(TBL_USER, entity, condition);
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

  loadPassword: function (id) {
    return db.load(`select password from ${TBL_USER} where UserID = ${id}`);
  },

  changePassword: function (entity) {
    const condition = {
      UserID: entity.UserID,
    };
    delete entity.UserID;
    return db.patch(TBL_USER, entity, condition);
  },
};
