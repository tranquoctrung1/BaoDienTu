const tagListPost = require("../model/news.model");

module.exports.loadTagList = async function (req, res) {
    const id = +req.params.id || 1;

    const topFourNewsFamous = await tagListPost.loadTagListPost(id,6,0);
    const topFourNewsFamousLength = topFourNewsFamous.length;
    console.log(topFourNewsFamous)
    
    res.render("listPost", {
        topFourNewsFamous,
        topFourNewsFamousLength
      });
};