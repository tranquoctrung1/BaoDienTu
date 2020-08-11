const db = require("../utils/db");

const TBL_USER = "user";
const TBL_PREMIUM = "premium";

module.exports = {
  loadUser: function () {
    return db.load(`SELECT * FROM ${TBL_USER} WHERE TypeOfUser = 5`);
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
