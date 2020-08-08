const adminModel = require("../model/admin.model");

module.exports.loadAdmin = async function (req, res) {
    const LoadCategory = await adminModel.loadCat();
    const LoadTag = await adminModel.loadTag();
    const LoadNews = await adminModel.loadNews();
    const LoadUser = await adminModel.loadUser();

    LoadUser.forEach(item => {
      if(item.TypeOfUser === 4)
      {
        item.IsEditor = 1;
      }
      else{
        item.IsEditor = 0;
      }
    });

    LoadUser.forEach(item => {
      if(item.PreID != null)
      {
        item.IsPremium = 1;
      }
      else{
        item.IsPremium = 0;
      }
    });
    
    LoadNews.forEach(item => {
      if(item.Status === 1 || item.Status === 2)
      {
        item.NewsOK = 1;
      }
    });

    LoadNews.forEach(item => {
      if(item.Status === 3)
      {
        item.NewsEefuse = 1;
      }
    });

    LoadNews.forEach(item => {
      if(item.Status === 4)
      {
        item.NotApproved = 1;
      }
    });

    LoadNews.forEach(item => {
      if(item.IsPremium === 4)
      {
        item.IsPremium = 1;
      }
    });

    res.render("vwAdmin/indexAdmin", {
        LoadCategory,
        LoadTag,
        LoadNews,
        LoadUser,
      });
}

//==============================================QUẢN LÝ CHUYÊN MỤC

module.exports.paddNewCategory = async function (req, res) {
  const LoadUser = await adminModel.loadUser();
  res.render("vwAdmin/pNewCategory",{
    LoadUser,
  });
}

module.exports.addCategory = async function (req, res) {

  const entity = {
    CatName: req.body.CatName,
    Manager: req.body.Manager,
    IsDel: 0,
  }
  console.log(entity);
  await adminModel.addNewCategory(entity);

  res.redirect("/Admin");
}

module.exports.loadUpdateCategory = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdateCategory = await adminModel.loadUpdateCategory(id);
  const category = LoadUpdateCategory[0];

  const LoadUser = await adminModel.loadUser();
  
  res.render("vwAdmin/pUpdateCategory", {
    category,
    LoadUser,
  });
}

module.exports.updateCategory = async function (req, res) {
  await adminModel.updateCategory(req.body);
  res.redirect("/Admin");
}

module.exports.Category_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadCategory = await adminModel.loadUpdateCategory(id);
  console.log(LoadCategory);
  var isDel = LoadCategory[0].IsDel;

  console.log(isDel);
  if(LoadCategory[0].IsDel === 1){
    isDel = 0;
  }
  else if(LoadCategory[0].IsDel === 0){
    isDel = 1;
  }

  const entity = {
    CatID: id,
    IsDel: isDel,
  }
  console.log(entity);
  await adminModel.updateCategory(entity);
  res.redirect("/Admin");
}

//==============================================QUẢN LÝ NHÃN

module.exports.paddNewTag = async function (req, res) {
  res.render("vwAdmin/pNewTag");
}

module.exports.addTag = async function (req, res) {

  const entity = {
    TagName: req.body.TagName,
    IsDel: 0,
  }
  console.log(entity);
  await adminModel.addNewTag(entity);

  res.redirect("/Admin");
}

module.exports.loadUpdateTag = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdateTag = await adminModel.loadUpdateTag(id);
  const tag = LoadUpdateTag[0];
 
  res.render("vwAdmin/pUpdateTag", {
    tag,
  });
}

module.exports.updateTag = async function (req, res) {
  const entity = {
    TagID: req.body.TagID,
    TagName: req.body.TagName,
  }
  console.log(entity);
  await adminModel.updateTag(entity);

  res.redirect("/Admin");
}

