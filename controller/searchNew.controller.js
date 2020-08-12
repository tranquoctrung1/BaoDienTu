const newsModel = require("../model/news.model");
const config = require("../config/config.json");

module.exports.loadSearch = async function (req, res) {
  const content = req.query.content || "";
  const page = +req.query.page || 1;

  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;

  const news = await newsModel.getFullTextSearch(
    content,
    config.pagination.limit,
    offset
  );

  const total = await newsModel.countByFullTextSearch(content);

  const nPages = Math.ceil(total[0].Count / config.pagination.limit);

  console.log(nPages);
  let page_items = [];

  if (nPages <= 3) {
    for (let i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        href: `/search?content=${content}&page=${i}`,
        isActive: i === page ? true : false,
      };
      page_items.push(item);
    }
  } else {
    if (page <= 2) {
      page_items = [
        {
          value: 1,
          href: `/search?content=${content}&page=1`,
          isActive: 1 === page ? true : false,
        },
        {
          value: 2,
          href: `/search?content=${content}&page=2`,
          isActive: 2 === page ? true : false,
        },
        {
          value: 3,
          href: `/search?content=${content}&page=3`,
          isActive: 3 === page ? true : false,
        },
      ];
    } else if (page >= nPages - 1) {
      page_items = [
        {
          value: nPages - 2,
          href: `/search?content=${content}&page=${nPages - 2}`,
          isActive: nPages - 2 === page ? true : false,
        },
        {
          value: nPages - 1,
          href: `/search?content=${content}&page=${nPages - 1}`,
          isActive: nPages - 1 === page ? true : false,
        },
        {
          value: nPages,
          href: `/search?content=${content}&page=${nPages}`,
          isActive: nPages === page ? true : false,
        },
      ];
    } else {
      page_items = [
        {
          value: page - 1,
          href: `/search?content=${content}&page=${page - 1}`,
          isActive: page - 1 === page ? true : false,
        },
        {
          value: page,
          href: `/search?content=${content}&page=${page}`,
          isActive: page === page ? true : false,
        },
        {
          value: page + 1,
          href: `/search?content=${content}&page=${page + 1}`,
          isActive: page + 1 === page ? true : false,
        },
      ];
    }
  }

  res.render("vwNews/search", {
    news,
    newsLength: news.length !== 0,
    page_items,
    startPage: `/search?content=${content}&page=1`,
    endPage: `/search?content=${content}&page=${nPages}`,
    nextPage: `/search?content=${content}&page=${page + 1}`,
    prevPage: `/search?content=${content}&page=${page - 1}`,
    cant_go_prev: page <= 1,
    cant_go_next: page >= nPages,
  });
};
