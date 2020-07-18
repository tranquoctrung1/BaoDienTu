const newsModel = require("../model/news.model");
const config = require('../config/config.json');

module.exports.loadListPost = async function (req, res) {
  const id = +req.params.id || 1;

  const topFourNewsFamous = await newsModel.loadNewListPost(1,6,0);
  const topFourNewsFamousLength = topFourNewsFamous;

  // const page = +req.query.page || 1;
  // if (page < 0) page = 1;
  // const offset = (page - 1) * config.pagination.limit;
  // // const list = await productModel.pageByCat(req.params.catId, config.pagination.limit, offset);

  // const [list, total] = await Promise.all([
  //   newsModel.loadNewListPost(id, config.pagination.limit, offset),
  //   newsModel.countByCat(id)
  // ]);

  // // const total = await productModel.countByCat(req.params.catId);
  // const nPages = Math.ceil(total / config.pagination.limit);
  // const page_items = [];

  // for (let i = 1; i <= nPages; i++) {
  //   const item = {
  //     value: i,
  //     isActive: i === page
  //   }
  //   page_items.push(item);
  // }

  // res.render('vwProducts/byCat', {
  //   products: list,
  //   empty: list.length === 0,
  //   page_items,
  //   prev_value: page - 1,
  //   next_value: page + 1,
  //   can_go_prev: page > 1,
  //   can_go_next: page < nPages
  // });



  res.render("listPost", {
    topFourNewsFamous,
    topFourNewsFamousLength
  });
};

  