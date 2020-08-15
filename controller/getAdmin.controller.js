const adminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { now } = require("jquery");

module.exports.loadAdmin = async function (req, res) {
  const LoadCategory = await adminModel.loadCat();
  const LoadTag = await adminModel.loadTag();
  const LoadNews = await adminModel.loadNews();
  const LoadUser = await adminModel.loadUser();

  LoadUser.forEach((item) => {
    if (item.TypeOfUser === 4) {
      item.IsEditor = 1;
    } else {
      item.IsEditor = 0;
    }
  });

  LoadUser.forEach((item) => {
    if (item.TypeOfUser === 2) {
      item.IsSubscriber = 1;
    } else {
      item.IsSubscriber = 0;
    }
  });

  LoadUser.forEach((item) => {
    if (item.TypeOfUser === 5) {
      item.IsGuest = 1;
    } else {
      item.IsGuest = 0;
    }
  });

  LoadUser.forEach((item) => {
    if (item.PreID != null) {
      item.IsPremium = 1;
    } else {
      item.IsPremium = 0;
    }
  });

  var today = new Date();
  var t = today.setDate(today.getDate());

  LoadUser.forEach((item) => {
    var exp = new Date(item.ExpriryDate);
    var _ex = exp.setDate(exp.getDate());

    if (t <= _ex) {
      item.Ex = 1;
    } else {
      item.Ex = 0;
    }
  });

  LoadNews.forEach((item) => {
    if (item.Status === 1 || item.Status === 2) {
      item.NewsOK = 1;
    }
  });

  LoadNews.forEach((item) => {
    if (item.Status === 3) {
      item.NewsEefuse = 1;
    }
  });

  LoadNews.forEach((item) => {
    if (item.Status === 4) {
      item.NotApproved = 1;
    }
  });

  LoadNews.forEach((item) => {
    if (item.IsPremium === 4) {
      item.IsPremium = 1;
    }
  });

  res.render("vwAdmin/indexAdmin", {
    LoadCategory,
    LoadTag,
    LoadNews,
    LoadUser,
  });
};

//==============================================QUẢN LÝ CHUYÊN MỤC

module.exports.paddNewCategory = async function (req, res) {
  const LoadUser = await adminModel.loadUser();
  res.render("vwAdmin/pNewCategory", {
    LoadUser,
  });
};

module.exports.addCategory = async function (req, res) {
  const entity = {
    CatName: req.body.CatName,
    IsDel: 0,
  };

  await adminModel.addNewCategory(entity);

  res.redirect("/Admin");
};

module.exports.loadUpdateCategory = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdateCategory = await adminModel.loadUpdateCategory(id);
  const category = LoadUpdateCategory[0];

  const LoadEditorCategory = await adminModel.loadUEditorCategory(id);
  const LoadCatChild_ID = await adminModel.loadCatChild_ID(id);

  const Editor = await adminModel.loadEditor();

  res.render("vwAdmin/pUpdateCategory", {
    category,
    Editor,
    LoadEditorCategory,
    LoadCatChild_ID,
  });
};

module.exports.updateCat = async function (req, res) {
  const entity = {
    CatID: req.body.CatID,
    CatName: req.body.CatName,
  };

  await adminModel.updateCategory(entity);

  var url = "/Admin/UpdateCategory/" + req.body.CatID;
  res.redirect(url);
};

module.exports.loadUpdateCategoryChild = async function (req, res) {
  const id = +req.params.id || 1;

  const LoadUpdateCategoryChild = await adminModel.loadUpdateCatChild_ID(id);
  const categorychild = LoadUpdateCategoryChild[0];

  res.render("vwAdmin/pUpdateCategoryChild", {
    categorychild,
  });
};

module.exports.updateCategoryChild = async function (req, res) {
  const entity = {
    CatChild_ID: req.body.CatChild_ID,
    CatChildName: req.body.CatChildName,
  };

  await adminModel.updateCatChild_ID(entity);
  var url = "/Admin/UpdateCategory/" + req.body.CatID;
  res.redirect(url);
};

module.exports.CategoryChild_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadCategoryChild = await adminModel.loadUpdateCatChild_ID(id);

  var isDel = LoadCategoryChild[0].IsDel;

  if (LoadCategoryChild[0].IsDel === 1) {
    isDel = 0;
  } else if (LoadCategoryChild[0].IsDel === 0) {
    isDel = 1;
  }

  const entity = {
    CatChild_ID: id,
    IsDel: isDel,
  };

  await adminModel.updateCatChild_ID(entity);
  var url = "/Admin/UpdateCategory/" + LoadCategoryChild[0].CatID;
  res.redirect(url);
};

