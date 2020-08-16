const editorModel = require("../model/editor.model");

module.exports.loadEditor = async function (req, res) {
    const LoadListPost = await editorModel.loadListPost_chuaduyet(req.session.UserID);
    const LoadListPostApproved = await editorModel.loadListPost_bandaduyet(req.session.UserID);
    const LoadListPostDeny = await editorModel.loadListPost_bandatuchoi(req.session.UserID);
    const LoadListPost_CatEditManager = await editorModel.loadList_CategoryEditorManager(req.session.UserID);

    res.render("vwEditor/Editor", {
        LoadListPost,
        LoadListPost_CatEditManager,
        LoadListPostApproved,
        LoadListPostDeny,
    });
}

module.exports.reviewPost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadReviewNews = await editorModel.Review_loadNews(id);
  const news = LoadReviewNews[0];

  const Review_LoadCatChild = await editorModel.loadCatChild();
  const LoadTag = await editorModel.loadTag();
  const TagOfNews = await editorModel.loadTagNews(id);

  if(LoadReviewNews[0].Avatar != null && LoadReviewNews[0].Avatar != '')
  {
    LoadReviewNews[0].IsAvatar = 1;
  }
  else{
    LoadReviewNews[0].IsAvatar = 0;
  }
  
    res.render("vwEditor/Review", {
      news,
      Review_LoadCatChild,
      LoadTag,
      TagOfNews,
  });
};

module.exports.denyPremium = async function(req, res) {
  const entity = {
      NewsID: req.body.NewsID,
      IsPremium: 0,
  };
  console.log(entity);
  await editorModel.updatePost(entity);
  var url = "/Editor/Review/" + req.body.NewsID;
  res.redirect(url);
};

module.exports.updatePremium = async function(req, res) {
  const entity = {
      NewsID: req.body.NewsID,
      IsPremium: 1,
  };
  console.log(entity);
  await editorModel.updatePost(entity);
  var url = "/Editor/Review/" + req.body.NewsID;
  res.redirect(url);
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
  var trangthai;
  if(req.body.DatePost === '')
  {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    var datePost = date+" "+time;
    trangthai = 2;
  }
  else{
    var date = req.body.DatePost;
    var time = req.body.TimePost;
    var datePost = date+" "+time;
    trangthai = 1;
  }

  console.log(datePost);

  const entity = {
    NewsID: req.body.NewsID,
    CatChild_ID: req.body.CatChild_ID,
    DatePost: datePost,
    Status: trangthai,
    PEditor: 4,
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
    PEditor: req.session.UserID,
  }

  console.log(entity);
  await editorModel.patch(entity);
  var url = "/Editor";

  res.redirect(url);
}

module.exports.addNewTag = async function(req, res){
  const entity = {
    TagName: req.body.TagName,
  }

  const NewTag = await editorModel.addNewTag(entity);
  var url = "/Editor/Review/" + req.body.NewsID;
  console.log(url);

  res.redirect(url);
}