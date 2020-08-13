const db = require("../utils/db");

const TBL_USER = "user";
const TBL_PREMIUM = "premium";

module.exports = {
  loadSubscriber: function (UserID) {
    return db.load(`SELECT * FROM ${TBL_USER} WHERE UserID = ${UserID}`);
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
};