module.exports.Tag_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadTag = await adminModel.loadUpdateTag(id);
  console.log(LoadTag);
  var isDel = LoadTag[0].IsDel;

  console.log(isDel);
  if(LoadTag[0].IsDel === 1){
    isDel = 0;
  }
  else if(LoadTag[0].IsDel === 0){
    isDel = 1;
  }

  const entity = {
    TagID: id,
    IsDel: isDel,
  }
  console.log(entity);
  await adminModel.updateTag(entity);
  res.redirect("/Admin");
}


//========================================QUẢN LÝ BÀI VIẾT

module.exports.paddNewPost = async function (req, res) {
  const LoadUser = await adminModel.loadUser();
  const LoadCatChild = await adminModel.loadCatChild();
  res.render("vwAdmin/pNewPost",{
    LoadUser,
    LoadCatChild,
  });
}

module.exports.addNewPost = async function (req, res) {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  var dateTime = date+" "+time;

  const entity = {
    NewsID: req.body.NewsID,
    NewsTitle: req.body.NewsTitle,
    DatePost: dateTime,
    Avatar: req.file.filename,
    CatChild_ID: req.body.CatChild_ID,
    Abstract: req.body.Abstract,
    Content: req.body.Content,
    Author: req.body.Author,
    Status: 4,
    View: 0,
    Like: 0,
    IsPremium: 0,
    IsDel: 0,
  }
  console.log(entity);
  const NewPost = await adminModel.addNewPost(entity);

  res.redirect("/Admin");
}

module.exports.loadUpdatePost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdatePost = await adminModel.loadUpdatePost(id);
  const news = LoadUpdatePost[0];
  const UpdatePost_LoadCatChild = await adminModel.loadCatChild();
 
  res.render("vwAdmin/pUpdatePost", {
    news,
    UpdatePost_LoadCatChild,
  });
}

module.exports.updatePost = async function (req, res) {
  console.log(req.body);
  await adminModel.updatePost(req.body);

  res.redirect("/Admin");
}

module.exports.denyPremium = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    IsPremium: 0,
  }

  await adminModel.updatePost(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
}

module.exports.updatePremium = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    IsPremium: 1,
  }

  await adminModel.updatePost(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
}

module.exports.updateAvatar = async function(req, res){//////
  console.log(req.body);
  const entity = {
    NewsID: req.body.NewsID,
    Avatar: req.file.filename,
  }
  console.log(entity);
  await adminModel.updateAvatar(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
}

module.exports.DelPost = async function(req, res){

  await adminModel.delTag_Of_News(req.body.NewsID);
  await adminModel.delNews(req.body.NewsID);
  console.log(req.params.NewsID);
  res.redirect("/Admin");
}

module.exports.Post_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadPost = await adminModel.loadUpdatePost(id);
  console.log(LoadPost);
  var isDel = LoadPost[0].IsDel;

  console.log(isDel);
  if(LoadPost[0].IsDel === 1){
    isDel = 0;
  }
  else if(LoadPost[0].IsDel === 0){
    isDel = 1;
  }

  const entity = {
    NewsID: id,
    IsDel: isDel,
  }
  console.log(entity);
  await adminModel.updatePost(entity);
  res.redirect("/Admin");
}

//==============================================QUẢN LÝ NGƯỜI DÙNG

module.exports.paddNewUser = async function (req, res) {
  const LoadUser = await adminModel.loadUser();
  const LoadTypeOfUser = await adminModel.loadTypeOfUser();
  res.render("vwAdmin/pNewUser",{
    LoadUser,
    LoadTypeOfUser,
  });
}

module.exports.addUser = async function (req, res) {
  
  const entity = {
    UserName: req.body.UserName,
    Name: req.body.Name,
    Password: req.body.Password,
    Birthday: req.body.Birthday,
    Phone: req.body.Phone,
    Email: req.body.Email,
    TypeOfUser: req.body.TypeOfUser,
    PenName: req.body.PenName,
    IsDel: 0,
  }
  console.log(entity);
  await adminModel.addNewUser(entity);
  
  res.redirect("/Admin");
}


