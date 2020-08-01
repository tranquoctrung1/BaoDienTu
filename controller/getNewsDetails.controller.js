const newsModel = require("../model/news.model");

module.exports.loadNewsDetails = async function (req, res) {
  const id = req.params.id;

  const NewsDetails = await newsModel.singleNewsDetails(id);
  const TagOfNews = await newsModel.loadTagNews(id);
  const CmtNews = await newsModel.loadCmt(id);
  const FiveRelatedPosts = await newsModel.loadFiveRelatedPosts(id, 5);
 
  var Views = NewsDetails[0].View + 1;
  console.log(Views);

  const entity = {
    NewsID: id,
    View: Views,
    // View: req.body.View + 1,
  }
  console.log(entity);
  const PlusView = await newsModel.patch(entity);
 
  res.render("vwNews/NewsDetails", {
    NewsDetails,
    TagOfNews,
    CmtNews,
    FiveRelatedPosts,
    PlusView,
  });
};

//Xử lý nút Like
module.exports.patch = async function(req, res){
  const entity = {
    NewsID: req.body.NewsID,
    Like: parseInt(req.body.Like) + 1,
  }
  // console.log(entity);
  await newsModel.patch(entity);
  var url = "/newsDetails/" + req.body.NewsID;
  // console.log(url);

  res.redirect(url);
}
