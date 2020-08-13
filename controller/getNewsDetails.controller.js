const newsModel = require("../model/news.model");

module.exports.loadNewsDetails = async function (req, res) {
  const id = req.params.id;

  const NewsDetails = await newsModel.singleNewsDetails(id);
  const news = NewsDetails[0];
  const TagOfNews = await newsModel.loadTagNews(id);
  const CmtNews = await newsModel.loadCmt(id);
  const FiveRelatedPosts = await newsModel.loadFiveRelatedPosts(id, 5);

  const LoadUser = await newsModel.loadUser(req.session.UserID);
  // const LoadUser = await newsModel.loadUser(8);
  const user = LoadUser[0];

  //Kiểm tra có là Guest không? Nếu là Guest thì cho đăng ký Subscriber
    if (LoadUser[0].TypeOfUser == 5) {
      LoadUser[0].IsGuest = 1;
    } else {
      LoadUser[0].IsGuest = 0;
    }

    if (LoadUser[0].TypeOfUser == 2) {
      LoadUser[0].IsSub = 1;
    } else {
      LoadUser[0].IsSub = 0;
    }


    if (LoadUser[0].PreID != null) {
      LoadUser[0].IsPremium = 1;
    } else {
      LoadUser[0].IsPremium = 0;
    }

  var today = new Date();
  var t = today.setDate(today.getDate());

    var exp = new Date(LoadUser[0].ExpriryDate);
    var _ex = exp.setDate(exp.getDate());

    if (t <= _ex) {
      LoadUser[0].Ex = 1;
    } else {
      LoadUser[0].Ex = 0;
    }

  // console.log(NewsDetails[0].Avatar);
  if (NewsDetails[0].Avatar != null && NewsDetails[0].Avatar != "") {
    NewsDetails[0].IsAvatar = 1;
  } else {
    NewsDetails[0].IsAvatar = 0;
  }

  FiveRelatedPosts.forEach((item) => {
    if (item.Avatar != null && item.Avatar != "") {
      item.IsAvatar = 1;
    } else {
      item.IsAvatar = 0;
    }
  });

  var Views = NewsDetails[0].View + 1;
  // console.log(Views);

  const entity = {
    NewsID: id,
    View: Views,
  };
  // console.log(entity);
  const PlusView = await newsModel.patch(entity);



  res.render("vwNews/NewsDetails", {
    news,
    TagOfNews,
    CmtNews,
    FiveRelatedPosts,
    PlusView,
    user,
  });
};

//Xử lý nút Like
module.exports.patch = async function (req, res) {
  const entity = {
    NewsID: req.body.NewsID,
    Like: parseInt(req.body.Like) + 1,
  };
  // console.log(entity);
  await newsModel.patch(entity);
  var url = "/newsDetails/" + req.body.NewsID;
  // console.log(url);

  res.redirect(url);
};

module.exports.registerSub = async function (req, res) {
  const entity = {
    UserID: req.session.UserID,
    TypeOfUser: 2,
  };

  await newsModel.patchUser(entity);

  res.redirect("/");
};