module.exports.loadUpdateUser = async function (req, res) {
  const id = +req.params.id || -1;
  
  const LoadUpdateUser = await adminModel.loadUpdateUser(id);
  const user = LoadUpdateUser[0];
  const typeUser = await adminModel.loadTypeOfUser();
  
  res.render("vwAdmin/pUpdateUser", {
    user,
    typeUser,
  });
}

module.exports.updateUser = async function (req, res) {
  
  console.log(req.body);
  await adminModel.updateUser(req.body);
  
  res.redirect("/Admin");
}

module.exports.User_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadUser = await adminModel.loadUpdateUser(id);
  console.log(LoadUser);
  var isDel = LoadUser[0].IsDel;
  
  console.log(isDel);
  if(LoadUser[0].IsDel === 1){
    isDel = 0;
  }
  else if(LoadUser[0].IsDel === 0){
    isDel = 1;
  }
  
  const entity = {
    UserID: id,
    IsDel: isDel,
  }
  console.log(entity);
  await adminModel.updateUser(entity);
  res.redirect("/Admin");
}

module.exports.LoadList_EditorCategory = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadEditorCat = await adminModel.loadEditor_Category(id);
  const editorCat = LoadEditorCat[0];
  const LoadCategory = await adminModel.loadCat();

  res.render("vwAdmin/plistEditor_Cat",{
    LoadEditorCat,
    editorCat,
    LoadCategory,
  });
}

module.exports.editorCategory_grant = async function (req, res) {
  const entity = {
    CatID: req.body.CatID,
    UserID: req.body.UserID,
  }
  await adminModel.addEditorCat(entity);
  
  var url = "/Admin/Editor_Category/" + req.body.UserID;
  res.redirect(url);
}

module.exports.editorCategory_deny = async function (req, res) {
  const id = +req.params.id || -1;

  console.log(req.body);
  await adminModel.delEditorCat(id);
  const LoadEditorCat = await adminModel.loadEditorCat();
  
  var url = "/Admin/Editor_Category/" + LoadEditorCat[0].UserID;
  res.redirect(url);
}

module.exports.reviewPost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadReviewNews = await adminModel.Review_loadNews(id);
  const news = LoadReviewNews[0];

  const Review_LoadCatChild = await adminModel.loadCatChild();
  const LoadTag = await adminModel.loadTag();
  const TagOfNews = await adminModel.loadTagNews(id);

  if(news.Avatar != null && news.Avatar != '')
  {
    news.IsAvatar = 1;
  }
  else{
    news.IsAvatar = 0;
  }
  
    res.render("vwAdmin/ReviewPost", {
      news,
      Review_LoadCatChild,
      LoadTag,
      TagOfNews,
  });
};



//=====
module.exports._addTag = async function(req, res){
  const entity = {
    NewsID: req.body.NewsID,
    TagID: req.body.TagID,
  }

  console.log(entity);
  await adminModel.addTag(entity);
  var url = "/Admin/ReviewPost/" + req.body.NewsID;
  console.log(url);

  res.redirect(url);
}

module.exports._acceptPost = async function(req, res){
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
  }

  console.log(entity);
  await adminModel.updatePost(entity);
  var url = "/Admin";

  res.redirect(url);
}

module.exports._denyPost = async function(req, res){

  const entity = {
    NewsID: req.body.NewsID,
    Note: req.body.Note,
    Status: 3,
  }

  console.log(entity);
  await adminModel.updatePost(entity);
  var url = "/Admin";

  res.redirect(url);
}

module.exports._addNewTag = async function(req, res){
  const entity = {
    TagName: req.body.TagName,
  }

  const NewTag = await adminModel.addNewTag(entity);
  var url = "/Admin/ReviewPost/" + req.body.NewsID;
  console.log(url);

  res.redirect(url);
}