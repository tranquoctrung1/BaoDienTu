const writerModel = require("../model/writer.model");
const { loadTag } = require("../model/writer.model");

module.exports.loadWriter = async function (req, res) {
  // const id = req.params.id;

  const LoadListPost = await writerModel.loadListPost();
  //console.log(req.body);
  // const loadTagNews = await writerModel.loadTagNews(req.body.NewsID);

  const LoadAuthor = await writerModel.loadAuthor();
  const LoadCatChild = await writerModel.loadCatChild();
  const daduocduyetvachoxuatban = await writerModel.daduocduyetvachoxuatban();
  const daxuatban = await writerModel.daxuatban();
  const bituchoi = await writerModel.bituchoi();
  const chuaduocduyet = await writerModel.chuaduocduyet();

  res.render("vwWriter/Writer", {
    LoadListPost,
    LoadAuthor,
    LoadCatChild,
    daduocduyetvachoxuatban,
    daxuatban,
    bituchoi,
    chuaduocduyet,
  });
  // res.redirect('/');
};

module.exports.postWriter = async function (req, res) {
  //console.log(req.body);

  // req.body.HinhDaiDien = req.file.filename;
  // console.log(req.body.Avatar);
  // console.log(req.file.filename);
  // console.log(req.body.Content);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const entity = {
    NewsID: req.body.NewsID,
    NewsTitle: req.body.NewsTitle,
    DatePost: dateTime,
    Avatar: req.file === undefined ? "" : req.file.filename,
    CatChild_ID: req.body.CatChild_ID,
    Abstract: req.body.Abstract,
    Content: req.body.Content,
    Author: req.body.Author,
    Status: 4,
    View: 0,
    Like: 0,
    IsPremium: 0,
    IsDel: 0,
  };
  //console.log(entity);
  const NewPost = await writerModel.addNewPost(entity);

  res.redirect("/Writer");
};

module.exports.editWriter = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadEditNews = await writerModel.Edit_loadNews(id);
  const news = LoadEditNews[0];

  // const Edit_LoadAuthor = await writerModel.Edit_loadAuthor(id);
  const Edit_LoadCatChild = await writerModel.loadCatChild();

  res.render("vwWriter/Edit", {
    // LoadEditNews,
    news,
    // Edit_LoadAuthor,
    Edit_LoadCatChild,
  });
};

module.exports.editWriter_baivietbituchoi = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadEditNews = await writerModel.Edit_loadNews(id);
  const news = LoadEditNews[0];

  const Edit_LoadCatChild = await writerModel.loadCatChild();

  res.render("vwWriter/Edit_baivietbituchoi", {
    news,
    Edit_LoadCatChild,
  });
};

module.exports.DelPost = async function (req, res) {
  const DelPost = await writerModel.del(req.body.NewsID);
  // console.log(req.params.NewsID);
  res.redirect("/Writer");
};

module.exports.UpdatePost = async function (req, res) {
  await writerModel.patch(req.body);
  console.log(req.body);
  res.redirect("/Writer");
};

module.exports.UpdatePost_bituchoi = async function (req, res) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const entity = {
    NewsID: req.body.NewsID,
    NewsTitle: req.body.NewsTitle,
    DatePost: dateTime,
    CatChild_ID: req.body.CatChild_ID,
    Abstract: req.body.Abstract,
    Content: req.body.Content,
    Status: 4,
    IsPremium: 0,
    IsDel: 0,
    Note: req.body.Note,
  };
  // console.log(entity);
  await writerModel.patch(entity);
  res.redirect("/Writer");
};

module.exports.updateAvatar = async function (req, res) {
  // console.log(req.body);
  const entity = {
    NewsID: req.body.NewsID,
    Avatar: req.file.filename,
  };
  // console.log(entity);
  await writerModel.updateAvatar(entity);
  var url = "/Writer/Edit/" + req.body.NewsID;
  res.redirect(url);
};

module.exports.LoadAddTag = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadNews = await writerModel.loadNews(id);
  const news = LoadNews[0];
  console.log(news);
  const TagOfNews = await writerModel.loadTagNews(id);
  const LoadTag = await loadTag();

  res.render("vwWriter/AddTag", {
    news,
    TagOfNews,
    LoadTag,
  });
};

module.exports.addTag = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    TagID: req.body.TagID,
  };

  // console.log(entity);
  await writerModel.addTag(entity);
  var url = "/Writer/AddTag/" + req.body.NewsID;
  // console.log(url);

  res.redirect(url);
};
