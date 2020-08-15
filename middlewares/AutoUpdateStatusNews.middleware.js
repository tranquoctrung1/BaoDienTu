const newsModel = require("../model/news.model");

module.exports.autoUpdateStatusNews = async function(req, res, next) {
    const LoadNewsInTheFuture = await newsModel.loadNewsInTheFuture();

    console.log(LoadNewsInTheFuture);
};