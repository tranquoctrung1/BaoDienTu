const categoryModel = require("../model/category.model");
const userModel = require("../model/user.model");
module.exports.loadTopTenCategory = async function(req, res, next) {
    const data = await categoryModel.loadTopTenCategory();

    let topTenCategory = [];
    for (let item of data) {
        if (item != undefined) {
            topTenCategory.push(item);
        }
    }

    if (topTenCategory) {
        res.locals.topTenCategory = topTenCategory;
    }
    const UserID = req.session.UserID;
    res.locals.ID = UserID;

    //const user = await userModel.loadUpdateUser(UserID);

    // res.locals.avata = user.avata;
    // console.log(res.locals.ID);

    next();
};