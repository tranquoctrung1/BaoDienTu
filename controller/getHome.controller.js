const newsModel = require("../model/news.model");
const categoryModel = require("../model/category.model");

module.exports.loadhome = async function (req, res) {
  // load top 4 famous
  const topFourNewsFamous = await newsModel.loadTopNewsFamous(4);
  const topFourNewsFamousLength = topFourNewsFamous;

  // load top 10 viewest in all category
  const listCategory = await categoryModel.loadAllCategory();
  let listViewsNews = [];

  for (let i = 0; i < 10; i++) {
    if (listCategory[i] != undefined) {
      let id = listCategory[i].catid;

      let data = await newsModel.loadViewestNewsByCatId(id, 1);

      if (data[0] != undefined) {
        listViewsNews.push(data[0]);
      }
    }
  }

  let listViewsNewsLength = listViewsNews.length;

  // load top 10 most soon news in all category

  let listMostSoonNews = [];

  for (let i = 0; i < 10; i++) {
    if (listCategory[i] != undefined) {
      let id = listCategory[i].catid;

      let data = await newsModel.loadMostSoonNewsByCatId(id, 1);

      if (data[0] != undefined) {
        listMostSoonNews.push(data[0]);
      }
    }
  }

  let listMostSoonNewsLength = listMostSoonNews.length;

  // console.log(listMostSoonNews);

  res.render("index", {
    topFourNewsFamous,
    topFourNewsFamousLength,
    listViewsNews,
    listViewsNewsLength,
    listMostSoonNews,
    listMostSoonNewsLength,
  });
};
