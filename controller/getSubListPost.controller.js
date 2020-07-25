const subListPost = require("../model/news.model");

module.exports.loadNewSubListPost = async function (req, res) {
    const id = +req.params.id || 1;

    const topFourNewsFamous = await subListPost.loadNewBySubCategoryID(1,6,0);
    const topFourNewsFamousLength = topFourNewsFamous.length;
    console.log(topFourNewsFamous)
    
    res.render("listPost", {
        topFourNewsFamous,
        topFourNewsFamousLength
      });
};