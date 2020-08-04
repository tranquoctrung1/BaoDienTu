const adminModel = require("../model/admin.model");

module.exports.loadAdmin = async function (req, res) {
    const LoadCategory = await adminModel.loadCat();
    const LoadTag = await adminModel.loadTag();
    const LoadNews = await adminModel.loadNews();
    const LoadUser = await adminModel.loadUser();

    res.render("vwAdmin/indexAdmin", {
        LoadCategory,
        LoadTag,
        LoadNews,
        LoadUser,
      });
}