const newsModel = require("../model/news.model");

module.exports.loadhome = async function (req, res) {
  const topFourNewsFamous = await newsModel.loadTopNewsFamous(4);
  const topFourNewsFamousLength = topFourNewsFamous;

  res.render("index", {
    topFourNewsFamous,
    topFourNewsFamousLength,
  });
};
