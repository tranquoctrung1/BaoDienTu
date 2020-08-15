const newsModel = require("../model/news.model");

module.exports.loadNewsDetails = async function (req, res) {
  // console.log(entity);

  const id = req.params.id;

  const NewsDetails = await newsModel.singleNewsDetails(id);
  const news = NewsDetails[0];
  const TagOfNews = await newsModel.loadTagNews(id);
  const CmtNews = await newsModel.loadCmt(id);
  const FiveRelatedPosts = await newsModel.loadFiveRelatedPosts(id, 5);

  console.log(NewsDetails);

  if (news.IsPremium == 1) {
    if (req.session.UserID) {
      LoadUser = await newsModel.loadUser(req.session.UserID);
      // const LoadUser = await newsModel.loadUser(8);
      user = LoadUser[0];

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

      if (
        LoadUser[0].TypeOfUser == 1 ||
        LoadUser[0].TypeOfUser == 3 ||
        LoadUser[0].TypeOfUser == 4
      ) {
        LoadUser[0].IsAdminWriterEditor = 1;
      } else {
        LoadUser[0].IsAdminWriterEditor = 0;
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
    } else {
      req.session.loi = "You need to login first";
      res.redirect("/login");
    }
  } else {
    user = null;
  }

  CmtNews.forEach((item) => {
    if (item.avata != null && item.avata != "") {
      item.IsAvatarUser = 1;
    } else {
      item.IsAvatarUser = 0;
    }
  });

  var Views = NewsDetails[0].View + 1;
  // console.log(Views);
  const entity = {
    NewsID: id,
    View: Views,
  };

  CmtNews.forEach(item => {
    const isAHttp = item.avata.slice(0, 4);
    if(isAHttp === "http")
    {
      item.isHttp = true;
    }
    else 
    {
      item.isHttp = false;
    }
  })

  console.log(CmtNews)
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

module.exports.postComment = async function (req, res) {
  // if(req.session.UserID)
  // {

  // }

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const UserID = req.session.UserID;
  const entity = {
    Content: req.body.txtComment,
    UserID: UserID,
    NewsID: req.body.NewsID,
    DateTime: dateTime,
  };
  // console.log(entity);
  var url = "/newsDetails/" + req.body.NewsID;
  if (UserID) {
    await newsModel.addcomment(entity);
    res.redirect(url);
  } else {
    req.session.loi = "You need to login first";
    res.redirect("/login");
  }
};