module.exports.NewCatChild = async function (req, res) {
  const entity = {
    CatID: req.body.CatID,
    CatChildName: req.body.CatChildName,
    IsDel: 0,
  };

  await adminModel.addNewCatChild(entity);
  var url = "/Admin/UpdateCategory/" + req.body.CatID;
  res.redirect(url);
};

module.exports.NewEditorCat = async function (req, res) {
  const entity = {
    CatID: req.body.CatID,
    UserID: req.body.UserID,
  };

  await adminModel.addEditorCat(entity);
  var url = "/Admin/UpdateCategory/" + req.body.CatID;
  res.redirect(url);
};

module.exports.DelEditorCat = async function (req, res) {
  const id = +req.params.id || 1;

  await adminModel.delEditorCat(id);
  var url = "/Admin/UpdateCategory/" + req.body.CatID;
  res.redirect(url);
};

module.exports.Category_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadCategory = await adminModel.loadUpdateCategory(id);

  var isDel = LoadCategory[0].IsDel;

  if (LoadCategory[0].IsDel === 1) {
    isDel = 0;
  } else if (LoadCategory[0].IsDel === 0) {
    isDel = 1;
  }

  const entity = {
    CatID: id,
    IsDel: isDel,
  };

  await adminModel.updateCategory(entity);
  res.redirect("/Admin");
};

//==============================================QUẢN LÝ NHÃN

module.exports.paddNewTag = async function (req, res) {
  res.render("vwAdmin/pNewTag");
};

module.exports.addTag = async function (req, res) {
  const entity = {
    TagName: req.body.TagName,
    IsDel: 0,
  };

  await adminModel.addNewTag(entity);

  res.redirect("/Admin");
};

module.exports.loadUpdateTag = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdateTag = await adminModel.loadUpdateTag(id);
  const tag = LoadUpdateTag[0];

  res.render("vwAdmin/pUpdateTag", {
    tag,
  });
};

module.exports.updateTag = async function (req, res) {
  const entity = {
    TagID: req.body.TagID,
    TagName: req.body.TagName,
  };

  await adminModel.updateTag(entity);

  res.redirect("/Admin");
};

module.exports.Tag_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadTag = await adminModel.loadUpdateTag(id);

  var isDel = LoadTag[0].IsDel;

  if (LoadTag[0].IsDel === 1) {
    isDel = 0;
  } else if (LoadTag[0].IsDel === 0) {
    isDel = 1;
  }

  const entity = {
    TagID: id,
    IsDel: isDel,
  };

  await adminModel.updateTag(entity);
  res.redirect("/Admin");
};

//========================================QUẢN LÝ BÀI VIẾT

module.exports.paddNewPost = async function (req, res) {
  const LoadAdmin = await adminModel.loadAdmin();
  const LoadCatChild = await adminModel.loadCatChild();
  res.render("vwAdmin/pNewPost", {
    LoadAdmin,
    LoadCatChild,
  });
};

module.exports.addNewPost = async function (req, res) {
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
    Avatar: req.file.filename,
    CatChild_ID: req.body.CatChild_ID,
    Abstract: req.body.Abstract,
    Content: req.body.Content,
    Author: req.body.Author,
    Status: 2, //vì Admin đăng bài
    View: 0,
    Like: 0,
    IsPremium: 0,
    IsDel: 0,
  };

  await adminModel.addNewPost(entity);

  res.redirect("/Admin");
};

module.exports.loadUpdatePost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdatePost = await adminModel.loadUpdatePost(id);
  const news = LoadUpdatePost[0];
  const UpdatePost_LoadCatChild = await adminModel.loadCatChild();
  console.log(news);

  res.render("vwAdmin/pUpdatePost", {
    news,
    UpdatePost_LoadCatChild,
  });
};

module.exports.updatePost = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    NewsTitle: req.body.NewsTitle,
    Abstract: req.body.Abstract,
    Content: req.body.Content,
    CatChild_ID: req.body.CatChild_ID,
    Status: 2,
  };
  console.log(entity);
  await adminModel.updatePost(entity);

  res.redirect("/Admin");
};

module.exports.denyPremium = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    IsPremium: 0,
  };

  await adminModel.updatePost(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
};

module.exports.updatePremium = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    IsPremium: 1,
  };

  await adminModel.updatePost(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
};

module.exports.updateAvatar = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    Avatar: req.file.filename,
  };

  await adminModel.updateAvatar(entity);
  var url = "/Admin/UpdatePost/" + req.body.NewsID;
  res.redirect(url);
};

