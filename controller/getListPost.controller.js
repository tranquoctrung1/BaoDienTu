const newsModel = require("../model/news.model");
const config = require("../config/config.json");

module.exports.loadListPost = async function (req, res) {
  const id = +req.params.id || 1;

  const page = +req.query.page || 1;

  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;

  // get type of list
  const pathName = req.originalUrl.split("/")[2];

  const list = await newsModel.loadNewListPost(
    id,
    config.pagination.limit,
    offset
  );

  const total = await newsModel.countNewByCat(id);

  // // const total = await productModel.countByCat(req.params.catId);
  const nPages = Math.ceil(total[0].Count / config.pagination.limit);
  let page_items = [];

  if (nPages <= 3) {
    for (let i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        href: `/list/${pathName}/${id}?page=${i}`,
        isActive: i === page ? true : false,
      };
      page_items.push(item);
    }
  } else {
    if (page <= 2) {
      page_items = [
        {
          value: 1,
          href: `/list/${pathName}/${id}?page=1`,
          isActive: 1 === page ? true : false,
        },
        {
          value: 2,
          href: `/list/${pathName}/${id}?page=2`,
          isActive: 2 === page ? true : false,
        },
        {
          value: 3,
          href: `/list/${pathName}/${id}?page=3`,
          isActive: 3 === page ? true : false,
        },
      ];
    } else if (page >= nPages - 1) {
      page_items = [
        {
          value: nPages - 2,
          href: `/list/${pathName}/${id}?page=${nPages - 2}`,
          isActive: nPages - 2 === page ? true : false,
        },
        {
          value: nPages - 1,
          href: `/list/${pathName}/${id}?page=${nPages - 1}`,
          isActive: nPages - 1 === page ? true : false,
        },
        {
          value: nPages,
          href: `/list/${pathName}/${id}?page=${nPages}`,
          isActive: nPages === page ? true : false,
        },
      ];
    } else {
      page_items = [
        {
          value: page - 1,
          href: `/list/${pathName}/${id}?page=${page - 1}`,
          isActive: page - 1 === page ? true : false,
        },
        {
          value: page,
          href: `/list/${pathName}/${id}?page=${page}`,
          isActive: page === page ? true : false,
        },
        {
          value: page + 1,
          href: `/list/${pathName}/${id}?page=${page + 1}`,
          isActive: page + 1 === page ? true : false,
        },
      ];
    }
  }

  console.log(page_items);

  res.render("listPost", {
    news: list,
    newsLength: list.length !== 0,
    page_items,
    startPage: `/list/${pathName}/${id}?page=1`,
    endPage: `/list/${pathName}/${id}?page=${nPages}`,
    nextPage: `/list/${pathName}/${id}?page=${page + 1}`,
    prevPage: `/list/${pathName}/${id}?page=${page - 1}`,
    cant_go_prev: page <= 1,
    cant_go_next: page >= nPages,
  });

  // res.render("listPost", {
  //   topFourNewsFamous,
  //   topFourNewsFamousLength,
  // });
};
