// user model
const db = require("../utils/db");

const TBL_USER = "user";
const TBL_TYPE_OF_USER = "type_of_user";

module.exports = {

    loadUpdateUser: function(UserID){
        return db.load(`SELECT u.UserID, u.TypeOfUser ,u.Name,u.PenName, u.Email,u.BirthDay
        FROM ${TBL_USER} u 
        WHERE UserID = ${UserID}`);
    
    },
    updateUser: function (entity) {
        const condition = {
            UserID: entity.UserID
        }
        delete entity.UserID;
        return db.patch(TBL_USER, entity, condition);
    }
};