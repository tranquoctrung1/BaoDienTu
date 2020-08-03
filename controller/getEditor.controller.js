const editorModel = require("../model/editor.model");

module.exports.loadEditor = async function (req, res) {
    const LoadListPost = await editorModel.loadListPost_chuaduyet();

    // const LoadAuthor = await editorModel.loadAuthor(LoadListPost.NewsID);
    res.render("vwEditor/Editor", {
        LoadListPost,
        // LoadAuthor,
    });
}

module.exports.reviewPost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadReviewNews = await editorModel.Review_loadNews(id);
  const news = LoadReviewNews[0];

  const Review_LoadCatChild = await editorModel.loadCatChild();
  const LoadTag = await editorModel.loadTag();
  const TagOfNews = await editorModel.loadTagNews(id);
  
    res.render("vwEditor/Review", {
      news,
      Review_LoadCatChild,
      LoadTag,
      TagOfNews,
  });
};

module.exports.addTag = async function(req, res){
  const entity = {
    NewsID: req.body.NewsID,
    TagID: req.body.TagID,
  }

  console.log(entity);
  await editorModel.addTag(entity);
  var url = "/Editor/Review/" + req.body.NewsID;
  console.log(url);

  res.redirect(url);
}

module.exports.acceptPost = async function(req, res){
  if(req.body.DatePost === '')
  {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    var datePost = date+" "+time;
  }
  else{
    var date = req.body.DatePost;
    var time = req.body.TimePost;
    var datePost = date+" "+time;
  }

  console.log(datePost);

  const entity = {
    NewsID: req.body.NewsID,
    CatChild_ID: req.body.CatChild_ID,
    DatePost: datePost,
    Status: 1,
  }

  console.log(entity);
  await editorModel.patch(entity);
  var url = "/Editor";

  res.redirect(url);
}

module.exports.denyPost = async function(req, res){

  const entity = {
    NewsID: req.body.NewsID,
    Note: req.body.Note,
    Status: 3,
  }

  console.log(entity);
  await editorModel.patch(entity);
  var url = "/Editor";

  res.redirect(url);
}