module.exports.DelPost = async function (req, res) {
  await adminModel.delTag_Of_News(req.body.NewsID);
  await adminModel.delNews(req.body.NewsID);
  res.redirect("/Admin");
};

module.exports.Post_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadPost = await adminModel.loadUpdatePost(id);

  var isDel = LoadPost[0].IsDel;

  if (LoadPost[0].IsDel === 1) {
    isDel = 0;
  } else if (LoadPost[0].IsDel === 0) {
    isDel = 1;
  }

  const entity = {
    NewsID: id,
    IsDel: isDel,
  };

  await adminModel.updatePost(entity);
  res.redirect("/Admin");
};

//==============================================QUẢN LÝ NGƯỜI DÙNG

module.exports.paddNewUser = async function (req, res) {
  const LoadUser = await adminModel.loadUser();
  const LoadTypeOfUser = await adminModel.loadTypeOfUser();
  res.render("vwAdmin/pNewUser", {
    LoadUser,
    LoadTypeOfUser,
  });
};

module.exports.addUser = async function (req, res) {
  const password_hash = bcrypt.hashSync(
    req.body.Password,
    config.authentication.saltRounds
  );
  const entity = {
    UserName: req.body.UserName,
    avata: req.file.filename,
    Name: req.body.Name,
    Password: password_hash,
    Birthday: req.body.Birthday,
    Phone: req.body.Phone,
    Email: req.body.Email,
    TypeOfUser: req.body.TypeOfUser,
    PenName: req.body.PenName,
    IsActive: 1,
    IsDel: 0,
    token: null,
  };
  // console.log(entity);
  await adminModel.addNewUser(entity);

  res.redirect("/Admin");
};

module.exports.loadUpdateUser = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadUpdateUser = await adminModel.loadUpdateUser(id);
  const user = LoadUpdateUser[0];

  const listTypeUser = await adminModel.loadTypeOfUser();
  const typeUser = listTypeUser.filter((type) => type.TypeID !== user.TypeID);

  res.render("vwAdmin/pUpdateUser", {
    user,
    typeUser,
  });
};

module.exports.updateUser = async function (req, res) {
  console.log(req.body);
  var today = new Date(req.body.BirthDay);
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const entity = {
    UserID: req.body.UserID,
    UserName: req.body.UserName,
    Name: req.body.Name,
    Password: req.body.Password,
    BirthDay: dateTime,
    Phone: req.body.Phone,
    Email: req.body.Email,
    TypeOfUser: req.body.TypeOfUser,
    PenName: req.body.PenName,
  };

  console.log(entity);
  await adminModel.updateUser(entity);

  res.redirect("/Admin");
};

module.exports.updateAvatarU = async function (req, res) {
  const entity = {
    UserID: req.body.UserID,
    avata: req.file.filename,
  };

  await adminModel.updateUser(entity);
  var url = "/Admin/UpdateUser/" + req.body.UserID;
  res.redirect(url);
};

module.exports.User_IsDel = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadUser = await adminModel.loadUpdateUser(id);
  var isDel = LoadUser[0].IsDel;

  if (LoadUser[0].IsDel === 1) {
    isDel = 0;
  } else if (LoadUser[0].IsDel === 0) {
    isDel = 1;
  }

  const entity = {
    UserID: id,
    IsDel: isDel,
  };

  await adminModel.updateUser(entity);
  res.redirect("/Admin");
};

module.exports.LoadList_EditorCategory = async function (req, res) {
  const id = +req.params.id || -1;
  const LoadEditorCat = await adminModel.loadEditor_Category(id);
  console.log(LoadEditorCat);
  const editorCat = LoadEditorCat[0];
  const LoadCategory = await adminModel.loadCat();

  res.render("vwAdmin/plistEditor_Cat", {
    LoadEditorCat,
    editorCat,
    LoadCategory,
  });
};

module.exports.editorCategory_grant = async function (req, res) {
  const entity = {
    CatID: req.body.CatID,
    UserID: req.body.UserID,
  };
  await adminModel.addEditorCat(entity);

  var url = "/Admin/Editor_Category/" + req.body.UserID;
  res.redirect(url);
};

module.exports.editorCategory_deny = async function (req, res) {
  const id = +req.params.id || -1;

  await adminModel.delEditorCat(id);
  const LoadEditorCat = await adminModel.loadEditorCat();

  var url = "/Admin/Editor_Category/" + LoadEditorCat[0].UserID;
  res.redirect(url);
};

