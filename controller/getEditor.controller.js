const editorModel = require("../model/editor.model");

module.exports.loadEditor = async function (req, res) {
    const LoadListPost = await editorModel.loadListPost_chuaduyet();

    // const LoadAuthor = await editorModel.loadAuthor(LoadListPost.NewsID);
    res.render("vwEditor/Editor", {
        LoadListPost,
        // LoadAuthor,
    });
}

module.exports.reviewPost = async function (req, res) {
    const id = +req.params.id || -1;
  
    const LoadReviewNews = await editorModel.Review_loadNews(id);
    const news = LoadReviewNews[0];
  
    const Review_LoadCatChild = await editorModel.loadCatChild();
    const LoadTag = await editorModel.loadTag();
    
      res.render("vwEditor/Review", {
        news,
        Review_LoadCatChild,
        LoadTag,
    });
  };