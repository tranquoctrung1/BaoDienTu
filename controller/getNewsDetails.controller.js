const newsModel = require("../model/news.model");

module.exports.loadNewsDetails = async function (req, res) {
    const id = req.params.id;

  const NewsDetails = await newsModel.singleNewsDetails(id);
  const TagOfNews = await newsModel.loadTagNews(id);
  const CmtNews = await newsModel.loadCmt(id);

  res.render("vwNews/NewsDetails", {
    NewsDetails,
    TagOfNews,
    CmtNews,
  });
};