module.exports.reviewPost = async function (req, res) {
  const id = +req.params.id || -1;

  const LoadReviewNews = await adminModel.Review_loadNews(id);
  const news = LoadReviewNews[0];

  const Review_LoadCatChild = await adminModel.loadCatChild();
  const LoadTag = await adminModel.loadTag();
  const TagOfNews = await adminModel.loadTagNews(id);

  if (news.Avatar != null && news.Avatar != "") {
    news.IsAvatar = 1;
  } else {
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
module.exports._addTag = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    TagID: req.body.TagID,
  };

  await adminModel.addTag(entity);
  var url = "/Admin/ReviewPost/" + req.body.NewsID;

  res.redirect(url);
};

module.exports._acceptPost = async function (req, res) {
  var trangthai;
  if (req.body.DatePost === "") {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var datePost = date + " " + time;
    trangthai = 2;
  } else {
    var date = req.body.DatePost;
    var time = req.body.TimePost;
    var datePost = date + " " + time;
    trangthai = 1;
  }

  const entity = {
    NewsID: req.body.NewsID,
    CatChild_ID: req.body.CatChild_ID,
    DatePost: datePost,
    Status: trangthai,
  };

  await adminModel.updatePost(entity);
  var url = "/Admin";

  res.redirect(url);
};

module.exports._denyPost = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    Note: req.body.Note,
    Status: 3,
  };

  await adminModel.updatePost(entity);
  var url = "/Admin";

  res.redirect(url);
};

module.exports._addNewTag = async function (req, res) {
  const entity = {
    TagName: req.body.TagName,
  };

  const NewTag = await adminModel.addNewTag(entity);
  var url = "/Admin/ReviewPost/" + req.body.NewsID;

  res.redirect(url);
};

module.exports.grantAccPremium = async function (req, res) {
  const id = +req.params.id || -1;
  var today = new Date();

  var yyyy = today.getFullYear();
  var mm = today.getMonth();
  var dd = today.getDate();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var Exp = new Date(yyyy, mm, dd, h, m + 5, s); // +5 phút
  var expriry = new Date(Exp);

  // var expiredDate = today.setDate(today.getDate() + 7); // +7 ngày
  // var expriry = new Date(expiredDate);

  const entity = {
    UserID: id,
    ExpriryDate: expriry,
  };

  await adminModel.addNewAccPremium(entity);

  res.redirect("/Admin");
};

module.exports.registerSubscriber = async function (req, res) {
  const id = +req.params.id || -1;

  const entity = {
    UserID: id,
    TypeOfUser: 2,
  };

  await adminModel.updateUser(entity);

  res.redirect("/Admin");
};

module.exports.loadPremiumRenewals = async function (req, res) {
  const id = +req.params.id || 1;
  const Premium = await adminModel.loadPremium(id);
  const pre = Premium[0];

  var today = new Date();
  var t = today.setDate(today.getDate());
  var ex = new Date(pre.ExpriryDate);

  if (t <= ex) {
    Premium[0].Ex = 1;
  } else {
    Premium[0].Ex = 0;
  }

  res.render("vwAdmin/pPremiumRenewal", {
    pre,
  });
};

module.exports.renewals = async function (req, res) {
  var exd = new Date(req.body.ExpriryDate);
  var yyyy = exd.getFullYear();
  var mm = exd.getMonth();
  var dd = exd.getDate();
  var h = exd.getHours();
  var m = exd.getMinutes();
  var s = exd.getSeconds();
  var UpdateEx;

  if (req.body.type === "year") {
    UpdateEx = new Date(yyyy + parseInt(req.body.PlusEx), mm, dd, h, m, s);
  } else if (req.body.type === "month") {
    UpdateEx = new Date(yyyy, mm + parseInt(req.body.PlusEx), dd, h, m, s);
  } else if (req.body.type === "day") {
    UpdateEx = new Date(yyyy, mm, dd + parseInt(req.body.PlusEx), h, m, s);
  } else if (req.body.type === "hour") {
    UpdateEx = new Date(yyyy, mm, dd, h + parseInt(req.body.PlusEx), m, s);
  } else if (req.body.type === "minute") {
    UpdateEx = new Date(yyyy, mm, dd, h, m + parseInt(req.body.PlusEx), s);
  } else if (req.body.type === "second") {
    UpdateEx = new Date(yyyy, mm, dd, h, m, s + parseInt(req.body.PlusEx));
  }
  const entity = {
    PreID: req.body.PreID,
    ExpriryDate: UpdateEx,
  };

  await adminModel.updatePremium(entity);
  var url = "/Admin/PremiumRenewal/" + req.body.UserID;
  res.redirect(url);
};
